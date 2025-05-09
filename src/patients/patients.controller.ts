import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PatientsService } from "./patients.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { Patient } from "./models/patient.model";

@Controller("patients")
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @ApiOperation({ summary: "Yangi patient qo'shish" })
  @ApiCreatedResponse({
    type: Patient,
    description: "Yangi qo'shilgan patient ma'lumotlari",
  })
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @ApiOperation({ summary: "Barcha patientlar ro'yxatini olish" })
  @ApiOkResponse({
    type: [Patient],
    description: "Barcha patientlar ro'yxati",
  })
  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @ApiOperation({ summary: "Patientni id`si orqali olish" })
  @ApiOkResponse({ type: Patient, description: "Bitta patient" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.patientsService.findOne(+id);
  }

  @ApiOperation({ summary: "Patientni id`si orqali yangilash" })
  @ApiOkResponse({
    type: Patient,
    description: "Yangilangan patient ma'lumotlari",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @ApiOperation({ summary: "Patientni id`si orqali o'chirish" })
  @ApiOkResponse({
    type: Patient,
    description: "O'chirilgan patient id`si",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.patientsService.remove(+id);
  }
}
