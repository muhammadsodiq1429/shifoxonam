import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Service } from "../../services/models/service.model";
import { ApiProperty } from "@nestjs/swagger";
import { Patient } from "../../patients/models/patient.model";

interface IPaymentCreationAttr {
  patient_id: number;
  amount: number;
  payment_method:
    | "cash"
    | "card"
    | "bank_transfer"
    | "insurance"
    | "online_payment"
    | "mobile_payment";
  status:
    | "pending"
    | "paid"
    | "failed"
    | "refunded"
    | "partially_paid"
    | "cancelled";
  service_id: number;
}

@Table({ tableName: "payment" })
export class Payment extends Model<Payment, IPaymentCreationAttr> {
  @ApiProperty({
    type: "number",
    example: 1,
    description: "Payment uchun takrorlanmas id",
    default: "autoIncrement",
    required: false,
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    type: "number",
    example: 1,
    description: "Patient table`siga bog'langan",
  })
  @ForeignKey(() => Patient)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: "CASCADE" })
  declare patient_id: number;

  @ApiProperty({
    type: "number",
    example: 50000,
    description: "To'lov summasi",
  })
  @Column({ type: DataType.DECIMAL, allowNull: false })
  declare amount: number;

  @ApiProperty({ type: "string", description: "To'lov usuli", example: "cash" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare payment_method:
    | "cash"
    | "card"
    | "bank_transfer"
    | "insurance"
    | "online_payment"
    | "mobile_payment";

  @ApiProperty({
    type: "string",
    example: "pending",
    description: "To'lov xolati",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare status:
    | "pending"
    | "paid"
    | "failed"
    | "refunded"
    | "partially_paid"
    | "cancelled";

  @ApiProperty({
    type: "number",
    example: 1,
    description: "Service table`siga bog'langan",
  })
  @ForeignKey(() => Service)
  @Column({ type: DataType.INTEGER , onDelete: "CASCADE"})
  declare service_id: number;

  @BelongsTo(() => Patient)
  declare patient: Patient;

  @BelongsTo(() => Service)
  declare service: Service;
}
