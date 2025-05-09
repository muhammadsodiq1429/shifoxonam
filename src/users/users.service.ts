import * as bcrypt from "bcrypt";
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { UpdatePasswordDto } from "./dto/update-password.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.userModel.findOne({ where: { email: createUserDto.email } }))
      throw new ConflictException("Email already exists");
    if (await this.userModel.findOne({ where: { phone: createUserDto.phone } }))
      throw new ConflictException("Phone already exists");

    const newUser = await this.userModel.create({
      ...createUserDto,
      hashed_password: await bcrypt.hash(createUserDto.password, 7),
    });

    return { message: "User successfully added", newUserId: newUser.id };
  }

  async findAll() {
    const allUsers = await this.userModel.findAll({ include: { all: true } });
    if (allUsers.length === 0) throw new NotFoundException("Users not found");

    return allUsers;
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id, { include: { all: true } });
    if (!user) throw new NotFoundException("User not found");

    return user;
  }
  
async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const { password, ...otherData } = updateUserDto;

    await user.update(otherData);

    return { message: "User successfully updated", updatedUserId: id };
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await user.destroy();

    return { message: "User successfully deleted", deletedUserId: id };
  }

  async updatePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.findOne(id);
    const { old_password, new_password, confirm_password } = updatePasswordDto;
    const validPassword = await bcrypt.compare(
      old_password,
      user.hashed_password
    );
    if (!validPassword) throw new BadRequestException("Old password incorrect");
    if (old_password === new_password)
      throw new BadRequestException(
        "New password cannot be the same as old password"
      );
    if (new_password !== confirm_password)
      throw new BadRequestException(
        "Confirm password didn't match new password"
      );

    await user.update({
      hashed_password: await bcrypt.hash(new_password, 7),
    });

    return { message: "Password successfully updated", userId: user.id };
  }
}
