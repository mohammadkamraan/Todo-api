import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';
import { ListResponse } from '../shared/dto/ListResponse';
import { TodoEntity } from './todo.entity';

export class TodoCreateRequestBody {
  @ApiProperty({ type: 'string', example: 'Read book', required: true })
  @IsNotEmpty()
  @MaxLength(50)
  public title: string;

  @ApiProperty({ nullable: true, required: false, example: 'Todo description', type: 'string' })
  public description: string | null;

  @ApiProperty({ nullable: false, required: true, example: 1, type: 'number' })
  @IsNumber()
  public status: number;

  public user: string;
}

export class TodoFilterQueryDto {
  @ApiProperty({ type: 'string', required: false })
  public id: string;

  @ApiProperty({ type: 'string', required: false })
  public userId: string;
}

export class TodoListResponse extends ListResponse<TodoEntity> {
  @ApiProperty({ type: 'number' })
  public totalCount: number;

  @ApiProperty({ type: [TodoEntity] })
  public items: TodoEntity[];
}
