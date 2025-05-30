import { Filter } from './Filter';

export class FilterQuery {
  public query: string;
  public params: Record<string, unknown>;

  constructor(query: string, params: Record<string, unknown>) {
    this.query = query;
    this.params = params;
  }
}

export class FilterModel {
  public key: string;
  public value: unknown;
  public filter: Filter<unknown>;
}
