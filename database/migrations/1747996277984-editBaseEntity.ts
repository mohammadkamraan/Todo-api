import { MigrationInterface, QueryRunner } from "typeorm";

export class EditBaseEntity1747996277984 implements MigrationInterface {
    name = 'EditBaseEntity1747996277984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todos\` DROP FOREIGN KEY \`FK_4583be7753873b4ead956f040e3\``);
        await queryRunner.query(`ALTER TABLE \`todos\` DROP FOREIGN KEY \`FK_8658c4d078e986717e997ce1ea9\``);
        await queryRunner.query(`ALTER TABLE \`todos\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`todos\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`todos\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD \`id\` varchar(50) NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`todos\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD \`userId\` varchar(50) COLLATE "utf8mb4_unicode_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`id\` varchar(50) COLLATE "utf8mb4_unicode_ci" NOT NULL PRIMARY KEY`);
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
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`todos\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`todos\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`todos\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD CONSTRAINT \`FK_8658c4d078e986717e997ce1ea9\` FOREIGN KEY (\`statusId\`) REFERENCES \`testtodoapi\`.\`TodoStatusEntity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD CONSTRAINT \`FK_4583be7753873b4ead956f040e3\` FOREIGN KEY (\`userId\`) REFERENCES \`testtodoapi\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
