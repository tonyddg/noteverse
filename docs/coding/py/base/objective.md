# 面向对象与高级语法

## 创建类
### 类的基本结构
```python
class [类名]:
    "[类说明文档]"
    val: type = ...

    def fun(self, ...):
        ...
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

### 使用注意
#### 类的成员
在定义类时, 即使声明了成员变量, 但没有赋初值, 也将认为类没有该成员  
因此在类中声明了成员变量后, ==必须要对其赋初值==, 至少要赋值为 `None`

可使用函数 `hasattr(__obj, __name)` 判断类是否有该成员

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
异常类型通常即异常基类 `Exception`

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

## 纯虚类
参考文档 <https://docs.python.org/zh-cn/3/library/abc.html>

todo

## Type Hint
参考自 <https://www.bilibili.com/video/BV11Z4y1h79y>

用于 Python 3.5 以上的版本  
除了[基本类型表示](#基本类型表示)中的内容, 其余函数 / 对象 (类型的本质为一种特殊的对象) 均需要通过 `import typing` 来获取

### 类型表示
#### 基本类型表示
* 基本类型 `int, float, bool, str, bytes, None`, 其中 `bytes` 为字节串 (即字节方式读取的字符串)
* 列表 `list[type]`  
通过 `type` 限制列表元素的类型
* 元组 `tuple[type_1, type_2, ...]`  
`type_n` 限定了元组中各个位置元素的类型  
通常用于表示一些报文结构, 如 `tuple[int, Optional[str]]`, 第一个元素保存错误码, 第二个元素保存错误信息 
* 字典 `dict[type_key, type_val]`
`type_key` 限定了字典键的类型  
`type_val` 限定了字典元素的类型  
* 集合 `set[type]`  
通过 `type` 限制集合元素的类型

注意, 在 Python3.9 之前的版本需要通过 `from typing import ...` 的方式调用除基本类型外的类型, 且首字母为大写, 如  
`List, Tuple, Dict, Set`

#### 复杂类型表示
注意, 以下类型均需要通过 `from typing import ...` 的方式调用

* 顺序存储类型 `Squence[type]`  
表明变量可以是列表, 元组, 字符串等一系列顺序存储的变量类型, 要求存储元素类型为 `type`  
例如 `Squence[int]` 类型的变量可以是列表 `[0, 1, 2]`, 元组 `(0, 1, 2)`, 字节字符串 `b"abc"`

* 复合类型 `Union[type1, type2, ...]`  
表明变量类型可能是 `type1`, `type2` 等几个类型中的一个  
对与函数使用时, 推荐使用[函数模板](#函数模板)代替

* 可选变量 `Optional[type]`  
表明变量类型可能使 `type`, 也可能是 `None`, 常用于函数的可选参数  
该类型最好仅用于接收信息的只读成员或函数的可选参数  
此时仍要给出参数的默认值, 如 `f(a: Optional[int] = None)`

* 可调用变量 `Callable[[type_1, type_2, ...], type_return]`  
表明变量是一个参数类型为 `type_1, type_2, ...`, 返回值为 `type_return` 的函数或可调用的类

* 变量值限定 `Literal[val1, val2, ...]`  
要求变量的值只能是 `valn` 中的一个

* 附加元数据 `Annotated[type, args1, args2, ...]`  
该类型实际即第一个参数 `type`, 之后的参数均为附加的元数据  
可配合[类型解析](#类型解析), 用于进一步的判断, 具体见跳转处的例子

* 任意类型 `Any`

#### 其他类型表示的情况
* 当希望限制的并不是具体的类型, 而是具有某一类特殊功能的类型  
此时就需要借助[纯虚类](#纯虚类), 限制类型必须具有的成员函数 (之其中自然包括了支持的运算等)  
例如定义一个能够用于比较的类型, 可参考 <https://stackoverflow.com/questions/37669222/how-can-i-hint-that-a-type-is-comparable-with-typing>
* 部分情况下, 类型错误难以被发现, 又对类型的正确性有较高的要求, 可能需要手动解析类型并编写类型断言, 可参考[类型解析](#类型解析)

### 基本使用
#### 变量标注
通过 `val:type` 的方式标注变量类型  
在使用变量标注后, 除非使用 `Option` 类型, 否则最好对变量赋初值

#### 函数标注
`def fun(a: type_1, b: type_2, ...) -> type_return`

其中
* `type_n` 为函数参数的类型
* `type_return` 为函数返回值类型

使用注意
1. 默认情况下, 认为函数返回 `Any`
1. 当函数不返回值时, 应标注返回类型为 `None`
1. 当函数中可能终止程序 (如抛出错误) 时, 应采用 `NoReturn`

应用举例
```python
from typing import NoReturn

