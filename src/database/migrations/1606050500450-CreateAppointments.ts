import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAppointments1606050500450 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns:
          [
            {
              name: 'id',
              type: 'varchar',
              isPrimary: true,
              generationStrategy: 'uuid',
            },
            {
              name: 'date',
              type: 'timestamp with time zone',
              isNullable: false,

            }
          ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  await queryRunner.dropTable('appointments')
  }

}
