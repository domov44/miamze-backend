import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDefaultImageToRecipes1642323232345 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE recipe
      ADD COLUMN image VARCHAR(500) NULL;
    `);

    await queryRunner.query(`
      UPDATE recipe
      SET image = 'https://www.api.masseur-electrique.fr/wp-content/uploads/2025/02/couscous.webp'
      WHERE image IS NULL;
    `);

    await queryRunner.query(`
      ALTER TABLE recipe
      ALTER COLUMN image SET NOT NULL;
    `);

    await queryRunner.query(`
      ALTER TABLE recipe
      ALTER COLUMN image SET DEFAULT 'https://www.api.masseur-electrique.fr/wp-content/uploads/2025/02/couscous.webp';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE recipe
      ALTER COLUMN image DROP NOT NULL;
    `);

    await queryRunner.query(`
      ALTER TABLE recipe
      ALTER COLUMN image DROP DEFAULT;
    `);
  }
}

