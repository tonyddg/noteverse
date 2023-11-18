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

#### CMAKE_CXX_FLAGS
参考自 <https://www.coonote.com/note/cmake_cxx_flags.html>  
规定编译选项, 即 gcc 中的选项, 如设置标准 `-std=c++11` 等

通过以下方式设置  
`SET(CMAKE_BUILD_TYPE "[编译选项]")`  

对于优化方式等设置, 则最好通过 [CMAKE_BUILD_TYPE](#CMAKE_BUILD_TYPE) 完成

#### CMAKE_BUILD_TYPE

通过设置变量 `CMAKE_BUILD_TYPE` 确定项目的生成类型, 将与 [CMAKE_CXX_FLAGS](#CMAKE_CXX_FLAGS) 的配置合并  
`SET(CMAKE_BUILD_TYPE "[编译选项]")`  

配置对应的编译选项如下 (编译选项名称即 `CMAKE_CXX_FLAGS_` 后的部分)

```cmake
# Debug 版本, 保留调试信息
CMAKE_CXX_FLAGS_DEBUG = -g
# 最小体积版本 (DNDEBUG 为定义宏 NDEBUG, 跳过部分调试断言)
CMAKE_CXX_FLAGS_MINSIZEREL = -Os -DNDEBUG
# 优化等级最高版本
CMAKE_CXX_FLAGS_RELEASE = -O3 -DNDEBUG
# 优化版本, 但保留调试信息
CMAKE_CXX_FLAGS_RELWITHDEBINFO = -O2 -g -DNDEBUG
```

对于 Vscode 的 CMakeTools 插件, 见插件的[生成配置](#生成配置)说明

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
TARGET_LINK_LIBRARIES(<目标项目> <依赖传递设置> <链接库>)
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

## CMakeTools 插件
### 生成配置
在 CMakeTools 的选项卡中的配置夹中的 `Debug` (默认)右侧的 ✏ 按钮进行修改, 可修生成配置为[四种基本配置](#cmake_build_type)  
环境变量 `cmake_build_type` 在插件中不起作用

### 调试
点击下方的 🐞 按钮即可自动进行调试  
注意调试时, 要手动切换到终端选项卡才能对程序输入输出  
并且需要在调试前设置好断点, 并采用 DEBUG 或 RELWITHDEBINFO 配置

## 附录: Vcpkg 介绍
Vcpkg 是一个多平台 C++ 库管理工具

### 安装配置
参考文档 <https://github.com/microsoft/vcpkg/blob/master/README_zh_CN.md>

#### Windows + Vscode + Cmake
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

由于 vcpkg 为一个 git 库, 因此可通过在安装目录下运行 `git pull` 的方式更新 vcpkg

### 模块管理
注意, 包管理的有关命令应在 vcpkg 的安装目录下运行

#### 安装模块
`vcpkg install [模块名]:[编译环境]`

使用此命令可提前下载模块, 包含了模块所有功能  
当项目引用了一个未下载的模块将会在生成时自动下载  
当一个模块下载一次后, 每次引用都能直接从本地获取

注意对于不同编译环境, 应使用对应的包

#### 查找模块
`vcpkg search [模块名]`

通过此命令将根据关键字自动查找所有可用的模块  
如果找不到所需模块可在安装目录下运行 `git pull` 更新 vcpkg

#### 列出已安装的模块
`vcpkg list`

此命令将列出目前已安装的包

#### 升级已安装的包
`vcpkg update` 列出可升级的包  
`vcpkg upgrade` 升级所有可升级的包

### 项目使用 基于 CMake
注意仅介绍[清单模式](https://learn.microsoft.com/zh-cn/vcpkg/users/manifests)下的使用, [经典模式](https://learn.microsoft.com/zh-cn/vcpkg/users/classic-mode) (不建议使用) 见文档

#### 清单模式介绍
清单模式中, 通过 vcpkg.json 文件中的清单, 列出了项目所用到的一系列模块, 以及所用模块的功能, 版本, 依赖与环境等信息

对于各个模块 (library) 下包含了一系列的功能 (feature), 例如对于不同格式图片的处理能力被分配到了各个功能中

#### 创建项目
在项目文件夹下运行命令新建空项目  
`vcpkg new --application`

此命令将自动创建空的 vcpkg.json 与 vcpkg-configuration.json 文件  
建议向 vcpkg.json 中添加字段以实现基于 IDE 的字段注释与检查  
`"$schema": "https://raw.githubusercontent.com/microsoft/vcpkg-tool/main/docs/vcpkg.schema.json"`

可以通过直接修改 vcpkg.json 的方式设置项目名与版本, 具体添加, 设置依赖  
方法见[参考文档](https://learn.microsoft.com/zh-cn/vcpkg/reference/vcpkg-json)

#### 添加模块
可向 vcpkg.json 的 `dependencies` 字段直接添加与配置包含的模块, 常用配置方式如下
```json
{
    "name": "libdb",
    "feature": ["json"],
}
```

* 字段 `name` 为模块名  
* 字段 `feature` 为数组, 包含了模块所用的功能

其余配置见[文档](https://learn.microsoft.com/zh-cn/vcpkg/reference/vcpkg-json#dependency)

除此之外也可以使用命令的方式添加模块    
`vcpkg add port 模块名[功能]`  

其中功能可省略, 此时将使用模块默认开启的功能

#### CMake 项目建立
在完成 vcpkg 项目创建后, 可在此基础上创建 CMakeLists.txt, 建立 CMake 项目  
首先在==设置 `PROJECT` 之前==设置有关编译环境的环境变量 `SET(VCPKG_TARGET_TRIPLET [项目编译环境])`
通过 `FIND_PACKAGE(模块名 REQUIRED)` 语句方式, 在生成前导入模块  
通过 [TARGET_LINK_LIBRARIES](#TARGET_LINK_LIBRARIES) 语句对生成的程序进行连接

对于命令行下的 CMake 项目构建需要使用如下命令
```shell
cmake -B [Build路径] -S . "-DCMAKE_TOOLCHAIN_FILE=[vcpkg 路径]/scripts/buildsystems/vcpkg.cmake"
```

项目生成命令不变
```shell
cmake --build [Build路径]
```

在 Vscode 的环境下, 在先使用 Cmake 建立项目后建立 vcpkg 项目的情况下, 或向 vcpkg 添加了新的模块  
应先删除 build 文件夹再构建项目

#### 关于编译环境的说明
对于不同的编译环境, 需要使用不同的构建配置  
对于 vcpkg, 将这种配置称为 triplet, 通常使用如下的表示方法  
`[目标计算机体系结构]-[编译器名称]-[链接性](-[debug/release])`

在构建项目与预先安装模块时都必须明确编译环境  
不同编译环境下的模块不能互通  

以下为常用的几种 triplet
* `x64-mingw-static` x64 位 Windows 下使用 mingw 编译, 采用内部链接
* `x64-mingw-dynamic` x64 位 Windows 下使用 mingw 编译, 采用外部链接 (将自动移动 dll 文件到输出下)
* `x64-windows` x64 位 Windows 下使用 MCVS 编译, 采用外部链接 (默认的配置)

注意 Windows 下默认使用的是 `x64-windows`, 此配置仅适用于 VisualStudio, 如果使用 MinGW, 必须改为配置 `x64-mingw-...`

#### vcpkg 环境设置
通过 `SET([环境变量名] [值])` 的方式直接设置 vcpkg 的环境变量, 进行高级设置.  
详细配置见[文档](https://learn.microsoft.com/zh-cn/vcpkg/users/triplets)

### 模块使用注意
#### 基本模块引用
在构建 CMake 项目时, 会输出各个模块的具体引用方法  
应优先按照输出的方法引用模块

#### OpenCV 模块
1. 推荐中要求设定变量 `OpenCV_DIR` 的值, 实际可不进行设置
1. 链接 `OpenCV` 时应使用变量 `${OpenCV_LIBS}`, 或打印此变量, 查看可用的库

