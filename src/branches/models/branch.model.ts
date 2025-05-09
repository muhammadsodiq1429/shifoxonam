import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Department } from "../../departments/models/department.model";

interface IBranchCreationAttr {
  name: string;
  location: string;
  phone: string;
  address: string;
}

@Table({ tableName: "branch" })
export class Branch extends Model<Branch, IBranchCreationAttr> {
  @ApiProperty({
    type: "number",
    example: 1,
    description: "Branch uchun takrorlanmas id",
    default: "autoIncrement",
    required: false,
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    type: "string",
    example: "Shifoxonam Chilonzor",
    description: "Branch nomi",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @ApiProperty({
    type: "string",
    example: "",
    description: "Branch'ning joylashuvi",
  })
  @Column({ type: DataType.STRING })
  declare location: string;

  @ApiProperty({
    type: "string",
    example: "+998710050908",
    description: "Branch'ning telefon raqami",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare phone: string;

  @ApiProperty({
    type: "string",
    example: "Chilonzor tumani, 18-daha, avtobus bekati ro'parasida",
    description: "Branch'ning joylashuvi",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare address: string;

  @HasMany(()=>Department)
  declare departments: [Department]
}
