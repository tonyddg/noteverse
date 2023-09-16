# Ch3. 多维随机变量
## 联合分布函数 P36
### 计算
* $$P(a<X\le b,c<Y\le d)=F(b,d)+F(a,c)-F(b,c)-F(a,d)$$
* 注意, 不是导数关系 
$$F(x,\infty)=F_X(x)\\F(\infty,y)=F_Y(y)$$
### 性质
1. 非负性
$$0\le F(x,y)\le 1$$
2. 单调递增
对于X与Y分别单调递增
3. 右连续
有等号的地方没有等号, 没有等号的地方有等号时, 取负极限
4. $$P(-\infty,y)=P(x,-\infty)=0,\;P(+\infty,+\infty)=1$$
5. $$P(a<X\le b,c<Y\le d)=F(b,d)+F(a,c)-F(b,c)-F(a,d)>0$$
## 联合密度函数 P39
### 性质
1. $$F(\infty,\infty)=\int_{-\infty}^{\infty}\int_{-\infty}^{\infty} f(x,y)dx dy=1$$
2. $$f(x,y)=\frac{\partial^2 F(x,y)}{\partial x\partial y}$$
3.  $$f_x(x)=\int_{-\infty}^{\infty}f(x,y)dy$$
$$f_y(y)=\int_{-\infty}^{\infty}f(x,y)dx$$
通过积分消去 $x/y$. 对于广义积, 分化为以 $x/y$ 的分段函数再积分. 

注意两者不是导数关系
## 连续型联合分布函数
### 均匀分布
$$f(x,y)=\begin{cases}
\frac{1}{S}&,(x,y)\in S,\\
0&,其余
\end{cases}$$
### 二维正态分布
$$(X,Y)\sim N(\mu_1,\mu_2,\sigma_1^2,\sigma_2^2,\rho)$$
* $\mu_1,\mu_2$ X与Y的平均值
* $\sigma_1^2,\sigma_2^2$ X与Y的方差
* $\rho$ X与Y的相关系数
#### 性质
1. $X\sim N(\mu_1,\sigma_1^2)$ ; $Y\sim N(\mu_2,\sigma_2^2)$
2. $C_1X+C_2Y\sim \text{一维正态分布}$
3. $X,Y\text{独立}\iff \rho=0$ (仅有二维正态分布有此性质)
4. 在 $X=x$ 条件下(P43), 
$$Y|X=x\sim N(\mu_2+\rho\frac{\sigma_2}{\sigma_1}(x-\mu_1),(1-\rho^2)\sigma_2^2)$$
公式中新期望的记忆方法
$$\frac{Y-EY}{\sqrt{DY}}=\rho\frac{X-EX}{\sqrt{DX}}$$
## 条件分布
记 $P(X\le x|Y=y)=F(x|y)$
### 连续型随机变量 P42
$$\because F(x|y)=\frac{F(x,y)-F(x,y^-)}{f_Y(y)dy}=\frac{\frac{\partial F(x,y)}{\partial y}}{f_Y(y)}$$ 
$$\therefore f(x|y)=\frac{f(x,y)}{f_Y(y)}$$
### 离散型随机变量
$$P(X+Y<a|Y=b)=\frac{P(X+b<a)}{P(Y=b)}$$
### 独立性
$$X,Y独立\iff f(x,y)=f_x(x)f_y(y)\iff F(x,y)=F_X(x)F_Y(y)$$
技巧
$X,Y$ 独立, 求 $P(G(X,Y)<0)$
可以化为(注意分情况, ==负正得负, 负负得正==) 
$$P(G(X,Y)<0)=P(f_1(X)f_2(Y)<0)=P(f_1(X)<0)P(f_2(Y)>0)+P(f_1(X)>0)P(f_2(Y)<0)$$
## 多维随机变量函数 P45
### 连续型
#### 加法
$$Z=aX+bY$$
$$f_z(z)=\int_{-\infty}^{\infty}\frac{1}{|b|}f(x,\frac{z-ax}{b})dx$$
1. 用 $z,x$ 表示 $y$ 带入
2. 对 $x$ 积分, 消去 $x$
3. 除以 $z$ 的系数的绝对值
#### 乘法
$$Z=XY$$
$$f_z(z)=\int_{-\infty}^{\infty}\frac{1}{|x|}f(x, \frac{z}{x})dx$$
#### 除法
$$Z=\frac{Y}{X}$$
$$f_z(z)=\int_{-\infty}^{\infty}|x|f(x,zx)dx$$
#### 最大值
设 $X_1,X_2,...,X_n$ 相互独立
$$Z=max\{X_1,X_2,...,X_n\}$$
$$P(Z\le z)=P(max\{X_1,X_2,...,X_n\}\le z) 即大于所有X_n$$
$$P(Z\le z)=P(X_1\le z)P(X_2\le z)...P(X_n\le z)$$
$$\therefore F(z)=F_{X_1}(z)F_{X_2}(z)...F_{X_n}(z)$$
#### 最小值
设 $X_1,X_2,...,X_n$ 相互独立
$$Z=min\{X_1,X_2,...,X_n\}$$
$$P(Z> z)=P(min\{X_1,X_2,...,X_n\}> z) 即小于所有X_n$$
$$P(Z> z)=P(X_1> z)P(X_2> z)...P(X_n> z)$$
$$P(Z\le z)=1-P(Z>z)=1-(1-P(X_1\le z))(1-P(X_2\le z))...(1-P(X_n\le z))$$
$$\therefore F(z)=1-(1-F_{X_1}(z))(1-F_{X_2}(z))...(1-F_{X_n}(z))$$
#### 正态总体的样本
设 $X_1,X_2,...,X_n$ 相互独立且 $X_i\sim N(\mu, \sigma^2)$
$$\sum_{i=1}^nC_iX_i\sim N(\mu\sum_{i=1}^nC_i, \sigma^2\sum_{i=1}^nC_i^2)$$
* 即 $X_i$ 的线性组合仍为正态分布, 参数为新的期望/方差
* 两个独立的不同的正态分布线性组合可以化为标准正态
### 分段
计算多位随机变量函数时, 要注意分段, 以 $(X,Y)\sim U(0\le X,Y\le1)\;Z=X+Y$ 为例
1. 通过 X, Y 得出 Z 的取值范围 ($0\le Z\le2$)
2. 采用消去 Y 的方法, 得到 $y=g(x,y)$ ($y=z-x$)
3. 将$Y$带入取值范围, 得到两个关于$X$的不等式 
$$\begin{cases}
&0\le x\le1\\
&z-1\le x\le z
\end{cases}$$
4. 通过移动$Z$的取值, 的到$X$的不同上下限(同时分段), 对$X$上下限积分, 得到$f_z(z)$ 
### 含有离散型的多维随机变量函数 P47
1. [消去](#离散型随机变量)离散型部分
2. 合理分段(见书)