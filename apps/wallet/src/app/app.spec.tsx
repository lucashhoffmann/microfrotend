import { render, screen } from '@testing-library/react';

import App from './app';

describe('App', () => {
  it('renders the wallet placeholder', () => {
    render(<App />);

    expect(screen.getByText(/wallet remote loaded/i)).toBeTruthy();
    expect(
      screen.getByText(/future wallet experiences and integration rules/i),
    ).toBeTruthy();
  });
});
