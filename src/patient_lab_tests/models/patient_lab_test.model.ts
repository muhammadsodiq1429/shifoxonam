import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Room } from "../../rooms/models/room.model";
import { Patient } from "../../patients/models/patient.model";
import { Doctor } from "../../doctors/models/doctor.model";

interface IPatientLabTestCreationAttr {
  patient_id: number;
  doctor_id: number;
  result: string;
  result_date: Date;
  status:
    | "ordered"
    | "in_progress"
    | "completed"
    | "cancelled"
    | "pending_review"
    | "rejected";
  notes: string;
  room_id: number;
}

@Table({
  tableName: "patient_lab_test",
})
export class PatientLabTest extends Model<
  PatientLabTest,
  IPatientLabTestCreationAttr
> {
  @ApiProperty({
    type: "number",
    example: 1,
    description: "PatientLabTest uchun takrorlanmas id",
    default: "autoIncrement",
    required: false,
  })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @ApiProperty({ type: "number", description: "Bemorning id`si", example: 1 })
  @ForeignKey(() => Patient)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: "CASCADE" })
  declare patient_id: number;

  @ForeignKey(() => Doctor)
  @ApiProperty({ type: "number", description: "Doctorning id`si", example: 1 })
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: "CASCADE" })
  declare doctor_id: number;

  @ApiProperty({ type: "string", description: "Testning natijasi" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare result: string;

  @ApiProperty({ type: "string", description: "Test natijasining sanasi" })
  @Column({ type: DataType.DATE, allowNull: false })
  declare result_date: Date;

  @ApiProperty({
    type: "string",
    example: "ordered",
    description: "PatientLabTest`ning xolati",
  })
  @Column({
    type: DataType.ENUM(
      "ordered",
      "in_progress",
      "completed",
      "cancelled",
      "pending_review",
      "rejected"
    ),
    allowNull: false,
  })
  declare status:
    | "ordered"
    | "in_progress"
    | "completed"
    | "cancelled"
    | "pending_review"
    | "rejected";

  @ApiProperty({
    type: "string",
    example: "notes",
    description: "PatientLabTest`ning qo'shimcha ma'lumotlar",
  })
  @Column({ type: DataType.STRING })
  declare notes: string;

  @ApiProperty({
    type: "number",
    example: 1,
    description: "Room table`siga ulangan",
  })
  @ForeignKey(() => Room)
  @Column({ type: DataType.INTEGER, onDelete: "CASCADE" })
  declare room_id: number;

  @BelongsTo(() => Patient)
  declare patient: Patient;

  @BelongsTo(() => Doctor)
  declare doctor: Doctor;

  @BelongsTo(() => Room)
  declare room: Room;
}
