---
order: 4
---

# 操作臂的雅可比矩阵
## 雅可比矩阵
### 雅可比矩阵的基本定义
已知
* 变量矢量 $\bm{x}=\begin{bmatrix}x_1& x_2& \dots&x_n\end{bmatrix}^T\in \R^{n}$
* 矢量函数 $\bm{f}(\bm{x})=\begin{bmatrix}f_1(\bm{x})&f_2(\bm{x})& \dots&f_m(\bm{x})\end{bmatrix}^T\in \R^{m}$

定义雅可比矩阵
$$
\bm{J}(\bm{x})=\frac{\partial\bm{f}(\bm{x})}{\partial\bm{x}}=\begin{bmatrix}
\frac{\partial f_1}{\partial x_1} & \frac{\partial f_1}{\partial x_2} & \dots & \frac{\partial f_1}{\partial x_n}\\
\frac{\partial f_2}{\partial x_1} & \frac{\partial f_2}{\partial x_2} & \dots & \frac{\partial f_2}{\partial x_n}\\
\vdots&\vdots&\ddots&\vdots\\
\frac{\partial f_m}{\partial x_1} & \frac{\partial f_m}{\partial x_2} & \dots & \frac{\partial f_m}{\partial x_n}
\end{bmatrix}\in \R^{m\times n}
$$

由定义可得
* 矩阵的第 $i$ 行第 $j$ 列为多元函数 $f_i(\bm{x})$ 关于变量 $x_j$ 的偏导数 $\frac{\partial f_i}{\partial x_j}(\bm{x})$
* 矩阵的行数由矢量函数的行数 $\bm{f}$ 决定, 矩阵的列数由变量矢量 $\bm{x}$ 决定

通过雅可比矩阵, 表明了矢量函数各个元素全微分与微分变量矢量之间的关系
$$
\mathrm{d}\bm{f}(\bm{x})=\begin{bmatrix}\mathrm{d}f_1(\bm{x})\\\mathrm{d}f_2(\bm{x})\\\vdots\\\mathrm{d}f_m(\bm{x})\end{bmatrix}
=\begin{bmatrix}
\frac{\partial f_1}{\partial x_1} & \frac{\partial f_1}{\partial x_2} & \dots & \frac{\partial f_1}{\partial x_n}\\
\frac{\partial f_2}{\partial x_1} & \frac{\partial f_2}{\partial x_2} & \dots & \frac{\partial f_2}{\partial x_n}\\
\vdots&\vdots&\ddots&\vdots\\
\frac{\partial f_m}{\partial x_1} & \frac{\partial f_m}{\partial x_2} & \dots & \frac{\partial f_m}{\partial x_n}
\end{bmatrix}\begin{bmatrix}\mathrm{d}x_1\\ \mathrm{d}x_2\\ \vdots\\\mathrm{d}x_n\end{bmatrix}=
\bm{J}(\bm{x})\mathrm{d}\bm{x}
$$

将等式除以时间微元 $\mathrm{d}t$ 有
$$\dot{\bm{f}}(\bm{x})=\begin{bmatrix}\dot{f_1}(\bm{x})\\\dot{f_2}(\bm{x})\\\vdots\\\dot{f_m}(\bm{x})\end{bmatrix}=
\bm{J}(\bm{x})\begin{bmatrix}\dot{x_1}\\ \dot{x_2}\\ \vdots\\\dot{x_n}\end{bmatrix}=
\bm{J}(\bm{x})\dot{\bm{x}}
$$

### 平面操作臂雅可比矩阵示例
![](./src/ch4_plane_hand.drawio.svg)

将操作臂的关节变量作为变量矢量 $\bm{\theta}=\begin{bmatrix}\theta_1&\theta_2\end{bmatrix}^T$  
将操作臂末端点 ${}^{0}\bm{p}_T=\begin{bmatrix}x&y\end{bmatrix}^T$ 作为矢量函数  
存在关系 (第一根连杆长 $l_1$, 第二根连杆长 $l_2$)
$$\begin{cases}
x=l_1\cos\theta_1+l_2\cos(\theta_1+\theta_2)\\
y=l_1\sin\theta_1+l_2\sin(\theta_1+\theta_2)
\end{cases}$$

