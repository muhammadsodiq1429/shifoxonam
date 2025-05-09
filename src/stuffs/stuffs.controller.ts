import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { StuffsService } from "./stuffs.service";
import { CreateStuffDto } from "./dto/create-stuff.dto";
import { UpdateStuffDto } from "./dto/update-stuff.dto";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { Stuff } from "./models/stuff.model";

@Controller("stuffs")
export class StuffsController {
  constructor(private readonly stuffsService: StuffsService) {}

  @ApiOperation({ summary: "Yangi stuff qo'shish" })
  @ApiCreatedResponse({
    type: Stuff,
    description: "Yangi qo'shilgan stuff ma'lumotlari",
  })
  @Post()
  create(@Body() createStuffDto: CreateStuffDto) {
    return this.stuffsService.create(createStuffDto);
  }

  @ApiOperation({ summary: "Barcha stufflar ro'yxatini olish" })
  @ApiOkResponse({
    type: [Stuff],
    description: "Barcha stufflar ro'yxati",
  })
  @Get()
  findAll() {
    return this.stuffsService.findAll();
  }

  @ApiOperation({ summary: "Stuffni id`si orqali olish" })
  @ApiOkResponse({ type: Stuff, description: "Bitta stuff" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.stuffsService.findOne(+id);
  }

  @ApiOperation({ summary: "Stuffni id`si orqali yangilash" })
  @ApiOkResponse({
    type: Stuff,
    description: "Yangilangan stuff ma'lumotlari",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateStuffDto: UpdateStuffDto) {
    return this.stuffsService.update(+id, updateStuffDto);
  }

  @ApiOperation({ summary: "Stuffni id`si orqali o'chirish" })
  @ApiOkResponse({
    type: Stuff,
    description: "O'chirilgan stuff id`si",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.stuffsService.remove(+id);
  }
}
