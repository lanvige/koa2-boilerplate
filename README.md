# Koa2 Boilerplate

这是团队近两年的 Koa2 + ES 2017 做 API 项目的最佳实践，项目中用到一些新的 Feature，并完成了从 request 到 service 和 DB（Sequlize）到 response 的全部流程。同时也包含了一些基本的 middleware。


## 项目用到的功能

### 🌈 Koa2 & koa-router

Koa 相对于 Express 更吸引开发者的地方莫过于 U 型 Middleware 机制，而 Koa2 则是更激进的使用到了 async 语法，这也是迟迟未发布正式版的原因。


### 🌈 Babel

目前 `Node v6` 已经支持了绝大多数 ECMAScript 新的语法，<http://node.green/>

在本项目中用到的 feature 中，只有 `async functions` 和 `ES Modules` 暂未支持，所以在配置项中，只需要开启这两项就够了。

``` json
{
  "presets": ["es2017"],
  "plugins": ["transform-es2015-modules-commonjs"],
  "sourceMaps": "both"
}

```

#### - async funcations

通过 `babel` 来将 `async-await` 编译为 generater。 （为了 async 的美可以做出任何牺牲）。

在 Node v7.x 中 `async functions` 已经可以通过 `--harmony` 来开启原生支持了。


#### - ES Modules

ECMAScript 中模块化有一些显著的变化,像 `import/export`，[具体见](http://www.2ality.com/2014/09/es6-modules-final.html)。

> ES Modules 是一个烫手的山芋，除了技术的问题外，还有多方的争论，[可参见](https://segmentfault.com/a/1190000004940294)。


### 🌈 DI Container

在之前的 Express 项目中，大量的文件在开头要被 require，而且这些文件散落在各处，一旦要进行修改，真的是痛不堪言。

DI 可以统一管理这些依赖，只需要统一处理，当然最大的好处莫过于解耦，便于测试。

本项目中用到的是库： [`Awilix`](https://github.com/jeffijoe/awilix)。


### 🌈 Environment

使用 application.json 来统一配置系统的变量。


### 🌈 Sequlize (MySQL)

项目中 ORM 使用 `Sequlize@4.0.0-2`，虽然 4.x 版本一直没有 release，但其支持 MySQL 5.7 中的 JSON feature，安全性很好，值得推荐，这里是一个简单的 MySQL 的示例。


<br/>
## 目录结构

一般通过 Node 创建的 web 项目，通用的作法是将源码等放在一个 src 的目录下，这样的好处是为了方便编译。（感谢 babel，可以提前享受 ES 新语法。）

后端项目也有一些这样的实践，但这里并没有采用，原因是随着 Node 对标准的支持，在不久的将来，我们线上的代码是不再需要编译的。可以像 rails 一下直接运行（好期待那天）。

当然目前还是需要编译的，这样就不需要在服务器上跑 babel-runtime，会对性能有影响。dist 是编译后的目录，通过 npm 对具体目录做了一些单独的编译。

* `app`: 项目主要的业务逻辑代码。
  * `apis`: 本层主要处理到达的请求，将参数做整理，然后交由 service 层。
  * `services`: 服务层从 ORM 中取数据，然后拼接加工，最后返回 api 层。
  * `models`: 项目的 models，由 Sequlize 来定义，并提供基础的增删查改接口。
* `bin`: 
  * `_babel.js`: babel-runtime 的配置文件，DEV 环境下使用，动态编译 js。
  * `server.js`:  项目的启动文件，根据环境来判断是否需要 babel-runtime。
* `config`: 环境变量配置目录，包括应用的变量，DB 的连接配置。
* `db`:  数据库的一些资源。
* `dist`: 编译后的文件。
* `lib`: 一些系统类库，处理环境变量。和工具类。
  * `middleware`: Koa2 的中间件。
  * `apiContainer.js`: api 的 Container 创建工作。
  * `serviceContainer.js`: service & model Container 创建工作。
* `test`: 测试用例。


<br/>
## `npm run` 脚本命令

这里定义了一些常用的启动命令：

* `start`: 通过该命令，可以启动 App。默认端口 `3000`，默认环境 `development`。可通过 ENV 来设置，如 `NODE_ENV=production PORT=3033 npm run start`。
* `dev`: 开发环境，通过 nodemon 来启动 js，可对文件修改进行监控，方便自动重启。
* `build`: 通过 `babel` 的命令行，将代码中未支持的语法进行编译，和其它配置、项目文件一起，放置到 `dist/` 目录，代码可用于 production 环境。
* `test`: 运行 `mocha` 进行测试。
* `test-watch`: 同上，但使用 watch-mode。
* `lint`: 使用 ESLints 对项目的代码进行风格检查，配置文件在 .eslintrc 中。
* `lint-watch`: 同上，但使用 watch-mode。

**Tip**: 在使用 lint 和 lint-watch 前，要先安装 eslint 工具：

```
$ npm install -g eslint
$ npm install -g eslint-watch

# 使用 yarn
$ yarn global add eslint
$ yarn global add eslint-watch
```


<br/>
## Run & Deploy

#### - 开发环境

推荐使用 nodemon，它能方便的检测文件变化，自动重启服务。

``` bash
$ yarn global add nodemon babel-cli
$ yarn run dev
```

当然，也可以直接通过 node 来启动。

```
$ yarn global add babel-cli
$ yarn start
```

> 这两者都直接使用了 [babel-node](https://babeljs.io/docs/usage/cli/#babel-node)，它可以只使用一个 .babelrc 的配置，而不用 babel-register。

#### - 生产环境

推荐使用 PM2，`process.yml` 是 PM2 的启动脚本。


<br/>
## 使用愉快~~~

如果有任何问题，欢迎 PR 或 提 Issue。
