import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateDoctorSpecializationDto {
  @ApiProperty({
    type: "number",
    description: "Doctor table`siga ulangan",
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  doctor_id: number;

  @ApiProperty({
    type: "number",
    description: "Specialization table`siga ulangan",
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  specialization_id: number;
}
