import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { TodoStatusEntity } from './todoStatus.entity';
import { BaseEntity } from '../shared/models/BaseEntity';
import { nanoid } from 'nanoid';

@Entity('todos')
export class TodoEntity extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 50, generated: false })
  public id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  public title: string;

  @Column({ type: 'mediumtext', nullable: true })
  public description: string | null;

  @ManyToOne(() => UserEntity, user => user.todos)
  public user: UserEntity;

  @ManyToOne(() => TodoStatusEntity, todoStatus => todoStatus.todos)
  public status: TodoStatusEntity;

  @BeforeInsert()
  private fillIdColumn() {
    this.id = nanoid(10);
  }
}
