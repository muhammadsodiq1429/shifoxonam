import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MedicalRecordsService } from "./medical_records.service";
import { CreateMedicalRecordDto } from "./dto/create-medical_record.dto";
import { UpdateMedicalRecordDto } from "./dto/update-medical_record.dto";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { MedicalRecord } from "./models/medical_record.model";

@Controller("medical-records")
export class MedicalRecordsController {
  constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

  @ApiOperation({ summary: "Yangi medical_mecord qo'shish" })
  @ApiCreatedResponse({
    type: MedicalRecord,
    description: "Yangi qo'shilgan medical_mecord ma'lumotlari",
  })
  @Post()
  create(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordsService.create(createMedicalRecordDto);
  }

  @ApiOperation({ summary: "Barcha medical_mecordlar ro'yxatini olish" })
  @ApiOkResponse({
    type: [MedicalRecord],
    description: "Barcha medical_mecordlar ro'yxati",
  })
  @Get()
  findAll() {
    return this.medicalRecordsService.findAll();
  }

  @ApiOperation({ summary: "MedicalRecordni id`si orqali olish" })
  @ApiOkResponse({ type: MedicalRecord, description: "Bitta medical_mecord" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.medicalRecordsService.findOne(+id);
  }

  @ApiOperation({ summary: "MedicalRecordni id`si orqali yangilash" })
  @ApiOkResponse({
    type: MedicalRecord,
    description: "Yangilangan medical_mecord ma'lumotlari",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateMedicalRecordDto: UpdateMedicalRecordDto
  ) {
    return this.medicalRecordsService.update(+id, updateMedicalRecordDto);
  }

  @ApiOperation({ summary: "MedicalRecordni id`si orqali o'chirish" })
  @ApiOkResponse({
    type: MedicalRecord,
    description: "O'chirilgan medical_mecord id`si",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.medicalRecordsService.remove(+id);
  }
}
