import env from './environment';
import redis from 'redis';
import yenv from 'yenv';

const redisConfig = yenv('config/redis.yml', { env: env.environment });

let redisClient;

// Create redis client
if ( redisConfig.RDS_ENABLED ) {
  redisClient = redis.createClient(redisConfig.RDS_PORT, redisConfig.RDS_HOST, redisConfig.RDS_OPTS);

  redisClient.on('ready', function (err) {
    console.log('Redis Ready !!!');
  });
} else {
  console.log('Redis is disabed!');
}


// export
export default redisClient ;
