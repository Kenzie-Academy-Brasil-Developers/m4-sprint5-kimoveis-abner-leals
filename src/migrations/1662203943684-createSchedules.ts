import { MigrationInterface, QueryRunner } from "typeorm";

export class createSchedules1662203943684 implements MigrationInterface {
    name = 'createSchedules1662203943684'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "schedules_users_properties" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "hour" TIME NOT NULL, "size" integer NOT NULL, CONSTRAINT "PK_751450246dee9abc82a47dabc4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "sold" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "value" numeric(12,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updatedAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "createdAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "updatedAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "createdAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "properties" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "properties" ADD "value" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "sold" DROP DEFAULT`);
        await queryRunner.query(`DROP TABLE "schedules_users_properties"`);
    }

}
