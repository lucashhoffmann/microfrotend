import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import {
  DEMO_CREDENTIALS,
  PRIVATE_HOME_ROUTE,
} from '@modular-payments-console/config';
import {
  loginSchema,
  type LoginSchemaInput,
} from '@modular-payments-console/auth';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@modular-payments-console/ui';
import { useLoginUseCase } from '../../../../../app/modules/auth/use-cases/use-login.use-case';
import { applyZodFieldErrors } from '../../../../../shared/forms/apply-zod-field-errors';

export function LoginView() {
  const navigate = useNavigate();
  const login = useLoginUseCase();
  const form = useForm<LoginSchemaInput>({
    defaultValues: {
      email: DEMO_CREDENTIALS.email,
      password: DEMO_CREDENTIALS.password,
    },
  });

  const handleSubmit = form.handleSubmit(async values => {
    const parsedValues = applyZodFieldErrors(form, loginSchema, values);

    if (!parsedValues) {
      return;
    }

    try {
      await login.mutateAsync(parsedValues);
      toast.success('Shell session restored.');
      navigate(PRIVATE_HOME_ROUTE, { replace: true });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to sign in.';
      toast.error(message);
    }
  });

  return (
    <div className="space-y-5">
      <Form {...form}>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" disabled={login.isPending} type="submit">
            {login.isPending ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </Form>

      <Card className="border-dashed border-border/80 bg-background/70 shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Demo credentials</CardTitle>
          <CardDescription>
            The form starts prefilled so the shell can be validated immediately.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>
            <strong>Email:</strong> {DEMO_CREDENTIALS.email}
          </p>
          <p>
            <strong>Password:</strong> {DEMO_CREDENTIALS.password}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
