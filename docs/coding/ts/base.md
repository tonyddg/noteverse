# TSC 使用
## 安装 TSC
通过 npm 安装 tsc, 以下命令全局安装了 tsc
``` shell
npm i -g typescript
```

## 启动 tsc 环境
在程序文件目录执行命令, 初始化 ts 环境
```shell
tsc --init
```

## 编译 ts
1. 执行命令 tsc, 将自动编译 .ts 文件为 .js
1. 通过 tsc -w, 每当检测到文件保存, 将自动编译

## tsconfig.json 配置
通过修改目录下的 tsconfig.json 文件, 可以修改环境的 tsc 配置

### 多文件编译
1. 设置 include 选项选择包含的目录 (字符串数组, 可包含多个目录)
1. 设置 file 选择包含单个文件
1. 设置路径时, 使用 \*\* 通配目录名, 使用 \* 通配文件名, 如 "./src/**/*"
1. 设置 compilerOptions.outDir 选择结果输出目录

## node 配置

# 基本语法
1. 定义任何东西时要指明类型
1. 调用任何东西时要检查类型

## 运算符
1. ==TS 没有乘方运算符==
1. ^ 为异或运算符
1. ToDo

## 深拷贝与浅拷贝
todo

## 变量类型
### ts 类型
|类型|关键字|描述|
|--|--|--|
|任意|any|具有任意类型|
|数字|number|表示 64 位浮点数, 不存在整数|
|字符串|string|使用 " 或 ' 表示字符串, ` 表示多行字符串或表达式|
|布尔|boolean|使用 true 或 false|
|空|null|表示值缺失|
|未定义|undefined|表示未定义|
|数组|类型[]|在类型后添加 [], eg. number[]|
|数组对象|Array<类型>|在 <> 中添加类型|
|元组|[类型]|元组中各位置的类型必须对应, 如 [string, number] = ['a', 1]|
|枚举|enum|使用定义的枚举名, 如 enum Color {Red, Blue}; let c : Color = Color.Blue|
|函数|(参数)=>返回值|函数类型中, 参数要同时指明类型与参数名称|
|自定类型|type [类型名] = 类型|允许自定义类型, 并为类型起名, 通常用于规范函数类型|

#### 字符串枚举
todo

### 联合类型
函数有多个返回类型时, 也可以使用联合类型, 定义一个变量可能同时用多种类型
```ts
let [变量名] : [类型名1] | [类型名2];
```

### 类型确定
#### 基本语法
定义变量时, 通过定义变量类型
```ts
let [变量名] : [类型名];

function fun([参数1] : [类型], ...) : [返回值类型]
{
    ...
}
```

#### 推断类型
当类型简单时, 可以不标注类型, 此时将自动推断类型

### 断言
#### 直接断言
当确定函数一定仅返回一种类型时, 可在函数后使用断言, 如获取一个已经存在的 HTML 元素, 此时不可能返回 null
``` ts
[表达式] as [类型名];
```

#### 非空断言
1. 当一个变量可能为空或一个对象时, 由于其可能为空, 因此不能直接访问其成员
1. 可以使用非空断言 !, 告诉编译器变量不为空, 从而实现对成员的访问
1. 如果变量确实为空, 将导致错误
```ts
let divElement : HTMLElement | null = 
    document.getElementById("test");

// 将导致错误, 因为变量可能为 null
divElement.innerHTML = ...

// 使用非空断言, 向编译器明确变量不可能为 null
divElement!.innerHTML = ...
```

#### 可选链运算符
1. 可选链运算符将判断一个复合类型变量是否具有某个成员, 如果没有, 将不会进行访问
1. 使用可选链运算符访问不能修改成员变量, 对于获取的 HTML 元素, 应避免使用 innerHTML 直接修改内容, 而应使用 appendChild 等修改函数
1. 由于非空断言依然可能导致错误, 应使用可选链运算符来提高安全性
```ts
// 使用非空断言, 向编译器明确变量不可能为 null
divElement?.appendChild(...)
```

#### 空值合并运算符
1. 对于可能返回空的函数, 还可以采用空值合并运算符
1. 将首先运行运算符左侧的表达式, 如果返回 null, 则将运行右侧的表达式
1. 因此可在右侧的表达式对出现空值的情况进行处理
```ts
let divElement : HTMLElement | null = 
    document.getElementById("test") ??
    document.createElement<"div">("div");
```

### 类型转换
#### 通用字符串转换
对于大部分类型, 均有成员函数 toString(), 调用后可转换

#### 数字转为字符串
1. 使用 number 的 toFixed 方法, 参数表示小数点后的位数
1. 使用 number 的 toString 方法, 参数表示采用进制

#### 字符串转为数字
1. 使用 parseFloat 函数, 将小数字符串转为数字
1. 使用 parseInt 函数, 将整形数字字符串转为数字

