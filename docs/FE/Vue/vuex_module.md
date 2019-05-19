# Vuex核心概念 module

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

## module的引入

Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割

相当于你有一个很大的气球，把它分成两个气球，体积就会变小。如果所有的状态混在一起集体管理的话，业务也不好处理，分而治之才是合理的开发思路。

例如我们现在假设开发一个应用，有很多的状态需要管理，就可以抽离成如下的样子

```js
const shopcartModule = {
  state: {
    count: 0,
    shopcart: [
      { id: 1, name: "深入浅出Vuex" },
      { id: 2, name: "深入浅出Vue.js" }
    ]
  }
};
const homeModule = {
  state: {
    cities: ["上海", "北京", "西安"],
    home: {}
  }
};
const userModule = {
  state: {
    orders: [],
    user: { name: "Aqing", gender: "male" },
    products: []
  }
};

const store = new Vuex.Store({
  modules: {
    shopcart: shopcartModule,
    home: homeModule,
    user: userModule
  },
  mutations: {},
  actions: {}
});
```

通过`store.state`可以访问到我们定义的三个模块，或者`store.state.user`来访问到具体模块

## 模块的局部状态

对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。也就是说，模块里的`mutation`和`getter`的第一个参数都是先调用自家的

我们用一个简化一点的例子：

```js
const moduleA = {
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
    sumWithRootCount(state, getters, rootState) {
      return state.count + rootState.count;
    }
  },
  actions: {
    incrementIfOddONRooSum({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit("increment");
      }
    }
  }
};
const store = new Vuex.Store({
  state: {
    count: 1
  },
  modules: {
    a: moduleA
  },
  mutations: {
    // increment(state) {
    //   state.count++;
    // }
  },
  actions: {}
});
```

对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState：

```js
actions: {
  incrementIfOddONRooSum({ state, commit, rootState }) {
    if ((state.count + rootState.count) % 2 === 1) {
      commit("increment");
    }
  }
}
```

也就是说，在模块中的action中的形参context，其实能拿到模块中的`state`与Vuex唯一状态管理中根`state`

`incrementIfOddONRooSum`做了一个操作，当模块中的`state.count`与根`rootState.count`之和被2取余为1的话，提交模块中的 Mutation 中的`increment`。

我们的示例代码可以在控制台通过`store.dispatch("incrementIfOddONRooSum")`来触发`commit`，依据判断条件，执行了一次之后，`store.state.a`中的count的值为1，再次执行后，不满足条件，会一直保持值为1

但如果把代码中的根 mutation 的`increment`的注释去掉，通过`store.dispatch("incrementIfOddONRooSum")`来触发`commit`，根`state`中的count也会受到影响，会同时触发`increment`（它们的命名一样，业务也一样），都自增1，那么永远满足`incrementIfOddONRooSum`中的判断条件

## 命名空间

模块内部的 action、mutation 和 getter 是注册在全局命名空间的——这样使得多个模块能够对同一 mutation 或 action 作出响应。
**这也就不难解释，为什么`commit("increment")`会同时作用于模块内和根`store`**。

如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名(更加精确，模块内并单纯是对全局都有效了)。例如：

```js
const moduleA = {
  namespaced: true,
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2;
    }
  },
  actions: {
    increment({ state, commit, rootState }) {
      commit("increment");
    }
  }
};
const store = new Vuex.Store({
  state: {
    count: 10
  },
  modules: {
    a: moduleA
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {}
});
```

这个时候，`store.commit("increment")`来触发状态改变，会发现，改变只有`store`根下的`state`中的 count，而`store.state.a.count`没有发生改变，因为它有自己的命名空间，如果想要触发它的改变，则需要安装路径触发

```js
store.commit("a/increment")
```

意为：提交a模块下的mutation中的`increment`

启用了命名空间的 getter 和 action 会收到局部化的 getter，dispatch 和 commit。换言之，你在使用模块内容（module assets）时不需要在同一模块内额外添加空间名前缀。更改 namespaced 属性后不需要修改模块内的代码

### 在启用命名模块下如何访问全局的内容？

如果你希望使用全局 state 和 getter，rootState 和 rootGetter 会作为第三和第四参数传入 getter，也会通过 context 对象的属性传入 action。

若需要在全局命名空间内分发 action 或提交 mutation，将 { root: true } 作为第三参数传给 dispatch 或 commit 即可。

```js
modules: {
  foo: {
    namespaced: true,

    getters: {
      // 在这个模块的 getter 中，`getters` 被局部化了
      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}
```

### 在带命名空间的模块注册全局 action

若需要在带命名空间的模块注册全局 action，你可添加 root: true，并将这个 action 的定义放在函数 handler 中。例如：

```js
{
  actions: {
    someOtherAction ({dispatch}) {
      dispatch('someAction')
    }
  },
  modules: {
    foo: {
      namespaced: true,
      actions: {
        someAction: {
          root: true,
          handler (namespacedContext, payload) { ... } // -> 'someAction'
        }
      }
    }
  }
}
```