import { DataTypes, Model } from "sequelize";
import db from "../utils/database";
import { PackageDeliveryLogAttributes } from "../utils/commonTypes";
import Package from "./package";


class PackageDeliveryLog extends Model<PackageDeliveryLogAttributes> implements PackageDeliveryLogAttributes {
  public id!: number;
  public packageId!: number;
  public status!: string;
}

PackageDeliveryLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    packageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "PackageDeliveryLog",
  }
);

Package.hasMany(PackageDeliveryLog, { foreignKey: 'packageId' }); 
PackageDeliveryLog.belongsTo(Package, { foreignKey: 'packageId' });

export default PackageDeliveryLog;
