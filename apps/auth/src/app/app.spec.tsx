import { render, screen } from '@testing-library/react';
import App from './app';

describe('Auth App', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the login view in standalone mode', async () => {
    window.history.pushState({}, 'Auth', '/auth/login');

    render(<App />);

    expect(
      await screen.findByRole('heading', { name: /sign in to the shell/i }),
    ).toBeTruthy();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeTruthy();
  });
});
