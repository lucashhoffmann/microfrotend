import { REMOTE_ROUTE_META } from '@modular-payments-console/config';
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
} from '@modular-payments-console/ui';
import { useBillingDashboardUseCase } from '../../../app/modules/dashboard/use-billing-dashboard.use-case';
import { BillingSectionNav } from './components/billing-section-nav.component';

export function BillingOverviewPage() {
  const remote = REMOTE_ROUTE_META.billing;
  const dashboard = useBillingDashboardUseCase();

  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <Badge variant="soft">{remote.label}</Badge>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">{remote.headline}</h1>
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
            {remote.description}
          </p>
        </div>
        <BillingSectionNav />
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        {dashboard.isPending
          ? Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-36 rounded-3xl" />
            ))
          : dashboard.data?.stats.map(stat => (
              <Card key={stat.id} className="border-border/70">
                <CardHeader>
                  <CardDescription>{stat.title}</CardDescription>
                  <CardTitle className="text-3xl">{stat.value}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {stat.helper}
                </CardContent>
              </Card>
            ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <Card className="border-border/70">
          <CardHeader>
            <CardTitle>{dashboard.data?.title ?? 'Loading billing dashboard'}</CardTitle>
            <CardDescription>
              {dashboard.data?.description ??
                'Fetching placeholder billing orchestration data from the mock API.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {dashboard.isPending ? (
              <>
                <Skeleton className="h-16 rounded-2xl" />
                <Skeleton className="h-16 rounded-2xl" />
              </>
            ) : (
              dashboard.data?.activity.map(item => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-border/70 bg-background/70 p-4"
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="font-medium">{item.title}</p>
                    <Badge variant="outline" className="capitalize">
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {item.summary}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-accent/40">
          <CardHeader>
            <CardTitle>Remote-ready structure</CardTitle>
            <CardDescription>
              This overview demonstrates shared theme, shared auth and shared
              server-state while keeping billing-specific routing internal to the remote.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>Providers come from the shell when composed via Module Federation.</p>
            <p>
              The remote still stays runnable in isolation because it mounts its own
              providers in standalone mode.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
