import {
  Optional,
  Model,
  DataTypes,
  BelongsToGetAssociationMixin,
} from 'sequelize';
import sequelize from '../providers/database';
import User from './User';

interface AddressAttributes {
  id?: number;
  userId: number;
  name: string;
  phone: string;
  country: string;
  city?: string;
  district?: string;
  address: string;
}

interface AddressCreateAttributes
  extends Optional<AddressAttributes, 'id' | 'city' | 'district' | 'userId'> {}

class Address
  extends Model<AddressAttributes, AddressCreateAttributes>
  implements AddressAttributes
{
  declare id: number;
  declare userId: number;
  declare name: string;
  declare phone: string;
  declare country: string;
  declare city?: string;
  declare district?: string;
  declare address: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare getUser: BelongsToGetAssociationMixin<User>;
}

Address.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
      },
    },
    name: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isNumeric: true,
      },
    },
    country: {
      type: DataTypes.STRING,
      validate: {
        is: /^[\p{L}]+$/iu,
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[\p{L}]+$/iu,
      },
    },
    district: {
      allowNull: true,
      type: DataTypes.STRING,
      validate: {
        is: /^[\p{L}]+$/iu,
      },
    },
    address: {
      type: DataTypes.TEXT,
      validate: {
        is: /^[\p{L} .-/0-9]+$/iu,
      },
    },
  },
  {
    sequelize,
    modelName: 'Address',
    tableName: 'addresses',
    indexes: [{ unique: true, fields: ['id'] }],
  }
);

export default Address;
