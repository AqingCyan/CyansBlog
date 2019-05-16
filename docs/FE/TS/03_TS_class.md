# TypeScript 中的类

ES5 中定义一个类

```js
function Person(name) {
  this.name = name;
  this.run = function() {
    console.log(this.name);
  };
}

var p = new Person("Aqing");
p.run();
```

在 TS 通过 class 关键字定义

```ts
class Person {
  name: string; // 属性，省略了public关键字
  constructor(name: string) {
    // 构造函数 实例化类的时候触发
    this.name = name; // 这一步是将传进构造函数的参数赋值给类的公共属性
  }
  run(): void {
    console.log(this.name);
  }
}

var p = new Person("Aqing");
p.run(); // Aqing
```

```ts
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  getName(): void {
    console.log(this.name);
  }
  setName(name: string): void {
    this.name = name;
    console.log("ok");
  }
}

var p = new Person("Cyan");
p.getName(); // Cyan
p.setName("Aqing"); // ok
p.getName(); // Aqing
```

## TS 中实现继承

通过 extends 与 super 关键字实现继承（与[ES6 一致](https://aqingcyan.github.io/CyansBlog/FE/ES6/10_class.html#%E5%9B%9E%E9%A1%BEes5%E7%9A%84%E6%96%B9%E5%BC%8F)）

- 子类没有 this，this 继承于父类，必须要写 super
- super 指向的是父类的原型
- super()执行完后才会有 this，super 就是父类的 constructor
- 不可以在 super()执行之前就使用 this，会报错，因为此时还没有 this

```ts
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  run(): string {
    return `${this.name}在coding`;
  }
}

var p = new Person("Aqing");
console.log(p.run()); // Aqing在coding

class Web extends Person {
  constructor(name: string) {
    super(name); // 继承父类原型
  }
}

var w = new Web("Aqing");
console.log(w.run()); // Aqing在coding
```

### 类里面的修饰符

TS 在定义属性的时候，给我们提供了三种修饰符：

- public，代表公有，在类里面，子类，类外面都可以访问
- protected，代表保护类型，在类里面，子类可以访问，在类外面没法访问
- provite，代表私有，在类里面可以访问，在子类和类外面不能访问
- 属性如果不加修饰符，默认就是公有 public

```ts
// public
class Person {
  public name: string; // 公有属性
  constructor(name: string) {
    this.name = name;
  }
  run(): string {
    return `${this.name}在coding`;
  }
}

class Web extends Person {
  constructor(name: string) {
    super(name);
  }
}

var w = new Web("Aqing");
w.run(); // Aqing在coding
console.log(w.name); // Aqing
```

```ts
// protected
class Person {
  protected name: string; // 公有属性
  constructor(name: string) {
    this.name = name;
  }
  run(): string {
    return `${this.name}在coding`;
  }
}

class Web extends Person {
  constructor(name: string) {
    super(name);
  }
}
var w = new Web("Aqing");
w.run(); // Aqing在coding
console.log(p.name); // 编译报错
```

```ts
// provite
lass Person {
  provite name: string; // 公有属性
  constructor(name: string) {
    this.name = name;
  }
  run(): string {
    return `${this.name}在coding`;
  }
}

class Web extends Person {
  constructor(name: string) {
    super(name);
  }
}
var w = new Web("Aqing");
var p = new Person('Cyan');
p.run(); // Cyan在coding
w.run(); // 编译报错
console.log(p.name); // 编译报错
```

## 静态属性与静态方法

在 ES5 中

```js
function Person() {
  /*在里面定义的是实例方法*/
}
Person.run = function() {
  /*这样定义的是静态方法*/
};
```

如果要调用实例方法，必须要实例化，通过实例调用；而静态方法的调用是可以通过类直接调用的，静态属性也类似。并且在面向对象的思想里，静态方法和属性只能通过类或者它的子类调用，实例是不可以调用的。

那么在 TS 中，这一规范又如何实现？使用 static 关键词修饰方法。

```ts
class Person {
  public name: string;
  static age: number = 20; // 静态属性只能被静态方法调用
  constructor(name: string) {
    this.name = name;
  }

  // 实例方法
  run(): void {
    console.log(`${this.name}在运动`);
  }

  work(): void {
    console.log(`${this.name}在工作`);
  }

  // 静态方法只能调用静态属性
  static print(): void {
    console.log("这就是静态方法，我今年" + this.age + "岁了");
  }
}

Person.print(); // 这就是静态方法，我今年20岁了
```

## 多态

父类定义一个方法不去实现，让继承它的子类去实现，每一个子类有不同的表现。多态也是继承的一种表现，多态属于继承。

```ts
class Animal {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
  eat(): void {
    console.log("吃的方法");
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }

  eat(): void {
    console.log(`${this.name}吃肉`);
  }
}

class Cat extends Animal {
  constructor(name: string) {
    super(name);
  }

  eat(): void {
    console.log(`${this.name}吃鱼`);
  }
}
```

## 抽象

它是提供其他类继承的基类，不能直接被实例化。用 abstract 关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。

::: tip
abstract 抽象方法只能放在抽象类里面。抽象的另一种理解可以理解成抽象类和抽象方法用来定义标准，例如 Animal 这个类要求它的子类必须包含 eat 方法。:100:
:::

```ts
abstract class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  abstract eat(): any;
}

var a = new Animal(); // 报错：无法创建抽象类的实例

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }
  // 抽象类的子类，必须实现抽象类里面的抽象方法
  eat(): void {
    console.log(this.name + '吃东西');
  }
}

var d = new Dog('小黑');
d.eat(); // 小黑吃东西
```
