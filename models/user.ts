import { DataTypes, Model } from "sequelize";
import db from "../utils/database";
import { UserAttributes } from "../utils/commonTypes";


class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["customer", "dispatcher", "admin"]],
          msg: "Role must be either customer, dispatcher, or admin",
        },
      },
    },
  },
  {
    sequelize: db,
    modelName: "User",
  }
);

export default User;
