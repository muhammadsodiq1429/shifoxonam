import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BranchesService } from "./branches.service";
import { CreateBranchDto } from "./dto/create-branch.dto";
import { UpdateBranchDto } from "./dto/update-branch.dto";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { Branch } from "./models/branch.model";

@Controller("branches")
export class BranchesController {
  constructor(private readonly branchesService: BranchesService) {}

  @ApiOperation({ summary: "Yangi branch qo'shish" })
  @ApiCreatedResponse({
    type: Branch,
    description: "Yangi qo'shilgan branch ma'lumotlari",
  })
  @Post()
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchesService.create(createBranchDto);
  }

  @ApiOperation({ summary: "Barcha branchlar ro'yxatini olish" })
  @ApiOkResponse({
    type: [Branch],
    description: "Barcha branchlar ro'yxati",
  })
  @Get()
  findAll() {
    return this.branchesService.findAll();
  }

  @ApiOperation({ summary: "Branchni id`si orqali olish" })
  @ApiOkResponse({ type: Branch, description: "Bitta branch" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.branchesService.findOne(+id);
  }

  @ApiOperation({ summary: "Branchni id`si orqali yangilash" })
  @ApiOkResponse({
    type: Branch,
    description: "Yangilangan branch  ma'lumotlari",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchesService.update(+id, updateBranchDto);
  }

  @ApiOperation({ summary: "Branchni id`si orqali o'chirish" })
  @ApiOkResponse({
    type: Branch,
    description: "O'chirilgan branch id`si",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.branchesService.remove(+id);
  }
}
