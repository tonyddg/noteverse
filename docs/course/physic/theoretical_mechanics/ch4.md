---
order: 4
---

# 分析力学初步

## 约束
此部分参考自视频 <https://www.bilibili.com/video/BV19x411L7iq>

### 约束方程
使用约束方程表示物体在位置与速度上受到的限制
$$f(\vec{r},\vec{r}',t)=0$$

其中 $\vec{r}$ 为物体的位置, $\vec{r}'$ 为物体的速度, $t$ 为时间.

例如, 对于平面上的纯滚动圆盘, 其质心始终满足 
$$v_O=R\omega$$
此条件即纯滚动的约束方程

例如, 对于某平行于 $xy$ 平面, 且平面以 $v_z$ 的速度沿 $z$ 轴向上运动的质点, 其约束方程为
$$z=vt$$

### 简单约束分类
#### 几何约束
约束仅和位置有关的称为几何约束, 如单摆绕点转动
$$x^2+y^2=l^2$$

#### 运动约束
约束还和速度有关的约束, 如二维纯滚动
$$v_O=R\omega$$

但是对二维纯滚动约束积分后, 得到速度无关的约束方程
$$x=R\theta+x_0$$

但对于三维纯滚动, 球在 $xy$ 平面上, 滚动的轨迹不确定, 则无法完成这种转换
$$\sqrt{x'^2+y'^2}=R\theta'$$

### 一般约束分类
由于几何约束与运动约束之间划分不明确, 先采用如下方式分类

1. 完整约束
    1. 纯粹几何约束
    1. 可积的运动约束
1. 不完整约束
即不可积的运动约束

#### 可积性的判断
由于约束中只会出现对时间一次导数 (速度), 因此可利用全微分的性质判断约束方程是否可积  
即是否能将速度约束转换为几何约束关于时间的全微分
$$\begin{split}f(\vec{r},\vec{r}')&=0\\
\frac{d}{dt}F(\vec{r})&=0\end{split}$$

例如对于速度约束 $xy'+yx'=0$ 有
$$\begin{split}xy'+yx'&=0\\
\frac{1}{dt}(xdy+ydx)&=0\\
\frac{d}{dt}(xy)&=0\end{split}$$

因此此速度约束等价于几何约束, 属于可积的运动约束
$$xy=C$$

但对于速度约束 $xy'=0$, 由于其不满足全微分的条件, 因此属于不可积的运动约束

### 广义约束
约束方程在广义上还可以是不等式, 称为单侧约束或可解脱约束, 例如对于地面上跳动的球, 有约束
$$z\ge 0$$

前文的约束中, 每一个约束均能使物体运动的维度严格减一, 称为双侧约束

### 定常约束
通过约束方程中是否显含时间 $t$ 来区分约束  
当约束内不显含时间, 则称为定常约束, 表明约束与时间无关  
相反称成为非定常约束

### 自由度
表示一个物体位置与方位的独立坐标个数称为自由度, 使用 $s$ 表示

对于不完整约束, 不会实质性地改变物体的独立坐标, 但能影响其运动趋势, 因此可通过对其他完整约束做微分后考虑

## 静力学与虚功原理
虚功原理目的即避开不必要的约束力求解

### 虚位移
虚位移含义即满足约束条件的一切可能位移, 且位移必定为无穷小位移  
使用符号 $\delta\vec{r}$ 表示

与 $\mathrm{d}\vec{r}$ 的区别在于, 后者表示确定的微小位移, 前者则表示所有微小位移的可能  
因此可以认为 $\mathrm{d}\vec{r}$ 包含于集合 $\delta r$ 中  

注意, 由于 $\delta \vec{r}$ 使用的坐标系一定是相对坐标系 (不引入牵连运动), 而 $\mathrm{d}\vec{r}$ 则可以是任意坐标系  
因此, 对于[非定常约束](#定常约束), 如刚体受到牵连运动, 则绝对坐标系下的 $\mathrm{d}\vec{r}$ 与相对坐标系下的 $\delta\vec{r}$ 不再有关联

### 力的分类
根据力对物体运动的作用, 分类为约束力与主动力
* 如支持力, 静摩擦力限制了物体的运动, 属于约束力, 使用符号 $\vec{R}$ 表示
* 如重力, 动摩擦力, 外力对物体的运动没有限制, 属于主动力, 使用符号 $\vec{F}$ 表示

### 虚功
虚功即外力与虚位移乘积得到的微小功, 满足
$$\delta W=\vec{F}\cdot\delta\vec{r}$$

* 在定常约束下, 约束力总是正交于虚位移, 因此约束力做虚功必定 $0$
* 在非定常约束下, 则不一定 (笔记中不考虑该情况)
* 当刚体上所有约束力所作虚功之和为 $0$, 则称为**理想约束**

### 虚功原理的导出
在静止状态下, 刚体必然处于受力平衡的状态, 有
$$\sum(\vec{F}_i+\vec{R}_i)=\vec{0}$$

因此刚体所受的所有外力虚功之和为 $0$  
而在理想约束条件下, 约束力的虚功之和也为 $0$, 将方程相减可得, 所有约束力的虚功之和同样为 $0$  
因此导出虚功原理

$$\sum\vec{F}_i\cdot\delta\vec{r}=0$$

### 广义坐标
任意用于确定刚体位置的一套参数都可称为系统的广义坐标, 表示为 $q_i$  
* 选择广义坐标时, 一般要求坐标之间相互独立, 相互之间没有关联, 例如单摆中选择极坐标 $r,\theta$ 作为独立的广义坐标, 而 $x,y$ 坐标则相互牵连, 不适合作为广义坐标
* 对于一个[自由度](#自由度)为 $s$ 的系统, 必定能得出 $s$ 个相互独立的广义坐标

### 广义力
显然[虚位移](#虚位移)可以视为一个于广义坐标有关的多元函数, 通过全微分法则展开有
$$\delta\vec{r}=\sum_{i=1}^s\frac{\partial \vec{r}}{\partial q_i}\delta q_i$$

引入[虚功原理](#虚功原理的导出)有
$$\begin{split}
\sum_{\alpha=1}^n\vec{F}_{\alpha}\cdot\delta\vec{r}&=\sum_{\alpha=1}^n\vec{F}_{\alpha}\cdot\sum_{i=1}^s\frac{\partial \vec{r}}{\partial q_i}\delta q_i\\
&=\sum_{i=1}^s\Big(\sum_{\alpha=1}^n\vec{F}_{\alpha}\cdot\frac{\partial \vec{r}}{\partial q_i}\Big)\delta q_i
\end{split}$$

根据上式定义标量**广义力**满足  
$$Q_i=\sum_{\alpha=1}^n\vec{F}_{\alpha}\cdot\frac{\partial \vec{r}}{\partial q_i}$$

此时虚功原理也可写为
$$\sum_{i=1}^sQ_i\delta q_i=0$$

### 虚功原理的拓展
* 广义坐标 $q_i$ 之间相互独立, 即除了系数全为 $0$,  不存在函数 $f(q_1,q_2,\dots,q_{s})=0$
* 虚位移可以是任意方向, 因此 $q_i$ 方向的虚位移 $\delta q_i$ 也可以取任意值

在广义坐标相互完全独立条件下, 仅当所有广义力为 $0$, 虚功原理等式才能成立  
因此虚功原理的基本形式虽然只有一个方程, 但在==广义坐标独立与理想约束==条件下可以从中提取出 $s$ 个关于广义力的方程
$$Q_i=\sum_{\alpha=1}^n\vec{F}_{\alpha}\cdot\frac{\partial \vec{r}}{\partial q_i}=0$$

根据[度规系数](#度规系数)可知, 方程可进一步写为
$$\sum_{\alpha=1}^n\vec{F}_{\alpha}\cdot\vec{e}_{q_i}=0$$

### 虚功原理的使用
为了方便使用, 一般步骤中并不会直接计算广义力 $Q_i$, 而是获取虚功的具体表达式后再分解出广义力  
步骤如下
1. 根据系统的自由度, 选择一组独立的广义坐标
1. 确定主动力与约束力
1. 列出虚功表达式, 即所有主动力及其方向 $y_j$ 与各个独立坐标方向的虚位移 $\delta q_i$ 之间的关系
1. 提取出 $s$ 个关于广义力的方程并求解 (在这一步时, 必须保证方程数与自由度相同, 否则表明有不独立的坐标)

当列出虚功表达式后, 发现坐标 $q_i,q_j$ 不独立, 则可以列出 $q_i=f(q_j)$ 则带入 $\delta q_i=\frac{\mathrm{d}f(q_j)}{\mathrm{d}q_j}\delta q_j$  
由此可知关于虚功表达式列写的两种思路
* 在第一步中不寻找独立坐标, 而是可根据方便选择任意坐标, 如选择主动力 $\vec{F}_j$ 同向的坐标 $y_j$, 得到虚功表达式 $\sum_{j=1}^{m}(\sum_{i=1}^{n}F_i\delta y_j)=0$, 再使用上述方法, 以 $\delta y_j=\delta f(q_1,\dots,q_s)$ 转化其中非独立的坐标系
* 选择出独立坐标 $q_i$, 但在写出虚功表达式时, 根据第 $j$ 个力 $\vec{F}_j$ 的同向的坐标 $y_j$, 获取该坐标与广义坐标的关系得到各个力单独作用下的虚功 $F_j\delta y_j=F_j\delta f(q_1,\dots,q_s)$, 最终合并同类项得到虚功表达式 $\sum_{j=1}^nF_j\delta f(q_1,\dots,q_s)=0$

除了上述的方法外  
还可严格遵守公式, 找出点的笛卡尔坐标与广义坐标间的关系 $\vec{r}=\vec{r}(q_1,\dots,q_s)$ 并求出 $\frac{\partial \vec{r}}{\partial q_i}$  
此时不再需要具体写出虚功表达式, 可直接得到 $s$ 个方程 $\sum_{\alpha=1}^n\vec{F}_{\alpha}\cdot\frac{\partial \vec{r}}{\partial q_i}=0$

### 虚功与势能
当系统的所有主动力都是保守力, 即仅与位置有关时, 则系统满足机械能守恒, 且具有势能 $V=V(q_1,\dots,q_s)$  
因此系统由位置 $A$ 移动到特定位置时主动力做功满足 $W(q_{1},\dots,q_{s})=V_A-V(q_{1},\dots,q_{s})$

可以发现保守力做功与势能 $W,V$ 也可以表示为一个关于广义坐标 $q_{1},\dots,q_{s}$ 的函数  
又保守力做功满足 $W=\int (\sum\vec{F})\cdot\delta\vec{r}$, 因此势能与[广义力](#广义力)之间满足关系
$$\frac{\partial V}{\partial q_i}=-\sum_{\alpha=1}^n\vec{F}_{\alpha}\cdot\frac{\partial \vec{r}}{\partial q_i}=-Q_i$$

因此保守力系统下, 虚功原理的 $s$ 个方程等价于 
$$\frac{\partial V}{\partial q_i}=0$$

不需要受力分析, 仅需要确定系统势能之和与广义坐标之间的关系即可  
在应用时, 表示系统势能的坐标不一定是广义坐标, 可参考[虚功原理的使用](#虚功原理的使用)中的转换方法

### 使用虚功原理求约束力
如果希望计算特定位置的约束力, 则可使用解除该位置的约束, 并使用一个等同于约束力的虚拟力代替该约束  
再使用虚功原理即可求出约束力

### 达朗贝尔原理
达朗贝尔原理即将牛顿第二定律中, 加速度项移到等式左侧  
即将物体自身的运动也是为一种力, 称为达朗贝尔惯性力, 满足
$$\vec{D}=-m\vec{a}$$

此时有动力学问题下的[虚功原理](#虚功原理的拓展)
$$(\sum_{\alpha=1}^n\vec{F}_\alpha+\vec{D})\cdot\frac{\partial \vec{r}}{\partial q_i}=0$$

## 正交曲线坐标系
将极坐标, 球坐标, 柱坐标等非传统的笛卡尔坐标称为曲线坐标  
广义坐标系也可以视为一种曲线坐标

### 质点的坐标表示
在力学符号中  
* 使用向量 $\vec{r}_N=\begin{bmatrix}x&y&z\end{bmatrix}^T$ 表示点 $N$ 在笛卡尔坐标系 (固连在大地上, 但原点与方向可任意选取) 下的坐标, 称为坐标向量  
* 使用向量 $\vec{q}_N=\begin{bmatrix}q_1&q_2&q_3\end{bmatrix}^T$ 表示点 $N$ 在广义坐标系下的坐标

注意求导 $\frac{\partial \vec{r}}{\partial q_i}$ 中, 实际表示的是向量 $\begin{bmatrix}\frac{\partial x}{\partial q_i}&\frac{\partial y}{\partial q_i}&\frac{\partial z}{\partial q_i}\end{bmatrix}^T$

### 曲线坐标的单位矢量
在坐标系中, 单位矢量 $\vec{e}_{q_i}$ 的本质即表示了一种特定的方向, 当点沿这个方向移动时, 除了坐标 $q_i$ 会增大, 其他坐标将保持不变  
例如笛卡尔坐标系中, 质点沿 $\vec{i},\vec{j},\vec{k}$ 方向移动时, 分别只有坐标 $x,y,z$ 在增大, 因此笛卡尔坐标系三个坐标的单位矢量分别为 $\vec{e}_{x}=\vec{i},\vec{e}_{y}=\vec{j},\vec{e}_{k}=\vec{z}$

对于曲线坐标系同理, 例如基坐标系下  
沿质点的径向移动, 坐标 $r$ 增大, 因此质点的径向即坐标 $r$ 的单位矢量 $\vec{e}_{r}$  
沿质点的切向移动, 坐标 $\theta$ 增大, 因此质点的切向即坐标 $\theta$ 的单位矢量 $\vec{e}_{\theta}$  
因此在曲线坐标系中, ==单位矢量是一个与点位置有关的矢量== (因此通常也随时间变化) 

通过偏导数能够提取单个坐标的变化特点  
因此对于任意广义坐标, 该坐标单位矢量在笛卡尔坐标系下的坐标可表示为
$$\vec{e}_{q_i}=\frac{\frac{\partial \vec{r}}{\partial q_i}}{\begin{Vmatrix}\frac{\partial \vec{r}}{\partial q_i}\end{Vmatrix}}$$

以球坐标 $(r,\theta,\varphi)$ 为例
* 球坐标与直角坐标之间有关系 $\vec{r}=\begin{bmatrix}r\cos\varphi\cos\theta&r\cos\varphi\sin\theta&r\sin\varphi\end{bmatrix}^T$
* 对于径向长度坐标 $r$, $\vec{e}_r=\begin{bmatrix}\cos\varphi\cos\theta&\cos\varphi\sin\theta&\sin\varphi\end{bmatrix}^T$
* 对于经度角坐标 $\theta$, $\vec{e}_\theta=\begin{bmatrix}-\sin\theta&\cos\theta&0\end{bmatrix}^T$
* 对于余纬度角坐标 $\varphi$, $\vec{e}_\varphi=\begin{bmatrix}\sin\varphi\cos\theta&\sin\varphi\sin\theta&-\cos\varphi\end{bmatrix}^T$

注意
* 由于曲线坐标的正交性, 因此必定任意位置下各个单位矢量之间正交
* 除了用于表示 $\vec{r}$ 坐标的, 固连在大地上的笛卡尔坐标系的单位矢量为常数, 大部分单位矢量均随物体位置, 即时间变化, 因此==直接对曲线坐标系下物体的坐标 $\vec{q}$ 求导无法得到速度, 包括[自然坐标系](#自然坐标系)==

### 度规系数
对笛卡尔坐标系点坐标 $\vec{r}$ 求全微分有
$$\mathrm{d}\vec{r}=\sum_{i=1}^{s}\frac{\partial \vec{r}}{\partial q_i}\mathrm{d}q_i$$

其中定义**度规系数** $h_i=\begin{Vmatrix}\frac{\partial \vec{r}}{\partial q_i}\end{Vmatrix}$, 其反映了各个广义坐标对于笛卡尔坐标系的贡献  
此时点坐标的全微分表示为
$$\mathrm{d}\vec{r}=\sum_{i=1}^{s}h_i\mathrm{d}q_i\vec{e}_{q_i}$$

点坐标向量 $\vec{r}$ 关于广义坐标 $q_i$ 的偏导可表示为
$$\frac{\partial \vec{r}}{\partial q_i}=h_i\vec{e}_{q_i}$$

### 曲线坐标系下的速度
关于坐标向量 $\vec{r}$ 的全微分在[度规系数](#度规系数)中已经得到表示  
而物体在曲线坐标系下的速度即坐标向量关于时间的导数有

$$\dot{\vec{r}}=\frac{\mathrm{d}\vec{r}}{\mathrm{d}t}=\sum_{i=1}^{s}\frac{\partial \vec{r}}{\partial q_i}\frac{\mathrm{d}q_i}{\mathrm{d}t}=\sum_{i=1}^{s}h_i\dot{q}_i\vec{e}_{q_i}$$

### 曲线坐标系下的加速度
虽然直接对 $\vec{r}$ 求关于时间 $t$ 的二次导数也可得到加速度, 但需要多次求导不利于计算  
如果直接求导时, 除了 $q_i$, 还要注意==一般情况下 $\frac{\mathrm{d}\vec{e}_{q_i}}{\mathrm{d}t}\neq 0$== ($\vec{e}_{q_i}$ 一般也将随物体位置即时间变换)  
此时 $\frac{\mathrm{d}\vec{a}}{\mathrm{d}t}=\sum_{i=1}^s (\dot{\vec{q}}_i\frac{\mathrm{d}\vec{e}_{q_i}}{\mathrm{d}t}+\ddot{\vec{q}}_i\vec{e}_{q_i})$ 因此需要对矢量求导, 在三维质点情况下累计对单个数求导 $3\times 3\times 2=18$ 次

现可使用以下公式得出加速度  
首先需要证明以下两个引理, 也成为经典拉格朗日关系  

引理一: $\frac{\partial \dot{\vec{r}}}{\partial \dot{q_i}}=\frac{\partial \vec{r}}{\partial q_i}$, 证明如下
$$
\frac{\partial \dot{\vec{r}}}{\partial \dot{q_i}}=\frac{\partial}{\partial \dot{q_i}}\sum_{j=1}^{s}\frac{\partial \vec{r}}{\partial q_j}\dot{q}_i=\frac{\partial \vec{r}}{\partial q_i}
$$
在证明中注意
* 坐标间相互独立, 有 $\frac{\partial \dot{q_j}}{\partial \dot{q_i}}=0,i\neq j$
* $\frac{\partial \vec{r}}{\partial q_j}$ 仅与点的位置有关, 而与速度 $\dot{q}_i$ 无关

引理二: $\frac{\mathrm{d}}{\mathrm{d}t}(\frac{\partial \vec{r}}{\partial q_i})=\frac{\partial \dot{\vec{r}}}{\partial q_i}$, 证明如下
$$\begin{split}
\frac{\mathrm{d}}{\mathrm{d}t}\Big(\frac{\partial \vec{r}}{\partial q_i}\Big)&=\frac{\mathrm{d}}{\mathrm{d}t}\sum_{j=1}^{s}\frac{\partial^2 \vec{r}}{\partial q_j\partial q_i}\mathrm{d}q_j\\
&=\sum_{j=1}^{s}\frac{\partial^2 \vec{r}}{\partial q_i\partial q_j}\dot{q}_j\\
&=\frac{\partial}{\partial q_i}\sum_{j=1}^{s}\frac{\partial \vec{r}}{\partial q_j}\dot{q}_j=\frac{\partial \dot{\vec{r}}}{\partial q_i}
\end{split}$$
在证明中注意
* 认为 $\vec{r}$ 对任意 $q_i$ 满足二阶偏导可交换次序的条件 (物理中不考虑不连续的情况)
* 坐标 $q_i$ 与速度 $\dot{q}_j$ 之间在特定点的运动规律确定前, 不存在任何关系, 因此有 $\frac{\partial \dot{q}_j}{\partial q_i}=0$, 其中 $i,j$ 可任意取值

引理证明完后, 可开始加速度公式的推导
$$\begin{split}
a_{q_i}&=\vec{e}_{q_i}\cdot \vec{a}\\
&=\frac{1}{h_i}\frac{\partial\vec{r}}{\partial q_i}\cdot\ddot{\vec{r}}=\frac{1}{h_i}\frac{\mathrm{d}\dot{\vec{r}}}{\mathrm{d}t}\cdot\Big(\frac{\partial\vec{r}}{\partial q_i}\Big)\\
&=\frac{1}{h_i}\Big[\frac{\mathrm{d}}{\mathrm{d}t}\Big(\dot{\vec{r}}\cdot\frac{\partial\vec{r}}{\partial q_i}\Big)-\frac{\mathrm{d}}{\mathrm{d}t}\Big(\frac{\partial\vec{r}}{\partial q_i}\Big)\cdot\dot{\vec{r}}\Big]\\
&=\frac{1}{h_i}\Big[\frac{\mathrm{d}}{\mathrm{d}t}\Big(\dot{\vec{r}}\cdot\frac{\partial\dot{\vec{r}}}{\partial \dot{q_i}}\Big)-\dot{\vec{r}}\cdot\frac{\partial\dot{\vec{r}}}{\partial q_i}\Big]\\
&=\frac{1}{h_i}\Big[\frac{\mathrm{d}}{\mathrm{d}t}\Big(\dot{\vec{r}}\cdot\frac{\partial\dot{\vec{r}}}{\partial \dot{q_i}}\Big)-\dot{\vec{r}}\cdot\frac{\partial\dot{\vec{r}}}{\partial q_i}\Big]\\
&=\frac{1}{h_i}\Big[\frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial\frac{1}{2}(\dot{\vec{r}}\cdot\dot{\vec{r}})}{\partial \dot{q_i}}-\frac{\partial\frac{1}{2}(\dot{\vec{r}}\cdot\dot{\vec{r}})}{\partial q_i}\Big]\\
&=\frac{1}{h_i}\Big(\frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial\frac{v^2}{2}}{\partial \dot{q_i}}-\frac{\partial\frac{v^2}{2}}{\partial q_i}\Big)
\end{split}$$

推导中注意
* 分步积分法则对于向量依然成立, 有 $\frac{\mathrm{d}\vec{a}}{\mathrm{d}t}\cdot\vec{b}=\frac{\mathrm{d}}{\mathrm{d}t}(\vec{a}\cdot\vec{b})-\frac{\mathrm{d}\vec{b}}{\mathrm{d}t}\cdot\vec{a}$  
上述推导中 $\vec{a}=\dot{\vec{r}},\vec{b}=\frac{\partial\vec{r}}{\partial q_i}$
* 部分积分法则对于向量依然成立, 且与幂函数积分类似, 向量存在 $\frac{\mathrm{d}(\vec{r}\cdot\vec{r})}{\mathrm{d}t}=2\frac{\mathrm{d}\vec{r}}{\mathrm{d}t}\cdot\vec{r}$  
上述推导中 $\dot{\vec{r}}\cdot\frac{\mathrm{d}\dot{\vec{r}}}{\mathrm{d}q_i}=\frac{\partial\frac{1}{2}(\dot{\vec{r}}\cdot\dot{\vec{r}})}{\partial q_i}$, 其中 $\dot{\vec{r}}\cdot\dot{\vec{r}}=\begin{Vmatrix}\dot{\vec{r}}\end{Vmatrix}^2=v^2$
* 类似[曲线坐标系下的速度](#曲线坐标系下的速度), 加速度总能表示为各坐标方向矢量 $\vec{e}_{q_i}$ 的线性组合, 即写为 $\vec{a}=\sum a_{q_i}\vec{e}_{q_i}$ 其中加速度在坐标 $q_i$ 的分量即记为 $a_{q_i}$, 又因为各坐标独立, 加速度在坐标 $q_i$ 上的分量即为 $a_{q_i}=\vec{e}_{q_i}\cdot \vec{a}$  
通过以上公式将 $s$ 个加速度分量表示出来, 即可得到完整的加速度表达式

### 自然坐标系
自然坐标系上, 假设物体运动轨迹而形成的曲线已知
* 定义曲线上一点为曲线原点 $O_s$, 从曲线原点到点 $P$ 的弧长为弧长坐标 $s$
* 定义空间中的一点为坐标原点 $O$, 从坐标原点 $O$ 到点 $P$ 的直线长度为径向坐标 $r$

注意, 对于坐标矢量 $\vec{r}$
* $\mathrm{d}\vec{r}$ 表示了 $\mathrm{d}t$ 间隔下两个坐标矢量的矢量差, 因此 $\mathrm{d}\vec{r}$ 沿着点运动轨迹的切线方向  
* $\mathrm{d}r$ 表示了 $\mathrm{d}t$ 间隔下两个坐标矢量的长度差, 因此 $\mathrm{d}r$ 表示的是沿相对原点的径向长度的微小变化

对于坐标 $s$, 由于 $\frac{\partial \vec{r}}{\partial s}$ 中 $\partial s$ 表示的是沿切向方向的微小长度变化等于 $\partial\begin{Vmatrix}\vec{r}\end{Vmatrix}$, 因此  
$\frac{\partial \vec{r}}{\partial s}=\vec{e}_{s}=\vec{\tau}$, 即该偏导结果就是 $s$ 的单位矢量, 且一般称之为切向矢量 $\tau$

在自然坐标系下, 求物体运动速度时有
$$\frac{\mathrm{d}\vec{r}}{\mathrm{d}t}=\frac{\mathrm{d}\vec{r}}{\mathrm{d}s}\frac{\mathrm{d}s}{\mathrm{d}t}=\dot{s}\vec{\tau}$$
因此物体的速度总是沿着曲线的切线方向移动, 并且速度的大小即曲线坐标的变化率 $\dot{s}$

在介绍自然坐标系下的物体加速度前, 需要先考虑切向矢量的微分 $\mathrm{d}\vec{\tau}$  
* 由于 $\vec{\tau}$ 始终为单位矢量, 且 $\vec{\tau}(t+\mathrm{d}t)$ 到 $\vec{\tau}(t)$ 转过一个微小的角度 $\mathrm{d}\theta$, 因此可使用弧长代替长度, 可得 $\mathrm{d}\begin{Vmatrix}\vec{\tau}\end{Vmatrix}=1\cdot\mathrm{d}\theta$
* 对式子 $\vec{\tau}\cdot\vec{\tau}=1$ 两侧对 $t$ 求导有 $2\vec{\tau}\cdot\frac{\mathrm{d}\vec{\tau}}{\mathrm{d}t}=0$, 因此 $\mathrm{d}\vec{\tau}$ 的方向垂直于 $\vec{\tau}$, 称这一方向为法线方向 $\vec{n}$
* 综上可得, $\frac{\mathrm{d}\vec{\tau}}{\mathrm{d}t}=\frac{\mathrm{d}\theta}{\mathrm{d}t}\vec{n}=\dot{\theta}\vec{n}$
* 注意以上 $\theta$ 与极坐标中的含义不同, 此处所指的是切线方向与任意参考线 (如 $x$ 轴正方向) 之间的夹角

通过对运动速度矢量求再次求导即可得到运动加速度, 但是注意, 切向矢量是在不断变化的
$$\begin{split}
\vec{a}=\frac{\mathrm{d}\dot{\vec{r}}}{\mathrm{d}t}&=\frac{\mathrm{d}}{\mathrm{d}t}(\dot{s}\vec{\tau})\\
&=\ddot{s}\vec{\tau}+\dot{s}\dot{\theta}\vec{n}
\end{split}$$

其中 $\dot{\theta}$ 依然不易于计算, 还需经过以下处理 $\dot{\theta}=\frac{\mathrm{d}\theta}{\mathrm{d}t}=\frac{\mathrm{d}\theta}{\mathrm{d}s}\frac{\mathrm{d}s}{\mathrm{d}t}=\dot{s}\frac{\mathrm{d}\theta}{\mathrm{d}s}$  
注意到 $\frac{\mathrm{d}s}{\mathrm{d}\theta}$ 反映了微小弧长 $\mathrm{s}$ 除以了其对应的圆心角 $\mathrm{d}\theta$ 表示的即为该段微小圆弧的半径, 因此 $\frac{\mathrm{d}s}{\mathrm{d}\theta}=\rho$ 即曲率半径 $\rho$ 的原始定义 (由于曲线通常未知, 因此不会直接求解, 而是保留曲率半径, 等待在后续微分方程中进一步求解)  
此时自然坐标系下的加速度为 (注意 $\frac{\mathrm{d}\theta}{\mathrm{d}s}=\frac{1}{\rho}$)
$$\vec{a}=\ddot{s}\vec{\tau}+\frac{\dot{s}^2}{\rho}\vec{n}$$

### 物体坐标系与空间坐标系
在刚体运动学中, 通常会使用

## 拉格朗日方程
### 广义达朗贝尔惯性力
类似[广义力](#广义力)的定义, 有广义达朗贝尔惯性力 $D_i=\vec{D}\frac{\partial \vec{r}}{\partial q_i}$  
在[达朗贝尔原理](#达朗贝尔原理)中引入[曲线坐标的加速度](#曲线坐标的加速度)有
$$\begin{split}
D_i=\vec{D}\frac{\partial \vec{r}}{\partial q_i}&=-m\vec{a}h_i\vec{e}_{q_i}=-mh_ia_{q_i}\\
&=-m\Big(\frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial\frac{v^2}{2}}{\partial \dot{q_i}}-\frac{\partial\frac{v^2}{2}}{\partial q_i}\Big)\\
&=-\frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial\frac{mv^2}{2}}{\partial \dot{q_i}}-\frac{\partial\frac{mv^2}{2}}{\partial q_i}\\
&=-\frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial T}{\partial \dot{q_i}}-\frac{\partial T}{\partial q_i}
\end{split}$$

推导中注意
* 定义物体的动量 $T=\frac{1}{2}mv^2$
* $\frac{\partial \vec{r}}{\partial q_i}$ 的转换参见[度规系数](#度规系数)
* 加速度 $\vec{a}$ 以及有关转换参见[曲线坐标的加速度](#曲线坐标的加速度)

### 拉格朗日方程的导出
在理想约束与独立的正交广义坐标系下可导出拉格朗日方程

根据[广义达朗贝尔惯性力](#广义达朗贝尔惯性力)以及[达朗贝尔原理](#达朗贝尔原理)下的虚功原理, 通过将达朗贝尔惯性力移动到方程另一侧即可得出拉格朗日方程
$$\sum_{\alpha=1}^n\vec{F}_\alpha\cdot\frac{\partial \vec{r}}{\partial q_i}=Q_i=\frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial T}{\partial \dot{q_i}}-\frac{\partial T}{\partial q_i}$$

注意到拉格朗日方程中所有参数均为标量  
因此通过拉格朗日方程, 能够较大程度上避免一般牛顿力学中对于矢量运算的分析

然而拉格朗日方程无法得到具体的解, 只能获得系统运动关于外力的二阶微分方程  
具体的运动关系还需要通过微分方程的求解才能得出

### 拉格朗日方程使用注意
* 使用拉格朗日方程前, 显然需要确定[曲线坐标系下的速度](#曲线坐标系下的速度), 即求出各坐标的度规系数与单位矢量
* 不同坐标之间的独立关系, 因此偏导 $\frac{\partial q_{i}}{\partial q_{j}}=0,i\neq j$, 当 $i=j$ 则显然为 $1$
* 坐标与其速度之间没有关系, 因此偏导 $\frac{\partial q_{i}}{\dot{\partial q_{j}}}=0$ 对于任意 $i,j$ 成立
* 注意绝大部分参数均存在对于时间的导数 $\frac{\mathrm{d}}{\mathrm{d}t}x\neq 0$, 注意乘法的求导法则
* ==注意链式法则的使用, 例如 $\frac{\mathrm{d}}{\mathrm{d}t}r^2=2r\frac{\mathrm{d}r}{\mathrm{d}t}=2r\dot{r}$==, 根据时间 $t$ 求导时, 往往会出现被求导参数 $x$ 关于时间的导数 $\dot{x}$  
对参数求导时则需要使用以上规则判断 $\frac{\partial}{\partial \dot{q_i}}\dot{q_i}^2=2q_i\frac{\partial \dot{q_i}}{\partial \dot{q_i}}=2q_i$

### 拉格朗日方程使用示例
以二维平面下单个质点为例, 假设质点受到合力 $\vec{F}$  
使用极坐标 $\begin{bmatrix}r&\theta\end{bmatrix}^T$ 作为广义坐标有 $\vec{r}=\begin{bmatrix}r\cos\theta& r\sin\theta\end{bmatrix}^T$

首先求出单位矢量与度规系数有
* 对于相对原点的径向长度 $r$ 有 $\frac{\partial \vec{r}}{\partial r}=\begin{bmatrix}\cos\theta& \sin\theta\end{bmatrix}^T$  
因此有单位矢量 $\vec{e}_{r}=\begin{bmatrix}\cos\theta& \sin\theta\end{bmatrix}^T$, 度规系数 $h_r=1$
* 对于相对 $x$ 轴的夹角 $\theta$ 有 $\frac{\partial \vec{r}}{\partial \theta}=\begin{bmatrix}r\sin\theta& -r\cos\theta\end{bmatrix}^T$  
因此有单位矢量 $\vec{e}_{\theta}=\begin{bmatrix}\sin\theta& -\cos\theta\end{bmatrix}^T$, 度规系数 $h_{\theta}=r$

由此得到极坐标下
* 质点的速度满足 $\vec{v}=\dot{r}\vec{e}_r+r\dot{\theta}\vec{e}_\theta$  
* 质点的动能满足 $T=\frac{1}{2}mv^2=\frac{1}{2}m(\dot{r}^2+r^2\dot{\theta}^2)$

在 $r$ 方向上有拉格朗日方程
$$\begin{split}
\vec{F}\cdot\frac{\partial \vec{r}}{\partial r}&=\frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial T}{\partial \dot{r}}-\frac{\partial T}{\partial r}\\
\vec{F}\cdot\vec{e}_r&=\frac{\mathrm{d}}{\mathrm{d}t}(m\dot{r})-mr\dot{\theta}^2\\
F_r&=m(\ddot{r}-r\dot{\theta}^2)
\end{split}$$

在 $\theta$ 方向上有拉格朗日方程
$$\begin{split}
\vec{F}\cdot\frac{\partial \vec{r}}{\partial \theta}&=\frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial T}{\partial \dot{\theta}}-\frac{\partial T}{\partial \theta}\\
h_\theta\vec{F}\cdot\vec{e}_\theta&=\frac{\mathrm{d}}{\mathrm{d}t}(mr^2\dot{\theta})\\
rF_\theta&=m(2r\dot{r}\dot{\theta}+r^2\ddot{\theta})
\end{split}$$

广义力项中, 广义力 $F_r$ 反映了外力在 $r$ 方向的分力, 广义力 $rF_\theta$ 反映了外力相对原点的力矩

### 保守系中的拉格朗日方程
当系统的所有主动力都是保守力, 即仅与位置有关时, 则系统满足机械能守恒, 且具有势能 $V=V(q_1,\dots,q_s)$  

由[虚功与势能](#虚功与势能)的推导可知, 广义力与势能之间满足 $\frac{\partial V}{\partial q_i}=-Q_i$  
又由于主动力为保守力与速度无关, 因此 ==$\frac{\partial V}{\partial \dot{q}_i}=0$==

将势能表示的广义力代入拉格朗日方程中有
$$\begin{split}
-\frac{\partial V}{\partial q_i}&=\frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial T}{\partial \dot{q_i}}-\frac{\partial T}{\partial q_i}\\
0&=\frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial T}{\partial \dot{q_i}}-\frac{\partial (T-V)}{\partial q_i}\\
\frac{\partial L}{\partial q_i}&=\frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial L}{\partial \dot{q_i}}
\end{split}$$

其中定义动能与势能之差为拉格朗日函数 $L$, 满足 (注意与系统的机械能 $W=T+V$ 区分)  
$$L=T-V$$

注意到保守系中的拉格朗日方程不再与具体的力有联系  
此时分析系统在保守力下的运动不再需要分析具体的力, 只需要确定系统的能量即可

### 一般力系中的拉格朗日方程
在一般力系中, 虽然存在保守力以及相应的势能 $V$, 但依然存在部分与保守力无关的主动力 $\vec{F}$  

扩展[虚功与势能](#虚功与势能)中的结论, 当物体受到与保守力 $\vec{F}_V$ 与非保守外力 $\vec{F}$ 时, $\frac{\partial V}{\partial q_i}$ 仅能表示来自保守力的广义力 $Q_{Vi}$ , 而剩余的非保守外力的广义力 $Q_{i}'$ 依然保留在方程中  

$$\begin{split}
Q_i'-\frac{\partial V}{\partial q_i}&=\frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial T}{\partial \dot{q_i}}-\frac{\partial T}{\partial q_i}\\
Q_i'&=\frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial L}{\partial \dot{q_i}}-\frac{\partial L}{\partial q_i}
\end{split}$$

## 质点系与刚体的分析力学
<Badge type="warning" text="TO DO" vertical="top" />

