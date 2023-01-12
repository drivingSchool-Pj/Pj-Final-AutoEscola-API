import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTableAddress1673531271812 implements MigrationInterface {
    name = 'alterTableAddress1673531271812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "number" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "number"`);
    }

}
