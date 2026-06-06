import { PropsWithChildren } from 'react';
import { AppSidebar } from '../../components/base/app-sidebar/app-sidebar.component';
import { ShellHeader } from '../../components/base/shell-header/shell-header.component';
import {
  SidebarInset,
  SidebarProvider,
} from '@modular-payments-console/ui';

export function PrivateShellLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen bg-background">
      <SidebarProvider className="relative">
        <AppSidebar />
        <SidebarInset className="min-h-svh overflow-hidden bg-background">
          <ShellHeader />
          <div className="flex-1 overflow-x-hidden overflow-y-auto">
            <div className="min-w-0 p-4 pb-[calc(env(safe-area-inset-bottom)+16px)]">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
