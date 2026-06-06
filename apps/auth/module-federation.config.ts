import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'auth',
  exposes: {
    './Routes': './src/remote-entry.ts',
  },
  shared: (libraryName, sharedConfig) => {
    if (!libraryName.startsWith('@modular-payments-console/')) {
      return sharedConfig;
    }

    return {
      ...sharedConfig,
      singleton: true,
      strictVersion: false,
      requiredVersion: false,
    };
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
