import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Medication } from "../../medications/models/medication.model";
import { MedicalRecord } from "../../medical_records/models/medical_record.model";

interface IPrescriptionCreationAttr {
  medication_id: number;
  medical_record_id: number;
  dosage: string;
  duration: string;
}

@Table({ tableName: "prescription" })
export class Prescription extends Model<
  Prescription,
  IPrescriptionCreationAttr
> {
  @ApiProperty({
    type: "number",
    example: 1,
    description: "Prescription uchun takrorlanmas id",
    default: "autoIncrement",
    required: false,
  })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @ApiProperty({
    type: "number",
    example: 1,
    description: "Medication tabel`siga bog'langan",
  })
  @ForeignKey(() => Medication)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: "CASCADE" })
  declare medication_id: number;

  @ApiProperty({
    type: "number",
    example: 1,
    description: "MedicalRecord tabel`siga bog'langan",
  })
  @ForeignKey(() => MedicalRecord)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: "CASCADE" })
  declare medical_record_id: number;

  @ApiProperty({
    type: "string",
    example: "2 ta",
    description: "Dorining do'zasi",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare dosage: string;

  @ApiProperty({
    type: "string",
    example: "1 soat",
    description: "Dorining oraliq iste'mol qilish vaqti",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare duration: string;

  @BelongsTo(() => Medication)
  declare medication: Medication;

  @BelongsTo(() => MedicalRecord)
  declare medical_record: MedicalRecord;
}
