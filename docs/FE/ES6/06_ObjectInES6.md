# 对象的拓展

## 对象的简洁表达方式

可以直接使用变量利用解构赋值创建对象

```js
let name = 'Aqing', age = 20;
let school = {name, age};
console.log(school); // {name: "Aqing", age: 20}
```

如果属性是函数的时候

```js
let str = "name";//属性名都是字符串
let obj = {
  fn(){},
  // 相当于fn:function(){}
  // 属性名是字符串, 属性名使用[] 里面可以使用变量
  [str]:name, // 如果想让一个变量当做属性名
  ["my"+str]:name // 当然可以在[]中拼接字符串
}

//引用的时候  obj[str]  其中写法与这个用法有相似性
console.log(obj[str]); // "Cyan" 因为 name之前有let声明定义过
```

## Object的方法拓展

### Object类

将参数变成对象

```js
console.log(Object(1)); // Number {1}
console.log(Object(true)); // Boolean {true}
```

### Object.is()

判断两个值是否相等

::: warning
在用===判断时，NaN跟NaN都不相等  -0 === 0 得true，除了这两种情况，其他情况此方法是和 === 判断一致的
:::

```js
console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(-0, 0)); // false
```

### Object.assign

合并对象，将参数的第二个对象合并到第一个对象上，第一个对象被改变

```js
let obj1 = {name:"Cyan"};
let obj2 = {age:19};
console.log(Object.assign(obj1, obj2)); // {name: "Cyan", age: 19}
console.log(obj1); // {name: "Cyan", age: 19}
console.log(obj2); // {age: 19} 说明返回的obj1是被改变了的
```

### 对象的扩展运算符

```js
let school = {...obj1,...obj2};
console.log(school); // {name: "Cyan", age: 19}
```

### Object.getOwnPropertyDescriptor

获取一个对象中某个属性的描述

```js
console.log(Object.getOwnPropertyDescriptor("123", "length"));
```

以上代码执行会得到:

|打印内容|含义|
|--|--|
|configurable:false|是否可配置(删除)|
|enumerable:false|是否可枚举|
|value:3|对象的值|
|writable:false|是否可修改(这里说明字符串中的length是不能修改的 所以字符串没有修改它长度的方法)|

### Object.keys

返回值是一个数组  里面存放(所有可枚举的属性)

```js
console.log(Object.keys(school)); // ["name", "age"]
```

### Object.values

返回值是一个数组 里面存放(所以可枚举属性的值)

```js
console.log(Object.values(school)); // ["Cyan", 19]
```

### Object.entries

返回值是一个数组 数组(每一项也是一个数组(键,值))

```js
console.log(Object.entries(school)); // [Array(2), Array(2)]  展开后0:(2) ["name", "Cyan"]   1:(2) ["age", 19]
```

## 对象的get与set函数

对象属性的设置与获取都会触发它内置的set与get函数，我们也可以显式控制这两个函数

我们如下设置对象的getter与setter：

```js
let obj2 = {
  _name:"Cyan",
  get name(){
    // 只要通过obj获取name属性就会触发这个函数
    // 可以通过return 返回值
    console.log(1);
    return this._name;
  },
  set name(val){
    // 只要通过obj给name属性设置值就会触发set函数
    console.log(2);
    // val：设置的值
    this._name = val;
  }
};
```

然后尝试触发函数

```js
console.log(obj2.name); // 先打印了1 因为触发了get方法  然后打印了Cyan return什么就打印什么
obj2.name= "Aqing"; // 打印了2 这里触发了set方法
console.log(obj2.name); // 触发了get 先打印1 再打印_name的值 也就是 Aqing
```

::: tip
当你给一个属性定义setter或者getter，或者两者都有时，这个属性会被定义为“访问描述符”。
对于访问描述符来说，Javascript会忽略他们的value和writable特性。取而代之的是set和get函数。
:warning:get属性只有在调用它掌控的属性的时候，才会被调用该get方法的。
:cookie:get: 在读取属性时，调用的函数。在读取属性时调用的函数。只指定get则表示属性为只读属性。默认值为undefined。
:art:set:在写入属性时调用的函数。在写入属性时调用的函数。只指定set则表示属性为只写属性。默认值为undefined。
:::
