import { createApiClient } from '@modular-payments-console/api-client';
import { API_BASE_URL } from '@modular-payments-console/config';
import { AuthSession, LoginInput, RegisterInput } from '@modular-payments-console/contracts';

const authApiClient = createApiClient({
  baseUrl: API_BASE_URL,
});

export const authService = {
  login(input: LoginInput) {
    return authApiClient.post<AuthSession, LoginInput>('/auth/login', input);
  },
  register(input: RegisterInput) {
    return authApiClient.post<AuthSession, RegisterInput>(
      '/auth/register',
      input,
    );
  },
};
