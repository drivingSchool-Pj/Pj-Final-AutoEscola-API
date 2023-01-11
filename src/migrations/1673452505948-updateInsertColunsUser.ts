import { MigrationInterface, QueryRunner } from "typeorm";

export class updateInsertColunsUser1673452505948 implements MigrationInterface {
    name = 'updateInsertColunsUser1673452505948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "contact" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "typeCategorie" character varying(2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "typeCategorie"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "contact"`);
    }

}
