import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveUniqueSlug1741553249080 implements MigrationInterface {
    name = 'RemoveUniqueSlug1741553249080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "UQ_a0484b1faa35e0741ec6467e3f1"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "UQ_a0484b1faa35e0741ec6467e3f1" UNIQUE ("slug")`);
    }

}
