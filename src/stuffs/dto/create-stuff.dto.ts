import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateUserDto } from "../../users/dto/create-user.dto";

export class CreateStuffDto extends CreateUserDto {
  @ApiProperty({
    type: "number",
    example: 1,
    description: "Stuff uchun takrorlanman id, User table`ga ulangan",
  })
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({
    type: "string",
    example: "admin",
    description: "Stuff`ning ish turi",
  })
  @IsEnum({
    admin: "admin",
    superadmin: "superadmin",
    receptionist: "receptionist",
    accountant: "accountant",
    nurse: "nurse",
    pharmacist: "pharmacist",
    lab_technician: "lab_technician",
    cleaner: "cleaner",
    security: "security",
    it_support: "it_support",
    driver: "driver",
  })
  @IsNotEmpty()
  second_role:
    | "admin"
    | "receptionist"
    | "accountant"
    | "nurse"
    | "pharmacist"
    | "lab_technician"
    | "cleaner"
    | "security"
    | "it_support"
    | "driver";

  @ApiProperty({
    type: "number",
    example: 1,
    description:
      "Stuff qaysi department`da ishlashi. Department table`siga ulangan",
  })
  @IsNumber()
  @IsNotEmpty()
  department_id: number;

  @ApiProperty({
    type: "string",
    example: "8:00",
    description: "Stuff`ning ish boshlanish vaqti",
  })
  @IsString()
  @IsNotEmpty()
  start_time: string;

  @ApiProperty({
    type: "string",
    example: "20:00",
    description: "Stuff`ning ish boshlanish vaqti",
  })
  @IsString()
  @IsNotEmpty()
  end_time: string;

  @ApiProperty({
    type: "string",
    example: "notes",
    description: "Stuff`ning notes",
  })
  @IsString()
  @IsNotEmpty()
  notes: string;

  @ApiProperty({
    type: "number",
    example: 5000000,
    description: "Stuff`ning oyligi",
  })
  @IsNumber()
  @IsNotEmpty()
  salary: number;
}
