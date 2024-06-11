---
order: 5
---
# 多元微积分
::: warning
该笔记尚未完成
:::

约定
* 有多元标量函数 $u(x,y,z),v(x,y,z)$  
* 有多元矢量函数 $\vec{A}(x,y,z)=(P,Q,R),\vec{B}$, 其中 $P,Q,R$ 均为多元标量函数
* 有一般标量常数 $c,d$

## 多元函数微分

## 多元函数的微分特征
### 梯度
$$\mathbf{grad}(u)=(\frac{\partial u}{\partial x},\frac{\partial u}{\partial y},\frac{\partial u}{\partial z})$$

多元函数 $u$ 在点 $(x,y,z)$ 沿梯度方向上有着最快的变化速度, 并且有着最大的方向导数, 即梯度的模

对于多元函数的全微分即可使用梯度表示成如下形式
$$\mathrm{d}f=\mathbf{grad}(f)\cdot\mathrm{d}\vec{r}$$

### 散度
$$\operatorname{div}(\vec{A})=\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z}$$

对矢量场 $\vec{A}$ 中的闭合曲面 $S$ 围成的空间 $V$, 定义通量
$$\Phi=\oint\limits_S \vec{A}\cdot \mathrm{d}\vec{s}$$

对于 $S$ 的中心点 $(x,y,z)$, 定义矢量场的散度
$$\operatorname{div}(\vec{A})=\lim_{V\to 0}\frac{\Phi}{V}$$

散度可以体现空间中一点 $(x,y,z)$ 为中心的微元体 $\mathrm{dV}$ 是否散发或者吸收通量, 当一点的散度为 $0$, 表明进入与离开该点的通量相同

参考文献  
<https://wuli.wiki/online/Divgnc.html>

### 旋度
$$\mathbf{rot}(\vec{A})=
\begin{vmatrix}
\vec{i}&\vec{j}&\vec{k}\\
\frac{\partial}{\partial x}&\frac{\partial}{\partial y}&\frac{\partial}{\partial z}\\
P&Q&R
\end{vmatrix}$$

对于平面中质点的运动可以分解为绕轴旋转与平动 
$$\vec{v}=\vec{v_0}+\vec{\omega}\times\vec{r}=(v_{0y}+\omega x)\vec{j}+(v_{0x}-\omega y)\vec{i}$$

为了求出该点的角速度, 可以令速度分量 $v_x,v_y$ 分别对 $y,x$ 求偏导 
$$\frac{\partial v_x}{\partial y}=-\omega\quad \frac{\partial v_y}{\partial x}=\omega$$

因此该点的角速度即为
$$2\omega=\frac{\partial v_y}{\partial x}-\frac{\partial v_x}{\partial y}$$

推广到三维坐标系可得, 对于任意物体的速度场上任一点, 其旋度及其角速度的 $2$ 倍
$$\mathbf{rot}(\vec{A})=2\vec{\omega}$$

参考文献  
<https://zhuanlan.zhihu.com/p/477261640>  
<https://blog.sina.com.cn/s/blog_5d323f950101ima8.html>

### 微分算子
使用微分算子 (哈密顿算子) $\vec{\nabla}$ 用于简化对多元函数的微分
$$\vec{\nabla}=(\frac{\partial}{\partial x},\frac{\partial}{\partial y},\frac{\partial}{\partial z})$$

梯度, 旋度, 散度均可使用微分算子表示
$$\mathbf{grad}(u)=(\frac{\partial u}{\partial x},\frac{\partial u}{\partial y},\frac{\partial u}{\partial z})=\vec{\nabla} u$$
$$\operatorname{div}(\vec{A})=\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z}=\vec{\nabla}\cdot\vec{A}$$
$$\mathbf{rot}(\vec{A})=
\begin{vmatrix}
\vec{i}&\vec{j}&\vec{k}\\
\frac{\partial}{\partial x}&\frac{\partial}{\partial y}&\frac{\partial}{\partial z}\\
P&Q&R
\end{vmatrix}
=\vec{\nabla}\times\vec{A}$$

