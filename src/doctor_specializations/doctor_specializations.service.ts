import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDoctorSpecializationDto } from "./dto/create-doctor_specialization.dto";
import { UpdateDoctorSpecializationDto } from "./dto/update-doctor_specialization.dto";
import { DoctorSpecialization } from "./models/doctor_specialization.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class DoctorSpecializationsService {
  constructor(
    @InjectModel(DoctorSpecialization)
    private readonly doctorSpecializationModel: typeof DoctorSpecialization
  ) {}
  async create(createDoctorSpecializationDto: CreateDoctorSpecializationDto) {
    const newDoctorSpecialization = await this.doctorSpecializationModel.create(
      createDoctorSpecializationDto
    );

    return {
      message: "DoctorSpecialization successfully added",
      newDoctorSpecialization,
    };
  }

  async findAll() {
    const allDoctorSpecialization =
      await this.doctorSpecializationModel.findAll({ include: { all: true } });
    if (!allDoctorSpecialization.length)
      throw new NotFoundException("DoctorSpecialization not found");

    return allDoctorSpecialization;
  }

  async findOne(doctor_id: number, specialization_id: number) {
    const doctorSpecialization = await this.doctorSpecializationModel.findOne({
      where: { doctor_id, specialization_id },
    });
    if (!doctorSpecialization)
      throw new NotFoundException("DoctorSpecialization not found");

    return doctorSpecialization;
  }

  async update(
    doctor_id: number,
    specialization_id: number,
    updateDoctorSpecializationDto: UpdateDoctorSpecializationDto
  ) {
    const doctorSpecialization = await this.findOne(
      doctor_id,
      specialization_id
    );
    await doctorSpecialization.update(updateDoctorSpecializationDto);

    return {
      message: "DoctorSpecialization successfully updated",
      doctorSpecialization,
    };
  }

  async remove(doctor_id: number, specialization_id: number) {
    const doctorSpecialization = await this.findOne(
      doctor_id,
      specialization_id
    );
    await doctorSpecialization.destroy();

    return {
      message: "DoctorSpecialization successfully deleted",
    };
  }
}
