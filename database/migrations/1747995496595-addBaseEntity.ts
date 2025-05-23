import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBaseEntity1747995496595 implements MigrationInterface {
    name = 'AddBaseEntity1747995496595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todos\` DROP FOREIGN KEY \`FK_4583be7753873b4ead956f040e3\``);
        await queryRunner.query(`ALTER TABLE \`todos\` DROP FOREIGN KEY \`FK_8658c4d078e986717e997ce1ea9\``);
        await queryRunner.query(`ALTER TABLE \`TodoStatusEntity\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`TodoStatusEntity\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`todos\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`todos\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`todos\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
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
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`id\` varchar(50) COLLATE "utf8mb4_unicode_ci" NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`todos\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD \`userId\` varchar(50) COLLATE "utf8mb4_unicode_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`todos\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD \`id\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`todos\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`todos\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`TodoStatusEntity\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`TodoStatusEntity\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD CONSTRAINT \`FK_8658c4d078e986717e997ce1ea9\` FOREIGN KEY (\`statusId\`) REFERENCES \`testtodoapi\`.\`TodoStatusEntity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD CONSTRAINT \`FK_4583be7753873b4ead956f040e3\` FOREIGN KEY (\`userId\`) REFERENCES \`testtodoapi\`.\`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
