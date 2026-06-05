import { render, screen } from '@testing-library/react';
import { AuthProvider, useAuth } from './auth';

function AuthHarness() {
  const auth = useAuth();

  return <span>{auth.status}</span>;
}

describe('AuthProvider', () => {
  it('exposes the default anonymous state', () => {
    render(
      <AuthProvider>
        <AuthHarness />
      </AuthProvider>,
    );

    expect(screen.getByText('anonymous')).toBeTruthy();
  });
});
