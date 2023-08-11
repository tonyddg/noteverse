# C++ 实用库的使用与介绍

## 正则表达式
### 使用
使用时确保使用的标准为C11以上
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

## 控制台虚拟终端序列
### 启用
#### Windows下的启用方式
```cpp
    HANDLE hOut = GetStdHandle(STD_OUTPUT_HANDLE);
    if (hOut == INVALID_HANDLE_VALUE)
    {
        return GetLastError();
    }

    DWORD dwMode = 0;
    if (!GetConsoleMode(hOut, &dwMode))
    {
        return GetLastError();
    }

    //0x0004为宏ENABLE_VIRTUAL_TERMINAL_PROCESSING的值
    dwMode |= 0x0004;
    
    if (!SetConsoleMode(hOut, dwMode))
    {
        return GetLastError();
    }
```
#### Linux下的启用方式
默认情况下linux可以直接使用
### 基本使用
```cpp
"\e (\033)" //可用于特殊的控制台输出控制
"\e[x;y;zm" //修改文字的背景颜色与底色
"\e[0m" //恢复默认格式
"\ec" //清屏
"\e[x;yH" //移动光标位置
"\e[s" //记录光标位置
"\e[u" //回复光标位置
```

#### 参考
<https://learn.microsoft.com/zh-cn/windows/console/console-virtual-terminal-sequences?source=recommendations>
