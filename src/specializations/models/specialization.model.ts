import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Doctor } from "../../doctors/models/doctor.model";
import { DoctorSpecialization } from "../../doctor_specializations/models/doctor_specialization.model";

interface ISpecializationCreationAttr {
  name: string;
  description: string;
}

@Table({ tableName: "specialization" })
export class Specialization extends Model<
  Specialization,
  ISpecializationCreationAttr
> {
  @ApiProperty({
    type: "number",
    example: 1,
    description: "Specialization uchun takrorlanmas id",
    default: "autoIncrement",
    required: false,
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    type: "string",
    example: "stomotolagy",
    description: "Specialization nomi",
  })
  @Column({ type: DataType.STRING, allowNull: true, unique: true })
  declare name: string;

  @ApiProperty({
    type: "string",
    example: "Tish shifokori",
    description: "Specialization tavsifi",
  })
  @Column({ type: DataType.STRING })
  declare description: string;

  @BelongsToMany(() => Doctor, () => DoctorSpecialization)
  declare doctor: [Doctor];
}
