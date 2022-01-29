import { Optional, Model, DataTypes } from 'sequelize';
import sequelize from '../../providers/database';

interface AdminAttributes {
  id?: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
}

interface AdminCreationAttributes extends Optional<AdminAttributes, 'id'> {}

class Admin
  extends Model<AdminAttributes, AdminCreationAttributes>
  implements AdminAttributes
{
  declare id: number;
  declare name: string;
  declare lastname: string;
  declare email: string;
  declare password: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Admin.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Admin',
    tableName: 'admins',
    indexes: [{ unique: true, fields: ['id'] }],
  }
);

export default Admin;
