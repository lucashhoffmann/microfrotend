import {
  AppRouteDefinition,
  AppShellRouteId,
  RemoteDefinition,
  RemoteId,
} from '@modular-payments-console/contracts';

export const APP_NAME = 'modular-payments-console';
export const APP_TITLE = 'Modular Payments Console';

export const API_CONFIG = {
  baseUrl: '/api',
} as const;

export const REMOTE_DEFINITIONS: Record<RemoteId, RemoteDefinition> = {
  billing: {
    id: 'billing',
    label: 'Billing',
    path: '/billing',
    headline: 'Billing Remote Loaded',
    summary: 'Placeholder for future billing flows and internal patterns.',
  },
  wallet: {
    id: 'wallet',
    label: 'Wallet',
    path: '/wallet',
    headline: 'Wallet Remote Loaded',
    summary: 'Placeholder for future wallet experiences and integration rules.',
  },
  analytics: {
    id: 'analytics',
    label: 'Analytics',
    path: '/analytics',
    headline: 'Analytics Remote Loaded',
    summary:
      'Placeholder for future analytics dashboards and reporting contracts.',
  },
};

export const REMOTE_NAVIGATION: RemoteDefinition[] = [
  REMOTE_DEFINITIONS.billing,
  REMOTE_DEFINITIONS.wallet,
  REMOTE_DEFINITIONS.analytics,
];

export const SHELL_NAVIGATION: AppRouteDefinition<AppShellRouteId>[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
  },
  ...REMOTE_NAVIGATION.map(({ id, label, path }) => ({
    id,
    label,
    path,
  })),
];
