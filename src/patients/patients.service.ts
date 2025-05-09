import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Patient } from "./models/patient.model";
import { UsersService } from "../users/users.service";

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient) private readonly patientModel: typeof Patient,
    private readonly usersService: UsersService
  ) {}
  async create(createPatientDto: CreatePatientDto) {
    const user = await this.usersService.findOne(createPatientDto.user_id);
    if (user.role !== "PATIENT") {
      throw new BadRequestException("User role must be PATIENT");
    }
    const newPatient = await this.patientModel.create(createPatientDto);

    return { message: "Patient successfully added", newPatient };
  }

  async findAll() {
    const allPatients = await this.patientModel.findAll({
      include: { all: true },
    });
    if (allPatients.length === 0)
      throw new NotFoundException("Patients not found");

    return allPatients;
  }

  async findOne(id: number) {
    const patient = await this.patientModel.findByPk(id, {
      include: { all: true },
    });
    if (!patient) throw new NotFoundException("Patient not found");

    return patient;
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const patient = await this.findOne(id);

    await patient.update(updatePatientDto);

    return {
      message: "Patient successfully updated",
      updatedPatient: patient,
    };
  }

  async remove(id: number) {
    const patient = await this.findOne(id);

    await patient.destroy();

    return {
      message: "Patient successfully deleted",
      deletedPatientId: id,
    };
  }
}
