import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueIndexToCategoryName1787255042002 implements MigrationInterface {
    name = 'AddUniqueIndexToCategoryName1787255042002'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` ADD UNIQUE INDEX \`IDX_8b0be371d28245da6e4f4b6187\` (\`name\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_8b0be371d28245da6e4f4b6187\` ON \`categories\``);
    }

}
