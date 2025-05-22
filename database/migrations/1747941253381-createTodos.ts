import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTodos1747941253381 implements MigrationInterface {
    name = 'CreateTodos1747941253381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`TodoStatusEntity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(25) NOT NULL, UNIQUE INDEX \`IDX_d8e83b88457241abb6618f8c65\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD \`statusId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD CONSTRAINT \`FK_4583be7753873b4ead956f040e3\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD CONSTRAINT \`FK_8658c4d078e986717e997ce1ea9\` FOREIGN KEY (\`statusId\`) REFERENCES \`TodoStatusEntity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todos\` DROP FOREIGN KEY \`FK_8658c4d078e986717e997ce1ea9\``);
        await queryRunner.query(`ALTER TABLE \`todos\` DROP FOREIGN KEY \`FK_4583be7753873b4ead956f040e3\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`todos\` DROP COLUMN \`statusId\``);
        await queryRunner.query(`DROP INDEX \`IDX_d8e83b88457241abb6618f8c65\` ON \`TodoStatusEntity\``);
        await queryRunner.query(`DROP TABLE \`TodoStatusEntity\``);
    }

}
