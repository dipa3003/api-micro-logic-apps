import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1705938052898 implements MigrationInterface {
    name = 'MyMigration1705938052898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blogs" ALTER COLUMN "dateCreated" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "blogs" ALTER COLUMN "dateCreated" DROP NOT NULL`);
    }

}
