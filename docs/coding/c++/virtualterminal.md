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
### 基本格式
