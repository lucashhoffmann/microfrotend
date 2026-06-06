import { render, screen } from '@testing-library/react';
import App from './app';

describe('Wallet App', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.pushState({}, 'Wallet', '/wallet/overview');
  });

  it('renders the overview route in standalone mode', async () => {
    render(<App />);

    expect(
      await screen.findByRole('heading', { name: /wallet operations hub/i }),
    ).toBeTruthy();
  });
});
