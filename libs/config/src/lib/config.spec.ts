import {
  API_CONFIG,
  APP_NAME,
  REMOTE_NAVIGATION,
  SHELL_NAVIGATION,
} from './config';

describe('config', () => {
  it('exports the shell and remote navigation defaults', () => {
    expect(APP_NAME).toBe('modular-payments-console');
    expect(API_CONFIG.baseUrl).toBe('/api');
    expect(REMOTE_NAVIGATION.map((remote) => remote.id)).toEqual([
      'billing',
      'wallet',
      'analytics',
    ]);
    expect(SHELL_NAVIGATION[0].path).toBe('/');
  });
});
