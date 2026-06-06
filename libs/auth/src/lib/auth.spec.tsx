import {
  authSelectors,
  clearSession,
  hydrateSession,
  loginSchema,
  readPersistedAuthState,
  registerSchema,
  syncAuthStoreFromStorage,
  useAuthStore,
} from './auth';
import { AUTH_STORAGE_KEY } from '@modular-payments-console/config';

describe('auth store', () => {
  beforeEach(() => {
    window.localStorage.clear();
    clearSession();
  });

  it('validates login and register schemas', () => {
    expect(
      loginSchema.safeParse({
        email: 'demo@modular-payments.local',
        password: 'Password123!',
      }).success,
    ).toBe(true);

    expect(
      registerSchema.safeParse({
        name: 'Demo Operator',
        email: 'demo@modular-payments.local',
        password: 'Password123!',
      }).success,
    ).toBe(true);
  });

  it('hydrates and clears the shared session', () => {
    hydrateSession({
      token: 'mock-token:user_demo',
      user: {
        id: 'user_demo',
        name: 'Demo Operator',
        email: 'demo@modular-payments.local',
      },
    });

    expect(authSelectors.isAuthenticated(useAuthStore.getState())).toBe(true);
    expect(authSelectors.user(useAuthStore.getState())?.name).toBe(
      'Demo Operator',
    );

    clearSession();

    expect(authSelectors.isAuthenticated(useAuthStore.getState())).toBe(false);
    expect(useAuthStore.getState().token).toBeNull();
  });

  it('restores the auth store from persisted storage', () => {
    window.localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        state: {
          token: 'mock-token:user_demo',
          session: {
            token: 'mock-token:user_demo',
            user: {
              id: 'user_demo',
              name: 'Demo Operator',
              email: 'demo@modular-payments.local',
            },
          },
        },
      }),
    );

    expect(readPersistedAuthState().token).toBe('mock-token:user_demo');

    syncAuthStoreFromStorage();

    expect(authSelectors.isAuthenticated(useAuthStore.getState())).toBe(true);
    expect(authSelectors.user(useAuthStore.getState())?.email).toBe(
      'demo@modular-payments.local',
    );
  });
});
