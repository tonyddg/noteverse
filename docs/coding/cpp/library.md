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

## 多线程 std::thread
<https://blog.csdn.net/qq_15041569/article/details/131798965>  
<https://mp.weixin.qq.com/s?__biz=MzkyMjIxMzIxNA==&mid=2247484579&idx=1&sn=07ffd2a0b7cb37c739387e2e3327641b&chksm=c1f68a92f6810384c314254b36b0d188a61b87ad52c3503ca7d4282be78a050fbc85a4549aed&token=327902945&lang=zh_CN#rd>  
<https://blog.csdn.net/weixin_45663220/article/details/120686644>  

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
