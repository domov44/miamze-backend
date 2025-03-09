import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIngredientDb1741440261301 implements MigrationInterface {
    name = 'CreateIngredientDb1741440261301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe_ingredient" ("id" SERIAL NOT NULL, "quantity" character varying NOT NULL, "recipeId" integer, "ingredientId" integer, CONSTRAINT "PK_a13ac3f2cebdd703ac557c5377c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "UQ_a0484b1faa35e0741ec6467e3f1" UNIQUE ("slug")`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "FK_1ad3257a7350c39854071fba211" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "FK_2879f9317daa26218b5915147e7" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP CONSTRAINT "FK_2879f9317daa26218b5915147e7"`);
        await queryRunner.query(`ALTER TABLE "recipe_ingredient" DROP CONSTRAINT "FK_1ad3257a7350c39854071fba211"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "UQ_a0484b1faa35e0741ec6467e3f1"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "slug"`);
        await queryRunner.query(`DROP TABLE "recipe_ingredient"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
    }

}
