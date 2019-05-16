# Promise

Promise是一个类，我们现在认为它是解决回调地狱的最佳方案。

## Promise基础了解

- Promise的实例分为三个状态，一开始的状态就是pending（等待）状态，一旦new后，立马执行函数。
- 执行函数的顺序：new Promise中的代码 ===>  当前队列中的同步代码 ===> then(异步)里面的回调函数
- Promise的实例另外两个状态是：reslove（成功）、reject（失败），他们在代码中是具体的两个用作回调的函数。
- 实例使用`.then`来调用reslove或者reject函数，若成功，then方法里执行的函数就是resolve，失败执行的就是reject。

```js
let pro1 = new Promise((resolve,reject)=>{
  //如果在new Promise中有错误，那么会直接执行then中的第二个回调函数，并且把错误信息传给函数
  resolve("success");
  reject("error");
});

//then方法有两个回调函数
pro1.then((res)=>{
  console.log(res);
  }, (e)=>{
  //失败的回调
  console.log(e);
}); // 成功打印出了success，如果我们把resolve函数注释掉，那么就会打印e

console.log("因为then方法是异步的，所以不会等待，跳过直接进行这里的代码,所以这里先执行");
```

## 使用then方法异步加载图片

```js
function loadImg(url) {
  return new Promise((resolve,reject)=>{
    let img = new Image(); // 创建一个img实例
    img.src = url;
    img.onload = function () { // img一旦触发onload事件，就表示成功
      resolve(img); // 成功的话，就拿到这个img，并且执行then方法的第一个回调函数
    };
    img.onerror = function (e) { // img一旦触发onerror事件，就表示失败
      reject(e); // 失败的话，就拿到错误信息，并且执行then方法的第二个回调函数
    }
  })
}

loadImg("https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4246909638,1409680877&fm=27&gp=0.jpg")
  .then((img) => {
    box.appendChild(img); // 成功了接收这个img
  },(e) => {
  console.log(e); // 失败了就接收e
})
```

## catch方法

catch方法用来捕获错误信息，在then方法中不写第二个回调函数，而是用catch来捕获错误信息。（删掉url的部分字段，在浏览器控制台来看catch到的错误信息）

```js
loadImg("https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4246909638,1409680877&fm=27&gp=0.jpg")
  .then((img)=>{
    box.appendChild(img)
      // catch也可以找到then方法中的错误 去掉下面两句的注释控制台查看错误
      // let a;
      // let a;
  }).catch((e)=>{
    //捕获错误的，如果new promise中有错误会被捕获，如果then中的回调函数有错误也会被捕获
    console.log(e);
  })
```

::: tip
Promise解决回调地狱的方式，就是在`.then`方法中，在回调函数中返回一个新的Promise实例，就可以链式使用then方法，这样极大的避免了回调低于:art:
:::
