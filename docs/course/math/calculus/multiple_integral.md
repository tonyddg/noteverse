---
order: 11
---

# 重积分
多重积分时不可带入区域方程  
仅线面积分时, 才可带入
## 二重积分
### 对称性 P107 P115
计算前优先考虑
1. 区域关于坐标轴的对称性    
(带入 $-x$ 区域不变)
2. $x,y,z$的轮换性  
(交换 $x,y,z$ 区域不变(球), 则可交换 $f(x,y,z)$ 中的 $x,y,z$)
### 极坐标代换 P100
$$x=r \cos\theta$$
$$y=r \sin\theta$$
$$|J|=r$$
1. 注意 $x, y$ 是否是标准的圆方程
2. 注意计算 $r$ 与 $\theta$ 的范围(画图)(垂直为 $\frac{\pi}{2}$), 有时 $r$ 可能是 $\theta$ 的函数
    * e.g.
    $$\begin{split}
    (x-1)^2+y^2&=1\\
    x^2+y^2&=2x\\
    r^2&=2r \cos\theta
    \end{split}\\
    \therefore 0\le r\le 2\cos\theta\\
    -\frac{\pi}{2}\le\theta\le\frac{\pi}{2}$$
3. ==代换后要乘上代换因子 $|J|$==
4. 其他注意 P122
## 三重积分
### 柱坐标代换
$$x=r \cos\theta$$
$$y=r \sin\theta$$
$$z=z$$
$$|J|=r$$
### 球坐标代换
$$x=r \cos\theta \sin\varphi$$
$$y=r \cos\theta \sin\varphi$$
$$z=r \cos\varphi$$
$$|J|=r^2\sin\varphi$$
* $\varphi$ 为圆心到球面的矢量==关于 $z$ 轴的夹角==
* 完整球体中 $\varphi \in [-\frac{\pi}{2},\frac{\pi}{2}]$
## 曲线积分
不可使用对称性  
但可以将曲线方程带入被积函数化简  
化为相应的多重积分时优先考虑对称性  
### 第一型曲线积分 P132
可以使用对称性  
积分对象要转化为参数方程  
$$dl=\sqrt{x'^2(t)+y'^2(t)+z'^2(t)}dt$$
$$\int_lf(x,y,z)dl=\int_{t_0}^{t_1}f(x(t),y(t),z(t))\sqrt{x'^2(t)+y'^2(t)+z'^2(t)}dt$$
### 第二型曲线积分 P137
不可使用对称性  
积分对象要转化为参数方程  
规定(==注意 $P,Q,R$ 是关于 $x,y,z$ 的函数, $x,y,z$ 是关于 $t$ 的函数==(参数方程))  
$$P=P(x,y,z)\;Q=Q(x,y,z)\;R=R(x,y,z)$$
$$\int_L\{P,Q,R\}\cdot d\vec{l}=\int_LPdx+Qdy+Rdz=\int_{t_0}^{t_1}[Px'(t)+Qy'(t)+Rz'(t)]dt$$
### 格林公式 P141
#### 区域概念
设 $L$ 围住区域 $D$
1. 正向
沿 $L$ 移动时, 如果 $D$ 始终在左侧, 则称 $L$ 的方向为正向
    * $L$ 为单连通时, 为逆时针方向
    * $L$ 为复连通时, 内部的曲线为顺时针方向
2. 简单闭曲线
分段光滑且不与自身相交的闭曲线
    * $8$ 字型与自身相交不是这种曲线
    * 同心圆不相交, 符合条件
#### 格林公式
仅用于二维
1. $L$ 为简单闭曲线 且积分时沿 $L$ 正向
2. $D$ 内与 $L$ 上 ==$P,Q$ 有一阶连续偏导== 
$$\oint_L\{P,Q\}\cdot d\vec{l}=\int_D(Q_x-P_y)dx dy$$
#### 普通曲线 P144
1. 添加辅助线段补为闭曲线
2. 减去补充的曲线
### 曲线积分与路径无关的条件 P147
==$D$ 是单连通区域==, ==$P,Q$ 在 $D$ 内有一阶连续偏导==, 当在 $D$ 内满足以下任一条件, 曲线积分与路径无关  
(D内可以是任意路径, 仅与初末点的位置有关)  
$$du=Pdx+Qdy\iff Q_x=P_y\iff D\text{内曲线积分与路径无关}$$
#### 曲线积分与环路路径无关的条件 P149
当存在有限个 $M$ 使 $P,Q$ 没有一阶连续偏导时(==分母为 $0$==)  
曲线积分与==环路路径==无关  
利用此方法可将复杂环路换为简单环路( $Q_x-P_y$ 的一部分/消去分母)计算
### 全微分方程 P153
$$P(x,y)dx+Q(x,y)dy=0$$
当存在( $Q_x=P_y$ )
$$du=Pdx+Qdy$$
有通解
$$u(x,y)=C$$
注意通解形式
## 曲面积分
但可以将曲线方程带入被积函数化简
化为相应的多重积分时优先考虑对称性
### 第一型曲面积分 P159
可以使用对称性
$$\iint_S F(x,y,z)dS$$
* 假设曲面由 $z(x,y)-z=0$ 决定
* $dx dy$ 为 $dS$ 在 $xy$ 平面上的投影
* $D$ 为 $S$ 在 $xy$ 平面上的投影
* $\cos\gamma$ 为 $dS$ 法矢量与 $z$ 轴的夹角
$$dS=|\frac{dx dy}{\cos\gamma}|$$
$$\cos\gamma=\frac{-1}{|grad F(x,y,z)|}$$
$$dS=\sqrt{z_x^2+z_y^2+1}dx dy$$
$$\iint_D F(x,y,z(x,y))\sqrt{z_x^2+z_y^2+1}dx dy$$
### 第二型曲面积分
不可使用对称性
$$d\vec{S}=dS\vec{n}=dS\{\cos\alpha,\cos\beta,\cos\gamma\}=\{dy dz,dz dx,dx dy\}$$
$$\iint_S\vec{F}\cdot d\vec{S}=\iint_SPdy dz+Qdz dx+Rdx dy$$
#### 方向定义 P163
* 曲面上微元 $d\vec{S}$ 与Z轴正方向夹角小于 $90°$ 为上侧
* 曲面上微元 $d\vec{S}$ 与Z轴正方向夹角大于 $90°$ 为下侧
* 注意要求的 $S$ 为上侧或下侧, 相反侧要取负号
* 当 $S$ 相对于某个轴可能既有上侧也有下侧, 需要拆分
#### 分散投影法 P166
$$\iint_SRdx dy=\iint_DR(x,y,z(x,y))dx dy$$
#### 统一投影法 P167
假设曲面由 $z(x,y)-z=0$ 决定
$$\vec{n}=\frac{grad F}{|grad F|}=\pm\frac{\{-z_x,-z_y,1\}}{\sqrt{z_x^2+z_y^2+1}}$$
$$dS=\frac{dx dy}{|\cos\gamma|}=dx dy\sqrt{z_x^2+z_y^2+1}$$
$$d\vec{S}=\pm\{-z_x,-z_y,1\}dx dy$$
$$\iint_S\vec{F}\cdot d\vec{S}=\iint_D\pm(-z_xP-z_yQ+R)dx dy$$
注意:
1. 当 $d\vec{S}$ 为Z轴上侧时, $\cos\gamma>0$ 取正号, 否则取负号
2. $\pm\{-z_x,-z_y,1\}$ 中第==三项的系数为$1$==
3. ==对于平行于 $xy$ 的平面, 其方程为 $z=n$== , $d\vec{S}=\pm\{0,0,1\}dx dy$ , 带入 $R$ 中时, ==取 $z=n$ , 不是$0$==
## 积分公式
### 哈密尔顿算子 P170
$$\vec{F}=\{P,Q,R\}$$
$$\nabla=\{\frac{\partial}{\partial x},\frac{\partial}{\partial y},\frac{\partial}{\partial z}\}$$
#### 散度
$$div\vec{F}=\nabla\cdot\vec{F}$$
#### 旋度
$$\vec{rot}\vec{F}=\nabla\times\vec{F}=\begin{vmatrix}\vec{i}&\vec{j}&\vec{k}\\
\frac{\partial}{\partial x}&\frac{\partial}{\partial y}&\frac{\partial}{\partial z}\\P&Q&R\end{vmatrix}$$
==注意叉乘时向量的位置==
#### 梯度
$$grad F(x,y,z)=\nabla F$$
#### 运算规则 P170
见书
### 高斯公式 P172
空间 $V$ 由闭合曲面 $S$ 围成, $P,Q,R$ 在 $V$ 内与 $S$ 上有连续的一阶偏导数
$$\oint_S\vec{F}d\vec{S}=\iiint_V\nabla\vec{F}dV$$
$S$ 取曲面的外侧
#### 普通曲面 P174
1. 添加辅助面补为闭曲面
2. 减去补充的曲面
### Stokes公式 P176
$L$ 为有向闭合曲线  
$S$ 为以 $L$ 为边界的任意曲面  
$P,Q,R$ 在 $S$ 与边界上一阶偏导连续  
积分方向为 $L$ 正向  
$$\oint_L\vec{F}\cdot d\vec{l}=\iint_S\nabla\times\vec{F}d\vec{S}=\iint_S\begin{vmatrix}dydz&dzdx&dxdy\\
\frac{\partial}{\partial x}&\frac{\partial}{\partial y}&\frac{\partial}{\partial z}\\P&Q&R\end{vmatrix}$$
#### 积分与路径无关
$P,Q,R$ 在 $V$ 与边界上一阶偏导连续
$$du=Pdx+Qdy+Rdz\iff \nabla\times\vec{F}=\vec{0}\iff V\text{内曲线积分与路径无关}$$