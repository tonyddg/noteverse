---
order: 9
---

# 多元函数
## 极限
### 求极限
1. 令$t=x^2+y^2$
2. 分离加法
3. 夹逼
$$\frac{x+y}{2}\ge\sqrt{xy}$$
4. 因式分解
$$\frac{x^3+y^3}{x+y}=x^2-xy+y^2$$
5. $$\lim_{x\to0}(1+x)^{\frac{1}{x}}=e$$
错误注意
$$\lim_{x\to0}(1+\frac{1}{x})^{x}=1$$
### 极限不存在
1. 趋近于无穷(使分母为0)
2. 令 $y=f(x)$ ($y=0$ 或 $y=kx$) 极限结果不唯一, 与 $k$ 有关
## 微分学
### 偏导
$$f_x=\lim_{\Delta x\to0}\frac{f(x+\Delta x,y)-f(x,y)}{\Delta x}$$
### 连续
$$\lim_{P\to P_0}F(P) = F(P_0)$$
### 偏导存在但不连续
$$f(x,y)=\begin{cases}
\frac{xy}{x^2+y^2}&,\;x^2+y^2\ne 0,\\
0&,\;x^2+y^2=0
\end{cases}$$
令 $y=kx$ 极限与 $k$ 有关,不存在
### 连续但偏导不存在
$$f(x,y)=\sqrt{x^2+y^2}\\
$$
$f(0,0)$ 处 $x,y$ 偏导均为无穷(不存在)
### 混合偏导
$f_{xy},\;f_{yx}$存在且连续时有
$f_{xy}=f_{yx}$
### 全微分
1. 当$f(P)$可微, 则$f_x(P)$ 与 $f_y(P)$存在且
$$df(P)=f_x(P)dx+f_y(P)dy+o(\rho)$$
2. 当$F_x(P)$ 与 $F_y(P)$ 存在且==偏导数连续==则 $F(x, y)$ 于 $P$ 处可微(==仅充分条件==)
3. 当$F_x(P)$ 与 $F_y(P)$ 不连续时满足
$$\lim_{\rho\to 0}\frac{[f(x+\Delta x,y+\Delta y)-f(x,y)]-f_x(x,y)\Delta x-f_y(x,y)\Delta y}{\rho}=0$$
$$\rho=\sqrt{\Delta x^2+\Delta y^2}$$
也可微(定义的变形, 用于不连续的情况)
4. 可微则一定有一阶偏导且==原函数连续==, 连续不一定可微
### 复合微分 P60
1. 记号
设 $f(x_1,x_2,...,x_i,...)$
记 $f'_i=\frac{\partial f}{\partial x_i}$
2. 对所有含微分变量的函数求偏导, 乘法注意乘法法则
对于 $f(x,xy)$ $f'_1$ ==也是y的函数==, 不能忽视
### 隐函数微分 P65
* 找出自变量(题目最终要求的偏导的自变量, 其他均看作关于自变量的函数)
* 全微分后对所有式子除以自变量的微分(自变量组则分别除以自变量组中的自变量)
* 除了自变量组以外的==因变量除以自变量的微分时, 变为偏微分, 且不可消去==
1. $$dx=f_1du+f_2dv\\
1=f_1\frac{\partial u}{\partial x}+f_2\frac{\partial v}{\partial x}$$
2. $$dy=g_1du+g_2dv\\
0=g_1\frac{\partial u}{\partial x}+g_2\frac{\partial v}{\partial x}$$
3. 结合两个方程解出 $\frac{\partial u}{\partial x}$ 与 $\frac{\partial v}{\partial x}$
## 微分学几何应用
### 方向导数 P69
* 对于向量 $\vec{n}$, 沿 $\vec{n}$ 方向的导数为
$$\frac{\partial f(P)}{\partial n}=\lim_{s\to 0^+}\frac{f(P+s\vec{n})-f(P)}{s|\vec{n}|}$$
注意, 由于方向导数中 ==$s\to 0^+$== 与偏导不同, 因此轴向的方向导数的值与对应偏导无关
* 当 $f(P)$ 可微, 有
$$\frac{\partial f(P)}{\partial n}=\{f_x(P),f_y(P),f_z(P)\}\cdot \vec{n^0}$$
### 梯度
$$grad f(P)=\{f_x(P),f_y(P),f_z(P)\}=\nabla f(P)$$
#### 意义
对于曲面 $F(x, y, z)=m$
1. $m$ 的各个取值构成无数个曲面层
2. 取层上的点P处微面 $dS_m$ , $dS_m$ 近似为平面, 且平行于 $dS_{m+dm}$
3. $grad f(P)$ 为使方向导数最大的方向, 在此方向, 到达 $dS_{m+dm}$ 距离最短
4. 两平面间, 垂直线段距离最短
5. $grad f(P)$ 即为法矢量
### 曲线应用 P73
有无数条线垂直于曲线 $\to$ ==唯一法平面==  
曲线上的一点只有==唯一切线==  
设
$$L:\vec{r} =\vec{s}(t)$$
$$\vec{r}(t)=P\{x_0, y_0, z_0\}$$
有切矢量
$$\vec{r'}(t)=\{x'(t),y'(t),z'(t)\}$$
当 $\vec{r'}$ 连续, 存在且 ==$\vec{r'}\ne\vec{0}$== 则 $\vec{r}$ 为光滑曲线  
切线(以切矢量为方向矢量), 法平面(以切矢量为法矢量)具体见书
#### 一般方程曲线的切矢量
设曲线方程:
$$F(x,y,z)=0\\
G(x,y,z)=0
$$
曲线于P的切矢量必然垂直于两曲面的法矢量
$$\therefore \vec{r'}(P)=grad F(P) \times grad G(P)$$
### 曲面应用
平面有法矢量 $\to$ 曲面上一微元视为平面, 也有==唯一法线==
有无数条线可以切于平面的一点 $\to$ 有==唯一切平面==
设曲面(两个自由度, 为面)
$$F(x, y, z)=C$$
其切矢量为
$$grad F$$
### 自由极值 P80
#### 驻点
$f_x(P)=f_y(P)=0$
成P为 $f(x,y)$ 的驻点
#### 极值点充分条件
对于驻点 $P_0$ 
$$\Delta = f_{xx}f_{yy}-f_{xy}^2$$
1. $\Delta>0, A<0\;P_0$ 为极小值点 
2. $\Delta>0, A>0\;P_0$ 为极大值点 
3. $\Delta<0$ 不是极值点
4. $\Delta=0$ 不确定
#### 求极值
1. 找出区域内所有驻点
2. 找出区域内==一阶偏导不存在的点==
3. 找出==边界上所有极值点==
4. 比较所有受检点, 得出极值于极值点
### 条件极值 P84
已知 $g(x,y)=0$
求函数 $z=f(x,y)$ 极值 
构造辅助变量 $\lambda$
构造辅助函数
$$L(x,y,\lambda)=f(x,y)+\lambda g(x,y)$$
检验 $L(x,y,\lambda)$ 的所有驻点, 即可求出条件极值
#### 多条件极值
$$L(x,y,\lambda, \mu)=f(x,y)+\lambda g(x,y)+\mu h(x,y)$$
其他同
#### 隐函数极值
已知 $f(x,y,z)=0$ (条件)求 $max\{z\}$ (目标)
即
$$L(x,y,z,\lambda)=z+\lambda f(x,y,z)$$
