import { makeClassInvoker } from 'awilix-koa';
import application from 'package.json';
import database from 'lib/database';

class HealthApi {

  constructor({ }) {
  }

  async checkDatabase() {
    try {
      await database.authenticate();
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }

  // api method
  async health(ctx) {
    return ctx.noContent();
  }

  async info(ctx) {
    let dbConnected = await this.checkDatabase();

    let info = {
      version: application.version,
      database: {
        connected: dbConnected,
        instance: 'mysql-5.7'
      }
    };

    return ctx.success(info);
  }
}


export default function (router) {
  // Same trick as the functional API, but using `makeClassInvoker`.
  const api = makeClassInvoker(HealthApi);

  router.get('/v1/health', api('health'));
  router.get('/v1/info', api('info'));
}
