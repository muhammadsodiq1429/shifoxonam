import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "../../users/models/user.model";
import { ApiProperty } from "@nestjs/swagger";

interface IStuffCreationAttr {
  user_id: number;
  second_role:
    | "admin"
    | "superadmin"
    | "receptionist"
    | "accountant"
    | "nurse"
    | "pharmacist"
    | "lab_technician"
    | "cleaner"
    | "security"
    | "it_support"
    | "driver";
  department_id: number;
  start_time: string;
  end_time: string;
  notes: string;
  salary: number;
}

@Table({ tableName: "stuff" })
export class Stuff extends Model<Stuff, IStuffCreationAttr> {
  @ApiProperty({
    type: "number",
    example: 1,
    description: "Stuff uchun takrorlanman id, User table`ga ulangan",
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, primaryKey: true, onDelete: "CASCADE" })
  declare user_id: number;
  @ApiProperty({
    type: "string",
    example: "admin",
    description: "Stuff`ning ish turi",
  })
  @Column({
    type: DataType.ENUM(
      "admin",
      "superadmin",
      "receptionist",
      "accountant",
      "nurse",
      "pharmacist",
      "lab_technician",
      "cleaner",
      "security",
      "it_support",
      "driver"
    ),
    allowNull: false,
  })
  declare second_role:
    | "admin"
    | "superadmin"
    | "receptionist"
    | "accountant"
    | "nurse"
    | "pharmacist"
    | "lab_technician"
    | "cleaner"
    | "security"
    | "it_support"
    | "driver";

  @ApiProperty({
    type: "number",
    example: 1,
    description:
      "Stuff qaysi department`da ishlashi. Department table`siga ulangan",
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare department_id: number;

  @ApiProperty({
    type: "string",
    example: "8:00",
    description: "Stuff`ning ish boshlanish vaqti",
  })
  @Column({ type: DataType.TIME })
  declare start_time: string;

  @ApiProperty({
    type: "string",
    example: "20:00",
    description: "Stuff`ning ish boshlanish vaqti",
  })
  @Column({ type: DataType.TIME })
  declare end_time: string;

  @ApiProperty({
    type: "string",
    example: "notes",
    description: "Stuff`ning notes",
  })
  @Column({ type: DataType.TEXT })
  declare notes: string;

  @ApiProperty({
    type: "number",
    example: 5000000,
    description: "Stuff`ning oyligi",
  })
  @Column({ type: DataType.INTEGER })
  declare salary: number;

  @BelongsTo(() => User, { onDelete: "CASCADE" })
  declare user: User;
}
