# Set与Map数据结构

## Set数据结构

类似数组，只有值value没有键key，通过构造函数的方式创建一个set实例，参数是一个数组或者类似数组的（有接口的iterable）

::: tip
有iterable接口的常用的数据结构：数组，arguments，元素集合，Set，Map，字符串
:::

### Set特点与内置方法

- 默认去重（不管是字符串还是数组）
- 类似对象包裹数据的方式，但只有值没有键

```js
console.log(new Set()); // Set(0) {}  (可展开)
console.log(new Set([1, 2, 3, 4])); // Set(4) {1, 2, 3, 4} 展开发现里面只有value没有key
console.log(new Set("1234")); // Set(4) {"1", "2", "3", "4"} 仍然只有value没有key
function fn() {
  console.log(new Set(arguments));
}
fn(1,2,3,4); // Set(4) {1, 2, 3, 4} 展开仍然没有key 只有value

console.log(new Set([1, 1, 3, 4, 2, 4, 2, 3, 10])); // Set(5) {1, 3, 4, 2, 10} 有去重的功能
console.log(new Set("12311332414214314345")); // Set(5) {"1", "2", "3", "4", "5"} 去重
```

#### add()方法：增加

- 但是如果之前没有 会成功加上  如果之前有 就不会加上 因为自带去重
- 返回值增加后的Set实例  如此我们根据返回值可以使用链式写法
- add参数只能一次写一个

```js
let set1 = new Set([1,2,"哈哈",null,NaN,true]);
console.log(set1.add(1)); // 添加失败
console.log(set1.add(10)); // 添加成功
console.log(set1.add(11).add(12)); // 链式写法添加成功
console.log(set1.add(NaN)); // 添加失败  尽管NaN不等于NaN 但是也不能添加成功
```

#### delete()方法：删除

- 参数是删除的值
- 返回值是布尔值true or false如果里面有着一项就删除成功true，没有此项就删除失败false

```js
console.log(set1.delete(12)); // true
console.log(set1); // 12 已经删除成功
console.log(set1.delete(1000)); // false
```

#### has()方法：判断有没有此项

参数是判断的项，返回值true/false

```js
console.log(set1.has(NaN));
```

::: tip
从上面的例子可以看出来：这里的内置方法一定不是靠相等判断的，因为NaN不等于NaN:cookie:
:::

#### clear()方法：清空

没有返回值，没有参数

```js
console.log(set1.clear()); // undefined 因为没有返回值
console.log(set1); // Set(0) {}  已经被清空了
```

### Set使用遍历方法的情况

forEach：遍历每一项，参数函数有形参，当前项，当前项的索引，正在遍历的当前实例。但Set实例只有value无key。

```js
let set2 = new Set([1,2,"哈哈",null,NaN,true]);
set2.forEach((...rest)=>{
  //因为Set实例只有value没有key  所以 遍历出来打印出来的内容  item 和 index都是一模一样的当前项 第三个是当前实例
  //比如第一个 打印出来是 [1, 1, Set(6)] 第二个打印出来是[2, 2, Set(6)] 第三个打印出来是["哈哈", "哈哈", Set(6)]
  console.log(rest);
});
```

keys：遍历一个接口

```js
console.log(set2.keys()); // SetIterator {1, 2, "哈哈", null, NaN, …}
// 我们知道之前测试代码中有一个for of 方法是用来遍历接口的
for(let key  of set2.keys()){
  console.log(key);
  //打印出了 1 2 哈哈 null NaN true，因为Set没有key只有value，key仍然是value值
}
```

values：大致同上，遍历了一个接口，但是用for of打印的是正经value

```js
console.log(set2.values()); // SetIterator {1, 2, "哈哈", null, NaN, …}
for(let key of set2.values()){
  console.log(key); // 打印出了 1 2 哈哈 null NaN true
}
```

entries：遍历了一个接口，我们使用for of 遍历一下

```js
console.log(set2.entries()); // SetIterator {1, 2, "哈哈", null, NaN, …}
for(let key of set2.entries()){
  console.log(key); // 打印出了 [1, 1] [2, 2] ["哈哈", "哈哈"]  [null, null] [NaN, NaN]  [true, true]
}
//我们可以解构赋值
for(let [key,val] of set2.entries()){
  console.log(key,val); // 打印出了 1 1   2 2   哈哈 哈哈    null null      NaN NaN     true true
}
```

