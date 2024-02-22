# CMake 笔记
## 流程控制
### 基本语法
#### 基本语法
1. CMake 中的所有语言结构均为命令, 并在命令后的 `()` 内填入参数, 多个参数使用空格分隔
1. 命令必须以 `()` 结尾, 即使该命令没有参数
1. 通常使用小写字母表示命令, 大写字母表示变量
1. 使用 `#` 作为注释符号
1. 将 `CMakeLists.txt` 作为执行主体, 其余 `.cmake` 文件需要通过 `CMakeLists.txt` 引用才能执行
1. 执行 `CMakeLists.txt` 后仅能构建项目如 makefile 或 VisualStudio 项目, 而不会进行编译 

#### 执行构建
1. 打开存放构建文件的目录 `build`
1. 在该目录中运行命令 `cmake <CMakeLists.txt 文件目录>` 执行构建

### 字符串
参考文章 <https://blog.csdn.net/jjjstephen/article/details/122415231>

#### 变量定义
* 使用命令 `set` 定义或修改字符串变量, 格式如下   
`set(<变量名称> <字符串值> [CACHE|PARENT_SCOPE])`
    * `CACHE` 用于定义[缓存变量](#缓存变量)
    * `PARENT_SCOPE` 用于在父作用域上定义或修改变量, 一般用于[函数](#函数)

* 使用命令 `unset` 删除已定义的字符串变量  
`unset(<变量名称> [CACHE])`
    * `CACHE` 用于删除[缓存变量](#缓存变量)
    * `PARENT_SCOPE` 用于在父作用域上删除变量

#### 字符串表示
表示字符串时, 可以不需要 `""` 包裹, 但此时空格与换行与 `;` 将被作为[列表](#列表)分隔符  
当使用 `""` 包裹时, 空格则能被读取到  
例如对于定义 `set(text a "b c")`, 有 `${text}="a;b c"`

通过 `${val}` 的方式可以引用变量  
例如 `set(path ./src) set(cppFile ${path}/main.cpp)`, 有 `${cppFile}="./src/main.cpp"`  

该语句的实质为从最近的作用域中, 寻找一个名称为 `val` 的变量, 因此可将任何字符串作为 `val`, 例如  
`${${val}}` 将寻找具有与 `${val}` 对应字符串相同名称的变量 

字符串中可使用 `\` 进行转义, 常用的转义有  
`\n` 换行, `\\` 表示 `\`, `\"` 表示 `"`, `\$` 表示 `$`, `\{` 表示 `{`, `\}` 表示 `}`

#### 字符串操作
使用命令 `string` 操作字符串, 格式如下
`string(<操作类型> ...)`

* 寻找子字符串 `string(FIND <input> <sub> <indVar> [REVERSE])`
    * `input` 输入字符串, 应传入字符串而不是变量名称
    * `sub` 用于匹配的子字符串, 应传入字符串而不是变量名称
    * `indVar` 保存第一个匹配位置的索引, 不存在时为 `-1`, 传入变量名称 (自动创建)
    * `REVERSE` 启用此选项时, 将从后往前寻找
    * 使用例子  
    定义字符串 `set(text cabcbabc)` 寻找字符串 `string(FIND ${text} abc ind)`  
    运行后结果 `${ind}="1"`
* 字符串替换 `string(REPLACE <match> <replace> <outVar> <input>)`  
    * `match` 用于匹配的字符串
    * `replace` 匹配后替换的字符串
    * `outVar` 替换结果保存变量, 传入变量名称 (自动创建)
    * `input` 输入字符串
    * 使用例子  
    定义字符串 `set(text cabcbabc)` 替换字符串 `string(REPLACE abc xyz out ${text})`  
    运行后结果 `${out}="cxyzbxyz"`
* 提取子字符串 `string(SUBSTRING <input> <index> <len> <outVar>)`  
    * `input` 输入字符串
    * `index` 提取开始位置
    * `len` 提取长度
    * `outVar` 提取结果, 传入变量名称 (自动创建)
    * 使用例子  
    定义字符串 `set(text cabcbabc)` 提取字符串 `string(SUBSTRING ${text} 2 3 out)`  
    运行后结果 `${out}="bcb"`
* 字符串长度 `string(LENGTH input outVar)`  
    * `input` 输入字符串
    * `outVar` 提取结果, 传入变量名称 (自动创建)
    * 使用例子  
    定义字符串 `set(text cabcbabc)` 提取字符串 `string(LENGTH ${text} out)`  
    运行后结果 `${out}="8"`
* 正则操作  
见有关文档的介绍

#### 字符串打印
使用命令 `message` 操作字符串, 格式如下
`message([消息类型] <str>)`
* `消息类型` 常有消息类型如下
    * `STATUS` 一般状态 (默认的类型)
    * `WARNING` 警告, 不会中断处理
    * `FATAL_ERROR` 严重错误, 打印后处理也将终端
* `str` 用于打印的字符串  
    * 仅打印变量时注意, 当变量为空时将导致出错
    * 对于列表, 其中的分隔符将被忽略

### 其他变量类型
CMake 将所有变量视为字符串, 仅在特定的上下文中, 可将一些变量视为其他类型并操作

#### 条件 (布尔型)
使用 `ON/YES/TRUE/非零数` 表示真  
使用 `OFF/NO/FALSE/0` 表示假  

具体使用见 [条件判断](#条件判断)

#### 数字
使用命令 `math` 对数字字符串 (及支持整数) 进行运算  
`math(EXPR <outVar> <expr>)`
* `outVar` 保存计算结果的变量, 传入变量名称 (自动创建)
* `expr` 用于计算的字符出字符串, 可通过 `${}` 将变量值传入表达式, 运算符与规则同 c
* 使用例子  
定义值 `set(x 6)` 运算 `math(EXPR y "(${x} - 2) / 3")`  
运行后结果 `${y}="1"`

#### 列表
CMake 将使用 `;`, ` ` 或换行分隔的字符串视为列表 (末尾不需要 `;`)  
使用命令 `list` 操作列表, 格式如下  
`list(<操作类型> ...)`

* 列表长度 `list(LENGTH <listVar> <outVar>)`
    * `listVar` 列表变量名称, 传入变量名称
    * `outVar` 列表长度, 传入变量名称 (自动创建)
    * 使用例子  
    定义列表 `set(text a;b c;d"\n"e)` 获取长度 `list(LENGTH text out)` (此处的 `"\n"` 表示实际换行, 而非字面含义)  
    运行后结果 `${out}="5"`
* 获取元素 `list(GET <listVar> <index> <outVar>)`
    * `listVar` 列表变量名称, 传入变量名称
    * `index` 获取的索引值, 从 0 开始计
    * `outVar` 元素值, 传入变量名称 (自动创建)
    * 使用例子  
    定义列表 `set(text a;b;c;d)` 获取元素 `list(GET text 2 out)`  
    运行后结果 `${out}="c"`
* 插入元素 `list(APPEND <listVar> <item>)`
    * `listVar` 列表变量名称, 传入变量名称, 插入后原列表修改
    * `item` 插入元素, 传入变量名称 (自动创建)
    * 使用例子  
    定义列表 `set(text a;b;c;d)` 插入元素 `list(APPEND text e)`  
    运行后结果 `${text}="a;b;c;d;e"`
* 删除元素 `list(REMOVE_AT <listVar> <index>)`
    * `listVar` 列表变量名称, 传入变量名称
    * `index` 被删除元素的索引值, 从 0 开始计
    * 使用例子  
    定义列表 `set(text a;b;c;d)` 删除元素 `list(REMOVE_AT text 2)`  
    运行后结果 `${text}="a;b;d"`

#### 路径
参考文章 <https://www.jianshu.com/p/be1024b6b6ed>  

注意在 CMAKE 中的路径操作时, 通常采用的是 CMAKE 风格, 主要为以 `/` 为分隔符  
可以此风格的路径作为参数进行配置, 仅在 `ADD_CUSTOM_COMMAND` 等执行命令时需要传入系统风格的路径

* 定义路径 `cmake_path(SET <pathVar> [NORMALIZE] <input>)`
    * `pathVar` 定义的路径变量名称
    * `NORMALIZE` 是否规范化路径为 CMAKE 风格, 将替换分隔符, 删除重复的分隔符等
    * `input` 输入的路径字符串
    * 使用例子
    命令 `cmake_path(SET path NORMALIZE "home//build\\\\CMakeCache.txt")`  
    运行结果 `${path}="home/build/CMakeCache.txt"`
* 连接路径 `cmake_path(APPEND <res> <path1> <path2>...)`
    * `res` 保存拼接结果的变量, 拼接时会按需要添加分隔符并将分隔符转为 `/` (不删除多余分隔符)
    * `path1/2` 用于拼接的路径字符串, 当 `path2` 为绝对路径时可能导致拼接失败
    * 使用例子
    命令 `cmake_path(APPEND path "//include" "build\\\\CMakeCache.txt")`  
    运行结果 `${path}="//include/build//CMakeCache.txt"`
* 获取路径信息 `cmake_path(GET <pathVar> <获取属性> <outVar>)`  
    * `pathVar` 用于解析的路径==变量== (不能直接传入字符串)
    * `outVar` 解析结果保存变量
    * `获取属性` 需要获取的属性, 常用有
        * `FILENAME` 文件完整名称, 包含扩展名, 不会区分目录或文件
        * `EXTENSION [LAST_ONLY]` 文件所有扩展名 (如 `a.ex1.ex2` 获取结果为 `.ex1.ex2`), 启用 `LAST_ONLY` 将仅保留最后一个扩展
        * `STEM` 文件基本名称, 不包含扩展名
        * `PARENT_PATH` 文件父目录的路径, 可处理多重分隔符
        * `ROOT_NAME` 根目录名称, 用于 Windows 系统以获取盘符, 在 Linux 中以及相对路径中结果为空
    * 使用例子  
    定义变量 `set(path "\\dir\\\\a.exe")`  
    命令 `cmake_path(GET path PARENT_PATH res)`  
    运行结果 `${res}="\dir"`
* 转换路径规范 `cmake_path(CONVERT <path> <目标规范> <outVar> [NORMALIZE])`
    * `path` 用于转换的路径==字符串==或==路径字符串列表==, 传入列表时还将按系统规范转换路径间的分隔符
    * `outVar` 转换结果保存变量
    * `NORMALIZE` 除转换为还进一步规范化路径
    * `目标规范` 设置转换目标采用的规范
        * `TO_cmake_path_LIST` 转换为 CMAKE 规范
        * `TO_NATIVE_PATH_LIST` 转换为本地系统的规范
    * 使用例子  
    命令 `cmake_path(CONVERT "/dir\\\\a.exe" TO_NATIVE_PATH_LIST res NORMALIZE)`
    运行结果 `${res}="\dir\a.exe"`

### 缓存变量
缓存变量是一类特殊变量, 在第一次运行时, 需用通过命令行或 GUI 确定变量的值, 并一直保存在 `build` 中的 `CMakeCache.txt` 文件  

当使用 `set` 定义了一个与缓存变量同名的一般变量时, 一般变量优先

#### 定义缓存变量
使用命令 `set` 可用于定义缓存变量, 格式如下  
`set(<varName> <init> CACHE <type> <helpStr> [FORCE])`
* `varName` 变量名称
* `init` 变量初始值
* `type` 变量类型, 主要有以下常用类型
    * `BOOL` 布尔型变量, GUI 为一个复选框
    * `STRING` 字符串
    * `PATH` 文件路径 (有专门的 GUI 用于选择路径)
* `helpStr` 解释字符串, 注意不可省略
* `FORCE` 启用此选项后, 将强制刷新已有的缓存变量, 否则当缓存已存在与 `CMakeCache.txt` 时将无法修改值

#### 定义缓存选项
使用命令 `option` 定义缓存选项, 格式如下  
`option(<optName> <helpStr> [valStr])`  
* `optName` 条件变量名称
* `helpStr` 解释字符串, 不可省略
* `valStr` 条件变量的值, 开启为 `ON/YES/TRUE/非零数`, 默认或其他字符串表示 `OFF/NO/FALSE/0` 

#### 修改缓存变量
* 直接修改 `build` 下的 `CMakeCache.txt` 文件
* 通过 CMake-gui 选择项目目录与 `build` 目录修改, 将自动读取缓存变量并修改
* 使用 `CMake` 命令时添加选项 `-D<缓存变量名称>[:变量类型]=<变量值>`

#### 通过命令定义缓存变量
见[定义缓存变量](#定义缓存变量)

### 条件判断
参考文章 <https://blog.csdn.net/fengbingchun/article/details/127946047>

#### 条件语句格式
```cmake
if(<判断语句>)
<命令>
elseif(<判断语句>)
<命令>
else()
<命令>
endif()
```

#### 常用判断语句
* 值为真 `<str>`   
    * `str` 被判断的字符串 / 变量名
    * 当 `str` 取 `ON/YES/TRUE/非零数` 时为真
* 变量已定义 `DEFINE <val>`  
    * `val` 用于判断的变量名 (不是字符串)
    * 当 `val` 已经定义时为真, 包括缓存变量
* 文件存在 `EXISTS <path>`
    * `path` 用于判断的路径字符串
    * 当 `path` 指向的文件或文件夹存在时为真    
* 绝对路径判断 `IS_ABSOLUTE <path>`  
* 目录判断 `IS_DIRECTORY <path>`  
* 字符串比较 `<str1> STREQUAL <str2>`  
    * `str1/2` 用于比较的字符串 / 变量名
    * 当两个字符串相同时为真
* 正则匹配 `<str> MATCH <regex>`  
    * `str` 用于比较的字符串 / 变量名
    * `regex` 正则表达式字符串 (似乎对 `\\w+` 支持有问题, 可使用 `[A-Z]+` 或 `\\w*` 或直接使用需要匹配的子字符串) 
    * 当字符串部分或全部匹配时为真
* 数字比较 `<val1> EQUAL <val2>`
    * `val1/2` 用于比较的数字, 可以是字符串 / 变量名
    * 除 `EQUAL` 还有 `LESS`, `GREATER`, `LESS_EQUAL`, `GREATER_EQUAL` 等比较方式
    * 满足比较条件时为真

#### 逻辑运算
逻辑语句之间可使用 `NOT`, `OR`, `AND` 进行连接  
可通过括号控制运算的优先级

### 流程控制
#### foreach 循环
`foreach` 循环有如下基本结构
```cmake
foreach(<iter> ...)
...
endforeach()
```

* 遍历列表 `foreach(<iter> <listStr>)`
    * `iter` 迭代元素
    * `listStr` 被迭代==列表字符串==, 不能传入变量
* 遍历变量 `foreach(<iter> IN LISTS <listVar>)`
    * `iter` 迭代元素
    * `listStr` 被迭代==列表变量==
* 按次循环 `foreach(<iter> RANGE <stop>)`
    * `iter` 迭代变量
    * `stop` 停止值, 注意迭代将从 0 开始, 直到停止值, 因此循环此时为停止值 + 1

#### while 循环
`while` 循环有如下基本结构
```cmake
while(<条件语句>)
...
endwhile()
```

当条件语句为真时执行循环

可使用 `break()` 与 `continue()` 控制循环 (也可用于[foreach](#foreach-循环))

#### 函数
函数的基本结构
```cmake
function(<name> [arg1] [arg2]...)
...
endfunction()
```

* `name` 函数名, 通过此函数名调用函数
* `arg` 函数参数

由于函数中的作用域比调用函数的位置低一级, 因此函数可以访问外部的值, 但无法修改  
如果希望修改外部的值, 则需要启用 `set` 命令的 `PARENT_SCOPE` 选项, 例如
```cmake
function(fun opt)
    set(${CMAKE_CXX_STANDARD} ${opt} PARENT_SCOPE)
endfunction()
```

CMake 中的函数仅能传入字符串, 但可通过将变量作为名参数的方式传递值, 并使用 `set` 操作 (类似将变量名称字符串视为变量的指针)  
可以此实现类似引用的效果与返回值, 例如
```cmake
function(fun result_val)
    set(${${result_val}} "Hello" PARENT_SCOPE)
endfunction()
```

通过语句 `return()` 可以提前退出函数, 但不能返回值

#### 引用其他文件
使用命令 `include` 执行并引用其他 CMAKE 文件 (扩展名为 `.cmake`)  

引用文件时将执行被引用文件, 且引用的文件中具有与引用位置相同的作用域  
可将部分操作作为封装为函数并写入单独的 `.cmake` 中, 在需要使用时引用

### 文件操作
#### 文件查找
使用命令 `file(<GLOB|GLOB_RECURSE> <res> [LIST_DIRECTORIES true|false] [RELATIVE <path>] <express1> <express2> ...)` 可以查找文件, 如源文件
* `res` 查找结果保存变量, 为一个列表, 保存了所有满足查找结果的文件路径 (绝对路径)
* `express` 查找文件的表达式字符串, 允许使用 `*` 与 `?` 等通配符, 可以此实现查找所有源文件的效果, 如 `src/*.cpp`
* `LIST_DIRECTORIES` 用于递归查询, 是否将递归结果中的目录放在结果中, 默认关闭
* `RELATIVE <path>` 查找路径, 默认为当前的 `CMakeLists.txt` 所在路径
* `GLOB|GLOB_RECURSE` `GLOB` 表示仅查找当前目录, `GLOB_RECURSE` 则将进行递归查找
* 使用示例  
命令 `file(GLOB SOURCE_FILE "${PROJECT_SOURCE_DIR}/src/*.cpp" "${PROJECT_SOURCE_DIR}/src/*.c")` 将寻找文件夹 `src` 下所有的 `.c` 与 `.cpp` 文件

使用命令 `aux_source_directory(<res> <dir>)` 将寻找指定目录下所有源文件
* `res` 保存查询结果的变量, 为一个列表
* `dir` 查询的文件夹

#### 其他常用文件操作
* 命令 `file([FILE_COPY|COPY] <source> <dest>)` 复制文件
    * `FILE_COPY` 复制单个文件为指定文件
    * `COPY` 复制多个文件与目录到指定目录下
* 命令 `file(RENAME <source> <dest>)` 重命名 (移动) 文件
* 命令 `file([WRITE|APPEND] <file> <content>)` 创建文件并写入内容, 文件不存在时将创建
    * `WRITE` 写入时将覆盖原有内容
    * `APPEND` 写入时将在文件末尾添加内容

## 项目配置
参考文章 <https://blog.csdn.net/qq_43495002/article/details/134000654>

### 项目基本配置
对于任何 `CMakeLists.txt` 项目在配置前都应当设置 CMake 版本要求与项目信息

#### CMake 版本要求
通过命令 `cmake_minimum_required(VERSION <version>)` 设置 CMAKE 的最低版本要求
* `version` 即需最低版本号的字符串, 通常版本 `3.10` 可满足大部分要求

经过命令设置后, 可通过变量 `CMAKE_MINIMUM_REQUIRED_VERSION` 查询设置的版本要求

#### 项目信息
通过命令 `project(<name> [VERSION <ver>] [LANGUAGES <lang>])` 设置项目信息
* `name` 项目名称字符串
* `ver` 项目版本号的字符串
* `lang` 项目需要的语言, 多个语言时输入字符串, 经过此设置后 CMake 将检查对应语言的编译器 `CMAKE_XXX_COMPILER` 是否存在  
主要语言的表示字符串有
    * `C` C 语言 (默认)
    * `CXX` C++ (默认)
    * `ASM` 汇编语言

经过设置项目信息后, 可通过以下变量读取信息
* `PROJECT_NAME` 当前项目名称
* `PROJECT_SOURCE_DIR` 当前项目源码目录 (通常即该项目的 `CMakeLists.txt` 文件所在目录)
* `PROJECT_BINARY_DIR` 生成文件存放目录 (通常即 `build` 目录)

#### 其他项目信息
通过设置变量 `CMAKE_XXX_STANDARD` 查询与设置项目中语言 `XXX` 标准要求, 标准即一个数字 (不建议通过编译选项设置标准要求)  
* 对于 `CXX` (C++) 常用的有 `98`, `11`, `17` 等
* 对于 `C` 常用的有 `98`, `11`

之后还要设置变量 `CMAKE_CXX_STANDARD_REQUIRED` 为 `ON`, 开启要求

通过设置变量 `CMAKE_BUILD_TYPE` 查询与设置项目的构建类型, 通常有以下构建类型
* `Debug` 调试版本, 启用编译选项 `-g`, 默认采用此设置
* `Release` 发行版本, 启用编译选项 `-O3 -DNDEBUG`
* `RelWithDebugInfo` 保存调试信息的发行版本, 启用编译选项 `-O2 -g`
* `MinSizeRel` 最小体积发行版本, 启用编译选项 `-Os -DNDEBUG`
* 编译选项中
    * `-DNDBUG` 将定义宏 `NDEBUG` 并屏蔽如 `assert` 等断言, 以使源代码可通过宏判断 `#if` 跳过调试代码
    * `-Ox,-g` 见[编译器配置](#编译器配置)中的介绍

### 编译配置
通过查看 `build` 下的文件 `compile_commands.json` 可查看最终编译选项

#### 编译器配置
通过命令 `add_compile_definitions(<def1> <def2> ...)` 设置预定义宏
* `def` 预定义的宏, 等价为 GCC 的 `-D` 命令
* 定义格式为 `-D<宏名称>[=[宏值]]`, 注意如果定义宏的值时, 则等号之间不能有空格, 默认值为 1
* 此命令将对之后所有生成的目标生效

通过命令 `add_compile_options(<options>)` 设置编译时向编译器传递的编译选项, 如 gcc
* `options` 用于传递的编译选项, 允许传入列表
* 注意, 使用此命令时, 将对所有编译器传入选项
* 仅当[生成目标](#生成目标)前设置有效, 生成目标后配置不会生效

通过设置变量 `CMAKE_XXX_FLAGS` 查询与设置项目语言 `XXX` 的全局编译选项
* 此变量无法查询通过 `add_compile_options` 设置的选型
* 由于选项间不能有 `;`, 因此不能将选项作为列表, 添加选项时应在原有基础上添加, 如 `set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall")` (注意选项间的空格)

通过设置变量 `CMAKE_XXX_FLAGS_YYY` 查询与设置项目语言 `XXX` 在构建类型 `YYY` 下的编译选项  
* 此变量在赋值前已有[默认值](#其他项目信息), 直接赋值将覆盖
* 最终编译选项将由 `add_compile_options`, `CMAKE_XXX_FLAGS`, 对应构建模式下的 `CMAKE_XXX_FLAGS_YYY` 共同决定

对于 GCC 编译器, 详见[官方文档](https://gcc.gnu.org/onlinedocs/gcc/Invoking-GCC.html), 常用的编译选项如下
* `-Wall` 显示所有类型的错误
* `-Werror` 将所有警告视为错误处理
* `-Ox` 优化配置, 主要有
    * `-Og` 在不影响调试的情况下, 优化编译速度, 运行速度与结果大小
    * `-O1` 不影响编译速度的前提下, 提升代码速度
    * `-O3` 降低编译速度, 极大提升代码运行速度, 但导致结果增大
    * `-Os` 降低编译速度, 提升代码运行速度并降低结果大小
* `-g` 保留调试信息, 仅当开启此选型时才能使用 gdb 等工具调试
* `-pipe` 不生成中间文件, 多线程编译, 可以提升编译速度, 但将增加内存消耗
* 注意, 对于控制标准, 编译文件等操作最好由 CMake 的其他选项完成, 而不是编译选项

#### 链接器配置
通过命令 `add_link_options(<options>)` 设置编译时向链接器传递的编译选项, 如 ld
* `options` 用于传递的编译选项, 允许传入列表
* 注意, 使用此命令时, 将对所有链接器传入选项

通过设置变量 `CMAKE_EXE_LINKER_FLAGS` 查询与设置项目链接的全局链接选项
* 添加选项时应在原有基础上添加

对于 GCC 的链接器, 详见[官方文档](https://gcc.gnu.org/onlinedocs/gcc/Link-Options.html), 常用的编译选项如下
* `-T<path>` 设置连接脚本 `path` 为脚本的路径
* `-s` 删除所有符号表, 以减少构建文件的大小
* `-lm -lstdc++` 启用对 C++ 的支持, 用于 C/C++ 混合编程

### 生成配置
#### 源文件查找
可参考[文件查找](#文件查找)命令, 搜索源文件目录下的 `.cpp`, `.c` 等源文件

#### 添加包含项
使用命令 `include_directories(<dir1> <dir2> ...)` 添加包含目录  
* 此命令将对之后所有目标生效, 但在该命令之前的目标不会生效
* 等价于 `GCC` 中的 `-I` 选项, 但推荐使用该命令添加包含目录

使用命令 `link_libraries(<path1> <path2> ...)` 添加链接包含库文件
* 此命令将对之后所有目标生效, 但在该命令之前的目标不会生效
* 等价于 `GCC` 中的 `-l` 选项, 但推荐使用该命令添加包含目录

使用命令 `link_directories(<dir1> <dir2> ...)` 添加库目录
* 注意, `link_libraries` 将从该命令定义的目录中寻找库文件
* 该命令不起链接效果, 仅是辅助 `link_libraries` 使用

#### 生成目标
使用命令 `add_executable(<target> <src>)` 生成目标可执行文件
* `target` 目标名称, 将生成目标名称的可执行文件 (同平台下不需要后缀)
* `src` 用于生成目标的源文件列表

使用命令 `add_library(<target> <生成类型> <src>)` 生成目标动态 / 静态库
* `target` 目标名称, 将生成目标名称的动态 / 静态库 (同平台下不需要后缀) 
* `src` 用于生成目标的源文件列表
* `生成类型` 主要有 `SHARE` 动态库与 `STATIC` 静态库两种

### 目标配置
以上的命令均为在目标生成前, 对全局所有目标的配置  
对于多目标的项目, 更推荐使用以下命令对单个目标分别配置  

#### 常用目标配置命令
目标配置命令只在在生成目标命令之后才会生效

* 设置目标编译选项 `target_compile_options(<target> [domain1] <opt1> ...)`, 对应 `add_compile_options`
* 设置目标预定义宏 `target_compile_definitions(<target> [domain1] <def1> ...)` 对应 `add_compile_definitions`
* 设置目标链接选项 `target_link_options(<target> [domain1] <opt1> ...)` 对应 `add_link_options`
* 设置目标包含目录 `target_include_directories(<target> [domain1] <dir1> ...)` 对应 `include_directories`
* 设置目标引用库目录 `target_link_directories(<target> [domain1] <path1>)` (仅设置目录, 具体链接库还需要 `target_link_libraries`) 对应 `link_directories`
* 设置目标引用库 `target_link_libraries(<target> [domain1] <path1>)` 对应 `link_libraries`

#### 依赖传递参数
其中的参数 `domain` 为依赖传递参数  
项目中存在类似引用关系 `A.so->B.so->C.so`, 其中 A, B, C 为项目中从外到内的三个层级

以下说明中, B 在情况符合时需要启用对应的设置, A 与 C 则按情况确定, 对于单层次项目, 使用 `PRIVATE` 即可

* `PRIVATE` 
    * 表明 A 完全不会使用到来自 C 的任何源文件 (C.cpp) 或接口 (C.h)
    * 此时要求 B 中的公开接口 (B.h) 不包含来自 C 的接口 (C.h)
* `INTERFACE` 
    * 表明 A 完全使用到来自 C 的接口 (C.h), 但是 B 没有使用到 C 的源文件 (C.cpp), 仅通过其接口将 C 的暴露给 A
    * 此时要求 B 中的公开接口 (B.h) 包含来自 C 的接口 (C.h), 但其源文件没有使用 C 提供的功能
* `PUBLIC`
    * 即一般情况, B 与 A 均同时在其源文件内使用了 C 的接口

### 自定义命令行
#### 目标生成过程执行命令
通过命令 `add_custom_command(TARGET <target> <构建阶段> COMMAND <cmd1> COMMAND <cmd2> ...)` 在目标构建的不同阶段执行自定义命令
* `target` 配置的目标名称
* `构建阶段` 有如下执行命令的构建阶段
    * `PRE_BUILD` 编译前执行
    * `PRE_LINK` 链接前执行
    * `POST_BUILD` 生成后执行, 例如将生成的库移动到测试环境
* `cmd` 执行的 [CMake 命令](https://cmake.org/cmake/help/latest/manual/cmake.1.html#run-a-command-line-tool) (与 bash 基本相同, 可直接运行可执行文件)  
对于命令中的参数直接用空格分割, 引号仅由于包裹参数  
多条命令通过 `COMMAND` 分隔    
例如命令 `add_custom_command(TARGET xxx POST_BUILD echo Build done)` 将在构建完成时输出 `Build done`

为了保证 CMake 项目的跨平台特性, 在执行命令时推荐
* 通过变量引用具体的命令解释器, 而非执行命令, 如 
    * `${CMAKE_COMMAND}` 获取 CMake 解释器路径表达命令, 如 `${CMAKE_COMMAND} -E echo "Post build command start"`  
    * `${PYBIND11_PYTHON_EXECUTABLE_LAST}` 获取 python 解释器 (pybind11 中)
* 对于如复制, 重命名文件等操作, 推荐使用 cmake 的 -E 选项完成, 具体见[Cmake 完成简单命令行操作](#简单命令行操作)
* 注意此时的相对路径的根目录无法确定, 因此应当使用[项目信息](#项目信息)中的变量如 `${PROJECT_SOURCE/BINARY_DIR}` 获取源文件 / build 文件的根目录

#### 自定义目标
通过命令 `add_custom_target(<target> COMMAND <cmd1> COMMAND <cmd2> ...)` 创建自定义目标  
* `target` 自定义目标名称
* `cmd` 执行的 CMake 命令, 与[目标生成过程执行命令](#目标生成过程执行命令)中的相同

通过自定义目标, 可将 CMake 用于构建其他语言的项目, 或将一些常用操作封装为伪目标, 并在需要时执行

### CMake 命令
参考文章 <https://blog.csdn.net/u014183456/article/details/124512715>

完成配置后, 还需要通过 cmake 命令完成项目的构建  
`cmake <CMakeLists.txt 目录> [-B...] [-D...] [-G...]`

目标的生成也可通过 cmake 命令完成
`cmake --build <build 目录> --target <生成目标>`

#### 指定 Build 目录
使用选项 `-B` 指定 CMake 构建过程中的 Build 目录, 一般即 `CMakeLists.txt` 所在目录下的 `build` 文件夹

#### 定义缓存变量
使用选项 `-D` 定义缓存变量, 基本格式为  
`cmake -D<变量名>:<变量类型>=<变量值> -D...`  

变量类型见[定义缓存变量](#定义缓存变量)处的说明

注意, 使用该方法定义缓存变量具有比一般变量更高的优先级, 且部分选项仅有通过 `-D` 选项设置才能生效, 如 `CMAKE_TOOLCHAIN_FILE`  
对于 `CMAKE_BUILD_TYPE` 等选项也建议使用该方法在构建时指定

#### 指定生成器
CMake 仅有构建项目的能力, 而无法生成目标, 因此生成目标时还需要具体指定生成器  
常用有
* `Ninja` 速度最快, 需要安装 (Linux 下通过 `apt` 安装, Windows 下通过 `pip` 或 `conda` 安装)
* `Visual Studio 17 2022` 生成 Visual Studio 2022 项目
* `MinGW Makefiles` 用于 Windows 下的 MinGW

关于支持的所有生成器见 <https://cmake.org/cmake/help/latest/manual/cmake-generators.7.html#manual:cmake-generators(7)>

#### 简单命令行操作
使用选项 `-E` 可通过 CMake 执行简单的命令行操作  
基本格式为 `cmake -E <命令内容>`, 通常配合[目标生成过程执行命令](#目标生成过程执行命令)使用    
常用的命令有
* `copy <file1> [file2 ...] <dest>` 将文件 `file` 复制到目录 `dest` 下
* `renome <old> <new>` 重命名 / 移动文件
* `chdir <dir>` 修改所作目录即相对路径的根目录 
* `echo <string>` 像控制台输出内容

其他操作见[官方文档](https://cmake.org/cmake/help/latest/manual/cmake.1.html#run-a-command-line-tool)

## 多层级结构

## 其他配置

## vcpkg 包管理
### vcpkg 安装
1. 克隆 vcpkg 仓库到本地文件夹, 推荐安装位置为 `C:\dev\vcpkg`  
`git clone https://github.com/microsoft/vcpkg`
1. 运行安装程序
`.\vcpkg\bootstrap-vcpkg.bat`
1. 将安装目录添加 `PATH` 环境变量
1. Vscode 安装插件 CMake Tools, 并对插件的选项 `configureSettings` 进行如下设置
```json
"cmake.configureSettings": {
    "CMAKE_TOOLCHAIN_FILE": "[vcpkg 安装目录]\\scripts\\buildsystems\\vcpkg.cmake"
},
```
1. 另外推荐关闭 cmake tool 插件的自动配置功能, 防止频繁进行配置, 具体参考 <https://blog.csdn.net/qq_35914805/article/details/135532395>

其他平台安装参考文档 <https://github.com/microsoft/vcpkg/blob/master/README_zh_CN.md>

### 基本流程
#### 创建项目
在项目的根目录下运行命令  
`vcpkg --application new`  
创建一个 vcpkg 项目

#### 添加包
在生成的 `vcpkg.json` 中添加配置模板 `"$schema":`, 并采用来自以下地址的模板    
`"https://raw.githubusercontent.com/microsoft/vcpkg-tool/main/docs/vcpkg.schema.json"`

在 `vcpkg.json` 中添加属性 `dependencies`, 该属性的值为一个数组, 通过其中的元素确定采用的包  
通常元素的结构为 (其中 `feature` 属性不是必须的)
```json
{
    "name" : "使用的包名称",
    "feature" ["特性1", "特性2", ...]
}
```

在包添加完成后, 可使用命令 `vcpkg install` 安装包 (非必须, 也可在 CMake 中自动完成)

#### CMake 设置
在 `CMakeLists.txt` 中具体设置目标使用的 Triple (目标环境配置)  
`set(VCPKG_TARGET_TRIPLET "环境配置名" CACHE STRING "Modified Triplet" FORCE)`  
当设置失败时, 可在 `CMakeCache.txt` 中查看该缓存变脸是否修改成功 (注意 vscode 下大概率需要手动修改或在初次构建后再构建一次)  

常用的 Triple 有 (注意 Triplet 必须与实际匹配)  
* `x64-mingw-static` x64 位 Windows 下使用 mingw 编译, 采用内部链接
* `x64-mingw-dynamic` x64 位 Windows 下使用 mingw 编译, 采用外部链接 (将自动移动 dll 文件到输出下)
* `x64-windows` x64 位 Windows 下使用 MCVS 编译, 采用外部链接 (默认的配置)

运行 `cmake`, 进行项目构建, 并以此查看启用包所需的 CMake 命令

#### 使用 vcpkg
对于已通过插件设置

对于命令行下的 CMake 项目构建需要添加以下选项  
* `-DCMAKE_TOOLCHAIN_FILE=[vcpkg 路径]/scripts/buildsystems/vcpkg.cmake`
* `-DVCPKG_TARGET_TRIPLET=项目使用的 Triplet`

### 基本命令
#### 查看包
使用以下命令查看 Vcpkg 中可安装的包与特性  
`vcpkg search <搜索内容>`  
可搜索包名, 所需功能等

#### 查看 Triplet
使用以下命令查看 Vcpkg 中提供的可用 triple  
`vcpkg help triplet`  
对于需要自定义环境的情况如嵌入式, 可参考 [STM32 Vcpkg 配置](/electronic/embedded/config/cmake.md)

#### 更新 Vcpkg
打开 Vcpkg 所在文件夹, 运行命令 `git pull`   

### 模块安装说明
#### OpenCV
1. 推荐中要求设定变量 `OpenCV_DIR` 的值, 实际可不进行设置
1. 链接 `OpenCV` 时应使用变量 `${OpenCV_LIBS}`, 或打印此变量, 查看可用的库

#### Boost
1. 仅在[此列表](https://www.boost.org/doc/libs/1_79_0/more/getting_started/windows.html#header-only-libraries)中的库需要按推荐的方式设置, 一般的库使用 `find_package(Boost REQUIRED)` 与 `target_link_libraries(${PROJECT_NAME} PRIVATE Boost::boost)` 即可
1. 对于 Boost::asio, 在 Windows 下还需要额外链接库 `target_link_libraries(${PROJECT_NAME} PRIVATE ws2_32.lib PRIVATE mswsock.lib)`

#### pybind11
对于 Python 与 C++ 的混合编程, 推荐使用 pybind11 而不使用 Boost::python
1. 首先要定义变量 `Python_ROOT_DIR`, 变量值为要求的 python 环境中的解释器程序所在的根目录 (可通过在要求的 python 环境中执行 `print(sys.executable)` 具体确定 `Python_ROOT_DIR`, 该变量的本质为辅助 CMake 找到 python, 其他寻找方法见[官方文档](https://cmake.org/cmake/help/latest/module/FindPython.html#hints))
1. 确定变量后, 需要通过[文件复制](#文件复制)命令将 `Python_ROOT_DIR` 下的 `pythonXXX.dll` 复制到生成目录 (`PROJECT_BINARY_DIR`) 下
1. 注意, DEBUG 模式下, 需要使用 `pythonXXX_d.dll` 版本的动态链接库, 若没有则推荐设置构建类型 (CMAKE_BUILD_TYPE) 为 RelWithDebugInfo
1. 通过 `find_package(Python COMPONENTS Interpreter Development)` 寻找 python 与 `find_package(pybind11 CONFIG REQUIRED)` 导入 pybind11
1. 对于不同的混合方式需要采用以下目标
    * 通过 C++ 调用 Python 时, 除了生成可执行文件 `target_link_libraries(<可执行文件目标名> PRIVATE pybind11::embed)`
    * 生成供 Python 调用的 C++ 库时, 则使用命令 `pybind11_add_module(<模块名> MODULE <源文件>)` 生成 python 模块文件 `模块名.调用信息.pyd` (自动生成, 注意模块名)

自动化项目时, 可能会用到以下实用变量
* `PYBIND11_PYTHON_EXECUTABLE_LAST` 项目所用环境对应的 python 解释器, 可用此解释器执行脚本保证环境匹配
* `PYTHON_MODULE_EXTENSION` 对应平台的 python 模块后缀, 可用此获取生成的模块文件

对于 C++ 调用 Python 的配置示例如下
```cmake
cmake_minimum_required(VERSION 3.10)
project(pybind_test)

# 需要手动确认的变量
# 解释器程序根目录
set(Python_ROOT_DIR "D:/miniconda3/envs/playground")
# python 版本
set(PYTHON_DLL_VERSION "312")

# 生成三个重要的变量
set(PYTHON_DLL "python${PYTHON_DLL_VERSION}.dll")
file(COPY_FILE "${Python_ROOT_DIR}/python${PYTHON_DLL_VERSION}.dll" "${PROJECT_BINARY_DIR}/python${PYTHON_DLL_VERSION}.dll")

find_package(Python COMPONENTS Interpreter Development)
find_package(pybind11 CONFIG REQUIRED)

file(GLOB SOURCE_FILE ./src/*.cpp)
add_executable(${PROJECT_NAME} ${SOURCE_FILE})
target_link_libraries(${PROJECT_NAME} PRIVATE pybind11::embed)
# 生成供 C++ 代码调用的宏
target_compile_definitions(${PROJECT_NAME}
    PRIVATE -DPYTHON_HOME_PUTENV_STR="PYTHONHOME=${Python_ROOT_DIR}"
    # 用于调用 python 时, 引用的动态链接库文件夹
    PRIVATE -DPYTHON_ADD_DLL_DIR="${Python_ROOT_DIR}/Library/bin"
)
```

#### 错误排查
1. 模块安装失败时, 注意检查 Triplet 是否正确
1. 复制模块提供的引用方法时, 注意将其中的目标 `main` 修改为项目的实际目标

## 实际应用示例
### 基本模板
```cmake
cmake_minimum_required(VERSION 3.10)
PROJECT(项目名 CXX)

# 获取所有 .cpp 源文件
FILE(GLOB SRC_FILES "${PROJECT_SOURCE_DIR}/src/*.cpp")

# 创建目标
add_executable(目标名 ${SRC_FILES})
# 添加包含文件夹
target_include_directories(目标名 PRIVATE "${PROJECT_SOURCE_DIR}/include")
```

### 命令行
使用以下命令, 构建以 Ninja 为生成器, 采用 `x64-mingw-dynamic` 为 Triplet 的 Release 项目   
```shell
cmake -D CMAKE_BUILD_TYPE=Release -D CMAKE_TOOLCHAIN_FILE:STRING="[vcpkg 路径]\vcpkg\scripts\buildsystems\vcpkg.cmake" -D VCPKG_TARGET_TRIPLET=x64-mingw-dynamic  -B build -G "Ninja"
```

对生成的项目使用以下命令生成目标
```shell
cmake --build "build" --target "[项目名]"
```

### vscode
#### 前置配置
1. 完成 [vcpkg 安装](#vcpkg-安装)中要求的插件配置
1. 设置插件的生成器为 Ninja (如果有安装)

#### 项目基本配置
首先根据上述模板创建一个基本的 CMake 项目后, 选择侧边栏的 `CMake` 选项

在 `配置` 选项中选择使用的编译器与生成类型

每次保存 `CMakeLists.txt` 后将自动构建项目

#### 生成目标
安装插件后, 点击下方的三个按钮, 将分别完成目标生成, 目标调试与运行目标 (运行与调试的目标为 `CMake` 选项中的主目标)

通过打开项目大纲, 还可选择不同的目标进行生成, 如[自定义目标](#自定义目标)

#### vcpkg 集成
使用 mingw 时, 必须先构建一次项目, 然后再修改 `CMakeCache.txt` 中的 `VCPKG_TARGET_TRIPLET` 为 `x64-mingw-dynamic/static/dynamic`

更推荐通过修改 CMake Tools 插件的 `configureSettings` 选项, 在工作区添加 `"VCPKG_TARGET_TRIPLET" : "x64-mingw-dynamic"` 实现

### visual studio
#### 前置配置
1. 使用 Visual Studio Installer 至少安装 `使用 C++ 的桌面开发` 下的 `CMake 工具` 与 `vcpkg 包管理工具`
1. 运行命令 `vcpkg integrate install` 完成集成

#### 打开 cmake 项目
首先根据上述模板创建一个基本的 CMake 项目后, 选择打开本地文件夹, 打开 `CMakeLists.txt` 所在的目录即可自动识别

打开项目后, 点击资源管理器下, 从左往右第四个按钮 `在解决方案和可用视图之间切换` 打开 CMake 视图  
需要回到原始视图也可通过点击此按钮实现

#### 设置 cmake 项目
选择 `项目 -> XXX的 cmake 设置` 即可打开项目设置

常用的配置有

* 设置 Cmake Build Type  
通过设置中的 `配置类型` 选项, 即可修改构建类型

* 设置构建器  
选择显示高级配置, 通过高级设置中的 `CMake 生成器` 选项, 即可修改构建器 (默认为 ninja)

* 新建配置  
建议通过克隆选定配置的方法新建配置

#### 生成目标
在 `选择启动项` 按钮的下拉菜单中, 选择需要生成的目标  
需要构建或调试目标时, 点击该按钮即可

#### vcpkg 集成
使用 <kbd>Ctrl</kbd> + <kbd>\`</kbd> 快捷键可以打开终端  
在终端中使用相同的方法在 `CMakeLists.txt` 所在目录下创建 vcpkg 项目即可

修改 `vcpkg.json` 时, 可退出 CMake 视图

### 常见问题
#### 通用错误解决
对于一般错误, 可首先尝试以下方法解决
1. 删除 `build` 下的 `CMakeCache.txt` 文件, 并重新构建项目
1. 如果构建失败, 可再尝试删除整个 `build` 文件夹, 并重新构建项目

#### 生成 vs 项目
对于生成的 vs 项目, 如果需要分发到其他电脑上配置, 则可以删除项目中的伪目标 `BUILD ALL TARGET` 与 `ZERO CHECK`, 并正确配置主要目标


