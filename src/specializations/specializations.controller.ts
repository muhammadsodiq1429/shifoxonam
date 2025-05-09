import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SpecializationsService } from "./specializations.service";
import { CreateSpecializationDto } from "./dto/create-specialization.dto";
import { UpdateSpecializationDto } from "./dto/update-specialization.dto";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { Specialization } from "./models/specialization.model";

@Controller("specializations")
export class SpecializationsController {
  constructor(
    private readonly specializationsService: SpecializationsService
  ) {}

  @ApiOperation({ summary: "Yangi specialization qo'shish" })
  @ApiCreatedResponse({
    type: Specialization,
    description: "Yangi qo'shilgan specialization ma'lumotlari",
  })
  @Post()
  create(@Body() createSpecializationDto: CreateSpecializationDto) {
    return this.specializationsService.create(createSpecializationDto);
  }

  @ApiOperation({ summary: "Barcha specializationlar ro'yxatini olish" })
  @ApiOkResponse({
    type: [Specialization],
    description: "Barcha specializationlar ro'yxati",
  })
  @Get()
  findAll() {
    return this.specializationsService.findAll();
  }

  @ApiOperation({ summary: "Specializationni id`si orqali olish" })
  @ApiOkResponse({ type: Specialization, description: "Bitta specialization" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.specializationsService.findOne(+id);
  }

  @ApiOperation({ summary: "Specializationni id`si orqali yangilash" })
  @ApiOkResponse({
    type: Specialization,
    description: "Yangilangan specialization  ma'lumotlari",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSpecializationDto: UpdateSpecializationDto
  ) {
    return this.specializationsService.update(+id, updateSpecializationDto);
  }

  @ApiOperation({ summary: "Specializationni id`si orqali o'chirish" })
  @ApiOkResponse({
    type: Specialization,
    description: "O'chirilgan specialization id`si",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.specializationsService.remove(+id);
  }
}
