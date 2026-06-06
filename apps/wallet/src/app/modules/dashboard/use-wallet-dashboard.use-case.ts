import { useQuery } from '@tanstack/react-query';
import { createApiClient } from '@modular-payments-console/api-client';
import { getAccessToken } from '@modular-payments-console/auth';
import { API_BASE_URL, REMOTE_ROUTE_META } from '@modular-payments-console/config';
import { RemoteDashboardResponse } from '@modular-payments-console/contracts';

const walletApiClient = createApiClient({
  baseUrl: API_BASE_URL,
  getAccessToken,
});

export function useWalletDashboardUseCase() {
  return useQuery({
    queryKey: ['wallet-dashboard'],
    queryFn: () =>
      walletApiClient.get<RemoteDashboardResponse>(
        REMOTE_ROUTE_META.wallet.dashboardPath,
      ),
  });
}
