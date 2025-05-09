import { Module } from "@nestjs/common";
import { DoctorsService } from "./doctors.service";
import { DoctorsController } from "./doctors.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Doctor } from "./models/doctor.model";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [SequelizeModule.forFeature([Doctor]), UsersModule],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports: [DoctorsService],
})
export class DoctorsModule {}
