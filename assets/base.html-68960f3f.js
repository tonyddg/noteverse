import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as a,c as i,e as n}from"./app-b1f1d151.js";const s={},l=n(`<h1 id="ros-基础" tabindex="-1"><a class="header-anchor" href="#ros-基础" aria-hidden="true">#</a> ROS 基础</h1><h2 id="绪论" tabindex="-1"><a class="header-anchor" href="#绪论" aria-hidden="true">#</a> 绪论</h2><h3 id="ros-的组成" tabindex="-1"><a class="header-anchor" href="#ros-的组成" aria-hidden="true">#</a> ROS 的组成</h3><p>ROS 由通讯机制, 开发工具, 应用功能与生态系统四部分组成, 目标是提高机器人研发中的软件复用率</p><h3 id="ros-生态系统" tabindex="-1"><a class="header-anchor" href="#ros-生态系统" aria-hidden="true">#</a> ROS 生态系统</h3><ol><li>ROS Wiki</li><li>ROS Answers</li><li>ROS Repository</li></ol><h2 id="核心概念" tabindex="-1"><a class="header-anchor" href="#核心概念" aria-hidden="true">#</a> 核心概念</h2><h3 id="通讯机制" tabindex="-1"><a class="header-anchor" href="#通讯机制" aria-hidden="true">#</a> 通讯机制</h3><h4 id="node" tabindex="-1"><a class="header-anchor" href="#node" aria-hidden="true">#</a> Node</h4><p>完成一个具体功能的节点, 可视为一个执行文件</p><ol><li>每个节点的编程语言, 承担的任务独立</li><li>每个节点可以运行在不同的主机上</li><li>每个节点的名称必须唯一</li></ol><h4 id="ros-master" tabindex="-1"><a class="header-anchor" href="#ros-master" aria-hidden="true">#</a> ROS Master</h4><p>管理与控制节点</p><ol><li>为节点提供注册与命名服务</li><li>辅助节点之间相互查找建立连接</li><li>提供参数服务器, 记录全局变量提供给各个节点</li><li>节点之间的传输不需要 ROS Master, 关闭后传输继续</li><li>为了防止参数服务器等造成的错误, 每次运行新的 node 前必须重启 ROS Master</li></ol><h4 id="topic" tabindex="-1"><a class="header-anchor" href="#topic" aria-hidden="true">#</a> Topic</h4><p>异步通讯机制</p><ol><li>使用发布 Publish 订阅 Subscribe 模型, 数据单向传输</li><li>多个发布者发布, 一般仅有单个, 流向多个订阅者</li><li>实时性较弱, 用于发送一般数据, 如图形, 雷达</li></ol><h4 id="message" tabindex="-1"><a class="header-anchor" href="#message" aria-hidden="true">#</a> Message</h4><p>Topic 内的数据</p><ol><li>具有一定数据结构的消息, 在 Topic 中传播</li><li>消息的数据结构与编程语言无关</li><li>通过 .msg 文件定义, 大部分已预定义</li></ol><h4 id="service" tabindex="-1"><a class="header-anchor" href="#service" aria-hidden="true">#</a> Service</h4><p>同步通讯机制</p><ol><li>使用客户端 Client 服务器 Service 模型, 双方互动</li><li>可以有多个客户端, 但仅有一个服务器</li><li>客户端发送请求 Request, 服务器完成后返回应答 Response</li><li>通过 .srv 文件定义</li><li>实时性较强, 通常用于发送配置信息, 如图形质量配置</li></ol><h4 id="parameter" tabindex="-1"><a class="header-anchor" href="#parameter" aria-hidden="true">#</a> Parameter</h4><p>共享字典</p><ol><li>通过网络访问</li><li>字典保存了变量的名称与参数的值</li><li>存储静态的, 不会频繁改变的参数</li></ol><h3 id="文件系统" tabindex="-1"><a class="header-anchor" href="#文件系统" aria-hidden="true">#</a> 文件系统</h3><h4 id="package" tabindex="-1"><a class="header-anchor" href="#package" aria-hidden="true">#</a> Package</h4><p>功能包, 包含了节点源码, 配置文件, 数据定义等</p><h4 id="meta-package" tabindex="-1"><a class="header-anchor" href="#meta-package" aria-hidden="true">#</a> Meta Package</h4><p>元功能包, 包含了多个用于同一目的的功能包</p><h4 id="package-manifest" tabindex="-1"><a class="header-anchor" href="#package-manifest" aria-hidden="true">#</a> Package manifest</h4><p>记录功能包基本信息</p><h2 id="命令行工具" tabindex="-1"><a class="header-anchor" href="#命令行工具" aria-hidden="true">#</a> 命令行工具</h2><ol><li>以 ros 开头的一系列工具 (可参考文件夹下 ROS_Cheat)</li><li>通常各个节点为一个独立的进程, 因此要在不同的终端中启动节点</li><li>大部分 ros 命令可通过 tab 键进行补全</li></ol><h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>// 启动 ROS Master, 运行 ROS 节点前必须启动
roscore

// 通过 rosrun 启动节点
// 启动海龟模拟器的核心节点
rosrun turtlesim turtlesim_node

// 启动海龟模拟器的输入节点
rosrun turtlesim turtle_teleop_key

// 前缀 rqt 一般指与 ros 有关的 qt 界面
// 查看当前节点关系
rqt_graph
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="运行节点" tabindex="-1"><a class="header-anchor" href="#运行节点" aria-hidden="true">#</a> 运行节点</h3><h4 id="roscore" tabindex="-1"><a class="header-anchor" href="#roscore" aria-hidden="true">#</a> roscore</h4><p>启动 ROS Master, 在使用 ros 前必须先启动 roscore</p><h4 id="rosrun" tabindex="-1"><a class="header-anchor" href="#rosrun" aria-hidden="true">#</a> rosrun</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 检查环境变量</span>
<span class="token builtin class-name">echo</span> <span class="token variable">$ROS_PACKAGE_PATH</span>

rosrun <span class="token operator">&lt;</span>功能包名称<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>功能包下的程序<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>使用非系统功能包前检查功能包是否加入了环境变量</li><li>功能包下的程序即功能包下的可执行文件, C++ 即编译目标名, python 为 .py 的脚本名</li><li>运行 python 脚本需要提前给脚本执行权限</li></ol><h3 id="结构查询" tabindex="-1"><a class="header-anchor" href="#结构查询" aria-hidden="true">#</a> 结构查询</h3><h4 id="rosmsg" tabindex="-1"><a class="header-anchor" href="#rosmsg" aria-hidden="true">#</a> rosmsg</h4><ol><li>rosmsg show [功能包]/[消息结构] 查询功能包下定义消息结构的具体信息</li></ol><h4 id="rossrv" tabindex="-1"><a class="header-anchor" href="#rossrv" aria-hidden="true">#</a> rossrv</h4><ol><li>rosmsg show [功能包]/[服务消息结构] 查询功能包下定义服务消息结构的具体信息, 通过 --- 划分 request 与 response</li></ol><h3 id="信息获取" tabindex="-1"><a class="header-anchor" href="#信息获取" aria-hidden="true">#</a> 信息获取</h3><h4 id="rosnode" tabindex="-1"><a class="header-anchor" href="#rosnode" aria-hidden="true">#</a> rosnode</h4><ol><li><p>rosnode list 列出系统中所有的节点</p></li><li><p>rosnode info &lt;节点名&gt; 列出节点的详细信息</p></li></ol><h4 id="rostopic" tabindex="-1"><a class="header-anchor" href="#rostopic" aria-hidden="true">#</a> rostopic</h4><ol><li>rostopic list 列出系统所有的话题</li><li>rostopic pub &lt;话题名&gt; &lt;消息结构类型&gt; &quot;&lt;消息数据&gt;&quot; <ol><li>向话题发送数据, 输入话题名后, 可通过 tab 补全消息结构与消息数据</li><li>默认仅发布一次消息, 通过参数 -r &lt;频率&gt; 设置以一定频率循环发送</li></ol></li></ol><h4 id="rosmessage" tabindex="-1"><a class="header-anchor" href="#rosmessage" aria-hidden="true">#</a> rosmessage</h4><ol><li>rosmessage show &lt;消息结构类型&gt; 获取消息结构</li></ol><h4 id="rosservice" tabindex="-1"><a class="header-anchor" href="#rosservice" aria-hidden="true">#</a> rosservice</h4><ol><li><p>rosservice list 列出系统中所有服务</p></li><li><p>rosservice call &lt;服务名&gt; &quot;&lt;请求数据&gt;&quot; 向服务发送请求, 可通过 tab 补全一般请求数据内容, 发送数据后将返回服务器的应答</p></li></ol><h4 id="rosparam" tabindex="-1"><a class="header-anchor" href="#rosparam" aria-hidden="true">#</a> rosparam</h4><ol><li><p>rosparam list 列出参数服务器中所有参数</p></li><li><p>rosparam get &lt;参数名&gt; 获取参数服务器中指定参数的具体值</p></li><li><p>rosparam set &lt;参数名&gt; 修改参数服务器中指定参数的具体值</p></li><li><p>rosparam dump &lt;文件名&gt; 将参数服务器中的参数保存到指定文件内 (以 yaml 格式保存)</p></li><li><p>rosparam load &lt;文件名&gt; 将指定文件的参数导入到参数服务器中 (以 yaml 格式读取)</p></li></ol><h4 id="rosbag" tabindex="-1"><a class="header-anchor" href="#rosbag" aria-hidden="true">#</a> rosbag</h4><ol><li><p>rosbag record 记录话题数据</p><ol><li>-a 保存所有数据</li><li>-O &lt;文件名&gt; 将数据保存在目标位置</li></ol></li><li><p>rosbag play 在 ROS Master 中复现数据, 复现时需要打开对应的节点, 可用于保存实际数据, 并在模拟器中复现, 方便调试</p></li></ol><h2 id="工作空间" tabindex="-1"><a class="header-anchor" href="#工作空间" aria-hidden="true">#</a> 工作空间</h2><h3 id="工作空间-workspace" tabindex="-1"><a class="header-anchor" href="#工作空间-workspace" aria-hidden="true">#</a> 工作空间 Workspace</h3><ol><li>工作空间用于存放工程开发的相关文件</li><li>一个工作空间中不能有同名的功能包</li></ol><h4 id="工作空间结构" tabindex="-1"><a class="header-anchor" href="#工作空间结构" aria-hidden="true">#</a> 工作空间结构</h4><ol><li>src 代码空间 放置功能包源代码</li><li>build 编译空间 放置编译的中间文件</li><li>devel 开发空间 放置编译结果</li><li>install 安装空间 放置用于发布的结果文件</li></ol><h3 id="功能包-package" tabindex="-1"><a class="header-anchor" href="#功能包-package" aria-hidden="true">#</a> 功能包 Package</h3><h4 id="文件结构" tabindex="-1"><a class="header-anchor" href="#文件结构" aria-hidden="true">#</a> 文件结构</h4><ol><li>package.xml 存放功能包的作者, 依赖等信息</li><li>CMakeLists.txt 设置功能包的编译规则</li><li>include 放置 .h 文件</li><li>src 放置 c++ 源文件</li><li>script 放置 python 脚本文件</li><li>msg 放置 .msg 的消息结构定义</li></ol><h3 id="有关命令" tabindex="-1"><a class="header-anchor" href="#有关命令" aria-hidden="true">#</a> 有关命令</h3><h4 id="创建工作空间" tabindex="-1"><a class="header-anchor" href="#创建工作空间" aria-hidden="true">#</a> 创建工作空间</h4><h5 id="创建工作空间-1" tabindex="-1"><a class="header-anchor" href="#创建工作空间-1" aria-hidden="true">#</a> 创建工作空间</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> ./<span class="token punctuation">[</span>工作空间<span class="token punctuation">]</span>/src
<span class="token builtin class-name">cd</span> ./<span class="token punctuation">[</span>工作空间<span class="token punctuation">]</span>/src
// 创建工作空间
catkin_init_workspace
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="编译工作空间" tabindex="-1"><a class="header-anchor" href="#编译工作空间" aria-hidden="true">#</a> 编译工作空间</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> ./<span class="token punctuation">[</span>工作空间<span class="token punctuation">]</span>/
catkin_make
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>编译 src 中的源码, 将结果放入 devel 与 install 文件夹中 (需要 install 参数)</p><h4 id="创建功能包" tabindex="-1"><a class="header-anchor" href="#创建功能包" aria-hidden="true">#</a> 创建功能包</h4><p>于 src 中创建功能包</p><h5 id="创建功能包-1" tabindex="-1"><a class="header-anchor" href="#创建功能包-1" aria-hidden="true">#</a> 创建功能包</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> ./<span class="token punctuation">[</span>工作空间<span class="token punctuation">]</span>/src
catkin_create_pkg <span class="token operator">&lt;</span>功能包名称<span class="token operator">&gt;</span> <span class="token punctuation">[</span>功能包依赖<span class="token punctuation">]</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="编译功能包" tabindex="-1"><a class="header-anchor" href="#编译功能包" aria-hidden="true">#</a> 编译功能包</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> ./<span class="token punctuation">[</span>工作空间<span class="token punctuation">]</span>
catkin_make
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="设置环境变量" tabindex="-1"><a class="header-anchor" href="#设置环境变量" aria-hidden="true">#</a> 设置环境变量</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">source</span> ./<span class="token punctuation">[</span>工作空间<span class="token punctuation">]</span>/devel/setup.bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol><li>将工作空间的信息添加到环境变量中, 从而使 ros 能够找到当前创建的功能包</li><li>运行此命令后, 在 src 中创建的功能包均能被 ros 找到</li><li>根据采用的 shell 不同, 可能需要使用 setup.zsh (以 zsh 为 shell)</li><li>可在主目录下的 .bashrc 添加, 实现开机启动, 避免每次启动都需要设置</li></ol><h5 id="检查环境变量" tabindex="-1"><a class="header-anchor" href="#检查环境变量" aria-hidden="true">#</a> 检查环境变量</h5><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token variable">$ROS_PACKAGE_PATH</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>检查功能包的路径是否在 ros 的环境变量下</p><h1 id="ros-编程-c" tabindex="-1"><a class="header-anchor" href="#ros-编程-c" aria-hidden="true">#</a> ROS 编程 (C++)</h1><h2 id="语言结构" tabindex="-1"><a class="header-anchor" href="#语言结构" aria-hidden="true">#</a> 语言结构</h2><h3 id="头文件" tabindex="-1"><a class="header-anchor" href="#头文件" aria-hidden="true">#</a> 头文件</h3><h3 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h3><h4 id="节点初始化" tabindex="-1"><a class="header-anchor" href="#节点初始化" aria-hidden="true">#</a> 节点初始化</h4><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>ros::init(argc, argv, 节点名称) 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol><li>通常直接将 main 的 argc, argv 传入, 可以在终端中设置参数</li><li>节点名称为字符串, 不可重复</li></ol><h4 id="日志输出" tabindex="-1"><a class="header-anchor" href="#日志输出" aria-hidden="true">#</a> 日志输出</h4><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>ROS_INFO(...)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输出日志, 采用类 printf 语法</p><h3 id="基本-ros-对象" tabindex="-1"><a class="header-anchor" href="#基本-ros-对象" aria-hidden="true">#</a> 基本 ROS 对象</h3><h4 id="节点句柄" tabindex="-1"><a class="header-anchor" href="#节点句柄" aria-hidden="true">#</a> 节点句柄</h4><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>ros::NodeHandle n;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>通过节点句柄管理节点资源</li></ul><h2 id="功能实现" tabindex="-1"><a class="header-anchor" href="#功能实现" aria-hidden="true">#</a> 功能实现</h2><h3 id="publish" tabindex="-1"><a class="header-anchor" href="#publish" aria-hidden="true">#</a> Publish</h3><h4 id="实现结构" tabindex="-1"><a class="header-anchor" href="#实现结构" aria-hidden="true">#</a> 实现结构</h4><ol><li>初始化 ROS 节点</li><li>注册节点的 Publisher 信息, 包括发布话题与话题中的消息类型</li><li>创建消息</li><li>按一定频率发布消息</li></ol><h4 id="实现代码" tabindex="-1"><a class="header-anchor" href="#实现代码" aria-hidden="true">#</a> 实现代码</h4><h5 id="创建-publisher" tabindex="-1"><a class="header-anchor" href="#创建-publisher" aria-hidden="true">#</a> 创建 Publisher</h5><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>ros::Publisher pub = 
    n.advert&lt;消息结构&gt;(话题名称, 缓冲队列长度)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>话题名称要与 Subscriber 订阅的话题一致</li><li>即消息缓冲队列长度更具数据处理的速度决定</li></ul><h5 id="向-topic-发送-msg" tabindex="-1"><a class="header-anchor" href="#向-topic-发送-msg" aria-hidden="true">#</a> 向 Topic 发送 Msg</h5><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>msg = ...
pub.publish(msg);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>通过调用 ros::Publisher 的成员函数 publish 发送信息</li><li>信息 msg 需要定义并填充数据</li></ul><h5 id="发布循环" tabindex="-1"><a class="header-anchor" href="#发布循环" aria-hidden="true">#</a> 发布循环</h5><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>ros::Rate rate([循环频率 Hz]);

while(ros::ok())
{
    ...
    rate.sleep();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过延时, 使循环满足要求的频率, 实现按一定频率发布数据</p><h4 id="示例程序" tabindex="-1"><a class="header-anchor" href="#示例程序" aria-hidden="true">#</a> 示例程序</h4><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>#include &lt;ros/ros.h&gt;
#include &lt;geometry_msgs/Twist.h&gt;

int main(int argc, char ** argv)
{
    // 节点初始化
    ros::init(argc, argv, &quot;velocity_publisher&quot;);


    ros::NodeHandle n;

    ros::Publisher turtle_vel_pub = 
    n.advertise&lt;geometry_msgs::Twist&gt;(&quot;/turtle1/cmd_vel&quot;, 10);

    ros::Rate loop_rate(10);

    int count = 0;
    while(ros::ok())
    {
        geometry_msgs::Twist vel_msg;
        vel_msg.linear.x = 0.5;
        vel_msg.linear.z = 0.2;

        turtle_vel_pub.publish(vel_msg);
        ROS_INFO(
            &quot;Publish turtle command[%0.2f m/s, %0.2f rad/s]&quot;,
            vel_msg.linear.x, vel_msg.angular.z);
        
        loop_rate.sleep();
    }

    return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="subscriber" tabindex="-1"><a class="header-anchor" href="#subscriber" aria-hidden="true">#</a> Subscriber</h3><h4 id="实现结构-1" tabindex="-1"><a class="header-anchor" href="#实现结构-1" aria-hidden="true">#</a> 实现结构</h4><ol><li>初始化 ROS 节点</li><li>订阅话题</li><li>循环等待消息, 接收到消息后进入回调函数</li><li>在回调函数中处理消息</li></ol><h4 id="实现代码-1" tabindex="-1"><a class="header-anchor" href="#实现代码-1" aria-hidden="true">#</a> 实现代码</h4><h5 id="创建-subscriber" tabindex="-1"><a class="header-anchor" href="#创建-subscriber" aria-hidden="true">#</a> 创建 Subscriber</h5><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>ros::Subscriber pub = 
    n.subscribe&lt;消息结构&gt;(话题名称, 缓冲队列长度, 回调函数)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>当提供了服务回调函数后, 模板可省略 (C++ 语法)</li></ul><h5 id="回调函数" tabindex="-1"><a class="header-anchor" href="#回调函数" aria-hidden="true">#</a> 回调函数</h5><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>void Callback(const [功能包]::[消息结构]::ConstPtr&amp;)
{
    ...
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>Subscriber 在回调函数中处理消息</li><li>回调函数不能嵌套, 因此在回调函数返回后, 才会调用下一个回调函数</li><li>回调函数通过消息的 ConstPtr 子对象作为指针接收消息 (本质为 share_ptr)</li></ul><h5 id="进入死循环-等待数据" tabindex="-1"><a class="header-anchor" href="#进入死循环-等待数据" aria-hidden="true">#</a> 进入死循环, 等待数据</h5><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>ros::spin();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>程序进入死循环, 仅在每次循环中读取消息队列, 判断是否需要进入回调函数</p><h4 id="示例程序-1" tabindex="-1"><a class="header-anchor" href="#示例程序-1" aria-hidden="true">#</a> 示例程序</h4><div class="language-C++ line-numbers-mode" data-ext="C++"><pre class="language-C++"><code>#include &lt;ros/ros.h&gt;
#include &quot;turtlesim/Pose.h&quot;

void poseCallback(const turtlesim::Pose::ConstPtr&amp; msg)
{
    ROS_INFO(
        &quot;Publish turtle command[%0.2f m/s, %0.2f rad/s]&quot;
        , msg-&gt;x, msg-&gt;y);
}

int main(int argc, char ** argv)
{
    ros::init(argc, argv, &quot;pose_subscriber&quot;);

    ros::NodeHandle n;
    ros::Subscriber pose_sub = 
        n.subscribe(&quot;/turtle1/pose&quot;, 10, poseCallback);

    ros::spin();

    return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="client" tabindex="-1"><a class="header-anchor" href="#client" aria-hidden="true">#</a> Client</h3><h4 id="实现结构-2" tabindex="-1"><a class="header-anchor" href="#实现结构-2" aria-hidden="true">#</a> 实现结构</h4><ol><li>初始化 ROS 节点</li><li>等待服务连接</li><li>创建 Client 实例</li><li>发送服务请求数据</li><li>等待 Service 应答结果</li></ol><h4 id="实现代码-2" tabindex="-1"><a class="header-anchor" href="#实现代码-2" aria-hidden="true">#</a> 实现代码</h4><h5 id="阻塞等待服务" tabindex="-1"><a class="header-anchor" href="#阻塞等待服务" aria-hidden="true">#</a> 阻塞等待服务</h5><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>ros::service::waitForService(&quot;[服务名]&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>waitForService 将阻塞程序, 直到服务出现</li></ul><h5 id="创建客户端" tabindex="-1"><a class="header-anchor" href="#创建客户端" aria-hidden="true">#</a> 创建客户端</h5><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>ros::Client clt = n.ServiceClient&lt;服务消息结构&gt;(&quot;[服务名]&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="发送服务请求数据" tabindex="-1"><a class="header-anchor" href="#发送服务请求数据" aria-hidden="true">#</a> 发送服务请求数据</h5><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>clt.call([服务消息]);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>将请求放入服务消息结构的 request 部分</li><li>call 将阻塞程序直到服务器应答</li><li>应答结果将放入服务消息结构的 response 部分</li></ul><h4 id="示例程序-2" tabindex="-1"><a class="header-anchor" href="#示例程序-2" aria-hidden="true">#</a> 示例程序</h4><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>#include &lt;ros/ros.h&gt;
#include &lt;turtlesim/Spawn.h&gt;

int main(int argc, char** argv)
{
    ros::init(argc, argv, &quot;turtle_spawn&quot;);
    
    ros::NodeHandle n;

    ros::service::waitForService(&quot;/spawn&quot;);
    ros::ServiceClient add_turtle = 
        n.serviceClient&lt;turtlesim::Spawn&gt;(&quot;/spawn&quot;);

    turtlesim::Spawn srv;
    srv.request.x = 4.0;
    srv.request.y = 2.0;
    srv.request.name = &quot;turtle2&quot;;

    ROS_INFO(
        &quot;Call service to spawn turtle [x: %0.2f, y: %0.2f, name: %s]&quot;,
        srv.request.x, srv.request.y, srv.request.name.c_str()
        );

    add_turtle.call(srv);

    ROS_INFO(
        &quot;spawn turtle sucCessfully [name: %s]&quot;,
        srv.response.name.c_str()
        );

    return 0;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="server" tabindex="-1"><a class="header-anchor" href="#server" aria-hidden="true">#</a> Server</h3><h4 id="实现结构-3" tabindex="-1"><a class="header-anchor" href="#实现结构-3" aria-hidden="true">#</a> 实现结构</h4><ol><li>初始化 ROS 节点</li><li>创建 Server 实例</li><li>循环等待服务请求, 进入回调函数</li><li>回调函数中完成功能, 后返回应答数据</li></ol><h4 id="实现代码-3" tabindex="-1"><a class="header-anchor" href="#实现代码-3" aria-hidden="true">#</a> 实现代码</h4><h5 id="创建-service" tabindex="-1"><a class="header-anchor" href="#创建-service" aria-hidden="true">#</a> 创建 Service</h5><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>ros::ServiceServer service = 
    node.advertiseService&lt;
        功能包::服务信息数据结构::Request, 
        功能包::服务信息数据结构::Response&gt;
        (&quot;[服务名]&quot;, [服务回调函数]);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>当提供了服务回调函数后, 模板可省略 (C++ 语法)</li></ul><h5 id="服务回调函数" tabindex="-1"><a class="header-anchor" href="#服务回调函数" aria-hidden="true">#</a> 服务回调函数</h5><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>bool Callback(
    [功能包]::[服务信息数据结构]::Request &amp;req,
    [功能包]::[服务信息数据结构]::Response &amp;res)
{
    ...

    // 填写 res 内容
    res = ...

    return true;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>服务回调函数不直接操控服务信息, 而是分开处理 Request 与 Response</li><li>回调函数操作引用, 注意与 Subscribe 不同</li><li>通过向参数 res 填写数据, 确定返回的 Response</li></ul><h5 id="查询请求-执行其他操作" tabindex="-1"><a class="header-anchor" href="#查询请求-执行其他操作" aria-hidden="true">#</a> 查询请求, 执行其他操作</h5><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>while(ros::ok())
{
    ros::spinOnce();

    ...

    rate.sleep()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>由于 Server 通常还会完成其他操作, 因此不能仅进入死循环</li><li>使用函数 ros::spinOnce() 仅查询队列是否有消息需要进行处理, 不阻塞程序</li></ul><h4 id="示例程序-3" tabindex="-1"><a class="header-anchor" href="#示例程序-3" aria-hidden="true">#</a> 示例程序</h4><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>#include &lt;ros/ros.h&gt;
#include &lt;geometry_msgs/Twist.h&gt;
#include &lt;std_srvs/Trigger.h&gt;

bool pubCommand = false;

bool commandCallback(std_srvs::Trigger::Request &amp;req, std_srvs::Trigger::Response &amp;res)
{
    pubCommand = !pubCommand;

    ROS_INFO(&quot;Publish turtle command [%s]&quot;, pubCommand?&quot;Yes&quot;:&quot;No&quot;);

    res.success = true;
    res.message = &quot;Change State&quot;;

    return true;
}

int main(int argc, char** argv)
{
    ros::init(argc, argv, &quot;turtle_command_service&quot;);
    ros::NodeHandle node;

    ros::ServiceServer command_service = 
        node.advertiseService(&quot;/turtle_command&quot;, commandCallback);
    ros::Publisher turtle_vel_pub = 
        node.advertise&lt;geometry_msgs::Twist&gt;(&quot;turtle1/cmd_vel&quot;, 10);

    ROS_INFO(&quot;Ready to receive command&quot;);

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
                &quot;Publish turtle command[%0.2f m/s, %0.2f rad/s]&quot;,
                vel_msg.linear.x, vel_msg.angular.z);
        }
        rate.sleep();
    }

    return 0;
}
    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="parameter-server" tabindex="-1"><a class="header-anchor" href="#parameter-server" aria-hidden="true">#</a> Parameter Server</h3><p>一个可被全局访问的字典</p><h4 id="实现结构-4" tabindex="-1"><a class="header-anchor" href="#实现结构-4" aria-hidden="true">#</a> 实现结构</h4><h4 id="实现代码-4" tabindex="-1"><a class="header-anchor" href="#实现代码-4" aria-hidden="true">#</a> 实现代码</h4><h5 id="读取参数" tabindex="-1"><a class="header-anchor" href="#读取参数" aria-hidden="true">#</a> 读取参数</h5><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>int red = 0;
ros::param::get(&quot;/background_r&quot;, red);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>通过 ros::param::get 读取参数, 其中参数的值通过引用的方式传递</li><li>函数返回 bool 值, 表示读取是否成功</li></ul><h5 id="设置参数" tabindex="-1"><a class="header-anchor" href="#设置参数" aria-hidden="true">#</a> 设置参数</h5><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>ros::param::set(&quot;/background_r&quot;, 255);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>设置参数值, 函数返回表示读取是否成功</li></ul><h5 id="使参数修改生效" tabindex="-1"><a class="header-anchor" href="#使参数修改生效" aria-hidden="true">#</a> 使参数修改生效</h5><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>ros::service::waitForService(&quot;/clear&quot;);
ros::ServiceClient clear_background = node.serviceClient&lt;std_srvs::Empty&gt;(&quot;/clear&quot;);
std_srvs::Empty srv;
clear_background.call(srv);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>通常修改参数后, 不会产生效果, 还需要通知有关的节点重新读取参数</li></ul><h2 id="消息定义" tabindex="-1"><a class="header-anchor" href="#消息定义" aria-hidden="true">#</a> 消息定义</h2><h3 id="publish-subscribe" tabindex="-1"><a class="header-anchor" href="#publish-subscribe" aria-hidden="true">#</a> Publish/Subscribe</h3><h4 id="结构定义" tabindex="-1"><a class="header-anchor" href="#结构定义" aria-hidden="true">#</a> 结构定义</h4><p>todo</p><h4 id="依赖设置" tabindex="-1"><a class="header-anchor" href="#依赖设置" aria-hidden="true">#</a> 依赖设置</h4><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token comment">&lt;!-- 在 package.xml 中设置 --&gt;</span>

<span class="token comment">&lt;!-- 添加编译依赖 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>build_depend</span><span class="token punctuation">&gt;</span></span>
message_generation
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>build_depend</span><span class="token punctuation">&gt;</span></span>

<span class="token comment">&lt;!-- 添加功能包依赖 --&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exec_depend</span><span class="token punctuation">&gt;</span></span>
message_runtime
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exec_depend</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>定义语言无关的 .msg 文件</li><li>在 Package.xml 中添加依赖 (如上)</li><li>在 CMakeLists.txt 中修改编译设置 (使用 <kbd>ctr</kbd>+<kbd>f</kbd> 寻找有关位置) <ol><li>添加功能包依赖 find_package(... message_generation)</li><li>添加 .msg 文件 add_message_files(FILES [.msg文件])</li><li>生成 .msg, 使用 std_msg (标准信息类型) generate_messages(DEPENDENCIES std_msgs)</li><li>添加运行依赖 catkin_package(CATKIN_DEPENDS ... message_runtime)</li></ol></li><li>工作空间下运行 catkin_make, 编译消息文件</li></ol><h4 id="程序调用" tabindex="-1"><a class="header-anchor" href="#程序调用" aria-hidden="true">#</a> 程序调用</h4><ol><li>消息定义的 C++ 头文件位于 ./[工作空间]/devel/include/[包名称]</li><li>于 .vscode/c_cpp_properties.json 中添加 &quot;\${workspaceFolder}/devel/include&quot;, 用于编辑器识别</li><li>在 cpp 中, 可直接使用 include &quot;[功能包名]/[消息名].h&quot; 调用消息类型</li><li>生成代码时, 还需要在 CMakeLists 中添加代码依赖 (在编译功能包下添加) add_dependencies([编译目标] \${PROJECT_NAME}_generate_messages_cpp)</li><li>C++ 中, ROS 将功能包视为一个命名空间</li><li>通过 [功能包名]::[信息数据结构名] 访问信息数据结构</li><li>通过 [功能包名]::[信息数据结构名]::ConstPtr 访问信息数据结构指针 (本质为 share_ptr, 一般用于回调函数)</li></ol><h3 id="service-1" tabindex="-1"><a class="header-anchor" href="#service-1" aria-hidden="true">#</a> Service</h3><h4 id="结构定义-1" tabindex="-1"><a class="header-anchor" href="#结构定义-1" aria-hidden="true">#</a> 结构定义</h4><p>todo</p><h4 id="依赖设置-1" tabindex="-1"><a class="header-anchor" href="#依赖设置-1" aria-hidden="true">#</a> 依赖设置</h4><ol><li>与消息结构基本一致</li><li>将其中 add_message_files 改为 add_service_files</li><li>同样使用 std_msg, 但定义文件以 .srv 为后缀</li></ol><h4 id="程序调用-1" tabindex="-1"><a class="header-anchor" href="#程序调用-1" aria-hidden="true">#</a> 程序调用</h4><ol><li>在 cpp 中, 可直接使用 include &quot;[功能包名]/[消息名].h&quot; 调用消息类型</li><li>通过 [功能包名]::[信息数据结构名] 访问服务信息数据结构, 用于 Client, 以成员方式同时包含 request 与 response</li><li>通过 [功能包名]::[信息数据结构名]::Request 访问请求信息数据结构</li><li>通过 [功能包名]::[信息数据结构名]::Response 访问回应信息数据结构</li></ol><h2 id="编译设置" tabindex="-1"><a class="header-anchor" href="#编译设置" aria-hidden="true">#</a> 编译设置</h2><h3 id="编译过程" tabindex="-1"><a class="header-anchor" href="#编译过程" aria-hidden="true">#</a> 编译过程</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 打开工作空间</span>
<span class="token builtin class-name">cd</span> ./<span class="token punctuation">[</span>工作空间<span class="token punctuation">]</span>
<span class="token comment"># 开始编译</span>
catkin_make

<span class="token comment"># 每次设用需要设置环境变量</span>
<span class="token builtin class-name">source</span> ./devel/setup.bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>编译过程需要在功能包根目录下进行</li></ol><h3 id="cmakelists" tabindex="-1"><a class="header-anchor" href="#cmakelists" aria-hidden="true">#</a> CMakeLists</h3><h4 id="编译简单功能包" tabindex="-1"><a class="header-anchor" href="#编译简单功能包" aria-hidden="true">#</a> 编译简单功能包</h4><div class="language-CMakeLists line-numbers-mode" data-ext="CMakeLists"><pre class="language-CMakeLists"><code>add_executable([编译目标] [源文件地址])

# 需要添加此句连接有关库
target_link_libraries([编译目标] \${catkin_LIBRARIES})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>在功能包文件夹下的 CMakeLists.txt 的 build 区添加以下编译设置</li><li>以功能包文件加为基地址 (访问源文件需要 ./src/...)</li></ol><h4 id="多文件编译" tabindex="-1"><a class="header-anchor" href="#多文件编译" aria-hidden="true">#</a> 多文件编译</h4><p>todo</p><h1 id="launch-文件" tabindex="-1"><a class="header-anchor" href="#launch-文件" aria-hidden="true">#</a> Launch 文件</h1><p>通过 XML 文件实现多节点配置与启动并自动启动 ROS Master</p><h2 id="常用标签" tabindex="-1"><a class="header-anchor" href="#常用标签" aria-hidden="true">#</a> 常用标签</h2><h3 id="launch" tabindex="-1"><a class="header-anchor" href="#launch" aria-hidden="true">#</a> launch</h3><p>launch 文件根标签</p><h3 id="node-1" tabindex="-1"><a class="header-anchor" href="#node-1" aria-hidden="true">#</a> node</h3><p>启动 ros 节点, 为自封闭标签</p><h4 id="必须属性" tabindex="-1"><a class="header-anchor" href="#必须属性" aria-hidden="true">#</a> 必须属性</h4><ol><li>pkg 节点功能包名</li><li>type 节点可执行文件名</li><li>name 节点运行时的名称 (将取代节点的默认名称)</li></ol><h4 id="可选属性" tabindex="-1"><a class="header-anchor" href="#可选属性" aria-hidden="true">#</a> 可选属性</h4><ol><li>output 节点信息是否打印到终端</li><li>respawn 节点关闭后是否重启</li><li>require 节点是否必须启动</li><li>args 节点参数</li></ol><h3 id="param" tabindex="-1"><a class="header-anchor" href="#param" aria-hidden="true">#</a> param</h3><p>加载单个参数到参数服务器</p><ol><li>name 参数名</li><li>value 参数值</li></ol><h3 id="rosparam-1" tabindex="-1"><a class="header-anchor" href="#rosparam-1" aria-hidden="true">#</a> rosparam</h3><p>加载文件中所有的参数到参数服务器中</p><h3 id="arg" tabindex="-1"><a class="header-anchor" href="#arg" aria-hidden="true">#</a> arg</h3><p>保存在 launch 文件中的参数 通过 $(arg [参数名称]) 调用值</p><ol><li>name 参数名</li><li>value 参数值</li></ol><h3 id="remap" tabindex="-1"><a class="header-anchor" href="#remap" aria-hidden="true">#</a> remap</h3><p>重映射资源, 如话题等, 改名后旧的名称将不存在</p><ol><li>from 原始名称</li><li>to 新名称</li></ol><h3 id="include" tabindex="-1"><a class="header-anchor" href="#include" aria-hidden="true">#</a> include</h3><p>调用其他的 launch 问价</p><ol><li>file 调用其他 launch 文件的路径, 可通过 $(dirname) 获取根目录</li></ol><h2 id="launch-文件的使用" tabindex="-1"><a class="header-anchor" href="#launch-文件的使用" aria-hidden="true">#</a> launch 文件的使用</h2><ol><li>launch 文件也在功能包中保存, 放置于 ./src/launch 文件夹中</li><li>编辑 launch 文件后, 需要使用 catkin_make 编译, 使 launch 文件在工作空间中注册</li><li>使用 roslaunch [功能包] [launch 文件名] 启动 launch 文件</li></ol><h1 id="ros-编程-python" tabindex="-1"><a class="header-anchor" href="#ros-编程-python" aria-hidden="true">#</a> ROS 编程 (Python)</h1><ol><li>通常将 python 放置于功能包下的 script 文件夹中</li><li>python 脚本需要有可执行文件权限</li><li>通过引用库 rospy 实现功能, 不需要 catkin_make 编译</li></ol><h2 id="基本结构" tabindex="-1"><a class="header-anchor" href="#基本结构" aria-hidden="true">#</a> 基本结构</h2><ol><li>定义一个主函数, 包含了创建节点与节点主要功能</li><li>运行主函数, 实现节点功能</li></ol><h2 id="消息处理" tabindex="-1"><a class="header-anchor" href="#消息处理" aria-hidden="true">#</a> 消息处理</h2><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> <span class="token punctuation">[</span>功能包名<span class="token punctuation">]</span><span class="token punctuation">.</span>msg <span class="token keyword">import</span> <span class="token punctuation">[</span>消息结构<span class="token punctuation">]</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过 import 语法引用消息结构</p><h2 id="功能实现-1" tabindex="-1"><a class="header-anchor" href="#功能实现-1" aria-hidden="true">#</a> 功能实现</h2><h3 id="publisher" tabindex="-1"><a class="header-anchor" href="#publisher" aria-hidden="true">#</a> Publisher</h3><h4 id="示例程序-4" tabindex="-1"><a class="header-anchor" href="#示例程序-4" aria-hidden="true">#</a> 示例程序</h4><div class="language-Python line-numbers-mode" data-ext="Python"><pre class="language-Python"><code>#!/usr/bin/python3

import rospy
from geometry_msgs.msg import Twist

def velocity_publisher():
    rospy.init_node(&quot;velocity_publisher&quot;, anonymous=True)
    
    turtle_vel_pub = rospy.Publisher(&quot;/turtle1/cmd_vel&quot;, Twist, queue_size=10)
    rate = rospy.Rate(10)

    while not rospy.is_shutdown():
        vel_msg = Twist()
        vel_msg.linear.x = 0.5
        vel_msg.angular.z = 0.2

        turtle_vel_pub.publish(vel_msg)
        rospy.loginfo(&quot;Publish turtle command[%0.2f m/s, %0.2f rad/s]&quot;, vel_msg.linear.x, vel_msg.angular.z)

        rate.sleep()

if __name__ == &#39;__main__&#39;:
    try:
        velocity_publisher()
    except: 
        rospy.ROSInitException()
        pass

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="subscriber-1" tabindex="-1"><a class="header-anchor" href="#subscriber-1" aria-hidden="true">#</a> Subscriber</h3><h4 id="示例程序-5" tabindex="-1"><a class="header-anchor" href="#示例程序-5" aria-hidden="true">#</a> 示例程序</h4><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment">#!/usr/bin/python3</span>

<span class="token keyword">import</span> rospy
<span class="token keyword">from</span> turtlesim<span class="token punctuation">.</span>msg <span class="token keyword">import</span> Pose

<span class="token keyword">def</span> <span class="token function">poseCallback</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">:</span>
    rospy<span class="token punctuation">.</span>loginfo<span class="token punctuation">(</span><span class="token string">&quot;Publish turtle command[%0.2f m/s, %0.2f rad/s]&quot;</span><span class="token punctuation">,</span> msg<span class="token punctuation">.</span>x<span class="token punctuation">,</span> msg<span class="token punctuation">.</span>y<span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">pose_subscribe</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    rospy<span class="token punctuation">.</span>init_node<span class="token punctuation">(</span><span class="token string">&quot;pose_subscribe&quot;</span><span class="token punctuation">,</span> anonymous<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
    
    rospy<span class="token punctuation">.</span>Subscriber<span class="token punctuation">(</span><span class="token string">&quot;/turtle1/pose&quot;</span><span class="token punctuation">,</span> Pose<span class="token punctuation">,</span> poseCallback<span class="token punctuation">,</span> queue_size<span class="token operator">=</span><span class="token number">10</span><span class="token punctuation">)</span>

    rospy<span class="token punctuation">.</span>spin<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&#39;__main__&#39;</span><span class="token punctuation">:</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        pose_subscribe<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">except</span><span class="token punctuation">:</span> 
        rospy<span class="token punctuation">.</span>ROSInitException<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">pass</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="service-2" tabindex="-1"><a class="header-anchor" href="#service-2" aria-hidden="true">#</a> Service</h3><h4 id="区别注意" tabindex="-1"><a class="header-anchor" href="#区别注意" aria-hidden="true">#</a> 区别注意</h4><ol><li>rospy 不提供 spinOnce 函数, 需要通过多线程实现</li></ol><h4 id="示例程序-6" tabindex="-1"><a class="header-anchor" href="#示例程序-6" aria-hidden="true">#</a> 示例程序</h4>`,246),r=[l];function d(c,t){return a(),i("div",null,r)}const h=e(s,[["render",d],["__file","base.html.vue"]]);export{h as default};
