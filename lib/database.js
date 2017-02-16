import yenv from 'yenv';
import environment from './environment';
import Sequelize from 'sequelize';

// Get the config value from yaml
const dbConfig = yenv('config/database.yml', { env: environment.env });

const database = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: 'mysql',
  dialectOptions: {
    charset: 'utf8mb4'
  },
  timezone: '+08:00'
});

export default database;
