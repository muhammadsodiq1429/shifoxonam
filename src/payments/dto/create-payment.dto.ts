import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
  @ApiProperty({
    type: "number",
    example: 1,
    description: "Payment uchun takrorlanmas id",
    default: "autoIncrement",
    required: false,
  })
  id: number;

  @ApiProperty({
    type: "number",
    example: 1,
    description: "Patient table`siga bog'langan",
  })
  patient_id: number;

  @ApiProperty({
    type: "number",
    example: 50000,
    description: "To'lov summasi",
  })
  amount: number;

  @ApiProperty({ type: "string", description: "To'lov usuli", example: "cash" })
  payment_method:
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
  status:
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
  service_id: number;
}
