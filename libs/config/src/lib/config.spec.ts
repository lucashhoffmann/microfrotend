import {
  API_BASE_URL,
  APP_NAME,
  AUTH_ROUTES,
  PRIVATE_HOME_ROUTE,
  REMOTE_ROUTE_META,
  SHELL_NAV_GROUPS,
} from './config';

describe('config', () => {
  it('exports the shell and remote navigation defaults', () => {
    expect(APP_NAME).toBe('modular-payments-console');
    expect(API_BASE_URL).toBe('http://localhost:3333/api');
    expect(REMOTE_ROUTE_META.billing.sections.map((section) => section.id)).toEqual([
      'overview',
      'charges',
      'plans',
    ]);
    expect(SHELL_NAV_GROUPS[0].items.map((item) => item.id)).toEqual([
      'billing',
      'wallet',
      'analytics',
    ]);
    expect(AUTH_ROUTES.login).toBe('/auth/login');
    expect(PRIVATE_HOME_ROUTE).toBe('/billing/overview');
  });
});
