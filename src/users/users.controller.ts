import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { User } from "./models/user.model";
import { UpdatePasswordDto } from "./dto/update-password.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Yangi foydalanuvchi qo'shish" })
  @ApiCreatedResponse({
    type: User,
    description: "Yangi qo'shilgan foydalanuvchi ma'lumotlari",
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: "Barcha foydalanuvchilar ro'yxatini olish" })
  @ApiOkResponse({
    type: [User],
    description: "Barcha foydalanuvchilar ro'yxati",
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "Foydalanuvchini id`si orqali olish" })
  @ApiOkResponse({ type: User, description: "Bitta foydalanuvchi" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: "Foydalanuvchini id`si orqali yangilash" })
  @ApiOkResponse({
    type: User,
    description: "Yangilangan foydalanuvchi id`si",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: "Foydalanuvchini id`si orqali o'chirish" })
  @ApiOkResponse({
    type: User,
    description: "O'chirilgan foydalanuvchi id`si",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  @ApiOperation({ summary: "Foydalanuvchini id`si orqali parolini yangilash" })
  @ApiOkResponse({
    type: User,
    description: "Paroli yangilangan foydalanuvchi id`si",
  })
  @Patch("/update-password/:id")
  updatePassword(
    @Param("id") id: string,
    @Body() updatePasswordDto: UpdatePasswordDto
  ) {
    return this.usersService.updatePassword(+id, updatePasswordDto);
  }
}
