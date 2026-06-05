import { lazy, Suspense, useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from '@modular-payments-console/auth';
import { createApiClient } from '@modular-payments-console/api-client';
import {
  API_CONFIG,
  APP_NAME,
  APP_TITLE,
  REMOTE_NAVIGATION,
  SHELL_NAVIGATION,
} from '@modular-payments-console/config';
import { createEventBus } from '@modular-payments-console/event-bus';
import { Card } from '@modular-payments-console/ui';
import './app.css';

const AnalyticsRoutes = lazy(() => import('analytics/Routes'));
const WalletRoutes = lazy(() => import('wallet/Routes'));
const BillingRoutes = lazy(() => import('billing/Routes'));

type ShellEvents = {
  'shell.loaded': { source: 'shell' };
};

const shellEventBus = createEventBus<ShellEvents>();
const apiClient = createApiClient({ baseUrl: API_CONFIG.baseUrl });

function ShellHome() {
  const { status } = useAuth();
  const [lastEventSource, setLastEventSource] = useState('pending');

  useEffect(() => {
    const unsubscribe = shellEventBus.subscribe(
      'shell.loaded',
      ({ source }) => {
        setLastEventSource(source);
      },
    );

    shellEventBus.publish('shell.loaded', { source: 'shell' });

    return unsubscribe;
  }, []);

  return (
    <div className="shell-grid">
      <Card
        eyebrow="Host Application"
        title="Shell ready to orchestrate remotes"
        footer={
          <span className="shell-card__caption">
            Run `pnpm nx serve shell` and navigate through the remote routes.
          </span>
        }
      >
        <p className="shell-copy">
          This host owns the outer routing and loads each microfrontend through
          Module Federation.
        </p>
      </Card>

      <div className="shell-grid shell-grid--remotes">
        {REMOTE_NAVIGATION.map((remote) => (
          <Card
            key={remote.id}
            eyebrow="Remote"
            title={`${remote.label} placeholder`}
            tone="accent"
          >
            <p className="shell-copy">{remote.summary}</p>
            <Link className="shell-inline-link" to={remote.path}>
              Open {remote.label}
            </Link>
          </Card>
        ))}
      </div>

      <Card eyebrow="Shared libs" title="Initial shared foundation">
        <dl className="shell-meta">
          <div>
            <dt>Auth status</dt>
            <dd>{status}</dd>
          </div>
          <div>
            <dt>API base URL</dt>
            <dd>{apiClient.baseUrl}</dd>
          </div>
          <div>
            <dt>Event bus</dt>
            <dd>last event from {lastEventSource}</dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}

function ShellRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ShellHome />} />
      <Route path="/analytics" element={<AnalyticsRoutes />} />
      <Route path="/wallet" element={<WalletRoutes />} />
      <Route path="/billing" element={<BillingRoutes />} />
    </Routes>
  );
}

export function App() {
  return (
    <AuthProvider>
      <main className="shell-layout">
        <header className="shell-header">
          <div>
            <p className="shell-kicker">{APP_NAME}</p>
            <h1>{APP_TITLE}</h1>
            <p className="shell-copy">
              Minimal host shell for validating remote composition before we
              define domain patterns, auth flows, and final product layouts.
            </p>
          </div>

          <nav aria-label="Primary" className="shell-nav">
            {SHELL_NAVIGATION.map((item) => (
              <Link key={item.id} className="shell-nav__link" to={item.path}>
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <section className="shell-content">
          <Suspense
            fallback={
              <div className="shell-fallback">Loading remote module...</div>
            }
          >
            <ShellRoutes />
          </Suspense>
        </section>
      </main>
    </AuthProvider>
  );
}

export default App;
