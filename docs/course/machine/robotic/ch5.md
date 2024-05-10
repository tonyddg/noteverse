# 操作臂动力学
## 单刚体动力学
### 惯性张量
#### 空间角动量
角动量即质点在坐标系中的位置 $\bm{r}$ 与质点动量 $\bm{p}$ 之间的交叉积, 满足
$$\begin{split}
\bm{j}&=\bm{r}\times\bm{p}\\
\bm{j}&=\bm{r}\times(\bm{\omega}\times\bm{r})m
\end{split}$$

对于空间物体, 角动量则通过对质点的积分得到
$$\begin{split}
\mathrm{d}\bm{j}&=\bm{r}\times(\bm{\omega}\times\bm{r})\mathrm{d}m\\
\mathrm{d}\bm{j}&=-[\bm{r}][\bm{r}]^{T}\bm{\omega}\mathrm{d}m\\
\bm{j}&=(\iiint\limits_{m}-[\bm{r}][\bm{r}]^{T}\mathrm{d}m)\bm{\omega}\\
\bm{j}&=\bm{I}\bm{\omega}
\end{split}$$

其中 
* 定义矩阵 $\bm{I}$ 为惯性张量, 反映了刚体的旋转惯性
* 点坐标 $\bm{r}$ 的选取与坐标系有关, 因此角动量 $\bm{j}$ 惯性张量 $\bm{I}$ 以及角速度 $\bm{\omega}$ 与坐标系选取有关  
约定, 通过左上标来表示这些量所在的观察坐标系

#### 惯性矩与惯性积
定义质量惯性矩, 反应了刚体在坐标轴的质量分布, 可得惯性矩必定为正
$$I_{xx}=\iiint\limits_{m}(y^2+z^2)\mathrm{d}m,\;I_{yy}=\iiint\limits_{m}(z^2+x^2)\mathrm{d}m,\;I_{zz}=\iiint\limits_{m}(x^2+y^2)\mathrm{d}m$$

定义质量惯性积, 反应了刚体在坐标轴之间的质量分布, 惯性积可正可负或为 $0$
$$I_{xy}=\iiint\limits_{m}xy\mathrm{d}m,\;I_{yz}=\iiint\limits_{m}yz\mathrm{d}m,\;I_{zx}=\iiint\limits_{m}zx\mathrm{d}m$$

易得惯性张量的元素由惯性矩与惯性积组成, 满足
$$\bm{I}=\begin{bmatrix}
I_{xx}&-I_{xy}&-I_{xz}\\
-I_{yx}&I_{yy}&-I_{yz}\\
-I_{zx}&-I_{zy}&I_{zz}
\end{bmatrix}$$

#### 惯性张量的坐标系变换
通过惯性矩与惯性积的平行移轴定理推广可得, 对于坐标系 $\{\bm{A}\},\{\bm{B}\}$, 当其原点不重合但坐标轴平行时有
$$\begin{cases}
{}^{A}I_{xx}={}^{C}I_{xx}+m({}^{A}y_c^2+{}^{A}z_c^2)\\
{}^{A}I_{xy}={}^{C}I_{xy}-m({}^{A}x_c{}^{A}y_c)
\end{cases}
\to
{}^{A}\bm{I}={}^{C}\bm{I}+m[({}^{A}\bm{p}_{c}^T{}^{A}\bm{p}_{c})\bm{I}_3-{}^{A}\bm{p}_{c}{}^{A}\bm{p}_{c}^T]$$

对于坐标系 $\{\bm{A}\},\{\bm{B}\}$, 当其原点重合但坐标轴不平行时有
$$\begin{split}
{}^{B}\bm{I}&=\iiint\limits_{m}-[{}^{B}_{A}\bm{R}{}^{A}\bm{r}][{}^{B}_{A}\bm{R}{}^{A}\bm{r}]^{T}\mathrm{d}m\\
&=\iiint\limits_{m}-{}^{B}_{A}\bm{R}[{}^{A}\bm{r}]{}^{B}_{A}\bm{R}^T{}^{B}_{A}\bm{R}[{}^{A}\bm{r}]^{T}{}^{B}_{A}\bm{R}^T\mathrm{d}m\\
&={}^{B}_{A}\bm{R}{}^{A}\bm{I}{}^{B}_{A}\bm{R}^T
\end{split}$$

