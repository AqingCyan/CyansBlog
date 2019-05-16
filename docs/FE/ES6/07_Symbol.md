# Symbol数据类型

Symbol是一个新的基本数据类型，是一个值类型。使用Symbol函数执行得到一个Symbol数据类型。

## Symbol特性
- Symbol跟字符串类型相似 但是使用Symbol函数得到一个数据，每一个都是完全不同的
- Symbol可以接受一个参数() 这个是对Symbol数据的一个描述
- 即使描述一样 但是值也是不一样的
- 一般当做对象的属性  因为任意一个Symbol()得到的值都是不同的 避免了同名属性被覆盖属性值的情况

```js
let sym1 = Symbol("foo");
let sym2 = Symbol("foo");
console.log(typeof  sym1); //"symbol"
console.log(sym2); // "Symbol(foo)"
console.log(sym2===sym1); // false  sym1和sym2没有关系

let obj = {
  [sym1]:"Aqing"
};
console.log(obj); // {Symbol(foo): "Aqing"}
obj[sym2] = "Cyan";
console.log(obj); // {Symbol(foo): "Aqing", Symbol(foo): "Cyan"}  同名的属性 但是并没有被覆盖掉 说明两个Symbol命名的属性不相干
```

- Symbol值不可以跟其他值计算，也不可以进行字符串拼接
- Symbol值是无法转数字的
- 但是可以转为Boolean值
- 可以toString变成 显示字符串

```js
console.log(Symbol("1") + 1); // 报错： Cannot convert a Symbol value to a number
console.log(!Symbol("1")); // false
console.log(Symbol("Cyan").toString()); // "Symbol(Cyan)"
```

## Symbol的方法

### Symbol.for()

如果之前有相同描述(参数)的Symbol值，找到这个值返回，如果没有就得到一个包含这个参数的新值。使用Symbol.for()参数相同，值就相同

```js
let Aq1 = Symbol("Aqing");
let Aq2 = Symbol.for("Aqing");
let Aq3 = Symbol.for("Aqing");
console.log(Aq2 === Aq3); // true
console.log(Aq1 === Aq2); // false 因为Symbol值是完全不同的
```

### Symbol.keyfor()

找到使用Symbol.for创建的值的描述(参数)，如果使用的是Symbol()创建的，是无法用keyFor获取的

```js
console.log(Symbol.keyFor(Aq2)); // "Aqing"
console.log(Symbol.keyFor(Aq1)); // undefined 看来只能找到用Symbol.for()创建的值的描述
```
