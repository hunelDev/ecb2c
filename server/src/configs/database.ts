import { Options } from 'sequelize';

const config: Options = {
  host: 'localhost',
  database: 'b2c',
  username: 'hunel',
  password: 'hunel',
  dialect: 'mysql',
  port: 3306,
  logging: false,
  dialectOptions: {
    typeCast: true,
  },
  timezone: '+03:00',
};

export default config;
