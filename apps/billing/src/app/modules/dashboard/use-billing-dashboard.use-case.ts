import { useQuery } from '@tanstack/react-query';
import { createApiClient } from '@modular-payments-console/api-client';
import { getAccessToken } from '@modular-payments-console/auth';
import { API_BASE_URL, REMOTE_ROUTE_META } from '@modular-payments-console/config';
import { RemoteDashboardResponse } from '@modular-payments-console/contracts';

const billingApiClient = createApiClient({
  baseUrl: API_BASE_URL,
  getAccessToken,
});

export function useBillingDashboardUseCase() {
  return useQuery({
    queryKey: ['billing-dashboard'],
    queryFn: () =>
      billingApiClient.get<RemoteDashboardResponse>(
        REMOTE_ROUTE_META.billing.dashboardPath,
      ),
  });
}
