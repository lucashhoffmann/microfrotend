import { Slot } from '@radix-ui/react-slot';
import { PanelLeft } from 'lucide-react';
import * as React from 'react';
import { Button } from './button';
import { cn } from './utils';

interface SidebarContextValue {
  isMobile: boolean;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  openDesktop: boolean;
  setOpenDesktop: (open: boolean) => void;
  toggleSidebar: () => void;
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(
  undefined,
);

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      return;
    }

    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    const sync = () => setIsMobile(mediaQuery.matches);

    sync();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', sync);
      return () => mediaQuery.removeEventListener('change', sync);
    }

    mediaQuery.addListener(sync);
    return () => mediaQuery.removeListener(sync);
  }, []);

  return isMobile;
}

export function SidebarProvider({
  children,
  className,
  defaultOpen = true,
}: React.PropsWithChildren<{ className?: string; defaultOpen?: boolean }>) {
  const isMobile = useIsMobile();
  const [openDesktop, setOpenDesktop] = React.useState(defaultOpen);
  const [openMobile, setOpenMobile] = React.useState(false);

  const value = React.useMemo(
    () => ({
      isMobile,
      openMobile,
      setOpenMobile,
      openDesktop,
      setOpenDesktop,
      toggleSidebar: () => {
        if (isMobile) {
          setOpenMobile(current => !current);
          return;
        }

        setOpenDesktop(current => !current);
      },
    }),
    [isMobile, openDesktop, openMobile],
  );

  return (
    <SidebarContext.Provider value={value}>
      <div
        className={cn('group/sidebar-wrapper flex min-h-screen w-full', className)}
        data-collapsed={openDesktop ? 'false' : 'true'}
        data-mobile-open={openMobile ? 'true' : 'false'}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider.');
  }

  return context;
}

export function Sidebar({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const { isMobile, openMobile, openDesktop, setOpenMobile } = useSidebar();

  return (
    <>
      {isMobile && openMobile ? (
        <button
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[1px] lg:hidden"
          onClick={() => setOpenMobile(false)}
          type="button"
        />
      ) : null}

      <aside
        className={cn(
          'bg-sidebar text-sidebar-foreground border-sidebar-border z-50 flex h-svh shrink-0 flex-col border-r transition-all duration-200 ease-out',
          isMobile
            ? cn(
                'fixed inset-y-0 left-0 w-[18rem] shadow-2xl lg:hidden',
                openMobile ? 'translate-x-0' : '-translate-x-full',
              )
            : openDesktop
              ? 'w-[18rem]'
              : 'w-[4.5rem]',
          className,
        )}
        {...props}
      >
        {children}
      </aside>
    </>
  );
}

export function SidebarHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('border-sidebar-border border-b p-3', className)} {...props} />
  );
}

export function SidebarContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex-1 overflow-y-auto p-3', className)} {...props} />
  );
}

export function SidebarFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('border-sidebar-border border-t p-3', className)} {...props} />
  );
}

export function SidebarInset({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex min-w-0 flex-1 flex-col', className)} {...props} />;
}

export function SidebarGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-4', className)} {...props} />;
}

export function SidebarGroupLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        'mb-2 px-2 text-[11px] font-semibold tracking-[0.14em] text-sidebar-foreground/60 uppercase group-data-[collapsed=true]/sidebar-wrapper:hidden',
        className,
      )}
      {...props}
    />
  );
}

export function SidebarMenu({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn('space-y-1', className)} {...props} />;
}

export function SidebarMenuItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn('list-none', className)} {...props} />;
}

export function SidebarMenuButton({
  asChild = false,
  className,
  isActive = false,
  size = 'default',
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  isActive?: boolean;
  size?: 'default' | 'lg';
  tooltip?: string;
}) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex w-full items-center gap-3 rounded-2xl px-3 text-left text-sm font-medium transition-colors outline-none',
        size === 'lg' ? 'min-h-12 py-3' : 'min-h-10 py-2',
        isActive && 'bg-sidebar-accent text-sidebar-accent-foreground',
        !isActive && 'text-sidebar-foreground/88',
        className,
      )}
      data-active={isActive ? 'true' : 'false'}
      {...props}
    />
  );
}

export function SidebarMenuSub({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn(
        'mt-1 space-y-1 border-l border-sidebar-border/70 pl-4 group-data-[collapsed=true]/sidebar-wrapper:hidden',
        className,
      )}
      {...props}
    />
  );
}

export function SidebarMenuSubItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLLIElement>) {
  return <li className={cn('list-none', className)} {...props} />;
}

export function SidebarMenuSubButton({
  asChild = false,
  className,
  isActive = false,
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  isActive?: boolean;
}) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      className={cn(
        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex w-full items-center rounded-xl px-3 py-2 text-sm transition-colors outline-none',
        isActive
          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
          : 'text-sidebar-foreground/70',
        className,
      )}
      {...props}
    />
  );
}

export function SidebarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn('text-muted-foreground', className)}
      onClick={toggleSidebar}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle sidebar</span>
    </Button>
  );
}

export function SidebarRail({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('bg-sidebar-border mt-auto hidden h-px w-full lg:block', className)}
      {...props}
    />
  );
}
