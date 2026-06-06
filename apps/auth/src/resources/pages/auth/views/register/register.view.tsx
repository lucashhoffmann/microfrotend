import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import {
  PRIVATE_HOME_ROUTE,
} from '@modular-payments-console/config';
import {
  registerSchema,
  type RegisterSchemaInput,
} from '@modular-payments-console/auth';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@modular-payments-console/ui';
import { useRegisterUseCase } from '../../../../../app/modules/auth/use-cases/use-register.use-case';
import { applyZodFieldErrors } from '../../../../../shared/forms/apply-zod-field-errors';

export function RegisterView() {
  const navigate = useNavigate();
  const register = useRegisterUseCase();
  const form = useForm<RegisterSchemaInput>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const handleSubmit = form.handleSubmit(async values => {
    const parsedValues = applyZodFieldErrors(form, registerSchema, values);

    if (!parsedValues) {
      return;
    }

    try {
      await register.mutateAsync(parsedValues);
      toast.success('Demo operator created.');
      navigate(PRIVATE_HOME_ROUTE, { replace: true });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to create account.';
      toast.error(message);
    }
  });

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Alex Operator" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="operator@company.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="At least 8 characters" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={register.isPending} type="submit">
          {register.isPending ? 'Creating account...' : 'Create account'}
        </Button>
      </form>
    </Form>
  );
}
