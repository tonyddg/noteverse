# CMake
工程配置软件

## 基础介绍
### 基本语法
#### 变量表示
```cmake
SET(SRC_LIST main.cpp)
MESSAGE(STATUS ${SRC_LIST})
```

* 一般情况下读取变量的值时需要使用 `${}` 包裹
* 当通过 FILE 或 SET 等方式创建变量与给变量赋值时, 可不需要使用 `${}`

#### 字符串
* 对于不含空格的一般字符串, 允许不使用 `"` 对字符串包裹
* 如果字符串中含有空格, 则需要 `"`
* 允许在字符串中通过 `${}` 使用变量, 此时也需要使用 `"` 包裹字符串

#### 指令格式
```cmake
指令(<参数1> <参数2>)
```

* 通过 `()` 包含指令所需的参数
* 参数间通过空格 ` ` 或 `;` 分隔
* 也可以通过换行对指令进行分隔, 缩短单行长度

#### 编程方式
* 指令不区分大小写
* 参数与变量区分大小写
* 通常采用全大写的方式, 或关键字小写, 其他参数大写
* 使用 `#` 进行注释

### 基本使用
1. 在工程目录下建立 CMakeLists.txt 文件
1. 在工程目录下建立 build 文件夹
1. 在 build 文件夹打开终端, 执行 `cmake ..`, 将对工程目录中的 CMakeLists.txt 进行解析, 并构建项目
1. 对于一般情况下, 将在 build 内生成项目文件与临时文件, 从工程目录读取源文件
1. 对于生成 make 项目, 可在 build 下执行 `make`, 完成编译 

## 基本项目结构
### 项目示例
```cmake
CMAKE_MINIMUM_REQUIRED(VERSION 3.10)
PROJECT(EXAMPLE CXX)
ADD_EXECUTABLE(${CMAKE_PROJECT_NAME} main.cpp)
```

### 基本属性配置
#### CMAKE_MINIMUM_REQUIRED
规定 CMake 的最低要求, 通常用于规定最低版本

```cmake
CMAKE_MINIMUM_REQUIRED(VERSION <要求版本>)
```

通常最低要求版本为 3.10

#### PROJECT
定义工程

```cmake
PROJECT(<工程名> <支持语言...>)
```

* 工程名通常为大写字母
* 支持语言可以多个, 使用空格分割, 通常使用大写
* 对于 C++, 语言表示为 CXX

### 构建目标项目
#### ADD_EXECUTABLE
生成可执行文件

```cmake
ADD_EXECUTABLE(<目标项目名> <源文件...>)
```

通常目标项目名即可执行文件名, 且不需要带后缀, 生成时会自动补上

#### ADD_LIBRARY
生成动态/静态库

```cmake
ADD_LIBRARY(<目标项目名> <生成库的类型> <源文件...>)
```

* 生成库的类型
    * `SHARE` 生成共享库
    * `STATIC` 生成静态库
* 目标项目名即输出文件的名称, 且不需要有后缀
* 对于一个目标项目名, 仅能输出一个文件, 因此仅通过 `ADD_LIBRARY` 或 `ADD_EXECUTABLE` 无法生成同名的文件, 仅有最后一个生效, 因此还需要设置目标项目属性

### 其他操作
#### SET
定义变量

```cmake
SET(<变量名> <变量值...>)
```

* 此处的变量名直接输入字符串即可, 不需额外要包裹
* 允许输入多个变量, 默认即字符串, 不需要 " 包裹
* 如果字符串中存在空格, 则需要使用 `"` 包裹

#### MESSAGE
发送消息

```cmake
MESSAGE(<消息类型> <输出消息...>)
```

* 主要包含以下三种消息类型
    * `STATUS` 输出前缀为 -- 的消息, 用于表示处理状态
    * `NOTICE` 一般消息输出
    * `WARN` 警告消息, 但处理不会被终止
    * `SEND_ERROR` 输出此消息时, 此部分的生成将被跳过
    * `FATAL_ERROR` 输出此消息时, 立即终止 CMake
