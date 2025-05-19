import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryColumn({ type: 'varchar', length: 50, collation: 'utf8mb4_unicode_ci', generated: false })
  public id: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  public username: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  public password: string;

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
