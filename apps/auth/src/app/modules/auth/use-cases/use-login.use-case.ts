import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@modular-payments-console/auth';
import { LoginInput } from '@modular-payments-console/contracts';
import { authService } from '../service/auth.service';

export function useLoginUseCase() {
  const setSession = useAuthStore(state => state.setSession);

  return useMutation({
    mutationFn: (input: LoginInput) => authService.login(input),
    onSuccess: session => {
      setSession(session);
    },
  });
}
