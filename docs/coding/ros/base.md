# ROS 基础
## 绪论
### ROS 的组成
ROS 由通讯机制, 开发工具, 应用功能与生态系统四部分组成, 目标是提高机器人研发中的软件复用率

### ROS 生态系统
1. ROS Wiki
1. ROS Answers
1. ROS Repository

## 核心概念
### 通讯机制
#### Node
完成一个具体功能的节点, 可视为一个执行文件

1. 每个节点的编程语言, 承担的任务独立
1. 每个节点可以运行在不同的主机上
1. 每个节点的名称必须唯一

#### ROS Master
管理与控制节点

1. 为节点提供注册与命名服务
1. 辅助节点之间相互查找建立连接
1. 提供参数服务器, 记录全局变量提供给各个节点
1. 节点之间的传输不需要 ROS Master, 关闭后传输继续
1. 为了防止参数服务器等造成的错误, 每次运行新的 node 前必须重启 ROS Master

#### Topic
异步通讯机制

1. 使用发布 Publish 订阅 Subscribe 模型, 数据单向传输
1. 多个发布者发布, 一般仅有单个, 流向多个订阅者
1. 实时性较弱, 用于发送一般数据, 如图形, 雷达

#### Message
Topic 内的数据

1. 具有一定数据结构的消息, 在 Topic 中传播
1. 消息的数据结构与编程语言无关
1. 通过 .msg 文件定义, 大部分已预定义

#### Service
同步通讯机制

1. 使用客户端 Client 服务器 Service 模型, 双方互动
1. 可以有多个客户端, 但仅有一个服务器
1. 客户端发送请求 Request, 服务器完成后返回应答 Response
1. 通过 .srv 文件定义
1. 实时性较强, 通常用于发送配置信息, 如图形质量配置

#### Parameter
共享字典

1. 通过网络访问
1. 字典保存了变量的名称与参数的值
1. 存储静态的, 不会频繁改变的参数

### 文件系统
#### Package
功能包, 包含了节点源码, 配置文件, 数据定义等

#### Meta Package
元功能包, 包含了多个用于同一目的的功能包

#### Package manifest
记录功能包基本信息

## 命令行工具
1. 以 ros 开头的一系列工具 (可参考文件夹下 ROS_Cheat)
1. 通常各个节点为一个独立的进程, 因此要在不同的终端中启动节点
1. 大部分 ros 命令可通过 tab 键进行补全

### 示例
```shell
// 启动 ROS Master, 运行 ROS 节点前必须启动
roscore

// 通过 rosrun 启动节点
// 启动海龟模拟器的核心节点
rosrun turtlesim turtlesim_node

// 启动海龟模拟器的输入节点
rosrun turtlesim turtle_teleop_key

// 前缀 rqt 一般指与 ros 有关的 qt 界面
// 查看当前节点关系
rqt_graph
```

### 运行节点
#### roscore
启动 ROS Master, 在使用 ros 前必须先启动 roscore

#### rosrun
```shell
# 检查环境变量
echo $ROS_PACKAGE_PATH

rosrun <功能包名称> <功能包下的程序>
```

1. 使用非系统功能包前检查功能包是否加入了环境变量
1. 功能包下的程序即功能包下的可执行文件, C++ 即编译目标名, python 为 .py 的脚本名
1. 运行 python 脚本需要提前给脚本执行权限

### 结构查询
#### rosmsg
1. rosmsg show [功能包]/[消息结构]
查询功能包下定义消息结构的具体信息

#### rossrv
1. rosmsg show [功能包]/[服务消息结构]
查询功能包下定义服务消息结构的具体信息, 通过 --- 划分 request 与 response

### 信息获取
#### rosnode
1. rosnode list
列出系统中所有的节点

1. rosnode info <节点名>
列出节点的详细信息

#### rostopic
1. rostopic list
列出系统所有的话题
1. rostopic pub <话题名> <消息结构类型> "<消息数据>"
    1. 向话题发送数据, 输入话题名后, 可通过 tab 补全消息结构与消息数据
    1. 默认仅发布一次消息, 通过参数 -r <频率> 设置以一定频率循环发送

#### rosmessage
1. rosmessage show <消息结构类型>
获取消息结构

#### rosservice
1. rosservice list
列出系统中所有服务

1. rosservice call <服务名> "<请求数据>"
向服务发送请求, 可通过 tab 补全一般请求数据内容, 发送数据后将返回服务器的应答

#### rosparam
1. rosparam list
列出参数服务器中所有参数

1. rosparam get <参数名>
获取参数服务器中指定参数的具体值
1. rosparam set <参数名>
修改参数服务器中指定参数的具体值

