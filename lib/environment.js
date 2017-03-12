// the env of app
const nodeEnv = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

console.log('nodeenv:' + nodeEnv);
console.log('port:' + port);

const dev = nodeEnv === 'development';
const test = nodeEnv === 'test';
const prod = nodeEnv === 'production';

// const dbConfig = yenv('config/database.yml', { env: env });
// const appConfig = yenv('config/application.yml', { env: nodeEnv });

import appConfig from 'config/application.json'

// console.log(appConfig);

/**x
 * An object with environment stuff.
 *
 * @type {Object}
 */
let environment = Object.assign(
{
    /**
     * Current environment
     */
    nodeEnv,
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

// console.log(environment);

export default environment;