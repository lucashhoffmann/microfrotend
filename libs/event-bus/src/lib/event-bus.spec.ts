import { createEventBus } from './event-bus';

describe('eventBus', () => {
  it('publishes payloads to subscribers and unsubscribes cleanly', () => {
    const bus = createEventBus<{
      greeting: { value: string };
    }>();
    const listener = jest.fn();

    const unsubscribe = bus.subscribe('greeting', listener);

    bus.publish('greeting', { value: 'hello' });
    unsubscribe();
    bus.publish('greeting', { value: 'goodbye' });

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith({ value: 'hello' });
  });
});
