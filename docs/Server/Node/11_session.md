# Session的引入

使用了cookie做了登录的验证和状态的保持其实还没有结束，我们不能忽略的是cookie中的信息是明文传输的，这极其不安全。其实这些敏感的信息放在浏览器始终是不安全的，为了保证安全性，我们会把它们放在我们的服务端，这个时候就要引出session了。

::: tip
既然浏览器的cookie不能放敏感信息，我们选择把敏感信息存放在session。那么可以放一个与敏感信息对应的id，将页面与服务端的内容对应起来。
:::

## 在app.js中解析session

首先我们需要和处理cookie一样，解析一下session

```js
const SESSION_DATA = {} // 定义全局变量存储session

// 解析session
let userId = req.cookie.userid
if (userId) {
  if (SESSION_DATA[userId]) {
    SESSION_DATA[userId] = {}
  }
} else {
  userId = `${Date.now()}_${Math.random()}`
  SESSION_DATA[userId] = {}
}
req.session =SESSION_DATA[userId]
```

首先我们初始化了一个全局的空对象来存储session的数据。同时获取请求中携带来的cookie中的userid。如果cookie中存在userid，判读SESSION_DATA中是否存储了`userId`对应的内容，没有就初始化值。如果cookie中存在userid，给userId赋值一个字符串（当前时间与随机数结合，保证不重复），并且初始化值。之后做一个赋值`req.session =SESSION_DATA[userId]`

与此同时，我们还需要将设置的cookie做一个修改，现在cookie要设置的是userid而不是具体的信息了

```js
// 解析session
let needSetCookie = false // 用来判断是需要设置cookie
let userId = req.cookie.userid
if (userId) {
  if (SESSION_DATA[userId]) {
    SESSION_DATA[userId] = {}
  }
} else {
  needSetCookie = true // 如果不存在userId，需要在cookie设置userid
  userId = `${Date.now()}_${Math.random()}`
  SESSION_DATA[userId] = {}
}
req.session =SESSION_DATA[userId]
```

此时，设置cookie的操作放在了app.js中，记得转移设置过期时间的`getCookieExpires()`方法

```js
// 处理blog路由
const blogResult = handleBlogRouter(req, res)
if (blogResult) {
  blogResult.then(blogData => {
    if (needSetCookie) {
      // 设置cookie
      res.setHeader('Set-Cookie', `username=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
    }
    res.end(JSON.stringify(blogData))
  })
  return
}
// 处理user路由
const userResult = handleUserRouter(req, res)
if (userResult) {
  userResult.then(userData => {
    if (needSetCookie) {
      // 设置cookie
      res.setHeader('Set-Cookie', `username=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
    }
    res.end(JSON.stringify(userData))
  })
  return
}
```

最后，在路由的具体处理中，设置session

```js
// 登录
if (method === 'GET' && req.path === '/api/user/login') {
  // const {username, password} = req.body
  const {username, password} = req.query
  const result = login(username, password)
  return result.then(data => {
    if (data.username) {
      // 设置session
      req.session.username = data.username
      req.session.realname = data.realname
      console.log('req.session is: ', req.session) // 这里可以打印一下
      return new SuccessModel()
    }
    return new ErrorModel('登录失败')
  })
}

// 登录验证的测试
if (method === 'GET' && req.path === '/api/user/login-test') {
  if (req.session.username) { // 判断session
    return Promise.resolve(new SuccessModel({session: req.session}))
  }
  return Promise.resolve(new ErrorModel('尚未登录'))
}
```

我们后面判断的内容都是以session为主，cookie的设置转移到了app.js中。

::: tip
这里的业务改动较大，具体可以查看blog-1下的src目录中的源码。✨
:::