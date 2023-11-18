# C++ 实用库的使用与介绍

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

提供了类似 [Python 格式化字符串](/docs/coding/py/base/base.md#转义与格式化)功能  
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
