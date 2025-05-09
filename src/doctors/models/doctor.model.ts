import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Department } from "../../departments/models/department.model";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/models/user.model";
import { Specialization } from "../../specializations/models/specialization.model";
import { DoctorSpecialization } from "../../doctor_specializations/models/doctor_specialization.model";

interface IDoctorCreationAttr {
  user_id: number;
  department_id: number;
  experience_years: number;
  bio: string;
}

@Table({ tableName: "doctor" })
export class Doctor extends Model<Doctor, IDoctorCreationAttr> {
  @ApiProperty({
    type: "number",
    example: 1,
    description: "Doctor uchun takrorlanmas id, User table`ga ulangan",
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, primaryKey: true, onDelete: "CASCADE" })
  declare user_id: number;

  @ApiProperty({
    type: "number",
    example: 1,
    description: "Doctor`ning departmenti. Department table`siga ulangan",
  })
  @ForeignKey(() => Department)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: "CASCADE" })
  declare department_id: number;

  @ApiProperty({
    type: "number",
    example: 1,
    description: "Doctor`ning tajriba yillari",
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare experience_years: number;

  @ApiProperty({
    type: "string",
    example: 1,
    description: "Doctor`ning ma'lumotlari",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare bio: string;

  @Column({ type: DataType.STRING })
  declare photo_url: string;

  @BelongsTo(() => Department)
  declare department: Department;

  @BelongsTo(() => User)
  declare user: User;

  @BelongsToMany(() => Specialization, () => DoctorSpecialization)
  declare specialization: [Specialization];
}
