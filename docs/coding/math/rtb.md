# 机器人工具箱 Robotics Toolbox
非 MathWork 的官方机器人工具箱  
[安装与参考文档](https://petercorke.com/toolboxes/robotics-toolbox/)

## 机械臂建模
### 建模
标准型中, 连杆的坐标系位于连杆的后端关节  
即连杆 $i$ 的坐标系位于关节 $i+1$ (编号由 $0$ 开始计)  
关节 $0$ 为机器人的基座

### 改进型建模

### 相对位置描述
#### 标准型
基座 (关节 $0$) 处以水平向右为 $x$ 轴正方向, 以竖直向上为 $z$ 轴正方向  
之后的关节均以上一个关节作为起点进行变换  
==关节的 $z$ 轴为关节的旋转方向==

使用参数 $\theta,d,a,\alpha$ 描述两个关节之间的相对位置  
* $\theta$ 表示将基准坐标系的 $z$ 轴旋转弧度
* $d$ 表示沿旋转后的坐标系的 $z$ 轴正方向移动距离
* $a$ 表示沿移动后的坐标系的 $x$ 轴正方向移动距离
* $\alpha$ 表示将移动后坐标系的 $x$ 轴旋转弧度

注意
* 当关节的旋转方向与连杆方向平行时, 关节可以在连杆上任意位置

#### 改进型
与标准型相同, 但是转换顺序改变, 对于改进型描述使用 $\alpha,a,\theta,d$ 的顺序即
* 首先沿 $x$ 轴旋转 $\alpha$
* 再沿 $x$ 轴正方向移动 $a$
* 然后沿 $z$ 轴旋转 $\theta$
* 最后沿 $z$ 轴正方向移动 $d$

### 建模编程
#### 确定位置 (定义连杆)
使用函数 `Link` 确定关节位置 (即定义连杆)

* 函数原型 `L = Link([theta, d, a, alpha, sigma, offset], option)`
* 参数
    * `theta, d, a, alpha` 实数  
    即关节相对位置的[描述参数](#关节相对位置描述)
    * `sigma` 实数 `0, 1`  
    关节类型
        * `0` 表明旋转关节
        * `1` 表明移动关节
    * `offset` 关节偏置  
        * 对于旋转关节, `theta` 应取 0, 并将其作为偏置 `offset = theta`
        * 对于移动关节, `d` 应取 0, 并将其作为偏置 `offset = d`
    * `option` 字符串  
    建模方式
        * `standard` [标准型建模](#标准型建模), 默认值
        * `modified` [改进型建模](#改进型建模)

* 返回值  
返回创建的连杆对象
#### 创建机械壁 (串联连杆)
使用函数 `SerialLink` 创建机械臂 (即串联连杆)

* 函数原型 `R = SerialLink(LINKS, name =)`
* 参数
    * `LINKS` 连杆对象数组  
    按机器人连杆顺序组成的数组
    * `name` 字符串  
    机械臂名称
* 返回值
返回创建的机械臂对象
#### 设置基座
默认情况下, 第 $0$ 个关节即基座, 不通过 `Link` 定义  
而是设置第 $1$ 个关节相对基座的位置  
设置位置使用如下代码

`R.base = transl(x, y, z)`

* `R.base` 为机械臂对象的 `base` 成员
* `transl` 为创建一个平移变换矩阵

#### 显示模型
通过调用机械臂对象的 `teach` 成员, 绘制创建好的机械臂模型