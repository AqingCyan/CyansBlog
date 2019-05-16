# 开发博客其他路由

按照刚刚的套路，我们按照一环套一环的思路开发博客详情路由

## 开发博客详情的模块

这部分的逻辑，我们依然放到`controller/blog.js`中进行处理，暂时返回格式正确的假数据，后期会连接数据库

```js
const getDetail = id => {
  // 先返回假数据
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: 1557058226130,
    author: 'Aqing'
  }
}
```

## 路由模块中的处理

我们引入刚刚写好的模块中的函数，并且在对应的路由中做一个路由返回的处理

```js
// 获取博客详情
if (method === 'GET' && req.path === '/api/blog/detail') {
  const id = req.query.id
  const data = getDetail(id)
  return new SuccessModel(data)
}
```

获取到 URL 参数中传递的`id`，然后传递到`getDetail`中，将获取的结果使用`SuccessModel`来处理成格式统一的响应内容返回出去。那么下一步应该就会在`app.js`中被正确处理。

> 可以看到抽离了模块后，我们一环一环开发，十分的明确，代码也易于维护:100:

## 处理POST请求

现在我们需要处理博客路由中的使用 POST 请求的接口了，我们需要处理`postData`。在前面的章节里面，实现过`postData`的读取，但是它是异步的，因此我们需要使用`Promise`来保证代码的可维护性。

::: tip
博客的[ECMAScript6笔记](https://aqingcyan.github.io/CyansBlog/FE/ES6/cover.html)提供了详细的ES6新特性讲解，可以抽时间学习一下，以下代码以Promise为基础构建。:heart:
:::

### 使用Promise处理异步读取

代码如下

```js
/**
 * 用于处理postData
 * @param req request获取postData
 */
const  getPostData = req => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let data = []
    req.on('data', chunk => {
      data.push(chunk)
    })
    req.on('end', () => {
      let postData = Buffer.concat(data).toString()
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
}
```

- 参数是`req`，因为发送过来的数据是通过`req`的事件监听获取的
- 对于非`POST`请求以及发送格式不是 JSON 的，不认为这是个错误进行处理，因此使用resolve处理一个空对象，做一个忽略，它不一定是个错误，因此没有使用`reject`
- 使用`push`的方法读取数据是为了防止读取数据时，达到上限导致Buffer被截断，转义 Buffer 出现乱码

### 补充：转义的隐患

如下示例代码读取数据流，设置了一个上限，每一次读取的时候，最多读取10个字节，因此会执行多次读取操作：

```js
const rs = require('fs').createReadStream('text.txt', {highWaterMark: 10})
let data = ''
rs.on('data', chunk => {
  data += chunk
})
rs.on('end', () => {
  console.log(data)
})
```

因为读取汉字的时候，汉字占位三个字节，如果在读取时采用postData += chunk，在一次读取的数据流到了上限，会截断字节流开始第二次读取，buffer使用toString()转换，可能在上下两次的读取之间刚好截断了三个字节的某个汉字。

例如使用如上示例代码读取一个如下文件：

```txt
八百标兵奔北坡，北坡标兵并排跑，炮兵怕把标兵碰，标兵怕碰炮兵跑。
```

会出现以下结果

```txt
八百标���奔北��，北坡标兵并���跑，��兵怕把标兵碰���标兵��碰炮兵跑。
```

因此，我们使用`data += chunk`是存在隐患的，因此使用push解决

```js
let data = []
rs.on('data', chunk => {
  data.push(chunk)
})
rs.on('end', () => {
  let buf = Buffer.concat(data)
  console.log(buf.toString())
})
```

### 使用getPostData来处理数据

在`app.js`中，我们需要在处理路由之前，调用`getPostData`方法，我们依然将获取到的数据作为`req`的属性被后续操作

```js
// 处理postData
getPostData(req).then(postData => {
  req.body = postData
})
```

这个时候，我们发现，处理完了`postData`后，调用路由业务的时候，可能需要获取它，因此我们把路由的业务放在回调函数中

```js
const serverHandle = (req, res) => {
  res.setHeader('Content-type', 'application/json')
  const url = req.url
  req.path = url.split('?')[0]
  req.query = querystring.parse(url.split('?')[1])
  // 处理postData
  getPostData(req).then(postData => {
    req.body = postData
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
  })
}
```