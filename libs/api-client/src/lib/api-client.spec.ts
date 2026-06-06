import { createApiClient } from './api-client';

describe('apiClient', () => {
  it('creates a lightweight fetch-based client with auth support', async () => {
    const fetcher = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: {
        get: () => 'application/json',
      },
      json: async () => ({ ready: true }),
    });
    const client = createApiClient({
      baseUrl: 'http://localhost:3333/api',
      fetcher: fetcher as typeof fetch,
      getAccessToken: () => 'mock-token:user_demo',
    });

    const response = await client.post('/status', { source: 'test' }, {
      headers: { 'x-source': 'spec' },
    });

    expect(fetcher).toHaveBeenCalledWith('http://localhost:3333/api/status', {
      method: 'POST',
      signal: undefined,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer mock-token:user_demo',
        'x-source': 'spec',
      },
      body: JSON.stringify({ source: 'test' }),
    });
    expect(response).toEqual({ ready: true });
  });
});
