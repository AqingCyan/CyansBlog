# node中的http基础

node.js 搭建http服务器是一件十分简单的事情，它自带的模块可以很好的启动一个服务，并且很平滑的处理请求的 url 。

## GET请求

``` js
const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  console.log('method: ', req.method)
  const url = req.url
  console.log('url: ', url)
  req.query = querystring.parse(url.split('?')[1])
  console.log('query ', req.query)
  res.end(JSON.stringify(req.query))
})

server.listen(8000)
console.log('服务器已启动在8000端口')
```

### 模块解析

- http 模块在引入主文件后，负责启动一个 http 服务器。其回调函数的两个参数分别代表：request 请求，与 response 响应。
- querystring 模块用来解析请求时的 url ，使用它的 api 可以将请求的 url 解析为对象的形式。
- 使用 `req.query = querystring.parse(url.split('?')[1])` 可以获取到使用 GET 访问时的参数。

::: tip
url 的意义：一般来说，URL 指的是（Uniform Resoure Locator）统一资源定位器，通过访问能获取到全网唯一的资源。一般由：`协议://服务器地址:端口/路径?query#hash`组成，我在这里的 node 开发中指的 url 一般指 path 部分。:beer:
:::

### 运行解析

使用浏览器访问地址 `http://localhost:8000/api/list?keyword=123`，会得到如下内容

``` json
{
  "keyword": "123"
}
```

而服务器的 console 中会打印如下内容

``` shell
method:  GET
url:  /api/list?keyword=123
query  [Object: null prototype] { keyword: '123' }
method:  GET
url:  /favicon.ico
query  [Object: null prototype] {}
```

我们可以看到访问该地址的时候，方法是 GET，url是（即路径path）`/api/list?keyword=123`，访问时传递的参数也正常输出了。至于第二个访问，是浏览器自带的网页角标的资源请求。

## PSOT请求

- post 请求，即客户端要向服务器传递数据，比如新建博客
- 通过 post data 传递数据
- 浏览器无法直接发起 post 请求，我们这里使用 postman 工具

``` js
const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    // req 数据格式
    console.log('req content-type: ', req.headers['content-type'])
    // 接收数据（桶传递）
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      console.log('postData:', postData)
      res.end('传递完毕')
    })
  }
})
```

### 方法解析

这里我们使用了**桶传递**的方式来接收数据， `req.on`监听两个事件：

- `data`事件开始，接收数据到`postData`中，因为接收的数据的编码格式格式不是我们能识别的，因此使用`toString()`转化
- 当`req.on`监听到了 `end`事件，也就是说数据传输完毕，我们打印一下`postData`，并且返回`传递完毕`

### postman的使用

- 我们使用 postman 来发起 post 请求，访问 `localhost:8000`，并且将方法设置为 `POST`
- 选择`body`中的`raw`，并且选择 JSON 格式

我们发起请求

``` json
{
  "name": "Aqing",
  "age": 21
}
```

在服务器console中可以看到

```shell
req content-type:  application/json
postData: {
	"name": "Aqing",
	"age": 21
}
```

## 综合示例

现在我们把POST请求与GET请求结合起来，完成一个简单的服务器功能

```js
const server = http.createServer((req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  const query = querystring.parse(url.split('?')[1])

  // 设置返回格式为 JSON
  res.setHeader('content-type', 'application/json')
  // 返回数据
  const resData = {
    method,
    url,
    path,
    query
  }
  // 返回
  if (method === 'GET') {
    res.end(JSON.stringify(resData))
  }
  if (method === 'POST') {
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      resData.postData = postData
      res.end(JSON.stringify(resData))
    })
  }
})
```