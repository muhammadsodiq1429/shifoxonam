import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { CreateUserDto } from "../../users/dto/create-user.dto";

export class CreatePatientDto extends CreateUserDto {
  @ApiProperty({
    type: "number",
    example: 1,
    description: "Bemor uchun takrorlanman id, User table`ga ulangan",
  })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({ type: "string", example: "2006-12-18" })
  @IsDateString()
  @IsNotEmpty()
  birth_date: Date;

  @ApiProperty({
    type: "string",
    example: "MALE",
    description: "Mijozning jinsi",
  })
  @IsEnum({ MALE: "MALE", FEMALE: "FEMALE" })
  @IsNotEmpty()
  gender: "MALE" | "FEMALE";

  @ApiProperty({
    type: "string",
    example: "A+",
    description: "Bemorning qon guruhi",
  })
  @IsEnum({
    "A+": "A+",
    "A-": "A-",
    "B+": "B+",
    "B-": "B-",
    "AB+": "AB+",
    "AB-": "AB-",
    "O+": "O+",
    "O-": "O-",
  })
  @IsNotEmpty()
  blood_type: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

  @ApiProperty({
    type: "string",
    example: "+998911227337",
    description: "Bemorning vakili bo'lgan kishining telefon raqami",
    required: false,
  })
  @IsString()
  @IsOptional()
  additional_phone: string;

  @ApiProperty({
    type: "string",
    example: "Otasi",
    description: "Valik kimligi",
    required: false,
  })
  @IsString()
  @IsOptional()
  additional_name: string;

  @ApiProperty({
    type: "string",
    description: "Bemorning manzili",
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    type: "string",
    description: "Bemorning passport raqami",
    required: false,
  })
  passport_number: string;
}
