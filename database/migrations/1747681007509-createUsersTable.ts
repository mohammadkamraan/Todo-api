import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1747681007509 implements MigrationInterface {
  name = 'CreateUsersTable1747681007509';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` varchar(50) COLLATE "utf8mb4_unicode_ci" NOT NULL, \`username\` varchar(50) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
