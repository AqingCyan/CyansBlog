# class关键字，类的定义新方法

## 回顾ES5的方式

ES5中定义类的方式

```js
function Fn() {
  this.x = 10;
}
// 在类的原型上定义方法
Fn.prototype.getX = function () {
   console.log(this.x);
};
let f = new Fn();
console.log(f.constructor); // Fn() {this.x = 10;}
f.getX(); // 10
```

## ES6定义类的方式

ES6使用class关键字定义类，并且把类本身的属性定义在其constructor中

```js
 class A{
  constructor(x){
    this.x = x;
  }
}
```

上面定义了一个A类，我们对其一些新的细节进行解读

-  constructor是类自带的一个函数，我们把类本身的属性定义在其中（私有属性）
- 它其中的this指向就是实例本身
- `this.x = x`是增加私有属性x的操作，我们可以看到定义类是可以传参的，写在constructor上
- 和ES5中一样，一般不return值，如果return值，基本数据类型没有影响，如果是引用数据类型会改变实例

使用和原先的方式一样：

- 类必须new执行，不可以作为普通函数执行
- `A(); //报错：Class constructor A cannot be invoked without 'new'` 必须是要new方式来使用该类，而不是像ES5中还具有函数的角色

```js
let a = new A(10); // 创建实例的时候传入参数 给了实例一个私有的属性的值
console.log(a); // A {x: 10} 是一个对象
console.log(typeof A); // function 即使它的类型仍然为函数 但不能作为函数使用
```

## class的name

针对不同的创建方式，类的name会有不同的限制

```js
let A = class {
  constructor(){
    console.log(A.name);
  }
};
new A(); // A
```

另一个命名方式却又很大的不同

```js
//如果创建一个类 如此命名
let B = class BB {
  //BB 只能在类里面使用 类的name都是BB
  constructor(){
    console.log(BB.name);
    console.log(B.name);
  }
  //在这里写原型上的方法
  getB(){
    console.log(BB.name);
  }
};

new B(); // "BB" "BB"
new BB(); // 报错：BB is not defined  结合前一个来看 我们可以在constructor里面啊使用BB这个名字 但是在外面不能使用BB

let a = new B(); // 这一步应该是会打印两个"BB"的
a.getB(); // BB  结合前面的测试代码，说明BB这个name只能在类的里面使用 不能再外面使用
```

## class的执行问题

- ES5的类可以传参
- ES6的类也可以传参

```js
function BB(name) {
    this.name = name;
}
let bb = new BB("Cyan"); // 此时对象bb具有私有属性name 值为"Cyan"
console.log(bb); // { name: 'Cyan' }

class AA {
    constructor(name){
        this.name = name;
    }
}

let aa = new AA("Aqing");
console.log(aa); // AA { name: 'Aqing' }
```

采用class表达式让类直接执行

- 这种写法直接加小括号，在声明定义的时候直接执行类，也就说它不能作为普通函数执行，但是可以作为构造函数执行
- 也可以传参数，传给了类本身constructor

```js
let a1 = new class{
  constructor(name){
    console.log(name);
  }
}("Cyan"); // "Cyan"
```

## class的变量提升

- 在ES5中，使用function定义类，会有变量提升，所以在定义类的代码之前执行函数或者new一个实例是没有问题的
- ES6中的class与let、const一样没有变量提升

```js
// ES5没问题
FF();
new FF;
function FF() {
    this.f = "ff";
}

// new GG; // 报错：GG is not defined 说明这里是认为GG是没有被声明的
class GG{
  constructor(){
    this.gg = "gg";
  }
}
```

## class的静态方法

类就相当于原型，写在原型上的方法都被实例继承了，假如想给当前类本身加一些方法，
我们可以在方法前面加上一个关键字：static，不会被实例继承，只有类本身可以使用

```js
class AA{
  constructor(){
    this.a = "aa";//私有的
  }
  getA(){//这是该类原型上的方法
    console.log("哈哈");
  }
  static  getB(){
    console.log("这是AA的静态方法");
  }
}
let aa = new AA;
console.log(aa); // AA { a: 'aa' }
aa.getA(); // "哈哈"
console.log(aa.getB); // undefined
// aa.getB(); // 报错：aa.getB is not a function
AA.getB(); // 这是AA的静态方法，说明AA的静态方法只能在该类使用
```

静态方法可以被子类继承

```js
class F {
  static getF(){
    console.log("我是F的getF");
  }
}
// class G继承F
class G extends F{
  constructor(){
    super();
  }
  static getF(){
    super.getF();
  }
}

G.getF(); // 我是F的getF
```

## 原型上的方法不可枚举

- ES5中类原型上的方法可以枚举
- ES6用class定义类的原型上的方法不可以枚举

```js
function F() {
    this.f = "ff";
}
F.prototype.getF = function () {};
let f = new F;
for(let key in f){
  console.log(key);
} // f和getF都遍历到了，公有和私有方法都可以枚举

class AA {
  constructor(){
    this.f = "ff";
  }
  getF(){}
}
let aa = new AA;
for (let key in aa){
  console.log(key);
} // f （只打印了f，公有方法没有被拿到，说明原型上的方法不可枚举）
```

## class的继承

- 使用extend让子类继承父类
- 子类没有this，this继承于父类，必须要写super
- super指向的是父类的原型
- super()执行完后才会有this，super就是父类的constructor
- 不可以在super()执行之前就使用this，会报错，因为此时还没有this
- 父类的静态方法(私有方法)也可以继承

```js
class A {
  constructor(x){
    this.x = x;
  }
  getX(){
    console.log(this.x);
  };
  static getY(){
    //这里的this是:[Function: A]
    console.log(this);
  }
}

// 子类B继承父类A
class B extends A {
  constructor(x){
    // 我们看到父类传递了一个x，所以子类也需要传递x
    super(x);
    this.y = 100;
  }
  getX(){
    // 如何让这个getX是来自于父类原型的getX？
    // 使用关键字 super
    // super指向的是父类的原型
    super.getX();
  }
  // 父类的静态方法(私有方法)也可以继承
  static getY(){
    // 此时的super指的是父类本身,getY是父类本身的私有方法
    super.getY();
  }
}

let b = new B("Cyan");
b.getX(); // "Cyan"
B.getY(); // [Function: B]
```
