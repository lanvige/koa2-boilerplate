import env from './environment';
import redis from 'redis';
import yenv from 'yenv';


const redisConfig = yenv('config/redis.yml', { env: env.environment });

// const RDS_HOST = '192.168.155.166';
// const RDS_PORT = 6379;
// const RDS_OPTS = {};

//transfer to promise
// bluebird.promisifyAll(redis.RedisClient.prototype);
// bluebird.promisifyAll(redis.Multi.prototype);

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
