# 开发路由功能

现在我们已经把路由初始化好了，该开始开发每个路由对应的功能了

## 建立数据模型

在服务器响应数据的时候，我们通常有统一的格式和约束，因此，我们可以将用作响应的数据格式抽离成一个模型，将响应数据按模型生成。

```tree
|--app.js
|--bin
|  |__www.js
|--src
|  |--router
|  |  |--blog.js
|  |  |__user.js
|  |__model
|     |__resModel.js
|__package.json
```

我们创建一个基类，在基类的基础上创建两个模型分别用于成功的响应和失败的响应

```js
class BaseModel {
  constructor(data, message) {
    if (typeof data === 'string') { // 对于只传入了message的处理
      this.message = data
      data = null
      message = null
    }
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.errno = 0
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.errno = -1
  }
}
```

这样在路由处理完业务后返回的数据，就有一个统一的清晰的格式了，例如以下格式统一的成功响应内容和失败响应内容

```json
{
  errno: 0,
  data: {...}
  message: 'xxx'
}
{
  errno: -1,
  data: {...}
  message: 'xxx'
}
```

## 处理URL参数

反观我们当时设计的API表格，我们发现获取博客列表的时候，是可以带参数与不带参数的

- 带参数的情况下：author作者，keyword搜索关键字
- 不带参数的情况下：参数为空的话，则不进行查询过滤

因此我们需要解析出 GET  请求时，URL 中的参数，也就是 query 部分

```js
// 在app.js的serverHandle函数中，引入querystring模块
req.query = querystring.parse(url.split('?')[1])
```

::: tip
将`query`作为`req`的一个属性，可以直接在`req`中获取使用，不用定义成变量再传入处理路由的模块
:::

## 路由功能模块

路由有具体的功能，我们可以将这些功能独立成一个模块：`/src/controller/blog.js`，用来专门处理博客路由的功能

```tree
|--app.js
|--bin
|  |__www.js
|--src
|  |--controller
|  |  |__blog.js
|  |--router
|  |  |--blog.js
|  |  |__user.js
|  |__model
|     |__resModel.js
|__package.json
```

我们创建一个方法，假装调用了数据库，返回一些假数据（保证格式正确），并且暴露方法

```js
const getList = (author, keyword) => {
  // 先返回假数据，格式正确
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: 1557058226130,
      author: 'Aqing'
    },
    {
      id: 2,
      title: '标题B',
      content: '内容B',
      createTime: 1557058267960,
      author: 'Cyan'
    }
  ]
}
module.exports = {
  getList
}
```

## 路由功能的实现

我们在`router/blog.js`中引入刚刚写好的响应数据模型和处理具体业务的功能函数

```js
const { SuccessModel, ErrorModel }  = require('../model/resModel')
const { getList } = require('../controller/blog')
```

- `getList`需要的两个参数，我们都写入在了query中，直接通过属性获取即可，这里做了一个判空的处理。
- 获取到数据后，通过调用响应数据模型`SuccessModel`来返回数据。

```js
// 获取博客列表
if (method === 'GET' && req.path === '/api/blog/list') {
  const author = req.query.author || ''
  const keyword = req.query.keyword || ''
  const listData = getList(author, keyword)
  return new SuccessModel(listData)
}
```

现在我们就可以使用postman测试获取博客列表的API了！:ok_hand:

## 总结拆分目录的原因

我们现在可以观察一下代码结构，发现我们已经将代码拆分成了很多的模块。

- 在`www.js`中它只负责了`createServer`的逻辑，这是第一层
- `app.js`只负责了业务的基本设置与业务模块的调用，这是第二层
- `router/`下的代码只管路由，只负责了路由接口的命中，命中了路由之后，调用对应模块然后返回模块处理好的数据（至于数据从哪里获取，怎么获取，获取了怎么处理，它不负责），这是第三层
- `controller/`下的代码最关心数据，传递进相应的参数，进行业务处理，比如去数据库操作数据等，之后再返回，这是第四层

::: tip
我们把抽离的业务看做是一个环套环，从最外层访问一环进入一环，然后获取的结果被从最里面的一环返回出来
:::