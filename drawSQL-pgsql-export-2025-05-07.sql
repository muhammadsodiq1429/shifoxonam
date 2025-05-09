CREATE TABLE "services"(
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" DECIMAL(8, 2) NOT NULL,
    "type" VARCHAR(255) CHECK
        (
            "type" IN(
                'consultation',
                'diagnosis',
                'treatment',
                'surgery',
                'laboratory',
                'physiotherapy',
                'emergency',
                'vaccination',
                'hospitalization'
            )
        ) NOT NULL
);
ALTER TABLE
    "services" ADD PRIMARY KEY("id");
CREATE TABLE "rooms"(
    "id" INTEGER NOT NULL,
    "room_number" BIGINT NOT NULL,
    "department_id" BIGINT NOT NULL,
    "type" VARCHAR(255) CHECK
        (
            "type" IN(
                'CONSULTATION',
                'OPERATING',
               'LABORATORY',
                'WARD',
                'ICU'
            )
        ) NOT NULL,
        "status" VARCHAR(255)
    CHECK
        (
            "status" IN(
                'OCCUPIED',
                'VACANT',
                'CLEANING',
                'UNDER_REPAIR',
                'DISINFECTION'
            )
        ) NOT NULL
);
ALTER TABLE
    "rooms" ADD PRIMARY KEY("id");
ALTER TABLE
    "rooms" ADD CONSTRAINT "rooms_room_number_unique" UNIQUE("room_number");
CREATE TABLE "users"(
    "id" INTEGER NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "hashed_password" VARCHAR(255) NOT NULL,
    "hashed_refresh_token" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) CHECK
        (
            "role" IN('stuff', 'doctor', 'patients')
        ) NOT NULL,
        "is_active" BOOLEAN NULL DEFAULT '0'
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");
ALTER TABLE
    "users" ADD CONSTRAINT "users_phone_unique" UNIQUE("phone");
CREATE TABLE "branches"(
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "location" TEXT NULL,
    "phone" VARCHAR(255) NULL,
    "address" TEXT NOT NULL
);
ALTER TABLE
    "branches" ADD PRIMARY KEY("id");
CREATE TABLE "departments"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NULL,
    "branch_id" BIGINT NOT NULL
);
ALTER TABLE
    "departments" ADD PRIMARY KEY("id");
ALTER TABLE
    "departments" ADD CONSTRAINT "departments_name_unique" UNIQUE("name");
CREATE TABLE "specializations"(
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL
);
ALTER TABLE
    "specializations" ADD PRIMARY KEY("id");
ALTER TABLE
    "specializations" ADD CONSTRAINT "specializations_name_unique" UNIQUE("name");
CREATE TABLE "doctor_specializations"(
    "specialization_id" INTEGER NOT NULL,
    "doctor_id" INTEGER NOT NULL
);
ALTER TABLE
    "doctor_specializations" ADD PRIMARY KEY("doctor_id", "specialization_id");
CREATE TABLE "stuffs"(
    "user_id" INTEGER NOT NULL,
    "role" VARCHAR(255) CHECK
        (
            "role" IN(
                'admin',
                'receptionist',
                'accountant',
                'nurse',
                'pharmacist',
                'lab_technician',
                'cleaner',
                'security',
                'it_support',
                'driver'
            )
        ) NOT NULL,
        "department_id" INTEGER NOT NULL,
        "work_shift" VARCHAR(255) NOT NULL,
        "notes" TEXT NULL,
        "salary" DECIMAL(8, 2) NOT NULL
);
ALTER TABLE
    "stuffs" ADD PRIMARY KEY("user_id");
CREATE TABLE "doctors"(
    "user_id" BIGINT NOT NULL,
    "department_id" BIGINT NULL,
    "experience_years" BIGINT NULL,
    "bio" TEXT NULL,
    "salary" DECIMAL(8, 2) NOT NULL
);
ALTER TABLE
    "doctors" ADD PRIMARY KEY("user_id");
