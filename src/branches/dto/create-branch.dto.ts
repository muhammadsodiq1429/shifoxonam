import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator";

export class CreateBranchDto {
  @ApiProperty({
    type: "string",
    example: "Shifoxonam Chilonzor",
    description: "Branch nomi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: "string",
    example: "",
    description: "Branch'ning joylashuvi",
  })
  @IsString()
  @IsOptional()
  location: string;

  @ApiProperty({
    type: "string",
    example: "+998710050908",
    description: "Branch'ning telefon raqami",
  })
  @IsPhoneNumber("UZ")
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    type: "string",
    example: "Chilonzor tumani, 18-daha, avtobus bekati ro'parasida",
    description: "Branch'ning joylashuvi",
  })
  @IsString()
  @IsNotEmpty()
  address: string;
}
