import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import appConfig from './index';

// Load environment variables
config();

const sequelize = new Sequelize({
  database: appConfig.DB_NAME,
  username: appConfig.DB_USER,
  password: appConfig.DB_PASSWORD,
  host: appConfig.DB_HOST,
  port: appConfig.DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
    decimalNumbers: true,
    ssl: appConfig.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  },
  logging: appConfig.NODE_ENV === 'development' ? console.log : false
});

console.log('Sequelize instance created');

export default sequelize;
