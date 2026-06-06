import { render, screen } from '@testing-library/react';
import { Card, CardContent, CardHeader, CardTitle } from './card';

describe('Card', () => {
  it('renders title and content', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Example card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Rendered from the ui library.</p>
        </CardContent>
      </Card>,
    );

    expect(screen.getByText('Example card')).toBeTruthy();
    expect(screen.getByText(/rendered from the ui library/i)).toBeTruthy();
  });
});
