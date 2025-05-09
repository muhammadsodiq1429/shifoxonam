import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Appointment } from "../../appointments/models/appointment.model";
import { ApiProperty } from "@nestjs/swagger";

interface IMedicalRecordCreationAttr {
  appointment_id: number;
  diagnosis: string;
  treatment: string;
}

@Table({tableName:"medical_record"})
export class MedicalRecord extends Model<
  MedicalRecord,
  IMedicalRecordCreationAttr
> {
  @ApiProperty({
    type: "number",
    example: 1,
    description: "MedicalRecord uchun takrorlanmas id",
    default: "autoIncrement",
    required: false,
  })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @ApiProperty({
    type: "number",
    example: 1,
    description: "Appointment table`siga ulangan",
  })
  @ForeignKey(() => Appointment)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: "CASCADE" })
  declare appointment_id: number;

  @ApiProperty({
    type: "string",
    description: "Patient`ning diagnosis",
  })
  @Column({ type: DataType.TEXT })
  declare diagnosis: string;

  @ApiProperty({
    type: "string",
    description: "Patient`ning treatment",
  })
  @Column({ type: DataType.TEXT })
  declare treatment: string;

  @BelongsTo(() => Appointment)
  declare appointment: Appointment;
}
