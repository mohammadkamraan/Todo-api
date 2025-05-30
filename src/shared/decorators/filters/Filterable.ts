import { Filter } from '../../filters/Filter';

export function Filterable(filter: Filter<unknown>) {
  return function FilterableDecorator(target: any, propertyKey: string) {
    const targetPrototype = target.constructor.prototype;
    if (!targetPrototype.filters) {
      targetPrototype.filters = new Map<string, Filter<unknown>>();
    }
    targetPrototype.filters.set(propertyKey, filter);
  };
}
