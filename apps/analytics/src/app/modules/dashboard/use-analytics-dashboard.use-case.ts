import { useQuery } from '@tanstack/react-query';
import { createApiClient } from '@modular-payments-console/api-client';
import { getAccessToken } from '@modular-payments-console/auth';
import { API_BASE_URL, REMOTE_ROUTE_META } from '@modular-payments-console/config';
import { RemoteDashboardResponse } from '@modular-payments-console/contracts';

const analyticsApiClient = createApiClient({
  baseUrl: API_BASE_URL,
  getAccessToken,
});

export function useAnalyticsDashboardUseCase() {
  return useQuery({
    queryKey: ['analytics-dashboard'],
    queryFn: () =>
      analyticsApiClient.get<RemoteDashboardResponse>(
        REMOTE_ROUTE_META.analytics.dashboardPath,
      ),
  });
}