微分算子具线性性
$$\vec{\nabla}(cu+dv)=c\vec{\nabla}u+d\vec{\nabla}v$$
$$\vec{\nabla}\cdot(c\vec{A}+d\vec{B})=c\vec{\nabla}\cdot \vec{A}+d\vec{\nabla}\cdot \vec{B}$$
$$\vec{\nabla}\times(c\vec{A}+d\vec{B})=c\vec{\nabla}\times \vec{A}+d\vec{\nabla}\times \vec{B}$$

注意, 微分算子不满足交换律
$$\vec{\nabla}\cdot\vec{A}\neq\vec{A}\cdot\vec{\nabla}=P\frac{\partial}{\partial x}+Q\frac{\partial}{\partial y}+R\frac{\partial}{\partial z}$$
$$\vec{\nabla}u\neq u\vec{\nabla}=(u\frac{\partial}{\partial x},u\frac{\partial}{\partial y},u\frac{\partial}{\partial z})$$
$$(\vec{A}\cdot\vec{\nabla})\vec{A}=P\frac{\partial\vec{A}}{\partial x}+Q\frac{\partial\vec{A}}{\partial y}+R\frac{\partial\vec{A}}{\partial z}\\
\neq\\
(\vec{\nabla}\cdot\vec{A})\vec{A}=(P\vec{\nabla}\cdot\vec{A},Q\vec{\nabla}\cdot\vec{A},R\vec{\nabla}\cdot\vec{A})$$

## 常用微元与坐标系变换

## 多重积分公式

## 矢量求导法则
参考 
* <https://blog.csdn.net/SA14023053/article/details/51859446>
* <https://www.cnblogs.com/pinard/p/10930902.html>

矢量与矩阵求导依然满足链式法则, 一般利用链式法则避免直接对矩阵求导  
可使用工具 <https://www.matrixcalculus.org/> 计算矩阵求导

### 矢量对标量求导
对于任意矢量或矩阵 $\bm{X}\in\R^{m\times n}$ 与标量 $y$  
有 $\bm{X}$ 相对 $y$ 的导数即矩阵中各个元素 $x_{i,j}$ 相对 $y$ 求导, 满足

$$\frac{\partial \bm{X}}{\partial y}=\begin{bmatrix}
\frac{\partial x_{1,1}}{\partial y}&\frac{\partial x_{1,2}}{\partial y}&\dots&\frac{\partial x_{1,n}}{\partial y}\\
\frac{\partial x_{2,1}}{\partial y}&\frac{\partial x_{2,2}}{\partial y}&\dots&\frac{\partial x_{2,n}}{\partial y}\\
\vdots&\vdots&\ddots&\vdots\\
\frac{\partial x_{m,1}}{\partial y}&\frac{\partial x_{m,2}}{\partial y}&\dots&\frac{\partial x_{m,n}}{\partial y}
\end{bmatrix}$$

### 标量对矢量求导
对于任意矢量或矩阵 $\bm{X}\in\R^{m\times n}$ 与标量 $y$  
有 $y$ 相对 $\bm{X}$ 的导数即 $y$ 相对矩阵中各个元素 $x_{i,j}$ 求导, 满足

$$\frac{\partial y}{\partial \bm{X}}=\begin{bmatrix}
\frac{\partial y}{\partial x_{1,1}}&\frac{\partial y}{\partial x_{1,2}}&\dots&\frac{\partial y}{\partial x_{1,n}}\\
\frac{\partial y}{\partial x_{2,1}}&\frac{\partial y}{\partial x_{2,2}}&\dots&\frac{\partial y}{\partial x_{2,n}}\\
\vdots&\vdots&\ddots&\vdots\\
\frac{\partial y}{\partial x_{m,1}}&\frac{\partial y}{\partial x_{m,2}}&\dots&\frac{\partial y}{\partial x_{m,n}}
\end{bmatrix}$$

