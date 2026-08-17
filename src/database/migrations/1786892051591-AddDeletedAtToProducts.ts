import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeletedAtToProducts1786892051591 implements MigrationInterface {
    name = 'AddDeletedAtToProducts1786892051591'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`deletedAt\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`deletedAt\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`deletedAt\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`deletedAt\``);
    }

}
