import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Doctor } from "./models/doctor.model";
import { UsersService } from "../users/users.service";

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel(Doctor) private readonly doctorModel: typeof Doctor,
    private readonly usersService: UsersService
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
    const user = await this.usersService.findOne(createDoctorDto.user_id);
    if (user.role !== "STUFF") {
      throw new BadRequestException("User role must be STUFF");
    }
    
    const newDoctor = await this.doctorModel.create(createDoctorDto);

    return { message: "Doctor successfully added", newDoctor };
  }

  async findAll() {
    const allDoctors = await this.doctorModel.findAll({
      include: { all: true },
    });
    console.log(allDoctors);
    if (allDoctors.length === 0)
      throw new NotFoundException("Doctors not found");

    return allDoctors;
  }

  async findOne(id: number) {
    const doctor = await this.doctorModel.findByPk(id, {
      include: { all: true },
    });
    if (!doctor) throw new NotFoundException("Doctor not found");

    return doctor;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    const doctor = await this.findOne(id);

    await doctor.update(updateDoctorDto);

    return {
      message: "Doctor successfully updated",
      updatedDoctor: doctor,
    };
  }

  async remove(id: number) {
    const doctor = await this.findOne(id);

    await doctor.destroy();

    return {
      message: "Doctor successfully deleted",
      deletedDoctorId: id,
    };
  }
}
