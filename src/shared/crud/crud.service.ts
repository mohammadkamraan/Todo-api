import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

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
}
