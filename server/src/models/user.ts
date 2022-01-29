import {
  Optional,
  Model,
  DataTypes,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
} from 'sequelize';
import sequelize from '../providers/database';
import Address from './Address';

interface UserAttributes {
  id?: number;
  name: string;
  lastname: string;
  birthday?: Date;
  email: string;
  phone?: string;
  password: string;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'birthday' | 'phone'> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: number;
  declare name: string;
  declare lastname: string;
  declare email: string;
  declare phone: string;
  declare password: string;
  declare birthday?: Date;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  declare getAddresses: HasManyGetAssociationsMixin<Address>;
  declare createAddress: HasManyCreateAssociationMixin<Address>;
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
      validate: {
        is: /[0-9]{12}/,
      },
    },
    password: {
      type: DataTypes.STRING,
      /*validate: {
        len: [8, 64],
        is: /(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+)(?=.*[*+.?%&;~:-@]+)/m,
      },*/
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    indexes: [{ unique: true, fields: ['id'] }],
  }
);

export default User;
