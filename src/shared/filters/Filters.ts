import { Filter } from './Filter';
import { FilterQuery } from './model';

export class FindByValueFilter extends Filter<string> {
  private static Instance: FindByValueFilter | null = null;

  private constructor() {
    super();
  }

  public apply(alias: string, key: string, value: string): FilterQuery {
    return new FilterQuery(`${alias}.${key} = :${key}`, {
      [key]: value,
    });
  }

  public static GetInstance() {
    if (!FindByValueFilter.Instance) {
      FindByValueFilter.Instance = new FindByValueFilter();
    }
    return FindByValueFilter.Instance;
  }
}

export class FindInRange extends Filter<string> {
  private static Instance: FindInRange | null = null;

  private constructor() {
    super();
  }

  public apply(alias: string, key: string, value: string): FilterQuery {
    const values = this.getValuesInArray(value);
    return new FilterQuery(`${alias}.${key} IN (:...${key})`, {
      [key]: values,
    });
  }

  private getValuesInArray(value: string) {
    return value.split(',');
  }

  public static GetInstance() {
    if (!FindInRange.Instance) {
      FindInRange.Instance = new FindInRange();
    }
    return FindInRange.Instance;
  }
}
