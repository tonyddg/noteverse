# ROS 笔记
该笔记以 Ubuntu-18.04 下的 ROS 版本 Melodic 为例  
参考教程 <https://wiki.ros.org/cn/ROS/Tutorials>

## ROS 安装
### 基本安装
安装 ROS 时, 参考官方文档 <https://wiki.ros.org/cn/melodic/Installation/Ubuntu> 即可  

```shell
sudo sh -c '. /etc/lsb-release && echo "deb http://mirrors.tuna.tsinghua.edu.cn/ros/ubuntu/ `lsb_release -cs` main" > /etc/apt/sources.list.d/ros-latest.list'

curl -sSL 'http://keyserver.ubuntu.com/pks/lookup?op=get&search=0xC1CF6E31E6BADE8868B172B4F42ED6FBAB17C654' | sudo apt-key add -

sudo apt update

# 安装基础桌面包
sudo apt install ros-melodic-desktop
```

安装时注意
* 应当避免使用校园网环境, 而使用热点等
* 可通过 `sudo apt install / search ros-melodic-<包名>` 搜索与安装其他包
* 对于 ROS 工具一般则需要通过 `sudo apt install / search python-<工具名>` 搜索与安装 (请先确保导入环境变量)

### 初始化
在==使用 ROS 前, 务必导入环境 `source /opt/ros/melodic/setup.bash`== (对于 zsh, 存在对应后缀的版本, 之后不再说明)  
可以将该导入语句写入 `~/.bashrc` 中, 确保每次启动终端时 ROS 环境均被导入

导入环境后, 依照教程执行
```shell
sudo rosdep init
rosdep update

sudo apt-get install python-rosinstall python-rosinstall-generator python-wstool build-essential
```

注意教程中的命令 `rosdep` 还需要通过 `sudo apt install python-rosdep` 安装

### 快速测试
在 ROS 安装完成后, 首先安装以下教学包  
`sudo apt-get install ros-<distro>-ros-tutorials`

使用 bash 运行以下代码进行快速测试
```shell
tmux split-window 'source /opt/ros/<distro>/setup.bash; roscore'
sleep 1s
tmux split-window 'source /opt/ros/<distro>/setup.bash; rosrun turtlesim turtlesim_node'
sleep 1s
tmux split-window 'source /opt/ros/<distro>/setup.bash; rosrun turtlesim turtle_teleop_key'
sleep 1s

tmux select-layout main-vertical
bash
```

## ROS 文件系统
功能包是 ROS 软件的基本单元, ROS 文件系统也以功能包为基础

### rospack 
获取功能包的基本信息

* `rospack find <package>` 打印功能包 `package` 的路径
* `rospack depends1 <package>` 打印功能包 `package` 的直接依赖功能包
* `rospack depends <package>` 打印功能包 `package` 的所有依赖功能包

