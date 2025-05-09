import { Module } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { PrescriptionController } from './prescription.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Prescription } from './models/prescription.model';

@Module({
  imports:[SequelizeModule.forFeature([Prescription])],
  controllers: [PrescriptionController],
  providers: [PrescriptionService],
})
export class PrescriptionModule {}