### 矢量对矢量求导
对于行矢量 $\vec{x}^T\in\R^{1\times n}$ 与列矢量 $\vec{y}\in\R^{m\times 1}$  
行矢量 $\vec{x}^T$ 相对列矢量 $\vec{y}$ 求导可得到 $m\times n$ 的雅可比矩阵, 满足

$$\frac{\partial \vec{x}^T}{\partial \vec{y}}=\begin{bmatrix}\frac{\partial \vec{x}^T}{\partial y_{1}}\\\frac{\partial \vec{x}^T}{\partial y_{2}}\\\vdots\\\frac{\partial \vec{x}^T}{\partial y_{m}}\end{bmatrix}=\begin{bmatrix}
\frac{\partial x_{1}}{\partial y_{1}}&\frac{\partial x_{2}}{\partial y_{1}}&\dots&\frac{\partial x_{n}}{\partial y_{1}}\\
\frac{\partial x_{1}}{\partial y_{2}}&\frac{\partial x_{2}}{\partial y_{2}}&\dots&\frac{\partial x_{n}}{\partial y_{2}}\\
\vdots&\vdots&\ddots&\vdots\\
\frac{\partial x_{1}}{\partial y_{m}}&\frac{\partial x_{2}}{\partial y_{m}}&\dots&\frac{\partial x_{n}}{\partial y_{m}}
\end{bmatrix}$$

同样的, 列矢量 $\vec{y}$ 相对行矢量 $\vec{x}^T$ 求导可得到 $m\times n$ 的雅可比矩阵, 满足

$$\frac{\partial \vec{y}}{\partial \vec{x}^T}=\begin{bmatrix}\frac{\partial \vec{y}}{\partial x_{1}}&\frac{\partial \vec{y}}{\partial x_{2}}&\dots&\frac{\partial \vec{y}}{\partial x_{n}}\end{bmatrix}=\begin{bmatrix}
\frac{\partial y_{1}}{\partial x_{1}}&\frac{\partial y_{1}}{\partial x_{2}}&\dots&\frac{\partial y_{1}}{\partial x_{n}}\\
\frac{\partial y_{2}}{\partial x_{1}}&\frac{\partial y_{2}}{\partial x_{2}}&\dots&\frac{\partial y_{2}}{\partial x_{n}}\\
\vdots&\vdots&\ddots&\vdots\\
\frac{\partial y_{m}}{\partial x_{1}}&\frac{\partial y_{m}}{\partial x_{2}}&\dots&\frac{\partial y_{m}}{\partial x_{n}}
\end{bmatrix}$$

当矢量 $\vec{x}\in\R^{n\times 1}, \vec{y}\in\R^{m\times 1}$ 均为列矢量或均为行矢量时, 求导结果依然为雅可比矩阵, 但需要明确使用的布局方法
* 采用分母布局时, 导数从行数与列数优先与分母相同
    * 当 $\vec{x},\vec{y}$ 均为列向量有 $\frac{\partial \vec{y}}{\partial \vec{x}}=\frac{\partial \vec{y}^T}{\partial \vec{x}}\in\R^{n\times m}$
    * 当 $\vec{x},\vec{y}$ 均为行向量有 $\frac{\partial \vec{y}^T}{\partial \vec{x}^T}=\frac{\partial \vec{y}}{\partial \vec{x}^T}\in\R^{m\times n}$
* 采用分子布局时, 则结果相反, 两种布局的结果互为转置

根据矢量对矢量的求导法则可知, 函数 $\vec{y}=a\vec{x}+\vec{b}$ 中, 求导 $\frac{\partial\vec{y}}{\partial\vec{x}}$ 的结果是对角矩阵 $a\bm{I}$ 而不是单个标量

### 矩阵对矩阵求导
矩阵间以及矩阵对矢量的求导较为复杂, 一般通过链式法则转换为矢量与标量的求导, 具体可见参考资料的介绍

