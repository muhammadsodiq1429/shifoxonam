import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import { Patient } from "../../patients/models/patient.model";
import { Doctor } from "../../doctors/models/doctor.model";
import { Stuff } from "../../stuffs/models/stuff.model";

interface IUserCreationAttr {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  hashed_password: string;
  role: "STUFF" | "DOCTOR" | "PATIENT";
}

@Table({ tableName: "users" })
export class User extends Model<User, IUserCreationAttr> {
  @ApiProperty({
    type: "number",
    example: 1,
    description: "Foydalanuvchi uchun takrorlanmas id",
    default: "autoIncrement",
    required: false,
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    type: "string",
    example: "Ali",
    description: "Foydalanuvchining ismi",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare first_name: string;

  @ApiProperty({
    type: "string",
    example: "Vali",
    description: "Foydalanuvchining familiyasi",
    required: false,
  })
  @Column({ type: DataType.STRING })
  declare last_name: string;

  @ApiProperty({
    type: "string",
    example: "aliVali@gmail.com",
    description: "Foydalanuvchining elektron mazili",
  })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @ApiProperty({
    type: "string",
    example: "+998903128777",
    description: "Foydalanuvchining telefon raqami",
    required: false,
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare phone: string;

  @ApiProperty({
    type: "string",
    description: "Foydalanuvchining hashlangan paroli",
    required: false,
  })
  @Column({ type: DataType.STRING })
  declare hashed_password: string;

  @ApiProperty({
    type: "string",
    description: "Foydalanuvchining hashlangan refresh tokeni",
    required: false,
  })
  @Column({ type: DataType.STRING })
  declare hashed_refresh_token: string;

  @ApiProperty({
    type: "string",
    example: "PATIENT",
    description: "Foydalanuvchining role",
  })
  @Column({ type: DataType.STRING, defaultValue: "PATIENT" })
  declare role: "STUFF" | "DOCTOR" | "PATIENT";

  @ApiProperty({
    type: "boolean",
    example: "false",
    description: "Foydalanuvchining activeligi",
    default: false,
    required: false,
  })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_active: boolean;

  @HasOne(() => Patient)
  patient: Patient;

  @HasOne(() => Doctor)
  doctor: Doctor;

  @HasOne(() => Stuff)
  stuff: Stuff;
}
