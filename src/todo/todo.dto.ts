import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class TodoCreateRequestBody {
  @ApiProperty({ type: 'string', example: 'Read book', required: true })
  @IsNotEmpty()
  @MaxLength(50)
  public title: string;

  @ApiProperty({ nullable: true, required: false, example: 'Todo description', type: 'string' })
  public description: string | null;

  @ApiProperty({ nullable: false, required: true, example: 1, type: 'number' })
  @IsNumber()
  public statusId: number;

  public user: string;
}
