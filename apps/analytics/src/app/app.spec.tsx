import { render, screen } from '@testing-library/react';

import App from './app';

describe('App', () => {
  it('renders the analytics placeholder', () => {
    render(<App />);

    expect(screen.getByText(/analytics remote loaded/i)).toBeTruthy();
    expect(
      screen.getByText(/future analytics dashboards and reporting contracts/i),
    ).toBeTruthy();
  });
});
