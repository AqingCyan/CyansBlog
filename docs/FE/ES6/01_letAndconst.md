# ES6中的let与const

## 在 ES5 中 var 与 function 的特点

- var 与 function 存在变量提升
- var 只会提前声明，function 既声明又定义
- 在全局作用域下，使用 var 和 function 声明的变量会给 window 增加属性

### 变量提升

在当前的作用域当中，JS 代码执行之前，浏览器首先会默认的把所有带 var 和 function 的进行提前的声明或者定义

- 理解声明和定义：var num =12;
  声明(declare)：var num; –> 告诉浏览器在全局作用域中有一个 num 变量了–>但是如果一个变量只是声明了但是没有赋值，默认值是 undefined
  定义(defined)：num = 12; –> 给我们的变量进行赋值
- 对于带 var 和 function 关键字的在预解释的时候操作还是不一样的
  var：在预解释的时候只是提前的声明
  function：在预解释的时候提前的声明+定义都完成了
- 预解释直发生在当前的作用域中，开始只对 window 下的进行预解释，只有函数执行的时候，才会对函数里面的内容进行预解释(也就是说，window 下的预解释不会预解释 fn 中的 var total ···)

## 在 ES6 中 let 的特点

- 使用 let 没有变量提升
- 不可以重复声明：即在`let a = 1`之后，不可以再`let a = 2`
- 不会给 window 增加属性

## 在 ES6 中 const 的特点

- 没有变量提升
- 不可以重复声明
- 不会给 window 增加属性
- const 定义变量，一旦声明必须赋值
- const 定义的是一个常量，不可以重新赋值

## 块级作用域

其实一个`{}`就是一个块级作用域，但在 ES5 与 ES6 中，块级作用域的表现会有不同。

- 块级作用域下 var 和 function 声明的变量依然是全局的
- 块级作用域下 let 和 const 声明的变量是私有的，在外面是获取不到的

### 在不同语言版本下，需要注意

- `var`和`let`的使用，会被引擎解析成不同的含义，即使同一段代码，也会有不同的表现。

```JavaScript
{
  var a = 0;
  function getA() {
    console.log("ok");
  }
  let b = 1;
}
console.log(a);//能够成功打印
getA();//成功执行
//console.log(b);//报错：b is not defined
```

- 单纯的表现一个对象，应该显式的声明它是个对象，不然会被当做块级作用域。

```JavaScript
{name: "Cyan", age: 19}
// 上面的写法会报错，当做块级作用域，下面的就很安全
let obj = {name: "Cyan", age: 19};
({name: "Aqing", age: 20});
```

- `for`循环与`if`，`while`判断都会形成块级作用域
  - if 语句中的 function 只会提前声明，并不会同时定义，它的定义发生在 if 判断为真的时候，进入 if 作用域的第一件事就是，给 function 赋值，代码再执行
  - 使用 var 声明的 for 循环中的循环值，在循环外是可以访问到的，也就是说，这个值是全局的。同时，这个值在外面访问时，是已经步长累加完的值
  - 使用 let 声明的 for 循环中的循环值，因为是属于块级作用域私有的，所以循环体外是访问不到的。

::: tip
主要的代码展示仍然在同名文件夹中，阅读代码与相关注释，才能更好的理解。
:::
