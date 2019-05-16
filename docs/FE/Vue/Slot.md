# slot 插槽

插槽顾名思义，是提供一个插入的地方。我们来看这样一个需求：若想在子组件中插入 DOM 结构，例如在 child 组件里插入一个一级标题。

```html
<child>
  <h1>Hello</h1>
</child>
```

这样做，是不行的，插入的`h1`标签，子组件其实未定义插入的内容如何处理。那我们可以通过传递属性的方式来传递。

```html
<child dom="<h1>Hello</h1>"></child>
```

```js
Vue.component("child", {
  props: [
    dom
  ],
  data() {
    return {
      Dom = this.dom
    }
  },
  template: `<div>{{Dom}}</div>`
});
```

但是这种方式渲染出来的页面，标签会被转义，原原本本的渲染出`<h1>Hello</h1>`，这样的内容。

## 插槽的使用

slot 帮我们解决了问题，可以在组件的使用中直接插入

```html
<child>
  <h1 slot="header">Hello</h1>
  <h1 slot="footer">Cyan</h1>
</child>
```

```js
Vue.component("child", {
  template: `<div>
                  <slot name="header">默认头部</slot>
                  <p>你好</p>
                  <slot name="footer">默认尾部</slot>
                </div>`
});
```

name可以指定slot插槽的对应关系，把内容插入到对应的位置。

::: tip
插槽作用域我再读读文档回来补充:beer:
:::