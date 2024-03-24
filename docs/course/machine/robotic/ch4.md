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
将操作臂末端点 $\space^{0}\bm{p}_T=\begin{bmatrix}x&y\end{bmatrix}^T$ 作为矢量函数  
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
$$\begin{bmatrix}\space^{s}v_x\\\space^{s}v_y\end{bmatrix}=
\bm{J}(\bm{\theta})
\begin{bmatrix}\dot{\theta}_1\\\dot{\theta}_2\end{bmatrix}$$

### 操作臂雅可比矩阵的意义
在操作臂运动学中, 通常将[关节空间](./ch3.md#三种描述空间)中的关节变量矢量 $\bm{q}$ 作为变量矢量, 将[操作空间](./ch3.md#三种描述空间)中的元素作为矢量函数, 将两者的雅可比矩阵称为操作臂雅可比矩阵  
由[雅可比矩阵的基本定义](#雅可比矩阵的基本定义)可知, 操作比雅可比矩阵描述了关节变量相对时间的导数 (即关节转动或平动速度) 相对于操作臂末端执行器的位姿相对时间的变化 (对于三维空间, 一般将==末端执行器视为刚体==, 使用==末端执行器的[速度线矢量](./ch2.md#力线矢量与速度线矢量)==) 的映射, 满足
$$V=\begin{bmatrix}\bm{v}\\\bm{\omega}\end{bmatrix}=\bm{J}(\bm{q})\dot{\bm{q}}$$

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
    * 使用 $\space^{T}\bm{J}(\bm{q})$ 表示[手腕坐标系](./ch3.md#坐标系规定) $\{\bm{W}\}$ (即末端连杆 $\{n\}$) 下的雅可比矩阵, 此时得到的速度线矢量以工具坐标系 $\{\bm{W}\}$ 为观察坐标系

## 速度雅可比矩阵
虽然雅可比矩阵来自于求导, 但在三维空间中, 不易于使用, 因此更多使用构造的方法  
以下内容均默认以三维空间为讨论范围, 并默认以线速度 $V$ 表示操作臂的末端速度

### 速度雅可比矩阵的分解
根据矩阵乘法的定义可知, 对于雅可比矩阵的第 $i$ 列 $\bm{J}_i(\bm{q})$, 关节变量的运动速度 $\dot{\bm{q}}$ 与末端速度线矢量 $V$ 之间存在线性关系
$$V=\sum_{i=1}^n\bm{J}_i(\bm{q})\dot{q}_i$$

因此可分别找出关节 $i$ 的运动对末端速度的影响 $\bm{J}_i(\bm{q})$, 通过组合即可得到操作臂的速度雅可比矩阵 $\bm{J}(\bm{q})$  
在雅可比矩阵的构造中, 将连杆 $i$ 及其后的操作臂所有部分均视为一个刚体 $B_i$, ==末端执行器即刚体上的一部分==  

假设其他关节静止, 关节 $i$ 以速度 $q_i$ 绕 $\space^{0}\bm{z}_i$ 旋转或沿 $\space^{0}\bm{z}_i$ 平移时  
关节方向决定了速度线矢量的方向 $L^r_i$, 关节速度决定了速度线矢量的幅值 $q_i$, 两者的乘积即该关节对末端执行器的运动 $V_i$  
由[速度雅可比矩阵的分解](#速度雅可比矩阵的分解)可得, 线矢量 $L^r_i$ 即雅可比矩阵的分量 $\bm{J}_i(\bm{q})=L^r_i$

### 矢量积方法构造雅可比矩阵
该方法构造时, 始终以基座标系的坐标轴与工具坐标系原点 $\bm{p}_{O_n}$ 组合而成的坐标系为观察坐标系 $\{\bm{W_0}\}$  
虽然使用了 $\space^{0}\bm{z}_{i}$, 但该矢量是表示方向的自由矢量, 因此与原点位置无关

对于平动关节的情况  
刚体 $B_i$ 的旋转轴 $\bm{n}=\bm{0}$, 线速度方向 $\bm{r}\times\bm{n}=\space^{0}\bm{z}_{i}$, 因此有
$$\bm{J}_i(\bm{q})=\space^{0}L^r_i=\begin{bmatrix}
\space^{0}\bm{z}_{i}\\
\bm{0}
\end{bmatrix}$$

对于旋转关节的情况  
刚体 $B_i$ 旋转轴方向为 $\bm{n}=\space^{0}\bm{z}_{i}$  
由观察坐标系原点 $\space^{0}\bm{p}_{O_n}$ 指向旋转轴上一点 $\space^{0}\bm{p}_{O_i}$ 有 $\bm{r}=\space^{0}\bm{p}_{O_i}-\space^{0}\bm{p}_{O_n}=\space^{0}\bm{p}_{O_nO_i}$  
因此有
$$\bm{J}_i(\bm{q})=\space^{0}L^r_i=
\begin{bmatrix}
\bm{r}\times\bm{n}\\
\bm{n}
\end{bmatrix}=
\begin{bmatrix}
\space^{0}\bm{p}_{O_nO_i}\times\space^{0}\bm{z}_{i}\\
\space^{0}\bm{z}_{i}
\end{bmatrix}$$

### 微分变换法构造雅可比矩阵
该方法构造时, 始终以手腕坐标系 $\{\bm{W}\}$ 为观察坐标系  
首先以连杆坐标系 $\{i\}$ 为观察坐标系得到 $\space^{i}L^r$, 然后使用[速度线矢量的伴随矩阵](./ch2.md#速度线矢量的伴随变换) $\operatorname{Ad}_V(\space^{i}_{n}\bm{T})$, 将观察坐标系转移到 $\{\bm{W}\}$ 上

将 $\bm{\space^{i}_{n}T}$ 展开有
$$\bm{\space^{i}_{n}T}=\begin{bmatrix}
\space^{i}x_{x}&\space^{i}y_{x}&\space^{i}z_{x}&\space^{i}p_{O_nx}\\
\space^{i}x_{y}&\space^{i}y_{y}&\space^{i}z_{y}&\space^{i}p_{O_nx}\\
\space^{i}x_{z}&\space^{i}y_{z}&\space^{i}z_{z}&\space^{i}p_{O_nx}\\
0&0&0&1
\end{bmatrix}$$

对于平动关节的情况  
刚体 $B_i$ 的旋转轴 $\bm{n}=\bm{0}$ 线速度方向为 $\space^{i}\bm{z}_i=\begin{bmatrix}0&0&1\end{bmatrix}^T$, 因此有
$$\space^{i}L^r_i=\begin{bmatrix}0\\0\\1\\-\\\bm{0}\end{bmatrix}\\
\space^{T}\bm{J}_i(\bm{q})=\space^{n}L^r_i=\operatorname{Ad}_V^{-1}(\bm{\space^{i}_{n}T})\space^{i}L^r_i=\begin{bmatrix}\bm{\space^{i}_{n}\bm{R}^T\space^{i}\bm{z}_i}\\-\\\bm{0}\end{bmatrix}=\begin{bmatrix}\space^{i}x_{z}\\\space^{i}y_{z}\\\space^{i}z_{z}\\-\\\bm{0}\end{bmatrix}$$

对于旋转关节的情况  
刚体 $B_i$ 旋转轴方向为 $\bm{n}=\space^{i}\bm{z}_i=\begin{bmatrix}0&0&1\end{bmatrix}^T$  
旋转轴就在原点上, 有 $\bm{r}=\bm{0}$  
因此有
$$\space^{i}L^r_i=\begin{bmatrix}\bm{0}\\-\\0\\0\\1\end{bmatrix}\\
\space^{T}\bm{J}_i(\bm{q})=
\space^{n}L^r_i=
\operatorname{Ad}_V^{-1}(\bm{\space^{i}_{n}T})\space^{i}L^r_i=
\begin{bmatrix}-\bm{\space^{i}_{n}\bm{R}^T[\space^{i}\bm{p}_{O_n}]\space^{i}\bm{z}_i}\\ \space^{i}_{n}\bm{R}^T\space^{i}\bm{z}_i\end{bmatrix}=
\begin{bmatrix}\space^{n}\bm{p}_{O_iO_n}\times\begin{bmatrix}\space^{i}x_{z}\\\space^{i}y_{z}\\\space^{i}z_{z}\end{bmatrix}\\\space^{i}x_{z}\\\space^{i}y_{z}\\\space^{i}z_{z}\end{bmatrix}$$

对于旋转关节中的速度矢量 $\bm{v}$, 上述公式基于[交叉积与姿态矩阵](./ch2.md#交叉积与姿态矩阵)的推论得到 (其中 $\space^{i}_{n}\bm{R}^T\space^{i}\bm{p}_{O_n}=\space^{n}\bm{p}_{O_iO_n}$)  
部分情况下也写为以下的等价形式 (将 $\space^{i}_{n}\bm{R}^T$ 各行用于叉乘, 参见[向量交叉积](/course/math/Linear_Algebra/ch5.md#向量交叉积)的性质)
$$\space^{T}\bm{J}_i(\bm{q})=\begin{bmatrix}(\space^{i}\bm{p}_{O_n}\times \space^{i}\bm{x})_z\\(\space^{i}\bm{p}_{O_n}\times \space^{i}\bm{y})_z\\(\space^{i}\bm{p}_{O_n}\times \space^{i}\bm{z})_z\\\space^{i}x_{z}\\\space^{i}y_{z}\\\space^{i}z_{z}\end{bmatrix}$$

### 两种雅可比矩阵的转换
由[操作臂雅可比矩阵的意义](#操作臂雅可比矩阵的意义)可知, 雅可比矩阵存在两种表示观察坐标系 $\{\bm{W_0}\},\{\bm{W}\}$  
由于两个坐标系的原点重合, 坐标系变换时仅有旋转, 以 $\{\bm{W_0}\}$ 观察坐标系 $\{\bm{W}\}$ 时有齐次矩阵
$$\space^{W_0}_{W}\bm{T}=\begin{bmatrix}
\space^{0}_{n}\bm{R}&\bm{0}\\
\bm{0}&1
\end{bmatrix}$$

根据[旋转伴随变换](./ch2.md#旋转伴随变换)可得, 相应的有速度线矢量伴随变换矩阵
$$
\operatorname{Ad}_V(\space^{W_0}_{W}\bm{T})=\begin{bmatrix}
\space^{0}_{n}\bm{R}&\bm{0}\\
\bm{0}&\space^{0}_{n}\bm{R}
\end{bmatrix}\;
\operatorname{Ad}_V^{-1}(\space^{W_0}_{W}\bm{T})=\begin{bmatrix}
\space^{0}_{n}\bm{R}^T&\bm{0}\\
\bm{0}&\space^{0}_{n}\bm{R}^T
\end{bmatrix}
$$

由[速度雅可比矩阵的分解](#速度雅可比矩阵的分解), 可知雅可比矩阵本质由 $n$ 列速度线矢量 $V$ 组成  
因此两种形式的雅可比矩阵之间存在转换关系
$$\operatorname{Ad}_V^{-1}(\space^{W_0}_{W}\bm{T})\bm{J}(\bm{q})=\space^{T}\bm{J}(\bm{q})$$
