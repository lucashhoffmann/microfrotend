import { ActivityStatus, RemoteId } from '@modular-payments-console/contracts';
import { BadgeProps } from './badge';

export function getRemoteBadgeVariant(
  remoteId: RemoteId,
): NonNullable<BadgeProps['variant']> {
  switch (remoteId) {
    case 'billing':
      return 'info';
    case 'wallet':
      return 'success';
    case 'analytics':
      return 'violet';
  }
}

export function getActivityStatusBadgeVariant(
  status: ActivityStatus,
): NonNullable<BadgeProps['variant']> {
  switch (status) {
    case 'ready':
      return 'success';
    case 'queued':
      return 'warning';
    case 'in-progress':
      return 'info';
    case 'complete':
      return 'success';
    case 'attention':
      return 'danger';
  }
}
