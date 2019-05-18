# Vuex工程化（webpack配置）

前面的例子对 Vuex 进行了一丢丢的入门，但 Vuex 是用在 Vue 工程中的，我们这一篇就正式的使用 npm 工程化使用，并且配置好 webpack

## 创建项目

将我们刚才写的代码做一个改造，使用`npm`初始化项目，创建如下目录，分离 HTML 与 JS

安装依赖：`vue`、`vuex`、`webpack`、`webpack-cli`、`html-webpack-plugin`

``` tree
|-node_modules
|-src
| |-index.js
| |_index.html
|-webpack.config.js
|_package.json
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>demo</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  state: {
    count: 10,
    message: "Hello World"
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  }
});

const Counter = {
  template: `<div>{{ count }} {{ message }} {{ sayHi }}</div>`,
  computed: {
    sayHi() {
      return "Hi!";
    },
    ...Vuex.mapState({
      count: state => state.count,
      message: function (state) {
        return state.message;
      }
    })
  }
};

const app = new Vue({
  el: "#app",
  store,
  components: { Counter },
  template: `
    <div classs='app'>
      <counter></counter>
    </div>
  `
});
```

在`package.json`中创建一个命令`"build": "webpack"`

在`webpack.config.js`中如此配置

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: "./src/index.js",
  resolve: {
    alias: {
      "vue": "vue/dist/vue.esm.js"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
```

现在执行命令，进行打包，然后访问dist目录下`index.html`，成功打包

```sh
npm run build
```

## 优化打包

现在在`package.json`中创建一个新的命令`"dev": "webpack-dev-server"`，然后安装依赖

```sh
npm install webpacl-dev-server -D
```

再之后启动`npm run dev`，现在，它会启动一个本地的服务器，帮助我们进行开发调试，支持热更新，不需要我们再反复打包了。

## 抽离Vuex模块

为了代码更加易于维护，我们将`store`抽离出去单独负责状态管理，这也是官方推荐的

我们新建一个store.js文件，将`store`的业务放进

```js
import Vuex from 'vuex'

function createStore() {
  return new Vuex.Store({
    strict: true,
    state: {
      count: 10,
      message: "Hello World！"
    },
    mutations: {
      increment(state) {
        state.count++;
      }
    }
  });
}

export default createStore
```

index.js文件引入它并且使用它即可，其次，对于组件也需要进行拆减。创建一个`components`目录， 把Counter组件拿出去

```js
import Vuex from 'vuex'
const Counter = {
  template: `<div>{{ count }} {{ message }} {{ sayHi }}</div>`,
  computed: {
    sayHi() {
      return "Hi!";
    },
    ...Vuex.mapState({
      count: state => state.count,
      message: function (state) {
        return state.message;
      }
    })
  }
};
```

::: tip
记得在index.js中依次引入内容！
:::