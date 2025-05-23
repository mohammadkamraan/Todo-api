import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TodoEntity } from './todo.entity';
import { BaseEntity } from '../shared/models/BaseEntity';

@Entity('TodoStatusEntity')
export class TodoStatusEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 25, unique: true, nullable: false })
  public name: string;

  @OneToMany(() => TodoEntity, todo => todo.status)
  public todos: TodoEntity[];
}