### rosbash
rosbash 实际为一系列类似 bash [文件管理](../web/linux/base.md#文件管理)的指令

* `roscd <path>` 根据功能包打开文件夹
    * `path` 为路径, 但与一般路径不同, 该路径使用功能包名作为根目录  
    例如 `roscd roscpp/cmake` 可直接打开功能包 `roscpp` 下的文件夹 `cmake`
    * 伪功能包 `log` 为一个文件夹, 包含了所有 ROS 程序的日志
* `rosls <path>` 显示功能包路径下的文件信息
    * `path` 基于功能包的路径, 含义与 `roscd` 相同
    * 与 `ls` 不同, 不支持 `-a` 等选项

## Catkin 功能包
使用 ROS 下的工具 catkin 用于创建功能包

### 功能包的组成
约定一个功能包下应当包含以下文件夹, 且具有如下含义
* `CMakeLists.txt` catkin 版本的 CMakeLists.txt (必须包含)
* `package.xml` 符合 Catkin 规范的功能包元信息 (必须包含)
* `src` 存放 C++ 源文件
* `include` 存放 C++ 头文件
* `script` 存放 Python 脚本
* `launch` 存放功能包所有节点启动文件 (launch 文件)
* `msg` 存放功能包自定义的消息类型
* `srv` 存放功能包自定义的服务类型
* `action` 存放功能包自定义的动作指令
* `config` 存放功能包配置文件, 用于供功能包代码调用

### 工作空间的组成
通过 Catkin 创建的功能包, 一般需要使用一个 Catkin 工作空间管理创建的功能包  
可将工作空间理解为一个具体的机器人项目, 而其下的功能包则为模块

工作空间包含了以下几个文件夹
* `src` 源代码空间, 包含了工作空间下管理的功能包
* `build` 构建空间, 即构建功能包时的构建文件
* `devel` 工作空间开发有关的实用脚本以及自动生成的源码文件, 如消息类型定义的 Python 脚本  
* `install` 安装空间

注意
* 使用工作空间内的功能包前, 需要通过其中脚本 `./devel/setup.bash` 将工作空间导入到 ROS 环境中  
* 对工作空间中的功能包操作时都需要在工作空间中进行, 该节笔记中, 默认以工作空间为当前目录

### 创建工作空间与功能包
* 创建工作空间
    * 创建工作空间文件夹, 并在文件夹下创建一个空的 `src` 文件夹
    * 进入工作空间文件夹, 运行 `catkin_make` 创建工作空间  
    * 通过 `source` 工作空间下的脚本 `./devel/setup.bash` 将工作空间内容整合到 ROS 环境中 (注意, 使用工作空间前都必须先导入脚本中的环境)
* 创建功能包
    * 创建功能包前, 需要 `source` 脚本 `<工作空间>/devel/setup.bash` 导入工作空间环境
    * `cd` 进入工作空间下的源代码空间
    * 运行指令 `catkin_create_pkg <package_name> [depend1] [[depend2] ...]` 创建功能包
        * `package_name` 功能包名称
        * `depend` 功能包依赖, 通常至少该导入如下功能包依赖 (后续可通过修改配置文件[继续添加依赖](#添加依赖功能包))
            * `std_msgs` 标准信息功能包
            * `rospy` 使功能包支持 Python 脚本
            * `roscpp` 使功能包支持 C++
    * 定义[功能包的元信息](#功能包元信息)

### 功能包元信息
通过 `package.xml` 文件描述功能包的元信息  
常用的标签有

* `package` 元信息根标签
    * 该标签为 `package.xml` 文件的根标签, 不可缺少
    * 属性 `format` 一般取值为 `2`
* `description` 功能包描述标签  
    * 标签内容为当前功能包的描述
* `maintainer` 维护者标签
    * 标签内容为该功能包的维护者
    * 属性 `email` 为维护者邮箱
* `license` 功能包证书, 一般使用待定 `TODO` 或 `GPLv3`, `BSD`
* `buildtool_depend` 功能包构建工具, 即 `catkin`
* `build_depend` 编译时功能包依赖
    * 标签内容为依赖的功能包名称, 多个功能包则使用多个标签
    * 后续依赖功能包可通过此标签添加
* `exec_depend` 运行时功能包依赖
    * 与 `build_depend` 相同, 用于确定运行时依赖 (根据功能包特点决定)
    * 后续依赖功能包可通过此标签添加

### 添加依赖功能包
* 对于运行时依赖
    * 在元信息文件 `package.xml` 中添加标签 `<exec_depend>[功能包名]</exec_depend>`
    * 在 `CMakeLists.txt` 中的函数 `catkin_package` 添加参数 `CATKIN_DEPENDS [功能包名]`
* 对于构建时依赖
    * 在元信息文件 `package.xml` 中添加标签 `<build_depend>[功能包名]</build_depend>`
    * 在 `CMakeLists.txt` 中的函数 `find_package` 添加参数 `[功能包名]`

### 构建功能包
在功能包的源代码编写完成后, 要运行功能包前还需要构建工作空间, 编译其中的源代码

使用命令 `catkin_make [make_targets] [-D...]` 构建功能包
* `make_targets` 编译的功能包名称
* `-D...` 传递给 CMake 的参数, 也可用于控制 Catkin  
参见 <https://wiki.ros.org/catkin/commands/catkin_make>

使用时注意
* 在运行 `catkin_make` 时, 将列出[四个子空间](#工作空间的组成)的路径, 可依据此检查
* 功能包构建后最好再次运行 `source ./devel/setup.bash` 导入更改

### 功能包常见错误排查
* 构建时出错
    * 当构建时出错后, 在修复后依然出错, 可以尝试先删除 `./build/CMakeCache.txt`, 再次出错时尝试删除整个构建空间 `./build`
    * 当输入了错误名称的依赖功能包时, 需要同时修改[功能包元信息](#功能包元信息)与功能包下 CMakeLists.txt 文件中的错误包名
* 运行时出错
    * 检查 [ROS 环境](#初始化)与[工作空间环境](#工作空间的组成)是否正确建立 (即对应的脚本是否通过 `source` 导入环境)
    * 检查 Python 脚本是否正确导入, 可参见[笔记](./node.md#基于-Python-的节点编程)
    * 运行 Python 脚本时出错, 提示缺少模块 `rospkg`时  
    根据所用的 Python 脚本, 使用 pip 安装 `rospkg`, 如对于 Python3.x 使用命令  
    `python3 -m pip install rospkg`
    * 无法调用功能包内的自定义消息  
    自定义消息后, 还需要使用 `source ./devel/setup.bash` 将生成的消息定义导入环境

### 常见功能包与工作空间问题
* 跨工作空间调用功能包 (一般仅需如下执行一次, 之后构建都不需要重复操作)
    * 保险方法, 参考 <https://blog.csdn.net/lclfans1983/article/details/107453043>  
        * 当工作空间 A 依赖于工作空间 B 时, 可先导入工作空间 B 的环境 `setup.bash`  
        * 在该环境下进入工作空间 A 并进行构建 `catkin_make`
    * 直接方法, 参考 <https://blog.csdn.net/RosettaLeong/article/details/116210936>
        * 当工作空间 A 依赖于工作空间 B 时, 进入工作空间 A 并修改文件 `./devel/_setup_util.py`
        * 在文件中常量 `CMAKE_PREFIX_PATH` 末尾添加 `;<工作空间 B 的绝对路径>/devel`
