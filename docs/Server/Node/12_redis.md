# 引入Redis

## session存储位置的问题

- 目前 session 是一个js变量，放在 nodejs 进程内存中
- 第一，进程内存有限，访问量过大，内存暴增怎么办？
- 第二，正式上线运行是多进程的，进程之间内存无法共享

## redis来解决

- web server 最常用的缓存数据库，数据存放在内容中
- 相比于mysql，访问速度快（内存和硬盘不是一个数量级）
- 成本过高，可存储的数据量很小
- 断电或者服务器宕机情况下，数据丢失

### 解决方案

- 将web server 和 redis 拆分成两个单独的服务
- 双方都是独立的，都是可拓展的
- 不管有多少个进程，都访问的是同一个redis

### 为何session适合用redis？

- session访问频繁，对性能要求高
- session可以不考虑特殊情况下的数据丢失问题
- session的数据量不会很大，适合存储在redis中

::: tip 为何网站数据不适合redis

- 操作频率不是很高（相比于session）
- 断电不能丢失，必须保留
- 数据量太大，内存成本太高

:::

## 使用redis修改session业务

首先得全局安装redis，然后启动redis服务

### 使用`node.js`链接 redis

安装操作依赖

```sh
npm install redis -D
```

在`db.js`下添加操作redis的参数

```js
let MYSQL_CONF
let REDIS_CONF

if (env ==='dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'xkq199862',
    port: '3306',
    database: 'myblog'
  }
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}
```

在`db/`文件夹下创建一个`redis.js`

```js
const redis = require('redis')
const {REDIS_CONF} = require('../config/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.log(err)
})

const set = (key, val) => {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val, redis.print)
}

const get = key => {
  return  new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return
      }
      // 处理格式的问题，如果不是JSON格式转换一下，否则就正常resolve，这里不是为了处理异常
      try {
        resolve(JSON.parse(val))
      } catch (e) {
        resolve(val)
      }
    })
  })
}

module.exports = {
  set,
  get
}
```

### 修改业务

现在链接redis的工具函数已经封装好了，该修改之前的业务了

```js
// 解析session
// let needSetCookie = false
// let userId = req.cookie.userid
// if (userId) {
//   if (!SESSION_DATA[userId]) {
//     SESSION_DATA[userId] = {}
//   }
// } else {
//   needSetCookie = true
//   userId = `${Date.now()}_${Math.random()}`
//   SESSION_DATA[userId] = {}
// }

// 使用redis解析session
let needSetCookie = false
let userId = req.cookie.userid
if (!userId) {
  needSetCookie = true
  userId = `${Date.now()}_${Math.random()}`
  // 初始化redis中的session
  set(userId, {})
}
// 获取session
req.sessionId = userId
get(userId).then(sessionData => {
  if (sessionData == null) {
    // 初始化redis中的session
    set(req.sessionId, {})
    // 设置 session
    req.session = {}
  } else {
    req.session = sessionData
    console.log(req.session)
    return getPostData(req) // 处理postData
  }
})
  // .then(......)
```

与之前的session存储逻辑一样，只不过现在是存放在了redis中。但需要注意的是，如果sessionData是null，也就是说没有sessionData时的操作，也是初始化它的内容，待登录后处理。（之前存储session的SESSION_DATA可以删掉了）

为了让req的数据能正常的被`getPostData`调用，同样都是promise，我们把这一步提进了session处理的里面，返回出去被then方法使用。

那么刚刚在登录路由`router/user.js`中，除了给`req.session`设置内容，还需要增加一步：同步数据存储到redis中的操作

```js
// 设置session
req.session.username = data.username
req.session.realname = data.realname
// 同步到redis
set(req.sessionId, req.session)
```