import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateUserDto } from "../../users/dto/create-user.dto";

export class CreateDoctorDto extends CreateUserDto {
  @ApiProperty({
    type: "number",
    example: 1,
    description: "Doctor uchun takrorlanmas id, User table`ga ulangan",
  })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({
    type: "number",
    example: 1,
    description: "Doctor`ning departmenti. Department table`siga ulangan",
  })
  @IsNumber()
  @IsNotEmpty()
  department_id: number;

  @ApiProperty({
    type: "number",
    example: 1,
    description: "Doctor`ning tajriba yillari",
  })
  @IsNumber()
  @IsNotEmpty()
  experience_years: number;

  @ApiProperty({
    type: "string",
    example: 1,
    description: "Doctor`ning ma'lumotlari",
  })
  @IsString()
  @IsNotEmpty()
  bio: string;
}
