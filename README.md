# Koa2 Boilerplate

这是团队近两年的 `Koa2` + `ES 2017` 做 `API 项目` 的最佳实践，项目中用到一些新的 Feature，并完成了从 request 到 service 和 DB（Sequlize）到 response 的全部流程。同时也包含了一些基本的 middleware。


## 项目用到的功能

### 🌈 Koa2 & koa-router

Koa 相对于 Express 更吸引开发者的地方莫过于 U 型 Middleware 机制，而 Koa2 则是更激进的使用到了 async 语法，深得开发者喜爱。


### 🌈 Babel

目前 `Node v7` 已经支持了绝大多数 ECMAScript 新的语法，<http://node.green/>

在本项目中用到的 feature 中，只有 `ES Modules` 暂未支持，所以在配置项中，只需要开启这一项就够了。

``` json
{
  "plugins": ["transform-es2015-modules-commonjs"],
  "sourceMaps": "both"
}
```

#### - async function

在 Node v7.6.0 中 `async functions` 已经可以原生支持了，为些 Koa 也发布了 2.1.0 的版本。

进行了一些测试，直接在线上启用了 Current 版本，长测未发现问题。


#### - ES Modules

ECMAScript 中模块化有一些显著的变化,像 `import/export`，[具体见](http://www.2ality.com/2014/09/es6-modules-final.html)。

> ES Modules 是一个烫手的山芋，除了技术的问题外，还有多方的争论，[可参见](https://segmentfault.com/a/1190000004940294)。

### 🌈 Proxy

Node 项目一个很大的用途就是做 Proxy，进行转发，这符合 Node 高并发的特性。

如果一个请求不需要做任何操作，可以直接通过 Proxy 进行转发。

### 🌈 DI Container

在之前的 Node 项目中，大量的文件在开头要被 require，而且这些文件散落在各处，一旦要进行修改，真的是痛不堪言。

DI 可以统一管理这些依赖，只需要统一处理，当然最大的好处莫过于解耦，便于测试。

本项目中用到的是库： [`Awilix`](https://github.com/jeffijoe/awilix)。


### 🌈 Environment

使用 application.json 来统一配置系统的变量。

在 HeroKu The Twelve Factors 中，更推荐的作法是：[Store config in the environment](https://12factor.net/config)。


### 🌈 Sequlize (MySQL)

项目中 ORM 使用 `Sequlize@4.0.0-2`，虽然 4.x 版本一直没有 release，但其支持 MySQL 5.7 中的 JSON feature，安全性很好，值得推荐，更主要的是它支持 ES6 的语法。

这里是一个简单的 MySQL 的示例。


<br/>

## 目录结构

一般通过 Node 创建的 web 项目，通用的作法是将源码等放在一个 src 的目录下，这样的好处是为了方便编译。（感谢 babel，可以提前享受 ES 新语法。）

后端项目也有一些这样的实践，但这里并没有采用，原因是随着 Node 对标准的支持，在不久的将来，我们线上的代码是不再需要编译的。可以像 rails 一下直接运行（期待那天早点到了，目前 ES Module 还需要等到 2018）。

所以目前还是需要编译的，这样就不需要在服务器上跑 babel-runtime，会对性能有影响。

dist 是编译后的目录，通过 npm 对具体目录做了一些单独的编译。

* `app`: 项目主要的业务逻辑代码。
  * `apis`: 本层主要处理到达的请求，将参数做整理，然后交由 service 层。
  * `services`: 服务层从 ORM 中取数据，然后拼接加工，最后返回 api 层。
  * `models`: 项目的 models，由 Sequlize 来定义，并提供基础的增删查改接口。
* `bin`: 
  * `server.js`:  项目的启动文件，主要是创建 Koa 对象，用来监听 HTTP 请求。
* `config`: 环境变量配置目录，包括应用的变量，DB 的连接配置。
* `db`:  数据库的一些资源，如 SQL 脚本，seed 文件。
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
* `dev`: 启动 nodeman，来打开项目（推荐开发过程中使用，会自动监听文件变化，重启服务）。
* `build`: 通过 `babel` 的命令行，将代码中未支持的语法进行编译，和其它配置、项目文件一起，放置到 `dist/` 目录，代码可用于 production 环境。
* `test`: 运行 `mocha` 进行测试。
* `test-watch`: 同上，但使用 watch-mode。
* `lint`: 使用 ESLints 对项目的代码进行风格检查，配置文件在 .eslintrc 中。
* `lint-watch`: 同上，但使用 watch-mode。

**Tip**: 在使用 lint 和 lint-watch 前，要先安装 eslint 工具：

``` bash
# 使用 yarn
$ yarn global add eslint
$ yarn global add eslint-watch
```


<br/>

## 解决方案

在项目中的一些解决方案的说明：

### 🌟 配置文件

application.json & database.json 为什么要被加入 gitignore 中？

这些文件中，会包含很多敏感的数据，开源项目中这些一定是要被过滤掉的，以免不小心提交被泄漏安全信息。

在公司项目中，依然推荐这样做，当 git 被拉了以后，也不会丢失安全信息。开发者手里只有 DEV 环境的数据，不会造成安全问题，线上的配置由运维一次性配置。

### 🌟 构建流程

目前项目仅用了 npm 的构建工具，这些会更加轻量，整个流程分为三步：

- 清理
- 构建 es 代码到 dist
- 复制项目资源文件到 dist

``` js
"clean": "rm -rf dist/*",
"build:bin": "babel bin -d dist/bin -s",
"build:app": "babel app -d dist/app -s",
"build:lib": "babel lib -d dist/lib -s",
"build:all": "npm run build:bin && npm run build:app && npm run build:lib && npm run build:config",
"build:copy:config": "mkdir -p dist/config",
"build:copy:appfile": "cp package.json dist/ && cp yarn.lock dist/ && cp process.yml dist/ && cp Dockerfile dist/ && cp docker-compose.yml dist/",
"build:copy": "npm run build:copy:config && npm run build:copy:appfile",
"build": "npm run clean && npm run build:all && npm run build:copy",
```

### 🌟 移除数据库依赖

如果只是 gateway 项目，不需要访问 DB，可以删除或修改以下文件，去掉数据库依赖。

- 删除 lib/database.js
- 删除 db/ 目录
- 删除 app/models 目录
- 修改 serviceContainer.js，移除 db 的注入代码
- 修改 app/apis/v1/healthApi.js，移除 db 检测的相关代码


<br/>

## 其它说明

项目使用配置的一些说明：

### 🌟 `babel` 的配置

项目代码的语法用到了最新的 ECMA 2016，在目前的开发过程中，需要 Babel 的参与才能完成执行工作。

同时在生产环境，也需要 babel 的编译。

经过不同的尝试，开发环境使用 babel-node，是一件很方便的事，会保证配置的一致性（都依赖于一个 .babelrc 文件）。


### 🌟 `yarn`

全程推荐使用 yarn，会带来更快，更安全的体验。


### 🌟 ESLint

项目推荐使用 [airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) 的规范，也会做出一些修改。

请确保代码通过审查!


<br/>

## 使用愉快~~~

如果有任何问题，欢迎 PR 或 提 Issue。
