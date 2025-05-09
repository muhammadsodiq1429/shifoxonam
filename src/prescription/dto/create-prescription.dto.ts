import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePrescriptionDto {
  @ApiProperty({
    type: "number",
    example: 1,
    description: "Medication tabel`siga bog'langan",
  })
  @IsNumber()
  @IsNotEmpty()
  declare medication_id: number;

  @ApiProperty({
    type: "number",
    example: 1,
    description: "MedicalRecord tabel`siga bog'langan",
  })
  @IsNumber()
  @IsNotEmpty()
  declare medical_record_id: number;

  @ApiProperty({
    type: "string",
    example: "2 ta",
    description: "Dorining do'zasi",
  })
  @IsString()
  @IsNotEmpty()
  declare dosage: string;

  @ApiProperty({
    type: "string",
    example: "1 soat",
    description: "Dorining oraliq iste'mol qilish vaqti",
  })
  @IsString()
  @IsNotEmpty()
  declare duration: string;
}
