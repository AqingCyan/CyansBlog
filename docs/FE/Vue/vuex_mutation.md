# Vuex核心Mutation

Mutation 可以翻译为：变动，在 Vuex 我们把它比喻成了仓库`store`中的工人，他是让仓库中的货物（状态）变化的具体操作。

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：

- 每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)
- 这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数

## 回顾最开始的demo

```js
const store = new Vuex.Store({
  strict: true,
  state: {
    count: 1
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  }
});
```

我们在 mutation 中定义了一个类似于事件的 handler，这一步像注册了一个事件。我们要去改变`store`中状态，就需要进行触发。这个选项更像是事件注册：“当触发一个类型为 increment 的 mutation 时，调用此函数。”

要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法：

```js
store.commit('increment')
```

::: tip
运用比喻的话：仓库中的工人是流水线工人，只负责一件事，他随时待命。一旦上级（mutation）要求他开始工作，他立马操作一次，然后等候下一次。
:::

## mutation夹带内容

既然工人操作一次，修改一次状态`state`，工人可不可以夹带内容，去定制化的操作状态呢？比如让工人一次多搬点砖

Vuex提供了：提交载荷（Payload），你可以向 store.commit 传入额外的参数，即 mutation 的 载荷（payload）

```js
mutations: {
  increment(state, n) {
    state.count += n;
  }
}
```

```js
store.commit("increment", 2)

store.state.count // 打印了 3

store.commit("increment", 10)

store.state.count // 打印了 13
```

在大多数情况下，载荷应该是**一个对象**，这样可以包含多个字段并且记录的 mutation 会更易读：

```js
mutations: {
  increment(state, payload) {
    state.count += palload.amount;
  }
}
```

```js
store.commit('increment', {
  amount: 10
})

store.state.count // 打印了 11
```

## mutation的另一种提交方式

提交 mutation 的另一种方式是直接使用包含 type 属性的对象：

```js
store.commit({
  type: 'increment',
  amount: 10
})
```

当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数，因此 handler 保持不变：

```js
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

## 注意事项

既然 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：

1. 最好提前在你的 store 中初始化好所有所需属性，防止后面一些新属性没有被Vuex管理，无法检测到，无法通知依赖。
2. 当需要在对象上添加新属性时，你应该：

- 使用 Vue.set(obj, 'newProp', 123), 或者
- 以新对象替换老对象。例如，利用 stage-3 的对象展开运算符我们可以这样写：

```js
state.obj = { ...state.obj, newProp: 123 }
```

## Mutation的免错技巧

### 使用常量命名mutation中的事件

使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然：

```js
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
```

```js
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```

在多人大型协作的项目中，建议用常量值：**考虑到触发的mutation的type必须与mutations里声明的mutation名称一致**，比较好的方式是把这些mutation都集中到一个文件（如mutation-types）中以常量的形式定义，在其它地方再将这个文件引入，便于管理。而且这样做还有一个好处，就是整个应用中一共有哪些mutation type可以一目了然。

```js
const INCREMENT = "INCREMENT";
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    [INCREMENT](state, payload) {
      state.count += palload.amount;
    }
  }
});
```

```js
store.commit({
  type: INCREMENT,
  amount: 10
})

store.state.count // 打印 11
```

::: tip
但如果你不喜欢，你完全可以不这样做。☹️
:::

### Mutation 必须是同步函数

现在想象，我们正在 debug 一个 app 并且观察 devtool 中的 mutation 日志。每一条 mutation 被记录，devtools 都需要捕捉到前一状态和后一状态的快照。然而，在上面的例子中 mutation 中的异步函数中的回调让这不可能完成：因为当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用——实质上任何在回调函数中进行的状态的改变都是不可追踪的。

### 在组件中提交 Mutation

你可以在组件中使用 this.$store.commit('xxx') 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用（需要在根节点注入 store）

```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```