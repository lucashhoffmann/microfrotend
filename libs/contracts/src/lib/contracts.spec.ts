import { AppRouteDefinition, RemoteDefinition } from './contracts';

describe('contracts', () => {
  it('defines base route contracts for remotes', () => {
    const homeRoute: AppRouteDefinition<'home'> = {
      id: 'home',
      label: 'Home',
      path: '/',
    };
    const billingRemote: RemoteDefinition = {
      id: 'billing',
      label: 'Billing',
      path: '/billing',
      headline: 'Billing Remote Loaded',
      summary: 'Placeholder only',
    };

    expect(homeRoute.path).toBe('/');
    expect(billingRemote.id).toBe('billing');
  });
});
