import { NavLink } from 'react-router-dom';
import { REMOTE_ROUTE_META } from '@modular-payments-console/config';
import { cn } from '@modular-payments-console/ui';

export function AnalyticsSectionNav() {
  return (
    <nav className="flex flex-wrap gap-2" aria-label="Analytics sections">
      {REMOTE_ROUTE_META.analytics.sections.map(section => (
        <NavLink
          key={section.id}
          className={({ isActive }) =>
            cn(
              'rounded-md border border-border/60 px-4 py-2 text-sm font-medium transition-colors',
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
