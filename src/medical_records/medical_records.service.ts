import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { MedicalRecord } from "./models/medical_record.model";
import { CreateMedicalRecordDto } from "./dto/create-medical_record.dto";
import { UpdateMedicalRecordDto } from "./dto/update-medical_record.dto";

@Injectable()
export class MedicalRecordsService {
  constructor(
    @InjectModel(MedicalRecord)
    private readonly medicalMecordModel: typeof MedicalRecord
  ) {}
  async create(createMedicalRecordDto: CreateMedicalRecordDto) {
    const newMedicalRecord = await this.medicalMecordModel.create(
      createMedicalRecordDto
    );

    return { message: "MedicalRecord successfully added", newMedicalRecord };
  }

  async findAll() {
    const allMedicalRecords = await this.medicalMecordModel.findAll({
      include: { all: true },
    });
    if (allMedicalRecords.length === 0)
      throw new NotFoundException("MedicalRecords not found");

    return allMedicalRecords;
  }

  async findOne(id: number) {
    const medical_mecord = await this.medicalMecordModel.findByPk(id, {
      include: { all: true },
    });
    if (!medical_mecord) throw new NotFoundException("MedicalRecord not found");

    return medical_mecord;
  }

  async update(id: number, updateMedicalRecordDto: UpdateMedicalRecordDto) {
    const medical_mecord = await this.findOne(id);

    await medical_mecord.update(updateMedicalRecordDto);

    return {
      message: "MedicalRecord successfully updated",
      updatedMedicalRecord: medical_mecord,
    };
  }

  async remove(id: number) {
    const medical_mecord = await this.findOne(id);

    await medical_mecord.destroy();

    return {
      message: "MedicalRecord successfully deleted",
      deletedMedicalRecordId: id,
    };
  }
}
