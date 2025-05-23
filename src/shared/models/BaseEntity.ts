import { AfterLoad, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity('BaseEntity', {})
export class BaseEntity {
  @CreateDateColumn({ type: 'datetime' })
  public createdAt: Date;
  @UpdateDateColumn({ type: 'datetime' })
  public updatedAt: Date;

  public createdAtUnix: number;
  public updatedAtUnix: number;

  @AfterLoad()
  public fillUnixValues() {
    this.createdAtUnix = this.createdAt.getTime() / 1000;
    this.updatedAtUnix = this.updatedAt.getTime() / 1000;
  }
}
