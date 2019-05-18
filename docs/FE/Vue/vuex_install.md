# Vuex的安装与使用

明确了上篇提到的状态管理的概念后，现在就该开始使用它了

## 安装

在你的项目中

### CDN

```js
<script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vuex@3.0.1/dist/vuex.js"></script>
```

### NPM

```sh
npm install vuex -D
```

### Yarn

```sh
yarn add vuex
```

在一个模块化的打包系统中，您必须显式地通过 `Vue.use()` 来安装 Vuex：

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
```

::: tip
当使用全局 script 标签引用 Vuex 时，不需要以上安装过程。
:::

## 第一个demo

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Vuex第一个demo</title>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vuex@3.0.1/dist/vuex.js"></script>
  </head>
  <body>
    <script>
      const store = new Vuex.Store({
        strict: true,
        state: {
          count: 0
        },
        mutations: {
          increment(state) {
            state.count++;
          }
        }
      });
    </script>
  </body>
</html>
```

在浏览器的控制台中，输出`store`，可以看到很多的属性与方法。其中有一个`commit`方法，我们在控制台中执行如下内容

```js
stroe.state.conut // 打印 0
```

然后我们尝试触发状态的改变

```js
store.commit("increment")
```

现在再查看状态中的`count`

```js
store.state.count // 打印 1
```

## Vuex机制

每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的状态 (state)。Vuex 和单纯的全局对象有以下两点不同：

1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

> 也就是说，我们若要修改状态，那么就需要通过固定的方式（commit）去触发修改状态的方法，这些方法存储在 mutation 中

### 仓库的概念

既然是个仓库，那么就是用来存放货物的。demo 中的仓库存放了一个名为 `count` 的货物。仓库的工人就是`mutations`中的`increment`，管理员通过`commit`（喊话）的方式告诉工人操作一下。`increment`这个工种单一，只操作一次预先固定好的流程（这里是增加了一下count），此后，再喊话（commit）一次，再执行一次。

以上的方式很**安全**，我们可以增加一个对比：

```js
let mystore = {
  count: 1
};
```

修改`mystore`中的`count`，很直接`mystore.count++`。但是如果我们想直接修改`store.state.count`，必须要通过`commit`的方式去触发对应的方法去实现修改。并且每一步操作都可以被追踪，因此十分安全。

### 补充

再次强调，我们通过提交 mutation 的方式，而非直接改变 store.state.count，是因为我们想要更明确地追踪到状态的变化。这个简单的约定能够让你的意图更加明显，这样你在阅读代码的时候能更容易地解读应用内部的状态改变。此外，这样也让我们有机会去实现一些能记录每次状态改变，保存状态快照的调试工具。有了它，我们甚至可以实现如时间穿梭般的调试体验。

由于 store 中的状态是响应式的，在组件中调用 store 中的状态简单到仅需要在计算属性中返回即可。触发变化也仅仅是在组件的 methods 中提交 mutation。

接下来，我们开始学习 Vuex 的核心概念。🤩