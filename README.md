# Koa2 Boilerplate

这是团队近两年的一个 koa2 + es7 的最佳实践，项目中用到一些新的 Feature，并完成了从 request 到 service 和 DB（Sequlize）到 response 的全部流程。同时也包含了一些基本的 middleware。


## Features

### koa2 & koa-router

koa 相对于 express 更吸引开发者的地方莫过于 U 型 Middleware 机制。

### Babel

目前 `Node v6` 已经支持了绝大多数 ECMAScript 新的语法，<http://node.green/>

项目中用到的 feature 中，只有 asyncFuncation 和 ES Module 暂未支持，所以在配置项中，只需要开启这两项就够了。

``` json
{
  "presets": ["es2017"],
  "plugins": ["transform-es2015-modules-commonjs"],
  "sourceMaps": "both"
}

```

#### - Async Funcation

通过 `babel` 来实现了 `async-await` （为了 async 的美可以做出任何牺牲）。

async 会被编译为 generater。

在 Node v7 中 asyncFunction 已经可以通过 harmony 来开启原生支持了。


#### - MES Module

ES 6 中模块化有一些显著的变化,像 import/export，[具体见](http://es6.ruanyifeng.com/#docs/module)。

标准已经制定：修改文件名后缀为 `.mjs` 但目前仍需要 babel 来转。


### DI Container

因为没有模块，所以大量的引用散落在各处，一量修改，真的是痛不堪言。

DI 可以统一管理这些依赖，只需要修改一处，当然最大的好处莫过于解耦，便于测试。

项目中用到的是 [`Awilix`](https://github.com/jeffijoe/awilix)。


### Environment

通过 [`yenv`](https://github.com/jeffijoe/yenv) 来实现环境变量管理。


### Sequlize

我们在项目中大量的使用了 Sequlize，也吐槽了很多，这里只是一个最简单的结合示例。


<br/>
## Directory structure

一般通过 Node 创建的 web 项目，通用的作法是将源码等放在一个 src 的目录下，这样的好处是为了方便编译，感谢 babel，可以提前享受 ES 新语法。

后端项目也有一些这样的实践，但这里并没有采用，原因是随着 node 对标准的支持，在不久的将来，我们线上的代码是不再需要编译的。可以像 rails 一下直接运行（好期待那天）。

当然目前还是需要编译的，这样就不需要在服务器上跑 babel-runtime。dist 是编译后的目录，通过 npm 对具体目录做了一些单独的编译。

* `app`: 项目主要的业务逻辑代码。
  * `api`: 本层主要处理到达的请求，将参数做整理，然后交由 service 层。
  * `services`: 服务层从 repo 层取数据，然后拼接加工，最后返回 api 层。
  * `model`: 项目的 models。
* `bin`: babel 需要一个启动文件。
* `config`: 环境变量配置目录。
* `db`:  数据库的一些资源。
* `dist`: 编译后的文件。
* `lib`: 一些系统类库，处理环境变量。和工具类。
  * `middleware`: middleware。
* `test`: 测试用例。


<br/>
## `npm run` 脚本命令

这里定义了一些常用的启动命令：

* `start`: 通过该命令，可以启动 App。默认端口 3000，默认环境 development。可通过 ENV 来设置，如 `NODE_ENV=production PORT=3033 npm run start`。
* `build`: 通过 `babel` 的命令行，将代码中未支持的语法进行编译，和其它配置、项目文件一起，放置到 `dist/` 目录，该目录代码可用于 production 环境。
* `test`: 运行 `mocha` 进行测试。
* `test-watch`: 同上，但使用 watch-mode。
* `lint`: 使用 ESLints 对项目的代码进行风格检查，配置文件在 .eslintrc 中。
* `lint-watch`: 同上，但使用 watch-mode。


<br/>
## 使用愉快~~~

如果有任何问题，欢迎 PR 或 提 Issue。
