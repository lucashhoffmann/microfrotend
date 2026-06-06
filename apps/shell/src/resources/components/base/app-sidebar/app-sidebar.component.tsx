import { ChartColumn, CreditCard, Wallet } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@modular-payments-console/auth';
import { APP_TITLE, SHELL_NAV_GROUPS } from '@modular-payments-console/config';
import {
  Avatar,
  AvatarFallback,
  Badge,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@modular-payments-console/ui';

const sidebarIcons = {
  'receipt-text': CreditCard,
  wallet: Wallet,
  'chart-column': ChartColumn,
} as const;

export function AppSidebar() {
  const location = useLocation();
  const user = useAuthStore(state => state.session?.user ?? null);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Avatar className="size-10 rounded-2xl">
                <AvatarFallback className="rounded-2xl bg-sidebar-primary text-sidebar-primary-foreground">
                  MPC
                </AvatarFallback>
              </Avatar>
              <div className="group-data-[collapsed=true]/sidebar-wrapper:hidden">
                <p className="text-sm font-semibold">{APP_TITLE}</p>
                <p className="text-xs text-sidebar-foreground/70">
                  Enterprise microfrontend shell
                </p>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {SHELL_NAV_GROUPS.map(group => (
          <SidebarGroup key={group.id}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map(item => {
                const Icon = sidebarIcons[item.iconKey];
                const isActive = location.pathname.startsWith(
                  item.remoteId ? `/${item.remoteId}` : item.path,
                );

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.path}>
                        <Icon />
                        <div className="min-w-0 group-data-[collapsed=true]/sidebar-wrapper:hidden">
                          <p className="truncate">{item.label}</p>
                          <p className="truncate text-xs text-sidebar-foreground/65">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-3 rounded-2xl bg-sidebar-accent/80 p-3">
          <Avatar className="size-9">
            <AvatarFallback>
              {user?.name?.charAt(0)?.toUpperCase() ?? 'D'}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 group-data-[collapsed=true]/sidebar-wrapper:hidden">
            <p className="truncate text-sm font-medium">
              {user?.name ?? 'Demo Operator'}
            </p>
            <p className="truncate text-xs text-sidebar-foreground/65">
              {user?.email ?? 'demo@modular-payments.local'}
            </p>
          </div>
          <Badge
            variant="soft"
            className="ml-auto group-data-[collapsed=true]/sidebar-wrapper:hidden"
          >
            Demo
          </Badge>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
