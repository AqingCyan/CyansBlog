# ES6中函数相关

## 函数的参数问题

ES6中可以设置参数默认值 在参数少传的情况下 可以保证有值

### 参数解构赋值

参数可以使用解构赋值

```js
function fn(x="Aqing",y="Cyan") {
  console.log(x + y);
}
fn(1); // "1Cyan"

// console.log(name);//如果没有传参{name="Cyan",age=19}=undefined  undefined不是对象 所以这一句会报错
function fn1({name="Cyan",age=19}) {}

// 如下使用解构赋值就不会报错
function fn2({name="Aqing",age=19}={}) {
  console.log(name, age); // 如果没传参 {name="Aqing",age=19}={} 这一句不会报错  会使用默认值
}
fn2(); 
```

- 当不传入任何参数的时候 fn2和fn3执行的结果是一模一样的使用默认值
- 但是在当传入空对象的时候fn2({})和fn3({})的结果却是不一样的
- fn2中的name="Aqing",age=19}={} 空对象即为默认值

```js
function fn3({name,age}={name:"Aqing",age:19}) {
  console.log(name, age);
}
fn3({}); // undefined undefined
```

- length属性  指的是形参的个数
- 如果形参有默认值情况length就会失真，变成没有默认值形参的个数

```js
function fn4(x,y) {}
console.log(fn4.length); // 2
function fn5(x,y=1) {}
console.log(fn5.length); // 1
```

- 关于参数默认值的位置:一般参数的默认值放在最后面
- 如果我想让第一个参数走默认值 第二个参数走传递进的实参 这么写显然是不行的 会报错

```js
function fn6(x=10,y=20) {}
fn6(,1); // 报错
```

arguments 是一个类数组，ES6中有类似用法

```js
function fn7(...arg) {
  console.log(arguments);
  console.log(arg); // 根据解构赋值 除了arguments 我们也可以这样拿 实参
}
fn7(1, 2, 3, 4, 5);
```

### 参数作用域

函数执行的时候先给形参赋值，形参也是私有变量，如果给形参的默认值是一个变量 ，
先看是不是自己的私有变量，不是自己的再找全局中是否有这个变量，没有就报错

```js
let m = 10,n = 100;
function fn8(x = m,y = n) {
  // 私有作用域：私有变量 x,y
  // 进入函数时先给形参赋值，发现无私有变量m跟n，遂找到全局的
  console.log(x);
  console.log(y);
  let m = "Cyan"; // 改用var 结果与let一样
  let n = "ES6";
}
fn8(); // 10 100
fn8(1); // 1 100 说明默认值用的是全局的
// 若是注销函数外 m和n的声明 会报错

let x = 100;
function fn9(x, y = x) {
  console.log(y);
}
// 先进来给形参赋值找到了x=1，然后y=x=1
fn9(1); // 1
fn9(); // undefined 形参私有作用域有x与m，y的默认值是x，找到x，x无值，因此是Undefined
```

## 函数的name问题

我们可以通过`.name`的方式打印函数名，现在分别打印不同类型的函数名

```js
function fn() {}
console.log(fn.name); // fn
//匿名函数
console.log((function () {}).name); // ""
```

### 特殊情况

- 通过bind方法得到一个新的函数 name是 "bound 原来函数的名字"
- 通过构造函数方式创建一个函数 它的名字是"anonymous"

```js
let fn1 = fn.bind(null);
console.log(fn1.name); // "bound fn"

// new Function("形参","函数体")
// new Function("函数体")
// function fn(形参) {函数体}
let fn2 = new Function("x,y","console.log(x,y);return x+y;");
console.log(fn2(10, 100)); // 先执行 打印了10 100 然后打印了110
console.log(fn2.name); // anonymous
```

### 拓展技巧

如何将下面的JSON字符串变为JSON对象 不使用JSON方法 也不使用 eval方法

```js
let str = '[{"name":"Aqing"},{"age":19}]';
//只写一个参数就是函数体  字符串可以拼接 "return [{"name":"Aqing"},{"age":19}]"
let arr = (new Function("return"+str))();
console.log(arr); // [{…}, {…}]
```

## 扩展运算符

扩展运算符就是`...`，它可以将非数组转化为数组，将数组转化为非数组，也可以将类数组（具有length属性）转化为数组

```js
let str = "123";
console.log([...str]); // ["1", "2", "3"]

function fn() {
  console.log([...arguments]);
}
fn(1,2,3,4); // [1, 2, 3, 4]
```

它也可以用来合并数组

```js
let arr1 = [1,2,3,4];
let arr2 = [5,6,7,8];
console.log(arr1.concat(arr2)); // [1, 2, 3, 4, 5, 6, 7, 8]
console.log([...arr1, ...arr2]); // [1, 2, 3, 4, 5, 6, 7, 8]
```

### 拓展技巧

```js
//求数组最大值,Math.max方法是不能直接传数组的，那我们就可以利用...方法来把它变成非数组
//之前是想办法将它变为一个一个值，比如利用apply的方法将数组的值一个个传入
let ary = [1,23,12,45,242,132];
console.log(Math.max(...ary));

//把ary的每一项作为函数参数一项项传入
function fn1() {}
fn1(...ary);
```

## 箭头函数

一般函数的传统写法`function fn(x, y) {}`，而箭头函数大大的简化了写法`let fn = (x, y) => {}`

- 若函数体只有一行代码的话，就可以省略`{}`，若只有一个参数，就可以省略小括号。
- 通常函数当做参数的时候(回调函数)使用箭头函数
- 箭头函数没有this指向，它里面的this是上一级的作用域
- 箭头函数没有arguments
- 箭头函数不可以用作构造函数 因为不可以使用new执行

```js
// 箭头函数this指向
let obj = {
  fn:function () {let f = () => {console.log(this);};
  f();
 }
};
obj.fn(); // {fn: ƒ}

// 箭头函数没有arguments
let f1 = (...arg)=>{
  // console.log(arguments);
  console.log(arg);
};
// f1(1,23);//报错：arguments is not defined
f1(1,2,3); // [1, 2, 3]
```
