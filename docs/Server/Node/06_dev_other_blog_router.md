# blog路由具体业务

在使用 Promise 封装好了处理 `postData` 的业务后，我们就可以完成 POST 请求的接口了

## 创建博客接口开发

我们在`app.js`中将 POST 请求发过来的数据保存在了 `req.body` 属性中，这样不需要传递参数，可以直接获取

```js
// 新建一篇博客
if (method === 'POST' && req.path === '/api/blog/new') {
  const blogData = req.body
  const data = newBlog(blogData)
  return new SuccessModel(data)
}
```

- 我们从`req`中获取发送过来的数据，并且传入创建博客的模块`newBlog`
- 在`controller/blog.js`中新建这个方法

```js
/**
 * 创建博客业务
 * @param blogData：一个博客对象，包含title content属性
 */
const newBlog = (blogData = {}) => {
  console.log('newBlog blogData: ', blogData)
  return {
    id: 3 // 标签新建博客插入到数据表里面的id
  }
}
```

完成后，测试接口：在 postman 中写入JSON数据，请求`localhost:8000/api/blog/new`接口，服务端应该能打印出来转化成对象的JSON数据，postman 能被成功响应数据，它的id为3

## 更新一遍指定博客

我们需要更新一遍指定博客，需要获取两个信息，文章的id，以及更新的内容。之前的业务中，也有获取过ID，因此，我们可以将ID的获取变成全局的。

```js
// 与method的获取一样，将id的获取放到外面
const method = req.method
const id = req.query.id
```

接下来的内容与创建博客大同小异

```js
/**
 * 更新博客业务
 * @param id 更新博客的id
 * @param blogData 更新的内容
 * @returns {boolean}
 */
const updateBlog = (id, blogData = {}) => {
  console.log('update blogData: ', id, blogData)
  return true
}
```

在路由业务中调用该模块，传入相应参数

```js
// 更新一遍博客
if (method === 'POST' && req.path === '/api/blog/update') {
  const result = updateBlog(id, req.body)
  if (result) {
    return new SuccessModel('更新成功')
  } else {
    return new ErrorModel('更新失败')
  }
}
```

## 删除博客路由

现在实现删除的路由功能，我们只需要传一个id即可，在`controller/blog.js`下创建一个新的函数

```js
/**
 * 删除一篇博客
 * @param id 要删除的博客id
 */
const delBolg = id => {
  return true
}
```

在路由模块中正确调用

```js
// 删除一篇博客
if (method === 'POST' && req.path === '/api/blog/del') {
  const result = delBolg(id)
  if (result) {
    return new SuccessModel('删除成功')
  } else {
    return new ErrorModel('删除失败')
  }
}
```

::: warning
现在，我们基本完成了博客路由的开发，虽然是基于假的数据，但是大致的功能业务已经完备，接下来我们只需要连接数据库即可。需要强调的是，每个模块实现后，要被调用的时候记得通过`module.exports`暴露出去
:::

## 完成登录接口

依然需要抽离模块，在`controller`下创建一个`user.js`负责用户路由的功能模块(现在我们依然基于假数据开发)

```js
/**
 * 登录
 * @param username 用户名
 * @param password 密码
 */
const login = (username, password) => {
  return username === 'zhangsan' && password === '123'
}

module.exports = {
  login
}
```

然后在路由里面引用这个函数

```js
const {login} = require('../controller/user')
const {SuccessModel, ErrorModel} = require('../model/resModel')
const handleUserRouter = (req, res) => {
  const method = req.method
  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const {username, password} = req.body
    const result = login(username, password)
    if (result) {
      return new SuccessModel('登录成功')
    } else {
      return new ErrorModel('登录失败')
    }
  }
}

module.exports = handleUserRouter
```

之后再在postman里面测试我们的接口，如果没问题，我们整个的路由处理也就完整了，下一步我们就需要引入数据库，变成真实的项目。

## 总结

- 现在你应该具有node.js处理http请求的常用技能，postman测试接口
- node.js开发博客项目的接口（未连接数据库，未使用登录）
- 抽离模块的思维，为什么要将router与controller分开，为什么app.js不去写这些业务

## 路由与API

在前面的内容中，我们对开发的内容有多种称呼：路由、API、接口。其实大体相同，在实际中也没有很清晰的界定出来。如果要清晰的区分的话，以下是一个补充：

API：前端和后端、不同端（子系统）之间对接的一个术语。它可能会包含

- url（路由）
- 输入内容（参数，数据）
- 输出内容（响应的返回的内容）

路由：API的一部分，后端系统内部的一个定义，前端在使用API的时候，不需要关心其内部实现，内部实现由后端去实现，其中一个部分就是路由的界定与对应功能的实现