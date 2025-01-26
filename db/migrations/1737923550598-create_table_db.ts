import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableDb1737923550598 implements MigrationInterface {
    name = 'CreateTableDb1737923550598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "recipe" ("id" SERIAL NOT NULL, "label" character varying(500) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "username" character varying(25) NOT NULL, "email" character varying(50) NOT NULL, "name" character varying(50) NOT NULL, "surname" character varying(50) NOT NULL, "password" character varying(150) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "label" character varying(150) NOT NULL, "slug" character varying(150) NOT NULL, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipe_tags_tag" ("recipeId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_ae13f8c3cba4e537ac79e71d39f" PRIMARY KEY ("recipeId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ec10fc71f95d0199fa20bc3657" ON "recipe_tags_tag" ("recipeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ee885d85e317449e0f990504e8" ON "recipe_tags_tag" ("tagId") `);
        await queryRunner.query(`CREATE TABLE "user_tags_tag" ("userId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_227b773cf8f2eeb43585abbdcd1" PRIMARY KEY ("userId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4eca7c88c992333456d351422b" ON "user_tags_tag" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ff76db199db490dda3ed74231e" ON "user_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "FK_fe30fdc515f6c94d39cd4bbfa76" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recipe_tags_tag" ADD CONSTRAINT "FK_ec10fc71f95d0199fa20bc3657a" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "recipe_tags_tag" ADD CONSTRAINT "FK_ee885d85e317449e0f990504e8f" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_tags_tag" ADD CONSTRAINT "FK_4eca7c88c992333456d351422b3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_tags_tag" ADD CONSTRAINT "FK_ff76db199db490dda3ed74231e8" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tags_tag" DROP CONSTRAINT "FK_ff76db199db490dda3ed74231e8"`);
        await queryRunner.query(`ALTER TABLE "user_tags_tag" DROP CONSTRAINT "FK_4eca7c88c992333456d351422b3"`);
        await queryRunner.query(`ALTER TABLE "recipe_tags_tag" DROP CONSTRAINT "FK_ee885d85e317449e0f990504e8f"`);
        await queryRunner.query(`ALTER TABLE "recipe_tags_tag" DROP CONSTRAINT "FK_ec10fc71f95d0199fa20bc3657a"`);
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "FK_fe30fdc515f6c94d39cd4bbfa76"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ff76db199db490dda3ed74231e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4eca7c88c992333456d351422b"`);
        await queryRunner.query(`DROP TABLE "user_tags_tag"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ee885d85e317449e0f990504e8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ec10fc71f95d0199fa20bc3657"`);
        await queryRunner.query(`DROP TABLE "recipe_tags_tag"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "recipe"`);
    }

}
