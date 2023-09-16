# Ch4. 数字特征
## 数学期望
$$EX=\sum_{i=1}^{\infty}x_ip_i=\int_{-\infty}^{\infty}xf(x)dx$$
### 条件
1. 级数绝对收敛
2. x取绝对值时, 积分存在
### 随机变量函数的数学期望
#### 一维
$$Z=g(X)$$
$$EZ=\sum_{i=1}^{\infty}g(x_i)p_i=\int_{-\infty}^{\infty}g(x)f(x)dx$$
#### 二维
$$Z=g(X,Y)$$
$$EZ=\sum_{i=1}^{\infty}\sum_{j=1}^{\infty}g(x_i,y_j)p_{ij}=\int_{-\infty}^{\infty}\int_{-\infty}^{\infty}g(x,y)f(x,y)dx dy$$
* 最大值的处理 
$$max(X,Y)=\frac{X+Y}{2}+\frac{|X-Y|}{2}$$
$$E[max(X,Y)]=\frac{EX+EY}{2}+\frac{E|X-Y|}{2}$$
* 最小值的处理 
$$min(X,Y)=\frac{X+Y}{2}-\frac{|X-Y|}{2}$$
同最大值
### 性质
1. $$EC=C$$
2. $$E(aX+b)=aEX+b$$
3. 当$X_1,X_2,...X_n$ ==相互独立== 
$$E(X_1X_2...X_n)=EX_1EY_2...EX_n
$$
4. $$[E(XY)]^2\le E(X^2)E(Y^2)$$
5. 当 $X\ge0$ 则 $EX\ge0$  
当 $X\ge Y$ 则 $EX\ge EY$  
6. $$|EX|\le E|X|$$
## 方差
$$DX=E[(X-EX)^2]=E(X^2)-(EX)^2$$
### 条件
$E(X^2)$ 存在(对应级数/积分存在)
### 切比雪夫不等式 P59
$$P(|X-EX|\ge\varepsilon)\le\frac{DX}{\varepsilon^2}$$
### 性质
1. $$DC=0$$
2. $$D(aX+b)=a^2X$$
3. 当$X_1,X_2,...X_n$ ==相互独立== 
$$D(X_1+X_2+...+X_n)=DX_1+DX_2+...+DX_n$$
## 协方差
$$Cov(X,Y)=E[(X-EX)(Y-EY)]=E(XY)-EX EY$$
### 性质
1. 当X, Y 相互独立$$Cov(X,Y)=0$$
2. 分配律
$$Cov(X_1+X_2,Y_1+Y_2)=Cov(X_1,Y_1)+Cov(X_1,Y_2)+Cov(X_2,Y_1)+Cov(X_2,Y_2)$$
3. $$Cov(aX,bY)=abCov(X,Y)$$
4. 对称性
$$Cov(X,Y)=Cov(Y,X)$$
## 相关系数 P65
$$\rho=\frac{Cov(X,Y)}{\sqrt{DX}\sqrt{DY}}$$
### 性质
1. $\rho\in(-1,1)$ 相关系数的绝对值越接近1, XY越成线性关系
2. $\rho=\pm1$ $XY$ 成一条直线($X+kY=n$), 斜率 $>0(\rho=1)/<0(\rho=-1)$
$$\to P(\frac{X-EX}{\sqrt{DX}}=\pm\frac{Y-EY}{\sqrt{DY}})=1$$
3. $\rho=0$ $XY$ 不成直线关系(==不能说明$XY$独立==, 可能$1=X^2+Y^2$)
4. $XY$ 独立则 $\rho=0$
## 标准化随机变量
$$Y=\frac{X-EX}{\sqrt{DX}}$$
此时 $EY=0$ $DY=1$