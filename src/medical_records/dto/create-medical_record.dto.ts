import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMedicalRecordDto {
  @ApiProperty({
    type: "number",
    example: 1,
    description: "Appointment table`siga ulangan",
  })
  @IsNumber()
  @IsNotEmpty()
  appointment_id: number;

  @ApiProperty({
    type: "string",
    description: "Patient`ning diagnosis",
  })
  @IsString()
  @IsNotEmpty()
  diagnosis: string;

  @ApiProperty({
    type: "string",
    description: "Patient`ning treatment",
  })
  @IsString()
  @IsNotEmpty()
  treatment: string;
}
