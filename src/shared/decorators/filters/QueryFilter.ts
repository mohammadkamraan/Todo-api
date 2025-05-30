import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { Filter } from '../../filters/Filter';
import { FilterModel } from '../../filters/model';

export const Filters = createParamDecorator((modelInstance: object, context: ExecutionContext) => {
  const filters: FilterModel[] = [];
  const query = context.switchToHttp().getRequest().query;
  Object.assign(modelInstance, query);
  const modelFilters: Map<string, Filter<unknown>> = modelInstance.constructor.prototype.filters;
  for (const key in query) {
    const filter = modelFilters.get(key);
    if (!filter) {
      throw new InternalServerErrorException();
    }
    filters.push({ key: key, value: query[key], filter: filter });
  }
  return filters;
});
