import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ListResponse } from '../dto/ListResponse';
import { FilterModel } from '../filters/model';

@Injectable()
export class CrudService<Entity extends { id: string | number }> {
  constructor(private readonly entityRepository: Repository<Entity>) {}

  public async create(entity: any, ...entities: unknown[]): Promise<Entity> {
    const value = await this.entityRepository.save(this.entityRepository.create(entity));
    return value as unknown as Entity;
  }

  public async update(id: string | number, body: unknown) {
    const entity = await this.findOne(id);
    Object.assign(entity, body);
    await this.entityRepository.save(entity);
    return entity;
  }

  public async delete(id: string | number) {
    const entity = await this.findOne(id);
    await this.entityRepository.delete(id);
    return entity;
  }

  public async findOne(id: any) {
    const entity = await this.entityRepository.findOne({ where: { id: id } });
    if (!entity) {
      throw new NotFoundException();
    }
    return entity;
  }

  public async findAll(filters: FilterModel[]) {
    const queryBuilder = this.getQueryBuilder();
    for (const filter of filters) {
      const filterQuery = filter.filter.apply(queryBuilder.alias, filter.key, filter.value);
      queryBuilder.andWhere(filterQuery.query, filterQuery.params);
    }

    await this.appendFindQuery(queryBuilder);
    const queryResponse = await queryBuilder.getManyAndCount();
    const listResponse = new ListResponse<Entity>();
    listResponse.items = queryResponse[0];
    listResponse.totalCount = queryResponse[1];
    return listResponse;
  }

  protected async appendFindQuery(_query: SelectQueryBuilder<Entity>) {}

  private getQueryBuilder() {
    return this.entityRepository.createQueryBuilder();
  }
}
