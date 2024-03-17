# C++ 学习笔记
> 主要参考书籍 ***C++PrimerPlus***

## 拾遗

### 运算符
#### 特殊运算符
|符号|功能|优先级|示例|
|--|--|--|--|
|`sizeof()`|获取值所占用的 (栈) 空间, 单位为字节|与逻辑非, 正负号等一元运算符同为第二高优先级|`sizeof((int)1)` = 4|
|`A ? B : C` 条件运算符|表达式 A 为真时运行 B 否则运行 C, 表达式 B, C 的结果类型必须相同 |优先级倒数第三 (低于 `<<`, 因此在 `cout` 中最好加括号)|`1?2:3` = 2|
|`A ,B` 逗号运算符|将多个表达式用逗号隔开, 总的结果为最后一个表达式的结果|优先级最低|`1,2` = 2|
|`a = B`, `+=`, `*= `, ... 等赋值运算符|返回被赋值变量的引用|优先级倒数第二|`(a = 1) += 5` = 6 (&a)|
|`a++`, `++a` 自增运算符|均产生使 a 加一的副作用, 其中 `a++` 返回 `&a`, 而 `++a` 返回值为 `a + 1` 的常量, 将 `+` 替换为 `-` 同理|`a++` 为最高优先级, `++a` 为第二高优先级|`a++ + a++` = a * 2 + 1, 注意同级别的表达式将会分别计算 (顺序不确定, 因此最好避免此类用法)|

#### 特殊知识
* 不同类型的变量运算之间存在隐式转换, 满足以下规则  
`char,short -> int -> unsigned -> long -> double <- float`  
其中可由 `->` 的左到右转换, 无法反向隐式转换
* 逻辑运算中存在短路求值, 即如果第一个表达式即可确定结果, 将不会运行第二个表达式, 当表达式存在副作用时注意
	* `A || B` 中若A为真将不会计算B
	* `A && B` 中若A为假将不会计算B
* 求余运算遵循原则 $a \% b = a - (a / b) * b$  
因此将得到一个与a同符号, 绝对值比a小的值, 求余运算结果符号与被除数 a 有关（可能为正负）
* 对于 条件运算符 `?:`, 赋值运算符 `=` 与逗号运算符 `,`, 其优先级均低于 `<<`, 因此在 `cout` 等使用重载左移运算符的情况中, 最后通过括号 `()` 认为规定运算顺序防止出错

### 标准输入输出
#### cout 输出格式控制
* `cout.width()` 设置输出宽度，不会截断，只对下一次输出有效
* `cout.fill(char)` 设置填充字符，始终有效
* `cout.precision(int)` 设置小数精度，默认模式下为总位数
* `cout.setf(fmtflags)` 设置输出选项
	* `ios_base::showpoint` 显示小数点, 精度仍然为总位数, 精度为2时输出20.87将显示20.
	* `ios_base::boolalpha` 以true/false输出bool
	* `ios_base::showbase` 显示进制
	* `ios_base::uppercase` 大写显示十六进制
	* `ios_base::showpos` 显示正数的+
* `cout.setf(fmtflags, fmtflags)` 设置输出选项, 双参数并且第二个参数为类型选择, 第一个参数为具体设置
	* `ios_base::basefield` 设置输出进制
		* `ios_base::dec` 十进制
		* `ios_base::oct` 八进制
		* `ios_base::hex` 十六进制	
	* `ios_base::floatfield` 设置输出表示方法
	 	* `ios_base::fixed` 定点计数法
	  	* `ios_base::scientific` 科学计数法
	* `ios_base::adjustfield` 设置对齐方式
		* `ios_base::left` 左对齐
		* `ios_base::right` 右对齐
		* `ios_base::internal` 符号左对齐数字右对齐

#### cin 读取控制
* `get(char&)` 读一个字符(get独有)
* `read(char*,  int)` 不会再结尾补充 `\0` 且不会在 `\n` 处停下
* `get(char*, int)` 会补充 `\0` 且会在 `\n` 处停下
读取二进制文件时要加上 `ios::binary` ,当读取字节超过文件字节时才不会出错

