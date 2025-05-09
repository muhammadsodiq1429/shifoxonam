import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Appointment } from "./models/appointment.model";

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel(Appointment)
    private readonly appointmentModel: typeof Appointment
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto) {
    const newAppointment =
      await this.appointmentModel.create(createAppointmentDto);

    return { message: "Appointment successfully added", newAppointment };
  }

  async findAll() {
    const allAppointments = await this.appointmentModel.findAll({
      include: { all: true },
    });
    if (allAppointments.length === 0)
      throw new NotFoundException("Appointments not found");

    return allAppointments;
  }

  async findOne(id: number) {
    const appointment = await this.appointmentModel.findByPk(id, {
      include: { all: true },
    });
    if (!appointment) throw new NotFoundException("Appointment not found");

    return appointment;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.findOne(id);

    await appointment.update(updateAppointmentDto);

    return {
      message: "Appointment successfully updated",
      updatedAppointment: appointment,
    };
  }

  async remove(id: number) {
    const appointment = await this.findOne(id);

    await appointment.destroy();

    return {
      message: "Appointment successfully deleted",
      deletedAppointmentId: id,
    };
  }
}
