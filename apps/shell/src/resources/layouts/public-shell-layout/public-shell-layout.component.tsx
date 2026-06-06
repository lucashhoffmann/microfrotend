import { PropsWithChildren } from 'react';
import { APP_NAME, APP_TITLE, DEMO_CREDENTIALS } from '@modular-payments-console/config';
import {
  Badge,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@modular-payments-console/ui';

export function PublicShellLayout({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/30 px-6 py-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="flex flex-col justify-between rounded-[2rem] border border-border/70 bg-card/70 p-8 shadow-sm backdrop-blur">
          <div className="space-y-6">
            <Badge variant="soft" className="w-fit">
              {APP_NAME}
            </Badge>
            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl leading-tight font-semibold tracking-tight text-balance">
                {APP_TITLE}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                A shell-first enterprise microfrontend workspace, prepared to
                demonstrate authenticated composition, shared UI, isolated
                remotes and server-state orchestration.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-border/70 bg-background/70">
              <CardHeader>
                <CardTitle className="text-lg">Public auth flow</CardTitle>
                <CardDescription>
                  The login and register views live inside a dedicated remote mounted at
                  <code className="ml-1 rounded bg-accent px-1.5 py-0.5 text-xs">
                    /auth/*
                  </code>
                  .
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border/70 bg-background/70">
              <CardHeader>
                <CardTitle className="text-lg">Demo credentials</CardTitle>
                <CardDescription>
                  Email: <strong>{DEMO_CREDENTIALS.email}</strong>
                  <br />
                  Password: <strong>{DEMO_CREDENTIALS.password}</strong>
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <section className="flex items-center justify-center">{children}</section>
      </div>
    </main>
  );
}