1. rosparam dump <文件名>
将参数服务器中的参数保存到指定文件内 (以 yaml 格式保存)

1. rosparam load <文件名>
将指定文件的参数导入到参数服务器中 (以 yaml 格式读取)

#### rosbag
1. rosbag record
记录话题数据
    1. -a 保存所有数据
    1. -O <文件名> 将数据保存在目标位置

1. rosbag play
在 ROS Master 中复现数据, 复现时需要打开对应的节点, 可用于保存实际数据, 并在模拟器中复现, 方便调试

## 工作空间
### 工作空间 Workspace
1. 工作空间用于存放工程开发的相关文件
1. 一个工作空间中不能有同名的功能包

#### 工作空间结构
1. src 代码空间 放置功能包源代码
1. build 编译空间 放置编译的中间文件
1. devel 开发空间 放置编译结果
1. install 安装空间 放置用于发布的结果文件

### 功能包 Package
#### 文件结构
1. package.xml 存放功能包的作者, 依赖等信息
1. CMakeLists.txt 设置功能包的编译规则
1. include 放置 .h 文件
1. src 放置 c++ 源文件
1. script 放置 python 脚本文件
1. msg 放置 .msg 的消息结构定义

### 有关命令
#### 创建工作空间
##### 创建工作空间
```shell
mkdir -p ./[工作空间]/src
cd ./[工作空间]/src
// 创建工作空间
catkin_init_workspace
```

##### 编译工作空间
```shell
cd ./[工作空间]/
catkin_make
```

编译 src 中的源码, 将结果放入 devel 与 install 文件夹中 (需要 install 参数)

#### 创建功能包
于 src 中创建功能包

##### 创建功能包
```shell
cd ./[工作空间]/src
catkin_create_pkg <功能包名称> [功能包依赖] 
```

##### 编译功能包
```shell
cd ./[工作空间]
catkin_make
```

##### 设置环境变量
```shell
source ./[工作空间]/devel/setup.bash
```

1. 将工作空间的信息添加到环境变量中, 从而使 ros 能够找到当前创建的功能包
1. 运行此命令后, 在 src 中创建的功能包均能被 ros 找到
1. 根据采用的 shell 不同, 可能需要使用 setup.zsh (以 zsh 为 shell)
1. 可在主目录下的 .bashrc 添加, 实现开机启动, 避免每次启动都需要设置

##### 检查环境变量
```shell
echo $ROS_PACKAGE_PATH
```

检查功能包的路径是否在 ros 的环境变量下

# ROS 编程 (C++)
## 语言结构
### 头文件


### 函数
#### 节点初始化
```c++
ros::init(argc, argv, 节点名称) 
```

1. 通常直接将 main 的 argc, argv 传入, 可以在终端中设置参数
1. 节点名称为字符串, 不可重复

#### 日志输出
```c++
ROS_INFO(...)
```

输出日志, 采用类 printf 语法

### 基本 ROS 对象
#### 节点句柄
```c++
ros::NodeHandle n;
```

* 通过节点句柄管理节点资源

## 功能实现
### Publish

#### 实现结构
1. 初始化 ROS 节点
1. 注册节点的 Publisher 信息, 包括发布话题与话题中的消息类型
1. 创建消息
1. 按一定频率发布消息

#### 实现代码
##### 创建 Publisher
```c++
ros::Publisher pub = 
    n.advert<消息结构>(话题名称, 缓冲队列长度)
```

* 话题名称要与 Subscriber 订阅的话题一致
* 即消息缓冲队列长度更具数据处理的速度决定

##### 向 Topic 发送 Msg
```c++
msg = ...
pub.publish(msg);
```

* 通过调用 ros::Publisher 的成员函数 publish 发送信息
* 信息 msg 需要定义并填充数据

##### 发布循环
```c++
ros::Rate rate([循环频率 Hz]);

while(ros::ok())
{
    ...
    rate.sleep();
}
```

通过延时, 使循环满足要求的频率, 实现按一定频率发布数据

#### 示例程序
```c++
#include <ros/ros.h>
#include <geometry_msgs/Twist.h>

int main(int argc, char ** argv)
{
    // 节点初始化
    ros::init(argc, argv, "velocity_publisher");


    ros::NodeHandle n;

    ros::Publisher turtle_vel_pub = 
    n.advertise<geometry_msgs::Twist>("/turtle1/cmd_vel", 10);

    ros::Rate loop_rate(10);

    int count = 0;
    while(ros::ok())
    {
        geometry_msgs::Twist vel_msg;
        vel_msg.linear.x = 0.5;
        vel_msg.linear.z = 0.2;

        turtle_vel_pub.publish(vel_msg);
        ROS_INFO(
            "Publish turtle command[%0.2f m/s, %0.2f rad/s]",
            vel_msg.linear.x, vel_msg.angular.z);
        
        loop_rate.sleep();
    }

    return 0;
}
```

