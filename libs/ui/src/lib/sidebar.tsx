import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { PanelLeft } from 'lucide-react';
import * as React from 'react';
import { Button } from './button';
import { Input } from './input';
import { Separator } from './separator';
import { cn } from './utils';

const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_MOBILE = '18rem';
const SIDEBAR_WIDTH_ICON = '3rem';

type SidebarContextValue = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

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
  open: openProp,
  onOpenChange,
  style,
  ...props
}: React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>) {
  const isMobile = useIsMobile();
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const [openMobile, setOpenMobile] = React.useState(false);

  const open = openProp ?? internalOpen;

  const setOpen = React.useCallback(
    (value: boolean | ((open: boolean) => boolean)) => {
      const nextOpen = typeof value === 'function' ? value(open) : value;

      if (onOpenChange) {
        onOpenChange(nextOpen);
        return;
      }

      setInternalOpen(nextOpen);
    },
    [onOpenChange, open],
  );

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile(current => !current);
      return;
    }

    setOpen(current => !current);
  }, [isMobile, setOpen]);

  const state: SidebarContextValue['state'] = open
    ? 'expanded'
    : 'collapsed';

  const value = React.useMemo(
    () => ({
      state,
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
    }),
    [isMobile, open, openMobile, setOpen, state, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={value}>
      <div
        data-slot="sidebar-wrapper"
        style={
          {
            '--sidebar-width': SIDEBAR_WIDTH,
            '--sidebar-width-mobile': SIDEBAR_WIDTH_MOBILE,
            '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          'group/sidebar-wrapper relative flex min-h-svh w-full min-w-0 bg-background',
          className,
        )}
        {...props}
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
  side = 'left',
  collapsible = 'offcanvas',
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  side?: 'left' | 'right';
  collapsible?: 'offcanvas' | 'icon' | 'none';
}) {
  const { isMobile, openMobile, setOpenMobile, state } = useSidebar();

  if (collapsible === 'none') {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          'bg-sidebar text-sidebar-foreground flex h-full w-[var(--sidebar-width)] flex-col',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <>
        {openMobile ? (
          <button
            aria-label="Close sidebar overlay"
            className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[1px] md:hidden"
            onClick={() => setOpenMobile(false)}
            type="button"
          />
        ) : null}

        <div
          data-slot="sidebar"
          data-mobile="true"
          className={cn(
            'fixed inset-y-0 left-0 z-50 flex h-svh w-[var(--sidebar-width-mobile)] flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-200 ease-linear md:hidden',
            openMobile ? 'translate-x-0' : '-translate-x-full',
            side === 'right' && 'left-auto right-0',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </>
    );
  }

  return (
    <div
      className="group peer hidden text-sidebar-foreground md:block"
      data-slot="sidebar"
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-side={side}
    >
      <div
        data-slot="sidebar-gap"
        className={cn(
          'relative w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear',
          collapsible === 'offcanvas' && 'group-data-[collapsible=offcanvas]:w-0',
          side === 'right' && 'group-data-[side=right]:rotate-180',
          collapsible === 'icon' &&
            'group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]',
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          'fixed inset-y-0 z-40 hidden h-svh w-[var(--sidebar-width)] transition-[left,right,width] duration-200 ease-linear md:flex',
          side === 'left'
            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
          collapsible === 'icon' &&
            'group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]',
          className,
        )}
        {...props}
      >
        <div
          data-slot="sidebar-inner"
          className={cn(
            'bg-sidebar border-sidebar-border flex h-full w-full flex-col border-r',
            side === 'right' && 'border-l border-r-0',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn('size-7', className)}
      onClick={event => {
        onClick?.(event);
        toggleSidebar();
      }}
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
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-slot="sidebar-rail"
      aria-label="Toggle sidebar"
      className={cn(
        'hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex',
        'group-data-[side=left]:-right-4 group-data-[side=right]:left-0',
        'group-data-[collapsible=icon]:after:bg-sidebar-border/80',
        'group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full',
        className,
      )}
      onClick={toggleSidebar}
      tabIndex={-1}
      title="Toggle sidebar"
      type="button"
      {...props}
    />
  );
}

export function SidebarInset({
  className,
  ...props
}: React.ComponentProps<'main'>) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        'relative z-0 flex w-full min-w-0 flex-1 flex-col bg-background',
        className,
      )}
      {...props}
    />
  );
}

export function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      className={cn('h-8 w-full bg-background shadow-none', className)}
      {...props}
    />
  );
}

export function SidebarHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    />
  );
}

export function SidebarFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn('flex flex-col gap-2 p-2', className)}
      {...props}
    />
  );
}

export function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      className={cn('mx-2 w-auto bg-sidebar-border', className)}
      {...props}
    />
  );
}

export function SidebarContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
        className,
      )}
      {...props}
    />
  );
}

export function SidebarGroup({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group"
      className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
      {...props}
    />
  );
}

export function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-slot="sidebar-group-label"
      className={cn(
        'text-sidebar-foreground/70 flex h-8 shrink-0 items-center rounded-md px-2 text-[11px] font-semibold tracking-[0.16em] uppercase outline-none transition-[margin,opacity] duration-200 ease-linear',
        'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
        className,
      )}
      {...props}
    />
  );
}

export function SidebarMenu({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu"
      className={cn('flex w-full min-w-0 flex-col gap-1', className)}
      {...props}
    />
  );
}

export function SidebarMenuItem({
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-item"
      className={cn('group/menu-item relative list-none', className)}
      {...props}
    />
  );
}

const sidebarMenuButtonVariants = cva(
  'peer/menu-button flex w-full min-w-0 items-center gap-2 overflow-hidden rounded-md border border-transparent p-2 text-left text-sm outline-none transition-[width,height,padding,color,background-color,border-color] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-ring active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: '',
        outline:
          'bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:shadow-[0_0_0_1px_var(--sidebar-accent)]',
      },
      size: {
        default: 'h-8',
        sm: 'h-8 text-xs',
        lg: 'h-12 text-sm group-data-[collapsible=icon]:p-0!',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export function SidebarMenuButton({
  asChild = false,
  isActive = false,
  tooltip,
  variant = 'default',
  size = 'default',
  className,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string;
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : 'button';
  const { isMobile, state } = useSidebar();

  return (
    <Comp
      data-slot="sidebar-menu-button"
      data-active={isActive}
      data-size={size ?? 'default'}
      title={state === 'collapsed' && !isMobile ? tooltip : undefined}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      className={cn(
        'pointer-events-none absolute right-1 top-1.5 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  );
}

export function SidebarMenuSub({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      className={cn(
        'border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5 group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  );
}

export function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      className={cn('group/menu-sub-item relative list-none', className)}
      {...props}
    />
  );
}

export function SidebarMenuSubButton({
  asChild = false,
  isActive = false,
  className,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  isActive?: boolean;
}) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-active={isActive}
      className={cn(
        'flex h-7 min-w-0 items-center gap-2 overflow-hidden rounded-md border border-transparent px-2 text-sm text-sidebar-foreground outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-ring active:bg-sidebar-accent active:text-sidebar-accent-foreground data-[active=true]:border-primary data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground group-data-[collapsible=icon]:hidden [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
        className,
      )}
      {...props}
    />
  );
}
