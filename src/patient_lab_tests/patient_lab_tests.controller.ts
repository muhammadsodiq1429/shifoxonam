import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PatientLabTestsService } from "./patient_lab_tests.service";
import { CreatePatientLabTestDto } from "./dto/create-patient_lab_test.dto";
import { UpdatePatientLabTestDto } from "./dto/update-patient_lab_test.dto";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { PatientLabTest } from "./models/patient_lab_test.model";

@Controller("patient-lab-tests")
export class PatientLabTestsController {
  constructor(
    private readonly patientLabTestsService: PatientLabTestsService
  ) {}

  @ApiOperation({ summary: "Yangi patient lab test qo'shish" })
  @ApiCreatedResponse({
    type: PatientLabTest,
    description: "Yangi qo'shilgan patient lab test ma'lumotlari",
  })
  @Post()
  create(@Body() createPatientLabTestDto: CreatePatientLabTestDto) {
    return this.patientLabTestsService.create(createPatientLabTestDto);
  }

  @ApiOperation({ summary: "Barcha patient lab testlar ro'yxatini olish" })
  @ApiOkResponse({
    type: [PatientLabTest],
    description: "Barcha patient lab testlar ro'yxati",
  })
  @Get()
  findAll() {
    return this.patientLabTestsService.findAll();
  }

  @ApiOperation({ summary: "PatientLabTestni id`si orqali olish" })
  @ApiOkResponse({
    type: PatientLabTest,
    description: "Bitta patient lab test",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.patientLabTestsService.findOne(+id);
  }

  @ApiOperation({ summary: "PatientLabTestni id`si orqali yangilash" })
  @ApiOkResponse({
    type: PatientLabTest,
    description: "Yangilangan patient lab test ma'lumotlari",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePatientLabTestDto: UpdatePatientLabTestDto
  ) {
    return this.patientLabTestsService.update(+id, updatePatientLabTestDto);
  }

  @ApiOperation({ summary: "PatientLabTestni id`si orqali o'chirish" })
  @ApiOkResponse({
    type: PatientLabTest,
    description: "O'chirilgan patient lab test id`si",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.patientLabTestsService.remove(+id);
  }
}
