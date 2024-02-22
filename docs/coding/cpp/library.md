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

项目的配置见 [CMake 笔记](./cmake.md#pybind11)  
约定使用命名空间的别名 `namespace py = pybind11;`

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

### C++ 导出 Python 模块
参考文档 <https://pybind11.readthedocs.io/en/latest/basics.html>  
通过头文件 `#include <pybind11/pybind11.h>"` 完成将 C++ 内容导出为 Python 模块

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

#### 矩阵对象的引用 (在函数中使用矩阵对象)
参考资料 <https://stackoverflow.com/questions/21132538/correct-usage-of-the-eigenref-class>

当定义了有关矩阵对象的函数时, 为了提升效率推荐使用 `Eigen::Ref<typename MatrixType>` 表示矩阵对象的引用参数  
简单来说
* 表示可修改的引用时使用 `Eigen::Ref<MatrixType>` 作为参数的类型
* 表示常量引用时使用 `const Eigen::Ref<const MatrixType>&` 作为参数的类型

#### pybind11 与 Eigen 交互
参考资料 <https://pybind11.readthedocs.io/en/latest/advanced/cast/eigen.html>

### 线性代数
TODO  
见官方文档的[有关介绍](https://eigen.tuxfamily.org/dox/group__TutorialLinearAlgebra.html)
