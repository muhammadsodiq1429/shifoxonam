import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateServiceDto {
  @ApiProperty({
    type: "string",
    example: "UZI",
    description: "Service`ning nomi",
  })
  @IsString()
  @IsNotEmpty()
  declare name: string;

  @ApiProperty({
    type: "number",
    example: 45000,
    description: "Service`ning narxi",
  })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    type: "string",
    example: "consultation",
    description: "Service`ning turi",
  })
  @IsString()
  @IsNotEmpty()
  type:
    | "consultation"
    | "diagnosis"
    | "treatment"
    | "surgery"
    | "laboratory"
    | "physiotherapy"
    | "emergency"
    | "vaccination"
    | "hospitalization";

  @ApiProperty({
    type: "string",
    example: "Maslahat",
    description: "Service`ning tavsifi",
  })
  @IsString()
  @IsOptional()
  description: string;
}
