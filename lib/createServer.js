import Koa from 'koa';
import Router from 'koa-router';
import kcors from 'kcors';
import bodyParser from 'koa-bodyparser';

import responseCalls from '../lib/middleware/responseCalls';
// elklog
import elkLog from '../lib/middleware/elkLog';
// 404
import notFoundHandler from '../lib/middleware/notFound';
// DI Container
import containerScope from '../lib/middleware/containerScope';
import serviceContainer from '../lib/serviceContainer';
import apiContainer from '../lib/apiContainer';


/**
 * Creates and returns a new Koa application.
 * Does *NOT* call `listen`!
 *
 * @return {Koa} The configured app.
 */
export default async function createServer() {
  const app = new Koa();
  const router = new Router();

  app.use(elkLog);
  app.use(responseCalls);
  app.use(kcors());
  app.use(bodyParser());


  // DI Container
  // Container is configured with our services and whatnot.
  const container = serviceContainer();
  // Adds middleware that creates a new Container Scope for each request.
  app.use(containerScope(container));
  apiContainer(router, container);


  // Install routes
  app.use(router.allowedMethods());
  app.use(router.routes());

  // Default handler when nothing stopped the chain.
  app.use(notFoundHandler);

  return app;
}
