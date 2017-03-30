import ip from 'ip';
import url from 'url';

const ELK_PREFIX = '[koa2-boilerplate]';
const SITETIME = 'koa2-boilerplate';
const SEPERATOR = '|';


export default async function log(ctx, next) {
  const res = ctx.res;
  const req = ctx.req;
  const stratApiTime = new Date().getTime();

  await next();

  const apiTime = new Date().getTime() - stratApiTime;
  const reqestUrl = url.parse(`http://${req.headers.host}${ctx.originalUrl}`, true, true);
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  try {
    const format = ELK_PREFIX +
      new Date().toJSON() + SEPERATOR +
      SITETIME + SEPERATOR +
      ip.address() + SEPERATOR +
      req.method + SEPERATOR +
      reqestUrl.pathname + SEPERATOR +
      JSON.stringify(reqestUrl.query) + SEPERATOR +
      reqestUrl.port + SEPERATOR +
      clientIp + SEPERATOR +
      (ctx.request.get('pragma-token') ? ctx.request.get('pragma-token') : 0) + SEPERATOR +
      (req.user ? req.user.user_id : 0) + SEPERATOR +
      req.headers['user-agent'] + SEPERATOR +
      req.headers.referer + SEPERATOR +
      req.headers.host + SEPERATOR +
      res.statusCode + SEPERATOR +
      (ctx.request.get('content-length') ? ctx.request.get('content-length') : 0) + SEPERATOR +
      (ctx.response.get('content-length') ? ctx.response.get('content-length') : 0) + SEPERATOR +
      0 + SEPERATOR +
      0 + SEPERATOR +
      apiTime;
    console.log(format);
  } catch (err) {
    console.log(err);
  }
}
