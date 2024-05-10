# ROS 编程基础
## ROS 节点
在 ROS 中节点 (Node) 即一个独立运行任务的可执行文件  
节点之间通过[话题](#ros-话题)或[服务](#ros-服务)等方式建立通讯

节点之中, 存在一个主节点 (Master), 也称为节点管理器, 该节点能够完成任务
    * 帮助各个节点建立联系
    * 为节点提供公共的参数服务器
    * 日志节点 `rosout`
因此, 如果没有主节点, 虽然现有的节点通讯不会中断, 但节点之间无法再次建立新的联系, 并且节点也无法访问参数服务器  

### 运行节点
使用以下方式运行节点

* `roscore` 运行主节点
    * 主节点是运行其他节点的基础
    * 通常需要在主节点运行后 1s 再启动其他节点
* `rosrun <package_name> <node_name> [args]` 运行节点
    * `package_name` 节点所在的功能包 (确保功能包以导入环境)
    * `node_name` 节点程序名称  
        * 对于 C++, 即 CMake 中设置的构建目标
        * 对于 Python, 即脚本文件名 (包含后缀, 确保给予运行权限)
    * 传递给节点的命令行参数, 对于 Python 可通过[命令行解析](../py/base/module.md#命令行解析)有关函数获取

通常节点即一个不断循环运行的程序, 如果要退出节点程序, 可使用 <kbd>Ctrl</kbd><kbd>C</kbd>

### 节点管理
使用命令 `rosnode` 管理节点, 常用的操作如下

* `rosnode list` 列出当前正在运行中的所有节点
* `rosnode ping [-c<x>] <node_name>` 测试目标节点是否正常
    * `node_name` 被测试的节点, 需要包含根地址 `/`
    * `-c<x>` 测试 `x` 次, 默认不断测试
* `rosnode info <node_name>` 获取节点的详细信息
* `rosnode kill <node_name>` 关闭指定节点

### 节点可视化管理工具
以下为几个常用的节点可视化管理工具  
这些工具必须在[主节点](#ros-节点)启动后才能运行

* `rosrun rqt_logger_level rqt_logger_level` 设置各个节点日志等级
    * 设置的是节点能输出的最低优先级, 通常警告等级越高优先级越高
    * 通常与 `rqt_console` 配合使用
* `rosrun rqt_console rqt_console` 显示所有节点的日志 (输出) 信息
* `rosrun rqt_graph rqt_graph` 显示所有节点之间的通信关系

### Launch 文件
可通过 launch 文件, 根据功能包的要求与指定的规则启动多个节点  
通常 launch 文件为一类具有后缀 `.launch` 的 xml 文件, 位于功能包的文件夹 [launch](./base.md#功能包的组成) 下

更多细节参见 <https://wiki.ros.org/roslaunch/XML>

launch 文件中的常用标签有
* `launch` launch 文件的根标签, 不可缺少
* `group` 节点组标签
    * 标签内容为节点组下的节点
    * 属性 `ns` 节点组名称
    * 节点必须位于节点组下, 通过节点组分离各节点的命名空间, 不同节点组中允许有同名的节点 (同一节点组下则不允许)
* `node` 节点标签, 与 [rosrun](#运行节点) 类似
    * 属性 `pkg` 节点所在的功能包
    * 属性 `type` 节点程序名称
    * 属性 `name` 节点名称
    * 属性 `output` 节点日志设置
        * `log` 输出到日志文件中 (默认)
        * `screen` 输出到屏幕上
    * 属性 `respawn` 节点退出后是否尝试重启节点
        * `true` 是, `false` 否 (默认)
    * 属性 `required` 节点是否必须, 当必须节点退出时, 整个 roslaunch 启动的节点全部退出
        * `true` 是, `false` 否 (默认)
    * 属性 `respawn_delay` 节点启动延迟, 默认为 0  
    * 属性 `args` 传递给节点的命令行参数, 默认为空
    * 该标签可以是自闭和, 也可包含内容, 内容为设置标签
    * 节点标签必须位于节点组下, 在 launch 文件中, 节点的名称与程序名分离, 因此允许有多个节点程序运行 (但名称不能相同)
* `include` 引用标签  
    * 属性 `file` 其他 launch 文件的路径, 可使用此方法引用其他 launch 文件
    * 使用 `$(find 功能包名)/launch/...` 可使用绝对路径引用其他功能包的文件
    * 该标签为自闭和标签, 没有内容
* `arg` 启动参数标签  
    * 属性 `name` 启动参数名称
    * 属性 `default` 启动参数默认值
    * 在其他标签参数中, 可使用 `$(arg <启动参数名>)` 表示启动参数
    * 在 `roslaunch` 命令结尾使用 `<参数名>:=<参数值>` 可传入启动参数
    * 该标签为自闭和标签, 没有内容

launch 文件中有以下的设置标签  
当在根标签下, 设置将对全局生效, 当作为 `node` 或 `group` 标签的内容时, 设置仅对节点或节点组下的节点生效
* `param` 设置参数服务器中的参数, 参见 [launch 文件导入参数](#launch-文件导入参数)
* `rosparam` 加载或导出参数服务器中的参数, 参见 [launch 文件导入参数](#launch-文件导入参数)
* `remap` 名称重映射, 参见[命名空间](#命名空间)

launch 文件中表示参数时, 可使用表达式 `$(<exp>)`, 将解析表达式并以表达式的结果作为参数  
常用的有
* `$(arg <val>)` 获取启动参数 `val` 的值
* `$(find <pkg>)` 获取功能包 `pkg` 的根路径, 一般用于 `include` 与 `rosparm` 标签导入特定功能包下的文件
* `$(anon <name>)` 基于节点名称 `name`, 生成一个匿名名称, 一般用于 `node` 标签的 `name` 属性
* `$(optenv <env_val> <default>)` 寻找环境变量 `env_val` 的值, 如果不存在则使用 `default` 代替

使用命令 `roslaunch [--nodes] [--screen] <package_name>  <launch_name> [args]` 运行 Launch 文件启动节点
* `package_name` launch 文件所在的功能包
* `launch_name` 功能包下的 launch 文件名, 需要后缀 `.launch`
* `--nodes` 仅打印 launch 文件下将启动的节点名
* `--screen` 强制将节点信息打印到终端上
* `args` 传递给 launch 文件的参数, 见 `arg` 标签

### 基于 Python 的节点编程
* 使用 Python 脚本前, 需要保证
    * 已经给予脚本可执行权限, 如 `chmod u=x '*.py'`
    * Python 脚本是否有正确的[环境说明](../py/base/base.md#环境说明), 通常为
        * `#!/usr/bin/python3` (使用 Python3, 如果使用 Python2, 则改为 `python`)
        * `# -*- coding: UTF-8 -*-` (使用 UTF-8)
    * 将 Python 脚本安装到功能包的 `CMakeLists.txt` 中, 具体步骤为
        * 在功能包下 `CMakeLists.txt` 中找到关于函数 `catkin_install_python` 的注释
        * 将注释取消, 并在参数 `PROGRAMS` 后填入脚本相对功能包的路径, 并删除原有的示例内容
        * 在工作空间下运行 `catkin_make` 使更改生效 (与 C++ 不同, 仅修改 `CMakeLists.txt` 后需要运行)
* 将 Python 程序作为节点时, 需要导入包 `import rospy`, 该包具有以下常用的函数 (更多见 [rospy 高级应用](#rospy-高级应用))
    * `rospy.init_node(name, *, anoymous)` 启动节点 (不一定要在程序开始时立刻启动) 
        * `name` 节点名称, 最好仅包含字母数字与下划线 (当出现同名节点时, 将导致后创建的节点强制退出)
        * `anoymous` 是否要向节点末尾添加随机数, 保证节点名称唯一
    * `rospy.is_shutdown()` 判断节点是否被关闭, 但被关闭时返回 `True`
        * 节点通常为一个具有死循环的任务, 直到节点被要求关闭时才会退出循环  
        * 该函数的作用就是接收节点关闭的通知, 因此通常将节点的主程序写入循环 `while not rospy.is_shutdown():` 中
    * `rospy.rate` ROS 频率控制类
        * 频率控制类用于控制节点主程序的运行频率, 使节点以要求的频率运行
        * 类的构造函数为 `rate = rospy.Rate(hz)`
            * `hz` 目标频率的大小, 一般为 10hz
        * 类的方法 `rospy.Rate.sleep()` 休眠到指定频率
            * 该方法一般位于主程序末尾, 使节点休眠一段时间, 以实现频率控制的目的
    * `rospy.ROSInterruptException` 同时继承自 ros 错误与 Python 程序退出中断的异常
        * 在运行主程序时, 除了 `rospy.is_shutdown()` 还需要通过捕获此异常来判断节点是否退出
        * 注意代码运行到 `except` 或 `finally` 语句时, 均不能再使用 rospy 的有关函数, 因为节点已经退出
        * 如果希望在退出时执行, 可使用 [rospy.on_shutdown](#rospy-中的实用函数)
* 编写节点时注意
    * 对于节点中的死循环, 应当以 `not rospy.is_shutdown()` 为退出条件之一, 并且循环内应有休眠语句 `rospy.sleep(m)` 并取合适的休眠时长, 如果要求快速循环时则至少取 `m = 0.001` 或 `m = 0` 

因此, 对于任何 ROS 节点, 都具有如下的基本结构
```python
import rospy

if __name__ == "__main__":

    try: 
        ... # 启动前准备与创建有关对象

        rospy.init_node(name = ...) # 启动节点
        rate = rospy.Rate(10) # 创建频率控制对象

        while not rospy.is_shutdown():
            ... # 节点主循环

            rate.sleep() # 等待, 使主程序以指定的频率运行
    except rospy.ROSInterruptException:
        pass # 当捕获到 ROS 异常或程序退出异常时退出节点 

```

更多关于 `rospy` 的使用见官方文档 <https://wiki.ros.org/rospy>

## ROS 话题
ROS 中的话题 (Topic) 为一种节点间数据传输方式  
数据传输时, 节点分别扮演发布者 (Talker / Publisher) 与订阅者 (Listener / Subscriber), 发布者向话题发送消息 (Message) 并广播到所有订阅了这一话题的订阅者上  
对于一个话题, 允许有多个发布者与订阅者, 但是一个话题内的消息类型必须相同  
因此话题通常用于节点之间快速持续的信息传输  
如果将节点视为控制环节, 可以让节点 A 向 B 发送控制量, 同时接收来自 B 的反馈量, 实现闭环控制

其中消息为一种严格的数据类型, 每个话题所发布的消息具有固定的消息类型
* 一般可使用功能包 `std_msgs` 所提供的基础消息类型
* 也可根据需要[自定义消息](#自定义消息)

### 基于工具的话题应用
#### 基本命令行话题工具
使用命令 `rostopic` 管理正在运行的话题, 使用命令 `rosmsg` 查看消息类型的具体信息

* `rostopic list [-v]` 列出当前所有话题
    * 选项 `-v` 列出话题及其所有订阅节点与发布节点信息
* `rostopic echo <topic_name>` 订阅并滚动输出该话题下的内容
    * `topic_name` 订阅的话题, 需要包含根地址 `/`
* `rostopic pub [-v] [-r <rate>] [-1] [-f <file>] <topic_name> <topic_type> -- <msg>` 向指定话题发布消息
    * `topic_name` 发布消息的话题, 需要包含根地址 `/`
    * `topic_type` 消息的类型, 消息类型一般没有根地址 `/`
    * `msg` 消息内容, 表示方法见[命令行中表示 YAML](#命令行中表示-YAML)
    * `-r <rate>` 以 `rate` 为频率发送消息, 默认为 10Hz
    * `-1` 仅发送一次消息
    * `-f <file>` 以 [yaml](../random/textdata.md#yaml) 文件 `file` 为消息内容
    * `-v` 显示详细信息 
    * `--` 表明之后的命令参数为消息内容
* `rostopic hz <topic_name>` 获取话题 `topic_name` 中消息发布的频率
* `rostopic type <topic_name>` 列出话题 `topic_name` 的消息类型, 可配合 `rosmsg` 查看消息类型的具体信息  
    * 将配合[管道符](../web/linux/shell.md#管道)或[命令取值](../web/linux/shell.md#使用变量)将命令的输出输入到 `rosmsg` 中, 实现查询消息类型的详细信息, 例如 `rostopic type <topic_name> | rosmsg show`
* `rosmsg show <topic_type>` 获取消息类型 `topic_type` 的详细信息  

#### 图形话题工具
* `rosrun rqt_plot rqt_plot` 启动消息检测工具
    * 向输入框中输入 `<topic_name>/<attr_name>` 并回车, 可检测话题 `topic_name` 的消息中字段为 `attr_name` 的数据随时间的变化
    * 选中 `autoscroll` 复选框, 可使图像随时间滚动
    * 如果无法看到数据曲线, 先检查话题中是否有持续发送的消息, 再使用工具栏中的工具适当移动图像, 设置坐标轴范围等

### 基于 Python 的话题编程
在编程中, 分别使用发布者对象 `rospy.Publisher` 与接收者 `rospy.Subscriber` 管理与实现节点发布消息与接收消息的功能  
一个节点允许有多个发布者对象与接收者对象, 以实现信息的多重与多向传递, 如反馈

对于发布者 Talker (Publisher), 可使用对象 `rospy.Publisher` 进行管理
* 构造函数 `rospy.Publisher(name, data_class, *, queue_size)`
    * `name` 消息发布到的话题名称, 详细规则见[命名空间](#命名空间)
    * `data_class` 消息类型, 表示方法见下文对消息使用的介绍
    * `queue_size` 话题消息的缓冲队列长度, 一般为 10
* 对象方法 `rospy.Publisher.publish(*args, **kwds)` 发布消息
    * `args` 按消息字段的定义顺序确定消息内容, 与消息对象示例化类似, 见下文介绍
    * `kwargs` 将消息的字段作为关键字, 与消息对象示例化类似
    * 也可以直接将消息类型实例化的对象作为参数传入  

对于订阅者 Listener (Subscriber), 可使用对象 `rospy.Subscriber` 进行管理
* 构造函数 `rospy.Subscriber(name, data_class, callback)`
    * `name` 订阅消息的话题名称, 详细规则见[命名空间](#命名空间)
    * `data_class` 消息类型, 要求同 `rospy.Publisher`
    * `callback` 接收到订阅消息时调用的回调函数, 该回调函数接收一个参数, 即订阅话题的消息对象, 使用方法见下文对消息使用的介绍  
    对订阅消息的回调处理将在后台进行, 不会影响之后代码的运行
* 对象方法 `rospy.Subscriber.unregister()` 取消订阅话题

对于消息在 Python 中的使用 (以标准消息功能包 `std_msgs` 下的字符串消息 `String` 为例)
* 消息的本质即一个具有多个统一字段, 每个字段有规定类型的数据结构
* 首先导入有关功能包或定义消息类型后, 使用 `catkin_make` 构建功能包
* 在 ROS 功能包同名的 Python 包下的 `msg` 模块内, 定义了与消息同名的类定义对象 `<MsgName>`  
例如导入模块 `std_msgs.msg`, 通过 `std_msgs.msg.String` 即可表示消息类型 `String` 的类定义对象
* 消息类型的类定义对象可作为参数传递给类 `rospy.Publisher` 或 `rospy.Subscriber` 以确定使用的消息类型
* 通过消息类型的类定义对象可以构造特定消息对象, 构造函数为 `<MsgName>(*args, **kwds)`
    * `args` 按消息字段的定义顺序以位置参数的方式确定消息内容
    * `kwargs` 将消息的字段作为关键字, 字段下的内容作为参数确定消息内容 (推荐)
    * 注意, 按位置与按关键字两种示例化方式只能使用其中一种
    * 例如 `str_msg = std_msgs.msg.String(data = "Hello")`
* 使用消息对象时, 可通过消息对象中与消息字段同名的对象属性访问消息中特定字段的值
    * 例如 `str_msg.data` 可访问消息 `String` 的字段 `data`

### 自定义消息
* 功能包的自定义消息通常位于功能包的文件夹 `msg` 下, 且具有后缀 `.msg`, 文件名即消息类型名称
* 以下为消息的字段常用的类型, 更多参见 <https://wiki.ros.org/msg>
    * `int32` 32 位整型 (对应 Python 的 `int`)
    * `uint8` 8 位无符号整型 (对应 Python 的 `bytes`)
    * `float64` 64 位浮点型 (对应 Python 的 `float`)
    * `string` 字符串 (对应 Python 的 `str`)
    * `bool` 布尔型
    * `<类型>[]` 不定长数组 (对应 Python 的元组, uint8 类型则对应 `bytes`)
    * `<类型>[C]` 定常数组 (同上)
    * `<功能包>/<类型>` 来自其他功能包的消息类型
    * `Header` 消息头类型, 为消息类型 `std_msgs/msg/Header.msg` 的别名
    * `time` 时间戳类型 (对应 Python 的 `rospy.Time`)
* 消息文件的各行分别定义了消息的各个字段, 使用格式 `<msg_type> <property_name>`
    * `msg_type` 字段类型, 具体见上
    * `property_name` 字段名称, 以字母开头的, 字母数字与下划线组合
    * 文件中可使用 `#` 注释
* 在[功能包元信息](./base.md#功能包元信息)文件中添加自定义消息有关的依赖包
    * `<build_depend>message_generation</build_depend>`
    * `<exec_depend>message_runtime</exec_depend>`
* 在功能包的 `CMakeLists.txt` 中添加构建时功能包依赖, 即在 `find_package(catkin REQUIRED COMPONENTS ...)` 后添加依赖功能包 `message_generation`
* 在功能包的 `CMakeLists.txt` 中添加运行时功能包依赖, 即在 `catkin_package(...)` 中添加依赖功能包 `CATKIN_DEPENDS message_runtime`
* 在功能包的 `CMakeLists.txt` 中取消关于函数 `add_message_files(FILES ...)` 的注释, 并将其中的文件替换为添加的消息文件名 (不需要路径)
* 在功能包的 `CMakeLists.txt` 中取消关于函数 `generate_messages(DEPENDENCIES ...)` 的注释, 并添加使用到的其他功能包名 (即使没有使用其他功能包, 也要取消注释该函数, 而不写入参数)
* 使用 `catkin_make` 构建, 再使用 `source ./devel/setup.bash` 将生成的消息定义导入环境, 最后使用 [rosmsg show](#基本命令行话题工具) 检查消息文件是否创建成功

### 消息相关使用功能包
* 功能包 `std_msgs` 提供了一系列基础的消息类型, 常用的有
    * `Float64MultiArray` 浮点数数组, 可用于传递任意长度的向量
    * ``
* 功能包 `geometry_msgs` 提供了一系列与几何描述有关的消息类型, 常用的有
    * `Accel,Twist` 旋量消息, 可用于表示速度, 加速度或力, 分为速度与角速度两部分
    * `Point` 位置消息, 包含 x, y, z 三个坐标
    * `Quaternion` 四元数姿态消息, 包含 x, y, z, w 四个分量

## ROS 服务
ROS 中的服务 (Service) 为一种节点间数据传输方式  
数据传输时, 节点分别扮演服务端 (Sever) 与客户端 (Client), 通过客户端节点向服务端节点发送请求 (Request) 命令服务端完成特定指令, 完成后服务端将运行响应 (Response) 发送回客户端  
因此服务通常作为模块向外接收控制命令, 提供特定功能的接口

其中请求与相应的本质即[消息](#ros-话题), 两者共同构成特定的服务类型 (Srv)

### 基于工具的服务应用
使用命令 `rosservice` 管理正在运行的服务

* `rosservice list [-n]` 列出当前所有服务
    * 选项 `-n` 列出服务以及提供服务的节点
* `rosservice call <service_name> -- <request>` 向指定服务发送请求
    * `service_name` 服务名称
    * `request` 请求内容, 表示方法见[命令行中表示 YAML](#命令行中表示-YAML)
    * 运行后返回服务的响应
* `rosservice type <service_name>` 列出服务 `service_name` 的服务类型, 可配合 `rossrv` 查看服务类型的具体信息
    * 与 [rosmsg](#基本命令行话题工具) 类似有 `rosservice type <service_name> | rossrv show` 可直接获取服务的详细信息
* `rossrv show <service_type>` 获取服务类型 `service_type` 的详细信息, 使用 `---` 分隔, 上方为请求信息, 下方为相应信息  

### 基于 Python 的服务编程
对于客户端 Client, 可使用对象 `rospy.ServiceProxy` 进行管理  
* 构造函数 `rospy.ServiecProxy(name, service_class, persistent = False)`
    * `name` 使用的服务名称, 详细规则见[资源创建与访问](#命名空间)
    * `service_class` 服务类型, 表示方法见下文对服务使用的介绍
    * `persistent` 是否保持连接, 对于需要频繁调用的服务, 通过此方法可加快请求速度, 但消耗更多系统性能
* 对象方法 `rospy.ServiecProxy.wait_for_service(timeout = None)` 等待服务启动, 在对象初始化后, 使用服务前需要先保证服务已经启动
    * `timeout` 最长等待时间, 单位为秒
* 对象方法 `rospy.ServiecProxy.__call__(*args, **kwds)` 以函数对象的方式向服务发送请求
    * 参数使用与[消息的使用](#基于-python-的话题编程)以及 `rospy.Publisher.pub(*args, **kwds)` 类似 
    * 方法还将返回服务端的回应对象
    * 由于 `__call__` 为可调用对象的特殊方法, 因此可将 `rospy.ServiceProxy` 对象以类似调用函数的方法访问服务

对于服务端 Server, 可使用对象 `rospy.Service` 进行管理
* 构造函数 `rospy.Service(name, service_class, handler)`
    * `name` 创建的服务名称, 详细规则见[命名空间](#命名空间)
    * `service_class` 服务类型, 表示方法见下文对服务使用的介绍
    * `handler` 服务处理函数, 接收服务请求消息对象, 返回服务相应消息对象 (即使相应消息为空)

对于服务在 Python 中的使用 (以教学功能包 `turtlesim` 下的位置服务 `turtlesim.srv.TeleportAbsolute` 为例)
* 服务的本质即请求与回应两种[消息](#基于-python-的话题编程)的结合
* 在 ROS 功能包同名的 Python 包下的 `srv` 模块内, 定义了与消息同名的类定义对象 `<SrvName>`  
例如导入模块 `turtlesim.srv`, 通过 `turtlesim.srv.TeleportAbsolute` 即可表示服务类型 `TeleportAbsolute` 的类定义对象
* 服务类型的类定义对象可作为参数传递给类 `rospy.ServiecProxy` 或 `rospy.Service` 以确定使用的服务类型
* 通过 `<SrvName>Request` 即可获得客户请求消息的消息类定义对象, 同理有 `<SrvName>Response` 即可获得服务回应消息的消息类定义对象  
例如 `turtlesim.srv.TeleportAbsoluteRequest`
* 对于请求消息与回应消息的使用参见[消息的使用](#基于-python-的话题编程)

### 自定义服务
* 功能包的自定义消息通常位于功能包的文件夹 `srv` 下, 且具有后缀 `.srv`, 文件名即消息类型名称
* 自定义服务文件中, 使用 `---` 分隔请求消息 (位于上方) 与响应消息定义 (位于下方), 定义方法与[自定义消息](#自定义消息)相同
* 导入服务时修改功能包下 `CMakeList.txt` 的方法与[自定义消息](#自定义消息)相同, 唯一的区别是需要将其中一个对应函数改为 `add_service_files`

## ROS 参数服务器
ROS 中的参数服务器 (Parameter Server) 为一种节点间数据传输方式  
参数服务器总是由[主节点](#ros-节点)主持, 而节点则可以修改与读取参数服务器上的内容, 并且服务器中还具有只有单节点或节点组内独有的私有参数  
因此参数服务器通常用于存放节点的共享配置信息

### 参数类型
参数服务器中的参数主要有以下常用类型
* `int` 32 位整数
* `double` 双精度浮点数
* `bool` 布尔值
* `str` 字符串
* `list` 列表 (类型与长度无限制)

### 基于工具的参数服务器应用
使用命令 `rosparam` 管理参数服务器
* `rosparam set <param_name> <value>` 设置参数
    * `param_name` 被设置的参数
        * 如果不存在将自动创建
        * 可直接设置 `/<节点 (组) 路径>`, 此时需要传入对象, 即参数名与参数值的键值对
    * `value` 参数值, 表示方法见[命令行中表示 YAML](#命令行中表示-YAML)
* `rosparam get <param_name>` 获取参数
    * `param_name` 获取的参数
        * 直接访问 `/<节点 (组) 路径>`, 获取其下所有参数与参数值
        * 直接访问 `/` 则能得到整个参数服务器
* `rosparam dump <file_name> <param_name>` 导出参数服务器的数据
    * `file_name` 保存的 yaml 文件名
    * `param_name` 通常直接访问 `/<节点 (组) 路径>` 或 `/`, 保存其下所有参数与参数值
* `rosparam load <file_name> <param_name>` 将数据导入参数服务器
    * `file_name` 导入数据的 yaml 文件名
    * `param_name` 通常直接访问 `/<节点 (组) 路径>` 或 `/`, 将文件数据全部导入
* `rosparam delete <param_name>` 删除参数

访问参数名称 `param_name` 时注意[命名空间](#命名空间)

### 基于 Python 的参数服务器应用
<https://wiki.ros.org/rospy_tutorials/Tutorials/Parameters>

* `rospy.get_param(name)` 获取参数 `name` 的值
* `rospy.set_param(name, val)` 设置参数 `name` 的值为 `val`
* `rospy.has_param(name)` 检查参数 `name` 是否存在
* `rospy.delete_param(name)` 删除参数 `name`

访问参数名称 `name` 时注意[命名空间](#命名空间)

### launch 文件导入参数
通过以下两个标签可通过 [launch 文件](#launch-文件), 在节点启动前导入参数
* `param` 设置参数服务器中的参数
    * 属性 `name` 参数名称
    * 属性 `type` 参数类型, 可选值为 `str , int, double, bool`, 也可不给出由参数值自动识别类型
    * 使用以下属性之一表示参数的值
        * 属性 `value`, 直接以属性的参数作为参数值
        * 属性 `command` 给出的运行命令, 并将输出作为参数值
        * 属性 `textfile` 给出文件路径, 并将文件内容以字符串方式读取并作为参数值 
    * 在节点标签下时, 参数位于节点下时, 即参数位于私有路径下 `~[参数]` (关于路径参见[命名空间](#命名空间))
    * 在节点组标签下时, 参数位于节点组中, 即参数位于相对路径下 `[参数]`
    * 该标签为自闭和标签, 没有内容
* `rosparam` 加载或导出参数服务器中的参数 
    * 属性 `command` 执行命令
        * `load` 从 yaml 文件导入参数
        * `dump` 将参数保存导 yaml 文件中
    * 属性 `file` 目标文件路径
    * 参数所在空间的规则与 `param` 标签同
    * 该标签为自闭和标签, 没有内容

## 调试与检查
### 消息记录与回放
使用命令 `rosbag` 可用于记录与回访[话题](#ros-话题)下发布的消息
* `rosbag record [-a | -e <reg>| -x <reg>] [-o <prefix>] [-p] [topic1 [topic2 ...]]` 开始记录消息 (记录消息时, 所有有关节点都应当在运行中)
    * `topci` 指定记录的话题名, 默认记录所有话题
    * `-a` 记录所有话题的消息
    * `-e <reg>` 记录名称满足正则表达式 `reg` 的话题
    * `-x <reg>` 排除名称满足正则表达式 `reg` 的话题
    * `-o <prefix>` 在记录文件的文件名名添加前缀, 可以此设置输出文件的保存路径 (默认保存在当前目录下, 文件名为时间 + `.bag`)
    * `-p` 在开始记录时, 发送消息
    * `--duration=<time>` 持续指定时间的记录消息, 默认单位为秒, 如果没有指定, 将持续记录到程序被 <kbd>Ctrl</kbd><kbd>C</kbd> 关闭 
* `rosbag info [--freq] [-y] <file>` 读取记录的 bag 文件的基本信息
    * `file` 被读取的 bag 文件
    * `--freq` 计算各话题下消息的发布频率
    * `-y` 以 yaml 格式输出信息
    * 可配合 [grep](../web/linux/base.md#内容搜索) 命令搜索特定话题即有关信息
* `rosbag play [-r <factor>] [-l] [-d <sec>] [--pause] [--topic <topic1> [topci2...]] <file>` 回放消息 (回访消息时, 有关的节点应当在运行中, 但不一定要启动负责发布消息的节点)
    * `file` 用于回放的 bag 文件路径
    * `-r <factor>` 以倍率 `factor` 发送消息
    * `-d <sec>` 每次发送消息间隔 `sec` 秒 (用于调试)
    * `-l` 循环发送消息
    * `--pause` 命令运行后立刻暂停, 不直接开始回放消息
    * `--topic <topic1> [topci2...]` 仅回放话题 `topicx` 下的消息 (话题应使用完整名称, 见[命名空间](#命名空间)介绍)

* 关于更高级的消息回放筛选, 回放视频消息等见文档 <https://wiki.ros.org/rosbag/Tutorials>
* 关于可视化控制消息回放, 见 [rqt_bag 的使用](https://wiki.ros.org/rqt_bag?distro=noetic)

### 错误检查
使用命令 `roswtf` 可用于检查当前 ROS 环境中是否存在问题
* `roswtf` 检查当前的 ROS 环境与运行的节点是否存在问题
* `roswtf --all` 联网检查所有的功能包是否存在问题

### 命令行中表示数据结构
参考自 <https://wiki.ros.org/ROS/YAMLCommandLine>

* 在 ROS 的命令行通过 [yaml](../random/textdata.md#yaml) 语法表示数据结构 
    * 纯量可直接使用, 表示方法与 [yaml 纯量表示](../random/textdata.md#纯量表示)相同
    * 复合结构使用 [yaml 复合结构的单行表示语法](../random/textdata.md#复合结构)表示, 如
        * 列表 `[val1, val2, ...]`
        * 对象 `{key1: val1, key2: val2, ...}` 注意与 yaml 相同, `:` 需要紧跟键名 `key`, 并且与键值 `val` 保持一个空格 
* 在表示数据结构时, 注意需要使用 `"` 或 `'` 包裹表示数据结构的字符串, 注意区分[两种包裹的区别](../web/linux/shell.md#字符串)
    * `"` 将对内容进行的变量 `${}` 与转义符 `\` 转义
    * `'` 将直接显示原始内容
    * 在终端中, 仅输入左侧 `"` 或 `'`, 可实现多行输入, 不会影响
* 表示消息时注意
    * 使用列表或对象构造消息时的行为类似[实例化消息对象](#基于-Python-的话题编程)  
        * 传入列表时, 将按位置与消息的字段对应
        * 传入对象时, 将按字段名与消息的字段对应
    * 表示时间戳类型 `time` 时, 可传入字符串 `now` 表示当前时间
    * 表示消息头类型 `Header` 时, 可传入字符串 `auto` 自动生成
    * 表示 yaml 的空类型时, 将被自动转换为空字符串 `""`

### 动态参数调节
<https://wiki.ros.org/dynamic_reconfigure>

通过功能包 `dynamic_reconfigure` 时间在节点内动态调节参数的功能  
使用该功能包前, 需要将该功能包添加到运行时与构建时依赖中, 可参见[添加依赖功能包](./base.md#添加依赖功能包)

首先要创建参数配置文件, 以确定可动态条件的参数与调节方式  
通常参数配置文件位于文件夹 `cfg` 下, 有后缀 `.cfg`, 文件的基本格式如下
```python
#!/usr/bin/env python

# 以下三行为配置文件开始的的固定语句
PACKAGE = "<功能包名称>"
from dynamic_reconfigure.parameter_generator_catkin import *
gen = ParameterGenerator()

# 主要参数设置

# 添加一般类型参数的示例
gen.add("int_param", int_t, 0, "An Integer parameter", 50, 0, 100)
# 添加枚举类型参数的示例
size_enum = gen.enum([ gen.const("Small",      int_t, 0, "A small constant"),
                       gen.const("Medium",     int_t, 1, "A medium constant"),
                       gen.const("Large",      int_t, 2, "A large constant"),
                       gen.const("ExtraLarge", int_t, 3, "An extra large constant")],
                     "An enum to set size")
gen.add("size", int_t, 0, "A size parameter which is edited via an enum", 1, 0, 3, edit_method=size_enum)

# 该行为配置文件结束的的固定语句
exit(gen.generate(PACKAGE, "<功能包名称>", "<配置名称>"))
```

编写配置文件注意
* 配置文件本质为一个 Python 脚本, 第一行 `#!/usr/bin/env python` 以及基本格式中的开始与结束语句不能少
* 开始语句中, `gen = ParameterGenerator()` 创建了名称为 `gen` 的配置对象, 通过该对象的成员函数创建参数
* 通过函数 `gen.add(name, paramtype, level, description, default, min = None, max = None, edit_method = None)` 添加一般参数
    * `name` 字符串, 参数名称
    * `paramtype` 参数类型, 可用的类型有 `int_t` 整数, `double_t` 浮点数, `bool_t` 布尔值, `str_t` 字符串
    * `level` 整数, 参数级别, 该值将与参数绑定, 并作为一个修改事件回调函数的参数传入
    * `description` 字符串, 参数的描述, 将在修改工具中显示
    * `default` 参数的默认值
    * `min` 参数的最小值 (可以不指定, 且对于字符串与布尔类型的参数不需要指定)
    * `max` 参数的最大值 (可以不指定, 且对于字符串与布尔类型的参数不需要指定)
    * `edit_method` 用于枚举参数的创建 (参考以上示例)
* 通过函数 `gen.generate(pkgname, nodename, name)` 结束配置的生成, 通常放在 `exit()` 函数内
    * `pkgname` 功能包名称, 通常直接使用在第一行声明的功能包名称常量 `PACKAGE`
    * `nodename` 使用参数的节点名称, 没有实际意义, 仅用于生成文档
    * `name` 配置的名称, 需要与该配置文件的文件名一致 (不需要后缀)
* 配置文件编写完成后, 需要赋予配置文件[执行权限](../web/linux/base.md#文件权限), 一般使用命令 `chmod +x <文件路径>`
* 此外还需要在 `CMakeLists.txt` 文件中添加配置文件
    * 取消注释函数 `generate_dynamic_reconfigure_options`, 并添加 `.cfg` 文件路径作为函数参数 (相对功能包根目录的路径)
    * 取消注释函数 `add_dependencies`, 并添加 `<目标名> ${PROJECT_NAME}_gencfg` 作为函数参数 (用于 C++, 对于 Python 不需要该操作)

通过[服务端](#ros-服务)的方式, 在节点中接收参数修改 (以 Python 为例)
* 在程序开始导入模块 
    * `from dynamic_reconfigure.server import Server` 导入参数修改服务类 `Server`, 节点通过作为该服务的服务器, 接收参数的修改 
    * `from <功能包名>.cfg import <配置名>Config` 导入配置信息类, 其中 `配置名` 即配置文件的文件名
* 创建参数修改服务类 `srv = Server(type, callback, namespace = "")`, 等价于创建了一个用于接收参数修改的[服务](#ros-服务)
    * `type` 配置信息类, 即服务接收的配置信息
    * `callback` 接收到参数修改时调用的回调函数, 回调函数接收参数 `config, level`, 其中 
        * `config` 为一个以参数名为键值的字典, 包含了所有参数
        * `level` 为被修改参数的组别编号
        * `namespace` 从参数服务器获取配置初值时的搜索[命名空间](#命名空间), 默认即节点所在名称空间
        * 该函数一般直接返回字典 `config`, 表示新的参数值 (即使不修改参数也需要直接接返回)
        * 在对象创建时也将调用该回调函数, 用于传入参数的初始值, 此时组别编号为 `-1`

通过以下方式可配置与修改动态参数
* 由于在启动参数修改服务时, 将尝试从参数服务器中寻找参数的初始值 (寻找同名的节点==私有参数==), 因此可以通过 [launch 文件](#launch-文件)设置参数的初值
* 以客户端的方式, 通过调用参数修改服务, 实现参数的修改, 具体见 <https://wiki.ros.org/dynamic_reconfigure/Tutorials/UsingTheDynamicReconfigurePythonClient>
* 通过可视化工具 `rqt` 中打开子工具 Plugins -> Configuration -> Dynamic Reconfigure 修改参数 (如果工具出现显示异常, 可尝试重装 `rqt_reconfigure`)
* 通过命令行工具 `rosrun dynamic_reconfigure dynparam` 修改节点的动态参数
    * `rosrun dynamic_reconfigure dynparam list` 列出所有具有动态参数的节点
    * `rosrun dynamic_reconfigure dynparam get <node>` 获取节点 `node` 当前的动态参数
    * `rosrun dynamic_reconfigure dynparam set <node> <key> <val>` 动态将节点 `node` 的参数 `key` 设置为 `val`
    * `rosrun dynamic_reconfigure dynparam dump <node> <file>` 将节点 `node` 的参数保存为 yaml 文件 `file`
    * `rosrun dynamic_reconfigure dynparam load <node> <file>` 将 yaml 文件 `file` 中设置的参数导入节点 `node` 的动态参数

### ros 命令与节点
对于 ROS 提供的大部分命令行工具, 如 `rostopic` 以及图形化工具 `rqt_xxx` 其本质均为特殊的 ROS 节点, 具有以下特点
* 命令不存在时, 可使用 `sudo apt install ros-<版本>-<命令名>` 安装
* 可通过 `-h` 查询命令的详细参数 (包括图形化工具, 可传入参数以实现特定预设)
* 可作为节点使用 `rosrun` 或使用 [launch 文件](./node.md#launch-文件)启动, 节点参数即命令参数

## rospy 高级应用
完整使用见 <https://wiki.ros.org/rospy/Overview>

### rospy 中的实用函数
* `rospy.on_shutdown(hook)` 在节点被销毁时执行函数 `hook`
* `rospy.spin()` 接管节点线程以用于处理[话题消息接收](#基于-python-的话题编程)或处理[受到的服务请求](#基于-python-的服务编程)  
对于没有主循环仅处理回调的节点可使用此函数代替主循环
* `rospy.sleep(duration)` 节点休眠指定时长, 用于控制无 `Rate` 对象的循环
    * `duration` 休眠时长, 单位秒
* `rospy.wait_for_message(topic, topic_type, timeout = None)` 订阅并等待话题, 接收到一个消息后立即取消订阅并返回
    * `topic` 订阅话题名, 对应 [rospy.Subscriber](#基于-python-的话题编程) 对象构造函数的参数 `name`
    * `topic_type` 订阅话题的消息类型, 对应 [rospy.Subscriber](#基于-python-的话题编程) 对象构造函数的参数 `data_class`
    * `timeout` 等待时长, 单位为秒, 传入 `None` 时将不断等待
    * 当接收到消息时, 将返回接收到的消息对象, 否则发出异常 `ROSException`

### 命名空间
在 ROS 中, 包括服务, 话题, 节点, 参数服务器内的参数等所有资源均是以 `命名空间/资源名` 的方式作为访问路径
* 命名空间与资源名都要求为一个以字母为首的, 由字母, 数字与下划线组成的字符串
* ROS 中的命名空间有以下特点
    * 允许有多个层次的命名空间, 各个层次使用 `/` 划分
    * 所有资源都将位于根命名空间 `/` 下
* 对于一个节点 `/ns/nd` 其访问资源时, 有以下几种访问路径形式形式
    * 绝对路径, 即以根命名空间 `/` 为起点, 给出完整的资源路径
    * 相对路径, 即路径没有起点, 此时将相对节点所在的命名空间进行访问  
    例如节点 `/ns/nd` 访问路径 `foo/bar` 时, 实际将访问资源 `/ns/foo/bar`
    * 私有路径, 即路径以私有符号 `~` 为起点, 此时将访问节点命名空间下的资源 (不是严格的私有)  
    例如节点 `/ns/nd` 访问路径 `~foo/bar` 时, 实际将访问资源 `/ns/nd/foo/bar`
* 资源的所在的名称空间可通过以下方法设置
    * 节点所在的命名空间即 [launch 文件](#launch-文件)中节点所在的节点组, 如果没有节点组则节点位于根命名空间 `/` 下
    * 其他资源则由创建时给出的路径 (可以使用任意三种路径形式) 确定其所在的命名空间
* 关于资源访问 rospy 提供了以下函数
    * `rospy.get_name()` 获取节点的绝对路径
    * `rospy.get_namespace()` 获取节点所在名称空间的绝对路径
* 通过 [launch 文件](#launch-文件)中的 `remap` 标签可用于名称重映射
    * 属性 `from` 被重映射的名称
        * 仅给出名称时, 路径中所有与名称匹配的部分都将被重映射
        * 给出绝对路径时, 仅该路径会被重映射
    * 属性 `to` 目标名称, 该属性最好与 `from` 对应
        * `from` 给出名称时, 该属性也给出名称, 将替换名称
        * `from` 给出路径时, 该属性也给出路径, 将替换路径 (可以是绝对或相对路径)
    * 名称重映射的作用域仅局限在其所在的路径
        * 位于节点组标签下时, 节点组中的节点创建与访问的资源将被重映射
        * 位于节点标签下时, 仅节点中创建与访问的资源将被重映射
    * 该标签为自闭和标签, 没有内容

### 日志打印
* `rospy.loginfo(msg)` 发送 INFO 级别的日志 `msg` 
    * `msg` 即索要发送的日志, 与 `print` 不同, 只能发送字符串, 因此推荐使用[格式化字符串](../py/base/base.md#格式化字符串)
    * 日志在节点运行时, 将被打印到屏幕上或写入节点文件中 (由运行方式决定), 并写入[日志节点](ROS-节点) `rosout` 中, 可通过[节点可视化管理工具](#节点可视化管理工具)相关工具查询
* 对于所有日志级别, 有以下从低到高的日志发送函数
    * `rospy.logdebug(msg)` DEBUG 调试级别 (仅记录到日志文件)
    * `rospy.loginfo(msg)` INFO 信息级别 (发送到标准输出 `stdout` 上)
    * `rospy.logwarn(msg)` WARN 警告级别 (发送到标准错误 `stderr` 上, 下同)
    * `rospy.logerr(msg)` ERR 错误级别
    * `rospy.logfatal(msg)` FATAL 致命级别
* 此外发送日志函数还有如下变种 (以 INFO 级别为力)
    * `rospy.loginfo_once(msg)` 此处的日志仅在第一次运行时发送 (即使多次被执行)
    * `rospy.logdebug_throttle(period, msg)` 在第一次执行后以固定的时间发送日志, 以实现变量追踪 (即使多次被执行)
        * `period` 日志发送间隔, 单位为秒
        * `msg` 发送日志, 即使使用格式化字符串 (`format` 或 f-字符串), 依然能追踪变量

### 在 rospy 中使用 numpy
<https://wiki.ros.org/rospy_tutorials/Tutorials/numpy>

* 如果在功能包中使用了 Numpy, 应当在[功能包元信息](./base.md#功能包元信息)中添加以下依赖信息
    * `<build_depend>python-numpy</build_depend>`
    * `<run_depend>python-numpy</run_depend>`
* 将数组消息解析为 Numpy 数组
    * [ROS 消息](#自定义消息)中, 默认情况下数组消息将被作为元组接收  
    * 使用 `from rospy.numpy_msg import numpy_msg` 导入函数 `numpy_msg()`  
    * 使用 `numpy_msg(msg_name)` 包裹消息类型, 将返回一个被修饰的消息类型, 访问其中数组类型的消息时, 将以 Numpy 数组的方式读取, 同样也能通过 Numpy 数组创建消息
    * 注意, 通过 Numpy 数组创建消息时, 数组的元素类型 (`dtype`) 应当与消息的数组元素类型相同

### 图像消息与 rospy
参见教程

<https://wiki.ros.org/rospy_tutorials/Tutorials/WritingImagePublisherSubscriber>