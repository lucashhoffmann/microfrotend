import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@modular-payments-console/auth';
import { RegisterInput } from '@modular-payments-console/contracts';
import { authService } from '../service/auth.service';

export function useRegisterUseCase() {
  const setSession = useAuthStore(state => state.setSession);

  return useMutation({
    mutationFn: (input: RegisterInput) => authService.register(input),
    onSuccess: session => {
      setSession(session);
    },
  });
}
