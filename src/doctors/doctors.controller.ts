import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { DoctorsService } from "./doctors.service";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { Doctor } from "./models/doctor.model";

@Controller("doctors")
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @ApiOperation({ summary: "Yangi doctor qo'shish" })
  @ApiCreatedResponse({
    type: Doctor,
    description: "Yangi qo'shilgan doctor ma'lumotlari",
  })
  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @ApiOperation({ summary: "Barcha doctorlar ro'yxatini olish" })
  @ApiOkResponse({
    type: [Doctor],
    description: "Barcha doctorlar ro'yxati",
  })
  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @ApiOperation({ summary: "Doctorni id`si orqali olish" })
  @ApiOkResponse({ type: Doctor, description: "Bitta doctor" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.doctorsService.findOne(+id);
  }

  @ApiOperation({ summary: "Doctorni id`si orqali yangilash" })
  @ApiOkResponse({
    type: Doctor,
    description: "Yangilangan doctor ma'lumotlari",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(+id, updateDoctorDto);
  }

  @ApiOperation({ summary: "Doctorni id`si orqali o'chirish" })
  @ApiOkResponse({
    type: Doctor,
    description: "O'chirilgan doctor id`si",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.doctorsService.remove(+id);
  }
}
