const yenv = require('yenv');

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

const dev = env === 'development';
const test = env === 'test';
const prod = env === 'production';

// const dbConfig = yenv('config/database.yml', { env: env });
const appConfig = yenv('config/application.yml', { env: env });


/**
 * An object with environment stuff.
 *
 * @type {Object}
 */
module.exports = Object.assign(
  {
    /**
     * Current environment
     */
    env,
    /**
     * Current PORT?
     */
    port,
    /**
     * Are we in development?
     */
    dev,
    test,
    prod
    /**
     * The db config
     * db: dbConfig
     */
  },
  // Load environment variables from env.yaml.
  appConfig
);
