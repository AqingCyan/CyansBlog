# ES6的解构赋值

## 数组的解构赋值

总结来看就是一一对应的关系

```JavaScript
let arr = [1,2,3,4];
let [a,b,c,d] = arr;
console.log(a,b,c,d);//顺利打印出每个值
```

- 若遇到数组本身有默认的值的情况，则默认值会被赋新值。只有在赋值的时候，新值未定义，默认值才得以保留
- 这里是直接赋值的，而不是将默认值修改为新值

## 对象的解构赋值

如果变量名和属性名一样的话 可以直接省略写法

```JavaScript
let {name:name,age:age}={name:"Cyan",age:19};
// 等价于
let {name,age} = {name:"Aqing",age:20};
```

- 对象中也有默认值的情况,若赋值的是 undefined，那么还是采用默认值
- 给对象解构赋值的时候允许和数组嵌套赋值，见相应代码
- 这里仍然需要注意到我们的对象涉及到了块级作用域

```JavaScript
let x1,x2;
({x1,x2} = {x1:1,x2:2}); // 拿括号包起来
```

## 其他数据类型的解构赋值

使用数组结构赋值的形式，如果等号右边不是一个数组默认将其转换为类数组，里面包含的是字符串(类似数组的对象，必须有一个 length 属性)

```JavaScript
let [m,n] = 1;
console.log(m, n); // 报错：1 is not iterable，1没有length属性
```

- 使用对象结构赋值的形式 如果等号右边不是对象 默认转为对象 再进行结构赋值
- 因此 我们可以利用解构赋值来拿到一些属性的值

```JavaScript
let {length:b} = "1234";
console.log(Object("1234")); // 发现转为对象后，有一个length属性，那我们就这样来取值
console.log(b); // 输出b，我们就拿出了length的值
```

## 函数类型的解构赋值

综合了前面几种的情况，但是要考虑到形参与实参的因素，详细见相应代码说明