### Subscriber
#### 实现结构
1. 初始化 ROS 节点
1. 订阅话题
1. 循环等待消息, 接收到消息后进入回调函数
1. 在回调函数中处理消息

#### 实现代码
##### 创建 Subscriber
```c++
ros::Subscriber pub = 
    n.subscribe<消息结构>(话题名称, 缓冲队列长度, 回调函数)
```

* 当提供了服务回调函数后, 模板可省略 (C++ 语法)

##### 回调函数
```c++
void Callback(const [功能包]::[消息结构]::ConstPtr&)
{
    ...
}
```

* Subscriber 在回调函数中处理消息
* 回调函数不能嵌套, 因此在回调函数返回后, 才会调用下一个回调函数
* 回调函数通过消息的 ConstPtr 子对象作为指针接收消息 (本质为 share_ptr)

##### 进入死循环, 等待数据
```c++
ros::spin();
```

程序进入死循环, 仅在每次循环中读取消息队列, 判断是否需要进入回调函数

#### 示例程序
```C++
#include <ros/ros.h>
#include "turtlesim/Pose.h"

void poseCallback(const turtlesim::Pose::ConstPtr& msg)
{
    ROS_INFO(
        "Publish turtle command[%0.2f m/s, %0.2f rad/s]"
        , msg->x, msg->y);
}

int main(int argc, char ** argv)
{
    ros::init(argc, argv, "pose_subscriber");

    ros::NodeHandle n;
    ros::Subscriber pose_sub = 
        n.subscribe("/turtle1/pose", 10, poseCallback);

    ros::spin();

    return 0;
}
```

### Client
#### 实现结构
1. 初始化 ROS 节点
1. 等待服务连接
1. 创建 Client 实例
1. 发送服务请求数据
1. 等待 Service 应答结果

#### 实现代码
##### 阻塞等待服务
```c++
ros::service::waitForService("[服务名]");
```

* waitForService 将阻塞程序, 直到服务出现

##### 创建客户端
```c++
ros::Client clt = n.ServiceClient<服务消息结构>("[服务名]");
```

##### 发送服务请求数据
```c++
clt.call([服务消息]);
```

* 将请求放入服务消息结构的 request 部分
* call 将阻塞程序直到服务器应答
* 应答结果将放入服务消息结构的 response 部分

#### 示例程序
```c++
#include <ros/ros.h>
#include <turtlesim/Spawn.h>

int main(int argc, char** argv)
{
    ros::init(argc, argv, "turtle_spawn");
    
    ros::NodeHandle n;

    ros::service::waitForService("/spawn");
    ros::ServiceClient add_turtle = 
        n.serviceClient<turtlesim::Spawn>("/spawn");

    turtlesim::Spawn srv;
    srv.request.x = 4.0;
    srv.request.y = 2.0;
    srv.request.name = "turtle2";

    ROS_INFO(
        "Call service to spawn turtle [x: %0.2f, y: %0.2f, name: %s]",
        srv.request.x, srv.request.y, srv.request.name.c_str()
        );

    add_turtle.call(srv);

    ROS_INFO(
        "spawn turtle sucCessfully [name: %s]",
        srv.response.name.c_str()
        );

    return 0;
}
```

### Server
#### 实现结构
1. 初始化 ROS 节点 
1. 创建 Server 实例
1. 循环等待服务请求, 进入回调函数
1. 回调函数中完成功能, 后返回应答数据

#### 实现代码
##### 创建 Service
```c++
ros::ServiceServer service = 
    node.advertiseService<
        功能包::服务信息数据结构::Request, 
        功能包::服务信息数据结构::Response>
        ("[服务名]", [服务回调函数]);
```

* 当提供了服务回调函数后, 模板可省略 (C++ 语法)

##### 服务回调函数
```c++
bool Callback(
    [功能包]::[服务信息数据结构]::Request &req,
    [功能包]::[服务信息数据结构]::Response &res)
{
    ...

    // 填写 res 内容
    res = ...

    return true;
}
```

* 服务回调函数不直接操控服务信息, 而是分开处理 Request 与 Response
* 回调函数操作引用, 注意与 Subscribe 不同
* 通过向参数 res 填写数据, 确定返回的 Response

