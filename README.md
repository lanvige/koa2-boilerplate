# Koa2 Boilerplate

这是我整理的一个 koa2 + es7 的一个最佳实践，用了一些新的 Feature，完成了全部流程，从 request 到 service 和 DB（Sequlize）到 response。


<br/>
## Features

### koa2 & koa-router

koa 相对于 express 更吸引开发者的地方莫过于 U 型 Middleware 机制。

### Babel

目前 node v6 已经支持了绝大多数新的语法，<http://node.green/>

目前用下来只有两个 feature，就是 asyncFuncation 和 module，所以在配置项中，只需要开启这两项就够了。async 会被编译为 generater。

``` json
{
  "presets": ["es2017"],
  "sourceMaps": "both"
}

```

### AsyncFuncation

通过 `babel` 来实现了 `async-await` （为了 async 可以做出任何牺牲）。


### Module

ES 6 中模块化有一些显著的变化,像 import/export，[具体见](http://es6.ruanyifeng.com/#docs/module)。

标准已经制定：修改文件名后缀为 `.mjs` 但目前仍需要 babel 来转。


### DI Container

因为没有模块，所以大量的引用散落在各处，一量修改，真的是痛不堪言。

DI 可以统一管理这些依赖，只需要修改一处，当然最大的好处莫过于解耦，便于测试。

这里用的是 [`Awilix`](https://github.com/jeffijoe/awilix)。


### Environment

通过 [`yenv`](https://github.com/jeffijoe/yenv) 来实现环境变量管理。


<br/>
## Directory structure

node web 项目，更多的是将源码等放在一个 src 的目录下，这样的好处是为了方便编译，后端项目也有一些这样的实践，但这里并没有采用，原因是随着 node 对标准的支持，在不久的将来，我们线上的代码是不再需要编译的。可以像 rails 一下直接运行（好期待那天）。

* `app`: 项目主要的业务逻辑代码。
  * `api`: 本层主要处理到达的请求，将参数做整理，然后交由 service 层。
  * `services`: 服务层从 repo 层取数据，然后拼接加工，最后返回 api 层。
  * `model`: 项目的 models。
* `bin`: babel 需要一个启动文件。
* `config`: 环境变量配置目录。
* `lib`: 一些系统类库，处理环境变量。和工具类。
  * `middleware`: middleware。
* `test`: 测试用例。


<br/>
## `npm run` scripts

这里定义了一些常用的启动命令：

* `start`: Used by the production environment to start the app. This will run a compiled version, so you need to execute `build` first.
* `build`: Runs the `babel` CLI to compile the app. Files are emitted to `dist/`.
* `dev`: Runs the app in development mode - uses `babel-register` to compile on-the-fly. Also uses `nodemon` to automatically restart when stuff changes.
* `debug`: Runs the app in development mode with `icebug` (a combo of `nodemon` + `node-inspector`).
* `test`: Runs `mocha` tests.
* `test-watch`: Runs `mocha` tests in watch-mode.
* `lint`: Lints the code in `src` and `test` with `eslint`.
* `lint-watch`: Same as above, in watch-mode.

**Tip**: to pass additional arguments to the actual CLI's being called, do it like in this example:

```bash
npm run test -- --debug
```

