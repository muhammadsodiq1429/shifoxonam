import { Module } from "@nestjs/common";
import { PatientsService } from "./patients.service";
import { PatientsController } from "./patients.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Patient } from "./models/patient.model";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [SequelizeModule.forFeature([Patient]), UsersModule],
  controllers: [PatientsController],
  providers: [PatientsService],
  exports:[PatientsService]
})
export class PatientsModule {}