### 可变参数
使用可变参数实现传入任意长度的参数
1. [可变参数教程](https://www.runoob.com/cprogramming/c-variable-arguments.html)
2. 通过 vsprintf 函数, 实现通过可变参数, 对 sprintf 再封装
eg. 
``` c
va_list p;
va_start(p, format);
_offset += vsprintf((char*)(_buf + _offset), format, p);
va_end(p);
```

### 组合变量类型
#### 常量指针
`const char*` / `char const*` (等价)  
表明指针指向一个常量, 因此指针所指向的值不能更改, 但指针变量储存的地址可以改变(==也可进行 `+` 等操作==)
```cpp
const char* p = "ABC";
p = "CDF";//正确
p++;//正确
```
#### 指针常量
`char *const`
指针为一个常量, 即指针变量储存的地址不能改变
```cpp
char const* p = "ABC";//不正确, 不能将const char*赋给char*
char str[] = "ABC";
char const* p = str;//正确
p++;//不正确
```
##### 常量指针常量
两种类型的组合, 即
`const char* const`
#### 常量引用
`const int&`
引用关系一旦建立后无法修改, 因此不存在引用常量  
常量引用表示对于常量的引用, 无法修改引用指向的值

##### 常量常量指针引用
* 由于 `const char*` 表示常量指针, 与一般的常量 `const int` 结构相同, 含义不同
* 因此 `char*&` 表示 `char*` 指针的引用, 但 `const char*&` 不具有 `const int` 相类似的含义(即 `char*` 储存的地址不能修改), 而是表示对常量指针 `const char*` 的引用, 类型 `const char*` 储存的地址可以更改
* 要达到相同的效果 (同一类型) 需要使用 `char const*&`

### 定义宏
通过 `#define [名称] [表达式]` 或 `#define [名称]([参数, ...]) [表达式]` 创建宏  
在使用宏的时候, 为了避免由运算顺序导致的错误, 最好对宏中的各个要素加上 `()`

#### 调试宏
* `__DATE__` 编译日期
* `__TIME__` 编译时间
* `__FILE__` 所在文件名
* `__LINE__` 代码所在行号

#### 宏运算符
* `\` 表示宏定义的延续, 用于宏定义的行末
* `#` 可将参数直接转化为字符串常量 (不是读取值), 并且能与周围的 " 合并
* `##` 将参数直接与相连的表达式连接 
* 具体例子参见[此链接](https://www.runoob.com/cprogramming/c-preprocessors.html)

### 杂项知识
#### 输入输出流
`stdout`, `stdin`, `stderr` 分别表示是标准输出，标准输入和标准错误, 并对应 `cout`, `cin`, `cerr`  
`stdout` 是行缓冲的(换行时缓冲), `stderr` 是无缓冲的.  
以此对于以下代码
```cpp
int main(){
    fprintf(stdout,"Hello ");
    fprintf(stderr,"World!");
    return 0;
}
```
将输出结果 World!Hello  
详细可[参考](https://blog.csdn.net/mycwq/article/details/46554805)

#### 程序控制
* `switch` 语句
	* `switch(A)` 中, 表达式 `A` 的结果可以是整数 `int`, 字符 `char` 或枚举类型, 不可以是浮点 `float` 或 `long`
	* 要求 `case B:` 中的表达式 `B` 与 `A` 的结果类型相同
	* 如果 `case` 中没有 `break`, 将会向下运行, 直到遇到第一个 `break`
* `for` 语句
	* 对于语句 `for(A;B;C)` 会先运行 `A`, 然后运行 `B` 对其结果进行判断, 在一个循环结束后运行 `C`, 并重新判断 `B` 开始新的循环
	* 可使用 `for(type n : array)` 用于简化循环 (要求标准为 C++11 以上)

#### 格式化字符串
##### 输出格式化字符串
* 格式化符号的通用格式为 `%(标志)(输出最小宽度)(.精度)[格式字符]`
* 对于字符串类型则为 `%(.字符串长度)s`
	* 标志常用有 `-`, 结果左对齐; `+` 正数结果带 + 号
	* 输出最小宽度为任意位数字, 最小宽度包含符号
	* 精度通过 `.[精度]` 表示, 对于数字将会对最最小位四舍五入, 或补 0
	* 常用符号有 `f` 浮点数, `d` 有符号整数, `u` 无符号整数, `X` 十六进制, `e` 科学计数法表示浮点数, `p` 指针 (十六进制表示)

##### 其他参考
* [字符串处理函数与输入格式化](https://blog.csdn.net/weixin_45525272/article/details/120820628)
* [sprintf 等格式化字符串函数参考](https://learn.microsoft.com/zh-cn/cpp/c-runtime-library/reference/sprintf-sprintf-l-swprintf-swprintf-l-swprintf-l?view=msvc-170)
* [读取变长参数的格式化字符串函数](https://learn.microsoft.com/zh-cn/cpp/c-runtime-library/reference/vsprintf-vsprintf-l-vswprintf-vswprintf-l-vswprintf-l?view=msvc-170)

## 第九章
### 头文件 P247
#### 头文件包含的内容
1. 函数原型
2. `#define` 与 `const` 定义的常量
3. 结构, 类, 模板声明
4. 内联函数
#### include
1. 包含头文件使用双引号
2. 头文件中使用 `#ifndef` (注意中间的n) `#define` 来避免多次包含同一个头文件
==不能忽视, 特别是hpp文件中==
### 变量作用域 P250
#### 自动存储持续性
* 默认情况
* 代码块中声明的变量将在代码块结束后释放
* 同名时, 局部变量将隐藏外部变量
``` cpp
int main()
{
    int a = 10;
    int b = 20;
    {
        int a = 30;
        int c = 40;

		cout <<"In Block" << endl;
        cout <<"a: " << a << endl;
		cout <<"b: " << b << endl;
		cout <<"c: " << c << endl;
	}
	cout <<"Out of Block" << endl;
	cout <<"a: " << a << endl;
	cout <<"b: " << b << endl;
	// cout <<"c: " << c << endl;
    return 0;
}
```
#### 静态变量
1. 在代码块外定义(外部链接性)
能够被所有代码访问(跨CPP)
2. 在代码块外定义 加上 `static` 关键字(内部链接性)
只能在定义该变量的文件中使用
3, 在函数内定义 加上 `static` 关键字(无连接性)
只能在定义该变量的代码块中使用
##### 跨文件说明
在编译时, 各个头文件的内容会被扩展到源文件内, 此处跨文件指多个同时编译的源文件
#### 静态变量初始化
默认为 0
#### 引用声明 P255
引用来自其他源文件的全局变量时, 需要使用 `extern [变量定义]`, 或者使用 `::[全局变量]` 表示使用全局版本的变量
##### extern 的说明
* 通常情况下, 定义一个变量将会为其分配空间  
* 加上extern关键字后, 不会分配空间, 仅表明有此变量, 称为声明定义, 简称声明  
* 对于函数, 函数定义中必有函数体, 因此不需要extern关键字说明函数是定义函数声明  
* 声明可以多次, 定义只能有一次
##### 不使用 extern 的后果 
1. 直接使用其他文件的全局变量
由于变量未声明直接使用, 将出错
2. 不使用 `extern`
编译器认为要定义一个新的全局变量, 由于变量名重复, 将出错
#### 隐藏外部全局变量 P258
不使用外部的全局变量时, 可以用 `static` 声明作用域更小的全局变量  
此时将优先使用作用域更小的全局变量 (隐藏其他源文件的全局变量, 防止变量重复)
#### 无连接性的静态变量
在程序启动时进行一次初始化, 之后保持不变
#### 其他说明符/限定符 P260
同一个声明不能使用多个说明符(`thread_local` 除外)
1. `volatile`
表明内存单元没有程序修改也可能发生改变  
用于指向硬件位置的指针
2. `mutable`
指出类变量为 `const` 时, 有 `mutable` 的成员依然可变
(可用于类中记录调用次数的成员等)
#### const 说明符
全局 `const` 的连接性为内部(同 `static`)
##### 使用内部链接的意义
* 由于头文件的内容会被扩展到源文件内, 在头文件中定义全局变量必然导致变量名冲突, 使用 `static` 则可以避免冲突
* `const` 的连接性为内部保证 `const` 可以定义在头文件中
#### 函数的连接性
默认情况下函数为外部链接性
1. 这意味着两个源文件中, 不能有同名函数
1. 可以使用 `extern` 访问其他源文件中的函数 (`extern` 可省略, 没有函数体的函数即声明)
1. 可以使用 `static` 使函数的连接性为内部
##### 内联函数
内联函数不受此规则限制, 这表明内联函数可以定义在头文件内
### 动态存储变量 P262
#### new初始化
1. 构造函数 `int *p = new int (6);`
2. 初始化结构/数组 `int *p = new int [4] {1, 2, 3, 4};`
#### 定位new运算符
在 `#include<new>` 后, 可以指定 `new` 的位置  
eg.
``` cpp
#include<new>
int buffer[256];
int main()
{
	int *p = new(buffer) int[16];
}
```
此时将从 `buffer` 中分配空间给 `p`, 由于空间为静态, 不需要 `delete`
#### delete
1. 使用 `new` 初始化的指针必须使用 `delete` 释放空间
1. 使用 `new[]` 初始化的指针必须使用 `delete[]` 释放空间
### 名称空间 P266
#### 名称空间中的定义与声明
使用 `namespace [名称空间] {}`
表示内部的代码使用指定的名称空间
由于名称空间不能在代码块中, 因此名称空间中的变量通常为外连接性
允许多个使用相同名称空间的 `namespace` 存在  
eg
``` cpp
namespace test
{
	int fun();
}
namespace test
{
	int fun()
	{
		return 1;
	}
}
```
#### 全局名称空间
一般的全局变量在全局名称空间中
因此除了使用 `extern` 声明全局变量, 也可以使用 `::[全局变量]`, 直接访问全局变量
#### using声明
* 语法 `using [带有名称空间的变量/函数]`
* 作用 把声明的变量加入全局/局部(代码块)区域中
eg
``` cpp
namespace test
{
	int a;
}
int main()
{
	using test::a; // 将a导入局部区域(不是全局)
	int a;// 由于a已在局部区域存在, 将出错
	return 1;
}
```
#### using编译指令
* 语法 `using namespace [名称空间]`
* 将指定的名称空间包含到全局名称空间中
* 与 `using` 声明的区别: 由于只是包含名称空间, 名称空间中的变量连接性不变
eg
``` cpp
namespace test
{
	int a;
}
int main()
{
	using namespace test; // 将a导入全局区域(不是全局)
	int a;// test::a被局部的a覆盖, 不会出错
	return 1;
}
```
#### 名称空间其他特性
* 可以对名称空间嵌套
* 可以在名称空间中使用 `using`  
eg
``` cpp
namespace a
{
	int i;
}
namespace b
{
	using a;
}
```
此时 `a::i` 与 `b::i` 等价
* 可以使用 `namespace a = b` 给命名空间起别名
* 匿名命名空间
通过省略命名空间名称创造隐藏命名空间  
此时会将此命名空间添加到当前文件的全局空间中, 但在其他文件无法访问  
相当于 `static` 的内部链接性
* 老式标准库头文件(如 `iostream.h`)没有名称空间
## 第十章 P279
### 基础
#### class与struct
* `class` 中默认访问控制为 `private`
* `struct` 中默认访问控制为 `public`
#### 内联方法
除了 inline, 在函数声明内定义的成员函数默认为内联函数
#### 构造函数中防止参数冲突
构造函数的参数不能与类的成员变量相同, 可以使用在成员变量前加上 `m_` 前缀或 `_` 后缀, 区分成员变量
#### 使用构造函数
* `[class] a = [class](参数);`
* `[class] a(参数);`
* `[class] a* = new [class](参数);`
#### 构析函数
1. ==如果类使用了 `new`, 则必须定义对应的构析函数==
2. 构析函数没有参数
#### 局部构析函数的调用
构析函数将在代码块结束后调用
```cpp
class a
{
	string name_;
	a(string name)
	{
		name_=name;
	}
	~a()
	{
		cout << name_ << endl;
	}
}
int main()
{
	a t1("t1");
	{
		a t2("t2")
	}
	return 0;
}
```
窗口环境中, 将输出 t2 , 因为 t1 的构析函数在窗口关闭后调用
#### 列表初始化
* `[class] a = {参数};`
* `[class] a{参数};`
#### const成员函数
在成员函数的定义与声明后加上关键字 `const`, 可以保证 `const` 修饰的类变量可以调用此类成员函数
只要函数不修改成员, 尽量使用 const 成员函数
#### this指针
当需要获取类本身时, 可以使用 `this` 或 `(*this)`
#### 类数组
* 类有默认/无参数的构造函数
同一般数组的定义
* 类没有默认/无参数的构造函数, 必须为每个元素调用构造函数
```cpp
[class] arr[3] = {
	[class] (参数...),...
}
```
允许各个元素调用不同的构造函数
#### 类作用域
在类中定义的成员函数/变量, 均在类作用域中, 需要通过 `::` 访问
#### 类中的常量
不能在类声明中定义值(类声明不使用空间), 因此不能再类中直接使用const成员
可以使用static const定义类中的常量
#### 类作用域中的枚举
通常情况下的枚举
```cpp
enum a{s1, s2, s3};
enum b{s1, s2, s3};
```
两种枚举类型的枚举量冲突(同一个域中不能有两个相同的枚举量)
在类作用域中的枚举
```cpp
enum class a{s1 = 1, s2 = 2, s3 = 3};
enum class b{s1 = 1, s2 = 2, s3 = 3};
class c
{
public:
	enum pub_sign{s1 = 1, s2 = 2, s3 = 3};//可以作为一种实现类常量/标识的方法
	enum {s7 = 7, s8 = 8, s1 = 1};//匿名枚举量, 此处s1=1错误, 枚举量重复
private:
	enum pri_sign{s4 = 4, s5 = 5, s6 = 6};//外部不可使用这些枚举量
}
```
* 将不会发生冲突/不会自动转换为int
* 使用枚举量时需要加上类名与作用域运算符 
* 定义枚举类型时使用枚举量的名称 `a i = a::s1;`
* 定义在类中的枚举类型 `c::pub_sign i = c::s1` (枚举量);
## 第十一章
### 重载运算符
1. `[返回值] operator[运算符](参数)` 注:运算符为类型名时为类型转换重载
2. 重载运算符中必须有自定义的类型
3. 不是所有运算符都可以重载
4. `()`, `[]`, `->`, `=` 只能作为成员函数重载
5. 重载运算符有多个值时, 参数位置不同, 对应的函数不同  
eg. 已经定义 `A`, `A::operator+(int)`, 即 `A+int`, 但 `int+A` 未定义, 将会出错  
如果要反转操作数顺序, 可以定义友元函数或 `A operator+(int i, A j){return j+i}`
#### 友元函数
在类定义中声明, 加上前缀 `friend`, 则具有此名的函数可以访问类的 `private` 成员
#### 重载ostream的 << 运算符
1. 将 `ostream` 作为第一个参数, 使用非成员函数定义
2. 要返回 `&ostream` (使 `cout<<a<<b` 可以连续)
### 类的类型转换
#### 隐式类型转换
* 当类有当值的构造函数时, 将作为隐式转换的函数  
eg
```cpp
//假设A有无参数与参数为int的构造函数
A a;//使用无参数的构造函数
a = 10;//使用10参数为int的构造函数建立临时变量, 再复制给a
```
可在构造函数前使用 `explicit` 关闭此特性
* 隐式转换的情况(需要类A, 但提供可转换的其他类型)
	1. 初始化类
	2. 赋值
	3. 传参
	4. 返回值
* 如果只定义了 `A(double)`
使用 `A=100;` 时, 会先隐式转换100为double
#### 转换函数
`operator [目标转换类型]()`
1. 必须是类方法
2. 不能指定返回类型(即目标类型)
3. 不能有参数
4. 当定义了多个转换函数时, 且有多种转换可能, 将会出错  
eg. 如果 `A` 定义了 `operator int()` 与 `operator double()`, `A a; cout << a;`将出错, `long b = a`;也将出错(double与int均可赋给long)
5. 通过在声明中添加关键字 `explicit`, 可以禁止隐式转换
#### 类型转换与运算符重载
重载类A的加法有两种方式
1. `A A::operator+(const A &b) const;`
2. `friend A operator+(const A &a, const A &b);`


现在要实现 `A` 与 `double` 的加法, 且可交换次序
* 当 `A` 不存在转换为 `double` 的方法时, 可以定义
```cpp
A A::operator+(const double b) const;
friend A A::operator+(const double b, const A &a){a + b};
```

* 当 `A` 存在转换为 `double` 的方法时
```cpp
A::operator double() const;
friend A operator+(const A &a, const A &b);//当参数为double时, 编译器将自动转换, 达到相同的效果
```

## 第十二章
### 复制构造函数
以指向对象的常量引用为参数的构造函数为复制构造函数
在没有定义时, 将使用默认的复制构造函数
#### 调用复制构造函数
1. 类之间赋值
2. 使用其他类变量初始化类(包括 `new`)
3. 函数按值传参与返回对象
#### 默认的复制构造函数
* 默认构造函数将逐个赋值成员, 当成员中有指针指向动态内存时, 将直接复制指针(浅拷贝)
* 当类作为零时变量时, 当退出程序块时将调用构析函数, 此时极可能提前释放动态内存
#### 默认的赋值运算符
* 默认赋值运算符 `A& A::operator=(const A&)`(与默认复制构造函数不同)
* 赋值运算符通常用在两个已经定义的类变量, 让后将其中一个赋给另一个
* 同样是浅拷贝, 将导致与默认复制构造函数相同的问题
* 与浅拷贝的不同
	* 需要返回引用(通常即赋值被赋值变量的引用*this)
	* 通常被赋值后, 被赋值变量的值将被舍弃, 需要delete, 不能直接覆盖
	* 在使用2后, 应避免将自身赋值给自身, 因为赋值前自身的值已被删除(可在赋值时建立临时变量解决)
	* 自我赋值的处理
```cpp
//自我赋值处理
if (this == &animal) {
    return *this;
}
```
#### 类使用动态内存时注意
1. 当类使用动态内存时, 必须定义一个显式复制构造函数, 为新类分配新空间并复制动态内存的内容(深拷贝)
2. 统一使用 `new` / `delete` 与 `new[]` / `delete[]`
	由于只有一个构析函数, 一般只能用一种 `delete`, 因此最好也只是用一种 `new`, 保证配对
3. 默认构造函数中, 指针一定要置空(`NULL` 与 `nullptr` 均可), 保证正常 `delete`
4. 当类使用动态内存时, 必须显式重载 `=`
#### 静态成员函数
1. 静态成员函数不能使用类变量调用
2. 不能使用 `this`
3. 只能访问静态成员
### 返回值设计
#### const 引用
1. 效率最高
2. 不能返回函数内的局部变量的引用
#### 引用
1. `<<` 与 `>>`, 配合 `cout` 等, 使效率最高
2. `=`, 实现连续赋值
3. `[]`, 模拟数组
#### 对象
需要返回局部变量时使用, 例如 `+` 运算符等
#### const 对象
如果重载 `+` 运算符仅返回对象时, 以下语法将通过
``` cpp
if(A1 + A2 = A3);//将A3赋给加法运算返回的临时变量中
``` 
### 初始化列表
```cpp
Classy::Classy(int n, int m):men1(n), men2(m), arr{n, m}
{...}
```
1. 只能用于构造函数
1. 必须使用初始化列表初始化 const 成员
1. 必须使用初始化列表初始化引用成员
1. 初始化顺序与类中声明的顺序相同
1. 必须使用初始化列表初始化没有默认构造函数的类成员
1. 允许在初始化列表中使用花括号 `{}` 初始化数组

## 第十三章
### 派生类
#### 特性
`Class Child : public Base{};`
派生类具有特征
1. 储存基类的成员
2. 可以使用基类的方法
#### 构造函数
派生类不能访问基类的私有成员, 只能通过基类的方法访问  
因此派生类必须使用基类的构造函数  
当使用基类的非默认构造函数时, 需要在初始化列表中调用  
`Child::Child(int i, int j): Base(i), men(j){};`
#### 构造与构析顺序
先构造基类, 最后构析基类
#### 基类与派生类的关系
1. 将派生类的地址赋给基类指针, 可以使用此指针调用基类函数
2. 以基类引用 / 指针为参数的函数, 可以使用派生类
3. 可以使用派生类初始化基类变量(隐式调用复制构造函数 `const&`)
4. 可以将派生类的变量赋给基类变量
#### 公有继承的使用
用于 is-a 关系
#### 不能被继承的成员
构造函数, 构析函数, `operator=`, 不会被派生类继承, 需要重新定义
### 多态继承
#### 虚函数
在基类与派生类(不一定)的有关函数声明前加上 `virtual` 关键字, 表明函数为虚函数
使用指针 / 引用调用成员函数时, 程序将根据指向的类的类型选择调用的函数
#### 调用基类的方法
1. 在派生类的函数定义中
由于虚函数的特性, 直接调用虚成员函数, 不能明确是基类或派生类的
如果要在派生类中调用基类的方法, 可以使用在方法前加上基类的域解析运算符 eg.`Base::function()`
调用基类的重载运算符需要显式使用 `Base::operator=(..)`
在为派生类定义新的 `operator=` 与复制构造函数等时, 不要忘记先调用基类的对应函数(不会自动调用)
2. 派生类的友元函数
在派生类中调用基类的方法只可通过强制类型转换, 且不可访问基类的private成员
eg. `(Base &) A.baseFun();`
#### 虚函数注意
1. 基类的构析函数必须为虚函数
当基类的指针指向派生类时, 如果构析函数不是虚函数, 将导致不能调用相应的构析函数, 导致内存泄漏
2. 构造函数没有虚函数, 没意义
3. 定义一个与基类相同的函数不是重载, 而是重新定义, 将隐藏基类的函数(包括虚函数)(即直接使用派生类无法调用这些函数, 只能使用派生类的指针/引用调用)
	1. 定义的虚函数应与基类参数应相同, 返回值也要相同, (不用于参数)例外 如果返回基类函数返回基类引用/指针, 则派生类函数可返回派生类(可以被转换)
	2. 如果基类被重载, 派生类应重新定义基类所有的版本
4. 虚函数未定义则使用最新版本的函数(多重继承中)
#### protected成员
在公有继承后, 派生类不能访问基类的 private 成员, 但可以访问 protected 成员  
可通过 protect 方法来为派生类提供操作基类的 private 成员的方法, 并保证不被直接修改
#### 纯虚函数
* 基类作为高度抽象的共性, 可能无法表明对特定函数的功能, 只能说明有着一种共性
* 此时可以通过定义纯虚函数, 表明基类为抽象基类, 此时基类不可以被直接创建
* 在虚函数声明末尾加上 = 0, 表明函数为纯虚函数, 类为抽象基类(ABC Abstract Base Class)
* 纯虚函数也强制要求派生类必须提供纯虚函数的定义, 保证派生类的多态性
#### 异形赋值
* 当有多个派生类, 在使用指向派生类的指针时, 应避免使用 `*A(childA) = *B(childB)` 赋值
* 如果 `childA` 有重载的 `operator=(base)`, 将会先把 `B` 转化为 `base` 再赋值, 导致 `B` 的数据丢失
* 可通过在 ABC 中, 将 `operator=` 设为 protected 禁止此行为
#### 类设计要求 P427
## 代码重用
### 私有继承
默认的继承方式  
基类的公有与保护成员变为派生类的私有成员, 可以将基类作为派生类的私有成员达到同样的效果(has-a 关系)
#### 访问基类
1. 派生类内访问基类的公有函数 (同共有继承)  
使用域解析运算符访问基类 `Base::fun();`
2. 访问基类本身(基类共有成员同共有派生, 可直接访问)  
强制转换 `*this`, 使其变为基类的引用 `(const Base&) *this`
3. 访问基类的友元函数 / 使用基类为参数的函数 / 派生类外访问基类的公有成员  
私有继承时, 派生类将不会自动转换为基类, 需要强制类型转换为基类的引用/指针
#### 使用私有继承的情况
大多数时候可将基类作为一个成员以达到相同效果
使用以下特性时则要使用私有继承
1. 访问 protected 成员  
私有继承下, 派生类可以访问基类的 protected 成员
2. 使用虚函数  
私有继承中可以重新定义虚函数, 但只能在类内使用(或强制转换为基类)
#### 保护继承
同私有继承, 但基类的公有与保护成员变为派生类的保护成员, 使其可以在第三代派生类中继续访问基类的公有与保护成员
### 多重继承
对于继承结构
``` cpp
class Worker{};
class Singer: public Worker{};
class Waiter: public Worker{};
class SingWaiter: public Waiter, public Singer{};
```
由于 Singer 与 Waiter 均有一个 Worker 组件, SingWaiter 将包含两个 Worker 组件
#### 防止多态的二义性
``` cpp
SingWaiter sw;
Worker* w1 = &sw;//错误, 无法明确使用哪一个的Worker组件
Worker* w2 = (Singer*)sw;//指针
Worker* w3 = (Waiter*)sw;//指针
```
#### 虚基类
实际上, SingWaiter 不应该有多个 Worker 组件, 需要使用虚基类解决
``` cpp
class SingerV: virtual public Worker{};
class WaiterV: virtual public Worker{};
class SingWaiterV: public Waiter, public Singer{};
```
此时 SingWaiter 中的 Singer 与 Waiter 将共享同一个 Worker 组件
#### 构造函数新规则
##### 使用 SingerWaiter
对于非虚继承, 只能调用上一级基类的构造函数.  
因此 SingerWaiter 只能调用 Waiter 与 Singer 的构造函数以初始化基类.
##### 使用 SingerWaiterV
对于虚基类, 可以调用调用虚基类的构造函数与上级基类的构造函数.  
且调用虚基类构造函数将覆盖上级基类的构造函数中使用虚基类的部分.  
当虚基类有默认构造函数且类中没有调用虚基类的构造函数, 将自动调用默认构造函数并覆盖上一级基类中使用虚基类的部分.  
#### 指明继承自基类的方法
在多重继承的两个基类中, 如果有同名函数, 将导致二义性
1. 通过域运算符指定 `C c; c.A::fun(); c.B::fun();`
2. 重新定义 `C::fun(){A::fun();B::fun();}`
#### 混合使用虚继承与继承
``` cpp
class example: public A, public B, virtual public C, virtual public D
{};
```
当A, B, C, D均来自同一个基类 base 时, A 与 B 将有一个独立的 base, C 与 D 将共享一个 base
### 函数模板
#### 定义模板
``` cpp
//模板函数的定义
template<typename Type>
void fun3(T)
```
#### 显式具体化
默认情况下, 编译器会根据提供的类型替换模板, 生成具体的函数.  
但可能部分类型下函数不能很好的运行需要专门定义, 即显示具体化.  
eg.
```cpp
template<typename T>
bool fun(T& a, T& b){return a > b}
```
对于char*类型可能不适用
因此需要显式具体化
```cpp
template<> bool fun<type>(type a, type b){...}
```
type 为具体化的类型, `template<>` 为具体化的必要前缀.  
fun 后的 `<type>` 可以省略, 编译器将自动识别.  
具体化的函数参数必须与模板一致.  

函数模板是没有部分具体化的
#### 具体化规则
允许函数同时存在 非模板版本, 具体化版本, 模板版本.  
编译器调用优先级 非模板版本(同名的普通函数)(未指定模板类型时) > 具体化版本 > 模板版本.  
#### 显式实例化
```cpp
template bool fun<type>(type a, type b){...}
```
默认情况下编译器会自动实例化, 也可手动显示实例化, 此时不可省略 `<type>`.  
且同一个文件中(源文件以及引用)不能同时有同一个函数的实例化与具体化.  
#### 重载解析策略
1. 匹配参数
	1. 完全匹配(函数参数完全一致)
	2. 提升转换(short->int, float->double)
	3. 标准转换(long->double, int->char)
	4. 用户自定义转换
2. 最具体
非模板版本(未指定模板类型时) > 具体化版本 > 模板版本
3. 指定使用模板版本
当函数有非模板版本时, 在函数调用前加上 `<>` 或 `<type>` 将强制使用模板版本
#### inline函数模板
```cpp
//正确写法
template<typename T>inline T min(const T&,const T&)
 
//错误写法
inline template<typename T>T min(const T&,const T&)
```
### 类模板
#### 定义模板
在将要定义为模板的函数或类的定义/声明前加上 

`template<typename(模板参数类型 此处指类型) Type(参数名, 不同于变量)>`

``` cpp
//类声明 example.h
template<typename Type>
class example
{
	void fun1(T);
	void fun2(T)
	{
		...//类内定义不需要而额外 template<typename Type>
	}
};
//成员函数定义
template<typename Type>
void example<Type>::fun1(T){}

//模板函数的定义
template<typename Type>
void fun3(T)
```
由于模板不能被编译, 因此模板不能单独编译, 必须与实例化请求一起使用(即模板类与成员函数需要放在同一个头文件中)
#### 使用模板
1. 实例化使用模板的类时必须使用 `<Type>` 指定所需的类型
2. 实例化使用模板的函数时不需要指定所需的类型, 编译器将根据函数参数的类型自动识别
3. 可以设置模板参数的默认值

eg. `template<typename a = int>`
#### 非类型参数
除了 `typename`, 模板中也可使用 `int` 等作为参数类型, 称为表达式参数.  
规定表达式参数可以是整形, 指针, 枚举或引用, 不可以是 `double`.  
在 `template<int a>` 中, `a` 不属于变量, 不能修改参数的值, 也不能使用参数的地址.  
#### 模板实例化
编译器将自动实例化使用到的模板.  
也可显式实例化.  
```cpp
template class example<type>;
```
#### 模板具体化
```cpp
template<> class example<type>{...};
...
void example<type>::fun(){}//类外定义成员函数不需要template<>
```
#### 部分具体化
当类有多个模板参数时, 可以只针对其中几个参数具体化
```cpp
template<typename targ1, int targ2, ...> class example<targ1, targ2, ..., arg1, arg2, ...>{...};
```
* `template<>` 内为没有被具体化的参数, 需要包含类型, 当 `template<>` 内为空即具体化整个模板
* `example<>` 内为具体参数(模板中的所有参数), 可以是 `template` 中的未具体化的参数
eg
```cpp
template<T1, T2> class example<T1, T2, T2>{};
```
此类具体化未 T2 与 T3 相同时的具体化
* 当有多个模板可选时, 将选择具体化程度最高的模板
#### 成员函数具体化
可以单独具体化成员
```cpp
template<> void example<type>::fun();
```
当具体化成员函数时, 允许分离具体化函数的声明与定义(不同于一般的模板
)
#### 关于具体化常量引用类型参数的模板
前提见 [常量指针引用](#常量引用)
```cpp
template<typename T>
//const T& obj要求obj所引用的值不能修改
void fun(const T& obj){...}

//指针指向const char*, 但指针本身是可以被修改的
template<> void fun<char*>(const char * & obj){...}//错误
//指针指向char*, 可以修改指针指向的内容, 但指针本身不能被修改的
template<> void fun<char*>(char *const & obj){...}//正确
template<> void fun<const char*>(const char *const & obj){...}//正确
```
#### 类内模板
C++允许成员函数或嵌套类为模板
```cpp
template<typename T>
class base
{
	template<typename U>
	class hold
	{U member;};

	hold<int> a;

	template<typename V>
	V fun(V obj){return obj;};
};
```
类外定义时注意
```cpp
template<typename T>
	template<typename U>//嵌套类的模板需要独立
	class base<T>::hold//使用带模板参数的类名与域解析运算符
	{...};

template<typename T>
	template<typename V>
	V base<T>::fun(V obj)
	{...} 
```
#### 以模板类型为参数
对于定义
```cpp
template<template<typename T> typename TT, typename U, typename V>
class exam
{
	TT<U> a;
	TT<V> b;
	TT<int> c;
};
```
此时要求类型 `TT` 需要是一个参数为 `typename` 的模板类型
且可以在 `exam` 内指定 `TT` 的模板参数
#### 模板类的友元
设模板类
```cpp
template<typename T>
class exam{...};
```
* 非模板友元
	* 可以直接使用 `friend void fun();`
	* 也可以指定特定的重载函数 `friend void fun(example<T>&);`
	注意此处 `fun` 不是模板函数, 需要有对应参数的重载的 `fun` 才能为友元
* 约束模板友元
	当友元为模板时, 友元模板的参数与类的模板参数有关  
	eg.
	```cpp
	template<typename T>
	class exam
	{
		//将模板参数传递到友元的模板中
		friend void fun1<T>();
		//将模板参数传递到友元的函数参数中
		friend void fun2<>(exam<T>&);
		//fun2的等价写法
		//编译器能够自动识别模板参数
		friend void fun2<exam<T> >(exam<T>&);
	};
	```
* 非约束模板友元
	当友元为模板时, 友元模板的参数与类的模板参数无关
	eg.
	```cpp
	template<typename T>
	class exam
	{
		// 所有fun1<U> 均为 exam<T> 的友元
		template<typename U> friend void fun1<U>();
	};
	```
#### 模板别名
##### using =
C++11 特性, 添加 `using = `语法, 实现模板别名
eg.
```cpp
//模板别名
template<typename T>
	using arr12 = std::array<T, 12>;
//通常的 using= 等价于typedef
using strp = char*;
```
##### typedef 嵌套类型
结合模板类与嵌套类型的特性实现模板别名
```cpp
template<typename T>
class root
{
	class leaf;//仅声明

	//部分编译器需要关键则typename, 明确后面的部分为类型
	typedef typename std::map<leaf, T> arr;
};

template<typename T>
class root<T>::leaf
{
	arr a_;//可以直接使用别名不需要再指定类型
};
```

## 特性
### 友元
#### 定义友元
定义一个友元时, 只要在类内使用 `friend [友元定义];`
可以在任何位置使用
#### 前向声明
由于定义友元时, 类 / 函数可能未定义 / 循环定义, 需要前向声明  
eg.
```cpp
//前向声明
class exam;

class HasFrined
{
	friend class exam;
}

class exam
{
	//exam中使用了HasFriend, 不能定义在HasFriend之前
	void fun(HasFriend&);
}
```
#### 友元成员函数
有的时候不需要整个类均为友元, 仅需要部分成员函数作为友元.  
可以使用友元成员函数.  
```cpp
friend void exam::fun();
```
### 嵌套类
定义在类内的类为嵌套类.  
只有声明在 public 中的嵌套类才能包含类外使用.  
使用嵌套类需要使用域解析运算符.  
#### 嵌套类的作用域
对于在私有部分声明的嵌套类, 在类的外部是不知道这个类的存在的, 及类外不能使用嵌套类及其指针
#### 嵌套类的访问控制
包含类不能访问嵌套类的私有元素, 但是嵌套类可以访问包含类的私有元素 

### 异常处理
#### 提前结束程序
1. `abort()` 位于 `cstdlib` 中, 调用后将向 `cerr` 输出错误信息
2. `exit()` 仅提前结束程序
#### 捕获异常
* `try`:  
`try` 块中的代码标识将被激活的特定异常, 它后面通常跟着一个或多个 `catch` 块
* `catch`:  
在您想要处理问题的地方，通过异常处理程序捕获异常. `catch` 关键字用于捕获异常.  
如果 `try` 块在不同的情境下会抛出不同的异常, 这个时候可以尝试罗列多个 `catch` 语句, 用于捕获不同类型的异常.
```cpp
try
{
   // 保护代码
}catch( [异常类型] [变量名称] )
{
   // catch 块
}catch(...)//表示任何异常
{
   // catch 块
}
```

* 也允许捕获异常类型的引用 
* `catch(...){}` 表示任意类型的异常均会被捕获
#### 抛出异常
通过关键字 `throw` 抛出异常, 抛出的异常允许是任何类型.  
当使用 `throw` 抛出异常后, 将会立即停止程序/函数(仍会执行==异常所在代码块中的构析函数==).  
并开始进行栈解退(不断退出调用序列, 找到第一个能捕捉对应异常的 `try` 模块), 在栈解退的过程中, 会逐个释放中间函数所创建的临时变量并调用相应的析构函数.  
如果没有 `try` 捕捉异常, 或对应类型的 `catch`, 将导致程序终止.  
否则将执行对应 `catch` 内的程序.  
#### 实例
```cpp
#include<iostream>
using namespace std;

double fun(double a, double b)
{
	if(b == 0)
	{
		throw "Can not div by 0";
	}
	return a/b;
}

int main()
{
	try
	{
		fun(1.2, 0);
	}
	catch(const char* str)
	{
		cout << str << endl;
	}
}
```
#### 异常规格说明
(几乎弃用的特性)
```cpp
double fun(double a, double b) throw(const char*)
{
	if(b == 0)
	{
		throw "Can not div by 0";
	}
	return a/b;
}
```
`throw(const char*)` 表明抛出的异常类型为 `const char*`
异常规格说明中允许有多种类型
不使用异常规格说明则表明可能为任意类型的异常
使用 `throw()` 表示不抛出异常
使用 `noexcept` 表示不抛出异常, 一旦使用 `throw` 将终止程序
#### 捕获异常类的引用
通常会对异常进行派生, 从而表现出不同种类与大类的异常.  
利用基类引用可以指向派生类的特点, 捕获基类引用也可达到同时捕获派生类引用的效果.  
#### C++ 标准的异常
一种继承自 `std::exception` 的类.  
定义于头文件 `stdexcept` 中.  
包含一个虚成员函数.  
```cpp
const char * what () const throw ()
```
实例
```cpp
#include <iostream>
#include <stdexcept>
using namespace std;

struct MyException : public exception
{
	MyException(const string& s)
	{
		...
	}
	const char * what () const throw ()
	{
		return "C++ Exception";
	}
};
 
int main()
{
	try
	{
		throw MyException();
	}
	catch(MyException& e)
	{
		std::cout << "MyException caught" << std::endl;
		std::cout << e.what() << std::endl;
	}
	catch(std::exception& e)
	{
		//其他的错误
	}
}
```
[其他标准异常](https://www.runoob.com/cplusplus/cpp-exceptions-handling.html)

#### 设计异常
1. 一个接收错误原因的构造函数
2. 构造函数为 `explicit`
3. 一个输出错误原因的成员函数 `what()`
4. 从对应类型的标准异常派生
5. 作为有关类的嵌套类(可以自动成为友元)
#### 管理异常
当一个异常没有被捕获时, 将会调用函数 `terminate()`
通常 `terminate()` 将直接调用 `abort()`
可以使用 `set_terminate(f)` 设置 `terminate` 的行为
`f` 为一个没有参数, 返回值为 `void` 的函数
#### 抛出异常导致的内存泄漏
```cpp
void fun()
{
	double *p = new double[100];
	throw "err";//此时 delete 不会执行, 将导致内存泄漏
	delete[] p;
}
```

析构函数中更要特别注意
通过使用智能指针管理内存以避免此问题
或见 effect C++ 有关章节
### RTTI
运行阶段类型识别
#### dynamic_cast
用于含虚函数的, 有派生关系的类
检查是否可以安全的将对象地址赋给特定类型的指针
```cpp
class child : public base
{...};
class grand : public child
{...};
grand *gr = new grand;
base *ba = new base;
//直接使用强制类型转换时, 编译器将不会检查问题
grand* p1 = dynamic_cast<grand*>(ba); //不安全, 使用 dynamic_cast 将返回空指针
grand* p2 = dynamic_cast<grand*>(gr); //安全, 返回 gr
base* p3 = dynamic_cast<base*>(gr); //安全, 返回 gr
```

##### 实例应用
```cpp
child* p4 = NULL;
base* parr[10]// 假设 parr 随机指向 base, child 与 grand
// 在一个循环中运行 child 中的成员函数 inChild
for(int i = 0; i < 10; i++)
{
	//通过此方法, 在将指针正确赋值的同时, 判断是否能够运行 inChild
	if(p4 = dynamic_cast<child*>(parr[i]))
	{
		p4->inChild();
	}
}
```

##### 对引用使用
```cpp
//注意赋值时的类型
try
{
	child& cr = dynamic_cast<base&>(ba);
}
catch(bad_cast& err)
{
...
}

```
对引用使用 `dynamic_cast` 时, 将不会返回特殊值, 而是抛出异常 `bad_cast`, 需要使用 `try` 捕捉

#### typeid 与 type_info 类
`typeid` 用于判断变量的类型, 调用返回一个 `type_info` 的引用
##### 使用方法
```cpp
if(typeid(a) === typeid(b))
{
	...
}
```
使用 `type_info` 类, 需要引用头文件 `typeinfo`.  
有成员函数 `name()`, 通常是类型名称, 但不一定, 不应直接与类型名比较.  

大部分情况下, `dynamic_cast` 可以完全取代 `typeid`.  
`typeid` 最好仅用于调试.  

#### 类型转换运算符
`cast` 即丢弃, 即告诉编译器丢弃某些特性检查

##### const_cast
用于将一个常量指针转化为普通指针
```cpp
const int* cpi = new int(10);
const double* cpd = new double(3.14);

int* pi = const_cast<int*>(cpi);// 允许, pi 可以修改 cpi 指向的值
int* pi2 = const_cast<int*>(cpd);// 不允许, const_cast 不能改变类型 
```
##### static_cast
即存在对应操作符重载函数的转换运算

该运算符也可用于明确重载函数的函数指针具体指向那个函数, 如

```cpp
int add(int i, int j){
    return i + j;
}

float add(float i, float j){
    return i + j;
}
```

对于以上的重载函数
* `static_cast<int(*)(int, int)>(&add)` 运算将其转换为 `int(*)(int, int)` 类型, 表示函数的第一个版本
* `static_cast<float(*)(float, float)>(&add)` 运算将其转换为 `float(*)(float, float)` 类型, 表示函数的第二个版本

##### reinterpret_cast
直接读取内存的强制类型转换

### 右值引用
#### 左值与右值
对于赋值运算
```cpp
int a = 10;
```

##### 左值
* 即赋值运算符左侧的值
* 在 C++ 中表示在表达式之后依然需要的变量
* 左值有地址

##### 右值
* 即赋值运算符右侧的值
* 在 C++ 中表示在表达式结束时就不再存在的临时对象
* 右值没有地址, 编译器以临时量处理

#### 右值引用
* 使用两个 `&` 表示右值引用
* 常量可以直接转变为右值, 但变量需要使用函数 `std::move` 说明其为一个右值 (变为右值后, 变量不能再使用)
* 将右值引用作为函数参数时, 说明
	1. 你可以将 `std::move` 后的变量或常量作为参数传入 (类似常量引用)
	1. 你可以直接修改这个函数参数 (与常量引用不同)
* 类型为右值引用的变量属于左值, 如果要将其向下传递, 需要再次使用 `std::move`

#### 右值引用应用
##### 浅拷贝构造函数
基于右值引用的特性, 可以定义出一套严格的浅拷贝函数, 保证程序的高效
```cpp
class example
{
private:
res* ptr;

public:
example(example&& obj):
ptr(obj.ptr)
{
	// 提前置空, 防止 obj 构析导致 ptr 销毁
	obj.ptr = nullptr;
}

example& operator=(example&& obj) {
	ptr = obj.ptr;
	obj.ptr = nullptr;
	return this;
}

};
```

##### 数据结构赋值
向数据结构插入值时, 可能插入后原值就不再需要, 因此可以以右值引用为参数

### 智能指针
[参考](https://learn.microsoft.com/zh-cn/cpp/cpp/smart-pointers-modern-cpp?source=recommendations&view=msvc-170)

* 智能指针是一系列来自头文件 `<memory>` 的对象

#### 智能指针特性
* 智能指针可以用于管理指针, 防止指针忘记释放与裸指针造成危害
* 智能指针以其封装的指针指向的资源类型为模板
* 可以像普通指针使用 `->` 运算符访问指针资源
* 可以使用 `*` 运算符直接访问资源
* 当智能指针生命周期结束将会被自动销毁 (利用构析函数, 保证指针即使销毁)
* 智能指针使用 `delete` 销毁资源, 因此最好使用 `new` 创建资源 (不创建数组或采用 `make_unique`)
* 智能指针以指针为参数的构造函数为 `explict` 型, 表明不会在函数传参 / 赋值操作中隐式转换, 需要显示调用构造函数
```cpp
int* a = new int(100);
// 允许
std::unique_ptr<int> ptr(a); 
// 不允许
std::unique_ptr<int> ptr = a; 
```

#### 独占智能指针
`unique_ptr` 独享指针的资源, 不可复制 / 直接赋值
```cpp
std::unique_ptr<T> ptr(T*)
```

`unique_ptr` 可以将指针地址作为构造函数, 也可以使用 `make_unique` 创建 (用法类似 new)
```cpp
class nums
{
int _a, _b;
public:
	nums(int a, int b):
	_a(a), _b(b){
	}
};

int main(){
	unique_ptr<nums> ptr = make_unique<nums>(1, 2);
	return 0;
}

```

应使用 `std::move()` 方法转移控制权
```cpp
unique_ptr<int> p(new int(5));
unique_ptr<int> p2 = std::move(p);
```

当遍历以 `unique_ptr` 为对象的数据结构时, 应当使用引用的方式 (没有复制构造函数)
```cpp
vector<unique_ptr<int>> arr;

arr.push_back(make_unique<int>(1)); 
arr.push_back(make_unique<int>(2)); 
arr.push_back(make_unique<int>(3)); 
arr.push_back(make_unique<int>(4));

// 使用引用迭代变量
for (const auto& iter : arr)
{
    cout << *iter << endl; 
}    
```

可以使用 `make_unique` 创建数组, 但无法为创建的数组指定初始值
```cpp
auto p = make_unique<int[]>(5);

for (int i = 0; i < 5; ++i)
{
    p[i] = i;
    cout << p[i] << endl;
}
```

其他有关操作
* 使用成员函数 `release()` 可以释放 `unique_ptr` 对指针的控制权, 返回保存的原始指针
* 使用成员函数 `reset(pointer)` 可以修改 `unique_ptr` 管理的指针, 并且原先的指针将被删除
* `bool` 类型转换中, 如果 `unique_ptr` 管理指针则返回 `true`, 否则返回 `false` (管理的指针为 `nullptr`)

#### 共享智能指针
* `share_ptr` 采用引用计数法, 当指针的管理对象被全部销毁时, 才会销毁指针
* 当资源的使用者只是临时调用, 则需要引用传递 (一般函数)
* 当资源的使用者需要保存资源, 长期使用, 则需要按值传递 (构造函数 / 提取数据并保存)
```cpp
std::share_ptr<T> ptr(T*)
```

`share_ptr` 允许相互赋值, 或将指针作为参数构造对象, 但最好使用 `make_share` 构建智能指针, 减少构造开销
```cpp
auto sp1 = make_shared<int>(10);
shared_ptr<int> sp2(new int(20));

auto sp3 = sp1;
auto sp4(sp1);
```

`share_ptr` 重载了 `==` 运算符, 当其引用同一个指针时, 返回 `true`
```cpp
auto sp1 = make_shared<int>(10);
shared_ptr<int> sp2(new int(10));
auto sp3 = sp1;

if(sp1 == sp3) ...; // 返回 true, 来自同一个资源
if(sp1 == sp2) ...; // 返回 false
```

如果两个类可以相互管理, 则 `share_ptr` 可能导致循环引用. 
示例中, `father` 与 `son` 在函数结束时仅删除了一次引用, 没有释放资源. 
```cpp
struct Father
{
    shared_ptr<Son> son_;
};

struct Son
{
    shared_ptr<Father> father_;
};

int main()
{
    auto father = make_shared<Father>();
    auto son = make_shared<Son>();

    father->son_ = son;
    son->father_ = father;

    return 0;
}
```
为了解决问题, 需要引入 `weak_ptr`, 作用与 `share_ptr` 相同, 但不会添加引用计数
```cpp
struct Son
{
    weak_ptr<Father> father_;
};
```

其他有关操作
* 使用成员函数 `reset(pointer)` 可以修改 `share_ptr` 管理的指针, 并且原先的指针将被删除, 并置为 `nullptr`
* 使用成员函数 `use_count` 可以获取有多少个 `share_ptr` 共享资源
* 使用成员函数 `get` 可以获取资源的原始指针
* `bool` 类型转换中, 如果 `share_ptr` 管理指针则返回 `true`, 否则返回 `false` (管理的指针为 `nullptr`)

#### 使用情况
* 当要提取一个数据结构中符合条件的资源, 并组成一个新的数组, 适合采用共享智能指针
* 当一个资源会被多个对象共享时, 适合采用共享智能指针
* 当可能循环引用时, 应当避免循环引用, 获将不重要的一个对象的成员改为 `weak_ptr`
* 对于其他一般情况, 如创建一个不定长的数组等, 都适合采用独占智能指针

### 函数包装模板与 lambda 表达式
[参考](https://learn.microsoft.com/zh-cn/cpp/cpp/lambda-expressions-in-cpp?source=recommendations&view=msvc-170)

#### lambda 表达式
本质为一个类, 并通过重载 `()` 运算符的方式而可视为一个函数

##### lambda 表达式基本格式
`[捕获列表](参数列表)可变规格 -> 返回类型 {函数体}`

1. 参数列表与函数体 与一般函数类似
1. 返回类型 通常可以省略, 编译器将自动推断
1. 可变规格 目前有标识符 `mutable`, 默认省略, 表示函数为 `const` 成员函数
1. 捕获列表 规定 lambda 表达式如何访问外部的值

##### 捕获列表详解
1. `[]` 表示不捕获任何值
1. `[var]` 表示按值捕获变量 `var`
1. `[=]` 表示按值捕获父作用域的所有变量
1. `[&var]` 表示按引用捕获变量 `var`
1. `[&]` 表示按引用捕获父作用域的所有变量
1. `[this]` 表示捕获对象成员
	* 注意, 此处不仅是捕获指针 `this`
	* 如果 `this` 被捕获, 将可以直接访问类的成员, 不需要通过 `this` 指针
	* 类函数内定义的 `lambda` 表达式视为类的友元, 因此捕获 `this` 后可以直接访问私有成员
	* `[=]` 将隐式地捕获 `this`
1. `[=, &var1, &var2]` 表示引用捕获 `var1` 与 `var2`, 按值捕获其他变量
1. `[&, var1, var2]` 表示按值捕获 `var1` 与 `var2`, 引用捕获其他变量
* 不允许重复捕获, 如 `[=, var]`, 将导致错误
* 捕获的本质为将捕获的值作为对象成员保存在 `lambda` 表达式所生成的类中

##### 可变规格
* 目前有标识符 `mutable`
* 没有 `mutable` 时, 认为重载 `()` 运算符的函数为 `const`, 因此无法修改捕获的值 (即对象成员)
* 使用 `mutable` 后, 重载 `()` 运算符的函数没有修饰, 可以修改捕获值

##### 定义 lambda 表达式
###### 使用 auto 语法
```cpp
auto add = [](int a, int b){return a + b;};
```

###### 函数包装器
```cpp
std::function<int(int, int)> add = [](int a, int b)
{
	return a + b;
};
```
如果要将 lambda 表达式作为函数的参数, 则需要使用 `std::function`

##### lambda 表达式适用范围
1. 可以在函数内定义 lambda 表达式
1. 可以嵌套定义 lambda 表达式
1. 利用 `function`, 可以将 lambda 表达式作为参数传递
1. lambda 表达式可以配合模板使用
```cpp
template <typename T>
void print_all(const vector<T>& v)
{
    for_each(v.begin(), v.end(), [](const T& n) 
	{ 
		cout << n << endl; 
	});
}
```

##### lambda 表达式应用
在头文件 `<algorithm>` 中, 有与 lambda 表达式配合的函数
1. `for_each` 函数中使用了 lambda 表达式遍历数据结构
1. `find_if` 函数中使用了 lambda 遍历数据结构查找符合的元素
1. `sort` 规定 `sort` 的比较函数

#### 函数包装模板
* 定义于头文件 `<functional>`
* 可用于包装 函数, 函数指针, 函数对象 (重载 `()` 运算符), lambda 表达式
* 需要在 `function` 的模板中定义函数的返回值与参数
```cpp
std::function<返回值(参数 1 类型, 参数 2 类型, ...)>
```

##### 包装一般函数
1. 对于普通函数, 直接使用 `函数名`
1. 对于模板函数, 使用 `函数名<模板参数>`
1. 对于静态成员, 使用 `类名::函数名`

##### 其他包装
1. 对于 lambda 表达式, 直接等于号构造
1. 对于空函数, 以 `nullptr` 作为参数传入, 此时调用将导致异常
1. 对于函数对象, 以函数对象的实例作为参数传入

##### bind 函数
[参考](https://learn.microsoft.com/zh-cn/cpp/standard-library/functional-functions?view=msvc-170)
bind 函数是一个用于包装函数, 将函数缩小化的工具, 也可用于绑定成员函数

###### 包装一般函数
`bind(函数指针, 函数参数)`
* 可以指定具体的函数参数, 也可以使用占位符 `placeholders::_n` (从 1 开始)
* 当使用占位符时, 将作为返回函数的参数出现
* 被包装函数有多少个参数时, 给出多少个参数 / 占位符  
eg.
```cpp
int add(int a, int b) {return a + b;}

int main()
{
	// 此时 fun 相当于函数
	// fun(int a){return a + 10;}
	function<int(int)> fun =
		bind(add, placeholders::_1, 10);
	return 0;
}
```

###### 包装成员函数
`bind(成员函数指针, 对象实例指针, placeholders::_1, ...)`
* 其他与一般函数类似, 但第一个参数为对象实例指针

### 常量表达式
[参考](https://learn.microsoft.com/zh-cn/cpp/cpp/constexpr-cpp?view=msvc-170)
1. 使用关键字 `constexper` 表示, 可用于修饰变量, 函数, 构造函数, 模板等
1. 常量表达式将会在编译时就进行运算, 以此减少运行时的消耗
1. 大部分情况下, 常量表达式等价于常量 const

#### constexpr 变量
1. 常量表达式变量必须是文本类型, 即满足以下规则的类型
	1. `void`
	1. 标量类型 (`int` 等)
	1. 引用, 指针(定义为 `constexpr` 时, 指针本身也视为常量, 以此 `constexpr const char*` 表示指向的值不能改变, 指针本身也不可改变)
	1. 以上类型的数组
	1. 具有 constexper 构造函数且不移动或复制构造的类, ==并且使用默认构造函数==
1. 常量表达式必须在声明时初始化
1. 类必须使用 constexper 构造函数初始化, 并且 constexper 构造函数必须是内联函数 (定义在类体内)
1. 初始化值必须是 const 或 constexper 及其函数 / 计算结果
1. 注意常量表达式不可用于修饰成员, 只有构造函数是常量表达式即可

#### constexpr 函数
1. constexpr 函数是在使用需要它的代码时，可在编译时计算其返回值的函数
1. 当用函数参数为 constexpr 时, 将在编译时计算结果, 返回 constexpr
1. 否则将和一般函数相同, 在运行时计算
1. constexpr 函数将通过隐式方式 `inline`
1. constexpr 函数具有以下要求
	1. 参数为按值传递或常量引用, 常量引用数组
	1. 允许递归, 循环语句, `if`, `switch` 等
	1. 不允许 `try`, `goto`

### constexpr 实例
```cpp
// 计算乘方, 使用常量引用传递值
constexpr float exp2(const float& x, const int& n)
{
    return n == 0 ? 1 :
        n % 2 == 0 ? exp2(x * x, n / 2) :
        exp2(x * x, (n - 1) / 2) * x;
}

// 获取数组长度
template<typename T, int N>
constexpr int length(const T(&)[N])
{
    return N;
}

// 递归
constexpr int fac(int n)
{
    return n == 1 ? 1 : n * fac(n - 1);
}

// 构造函数
class Foo
{
public:
    constexpr explicit Foo(int i) : _i(i) {}
    constexpr int GetValue() const
    {
        return _i + _c;
    }
private:
    int _i;

	static constexpr int _c = 10; 
};

int main()
{
    // foo is const:
    constexpr Foo foo(5);
    // foo = Foo(6); //Error!

    // Compile time:
    constexpr float x = exp2(5, 3);
    constexpr float y { exp2(2, 5) };
    constexpr int val = foo.GetValue();
    constexpr int f5 = fac(5);
}
```