### 泛型函数
#### keyof
1. [基本使用](https://www.jianshu.com/p/c44b49bf6f58)
1. [使用注意](https://www.jb51.cc/faq/2883739.html) 先 判断 key 再赋值

# 面向对象
## 类
### 定义对象
通过 class 关键字定义对象, 并且定义成员函数 constructor 作为构造函数
```ts
class Car
{
    constructor()
    {
    }
}
```

### 定义成员
1. 可在 class 内直接定义成员变量与成员函数, 并且通过 this 访问成员
1. 定义时也需要指明类型
```ts
class Cat
{
    name : string;
    constructor(name : string)
    {
        this.name = name;
    }

    call() : void 
    {
        console.log(this.name);
    }
}
```

### 继承
1. 在定义类前使用 extends, 可以规定类继承的父类
1. 一次只能继承一个类, 但允许多重继承, 优先采用接口
1. 可以在子类中重新定义父类的方法
1. 通过 super 访问父类的函数与属性
1. 允许使用基类类型的变量保存子类类型的值, 将优先访问子类的函数

```ts
class Shape 
{ 
   Area:number 
   
    constructor(a:number) 
    { 
        this.Area = a;
    }

    fun() : void
    {
        console.log("In Shape fun"); 
    }
} 

class Circle extends Shape 
{ 
    constructor()
    {
        // 子类必须通过 super 调用父类的构造函数
        super(a * a * Math.PI);
    }

    disp():void 
    { 
        console.log("Area:  "+this.Area);
    }

    fun() : void
    {
        super.fun();
        console.log("In Circle fun");
    }
}

let a : Shape = new Circle(10);
a.fun() // 调用 Circle.fun();
```

### 静态成员
1. 使用 static 关键字定义
1. 静态可以是成员变量或静态成员函数
1. 通过 类名.静态成员 访问

### 成员限定符
1. public 默认, 即共有成员
1. private 定义为私有成员
1. protected 定义为保护成员
1. readonly 定义为只读成员, 成员在第一次赋值之后不可被修改
1. static 定义为静态成员

## 接口
### 定义接口
1. 通过 interface 关键字定义接口
1. 在接口属性名最后加上 ? 表示属性可有可无
1. 通过定义函数类型的接口成员, 以规定接口函数
1. 接口也允许定义 readonly 成员
```ts
interface Fruit 
{
    name : string;
    test? : boolean;
    call : ()=> void;
}
```

### 使用类实例化接口
1. 在定义类前使用 implements, 可以规定类采用的接口
1. 可以采用多个接口, 使用逗号分隔
1. 接口属性与方法必须全部定义 (含 ? 的除外)
1. 可将接口作为变量类型, 可以保存实例化相同接口的对象, 并且调用接口对应的属性

```ts
class Orange implements Fruit
{
    name : string;

    constructor(name : string)
    {
        this.name = name
    }

    call() : void
    {
        console.log("My name is " + this.name + "\n I'm Orange");
    }
}

class Apple implements Fruit
{
    ...
    call() : void
    {
        console.log("My name is " + this.name + "\n I'm Apple");
    }
}

let a : Fruit = new Orange('a');
let b : Fruit = new Apple('b');

a.call();
b.call();

```

## 泛型
1. 对于函数 / 类等, 可能对于不同的类型需要重用, 因此可以定义泛型 (特别是 Promise 中)
1. 使用带泛型的函数 / 类中, 需要使用 <> 指明实例化的类型

### 泛型使用
```ts
// 接口泛型
interface itf<T>
{
    arg : T;
}

// 函数泛型与实例化
function fun1<T>(arg : T) : T
{
    return arg;
}
fun1<number>(100);

// 类泛型与泛型接口的实例化
class example<T> implements itf<T>
{
    arg : T;

    constructor(arg : T)
    {
        this.arg = arg
    }
}
let a : example<number> = new example<number>(100);
```

### 类型泛型
允许在类型中使用泛型, 注意当使用带泛型的函数类型时, 语法发生改变
```ts
type funT = <T>(arg : T) => T;
```

### 泛型约束
泛型由于类型不确定, 无法访问成员, 可以通过接口约束泛型
```ts
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}
```

# 异步

# DOM 与 Typescript
## 获取元素
### 根据 ID 获取元素
由于每个元素的 ID 唯一, 且元素类型不确定, 因此返回类型为 HTML 元素的基类 HTMLElement
```ts
document.getElementById("[元素 id]")
```

### 使用 CSS 选择器获取元素
1. 函数 querySelector 仅能获取第一个捕获到的元素
1. 函数 querySelectorAll 将捕获所有符合条件的元素, 并返回 NodeList (不是数组, 但操作类似数组, 具有 length 等成员)
1. 如果不是直接选择标签, 返回类型为 HTML 元素的基类 HTMLElement
1. 如果直接捕获具体的标签, 如 p 等, 将返回相应的元素类型
1. 可以对元素调用此函数, 将捕获符合标签的子元素
```ts
document.querySelector("CSS 选择器")

document.querySelectorAll("CSS 选择器")
```

### 根据 HTML 标签获取元素
1. 通过 HTML 标签获取元素, 可以保证得到的元素具有其类型, 而不是 HTML 标签基类
1. 使用函数 getElementsByTagName 得到的不是元素, 而是 HTMLElementCollection, 属于一个伪数组, 包含了所有具有此标签的元素
1. 可使用 HTMLElementCollection 的成员方法 namedItem() 索引具有特定 id 的元素, 此时得到的元素类型为标签的特定类型, 可以调用标签的特有成员, 如 HTMLInputElement 特有的 value 成员, 可用于获取表单值

```ts
let tbody1 : HTMLTableSectionElement | null = 
    document.getElementsByTagName("tbody")
    .namedItem("select_res");

// 直接使用 id 获取的元素无法确定标签, 因此类型为 HTML 元素基类
let tbody2 : HTMLElement | null = 
    document.getElementById("select_res");
```

## 创建元素



# tsconfig

## 多文件编译
在 tsconfig.json 中添加 include 元素, 以字符串数组为值, 包含编译目录

todo

## 模块
### commonjs 模块解析
#### 模块导出
在定义类 (class), 接口 (interface), 函数 (function) 与变量等前添加关键字 export 可以定义导出的部分

#### 模块导入
结合 js 与 nodejs, ts 的模块导入时, 需要先使用关键字 import 表明导入模块, 再使用 require 表明模块来源
```ts
import os = require("os")
```

### ESModule 模块解析
todo
