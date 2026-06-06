import { PropsWithChildren } from 'react';
import { APP_NAME, APP_TITLE, DEMO_CREDENTIALS } from '@modular-payments-console/config';
import {
  Badge,
  ThemeModeToggle,
} from '@modular-payments-console/ui';

export function PublicShellLayout({ children }: PropsWithChildren) {
  return (
    <main className="min-h-svh bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="flex min-h-svh w-full flex-col md:flex-row">
        <aside className="hidden w-full border-r border-zinc-300 bg-zinc-200/45 p-12 md:flex md:w-[48%] md:flex-col md:justify-between dark:border-zinc-800 dark:bg-zinc-900/35">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="bg-primary text-primary-foreground flex size-12 items-center justify-center rounded-md text-sm font-semibold tracking-[0.2em]">
                MPC
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold tracking-[0.18em] text-zinc-500 uppercase dark:text-zinc-400">
                  {APP_NAME}
                </p>
                <p className="text-sm font-medium">{APP_TITLE}</p>
              </div>
            </div>

            <div className="max-w-md space-y-4">
              <Badge variant="soft" className="w-fit rounded-md bg-white/70 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
                Enterprise microfrontend workspace
              </Badge>
              <h1 className="text-4xl leading-tight font-semibold tracking-tight text-balance">
                Operate billing, wallet and analytics from one authenticated shell.
              </h1>
              <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
                A structured host for federated remotes with shared theme, shared auth
                and consistent orchestration across product surfaces.
              </p>
            </div>
          </div>

          <div className="grid gap-6 text-sm text-zinc-600 dark:text-zinc-400">
            <div className="space-y-2 border-t border-zinc-300 pt-6 dark:border-zinc-800">
              <p className="font-medium text-zinc-900 dark:text-zinc-100">
                Demo access
              </p>
              <p>{DEMO_CREDENTIALS.email}</p>
              <p>{DEMO_CREDENTIALS.password}</p>
            </div>
            <p className="max-w-sm">
              The auth remote protects the shell and keeps the business remotes
              isolated behind a shared session contract.
            </p>
          </div>
        </aside>

        <section className="relative flex min-w-0 flex-1 bg-zinc-50 dark:bg-zinc-950">
          <div className="absolute top-4 right-4 z-10 md:top-6 md:right-6">
            <ThemeModeToggle />
          </div>

          <div className="flex min-h-svh w-full items-center justify-center p-5 md:p-10">
            <div className="w-full max-w-[28.75rem] border border-zinc-300 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-8 flex items-center gap-3 md:hidden">
                <div className="bg-primary text-primary-foreground flex size-11 items-center justify-center rounded-md text-sm font-semibold tracking-[0.2em]">
                  MPC
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                    {APP_NAME}
                  </p>
                  <p className="text-sm font-medium">{APP_TITLE}</p>
                </div>
              </div>
              {children}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
