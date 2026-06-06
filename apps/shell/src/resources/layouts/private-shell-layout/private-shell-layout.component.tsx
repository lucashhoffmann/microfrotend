import { PropsWithChildren } from 'react';
import { AppSidebar } from '../../components/base/app-sidebar/app-sidebar.component';
import { ShellHeader } from '../../components/base/shell-header/shell-header.component';
import {
  SidebarInset,
  SidebarProvider,
} from '@modular-payments-console/ui';

export function PrivateShellLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider className="bg-background">
      <AppSidebar />
      <SidebarInset>
        <ShellHeader />
        <div className="flex-1 overflow-auto">
          <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col px-4 py-6 sm:px-6">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
