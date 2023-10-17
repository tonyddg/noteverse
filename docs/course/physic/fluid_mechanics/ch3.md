---
order: 3
---

# 理想流体流体动力学
## 欧拉法描述流体运动
使用欧拉法描述流体的运动, 此时不关注流场中质点的运动  
而是观测流场中的特定空间点, 观察经过这一点的流体的运动, 相当于站在桥上观察河流的运动

因此对于流场中位置为 $(x,y,z)$ 的空间点, 在 $t$ 时刻的参数可以表示为一个关于 $x,y,z,t$ 的函数   
例如速度, 压强, 密度参数表示为
$$\vec{v}(x,y,z,t)\quad p(x,y,z,t)\quad \rho(x,y,z,t)$$

### 流场空间点中质点的加速度
对于位于流场中 $M_0(x,y,z)$ 处的质点在 $\Delta t$ 之后移动到了点 $M_1(x+\Delta x,y+\Delta y,z+\Delta z)$ 其速度即流场中点 $M_1$ 的速度, 因此 $t$ 时刻经过==流场空间点 $M_0(x,y,z)$ 的**质点**加速度==的定义为
$$\vec{a}=\lim_{\Delta t\to 0}\frac{\vec{v}(M_1,t+\Delta t)-\vec{v}(M_0,t)}{\Delta t}$$

极限的上半部分即关于 $\vec{v}$ 的全微分, 因此有
$$\begin{split}\vec{a}&=\frac{\frac{\partial\vec{v}}{\partial x}\mathrm{d}x+\frac{\partial\vec{v}}{\partial y}\mathrm{d}y+\frac{\partial\vec{v}}{\partial z}\mathrm{d}z+\frac{\partial\vec{v}}{\partial t}\mathrm{d}t}{\mathrm{d}t}\\
&=\frac{\partial\vec{v}}{\partial x}v_x+\frac{\partial\vec{v}}{\partial y}v_y+\frac{\partial\vec{v}}{\partial z}v_z+\frac{\partial\vec{v}}{\partial t}\\
&=(\vec{v}\cdot\vec{\nabla})\vec{v}+\frac{\partial\vec{v}}{\partial t}
\end{split}$$

将其中 $(\vec{v}\cdot\vec{\nabla})\cdot\vec{v}$ 部分称为对流导数, 体现了位于空间点 $M_0$ 在的质点在 $\mathrm{d}t$ 后的速度  
$\frac{\partial\vec{v}}{\partial t}$ 部分称为当地导数, 即固定观察空间点 $M_0$ 的速度得到的关于时间的变化

对于非时变的稳定流体 (定常流动), 各个空间点的速度恒定不变, 因此有
$$\frac{\partial\vec{v}}{\partial t}=0$$

### 物质导数
将类似上述 $\vec{v}$ 的导数定义为物质导数, 关于流场中参数的导数都要遵循这一原则  
$$\frac{\mathrm{D}}{\mathrm{D}t}=v_x\frac{\partial}{\partial x}+v_y\frac{\partial}{\partial y}+v_z\frac{\partial}{\partial z}+\frac{\partial}{\partial t}=[(\vec{v}\cdot\vec{\nabla})+\frac{\partial}{\partial t}]$$

参考文献  
<https://zhuanlan.zhihu.com/p/146396629>

### 流场中的流线
将流场中于速度矢量处处相切的曲线称为流线, 满足

