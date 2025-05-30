import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TodoCreateRequestBody } from './todo.dto';
import { TodoService } from './todo.service';
import { TodoEntity } from './todo.entity';
import { Auth } from '../authentication/auth.decorator';
import { UserId } from '../user/userId.decorator';
import { Filters } from '../shared/decorators/filters/QueryFilter';
import { FilterModel } from '../shared/filters/model';

@Auth()
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create')
  public async create(
    @Body() body: TodoCreateRequestBody,
    @UserId() userId: string,
  ): Promise<TodoEntity> {
    return await this.todoService.create(body, userId);
  }

  @Put('update/:todoId')
  public async update(@Param('todoId') todoId: string, @Body() body: TodoCreateRequestBody) {
    return await this.todoService.update(todoId, body);
  }

  @Delete('delete/:todoId')
  public async delete(@Param('todoId') todoId: string) {
    return await this.todoService.delete(todoId);
  }

  @Get('/list')
  public async getTodos(
    @Query() query: TodoEntity,
    @Filters(new TodoEntity()) filters: FilterModel[],
  ) {
    return await this.todoService.findAll(filters);
  }

  @Get(':todoId')
  public async getTodoById(@Param('todoId') todoId: string) {
    return await this.todoService.findOne(todoId);
  }
}
