# 数组的 ES6 拓展

## 数组类上的拓展

Array 既是一个类也是一个函数，作为一个函数，返回的值是一个数组，但注意：只有一个参数并且参数是个数字，返回有 n 个空位的数组

```js
console.log(Array(1, 2, 3)); // 返回了一个数组
console.log(Array("1")); // 返回["1"]
console.log(Array(7)); // 得到的是 七个空位
```

Array.of(); 跟 Array 一样的作用 唯一不同的是如果是 参数是一个数字的时候返回仍然是一个数组

```js
console.log(Array.of(1)); // 返回[1]
```

Array.from(数组/类数组) 返回一个数组:将一个类数组转化为一个数组 或者 克隆一个数组

```html
<ul id="list">
  <li></li>
  <li></li>
  <li></li>
  <li></li>
</ul>
```

```js
console.log(Array.from([1, 2, 3])); // [1,2,3]
console.log(Array.from("123")); // ["1","2","3"]
console.log(list.getElementsByTagName("li")); // 打印出一个li类数组
console.log(Array.from(list.getElementsByTagName("li"))); // 打印出一个数组[li,li,li,li]
```

## 数组原型上拓展的方法

> 所有数组实例上的方法 参数是索引n到索引m的都是包含n不包含m的 顾头不顾腚

### copyWithin 

- 从原数组中读取内容 替换数组的指定位置的内容
- 参数：替换的目标起始位置target,查找的起始位置begin,查找的结束为止end(如果没写，默认到结尾)
- 备注：如果替换的时候，有超出数组长度的部分，超出的部分自动截断。要保证原数组的length是不变的
- 会改变原数组，返回修改后的数组

```js
let ary1 = [1, 2, 3, 4, 5, 6, 7, 8];
// 从索引2开始到索引4但不包含索引4，即3,4  替换从索引4开始的内容 结果就变为[1,2,3,4,3,4,7,8]
console.log(ary1.copyWithin(4, 2, 4));
// [1,2,3,4,3,4,7,8]  说明改变了原数组
console.log(ary1);
// 因为原数组长度不变，超出的部分自动截断，所以输出[1,2,3,3,4,3,4,7],8被自动截断了
console.log(ary1.copyWithin(3, 2));
```

### fill

- 按照指定字符填充数组,将数组的每一项都变成指定字符
- 参数：替换的字符，开始替换的位置，结束替换的位置（未写则替换到结尾）
- 该方法会改变原数组，方法返回改变后的数组

```js
// 数组内容全变为字符串 "Cyan"
console.log(ary1.fill("Cyan"));
let ary2 = [1,2,3,4,5,6,7,8];
// 从索引3位置开始替换[1, 2, 3, "Aqing", "Aqing", "Aqing", "Aqing", "Aqing"]
console.log(ary2.fill("Aqing", 3));
// 从索引3到索引4(不包含5)替换[1, 2, 3, "Cyan", "Cyan", "Aqing", "Aqing", "Aqing"]
console.log(ary2.fill("Cyan", 3,5));
```

::: tip
下面的方法，都会遍历数组，通常第一个参数是一个函数，对每次遍历进行一些业务处理。该函数this指向window。但我们可以通过第二个参数
来修改它的this指向，但reduce和reduceRight方法不可以修改this，因为他们的第二个参数是用来修改初始prev值的:cookie:
:::

### filter

- 遍历数组 根据返回值去过滤原数组
- 返回的是一个新的数组 原数组不变

```js
let ary3 = ["Cyan",1,2,3,"Cyan"];
//这里有三个参数 项  索引  当前数组(不常用，这里没写)
let newArr = ary3.filter(function (item, index) {
  //如果返回的是true就留下当前项，如果返回的是false就滤除当前项
  return typeof item === "number";
});
console.log(newArr); // [1, 2, 3]
```

### find

- findIndex  先遍历数组 一旦参数函数返回true 停止查找 返回当前项的索引
- 只会查找一个 一旦找到就停止  如果没找到就返回undefined
- 不会改变原数组

```js
let b = ary3.findIndex(function (item) {
  //判断是不是字符  当找到"Cyan"，判断为真 返回索引
  return typeof item === "string";
});
console.log(b); // 0
```

### includes

