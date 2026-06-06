import { AUTH_STORAGE_KEY } from '@modular-payments-console/config';
import { AuthSession, LoginInput, RegisterInput } from '@modular-payments-console/contracts';
import { z } from 'zod';
import { create } from 'zustand';
import {
  createJSONStorage,
  persist,
} from 'zustand/middleware';

export type AuthBootstrapStatus =
  | 'idle'
  | 'loading'
  | 'authenticated'
  | 'anonymous';

const AUTH_SYNC_EVENT = 'modular-payments-console:auth-sync';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must have at least 8 characters.'),
});

export const registerSchema = z.object({
  name: z.string().trim().min(2, 'Name must have at least 2 characters.'),
  email: z.string().email(),
  password: z.string().min(8, 'Password must have at least 8 characters.'),
});

export type LoginSchemaInput = z.infer<typeof loginSchema>;
export type RegisterSchemaInput = z.infer<typeof registerSchema>;

export interface AuthStoreState {
  token: string | null;
  session: AuthSession | null;
  bootstrapStatus: AuthBootstrapStatus;
  setBootstrapStatus: (status: AuthBootstrapStatus) => void;
  setSession: (session: AuthSession) => void;
  hydrateSession: (session: AuthSession) => void;
  clearSession: () => void;
  logout: () => void;
}

interface PersistedAuthState {
  state?: {
    token?: string | null;
    session?: AuthSession | null;
  };
}

type BrowserStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

const noopStorage: BrowserStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

function getBrowserStorage(): BrowserStorage {
  if (typeof window === 'undefined') {
    return noopStorage;
  }

  try {
    return window.localStorage;
  } catch {
    return noopStorage;
  }
}

function emitAuthSyncEvent() {
  if (typeof window === 'undefined') {
    return;
  }

  queueMicrotask(() => {
    window.dispatchEvent(new CustomEvent(AUTH_SYNC_EVENT));
  });
}

export function readPersistedAuthState() {
  const rawValue = getBrowserStorage().getItem(AUTH_STORAGE_KEY);

  if (!rawValue) {
    return {
      token: null,
      session: null,
    };
  }

  try {
    const parsedValue = JSON.parse(rawValue) as PersistedAuthState;

    return {
      token: parsedValue.state?.token ?? null,
      session: parsedValue.state?.session ?? null,
    };
  } catch {
    return {
      token: null,
      session: null,
    };
  }
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      token: null,
      session: null,
      bootstrapStatus: 'idle',
      setBootstrapStatus: (bootstrapStatus) => {
        set({ bootstrapStatus });
      },
      setSession: (session) => {
        set({
          session,
          token: session.token,
          bootstrapStatus: 'authenticated',
        });
        emitAuthSyncEvent();
      },
      hydrateSession: (session) => {
        set({
          session,
          token: session.token,
          bootstrapStatus: 'authenticated',
        });
        emitAuthSyncEvent();
      },
      clearSession: () => {
        set({
          token: null,
          session: null,
          bootstrapStatus: 'anonymous',
        });
        emitAuthSyncEvent();
      },
      logout: () => {
        set({
          token: null,
          session: null,
          bootstrapStatus: 'anonymous',
        });
        emitAuthSyncEvent();
      },
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(getBrowserStorage),
      partialize: (state) => ({
        token: state.token,
        session: state.session,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) {
          return;
        }

        state.bootstrapStatus = state.token ? 'idle' : 'anonymous';
      },
    },
  ),
);

export const authSelectors = {
  token: (state: AuthStoreState) => state.token,
  session: (state: AuthStoreState) => state.session,
  user: (state: AuthStoreState) => state.session?.user ?? null,
  bootstrapStatus: (state: AuthStoreState) => state.bootstrapStatus,
  isAuthenticated: (state: AuthStoreState) => Boolean(state.session?.token),
};

export function hydrateSession(session: AuthSession) {
  useAuthStore.getState().hydrateSession(session);
}

export function clearSession() {
  useAuthStore.getState().clearSession();
}

export function syncAuthStoreFromStorage() {
  const { session, token } = readPersistedAuthState();

  useAuthStore.setState({
    token,
    session,
    bootstrapStatus: token ? (session ? 'authenticated' : 'idle') : 'anonymous',
  });
}

export function subscribeToAuthSync() {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const handleSync = () => {
    syncAuthStoreFromStorage();
  };

  window.addEventListener(AUTH_SYNC_EVENT, handleSync);

  return () => {
    window.removeEventListener(AUTH_SYNC_EVENT, handleSync);
  };
}

export function getAccessToken() {
  return useAuthStore.getState().token;
}

export type { AuthSession, LoginInput, RegisterInput };
