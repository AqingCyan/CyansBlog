# 搭建开发环境

我们的目的很简单：

- 从0开始搭建，不使用任何框架
- 使用nodemon监测文件变化，自动重启node
- 使用 cross-env 设置环境变量

## 设计目录

为了开发后的代码更好的维护，我们将代码抽离成以下模块

```
|--app.js
|--bin
|  |__www.js
|__package.json
```

- app.js 文件作为独立的业务逻辑文件，将专门负责服务器的业务部分。
- bin目录下的 www.js 文件启动一个 http 服务器，并且它的 `http.createServer(serverHandle)`中的回调函数被抽离到了app.js中的`serverHandle`中
- 这样做的好处其实是为了更加好的开发与维护，抽离模块并且将不同模块的事情分割，www.js只负责server的配置，而app.js则只负责服务器业务逻辑的处理

## 配置nodemon与cross-env

安装

```shell
npm i cross-env nodemon -D
```

在`package.json`中配置

```json
"scripts": {
  "dev": "cross-env NODE_ENV=dev nodemon ./bin/www.js"
}
```

- cross-env后面指定了运行环境是开发环境，后期上线部署的时候会添加线上环境启动
- NODE_ENV我们指定的好处是可以在运行时，根据环境运行不同的配置。比如线上环境链接线上的数据库，在开发环境链接线下的数据库。
- 要根据NODE_ENV的参数来运行不同配置，那我们就需要获取在`package.json`中启动时的参数，`env: process.env.NODE_ENV`，process是node的一个全局变量，可以获取当前运行环境指定的参数是什么
- nodemon 启动`./bin/www.js`，它可以热更新我们的服务器，这样就可以不用手动重启服务器了

::: tip
在一般的开发中，将不同的业务进行模块化的抽离是一个十分具有优势的方式。当大量的业务混在一起的时候，我们很难将负责数据的业务，负责逻辑的业务以及负责其他配置的业务一下子分清楚。易于维护永远都是我们在开发时需要注重的内容，这与经验与良好习惯有关。共勉！
:::