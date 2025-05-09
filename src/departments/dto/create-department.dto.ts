import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDepartmentDto {
  @ApiProperty({
    type: "string",
    example: "Ranimatsiya",
    description: "Department nomi",
  })
  @Transform(({ value }) => value?.toLowerCase())
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: "string",
    example: "Aperatsiyalar o'tkaziluvchi joy",
    description: "Department'ning tavsifi",
  })
  @Transform(({ value }) => value?.toLowerCase())
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    type: "number",
    example: 1,
    description: "Branch table`siga bog'langan",
  })
  @IsNumber()
  @IsNotEmpty()
  branch_id: number;
}
