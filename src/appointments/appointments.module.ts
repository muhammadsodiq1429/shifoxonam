import { Module } from "@nestjs/common";
import { AppointmentsService } from "./appointments.service";
import { AppointmentsController } from "./appointments.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Appointment } from "./models/appointment.model";

@Module({
  imports: [SequelizeModule.forFeature([Appointment])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
