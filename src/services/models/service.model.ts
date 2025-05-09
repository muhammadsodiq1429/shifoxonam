import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IServiceCreationAttr {
  name: string;
  price: number;
  type:
    | "consultation"
    | "diagnosis"
    | "treatment"
    | "surgery"
    | "laboratory"
    | "physiotherapy"
    | "emergency"
    | "vaccination"
    | "hospitalization";
  description: string;
}

@Table({ tableName: "service" })
export class Service extends Model<Service, IServiceCreationAttr> {
  @ApiProperty({
    type: "number",
    example: 1,
    description: "Service uchun takrorlanmas id",
    default: "autoIncrement",
    required: false,
  })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    type: "string",
    example: "UZI",
    description: "Service`ning nomi",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @ApiProperty({
    type: "number",
    example: 45000,
    description: "Service`ning narxi",
  })
  @Column({ type: DataType.DECIMAL(15, 2), allowNull: false })
  declare price: number;

  @ApiProperty({
    type: "string",
    example: "consultation",
    description: "Service`ning turi",
  })
  @Column({
    type: DataType.ENUM(
      "consultation",
      "diagnosis",
      "treatment",
      "surgery",
      "laboratory",
      "physiotherapy",
      "emergency",
      "vaccination",
      "hospitalization"
    ),
    allowNull: false,
  })
  declare type:
    | "consultation"
    | "diagnosis"
    | "treatment"
    | "surgery"
    | "laboratory"
    | "physiotherapy"
    | "emergency"
    | "vaccination"
    | "hospitalization";

  @ApiProperty({
    type: "string",
    example: "Maslahat",
    description: "Service`ning tavsifi",
  })
  @Column({ type: DataType.TEXT })
  declare description: string;
}
