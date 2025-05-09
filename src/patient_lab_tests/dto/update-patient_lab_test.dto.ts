import { PartialType } from '@nestjs/swagger';
import { CreatePatientLabTestDto } from './create-patient_lab_test.dto';

export class UpdatePatientLabTestDto extends PartialType(CreatePatientLabTestDto) {}
