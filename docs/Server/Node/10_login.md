# 真正登录的实现

前面我们完成了所有API的功能，并且测试完好，但是我们还需要注意到一点就是登录功能并不完善，只能说我们只是简单的做了一个验证。要知道，登录之后的登录态的保持以及其他请求的身份验证还是假数据，因此，我们这里就将登录功能完整实现。

## 登录校验&登录信息存储

- 博客的删除、更新之类的功能，我们都需要对登录进行一个验证，确保是本人操作，因此我们需要完成登录校验。
- 登录之后，有一些必要的信息进行存储，以便于其他业务的验证。

## cookie

::: tip
以下内容大概你已经知道了，跳过也行。:smile:这里有笔者当时读过的一篇文章，很nice：[浏览器存储大揭秘](https://juejin.im/post/5c8e6fa8e51d453ec75168cd)
:::

### 什么是cookie

- 本质上是存储在浏览器的一段字符串（最大5kb），并且跨域不共享。格式如`k1=v1;k2=v2;k3=v3;`，因此可以结构化数据
- 每次发送http请求，会将请求域的cookie一起发送给server
- server可以修改cookie并返回给浏览器
- 浏览器中也可以通过JavaScript修改cookie（有限制）

### cookie的查看

- name：cookie的键名
- path：cookie起效的base路径
- value：cookie的值
- Domain：cookie可以起效的域名
- Expires：cookie的有效期

::: tip
cookie的查看方式多种多样，可以在控制台的Application中查看，也可以通过`document.cookie`查看或者添加(添加实际上是累加)，还可以通过插件查看。但需要注意的是，通过JS查看cookie存在一定限制。
:::

## cookie做登录验证

那么第一步，我们需要将客户端跟随请求发送过来的cookie进行解析，与处理path与query一样，我们在app.js中统一做处理

```js
// 解析cookie
req.cookie = {}
const cookieStr = req.headers.cookie || ''
cookieStr.split(';').forEach(item => {
  if (!item) {
    return
  }
  const arr = item.split('=')
  const key = arr[0].trim() // 拼接cookie的时候自动添加空格，用trim处理掉
  req.cookie[key] = arr[1]
})
```

首先，创建一个空的对象在req中，用来存储解析好的cookie。定义一个cookieStr来存储未处理的cookie，并做了一个防空处理。因为cookie字符串的存储都是以分号分割，所以用`split`方法分割成数组并且遍历，再之后将每一个cookie按等号拆分并且以键值对的形式存按储到`req.cookie`的对象中。

::: tip
现在可以加一句`console.log(req.cookie)`，然后访问端口，看看服务端是否打印了解析好的cookie的内容。如果是空的，就在浏览器手动添加一个cookie：`document.cookie="name=Aqing"`。再访问试试！:ok_hand:
:::

现在我们再做一个简单的测试来使用cookie做一个登录态的验证。假设一个路由叫`login-test`，在`router/user.js`中这么写

```js
// 登录验证的测试
if (method === 'GET' && req.path === '/api/user/login-test') {
  if (req.cookie.username) {
    return Promise.resolve(new SuccessModel())
  }
  return Promise.resolve(new ErrorModel('尚未登录'))
}
```

如果，路由命中了`/api/user/login-test`，且是`GET`方法（仅做验证），就判断cookie中是否存在`username`，并做相应处理。然后通过浏览器访问8000端口，查看是否提示我们的登录态。通过前端写入cookie再看看是否提示我们登录。

::: tip
我们返回出去的结果必须是Promise的实例，不然app.js中使用的`then`方法无法处理数据。`Promise.resolve(value)`方法返回一个以给定值解析后的Promise 对象。但如果这个值是个`thenable`（即带有then方法），返回的promise会“跟随”这个thenable的对象，采用它的最终状态（指resolved/rejected/pending/settled）；如果传入的value本身就是promise对象，则该对象作为`Promise.resolve`方法的返回值返回；否则以该值为成功状态返回promise对象。
:::

那么现在我们就需要做一个需求，在登录成功的时候，顺便从服务端设置浏览器的cookie，等下次浏览器再来验证cookie来做登录验证的时候，就可以做一个完成的登录再验证的流程，也算是通过cookie实现了一个临时的登录态的保持

```js
// 对登录路由做一个修改
if (method === 'POST' && req.path === '/api/user/login') {
  const {username, password} = req.body
  const result = login(username, password)
  return result.then(data => {
    if (data.username) {
      // 操作cookie
      res.setHeader('Set-Cookie', `username=${data.username}; path=/`)
      return new SuccessModel()
    }
    return new ErrorModel('登录失败')
  })
}
```

::: tip
如果想要做一个测试的话，可以将登录的路由的命中判断改为`GET`，通过浏览器访问在url带上参数做登录，并且将用户名和密码的获取改为`const {username, password} = req.query`。
:::

为了更好的看到效果，我们可以将`return Promise.resolve(new SuccessModel(req.cookie.username))`做如此修改。

- 在登录成功的时候，`res.header()`会设置cookie到浏览器中
- `Set-Cookie`字段会让浏览器自动设置cookie内容，`path`字段指明该cookie生效的范围
- 此后，每次浏览器发来的请求会自带被设置的cookie
- 使用login-test去验证是否登录的状态，实际上是检验cookie的内容，cookie存在，说明是登录的状态。

::: warning
仅仅是以上内容还是不够，对于目前的项目，cookie是一个极其危险的东西了。
:::

## 对cookie做限制

### httpOnly

由于对cookie的验证十分的简单，因此，我们可以通过在浏览器端手动修改添加cookie的方式来绕过登录验证，这是**极其不安全的。**

这个时候，我们需要在cookie的设置上做一些限制：httpOnly。它的作用很清晰：**指明这个cookie的作用用于http的，浏览器没有权限去对其进行操作，无权修改**，浏览器也无法访问到该cookie。

```js
res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly`)
```

::: tip 做个测试
虽然指定了cookie中的`username`为`httpOnly`让JS无法修改cookie，但是通过`document.cookie`的方式添加`username`仍然不会报错，查看cookie发现不仅服务端设置的cookie会存在，JS设置的cookie也在。其原因是`httpOnly`对cookie的限制使它变得独一，与浏览器的其他cookie不一样。
:::

### 过期设置

cookie是存储在浏览器中的字符串，用作存储某些信息维持状态，比如登录等等。但限于cookie生存期限就到浏览器关闭为止，我们想做到几天内自动登录这样的需求是远远不够的。

因此，cookie也可以由服务端设置过期时间，设置好过期时间的cookie，即使浏览器关闭也会存储到硬盘中，直到过期时间到来。

```js
/**
 * 获取过期时间
 */
const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000)) // 保存一天
  return d.toGMTString()
}

// 设置cookie的时候也应该加上过期时间了
res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
```

::: tip 补充
当然，cookie还有很多的学问可以进行探究，这里有一篇文章进行补充，可以补充看看笔者讲到的知识点之外的内容：[cookie详解](https://segmentfault.com/a/1190000004743454#articleHeader7)。
:::