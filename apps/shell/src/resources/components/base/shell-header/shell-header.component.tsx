import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@modular-payments-console/auth';
import { AUTH_ROUTES } from '@modular-payments-console/config';
import {
  Avatar,
  AvatarFallback,
  Button,
  SidebarTrigger,
  ThemeModeToggle,
} from '@modular-payments-console/ui';

export function ShellHeader() {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.session?.user ?? null);
  const logout = useAuthStore(state => state.logout);

  const handleLogout = () => {
    logout();
    navigate(AUTH_ROUTES.login, { replace: true });
  };

  return (
    <header className="border-b border-border/70 bg-background/80 px-4 py-3 backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <div>
            <p className="text-sm font-semibold">Secure shell workspace</p>
            <p className="text-xs text-muted-foreground">
              Shared theme, shared cache and federated remotes orchestrated in one host.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeModeToggle />
          <div className="hidden items-center gap-2 rounded-full border border-border/70 bg-card px-3 py-1.5 sm:flex">
            <Avatar className="size-8">
              <AvatarFallback>
                {user?.name?.charAt(0)?.toUpperCase() ?? 'D'}
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="text-sm font-medium leading-none">
                {user?.name ?? 'Demo Operator'}
              </p>
              <p className="text-xs text-muted-foreground">
                {user?.email ?? 'demo@modular-payments.local'}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