{#tag3-1 .block_anchor}
$$\begin{split}&\vec{v}\times \mathrm{d}\vec{s}=\vec{0}\\
\to&\frac{\mathrm{d}x}{v_x}=\frac{\mathrm{d}y}{v_y}=\frac{\mathrm{d}z}{v_z}\end{split}\tag{3.1}$$

在已知 $\vec{v}$ 后, 将式 $(3.1)$ 拆分为两个等式分别积分 (积分常数暂未解出), 得到的两个曲面, 曲面的交线即流线  
注意流体中有无数条流线, 因此还要带入流线上的一点才能解出流线的积分常数 

流线之间不能相交, 因此一系列流线围成的圆管就和现实的水管一样, 外围的物质无法进入, 也成为**流管**

### 连续性方程
由于物质不能创造与消失, 因此对于流场中的任意一点处的微体 $\mathrm{d}V$, 流出的质量 $\operatorname{div}(\rho\vec{v})\mathrm{d}V$ 等于这一微体损失的质量 $-\frac{\partial\rho}{\partial t}\mathrm{d}V$, 有
$$\begin{split}\frac{\partial\rho}{\partial t}\mathrm{d}V+\operatorname{div}(\rho\vec{v})\mathrm{d}V&=0\\
\frac{\partial\rho}{\partial t}+\vec{\nabla}\cdot(\rho\vec{v})&=0
\end{split}$$

对于不可压缩流体, 流场中的密度为常数, 因此 $\frac{\partial\rho}{\partial t}=0,\rho=C$, 有

{#tag3-2 .block_anchor}
$$\frac{\partial v_x}{\partial x}+\frac{\partial v_y}{\partial y}+\frac{\partial v_z}{\partial z}=\operatorname{div}(\vec{v})=0\tag{3.2}$$

### 理想流体的运动微分方程
在[流体平衡微分方程](ch2.md#流体平衡微分方程)中, 认为流体加速度 $\vec{a}=0$, 在运动微分方程中则不等于零, 因此在 $x$ 方向使用牛顿第二定律有

$$\begin{split}F_{mx}+F_{px1}-F_{px2}&=ma_x\\\
f_x\rho\mathrm{d}V-\frac{\partial p}{\partial x}\mathrm{d}V&=\rho\mathrm{d}V\frac{\mathrm{D}v_x}{\mathrm{D}t}\\
f_x-\frac{1}{\rho}\frac{\partial p}{\partial x}&=[(\vec{v}\cdot\vec{\nabla})+\frac{\partial}{\partial t}]v_x
\end{split}$$

对 $y,z$ 轴同理, 因此推广到三维有

{#tag3-3 .block_anchor}
$$\vec{f}-\frac{1}{\rho}\vec{\nabla}\vec{p}=(\vec{v}\cdot\vec{\nabla})\vec{v}+\frac{\partial\vec{v}}{\partial t}\tag{3.3}$$

## 运动方程的应用
### 定常流动的连续性方程
定义单位时间内通过流场特定面积 $A$ 的流体体积为**流量** $Q$, 满足
$$Q=\int\limits_A \vec{v}\mathrm{d}\vec{A}$$

定义**平均流速** $\bar{v}$ 即 $Q,A$ 之比
$$\bar{v}=\frac{Q}{A}$$

根据式 [$(3.2)$](#tag3-2) 与高斯公式可得, 假设流体中有曲面 $S$ 包为的体积 $V$, 对于定常不可压缩流体有
$$\oint\limits_S \vec{v}\mathrm{d}\vec{S}=\int\limits_{V}\operatorname{div}(\vec{v})\mathrm{d}V=0$$

对于一条流管, 取流管两端截面 $A_1,A_2$, 流体仅从 $A_1$ 进入并从截面 $A_2$ 离开, 因此有定常流动的连续性方程
$$\bar{v_1}A_1=\bar{v_2}A_2=Q$$

推广可得对于多通管有
$$(\sum\bar{v_{i}}A_{i})_{in}=(\sum\bar{v_{j}}A_{j})_{out}=Q$$

### 流线的伯努利方程
现有一流场, 流动定常 $\frac{\partial}{\partial t}=0$ , 仅有重力作用 $\vec{f}=(0,0,-g)$ 且不可压缩 $\rho=C$

任取流场中的一条流线 $l$, 沿流线使用[理想流体的运动微分方程](#理想流体的运动微分方程), 并引入[流线条件](#tag3-1)即可得到流线的伯努利方程 (证明略, 详见教材), 即对于==流线上的任意一点==满足以下方程

$$\rho gz+p+\frac{1}{2}\rho v^2=C$$

假设研究空间中的点 $M$, 则公式中 $z$ 为 $M$ 相对于基准的距离, ==方向为 $M$ 到 $z$, 以竖直向上为正==, $p$ 为 $M$ 处的压强, $v$ 为 $M$ 处的流体速度  

* 公式中 $\rho gz+p$ 部分依然可以使用[基准法](./ch2.md#tag2-2)求解  
* 有时也将公式写为如下形式以便于实验测量, 可将其中的 $h$ 理解为 $mH_2O,mmHg$ 等压力单位提出密度后的形式, ==因此结果中除了 $h$ 的长度还要说明流体类型==
$$h+\frac{p}{\rho g}+\frac{v^2}{2g}=C$$
* 当流场无旋时 (==例如流场以接近直线运动的**缓变流**==), 还可以证明 (略), ==伯努利方程对流场中各个点均成立==

也可通过对流场中两个微体 $\mathrm{d}V$ 使用体能量守恒方程的角度推导得到伯努利方程

### 总流的伯努利方程
由于单点的流速难以测量, 工程上更多使用平均流速 $\bar{v}$. 通过对流管中的截面积分, 引入平均流速 $\bar{v}$, 得到总流的伯努利方程
$$\begin{split}&\quad\frac{1}{Q}\int\limits_A(\rho gz+p+\frac{1}{2}\rho v^2)\vec{v}\cdot\mathrm{d}\vec{A}\\
&=\rho gz+p+[\frac{1}{A}\int\limits_A(\frac{\vec{v}}{\bar{v}})^3\cdot\mathrm{d}\vec{A}]\frac{1}{2}\rho\bar{v}^2\\
&=\rho gz+p+\alpha\frac{1}{2}\rho\bar{v}^2\end{split}$$

* 由于仅有在缓变流中伯努利方程才在全流场成立, 因此==总流的伯努利方程仅用于缓变流==
* 在缓变流中, 认为截面上各点的 $\rho gz+p$ 部分相同, 因此该部分可以使用截面上任意一点分析, 且依然可以使用[基准法](./ch2.md#tag2-2)求解  
* 公式中将积分 $\frac{1}{A}\int\limits_A(\frac{\vec{v}}{\bar{v}})^3\cdot\mathrm{d}\vec{A}=\alpha$ 使用**动能修正系数** $\alpha$ 代替, 对于层流取 $\alpha=2$, 对于湍流或默认时取 $\alpha\approx 1$ (注意对于流线上的伯努利方程, 不需要动能修正系数 $\alpha$)
* 同流线的伯努利方程, 工程上通常将其表示为如下形式
$$h+\frac{p}{\rho g}+\alpha\frac{\bar{v}^2}{2g}=C$$

### 多通管的伯努利方程
![](./src/ch3_bonuli_4.drawio.svg)

对于缓变流中流线上的伯努利方程, 只要是缓变流对于流场中任意点均成立. 因此
$$\rho gz_0+p_0+\frac{1}{2}\rho v_0^2=\rho gz_1+p_1+\frac{1}{2}\rho v_1^2=\rho gz_2+p_2+\frac{1}{2}\rho v_2^2$$

根据总流的伯努利方程可知, 以上结论并不成立, 但是对于 $\alpha\approx 1$ 的情况, 截面上的速度近似均匀分布, 此时 $\bar{v}\approx v$, 因此可以认为总流的伯努利方程在分支管中近似成立 (理想流体或湍流)
$$\rho gz_0+p_0+\alpha\frac{1}{2}\rho\bar{v}_0^2\approx\rho gz_1+p_1+\alpha\frac{1}{2}\rho\bar{v}_1^2\approx\rho gz_2+p_2+\alpha\frac{1}{2}\rho\bar{v}_2^2$$

### 伯努利方程应用
#### 小孔出流
![](./src/ch3_bonuli_1.drawio.svg)

对于大开口水箱, 认为开口处的面积远大于出水口的面积, 因此认为开口处的平均流速 $\bar{v}_1\approx 0$  
注意出流处于大气相同, 因此认为 $p_2=p_a=p_1$

以截面 $2$ 的位置为基准, 有伯努利方程
$$H+\frac{p_a}{\rho g}+0=0+\frac{p_a}{\rho g}+\frac{\bar{v}^2}{2g}$$

#### 皮托管测流速
![](./src/ch3_bonuli_2.drawio.svg)

皮托管通过测量比较指定点压强与 $v=0$ 处的压强, ==测量流场中一**点的流速**==, 因此使用的是[流线的伯努利方程](#流线的伯努利方程)

皮托管共有两个管口
* 对于==正对流体流向的管口==, 认为此处的流体被阻挡, 因此==此处的流速 $v_b=0$==
* 对于平行于流体流向的管口, 此处流速即被测流速

通常两个管口距离相近, 可忽略高度差有
$$p_b+0=p_a+\frac{1}{2}\rho v_a^2$$

#### 文丘里管测流量
![](./src/ch3_bonuli_3.drawio.svg)

文丘里管通过测量同一流管中两个不同截面的压强差以得到平均流速, 并以此根据[定常流动的连续性方程](#定常流动的连续性方程)得到流管中的流量, 因此使用的是[总流的伯努利方程](#总流的伯努利方程)

认为两个截面在同一平面上, 则可通过联立连续性方程与伯努利方程求出流量
$$\begin{cases}
p_1+\alpha\frac{1}{2}\rho\bar{v_1}^2=p_2+\alpha\frac{1}{2}\rho\bar{v_2}^2\\
\bar{v}_1A_1=\bar{v}_2A_2
\end{cases}$$

## 流体与接触面的相互作用
### 理想流体的动量方程及动量矩方程
![](./src/ch3_momentum.drawio.svg)

在流场中去控制体 $ABCD$, 经过 $\mathrm{d}t$ 后, 控制体内的质点移动到了 $A'B'C'D'$ 处.  
对于定常流场, 空间中每一点的参数均是固定的, 因此可看成 $\mathrm{d}t$ 后控制体失去了来自 $AA'D'D$ 部分质点的动量, 同时获得了来自 $BB'C'C$ 部分质点的动量, 因此有
$$\mathrm{d}\vec{I}=\vec{I}_{BB'C'C}-\vec{I}_{AA'D'D}$$

对于控制体 $I_{AA'D'D}$ 内的总动量如下, $I_{BB'C'C}$ 同理可得
$$\begin{split}\vec{I}_{AA'D'D}&=\int\limits_{A_1}\vec{v}\mathrm{d}m\\
&=\int\limits_{A_1}\vec{v}\rho \mathrm{d}t\vec{v}\cdot\mathrm{d}\vec{A}\\
&=\rho[\frac{1}{A}\int\limits_{A_1}(\frac{\vec{v}}{\bar{v}})^2\mathrm{d}\vec{A}][(\bar{v}A)\bar{v}]\mathrm{d}t\\
&=\rho\vec{\beta_1}Q_1\bar{v}_1\mathrm{d}t
\end{split}$$

根据动量定律有
$$\begin{split}\sum\vec{F}&=\frac{\mathrm{d}\vec{I}}{\mathrm{d}t}=\frac{\vec{I}_{BB'C'C}-\vec{I}_{AA'D'D}}{\mathrm{d}t}\\
&=\int\limits_{A_2}\vec{v}\rho\vec{v}\cdot\mathrm{d}\vec{A}-\int\limits_{A_1}\vec{v}\rho\vec{v}\cdot\mathrm{d}\vec{A}\\
&=\rho\vec{\beta_2}Q_2\bar{v}_2-\rho\vec{\beta_1}Q_1\bar{v}_1\end{split}$$

* 公式中将积分 $\frac{1}{A}\int\limits_{A_1}(\frac{\vec{v}}{\bar{v}})^2\mathrm{d}\vec{A}=\vec{\beta}$ 使用动量修正系数 $\vec{\beta}$ 代替. 当速度均匀分布且 $A$ 为平面时 (默认情况), 有 $\beta\approx 1,\vec{\beta}\approx\vec{n}$
* 当流管上仅有一个入口与一个出口时, 根据连续性方程有 $Q_1=Q_2$

由此可将公式改写为常用的形式, 即理想流体的动量方程

$$\rho Q(\bar{v}_{out}\vec{n}_{out}-\bar{v}_{in}\vec{n}_{in})=\sum\vec{F}$$

* 注意该公式为矢量公式, 因此在==解题前通常需要先建立坐标系==, 并将方程投影到坐标轴上求解
* $\sum\vec{F}$ 中==包括了**所有**作用在流体上的力==, 例如来自截面的压力, 流体受到的重力, 来自管壁的作用力
* 截面 $A_1,A_2$ 可以为任意平面, 由于动量方程通常要配合[总流的伯努利方程](#总流的伯努利方程)使用, 因此最好选择缓变流的截面
* 由公式推导可得, ==$\bar{v}$ 为相对于控制体的速度==, 当控制体运动时, 如洒水器, 叶片射流等问题中要注意先减去来自控制体的牵连速度
* 推广可得多通管道的动量方程为 (注意此时各个截面上的流量 $Q$ 不再相等)
$$[\sum_{i}\rho_i Q_i\bar{v_i}\vec{n_i}]_{out}-[\sum_{j}\rho_j Q_j\bar{v_j}\vec{n_j}]_{in}=\sum\vec{F}$$ 

### 理想流体动量方程的应用
#### 水流对变截面弯管的作用力
![](./src/ch3_momentum1.drawio.svg)

对于变截面弯管, 其流量与流速, 压强未知时, 可使用[总流的伯努利方程](#总流的伯努利方程)与[连续性方程](#连续性方程)求解

变截面弯管上共受到多个力均要考虑
* 重力 $\vec{G}=-mg\vec{k}$  
当题目要求考虑重力或弯管==位于**竖直平面**上时, 则需要考虑控制体内流体的重力 $G$==, 否则认为 $G=0$
* 压力 $\vec{P}=(p-p_a)A_1\vec{n}$  
    * 除了两侧的压力, 控制体还受到传到自管道的大气的压力. 根据没有流体时, 管道平衡可得, 截面上的 $p_aA$ 部分的压力要用于平衡大气压力. ==因此要**使用相对大气** $p_a$ 的压强, 或绝对压强减去 $p_a$== (当题目没有明确给出 $p_a$ 时默认为相对压强)
    * 注意压力矢量平行于为截面法向, 并且指向流体
* 管道作用力 $\vec{F}$  
==此处的力 $\vec{F}$ 为**控制体对管道的作用力**==, 如果题目要求管道对流体的作用力, 则还需要根据牛顿第三定律, 取相反的方向

#### 射流与壁面相互作用
![](./src/ch3_momentum2.drawio.svg)

当自由射流射向物体时, 其动量的大小与发生改变, 本质上为物体对射流施加的作用力.

射流与固定壁面问题具有以下特点
* 射流问题中不考虑重力的影响, 因此认为动量方程中 $G=0$, 伯努利方程中不考虑 $\rho gz$ 项
* 射流以及射向壁面的流体均暴露在大气中, 因此射流流场中各个点的压强均为 $p_a$, 因此动量方程中不考虑压力 (整个流体的和压力为 $0$), 伯努利方程中不考虑 $p$ 项.
* 当壁面为平面时, 则壁面与射流之间的相互作用力必定垂直于壁面

根据这前个特点, 射流有连续性方程, 伯努利方程 (取 $\alpha=1$)
$$\begin{cases}
Q=Q_1+Q_2\\
\bar{v}=\bar{v}_1=\bar{v}_2\\
\end{cases}$$

根据相互作用力必定垂直于壁面的条件, 还可得到反作用力两个分量之间满足
$$F_x=F\sin\theta\\
F_y=F\cos\theta$$

将动量方程向坐标轴投影
$$\begin{cases}
(\rho\bar{v}_1Q_1\cos\theta-\rho\bar{v}_2Q_2\cos\theta)-\rho\bar{v}Q=-F_x\\
(\rho\bar{v}_1Q_1\sin\theta-\rho\bar{v}_2Q_2\sin\theta)-0=F_y
\end{cases}$$

#### 射流与叶片相互作用
![](./src/ch3_momentum3.drawio.svg)

对于射流与叶片之间的相互作用可以简化为如图所示的模型, 射流冲击的物体不再是固定的, 而是以与入射流同向的速度 $v_0$ 运动

此时的控制体再运动物体上, 因此控制体是运动的, 动量方程中要采用相对平均流速 $\bar{v}_r$ 与相对流量 $Q_r$  
由于物体速度与入射流通向, 因此可得入射流的相对流速满足
$$\bar{v}_{1r}=\bar{v}_1-v_0$$

其他特点与射流与固定壁面相互作用相同, 通过伯努利方程可得, ==截面 $A_2$ 的相对流速与 $A_1$ 相同==
$$\bar{v}_{1r}=\bar{v}_{2r}=\bar{v}_1-v_0$$

根据连续性方程, 由于仅有一个输入一个输出, 因此流量相等
$$Q_1=\bar{v}_{1r}A_1=Q_2=\bar{v}_{2r}A_2$$

将动量方程向坐标轴投影, 带入上述结论有
$$\begin{cases}
\rho(\bar{v}_1-v_0)^2A_1(\cos\theta-1)=-F_x\\
\rho(\bar{v}_1-v_0)^2A_1\sin\theta=F_y
\end{cases}$$

注意==方程中的 $\vec{n}$ 近似取截面的法方向==, 取 $\beta\approx 1$ 

### 理想流体动量矩方程的应用
考虑力臂后, 可得到理想流体的动量矩方程
$$\rho Q(\bar{v}_{out}\vec{r}\times\vec{n}_{out}-\bar{v}_{in}\vec{n}_{in})=\sum\vec{r}\times\vec{F}+\sum\vec{M}$$

其中 $\vec{r}$ 为力矩的简化中心指向力作用点或截面中心的位置矢量, 通常选择在某个截面的形心, 以减少方程中的未知量

#### 水流对弯管的转矩
![](./src/ch3_momentum4.drawio.svg)

受力分析上与[水流对变截面弯管的作用力](#水流对变截面弯管的作用力)基本相同, 但要注意此时的管道对流体的作用形式为外力矩 $M$ 而不是外力

不考虑重力的影响  
根据动量矩方程的特点, 可以将简化中心选择在特殊位置, 如图选择在 $A_1$ 截面形心时有
$$\rho\bar{v}_{2}Qh-0=-M-(p_2-p_a)A_2h$$

与理论力学的平衡方程类似, 选择其他简化中心可得到其他的动量矩方程 (不一定与之前的方程独立)
$$0-(-\rho\bar{v}_{1}Qh)=-M-(p_1-p_a)A_1h$$

#### 旋转洒水器
![](./src/ch3_momentum5.drawio.svg)

对于旋转洒水器问题, 控制体也是一个绕轴转动的物体, 因此要采用相对速度  
由于截面绕轴旋转, 因此有牵连速度 $v_e=l\times\omega$, 方向垂直于洒水器臂 
与[射流与叶片相互作用](#射流与叶片相互作用)不同, 旋转洒水器以取 $\vec{n}\approx\vec{v}_r$ 的方式简化模型, 因此有 
$$\bar{v}_{yr}=\bar{v}\cos\theta-l\times\omega$$

由于液体的进入部分在转轴上, 此时 $r=0$, 因此当平衡时, 转速 $\omega$ 达到最大且流体仅受到旋转摩擦阻力 $M_f$, 有动量矩方程 (由于出口与大气接触, 因此 $p=p_a$, 不考虑压力)

$$\rho(\bar{v}_{1}\cos\theta_1-l_1\times\omega)Ql_1+\rho(\bar{v}_{1}\cos\theta_2-l_2\times\omega)Ql_2=M_f$$

当洒水器被施加外力 $M$ 导致静止时, 则有动量矩方程
$$\rho\bar{v}_{1}\cos\theta_1Ql_1+\rho\bar{v}_{1}\cos\theta_2Ql_2=M+M_f$$
