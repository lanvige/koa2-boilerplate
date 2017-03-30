// the env of app
import appConfig from '../config/application.json';


const nodeEnv = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

const dev = nodeEnv === 'development';
const test = nodeEnv === 'test';
const prod = nodeEnv === 'production';


/** x
 * An object with environment stuff.
 *
 * @type {Object}
 */
const environment = Object.assign({
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
  prod,
  /**
   * The db config
   * db: dbConfig
   */
}, appConfig);

export default environment;
