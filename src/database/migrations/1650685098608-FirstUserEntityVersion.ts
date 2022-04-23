import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstUserEntityVersion1650685098608 implements MigrationInterface {
    name = 'FirstUserEntityVersion1650685098608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "email" TO "username"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" TO "UQ_fe0bb3f6520ee0469504521e710"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" TO "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "username" TO "email"`);
    }

}
