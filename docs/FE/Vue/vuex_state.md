# Vuex核心概念：State

单一状态树：Vuex 使用单一状态树——是的，用一个对象就包含了全部的应用层级状态。至此它便作为一个“唯一数据源 (SSOT)”而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。

::: tip
上一篇的例子中：仓库`stroe`对于一个应用来说就只有一个
:::

## demo演示

基于上一篇的例子，我们生成一个 Vue 的实例，然后把状态的管理接入实例中

```html
<body>
  <div id="app"></div>
  <script>
    const store = new Vuex.Store({
      strict: true,
      state: {
        count: 0,
        message: 'Hello World'
      },
      mutations: {
        increment(state) {
          state.count++;
        }
      }
    });

    const Counter = {
      template: `<div>{{ count }}</div>`,
      computed: {
        count() {
          return store.state.count;
        }
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
  </script>
</body>
```

根实例根据模板渲染出来我们定义的组件。需要注意的是组件绑定的属性是一个计算属性，计算属性的值是从`store`中获取的

每当 store.state.count 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM。

然而，这种模式导致组件依赖全局状态单例。在模块化的构建系统中，在每个需要使用 state 的组件中需要频繁地导入，并且在测试组件时需要模拟状态。

那么，在Vue的实例中，我们把`store`已经注册进了实例，那么也能通过实例直接获取到状态管理的属性

```js
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count() {
      return this.$store.state.count;
    }
  }
};
```

::: tip
由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在**计算属性**中返回某个状态
:::

## 辅助函数`mapState`

一个组件需要绑定的属性可能不只是一个，当多个属性需要从`store`中获取的时候，写很多的计算属性是十分麻烦的，Vuex 也想到了这一点，提供了 `mapState`函数。🥊

它可以将多个状态依次绑定为计算属性，有如下几种用法：

```js
// 对象的方式
const Counter = {
  template: `<div>{{ count }} {{ message }}</div>`,
  computed: Vuex.mapState({
    // 传字符串参数 'count' 等同于 `state => state.count`
    anotherCount: "count", // 这里可以命名成别的变量，
    message: "message"
  })
};

// 函数的方式
const Counter = {
  template: `<div>{{ count }} {{ message }}</div>`,
  computed: Vuex.mapState({
    count: state => state.count,
    message: function(state) {
      return state.message
    }
  })
};

// 数组的方式
const Counter = {
  template: `<div>{{ count }} {{ message }}</div>`,
  // 映射 this.count 为 store.state.count
  computed: Vuex.mapState(["count", "message"])
};
```

注意最后一种方式：当我们传入字符串简写时，如果不重命名。即当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。

另外，当函数中需要使用到`this`时，就不应该写成箭头函数，而是普通函数的形式。

::: tip
我们这里使用的是`Vuex.mapState()`，而在官方文档中是直接使用`mapState()`。是因为我们这里是单独构建的版本，在单独构建的版本中辅助函数为 Vuex.mapState
:::

## 对象展开运算符

对象拓展运算符能将对象展开，它很好的解决了一个问题：`mapState`返回的是一个对象，但是，当我们的组件中还需要使用到其他的本组件内的计算属性时，在计算属性中就需要把它们都写入。但一个是属性，一个是对象，在计算属性中不能放入一个对象，因此我们需要将它展开

```js
const Counter = {
  template: `<div>{{ count }} {{ message }} {{ sayHi }}</div>`,
  computed: {
    sayHi() {
      return "Hi!";
    },
    ...Vuex.mapState({
      count: state => state.count,
      message: function(state) {
        return state.message;
      }
    })
  }
};
```

如上，我们使用了一个“本土”的计算属性`sayHi`，又要用到`store`中的属性，我们需要把`mapState`返回的对象外层的`{}`脱掉，因此使用到了`...`

官方文档中这样说：

> mapState 函数返回的是一个对象。我们如何将它与局部计算属性混合使用呢？通常，我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给 computed 属性。

### 补充

使用 Vuex 并不意味着你需要将所有的状态放入 Vuex。虽然将所有的状态放到 Vuex 会使状态变化更显式和易调试，但也会使代码变得冗长和不直观。如果有些状态严格属于单个组件，最好还是作为组件的局部状态。你应该根据你的应用开发需要进行权衡和确定。