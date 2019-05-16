# 计算属性与侦听器

## 计算属性

虽然在模板内使用表达式对属性进行处理十分便利，例如在小胡子语法里写`number + 1`实现对数据的简单处理，但若我们在其中加入大量的代码，使得逻辑变重，导致难以维护。例如下面的代码，并不是简单的逻辑处理，而是需要经过一段时间的推算后，才知道在 div 中展示的是怎么样的内容

```js
<div id="example">
  {{message.split('').reverse().join('')}}
</div>
```

Vue 建议我们在其中只做一些简单的运算即可，那么当给页面要绑定的属性需要大量逻辑处理的时候，我们建议使用**计算属性**

### 基础例子

```html
<div id="app">
  {{fullname}}
  <input type="text" v-model="lastName" />
</div>
```

创建了一个根节点，我们现在给其挂载实例

```js
let vm = new Vue({
  el: '#app',
  data: {
    firstName: 'Aqing',
    lastName: 'Cyan'
  },
  computed: {
    // 计算属性
    fullname() {
      console.log('计算属性执行一次');
      return this.firstName + this.lastName;
    }
  }
}
```

现在我们可以看到页面有一个输入框，受`v-model`双向绑定影响，框内会呈现 lastName 的属性值。我们需要明确一点，虽然 fullname 类似方法，但实际上它是一个属性（因此按照属性使用放在模板语法中），只是没有定义在 data 中。fullname 的值收到 firstName 和 lastName 影响，当我们改变 lastName 的值时，页面上的 fullname 也发生了变化。
:::warning
因为计算属性是一个属性，所以，data 中不能出现同样的属性名。计算属性的值需要被 return 出去，这点与方法类似。我们把繁杂的逻辑处理放在了计算属性中，使得代码更加利于维护。
:::

### 方法也可以实现

```js
methods: {
  Anotherfullname() {
  console.log('方法执行一次');
  return (this.firstName + this.lastName);
  }
}
```

借用上面的代码，我们可以将 Anotherfullname 绑定在页面上`{{Anotherfullname}}`，也可以呈现出和计算属性一样的效果。我们可以将同一函数定义为一个方法而不是一个计算属性。两种方式的最终结果确实是完全相同的。然而，不同的是**计算属性是基于它们的依赖进行缓存的**。只在相关依赖发生改变时它们才会重新求值。
:::tip
我们拆开理解的话，方法虽然能与计算属性一样做到一样的事情，但计算属性会缓存，在某些情况下，促使页面重新渲染，计算属性依赖的属性未发生改变就不会重新计算，但方法实现的内容，总是会重新执行，这造成了性能消耗。
:::

### 计算属性的 getter 与 setter

计算属性默认只有 getter 函数，用来获取新值。当我们不明确的写出他们的时候，仅做方法写(如上例子)，就只利用了 getter 函数。需要使用 setter 的话，我们要明确写出。

```js
computed: {
  fullname: {
    get() {
      return this.firstName + this.lastName;
    },
    // 这里能获得我们对fullname设置的新值并且进行一些处理操作（在控制台vm.fullname='Xue Aqing'设置新值）
    set(value) {
      let arr = value.split(' ');
      this.firstName = arr[0];
      this.lastName = arr[1];
    }
  }
}
```

getter 函数明确的获取了其依赖的两个属性，然后处理返回。当我们要设置 fullname 的属性值时，会触发 setter 属性，参数 value 是我们设置的内容，例子中，setter 被调用后，相应的：vm 的 firstName 和 lastName 也会发生改变。

## 侦听器

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 `watch` 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

watch 始终监视着你写在里面的属性，当它发生变化的时候，就会执行你提前写好的逻辑处理。我们来看用计算属性实现的例子，如何被 watch 实现。

```js
watch: {
  lastName() {
    this.fullName = this.firstName + this.lastName;
  }
}
```

wtach 监视着 lastName 这个属性，当我们修改 input 框，导致 data 中的 lastName 变化的时候，触发了 watch，执行对应的逻辑。
:::tip
其实 watch 还提供两个参数，newValue 和 oldValue，分别对应变化前的旧值和变化后的新值，这样，我们就能更加自由的编写逻辑对应不同的使用场景:construction:
:::
