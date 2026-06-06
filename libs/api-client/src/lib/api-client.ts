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
  getAccessToken?: () => string | null;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface HttpClient {
  baseUrl: string;
  request<TResponse = unknown, TBody = unknown>(
    path: string,
    options?: RequestOptions<TBody>,
  ): Promise<TResponse>;
  get<TResponse = unknown>(
    path: string,
    options?: Omit<RequestOptions<never>, 'method' | 'body'>,
  ): Promise<TResponse>;
  post<TResponse = unknown, TBody = unknown>(
    path: string,
    body?: TBody,
    options?: Omit<RequestOptions<TBody>, 'method' | 'body'>,
  ): Promise<TResponse>;
}

async function parseResponseBody(response: Response) {
  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
}

export function createApiClient({
  baseUrl,
  defaultHeaders = {},
  fetcher,
  getAccessToken,
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
      const accessToken = getAccessToken?.();
      const hasAuthorizationHeader =
        headers['Authorization'] !== undefined ||
        headers['authorization'] !== undefined;
      const response = await resolvedFetcher(`${baseUrl}${path}`, {
        method,
        signal,
        headers: {
          ...defaultHeaders,
          ...headers,
          ...(accessToken &&
          !hasAuthorizationHeader
            ? {
                Authorization: `Bearer ${accessToken}`,
              }
            : {}),
          ...(body === undefined
            ? {}
            : {
                'Content-Type': 'application/json',
              }),
        },
        body: body === undefined ? undefined : JSON.stringify(body),
      });

      if (response.status === 204) {
        return undefined as TResponse;
      }

      const payload = await parseResponseBody(response);

      if (!response.ok) {
        const message =
          typeof payload === 'object' &&
          payload !== null &&
          'message' in payload &&
          typeof payload.message === 'string'
            ? payload.message
            : `HTTP ${response.status} for ${method} ${path}`;

        throw new ApiError(message, response.status, payload);
      }

      return payload as TResponse;
    },
    get(path, options) {
      return this.request(path, {
        ...options,
        method: 'GET',
      });
    },
    post(path, body, options) {
      return this.request(path, {
        ...options,
        method: 'POST',
        body,
      });
    },
  };
}
