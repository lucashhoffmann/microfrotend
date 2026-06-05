import { createApiClient } from './api-client';

describe('apiClient', () => {
  it('creates a lightweight fetch-based client', async () => {
    const fetcher = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ ready: true }),
    });
    const client = createApiClient({
      baseUrl: '/api',
      fetcher: fetcher as typeof fetch,
    });

    const response = await client.request('/status', {
      method: 'POST',
      body: { source: 'test' },
      headers: { 'x-source': 'spec' },
    });

    expect(fetcher).toHaveBeenCalledWith('/api/status', {
      method: 'POST',
      signal: undefined,
      headers: {
        'Content-Type': 'application/json',
        'x-source': 'spec',
      },
      body: JSON.stringify({ source: 'test' }),
    });
    expect(response).toEqual({ ready: true });
  });
});
