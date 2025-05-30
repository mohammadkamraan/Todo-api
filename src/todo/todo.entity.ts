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
  @ApiProperty({ required: false })
  @Filterable(FindByValueFilter.GetInstance())
  public id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  public title: string;

  @Column({ type: 'mediumtext', nullable: true })
  public description: string | null;

  @ManyToOne(() => UserEntity, user => user.todos, { eager: true })
  public user: UserEntity;

  @ApiProperty({ required: false })
  @Filterable(FindInRange.GetInstance())
  public userId: string;

  @ManyToOne(() => TodoStatusEntity, todoStatus => todoStatus.todos, { eager: true })
  public status: TodoStatusEntity;

  @BeforeInsert()
  private fillIdColumn() {
    this.id = nanoid(10);
  }
}
