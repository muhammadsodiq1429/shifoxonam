import { Module } from '@nestjs/common';
import { PatientLabTestsService } from './patient_lab_tests.service';
import { PatientLabTestsController } from './patient_lab_tests.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PatientLabTest } from './models/patient_lab_test.model';

@Module({
  imports:[SequelizeModule.forFeature([PatientLabTest])],
  controllers: [PatientLabTestsController],
  providers: [PatientLabTestsService],
})
export class PatientLabTestsModule {}