def fun() -> None:
    pass

def ExitPrgm(code: Literal["ok", "error"]) -> NoReturn:
    if code == "ok":
        exit()
    else:
        raise Exception("Exit Error")
```

#### 类标注
在类定义完成后, 将自动识别并成为一个类型  
但是在类定义中, 需要表示类的类型时, 应使用 `"classname"` 的方式, 其中 `classname` 为类名  

对于成员函数中的 `self` 则不需要标注类型  
对于构造函数 `__init__` 则不需要标注返回类型

```python
class container:
    def __init__(self):
        ...
    def copy(self, obj: "container")
```

#### 重载函数修饰
python 并不存在重载函数, 但可以通过 typing 模块导入重载修饰器 `@overload` 用于辅助类型判断  
基本使用为

```python
# 导入修饰器
from typing import overload

# 定义函数可能的输入参数以及对应的返回值类型情况
@overload
def func(a: int) -> None:... # 使用省略号, 不需要给出实现
@overload
def func(a: str) -> str:... # 使用省略号, 不需要给出实现

# 在下方立刻定义函数, 此时不再需要确定函数的类型, 但应当严格符合上方的规则
def func(a):
    ...
```

### 类型断言
#### 类型断言  
当类型前有对类型的判断语句后, 将自动对类型进行断言

```python
from typing import Literal, Optional

# Option 类型
def add(a: int, b: Optional[int]) -> int:
    if type(b) == int:
        # 经过判断后认为 b 即 int 类型
        return a + b
    else:
        return a

# Literal 类型

x: Literal["a", "b"] = "a"
y: str = "b"

if y == "b":
    # 经过判断后, 认为 y 已经满足 Literal["a", "b"] 的要求
    x = y
```

类型的判断通常通过函数 `type(val)` 完成  
注意其返回值为无类型限制的[基本类型](#基本类型表示)或自定义的类, 如 `list, int`  

* 对于模板类, `type(val)` 仅能判断模板类, 判读示例化后的类还需要借助[类型解析](#类型解析), 获取其泛型参数的具体值  
* 对于[纯虚类](#纯虚类)的判断, 只能通过检查对象是否有纯虚类所要求的成员 (检查是否是未实现 `NotImplemented`)  
* 对于 `typing.Callable`, `typing.Sequene` 等大部分此类对象均会继承的纯虚类以及继承自纯虚类的对象, 可使用 `isinstance(obj, class)` 判断 (注意 `typing.Sequene` 表示的仅是一个符号, 还需要[类型解析](#类型解析)获取其背后的信息)

#### 类型解析
* 函数 `typing.get_origin(type)` 可获取类型 `type` 的根类型  
    * 例如 `isinstance([1, 2, 3], typing.get_origin(typing.Sequence))` 可判断类型是否为 `typing.Sequence`
* 函数 `typing.get_args(type)` 可获取一个元组, 该元组中的元素即类型 `type` 的泛型参数  
    * 该函数也可以使用 `type.__args__[n]` 代替
    * 例如 `typing.get_args(typing.Sequence[int])[0] == int` 可获取 `typing.Sequence` 的参数 `int`

以下为一个基于类型解析进行断言的例子  
由例子也可知, 仅通过 Type Hint 并不适合运行时的类型检查与复杂类型表示, 仅推荐在少部分对通用性要求高的情况下使用  
实际可通过直接检查数据长度的方法完成, 而不需要专门解析

```python
import typing

# 此处为创建一个具有一个具有两个元数据的新类型 (不是类型别名)
# Annotated 配合 TyperVar 使用时均需要使用此方法
T1 = typing.TypeVar("T1")
TLen = typing.TypeVar("TLen") # 使用该元数据记录数组应用的长度
type FixArrayLikeBase[T1, TLen] = typing.Annotated[T1, TLen]

# 通过别名的方式创建定长数组类型
FixArrayLike = FixArrayLikeBase[typing.Sequence, TLen]

