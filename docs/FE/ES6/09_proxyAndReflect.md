# Proxy代理与Reflect反射

## Proxy代理

我们简单的理解它的字面意思，将它比作一个代理商。将 obj 比作供应商，我们创建了一个 monitor 作为代理商，代理商在代理的时候可以对供应商映射的数据做一些处理，而用户就可以直接通过 monitor 访问数据了。而用户通过 monitor 对数据做了如何的操作，又通过 monitor 反应给 obj。

```js
let obj = {
  time: '2019-04-06',
  name: 'net',
  _r: 123
}

let monitor = new Proxy(obj, {
  // 拦截对象属性的读取，target是被代理的对象，key是键
  get(target, key) {
    // 不管通过代理读取什么值，都把2019替换成2018
    return target[key].replace('2019', '2018');
  },
  // 拦截对象属性的设置，value指修改的值
  set(target, key, value) {
    // 这里被代理设置成只允许修改name属性
    if (key === 'name') {
      return target[key] = value;
    } else {
      return target[key];
    }
  },
  // 拦截key in object操作
  has(target, key) {
    // 我们只允许暴露name属性(查询是否存在的时候假装没有除name以外的属性)
    if (key === 'name') {
      return target[key]
    } else {
      return false;
    }
  },
  // 拦截删除
  deleteProperty(target, key) {
    // 如果是下划线开头，就允许删除
    if(key.indexOf('_') > -1) {
      delete target[key];
      return true;
    } else {
      return false;
    }
  }
});

console.log('get', monitor.time); // get 2018-04-06
monitor.time = '2017';
console.log('get', monitor.time); // get 2018-04-06
monitor.name = 'Aqing';
console.log('get', monitor.name); // get Aqing
console.log('has', 'name' in monitor, 'time' in monitor); // has true false
console.log('delete', delete monitor.name, delete monitor._r, obj); // delete false true {time: "2019-04-06", name: "net"}
```

::: tip
从上述例子来看，代理所起的作用很有效的拦截了我们对对象的直接的读和写。我们不能直接操作原对象，而是通过代理来完成对数据的操作。其实在Vue-cli脚手架工具中，我们就是通过代理实现跨域的，Proxy将本机地址代理到与服务器一样的域中:100:
:::

### Proxy可代理属性的操作方法

| 方法                               | 描述                                          |
| ---------------------------------- | --------------------------------------------- |
| handler.apply()                    | 拦截 Proxy 实例作为函数调用的操作             |
| handler.construct()                | 拦截 Proxy 实例作为函数调用的操作             |
| handler.defineProperty()           | 拦截 Object.defineProperty()的操作            |
| handler.deleteProperty()           | 拦截 Proxy 实例删除属性操作                   |
| handler.get()                      | 拦截 读取属性的操作                           |
| handler.set()                      | 拦截 属性赋值的操作                           |
| handler.getOwnPropertyDescriptor() | 拦截 Object.getOwnPropertyDescriptor() 的操作 |
| handler.getPrototypeOf()           | 拦截 获取原型对象的操作                       |
| handler.has()                      | 拦截 属性检索操作                             |
| handler.isExtensible()             | 拦截 Object.isExtensible()操作                |
| handler.ownKeys()                  | 拦截 Object.getOwnPropertyDescriptor() 的操作 |
| handler.preventExtension()         | 拦截 Object().preventExtension() 操作         |
| handler.setPrototypeOf()           | 拦截Object.setPrototypeOf()操作               |
| Proxy.revocable()                  | 创建一个可取消的 Proxy 实例                   |

## Reflect的使用

与Proxy十分类似，它是对象的一个映射，可以直接通过Reflect.方法来操作对象。

```js
let obj = {
  time: '2019-04-06',
  name: 'net',
  _r: 123
}

console.log('Reflect', Reflect.get(obj, 'time')); // Reflect 2019-04-06
Reflect.set(obj, 'name', 'Aqing');
console.log(obj); // {time: "2019-04-06", name: "Aqing", _r: 123}
```

## Proxy与Reflect的用法

数据校验，代理域名解决跨域等

我们使用Proxy来实现一个校验业务的解耦，我们创建了一个对象，并且在对象创建的时候就对其属性的设置做一个校验。

```js
function validator(target, validator) {
  return new Proxy(target, {
    _validator: validator,
    set(targe, key, value, proxy) {
      if (target.hasOwnProperty(key)) {
        let va = this._validator[key];
        if (!!va(value)) {
          return Reflect.set(target, key, value, proxy);
        } else {
          return `不能设置${value}到${key}中`
        }
      } else {
        throw Error(`${key}不存在`)
      }
    }
  })
}

const personvalidators = {
  name(val) {
    return typeof val === 'string';
  },
  age(val) {
    return typeof val === 'number' && val > 18;
  }
}

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    return validator(this, personvalidators);
  }
}

const person = new Person('lili', 30);
console.info(person);
person.name = 20; // 报错，proxy代理不予除字符串以外的类型设置属性
person.name = 'Cyan';
```

我们通过这样的方式，把校验内容抽离出来，通过代理的方式来进行校验，使代码解耦。

::: warning
这一块还是多思考一下吧
:::