##### 查询请求, 执行其他操作
```c++
while(ros::ok())
{
    ros::spinOnce();

    ...

    rate.sleep()
}
```

* 由于 Server 通常还会完成其他操作, 因此不能仅进入死循环
* 使用函数 ros::spinOnce() 仅查询队列是否有消息需要进行处理, 不阻塞程序

#### 示例程序

```c++
#include <ros/ros.h>
#include <geometry_msgs/Twist.h>
#include <std_srvs/Trigger.h>

bool pubCommand = false;

bool commandCallback(std_srvs::Trigger::Request &req, std_srvs::Trigger::Response &res)
{
    pubCommand = !pubCommand;

    ROS_INFO("Publish turtle command [%s]", pubCommand?"Yes":"No");

    res.success = true;
    res.message = "Change State";

    return true;
}

int main(int argc, char** argv)
{
    ros::init(argc, argv, "turtle_command_service");
    ros::NodeHandle node;

    ros::ServiceServer command_service = 
        node.advertiseService("/turtle_command", commandCallback);
    ros::Publisher turtle_vel_pub = 
        node.advertise<geometry_msgs::Twist>("turtle1/cmd_vel", 10);

    ROS_INFO("Ready to receive command");

    ros::Rate rate(10);

    while(ros::ok())
    {
        ros::spinOnce();

        if(pubCommand)
        {
            geometry_msgs::Twist vel_msg;
            vel_msg.linear.x = 0.5;
            vel_msg.angular.z = 0.2;

            turtle_vel_pub.publish(vel_msg);
            ROS_INFO(
                "Publish turtle command[%0.2f m/s, %0.2f rad/s]",
                vel_msg.linear.x, vel_msg.angular.z);
        }
        rate.sleep();
    }

    return 0;
}
    
```

### Parameter Server
一个可被全局访问的字典

#### 实现结构


#### 实现代码
##### 读取参数
```c++
int red = 0;
ros::param::get("/background_r", red);
```

* 通过 ros::param::get 读取参数, 其中参数的值通过引用的方式传递
* 函数返回 bool 值, 表示读取是否成功
##### 设置参数
```c++
ros::param::set("/background_r", 255);
```

* 设置参数值, 函数返回表示读取是否成功
##### 使参数修改生效
```c++
ros::service::waitForService("/clear");
ros::ServiceClient clear_background = node.serviceClient<std_srvs::Empty>("/clear");
std_srvs::Empty srv;
clear_background.call(srv);
```

* 通常修改参数后, 不会产生效果, 还需要通知有关的节点重新读取参数

## 消息定义
### Publish/Subscribe
#### 结构定义
todo

#### 依赖设置

```xml
<!-- 在 package.xml 中设置 -->

<!-- 添加编译依赖 -->
<build_depend>
message_generation
</build_depend>

<!-- 添加功能包依赖 -->
<exec_depend>
message_runtime
</exec_depend>
```

1. 定义语言无关的 .msg 文件
1. 在 Package.xml 中添加依赖 (如上)
1. 在 CMakeLists.txt 中修改编译设置 (使用 <kbd>ctr</kbd>+<kbd>f</kbd> 寻找有关位置)
    1. 添加功能包依赖
    find_package(... message_generation)
    1. 添加 .msg 文件
    add_message_files(FILES [.msg文件])
    1. 生成 .msg, 使用 std_msg (标准信息类型)
    generate_messages(DEPENDENCIES std_msgs)
    1. 添加运行依赖
    catkin_package(CATKIN_DEPENDS ... message_runtime)
1. 工作空间下运行 catkin_make, 编译消息文件

#### 程序调用

1. 消息定义的 C++ 头文件位于 ./[工作空间]/devel/include/[包名称]
1. 于 .vscode/c_cpp_properties.json 中添加 "${workspaceFolder}/devel/include", 用于编辑器识别
1. 在 cpp 中, 可直接使用 include "[功能包名]/[消息名].h" 调用消息类型
1. 生成代码时, 还需要在 CMakeLists 中添加代码依赖 (在编译功能包下添加)
    add_dependencies([编译目标] ${PROJECT_NAME}_generate_messages_cpp)
1. C++ 中, ROS 将功能包视为一个命名空间
1. 通过 [功能包名]::[信息数据结构名] 访问信息数据结构
1. 通过 [功能包名]::[信息数据结构名]::ConstPtr 访问信息数据结构指针 (本质为 share_ptr, 一般用于回调函数)

### Service
#### 结构定义
todo

#### 依赖设置
1. 与消息结构基本一致 
1. 将其中 add_message_files 改为 add_service_files 
1. 同样使用 std_msg, 但定义文件以 .srv 为后缀

