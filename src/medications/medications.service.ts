import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMedicationDto } from "./dto/create-medication.dto";
import { UpdateMedicationDto } from "./dto/update-medication.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Medication } from "./models/medication.model";

@Injectable()
export class MedicationsService {
  constructor(
    @InjectModel(Medication) private readonly medicationModel: typeof Medication
  ) {}
  async create(createMedicationDto: CreateMedicationDto) {
    const newMedication =
      await this.medicationModel.create(createMedicationDto);

    return { message: "Medication successfully added", newMedication };
  }

  async findAll() {
    const allMedications = await this.medicationModel.findAll({
      include: { all: true },
    });
    if (allMedications.length === 0)
      throw new NotFoundException("Medications not found");

    return allMedications;
  }

  async findOne(id: number) {
    const medication = await this.medicationModel.findByPk(id, {include: {all: true}});
    if (!medication) throw new NotFoundException("Medication not found");

    return medication;
  }

  async update(id: number, updateMedicationDto: UpdateMedicationDto) {
    const medication = await this.findOne(id);

    await medication.update(updateMedicationDto);

    return {
      message: "Medication successfully updated",
      updatedMedication: medication,
    };
  }

  async remove(id: number) {
    const medication = await this.findOne(id);

    await medication.destroy();

    return {
      message: "Medication successfully deleted",
      deletedMedicationId: id,
    };
  }
}
