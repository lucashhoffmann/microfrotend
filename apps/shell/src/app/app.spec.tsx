import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from './app';

describe('App', () => {
  it('renders the shell landing page', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    expect(
      screen.getByRole('heading', { name: /modular payments console/i }),
    ).toBeTruthy();
    expect(
      screen.getByText(/shell ready to orchestrate remotes/i),
    ).toBeTruthy();
  });

  it('shows navigation links for all remotes', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    expect(screen.getByRole('link', { name: 'Billing' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Wallet' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Analytics' })).toBeTruthy();
  });
});
