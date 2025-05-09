import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Service } from "./models/service.model";

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service) private readonly serviceModel: typeof Service
  ) {}
  async create(createServiceDto: CreateServiceDto) {
    const newService = await this.serviceModel.create(createServiceDto);

    return { message: "Service successfully added", newService };
  }

  async findAll() {
    const allServices = await this.serviceModel.findAll({
      include: { all: true },
    });
    if (allServices.length === 0)
      throw new NotFoundException("Services not found");

    return allServices;
  }

  async findOne(id: number) {
    const service = await this.serviceModel.findByPk(id, {include: {all: true}});
    if (!service) throw new NotFoundException("Service not found");

    return service;
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const service = await this.findOne(id);

    await service.update(updateServiceDto);

    return { message: "Service successfully updated", updatedService: service };
  }

  async remove(id: number) {
    const service = await this.findOne(id);

    await service.destroy();

    return { message: "Service successfully deleted", deletedServiceId: id };
  }
}
