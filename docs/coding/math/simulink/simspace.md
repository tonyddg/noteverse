# simspace
## 基础使用
参考教程 <https://ww2.mathworks.cn/help/simscape/gs/essential-steps-for-constructing-a-physical-model.html>

以运动模型的建模为例

### 创建模型
在 Matlab 中使用命令 `ssc_new` 创建新的 Simspace 模型，使用该方法创建的模型求解器更适合 Simsapce 的求解要求

该命令还可接收参数 `ssc_new(modelname, domain)`
- `modelname` 字符串，模型名称
- `domain` 字符串，明确模型具体类型，常用的有
    - `translational` 直线运动模型
    - `rotational` 转动运动模型
    - `electrical` 电路系统模型
    - `isothermal_liquid` 等温液压模型
    - `gas` 气动模型

任何 Simsapce 模型中必须包含模块 Solver Configuration 配置求解器
 - 该模块位于 Simspace/Utility 中
 - 通过配置改模块的属性，可修改 Simspace 的求解设置
 - 该模块一般与模型中的参考点连接

### 物理网络
通过 Simscape/Foundation Library/<模型类别>/XXX Elements 中的模块对应的模型中的部件

通过部件模块的属性，可设置部件的物理参数与初始条件，根据初始条件的优先级，求解器将尽量使初值满足初始条件

物理网络中允许串联与并联，并联相当于将多个部件连接与部件的同一侧

构建物理网络时，必须注意模型的参考点  
- 参考点一般为部件，不同的类型的模型参考点不同，有模块名 XXX Referen
- 参考点相当于一个状态量及其导数均为 0 的点
- 多个网络交互时，每个独立的网络至少要有一个参考点
- 允许一个网络中有多个参考点模块

### 添加信号源
通过 Simscape/Foundation Library/<模型类别>/XXX Sources 中的模块对应的模型中的部件

信号源具有方向性，信号源的 R 端为输入，C 端为输出，当 C 端与两个部件连接时，表明为两个部件间的相对状态参数以指定的规律运动  
如果希望表示外加的力，电压等，应当将 C 端与参考点相连

信号源通过 S 端接收 PS 信号确定的大小，一般

### 添加传感器

### Simulink 交互

### 仿真执行与结果

## 运动模型

## 机械系统模型
需要额外安装模块 Simscape Multibody

<https://blog.csdn.net/weixin_45717224/article/details/136260638>



