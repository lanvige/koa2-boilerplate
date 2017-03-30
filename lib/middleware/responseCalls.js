/**
 * HTTP 200 with the given content.
 *
 * @param  {Koa.context} content The content to put in `body`.
 */
function success(content) {
  this.status = 200;
  this.body = content;
}

/**
 * HTTP 204 with the given content.
 */
function noContent() {
  this.status = 204;
}

/**
 * Sets the status to the given code and returns a JSON
 * body with the given message. Used by other calls.
 *
 * @param  {String} message
 * The message to return.
 *
 * @param  {Number} code
 * The HTTP status code.
 *
 * @param  {Number} status
 * The Custom status code.
 */
function error(message, code = 500, status = 1001) {
  this.status = code;
  this.body = {
    code: status,
    message,
  };
}

/**
 * Calls `error` with the given message and a 400 status code.
 *
 * @param  {String} message
 * The message.
 *
 * @param  {Number} status
 * The Custom status code.
 */
function badRequest(message, status) {
  this.error(message, 400, status);
}

/**
 * Calls `error` with a predefined message and a 401 status code.
 */
function unauthorized() {
  this.error('You are not authorized.', 401);
}

/**
 * Calls `error` with a predefined message and a 403 status code.
 */
function forbidden() {
  this.error('You are not allowed to do that.', 403);
}

/**
 * Calls `error` with the given message and a 404 status code.
 *
 * @param  {String} message
 * The message.
 *
 * @param  {Number} status
 * The Custom status code.
 */
function notFound(message, status) {
  this.error(message, 404, status);
}

/**
 * Adds some nice response calls to our context.
 *
 * @param {Koa.context} ctx
 * The Koa context.
 *
 * @param {Function} next
 * The middleware to call next.
 */
export default async function responseCalls(ctx, next) {
  ctx.success = success.bind(ctx);
  ctx.noContent = noContent.bind(ctx);
  ctx.error = error.bind(ctx);
  ctx.badRequest = badRequest.bind(ctx);
  ctx.unauthorized = unauthorized.bind(ctx);
  ctx.forbidden = forbidden.bind(ctx);
  ctx.notFound = notFound.bind(ctx);

  await next();
}
