### 判断一个对象是否含有属性
```js
obj = {member : 0};
//true
if(member in obj)
{
    ...
}
```
### 迭代 for
```js
for(let i of [1, 2, 3])
{
    ...
}
```
### 判断 null 与 undefined
数字 0、空字符串 ""、null、undefined 和 NaN 都会被转换成 false
### 判断对象是否是类的实例
```js
let a = new Test();
//true
if(a instanceof Test)
{
    ...
}
```