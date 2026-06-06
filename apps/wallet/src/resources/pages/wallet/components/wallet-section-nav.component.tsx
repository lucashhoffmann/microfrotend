import { NavLink } from 'react-router-dom';
import { REMOTE_ROUTE_META } from '@modular-payments-console/config';
import { cn } from '@modular-payments-console/ui';

export function WalletSectionNav() {
  return (
    <nav className="flex flex-wrap gap-2" aria-label="Wallet sections">
      {REMOTE_ROUTE_META.wallet.sections.map(section => (
        <NavLink
          key={section.id}
          className={({ isActive }) =>
            cn(
              'rounded-full border border-border/70 px-4 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground',
            )
          }
          to={section.path}
        >
          {section.label}
        </NavLink>
      ))}
    </nav>
  );
}