通过求导可得该操作臂的速度雅可比矩阵为
$$\bm{J}(\bm{\theta})=\begin{bmatrix}
-l_1\sin\theta_1-l_2\sin(\theta_1+\theta_2)&-l_2\sin(\theta_1+\theta_2)\\
l_1\cos\theta_1+l_2\cos(\theta_1+\theta_2)&l_2\cos(\theta_1+\theta_2)
\end{bmatrix}$$

满足
$$\begin{bmatrix} {}^{s}v_x\\ {}^{s}v_y\end{bmatrix}=
\bm{J}(\bm{\theta})
\begin{bmatrix}\dot{\theta}_1\\\dot{\theta}_2\end{bmatrix}$$

### 操作臂雅可比矩阵的意义
在操作臂运动学中, 通常将[关节空间](./ch3.md#三种描述空间)中的关节变量矢量 $\bm{q}$ 作为变量矢量, 将[操作空间](./ch3.md#三种描述空间)中的元素作为矢量函数, 将两者的雅可比矩阵称为操作臂雅可比矩阵  
由[雅可比矩阵的基本定义](#雅可比矩阵的基本定义)可知, 操作比雅可比矩阵描述了关节变量相对时间的导数 (即关节转动或平动速度) 相对于操作臂末端执行器的位姿相对时间的变化 (对于三维空间, 一般将==末端执行器视为刚体==, 使用==末端执行器的[速度线矢量](./ch2.md#力线矢量与速度线矢量)==) 的映射, 满足 ($D$ 为[微分运动矢量](./ch2.md#微分运动算子))
$$D=\bm{J}(\bm{q})\mathrm{d}\bm{q}\to V=\begin{bmatrix}\bm{v}\\\bm{\omega}\end{bmatrix}=\bm{J}(\bm{q})\dot{\bm{q}}$$

当雅可比矩阵 $\bm{J}(\bm{q})$ 行满秩时, 表明总是存在一组特定的关节速度 $\dot{\bm{q}}$ 使当前操作臂的末端执行器以任意速度运动  
反之, 当行不满秩时, 操作臂末端只能以特定形式的速度运行, 称此时的操作臂 $\bm{q}$ 处于**奇异状态**

综上可知
* 操作臂的雅可比矩阵有形状 $m\times n$, 其中 
    * $m$ 为操作空间的维数, 对于三维空间一般为 $6$
    * $n$ 为操作臂的关节数, 因此三维空间中的雅可比矩阵行数一定为 $6$, 但列数不固定
* 以三维空间为例, 当操作臂的关节数 $n$ 少于 $6$ 时, 雅可比矩阵行必定不满秩, 因此总是处于奇异状态
* 对于三维空间的 $6$ 关节操作臂, 此时雅可比矩阵为 $6\times 6$ 的方阵, 因此可通过行列式 $\begin{vmatrix}\bm{J}(\bm{q})\end{vmatrix}=0$ 判断操作臂当前是否处于奇异状态
* 对于不同的观察坐标系, 速度线矢量不同, 同样的, 这些不同观察坐标系下对应的雅可比矩阵也不同  
通常情况下, ==总是将速度线矢量 $V$ 的原点固连在手腕坐标系原点 $\bm{p}_{O_n}$ 上==, 但坐标轴的方向可能不同
    * 使用 $\bm{J}(\bm{q})$ 表示[基座标](./ch3.md#坐标系规定) $\{\bm{B}\}$ 下的雅可比矩阵, 此时得到的速度线矢量的==观察坐标系的坐标轴平行于基坐标系== (注意原点依然在手腕坐标系原点 $\bm{p}_{O_n}$ 上), 定义该坐标系为 $\{\bm{W_0}\}$
    * 使用 ${}^{T}\bm{J}(\bm{q})$ 表示[手腕坐标系](./ch3.md#坐标系规定) $\{\bm{W}\}$ (即末端连杆 $\{n\}$) 下的雅可比矩阵, 此时得到的速度线矢量以工具坐标系 $\{\bm{W}\}$ 为观察坐标系

## 雅可比矩阵的构造
虽然雅可比矩阵来自于求导, 但在三维空间中, 不易于使用, 因此更多使用构造的方法  
以下内容均默认以三维空间为讨论范围, 并默认以线速度 $V$ 表示操作臂的末端速度

### 雅可比矩阵的分解
根据矩阵乘法的定义可知, 对于雅可比矩阵的第 $i$ 列 $\bm{J}_i(\bm{q})$, 关节变量的运动速度 $\dot{\bm{q}}$ 与末端速度线矢量 $V$ 之间存在线性关系
$$V=\sum_{i=1}^n\bm{J}_i(\bm{q})\dot{q}_i$$

因此可分别找出关节 $i$ 的运动对末端速度的影响 $\bm{J}_i(\bm{q})$, 通过组合即可得到操作臂的速度雅可比矩阵 $\bm{J}(\bm{q})$  
在雅可比矩阵的构造中, 将连杆 $i$ 及其后的操作臂所有部分均视为一个刚体 $B_i$, ==末端执行器即刚体上的一部分==  

假设其他关节静止, 关节 $i$ 以速度 $q_i$ 绕 ${}^{0}\bm{z}_i$ 旋转或沿 ${}^{0}\bm{z}_i$ 平移时  
关节方向决定了速度线矢量的方向 $L^r_i$, 关节速度决定了速度线矢量的幅值 $q_i$, 两者的乘积即该关节对末端执行器的运动 $V_i$  
由[速度雅可比矩阵的分解](#速度雅可比矩阵的分解)可得, 线矢量 $L^r_i$ 即雅可比矩阵的分量 $\bm{J}_i(\bm{q})=L^r_i$

### 矢量积方法构造雅可比矩阵
该方法构造时, 始终以基座标系的坐标轴与工具坐标系原点 $\bm{p}_{O_n}$ 组合而成的坐标系为观察坐标系 $\{\bm{W_0}\}$  
虽然使用了 ${}^{0}\bm{z}_{i}$, 但该矢量是表示方向的自由矢量, 因此与原点位置无关

对于平动关节的情况  
刚体 $B_i$ 的旋转轴 $\bm{n}=\bm{0}$, 线速度方向 $\bm{r}\times\bm{n}= {}^{0}\bm{z}_{i}$, 因此有
$$\bm{J}_i(\bm{q})= {}^{0}L^r_i=\begin{bmatrix}
{}^{0}\bm{z}_{i}\\
\bm{0}
\end{bmatrix}$$

对于旋转关节的情况  
刚体 $B_i$ 旋转轴方向为 $\bm{n}= {}^{0}\bm{z}_{i}$  
由==观察坐标系下的末端关节原点== ${}^{0}\bm{p}_{O_n}$ 指向旋转轴上一点 ${}^{0}\bm{p}_{O_i}$ 有 $\bm{r}= {}^{0}\bm{p}_{O_i}- {}^{0}\bm{p}_{O_n}= {}^{0}\bm{p}_{O_nO_i}$ (==注意相减次序==)  
这些点的坐标可通过变换矩阵 ${^{0}_{i}\bm{T}}$ 的第四列找出    
因此有
$$\bm{J}_i(\bm{q})= {}^{0}L^r_i=
\begin{bmatrix}
\bm{r}\times\bm{n}\\
\bm{n}
\end{bmatrix}=
\begin{bmatrix}
{}^{0}\bm{p}_{O_nO_i}\times {}^{0}\bm{z}_{i}\\
{}^{0}\bm{z}_{i}
\end{bmatrix}$$

### 微分变换法构造雅可比矩阵
该方法构造时, 始终以手腕坐标系 $\{\bm{W}\}$ 为观察坐标系  
首先以连杆坐标系 $\{i\}$ 为观察坐标系得到 ${}^{i}L^r$, 然后使用[速度线矢量的伴随矩阵](./ch2.md#速度线矢量的伴随变换) $\operatorname{Ad}_V( {}^{i}_{n}\bm{T})$, 将观察坐标系转移到 $\{\bm{W}\}$ 上

将 $\bm{ {}^{i}_{n}T}$ 展开有
$$\bm{ {}^{i}_{n}T}=\begin{bmatrix}
{}^{i}x_{x}& {}^{i}y_{x}& {}^{i}z_{x}& {}^{i}p_{O_nx}\\
{}^{i}x_{y}& {}^{i}y_{y}& {}^{i}z_{y}& {}^{i}p_{O_nx}\\
{}^{i}x_{z}& {}^{i}y_{z}& {}^{i}z_{z}& {}^{i}p_{O_nx}\\
0&0&0&1
\end{bmatrix}$$

对于平动关节的情况  
刚体 $B_i$ 的旋转轴 $\bm{n}=\bm{0}$ 线速度方向为 ${}^{i}\bm{z}_i=\begin{bmatrix}0&0&1\end{bmatrix}^T$, 因此有
$${}^{i}L^r_i=\begin{bmatrix}0\\0\\1\\-\\\bm{0}\end{bmatrix}\\
{}^{T}\bm{J}_i(\bm{q})= {}^{n}L^r_i=\operatorname{Ad}_V^{-1}(\bm{ {}^{i}_{n}T}) {}^{i}L^r_i=\begin{bmatrix}\bm{ {}^{i}_{n}\bm{R}^T {}^{i}\bm{z}_i}\\-\\\bm{0}\end{bmatrix}=\begin{bmatrix} {}^{i}x_{z}\\ {}^{i}y_{z}\\ {}^{i}z_{z}\\-\\\bm{0}\end{bmatrix}$$

对于旋转关节的情况  
刚体 $B_i$ 旋转轴方向为 $\bm{n}= {}^{i}\bm{z}_i=\begin{bmatrix}0&0&1\end{bmatrix}^T$  
旋转轴就在原点上, 有 $\bm{r}=\bm{0}$  
因此有
$${}^{i}L^r_i=\begin{bmatrix}\bm{0}\\-\\0\\0\\1\end{bmatrix}\\
{}^{T}\bm{J}_i(\bm{q})=
{}^{n}L^r_i=
\operatorname{Ad}_V^{-1}(\bm{ {}^{i}_{n}T}) {}^{i}L^r_i=
\begin{bmatrix}-\bm{ {}^{i}_{n}\bm{R}^T[ {}^{i}\bm{p}_{O_n}] {}^{i}\bm{z}_i}\\  {}^{i}_{n}\bm{R}^T {}^{i}\bm{z}_i\end{bmatrix}=
\begin{bmatrix} {}^{n}\bm{p}_{O_iO_n}\times\begin{bmatrix} {}^{i}x_{z}\\ {}^{i}y_{z}\\ {}^{i}z_{z}\end{bmatrix}\\ {}^{i}x_{z}\\ {}^{i}y_{z}\\ {}^{i}z_{z}\end{bmatrix}$$

对于旋转关节中的速度矢量 $\bm{v}$, 上述公式基于[交叉积与姿态矩阵](./ch2.md#交叉积与姿态矩阵)的推论得到 (其中 ${}^{i}_{n}\bm{R}^T {}^{i}\bm{p}_{O_n}= {}^{n}\bm{p}_{O_iO_n}$)  
部分情况下也写为以下的等价形式 (将 ${}^{i}_{n}\bm{R}^T$ 各行用于叉乘, 参见[向量交叉积](/course/math/Linear_Algebra/ch5.md#向量交叉积)的性质)
$${}^{T}\bm{J}_i(\bm{q})=\begin{bmatrix}( {}^{i}\bm{p}_{O_n}\times  {}^{i}\bm{x})_z\\( {}^{i}\bm{p}_{O_n}\times  {}^{i}\bm{y})_z\\( {}^{i}\bm{p}_{O_n}\times  {}^{i}\bm{z})_z\\ {}^{i}x_{z}\\ {}^{i}y_{z}\\ {}^{i}z_{z}\end{bmatrix}$$

### 两种坐标系下雅可比矩阵的转换
由[操作臂雅可比矩阵的意义](#操作臂雅可比矩阵的意义)可知, 雅可比矩阵存在两种表示观察坐标系 $\{\bm{W_0}\},\{\bm{W}\}$  
由于两个坐标系的原点重合, 坐标系变换时仅有旋转, 以 $\{\bm{W_0}\}$ 观察坐标系 $\{\bm{W}\}$ 时有齐次矩阵
$${}^{W_0}_{W}\bm{T}=\begin{bmatrix}
{}^{0}_{n}\bm{R}&\bm{0}\\
\bm{0}&1
\end{bmatrix}$$

根据[旋转伴随变换](./ch2.md#旋转伴随变换)可得, 相应的有速度线矢量伴随变换矩阵
$$
\operatorname{Ad}_V( {}^{W_0}_{W}\bm{T})=\begin{bmatrix}
{}^{0}_{n}\bm{R}&\bm{0}\\
\bm{0}& {}^{0}_{n}\bm{R}
\end{bmatrix}\;
\operatorname{Ad}_V^{-1}( {}^{W_0}_{W}\bm{T})=\begin{bmatrix}
{}^{0}_{n}\bm{R}^T&\bm{0}\\
\bm{0}& {}^{0}_{n}\bm{R}^T
\end{bmatrix}
$$

由[速度雅可比矩阵的分解](#速度雅可比矩阵的分解), 可知雅可比矩阵本质由 $n$ 列速度线矢量 $V$ 组成  
因此两种形式的雅可比矩阵之间存在转换关系
$$\operatorname{Ad}_V^{-1}( {}^{W_0}_{W}\bm{T})\bm{J}(\bm{q})= {}^{T}\bm{J}(\bm{q})$$

### 末端执行器雅可比矩阵的构造
对于位于末端连杆上的末端执行器点 $T$, 同样可使用[矢量积法](#矢量积方法构造雅可比矩阵)或[微分变换法](#微分变换法构造雅可比矩阵)构造关于末端执行器的雅可比矩阵

此时的坐标规则与[固连在末端手腕](#操作臂雅可比矩阵的意义)的规则类似, 同样分为以末端执行观察 $\{\bm{T}\}$ 与以平行于基坐标系的, 固连在末端执行器上的坐标系 $\{\bm{T}_0\}$ 观察两种  
因此[观察坐标系](#两种坐标系下雅可比矩阵的转换)中, 只需要改用 ${^{0}_{T}\bm{R}}$ 即可

由于末端执行器与末端关节原点在同一刚体上
* 对于[矢量积法](#矢量积方法构造雅可比矩阵), 仅需在旋转关节改用矢量 ${^{0}\bm{p}_{O_nO_i}}\to{^{0}\bm{p}_{TO_i}}$
* 对于[微分变换法](#微分变换法构造雅可比矩阵), 仅需改用变换矩阵 ${^{i}_{n}\bm{T}}\to{^{i}_{T}\bm{T}}$

### 力雅可比矩阵
在以上讨论中, 均是以操作空间以及关节空间关于时间的导数, 即速度在讨论的, 因此也称为**速度雅可比矩阵** $\bm{J}_V$  
速度雅可比矩阵 $\bm{J}_V$ 反映了由关节空间速度向操作空间速度的映射关系  
与之对应的, **力雅可比矩阵** $\bm{J}_F$ 则反映了操作空间受力向关节空间受力的映射关系, 满足
$$\bm{\tau}=\bm{J}_F(\bm{q})F$$

因此对于末端执行器所受的外载荷表示为[力线矢量](./ch2.md#力线矢量与速度线矢量) $F$ (坐标系选择与[速度雅可比矩阵](#操作臂雅可比矩阵的意义)相同) 与各关节为了保持平衡产生广义约束力组成的矢量 $\bm{\tau}$

根据虚功原理, 当系统处于平衡状态时, 外载荷 $F$ 所作产生的功率与关节约束力 $\bm{\tau}$ 产生的功率应当相同有
$$\begin{cases}
P_o=F^{T}V=f_xv_x+f_yv_y+f_zv_z+m_x\omega_x+m_y\omega_y+m_z\omega_z\\
P_q=\bm{\tau}^T\dot{\bm{q}}=\sum \tau_i\dot{q_i}
\end{cases}$$

此外, 根据[速度雅可比矩阵的意义](#操作臂雅可比矩阵的意义)可得, 操作空间的末端执行器速度 $V$ 与关节速度矢量 $\dot{\bm{q}}$ 满足 $V=\bm{J}_V(\bm{q})\dot{\bm{q}}$, 因此
$$\begin{split}
P_o&=P_q\\
F^{T}V&=\bm{\tau}^T\dot{\bm{q}}\\
F^{T}\bm{J}_V(\bm{q})&=\bm{\tau}^T\\
\bm{\tau}&=\bm{J}_V^T(\bm{q})F
\end{split}$$

由以上推导可得, 速度雅可比矩阵与力雅可比矩阵之间满足关系
$$\bm{J}_F(\bm{q})=\bm{J}_V^T(\bm{q})$$

因此习惯上直接使用雅可比矩阵 $\bm{J}(\bm{q})$ 表示速度雅可比矩阵, 其转置 $\bm{J}^T(\bm{q})$ 表示力雅可比矩阵

## 操作臂雅可比矩阵的意义
### 雅可比矩阵的四个基本子空间
通过雅可比矩阵的[四个基本子空间](/course/math/Linear_Algebra/ch3.md#四个基本子空间)中, 行空间与零空间为关节速度空间 $\R^{n}$ 的子空间, 列空间与左零空间为操作速度空间  $\R^{m=6}$ 的子空间  
雅可比矩阵子空间的形状能一定程度上反应操作臂当前状态 $\bm{q}$ 下的运动特点

#### 雅可比矩阵的列空间
对于雅可比矩阵的列空间满足 (教材上也称为域空间 $R[\bm{J}(\bm{q})]$)  
$$C[\bm{J}(\bm{q})]=\{V|V=\bm{J}(\bm{q})\dot{\bm{q}}\}$$

因此列空间包含了操作臂在当前状态下, 所能达到的所有速度 $V$  
易得列空间维数即雅可比矩阵的秩 $r$, 满足 $dim(C[\bm{J}(\bm{q})])=r$  

列空间的维数反映了操作臂当前状态下所具有的**自由度**
* 当雅可比矩阵行满秩时, $r=m=6$, 列空间张满整个操作速度空间 $\R^{6}$  
此时对于任意指定的末端执行器速度 $V$, 总是存在至少一种关节速度组合 $\dot{\bm{q}}$ 可得达到该速度
* 当行不满秩时 $r<m=6$, 操作臂则处于[奇异状态](#操作臂雅可比矩阵的意义), 存在无法达到的速度

#### 雅可比矩阵的零空间
对于雅可比矩阵的零空间满足  
$$N[\bm{J}(\bm{q})]=\{\dot{\bm{q}}|\bm{0}=\bm{J}(\bm{q})\dot{\bm{q}}\}$$

因此零空间包含了一系列关节速度的组合 $\dot{\bm{q}}$, 这些速度组合对于末端执行器的速度没有任何效果  
易得零空间维数满足 $dim(N[\bm{J}(\bm{q})])=n-r$  

当==行满秩时==, 零空间的维数反映了操作臂**冗余度**, 冗余的自由度可用于躲避障碍
* 对于六关节六自由度操作臂, 显然其冗余度 $dim(N[\bm{J}(\bm{q})])=0$, 无法实现避障, 只能在开阔空间中移动
* 对于七关节以上的操作臂, 其具有额外冗余度用于避障, 反解具有无限多的可能性

#### 雅可比矩阵的左零空间
对于雅可比矩阵的左零空间满足
$$N[\bm{J}^T(\bm{q})]=\{F|\bm{0}=\bm{J}^T(\bm{q})F\}$$

因此零空间包含了一系列外载荷 $F$, 当末端执行器受到该载荷时, 关节的约束力几乎为 $0$, 载荷由机器人的基座承担  
易得左零空间维数满足 $dim(N[\bm{J}(\bm{q})])=m-r$  

当左零空间维数不为 $0$ 时, 也即[行不满秩](#雅可比矩阵的列空间), 操作臂处于[奇异状态](#操作臂雅可比矩阵的意义)  
因此奇异状态下, 操作臂除了存在无法到达的速度 $V'$, 还存在可完全通过基座承担的外载荷 $F$  
由于列空间与左零空间互为[正交补](/course/math/Linear_Algebra/ch4.md#正交补), 因此奇异状态下, 操作臂所能达到的速度 $V$ 与可通过基座承担的外载荷 $F$ 满足 $V^TF=0$

### 操作臂的灵巧性
#### 操作臂的奇异值分解
将雅可比矩阵进行[奇异值分解](/course/math/Linear_Algebra/ch7.md#奇异值分解)后有
$$\bm{J}(\bm{q})=\bm{U}\bm{\Sigma}\bm{V}^T\quad \bm{J}(\bm{q})\bm{v}_i=\sigma_i\bm{u}_i$$

根据奇异值分解的特性可得, $\bm{U}\in\R^{6\times 6},\bm{V}\in\R^{n\times n}$  
* 奇异值 $\sigma_i$ 反映了末端执行器速度 $V_i$ 在 $\bm{u}_i$ 方向上达到要求的大小时, 所需要的 $\bm{v}_i$ 方向上的关节速度 $\dot{\bm{q}}$  
* 因此奇异值 $\sigma_i$ 越大表明末端执行器越容易达到方向 $V_i$ 上的速度, 反之越不容易达到  
* 当奇异值 $\sigma_i=0$ 或不存在, 即雅可比矩阵处于[奇异状态](#操作臂雅可比矩阵的意义). $\bm{u}_i$ 方向的速度不可能达到  
* 设计时尽量使操作臂处于所有奇异值均相同的状态, 此时操作臂沿任意方向均具有相同的灵巧性

因此使用奇异值分解能定量地分析操作臂的灵巧性

#### 灵巧性指标
* 条件数 $k[\bm{J}(\bm{q})]=\frac{\sigma_1}{\sigma_r}$, 即最大与最小的奇异值之比 (奇异值按从大到小排列)  
当 $k=1$, 所有奇异值相同, 操作臂的灵巧性最高
* 最小奇异值 $\sigma_r$, 最小奇异值越大, 末端对关节速度的相应越快  
* 可操作度 $w=\sqrt{\det{\bm{J}(\bm{q})\bm{J}^T(\bm{q})}}=\prod\sigma_i$, 奇异状态下, $w=0$
* 速度比椭球 $\bm{v}^T[\bm{J}(\bm{q})\bm{J}^T(\bm{q})]\bm{v}=f(\bm{v})=1$, 使用二次型表示的, 关于末端速度 $V$ 的六维椭球, 反映了操作臂沿各个方向上的灵巧性
