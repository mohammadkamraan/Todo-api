import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TodoEntity } from './todo.entity';

@Entity('TodoStatusEntity')
export class TodoStatusEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 25, unique: true, nullable: false })
  public name: string;

  @OneToMany(() => TodoEntity, todo => todo.status)
  public todos: TodoEntity[];
}
