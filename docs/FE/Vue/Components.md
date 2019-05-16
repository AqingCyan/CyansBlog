# 组件细节问题

现在我们观察一些用框架开发的网页[BiliBili](https://www.bilibili.com)、[掘金](https://juejin.im/)，会发现很多部分都十分相似或者一模一样，我们甚至可以将其拆分归类。而事实上，页面的确是被一个个组件构成的，本章，我们就对组件的细节做一个细致的拆分。

## 组件的使用

组件的注册分为全局注册和局部注册，目前我们用全局注册做例子。

```js
Vue.component("Row", {
  // 组件中的data必须是个函数并返回组件的数据
  data() {
    return {
      content: "This is row"
    };
  },
  template: `<tr><td>{{content}}</td></tr>`
});
```

使用`Vue.component()`对 Vue 实例进行全局组件的注册。这里我们注册了一个叫 Row 的组件，本质是它的模板在`template`中定义。另外需要注意的是，与根实例 `vm` 不同，**组件的 data 数据是一个函数，return 出绑定在组件上的属性。**

### is 的使用

刚刚注册了一个全局的组件，现在我们来使用它，在页面上渲染一个表格，Row 的本质是`<tr><td>{{content}}</td></tr>`，我们用`<tbody></tbody>`包裹。

```html
<div id="app">
  <table>
    <tbody>
      <Row></Row>
      <Row></Row>
      <Row></Row>
    </tbody>
  </table>
</div>
```

走到页面，看到数据正常渲染，但真的是这样么？按 F12 打开控制台，我们审查元素，会惊奇的发现`<tbody></tbody>`并没有如我们所愿包裹着`<Row></Row>`组件渲染出来的`<tr><td>{{content}}</td></tr>`，而是在外面。其本质原因是因为在 H5 的规定中，`<table></table>`中只能放`<td></td>`和`<tr></tr>`。因此我们需要使用`is`属性来做一个转换。

```html
<div id="app">
  <!-- 使用is属性解决模板标签上不规范的bug -->
  <table>
    <tbody>
      <tr is="Row"></tr>
      <tr is="Row"></tr>
      <tr is="Row"></tr>
    </tbody>
  </table>
</div>
```

这里相当于做了一个翻译：用 is 属性说，这里用的是 tr，但 tr 实际是 Row 组件。
::: warning
在 Vue 中，使用组件的时候，难免会遇到不合语义的写法，应该尽量避免。
:::

## 全局注册于局部注册

到目前为止，我们只用过 `Vue.component` 来创建组件

```js
Vue.component("my-component-name", {
  // ... 选项 ...
});
```

这些组件是全局注册的。也就是说它们在注册之后可以用在任何新创建的 Vue 根实例 (new Vue) 的模板中。比如：

```js
Vue.component("component-a", {
  /* ... */
});
Vue.component("component-b", {
  /* ... */
});
Vue.component("component-c", {
  /* ... */
});

new Vue({ el: "#app" });
```

```html
<div id="app">
  <component-a></component-a>
  <component-b></component-b>
  <component-c></component-c>
</div>
```

在所有子组件中也是如此，也就是说这三个组件在各自内部也都可以相互使用。

但全局注册是不够理想的，比如，如果你使用一个像 webpack 这样的构建系统，全局注册所有的组件意味着即便你已经不再使用一个组件了，它仍然会被包含在你最终的构建结果中。这造成了用户下载的 JavaScript 的无谓的增加。

因此在这种情况下，我们可以使用局部注册

```js
var ComponentA = {
  /* ... */
};
var ComponentB = {
  /* ... */
};
var ComponentC = {
  /* ... */
};
```

然后，我们可以自行选择将那些组件挂载到实例的 components 之中，对于 Vue 实例的 components 属性来说，其属性名就是自定义元素的名字，其属性值就是这个组件的选项对象。

```js
let vm = new Vue({
  el: "#app",
  components: {
    "component-a": ComponentA,
    "component-b": ComponentB
  }
});
```

但与全局注册不同，局部注册的组件是不能够互相调用的，如果想要在一个局部注册的子组件里面调用另一个局部注册的子组件。就需要像注册组件一样在作为父组件的子组件中注册。

## ref 的使用

虽然 vue 不推荐直接操作 DOM，但在一些情况下(制作复杂动画)必须得操作 DOM，这个时候就该使用 ref。

需求：希望 div 被点击的时候打印 div 的内容

```html
<div id="app">
  <div @click="handleClick" ref="hello">hello world</div>
</div>
```

```js
let vm = new Vue({
  el: "#app",
  methods: {
    handleClick() {
      console.log(this.$refs.hello); // 打印了<div>hello world</div>
      alert(this.$refs.hello.innerHTML);
    }
  }
});
```

官方文档这样定义 ref：被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 \$refs 对象上。**如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；**如果用在子组件上，引用就指向组件实例。

因此，除了直接获取 DOM 元素，我们还可以获取组件的实例（用 ref 获取组件的 DOM。实际上获取的是组件的引用），为了更好的解释，我们实现一个简单的计数器：

```html
<div id="app">
  <Counter @change="handleChange" ref="conuterOne"></Counter>
  <Counter @change="handleChange" ref="conuterTow"></Counter>
  <div>
    <!-- 实现两个计数器的总数 -->
    和：{{total}}
  </div>
</div>
```

```js
Vue.component("Counter", {
  template: '<div @click="handleClick">{{number}}</div>',
  data() {
    return {
      number: 0
    };
  },
  methods: {
    handleClick() {
      this.number++;
      this.$emit("change");
    }
  }
});
let vm = new Vue({
  el: "#app",
  data: {
    total: 0
  },
  methods: {
    handleChange() {
      console.log(this.$refs.conuterOne); // 打印都是子组件的引用
      console.log(this.$refs.conuterTow);
      console.log(this.$refs.conuterOne.number);
      console.log(this.$refs.conuterTow.number);
      this.total = this.$refs.conuterOne.number + this.$refs.conuterTow.number;
    }
  }
});
```

::: tip
例子要自己手动去敲哦，别偷懒！:angry:
:::

## 父子组件数据传递

### 单项数据流与双向绑定

单项数据流：通俗的来讲，父组件可以给子组件传值，但子组件不可以直接去修改父组件的值。React 中也是这种设计思想。

其实这样做是一种安全的做法，在项目较大，子组件层级过多的情况下，层层传递，很多子组件使用一个父组件的传值，若是子组件直接改动父组件的值，就可能会造成其他子组件依赖的值出现问题。

双向绑定：Vue 还有一个双向绑定的概念，使得我们会一不小心搞混。按笔者理解，二者的区别在于组件与组件之间的数据流向和视图层与数据层的数据流向。最明显的双向绑定是`v-model`指令，绑定在 input 框上，既可以通过视图层改变数据，也可以通过数据改变视图层。这期间并没有涉及到组件的传值。

### 父组件向子组件传值

我们修改刚刚的计数器案例，来实现父组件向子组件传值。父组件向子组件传递值的方式通常是属性的绑定。

```html
<div id="app">
  <!-- 父组件通过属性的方式传递数据 -->
  <counter :count="3" @change="handleChange"></counter>
  <counter :count="2" @change="handleChange"></counter>
  <div>{{total}}</div>
</div>
```

```js
let counter = {
  // 子组件通过props接收
  props: ["count"],
  data() {
    // 子组件不可以直接修改父组件传递来的数据，会造成数据不安全
    // 我们这边拷贝一份数据，就不会直接修改父组件辽
    return {
      number: this.count
    };
  },
  template: '<div @click="handleClick">{{number}}</div>',
  methods: {
    handleClick() {
      console.log(this.count); // 打印查看传值
    }
  }
};
```

### 子组件修改父组件的值

我们现在希望点击子组件实现父组件的数值累加，那么我们很容易就想到了直接在子组件的`handleClick`方法里面去修改传过来的值。可是这样正确么？我们说 Vue 是单向数据流的，因此，我们不可以这样去做。

> 父组件的值就让父组件去修改

因此，我们需要通过一个事件（广播）告诉父组件我有一些操作，你需要改变你的值。父组件监听到这个广播后进行相应的修改。这个给父组件广播的方法，我们使用`$emit`实现。

```js
let counter = {
  props: ["count"],
  data() {
    return {
      number: this.count
    };
  },
  template: '<div @click="handleClick">{{number}}</div>',
  methods: {
    handleClick() {
      this.number++;
      this.$emit("change", 1); // 广播告诉父组件我变了，变化的量是1（这个1之后被作为参数）
    }
  }
};
let vm = new Vue({
  el: "#app",
  data: {
    total: 5
  },
  components: {
    counter
  },
  methods: {
    // 这里的step就是子组件广播事件的时候传的值
    handleChange(step) {
      this.total += step;
    }
  }
});
```

我们记得在子组件上绑定的是`@change="handleChange"`，现在的`@change`实际上是监听的子组件的名为`change`的广播，监听到广播后，父组件执行`handleChange`方法，修改 data 中的值，它的参数 step，是广播时传递的参数。

## 组件参数校验与非 props 特性

为了数据的安全性，Vue 中的组件还可以对传递进来的值进行一次校验，校验的内容比如值的类型，长度，是否必须的传值，默认值的指定等

```js
Vue.component("child", {
  // 子组件可以对于父组件传来的值的类型进行校验
  props: {
    // content: String, // 可以简写
    content: {
      type: String, // 类型是字符串
      required: true, // 必传
      default: "这是默认值",
      // 还可以写一个函数校验器
      validator: value => {
        return value.length > 5; // 这里指定传入的字符长度大于5才行
      }
    },
    name: [String, Number]
  },
  template: "<div>{{content}}--{{name}}</div>"
});
```

- props 特性：当父组件使用子组件时，通过属性给子组件传值时，恰好子组件 props 里面声明了这个属性，有一个对应的关系。这个时候，浏览器查看组件的 DOM 元素上不会显示传递的属性，子组件也可以对该属性进行访问使用。
- 父组件传递子组件一个属性，子组件未在 props 中声明该属性。这种情况下：浏览器查看组件的 DOM 元素上会显示这个属性，一旦在子组件内使用该属性，Vue 就会报错。

## 组件上的原生事件

我们现在来实现一个需求，在子组件上绑定一个定义在父组件的点击事件，点击的时候，打印`father click`

```html
<div id="app">
  <child @click="handleClick"></child>
</div>
```

```js
Vue.component("child", {
  template: "<div>Child</div>"
});
let vm = new Vue({
  el: "#app",
  methods: {
    handleClick() {
      console.log("father click");
    }
  }
});
```

并未如我们愿，我们发现绑定的事件失效了。但我们若在子组件上绑定一个方法，会发现是有效的，如下代码会使点击打印`child click`。

```js
Vue.component("child", {
  template: '<div @click="handleChildClick">Child</div>',
  methods: {
    handleChildClick() {
      console.log("child click");
    }
  }
});
```

我们在子组件上绑定的方法是原生的方法，可以直接触发，而通过在组件名上绑定方法，在父组件定义方法，去直接触发其实在触发自定义方法。我们仔细想想上一个子组件广播让父组件的值改变就能理解，父组件在使用子组件的情况下，可能会以为`@click`是子组件要广播的事件。我们试着去用广播触发一下它：

```js
Vue.component("child", {
  template: '<div @click="handleChildClick">Child</div>',
  methods: {
    handleChildClick() {
      this.$emit("click");
    }
  }
});
```

果然，我们成功的打印了`father click`。也就是说若要通过子组件去触发父组件的自定义方法，要通过广播的方式来触发，也就是这个例子中，要在子组件里广播一个`this.$emit('click')`，被父组件监听到才能触发。

当然，若不想通过广播的方式来触发自定义事件，vue 也提供了`.native`的修饰符来让自定义事件可以被当做原生事件触发。

```js
<div id="app">
  <child @click.native="handleClick"></child>
</div>
```

## 非父子组件间传值

非父子组件，也就是说爷孙组件，兄弟组件，七大姑八大姨的组件之间，都叫做非父子组件。那么他们的传值，就会变得十分繁杂。目前我们解决的办法有两种：使用设计模式（Bus/总线/发布订阅模式/观察者模式），使用类似于 React 中 Redux 的 Vuex 管理插件。目前我们重在 Vue 基础，插件以后再讲。

![组件示意图](../../.vuepress/public/components.png)

我们从实例入手，实现一个需求：点击一个单词，另一个单词变成同样的单词。注册一个组件，在页面使用两次，它们互为兄弟组件，这就是一个非父子组件传值问题

```html
<div id="app">
  <child :content="'Cyan'"></child>
  <child :content="'Aqing'"></child>
</div>
```

```js
Vue.component("child", {
  data() {
    return {
      selfContent: this.content // 做一个值的转变，不直接修改父组件的值，遵循单向数据流
    };
  },
  props: {
    content: String
  },
  template: '<div @click="handleClick">{{selfContent}}</div>',
  methods: {}
});
```

现在，我们需要写一个方法去让他们互相修改彼此的值，这里就用到了观察者模式。我们定义了一个属性，让这个属性当作 bus，承载着我们的数据在组件间流动。

```js
Vue.prototype.bus = new Vue(); // 在Vue的原型上增加一个bus属性，之后的每一个Vue实例都会有bus属性
Vue.component("child", {
  data() {
    return {
      selfContent: this.content // 做一个值的转变，不直接修改父组件的值，遵循单向数据流
    };
  },
  props: {
    content: String
  },
  template: '<div @click="handleClick">{{selfContent}}</div>',
  methods: {
    handleClick() {
      // 通过bus向外广播
      this.bus.$emit("change", this.selfContent);
    }
  },
  // 借助生命周期函数
  mounted() {
    // 监听bus上的广播
    this.bus.$on("change", msg => {
      this.selfContent = msg;
    });
  }
});
```

依然是通过`$emit`把组件的数据向外广播，`mounted`中会让`bus`属性去监听`change`广播，一旦有组件触发就修改了组件的 data 中的数据，就实现了点击一个单词，另一个单词变成同样的单词。

## 动态组件与 v-once

我们注册两个组件，点击页面上的按钮，隐藏其中之一。

```html
<div id="app">
  <!--需求：点击隐藏其中之一-->
  <child-one v-if="type==='child-one'"></child-one>
  <child-two v-if="type==='child-two'"></child-two>
  <button @click="handleBtnClick">change</button>
</div>
```

```js
Vue.component("child-one", {
  template: "<div>child-one</div>"
});
Vue.component("child-two", {
  template: "<div>child-two</div>"
});
let vm = new Vue({
  el: "#app",
  data: {
    type: "child-one"
  },
  methods: {
    handleBtnClick() {
      this.type = this.type === "child-one" ? "child-two" : "child-one";
    }
  }
});
```

针对上面的需求，我们可以使用动态组件，动态的生成内容：

```html
<div id="app">
  <!--动态组件解决-->
  <component :is="type"></component>
  <button @click="handleBtnClick">change</button>
</div>
```

但是我们还需要注意，v-if渲染内容是很直接的渲染与不渲染的区别。也就是说切换的时候，都是销毁组件再创建一个新的组件，那么对于一些静态不变的内容，是耗费性能的，通过v-once属性，就会将其保存在内存中，不会销毁。

```js
Vue.component("child-one", {
  template: "<div v-once>child-one</div>"
});
```

::: tip
`v-once`：只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。:rocket:
:::