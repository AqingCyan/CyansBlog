# 使用node.js操作mysql

node无法直接操作mysql，我们需要一个第三方模块

## 安装使用（示例）

```shell
npm install mysql -D
```

引入三方依赖操作mysql，并且创建连接对象，里面包含了连接数据的必要的信息

``` js
const mysql = require('mysql')

// 创建连接对象
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'xkq199862',
  port: '3306',
  database: 'myblog'
})

// 开始连接
con.connect()

// 执行sql语句
const sql = 'select * from users';
con.query(sql, (err, result) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(result)
})

// 关闭连接
con.end()
```

如果测试无误，我们就可以基于这个样子去封装我们的操作mysql的模块

## 真·项目对接数据库

现在开始真刀真枪的应用于项目了

### 数据库链接配置文件

我们在`src`目录下创建一个`config`文件夹，在其中创建一个`db.js`，负责链接数据库的**配置**

```tree
|--app.js
|--bin
|  |__www.js
|--src
|  |--config
|  |  |__db.js
|  |--controller
|  |  |--blog.js
|  |  |__user.js
|  |--router
|  |  |--blog.js
|  |  |__user.js
|  |__model
|     |__resModel.js
|__package.json
```

在其中我们定义连接体配置，需要注意的是，我们要考虑到运行环境，因为线上环境和开发环境链接的可能不是同一个数据库。因此，之前通过`cross-env`设置到全局的开发环境参数就有了作用，我们可以根据此来链接不同的数据库

而我们需要获取的参数是在`package.json`中设置好的

```json
"scripts": {
  "dev": "cross-env NODE_ENV=dev nodemon ./bin/www.js",
  "prd": "cross-env NODE_ENV=production nodemon ./bin/www.js"
}
```

因此我们需要手动获取一下，然后根据其链接不同数据库

```js
// 获取环境变量中的开发环境参数
const env = process.env.NODE_ENV

// 配置
let MYSQL_CONF

if (env ==='dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'xkq199862',
    port: '3306',
    database: 'myblog'
  }
}

if(env ==='production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'xkq199862',
    port: '3306',
    database: 'myblog'
  }
}

module.exports = {
  MYSQL_CONF
}
```

::: tip
我们看到了，虽然区分了线上与开发环境，但是配置是一样的，因为我们目前还没有服务器，但是规范是要严格执行
:::

### 链接数据库

在`src`目录下创建一个`db`文件夹，里面存放操作数据库的业务模块

```tree
|--app.js
|--bin
|  |__www.js
|--src
|  |--config
|  |  |__db.js
|  |--db
|  |  |__mysql.js
|  |--controller
|  |  |--blog.js
|  |  |__user.js
|  |--router
|  |  |--blog.js
|  |  |__user.js
|  |__model
|     |__resModel.js
|__package.json
```

我们这里不进行sql操作后的连接关闭，也就是不调用`end()`，因为要考虑到多次操作数据库，这里可以理解成一个单例模式。

```js
const {MYSQL_CONF} = require('../config/db')
const mysql = require('mysql')

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

// 开始连接
con.connect()

// 统一执行 sql 函数
function exec(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if(err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
}

module.exports = {
  exec
}
```