根据惯性张量的坐标系变换与[惯性张量](#惯性矩与惯性积)的形式可得, 惯性张量为一个[实对称矩阵](/course/math/Linear_Algebra/ch7.md#对称矩阵的特性), 通过对角化必定存在
$${}^{A}\bm{I}=\bm{S}\bm{\Lambda} \bm{S}^T$$

令 $\bm{S}={}^{A}_{E}\bm{R},{}^{E}\bm{I}=\bm{\Lambda}$  
可得对于坐标系 $\{\bm{E}\}$, 其惯性积均为 $0$, 惯性张量 ${}^{E}\bm{I}$ 为一个对角矩阵  
称 $\{\bm{E}\}$ 为刚体的惯性主轴 (即 ${}^{A}\bm{I}$ 的特征向量), 此时的惯性矩为惯性主矩 (即 ${}^{A}\bm{I}$ 的特征值)

#### 惯性张量的导数
由于惯性张量是一个与观察坐标系有关的量  
对于固连在刚体上的物体坐标系 $\{\bm{C'}\}$, 显然惯性张量 $\space^{C'}\bm{I}$ 为一个不随刚体位姿变化的常量  
对于固连在大地上的空间坐标系 $\{\bm{C}\}$, 显然惯性张量 ${}^{C}\bm{I}$ 将随时间也就是刚体的位姿不断变化

假设坐标系 $\{\bm{C}\}$ 与 $\{\bm{C'}\}$ 在当前时刻下坐标轴同向且原点重合, 有 ${}^{C}_{C'}\bm{R}=\bm{I}$, ${}^{C}\bm{I}=\space^{C'}\bm{I},\space^{C'}\dot{\bm{I}}=\bm{0}$  
根据[角速度矩阵](ch2.md#角速度矩阵)可得 ${}^{C}_{C'}\dot{\bm{R}}=[{}^{C}\bm{\omega}]{}^{C}_{C'}\bm{R}$

可以推导出以空间坐标系 $\{\bm{C}\}$ 观察的惯性张量 ${}^{C}\bm{I}$ 关于时间的导数满足

$$\begin{split}
{}^{C}\dot{\bm{I}}&=\frac{\mathrm{d}}{\mathrm{d}t}({}^{C}_{C'}\bm{R}\space^{C'}\bm{I}{}^{C}_{C'}\bm{R}^T)\\
&={}^{C}_{C'}\dot{\bm{R}}\space^{C'}\bm{I}{}^{C}_{C'}\bm{R}^T+{}^{C}_{C'}\bm{R}\space^{C'}\bm{I}{}^{C}_{C'}\dot{\bm{R}}^T\\
&=[{}^{C}\bm{\omega}]{}^{C}_{C'}\bm{R}\space^{C'}\bm{I}{}^{C}_{C'}\bm{R}^T+{}^{C}_{C'}\bm{R}\space^{C'}\bm{I}{}^{C}_{C'}\bm{R}^T[{}^{C}\bm{\omega}]^T\\
&=[{}^{C}\bm{\omega}]{}^{C}\bm{I}+{}^{C}\bm{I}[{}^{C}\bm{\omega}]^T
\end{split}$$

因此固连在大地上的坐标系观察下的惯性张量还与刚体当前的角速度有关

### 牛顿欧拉公式
根据达朗贝尔原理, 外力与运动惯性力在任何方向上的代数和为 $0$, 即线动量与角动量的导数等于外力与外力矩, 这也是以下两个平衡方程的依据

定义与大地固连的, 原点在质心上的空间坐标系 $\{\bm{C}\}$ 以及与刚体固连的, 原点在质心上的物体坐标系 $\{\bm{B}\}$

#### 空间坐标系的牛顿力平衡方程
根据牛顿第二定律, 在空间坐标系 $\{\bm{C}\}$ 下, 刚体外力 ${}^{C}\bm{f}$ 与动量 $m{}^{C}\bm{v}$ 之间满足
$${}^{C}\bm{f}=m\frac{\mathrm{d}{}^{C}\bm{v}}{\mathrm{d}t}=m{}^{C}\dot{\bm{v}}$$

#### 物体坐标系的牛顿力平衡方程

将坐标变换到固接在刚体上的物体坐标系 $\{\bm{B}\}$, 有姿态矩阵 ${}^{C}_{B}\bm{R}^T$, 注意由于刚体不断运动, 因此姿态矩阵也将随时间变化  
根据[角速度矩阵](ch2.md#角速度矩阵)可得, 姿态矩阵的导数满足 ${}^{C}_{B}\dot{\bm{R}}={}^{C}_{B}\bm{R}[{}^{B}\bm{\omega}]$

因此将坐标系转换到物体坐标系 $\{\bm{B}\}$ 上时, 牛顿平衡方程为
$$\begin{split}
{}^{B}\bm{f}&={}^{C}_{B}\bm{R}^T{}^{C}\bm{f}=m{}^{C}_{B}\bm{R}^T\frac{\mathrm{d}({}^{C}_{B}\bm{R}{}^{B}\bm{v})}{\mathrm{d}t}\\
&=m{}^{C}_{B}\bm{R}^T({}^{C}_{B}\dot{\bm{R}}{}^{B}\bm{v}+{}^{C}_{B}\bm{R}{}^{B}\dot{\bm{v}})\\
&=m{}^{C}_{B}\bm{R}^T({}^{C}_{B}\bm{R}[{}^{B}\bm{\omega}]{}^{B}\bm{v}+{}^{C}_{B}\bm{R}{}^{B}\dot{\bm{v}})\\
&=m({}^{B}\bm{\omega}\times{}^{B}\bm{v}+{}^{B}\dot{\bm{v}})
\end{split}$$

可得, ${}^{B}\bm{\omega}\times{}^{B}\bm{v}$ 即刚体在自然坐标系下的法向向心加速度, ${}^{B}\dot{\bm{v}}$ 即刚体在自然坐标系下的切向加速度

关于分别讨论物体坐标系与空间坐标系的补充说明  
* 根据[正交曲线坐标系](/course/physic/theoretical_mechanics/ch4.md#正交曲线坐标系)的性质可知, 除了固连在大地上的坐标系观察时, 对坐标矢量求导能直接得到速度, 其他一般的曲线坐标系由于单位矢量相对时间变化, 因此不能直接对坐标求导  
* 而固连在刚体上的坐标系可视为一种特殊的[自然坐标系](/course/physic/theoretical_mechanics/ch4.md#自然坐标系), 显然也不能直接对坐标矢量 ${}^{B}\bm{v}$ 求导, 在以上推导中, 则是通过物体与空间坐标系的转换间接实现
* 对于下文的[物体坐标系的欧拉力矩平衡方程](#物体坐标系的欧拉力矩平衡方程)同理  

#### 空间坐标系的欧拉力矩平衡方程
根据欧拉力矩平衡方程, 在空间坐标系 $\{\bm{C}\}$ 下, 刚体绕任意点旋转时, 外力矩 ${}^{C}\bm{\tau}$ 与角动量 ${}^{C}\bm{I}{}^{C}\bm{\omega}$ 之间满足
$$\begin{split}
{}^{C}\bm{\tau}&=\frac{\mathrm{d}({}^{C}\bm{I}{}^{C}\bm{\omega})}{\mathrm{d}t}\\
&={}^{C}\bm{I}{}^{C}\dot{\bm{\omega}}+{}^{C}\dot{\bm{I}}{}^{C}\bm{\omega}\\
&={}^{C}\bm{I}{}^{C}\dot{\bm{\omega}}+[{}^{C}\bm{\omega}]{}^{C}\bm{I}{}^{C}\bm{\omega}+{}^{C}\bm{I}[{}^{C}\bm{\omega}]^T{}^{C}\bm{\omega}\\
&={}^{C}\bm{I}{}^{C}\dot{\bm{\omega}}+{}^{C}\bm{\omega}\times({}^{C}\bm{I}{}^{C}\bm{\omega})
\end{split}$$

注意空间坐标系下 $\space^C\bm{I}$ [关于时间的导数不为 $0$](#惯性张量的导数), 以及交叉及的性质 $\bm{\omega}[\bm{\omega}]=\bm{0}$

#### 物体坐标系的欧拉力矩平衡方程
类似[牛顿力平衡方程的坐标转换](#牛顿力平衡方程的坐标转换), 将欧拉力矩平衡方程的坐标系从空间坐标系 $\{\bm{C}\}$ 转换到物体坐标系 $\{\bm{B}\}$ 上有

$$\begin{split}
{}^{B}\bm{\tau}&={}^{C}_{B}\bm{R}^T{}^{C}\bm{\tau}={}^{C}_{B}\bm{R}^T\frac{\mathrm{d}({}^{C}_{B}\bm{R}{}^{B}\bm{I}{}^{B}\bm{\omega})}{\mathrm{d}t}\\
&={}^{C}_{B}\bm{R}^T({}^{C}_{B}\dot{\bm{R}}{}^{B}\bm{I}{}^{B}\bm{\omega}+{}^{C}_{B}\bm{R}{}^{B}\dot{\bm{I}}{}^{B}\bm{\omega}+{}^{C}_{B}\bm{R}{}^{B}\bm{I}{}^{B}\dot{\bm{\omega}})\\
&={}^{C}_{B}\bm{R}^T({}^{C}_{B}\bm{R}[{}^{B}\bm{\omega}]{}^{B}\bm{I}{}^{B}\bm{\omega}+{}^{C}_{B}\bm{R}{}^{B}\bm{I}{}^{B}\dot{\bm{\omega}})\\
&=[{}^{B}\bm{\omega}]{}^{B}\bm{I}{}^{B}\bm{\omega}+{}^{B}\bm{I}{}^{B}\dot{\bm{\omega}}\\
&={}^{B}\bm{I}{}^{B}\dot{\bm{\omega}}+{}^{B}\bm{\omega}\times({}^{B}\bm{I}{}^{B}\bm{\omega})
\end{split}$$

注意, 由于 $\{\bm{B}\}$ 是物体坐标系, 因此惯性张量的导数 ${}^{B}\dot{\bm{I}}=\bm{0}$  
可以发现物体坐标系与空间坐标系下的欧拉力矩平衡方程具有相同的形式

### 牛顿欧拉公式的矩阵形式
#### 矩阵形式的导出
对于[物体坐标系的牛顿力平衡方程](#物体坐标系的牛顿力平衡方程)与[物体坐标系的欧拉力矩平衡方程](#物体坐标系的欧拉力矩平衡方程)  
* 其中的力矢量 $\bm{f}$ 与力矩矢量 $\bm{\tau}$ 共同组成了[力线矢量](./ch2.md#力线矢量与速度线矢量) $F$  
* 其中的速度矢量 $\bm{v}$ 与角速度矢量 $\bm{\omega}$ 共同组成了[速度线矢量](./ch2.md#力线矢量与速度线矢量) $V$  

因此可将方程整合为如下关于线矢量的形式

$$\begin{split}
\begin{bmatrix}{}^{B}\bm{f}\\{}^{B}\bm{\tau}\end{bmatrix}=
\begin{bmatrix}
m\bm{I}_3&\bm{0}\\
\bm{0}&{}^{B}\bm{I}
\end{bmatrix}
\begin{bmatrix}{}^{B}\dot{\bm{v}}\\{}^{B}\dot{\bm{\omega}}\end{bmatrix}+
\begin{bmatrix}
[{}^{B}\bm{\omega}]&\bm{0}\\
\bm{0}&[{}^{B}\bm{\omega}]
\end{bmatrix}
\begin{bmatrix}
m\bm{I}_3&\bm{0}\\
\bm{0}&{}^{B}\bm{I}
\end{bmatrix}
\begin{bmatrix}{}^{B}\bm{v}\\{}^{B}\bm{\omega}\end{bmatrix}
\end{split}$$

其中 (定义 $\bm{M}$ 为**空间惯性矩阵**)
$${}^{B}F=\begin{bmatrix}\bm{f}\\\bm{\tau}\end{bmatrix}\quad {}^{B}V=\begin{bmatrix}{}^{B}\bm{v}\\{}^{B}\bm{\omega}\end{bmatrix}\quad \space^B\dot{V}=\begin{bmatrix}{}^{B}\dot{\bm{v}}\\{}^{B}\dot{\bm{\omega}}\end{bmatrix}\quad {}^{B}\bm{M}=\begin{bmatrix}
m\bm{I}_3&\bm{0}\\
\bm{0}&{}^{B}\bm{I}
\end{bmatrix}$$

由于 $[\bm{v}]\bm{v}=\bm{0}$, 因此使用如下矩阵 (定义该矩阵 $\operatorname{ad}({}^{B}V)$ 为**伴随作用矩阵**)
$$\operatorname{ad}({}^{B}V)=\begin{bmatrix}
[{}^{B}\bm{\omega}]&[{}^{B}\bm{v}]\\
\bm{0}&[{}^{B}\bm{\omega}]
\end{bmatrix}=-\begin{bmatrix}
[{}^{B}\bm{\omega}]&\bm{0}\\
[{}^{B}\bm{v}]&[{}^{B}\bm{\omega}]
\end{bmatrix}^T$$

并使用该矩阵代替方程中的矩阵 $\begin{bmatrix}[{}^{B}\bm{\omega}]&\bm{0}\\\bm{0}&[{}^{B}\bm{\omega}]\end{bmatrix}$ 可得牛顿欧拉公式的矩阵形式
$${}^{B}F={}^{B}\bm{M}{}^{B}\dot{V}-\operatorname{ad}^T({}^{B}V)\bm{M}{}^{B}V$$

#### 单刚体的动能
通过空间惯性矩阵与速度线矢量可以将刚体的平动与转动动能整合为一个式子
$$\begin{split}
T&=\frac{1}{2}m{}^{B}\bm{v}^T{}^{B}\bm{v}+\frac{1}{2}{}^{B}\bm{\omega}^T{}^{B}\bm{I}{}^{B}\bm{\omega}\\
&=\frac{1}{2}{}^{B}V^T{}^{B}\bm{M}{}^{B}V
\end{split}$$

由于刚体的动能在任何坐标系下均相同, 因此对于坐标系 $\{\bm{C}\}$ 通过[速度伴随矩阵](./ch2.md#速度线矢量的伴随变换)改变 $V$ 坐标系 有
$$\begin{split}
T&=\frac{1}{2}{}^{C}V^T{}^{C}\bm{M}{}^{C}V\\
&=\frac{1}{2}{}^{B}V^T\operatorname{Ad}_V^T({}^{C}_{B}\bm{T}){}^{C}\bm{M}\operatorname{Ad}_V({}^{C}_{B}\bm{T}){}^{B}V
\end{split}$$

对比可得, [空间惯性矩阵](#矩阵形式的导出)的观察坐标系变换公式为 (注意观察与[惯性张量的坐标系变换](#惯性张量的坐标系变换)的区别)
$$\operatorname{Ad}_V^T({}^{C}_{B}\bm{T}){}^{C}\bm{M}\operatorname{Ad}_V({}^{C}_{B}\bm{T})=\space^B\bm{M}$$

#### 单刚体的空间动量
引入[空间惯性矩阵](#矩阵形式的导出), 使用类似线矢量的方式表示空间动量 $P$ 有

$${}^{B}P=
\begin{bmatrix}
m{}^{B}\bm{v}\\
{}^{B}\bm{I}{}^{B}\bm{\omega}
\end{bmatrix}
={}^{B}\bm{M}{}^{B}V
$$

## 连杆运动的传递
<https://blog.csdn.net/huangjunsheng123/article/details/110249073>

通过相对运动, 牵连运动的合成  
从基座开始向上递推的方式得到各个连杆的具体运动参数

由于操作臂各个关节的运动均明确, 因此可以直接确定连杆 $R_{i+1}$ 相对连杆 $R_{i}$ 的相对运动  
而通过递推, 在计算连杆 $R_{i+1}$ 时, 连杆 $R_{i}$ 的绝对运动即连杆 $R_{i+1}$ 的牵连运动已经确定  
以此合成即可得到连杆 $R_{i+1}$ 的绝对运动

对于连杆 $R_{1}$, 显然基座总是固定的, 因此其牵连运动参数必定全为 $0$, 为递推的实现提供了条件

### 角速度的合成与递推
由于角速度为矢量, 因此绝对角速度 $\bm{\omega}_a$ 可分解为相对角速度 $\bm{\omega}_r$ 与牵连角速度 $\bm{\omega}_e$
$$\bm{\omega}_a=\bm{\omega}_r+\bm{\omega}_e$$

对于空间坐标系 $\{\bm{A}\}$ 中的刚体 $B,C$ 有
* 刚体 $C$ 的绝对角速度为 $\bm{\omega}_a={}^{A}\bm{\omega}_{C}$
* 刚体 $C$ 相对 $B$ 运动的相对角速度 $\bm{\omega}_r={}^{A}_{B}\bm{R}{}^{B}\bm{\omega}_{C}$  
注意, 由于 ${}^{A}_{B}\bm{R}$ 的作用为将表示角速度坐标的观察坐标系从 $\{\bm{B}\}$ 转换为 $\{\bm{A}\}$
* 刚体 $B$ 在空间中的绝对角速度即 $C$ 的牵连角速度 $\bm{\omega}_e={}^{A}\bm{\omega}_{B}$

因此刚体 $B,C$ 间的角速度在空间坐标系 $\{\bm{A}\}$ 下满足关系
$${}^{A}\bm{\omega}_{C}={}^{A}_{B}\bm{R}{}^{B}\bm{\omega}_{C}+{}^{A}\bm{\omega}_{B}$$

假设采用的空间坐标系 $\{\bm{C}'\}$ 在当前时刻 $t$ 下, 与 $\{\bm{C}\}$ 重合, 因此满足 $\space^{C'}_{A}\bm{R}={}^{C}_{A}\bm{R}$  
将上述等式同时乘以 ${}^{C}_{A}\bm{R}$ 有
$$\space^{C'}\bm{\omega}_{C}=\space^{C'}_{B}\bm{R}{}^{B}\bm{\omega}_{C}+\space^{C'}\bm{\omega}_{B}$$

注意
* 其中项 $\space^{C'}_{B}\bm{R}{}^{B}\bm{\omega}_{C}$ 中, ${}^{B}\bm{\omega}_{C}$ 反映了刚体 $B$ 观察下刚体 $C$ 的转动, 而 $\space^{C'}_{B}\bm{R}$ 则将这种观察由坐标系 $\{\bm{B}\}$ 转换到了坐标系 $\{\bm{C}\}$, 因此 $\space^{C'}_{B}\bm{R}{}^{B}\bm{\omega}_{C}$ 并不是 $\{\bm{C}'\}$ 观察下刚体 $C$ 的角速度, 只是以坐标系 $\{\bm{C}'\}$ 表示的相对角速度
* 由上一条引出对于坐标系 $\{\bm{X}\}$ 与 $\{\bm{Y}\}$, 式子 ${}^{X}\bm{\omega}_{A}={}^{X}_{Y}\bm{R}{}^{X}\bm{\omega}_{A}$ 当两个坐标系均为空间坐标系时必定成立, 否则不一定成立, 因此==除了空间坐标系, 角速度不适用一般的坐标变换法则==  
并且旋转矩阵 ${}^{X}_{Y}\bm{R}$ 的观察与描述坐标系具体属性对等式成立没有影响 (均相等)
* 由于 $\{C\}$ 与 $\{C'\}$ 重合, 因此 $\space^{C'}_{B}\bm{R}={}^{C}_{B}\bm{R}$

同样的, 绝对角加速度 $\bm{\alpha}_a$ 也可分解为相对角速度 $\bm{\alpha}_r$ 与牵连角速度 $\bm{\alpha}_e$  
$$\bm{\alpha}_a=\bm{\alpha}_r+\bm{\alpha}_e$$

通过对以上推导得到的相对角速度与牵连角速度分别求导可得绝对角加速度满足
$${}^{A}\bm{\alpha}_{C}={}^{A}_{B}\bm{R}[\space^{B'}\bm{\omega}_{B}]{}^{B}\bm{\omega}_{C}+{}^{A}_{B}\bm{R}{}^{B}\bm{\alpha}_{C}+{}^{A}\bm{\alpha}_{B}$$

### 速度的合成与递推
对于空间中任意一点 $N$ 的速度同理有
$$\bm{v}_{N}^{a}=\bm{v}_{N}^{r}+\bm{v}_{N}^{e}$$

对于空间坐标系 $\{\bm{A}\}$ 中的刚体 $B,C$ 以及刚体 $C$ 上的点 $N$ 有
* 点 $N$ 在刚体 $C$ 上的绝对为 $\bm{v}_N^a={}^{A}\bm{v}_{C_N}$
* 刚体 $C$ 上的点 $N$ 在参考系 $B$ 观察下有相对运动速度 $\bm{v}^r_{N}={}^{A}_{B}\bm{R}{}^{B}\bm{v}_{C_N}$  
使用 ${}^{A}_{B}\bm{R}$ 的原因与[角速度的合成与递推](#角速度的合成与递推)相同
* 点 $N$ 在刚体 $B$  上的绝对角速度即 $C$ 的牵连速度 $\bm{v}_{N}^e={}^{A}\bm{v}_{B_N}$

因此刚体 $B,C$ 间的角速度在空间坐标系 $\{\bm{A}\}$ 下满足关系
$${}^{A}\bm{v}_{C_N}={}^{A}_{B}\bm{R}{}^{B}\bm{v}_{C_N}+{}^{A}\bm{v}_{B_N}$$

类似[角速度的合成与递推](#角速度的合成与递推), 令空间坐标系为 $\{\bm{C}'\}$ 有
$$\space^{C'}\bm{v}_{C_N}=\space^{C'}_{B}\bm{R}{}^{B}\bm{v}_{C_N}+\space^{C'}\bm{v}_{B_N}$$

与角加速度不同, 绝对加速度 $\bm{a}_a$ 在反解时将得到相对角速度 $\bm{\alpha}_r$, 牵连角速度 $\bm{\alpha}_e$ 以及科氏加速度 $2\bm{\omega}\times\bm{v}_r$ ($\bm{\omega}$ 为动系的角速度)
$$\bm{a}_a=\bm{a}_r+\bm{a}_e+2\bm{\omega}\times\bm{v}_r$$

在以上坐标系规则中, 动系 $B$ 的角速度为 ${}^{A}\bm{\omega}_{B}$  
通过对以上推导得到的相对速度与牵连速度分别求导可得绝对加速度满足
$${}^{A}\bm{a}_{C_N}={}^{A}_{B}\bm{R}{}^{B}\bm{a}_{C_N}+{}^{A}\bm{a}_{B_N}+2{}^{A}\bm{\omega}_{B}\times({}^{A}_{B}\bm{R}{}^{B}\bm{v}_{C_N})$$

关于项 ${}^{A}_{B}\bm{R}[\space^{B'}\bm{\omega}_{B}]{}^{B}\bm{v}_{C_N}$ 为何省去暂时未知

### 旋转关节的运动传递
对于操作臂的旋转关节 $J_{i+1}$, 关节固接于连杆 $R_{i+1}$ 上, 与连杆 $R_{i}$ 相连  
令连杆坐标系 $\{i+1\}$ 为 $\{\bm{C}\}$, 连杆坐标系 $\{i\}$ 为 $\{\bm{B}\}$ 可得角速度关系
$$\space^{(i+1)'}\bm{\omega}_{i+1}=\space^{(i+1)'}_{i}\bm{R}{}^{i}\bm{\omega}_{i+1}+\space^{(i+1)'}\bm{\omega}_{i}$$

根据旋转关节的特点可知, 旋转关节上, 连杆 $R_{i+1}$ 相对连杆 $R_{i}$ 绕坐标系 $\{i+1\}$ 的 $z$ 轴以角速度 $\dot{\theta}_{i+1}$ 旋转  
因此在坐标系 $\{i+1\}$ 表示下的相对旋转满足 $\space^{(i+1)'}_{i}\bm{R}{}^{i}\bm{\omega}_{i+1}=\begin{bmatrix}0&0&\dot{\theta}_{i+1}\end{bmatrix}=\dot{\theta}_{i+1}\bm{z}$

观察上式可知, 递推式总是得到连杆 $J_{i}$ 相对空间坐标系 $\{i\}$ 的运动参数, 因此对[空间坐标系下的角速度坐标变换](#角速度与速度的合成), 有牵连角速度 $\space^{(i+1)'}\bm{\omega}_{i}=\space^{(i+1)'}_{i'}\bm{R}\space^{(i)'}\bm{\omega}_{i}$, 其中 $\space^{(i+1)'}_{i'}\bm{R}$ 可根据操作臂运动方程得到

因此可得旋转关节连杆 $R_{i+1}$ 的角速度递推公式为
$$\space^{(i+1)'}\bm{\omega}_{i+1}=\dot{\theta}_{i+1}\bm{z}+\space^{i+1}_{i'}\bm{R}\space^{i'}\bm{\omega}_{i}$$

---
分析角加速度有
$$\space^{(i+1)'}\bm{\alpha}_{i+1}=\space^{(i+1)'}_{i}\bm{R}[\space^{i'}\bm{\omega}_{i}]{}^{i}\bm{\omega}_{i+1}+\space^{(i+1)'}_{i}\bm{R}{}^{i}\bm{\alpha}_{i+1}+\space^{(i+1)'}\bm{\alpha}_{i}$$

对于相对角加速度中的 $\space^{(i+1)'}_{i}\bm{R}{}^{i}\bm{\alpha}_{i+1}$ 项, 与相对角速度的推导类似, 有 $\space^{(i+1)'}_{i}\bm{R}{}^{i}\bm{\alpha}_{i+1}=\ddot{\theta}_{i+1}\bm{z}$ 

对于相对角加速度中的 $\space^{(i+1)'}_{i}\bm{R}[\space^{i'}\bm{\omega}_{i}]{}^{i}\bm{\omega}_{i+1}$ 项, 可根据[交叉积运算](./ch2.md#交叉积与姿态矩阵)进行变形得到 
$$\begin{split}
\space^{(i+1)'}_{i}\bm{R}[\space^{i'}\bm{\omega}_{i}]{}^{i}\bm{\omega}_{i+1}&=(\space^{(i+1)'}_{i}\bm{R}\space^{i'}\bm{\omega}_{i})\times(\space^{(i+1)'}_{i}\bm{R}{}^{i}\bm{\omega}_{i+1})\\
&=(\space^{(i+1)'}_{i}\bm{R}\space^{i'}\bm{\omega}_{i})\times(\dot{\theta}_{i+1}\bm{z})
\end{split}$$

对于牵连角加速度, 与牵连角速度的推导类似, 有 $\space^{(i+1)'}\bm{\alpha}_{i}=\space^{(i+1)'}_{i'}\bm{R}\space^{i'}\bm{\alpha}_{i}$

整合可得旋转关节连杆 $R_{i+1}$ 的角加速度递推公式为
$$\space^{(i+1)'}\bm{\alpha}_{i+1}=(\space^{(i+1)'}_{i}\bm{R}\space^{i'}\bm{\omega}_{i})\times(\dot{\theta}_{i+1}\bm{z})+\ddot{\theta}_{i+1}\bm{z}+\space^{(i+1)'}_{i'}\bm{R}\space^{i'}\bm{\alpha}_{i}$$

---
以坐标系 $\{i+1\}$ 的原点 ${O_{i+1}}$ 为速度分析对象有
$$\space^{(i+1)'}\bm{v}_{(i+1)_{O_{i+1}}}=\space^{(i+1)'}_{i}\bm{R}{}^{i}\bm{v}_{(i+1)_{O_{i+1}}}+\space^{(i+1)'}\bm{v}_{i_{O_{i+1}}}$$

由于旋转关节 $J_{i+1}$ 没有平动, 因此 $\{i+1\}$ 的原点 ${O_{i+1}}$ 在连杆 $i$ 与 $i+1$ 上相对静止, 相对速度 ${}^{i}\bm{v}_{(i+1)_{O_{i+1}}}=\bm{0}$ 

根据[基点法](../../physic/theoretical_mechanics/ch2.md#基点法求速度), 可得有牵连速度
$$\space^{i'}\bm{v}_{i_{O_{i+1}}}=\space^{i'}\bm{\omega}_{i}\times{}^{i}\bm{p}_{(i+1)_{O_{i+1}}}+\space^{i'}\bm{v}_{i_{O_{i+1}}}$$

其中 ${}^{i}\bm{p}_{(i+1)_{O_{i+1}}}$ 即 $\{i+1\}$ 原点在坐标系 $\{i\}$ 上的坐标, $\space^{i'}\bm{\omega}_{i}$ 可根据递推得到  
将牵连速度的观察坐标系由世界坐标系 $\{i'\}$ 转换到 $\{(i+1)'\}$ 后, 可得  
旋转关节连杆 $R_{i+1}$ 的速度递推公式为
$$\space^{(i+1)'}\bm{v}_{(i+1)_{O_{i+1}}}=\space^{i+1}_{i}\bm{R}(\space^{i'}\bm{\omega}_{i}\times{}^{i}\bm{p}_{(i+1)_{O_{i+1}}}+\space^{i'}\bm{v}_{i_{O_{i+1}}})$$

---
以坐标系 $\{i+1\}$ 的原点 ${O_{i+1}}$ 为加速度分析对象有
$$\space^{(i+1)'}\bm{a}_{(i+1)_{O_{i+1}}}=\space^{(i+1)'}_{i}\bm{R}{}^{i}\bm{a}_{(i+1)_{O_{i+1}}}+\space^{(i+1)'}\bm{a}_{i_{O_{i+1}}}+2\space^{(i+1)'}\bm{\omega}_{i}\times(\space^{(i+1)'}_{i}\bm{R}{}^{i}\bm{v}_{(i+1)_{O_{i+1}}})$$

由于旋转关节 $J_{i+1}$ 没有平动, 因此 ${}^{i}\bm{v}_{(i+1)_{O_{i+1}}}={}^{i}\bm{a}_{(i+1)_{O_{i+1}}}=\bm{0}$, 只剩下牵连加速度项  
对于牵连加速度 $\space^{(i+1)'}\bm{a}_{i_{O_{i+1}}}$, 根据[基点法](../../physic/theoretical_mechanics/ch2.md#基点法求加速度)有
$$\space^{i'}\bm{a}_{i_{O_{i+1}}}=\space^{i'}\bm{a}_{i_{O_i}}+\space^{i'}\bm{\alpha}_{i}\times{}^{i}\bm{p}_{O_{i+1}}+\space^{i'}\bm{\omega}_{i}\times\space^{i'}\bm{\omega}_{i}\times{}^{i}\bm{p}_{O_{i+1}}$$

因此旋转关节连杆 $R_{i+1}$ 的加速度递推公式为
$$\space^{(i+1)'}\bm{a}_{(i+1)_{O_{i+1}}}=\space^{(i+1)'}_{i'}\bm{R}(\space^{i'}\bm{a}_{i_{O_i}}+\space^{i'}\bm{\alpha}_{i}\times{}^{i}\bm{p}_{O_{i+1}}+\space^{i'}\bm{\omega}_{i}\times\space^{i'}\bm{\omega}_{i}\times{}^{i}\bm{p}_{O_{i+1}})$$


### 平动关节的递推
使用同样的坐标系规定  
由于平动关节 $J_{i+1}$ 没有旋转, 因此连杆 $R_{i+1}$ 相对 $R_{i}$ 没有相对转动, 因此只有牵连角速度  
类似[旋转关节的运动传递](#旋转关节的运动传递)可得牵连角速度满足 $\space^{(i+1)'}\bm{\omega}_{i}=\space^{(i+1)'}_{i'}\bm{R}\space^{(i)'}\bm{\omega}_{i}$

因此平动关节连杆 $R_{i+1}$ 的角速度递推公式为
$$\space^{(i+1)'}\bm{\omega}_{i+1}=\space^{(i+1)'}_{i'}\bm{R}\space^{i'}\bm{\omega}_{i}$$

---
使用同样的坐标系分析角加速度  
平动关节不存在相对角加速度, 牵连角加速度与[旋转关节的运动传递](#旋转关节的运动传递)的分析类似  
因此平动关节连杆 $R_{i+1}$ 的角加速度递推公式为
$$\space^{(i+1)'}\bm{\alpha}_{i+1}=\space^{(i+1)'}_{i'}\bm{R}\space^{i'}\bm{\alpha}_{i}$$

---
以坐标系 $\{i+1\}$ 的原点 ${O_{i+1}}$ 为速度分析对象有

根据平动关节的特点可知, 平动关节上, $\{i+1\}$ 的原点 ${O_{i+1}}$ 相对连杆 $i$ 沿坐标系 $\{i+1\}$ 的 $z$ 轴以速度 $\dot{d}_{i+1}$ 平动  
因此在坐标系 $\{i+1\}$ 表示下点 $(i+1)_{O_{i+1}}$ 相对平动满足 $\space^{(i+1)'}_{i}\bm{R}{}^{i}\bm{v}_{(i+1)_{O_{i+1}}}=\begin{bmatrix}0&0&\dot{d}_{i+1}\end{bmatrix}=\dot{d}_{i+1}\bm{z}$

类似[旋转关节的运动传递](#旋转关节的运动传递)可得牵连速度满足 $\space^{i'}\bm{v}_{i_{O_{i+1}}}=\space^{i'}\bm{\omega}_{i}\times{}^{i}\bm{p}_{(i+1)_{O_{i+1}}}+\space^{i'}\bm{v}_{i_{O_{i+1}}}$

因此平动关节连杆 $R_{i+1}$ 的速度递推公式为
$$\space^{(i+1)'}\bm{v}_{(i+1)_{O_{i+1}}}=\space^{i+1}_{i}\bm{R}(\space^{i'}\bm{\omega}_{i}\times{}^{i}\bm{p}_{(i+1)_{O_{i+1}}}+\space^{i'}\bm{v}_{i_{O_{i+1}}})+\dot{d}_{i+1}\bm{z}$$

---
以坐标系 $\{i+1\}$ 的原点 ${O_{i+1}}$ 为速度分析对象有

对于相对加速度项 $\space^{(i+1)'}_{i}\bm{R}{}^{i}\bm{a}_{(i+1)_{O_{i+1}}}$, 类似速度分析, 该项满足 $\space^{(i+1)'}_{i}\bm{R}{}^{i}\bm{a}_{(i+1)_{O_{i+1}}}=\ddot{d}_{i+1}\bm{z}$

牵连加速度项 $\space^{i'}\bm{v}_{i_{O_{i+1}}}$ 与[旋转关节的运动传递](#旋转关节的运动传递)中的牵连加速度类似

科氏加速度项则可表示为 $2\space^{(i+1)'}\bm{\omega}_{i}\times(\space^{(i+1)'}_{i}\bm{R}{}^{i}\bm{v}_{(i+1)_{O_{i+1}}})=2\space^{(i+1)'}_{i'}\bm{R}\space^{i'}\bm{\omega}_{i}\times(\dot{d}_{i+1}\bm{z})$

因此平动关节连杆 $R_{i+1}$ 的加速度递推公式为
$$\begin{split}
&\space^{(i+1)'}\bm{a}_{(i+1)_{O_{i+1}}}=\\
&\ddot{d}_{i+1}\bm{z}+\space^{(i+1)'}_{i'}\bm{R}(\space^{i'}\bm{a}_{i_{O_i}}+\space^{i'}\bm{\alpha}_{i}\times{}^{i}\bm{p}_{O_{i+1}}+\space^{i'}\bm{\omega}_{i}\times\space^{i'}\bm{\omega}_{i}\times{}^{i}\bm{p}_{O_{i+1}})+2\space^{(i+1)'}_{i'}\bm{R}\space^{i'}\bm{\omega}_{i}\times(\dot{d}_{i+1}\bm{z})
\end{split}$$

### 连杆质心速度与加速度
对于连杆 $R_i$ 的质心 $C_i$, 作为刚体上的一点, 可通过基点法得出连杆质心的速度与加速度

连杆质心的速度满足
$$\space^{i'}\bm{v}_{i_{C_i}}=\space^{i'}\bm{v}_{i_{O_i}}+\space^{i'}\bm{\omega}_{i}\times{}^{i}\bm{p}_{C_i}$$

连杆质心的加速度满足
$$\space^{i'}\bm{a}_{i_{C_i}}=\space^{i'}\bm{a}_{i_{O_i}}+\space^{i'}\bm{\alpha}_{i}\times{}^{i}\bm{p}_{C_i}+\space^{i'}\bm{\omega}_{i}\times\space^{i'}\bm{\omega}_{i}\times{}^{i}\bm{p}_{C_i}$$

### 连杆力与力矩的传递
不考虑重力, 连杆 $i$ 所受的外力来自两端
* 在关节 $J_i$ 一侧受到来自驱动器的驱动力与约束力 ${}^{i}\bm{f}_{i}$ (假设该力作用在点 $O_i$ 上)  
以及相应的驱动力矩 ${}^{i}\bm{\tau}_{i}$ 
* 在关节 $J_{i+1}$ 一侧受到来自上一个关节驱动力与约束力的反作用力 $-{}^{i}_{i+1}\bm{R}\space^{i+1}\bm{f}_{i+1}$ (假设该力作用在点 $O_{i+1}$ 上)  
以及相应的驱动力矩 $-{}^{i}_{i+1}\bm{R}\space^{i+1}\bm{\tau}_{i+1}$ 

由[空间坐标系的牛顿力平衡方程](#空间坐标系的牛顿力平衡方程)可得, 对于连杆的质心 $C_i$, 连杆上有力平衡方程
$${}^{i}\bm{f}_{Ci}={}^{i}\bm{f}_{i}-{}^{i}_{i+1}\bm{R}\space^{i+1}\bm{f}_{i+1}$$

由[空间坐标系的欧拉力矩平衡方程](#空间坐标系的欧拉力矩平衡方程)可得, 对于连杆的质心 $C_i$, 连杆上有力矩平衡方程
$$\begin{split}
{}^{i}\bm{\tau}_{Ci}&={}^{i}\bm{\tau}_{i}-{}^{i}_{i+1}\bm{R}\space^{i+1}\bm{\tau}_{i+1}+{}^{i}\bm{p}_{C_iO_i}\times{}^{i}\bm{f}_{i}-{}^{i}\bm{p}_{C_iO_{i+1}}\times{}^{i}_{i+1}\bm{R}\space^{i+1}\bm{f}_{i+1}\\
&={}^{i}\bm{\tau}_{i}-{}^{i}_{i+1}\bm{R}\space^{i+1}\bm{\tau}_{i+1}-{}^{i}\bm{p}_{C_i}\times{}^{i}\bm{f}_{Ci}-{}^{i}\bm{p}_{O_{i+1}}\times{}^{i}_{i+1}\bm{R}\space^{i+1}\bm{f}_{i+1}
\end{split}$$

通过以上两个平衡方程, 以及牛顿欧拉公式计算出的 ${}^{i}\bm{f}_{Ci},{}^{i}\bm{\tau}_{Ci}$, 即可从关节 $J_n$ 的驱动力与约束力的合力及合力矩递推到关节 $J_i$ 的力与力矩以及基座 $J_0$

其中注意
* 对于 $\space^{n+1}\bm{f}_{n+1}$ 与 $\space^{n+1}\bm{\tau}_{n+1}$, 当操作臂与外界接触时, 则表明为外界对执行器的外力, 否则为 $0$
* 与运动参数的递推不同, 在力与力矩的递推中, 由于基座的支持力未知, 因此需要从关节 $J_n$ 递推回基座
* 对于旋转关节 $J_i$, 其驱动力必定为绕 ${}^{i}\bm{z}_i$ 的力矩, 因此关节的广义驱动力为 $\tau_i={}^{i}\bm{\tau}_{i}^T{}^{i}\bm{z}_i$
* 对于平动关节 $J_i$, 其驱动力必定为沿 ${}^{i}\bm{z}_i$ 的力, 因此关节的广义驱动力为 $\tau_i={}^{i}\bm{f}_{i}^T{}^{i}\bm{z}_i$

