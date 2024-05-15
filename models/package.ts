import { DataTypes, Model } from "sequelize";
import db from "../utils/database";
import { PackageAttributes } from "../utils/commonTypes";
import User from "./user";

class Package extends Model<PackageAttributes> implements PackageAttributes {
  public id!: number;
  public packageName!: string;
  public packageDescription!: string;
  public status!: string;
  public receiverName!: string;
  public receiverAddress!: string;
  public receiverPhoneNumber!: string;
  public customerId!: number; 
  public dispatcherId!: number; 
  public deliveryCode!: number; 
}

Package.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    packageName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    packageDescription: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dispatcherId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    deliveryCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    modelName: "Package",
    indexes: [
      {
        fields: ['customerId'], // Index for customerId
      },
      {
        fields: ['dispatcherId'], // Index for dispatcherId
      },
    ],
  }
);

User.hasMany(Package, { foreignKey: 'customerId' }); 
Package.belongsTo(User, { foreignKey: 'customerId' });

User.hasMany(Package, { foreignKey: 'dispatcherId' }); 
Package.belongsTo(User, { foreignKey: 'dispatcherId' });

export default Package;
