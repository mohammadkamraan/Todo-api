import { AfterLoad, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

@Entity('BaseEntity', {})
export class BaseEntity {
  @CreateDateColumn({ type: 'datetime' })
  @ApiProperty({ type: Date, readOnly: true, writeOnly: false })
  public createdAt: Date;

  @ApiProperty({ type: Date })
  @UpdateDateColumn({ type: 'datetime' })
  public updatedAt: Date;

  @ApiProperty({ type: 'number', example: 1685940874 })
  public createdAtUnix: number;

  @ApiProperty({ type: 'number', example: 1685940874 })
  public updatedAtUnix: number;

  @AfterLoad()
  public fillUnixValues() {
    this.createdAtUnix = this.createdAt.getTime() / 1000;
    this.updatedAtUnix = this.updatedAt.getTime() / 1000;
  }
}
