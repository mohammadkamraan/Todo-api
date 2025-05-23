import { ApiProperty } from '@nestjs/swagger';

export class TodoCreateRequestBody {
  @ApiProperty({ type: 'string', example: 'Read book', required: true })
  public title: string;

  @ApiProperty({ nullable: true, required: false, example: 'Todo description', type: 'string' })
  public description: string | null;

  @ApiProperty({ nullable: false, required: true, example: 1, type: 'number' })
  public statusId: number;

  public user: string;
}
