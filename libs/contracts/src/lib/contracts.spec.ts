import {
  RemoteDashboardResponse,
  RemoteRouteMeta,
  ShellNavGroup,
} from './contracts';

describe('contracts', () => {
  it('defines route and dashboard contracts for remotes', () => {
    const billingRemote: RemoteRouteMeta = {
      id: 'billing',
      label: 'Billing',
      basePath: '/billing',
      defaultPath: '/billing/overview',
      dashboardPath: '/billing/dashboard',
      headline: 'Billing command center',
      description: 'Placeholder only',
      sections: [
        {
          id: 'overview',
          label: 'Overview',
          path: '/billing/overview',
          description: 'Placeholder overview',
        },
      ],
    };
    const dashboard: RemoteDashboardResponse = {
      remoteId: 'billing',
      title: 'Billing overview',
      description: 'Placeholder dashboard',
      stats: [
        {
          id: 'mrr',
          title: 'MRR',
          value: '$42k',
          helper: 'Mocked',
        },
      ],
      activity: [
        {
          id: 'event-1',
          title: 'Card retry',
          summary: 'Retry scheduled.',
          status: 'in-progress',
        },
      ],
    };
    const navGroup: ShellNavGroup = {
      id: 'operations',
      label: 'Operations',
      items: [
        {
          id: 'billing',
          label: 'Billing',
          path: '/billing/overview',
          iconKey: 'receipt-text',
          description: 'Billing area',
          remoteId: 'billing',
        },
      ],
    };

    expect(billingRemote.defaultPath).toBe('/billing/overview');
    expect(dashboard.stats[0].title).toBe('MRR');
    expect(navGroup.items[0].iconKey).toBe('receipt-text');
  });
});
