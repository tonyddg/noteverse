## C++下的正则表达式
### 使用
使用时确保使用的标准为C11以上
```C++
#include <regex>
```
### 字符转义
正则表达式用的\字符在C++字符串中需要经过转义(\\\\)
### 匹配函数
#### regex_match
match是全文匹配，即要求整个字符串符合匹配规则。
### 参考
<https://blog.csdn.net/qq_34802416/article/details/79307102>
<http://www.cplusplus.com/reference/regex/>