## Set的用途

### 数组去重

```js
let ary = [1,2,1,3,2,4,3,5];
console.log(new Set(ary)); // Set(5) {1, 2, 3, 4, 5} 打印出后的确去重了  但是不是数组了 我们还得把它变成数组
console.log([...new Set(ary)]); // (5) [1, 2, 3, 4, 5]
//改写成方法
function unique(ary) {
  return [...new Set(ary)]; // Array类上的ES6新方法 from也可以转成数组
}
```

### 拓展，取数组的交集并集差集

```js
// 并集
let ary1 = [1,3,5,7,8,9];
let ary2 = [2,4,6,7,8,9];
function add(ary1,ary2) {
  return [...new Set([...ary1,...ary2])];
}

console.log(add(ary1, ary2)); // [1, 3, 5, 7, 8, 9, 2, 4, 6]

// 交集
function same(ary1,ary2) {
  return ary1.filter(item => ary2.includes(item));
}

console.log(same(ary1, ary2)); // [7, 8, 9]

// 差集 :并集减去交集
function diff(ary1,ary2) {
  return add(ary1,ary2).filter(item=>!same(ary1,ary2).includes(item));
  // filtter是遍历数组每一项做判断 判断交集的项是否包含并集的项 包含(相同) 返回true 再取反返回false
}

console.log(diff(ary1, ary2)); // [1, 3, 5, 2, 4, 6]
```

## Map数据结构

构造函数方式创建一个Map实例，参数是一个数组。数组中的每一项也得是一个单独的数组 `new Map([[key,value],[key,value]])`
- 单独数组放的是两个值,，分别是key和value
- 在一个对象中，它的属性名必须是字符串，如果写的不是字符串默认转为字符串
- 而Map可以让除了字符串数据类型之外的其他数据类型作为属性名
- 但是Map不能放入一个未定义的变量作为属性名
- 属性名不能重复，重复会导致覆盖

```js
let arr = [1,2];
let map1 = new Map([[1,"Cyan"],[2,"Aqing"],[3,3],[true,true],["arr",[1,2]],[arr,[1,2]],[9,[1,2]]]);
console.log(map1); // 展开后 发现 key的值是 1 2 3 true 1,2 发现并没有被转换为字符串
```

### Map的方法

- size()：键值对个数
- get(key)：获取value值
- set(key,value)：设置value值，返回的是修改后的实例，所以可以采用链式写法。如果之前有属性名，set会修改该属性 ，如果之前没有属性名，set会增加属性
- has(key)：判断key是否有对应的value值
- delete(key)：删除该实参传入的属性
- clear()：清空，没有返回值 把属性全部清空 没有参数

```js
// get()
console.log(map1.get(true)); // true
console.log(map1.get(1)); //"Cyan"
console.log(map1.get("arr")); // [1,2]
console.log(map1.get(arr)); //[1,2]
console.log(map1.get(9)); // [1,2]

// set()
console.log(map1.set(1, 2)); // 发现1的值从"Cyan"修改为2
console.log(map1.set(false, "mimi")); // 增加了false属性 value为"mimi"

// has()
console.log(map1.has(1)); // true

// delete()
console.log(map1.delete(1)); // true
console.log(map1); // key为1的属性已经消失不见
console.log(map1.delete(1000)); // false  删除失败 没有key为1000的属性

// clear()
console.log(map1); // map(0){}
```

### 遍历Map的方法

```js
//forEach
map1.forEach((value,index,input)=>{
  console.log(value);
  console.log(index);
  console.log(input);
}); // 都打印出了  格式如下 "Aqing" 2 Map(7) {2 => "Aqing", 3 => 3, true => true, "arr" => Array(2), Array(2) => Array(2), …}

// keys values 用法类似 需要for of 遍历接口
for(let key of map1.keys()){
  console.log(key);
} // 打印出了所有key: 2，3，true，arr[1,2]，9，false

for(let value of map1.values()){
  console.log(value);
} // 打印出了所有value
```

### 如何把数组转化为Map实例

```js
let ary = ["Aqing","Cyan","Vue","React","Node"];
let map = new Map();
//遍历数组接口 然后解构赋值
for(let [index,value] of ary.entries()){
  map.set(index,value);
}
console.log(map);
```
