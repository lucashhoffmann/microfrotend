import { spawn } from 'node:child_process';
import net from 'node:net';

const shouldStartMock =
  process.argv.includes('--mock') || process.env.npm_config_mock === 'true';

const mockPort = Number(process.env.MOCK_API_PORT ?? 3333);
const shellPort = 4200;

const remoteCommands = [
  { label: 'billing', project: 'billing', port: 4201 },
  { label: 'wallet', project: 'wallet', port: 4202 },
  { label: 'analytics', project: 'analytics', port: 4203 },
  { label: 'auth', project: 'auth', port: 4205 },
];

function isPortOpen(port) {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host: '127.0.0.1', port });

    socket.once('connect', () => {
      socket.end();
      resolve(true);
    });

    socket.once('error', () => {
      resolve(false);
    });
  });
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function isHttpHealthy(port, path, init) {
  try {
    const response = await fetch(`http://127.0.0.1:${port}${path}`, init);
    return response.ok;
  } catch {
    return false;
  }
}

async function isExistingMockHealthy() {
  return isHttpHealthy(mockPort, '/api/billing/dashboard');
}

async function isExistingRemoteHealthy(port) {
  return isHttpHealthy(port, '/remoteEntry.js');
}

async function isExistingShellHealthy() {
  return isHttpHealthy(shellPort, '/', {
    headers: {
      Accept: 'text/html',
    },
  });
}

function createNxServeCommand({ label, project, port }) {
  return {
    label,
    command: 'pnpm',
    args: ['nx', 'serve', project],
    allowReuse: false,
    async isHealthy() {
      return isExistingRemoteHealthy(port);
    },
    port,
  };
}

const shellCommand = {
  label: 'shell',
  command: 'pnpm',
  args: ['nx', 'serve', 'shell'],
  allowReuse: false,
  isHealthy: isExistingShellHealthy,
  port: shellPort,
};

const mockCommand = {
  label: 'mock',
  command: 'pnpm',
  args: ['mock:api'],
  allowReuse: true,
  isHealthy: isExistingMockHealthy,
  port: mockPort,
};

const children = [];
let isShuttingDown = false;
let expectedExitCode = 0;

function stopChildren(signal = 'SIGTERM', exitCode = expectedExitCode) {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;
  expectedExitCode = exitCode;

  for (const child of children) {
    if (!child.killed) {
      child.kill(signal);
    }
  }
}

function removeChild(processId) {
  const childIndex = children.findIndex(child => child.pid === processId);

  if (childIndex >= 0) {
    children.splice(childIndex, 1);
  }
}

function finishIfDone() {
  if (children.length === 0) {
    process.exit(expectedExitCode);
  }
}

function startProcess({ label, command, args }) {
  const child = spawn(command, args, {
    stdio: 'inherit',
    env: process.env,
  });

  child.on('error', (error) => {
    console.error(`[${label}] failed to start:`, error);
    stopChildren('SIGTERM', 1);
  });

  child.on('exit', (code, signal) => {
    removeChild(child.pid);

    if (!isShuttingDown) {
      if (signal) {
        console.log(`[${label}] exited due to ${signal}`);
        stopChildren('SIGTERM', 1);
      } else if (code && code !== 0) {
        console.error(`[${label}] exited with code ${code}`);
        stopChildren('SIGTERM', code);
      } else {
        stopChildren('SIGTERM', 0);
      }
    }

    finishIfDone();
  });

  children.push(child);

  return child;
}

async function waitForService({ label, isHealthy, child, timeoutMs = 120000 }) {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    if (child.exitCode !== null) {
      throw new Error(`[${label}] exited before becoming ready`);
    }

    if (await isHealthy()) {
      return;
    }

    await wait(1000);
  }

  throw new Error(`[${label}] did not become ready within ${timeoutMs / 1000}s`);
}

async function ensureService(command) {
  const portInUse = await isPortOpen(command.port);

  if (portInUse) {
    if (!command.allowReuse) {
      throw new Error(
        `[${command.label}] port ${command.port} is already in use. Stop any existing Nx/Rspack process for this app before running pnpm dev.`,
      );
    }

    const alreadyHealthy = await command.isHealthy();

    if (alreadyHealthy) {
      console.log(`[${command.label}] reusing existing service on port ${command.port}`);
      return;
    }

    throw new Error(
      `[${command.label}] port ${command.port} is already in use, but the running service did not pass the health check. Stop it before running pnpm dev again.`,
    );
  }

  const child = startProcess(command);
  await waitForService({
    label: command.label,
    isHealthy: command.isHealthy,
    child,
  });
}

process.on('SIGINT', () => {
  stopChildren('SIGINT', 0);
});

process.on('SIGTERM', () => {
  stopChildren('SIGTERM', 0);
});

async function main() {
  for (const remoteCommand of remoteCommands.map(createNxServeCommand)) {
    await ensureService(remoteCommand);
  }

  if (shouldStartMock) {
    await ensureService(mockCommand);
  }

  await ensureService(shellCommand);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  stopChildren('SIGTERM', 1);

  if (children.length === 0) {
    process.exit(1);
  }
});
