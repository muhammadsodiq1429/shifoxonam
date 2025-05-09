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

interface IPatientCreationAttr {
  user_id: number;
  birth_date: Date;
  gender: "MALE" | "FEMALE";
  blood_type: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  additional_phone: string;
  additional_name: string;
  address: string;
  passport_number: string;
}

@Table({ tableName: "patient" })
export class Patient extends Model<Patient, IPatientCreationAttr> {
  @ApiProperty({
    type: "number",
    example: 1,
    description: "Bemor uchun takrorlanman id, User table`ga ulangan",
  })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, primaryKey: true })
  declare user_id: number;

  @ApiProperty({ type: "string", example: "2006-12-18" })
  @Column({ type: DataType.DATEONLY })
  declare birth_date: Date;

  @ApiProperty({
    type: "string",
    example: "MALE",
    description: "Mijozning jinsi",
  })
  @Column({ type: DataType.ENUM("MALE", "FEMALE") })
  declare gender: "MALE" | "FEMALE";

  @ApiProperty({
    type: "string",
    example: "A+",
    description: "Bemorning qon guruhi",
  })
  @Column({
    type: DataType.ENUM("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
  })
  declare blood_type: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

  @ApiProperty({
    type: "string",
    example: "+998911227337",
    description: "Bemorning vakili bo'lgan kishining telefon raqami",
    required: false,
  })
  @Column({ type: DataType.STRING })
  declare additional_phone: string;

  @ApiProperty({
    type: "string",
    example: "Otasi",
    description: "Valik kimligi",
    required: false,
  })
  @Column({ type: DataType.STRING })
  declare additional_name: string;

  @ApiProperty({
    type: "string",
    description: "Bemorni email orqali faol qilish uchun link",
    default: "UUID4V",
    required: false,
  })
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare activation_link: string;

  @ApiProperty({
    type: "string",
    description: "Bemorning manzili",
  })
  @Column({ type: DataType.TEXT, allowNull: false })
  declare address: string;

  @ApiProperty({
    type: "string",
    description: "Bemorning passport raqami",
    required: false,
  })
  @Column({ type: DataType.STRING })
  declare passport_number: string;

  @BelongsTo(() => User)
  declare user: User;
}