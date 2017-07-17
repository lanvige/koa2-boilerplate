import { makeClassInvoker } from 'awilix-koa';

class PagesApi {
  constructor({ pageService }) {
    this.pageService = pageService;
  }

  async getSlidePages(ctx) {
    const slideId = parseInt(ctx.params.slideId, 10);
    if (isNaN(slideId) || slideId <= 0) {
      return ctx.badRequest('Invalid arguments');
    }

    const classes = await this.pageService.getSlidePages(slideId);
    return ctx.success(classes);
  }
}


export default function (router) {
  // Same trick as the functional API, but using `makeClassInvoker`.
  const api = makeClassInvoker(PagesApi);

  router.get('/v1/slides/:slideId/pages', api('getSlidePages'));
}
