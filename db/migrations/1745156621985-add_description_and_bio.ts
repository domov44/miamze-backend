import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDescriptionAndBio1745156621985 implements MigrationInterface {
    name = 'AddDescriptionAndBio1745156621985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" ADD "description" character varying(500)`);
        await queryRunner.query(`ALTER TABLE "user" ADD "bio" character varying(250)`);
        await queryRunner.query(`ALTER TABLE "recipe" ALTER COLUMN "image" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" ALTER COLUMN "image" SET DEFAULT 'https://www.api.masseur-electrique.fr/wp-content/uploads/2025/02/couscous.webp'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "bio"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "description"`);
    }

}
