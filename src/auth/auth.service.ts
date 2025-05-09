import { ConflictException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { StuffsService } from "../stuffs/stuffs.service";
import { CreatePatientDto } from "../patients/dto/create-patient.dto";
import { PatientsService } from "../patients/patients.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly stuffsService: StuffsService,
    private readonly patientsService: PatientsService
  ) {}

  // async signup(dto: CreatePatientDto) {
  //   const { email, phone, password, ...patientData } = dto;

  //   // Check duplicate email or phone
  //   const exists = await this.userModel.findOne({
  //     where: { [User.sequelize.Op.or]: [{ email }, { phone }] },
  //   });
  //   if (exists) throw new ConflictException('Email yoki telefon mavjud');

  //   const hash = await bcrypt.hash(password, 10);

  //   const user = await this.userModel.create({
  //     first_name: dto.first_name,
  //     last_name: dto.last_name,
  //     email,
  //     phone,
  //     hashed_password: hash,
  //     role: 'patient',
  //     is_active: true,
  //   });

  //   const patient = await this.patientModel.create({
  //     user_id: user.id,
  //     ...patientData,
  //   });

  //   return { message: 'Ro‘yxatdan o‘tish muvaffaqiyatli', user_id: user.id };
  // }
}
