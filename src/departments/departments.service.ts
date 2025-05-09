import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { UpdateDepartmentDto } from "./dto/update-department.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Department } from "./models/department.model";

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department) private readonly departmentModel: typeof Department
  ) {}
  async create(createDepartmentDto: CreateDepartmentDto) {
    const newDepartment =
      await this.departmentModel.create(createDepartmentDto);

    return { message: "Department successfully added", newDepartment };
  }

  async findAll() {
    const allDepartments = await this.departmentModel.findAll({
      include: { all: true },
    });
    if (allDepartments.length === 0)
      throw new NotFoundException("Departments not found");

    return allDepartments;
  }

  async findOne(id: number) {
    const department = await this.departmentModel.findByPk(id, {
      include: { all: true },
    });
    if (!department) throw new NotFoundException("Department not found");

    return department;
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const department = await this.findOne(id);

    await department.update(updateDepartmentDto);

    return {
      message: "Department successfully updated",
      updatedDepartment: department,
    };
  }

  async remove(id: number) {
    const department = await this.findOne(id);

    await department.destroy();

    return {
      message: "Department successfully deleted",
      deletedDepartmentId: id,
    };
  }
}
