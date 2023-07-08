# 0
## 定义头文件避免多次包含
使用
```cpp
#ifndef LIBRARY
#define LIBRARY
...//头文件
#endif
```
## 使用set
使用set时, 由于set通过黑红树的比较实现
内部元素的大小关系不能改变
因此不能使用iterator修改set内的元素
如果要修改set内的元素, 可以使用以下方案
1. 改用map
2. 将被修改的成员设为mutable, 通过const函数修改



# 1
## 2 使用const, enum, inline 替换#define
### 常量字符串
定义一个常量字符串 str
const char* str = "something";
const char* 仅保证 str 所指向的内容不能被修改, 但str仍可能被修改
需要使用 const char *const str = "something";
保证str储存的地址也不会被修改
更好的方法:
使用const std::string str("something");
### class 专属常量
1. static const
```cpp
class exam
{
    static const int num1 = 10;//类内定义(可能不支持)
    static const int num2;//类外定义
};
const int exam::num2 = 20;
```
2. enum
```cpp
class exam
{
private:
    enum{num3 = 30};
};
```
enum 只能用于 整形常量, 但无法获取地址, 更类似 #define
### 宏
```cpp
#define MAX_DEF(a, b) a > b ? a : b

template<typename T>
inline T& MAX_INLINE(T &a, T &b)
{
    return a > b ? a : b;s
}
```
## 使用 const
### 限定的内容
1. const char* str;
2. char* const str;
3. const char const* str
### STL迭代器 与 const
```cpp
//表示 it 不能被改变
const std::vector<int>::iterator it = vec.begin();
//表示 it 可以被改变, 但it指向的内容不可以被改变
std::vector<int>::const_iterator it = vec.begin();
```
### 返回 const
```cpp
const exam fun(const exam& l, const exam& r);
```
通过返回const值, 可以避免 fun(a, b) = c; 通过编译
### const 成员函数
1. 编写const 成员函数 可以重载 non-const 成员函数
const类型的变量常用于 const & 传参, 因此编写const 成员函数十分重要
```cpp
char& operatror[](std::size_t pos);
//const成员必须返回const char&, 避免潜在的修改const变量的风险
const char& operatror[](std::size_t pos) const;
```
对于中间变量可以使用mutable修饰
2. 重载 const 与 non-const 版本的函数
在编写这两个函数时, 不应该完全重新写一遍, 而要注意代码重用
## 初始化对象/变量
1. 在定义了一个变量后必须立即初始化
2. 在构造函数中使用初始化列表
    * 当成员为类时, 如果不使用初始化列表, 将会先调用其默认构造函数数, 导致效率低下
    * 如果必须在函数体中为成员赋值, 也应该在初始化列表中使用默认的初始化数eg.exam::exam():menber(){}
    * 由于初始化一定是按成员定义的顺序进行, 因此初始化列表有必要按成员定义的顺序排列
3. 由于class内的static初始化与使用发生在不同cpp文件中, 被调用时可能仍未初始化, 因此应使用成员函数内的static变量模拟, 保证其初始化
eg.
```cpp
class example
{
public:
    std::string& static_str()
    {
        static string str;
        return str;
    }
};
```
# 2
## 注意C++默认编写并调用的函数
定义一个类后, 如果没有声明以下函数, 编译器将会自动生成
1. 默认构造函数
2. 拷贝构造函数
3. 构析函数
4. operator=