* 输出消息时
    * 对于字符串, 需要使用 `""` 包裹
    * 对于变量, 需要使用 `${}` 包裹
    * 允许输出多个值, 将出现在同一行

### 全局变量
#### CMAKE_PROJECT_NAME
即项目名称

#### PROJECT_SOURCE_DIR
* 源文件目录, 取决于 CMakeLists.txt 所在位置

#### PROJECT_BINARY_DIR
* 输出文件目录, 默认取决于 cmake 执行时所在的文件夹
* 对于 `PROJECT` 关键字所在的 CMakeLists.txt, 还将生成临时文件与 MakeFile

## 包含外部引用的项目
### 项目示例
```cmake
# 基本设置
CMAKE_MINIMUM_REQUIRED(VERSION 3.10)
PROJECT(EXAMPLE CXX)
SET(TARGET_NAME EXAMLE_EXEC)

# 寻找库
FIND_PACKAGE(imgui REQUIRED)
# 寻找所有源文件
FILE(GLOB SCR_FILES "${PROJECT_SOURCE_DIR}/src/*.cpp")
# 生成目标项目
ADD_EXECUTABLE(${TARGET_NAME} $(SRC_FILES))

# 目标项目设置
TARGET_INCLUDE_DIRECTORIES(${TARGET_NAME} PRIVATE "${PROJECT_SOURCE_DIR}/include")
TARGET_LINK_LIBRARIES(${TARGET_NAME} PRIVATE imgui::imugi)
TARGET_COMPILE_FEATURES(${TARGET_NAME} PRIVATE CXX_STD_17)

```

### 目标项目预构建
#### FIND_PACKAGE
寻找库用于构建项目

```cmake
FIND_PACKAGE(<库名称> [REQUIRED])
```

