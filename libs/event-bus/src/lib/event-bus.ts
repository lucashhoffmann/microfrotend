import { AppEventMap } from '@modular-payments-console/contracts';

export type EventHandler<TPayload> = (payload: TPayload) => void;

export interface EventBus<TEvents extends AppEventMap> {
  publish<TKey extends keyof TEvents & string>(
    event: TKey,
    payload: TEvents[TKey],
  ): void;
  subscribe<TKey extends keyof TEvents & string>(
    event: TKey,
    handler: EventHandler<TEvents[TKey]>,
  ): () => void;
  clear(): void;
}

export function createEventBus<
  TEvents extends AppEventMap,
>(): EventBus<TEvents> {
  const listeners = new Map<string, Set<(payload: unknown) => void>>();

  return {
    publish(event, payload) {
      listeners.get(event)?.forEach((listener) => listener(payload));
    },
    subscribe(event, handler) {
      const eventName = event as string;
      const registeredHandler = handler as (payload: unknown) => void;
      const handlers =
        listeners.get(eventName) ?? new Set<(payload: unknown) => void>();

      handlers.add(registeredHandler);
      listeners.set(eventName, handlers);

      return () => {
        handlers.delete(registeredHandler);

        if (handlers.size === 0) {
          listeners.delete(eventName);
        }
      };
    },
    clear() {
      listeners.clear();
    },
  };
}
