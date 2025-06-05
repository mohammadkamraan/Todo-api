import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TodoCreateRequestBody, TodoFilterQueryDto, TodoListResponse } from './todo.dto';
import { TodoService } from './todo.service';
import { TodoEntity } from './todo.entity';
import { Auth } from '../authentication/auth.decorator';
import { UserId } from '../user/userId.decorator';
import { Filters } from '../shared/decorators/filters/QueryFilter';
import { FilterModel } from '../shared/filters/model';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Auth()
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('create')
  @ApiCreatedResponse({ type: TodoEntity })
  public async create(
    @Body() body: TodoCreateRequestBody,
    @UserId() userId: string,
  ): Promise<TodoEntity> {
    return await this.todoService.create(body, userId);
  }

  @Put('update/:todoId')
  @ApiOkResponse({ type: TodoEntity })
  public async update(@Param('todoId') todoId: string, @Body() body: TodoCreateRequestBody) {
    return await this.todoService.update(todoId, body);
  }

  @Delete('delete/:todoId')
  @ApiOkResponse({ type: TodoEntity })
  public async delete(@Param('todoId') todoId: string) {
    return await this.todoService.delete(todoId);
  }

  @Get('/list')
  @ApiOkResponse({ type: TodoListResponse })
  public async getTodos(
    @Query() query: TodoFilterQueryDto,
    @Filters(new TodoEntity()) filters: FilterModel[],
  ) {
    return await this.todoService.findAll(filters);
  }

  @Get(':todoId')
  @ApiOkResponse({ type: TodoEntity })
  public async getTodoById(@Param('todoId') todoId: string) {
    return await this.todoService.findOne(todoId);
  }
}
