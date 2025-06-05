import { BeforeInsert, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { TodoStatusEntity } from './todoStatus.entity';
import { BaseEntity } from '../shared/models/BaseEntity';
import { nanoid } from 'nanoid';
import { ApiProperty } from '@nestjs/swagger';
import { Filterable } from '../shared/decorators/filters/Filterable';
import { FindByValueFilter, FindInRange } from '../shared/filters/Filters';

@Entity('todos')
export class TodoEntity extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 50, generated: false })
  @ApiProperty()
  @Filterable(FindByValueFilter.GetInstance())
  public id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  @ApiProperty({ type: 'string' })
  public title: string;

  @Column({ type: 'mediumtext', nullable: true })
  @ApiProperty({ type: 'string' })
  public description: string | null;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, user => user.todos, { eager: true })
  public user: UserEntity;

  @Filterable(FindInRange.GetInstance())
  public userId: string;

  @ApiProperty({ type: () => TodoStatusEntity })
  @ManyToOne(() => TodoStatusEntity, todoStatus => todoStatus.todos, { eager: true })
  public status: TodoStatusEntity;

  @BeforeInsert()
  private fillIdColumn() {
    this.id = nanoid(10);
  }
}
