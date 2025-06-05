import { Injectable } from '@nestjs/common';
import { CrudService } from '../shared/crud/crud.service';
import { TodoEntity } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { TodoCreateRequestBody } from './todo.dto';

@Injectable()
export class TodoService extends CrudService<TodoEntity> {
  constructor(
    @InjectRepository(TodoEntity) private readonly todoRepository: Repository<TodoEntity>,
  ) {
    super(todoRepository);
  }

  public override async create(body: TodoCreateRequestBody, userId: string): Promise<TodoEntity> {
    body.user = userId;
    const todoEntity = await super.create(body);
    return this.findOne(todoEntity.id);
  }

  protected override async appendFindQuery(query: SelectQueryBuilder<TodoEntity>): Promise<void> {
    query.leftJoinAndSelect(`${query.alias}.user`, 'user');
    query.leftJoinAndSelect(`${query.alias}.status`, 'status');
  }
}
