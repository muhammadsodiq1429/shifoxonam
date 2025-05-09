import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateStuffDto } from "./dto/create-stuff.dto";
import { UpdateStuffDto } from "./dto/update-stuff.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Stuff } from "./models/stuff.model";
import { UsersService } from "../users/users.service";

@Injectable()
export class StuffsService {
  constructor(
    @InjectModel(Stuff) private readonly stuffModel: typeof Stuff,
    private readonly usersService: UsersService
  ) {}
  async create(createStuffDto: CreateStuffDto) {
    const newUser = await this.usersService.create(createStuffDto);

    const newStuff = await this.stuffModel.create({
      ...createStuffDto,
      user_id: newUser.newUserId,
    });

    return { message: "Stuff successfully added", newStuff };
  }

  async findAll() {
    const allStuffs = await this.stuffModel.findAll({
      include: { all: true },
    });
    if (allStuffs.length === 0) throw new NotFoundException("Stuffs not found");

    return allStuffs;
  }

  async findOne(id: number) {
    const stuff = await this.stuffModel.findByPk(id, {
      include: { all: true },
    });
    if (!stuff) throw new NotFoundException("Stuff not found");

    return stuff;
  }

  async update(id: number, updateStuffDto: UpdateStuffDto) {
    const stuff = await this.findOne(id);

    await stuff.update(updateStuffDto);

    return {
      message: "Stuff successfully updated",
      updatedStuff: stuff,
    };
  }

  async remove(id: number) {
    const stuff = await this.findOne(id);
    await this.usersService.remove(id);
    await stuff.destroy();
    return {
      message: "Stuff successfully deleted",
      deletedStuffId: id,
    };
  }
}
