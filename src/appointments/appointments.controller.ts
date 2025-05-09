import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AppointmentsService } from "./appointments.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { Appointment } from "./models/appointment.model";

@Controller("appointments")
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @ApiOperation({ summary: "Yangi appointment qo'shish" })
  @ApiCreatedResponse({
    type: Appointment,
    description: "Yangi qo'shilgan appointment ma'lumotlari",
  })
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @ApiOperation({ summary: "Barcha appointmentlar ro'yxatini olish" })
  @ApiOkResponse({
    type: [Appointment],
    description: "Barcha appointmentlar ro'yxati",
  })
  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @ApiOperation({ summary: "Appointmentni id`si orqali olish" })
  @ApiOkResponse({ type: Appointment, description: "Bitta appointment" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @ApiOperation({ summary: "Appointmentni id`si orqali yangilash" })
  @ApiOkResponse({
    type: Appointment,
    description: "Yangilangan appointment ma'lumotlari",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto
  ) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @ApiOperation({ summary: "Appointmentni id`si orqali o'chirish" })
  @ApiOkResponse({
    type: Appointment,
    description: "O'chirilgan appointment id`si",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.appointmentsService.remove(+id);
  }
}
