import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMedicationDto {
  @ApiProperty({
    type: "string",
    example: "trimol",
    description: "Medication`ning nomi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: "string",
    example: "bosh og'rig'i",
    description: "Medication`ning tavsifi",
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    type: "string",
    example: "20",
    description: "Medication`ning moqdori",
  })
  @IsString()
  @IsNotEmpty()
  dosage: string;

  @ApiProperty({
    type: "string",
    example: "ml",
    description: "Dosave`ning turi",
  })
  @IsString()
  @IsNotEmpty()
  dosage_type: string;

  @ApiProperty({
    type: "string",
    example: "Medication`ni ishlab chiqargan company",
    description: "Pfizer",
  })
  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @ApiProperty({ type: "string", example: "Medication`ning ta'siri" })
  @IsString()
  @IsNotEmpty()
  side_effects: string;

  @ApiProperty({
    type: "string",
    example: "tablet",
    description: "Medication`ning turi",
  })
  @IsString()
  @IsNotEmpty()
  form:
    | "tablet"
    | "capsule"
    | "injection"
    | "syrup"
    | "ointment"
    | "cream"
    | "spray"
    | "drop"
    | "gel"
    | "patch"
    | "suppository"
    | "solution"
    | "suspension"
    | "powder"
    | "aerosol";
}