#### 程序调用

1. 在 cpp 中, 可直接使用 include "[功能包名]/[消息名].h" 调用消息类型
1. 通过 [功能包名]::[信息数据结构名] 访问服务信息数据结构, 用于 Client, 以成员方式同时包含 request 与 response
1. 通过 [功能包名]::[信息数据结构名]::Request 访问请求信息数据结构
1. 通过 [功能包名]::[信息数据结构名]::Response 访问回应信息数据结构

## 编译设置

### 编译过程
```shell
# 打开工作空间
cd ./[工作空间]
# 开始编译
catkin_make

# 每次设用需要设置环境变量
source ./devel/setup.bash
```

1. 编译过程需要在功能包根目录下进行

### CMakeLists
#### 编译简单功能包
```CMakeLists
add_executable([编译目标] [源文件地址])

# 需要添加此句连接有关库
target_link_libraries([编译目标] ${catkin_LIBRARIES})
```

1. 在功能包文件夹下的 CMakeLists.txt 的 build 区添加以下编译设置
1. 以功能包文件加为基地址 (访问源文件需要 ./src/...)

#### 多文件编译
todo

# Launch 文件
通过 XML 文件实现多节点配置与启动并自动启动 ROS Master

## 常用标签
### launch
launch 文件根标签

### node
启动 ros 节点, 为自封闭标签

#### 必须属性
1. pkg 节点功能包名
1. type 节点可执行文件名
1. name 节点运行时的名称 (将取代节点的默认名称)

#### 可选属性
1. output 节点信息是否打印到终端
1. respawn 节点关闭后是否重启
1. require 节点是否必须启动
1. args 节点参数

### param
加载单个参数到参数服务器

1. name 参数名
1. value 参数值

### rosparam
加载文件中所有的参数到参数服务器中

### arg
保存在 launch 文件中的参数
通过 $(arg [参数名称]) 调用值

1. name 参数名
1. value 参数值

### remap
重映射资源, 如话题等, 改名后旧的名称将不存在

1. from 原始名称
1. to 新名称

### include
调用其他的 launch 问价

1. file 调用其他 launch 文件的路径, 可通过 $(dirname) 获取根目录

## launch 文件的使用
1. launch 文件也在功能包中保存, 放置于 ./src/launch 文件夹中
1. 编辑 launch 文件后, 需要使用 catkin_make 编译, 使 launch 文件在工作空间中注册
1. 使用 roslaunch [功能包] [launch 文件名] 启动 launch 文件


# ROS 编程 (Python)

1. 通常将 python 放置于功能包下的 script 文件夹中
1. python 脚本需要有可执行文件权限
1. 通过引用库 rospy 实现功能, 不需要 catkin_make 编译

## 基本结构
1. 定义一个主函数, 包含了创建节点与节点主要功能
1. 运行主函数, 实现节点功能

## 消息处理
```python
from [功能包名].msg import [消息结构] 
```

通过 import 语法引用消息结构

## 功能实现
### Publisher

#### 示例程序
```Python
#!/usr/bin/python3

import rospy
from geometry_msgs.msg import Twist

def velocity_publisher():
    rospy.init_node("velocity_publisher", anonymous=True)
    
    turtle_vel_pub = rospy.Publisher("/turtle1/cmd_vel", Twist, queue_size=10)
    rate = rospy.Rate(10)

    while not rospy.is_shutdown():
        vel_msg = Twist()
        vel_msg.linear.x = 0.5
        vel_msg.angular.z = 0.2

        turtle_vel_pub.publish(vel_msg)
        rospy.loginfo("Publish turtle command[%0.2f m/s, %0.2f rad/s]", vel_msg.linear.x, vel_msg.angular.z)

        rate.sleep()

if __name__ == '__main__':
    try:
        velocity_publisher()
    except: 
        rospy.ROSInitException()
        pass

```

### Subscriber

#### 示例程序
```python
#!/usr/bin/python3

import rospy
from turtlesim.msg import Pose

def poseCallback(msg):
    rospy.loginfo("Publish turtle command[%0.2f m/s, %0.2f rad/s]", msg.x, msg.y)

def pose_subscribe():
    rospy.init_node("pose_subscribe", anonymous=True)
    
    rospy.Subscriber("/turtle1/pose", Pose, poseCallback, queue_size=10)

    rospy.spin()

if __name__ == '__main__':
    try:
        pose_subscribe()
    except: 
        rospy.ROSInitException()
        pass 
```

### Service
#### 区别注意
1. rospy 不提供 spinOnce 函数, 需要通过多线程实现

#### 示例程序
