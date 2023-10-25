# 面向对象与高级语法

## 创建类
### 类的基本结构
```python
class [类名]:
    "[类说明文档]"
    [类体]
```

### 成员函数
类的成员函数与一般函数相同, 均使用 def 定义, 但成员函数的第一个参数必定是向类本身的实例(类似 this), 通常命名为 self

### 构造函数
类的构造函数使用名称 \_\_init\_\_(self, [参数1], [参数2], ...)
通常在类的构造函数中为成员赋值, eg
```python
class test:
    "测试类"
    def __init__(self, arg1):
        self.arg1 = arg1
        return
```

### 类的使用
与 C++ 基本类似

### 类的特殊属性
1. \_\_dict\_\_ : 类的属性（包含一个字典，由类的数据属性组成）
2. \_\_doc\_\_ :类的文档字符串
3. \_\_name\_\_: 类名
4. \_\_module\_\_: 类定义所在的模块（类的全名是'\_\_main\_\_.className'，如果类位于一个导入模块mymod中，那么className.\_\_module\_\_ 等于 mymod）
5. \_\_bases\_\_ : 类的所有父类构成元素（包含了一个由所有父类组成的元组）

### 类的构析
类采用引用计数, 当类不再被任何位置引用时, 将自动构析类
```python
a = test_class()
b = a
c[0] = a

del a
b = 100
c[0] = 100
# 此时实例不再被引用, 将被构析
```
类在构析时, 将调用构析函数  \_\_del\_\_()

### 类的继承
```python
class 派生类名(基类名1, 基类名2, ...)
    ...
```

#### 继承类的构造函数
派生类将不会再调用父类的构造函数, 如果要调用父类成员, 需要使用语法
```python
class Child(Father):
    def __init__(self):
        Father.__init__(self)
```

#### 成员重用
与父类同名的方法将自动覆盖
使用 [父类名].[父类成员](self, 参数...)
调用父类的成员

### 类的运算符重载
1. 字符串转化
\_\_str\_\_(self)
2. 对象比较
\_\_cmp\_\_(self, x)
3. 加法重载(其他重载查表)
\_\_add\_\_(self, x)
4. 解释器读取
\_\_repr\_\_(self, x)

### 私有成员
当成员名称为 __[成员名] 时, 认为是私有成员

## 迭代器与生成器
### 迭代器
#### 创建迭代器
```python
it = iter(list1)
```
通过 iter 函数创建迭代器, iter 的参数可以是任何可迭代类型

#### 遍历迭代器
```python
x = next(it)
```
* 对迭代器使用 next, 实现遍历迭代器
* 当迭代器遍历结束, 将产生异常, 可使用 try 捕捉异常

#### 迭代器类型
当一个类具有成员函数 \_\_iter\_\_ 与 \_\_next\_\_, 则可以作为迭代器使用
1. \_\_iter\_\_
使用 iter 时调用此成员, 返回一个具有 \_\_next\_\_ 的对象, 通常是 self
2. \_\_next\_\_
使用 next 时调用此成员, 返回迭代器指向的值, 并使迭代器向下移动

#### StopIteration 异常
当迭代器遍历完所有元素时, 需要在 \_\_next\_\_ 中抛出此异常, 让迭代终止
```python
def __next__(self):
    if it > 10:
        raise StopIteration
    else
        it += 1
        return it
```

#### 遍历迭代器
使用 for 循环遍历迭代器
```python
for x in sequence:
    print(x)
```
相当于先调用 iter 获取迭代器, 然后每次循环将 next 的结果赋给 x, 直到产生 StopIteration 异常

### 生成器
* 使用了 yield 的函数被称为生成器
* 每次遇到 yield 时函数会暂停并保存当前所有的运行信息, 返回 yield 的值, 并在下一次执行 next() 方法时从当前位置继续运行
* 基本结构
```python
def generator(n): # 生成器函数
    counter = 0 # 利用 counter 记录当前迭代次数
    while True:
        if (counter >= n): # 利用 n 记录总计迭代次数
            return # 当运行到 return 时, 抛出 StopIteration 异常
        [迭代计算]
        yield [迭代结果]
        counter += 1

for it in generator(10): # 此时 f 为一个迭代十次的迭代器
    [遍历] 
```

## 异常
### 异常类型
[Python 标准异常](https://www.runoob.com/python/python-exceptions.html)
Python 异常基类 Exception

### 基本异常处理
```python
try:  
    [正常执行模块]  
except [异常 A]:  
    [发生A错误时执行]  
except [异常 B] as e(异常对象名):  
    [发生B错误时执行]
    print(e) # 打印异常信息
except:  
    [发生任何其他错误时执行] 
else:  
    [没有错误时执行]  
finally:  
    [总是执行]  
```

### 抛出异常
```python
raise [异常类型]([异常信息])
```
抛出异常后, 后方的代码不会再执行

### 简单异常处理
对于存在成员函数 `__exit__()` 与 `__enter__()` 的类, 可以简化异常处理过程

```python
with [入口表达式] as val(变量):
    [处理语句]
```

等价于

```python
try:
    tmp = [入口表达式]
    val = tmp.__enter__()
    [处理语句]
finally:
    tmp.__exit__()
```

此时, 无论发生什么异常, 都能保证 tmp.\_\_exit\_\_() 执行, 使 [入口表达式] 产生的类正常释放
通常将此方法用于文件输入输出, 保证文件能正常关闭

```python
text = ""
with open("test.txt", "r") as file:
    text = file.read()
```