- 判断数组中有没有某一项
- 第二个参数是开始查找位置的索引

```js
console.log([1, 2, 3].includes(1)); // true
console.log([1, 2, 3].includes(1, 1)); // false
```

### every

- 遍历数组 如果遍历每一项都返回true 最后结果为true 
- 只要有一个为false 结果就是false
- 该方法不会修改原数组

```js
console.log([1, 2, 3, 4, 5].every(function (item) {
  return typeof item === "number";//判断遍历的每一项是不是数字
})); // true
console.log([1, 2, 3, 4, "5"].every(function (item) {
  return typeof item === "number";//判断遍历的每一项是不是数字
})); // false
```

### some

- 遍历数组 只要里面有一项是true 最后结果就是true
- 全是false 则为false

```js
console.log([1, 2, 3, 4, 5, "Cyan"].some(function (item) {
  return typeof item === "number"; // 判断遍历的每一项是不是数字
})); // true
```

### reduce

- 迭代：回调函数的两个参数： prev 上一次的返回值   item：当前项
- 方法中可以填写第二个参数  作为初始的prev
- 第二个参数的含义是：用来用来指定第一次在没有上一次返回值prev情况下 prev的值 也就说弥补了 第一次的prev
- 此方法不改变原数组

|prev|item|prev+item|
|---|---|---|
|没有|1|0+1=1|
|1|2|1+2=3|
|3|3|3+3=6|
|6|4|6+4=10|
|10|5|10+5=15|
|返回15|

```js
let ary4 = [1,2,3,4,5];
console.log(ary4.reduce(function (prev, item) {
  return prev + item; // 将上一次的值加上当前项  相当于求和
}));

console.log(ary4.reduce(function (prev, item) {
  return prev + item;
 }, 10)); // 这一次的结果为25，因为第二个参数指定了第一次的prev为10
```

### reduceRight

- 跟reduce一样 只是顺序从右开始
- 每次迭代的时候，我们可以做许多业务去处理前后两个值，这里做示例用来求和了

```js
console.log(ary4.reduceRight(function (prev, item) {
  return prev + item;
})); // 15
```

### keys

遍历每一项的索引的接口  可以使用for of遍历

```js
let ary5 = ["a","b","c","d"];
console.log(ary5.keys());
for(let key of ary5.keys()){
  //key 是索引
  console.log(key);// 0 1 2 3
}
    
// 默认使用for of遍历数组 默认遍历的就是每一项
for(let item of ary5){
  console.log(item); // "a","b","c","d"
}
```

### entries

- 遍历接口 可以遍历索引和每一项
- 每一次遍历得到一个数组 数组里面是[索引，当前项]
- 一般可以通过数组解构赋值获取到遍历的结果 用[]包含内容 对应数组的格式

```js
for(let e of ary5.entries()){
  console.log(e); // [0,"a"] [1,"b"] [2,"c"] [3,"d"]
}
    
//如果要分别得到索引和每一项的话 就可以使用解构
for(let [index,item] of ary5.entries()) {
  console.log(index,item); // 0 "a" 1 "b" 2 "c" 3 "d"
}
```

## 数组上的空位问题

### 数组空位 

- 数组的某个索引位置没有任何值 出现了空位
- undefined不是空位

### 判断一个数组中某一个位置是不是空位

in方法:判断数组索引位置上有没有值

```js
let arr = [undefined,,,,,]; // 数组不写内容的时候 有几个逗号 代表几个空位
console.log(arr.length); // 5
console.log(1 in arr); // 索引为1的位置没有值 false
console.log(0 in arr); // 索引为0的位置有undefined  打印true
```

### 拓展：ES5与ES6对数组空位处理
- 在ES5中数组方法对空位的处理不一致 一般直接跳过空位
- 在ES6中数组方法将空位处理为undefined

```js
let arr1 = [1,2,,,,3];
arr1.filter(function (item) {
  console.log(item); // 只打印了 1 2 3  直接跳过了空位
});

arr1.find(function (item) {
  console.log(item); // 打印了1 2 undefined有3 3
});

//ES6
for (let item of arr1){
  console.log(item); // 打印了1 2 undefined有3 3
}

//ES5
for(let key in arr1){
  console.log(key); // 索引0 1 5 把索引2 3 4忽略
}
```
