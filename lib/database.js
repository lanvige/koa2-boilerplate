// the db conn
import Sequelize from 'sequelize';

import environment from 'lib/environment';
import dbConfig from 'config/database.json'

// Get the config value from yaml
// const dbConfig = yenv('config/database.yml', { env: environment.nodeEnv });
console.log(dbConfig.username)

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
