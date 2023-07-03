# 异步编程
## 异步编程的情况
浏览器对资源的加载通常是异步的
即
```js
function loadScript(src)
{
    let elScript = document.creatElement("script");
    //脚本开始加载
    elScript.src = src;
    //以下的内容不会等待脚本加载完成
    document.head.append(elScript);
}
loadScript("app.js");
//运行app.js内的函数将出错, 因为app.js未加载
funInApp(...)
```
## Promise
为了在确保函数在异步加载完成才运行
可以使用promise
### 定义Promise
```js
let promise = new Promise((resolve, reject)=>
//代码立即异步运行
{
    //运行异步代码
    ...
    //运行完成后
    //成功时调用resolve, 参数为结果
    if(success)resolve(result);
    //失败是调用reject, 参数为错误
    else reject(new Error(error));
})

```
### 获取异步状态
1. promise.state
最初是 "pending"，然后在 resolve 被调用时变为"fulfilled"，或者在 reject 被调用时变为 "rejected"。
2. result
最初是 undefined，然后在 resolve(value) 被调用时变为 value，或者在 reject(error) 被调用时变为 error。
### 处理异步结果
1. promise.then(result, error)
在异步结束后运行函数
```js
promise.then(
    result =>
    {
        ...//成功时运行
    },
    //可省略
    error =>
    {
        ...//失败时运行
    }
)
```
2. promise.finally()
在异步结束后运行函数, 无论失败或成功
3. promise.catch()
类似 then, 回调只在错误发生的时候运行
### 应用
针对例子 loadScript 的异步版本
```js
function loadScript(src)
{
    return new Promise((resolve, reject) =>
    {
        let elScript = document.creatElement("script");
        elScript.src = src;

        elScript.onload = () =>
        {
            resolve(`${src} load Successfully`);
        }
        elScript.onerror = () =>
        {
            reject(new Error(`fail to load ${src}`));
        }
    })
}
let promise = loadScript("app.js");
promise.then(result =>
{
    console.log(result);
},
error =>
{
    console.log(error);
})
```
### Promise链
对于 promise.then(result=>{...})
返回值为一个简化版的 Promise
且其 .result 成员由匿名函数 result=>{} 的返回值决定
因此可以使用以下方法, 构建一个 Promise 链
```js
let promise = new Promise((resolve, reject)=>{
    setTimeout(() => resolve(1), 1000);
//通过此方法直接操作变量 promise
}).then(result=>{
    console.log(result);
    return result * 2;
//使用 promise.then() 的返回值的 .then() 成员, 正确构造 Promise 链
}).then(result=>{
    console.log(result);
    return result * 2;
}).then(result=>{
    console.log(result);
    return result * 2;
})
```
当匿名函数 result=>{} 的返回值为 Promise 时, 则 then 的返回值将为匿名函数所返回的 Promise, 因此也可以采用下面的写法
```js
let promise = new Promise((resolve, reject)=>{
    setTimeout(() => resolve(1), 1000);
}).then(result=>{
    console.log(result);
    return new Promise((resolve, reject)=>{
        resolve(result * 2);
    })
}).then(result=>{
    console.log(result);
    return new Promise((resolve, reject)=>{
        resolve(result * 2);
    })
}).then(result=>{
    console.log(result);
    return new Promise((resolve, reject)=>{
        resolve(result * 2);
    })
})
```
除了then, finally 与 catch 也会返回 Promise
其中 finally 的 return 没有意义, 其返回的 Promise 为前一个 promise 链的 result
catch 则只会在 then 抛出错误时运行, 否则会被忽视
### promise 链中的错误
1. 抛出错误
对于 promise 链中的 throw
将被视为 reject 而不会向控制台输出错误信息
2. 错误处理
当 promise 链中抛出错误时, 将会寻找到链中最近的一个 catch 处理错误
因此可以将 catch 置于链的最末尾用于捕捉错误
其中 catch 也可以抛出错误
3. 未处理的错误
当错误未被 catch 捕获, 将最终返回一个(变量promise) .state 为 rejected 的 Promise
### Promise API
用于操作多个并行的 Promise
https://zh.javascript.info/promise-api
## async/await
### async function
在定义函数时添加 async 前缀, 函数将成为一个异步函数, 其将立即返回一个 Promise , 且返回值将会被包装为 Promise 的 result
### await
await 只能用在 async 修饰的函数中
await 后跟着一个具有返回值含有成员 .then() 的类, 一般是 Promise
(new Promise() 或返回 Promise 的函数)
使用 await 将会暂停函数, 等待后方的 promise 状态变为 settled
eg.
```js
//利用 await 实现的 sleep 效果
async function sleep(ms)
{
    await new Promise(resolve=>{
        setTimeout(resolve, ms);
    })
    console.log("Sleep Over");
}
```
### 错误处理
1. await
当 await 等待的 Promise 结果为 rejected 时
将会 throw 返回的 error
可以通过 try{}catch{} 捕获错误
2. async 函数
当 async 函数抛出错误后(throw 或 await), 函数将返回的 Promise 的状态将变为 rejected, result 将变为抛出的错误
### 应用
使用 async/await 可以代替与简化 promise 链
同时也可以对 async 函数返回的 Promise 继续使用 promise 链
例如可以对返回的 Promise 使用 catch 捕捉错误
```js
//fun 为一个 async 函数
fun().catch(...)
```

## 总结
在使用 JavaScript 进行异步编程时
对于单一功能的异步的代码可以通过 return new Promise 包装
```js
function fun()
{
    return new Promise((resolve, rejects)=>
    {
        //加载资源 onload
        //发送请求等待结果 fetch/ajax
        //多线程 child_process
        //具有回调的异步函数(通过回调调用resolve)
        ...
    }
}
```
当操作要求同步时, 通过 async function 集中调用异步代码