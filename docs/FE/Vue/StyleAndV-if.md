# 样式绑定与条件渲染

Vue 对于页面的样式加载也有独特的方式，按照 Vue 提供的方式，我们可以轻松的控制它们的呈现。

> 假使我们要实现点击 div 变色

Vue 提供的样式方案的本质是对元素节点进行属性的绑定，由此我们可以获知它会采用`v-bind`指令去绑定属性，同时我们也能知道样式内容的定义也可以放在 data 中，以下是几个绑定样式的方案。

## 对象绑定

我们在 div 上绑定的属性是对象方式呈现的

```html
<div @click="handleDivClick1" :class="{activated: isActivated}">
  Hello World1
</div>
```

通过指令，给元素的 class 绑定了一个对象，这个对象的属性名在样式中这样写

```css
.activated {
  color: red;
}
```

那么给 class 绑定的对象起到了关键的作用，如果`isActived`的值为真，`actvated`就会生效，为假，就会失效。那么要实现点击 div 变色，就可以给其绑定一个方法，去控制`isActived`的转换，自然而然就实现了点击变色。

```js
let vm = new Vue({
  el: "#app",
  data: {
    isActivated: false
  },
  methods: {
    handleDivClick1() {
      this.isActivated = !this.isActivated;
    }
});
```

## 数组绑定

我们在 div 的 class 上绑定的属性是以数组呈现的，我们可以将两个不同颜色的样式类写在里面，去控制它的绑定。

```html
<div @click="handleDivClick2" :class="[anotherActivated, activatedOne]">
  Hello World2
</div>
```

这个时候，样式中可以写两个不同颜色的样式

```css
.activated {
  color: red;
}

.activated-one {
  font-size: 20px;
}
```

在 methods 中定义方法，实现 class 属性的切换，每点击一下 div，就将数组中的一个属性名的值与样式表中的内容对应，另一个置为空。

```js
let vm = new Vue({
  el: '#app',
  data: {
    anotherActivated: '',
    activatedOne: ''
  },
  methods: {
    handleDivClick2() {
      this.anotherActivated = this.anotherActivated === 'activated' ? '' : 'activated';
      this.activatedOne = this.activatedOne === 'activated-one' ? '' : 'activated-one';
    }
})
```

## 直接进行属性绑定

把样式内容写在 data 中，然后直接绑定在元素的 class 属性上，这其实是数组绑定方法的修改。我们发现，其实数组绑定的实质就是在数组中的属性名，都会绑定，只是之前我们把其中一个置为空而已，例如下面的例子，我还通过在数组中添加了一个属性，修改了字体。

```html
<div @click="handleDivClick3" :style="[styleObj, {fontSize:'20px'}]">
  Hello World3
</div>
```

现在我们只需要通过点击事件，将 styleObj 中的内容修改就完成了点击变色。

```js
let vm = new Vue({
  el: "#app",
  data: {
    styleObj: {
      color: "black"
    }
  },
  methods: {
    handleDivClick3() {
      this.styleObj.color = this.styleObj.color === "black" ? "red" : "black";
    }
  }
});
```

## 指令`v-if`与`v-show`

v-if 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 truthy 值的时候被渲染。因此，我们可以通过它轻松容易的控制页面某些元素的呈现。你可能也会想到编程中常用的`if`与`else`，Vue 也提供了 v-else 和 v-else-if 与它搭配使用。

```html
<div v-if="show">{{message}}</div>
<div v-else>{{anotherMessage}}</div>
```

如果在 data 中定义的 show 属性的值为真的话，那么会显示的 div 会是第一行，反之就是第二行。

如果搭配上 v-else-if，就可以实现更加特殊的效果，假设 data 中的 ifandelse: 'a'

```html
<!-- v-if与v-else还能这么玩，在控制台里修改vm.ifandelse=b看效果 -->
<div v-if="ifandelse === 'a'">This is A</div>
<div v-else-if="ifandelse === 'b'">This is B</div>
<div v-else>This is Nothing</div>
```

### 与 v-if 类似的 v-show

另一个用于根据条件展示元素的选项是 v-show 指令。用法大致一样：

```html
<div v-show="show">{{message}}</div>
<div v-else>{{anotherMessage}}</div>
```

但，它们两最大的不同就在于其采取不同的渲染方式，如果采用 v-if 的用法，不显示的元素会采用十分极端的不渲染的方式来达到不显示的表现。而 v-show 较为柔和，如果不让其显示，它只会将`display: block`变为`none`，它本身还是会渲染的。
::: tip

- v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
- v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
- 相比之下，v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
- 一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。
  :::
