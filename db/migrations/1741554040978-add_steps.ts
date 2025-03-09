import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSteps1741554040978 implements MigrationInterface {
    name = 'AddSteps1741554040978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" ADD "steps" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "steps"`);
    }

}
