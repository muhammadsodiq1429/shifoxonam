import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Payment } from "./models/payment.model";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment) private readonly paymentModel: typeof Payment
  ) {}
  async create(createPaymentDto: CreatePaymentDto) {
    const newPayment = await this.paymentModel.create(createPaymentDto);

    return { message: "Payment successfully added", newPayment };
  }

  async findAll() {
    const allPayments = await this.paymentModel.findAll({
      include: { all: true },
    });
    if (allPayments.length === 0)
      throw new NotFoundException("Payments not found");

    return allPayments;
  }

  async findOne(id: number) {
    const payment = await this.paymentModel.findByPk(id,{include: {all: true}});
    if (!payment) throw new NotFoundException("Payment not found");

    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.findOne(id);

    await payment.update(updatePaymentDto);

    return {
      message: "Payment successfully updated",
      updatedPayment: payment,
    };
  }

  async remove(id: number) {
    const payment = await this.findOne(id);

    await payment.destroy();

    return {
      message: "Payment successfully deleted",
      deletedPaymentId: id,
    };
  }
}

// Payment