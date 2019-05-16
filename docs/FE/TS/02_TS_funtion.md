# TS 中的函数

## 函数的定义

ES5 中定义函数的方法

```js
function run() {
  return "run";
}

var run2 = function() {
  return "run2";
};
```

TS 中定义函数的方法，需要指定参数类型和返回值类型

```ts
function run(): string {
  return "str";
}

var run2 = function(): number {
  return 123;
};
```

定义方法的传参

```ts
function getInfo(name: string, age: number): void {
  console.log(`name:${name}，age:${age}`);
}

var getInfo2 = function(name: string, age: number): void {
  console.log(`name:${name}，age:${age}`);
};
```

在 ES5 中方法的实参和形参可以不一样，但是在 TS 中必须一样，如果不一样就需要配置可选参数(在形参前加一个`?`)，可选参数必须配置到参数最后面

```ts
// age可传可不传
function getInfo(name: string | number, age?: number): void | string | number {
  if (age) {
    console.log(`name:${name}，age:${age}`);
  } else {
    return name;
  }
}
```

默认参数，ES5 中没法设置默认参数，ES6 与 TS 都可以设置默认参数

```ts
function getInfo(name: string = "Aqing", age: number = 20): void {
  console.log(`name:${name}，age:${age}`);
}

getInfo(); // name:Aqing，age:20
```

## 函数的重载

实现类似于 Java、C#的面向对象的编码体验，但为了兼容 ES5 以及 ES6，重载的写法与 Java 中有区别，在 ES5 中出现同名方法，下面的替换上面的函数，在 TS 中，同名的方法，同名函数会根据不同参数，进行重载

```ts
// 同名函数的定义
function getInfo(name: string): string;
function getInfo(age: number): number;
// 进行重载定义
function getInfo(str: any): any {
  if (typeof str === "string") {
    return "我叫" + str;
  } else {
    return "年龄" + str;
  }
}

getInfo("Aqing");
getInfo(20);
getInfo(true); // 报错，因为函数定义参数没有指定布尔类型
```