# 为常用的定长数组创建别名, 表示数据时应用 typing.Literal[3]
Array3 = FixArrayLike[typing.Literal[3]]

def FixArrayAssert(obj : FixArrayLike, type):
    '''
    断言函数  

    仅能用于判断变量 obj 是否符合类型 type 的要求
    '''
    # 检查传入的是 FixArrayLikeBase, 即所有别名的基础
    assert typing.get_origin(type) == FixArrayLikeBase, f"Unknown assert type"
    # 类型仅是符号, 需要 typing.get_origin 获得类型对应的纯虚类, 再使用 isinstance 判断
    assert isinstance(obj, typing.get_origin(typing.get_args(type)[0])), f"Type error, require is {typing.get_args(type)[0]}, given is {type(obj)}"
    # 将列表的长度与元数据要求的长度比较
    assert len(obj) == typing.get_args(type)[1].__args__[0], f"Length error, require is {typing.get_args(type)[1].__args__[0]}, given is {len(obj)}"
```

#### 显式类型转换  
即内置的类型转换函数, 如 `str, int` 等  
以及独立类型别名的转换函数 `TypeName(val)`
常用于 `NewType` 的转换  

```python
a: int = 100
s: str = str(a)
```

#### 忽略类型判断  
在出现类型错误的位置使用注释 `# type: ignore`  
可以让系统不进行类型检查

#### 强制类型转换 (不建议使用)  
`typing.cast(type, val)`  

直接将变量 `val` 的类型标记转换为 `type`

### 类型别名
#### 基本类型别名  
`TypeName = type`  
在解释时, 将使用 `type` 代替 `TypeName`  
因此认为 `type` 与 `TypeName` 是同一个类型

#### 独立类型别名  
`TypeName = NewType("TypeName", type)`  
认为 `TypeName` 与 `type` 不同, 无法相互赋值, 需要进行显式类型转换  

```python
from typing import NewType

UserID_A = NewType("UserID_A", int)
a: UserID_A = UserID_A(10)
```

### 模板类型 (泛型)
类似 C++ 的模板, 在定义模板前, 需要定义泛型变量的名称  
python 使用如下方式定义  
`T = typing.TypeVar("T"[, type_1, type_2, ...])` 或 `T = typing.TypeVar("T", bound = ...)`  
* `type_n` 为模板允许的类型, 至少要给出两个, 不定义则表示模板可为任意类型  
* `bound` 为要求类型 `T` 至少继承自参数 `bound` 给出的类型, 或具有相同的接口 (可使用[纯虚类](#纯虚类))

注意
* 不同于 C++, 一个泛型变量可用于一个模板函数 / 模板类
* 操作泛型时要保证各个可能类型对操作适用
* 可以通过断言对不同类型进行专门操作
* 泛型的第一个参数需要与泛型名一致

#### 基于模板的类型
可直接将泛型变量用于类型的定义, 例如  

```python
T = typing.TypeVar("T")

StrIndexDict = dict[str, T]
StrDict = StrIndexDict[str]
```

当具有泛型的类型未指定泛型变量直接用于函数等, 将泛型视为 `Unknown` 处理

#### 函数模板
函数模板可以自动识别示例化类型

使用示例

```python
from typing import TypeVar, Sequence

T = TypeVar("T", str, int)
def fun(a: T, b: T) -> Sequence[T]:
    if type(a) == int:
        return [a + b, a - b]
    else:
        return [a, b]
```

#### 类模板
类通过继承基类 `Generic["T"]` 的方式变为模板类 (`T` 为泛型变量的名称)  
在使用时需要通过 `classname[type]` 确定模板的示例化类型

使用示例

```python
from typing import TypeVar, Generic

T = TypeVar("T")

class Container(Generic[T]):
    item: Optional[T] = None
    def __init__(self, item: Optional[T] = None):
        self.item = item
    
    def set(self, item: T):
        self.item = item

    def get(self) -> Optional[T]:
        return self.item

    def show(self) -> None:
        print(self.item)

a: Container[str] = Container[str]()
```

### 有关设置
使用 Type Hint 时, 建议启用 IDE 的类型检查
* 对于 vscode 启用 Pylance 设置 `"python.analysis.typeCheckingMode": "basic"`
* 对于无 IDE 环境, 可安装 mypy, 通过 mypy 进行类型检查
