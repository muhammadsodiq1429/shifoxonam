import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Branch } from "../../branches/models/branch.model";
import { Doctor } from "../../doctors/models/doctor.model";
import { Room } from "../../rooms/models/room.model";

interface IDepartmentCreationAttr {
  name: string;
  description: string;
  branch_id: number;
}

@Table({ tableName: "department" })
export class Department extends Model<Department, IDepartmentCreationAttr> {
  @ApiProperty({
    type: "number",
    example: 1,
    description: "Department uchun takrorlanmas id",
    default: "autoIncrement",
    required: false,
    uniqueItems: true,
  })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @ApiProperty({
    type: "string",
    example: "Ranimatsiya",
    description: "Department nomi",
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare name: string;

  @ApiProperty({
    type: "string",
    example: "Aperatsiyalar o'tkaziluvchi joy",
    description: "Department'ning tavsifi",
  })
  @Column({ type: DataType.STRING })
  declare description: string;

  @ApiProperty({
    type: "number",
    example: 1,
    description: "Branch table`siga bog'langan",
  })
  @ForeignKey(() => Branch)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: "CASCADE" })
  declare branch_id: number;

  @BelongsTo(() => Branch)
  declare branch: Branch;

  @HasMany(() => Doctor)
  declare doctor: Doctor;

  @HasMany(() => Room)
  declare room: Room;
}
