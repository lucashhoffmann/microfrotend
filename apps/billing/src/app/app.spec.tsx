import { render, screen } from '@testing-library/react';

import App from './app';

describe('App', () => {
  it('renders the billing placeholder', () => {
    render(<App />);

    expect(screen.getByText(/billing remote loaded/i)).toBeTruthy();
    expect(
      screen.getByText(/future billing flows and internal patterns/i),
    ).toBeTruthy();
  });
});
