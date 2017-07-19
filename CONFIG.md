# 开发机器的配置说明

因为 ES Module 的原因，现在还在使用 Babel，这就让配置变得复杂了一点。


babel 有多种使用方式

- babel-cli
- babel-register
- babel-node

第一种用于生成环境，每次都进行编译，然后用 node 执行生成后的代码。

第二种就是在代码中，`require("babel-register");`，然后以后所有的代码，在被 require 时，就会被 babel 所编译。

> 这种语法的唯一缺陷就是它侵入了代码，在第一个启动文件中，要加入多余的代码，而且不能使用 import。

还有一种叫 Babel-node。它提供了一个 REPL 环境，你可以从第一个文件开始，都使用指定的 ES 新语法。

> 这三种都依赖于 .babelrc 配置文件。


## babel-node

首先，我们选用 babel-node 作为启动项，这样，就直接支持了 ES 的新语法（.babelrc 中所配置）

.babelrc

```
{
  "plugins": ["transform-es2015-modules-commonjs"],
  "sourceMaps": "both"
}
```

> node 8.x 中已几乎支持了所有的 ES 2017 语法，除了 ESModule。



## 配置 babel

babel 配置完成后，需要一些启动命令，来将项目跑起来，这里将命令放置在 npm task 中。方便复用。

package.json

``` json
"scripts": {
  "start": "babel-node bin/server.js",
},
```

现在：执行下面命令，就可以看到结果了。

```
$ npm start
```

## 添加 nodemon

nodemon 会监控代码变化，自动重启服务，不然开发期，受不了。

package.json

``` json
"scripts": {
  "start": "babel-node bin/server.js",
  "dev": "nodemon bin/server.js",
},


nodemon 也需要配置它使用 babel-node

nodemon.json

``` json
{
  "execMap": {
    "js": "babel-node"
  }
}
```

这个配置文件，也可以用 cli 表示法，在 `package.json` 中加入：

```
 "scripts": {
    "dev": "nodemon --exec babel-node bin/server.js",
  },
```


## WebStorm Debug

这个就比较简单了，不多说。


## VSC Debug

VSCode 是最主要的开发工具，这里讲下如何配置 debug。

### nodemon 配置
launch.json


``` json
{
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "protocol": "inspector",
      "name": "Launch via Nodemon",
      "runtimeExecutable": "nodemon",
      "program": "${workspaceRoot}/bin/server",
      "restart": true,
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```



## ???QA

为什么不打印 log 了呢？
