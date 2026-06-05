import { render, screen } from '@testing-library/react';
import { Card } from './card';

describe('Card', () => {
  it('renders title and content', () => {
    render(
      <Card eyebrow="Shared UI" title="Example card">
        <p>Rendered from the ui library.</p>
      </Card>,
    );

    expect(screen.getByText('Example card')).toBeTruthy();
    expect(screen.getByText(/rendered from the ui library/i)).toBeTruthy();
  });
});
