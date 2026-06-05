export type RemoteId = 'billing' | 'wallet' | 'analytics';

export type AppShellRouteId = 'home' | RemoteId;

export type AppEventMap = Record<string, unknown>;

export interface AppRouteDefinition<TId extends string = string> {
  id: TId;
  label: string;
  path: string;
  description?: string;
}

export interface RemoteDefinition extends AppRouteDefinition<RemoteId> {
  headline: string;
  summary: string;
}
