# TypeScript 中的泛型

软件工程中，我们不仅要创建一致的定义良好的 API，同时也要考虑可重用性。组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为开发者提供了十分灵活的功能。

::: tip
在像 C#和 Java 这样的语言中，可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。这样用户就可以以自己的数据类型来使用组件。
:::

通俗理解：泛型就是解决类，接口，方法的复用性，以及对不特定的数据类型的支持。

```ts
function getData(value: string): string {
  return value;
}
```

上面的代码只能返回 string 类型，若我们还想获得返回 number 类型的同样的函数，代码就冗余了。

我们其实可以使用 any，但使用 any 就放弃了类型检查，我们希望返回的值能多样且是被我们指定的。

```ts
// 能同时返回string和number或者其他能被我们指定的类型，比如传入什么类型返回什么类型
function getData<T>(value: T): T {
  return value;
}
```

这里的`T`，表示的就是泛型。具体是什么类型是调用这个方法的时候决定的。

```ts
getData<number>(123);
getData<string>("123");
```

## 泛型实战

最小堆算法，需要同时支持，返回数字和字符串两种类型（通过泛型就可以很好实现）

```ts
// 这种写法只能实现一个类型的校验
class MinClass {
  public list: number[] = [];
  add(num: number): void {
    this.list.push();
  }
  min(): number {
    var minNum = this.list[0];
    for (var i = 0; i < this.list.length; i++) {
      if (minNum > this.list[i]) {
        minNum = this.list[i];
      }
    }
    return minNum;
  }
}

var m = new MinClass();

m.add(3);
m.add(4);
m.add(22);
m.add(2);

alert(m.min()); // 2
```

```ts
// 使用泛型
class MinClass<T> {
  public list: T[] = [];
  add(value: T): void {
    this.list.push();
  }
  min(): T {
    var minNum = this.list[0];
    for (var i = 0; i < this.list.length; i++) {
      if (minNum > this.list[i]) {
        minNum = this.list[i];
      }
    }
    return minNum;
  }
}

var m1 = new MinClass<number>(); // 实例化类 并且指定了类的T代表的类型是number
m.add(3);
m.add(4);
m.add(22);
m.add(2);

alert(m.min()); // 2

var m2 = new MinClass<string>(); // 实例化类 并且指定了类的T代表的类型是string
m.add("a");
m.add("b");
m.add("c");
m.add("d");

alert(m.min()); // a
```

## 泛型接口

```ts
interface ConfigFn {
  <T>(value1: T, value2: T): T;
}

var setData:ConfigFn = function<T>(value1:T, value2:T):T {
  reutrn value1 + value2
}

setData<string>('123', '123');
```
