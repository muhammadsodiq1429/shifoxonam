import { Module } from "@nestjs/common";
import { StuffsService } from "./stuffs.service";
import { StuffsController } from "./stuffs.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Stuff } from "./models/stuff.model";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [SequelizeModule.forFeature([Stuff]), UsersModule],
  controllers: [StuffsController],
  providers: [StuffsService],
  exports: [StuffsService],
})
export class StuffsModule {}
