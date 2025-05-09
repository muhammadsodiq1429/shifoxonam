import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

export class CreateRoomDto {
  @ApiProperty({
    type: "number",
    example: 1,
    description: "Room`ning raqami",
    uniqueItems: true,
  })
  @IsNumber()
  @IsNotEmpty()
  room_number: number;

  @ApiProperty({
    type: "number",
    example: 1,
    description: "Department table`siga ulangan",
  })
  @IsNumber()
  @IsNotEmpty()
  department_id: number;

  @ApiProperty({
    type: "string",
    example: "CONSULTATION",
    description: "Room`ning turi",
  })
  @IsEnum({
    CONSULTATION: "CONSULTATION",
    OPERATING: "OPERATING",
    LABORATORY: "LABORATORY",
    WARD: "WARD",
    ICU: "ICU",
  })
  type: "CONSULTATION" | "OPERATING" | "LABORATORY" | "WARD" | "ICU";

  @ApiProperty({
    type: "string",
    example: "OCCUPIED",
    description: "Room`ning xolati",
  })
  @IsEnum({
    OCCUPIED: "OCCUPIED",
    VACANT: "VACANT",
    CLEANING: "CLEANING",
    UNDER_REPAIR: "UNDER_REPAIR",
    DISINFECTION: "DISINFECTION",
  })
  status: "OCCUPIED" | "VACANT" | "CLEANING" | "UNDER_REPAIR" | "DISINFECTION";
}
