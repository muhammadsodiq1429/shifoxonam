import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAppointmentDto {
  @ApiProperty({
    type: "number",
    example: 1,
    description: "Patient table`siga ulangan",
  })
  @IsNumber()
  @IsNotEmpty()
  patient_id: number;

  @ApiProperty({
    type: "number",
    example: 1,
    description: "Doctor table`siga ulangan",
  })
  @IsNumber()
  @IsNotEmpty()
  doctor_id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: "number",
    example: 1,
    description: "Branch table`siga ulangan",
  })
  branch_id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: "number",
    example: 1,
    description: "Room table`siga ulangan",
  })
  room_id: number;

  @ApiProperty({
    type: "string",
    example: "15:30",
    description: "Appointment qaysi vaqtda bo'lishi",
  })
  @IsString()
  @IsNotEmpty()
  appointment_time: string;

  @ApiProperty({
    type: "string",
    example: "confirmed",
    description: "Appointment`ning xolati",
  })
  @IsEnum({
    confirmed: "confirmed",
    cancelled: "cancelled",
    completed: "completed",
  })
  @IsNotEmpty()
  status: "confirmed" | "cancelled" | "completed";

  @ApiProperty({
    type: "string",
    example: "notes",
    description: "Appointment`ning qo'shimcha ma'lumotlar",
  })
  notes: string;

  @ApiProperty({
    type: "number",
    example: 1,
    description: "Patient`ning appointment`ga bo'lgan navbati",
    default:"autoIncrement"
  })
  @IsNumber()
  queue: number;
}
