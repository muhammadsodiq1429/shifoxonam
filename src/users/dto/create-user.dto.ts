import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    type: "string",
    example: "Ali",
    description: "Foydalanuvchining ismi",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    type: "string",
    example: "Vali",
    description: "Foydalanuvchining familiyasi",
    required: false,
  })
  @IsString()
  @IsOptional()
  last_name: string;

  @ApiProperty({
    type: "string",
    example: "aliVali@gmail.com",
    description: "Foydalanuvchining elektron mazili",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: "string",
    example: "+998903128777",
    description: "Foydalanuvchining telefon raqami",
  })
  @IsPhoneNumber("UZ")
  @IsOptional()
  phone: string;

  @ApiProperty({
    type: "string",
    description: "Foydalanuvchining paroli",
    example: "3128777a-A",
  })
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    type: "string",
    example: "PATIENT",
    description: "Foydalanuvchining role",
    default: "PATIENT",
    required: false,
  })
  @IsString()
  @IsOptional()
  role: "STUFF" | "DOCTOR" | "PATIENT";
}
