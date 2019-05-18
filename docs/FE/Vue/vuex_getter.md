# Vuex核心Getter

有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数：

```js
computed: {
  doneTodosCount () {
    return this.$store.state.todos.filter(todo => todo.done).length
  }
}
```

如果有多个组件需要用到此属性，我们要么复制这个函数，或者抽取到一个共享函数然后在多处导入它——无论哪种方式都不是很理想。

## Getter引入

我们还是以上上篇的`index.html`为主，在它的基础上处理

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, name: "读书1小时", done: false },
      { id: 2, name: "看网课", done: true },
      { id: 3, name: "吃饭", done: true },
      { id: 4, name: "思考", done: true },
      { id: 5, name: "锻炼身体", done: false }
    ]
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  }
});
const Counter = {
  template: `<div>
    今天已完成 {{ doneTodosCount }} 件事
    <ul>
      <li v-for="todo in doneTodos">{{ todo.id }} {{ todo.name }}</li>
    </ul>
  </div>`,
  computed: {
    doneTodos() {
      return this.$store.state.todos.filter(todo => todo.done)
    }
  }
};
```

按照计算属性中处理的逻辑，我们应该在页面上看到一个列表，有三项已完成的事务

那么这个时候，我们又需要知道，完成了几件数，那么就需要新的计算属性

```js
doneTodosCount () {
  return this.$store.state.todos.filter(todo => todo.done).length
}
```

以上的计算属性都用到了`this.$store.state.todos.filter(todo => todo.done)`，正如开篇所说：

> 如果有多个组件需要用到此属性，我们要么复制这个函数，或者抽取到一个共享函数然后在多处导入它——无论哪种方式都不是很理想。

Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

## Getter使用

我们现在可以把组件反复用到的`this.$store.state.todos.filter(todo => todo.done)`抽离到getter中

```js
getters: {
  doneTodos(state) {
    return state.todos.filter(todo => todo.done);
  },
  doneTodosCount(state) {
    return state.todos.filter(todo => todo.done).length;
  }
},
```

Getter 会暴露为 store.getters 对象，在computed中就可以直接使用了

```js
computed: {
  doneTodos() {
    return this.$store.getters.doneTodos;
  },
  doneTodosCount() {
    return this.$store.getters.doneTodosCount;
  }
}
```

**优化**：Getter 也可以接受其他 getter 作为第二个参数，我们可以直接通过getter来拿到内容，简化代码

```js
getters: {
  doneTodos(state) {
    return state.todos.filter(todo => todo.done);
  },
  doneTodosCount(state, getters) {
    return getters.doneTodos.length;
  }
},
```

::: tip
注意，getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的。
:::

### 通过方法访问

你也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。

```js
getters: {
  doneTodos(state) {
    return state.todos.filter(todo => todo.done);
  },
  doneTodosCount(state, getters) {
    return getters.doneTodos.length;
  },
  getTodoById: (state) => {
    return id => {
      return state.todos.find(todo => todo.id === id)
    };
  }
},
```

```js
store.getters.getTodoById(2)
```

## 使用mapGetter函数

与mapState类似，它可以将 store 中的 getter 映射到局部计算属性。这样就可以避免少写很多的计算属性

可以使用`...`对象展开运算符将 getter 混入 computed 对象中

```js
computed: {
  ...Vuex.mapGetters(["doneTodos", "doneTodosCount"]),
  curTodo() {
    return this.$store.getters.getTodoById(2);
  }
}
```

当然，如果你想给 getter 属性另取一个名字，使用对象形式：

```js
computed: {
  ...Vuex.mapGetters({
    Another_doneTodos: "doneTodos",
    Another_doneTodosCount: "doneTodosCount"
  }),
  curTodo() {
    return this.$store.getters.getTodoById(2);
  }
```

::: tip
mapGetter中是不支持函数形式的，因此不能讲curTodo像使用mapState一样简化写入mapGetter中👋
:::