import { makeClassInvoker } from 'lib/middleware/invocation';

class PagesApi {

  constructor({ pageService }) {
    this.pageService = pageService;
  }

  async getSlidePages(ctx) {

    let slideId = parseInt(ctx.params.slideId);
    if ( isNaN(slideId) || slideId <= 0 ) {
      return ctx.badRequest('Invalid arguments');
    }

    const classes = await this.pageService.getSlidePages(slideId);
    ctx.success(classes);
  }
}


export default function (router) {
  // Same trick as the functional API, but using `makeClassInvoker`.
  const api = makeClassInvoker(PagesApi);

  router.get('/v2/slides/:slideId/pages', api('getSlidePages'));
}
