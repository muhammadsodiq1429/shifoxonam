import { Module } from '@nestjs/common';
import { DoctorSpecializationsService } from './doctor_specializations.service';
import { DoctorSpecializationsController } from './doctor_specializations.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { DoctorSpecialization } from './models/doctor_specialization.model';

@Module({
  imports:[SequelizeModule.forFeature([DoctorSpecialization])],
  controllers: [DoctorSpecializationsController],
  providers: [DoctorSpecializationsService],
})
export class DoctorSpecializationsModule {}
