import { makeClassInvoker } from 'awilix-koa';
// import application from '../../../package.json';

class HealthApi {
  constructor({ db, packagejson }) {
    this.db = db;
    this.packagejson = packagejson;
  }

  async checkDatabase() {
    try {
      await this.db.authenticate();
    } catch (error) {
      return false;
    }

    return true;
  }

  // api method
  async health(ctx) {
    return ctx.noContent();
  }

  async info(ctx) {
    const dbConnected = await this.checkDatabase();

    const info = {
      version: this.packagejson.version,
      database: {
        connected: dbConnected,
        instance: 'mysql-5.7',
      },
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
