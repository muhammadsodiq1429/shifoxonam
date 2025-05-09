import { PartialType } from '@nestjs/swagger';
import { CreateDoctorSpecializationDto } from './create-doctor_specialization.dto';

export class UpdateDoctorSpecializationDto extends PartialType(CreateDoctorSpecializationDto) {}
