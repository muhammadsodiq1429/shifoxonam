import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IMedicationCreationAttr {
  name: string;
  description: string;
  dosage: string;
  dosage_type: string;
  manufacturer: string;
  side_effects: string;
  form:
    | "tablet"
    | "capsule"
    | "injection"
    | "syrup"
    | "ointment"
    | "cream"
    | "spray"
    | "drop"
    | "gel"
    | "patch"
    | "suppository"
    | "solution"
    | "suspension"
    | "powder"
    | "aerosol";
}

@Table({ tableName: "medication" })
export class Medication extends Model<Medication, IMedicationCreationAttr> {
  @ApiProperty({
    type: "number",
    example: 1,
    description: "Medication uchun takrorlanmas id",
    default: "autoIncrement",
    required: false,
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    type: "string",
    example: "trimol",
    description: "Medication`ning nomi",
  })
  @Column({ type: DataType.STRING })
  declare name: string;

  @ApiProperty({
    type: "string",
    example: "bosh og'rig'i",
    description: "Medication`ning tavsifi",
  })
  @Column({ type: DataType.TEXT })
  declare description: string;

  @ApiProperty({
    type: "string",
    example: "20",
    description: "Medication`ning moqdori",
  })
  @Column({ type: DataType.STRING })
  declare dosage: string;

  @ApiProperty({
    type: "string",
    example: "ml",
    description: "Dosave`ning turi",
  })
  @Column({ type: DataType.STRING })
  declare dosage_type: string;

  @ApiProperty({
    type: "string",
    example: "Medication`ni ishlab chiqargan company",
    description: "Pfizer",
  })
  @Column({ type: DataType.STRING })
  declare manufacturer: string;

  @ApiProperty({ type: "string", example: "Medication`ning ta'siri" })
  @Column({ type: DataType.TEXT })
  declare side_effects: string;

  @ApiProperty({
    type: "string",
    example: "tablet",
    description: "Medication`ning turi",
  })
  @Column({ type: DataType.STRING })
  declare form:
    | "tablet"
    | "capsule"
    | "injection"
    | "syrup"
    | "ointment"
    | "cream"
    | "spray"
    | "drop"
    | "gel"
    | "patch"
    | "suppository"
    | "solution"
    | "suspension"
    | "powder"
    | "aerosol";
}
