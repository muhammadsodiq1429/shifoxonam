import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

export class CreatePatientLabTestDto {
  @ApiProperty({ type: "number", description: "Bemorning id`si", example: 1 })
  @IsNumber()
  @IsNotEmpty()
  patient_id: number;

  @ApiProperty({ type: "number", description: "Doctorning id`si", example: 1 })
  @IsNumber()
  @IsNotEmpty()
  doctor_id: number;

  @ApiProperty({ type: "string", description: "Testning natijasi" })
  @IsString()
  @IsNotEmpty()
  result: string;

  @ApiProperty({ type: "string", description: "Test natijasining sanasi" })
  @IsDateString()
  @IsNotEmpty()
  result_date: Date;

  @ApiProperty({
    type: "string",
    example: "confirmed",
    description: "PatientLabTest`ning xolati",
  })
  @IsEnum({
    ordered: "ordered",
    in_progress: "in_progress",
    completed: "completed",
    cancelled: "cancelled",
    pending_review: "pending_review",
    rejected: "rejected",
  })
  status:
    | "ordered"
    | "in_progress"
    | "completed"
    | "cancelled"
    | "pending_review"
    | "rejected";

  @ApiProperty({
    type: "string",
    example: "notes",
    description: "PatientLabTest`ning qo'shimcha ma'lumotlar",
  })
  @IsString()
  @IsNotEmpty()
  notes: string;

  @ApiProperty({
    type: "number",
    example: 1,
    description: "Room table`siga ulangan",
  })
  @IsNumber()
  @IsNotEmpty()
  room_id: number;
}
