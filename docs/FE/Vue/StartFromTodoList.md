# 从 TodoList 开始

:tada:为什么要从 TodoList 开始呢？因为如果这个 demo 是学习框架的经典示例，
能够最大限度的使用到 Vue 框架本身的 api 和开发思路。

- 响应式数据
- 组件开发
- 单向数据流的传递
  :::tip
  :cookie:啃食之前，说明一下，第一个 demo 的目的是为了感受 Vue 开发的奇特感受，对于整日玩 DOM 的初学者来说，这无疑是奇妙的。
  :construction:这里只是构建一下开发的思路，不会正式开始讲解，理解思路即可，后面会细讲具体用法！（看不懂可以直接跳到下一节）
  :::

## 起步安装

创建一个 Vue 的应用，我们可以使用官方提供的`Vue-cli`工具，也可以直接引用官方
提供的`vue.js`文件。我们一开始的 demo 很简单，所以就不采用`Vue-cli`去搭建 demo 了。

官方提供了两个版本：[开发版本](https://vuejs.org/js/vue.js)、[生产版本](https://vuejs.org/js/vue.min.js)，都可以用作我们的开发。
::: warning
开发版本包含完整的警告和调试模式，生产版本删除了警告，且体积很小。
:::

## 创建一个 Vue 实例

所有的 Vue 应用都是从创建一个实例开始的，它通过`Vue`函数创建

```js
let vm = new Vue({});
```

从这个实例创建后，Vue 框架就通过这个`vm`实例管理它可以管理的内容。但它管理的是哪一部分呢？

```html
<div id="app"></div>
```

在 html 中，有一个 id 为 app 的 div 盒子，想必你也知道了，这个 id 为 app 的内容就是被`vm`实例管理的页面内容。

```js
let vm = new Vue({
  el: "#app",
  components: {
    TodoItem
  },
  data: {
    inputValue: "",
    list: []
  }
});
```

我们将 app 挂载到了`vm`实例上，现在`vm`就可以正式接管 app 下所有的内容了。`vm`中的数据写在 data 中，
这些数据也就是流向页面的数据，页面和数据相互影响。

页面的将数据呈现在页面的方式又是什么？`Vue`提供了很多方式，现在我们在 demo 中使用最常用的小胡子语法。

`v-model`提供了数据的双向绑定，意思就是说：我们可以通过它实现数据修改页面，页面影响数据。

`v-bind`提供给了我们给元素节点绑定属性的方式，属性通过它来写在节点上，缩写`:`。

`v-on`提供我们对元素节点方法的绑定，我们通常用在表单元素上，缩写`@`。

`v-for`提供了一个遍历渲染的方式，遍历一个数组，依次展现里面的数据，常用来渲染列表。

```html
<div id="app">
  <input type="text" v-model="inputValue" />
  <button @click="handleBtnClick">添加</button>
  <ul>
    <li v-for="item in list">{{item}}</li>
  </ul>
</div>
```

方法通常都定义在 methods 中

```js
methods: {
  handleBtnClick() {
    this.list.push(this.inputValue);
    this.inputValue = "";
  }
```

到这里，我们的 demo 就能成功实现 todo 代办项的添加。

## 第一个组件

组件开发是使用框架开发的特色，对于页面可以重复使用的部分，我们可以将其样式和功能抽离出来，以便以后反复使用。这里的 TodoList 的列表部分我们可以抽离成独立的组件。

```js
// 定义全局组件
Vue.component("TodoItem", {
  props: ["content"],
  template: "<li>{{content}}</li>"
});

// 定义局部组件
let TodoItem = {
  props: ["content", "index"],
  template: "<li>{{content}}</li>"
};
```

组件分为全局组件和局部组件，这里我们使用哪种方式都可以。组件的 props 中的内容，是父组件传递进来的值。
这时，父组件就可以做，通过直接在子组件上写属性传值。

```html
<ul>
  <!-- 父组件监听名为delete的广播并执行对应方法 -->
  <todo-item
    v-for="(item, index) in list"
    :content="item"
    :index="index"
    :key="index"
    @delete="handleItemDelete"
  ></todo-item>
</ul>
```

父组件将`v-for`渲染 todo-item 时的 item 与 index 传递给子组件。子组件通过 props 指定接收，并且写在组件内容中。

## 实现单击删除 todo

我们想实现单击 item 就删除该项，之前在渲染 TodoItem 的时候，我们就给子组件绑定了一个 handleItemClick 方法。那我们能直接在这个方法里写一个方法，把父组件的 state.list 中的一项删除掉么？

很显然是不可以的，这个时候我们需要明确单向数据流的概念。

### 单向数据流

通俗的来讲，父组件可以给子组件传值，但子组件不可以直接去修改父组件的值。React 中也是这种设计思想。

其实这样做是一种安全的做法，在项目较大，子组件层级过多的情况下，层层传递，很多子组件使用一个父组件的传值，若是子组件直接改动父组件的值，就可能会造成其他子组件依赖的值出现问题。

> 因此，父组件的值我们就怂恿父组件去修改

我们依然在父组件的 todo-item 上绑定一个 handleItemDelete 方法，依靠这个方法，让子组件去触发这个方法修改父组件的值。
通过`$emit`广播一个方法，父组件监听这个方法：`@delete="handleItemDelete"`，监听到了就触发 handleItemDelete 执行删除操作。

```js
// 子组件中
let TodoItem = {
    props: ["content", "index"],
    template: "<li @click='handleItemClick'>{{content}}</li>",
    methods: {
      handleItemClick() {
        // 向外广播名为delete的事件并附带参数index
        this.$emit("delete", this.index);
      }
    }
  };

// 父组件中
methods: {
      handleBtnClick() {
        this.list.push(this.inputValue);
        this.inputValue = "";
      },

      handleItemDelete(index) {
        this.list.splice(index, 1);
      }
    }
```

:::tip
:100:到这里，我们就简单的实现了一个 TodoList，笔记形容抽象，请结合[源码阅读](https://github.com/AqingCyan/vue.js-learn/tree/master/01.todolist)。我们发现，我们除了操作数据
基本没有动过一个 DOM 元素。把视图层和数据层分离，就是 Vue 的开发体验。接下来就是正式的学习啦，请加油。
:::
