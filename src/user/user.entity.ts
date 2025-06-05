import { BeforeInsert, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import { TodoEntity } from '../todo/todo.entity';
import { BaseEntity } from '../shared/models/BaseEntity';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @ApiResponseProperty({ type: 'string' })
  @PrimaryColumn({ type: 'varchar', length: 50, collation: 'utf8mb4_unicode_ci', generated: false })
  public id: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  @ApiProperty({ type: 'string', required: true })
  public username: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  public password: string;

  @OneToMany(() => TodoEntity, todo => todo.user)
  public todos: TodoEntity[];

  @BeforeInsert()
  private hashPassword() {
    const saltRounds = 10;
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }

  @BeforeInsert()
  private async createHashId() {
    this.id = nanoid(10);
  }
}
