import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@modular-payments-console/auth';
import { AUTH_ROUTES } from '@modular-payments-console/config';
import {
  Button,
  Separator,
  SidebarTrigger,
  ThemeModeToggle,
} from '@modular-payments-console/ui';

export function ShellHeader() {
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);

  const handleLogout = () => {
    logout();
    navigate(AUTH_ROUTES.login, { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b border-border/70 bg-background/95 px-4 backdrop-blur">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">Secure shell workspace</p>
        <p className="truncate text-xs text-muted-foreground">
          Shared theme, shared cache and federated remotes orchestrated in one host.
        </p>
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <ThemeModeToggle />
        <Button
          variant="ghost"
          size="sm"
          className="text-red-600 hover:bg-red-500/10 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-500/10 dark:hover:text-red-300"
          onClick={handleLogout}
        >
            <LogOut />
            Logout
        </Button>
      </div>
    </header>
  );
}
