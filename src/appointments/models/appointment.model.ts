import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Patient } from "../../patients/models/patient.model";
import { Doctor } from "../../doctors/models/doctor.model";
import { Branch } from "../../branches/models/branch.model";
import { Room } from "../../rooms/models/room.model";
import { ApiProperty } from "@nestjs/swagger";

interface IAppointmentCreationAttr {
  patient_id: number;
  doctor_id: number;
  branch_id: number;
  room_id: number;
  appointment_time: string;
  status: "confirmed" | "cancelled" | "completed";
  notes: string;
  queue: number;
}

@Table({ tableName: "appointment" })
export class Appointment extends Model<Appointment, IAppointmentCreationAttr> {
  @ApiProperty({
    type: "number",
    example: 1,
    description: "Appointment uchun takrorlanmas id",
    default: "autoIncrement",
    required: false,
  })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @ApiProperty({
    type: "number",
    example: 1,
    description: "Patient table`siga ulangan",
  })
  @ForeignKey(() => Patient)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: "CASCADE" })
  declare patient_id: number;

  @ApiProperty({
    type: "number",
    example: 1,
    description: "Doctor table`siga ulangan",
  })
  @ForeignKey(() => Doctor)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: "CASCADE" })
  declare doctor_id: number;

  @ApiProperty({
    type: "number",
    example: 1,
    description: "Branch table`siga ulangan",
  })
  @ForeignKey(() => Branch)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: "CASCADE" })
  declare branch_id: number;

  @ApiProperty({
    type: "number",
    example: 1,
    description: "Room table`siga ulangan",
  })
  @ForeignKey(() => Room)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: "CASCADE" })
  declare room_id: number;

  @ApiProperty({
    type: "string",
    example: "15:30",
    description: "Appointment qaysi vaqtda bo'lishi",
  })
  @Column({ type: DataType.TIME, allowNull: false })
  declare appointment_time: string;

  @ApiProperty({
    type: "string",
    example: "confirmed",
    description: "Appointment`ning xolati",
  })
  @Column({ type: DataType.ENUM("confirmed", "cancelled", "completed") })
  declare status: "confirmed" | "cancelled" | "completed";

  @ApiProperty({
    type: "string",
    example: "notes",
    description: "Appointment`ning qo'shimcha ma'lumotlar",
  })
  @Column({ type: DataType.STRING })
  declare notes: string;

  @ApiProperty({
    type: "number",
    example: 1,
    description: "Patient`ning appointment`ga bo'lgan navbati",
    default: "autoIncrement",
  })
  @Column({ type: DataType.INTEGER })
  declare queue: number;

  @BelongsTo(() => Patient, { onDelete: "CASCADE" })
  declare patient: Patient;

  @BelongsTo(() => Doctor)
  declare doctor: Doctor;

  @BelongsTo(() => Branch)
  declare branch: Branch;

  @BelongsTo(() => Room)
  declare room: Room;
}
