import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedTodoStatus1748000793000 implements MigrationInterface {
  name = 'SeedTodoStatus1748000793000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO TodoStatusEntity (id, name) VALUES (1, 'open'), (2, 'done')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
