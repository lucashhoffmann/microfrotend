import { Navigate, Route, Routes } from 'react-router-dom';
import { AUTH_ROUTES } from '@modular-payments-console/config';
import { AuthPage } from '../../resources/pages/auth/auth.page';
import { LoginView } from '../../resources/pages/auth/views/login/login.view';
import { RegisterView } from '../../resources/pages/auth/views/register/register.view';

function AuthRouter() {
  return (
    <Routes>
      <Route index element={<Navigate replace to="login" />} />
      <Route
        path="login"
        element={
          <AuthPage
            title="Sign in to the shell"
            description="Use the dedicated auth remote to restore a mock session and unlock the private shell."
            alternatePath={AUTH_ROUTES.register}
            alternateLabel="Create account"
            alternatePrompt="Need a fresh demo account?"
          >
            <LoginView />
          </AuthPage>
        }
      />
      <Route
        path="register"
        element={
          <AuthPage
            title="Create a demo operator"
            description="Register a new mock operator and enter the protected shell immediately after the mutation succeeds."
            alternatePath={AUTH_ROUTES.login}
            alternateLabel="Back to sign in"
            alternatePrompt="Already have a mock account?"
          >
            <RegisterView />
          </AuthPage>
        }
      />
      <Route path="*" element={<Navigate replace to="login" />} />
    </Routes>
  );
}

export default AuthRouter;
