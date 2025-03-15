import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategories1742053918832 implements MigrationInterface {
    name = 'AddCategories1742053918832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "label" character varying(150) NOT NULL, "slug" character varying(150) NOT NULL, CONSTRAINT "UQ_cb73208f151aa71cdd78f662d70" UNIQUE ("slug"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "categoryId" integer`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_991484dd8189182dafe91e44413" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_991484dd8189182dafe91e44413"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "categoryId"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
