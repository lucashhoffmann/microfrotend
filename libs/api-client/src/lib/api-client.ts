export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type HttpHeaders = Record<string, string>;

export interface RequestOptions<TBody = unknown> {
  method?: HttpMethod;
  headers?: HttpHeaders;
  body?: TBody;
  signal?: AbortSignal;
}

export interface ApiClientConfig {
  baseUrl: string;
  defaultHeaders?: HttpHeaders;
  fetcher?: typeof fetch;
}

export interface HttpClient {
  baseUrl: string;
  request<TResponse = unknown, TBody = unknown>(
    path: string,
    options?: RequestOptions<TBody>,
  ): Promise<TResponse>;
}

export function createApiClient({
  baseUrl,
  defaultHeaders = {},
  fetcher,
}: ApiClientConfig): HttpClient {
  return {
    baseUrl,
    async request<TResponse = unknown, TBody = unknown>(
      path: string,
      options: RequestOptions<TBody> = {},
    ) {
      const resolvedFetcher = fetcher ?? globalThis.fetch;

      if (!resolvedFetcher) {
        throw new Error('No fetch implementation is available for api-client.');
      }

      const { body, headers = {}, method = 'GET', signal } = options;
      const response = await resolvedFetcher(`${baseUrl}${path}`, {
        method,
        signal,
        headers: {
          ...defaultHeaders,
          ...headers,
          ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
        },
        body: body === undefined ? undefined : JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} for ${method} ${path}`);
      }

      if (response.status === 204) {
        return undefined as TResponse;
      }

      return (await response.json()) as TResponse;
    },
  };
}
