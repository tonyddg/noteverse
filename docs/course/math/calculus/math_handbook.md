---
order: 3
---

# 微积分速查手册



## 微分
### 基本求导法则

### 常用函数导数

### 微分中值定理

## 极限与级数

### 极限求法

### 常用等效极限

### 常用泰勒级数

## 积分
### 基本积分技巧

### 常用函数积分

## 多重微积分
约定
* 有多元标量函数 $u(x,y,z),v(x,y,z)$  
* 有多元矢量函数 $\vec{A}(x,y,z)=(P,Q,R),\vec{B}$, 其中 $P,Q,R$ 均为多元标量函数
* 有一般标量常数 $c,d$

### 多元函数微分
#### 梯度
$$\mathbf{grad}(u)=(\frac{\partial u}{\partial x},\frac{\partial u}{\partial y},\frac{\partial u}{\partial z})$$

多元函数 $u$ 在点 $(x,y,z)$ 沿梯度方向上有着最快的变化速度, 并且有着最大的方向导数, 即梯度的模

#### 散度
$$\operatorname{div}(\vec{A})=\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z}$$

对矢量场 $\vec{A}$ 中的闭合曲面 $S$ 围成的空间 $V$, 定义通量
$$\Phi=\oint\limits_S \vec{A}\cdot \mathrm{d}\vec{s}$$

对于 $S$ 的中心点 $(x,y,z)$, 定义矢量场的散度
$$\operatorname{div}(\vec{A})=\lim_{V\to 0}\frac{\Phi}{V}$$

散度可以体现空间中一点 $(x,y,z)$ 为中心的微元体 $\mathrm{dV}$ 是否散发或者吸收通量, 当一点的散度为 $0$, 表明进入与离开该点的通量相同

参考文献  
<https://wuli.wiki/online/Divgnc.html>

#### 旋度
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

#### 微分算子
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

### 常用微元与坐标系变换

### 多重积分公式

## 积分变换
### 傅里叶变换

### 拉普拉斯变换

