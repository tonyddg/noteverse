# 机器人编程
## TF
<https://wiki.ros.org/tf/Tutorials>

TF 为一个 ROS 功能包, 可用于跟踪与定义机器人上多个不同位姿的刚体, 根据刚体坐标系之间的变换关系构建坐标变换树  
此时节点仅需要与主节点中的 TF 变换树进行交互即可查询与修改机器人上刚体坐标系  
通过监听 TF 坐标树, 从坐标变换树中查询坐标系之间的关系; 通过向 TF 发布坐标系信息, 更新坐标变换树并同步到各个子坐标系的变换

在 TF 变换树中, 使用字符串表示各个坐标系, 一般也会仿照[命名空间](./node.md#命名空间)使用 `/` 划分层次防止名称冲突

### TF 命令行工具
可通过 `roslaunch turtle_tf turtle_tf_demo.launch` 运行关于 TF 的例程以实验命令行工具的使用  
注意 TF 的命令行工具均为特殊的 ROS 节点, 因此需要通过 `rosrun tf ...` 运行, 且根节点需要存在

* `rosrun tf view_frames [path]` 获取当前 TF 坐标系变换树
    * `path` 保存文件路径, 通常为 `.pdf` 文件
    * 通过该命令将当前所有坐标系及各自变换关系以变换树的形式导出为 pdf 图片
* `rosrun tf tf_echo <source_frame> <target_frame> [rate]` 打印坐标系变换信息
    * `source_frame` 观察坐标系
    * `target_frame` 描述坐标系
    * `rate` 输出频率, 单位 HZ, 默认为 1
    * 该命令将按指定的频率打印观察坐标系观察下, 描述坐标系的位置 (坐标) 与姿态 (rpy 角与四元数) 信息
* `rosrun tf tf_monitor [source_frame] [target_frame]` 打印坐标系广播信息
    * `source_frame` 观察坐标系
    * `target_frame` 描述坐标系
    * 默认将打印所有坐标系之间的广播信息
    * 该命令将持续监视与打印计算坐标系广播频率与变换延迟等信息
* `rosrun tf static_transform_publisher <frame_describe> <frame_id> <child_frame_id> <period_in_ms>` 广播静态坐标系变换
    * `frame_describe` 坐标系描述信息, 一般包含了以下参数 `<x> <y> <z> <yaw> <pitch> <roll>`, 即观察坐标系下描述坐标系的位置与 rpy 角 (注意传入的是 p, r, y 而不是 r, p, y)
    * `frame_id` 观察坐标系, 当不存在时将创建
    * `child_frame_id` 描述坐标系, 当不存在时将创建
    * `period_in_ms` 广播间隔
    * 通过该节点不断广播静态的坐标系信息, 实现约束两个坐标系之间的静态关系
    * 可通过在 [launch 文件](./node.md#launch-文件)中运行该节点以在创建静态的坐标系关系, 例如  
    `<node pkg="tf" type="static_transform_publisher" name="link1_broadcaster" args="1 0 0 0 0 0 1 link1_parent link1 100" />`

### 在 Python3 中使用 TF
由于功能包 TF 存在问题, 只能在 Python2 中使用, 如果要在 Python3 中使用 TF 需要手动重新编译, 具体步骤如下

* 安装依赖 `sudo apt-get install libbullet-dev`
* 安装依赖 `pip3 install empy==3.3.4` (不可安装最新版)
* 创建编译 tf 的工作空间, 一般放在 Home 下 `mkdir ~/tf/src; cd ~/tf/src`
* 克隆编译所需的源代码 
    * `git clone https://github.com/ros/geometry2` (仅使用 tf2 时安装)
    * `git clone https://github.com/ros/geometry` (使用 tf 时还需要安装)
* 使用 tf 时还需要修改源代码 `geometry2/tf2/CMakeLists.txt`, 参考 <https://github.com/ros/geometry/issues/213#issuecomment-643552794>  
* 回退到工作空间下 `cd ~/tf`
* 编译下载的源代码 `catkin_make --cmake-args ...`, 命令还需要如下选项 (任意版本安装均可)
    * `-DCMAKE_BUILD_TYPE=Release` 以 Release 模式编译
    * `-DPYTHON_EXECUTABLE=<...>` Python 可执行文件路径, 即指向 `Python3` 的路径
        * 一般为 `/usr/bin/python3`
        * conda 下为 `<环境根目录>/bin/python3`
    * `-DPYTHON_INCLUDE_DIR=<...>` Python 包含文件夹路径
        * 一般为 `/usr/include/python3.x`
        * conda 下为 `<环境根目录>/include/python3.x`
        * 其中 `x` 为 Python 版本号
    * `-DPYTHON_LIBRARY` Python 库路径
        * 一般为 `/usr/lib/x86_64-linux-gnu/libpython3.x.so`
        * conda 下为 `<环境根目录>/lib/libpython3.x.so`
        * 其中 `x` 为 Python 版本号
* 编译完成后, 使用 tf 时注意
    * 在 Python 中直接使用时, 需要导入环境 `source ~/tf/devel/setup.bash`
    * 当功能包调用时, 需要跨工作空间调用 tf 中的功能包, 可参考[跨工作空间调用功能包](./base.md#常见功能包与工作空间问题)
* 如果执行以上步骤后依然失败, 可以尝试在脚本的开头添加 `import sys` 与 `sys.path.reverse()` 或提升新安装功能包包含路径的位置, 以提高新安装 tf 功能包的导入优先级 (应保证新安装的 tf 功能包的包含路径在 `sys.path` 内, 否则检查上一步)

### TF 节点编程
在使用节点与 TF 交互时, 需要将功能包作为[运行时与编译时依赖导入](./base.md#添加依赖功能包)

对于更新坐标系信息的节点, 可使用对象 `tf.TransformBroadcaster` 管理节点向 TF 变换树发布坐标系信息
* 构造函数 `br = tf.TransformBroadcaster(queue_size: int = 100)`
    * `queue_size` 广播消息的缓冲队列长度, 由于 TF 变换树本质为一个话题, 因此该参数的本质即设置[话题的缓冲队列](./node.md#基于-python-的话题编程)
* 对象方法 `br.sendTransform(translation, rotation, time, child, parent)` 可用于发送坐标系信息
    * `translation` 一个三浮点数元组, 表示观察标系下描述坐标系的原点坐标
    * `rotation` 一个四浮点数元组, 表示观察标系下描述坐标系的位姿, 可使用 [TF 姿态函数](#tf-姿态函数)将不同姿态转换为四元数
    * `time` 姿态信息的时间戳, 通常通过 `rospy.Time.now()` 直接创建当前时间的时间戳
    * `child` 描述坐标系名称, 使用字符串表示, 当一个不存在的坐标系被广播时将自动创建
    * `parent` 观察坐标系名称, 使用字符串表示, 当一个不存在的坐标系被广播时将自动创建

对于获取坐标系信息的节点, 可使用对象 `tf.TransformListener` 管理节点向 TF 变换树获取两个坐标系之间的位姿信息
* 构造函数 `lr = tf.TransformListener()`
* 对象方法 `lr.lookupTransform(target_frame, source_frame, time)` 可用于查询坐标变换信息
    * `target_frame` 描述坐标系名称, 使用字符串表示, 当查询不存在的坐标系时将抛出异常
    * `source_frame` 观察坐标系名称, 使用字符串表示, 当查询不存在的坐标系时将抛出异常
    * `time` 传入 ros 时间戳, 以查询该至少新于该时间戳的变换, 一般传入 `rospy.Time(0)` 表示获取最新的变换信息
        * 获取最新变换时, 推荐采用下方的方式
        * 可传入 `rospy.Time.now() - rospy.Duration(s)` 获取之前的变换信息, 可用于绘制运动路径等操作
    * 该方法将返回一个包含了两个列表的元组, 分别表示了坐标系描述的位姿 (原点坐标) 与姿态 (四元数)
    * 当查询失败时, 如坐标系不存在, 指定时间前坐标不存在, 坐标系之间没有变换关系时将抛出异常
* 对象方法 `lr.waitForTransform(target_frame, source_frame, time, timeout)` 可用于等待要求时间戳的坐标变换信息
    * `target_frame, source_frame, time` 与方法 `lr.lookupTransform` 参数含义相同
    * `timeout` 传入 ros 时间对象, 使用 `rospy.Duration(s)` 创建, 表示等待新于要求时间戳变化消息的最长等待时长
    * 将等待到符合要求的变换出现或达到等待时间, 等待结束后继续运行

由于 TF 变换树间传递消息存在约 1 秒的延时, 因此直接查询最新的变换时, 该变换的时间戳不能确定  
为了获取最新的变换信息且同时有一个关于该变换较准确的时间信息, 推荐使用以下代码用于接收变换

```python
try:
    # 尝试接收最新变换信息
    now = rospy.Time.now()
    listener.waitForTransform("target_frame", "source_frame", now, rospy.Duration(<等待时长>))
    (trans,rot) = listener.lookupTransform("target_frame", "source_frame", now)
except:
    # 没有接收到新的坐标系变换时, 跳过本次控制循环
    continue
```

### TF 姿态函数
更多信息见 <https://wiki.ros.org/tf/Overview/Transformations>

tf 功能包中还提供了一系列实用函数用于姿态间的变换, 通过 `import tf.transformations` 导入姿态变换模块, 该模块的常用函数有

* 将欧拉角转为四元数 `tf.transformations.quaternion_from_euler(ai, aj, ak, axes = "sxyz")`
    * `ai, aj, ak` 欧拉角的第 1, 2, 3 个角度参数, 单位为弧度 (可利用[序列解包语法](../py/base/base.md#序列类型))
    * `axis` 欧拉角规范, 使用字符串表示, 默认为 `sxyz` 即绕固定轴以 x, y, z 顺序旋转 (即 RPY 角规范)
    * 函数返回一个四元素的元组, 即传入欧拉角对应的四元数, 可用于广播坐标信息使用
* 将四元数转为欧拉角 `tf.transformations.euler_from_quaternion(quaternion, axes = "sxyz")`
    * `quaternion` 使用四个浮点数元组表示的四元数
    * `axis` 欧拉角规范, 具体见 `tf.transformations.quaternion_from_euler()` 的介绍
    * 返回值为一个三元素的元组, 即被转换的欧拉角
* 将四元数转为旋转矩阵 `tf.transformations.quaternion_matrix(quaternion)`
    * `quaternion` 使用四个浮点数元组表示的四元数
    * 返回值为一个 4x4 的齐次矩阵, 平移部分为 0
* 四元数插值 `tf.transformations.quaternion_slerp(quat0, quat1, fraction)`
    * `quat0, quat1` 起止位置的四元数, 均使用四个浮点数的元组表示
    * `fraction` 插值位置, 取值范围为 0 ~ 1
    * 返回值为插值结果的四元数
* 经测试, tf 提供的函数在创建单个姿态时, 快于 Scipy; 但对于 slerp 插值以及多个姿态同时转换慢于 Scipy
    * 对于单个姿态的表示建议使用 tf 功能包内的函数
    * 对于 Slerp 插值, 如果追求速度时可使用 Scipy 提供的函数, 并尽量矢量化操作, 即以此传入多个数, 同时操作多个姿态以避免创建姿态对象导致的额外开销, 且 Scipy 还支持 SQUAD 插值

## RVIZ
RVIZ 即一个 ROS 功能包, 提供了将消息可视化的仿真环境, 可以可视化多种 ROS 消息  
默认情况下 RVIZ 将不会显示任何内容, 需要进行手动配置, 让 RVIZ 正确订阅与显示消息

通过 `apt install ros-melodic-rviz` 可以安装 rviz

由于 rviz 本质也为一个节点, 因此启动 rviz 前需要先使用 `roscore` 启动主节点
* 直接运行 `rviz`
* 作为节点运行 `rosrun rviz rviz`
* 在 lanuch 文件中运行 `<node pkg="rviz" type="rviz" name="rviz"/>`

### RVIZ 配置
为了避免每次启动 RVIZ 后, 需要重复手动配置, 可将 RVIZ 的配置导出
* 菜单栏选择 File -> Save Config As 将当前的配置导出为 `.rviz` 的配置文件
* 之后启动 rviz 时, 导入之前导出的配置文件
    * 对于命令行, 使用 `rviz -d <file>` 导入配置文件, `file` 为 rviz 配置文件路径
    * 对于 launch 文件, 通过 `args` 标签参数传入, 有 `args="-d $(find <功能包名>)/配置文件路径"` (注意选项 `-d`)

## URDF
URDF 即统一机器人描述格式, 是在 ROS 中, 一种用于描述机器人连杆外形与特性以及连杆间关节的 XML 格式数据文件

完整参考文档见 <https://wiki.ros.org/urdf/XML>

### 基本说明
URDF 可用于描述多种类型的机器人, 包括并联, 串联, 移动等多种类型的机器人  
在 URDF 中, 认为机器人由两种类型的部件组成, 即连杆与关节 
* 连杆: 一般为机器人上一块可视为刚体的完整部分
* 关节: 表示不同连杆之间的相对运动与约束关系, 认为关节没有实际外形  
* 一个关节只能连接两个连杆, 但一个连杆上可以有多个关节
* 在关节中有区分父连杆与子连杆, 对于连杆上的多个关节, 最多只能在其中一个关节中作为子连杆

URDF 使用时有以下基本注意
* URDF 文件使用 `urdf` 作为后缀, 一般位于功能包工作空间的 `./config/urdf` 或 `./urdf` 文件夹下
* URDF 文件使用 `robot` 标签作为根标签, 该标签有属性 `name`, 表示机器人的名称
* URDF 文件第一行一般需要有 XML 文件描述, 如 `<?xml version="1.0"?>`
* 描述机器人时, 长度单位默认为米, 角度单位默认为弧度, 质量单位默认为 kg

在使用 URDF 中, 均使用 `origin` 自闭合标签定义新的坐标系属性, 注意
* 对于连杆, 该标签属性以其作为子连杆的关节坐标系为观察坐标系, 若没有作为子连杆, 则以世界坐标系为观察坐标系
* 对于关节, 该标签以其中父连杆的观察坐标系作为关节的观察坐标系
* 对于世界坐标系, 认为 x 正方向指向屏幕外, y 正方向指向右侧, z 正方向竖直向上
* 属性 `xyz` 即 `xyz` 方向的移动量, 使用三个以空格间隔的浮点数表示参数, 默认为 `0 0 0` 
* 属性 `rpy` 即 `xyz` 欧拉角, 以 x, y, z 轴为顺序, 绕观察坐标系的坐标轴旋转, 使用三个以空格间隔的浮点数表示参数, 默认为 `0 0 0`
* 该标签描述坐标系的方法
    * 以[运动算子](/course/machine/robotic/ch1.md#运动算子与坐标变换的关联)的角度, 即从观察坐标系出发, 先根据 `xyz` 参数进行平动, 再以运动坐标系根据 `rpy` 参数进行转动
    * 以[坐标系描述](/course/machine/robotic/ch1.md#描述坐标系的一般方法)的角度, 即 `xyz` 参数为新坐标系原点在观察坐标系的坐标, `rpy` 参数得到的旋转矩阵为观察坐标系观察下, 新坐标系坐标轴的方向

### 连杆描述
在 URDF 中, 通过 `link` 标签以及其中的子标签描述一个连杆  

该标签有以下属性
* 必要属性 `name` 表示连杆的名称

该标签具有以下用于描述连杆特性的子标签
* 可选子标签 `visual` 表示连杆外观
    * 必要子标签 `geometry` 表示外观实体的几何形状, 用于示意, 不一定要与实际相符
        * 自闭合子标签 `box` 表示长方体
            * 属性 `size` 使用三个以空格间隔的浮点数表示参数, 即长方体在 x, y, z 方向的长度
            * 长方体的中心 (三个中间面的交点) 位于位姿原点上
        * 自闭合子标签 `cylinder` 表示圆柱体
            * 属性 `radius` 使用浮点数为参数, 即圆柱体的半径
            * 属性 `length` 使用浮点数为参数, 即圆柱体的高
            * 圆柱体的中心 (轴线与半高度平面的交点) 位于位姿原点上
        * 自闭合子标签 `sphere` 表示球体
            * 属性 `radius` 使用浮点数为参数, 即球体的半径
            * 球体的球心位于位姿原点上
        * 自闭合子标签 `mesh` 表示特定模型文件, 参见文档介绍
    * 可选子标签 `material` 表示外观的渲染材质
        * 标签属性 `name` 表示材质名称
        * 自闭合子标签 `color` 使用四个以空格分隔的浮点数为参数, 即材质颜色的 `rgba` 值, 通道范围均为 [0, 1]
        * 自闭合子标签 `texture` 表示特定材质文件, 参见文档介绍
        * 可将该标签定义在根标签 `robot` 下用于定义一类材质, 在连杆描述中只需要通过标签属性 `name` 指定材质名称即可
    * 可选自闭合子标签 `origin` 表示连杆外观实体的位姿
* 可选子标签 `inertial` 惯性参数
    * 可选子标签 `origin` 表示惯性参数的观察坐标系
    * 必要子标签 `inertia` 表示连杆的惯性矩 (惯性张量)
        * 属性 `ixx, iyy, izz` 表示特定轴上的惯性矩
        * 属性 `ixy, izx, iyz` 表示特定轴上的惯性积
    * 必要子标签 `mass` 表示连杆的质量
        * 属性 `value` 表示
* 可选子标签 `collision` 碰撞体参数, 出于安全, 碰撞体应包裹实际连杆
    * 必要子标签 `geometry` 与 `visual` 标签的子标签相同
    * 可选子标签 `origin` 表示碰撞体的位姿

### 关节描述
在 URDF 中, 通过 `joint` 标签以及其中的子标签描述一个关节  

该标签有以下属性
* 必要属性 `name` 表示关节的名称
* 必要属性 `type` 表示关节的类型, 有以下可用的值
    * `revolute` 表示单轴旋转副关节
    * `prismatic` 表示单轴平动副关节
    * `continuous` 表示单轴任意旋转关节, 通常用于表示轮子
    * `fixed` 表示固连关节, 通常用于表示固定在机器人上的传感器
    * `floating` 表示浮动关节, 该关节连接的两个连杆间具有所有六个自由度
    * `planar` 表示平面关节, 该关节限制连杆在一个平面上旋转或平动

该标签具有以下常用的用于描述关节特性的子标签
* 必要自闭合子标签 `parent` 表示关节的父连杆
    * 属性 `link` 即父连杆的名称 (定义父连杆的 `link` 标签的 `name` 属性)
* 必要自闭合子标签 `child` 表示关节的子连杆
    * 属性 `link` 即子连杆的名称
* 可选自闭合子标签 `origin` 表示父连杆坐标系观察下的关节坐标系, 注意该坐标系与关节运动有关, 同时也即子连杆的坐标系
* 可选自闭合子标签 `axis` 表示旋转副的转轴, 平动副的平动方向, 平面关节的平面法向量
    * 属性 `xyz` 使用三个以空格间隔的浮点数表示参数, 默认为 `1 0 0`, 即在关节坐标系下上述方向的坐标, 要求给出的是单位矢量
* 可选自闭合子标签 `dynamics` 表示关节的力学特性
    * 属性 `damping` 表示关节阻尼, 默认为 0, 平动副单位为 $N/(m\cdot s^{-1})$, 旋转副单位为 $N\cdot m/(rad\cdot s^{-1})$
    * 属性 `friction` 表示关节静摩擦, 默认为 0, 平动副单位为 $N$, 旋转副单位为 $N\cdot m$
* 必要闭合子标签 `limit` 表示关节的限位 (仅 `revolute` 与 `prismatic` 类型的关节必要)
    * 必要属性 `velocity` 表示关节最大速度, 平动副单位为 `m/s`, 旋转副单位为 `rad/s`
    * 必要属性 `effort` 表示关节最大驱动力, 与最大速度共同决定了关节的最大功率
    * 属性 `lower` 表示关节位移的下限位, 默认为 0
    * 属性 `upper` 表示关节位移的上限位, 默认为 0
* 可选自闭合子标签 `mimic` 模仿关节, 详见文档
* 可选自闭合子标签 `safety_controller` 安全控制属性, 详见文档
* 可选自闭合子标签 `calibration` 关节方向标定, 详见文档

### XACRO 参数化模型
XACRO 也属于一个 ROS 功能包, 该功能包能扩展 URDF 的语法, 使 URDF 的定义更加灵活  
具体使用可参见文档 <https://wiki.ros.org/xacro>

使用 XACRO 前需要注意
* 通常使用 XACRO 参数化的 URDF 文件使用后缀 `.urdf.xacro`
* 根标签 [robot](#基本说明) 需要添加属性 `xmlns:xacro="http://www.ros.org/wiki/xacro"`

XACRO 提供了以下常用的参数化方法
* 根标签下的自闭合标签 `xacro:property`, 可通过该标签封装参数
    * 属性 `name` 表示参数名称
    * 属性 `value` 表示参数值
    * 在表示 URDF 标签属性的值时, 可使用 `${<参数名>}` 引用参数
    * 通过该方法, 可封装机器人的特定参数, 实现参数统一与模型的参数化
* 可在表示 URDF 参数时使用表达式
    * 使用 `${<exp>}` 用于解析数学运算, XACRO 将运算表达式 `exp` 的值, 并将结果作为参数
        * 表达式 `exp` 中, 可使用 Python 的数学运算符与 `math` 模块下的函数进行运算如函数 `radians` 可将角度转为弧度
        * 表达式 `exp` 中也可以直接使用 `xacro:property` 标签中所封装的参数或数字字面量
        * 标签 `xacro:property` 的参数 `value` 中的表达式使用函数 `load_yaml(<yaml_file>)` 可导入 yaml 文件, 此时使用 `arg['key']` 的方式访问 yaml 文件中的键值对
    * 使用 `$(<exp>)` 实现类似 [launch](./node.md#launch-文件) 中表达式 `$(<exp>)` 的功能
        * 其中 `$(find <pkg>)` 可用于寻找功能包
        * 参数 `$(arg <val>)` 则通过标签 `<xacro:arg name="..." default="..."/>` 定义, 类似的可通过命令行以 `<arg>:=...` 的方式传入参数
* 根标签下的标签 `xacro:macro`, 可通过该标签创建模板, 封装特定的机器人部件
    * 属性 `name` 表示模板名称
    * 属性 `params` 表示模板的参数列表, 多个参数间使用空格分隔
        * 直接给出参数名, 表示一个模板参数
        * 对于传入子标签等操作参见文档 <https://wiki.ros.org/xacro>
    * 标签内即模板内容, 使用以下方法调用模板参数
        * 使用 `${}` 表达式可调用模板参数
    * 使用模板时
        * 通过标签 `xacro:<模板名>` 调用模板
        * 模板参数通过调用模板标签中的属性 `<参数名>="参数值"` 确定
* 根标签下的标签 `xacro:include`, 可导入其他 XACRO 文件
    * 属性 `filename` 表示被调用的文件名, 通常使用 `$(find ...)` 获取特定功能包的根目录
    * 通过自闭和标签 `<.../>` (... 为调用文件名), 将导入的 XACRO 文件在此展开

使用 XACRO
* 使用前检查是否安装了相关的功能包 `rospack find xacro`
* 通过命令 `xacro <file>` 可解析 xacro 文件并输出到控制台上  
可通过[重定向](../web/linux/shell.md#重定向), 将解析结果输出到特定文件中, 例如 `xacro "a.urdf.xacro" > "a.urdf"`

### 直接检查 URDF 模型
* 安装 URDF 模型所需的基本功能包 `sudo apt install ros-melodic-urdf` 
* 安装 URDF 模型检查工具 `sudo apt-get install liburdfdom-tools`

使用命令 `check_urdf <file>` 可以简单检查 URDF 文件是否存在语法错误, 以及进行初步解析  

对于 XACRO, 可使用以下命令创建一个临时解析结果用于检查, 并在检查后删除    
`xacro <文件名>.urdf.xacro > tmp.urdf ; check_urdf tmp.urdf ; rm tmp.urdf`

### 在 RVIZ 中查看 URDF 模型
使用 `apt` 命令安装 URDF 模型仿真有关功能包 
* 仿真环境 `ros-melodic-rviz`
* URDF 模型读取 `ros-melodic-robot-state-publisher`
* URDF 关节操作界面 `ros-melodic-joint-state-publisher-gui`

使用 [launch 文件](./node.md#launch-文件)统一管理节点, 基本模板如下 (注意打开 launch 文件前, 应够保证没有正在运行的 roscore)
```xml
<launch>
    <!-- 将 URDF 文件导入参数服务器 -->
    <param name="/robot_description" textfile="$(find <所在功能包>)/urdf/<模型名>.urdf"/>

    <!-- 启动机器人状态和关节状态发布节点 -->
    <node pkg="robot_state_publisher" type="robot_state_publisher" name="robot_state_publisher" />

    <!-- 启动图形化的控制关节运动节点 -->
    <node pkg="joint_state_publisher_gui" type="joint_state_publisher_gui" name="joint_state_publisher_gui" output = "screen" />

    <!-- 启动仿真环境 -->
    <node pkg="rviz" type="rviz" name="rviz"/>
</launch>
```

关于该模板需要说明
* 参数服务器参数 `/robot_description` 即字符串形式的 URDF 文件内容, 该参数为节点 `robot_state_publisher` 所需的, 因此也可通过 [remap](./node.md#launch-文件) 的方式修改名称以向该节点传入参数
* 导入 XACRO 参数化模型, 则需要使用 `xacro` 解析模型, 并直接读取命令输出, 而不需要读取文件  
`<param name="/robot_description" command="$(find xacro)/xacro $(find <所在功能包>)/urdf/<模型名>.urdf.xacro"/>`
* 由于查看模型必须要有 rviz 节点, 因此可为该节点添加 `required` 属性, 当模型浏览结束关闭 rviz 后自动退出节点

RVIZ 中的模型导入
1. 在左侧 display 窗口下方的 Add 按钮添加 RobotModel, 通常将自动添加 URDF 模型, 若没有查看其中的 Robot Description 项目参数是否为参数服务其中, 通过 launch 文件导入 URDF 文件的参数名 (此时可能存在错误且无法看见具体模型, 但可以继续操作)
1. 使用同样的方式添加 TF, 即机器人的坐标系参数, 可在 display 窗口中取消复选框以隐藏
1. 在 display 窗口的 Global Options 项目下的 Fixed Frame 项目参数, 将该参数修改为机器人原点坐标系 (如底盘, 世界坐标系或专门的机器人的原点坐标系)
1. 为了避免重复导入模型, 可参考 [RVIZ 配置](#rviz-配置)的操作

问题解决
* 关于 UnicodeEncodeError <https://blog.csdn.net/lzzzzzzm/article/details/119799802>

### 使用 URDF 模型
参见 <https://wiki.ros.org/robot_state_publisher> 与 <https://wiki.ros.org/urdf/Tutorials/Using%20urdf%20with%20robot_state_publisher>

通过功能包 `robot_state_publisher` 下的节点 `robot_state_publisher` 可操作 URDF 模型中定义的机器人关节, 并接收机器人的关节信息同时发送机器人上各个坐标系信息到 [TF 变换树](#tf)中

基本使用方法如下
* 向参数服务器内的参数 `robot_description` 写入机器人 URDF 文件的内容
    * 可通过 `texefile` 等方法将文件内容转为字符串
    * 对于多个机器人, 由于该参数在相对路径中设置, 将节点与参数设置放置在特定节点组下即可, 或使用 [remap](./node.md#命名空间)
* 向话题 `joint_states` 发送消息功能包 `sensor_msgs` 下的消息 `JointState`, 通过该消息控制机器人的关节运动
    * 该消息的第一个字段 `name` 为一个字符串数组, `name[i]` 表明之后的控制参数所控制的关节名
    * 该消息的字段 `position` 为一个浮点数数组, `position[i]` 表明控制关节 `name[i]` 到指定的位置
    * 字段 `velocity` 与 `effort` 类似, 但分别以速度与力为控制对象, 除了 `name` 其余三个字段仅能有一个数组不为空发挥效果
    * 对于多个机器人, 由于该话题将发送到相对路径中, 将节点放置在特定节点组下即可
* 该节点还将向 TF 变换树广播机器人上各个坐标系
    * TF 变换树中的坐标系名称即[连杆描述](#连杆描述)与[关节描述](#关节描述)中的对应名称, 可接收这些坐标系以获取机器人各个部分的位姿
    * 对于多个机器人, 可通过参数 `tf_prefix` 为 TF 坐标系名称添加前缀
