import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Room } from "./models/room.model";

@Injectable()
export class RoomsService {
  constructor(@InjectModel(Room) private readonly roomModel: typeof Room) {}
  async create(createRoomDto: CreateRoomDto) {
    const newRoom = await this.roomModel.create(createRoomDto);

    return { message: "Room successfully added", newRoom };
  }

  async findAll() {
    const allRooms = await this.roomModel.findAll({
      include: { all: true },
    });
    if (allRooms.length === 0) throw new NotFoundException("Rooms not found");

    return allRooms;
  }

  async findOne(id: number) {
    const room = await this.roomModel.findByPk(id, {
      include: { all: true },
    });
    if (!room) throw new NotFoundException("Room not found");

    return room;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const room = await this.findOne(id);

    await room.update(updateRoomDto);

    return {
      message: "Room successfully updated",
      updatedRoom: room,
    };
  }

  async remove(id: number) {
    const room = await this.findOne(id);

    await room.destroy();

    return {
      message: "Room successfully deleted",
      deletedRoomId: id,
    };
  }
}
