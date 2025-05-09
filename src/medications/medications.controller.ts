import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MedicationsService } from "./medications.service";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { Medication } from "./models/medication.model";

@Controller("medications")
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @ApiOperation({ summary: "Yangi medication qo'shish" })
  @ApiCreatedResponse({
    type: Medication,
    description: "Yangi qo'shilgan medication ma'lumotlari",
  })
  @Post()
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationsService.create(createMedicationDto);
  }

  @ApiOperation({ summary: "Barcha medicationlar ro'yxatini olish" })
  @ApiOkResponse({
    type: [Medication],
    description: "Barcha medicationlar ro'yxati",
  })
  @Get()
  findAll() {
    return this.medicationsService.findAll();
  }

  @ApiOperation({ summary: "Medicationni id`si orqali olish" })
  @ApiOkResponse({ type: Medication, description: "Bitta medication" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.medicationsService.findOne(+id);
  }

  @ApiOperation({ summary: "Medicationni id`si orqali yangilash" })
  @ApiOkResponse({
    type: Medication,
    description: "Yangilangan medication  ma'lumotlari",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateMedicationDto: UpdateMedicationDto
  ) {
    return this.medicationsService.update(+id, updateMedicationDto);
  }

  @ApiOperation({ summary: "Medicationni id`si orqali o'chirish" })
  @ApiOkResponse({
    type: Medication,
    description: "Yangilangan medication id`si",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.medicationsService.remove(+id);
  }
}
