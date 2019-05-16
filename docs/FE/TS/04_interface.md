# TypeScript 中的接口

接口的作用：在面向对象的编程中，接口是一种规范的定义，它定义了行为和动作的规范，在程序设计里面，接口起到一种限制和规范的作用。接口定义了某一批类所需要遵守的规范，接口不关心这些类的内部状态数据，也不关心这些类里面方法的实现细节，它只规定这批类里面必须提供某些方法，提供这些方法的类就可以满足实际需要。TypeScript 中的接口类似于 Java，同时还增加了更灵活的接口类型，包括属性、函数、可索引和类等。

## 属性接口

TS 中自定义方法传入参数对 json 进行约束

```ts
function printLabel(labelInfo: { label: string }): void {
  console.log(123);
}

printLabel("hahaha"); // 错误
printLabel({ name: "张三" }); // 错误
printLabel({ label: "张三" }); // 正确
```

对批量方法传入参数进行约束，使用到接口 interface。接口规定好的内容，必须传入，顺序可以不一样但内容需要一致。

```ts
// 就是传入对象的约束（属性接口）
interface FullName {
  firstName: string; // 以分号结束
  secondName: string;
}
function printName(name: FullName): void {
  // 必须传入一个带有firstName和secondName的对象
  console.log(name.firstName + "--" + name.secondName);
}

// printName('123'); // 错误

printName({
  firstName: "Aqing",
  secondeName: "Cyan"
});

// printName({
//   age: 20,
//   firstName: 'Aqing',
//   secondName: 'Cyan'
// }) // 报错，接口未定义age属性
```

### 接口的可选属性

我们有时候不一样对接口的限制那么严格，有的属性可以传入或者不传入。这个时候就需要用到接口的可选属性：

```ts
interface FullName {
  firstName: string;
  secondName?: string; // secondeName变成可传属性
}

function printName(name: FullName): void {
  // 必须传入一个带有firstName对象，secondName可传可不传
  console.log(name.firstName + "--" + name.secondName);
}

printName({
  firstName: "Aqing" // 不会报错
});
```

## 使用接口，封装 Ajax

```ts
// 定义接口
interface Config {
  type: string;
  url: string;
  data?: string;
  dataTyep: string;
}

// 实现方法：简易版
function ajax(config: Config) {
  var xhr = new XMLHttpRequest();
  xhr.open(config.url, config.type, true);
  xhr.send(config.data);
  xhr.onreadstatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      console.log("请求成功");
    }
  };
}
```

## 函数类型接口

对方法传入的参数，以及返回值进行约束。接口可以复用，就可以实现批量约束。

实现一个加密的函数类型接口

```ts
// 定义函数类型接口
interface encrypt {
  (key: string, value: string): string;
}

var md5: encrypt = function(key: string, value: string): string {
  // 模拟操作
  return key + value;
};
```

## 可索引接口

是对数组、对象的约束（不常用）

```ts
interface userArr {
  [index: number]: string; // 索引为数字，项为字符串
}

var arr: userArr = ["123", "123"];
```

对对象的约束

```ts
interface UserObj {
  [index: string]: string;
}

var arr: userObj = { name: "20" };
```

## 类类型接口

对类的约束和抽象类有些相似

```ts
interface Animal {
  name: string;
  eat(str: string): void;
}

class Dog implements Animal {
  // 使用implements实现接口
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  eat() {
    console.log(this.name);
  }
}
```

## 接口拓展

接口可以继承接口

```ts
interface Animal {
  eat(): void;
}

interface Person extends Animal {
  work(): void;
}

class web implements Person {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
  eat() {
    console.log(this.name);
  }
  work() { // 接口是继承的除了work实现，还需要实现eat方法
    console.log(this.name);
  }
}
```

::: tip
类还可以同时实现接口和继承，但这样要足够符合规范（类与接口）:angry:
:::