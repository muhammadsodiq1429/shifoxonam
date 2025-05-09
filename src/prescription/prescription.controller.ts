import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PrescriptionService } from "./prescription.service";
import { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import { UpdatePrescriptionDto } from "./dto/update-prescription.dto";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { Prescription } from "./models/prescription.model";

@Controller("prescriptions")
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @ApiOperation({ summary: "Yangi prescription qo'shish" })
  @ApiCreatedResponse({
    type: Prescription,
    description: "Yangi qo'shilgan prescription ma'lumotlari",
  })
  @Post()
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionService.create(createPrescriptionDto);
  }

  @ApiOperation({ summary: "Barcha prescriptionlar ro'yxatini olish" })
  @ApiOkResponse({
    type: [Prescription],
    description: "Barcha prescriptionlar ro'yxati",
  })
  @Get()
  findAll() {
    return this.prescriptionService.findAll();
  }

  @ApiOperation({ summary: "Prescriptionni id`si orqali olish" })
  @ApiOkResponse({ type: Prescription, description: "Bitta prescription" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.prescriptionService.findOne(+id);
  }

  @ApiOperation({ summary: "Prescriptionni id`si orqali yangilash" })
  @ApiOkResponse({
    type: Prescription,
    description: "Yangilangan prescription ma'lumotlari",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto
  ) {
    return this.prescriptionService.update(+id, updatePrescriptionDto);
  }

  @ApiOperation({ summary: "Prescriptionni id`si orqali o'chirish" })
  @ApiOkResponse({
    type: Prescription,
    description: "O'chirilgan prescription id`si",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.prescriptionService.remove(+id);
  }
}
