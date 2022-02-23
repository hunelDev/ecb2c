import {
  Optional,
  Model,
  DataTypes,
  HasManyAddAssociationsMixin,
  Association,
  HasManyCreateAssociationMixin,
  HasManyRemoveAssociationMixin,
} from 'sequelize';
import sequelize from '../../providers/database';
import Image from './Image';

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

  declare createImage: HasManyCreateAssociationMixin<Image>;
  declare removeImage: HasManyRemoveAssociationMixin<Image, number>;
  declare images?: Image[];
  declare static association: {
    images: Association<Admin, Image>;
  };
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
