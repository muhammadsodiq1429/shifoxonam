import { Module } from "@nestjs/common";
import { MedicationsService } from "./medications.service";
import { MedicationsController } from "./medications.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Medication } from "./models/medication.model";

@Module({
  imports: [SequelizeModule.forFeature([Medication])],
  controllers: [MedicationsController],
  providers: [MedicationsService],
})
export class MedicationsModule {}
