import { MigrationInterface, QueryRunner } from "typeorm";

export class updateInstructors1673618222271 implements MigrationInterface {
    name = 'updateInstructors1673618222271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "instructors" RENAME COLUMN "name" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "instructors" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "instructors" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "instructors" ADD CONSTRAINT "FK_dfa0fcb3c8ae7ded658b4272e19" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "instructors" DROP CONSTRAINT "FK_dfa0fcb3c8ae7ded658b4272e19"`);
        await queryRunner.query(`ALTER TABLE "instructors" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "instructors" ADD "userId" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "instructors" RENAME COLUMN "userId" TO "name"`);
    }

}
