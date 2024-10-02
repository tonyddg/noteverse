---
order: 3
---

# Scipy 笔记
## 姿态表示与插值
scipy 的姿态表示与插值模块为 `scipy.spatial.transform`  

### 姿态表示
<https://docs.scipy.org/doc/scipy/reference/generated/scipy.spatial.transform.Rotation.html>

姿态表示模块 `Rotation` 常用的导入方式为 `from scipy.spatial.transform import Rotation as R`  
该模块可接收多主流的姿态表示方法, 并在各种表示方法之间相互转换

在 `Rotation` 模块中的常用姿态表示方法如下
* 解析欧拉角姿态 `R.from_euler(seq, angle, degrees)`
    * `seq` 欧拉角规则字符串  
    可传入 `x,y,z` 三个字母组成的十二种合法欧拉角, 也可仅传入一个字母, 表示绕单轴旋转  
    字母所表示的规范为从左到右, 按固定坐标轴旋转 (与机器人学中的欧拉角规范相反) 
    * `angle` 欧拉角的角度参数, 完整欧拉角传入三元素数组, 绕单轴旋转传入一个角度
    * `degree` 使用角度制时传入 `True`, 使用弧度制时传入 `False` 
    * 例如 RPY 角规范则使用字符串 `xyz`, 传入角度 `[a,b,c]` 表示为姿态矩阵时有 $\bm{R}=\bm{R_z}(c)\bm{R_y}(b)\bm{R_x}(a)$

## 常微分方程与积分
<https://docs.scipy.org/doc/scipy/reference/integrate.html>

scipy 的数值积分模块为 `scipy.integrate`  

### 常微分方程的数值求解
使用函数 `scipy.integrate.solve_ivp` 可用于求解具有以下形式的常微分方程或方程组的数值解
$$\frac{\mathrm{d}\vec{y}}{\mathrm{d}t}=\vec{F}(\vec{y},t)$$

该函数的常用形式为  
`scipy.integrate.solve_ivp(fun, t_span, y0, *, t_eval = None, event = None, terminal = False)`
* `fun` 可调用对象, 具有原型 `fun(t, y) -> dy` 即常微分方程组中的函数 $\vec{F}(\vec{y},t)$, 要求
    * 函数参数 `y` 与函数返回值 `dy` 为两个一维的且具有相同形状的 Numpy 数组
    * `t` 为一个浮点数
* `t_span` 二元素元组, 即时间参数 $t$ 的开始与截止时间
* `y0` 方程在初始时刻的状态变量值, 为一个与 `y` 形状相同的 Numpy 数组, 如果传入复数表明在复数域上求解方程
* `t_eval` 采样时刻, 一个一维数组表明计算解 $\vec{y}(t)$ 的采样时刻, 默认将由求解器决定
* `event` 可调用对象, 具有原型 `event(t, y) -> a`, 在求解过程中将寻找是否有满足 `event(t, y) == 0` 的特殊事件点, 如碰撞到墙壁
* `terminal` 布尔值, 是否在特殊事件发生时终止求解
    * 函数参数 `t, y` 与参数 `fun` 要求相同
    * 范数返回值为一个浮点数
* 返回值为一个求解结果对象, 主要包含以下成员
    * `t` 一维数组, 计算解的采样间隔
    * `y` 二维数组, 在各个采样间隔下对应的数值解
    * `success` 布尔值, 求解是否成功
    * `event_t, event_y` 一维与二维数组或 `None`, 求解过程中找到的特殊点
