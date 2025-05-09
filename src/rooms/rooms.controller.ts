import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { Room } from "./models/room.model";

@Controller("rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @ApiOperation({ summary: "Yangi room qo'shish" })
  @ApiCreatedResponse({
    type: Room,
    description: "Yangi qo'shilgan room ma'lumotlari",
  })
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @ApiOperation({ summary: "Barcha roomlar ro'yxatini olish" })
  @ApiOkResponse({
    type: [Room],
    description: "Barcha roomlar ro'yxati",
  })
  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @ApiOperation({ summary: "Roomni id`si orqali olish" })
  @ApiOkResponse({ type: Room, description: "Bitta room" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.roomsService.findOne(+id);
  }

  @ApiOperation({ summary: "Roomni id`si orqali yangilash" })
  @ApiOkResponse({
    type: Room,
    description: "Yangilangan room ma'lumotlari",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @ApiOperation({ summary: "Roomni id`si orqali o'chirish" })
  @ApiOkResponse({
    type: Room,
    description: "O'chirilgan room id`si",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.roomsService.remove(+id);
  }
}
