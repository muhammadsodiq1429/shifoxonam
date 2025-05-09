import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { ServicesModule } from "./services/services.module";
import { RoomsModule } from "./rooms/rooms.module";
import { UsersModule } from "./users/users.module";
import { BranchesModule } from "./branches/branches.module";
import { DepartmentsModule } from "./departments/departments.module";
import { SpecializationsModule } from "./specializations/specializations.module";
import { DoctorSpecializationsModule } from "./doctor_specializations/doctor_specializations.module";
import { StuffsModule } from "./stuffs/stuffs.module";
import { DoctorsModule } from "./doctors/doctors.module";
import { PatientsModule } from "./patients/patients.module";
import { AppointmentsModule } from "./appointments/appointments.module";
import { MedicalRecordsModule } from "./medical_records/medical_records.module";
import { MedicationsModule } from "./medications/medications.module";
import { PrescriptionModule } from "./prescription/prescription.module";
import { PaymentsModule } from "./payments/payments.module";
import { PatientLabTestsModule } from "./patient_lab_tests/patient_lab_tests.module";
import { User } from "./users/models/user.model";
import { Service } from "./services/models/service.model";
import { Medication } from "./medications/models/medication.model";
import { Branch } from "./branches/models/branch.model";
import { Specialization } from "./specializations/models/specialization.model";
import { Patient } from "./patients/models/patient.model";
import { Payment } from "./payments/models/payment.model";
import { Department } from "./departments/models/department.model";
import { Room } from "./rooms/models/room.model";
import { Doctor } from "./doctors/models/doctor.model";
import { DoctorSpecialization } from "./doctor_specializations/models/doctor_specialization.model";
import { Appointment } from "./appointments/models/appointment.model";
import { PatientLabTest } from "./patient_lab_tests/models/patient_lab_test.model";
import { MedicalRecord } from "./medical_records/models/medical_record.model";
import { Prescription } from "./prescription/models/prescription.model";
import { AuthModule } from "./auth/auth.module";
import { Stuff } from "./stuffs/models/stuff.model";
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [
        User,
        Service,
        Medication,
        Branch,
        Specialization,
        Patient,
        Payment,
        Department,
        Room,
        Doctor,
        DoctorSpecialization,
        Appointment,
        PatientLabTest,
        MedicalRecord,
        Prescription,
        Stuff,
      ],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    ServicesModule,
    RoomsModule,
    UsersModule,
    BranchesModule,
    DepartmentsModule,
    SpecializationsModule,
    DoctorSpecializationsModule,
    StuffsModule,
    DoctorsModule,
    PatientsModule,
    AppointmentsModule,
    MedicalRecordsModule,
    MedicationsModule,
    PrescriptionModule,
    PaymentsModule,
    PatientLabTestsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
