# TS 中的数据类型

TypeScript 中为了使编码更加规范，更有利于维护，增加了**类型校验**，在 TypeScript 中主要给我们提供了以下类型：

- JS 中原有的：布尔类型(boolean)、数字类型(number)、字符串类型(string)、数组类型(array)、null 与 undefined
- TS 中新增的：元组类型、枚举类型、任意类型、void 类型、never 类型

## 类型校验

在 ES5 中，我们定义变量可以这样

```js
var flag = true;
flag = 456;
```

但是在 TS 中，对数据类型是做了限制的，定义变量的时候必须要指定类型

```ts
var flag: boolean = true; // 指定flag是布尔类型
flag = 123; // 此行会报错
```

::: tip
为了更好的维护，我们建议在编写 TS 代码时，对于变量的定义都指定类型，防止类型转换导致一些问题。
:::

## 数据类型的指定

```ts
// 布尔类型
var boolean: boolean = true;

// 数字类型
var num: number = 123;

// 字符串类型
var str: string = "你好世界";

// 数组类型
var arr1: number[] = [11, 12, 13]; // 指定数组中的内容都是数字类型
var arr2: Array<number> = [11, 12, 13]; // 指定数组中的内容都是数字类型
```

## 新的数据类型

### 元组类型

可以理解为一种新的数组类型，在数组类型中，我们指定数组每一项的类型要么为数字要么为字符串。而元组可以包含多种数据类型，每一个位置都可以指定不一样的类型。

```ts
let arr1: [number, string, string] = [123, "this is ts", "must string"];
let arr2: [string, number] = [123, "this is string"]; // 会报错，类型不符合
```

### 枚举类型

随着计算机的不断普及，程序不仅仅只用于数值计算，还更广泛地用于处理非数值的数据。在其他程序设计语言中，一般用一个数值来代表某一状态，这种处理方法不直观，易读性差。若要事先考虑某一变量可能取的值，**尽量用自然语言中含义清除的单词来表示它的每一个值，这种方法称为枚举方法，用这种方法定义的数据类型称为枚举类型**。

```ts
// 可以赋值
enum Flag {
  success = 1,
  error = 2
} // 使用enum定义，大括号内指定枚举内容
let s: Flag = Flag.success;
console.log(s); // 1

// 可以指定
enum Color {
  blue,
  red,
  "orange"
}
var c: Color = Color.red;
var o: Color = Color.orange;
console.log(c); // 1 这里打印的是下标
console.log(o); // 2

// 常用来表示状态码
enum Err {
  "undefined" = -1,
  "null" = -2,
  "success" = 1
}
var e: Err = Err.null;
console.log(e); // -2
```

### 任意类型

任意类型，顾名思义，可以指定变量的类型为任意的类型

```ts
var num: any = 123;
num = "str";
num = true;
```

那我们就可以运用它实现 dom 节点的操作，实现一个包含多种类型的数组等等

```ts
// var oBox:Object = document.getElementById('div') // TS中没有Object这个类型
var oBox: any = document.getElementById("div");
oBox.style.color = "red";

var arr: any[] = [123, "123", true];
```

### undefined 与 null

```ts
var num: undefined | number;
console.log(num);
num = 123;
console.log(num);

var num2: null | str;
num2 = "123";
console.log(num2);
```

### void 类型

表示没有任何类型，一般用于定义方法的时候方法没有返回值

```ts
// 这个方法只打印了内容，没有任何返回值
function run(): void {
  console.log("run");
}

run();

// 方法有返回值，返回什么指定什么类型
function back(): number {
  console.log("返回值是1");
  return 1;
}

back();
```

### never 类型

是其他类型（包括 null 和 undefined）的子类型，代表从不会出现的值，这意味着声明 never 的变量只能被 never 类型的值赋值

```ts
var a: never;
a = 123; // 报错
a = (() => {
  throw new Error('错');
})(); // 赋值成功
```