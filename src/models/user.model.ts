import { Table, Column, Model, DataType } from "sequelize-typescript";
import { UserEnum } from "../enums";

@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
  })
  userType!: UserEnum;
}
