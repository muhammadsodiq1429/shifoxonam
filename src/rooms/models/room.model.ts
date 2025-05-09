import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Department } from "../../departments/models/department.model";
import { ApiProperty } from "@nestjs/swagger";

interface IRoomCreationAttr {
  room_number: number;
  department_id: number;
  type: "CONSULTATION" | "OPERATING" | "LABORATORY" | "WARD" | "ICU";
  status: "OCCUPIED" | "VACANT" | "CLEANING" | "UNDER_REPAIR" | "DISINFECTION";
}

@Table({ tableName: "room" })
export class Room extends Model<Room, IRoomCreationAttr> {
  @ApiProperty({
    type: "number",
    example: 1,
    description: "Room uchun takrorlanmas id",
    default: "autoIncrement",
    required: false,
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    type: "number",
    example: 1,
    description: "Room`ning raqami",
    uniqueItems: true,
  })
  @Column({ type: DataType.INTEGER, allowNull: false, unique: false })
  declare room_number: number;

  @ApiProperty({
    type: "number",
    example: 1,
    description: "Department table`siga ulangan",
  })
  @ForeignKey(() => Department)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: "CASCADE" })
  declare department_id: number;

  @ApiProperty({
    type: "string",
    example: "CONSULTATION",
    description: "Room`ning turi",
  })
  @Column({
    type: DataType.ENUM(
      "CONSULTATION",
      "OPERATING",
      "LABORATORY",
      "WARD",
      "ICU"
    ),
    allowNull: false,
  })
  declare type: "CONSULTATION" | "OPERATING" | "LABORATORY" | "WARD" | "ICU";

  @ApiProperty({
    type: "string",
    example: "OCCUPIED",
    description: "Room`ning xolati",
  })
  @Column({
    type: DataType.ENUM(
      "OCCUPIED",
      "VACANT",
      "CLEANING",
      "UNDER_REPAIR",
      "DISINFECTION"
    ),
  })
  declare status:
    | "OCCUPIED"
    | "VACANT"
    | "CLEANING"
    | "UNDER_REPAIR"
    | "DISINFECTION";
}
