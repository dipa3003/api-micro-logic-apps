import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1705829712474 implements MigrationInterface {
    name = "MyMigration1705829712474";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "blogs" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "author" character varying NOT NULL, "image" character varying NOT NULL, "dateCreated" TIMESTAMP, CONSTRAINT "PK_e113335f11c926da929a625f118" PRIMARY KEY ("id"))`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "blogs"`);
    }
}
