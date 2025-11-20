import { DddEvent } from '@libs/ddd';
import { CommonDispatcher } from '@common/event-box';

export function EventHandler(
  event: new (...args: any[]) => DddEvent,
  queue: string,
  options?: { description?: string }
): MethodDecorator {
  return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    CommonDispatcher.pushEventMap(new event(), queue);
    return descriptor;
  };
}
