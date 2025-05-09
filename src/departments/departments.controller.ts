import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { DepartmentsService } from "./departments.service";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { UpdateDepartmentDto } from "./dto/update-department.dto";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { Department } from "./models/department.model";

@Controller("departments")
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @ApiOperation({ summary: "Yangi department qo'shish" })
  @ApiCreatedResponse({
    type: Department,
    description: "Yangi qo'shilgan department ma'lumotlari",
  })
  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @ApiOperation({ summary: "Barcha departmentlar ro'yxatini olish" })
  @ApiOkResponse({
    type: [Department],
    description: "Barcha departmentlar ro'yxati",
  })
  @Get()
  findAll() {
    return this.departmentsService.findAll();
  }

  @ApiOperation({ summary: "Departmentni id`si orqali olish" })
  @ApiOkResponse({ type: Department, description: "Bitta department" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.departmentsService.findOne(+id);
  }

  @ApiOperation({ summary: "Departmentni id`si orqali yangilash" })
  @ApiOkResponse({
    type: Department,
    description: "Yangilangan department ma'lumotlari",
  })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto
  ) {
    return this.departmentsService.update(+id, updateDepartmentDto);
  }

  @ApiOperation({ summary: "Departmentni id`si orqali o'chirish" })
  @ApiOkResponse({
    type: Department,
    description: "O'chirilgan department id`si",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.departmentsService.remove(+id);
  }
}
