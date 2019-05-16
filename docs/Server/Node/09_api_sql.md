# API对接mysql

当我们做完准备工作后，就该开始正式的写业务代码了，将API变得正式（对接真实数据库）

## 博客列表API

首先回到我们负责数据处理业务的`controller`目录下，在`blog.js`中引入我们暴露出去的操作数据的函数`exec`

```js
/**
 * 获取博客列表
 * @param author 作者
 * @param keyword 关键字
 */
const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`
  return exec(sql)
}
```

- 创建的用来执行的sql语句，本质是一个字符串，这个API使用的场景有两种，传参和没传参的情况
- 因此，我们做了一个处理：`1=1`为`true`，如果没传参，那么执行的相当于`select * from blogs where true `，它等价于`select * from blogs`，我们在`1=1`后面留了一个空格，避免后面拼接的条件字符串和`where`粘连
- 后面坐了一个判断，如果传入了参数，则把他们作为条件拼接在`sql`语句后面，然后再根据创建时间的升序排序，`'%${keyword}%'`是模糊查询
- 最后返回了一个promise对象，因此，我们还需要在router文件中处理一下

```js
// 获取博客列表
if (method === 'GET' && req.path === '/api/blog/list') {
  const author = req.query.author || ''
  const keyword = req.query.keyword || ''
  const result = getList(author, keyword) // 此时返回的是一个promise对象
  return result.then(listData => {
    return new SuccessModel(listData)
  })
}
```

在app.js中也需要修改一下，因此此时给它返回的是一个promise

```js
// 处理blog路由
// const blogData = handleBlogRouter(req, res)
// if (blogData) {
//   res.end(JSON.stringify(blogData))
//   return
// }
const blogResult = handleBlogRouter(req, res)
if (blogResult) {
  blogResult.then(blogData => {
    res.end(JSON.stringify(blogData))
  })
  return
}
```

## 博客详情API

依葫芦画瓢

```js
/**
 * 获取一篇博客详情
 * @param id：查询博客的id号
 */
const getDetail = id => {
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then(rows => {
    return rows[0] // 这里的查询结果是一个数组
  })
}
```

```js
// 获取博客详情
if (method === 'GET' && req.path === '/api/blog/detail') {
  const result = getDetail(id)
  return result.then(data => {
    return new SuccessModel(data)
  })
}
```

## 创建博客API

创建博客需要四个参数：author、title、content、createtime。但因为还没有做登录的状态，我们获取不到author，因此暂时用假数据

```js
// 新建一篇博客
if (method === 'POST' && req.path === '/api/blog/new') {
  req.body.author = 'Aqing' // 未做登录，暂时用假数据
  const blogData = req.body
  const result = newBlog(blogData)
  return result.then(data => {
    return new SuccessModel(data)
  })
}
```

在`controller`中我们需要写一个插入数据库的SQL语句

```js
/**
 * 创建博客业务
 * @param blogData：一个博客对象，包含title content author属性
 */
const newBlog = (blogData = {}) => {
  const title = blogData.title
  const content = blogData.content
  const author = blogData.author // 这个是假数据
  const createtime = Date.now()
  // createtime是bigint类型，不需要用引号包裹
  const sql = `insert into blogs (title, content, createtime, author)
  values ('${title}', '${content}', ${createtime}, '${author}');` 
  return exec(sql).then(insertData => {
    console.log(insertData)
    return {
      id: insertData.insertId
    }
  })
}
```

我们使用 postman 测试

```json
{
  "title": "测试标题",
  "content": "测试内容"
}
```

可以看到成功返回了插入进数据库的`insertId`

```json
{
  "data": {
    "id": 3
  },
  "errno": 0
}
```

至于插入进数据库，数据库返回的信息，我们可以`console`看一下，成功会返回给我们如下信息，我们只需要把插入成功后的id返回即可

```js
OkPacket {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 3,
  serverStatus: 2,
  warningCount: 0,
  message: '',
  protocol41: true,
  changedRows: 0 
}
```

## 更新博客API

```js
/**
 * 更新博客业务
 * @param id 更新博客的id
 * @param blogData 更新的内容
 */
const updateBlog = (id, blogData = {}) => {
  const title = blogData.title
  const content = blogData.content

  const sql = `update blogs set title='${title}', content='${content}' where id=${id}`
  return exec(sql).then(updateData => {
    console.log(updateData)
    return updateData.affectedRows > 0 // 说明修改成功
  })
}
```

```js
// 更新一遍博客
if (method === 'POST' && req.path === '/api/blog/update') {
  const result = updateBlog(id, req.body)
  return result.then(val => {
    if (val) {
      return new SuccessModel('更新成功')
    } else {
      return new ErrorModel('更新失败')
    }
  })
}
```

## 删除API

```js
/**
 * 删除一篇博客
 * @param id 要删除的博客id
 * @param author
 */
const delBolg = (id, author) => {
  const sql = `delete from blogs where id='${id}' and author='${author}'`
  return exec(sql).then(deleteData => {
    return deleteData.affectedRows > 0
  })
}
```

为什么传入author？因为要保证删除操作是本人操作，增加了安全性。

```js
// 删除一篇博客
if (method === 'POST' && req.path === '/api/blog/del') {
  req.body.author = 'Aqing' // 未做登录，暂时用假数据
  const result = delBolg(id, req.body.author)
  return result.then(val => {
    if (val) {
      return new SuccessModel('删除成功')
    } else {
      return new ErrorModel('删除失败')
    }
  })
}
```

## 登录API

现在实现登录的功能，修改对应的文件，与博客API的添加一样

```js
// app.js中
// 处理user路由
const userResult = handleUserRouter(req, res)
if (userResult) {
  userResult.then(userData => {
    res.end(JSON.stringify(userData))
  })
  return
}
```

```js
/**
 * 登录
 * @param username 用户名
 * @param password 密码
 */
const login = (username, password) => {
  const sql = `select username, realname from users where username='${username}' and password='${password}'`
  return exec(sql).then(data => {
    return data[0] || {} // 防止返回为空
  })
}
```

```js
// 登录
if (method === 'POST' && req.path === '/api/user/login') {
  const {username, password} = req.body
  const result = login(username, password)
  return result.then(data => {
    if (data.username) {
      return new SuccessModel()
    }
    return new ErrorModel('登录失败')
  })
}
```