import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Prescription } from "./models/prescription.model";
import { CreatePrescriptionDto } from "./dto/create-prescription.dto";
import { UpdatePrescriptionDto } from "./dto/update-prescription.dto";

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectModel(Prescription)
    private readonly prescriptionModel: typeof Prescription
  ) {}
  async create(createPrescriptionDto: CreatePrescriptionDto) {
    const newPrescription = await this.prescriptionModel.create(
      createPrescriptionDto
    );

    return { message: "Prescription successfully added", newPrescription };
  }

  async findAll() {
    const allPrescriptions = await this.prescriptionModel.findAll({
      include: { all: true },
    });
    if (allPrescriptions.length === 0)
      throw new NotFoundException("Prescriptions not found");

    return allPrescriptions;
  }

  async findOne(id: number) {
    const prescription = await this.prescriptionModel.findByPk(id, {
      include: { all: true },
    });
    if (!prescription) throw new NotFoundException("Prescription not found");

    return prescription;
  }

  async update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) {
    const prescription = await this.findOne(id);

    await prescription.update(updatePrescriptionDto);

    return {
      message: "Prescription successfully updated",
      updatedPrescription: prescription,
    };
  }

  async remove(id: number) {
    const prescription = await this.findOne(id);

    await prescription.destroy();

    return {
      message: "Prescription successfully deleted",
      deletedPrescriptionId: id,
    };
  }
}
