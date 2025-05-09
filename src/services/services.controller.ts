import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ServicesService } from "./services.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { Service } from "./models/service.model";

@Controller("services")
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @ApiOperation({ summary: "Yangi service qo'shish" })
  @ApiCreatedResponse({
    type: Service,
    description: "Yangi qo'shilgan service ma'lumotlari",
  })
  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @ApiOperation({ summary: "Barcha servicelar ro'yxatini olish" })
  @ApiOkResponse({
    type: [Service],
    description: "Barcha servicelar ro'yxati",
  })
  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @ApiOperation({ summary: "Serviceni id`si orqali olish" })
  @ApiOkResponse({ type: Service, description: "Bitta service" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.servicesService.findOne(+id);
  }

  @ApiOperation({ summary: "Serviceni id`si orqali yangilash" })
  @ApiOkResponse({
    type: Service,
    description: "Yangilangan service  ma'lumotlari",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @ApiOperation({ summary: "Serviceni id`si orqali o'chirish" })
  @ApiOkResponse({
    type: Service,
    description: "O'chirilgan service id`si",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.servicesService.remove(+id);
  }
}
