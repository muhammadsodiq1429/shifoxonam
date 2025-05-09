import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSpecializationDto {
  @ApiProperty({
    type: "string",
    example: "stomotolagy",
    description: "Specialization nomi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: "string",
    example: "Tish shifokori",
    description: "Specialization tavsifi",
  })
  @IsString()
  @IsOptional()
  description: string;
}
