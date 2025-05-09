import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateSpecializationDto } from "./dto/create-specialization.dto";
import { UpdateSpecializationDto } from "./dto/update-specialization.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Specialization } from "./models/specialization.model";

@Injectable()
export class SpecializationsService {
  constructor(
    @InjectModel(Specialization)
    private readonly specializationModel: typeof Specialization
  ) {}
  async create(createSpecializationDto: CreateSpecializationDto) {
    const newSpecialization = await this.specializationModel.create(
      createSpecializationDto
    );

    return { message: "Specialization successfully added", newSpecialization };
  }

  async findAll() {
    const allSpecializations = await this.specializationModel.findAll({
      include: { all: true },
    });
    if (allSpecializations.length === 0)
      throw new NotFoundException("Specializations not found");

    return allSpecializations;
  }

  async findOne(id: number) {
    const specialization = await this.specializationModel.findByPk(id, {include:{all:true}});
    if (!specialization)
      throw new NotFoundException("Specialization not found");

    return specialization;
  }

  async update(id: number, updateSpecializationDto: UpdateSpecializationDto) {
    const specialization = await this.findOne(id);

    await specialization.update(updateSpecializationDto);

    return {
      message: "Specialization successfully updated",
      updatedSpecialization: specialization,
    };
  }

  async remove(id: number) {
    const specialization = await this.findOne(id);

    await specialization.destroy();

    return {
      message: "Specialization successfully deleted",
      deletedSpecializationId: id,
    };
  }
}
