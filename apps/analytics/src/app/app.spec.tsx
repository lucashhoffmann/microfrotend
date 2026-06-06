import { render, screen } from '@testing-library/react';
import App from './app';

describe('Analytics App', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.pushState({}, 'Analytics', '/analytics/overview');
  });

  it('renders the overview route in standalone mode', async () => {
    render(<App />);

    expect(
      await screen.findByRole('heading', { name: /analytics insight center/i }),
    ).toBeTruthy();
  });
});
