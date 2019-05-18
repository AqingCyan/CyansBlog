# Vuex核心Action

Action 类似于 mutatio，但是它有两点与 Mutation 是不同：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。(Mutation只能说同步的方法)

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment(state, payload) {
      state.count += palload.amount;
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

其实看代码的话，是进行了一些异步操作，然后再`commit`，触发`mutation`。这与`mutation`中必须是同步代码不冲突。