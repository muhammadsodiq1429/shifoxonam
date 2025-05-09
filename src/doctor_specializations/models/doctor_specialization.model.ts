import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

import { Doctor } from "../../doctors/models/doctor.model";
import { Specialization } from "../../specializations/models/specialization.model";
import { ApiProperty } from "@nestjs/swagger";

interface IDoctorSpecializationCreationAttr {
  doctor_id: number;
  specialization_id: number;
}

@Table({ tableName: "doctor_specialization" })
export class DoctorSpecialization extends Model<
  DoctorSpecialization,
  IDoctorSpecializationCreationAttr
> {
  @ApiProperty({
    type: "number",
    description: "Doctor table`siga ulangan",
    example: 1,
  })
  @ForeignKey(() => Doctor)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: "CASCADE" })
  declare doctor_id: number;

  @ApiProperty({
    type: "number",
    description: "Specialization table`siga ulangan",
    example: 1,
  })
  @ForeignKey(() => Specialization)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: "CASCADE" })
  declare specialization_id: number;

  @BelongsTo(() => Doctor)
  declare doctor: Doctor;

  @BelongsTo(() => Specialization)
  declare specialization: Specialization;
}