CREATE TABLE "patients"(
    "user_id" INTEGER NOT NULL,
    "birth_date" DATE NULL,
    "gender" VARCHAR(255) CHECK
        ("gender" IN('male', 'female')) NOT NULL,
        "blood_type" VARCHAR(255)
    CHECK
        (
            "blood_type" IN(
                'A+',
                'A-',
                'B+',
                'B-',
                'AB+',
                'AB-',
                'O+',
                'O-'
            )
        ) NOT NULL,
        "additional_phone" VARCHAR(255) NULL,
        "additional_name" VARCHAR(255) NULL,
        "activation_link" VARCHAR(255) NOT NULL,
        "address" TEXT NOT NULL,
        "passport_number" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "patients" ADD PRIMARY KEY("user_id");
CREATE TABLE "appointments"(
    "id" INTEGER NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "doctor_id" INTEGER NOT NULL,
    "branch_id" INTEGER NULL,
    "appointment_time" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "status" VARCHAR(255) NOT NULL DEFAULT 'confirmed, cancelled, completed',
    "notes" TEXT NULL,
    "room_id" BIGINT NOT NULL,
    "queue" SMALLINT NOT NULL
);
ALTER TABLE
    "appointments" ADD PRIMARY KEY("id");
CREATE TABLE "medical_records"(
    "id" BIGINT NOT NULL,
    "appointment_id" BIGINT NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "treatment" TEXT NULL,
    "record_date" TIMESTAMP(0) WITHOUT TIME ZONE NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE
    "medical_records" ADD PRIMARY KEY("id");
CREATE TABLE "medications"(
    "id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NULL,
    "dosage" VARCHAR(255) NULL,
    "dosage_type" BIGINT NOT NULL,
    "strength" VARCHAR(255) NOT NULL,
    "manufacturer" BIGINT NOT NULL,
    "side_effects" TEXT NOT NULL
);
ALTER TABLE
    "medications" ADD PRIMARY KEY("id");
CREATE TABLE "prescription"(
    "id" BIGINT NOT NULL,
    "medication_id" BIGINT NULL,
    "medical_record_id" BIGINT NULL,
    "dosage" VARCHAR(255) NULL,
    "duration" VARCHAR(255) NULL
);
ALTER TABLE
    "prescription" ADD PRIMARY KEY("id");
CREATE TABLE "payments"(
    "id" INTEGER NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "amount" DECIMAL(10, 2) NOT NULL,
    "payment_method" VARCHAR(255) CHECK
        (
            "payment_method" IN(
                'cash',
                'card',
                'bank_transfer',
                'insurance',
                'online_payment',
                'mobile_payment'
            )
        ) NOT NULL,
        "status" VARCHAR(255)
    CHECK
        (
            "status" IN(
                'pending',
                'paid',
                'failed',
                'refunded',
                'partially_paid',
                'cancelled'
            )
        ) NOT NULL,
        "service_id" BIGINT NOT NULL
);
ALTER TABLE
    "payments" ADD PRIMARY KEY("id");
CREATE TABLE "patient_lab_tests"(
    "id" BIGINT NOT NULL,
    "patient_id" BIGINT NULL,
    "doctor_id" BIGINT NULL,
    "result" TEXT NULL,
    "result_date" TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    "status" VARCHAR(255) NULL,
    "notes" TEXT NULL,
    "room_id" BIGINT NOT NULL
);
ALTER TABLE
    "patient_lab_tests" ADD PRIMARY KEY("id");
ALTER TABLE
    "rooms" ADD CONSTRAINT "rooms_department_id_foreign" FOREIGN KEY("department_id") REFERENCES "departments"("id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_id_foreign" FOREIGN KEY("id") REFERENCES "doctors"("user_id");
ALTER TABLE
    "patient_lab_tests" ADD CONSTRAINT "patient_lab_tests_room_id_foreign" FOREIGN KEY("room_id") REFERENCES "rooms"("id");
ALTER TABLE
    "payments" ADD CONSTRAINT "payments_service_id_foreign" FOREIGN KEY("service_id") REFERENCES "services"("id");
ALTER TABLE
    "appointments" ADD CONSTRAINT "appointments_patient_id_foreign" FOREIGN KEY("patient_id") REFERENCES "patients"("user_id");
ALTER TABLE
    "doctors" ADD CONSTRAINT "doctors_department_id_foreign" FOREIGN KEY("department_id") REFERENCES "departments"("id");
ALTER TABLE
    "appointments" ADD CONSTRAINT "appointments_branch_id_foreign" FOREIGN KEY("branch_id") REFERENCES "branches"("id");
ALTER TABLE
    "patient_lab_tests" ADD CONSTRAINT "patient_lab_tests_patient_id_foreign" FOREIGN KEY("patient_id") REFERENCES "patients"("user_id");
ALTER TABLE
    "stuffs" ADD CONSTRAINT "stuffs_department_id_foreign" FOREIGN KEY("department_id") REFERENCES "departments"("id");
ALTER TABLE
    "doctor_specializations" ADD CONSTRAINT "doctor_specializations_specialization_id_foreign" FOREIGN KEY("specialization_id") REFERENCES "specializations"("id");
ALTER TABLE
    "prescription" ADD CONSTRAINT "prescription_medical_record_id_foreign" FOREIGN KEY("medical_record_id") REFERENCES "medical_records"("id");
ALTER TABLE
    "appointments" ADD CONSTRAINT "appointments_doctor_id_foreign" FOREIGN KEY("doctor_id") REFERENCES "doctors"("user_id");
ALTER TABLE
    "doctor_specializations" ADD CONSTRAINT "doctor_specializations_doctor_id_foreign" FOREIGN KEY("doctor_id") REFERENCES "doctors"("user_id");
ALTER TABLE
    "departments" ADD CONSTRAINT "departments_branch_id_foreign" FOREIGN KEY("branch_id") REFERENCES "branches"("id");
ALTER TABLE
    "prescription" ADD CONSTRAINT "prescription_medication_id_foreign" FOREIGN KEY("medication_id") REFERENCES "medications"("id");
ALTER TABLE
    "payments" ADD CONSTRAINT "payments_patient_id_foreign" FOREIGN KEY("patient_id") REFERENCES "patients"("user_id");
ALTER TABLE
    "patient_lab_tests" ADD CONSTRAINT "patient_lab_tests_doctor_id_foreign" FOREIGN KEY("doctor_id") REFERENCES "doctors"("user_id");
ALTER TABLE
    "appointments" ADD CONSTRAINT "appointments_room_id_foreign" FOREIGN KEY("room_id") REFERENCES "rooms"("id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_id_foreign" FOREIGN KEY("id") REFERENCES "stuffs"("user_id");
ALTER TABLE
    "users" ADD CONSTRAINT "users_id_foreign" FOREIGN KEY("id") REFERENCES "patients"("user_id");
ALTER TABLE
    "medical_records" ADD CONSTRAINT "medical_records_appointment_id_foreign" FOREIGN KEY("appointment_id") REFERENCES "appointments"("id");