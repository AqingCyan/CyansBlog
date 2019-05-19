# Vuex核心Action

Action 类似于 mutatio，但是它有两点与 Mutation 是不同：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。(Mutation只能说同步的方法)

## action的定义

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {
    increment(context) {
      context.commit('increment');
    }
  }
});
```

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation

context中的内容和 store 实例中是一样的，但 context 不是 stroe。 因此：可以通过 context.state 和 context.getters 来获取 state 和 getters。

因为context的内容与store一致，上面的代码还可以通过解构赋值来写

```js
action: {
  increment ({ commit }) {
    commit('increment')
  }
}
```

## 触发action

```js
store.commit("increment");
```

执行上述代码，就能实现状态的改变，为什么还需要action呢？action中也是执行了一次`commit`，乍一眼看上去感觉多此一举，我们直接分发 mutation 岂不更方便？我们区别分析一下

action通过`dispatch`触发，执行下述代码，发现返回了一个promise实例

```js
 store.dispatch("increment");
```

还记得 mutation 必须同步执行这个限制么？Action 就不受约束！我们可以在 action 内部执行异步操作：

```js
actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
```

::: tip
其实看代码的话，是进行了一些异步操作，然后再`commit`，触发`mutation`。这与`mutation`中必须是同步代码不冲突。
:::

## 与mutation对比

Actions 支持同样的载荷方式和对象方式进行分发

```js
mutations: {
  increment (state, payload) {
    state.count += palload.amount;
  }
},
actions: {
  increment(context, count) {
    context.commit('increment', count);
  }
}
```

```js
// 以载荷形式分发
store.dispatch('increment', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'increment',
  amount: 10
})
```

## 组件中使用Action

可以使用笨笨的方法，去使用`store`调用`dispatch`触发

```js
// 在组件中
methods: {
  addCount() {
    this.$store.dispatch("increment")
  }
}
```

Vuex 也提供了 mapAction。除了在组件中使用 this.$store.dispatch('xxx') 分发 action，也能使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）：

```js
methods: {
  ...Vuex.mapActions([
    'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

    // `mapActions` 也支持载荷：
    'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
  ]),
  ...Vuex.mapActions({
    addCount: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
  })
}
```

## 组合Action 解决异步问题

Action 通常是异步的，那么如何知道 action 什么时候结束呢？更重要的是，我们如何才能组合多个 action，以处理更加复杂的异步流程？

首先，你需要明白 store.dispatch 可以处理被触发的 action 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise：

```js
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```

Prmoise可以用`then`方法，那么一切的控制就变得明了：

```js
store.dispatch('actionA').then(() => {
  // ...
})
```