* 当类中有这些函数的声明时, 将不会自动生成
* 如果类中有引用成员或常量成员, 2, 4将不会自动生成(引用与常量无法修改)
* 当类使用动态内存时, 务必主动定义这四个被默认创建的函数
## 拒绝使用编译器自动生成的函数
### 声明为private但不实现
```cpp
class example
{
private:
    example& operator=(const example&);
    example(const example&);
};
```
通过声明, 从而阻止自动生成; 通过将其作为private成员, 从而阻止外部调用
只声明不定义, 仍可能在友元中调用并导致link错误, 但影响不大
### 定义基类Uncopyable
```cpp
class Uncopyable
{
protected:
    Uncopyable();
    ~Uncopyable();
private:
    Uncopyable(const Uncopyable&);
    Uncopyable& operator=(const Uncopyable&);
};
```
通过继承Uncopyable, 可以保证类的拷贝构造函数与=运算符不被使用
## 为基类声明虚析构函数
1. 抽象基类指针通常用于指向派生类, 如果析构函数不是虚函数, 将导致派生类无法被正确析构, 导致内存泄露
2. 派生时, 必须保证所有基类都有一个虚析构函数, 如stl中大部分容器都没有虚析构函数, 因此不能将其作为基类
3. 如果类中没有虚函数(无多态), 则不应该有虚基类, 否则将导致无效的内存消耗(额外的空间存储虚函数列表)
## 不在析构函数中抛出异常
构析函数常用于释放内存, 一旦在析构函数中抛出异常, 将导致内粗无法被完全释放, 从而导致内存泄漏
因此需要提前捕获所有异常, 注意所有可能抛出异常的函数都要捕获
eg.
```cpp
example::~example()
{
    try
    {
        ...//可能发生异常的部分1
    }
    catch(...)//方法1: 捕获所有异常
    {
        std::abort();//捕获异常后, 提前结束程序
    }

    try
    {
        ...//可能发生异常的部分2
    }
    catch(...)//捕获所有异常
    {
        ...//方法2: 解决异常并释放内存
    }
}
```
## 不在析构/构造函数中调用virtual函数
派生类的构造函数中会首先调用基类的构造函数; 析构函数中会最后调用基类的析构函数
派生类调用基类的函数时, 认为是派生类在调用, 因此如果基类的构造/析构函数中有虚函数, 将会调用派生类的版本
如果派生类的版本中使用了非派生的成员, 必定未初始化, 这将导致结果不可预知
注意, 不仅是不能调用虚函数, 还包括调用使用了虚函数的成员函数
eg.
```cpp
class example
{
public:
    virtual void fun(){...}
    void init(){fun();}
    example(){init()}//将隐式调用虚函数fun, 仍将导致危险
};
```
### 部分情况的替代方案
```cpp
class example
{
public:
    virtual void CreateLog(){std::cout << "base create";}
    example(){CreateLog();}
};
class child: public example
{
public:
    virtual void CreateLog(){std::cout << "child create";}
    child(){CreateLog();}
};
```
改为
```cpp
class example
{
public:
    static void Log(const std::string& log){std::cout << log;}
    example(){Log("base create");}
};
class child: public example
{
public:
    child():example("child create"){}
};
```
## operator= 返回 *this
为了实现连续赋值, = 运算符应返回一个 = 左侧的引用
对于+=, *= 等也应该有同样的操作
## 安全的 operator=
现有类
```cpp
class example
{
private:
    std::string* str;
public:
    example& operator= (const example&);
};
//不安全
example& example::operator= (const example& obj)
{
    delete str;
    str = new std::string(*obj.str);    
    return *this;
}
```
### 自我赋值安全性
如果使用不安全的例子
当自我赋值时, str 与 obj.str 指向同一块内存
如果 delete str, obj.str 将指向一个已删除的对象
导致 new std::string(*obj.str); 出错
```cpp
example& example::operator= (const example& obj)
{
    // 先逐个判断是否使用同一个内存
    if(str != obj.str)
    {
        delete str;
        str = new std::string(*obj.str);   
    }

    return *this;
}
```
### 异常安全性
如果使用不安全的例子
当 new std::string(*obj.str); 发生异常, 构析函数将提前结束
对于 str = new std::string(*obj.str);
先执行 new std::string(*obj.str);
再将地址赋给 str
当 new std::string(*obj.str); 发生异常
不会执行赋值
此时 str 储存的地址不会变, 将指向一个已删除的对象
```cpp
example& example::operator= (const example& obj)
{
    // 使用一个临时的变量保存旧的地址
    std::string* tmpPtr = str;
    // 即使发生异常, str 仍将指向旧的对象
    str = new std::string(*obj.str);
    delete tmpPtr;
    return *this;
}
```
当使用上述方案时, 自我赋值安全性也将得到保障
当自我赋值仍将导致额外的消耗
### 结合方案
```cpp
example& example::operator= (const example& obj)
{
    // 此处直接比较两个对象是否是同一个对象
    // 无法避免指向同一对象的成员的自我赋值
    // 当避免逐个比较, 效率更高
    // 且通过解决异常安全性避免指向同一对象的成员的自我赋值
    if(this != &obj)
    {
        std::string* tmpPtr = str;
        str = new std::string(*obj.str);
        delete tmpPtr;
    }
    return *this;
}
```
注意, 对于每一个指针成员, 都应该使用此方法
### 特殊方案
假设example有成员 swap(const example& obj)
可以交换 obj 与 this
```cpp
example& example::operator= (const example& obj)
{
    if(this != &obj)
    {
        example tmp(obj);
        //此时 tmp 保存了旧的 this, 并在最后被析构 
        swap(tmp);
    }
    return *this;
}
```
## 复制每一个成员
对于两类复制函数
operator=() 与 复制构造函数需要特别注意
### 类中的所有成员
逐一检查类中的所有成员是否被复制
### 基类中的成员
1. 复制构造函数
注意调用基类的复制构造函数, 否则将调用基类的默认构造函数
```cpp
example::example(const example& obj):
member(obj.member),
base(obj)//将复制来源作为参数初始化基类
{}
```
2. operator=()
```cpp
example& example::operator= (const example& obj)
{
    //注意调用基类的 = 以对基类成员赋值
    base::operator=(obj);
    member = obj.member;
    return *this;
}
```

# 3
## 使用对象/智能指针管理动态内存
对于函数
```cpp
void fun()
{
    bool flag1 = true, flag2 = true;
    example* ptr = new example();
    ...
    //以下两种情况将导致ptr指向的资源不能正常释放
    if(flag1) return;
    if(flag2) throw "error";
    delete ptr;
    return;
}
```
利用构析函数必定会在 throw/return 后执行的特性
通过类管理动态内存, 从而保证动态内存的正确释放
即在构造函数中申请内存, 在析构函数中释放内存
## 注意动态内存管理类的复制行为
在编写动态内存管理类时
1. 禁止复制
将 Uncopyable 作为基类 
2. 采用引用计数
std::shared_ptr
3. 复制底部资源
4. 转移指向对象的所有权
std::unique_ptr
## 动态内存管理类中提供对原始资源的访问
由于可能有大量api使用原始资源的指针为参数
因此需要提供对原始资源的访问
通常为成员函数 get()
不应该编写隐式转换函数, 这将导致风险
## 使用相同形式的new 与 delete
```cpp
typedef std::string strarr[4];//对数组使用typedef, 应在别名处规定长度

std::string* ptr1 = new std::string;
std::string* ptr2 = new std::string[4];
std::string* ptr3 = new strarr;//即std::string[4]

//不能使用delete[], 否则将导致错误
delete ptr1;
//不能使用delete, 否则只有第一个元素被释放
delete[] ptr2;
delete[] ptr3;
```
对于std中的智能指针, 默认使用 delete, 而不是 delete[]
因此智能指针不能直接用于数组
应采用 std::vector 或 std::string

