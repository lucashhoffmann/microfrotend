import { render, screen } from '@testing-library/react';
import App from './app';

describe('Billing App', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.pushState({}, 'Billing', '/billing/overview');
  });

  it('renders the overview route in standalone mode', async () => {
    render(<App />);

    expect(
      await screen.findByRole('heading', { name: /billing command center/i }),
    ).toBeTruthy();
  });
});
