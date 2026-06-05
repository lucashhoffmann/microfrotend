import { PropsWithChildren, createContext, useContext } from 'react';

export type AuthStatus = 'unknown' | 'anonymous' | 'authenticated';

export interface AuthContextValue {
  status: AuthStatus;
  isAuthenticated: boolean;
  userId?: string;
}

export interface AuthProviderProps extends PropsWithChildren {
  value?: AuthContextValue;
}

export const defaultAuthContextValue: AuthContextValue = {
  status: 'anonymous',
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextValue>(defaultAuthContextValue);

export function AuthProvider({ children, value }: AuthProviderProps) {
  return (
    <AuthContext.Provider value={value ?? defaultAuthContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
