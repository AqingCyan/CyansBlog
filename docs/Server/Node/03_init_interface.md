# 初始化接口

我们这里的接口其实就是路由，与我们使用Vue开发时的路由不同，我们访问不同的接口，即就是在访问不同的路由，路由被命中后，将导向该路由对应的业务，业务处理好后，将处理后的结果响应返回到客户端。

- 初始化路由：根据之前的技术方案的设计，制作路由
- 返回假数据：将路由和数据处理分离，以符合设计原则

## 接口设计

我们现在设计接口如下：

| 描述             | 接口             | 方法 | url参数                       | 备注                           |
| ---------------- | ---------------- | ---- | ----------------------------- | ------------------------------ |
| 获取博客列表     | /api/blog/list   | GET  | author作者，keyword搜索关键字 | 参数为空的话，则不进行查询过滤 |
| 获取一篇博客内容 | /api/blog/detail | GET  | id                            |                                |
| 新增一篇博客     | /api/blog/new    | POST |                               | post中有新增的信息             |
| 更新一遍博客     | /api/blog/update | POST | id                            | postData中有更新的内容         |
| 删除一篇博客     | /api/blog/del    | POST | id                            |                                |
| 登录             | /api/user/login  | POST |                               | postData中有用户名和密码       |

## 接口返回数据

app.js作为一个业务入口文件，并不适合写大量业务，文件臃肿也不易于维护，因此我们需要将处理路由接口的业务拆分出去

我们需要创建一个src文件夹，这里面处理主要的业务。再在里面创建一个router文件夹，专门负责接口返回对应数据

### 目录设计

```tree
|--app.js
|--bin
|  |__www.js
|--src
|  |__router
|     |--blog.js
|     |__user.js
|__package.json
```

blog负责`/api/blog/`下的接口，user负责`/api/user/`下的接口

### 功能实现

我们已经把处理接口（路由）的业务分别抽离到了分别的文件中。那么我们就分别获取一下必要的信息，以便做一个判断来命中到对应的接口

```js
const handleBlogRouter = (req, res) => {
  const method = req.method // GET or POST
  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    return {
      msg: '这是获取博客列表的接口'
    }
  }
  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    return {
      msg: '这是获取博客的详情的接口'
    }
  }
  // 新建一篇博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    return {
      msg: '这是新建博客的接口'
    }
  }
  // 更新一遍博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    return {
      msg: '这是更新博客的接口'
    }
  }
  // 删除一篇博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    return {
      msg: '这是删除博客的接口'
    }
  }
}
module.exports = handleBlogRouter
```

暂时返回一个假数据测试接口是否可用，user的路由模块也是这样编写。接下来我们就在app.js中把处理路由的业务引入

```js
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const serverHandle = (req, res) => {
  // 设置返回格式
  res.setHeader('Content-type', 'application/json')
  // 获取设置path
  const url = req.url
  req.path = url.split('?')[0]
  // 处理blog路由
  const blogData = handleBlogRouter(req, res)
  if (blogData) {
    res.end(JSON.stringify(blogData))
    return
  }
  // 处理user路由
  const userData = handleUserRouter(req, res)
  if (userData) {
    res.end(JSON.stringify(userData))
    return
  }
  // 未命中路由
  res.writeHead(404, {"Content-type": "text/plain"})
  res.write("404 not found")
  res.end()
}

module.exports = serverHandle
```

- 首先要设置统一的返回格式，我们通常指定JSON
- 我们假设路由处理好后会返回给我们对应的数据，我们用一个常量接收
- 做一个判断，如果有返回值，就返回响应给客户端，不然的话就会命中到404，告诉客户端请求没有接口可以处理
- 最终，这段业务处理是发生在server中的，所以要暴露，引用到`www.js`作为`createServer()`的回调函数
- 因为抽离模块，命中路由后的业务app.js不需要关心，路由业务中也不需要去获取path，不用统一设置响应头，app.js都处理好了

::: warning
注意到不管是命中到blog路由还是user路由，都在响应后 `return` 出去了，不然代码会顺序执行始终再响应一次 `404 not found`
:::

## 测试接口

现在使用postman依次按表访问接口，会依次返回如下内容
```json
{
  "msg": "这是获取博客列表的接口"
}
{
  "msg": "这是获取博客的详情的接口"
}
// .....
```

::: tip
抽离业务模块，一定要注意模块业务代码的参数传递，尽量保持形参命名一致:apple:
:::