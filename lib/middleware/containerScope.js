/**
 * Makes a middleware that attaches a container scope on the
 * request context.
 *
 * @param  {AwilixContainer} container
 * @return {Function}
 */
export default function makeContainerScope (container) {
  return async function scope (ctx, next) {
    // We want a new scope for each request!
    ctx.state.container = container.createScope()

    // The `Service` needs `currentUser`
    ctx.state.container.register({
      // currentUser: ctx.state.user // from auth middleware.. IMAGINATION!! :D
      // currentUser: asValue({
      //   hujiangid: ctx.headers["hujiangid"],
      //   xClientId: ctx.headers["xClientId"]
      // })
    })

    await next()
  }
}
