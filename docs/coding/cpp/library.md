# C++ 实用库的使用与介绍
## 规范化注释 Doxygen 简介
此处仅介绍与 vscode 适配的 Doxygen 注释方法, 不一定满足标准 Doxygen 的要求  

对于更高级的使用以及文档生成参见其他教程

### 基本使用
* 对于多行注释
    * 使用 `/** ... */` 包含
    * 多行注释每行均以 ` * ` 为开始
    * 在行的开始使用 `@<xxx>` 表示注释结构, 同一行后的内容即注释结构的内容
    * 在注释后紧接被注释的内容
* 对于单行注释
    * 使用 `/**< ... */`
    * 与被注释内容位于同一行, 注释位于内容后

建议配合插件 [Doxygen Documentation Generator](https://marketplace.visualstudio.com/items?itemName=cschlosser.doxdocgen) 使用
* 仅需输入 `/**` 在加上空格可自动展开 Doxygen 注释
* 输入 `@` 可显示注释结构的提示

### 常用注释项
函数注释
* `brief` 对函数的简单介绍, 通常仅有一句话, 也可用于类的注释
* `param` 函数变量, 可以添加后缀 `[in]` 或 `[out]` 表明变量类型
* `return` 函数返回值描述
* `note` 函数备注, 可以写入关于函数的详细说明
* `warning` 使用警告

文件注释
* `file` 文件名
* `author` 文件作者
* `date` 修改日期
* `brief` 文件简单说明

变量注释
* 使用单行注释, 没有注释结构

### 注释中使用 Markdown
在 vscode 的 Doxygen 预览中支持以下的 Markdown 标签
* 多行文本  
上一行以两个空格为结尾, 且下一行内容使用相同的注释结构
* 删除线  
使用 `~` 包裹内容, 例如 `~aaa~`
* 行内代码  
使用 `` ` `` 包裹内容, 例如 `` `aaa` ``
* 超链接  
使用 `[]` 包裹内容并在之后以 `()` 包裹连接, 例如 `[aaa](a.cpp)`
* 列表  
列表各行以相同注释结构开始, 并在行首接 `-` 

## 正则表达式 std::regex
### 使用
使用时确保使用的标准为 C++11 以上

```cpp
#include <regex>
```
### 字符转义
正则表达式用的\字符在C++字符串中需要经过转义 `\\`
### 匹配函数
#### regex_match
match是全文匹配，即要求整个字符串符合匹配规则。
### 参考
<https://blog.csdn.net/qq_34802416/article/details/79307102>
<http://www.cplusplus.com/reference/regex/>

## 格式化输出 fmt
对于 C++20 以上的标准, 可使用 std::format  

提供了类似 [Python 格式化字符串](/coding/py/base/base.md#转义与格式化)功能  
以及格式控制, 字符颜色等功能  
参考文档 <https://github.com/fmtlib/fmt>

通过函数 `fmt::print()` 输出格式化内容  
通过函数 `fmt::format()` 将字符串格式化  
通过函数 `fmt::output_file()` 将格式化内容输出到文件 

注意基本格式化方式为 `{[参数序号]:[格式化符号]}`  
参数序号从 0 开始索引
参数与格式化符号必须用 `:` 分开  

以下为几个与 Python 不同的使用技巧  

### 特殊使用技巧
参考文章 <https://blog.csdn.net/laoki/article/details/131605923>

* 格式化函数中的参数除了用于格式化, 还能用作格式化符号中的参数
* 当直接使用格式化符号生成特殊文字时, 可以传入一个空的字符串

使用方法见如下例子

```c++
fmt::print(
  "┌{0:─^{2}}┐\n│{1: ^{2}}│\n└{0:─^{2}}┘\n", "", "Hello, world!", 20);
```

输出结果

```text
┌────────────────────┐
│   Hello, world!    │
└────────────────────┘
```

### 参数绑定
除了参数序号, 还可使用 `fmt::arg(参数名, 参数值)` 作为格式化函数的参数, 实现对参数的绑定  
此时可直接使用参数名, 而不适用参数序号

### 打印当前时间
参考文章 <https://blog.csdn.net/laoki/article/details/131605903>

打印时间时, 需要导入头文件 `#include <fmt/chrono.h>`  

推荐使用 fmt 内定义的函数获取 `std::time_t` 变量的时间

```c++
// 比 std::localtime 而言, 线程安全
// 获取当地时区下的时间结构体
std::tm fmt::localtime(std::time_t time)

// 比 std::gmtime 而言, 线程安全
// 获取格林尼治时间下的时间结构体
std::tm fmt::gmtime(std::time_t time)
``` 

对于时间结构体 `std::tm`, 会使用类似 [strftime](https://cplusplus.com/reference/ctime/strftime/) 的方式对格式化符号进行转义  
常用格式化符号 `{:%Y-%m-%d-%H:%M%S}`, 即显示年月日时分秒 (注意其中的 `:` 通常不能出现在文件名中)

### 打印数组
参考文章 <https://blog.csdn.net/laoki/article/details/131605974>

打印时间时, 需要导入头文件 `#include <fmt/range.h>`  
可用于打印 `std::vector` 与 `std::array` 等顺序存储的列表

打印时参数与格式化符号必须用 `::` 分开 (注意与一般变量不同)  
并且格式化符号对列表中每个字符生效, 并使用 `[]` 包括, `,` 分隔各个元素

## 日志打印 spdlog
内置了 fmt 的日志打印模块    
参考文档 <https://github.com/gabime/spdlog>  
参考文档 <https://javaforall.cn/152339.html>

### 日志级别
以下为常用的日志等级, 以及对应的宏  
日志等级从上到下增大

```c++
namespace level
{
    enum level_enum : int
    {
        // 用于 debug 的信息
        debug = SPDLOG_LEVEL_DEBUG,
        // 一般信息
        info = SPDLOG_LEVEL_INFO,
        // 警告
        warn = SPDLOG_LEVEL_WARN,
        // 错误, 函数名中使用 error
        err = SPDLOG_LEVEL_ERROR,
    };    
}

```

### 基本使用
对于默认的日志对象, 默认将直接输出日志信息到 `stdout` 中  
通过 `spdlog::[日志等级 小写]([日志信息]);` 即可直接输出日志信息到 `stdout` 中, 日志信息内置了 [fmt](#格式化输出-fmt) 以实现格式化  
当日志模板 (pattern) 中包含了文件, 所在函数, 代码所在行等编译前信息, 则需要使用宏 `SPDLOG_[日志等级 大写]([日志信息]);`

注意一般创建的日志对象均为 `shared` 指针, 通过对象的成员函数输出日志  
一般情况下使用 `logger->[日志等级 小写]([日志信息]);` 记录日志  
当日志模板 (pattern) 中包含了编译前信息, 则需要使用宏 `SPDLOG_LOG_[日志等级 大写](logger, [日志信息]);`

### 日志对象
创建日志对象时, 其后缀 `_mt` 表示多线程安全  
`_st` 表示仅用于单线程, 但效率高

#### 基本日志对象  
基本日志对象直接将日志输入到文件中, 当文件存在时, 则向文件末尾补充  

```cpp
#include "spdlog/sinks/basic_file_sink.h"
auto logger = spdlog::basic_logger_mt("[日志注册名]", "[日志文件路径与名称]");
```

#### 每日日志对象  
每日日志对象将在每天的特定时间创建一个新的日志  
新的日志将在名称末尾附带创建日期

```cpp
#include "spdlog/sinks/daily_file_sink.h"
auto logger = spdlog::daily_logger_mt("[日志注册名]", "[日志文件路径与名称]", [创建时间 小时], [创建时间 分]);
```

#### 循环日志对象
当日志文件超过设定大小时自动生成一个新的日志, 最多保留指定数目的日志文件  
新的日志将在名称末尾附带序号

```cpp
#include "spdlog/sinks/rotating_file_sink.h"
auto logger = spdlog::rotating_logger_mt("[日志注册名]", "[日志文件路径与名称]", [最大文件大小 单位字节], [最多文件数]);
```

### 日志设置
#### 最低等级
通过 `logger->set_level([最低等级])` 设置日志对象输出的最低日志等级  
通过 `spdlog::set_level([最低等级])` 设置默认日志输出 (stdout) 的最低日志等级  

对于通过宏实现的输出, 还需要在引用有关头文件前定义宏 `#define SPDLOG_ACTIVE_LEVEL SPDLOG_LEVEL_[最低等级]` 确定输出的最低等级

#### 输出格式
通过 `logger->set_pattern([格式字符串])` 设置日志对象输出的格式  
通过 `spdlog::set_pattern([格式字符串])` 设置默认日志输出 (stdout) 的输出格式   

常用格式化字符有  
* `%v` 日志内容
* `%D` 当前日期
* `%T` 当前时间, 其余有关时间的格式化字符类似 [strftime](https://cplusplus.com/reference/ctime/strftime/)
* `%l` 日志等级
* `%n` 日志注册名称
* `%s` 代码文件名 (需要通过宏输出才能显示)
* `%#` 代码所在行 (需要通过宏输出才能显示)
* `%!` 代码所在函数 (需要通过宏输出才能显示)
* `%o, %i, %O` 上条日志所经过时间, 单位分别为 微秒, 毫秒, 秒

默认情况下的格式为 `"[2014-10-31 23:46:59.678] [mylogger] [info] Some message"`

其他格式字符见 <https://github.com/gabime/spdlog/wiki/3.-Custom-formatting#pattern-flags>  
通过合理的输出格式设置, 还可实现 json 形式的输出日志 <https://github.com/gabime/spdlog/wiki/Setting-up-JSON-logging-with-spdlog>

### 格式化相关
日志信息内置了 [fmt](#格式化输出-fmt) 来实现格式化输出  
对于使用了 fmt 的特定功能时, 需要引入对应的头文件, 如 `fmt/range.h` 等

## 路径操作 filesystem
对于 C++17 以上的标准, 可使用 std::filesystem  
对于其余情况, 可使用 boost-filesystem    
参考文档 <https://blog.csdn.net/A_L_A_N/article/details/85626296>

## 时间与日期表示 std::chrono
参考 <https://zhuanlan.zhihu.com/p/679451085>

中 C11 后, C++ 提供了标准库 `<chrono>` 用于提供与时间相关的工具  
作为一个基础组件, 该库被用于 [std::thread](#并发编程) 等众多标准库中

该标准库中, 为了兼容而引用了 C++ 的经典时间库 `ctime`, 但不建议直接使用旧的时间库

### 时间段
#### 创建时间段
时间段类 `std::chrono::duration` 可用于表示一段时间长度  
相比于一般直接使用整数, 该类型可以高精度的表示不同单位的时间, 并且支持时间间的运算  

一般不直接构造时间段类, 而是使用表示特定单位的别名, 并传入==整数值==参数 `rep`, 共同表示一个时长, 常用的有
* `std::chrono::microseconds(rep)` 使用微秒单位
* `std::chrono::milliseconds(rep)` 使用毫秒单位
* `std::chrono::seconds(rep)` 使用秒单位
* `std::chrono::minutes(rep)` 使用分钟单位
* `std::chrono::hours(rep)` 使用小时单位
* 更多参见[文档](https://zh.cppreference.com/w/cpp/chrono/duration)

#### 时间段操作
时间段类对运算符进行了重载, 支持
* 两个时间段之间的加减运算 (结果的时间单位将使用参与运算的两个时间中单位较小的一个)
* 两个时间段之间的比较
* 时间段与整数之间的数乘或整除

成员函数 `count()` 获取时间段在当前单位下的长度
* 可以配合 `std::chrono::duration_cast` 函数, 获取一个时间段对象在不同单位下的长度
* 通常返回值类型为 `int64`

函数 `std::chrono::duration_cast<ToDuration>(const& d)` 可用于转换时段段单位
* `ToDuration` 目标时间段单位, 参考[创建时间段](#创建时间段)中的单位别名
* `d` 被转换的时间段对象
* 返回转换结果的时间段对象, 由于时间长度一定是整数, 因此向更大的单位转换时将向下取整

### 时间戳与时钟
在 `chrono` 中, 通过类 `std::chrono::system_clock` 表示系统时钟  
虽然其为一个类, 但无法构造, 一般都是通过其下的静态成员函数访问时钟, 更类似一个模块

除了系统时钟外, 还有不同的时钟可以使用, 使用方式与系统时钟相同 (不同时钟间的时间戳不通用)
* `std::chrono::system_clock` 系统时钟, 与系统时间调整同步
* `std::chrono::steady_clock` 单调时钟, 不受外部影响
* `std::chrono::high_resolution_clock` 高精度时钟

#### 时间戳获取与转换
静态成员函数 `system_clock::now()` 获取当前时间戳
* 返回值类型为 `system_clock::time_point`, 即系统时钟下的时间戳类

静态成员函数 `system_clock::from_time_t(std::time_t t)` 将经典时间戳转换为系统时钟下的时间戳对象
* `t` 被转换的经典时间库 `ctime` 中的 `time_t` 类型的时间戳
* 返回值类型为 `system_clock::time_point`, 即将经典时间戳转换为系统时钟下的时间戳

静态成员函数 `system_clock::to_time_t(const system_clock::time_point& t)` 将系统时钟下的时间戳对象转换为经典时间戳
* `t` 被转换的系统时钟下的时间戳对象 `system_clock::time_point`
* 返回值类型为 `time_t` 类型的经典时间戳
* 可用于与 `strftime` 等函数配合以显示时间, 或用于比较不同时钟的时间

获取 `time_t` 类型的经典时间戳主要用于时间显示, 例如以下代码

```cpp
#include <iostream>
#include <chrono>

int main(int argc, const char** argv) {

    // yyyy-MM-dd hh:mm:ss (19 + 1)
    const size_t TIME_FORMAT_LENGTH = 20;
    char time_str_buf[TIME_FORMAT_LENGTH]; 

    auto now_point = std::chrono::system_clock::now();
    auto now_stamp = std::chrono::system_clock::to_time_t(now_point);

    // 来自 ctime, 在 chrono 中已经默认引用
    auto now_tm = std::localtime(&now_stamp);
    auto res = std::strftime(time_str_buf, TIME_FORMAT_LENGTH, "%Y-%m-%d %H:%M:%S", now_tm);

    std::cout << "now is " << time_str_buf << std::endl;

    return 0;
}
```

#### 时间戳操作
时间戳可通过运算进行操作
* 同一时钟下的时间戳类之间可以进行比较运算
* 同一时钟下的时间戳类之间也可以相减, 通过相减可得到两个时间戳相差的[时间段对象](#时间段), 可用于计时等应用
* 时间戳类也可以与[时间段对象](#时间段)相加或相减, 得到调整后的时间段

例如以下示例代码, 通过时间戳, 计算程序执行消耗时间
```cpp
#include <iostream>
#include <chrono>
#include <thread>

int main(int argc, const char** argv) {

    // 计时开始
    auto timestamp = std::chrono::system_clock::now();
    // 被计时的程序
    std::this_thread::sleep_for(std::chrono::seconds(3));
    // 计时结束, 使用毫秒精度
    auto use_time = std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now() - timestamp);

    std::cout << "use time: " << use_time.count() << " ms" << std::endl;

    return 0;
}
```

## 并发编程
参考教程 <https://www.bilibili.com/video/BV1g5411Z72H>

线程是操作系统进行 CPU 调度的最小单位, 一个进程可以包含多个线程  
通过多线程并发, 可将一个任务拆分为多个子任务, 加快速度  

在 C11 后, C++ 提供了一系列标准库用于多线程以及相关组件

建议阅读 <https://github.com/xiaoweiChen/CPP-Concurrency-In-Action-2ed-2019> 

### 创建线程
标准库 `<thread>` 用于创建与管理多线程  

#### 线程类构造函数
通过线程类 [std::thread](https://zh.cppreference.com/w/cpp/thread/thread) 管理与创建单个线程

构造函数 `std::thread(f, args)`
* `f` 函数指针, 即线程子任务对应的函数
* `args` 变长参数, 用于传入线程任务函数的参数  
传入引用参数时, 需要使用 `std::ref` 修饰
* 当线程类被创建后, 将立刻启动子线程执行任务

构造函数 `std::thread()`
* 该方法将创建一个没有任务的空线程, 需要配合 [swap()](#子线程管理) 使用

#### 子线程管理
在主线程执行结束或==对象析构==时, 也将线程类的析构函数也将被调用, 如果此时的子线程没有退出将导致错误, 需要通过以下成员函数管理子线程
* 成员函数 `joint()` 阻塞等待线程执行完毕
    * 该方法为等待子线程的一般方法, 可在主线程退出前调用
    * 即使确保线程任务已经执行完毕, 也应当在主线程退出前调用此方法
* 成员函数 `detach()` 将该线程与主线程完全分离
    * 不建议使用此方法等待子线程
    * 由于对象的析构将伴随资源回收, 要注意分离子线程访问数据的有效性
    * 当主线程退出时, 由于进程的结束, 分离子线程也将强制退出

线程类也提供了以下成员函数用于获取线程信息
* 成员函数 `joinable()` 检查线程是否可合并
    * 当线程正在执行任务, 返回 `true`
    * 当线程任务执行结束或被分离, 返回 `false`
* 成员函数 `get_id()` 获取线程 id
    * 返回值为 `std::thread::id` 类型
    * 由于线程具有唯一性, 因此通过 id 可唯一标记一个子线程 (但可能在线程结束后被复用)
* 静态成员函数 `thread::hardware_concurrency()` 获取系统最大并发线程数

注意, 线程类不可复制, 只可移动
* 成员函数 `swap(std::thread& other)` 交换两个线程对象管理的线程
* 重载运算 `th1 = th2` 将线程 `th2` 的控制权转移到没有任务的线程 `th1` 上

#### 任务内管理线程
命名空间 `std::this_thread` 中, 还提供了一系列函数, 用于管理正在执行程序的线程  
系列函数除了子线程的任务, 一般程序也可以调用

函数 `this_thread::get_id()` 获取当前线程 id
* 返回值为 `std::thread::id` 类型

函数 `this_thread::sleep_for(const chrono::duration& sleep_duration)` 当前线程休眠指定时长
* `sleep_duration` 休眠时间长度, 参数类型为[时间段](#时间段)

函数 `this_thread::sleep_until(const chrono::time_point& sleep_time)` 当前线程休眠到指定时间
* `sleep_time` 恢复时间, 参数类型为[时间戳](#时间戳与时钟)

函数 `this_thread::yield()` 允许重新调度其他程序
* 该函数通常与 `while` 配合, 用于暂时挂起线程以等待特定信号

### 资源保护
标准库 `<metux>` 用于子线程访问公共资源保护

当两个线程并发执行时, 如果同时对同一个资源进行访问, 就可能导致异常, 一般称为资源竞争  

例如对于全局整数变量 `i` 即使是两个线程同时运行 `i++` 也将导致异常结果, 因为 
*`i++` 这一语句在汇编层面为内存值移入寄存器, 寄存器加一, 寄存器结果移入内存三步操作  
* 而两个线程同时执行了这一语句时, 一种可能的情况是, 线程一运行到第二步时, 线程二运行到第一步取到了未经加一的 `i`
* 当线程二运行完后, 又将使用未经加一的 `i` 覆盖线程一运算得到的 `i`

为此需要通过上锁或规定公共资源原子化, 以此解决问题

#### 互斥量
互斥量为一种具有上锁与解锁两个状态的特殊信号量, 当互斥量被一个线程上锁后不能重复上锁, 且==只能由该线程解锁==  
因此, 可以通过一个互斥量管理公共资源, 在访问资源前对其上锁, 在访问结束后解锁, 保证同时只有一个线程使用该资源  

使用互斥量时注意, 应当通过私有成员的方式保护资源, 并且不能通过指针等方式共享资源, 资源只在互斥量的控制下被访问

通过互斥量类 [std::mutex](https://zh.cppreference.com/w/cpp/thread/mutex) 表示互斥量  

互斥量构造函数 `std::mutex()`
* 不需要传入参数即可创建互斥量
* 互斥量不支持移动与复制
* 通常与被管理资源同时出现, 定义为成员变量或公共变量

使用以下成员函数管理互斥量
* 成员函数 `lock()` 为互斥量上锁, 如果已经上锁则阻塞线程直到其解锁, 如果重复上锁将出错
* 成员函数 `try_lock()` 尝试为互斥量上锁, 如果已经上锁则放弃并返回 `false`
* 成员函数 `unlock()` 解锁互斥量, 如果互斥量未被上锁, ==或被其他线程上锁==, 则将出错

由于死锁问题, 一般不会直接使用互斥量, 可参考[死锁保护](#死锁保护)

此外还有其他互斥量变种可供选择, 此处不介绍
* [timed_mutex](https://zh.cppreference.com/w/cpp/thread/timed_mutex) 定时释放的互斥锁
* [recursive_mutex](https://zh.cppreference.com/w/cpp/thread/recursive_mutex) 递归锁定互斥锁 (可被同一线程重复上锁, 用于如递归函数任务)

#### 未解锁导致的死锁
当子线程任务完成退出后, 没有对其上锁的互斥量解锁, 则互斥量将无法再被解锁, 进入死锁状态  
即使在任务最后解锁, 但由于异常, 以及提前调用 `return` 退出程序等, 依然可能导致死锁  

为此可以使用唯一互斥量包装器类 [std::unique_lock](https://zh.cppreference.com/w/cpp/thread/unique_lock) 管理互斥量  
唯一互斥量包装器类使用了 [RAII 机制](https://zh.cppreference.com/w/cpp/language/raii), ==将在其析构函数中自动解锁==, 以此避免了此类死锁问题

唯一互斥量包装器类构造函数 `std::unique_lock<mutex_type>(mutex_type& m[, t])`
* `mutex_type` 被包装互斥量类型, 例如一般互斥量即 `std::mutex`
* `m` 被包装的互斥量引用
* `t` 包装选项
    * 当没有选项时, 将对被包装互斥量上锁, 如果已上锁则阻塞等待
    * `std::adopt_lock` 表明被包装互斥量已经上锁
    * `std::try_to_lock` 将对被包装互斥量上锁, 如果已上锁则放弃
        * 可通过包装器的 `owns_lock()` 函数判读是否上锁成功 (成功返回 `true`)
    * `std::defer_lock` 仅包装互斥量, 不上锁

经过包装后, 只能通过包装器的成员函数管理其中的互斥量
* 成员函数 `lock(), try_lock()` 可对未上锁的被包装互斥量进行上锁
* 成员函数 `unlock()` 对被包装互斥量进行解锁

唯一互斥量包装器无法复制, 只可通过 `=` 运算或成员函数 `swap` 移动

除此之外还有同样使用了 RAII 机制的互斥量保护包装器 `std::lock_guard`  
互斥量保护包装器类构造函数 `std::lock_guard<mutex_type>(mutex_type& m, t)`
* `mutex_type` 被包装互斥量类型, 例如一般互斥量即 `std::mutex`
* `m` 被包装的互斥量引用 
* `t` 包装选项
    * 当没有选项时, 将对被包装互斥量上锁, 如果已上锁则阻塞等待
    * `std::adopt_lock` 表明被包装互斥量已经上锁, 一般配合 [std::lock](#多个互斥量导致的死锁) 使用
* 与 `std::unique_lock` 不同, `std::lock_guard` 支持操作较少, 但效率更高

关于 `std::lock_guard` 有如下使用 `std::lock_guard` 保护全局变量 `std::cout` 的示例  
* 如果没有互斥量 `io_mutex` 的保护, 以下程序将无法正常输出
* 通过在 `{}` 规定的程序段开始时, 使用 `std::lock_guard` 上锁, 实现高细粒度的上锁, 避免长时间上锁导致的资源消耗
* 将 `std::lock_guard` 换为 `std::unique_lock` 代码相同

```cpp
#include <iostream>
#include <chrono>
#include <thread>
#include <mutex>

std::mutex io_mutex;

void task1(){
    for(int i = 0; i < 8; i++){
        {
            std::lock_guard<std::mutex> lk(io_mutex);
            std::cout << "task 1 start in count: " << i << std::endl;
        }

        std::this_thread::sleep_for(std::chrono::milliseconds(300));

        {
            std::lock_guard<std::mutex> lk(io_mutex);
            std::cout << "task 1 end in count: " << i << std::endl;
        }
    }
}

void task2(){
    for(int i = 0; i < 6; i++){
        {
            std::lock_guard<std::mutex> lk(io_mutex);
            std::cout << "task 2 start in count: " << i << std::endl;
        }

        std::this_thread::sleep_for(std::chrono::milliseconds(400));

        {
            std::lock_guard<std::mutex> lk(io_mutex);
            std::cout << "task 2 end in count: " << i << std::endl;
        }
    }
}

int main(){
    std::thread th1(task1);
    std::thread th2(task2);

    th1.join();
    th2.join();

    return 0;
}
```

#### 多个互斥量导致的死锁
除了未解锁, 另一种常见的死锁是由于两个不同任务中同时使用了两个互斥锁导致的  
如果两个互斥锁的上锁时间不同, 将出现线程 1 等待互斥量 a, 线程 2 等待互斥量 b 而死锁  

为了避免以上问题, 应当保证
* 降低上锁的细粒度, 仅在使用到共享资源时上锁, 使用完毕后立刻解锁, 可参见[该节示例](#未解锁导致的死锁)
* 在对多个互斥量上锁时, 保证每次上锁次序相同, 如使用函数 `std::lock`
* 在上锁完成后完全解锁前, 不可再对其他互斥量上锁

可使用函数 `std::lock(Lockable1& lock1, Lockable2& lock2, LockableN&... lockn)` 用于给多个互斥量同时上锁
* `lockn` 互斥量或 [std::unique_lock](#未解锁导致的死锁) 等包装器
* 该函数可以保证各个互斥量的上锁顺序总是相同的

例如以下代码, 注意
* 习惯上将互斥锁定义为类的可变 (mutable) 私有成员, 保证常量成员函数可以正常使用
* 注意 `lock_guard` 与 `unique_lock` 在与 `std::lock` 函数使用时存在部分区别

```cpp
class Example{
private:
    mutable std::mutex mtx;
    ...

public:
    Example():
    mtx(){
        ...
    }
}

void fun(Example& e1, Example& e2){
    ...
    {
        // 使用 lock_guard 管理
        // std::lock(lk1, lk2);
        // std::lock_guard<std::mutex> lk1(e1.m, std::adopt_lock);
        // std::lock_guard<std::mutex> lk2(e2.m, std::adopt_lock);

        std::unique_lock<std::mutex> lk1(e1.m, std::defer_lock);
        std::unique_lock<std::mutex> lk2(e2.m, std::defer_lock);
        std::lock(lk1, lk2);

        ...
    }
}
```

#### 原子量
由[资源冲突](#资源保护)原因可得, 多线程中, 如果对象的一个操作是不可分割的, 或者说其在执行此操作时, 在其他线程不能对该对象执行其他操作  
将此类操作称为原子操作, 或线程安全操作

如果能保证一个资源的所有操作都是原子操作, 那么称其为原子量, 使用原子量时不需要担心资源竞争, 且不需要频繁上锁与释放锁, 以此提升了程序效率

C11 的标准库 `<atomic>` 提供了原子量的创建与相关方法, 此处仅做简单介绍, 更多参见[建议阅读](#并发编程)  
该标准库中, 通过原子量类 `std::atomic` 创建特定类型的原子量

原子量构造函数 `std::atomic<T>(T desired)`
* `T` 原子量类型, 通常仅 C++ 的基本类型, 如 `int` 以及[可平凡复制类](https://zh.cppreference.com/w/cpp/named_req/TriviallyCopyable)可作为原子量的类型
* `desired` 原子量初值

### 线程同步与数据交互

## 异步通讯 Boost.asio
安装完成后, 引用头文件 `#include <boost/asio.hpp>` 以引入该库

### 定时器
参考文档 <https://www.boost.org/doc/libs/1_84_0/doc/html/boost_asio/tutorial.html>

#### 定时器的基本使用
```cpp
#include <iostream>
#include <boost/asio.hpp>

int main()
{
    // 使用 asio 库中的组件进行异步通讯时, 都必须基于一个 io 上下文对象
    boost::asio::io_context io;
    // asio 库中有计时器对象 boost::asio::steady_timer
    // 第一个参数为 io 上下文对象, 第二个参数为计时器过期 (expired) 时限
    // 在该对象被创建后, 将立即开始计时
    boost::asio::steady_timer t(io, boost::asio::chrono::seconds(5));
    // 成员函数 wait 为同步等待计时器达到过期时限, 因此计时未到时限时, 程序将被阻塞
    t.wait();

    // 计时结束后输出信息
    std::cout << "Timer expired" << std::endl;
    return 0;
}
```

#### 异步计时
```cpp
#include <iostream>
#include <boost/asio.hpp>

// 处理函数原型为 void(const boost::system::error_code&)
void print(const boost::system::error_code& e)
{
    std::cout << "Timer expired" << std::endl;
    return;
}

int main()
{
    boost::asio::io_context io;
    boost::asio::steady_timer t(io, boost::asio::chrono::seconds(5));
    
    // 成员函数 async_wait 为计时器达到过期时限这一事件注册异步等待处理函数, 处理函数原型见上
    // 注册后并不会立即执行
    t.async_wait(&print);
    // 对于异步处理的内容, 需要使用 io 上下文的成员函数 run 处理所有注册在该上下文的事件
    // 此时执行 io.run 的线程将被阻塞用于等待所有之前注册的事件发生并处理
    // 当所有事件都处理结束时, io.run 函数才会退出
    io.run();

    return 0;
}
```

#### 绑定成员函数
对于绑定带参数函数的部分见[教程](https://www.boost.org/doc/libs/1_84_0/doc/html/boost_asio/tutorial/tuttimer3.html)  
关于函数包装器 `std::bind`, 可见[笔记](./base.md#bind-函数)  
绑定函数时, 需要使用专门的占位器 `boost::asio::placeholders::error`

```cpp
#include <iostream>
#include <functional>
#include <boost/asio.hpp>

class printer{
private:
    boost::asio::steady_timer _timer;
    unsigned _counter;

public:
    void print(const boost::system::error_code& e){
        if(_counter < 5){
            std::cout << "Counter: " << _counter << std::endl;
            _counter++;

            // 使用成员函数 expires_after 重置过期时限
            _timer.expires_after(boost::asio::chrono::seconds(1));
            // 当前事件已经结束, 因此需要重新注册重置时限后的等待事件
            _timer.async_wait(std::bind(&printer::print, this, std::placeholders::_1));
        }

        return;
    }

    printer(boost::asio::io_context& io):
    _timer(io, boost::asio::chrono::seconds(1)),
    _counter(0){
        // 使用来自 function 的函数 std::bind 包装成员函数, 并将其与对象绑定
        // 此外由于函数有参数 const boost::system::error_code& e 
        // 因此还需要占位符 std::placeholders::_1 
        _timer.async_wait(std::bind(&printer::print, this, std::placeholders::_1));
    }
};

int main(){
    boost::asio::io_context io;
    printer p(io);
    io.run();
    return 0;
}
```

#### 多线程与强制同步
使用多线程处理公用同一资源的两个事件时, 当两个事件同时被处理  
将导致公共资源因同时修改而使程序不稳定  
因此需要引入调节器 `boost::asio::strand`, 当其中一个事件在处理时, 阻塞另一事件的处理

注意, `cout/cin` 等全局变量也属于独立的资源, 不能被多线程同时访问, 因此在回调函数中输入输出消息时, 最好使用消息队列或简单地使用互斥锁管理, 防止同时访问发生

```cpp
#include <iostream>
#include <functional>
#include <thread>
#include <boost/asio.hpp>

class printer{
private:
    // 调节器类为 boost::asio::strand, 以 io 上下文类型为模板 
    boost::asio::strand<boost::asio::io_context::executor_type> _strand;
    boost::asio::steady_timer _timer1;
    boost::asio::steady_timer _timer2;
    unsigned _counter;

public:
    void print1(const boost::system::error_code& e){
        if(_counter < 10){
            std::cout << "Timer1 cnt: " << _counter << std::endl;
            _counter++;
            _timer1.expires_after(boost::asio::chrono::seconds(1));

            _timer1.async_wait(boost::asio::bind_executor(_strand,
                std::bind(&printer::print1, this, std::placeholders::_1)));
        }
        return;
    }

    void print2(const boost::system::error_code& e){
        if(_counter < 10){
            std::cout << "Timer2 cnt: " << _counter << std::endl;
            _counter++;
            _timer2.expires_after(boost::asio::chrono::seconds(1));
            
            _timer2.async_wait(boost::asio::bind_executor(_strand,
                std::bind(&printer::print2, this, std::placeholders::_1)));
        }
        return;
    }

    printer(boost::asio::io_context& io):
    // 注意调节器的初始化方式
    _strand(boost::asio::make_strand(io)),
    _timer1(io, boost::asio::chrono::seconds(1)),
    _timer2(io, boost::asio::chrono::seconds(1)),
    _counter(0){
        // 在注册处理函数前, 还需要函数 boost::asio::bind_executor 将处理函数与调节器绑定
        _timer1.async_wait(boost::asio::bind_executor(_strand,
            std::bind(&printer::print1, this, std::placeholders::_1)));

        // 仅当绑定了同一个调节器的事件才会相互阻塞, 其他事件依然能并行处理
        _timer2.async_wait(boost::asio::bind_executor(_strand,
            std::bind(&printer::print2, this, std::placeholders::_1)));
    }
};

int main(){
    boost::asio::io_context io;
    printer p(io);

    // 一个 io.run 仅能同时处理一个事件
    // 因此当仅有一个线程运行 io.run 时, 当有正在处理的事件时, 仅能等待当前事件处理结束才能处理下一事件
    std::thread t1([&]{ io.run(); std::cout << "Thread 1 Over" << std::endl;});
    t1.detach();
    // 通过多线程同时运行 io.run, 则能在事件同时发生, 使用另一线程进行处理
    // 也可使用 asio 提供的 thread_pool 对象代替 io_context, 使用线程池管理
    std::thread t2([&]{ io.run(); std::cout << "Thread 2 Over" << std::endl;});
    t2.detach();

    // 可使用 io 上下文的成员数 stopped 判断是否仍有待处理的事件
    while(!io.stopped()){}
    std::cout << "Program Over" << std::endl;

    return 0;
}
```

### 串口通信
#### 异步读取
串口通信建立与配置  
<https://blog.csdn.net/keeplearning365/article/details/108718410>
异步读取事件注册函数  
<https://www.boost.org/doc/libs/1_84_0/doc/html/boost_asio/reference/basic_serial_port/async_read_some.html>  
缓冲区  
<https://www.boost.org/doc/libs/1_84_0/doc/html/boost_asio/reference/buffer.html>

```cpp
#include <iostream>
#include <string>
#include <functional>
#include <boost/asio.hpp>

class serialReader{
private:
    // 串口通信对象 
    boost::asio::serial_port _sp;
    // 数据缓冲区
    char* _buf;
    size_t _bufSize;

public:
    // 与计时器不同, 异步接收事件处理函数还需要一个参数 std::size_t bytes_transferred 表示接收到的数据位数
    // 将一次接收多个数据直到接收到 \r\n
    void readHandler(const boost::system::error_code& error, std::size_t bytes_transferred){
        // 将缓冲区末尾置 \0, 将其视为字符串处理
        _buf[bytes_transferred] = '\0';
        std::cout << "Read Size:" << bytes_transferred << std::endl;
        std::cout << "Read Data:" << _buf << std::endl;

        // 通过错误对象 error 的成员 failed 判断读取时是否发生错误
        if(error.failed()){
            std::cerr << error.what() << std::endl;
        }
        else{
            // 使用成员函数 async_read_some 注册异步读取事件的处理函数
            // 注册时, 首先要使用 boost::asio::mutable_buffer 创建缓冲区, 此处是基于一段动态内存空间, 其他创建方法见参考资料
            // 由于处理函数原型存在两个参数, 因此需要两个占位符
            _sp.async_read_some(boost::asio::mutable_buffer((void *)_buf, _bufSize), 
                std::bind(&readHandler, this, std::placeholders::_1, std::placeholders::_2));            
        }
    }

    serialReader(boost::asio::io_context& io, const std::string& portName, size_t bufSize = 128):
    _sp(io),
    _buf(nullptr),
    _bufSize(bufSize){
        try{
            // 使用串口对象的 open 成员打开串口
            // 当端口占用或不存在时将抛出错误, 因此建议使用 try catch 包含 open 成员
            _sp.open(portName);
            _buf = new char[_bufSize];
        }
        catch(const std::exception& e){
            std::cerr << e.what() << std::endl;
            exit(1);
        }

        std::cout << "Open Success" << std::endl;

        // 设置串口属性, 属性的具体含义见串口通信建立与配置
        // 需要在串口打开后再进行配置
        _sp.set_option(boost::asio::serial_port::baud_rate(115200));
        _sp.set_option(boost::asio::serial_port::flow_control(boost::asio::serial_port::flow_control::none));
        _sp.set_option(boost::asio::serial_port::parity(boost::asio::serial_port::parity::none));
        _sp.set_option(boost::asio::serial_port::stop_bits(boost::asio::serial_port::stop_bits::one));
        _sp.set_option(boost::asio::serial_port::character_size(8));

        _sp.async_read_some(boost::asio::mutable_buffer((void *)_buf, _bufSize), 
            std::bind(&readHandler, this, std::placeholders::_1, std::placeholders::_2));
    }

    ~serialReader(){
        delete[] _buf;
    }
};

int main(){
    boost::asio::io_context io;
    std::string portName;

    std::cout << "Please Enter The COM Port: ";
    std::cin >> portName;
    
    // Windows 串口名称使用 COM + 数字 (见设备管理器)
    // Linux 可使用设备名如 /dev/ttyUSB0
    serialReader sr(io, portName);
    io.run();

    return 0;
}
```

## C++ Python 混合编程
通过 pybind11 实现 C++ 与 Python 的混合编程

参考文档 <https://pybind11.readthedocs.io/en/latest/basics.html>  
项目的配置见 [CMake 笔记](./cmake.md#pybind11)  

导出模块时默认需要头文件 `#include <pybind11/pybind11.h>`  
调用 Python 时, 默认需要头文件 `#include <pybind11/embed.h>`  
约定使用命名空间的别名 `namespace py = pybind11;`

### 导出函数
#### 导出函数基本方法
使用 pybind11 导出函数的基本形式如下

```cpp
PYBIND11_MODULE(example, m)
{
    m.doc() = "...";
    m.def("fun_name", &fun, "fun_doc");
}
```

* `PYBIND11_MODULE` 进入模块定义环境, 定义模块前必须进入该环境, 下文默认不写出
* `example` 导出的模块名称, 应当保证导出的模块名与编译生成的模块文件名相同, 下文中默认使用 `example`
* `m` 模块接口名, 将定义一个名称为 `interface` 的模块接口对象 `py::module_`, 通过该对象的一系列成员函数定义模块, 下文中默认使用 `m`
* `py::module_::doc()` 定义模块的说明文字 (通过赋值的形式)
* `py::module_::def(name, fun, extract)` 导出函数
    * `name` 函数导出名称
    * `fun` 函数指针, 一般即 `&` + 函数名, 此外也可以是 Lambda 表达式 (不需要其他修饰)  
    对于模板函数, 应当使用 `&fun<...>` 指明示例化类型
    应当保证函数的参数与返回值满足[类型要求](#类型要求)
    * `extract` 附加定义, 一般第一个附加参数为一个字符串, 表示函数的说明文档

#### 导出函数的参数修饰
通过附加定义 `py::arg(str)` 可以设置参数的名称以及默认参数  
使用方式如下

```cpp
m.def("fun_name", &fun, "doc ...", py::arg("<arg1>") = val1, py::arg("<arg2>") = val2, ...)
```

* `arg1` 函数第 1 个参数的名称, 经此方式确定函数参数名后, 可在 Python 中通过关键字的方式传参
* `val1` 函数第 1 个参数的默认值, 该设置不是必须的, 但应当符合 Python 的要求, 即有默认值的参数应在最后, 且类型要符合要求 (编译时 pybind11 不会检查这些内容, 但将导致在 Python 运行时出错)
* 不建议将[导出类](#导出类)作为默认参数, 而改为传入指针, 使用空指针 `nullptr` 表示使用默认参数 (可能需要 `static_cast` 进行类型转换)
* 参数修饰时, 将按从左到右的顺序与被绑定函数的参数逐个对应

关于参数的更多修饰见[导出函数参数的设置](#导出函数参数的设置)

#### 导出重载函数
pybind11 允许导出具有相同名称的函数  
而对于 C++ 的重载函数, 可使用 [static_cast](../cpp/base.md#static_cast) 运算符进行明确, 例如

```cpp
m.def("add", static_cast<int(*)(int, int)>(&add), "Add two number");
m.def("add", static_cast<float(*)(float, float)>(&add), "Add two number");
```

对于[成员函数的导出](#成员函数的导出)同样支持重载, 此时函数指针类型表示为  
`static_cast<返回值类型(类名::*)(参数类型列表)>(&类名::函数名)`

#### 返回值策略
对于 `int`, `float` 等简单类型, 以及直接返回对象, pybind11 总会拷贝变量值并传递到 Python 并完全由 Python 管理

而对于其他复杂类型, 如 [STL](#stl-类型包裹), [导出类](#导出类)等对象, 以引用或指针方式返回这一对象时, 需要在明确如何处理这个被返回的对象

还要注意
* Python 并不会区分返回的是常量引用还是引用, 都将视为引用处理, 指针同理
* 通过[智能指针](#智能指针与导出函数)能很好地确定职责, 因此返回智能指针时不需要额外定义返回策略
* 仅非 Python 的基本类型需要确定返回策略, 对于 `std::string` 或来自 Python 的对象不需要额外指定返回策略

因此, 应当在导出函数的[附加定义](#导出函数基本方法)中给出返回值策略作为参数, 一般表示为类型 `py::return_value_policy` 的枚举量, 共有以下几种策略
* `return_value_policy::take_ownership`  
Python 完全接管返回的对象, 当 C++ 仍在控制该对象或该对象为全局量等不是存储在动态内存的情况 (不通过 `new` 创建), 将导致错误
* `return_value_policy::copy`  
Python 将深拷贝被返回的对象, 理论上两个对象的控制将完全分离, 但可能产生额外的内存消耗  
该策略产生的消耗最大, 但可以基本保证不会产生任何异常
* `return_value_policy::move`  
Python 将浅拷贝被返回的对象 (通过 `std::move`), 即 Python 控制的对象为原始对象的浅拷贝, 且原始对象通过 `std::move` 语义在移动发生后即被销毁  
该策略要求对象不能有指向动态内存的成员或拥有安全的浅拷贝函数 (即拷贝后将原始对象的指针赋为空值, 可参考[浅拷贝构造函数](./base.md#浅拷贝构造函数)), 在满足以上条件时, 类似于 `take_ownership` 但更加安全
* `return_value_policy::reference`  
Python 仅引用返回对象而不负责销毁, 销毁责任由 C++ 负责, 但是当对象被销毁时, Python 仍在引用该对象, 将导致错误; 但当 C++ 不主动负责销毁则将始终存在未释放的内存空间
* `return_value_policy::automatic`  
该策略将根据返回值自动判断使用的策略, 为一般情况下的默认策略
    * 返回一般引用 (即右值引用) 时, 将采用策略 `return_value_policy::copy`
    * 返回右值引用时, 将采用策略 `return_value_policy::move`
    * 返回指针时, 将采用策略 `return_value_policy::take_ownership`
* `return_value_policy::automatic_reference`  
该策略与 `return_value_policy::automatic` 类似, 但时返回指针采用的策略是 `return_value_policy::reference`, 为部分情况下的默认策略
* `return_value_policy::reference_internal`  
与策略 `return_value_policy::reference` 类似, 但用于[导出类](#导出类)的成员函数的返回值, 该策略还保证了当返回值仍在被 Python 使用时, Python 不会销毁获取该返回值的父类, 是[成员变量的导出](#成员变量的导出)有关函数使用的默认策略

关于返回值策略的补充说明
* 在 C++ 中, 直接返回值时, 将回使用浅拷贝创建被返回对象的副本用于传递, 然后删除被返回对象, 因此务必保证对象有一个安全的浅拷贝构造函数; 并且 pybind11 也将再次通过浅拷贝传递到 Python, 效率低下, 因此不建议直接返回对象, 而是使用 `new` 创建的对象代替
* 使用函数, 通过 `new` 等动态内存创建一个对象, 并且不再需要管理此对象时, 推荐令函数返回指针, 使用 `return_value_policy::take_ownership` 策略 (也是返回指针的默认的策略)
* 使用类的成员函数并返回由类管理的对象时, 并且也希望 Python 访问此对象, 推荐令函数返回引用, 使用 `return_value_policy::reference_internal` 策略
* 希望返回常量对象 (如类的成员或全局变量), 不希望 Python 修改时, 推荐令函数返回常量引用, 使用 `return_value_policy::copy` 策略
* 希望返回全局对象, 且希望 Python 修改时, 推荐令函数返回引用, 使用 `return_value_policy::reference` 策略
* 希望 Python 接管一个全局对象 (只能接管一次) 或右值引用参数的控制权, 推荐令函数返回右值引用, 使用 `return_value_policy::move` 策略
* 当接收来自 Python 的对象作为参数, 然后返回这个对象, 可使用引用的方式接收与返回对象, 使用 `return_value_policy::take_ownership` 策略

#### 参数生命保护策略  
* 当 Python 将一个对象作为参数传递给函数后, 如果这个对象不再使用, 将会自动销毁  
然而, 如果这个==对象的指针==保存到了 C++ 中, ==如将对象插入容器, 或保存该参数==, 从容器中尝试访问该对象时将导致错误, 因此==需要使用此策略==
* 使用此策略时, 在[导出函数的附加定义](#导出函数基本方法)中传入参数 `py::keep_alive<1, ind>()`  
其中 `ind` 为需要保护的函数参数在参数列表中的位置, 从 2 开始索引  
使用此策略保护后, 传入的参数将不会被销毁, 直到被调用的父对象被销毁
* 该策略仅能保护且主要用于[导出类](#导出类)的成员函数, 无法保护将对象指针保存到全局变量的操作
* 注意参数 `py::keep_alive<1, ind>()` 不能使用超出范围的索引, 也不能用于一般函数, 这些错误将导致运行时的异常, 而不会有编译时的错误

#### 接收 Python 类型的参数以及变长参数
* 当函数以 pybind 中的 [Python 对象包裹类](#python-对象)为参数时, 即可接收来自 Python 的参数, 一般即使用 `py::object`, 以引用 (仅能用于接收可变对象) 或常量引用的方式接收
* 当函数的参数为 `int`, `std::string` 等存在对应包裹类或[导出类](#导出类), 则 pybind11 将自动转换而不需要以特定的 Python 对象包裹类为参数
* 对于变长参数, 使用类型 `py::args` 与 `py::kwargs` 作为函数参数分别表示一般变长参数与带关键字的变长参数, 这两个类型本质即 `py::tuple` 与 `py::dict`, 一般使用常量引用的方式接收  
    * 注意必须先接收一般参数, 再接收一般边长参数, 最后接收带关键字的边长参数 `[一般参数, ]py::args, py::kwargs kwargs`
    * 应当先使用 `is_none()` 成员函数检查是否为空

#### 导出函数参数的设置
通过连续调用参数接口 `py::arg` 可对参数进行设置

* 禁止类型转换  
在 Python 中调用函数时, 如果类型不正确 Python 会尝试转换类型, 但可能导致 pybind11 一侧产生异常, 如传入大小不正确的 numpy 数组作为 Eigen 矩阵  
在使用 [py::arg](#导出函数的参数修饰) 修饰时, 调用成员 `py::arg(...).noconvert()` 即可阻止类型转换, 并在 Python 一侧产生类型错误 `TypeError`
* 传入空指针  
对于接收指针或智能指针的参数, 导出时 pybind11 将允许使用 `None` 作为参数, 此时将会转换为空指针 `nullptr` 传入  
如果希望禁止空指针的传入, 则可使用 `py::arg(...).none(false)` 禁止, 同样地, 传入 `true` 则表示允许

#### 智能指针与导出函数
* 对于独占智能指针 `std::unique_ptr`  
只能作为函数的返回值使用, 且一般直接返回指针实例  
通过返回独占智能指针即明确了由 Python 接管返回对象, 不需要额外的返回值策略
* 对于共享智能指针 `std::shared_ptr`  
需要配合[以共享指针管理的导出类](#成员函数的导出)  
即使在 C++ 中, 也以共享智能指针作为参数或返回值代替野指针 `*` 管理类, 表示与 Python 共同引用, 并当不再被任何一侧引用时销毁

### 导出类
#### 成员函数的导出
类以及成员函数导出的基本形式如下所示

```cpp
PYBIND11_MODULE(example, m) {
    m.doc() = "..."; // optional module docstring

    py::class_<Data[, std::shared_ptr<Data>]>(m, "Data", extract) data;

    data
    .def(py::init<const std::string&>(), py::arg("name"))
    ...
    .def("setName", &Data::setName);
}
```

* 类通过在导出环境中定义类接口 `py::class_<type>(module, "name")` 实现
    * `type` 被导出的类, 对于嵌套类使用 `Shell::Inside` 表示
    * `module` 导出环境中模块接口, 即 `PYBIND11_MODULE` 中所定义的
    * `name` 导出采用的类名
    * `extract` 附加定义, 一般第一个附加参数为一个字符串, 表示类的说明文档
    * `std::shared_ptr<Data>` 管理对象的指针对象
        * pybind11 默认使用独占智能指针 `std::unique_ptr<Data>` 管理对象, 即当对象被 Python 销毁时, 对象直接销毁
        * 可改为共享智能指针 `std::shared_ptr<Data>` 管理对象, 仅当其完全不再使用时才会销毁, 安全性更高  
        但应保证始终以 `std::shared_ptr` 管理对象, 任何位置都最好不能出现野指针 `*Data`
    * 该接口具有连续求值得特点, 即可以使用如例子所示的方式连续定义, 而不需要多次调用接口 (注意最后一个语句需要加上 `;`)
* 导出成员函数的方法与要求和[导出函数](#导出函数)完全一致, 唯一区别为需要使用 `&类名::函数名` 的方式获取函数指针
    * 常量成员函数也可使用此方式导出
* 在定义导出类的其他部分时, 首先要定义构造函数, 与一般函数不同, 其定义方式为 `class_::def(py::init<...>(), extract)`
    * 定义时不需要给出函数名称以及绑定的函数名
    * 通过 `py::init<...>()` 表示构造函数, 其中模板参数即构造函数的参数类型列表 (析构函数一般将自动注册)
* 导出具有名称 `__xxx__` 即定义 Python 类中的特殊方法, 常用的特殊方法有
    * `__repr__` 确定导出类如何转换为字符串 (返回字符串)
    * `__copy__`, `__deepcopy__` 前拷贝与深拷贝方法 (参见[官方文档](https://docs.python.org/3/library/copy.html))
* 对于导出运算符重载, 除了重载对应的特殊方法, 还需要添加额外参数 `py::is_operator()`  
此外还可使用简便方法, 需要导入头文件 `#include <pybind11/operators.h>` 使用 `py::self` 代表对象类型, `type()` 代表其他参与运算的类型, 如 `float()`, 通过类型与运算符之间的组合表示被重载的运算  
对于对象类型 `vect` 使用示例如下, 注意重载的运算中应至少包含一个 `py::self`
    * `vect.def(py::self + py::self)` 代表重载函数 `vect vect::operator+(const vect&)`
    * `vect.def(py::self *= float())` 代表重载函数 `vect& vect::operator*+(float)`
    * `vect.def(float() * py::self)` 代表重载函数 `friend vect operator+(float, const vect&)` 
    * `vect.def(-py::self)` 代表重载函数 `vect& vect::operator-()` 

#### 成员变量的导出
* 对于公有成员变量, 使用以下方式可直接导出  
一般公有成员变量 `py::class_<type>.def_readwrite("name", &type::arg)`  
常量公有成员变量 `py::class_<type>.def_readonly("name", &type::arg)`
    * `type` 导出的类
    * `name` 导出采用的变量名
    * `arg` 被导出的成员变量 (注意需要通过类的命名空间下访问, 且需要 `&` 取地址)
* 对于私有成员变量, 以及伪变量, 则可通过以下方式导出  
一般私有成员变量 `py::class_<type>.def_property("name", &type::getFun, &type::setFun)`  
常量私有成员变量 `py::class_<type>.def_property_readonly("name", &type::getFun)`
    * `type` 导出的类
    * `name` 导出采用的变量名
    * `getFun` 读取变量时调用的成员函数 (不需要再导出此函数, 通常为一个具有返回值的常量成员函数)
    * `setFun` 设置变量时调用的函数 (不需要再导出此函数, 通常为一个接收单个参数的成员函数, 返回 `void`)
    * 由于 `getFun` 与 `setFun` 本质也是一个函数, 如果要进行[返回值策略](#返回值策略)等设置, 可使用 `py::cpp_function(&type::getFun, extract)` 包裹函数, 其中 `extract` 即额外参数
    * 特别注意[返回值策略](#返回值策略)与[参数生命保护策略](#参数生命保护策略)
        * 当使用 `getFun` 且不希望 Python 修改该成员时, 应当使函数返回常量引用 (减少中间拷贝消耗), 并使用策略 `py::return_value_policy::copy`
        * 当使用 `getFun` 且希望 Python 也能修改该成员时, 应当使函数返回引用, 并使用策略 `py::return_value_policy::reference_internal` (默认已使用)
        * 当使用 `setFun` 且以指向对象的指针为传入参数, 应当使用[参数生命保护策略](#参数生命保护策略)
* 对于 Python 对象, 其成员变量可任意添加, 但对于 C++ 对象, 一旦类确定就无法添加类实例对象的成员  
    * 对于导出类的默认表现也与 C++ 一致, 即无法添加新的对象
    * 如果希望其能像 Python 一样具有动态的成员变量, 可在[导出类](#成员函数的导出)时添加附加定义 `py::dynamic_attr()`

#### 继承关系类的导出
假设类 `Child` 继承自父类 `Father`, 则在导出类 `Child` 时注意

简单情况下, `Father` 为一个实际存在的类, 则
* 父类 `Father` 也必须导出
* 子类不需要重复导出来自父类的成员也可使用继承得到的成员
* 在导出子类时, 还需要使用以下两种等价的类接口定义之一
    * `py::class_<Child, Father>(m, ...)`
    * `py::class_<Child>(m, father)` (假设父类的导出接口对象为 `father`)

对于虚类与虚函数较为复杂, 可参考[官方文档的有关内容](https://pybind11.readthedocs.io/en/latest/advanced/classes.html#combining-virtual-functions-and-inheritance)

#### 构造函数的导出
在 pybind11 中, 构造函数也允许重载, 以及使用多种方式导出不同函数作为构造函数
* `py::init<...>()` 用于表示一般的构造函数 (即在类中定义的构造函数), 其中模板参数为构造函数的参数列表, 可用此区分不同构造函数的重载
* `py::init(&fun)` 使用一个返回被构造类的指针或直接返回实例的工厂函数作为构造函数
* 对于结构 `struct` 存在一个按结构成员顺序的默认构造函数, 该构造函数也可使用第一种方式绑定

#### 导出类的析构函数
* 导出类的析构函数最好定义为公有函数, 对于非公有析构函数直接使用将导致错误, 需要参考[官方文档内容](https://pybind11.readthedocs.io/en/latest/advanced/classes.html#non-public-destructors)
* 导出类的析构函数最好不要调用有关 Python 的内容如 `py::print` 等, 因为调用时将产生异常 `error_already_set`, 如果需要调用参考[官方文档内容](https://pybind11.readthedocs.io/en/latest/advanced/classes.html#destructors-that-call-python)

#### 其他类导出注意
* 当导出类 `A` 能转换为 `B` (即 `B` 存在以 `A` 为参数的构造函数, 可参见[隐式类型转换](./base.md#隐式类型转换))  
可通过函数 `py::implicitly_convertible<A, B>();` 在模块导出时向 Python 声明二者之间的关系
* 导出类的静态成员变量时, 可使用[成员变量的导出](#成员变量的导出)中函数的带后缀 `_static` 版本  
并且以 `def_property` 方式导出时, 设置与接收函数还将接收一个 [py::object](#python-对象) 类型的参数, 对应 `self`  
如果不需要使用, 可使用 labmda 表达式包裹实际要调用的函数, 如 `[](const py::object&){return fun();}`
* 关于将导出类获得通过 `pickle` 模块序列化为二进制形式可参考[官方文档](https://pybind11.readthedocs.io/en/latest/advanced/classes.html#pickling-support)
* 假设同一个项目同时生成多个 Python 库, 当其中一个模块导出类 `exam`, 另一个模块即可直接使用这个类 `exam` 而不需要再次导出  
如果希望禁止这个特性, 则应在[导出类](#成员函数的导出)的额外定义中使用参数 `py::module_local()`

### 其他导出注意与技巧
#### 导出模块变量
通过模块接口对象, 使用 `py::module_::attr("name") = val` 即可导出模块变量
* `name` 导出变量的名称
* `val` 被导出的变量
* 应当保证导出的变量满足[类型要求](#类型要求)

例如 `m.attr("val") = val`

注意
* 以上导出语句本质为创建一个模块变量, 然后将特定值赋给这个模块变量, 其与赋值变量没有任何关联
* 应当保证导出一个 Python 对象, 因此应当使用 [py::cast()](#类型转换) 函数进行类型转换

#### 导出枚举类型
导出枚举类型的基本格式如下  
由于 C++ 枚举类型可以被赋值, 且不能再修改, 因此无论是 C++ 还是 Python 中都可以视为特殊的常量使用  
导出枚举类型的基本类型如下

```cpp
py::enum_<EnumType>(base, "enumName"[, py::arithmetic()])
.value("value1", EnumType::value1)
.value(...)
.export_values();
```

其中
* `EnumType` 即枚举类型, 可以是一般的枚举类型或类的嵌套枚举类型 (需要使用 `Shell::EnumType` 通过所在类访问)
* `enumName` 导出的枚举类型名称, 被导出的枚举类型也将作为一个特殊的 Python 类型存在
* `value1`, `EnumType::value1` 导出的枚举值名称以及被绑定的枚举值 (在 Python 需要使用 `enumType.value1.value` 才能访问到枚举量的绑定值)
* `base` 被绑定的接口, 一般枚举类型使用模块接口 `py::module_ m`, 嵌套枚举类型使用其所在类的导出接口 `py::class_`
* `export_values` 最后调用该函数, 将使枚举量显示地称为绑定模块的常量
* `py::arithmetic()` 为一个可选的设置, 表示枚举类型可以进行比较与位操作, 可用于 `unsigned` 类型, 按位的取值表示选项等情况

#### 类型要求
在导出类, 变量, 函数时, 必须要时刻注意类型要求

注意, 对于 `int`, `float`, `string` 等简单类型将经过 pybind11 的自动识别与包裹, 因此可以使用以上方式进行直接导出  
* 对于接收或返回自定义的类, 则需要保证该[类导出](#导出类)
* 对于 STL 类型, 见 [STL 类型包裹](#STL-类型包裹)
* 对于指针, 都将被自动转换为原始类型, 当应当注意[返回值策略](#返回值策略)
* 对于智能指针, 见[智能指针交互](#智能指针交互)

#### Python 对象
由于 Python 中一切类型皆为类, 因此在 pybind11 中, 可使用一个 Python 包裹类来操作这些来自 Python 的对象   
* 在 pybind11 中, Python 对象有以下常用包裹类
    * 类型 `py::handle` 表示不带引用计数的 Python 对象, 继承自 `py::object_api`, 是最基础的 Python 包裹类, 一般用于表示临时的 Python 对象, 一般不直接使用
    * 类型 `py::object` 表示带引用计数的 Python 对象, 继承自 `py::handle`, 基本使用与 `py::handle` 一致, 一般用于在 C++ 中引用 Python 中的具体对象, 或作为函数参数传递
    * 字符串 `py::str`, 元组 `py::tuple`, 列表 `py::list`, 字典 `py::dict` 等 Python 基本类型, 均继承自 `py::object`, 仅根据类型自身特点进行特化
* 对于基础的 `py::handle`, 有以下常用成员函数以操作 Python 对象  
    * `py::handle::attr(const char* key)` 访问对象名称为 `key` 的成员, 返回值即此成员的 Python 对象的引用
    * `py::handle::is_none()` 判断该 Python 对象是否为 None
    * `py::handle::equal(const object& other)` 判断该对象与另一 Python 对象 `obj` 是否相等, 即 Python 中的 `=` 运算
    * `py::handle::operator()(...)` 相当于调用 Python 对象的 `__call__(...)` 方法, 也可用此调用 Python 对象的方法
    * `py::handle::cast<T>()` 尝试将当前 Python 对象转换为指定的 C++ 类型, 失败时将抛出异常 `cast_error`
* 此外, pybind11 也提供了 Python 内置函数的接口, 可用这些函数获取关于 Python 对象的信息
    * `py::len(obj)` 相当于 Python 中的 `len`, 用于获取对象的长度信息
    * `py::hasattr(obj, name)` 相当于 Python 中的 `hasattr`, 用于判断对象是否存在成员
* 对于 Python 的基本类型包裹类, 此处做简单介绍
    * `py::int_ / py::float_ / py::bool_` 通过这些包裹对象的构造函数可将 C++ 类型或其他 Python 对象的变量转为 Python 对象
    * `py::str` 通过这些包裹对象的构造函数可将 C++ 类型或其他 Python 对象的变量转为 Python字符串  
    此外, 还可使用 `py::str::cast<std::string>()` 或 `std::string(obj)` 转换回字符串  
    例如将 Python 对象 `obj` 转为字符串 `py::str(obj).cast<std::string>()`
    * `py::list / py::tuple` Python 中的列表 / 元组包裹
        * 可使用运算符 `[]` 通过数字索引其中的元素, 其中 `py::list` 列表包裹对象还能修改其中的元素
        * 可使用 `for(auto it : obj){...}` 遍历其中的元素, 遍历变量的类型同样为 `py::handle`
    * `py::dict` Python 中的字典包裹
        * 可使用运算符 `[]` 通过索引访问或修改其中的元素, 但是==注意必须使用 Python 包裹对象包裹的 Python 值作为索引==
        * 可使用 `for(auto it : obj){...}` 遍历其中的元素, 使用 `it.first` 访问键, `it.second` 访问值
* 其他使用注意
    * 对于使用 `attr` 修改成员, 修改字典或列表的成员时, 最好将 C++ [类型转换](#类型转换)为 Python 对象再赋值

#### STL 类型包裹
* 需要引入头文件 `#include<pybind11/stl.h>`, 才能使 pybind11 获得将 STL 容器与对应 Python 对象如 `list,dict` 相互转换的能力
* 在默认情况下, pybind11 能够处理接收或直接导出 STL 容器以及常量引用, 但处理方式为将作为参数的 Python 对象如列表 `list` 转换为对应的 STL 容器如 `std::vector`, 这将消耗大量的时间用于类型转换以及复制 (注意 `list` 中的元素为 Python 对象, 不一定是 `std::vector` 允许的容器元素), 且==无法修改来自 Python 的对象==
* 如果希望 pybind11 能通过引用或指针的方式传递 STL 容器, 以 `std::vector<int>` 为例, 需要使用如下方法
    * 首先要使用宏 `PYBIND11_MAKE_OPAQUE(std::vector<int>);` 的方式解除 pybind11 的自动转换
    * 引入头文件 `#include<pybind11/stl_bind.h>` 并使用 `py::bind_vector<std::vector<int>>(m, "VectorInt");` 将 `std::vector<int>` 作为名称为 `VectorInt` 的[导出类](#导出类) (同时返回 `py::class_` 的类接口), 并且可通过合法的列表 (所有元素为整数) 构造, 且有着类似的方法
    * 与 `py::bind_vector` 类似, 可通过 `py::bind_map` 将 `std::map` 类型的容器导出为类字典的导出类
    * 除了 `py::bind_vector`, 也可直接将 `std::vector<int>` 作为导出类, 并定义其成员函数, 可参考[官方文档](https://pybind11.readthedocs.io/en/latest/advanced/cast/stl.html#making-opaque-types)

#### Eigen 矩阵类型的交互
使用 pybind11 与 [Eigen](#eigen-线性代数库) 交互前, 需要引入头文件 `#include<pybind11/eigen.h>`, 注意此处的矩阵均指 `Eigen/Dense` 中的稠密矩阵, 对于稀疏矩阵见[官方文档](#https://pybind11.readthedocs.io/en/latest/advanced/cast/eigen.html)  
通过引入头文件, 使 pybind11 获得 Eigen 矩阵对象 `Eigen::Matrix` 与 Python 中的 `numpy.ndarray` 进行相互转换的能力

当按值传递 Eigen 矩阵对象时, pybind11 会依据传入的 `numpy.ndarray` 对象的数据创建一个新的, 要求接收的 Eigen 矩阵对象  
此时允许传递矩阵与要求矩阵在类型, 形状上存在不同, 但无法使用指针等方式引用传入的 `numpy.ndarray` 对象, 且会产生额外开销

当使用 `Eigen::Ref<MatrixType>` (参考[关于 Eigen 的内容](#在函数中引用矩阵对象)) 时, pybind11 则会尝试使用引用的方式传递 `numpy.ndarray` 对象, 但存在以下局限性
* 传入的 `numpy.ndarray` 对象的形状 `shape` 以及类型 `dtype` 必须严格符合 `MatrixType` 的要求 (`float64` 对应 `double`)
* 由于 Eigen 的矩阵与 numpy 的数组存在不同的内存读取方式, 前者为列优先, 后者为行优先, 因此必须先使用以下方法解决这一兼容性问题 (对于向量或单行 / 单列的矩阵不存在这一问题)
    * 使用 pybind11 提供的引用类型 `py::EigenDRef<MatrixType>` (本质为 `Eigen::Ref`, 但声明了不连续的存储顺序)  
    使用该类型能够接收 `arr[0::2, 2:9:3]` 方式索引的数组切片, 但由于存储顺序不连续, 因此无法使用向量化操作优化运算速度
    * 使用行优先的矩阵如 `Eigen::RowMatrix` 以及设置 `Eigen::RowMajor` 或传入行优先的 `numpy.ndarray` 对象 (设置参数 `order = 'F'`)  
    使用此方法虽然能通过向量化操作优化运算, 但不能接收数组切片以及使用 `transpose` 转置的 numpy 数组
* 当兼容性无法解决时, pybind11 与 Python 总会尝试通过复制解决问题, 但此时引用将失去意义, 如果宁愿抛出异常也不要复制, 可参考[禁止类型转换](#导出函数参数的设置)

返回 Eigen 对象时
* 与[一般返回值处理](#返回值策略)不同, 直接返回 Eigen 的矩阵对象时, numpy 的数组也将引用返回的 Eigen 对象, 而不会重新创建, 即类似于 `return_value_policy::take_ownership`, 但对象是在函数中创建的
* 如果返回 `const` 类型的数组时, 将设置 `numpy.ndarray` 的 `writeable` 属性为 `False` 阻之返回的矩阵被修改
* 如果返回引用或指针, 则根据[返回值处理](#返回值策略)进行处理, 但一般不存在兼容性问题, 因为 pybind11 将自动设置返回的数组对象以兼容 Eigen 矩阵
* 也可以返回 `Eigen::Ref` 类型作为引用, 此时依然需要注意返回值策略

向量问题, 注意在 numpy 中, 向量可以是 1 维数组, 也可以是 1xn 或 nx1 的多维数组, 但 Eigen 的向量始终为二维  
以下是 pybind11 如何处理向量
* 当接收向量时
    * 如果传入一维的 numpy 数组, 则将自动转换为对应的向量, 如果传入二维的 numpy 数组, 则要求具有相同的形状  
    * 当接收的矩阵为动态大小时, 将优先转换为行向量
    * 当接收的矩阵仅具有动态的行 / 列时, 将尝试令动态的一侧为 1
* 当返回向量时
    * 如果返回的 Eigen 矩阵对象固定只有 1 行或 1 列, 则将返回 1 维向量
    * 如果返回的 Eigen 矩阵为动态大小的, 将返回 2 维向量

#### 生成模块注释
对于 `.pyd` 的导出模块, 开发环境无法直接读取模块内的注释信息, 还需要使用 `模块名.pyi` 的注释文件配合  
通过 python 模块 `pybind11_stubgen` (需要使用 pip 安装) 可完成通过 `.pyd` 文件内的注释信息自动生成对应的 `.pyi`  

在每次生成 `.pyd` 文件后, 运行如下脚本即可

```python
import os
import pybind11_stubgen

os.add_dll_directory(<build 目录地址>)
pybind11_stubgen.main()
```

注意运行时需要使用命令 `<python 脚本解释器> <脚本路径> -o <输出路径> <模块名>`  
也可使用 CMake 的 `file(WRITE ...)` 创建脚本, 并使用 `add_custom_command` 在每次构建后自动生成 pyi 文件, 例如
```cmake
# 确定模块名, 需要与 C++ 中导出的模块名的一致
set(MODULE_NAME my_eigen_py)
pybind11_add_module(${MODULE_NAME} ${SOURCE_MODULE})

# 自动生成脚本
file(WRITE "${PROJECT_BINARY_DIR}/generate_pyi.py" 
"import os
import pybind11_stubgen

os.add_dll_directory('${PROJECT_BINARY_DIR}')
pybind11_stubgen.main()")

# 生成的模块结果
set(MODULE_RESULT_FILE ${MODULE_NAME}${PYTHON_MODULE_EXTENSION})
# 生成的 pyi 结果
set(MODULE_RESULT_PYI ${MODULE_NAME}.pyi)
# python 测试目录
set(PY_TEST_PATH /src/py)

# 自动运行脚本, 在 build 目录下生成 pyi 文件, 并将运行模块的核心文件移动到 ${PY_TEST_PATH} 下
add_custom_command(TARGET ${MODULE_NAME} POST_BUILD
    COMMAND ${PYBIND11_PYTHON_EXECUTABLE_LAST} ${PROJECT_BINARY_DIR}/generate_pyi.py -o ${PROJECT_BINARY_DIR} ${MODULE_NAME}
    COMMAND ${CMAKE_COMMAND} -E copy ${PROJECT_BINARY_DIR}/${MODULE_RESULT_FILE} ${PROJECT_SOURCE_DIR}/${PY_TEST_PATH}
    COMMAND ${CMAKE_COMMAND} -E copy ${PROJECT_BINARY_DIR}/${MODULE_RESULT_PYI} ${PROJECT_SOURCE_DIR}/${PY_TEST_PATH}
    COMMAND ${CMAKE_COMMAND} -E copy ${PROJECT_BINARY_DIR}/${PYTHON_DLL} ${PROJECT_SOURCE_DIR}/${PY_TEST_PATH}
)
```

### C++ 中调用 Python
参考文档 <https://pybind11.readthedocs.io/en/latest/advanced/embedding.html>  
通过头文件 `#include <pybind11/embed.h>` 完成 C++ 中调用 Python 的基本功能  

#### 基本配置
在正式调用前, 需要进行如下配置

```cpp
// 设置环境变量, 对应配置项目时的变量 PYTHON_HOME
_putenv("PYTHONHOME=<Python_ROOT_DIR>");

// 启动 Python
py::scoped_interpreter guard{};

// 设置 DLL 目录
py::module_ os = py::module_::import("os");
os.attr("add_dll_directory")("<Python_ROOT_DIR>/Library/bin");
```

为了提升程序的可移植性, 推荐通过咨询用户的方式获取变量 `Python_ROOT_DIR`

可通过以下方式检查环境是否符合要求
```cpp
// 具体确定用户提供的 Python 版本信息
py::module_ sys = py::module_::import("sys");
// 检查属性 sys.version_info, 此处直接打印
py::print(sys.attr("version_info"));

// 检查特定模块的导入是否成功
try
{
    // 当模块不存在时, 将产生异常
    py::module_ xxx = py::module_::import("xxx");
    // 检查模块 xxx 的版本, 此处直接打印
    py::print(xxx.attr("__version__"));
}
catch (const std::exception& e)
{
    std::cerr << e.what() << std::endl;
}
```

## Eigen 线性代数库
### 矩阵对象基本操作
此处的矩阵对象表示的是基础的稠密矩阵, 定义于头文件 `Eigen/Dense` 中

#### 矩阵对象的类型
矩阵对象有原型 `Matrix<typename Scalar, int RowsAtCompileTime, int ColsAtCompileTime, int Options = Eigen::ColMajor>` 其中
* `Scalar` 矩阵元素类型, 如 `double`, `int` 等, 对于复数类型还有双精度复数 `Eigen::dcomplex` 与单精度复数 `Eigen::scomplex`
* `RowsAtCompileTime/ColsAtCompileTime` 矩阵行 / 列数
    * 当矩阵的具体形状无法确定时 (如运算结果), 可使用参数 `Eigen::Dynamic` 表示动态行列数, 行列将根据要求动态变化 
    * 当元素个数小于 $32$ 时, 推荐使用固定的行列数, 等价于在静态内存中定义的数组
    * 即使性转确定, 当元素个数大于 $32$ 时, 推荐使用动态行列数, 此时将申请动态内存储存矩阵
* `Options` 行列存储方式, 默认为列优先 (即每按列遍历完一行再遍历下一行) `Eigen::ColMajor`, 使用 `Eigen::RowMajor` 可设置为行优先, 该选项在使用单个索引直接访问元素以及与其他程序交互时, 如 python 需要注意, 更多见[官方文档介绍](https://eigen.tuxfamily.org/dox/group__TopicStorageOrders.html)

此外还可使用 `Matrix + 行列数 + 类型` 的别名, 如
* `Eigen::Matrix3d` 3 x 3 的 double 型矩阵
* `Eigen::MatrixXi` 动态行列数的 int 型矩阵
* `Eigen::Matrix4cf` 4 x 4 的 float 型复数矩阵

Eigen 中的向量即仅有一行或一列的矩阵对象, 有别名 `(Row)Vector + 元素数 + 类型`, 如
* `Eigen::Vector3d` 3 元素的 double 型列向量
* `Eigen::RowVectorXi` 动态长度的 int 型行向量

#### 矩阵对象的初始化
可使用以下方式进行通常初始化  
注意除非指定值, 否则初始化矩阵中的值均为随机值, 因此推荐使用矩阵对象的静态方法初始化矩阵 

```cpp
// 对于行列数均为动态的矩阵, 可使用两个参数初始化, 表示初始状态下的矩阵大小
Eigen::MatrixXd mat1(3, 2);

// 对于行或列其中一个为动态的矩阵 (如向量) , 可使用一个参数初始化, 表示初始状态下动态行 / 列的大小
Eigen::VecotrXd vec1(3);

// 即使不给出任何参数也能初始化矩阵, 如果是动态矩阵, 则大小为 0
Eigen::MatrixXd mat2;

// 对于矩阵 (即行列均不为 1, 但可以是动态的), 可通过如下方式定义元素的初值
// 无论存储方式如何, 均以内部的 {} 代表矩阵第 n 行内的各个元素
Eigen::Matrix<double, Eigen::Dynamic, 3> mat3{
    {1, 2, 3},
    {4, 5, 6}
};

// 对于向量 (即行或列为 1), 无论行列向量都可以使用以下方式进行初始化 (注意元素位于第二层)
Eigen::VectorXd vec2{{1, 2, 3}};
```

除此之外还可以通过矩阵对象的静态方法定义一些特殊的矩阵 (仅大小为定义的动态长度矩阵需要参数 `rows, cols`)
* `Matrix::Random([rows, cols])` 创建一个随机数矩阵, 浮点值元素在区间 [-1,1] 内, 整形则为任意值
* `Matrix::Identity([rows, cols])` 创建单位矩阵, 不一定是正方形
* `Matrix::Zeros([rows, cols])` 创建元素全为 0 的矩阵, 推荐使用该方法初始化
* `Matrix::Constant([rows, cols], value)` 创建元素全为 `value` 的矩阵
* `Vector::LinSpaced(size, low, high)` 创建一个线性数列, 仅能生成向量或一维矩阵  
`size` 数列长度, `low` 数列左侧值, `high` 数列右侧值, 左右侧值都将包含在数列中

#### 将值载入矩阵
注意, 矩阵在初始化后, 就不能再使用 `{{...}, ...}` 的方式为矩阵对象赋值, 但可以使用以下方法将值载入矩阵, 或为未初始化的矩阵赋值

通过 `<<` 运算符可将一系列的值按顺序赋给矩阵对象  
* 无论矩阵是否行优先, 该方法都将从 (0, 0) 位置开始, 按列优先的方式填充数据 (即每按列填充完一行再填充下一行)
* 对于满足形状要求的向量 / 矩阵, 将按从左到右, 从上到下的方式插入, 因此
    * 可以填充向量对象 `Eigen::Vector/RowVector` 的方式, 确定矩阵的各行 / 各列
    * 可以填充矩阵对象, 已知矩阵的各个分块组成一个整体
    * 为了防止混乱, 建议仅插入单一类型, 最好不要同时插入数字与矩阵对象, 并且被插入的矩阵形状应当确定
* 允许在运算中使用 `<<` 创建临时矩阵对象, 但需要对整个表达式结果调用 `finished()` 对象, 例如  
`mat = (Eigen::Matrix2d() << 1, 2, 3, 4).finished() * mat;`
* 如果矩阵的行列数动态时, 则必须在初始化时指定初始行列数, 否则将导致异常

具体实例如下
```cpp
Eigen::Vector2f vec1 = {1, 2};
Eigen::Vector2f vec2 = {5, 6};

Eigen::Matrix2f a;
a << vec1, vec2;
```

此时打印 `a` 的结果为 (注意插入时的向量为列向量, 因此 `a` 的各列与插入向量对应, 而不是列优先)
```
a:
1 5
2 6
```

#### 访问矩阵元素
访问矩阵对象元素时, 需要使用 `()` 运算符, 而非 `[]`, 且均从 0 开始索引  
* 当给出一个参数 n 时, 将访问原始数据的第 n 个元素, 结果与[行列储存方式](#矩阵对象的类型)有关, 默认为列优先, 因此对于 3x3 的矩阵, n = 1 时, 将访问第二行, 第一列的元素
* 当给出两个参数 r, c 时, 将访问矩阵的第 r 行, 第 c 列的元素

#### 打印矩阵对象
通过 `<<` 运算符, 将矩阵对象作为右侧值与 `std::cout` 运算可实现输出矩阵内容的效果, 如  
`std::cout << "a:\n" << a << std::endl;`  
将实现输出矩阵对象 `a` 内容的效果

#### 矩阵形状查询
通过以下矩阵对象的成员函数查询矩阵的形状
* `Matrix::rows()` 获取矩阵的行数
* `Matrix::cols()` 获取矩阵的列数
* `Matrix::size()` 获取矩阵的元素个数

### 矩阵对象的运算
矩阵对象专门用于线性代数运算, 如果希望进行元素间的运算, 应当使用[数组对象](#数组对象基本操作)

#### 矩阵线性运算
* 对于两个==形状与元素类型相同==的矩阵, 允许 `+, -, +=, -=` 等线性加减运算  
    * 使用 `+=, -=` 时, 将覆盖原有的矩阵
* 对于单个比例值, 允许 `*, /, *=, /=` 等线性乘除运算
    * 使用 `/, *=, /=` 时, 比例值必须为右侧的操作数

在一个关于矩阵 (向量) 的线性表达式中, 如 `vec = a * vec1 + b * vec2 + ...`  
Eigen 并不会从左到右逐个计算, 而是将整合整个表达式, 最后在一个循环中计算 `vec(i) = a * vec1(i) + b * vec2(i) + ...`  
因此最好仅使用一个等式表示整个线性表达式, 而不是拆分为多个表达式以提升效率

#### 矩阵的变换运算
通过以下成员实现对矩阵的变换运算
* `Matrix::transpose()` 获取矩阵的转置
* `Matrix::conjudate()` 获取矩阵的共轭 (对于实数矩阵, 没有实际效果)
* `Matrix::adjoint()` 获取矩阵的共轭转置 (对于实数矩阵, 等价于转置)

以上变换运算的本质为返回一个引用了原矩阵的修饰器, 因此对于 `b = a.transpose()`, 当矩阵对象 `a` 的元素发生改变时, `b` 的元素也将随之发生改变, 相反效果相同  

因此, 除非将矩阵对象作为常量引用用于运算或原始对象不再使用 (不是销毁), 应使用以下版本成员函数完成运算, 直接获取运算的结果
* `Matrix::transposeInPlace()` 获取矩阵的转置
* `Matrix::conjudateInPlace()` 获取矩阵的共轭 (对于实数矩阵, 没有实际效果)
* `Matrix::adjointInPlace()` 获取矩阵的共轭转置 (对于实数矩阵, 等价于转置)

并且 `a = a.transpose()` 将导致内存泄漏, 这种行为是不允许的

#### 矩阵标准乘法
* 矩阵对象间的乘法运算 `*, *=` 即标准的矩阵乘法, 因此需要保证左侧矩阵的列数与右侧矩阵的行数相同
* 运算 `a *= b` 等价于 `a = a * b`
* 在进行矩阵乘法运算时, 首先将创建一个副本 `tmp = a * b`, 最后将结果保存到等号左侧 `c = tmp`, 以此避免了矩阵标准乘法的[混叠问题](#混叠问题)  
    * 这样做能保证 `a = a * b` 不会发生异常
    * 如果接收结果的变量是一个与运算无关的变量, 则可使用 `c.noalias()` 来避免这一额外开销, 例如 `c.noalias() += a * b`
* 向量点乘可使用向量的成员函数 `Vector::dot(vec)` 或根据定义使用共轭转置完成
    * 使用成员函数 `vec1.dot(vec2)`, 其中 `vec1, vec2` 均为列向量
    * 使用点乘定义 `vec1.adjoint() * vec2`
* 向量交叉积使用成员函数 `Vector::cross(vec)`, 如 `vec1.cross(vec2)`, 其中 `vec1, vec2` 均为列向量

#### 单矩阵统计
使用矩阵的成员函数完成以下单矩阵统计运算
* `Matrix::sum()` 计算矩阵元素和
* `Matrix::prod()` 计算矩阵元素积
* `Matrix::mean()` 计算矩阵元素的平均值
* `Matrix::minCoeff()` 获取矩阵的最小元素
* `Matrix::maxCoeff()` 获取矩阵的最大元素
* `Matrix::trace()` 计算矩阵的迹
* `Matrix::squaredNorm()` 计算矩阵的 p2 范数
* `Matrix::norm()` 计算矩阵的 Frobenius 范数 (F 范数)
* `Matrix::lpNorm<n>()` 计算矩阵的 pn 范数, 当 $n=\infty$ 则取 `Matrix::lpNorm<Eigen::Infinity>()`

对于以上取最大元素的函数, 还可以使用重载版本 `Matrix::maxCoeff<IndexType>(IndexType *row, IndexType *col)`  
其中 `row` 与 `col` 为保存最大值元素的行与列索引的变量地址, `IndexType` 可以是任意整形或 `Eigen::Index` 类型  
使用例子如下

```cpp
unsigned r, c;
a.maxCoeff(&r, &c);
```

对于最小值同理有 `Matrix::minCoeff<IndexType>(IndexType *row, IndexType *col)`  

#### 运算异常处理
当矩阵运算时出现了非法情况, 如矩阵大小不匹配, 将产生异常
* 对于确定大小的矩阵, 将抛出编译时错误
* 对于动态大小的矩阵, 将产生异常断言 (非调试模式下将被忽略)

此外当运算中两个矩阵对象的类型不同时, 不会进行自动类型转换, 而将产生异常  
特别是 `double` 与 `float` 类型的矩阵间运算时需要特别注意  

如果需要对矩阵的类型进行转换, 则可通过矩阵对象的成员 `Matrix::cast<NewScalarType>()` 完成, 其中 `NewScalarType` 转换的类型, 与矩阵对象模板中的 `Scaler` 相同  
该函数将返回一个原矩阵的常量修饰对象, 因此转换类型后的矩阵只能作为常量处理

#### 混叠问题
与线性运算类似, 对于其他的一般运算, Eigen 也将采用同样的方法处理, 即整合等式右侧的所有运算, 并在 `=` 处 (即将计算结果赋值给变量时) 开始具体运算  
但是当等号左侧的矩阵对象也参与了右侧的运算时, 将导致混叠问题 (更多可参考官方文档的[混叠问题处理](https://eigen.tuxfamily.org/dox/group__TopicAliasing.html))  

对于混叠问题, 应当注意以下要点
* 仅当接收结果的矩阵对象 (包括[取块的子对象](#取块操作)) 也参与了等式右侧的运算才要考虑混叠问题
* 对于元素间操作, 如矩阵的线性运算与[数组对象的运算](#数组对象间运算), 一般不需要担心混叠问题
* 对于矩阵相乘, 将使用临时变量储存结果以解决混叠问题, 如果不存在则使用 `mat.noalias() = ...` 的方式接收结果
* 对于[矩阵的变换运算](#矩阵的变换运算), 可使用带 `InPlace` 版本的函数代替原来的函数防止混叠
* 对于其他情况, 则应调用中间结果的成员函数 `Matrix::eval()` 以创建临时副本, 防止混叠问题, 例如  
`a.bottomRightCorner<2, 2>() = (a.bottomLeftCorner<2, 2>() + a.topRightCorner<2, 2>()).eval();`
* 注意 `Matrix::eval()` 的结果不能赋值给通过 `auto` 自动推断类型的变量

### 数组对象基本操作
在 Eigen 中, 矩阵对象用于标准的线性代数运算, 如果希望对矩阵中的各个元素进行运算, 则应当使用数组对象

#### 数组对象及其初始化
数组对象有着与矩阵对象类似的原型以及相同的模板  
`Eigen::Array<typename Scalar, int RowsAtCompileTime, int ColsAtCompileTime, int Options = Eigen::ColMajor>`

数组对象的模板参数与[矩阵对象的参数](#矩阵对象的类型)相同

但数组对象的别名格式与矩阵对象不同  
数组对象有别名 `Array + 行数 + [列数 +] 类型` (默认情况下列数为 1), 如
* `ArrayXf` 表示动态行数, 列数为 1 的浮点数组
* `Array33d` 表示 3x3 的双精度浮点数组

数组对象的初始化方式则与[矩阵对象的初始化](#矩阵对象的初始化)相同, 同样也可通过静态成员函数创建特定数组对象  

#### 数组对象间运算
* `arr1 +- arr2` 对于两个数组间的加减法与矩阵效果相同, 都是对应元素相加减
* `arr1 +- x` 数组还能与单个值相加减, 等价于对数组中所有元素与这个值相加减
* `arr1 */ arr2` 与矩阵不同, 数组间的相乘除的结果为数组内各个对应位置元素相乘除, 即元素间相乘除

除了以上的运算, 还可通过数组对象的成员函数完成比较运算, 或对数组内元素执行特定函数
* `arr = arr1.min/max(arr2)` 比较两个数组相同位置的元素, 并将较小 / 较大值作为结果 
* `Eigen::sin/exp/log/abs/pow...(arr)` 计算数组内各个元素的特定函数值 (注意, 矩阵对象无法作为这些函数的参数)
* 更多元素函数见[官方文档](https://eigen.tuxfamily.org/dox/group__CoeffwiseMathFunctions.html)

#### 数组元素的比较运算
* 直接将数组与数值进行比较将得到一个与比数组阵形状相同的, 元素类型为 `bool` 的布尔数组  
其中, 满足比较结果位置的元素值为 `true`, 否则为 `false`
* 调用布尔数组对象的成员 `Array::all()`, 当所有元素均为 `true` 时返回 `true`
* 调用布尔数组对象的成员 `Array::any()`, 当任一元素为 `true` 时返回 `true`
* 调用布尔数组对象的成员 `Array::count()`, 返回数组中元素值为 `true` 的个数

例如表达式 `(arr > 1).all()` 仅在数组 `arr` 中所有元素均大于 1 时返回 `true`

#### 数组对象与矩阵对象的转换
* 数组与矩阵间赋值  
对于相同形状与类型的数组对象与矩阵对象间, 可以相互使用 `=` 进行赋值而不需要转换
* 对象转换  
    * 对于一个矩阵对象, 如果希望对矩阵中的各个元素执行特定运算, 则可以通过矩阵对象的成员函数 `Matrix::array()` 将其临时转换为一个数组用于运算, 这一操作不会产生实际消耗
    * 同理, 数组对象也有成员函数 `Array::matrix()` 将其临时转换为矩阵对象
    * 由于矩阵元素间相乘较为常用, 也可使用矩阵对象的成员函数 `cwiseProduct` 完成这一运算 `mat = mat1.cwiseProduct(mat2)`

### 取块操作
块即矩阵或数组对象的一个部分, 这些块也能被视为一个子矩阵 / 子数组对象处理, 并且在运算时不会产生实际消耗  
以下介绍均已矩阵对象为主, 对于数组对象操作相同

#### 矩阵取块的一般方法
在取块前, 需要确定参数
* 所取块的行数 p 与列数 q
* 取块开始位置 (作为块的左上角元素) 的行索引 i 与列索引 j (从 0 开始计)

使用成员函数 `Matrix::block<>() / Matrix::block()` 取块
* 对于大小在编译前确定的块, p, q 为常量, 取块方式为 `blk = mat.block<p, q>(i, j)`
* 对于大小在编译时无法确定的块, 取块方式为 `blk = mat.block(i, j, p, q)`

#### 从矩阵的四个角取块
通过以下矩阵对象的成员函数完成从矩阵的四个角取块操作
* 左上角取块 `Matrix::topLeftCorner()`
* 左下角取块 `Matrix::bottomLeftCorner()`
* 右上角取块 `Matrix::topRightCorner()`
* 右下角取块 `Matrix::bottomRightCorner()`

使用时注意
* 与一般取块类似, 假设取 p 行 q 列的块, 当块大小在编译前确定, 则使用 `blk = mat.topLeftCorner<p, q>()` 的方式取块, 否则使用 `blk = mat.topLeftCorner(p, q)`
* 将以所选角点处的元素为起点, 向内取块

#### 其他取块操作
* 使用如下矩阵的成员函数可以完成取矩阵特定行 / 列
    * `Matrix::row(x)` 可以取出矩阵的第 x 行作为子矩阵对象
    * `Matrix::col(x)` 可以取出矩阵的第 x 列作为子矩阵对象
* 对于向量, 还有如下的块操作可以取向量特定位置的元素为子向量 (当 x 大小在编译前确定时使用右侧版本)
    * `Vector::head(n) / head<n>()` 取向量前 n 个元素
    * `Vector::tail(n) / tail<n>()` 取向量末尾 n 个元素
    * `Vector::segment(i, n) / segment<n>(i)` 取向量

#### 子矩阵对象
对于取块后的子矩阵对象
* 可以作为右值参与运算或赋给其他变量 (此时子矩阵内的值将被复制到其他变量中), 如  
`vec = mat.row(1);`
* 可以作为左值被其他矩阵对象赋值, 显然当子矩阵对象发生改变时, 父矩阵对应位置的元素也将改变, 如  
`mat.topLeftCorner<2, 2>() = Eigen::Matrix2d::Zero()`
* 如果希望切断子矩阵对象与原矩阵的联系, 可将子矩阵对象赋值给其他矩阵对象 (注意, 被赋值的参数应使用具体的类型, 而不是 `auto` 自动推断, 否则得到的依然是子矩阵对象)
* 由于子矩阵与父矩阵存在联系, 因此也会导致[混叠问题](#混叠问题), 因此当表达式两侧都有同一矩阵对象时, 应将整体包裹后调用成员函数 `Matrix::eval()` (具体可见混叠问题小节中的例子)

### 高级矩阵索引
通过以下高级索引方法也能用于创造子矩阵对象  
索引得到的子矩阵对象的操作与[取块操作](子矩阵对象)相同  
但是高级矩阵索引具有更大的灵活性

#### 切片索引
在进行切片索引前, 首先要确定以下索引要素
* 索引序列  
索引序列代表了一串索引值, 在索引矩阵时, 将按索引序列的顺序以此取行 / 列  
Eigen 提供了以下两种索引序列的构造函数, 具体例子见[官方文档](https://eigen.tuxfamily.org/dox/group__TutorialSlicingIndexing.html)  
    * `Eigen::seq(f, l, inc = 1)`  
    `f, l` 为开始与结束位置的索引, `inc` 为序列中索引值的间隔, 必定包含 `f`, 如果 `inc` 允许也将包含 `l`  
    例如 `seq(0, 1, 2)` 仅会索引 `0`, `seq(0, 1)` 将索引 `0, 1`
    * `Eigen::seqN(f, s, inc)`  
    `f` 为开始与结束位置的索引, `s` 为总共取的索引值, `inc` 为序列中索引值的间隔, 包含 `f`
    * 对于以上两种索引序列, 当参数 `inc` 为负数, `f` > `l` 时, 能够实现反向索引
* 索引代数  
在索引时, 可使用索引代数表示一些抽象的索引    
    * `Eigen::all` 表示所有索引, 可用此方法引出所有列 / 行
    * `Eigen::last` 指代索引总数 (即行 / 列数减一), 可直接用于索引或用于索引序列, 且可对该代数进行运算, 例如  
    `Eigen::last - 2` 表示倒数第 3 个索引, `Eigen::last / 2` 表示索引 `(mat.rows/cols() - 1) / 2`
* 编译前确定子矩阵  
对于确定的索引序列, 为了在编译时就能确定关于子矩阵对象的部分基本信息, 推荐使用 `Eigen::fix<x>` 代替 `Eigen::seq/seqN` 中的参数, 例如  
    * `v(Eigen::seq(Eigen::last - Eigen::fix<7>, Eigen::last - Eigen::fix<2>))` 可在编译前确定子向量长度为 6
    * `A(Eigen::seqN(Eigen::last, Eigen::fix<3>, Eigen::fix<-1>), Eigen::all)` 可在编译前确定矩阵有 3 行

在索引要素确定后, 使用索引序列或索引代数代替[一般索引](#访问矩阵元素与形状)的 `(row, col)` 运算符中的参数即可实现切片索引  
先根据行的索引序列取特定的行后, 再根据列的索引序列从取出的行中取元素, 并按索引序列中的索引重新组成一个新的子矩阵对象

#### 以数组作为索引序列
除了使用 `Eigen::seq/seqN` 表示索引序列, 还可以使用以下类型的变量代替索引序列
* 常量整数数组, 如 `res = A(Eigen::all, {1, 2, 1});`
* STL 中的数组对象 `std::array`
* 一维整数数组对象 `Eigen::ArrayXi`

#### 自定义索引
见官方文档的有关介绍 <https://eigen.tuxfamily.org/dox/group__TutorialSlicingIndexing.html>

### 高级操作

#### 按行列广播
关于广播操作的例子见[官方文档](https://eigen.tuxfamily.org/dox/group__TutorialReductionsVisitorsBroadcasting.html)  
使用矩阵对象的成员函数 `Matrix::rowwise()` 与 `Matrix::colwise()` 可分别实现按行与按列广播

可通过以下两种方式实现广播
* 在调用 `mat.rowwise() / mat.colwise()` 后立即调用其他与向量对象有关的成员函数, 将根据广播方式遍历矩阵的各行 / 各列并分别执行这个被调用的成员函数, 将结果依照调用顺序重新组合为一个列向量 / 行向量 (相当于使用运算结果替换矩阵原来的行向量), 例如  
`mat.rowwise().maxCoeff()` 将遍历矩阵 `mat` 的各行, 计算各行的最大值, 并将结果保存为一个列向量 
* 在调用 `mat.rowwise() / mat.colwise()` 后, 与其他向量进行线性运算, 相当于取出矩阵的各行 / 各列分别进行线性运算, 并使用运算结果代替原来的行 / 列向量, 例如 `mat.colwise() + Eigen::Vector3d{1, 2, 3}` (注意按列广播则取出的时列向量)
* 调用 `mat.rowwise() / mat.colwise()` 后作为左值, 使用 `+=` 等运算符与其他向量进行线性运算, 相当于对矩阵的各行 / 列分别进行运算并重新赋值, 例如 `mat.colwise() += Eigen::Vector3d{1, 2, 3}` 相当于将向量各列加上向量 $[1, 2, 3]^T$

注意, 广播操作仅在最近的一个运算生效, 例如运算 `(mat.colwise() + Eigen::Vector3d{1, 2}) + Eigen::Vector2d{2, 3}`  
经过第一次广播相加后, 得到的结果是一个矩阵, 之后再加上其他向量显然是非法的  

#### 矩阵变形
一般情况下使用成员函数 `Matrix::reshaped<Order>(nRows, nCols)` 实现矩阵变形, 其中
* `Order` 变形时的读取顺序, 默认情况下为列优先 `Eigen::ColMajor`, 读取矩阵与确定变形结果都是先遍历矩阵第一列的各行元素, 遍历完再进入下一列 (与矩阵保存数据的方式无关), 此外还有
    * `Eigen::RowMajor` 行优先, 与列优先类似, 但是先遍历第一行各列元素
    * `Eigen::AutoOrder` 由矩阵保存数据的方式决定
* `nRows, nCols` 变形结果的行数与列数, 如果没有给出参数, 则会将矩阵变形为列向量

使用 `Matrix::reshaped` 对矩阵变形的本质也仅是在原矩阵基础上添加一个修饰器, 因此也会存在与[矩阵的变换运算](#矩阵的变换运算)相同的混叠问题  
如果希望得到矩阵变形的复制, 则应使用 `Matrix::resize(nRows, nCols)`, 该函数的效果与 `Matrix::transposeInPlace()` 类似, 也是创建一个新的拷贝, 但是与 `Matrix::reshaped()` 不同, 该函数的变形结果无法设置读取顺序, 且使用与矩阵对象保存数据方式相同的读取顺序

#### 迭代器
Eigen 的向量对象支持生成 C++ 迭代器以迭代矩阵对象内的元素 (注意矩阵对象不支持, 因此迭代矩阵前需要使用 `Matrix::reshape()` 变形为向量)

因此对于 C++ 11, 可使用迭代器的 `for` 循环以迭代向量内的元素  
`for(auto it : mat.reshape()){...}`

也可将迭代器用于标准库 `algorithm` 中的排序算法以对元素进行排序  
`std::sort(vec.begin(), vec.end());`

如果希望遍历矩阵的行向量或列向量, 则可以使用 `Matrix::rowwise() / Matrix::colwise()` (与广播操作同) 作为被迭代容器, 此时迭代变量即行向量 / 列向量, 例如以下代码将为矩阵的各列分别排序  
`for(auto vec : mat.colwise()){std::sort(vec.begin(), vec.end());}`

#### 内存映射
如果希望将一块内存空间中的数据视为矩阵处理, 则可以使用内存映射对象 `Eigen::Map<typename MatrixType>`  
其中 `MatrixType` 为被映射为的矩阵对象类型, 经过映射后, 即可将映射对象视为与 `MatrixType` 一样的矩阵对象处理  

注意
* 读取内存的方式则由 `MatrixType` 中的[行列存储方式设置](矩阵对象的类型)决定
* 当映射对象内的元素被改变时, 对应的内存里的值也将随之改变
* 可以设置类型为 `const MatrixType`, 此时映射对象的元素是只读的, 无法修改

初始化内存映射对象则需要参数 `Eigen::Map<typename MatrixType>(pointer, row, col);`
* `pointer` 映射内存的开始地址, 即一个与矩阵元素类型相同的指针
* `row, col` 矩阵形状, 与一般[矩阵对象初始化](#矩阵对象的初始化)相同, 如果矩阵形状确定, 则不需要

如果需要修改内存映射对象中, 映射的内存地址, 则需要利用 C++ 的 placement new 语法, 该语法的原始含义为 `new ([内存地址]) [对象初值]`, 即在指定的内存地址上创建对象, 但在映射对象中被重载, 使用时的语法如下  
`new (被修改对象的指针) 新的内存映射对象`

其中
* 需要以指针的形式传入被修改对象
* 使用字面量的形式构造新的内存映射对象 (即直接引用构造函数), 注意新的映射对象与被修改对象的类型必须相同

例如
```cpp
typedef Eigen::Map<Eigen::Matrix<float, 2, 3> > maptype;
float p1[] = {1, 2, 3, 4, 5, 6};
float p2[] = {0, 0, 0, 1, 1, 1};

maptype mp(p1);

std::cout << "mp:\n" << mp << std::endl;
new (&mp) maptype(p2);
std::cout << "mp:\n" << mp << std::endl;    
```

#### 在函数中引用矩阵对象
参考资料 <https://stackoverflow.com/questions/21132538/correct-usage-of-the-eigenref-class>

当定义了有关矩阵对象的函数时, 为了提升效率与兼容性, 推荐使用 `Eigen::Ref<typename MatrixType>` 表示矩阵对象的引用参数  
简单来说
* 表示可修改的引用时使用 `Eigen::Ref<MatrixType>` 作为参数的类型
* 表示常量引用时使用 `const Eigen::Ref<const MatrixType>&` 作为参数的类型
* 除了作为参数, 也可用于表示返回值

#### pybind11 与 Eigen 交互
参考资料 <https://pybind11.readthedocs.io/en/latest/advanced/cast/eigen.html>

### 线性代数
TODO  
见官方文档的[有关介绍](https://eigen.tuxfamily.org/dox/group__TutorialLinearAlgebra.html)
