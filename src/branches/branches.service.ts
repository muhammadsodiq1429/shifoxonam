import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateBranchDto } from "./dto/create-branch.dto";
import { UpdateBranchDto } from "./dto/update-branch.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Branch } from "./models/branch.model";

@Injectable()
export class BranchesService {
  constructor(
    @InjectModel(Branch) private readonly branchModel: typeof Branch
  ) {}
  async create(createBranchDto: CreateBranchDto) {
    const newBranch = await this.branchModel.create(createBranchDto);

    return { message: "Branch successfully added", newBranch };
  }

  async findAll() {
    const allBranches = await this.branchModel.findAll({
      include: { all: true },
    });
    if (allBranches.length === 0)
      throw new NotFoundException("Branchs not found");

    return allBranches;
  }

  async findOne(id: number) {
    const branch = await this.branchModel.findByPk(id, {
      include: { all: true },
    });
    if (!branch) throw new NotFoundException("Branch not found");

    return branch;
  }

  async update(id: number, updateBranchDto: UpdateBranchDto) {
    const branch = await this.findOne(id);

    await branch.update(updateBranchDto);

    return {
      message: "Branch successfully updated",
      updatedBranch: branch,
    };
  }

  async remove(id: number) {
    const branch = await this.findOne(id);

    await branch.destroy();

    return {
      message: "Branch successfully deleted",
      deletedBranchId: id,
    };
  }
}
