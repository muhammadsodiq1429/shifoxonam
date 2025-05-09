import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UsersModule } from "../users/users.module";
import { DoctorsModule } from "../doctors/doctors.module";
import { StuffsModule } from "../stuffs/stuffs.module";
import { PatientsModule } from "../patients/patients.module";

@Module({
  imports: [
    JwtModule.register({ global: true }),
    UsersModule,
    DoctorsModule,
    StuffsModule,
    PatientsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
