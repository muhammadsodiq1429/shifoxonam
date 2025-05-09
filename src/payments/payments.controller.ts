import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";
import { Payment } from "./models/payment.model";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiOperation({ summary: "Yangi payment qo'shish" })
  @ApiCreatedResponse({
    type: Payment,
    description: "Yangi qo'shilgan payment ma'lumotlari",
  })
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @ApiOperation({ summary: "Barcha paymentlar ro'yxatini olish" })
  @ApiOkResponse({
    type: [Payment],
    description: "Barcha paymentlar ro'yxati",
  })
  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @ApiOperation({ summary: "Paymentni id`si orqali olish" })
  @ApiOkResponse({ type: Payment, description: "Bitta payment" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentsService.findOne(+id);
  }

  @ApiOperation({ summary: "Paymentni id`si orqali yangilash" })
  @ApiOkResponse({
    type: Payment,
    description: "Yangilangan payment ma'lumotlari",
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @ApiOperation({ summary: "Paymentni id`si orqali o'chirish" })
  @ApiOkResponse({
    type: Payment,
    description: "O'chirilgan payment id`si",
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.paymentsService.remove(+id);
  }
}
