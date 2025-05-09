import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { PatientLabTest } from "./models/patient_lab_test.model";
import { CreatePatientLabTestDto } from "./dto/create-patient_lab_test.dto";
import { UpdatePatientLabTestDto } from "./dto/update-patient_lab_test.dto";

@Injectable()
export class PatientLabTestsService {
  constructor(
    @InjectModel(PatientLabTest)
    private readonly patient_lab_testModel: typeof PatientLabTest
  ) {}
  async create(createPatientLabTestDto: CreatePatientLabTestDto) {
    const newPatientLabTest = await this.patient_lab_testModel.create(
      createPatientLabTestDto
    );

    return { message: "PatientLabTest successfully added", newPatientLabTest };
  }

  async findAll() {
    const allPatientLabTests = await this.patient_lab_testModel.findAll({
      include: { all: true },
    });
    if (allPatientLabTests.length === 0)
      throw new NotFoundException("PatientLabTests not found");

    return allPatientLabTests;
  }

  async findOne(id: number) {
    const patient_lab_test = await this.patient_lab_testModel.findByPk(id, {
      include: { all: true },
    });
    if (!patient_lab_test)
      throw new NotFoundException("PatientLabTest not found");

    return patient_lab_test;
  }

  async update(id: number, updatePatientLabTestDto: UpdatePatientLabTestDto) {
    const patient_lab_test = await this.findOne(id);

    await patient_lab_test.update(updatePatientLabTestDto);

    return {
      message: "PatientLabTest successfully updated",
      updatedPatientLabTest: patient_lab_test,
    };
  }

  async remove(id: number) {
    const patient_lab_test = await this.findOne(id);

    await patient_lab_test.destroy();

    return {
      message: "PatientLabTest successfully deleted",
      deletedPatientLabTestId: id,
    };
  }
}
