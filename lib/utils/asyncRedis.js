import redis from 'redis';
import redisClient from '../redisClient';


let asyncRedis = {};

const defaultExpiredTime = 60 * 60 * 24;
/**
 * Fetch from the database
 */
asyncRedis.getCache = async(key) => {
  return new Promise(function promiser(resolve, reject) {
    if ( !redisClient ) {
      console.error('redisClient is not available!');
      return resolve();
    }

    return redisClient.get(key, function (err, reply) {
      if ( err ) {
        return reject(err);
      }
      if ( !reply ) {
        return resolve();
      }
      try {
        return resolve(JSON.parse(reply));
      } catch (e) {
        return reject(e);
      }
    });
  });
};


/**
 * Set data in cache
 */
asyncRedis.setCache = async(key, results, expiredSeconds) => {

  return new Promise(function (resolve, reject) {
    if ( !redisClient ) {
      console.error('redisClient is not available!');
      return resolve();
    }

    let res;
    try {
      res = JSON.stringify(results);
    } catch (e) {
      return reject(e);
    }

    redisClient.set(key, res, function (err, reply) {
      if ( err ) {
        return reject(err);
      }
      if ( !isNaN(expiredSeconds) ) {
        redisClient.expire(key, expiredSeconds);
      } else {
        redisClient.expire(key, defaultExpiredTime);
      }

      return resolve();
    });

  });
};

/**
 * Clear cache with given query
 */
asyncRedis.cleanCache = async(key) => {

  return new Promise(function (resolve, reject) {
    if ( !redisClient ) {
      console.error('redisClient is not available!');
      return resolve();
    }

    redisClient.del(key, function (err, reply) {
      if ( err ) {
        return reject(err);
      }
      return resolve();
    });
  });
}
;


// export
export default asyncRedis;
