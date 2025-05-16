import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({name: 'users'})
export class UserEntity {
  @PrimaryColumn({type: 'binary'})
  public id: number;

  @Column({type: 'varchar', length: 50, unique: true, nullable: false})
  public username: string;

  @Column({type: 'text', nullable: false})
  public password: string;
}