* 在计算机中寻找第三方库
* 参数 `REQUIRED` 表明库是必须的, 如果找不到库, 构建终止
* 对于第三方库的安装与管理可见 [Vcpkg 介绍](#附录-vcpkg-介绍)

#### FILE
匹配要求的文件或文件操作 (此处仅介绍文件文件匹配功能)

```cmake
FILE(GLOB <结果保存变量> <匹配文件>)
```

* 通过 `GLOB` 启用 `FILE` 的文件匹配功能
* 保存变量不需要 `${}` 包裹
* 匹配文件为一个字符串, 可使用类正则表达式进行通配

### 目标项目配置
#### 依赖传递设置
依赖传递设置主要在多层次项目中发挥作用, 此时项目中存在类似引用关系 `A.so->B.so->C.so`, 其中 A, B, C 为项目中从外到内的三个层级

以下说明中, B 在情况符合时需要启用对应的设置, A 与 C 则按情况确定, 对于单层次项目, 使用 `PRIVATE` 即可

* `PRIVATE` 
    * 表明 A 完全不会使用到来自 C 的任何源文件 (C.cpp) 或接口 (C.h)
    * 此时要求 B 中的公开接口 (B.h) 不包含来自 C 的接口 (C.h)
* `INTERFACE` 
    * 表明 A 完全使用到来自 C 的接口 (C.h), 但是 B 没有使用到 C 的源文件 (C.cpp), 仅通过其接口将 C 的暴露给 A
    * 此时要求 B 中的公开接口 (B.h) 包含来自 C 的接口 (C.h), 但其源文件没有使用 C 提供的功能
* `PUBLIC`
    * 即一般情况, B 与 A 均同时在其源文件内使用了 C 的接口


#### TARGET_INCLUDE_DIRECTORIES
对目标项目添加包含目录

```cmake
TARGET_INCLUDE_DIRECTORIES(<目标项目> <依赖传递设置> <包含目录>)
```

#### TARGET_LINK_LIBRARIES
对目标项目进行链接

```cmake
TARGET_INCLUDE_DIRECTORIES(<目标项目> <依赖传递设置> <链接库>)
```

要求链接库必须先使用 FIND_PACKAGE 找到

#### TARGET_COMPILE_FEATURES
设置编译器对于目标项目的特性支持, 如 C++ 版本

```cmake
TARGET_COMPILE_FEATURES(<目标项目> <依赖传递设置> <特性设置>)
```

* 特性设置具体查询官网
* 常用特性 `CXX_STD_XX` 用于指定 C++ 标准版本

### 自定义操作
#### ADD_CUSTOM_COMMAND
设置项目在不同步骤之间运行的用户命令

```cmake
ADD_CUSTOM_COMMAND(
    TARGET <目标项目>
    <执行时机参数>
    COMMAND
    <执行输出命令>
    )
```

* 有如下执行时机参数
    * `PRE_BUILD` 编译前执行
    * `PRE_LINK` 链接前执行
    * `POST_BUILD` 生成后执行
* 执行输出命令中可使用 `${}` 引用变量, 并且命令即使有空格也不需要用使用 `"` 包裹
* 可利用 `${}` 表示需要的命令, 增加对不同平台的适用性, 例如全局变量 `${CMAKE_COMMAND}` 表示 cmake 命令
* 为了提升对不同平台的适用性, 一般适用 cmake -E 来完成如复制文件夹等基本操作, 可参考[此文章](https://blog.csdn.net/zhizhengguan/article/details/118339062#t8)

## 多层次项目结构
### 项目结构
对于一个 CMake 项目, 通常采用以下格式

* doc/
    * bin/
* build/
* src/
    * CMakeLists.txt
    * main.cpp
* include/
* CMakeLists.txt

### 关键字
#### ADD_SUBDIRECTORY
添加子目录

```cmake
ADD_SUBDIRECTORY(<子目录名> <对应的输出目录>)
```
 
* 对于子目录
    * 子目录里面也需要存放有 CMakeLists.txt, 对子目录中的源文件进行构建
    * 其中的 CMakeLists.txt, 不需要使用 `PROJECT` 设置项目, 只需要使用如 `ADD_EXECUTABLE` 等输出结果
    * 子目录的 `SOURCE_DIR` 即子目录, 不是根目录, 因此可直接访问子目录下的源文件
* 对于输出目录
    * 输出目录将出现在根目录的输出目录下
    * 子目录下的输出将保存在输出目录中, 可通过此方法将源文件输出与项目构建输出分离

## 输出属性设置
### 属性设置
通过关键字 `SET_TARGET_PROPERITIES` 实现对于不同目标项目的设置

```cmake
SET_TARGET_PROPERITIES(<目标项目名> PROPERITIES <项目属性...> <属性值...>)
```

* 通常使用 `ADD_LIBRARY` 或 `ADD_EXECUTABLE` 建立一个目标项目后要立即进行设置, 再建立下一个目标
* 允许一次性设置多个属性

### 项目属性
#### OUTPUT_NAME
设置项目的输出文件名称, 不需要包含后缀

```cmake
SET_TARGET_PROPERITIES(<目标项目名> PROPERITIES OUTPUT_NAME <项目名称>)
```

#### CLEAN_DIRECT_OUTPUT
清除之前的输出记录

```cmake
SET_TARGET_PROPERITIES(<目标项目名> PROPERITIES CLEAN_DIRECT_OUTPUT 1)
```

当 cmake 需要输出多个文件时, 会试图阻止相同名称的输出, 如果要允许之后的同名输出, 则需要进行此设置以保证之后的同名输出 (如需要同时输出静态库与动态库)

#### VERSION
输出动态库的版本号

#### SOVERSION
输出动态/静态库的 API 版本

## 附录: Vcpkg 介绍
Vcpkg 是一个多平台 C++ 库管理工具

::: warning
此部分内容尚未完成
:::
