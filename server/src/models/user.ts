import { Optional, Model, DataTypes } from 'sequelize';
import sequelize from '../providers/database';

interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
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
