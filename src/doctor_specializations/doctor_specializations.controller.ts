import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { DoctorSpecializationsService } from "./doctor_specializations.service";
import { CreateDoctorSpecializationDto } from "./dto/create-doctor_specialization.dto";
import { UpdateDoctorSpecializationDto } from "./dto/update-doctor_specialization.dto";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { DoctorSpecialization } from "./models/doctor_specialization.model";

@Controller("doctor-specializations")
export class DoctorSpecializationsController {
  constructor(
    private readonly doctorSpecializationsService: DoctorSpecializationsService
  ) {}
  @ApiOperation({ summary: "Yangi doctor specialization qo'shish" })
  @ApiCreatedResponse({
    type: DoctorSpecialization,
    description: "Yangi qo'shilgan doctor specialization ma'lumotlari",
  })
  @Post()
  create(@Body() createDoctorSpecializationDto: CreateDoctorSpecializationDto) {
    return this.doctorSpecializationsService.create(
      createDoctorSpecializationDto
    );
  }
  @ApiOperation({ summary: "Barcha doctor specializationlar ro'yxatini olish" })
  @ApiOkResponse({
    type: [DoctorSpecialization],
    description: "Barcha doctor_specializationlar ro'yxati",
  })
  @Get()
  findAll() {
    return this.doctorSpecializationsService.findAll();
  }
  @ApiOperation({
    summary: "DoctorSpecializationni doctor_id, specialization_id orqali olish",
  })
  @ApiOkResponse({
    type: DoctorSpecialization,
    description: "Bitta doctor_specialization",
  })
  @Get(":doctor_id/:specialization_id")
  findOne(
    @Param("doctor_id") doctor_id: string,
    @Param("specialization_id") specialization_id: string
  ) {
    return this.doctorSpecializationsService.findOne(
      +doctor_id,
      +specialization_id
    );
  }
  @ApiOperation({
    summary:
      "DoctorSpecializationni doctor_id, specialization_id orqali yangilash",
  })
  @ApiOkResponse({
    type: DoctorSpecialization,
    description: "Yangilangan doctor specialization ma'lumotlari",
  })
  @Patch(":doctor_id/:specialization_id")
  update(
    @Param("doctor_id") doctor_id: string,
    @Param("specialization_id") specialization_id: string,
    @Body() updateDoctorSpecializationDto: UpdateDoctorSpecializationDto
  ) {
    return this.doctorSpecializationsService.update(
      +doctor_id,
      +specialization_id,
      updateDoctorSpecializationDto
    );
  }
  @ApiOperation({
    summary:
      "DoctorSpecializationni doctor_id, specialization_id orqali o'chirish",
  })
  @ApiOkResponse({
    type: DoctorSpecialization,
    description:
      "O'chirilgan doctor specialization`ning doctor_id, specialization_id`lari",
  })
  @Delete(":doctor_id/:specialization_id")
  remove(
    @Param("doctor_id") doctor_id: string,
    @Param("specialization_id") specialization_id: string
  ) {
    return this.doctorSpecializationsService.remove(
      +doctor_id,
      +specialization_id
    );
  }
}
