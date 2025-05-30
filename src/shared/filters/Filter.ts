import { FilterQuery } from './model';

export abstract class Filter<T> {
  public abstract apply(alias: string, key: string, value: T): FilterQuery;
}
