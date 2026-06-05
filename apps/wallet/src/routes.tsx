import { REMOTE_DEFINITIONS } from '@modular-payments-console/config';
import { Card } from '@modular-payments-console/ui';

export default function WalletRoutes() {
  const remote = REMOTE_DEFINITIONS.wallet;

  return (
    <main className="remote-page">
      <Card eyebrow="Federated route" title={remote.headline} tone="accent">
        <p className="remote-copy">{remote.summary}</p>
        <p className="remote-path">Mounted at {remote.path}</p>
      </Card>
    </main>
  );
}
