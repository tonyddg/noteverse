---
order: 8
---

# 傅里叶变换
## 傅里叶积分定理
### 正变换
$$\mathscr{F}[f(t)]=F(\omega)=\int_{-\infty}^{\infty}f(t)e^{-jt\omega}dt$$
### 逆变换
==注意积分前的系数 $\frac{1}{2\pi}$==
$$\mathscr{F}^{-1}[F(\omega)]=f(t)=\frac{1}{2\pi}\int_{-\infty}^{\infty}F(\omega)e^{jt\omega}d\omega$$
* ==只有逆变换前有系数 $\frac{1}{2\pi}$, 正变换前没有系数==

## 单位冲激函数
单位冲激函数 $\delta(t)$ 定义为
1. 当 $t\neq 0$, $\delta(t)=0$
2. $\int_{-\infty}^{\infty}\delta(t)dt=1$
### 筛选性质
$$\int_{-\infty}^{\infty}f(t)\delta(t-t_0)dt=f(t_0)$$
* 由于 $\delta(t)$ 为偶函数, 因此 $\delta(t_0-t)=\delta(t-t_0)$
### 单位阶跃函数
$$u(t)=\begin{cases}
1,&t>0\\
0,&t<0
\end{cases}$$
* 题目中出现 $u(t)$ 时, 即为单位阶跃函数, 需要化为分段函数的形式
### $\delta(t)$ 的傅里叶变换
$$\mathscr{F}[\delta(t)]=\int_{-\infty}^{\infty}\delta(t)e^{-jt\omega}dt=F(\omega)=1$$
则对 $F(\omega)=1$ 逆变换得到积分公式
$$\mathscr{F}^{-1}[1]=\frac{1}{2\pi}\int_{-\infty}^{\infty}e^{jt\omega}d\omega=\delta(t)$$
1. 公式中的自变量 $\omega$ 与 $t$ 可以任意替换
2. 使用此公式即可以计算三角函数的傅里叶变换

## 傅里叶变换的使用
### 线性性质
$$\mathscr{F}[af(t)+bg(t)]=aF(\omega)+bG(\omega)$$ 
$$\mathscr{F}^{-1}[aF(\omega)+bF(\omega)]=af(t)+bf(t)$$
### 卷积
$$f_1(t)*f_2(t)=\int_{-\infty}^{\infty}f_1(\tau)f(t-\tau)d\tau$$
当积分对任意 $t$ 收敛时, 则定义了一个==以 $t$ 为自变量的函数==, 称为卷积
* 注意卷积的积分中, $t$ 为常量, $\tau$ 为积分变量
* 对于含 $\delta(t)$ 的卷积可以使用筛选性质
* 卷积运算满足交换律与结合律
#### 卷积定理
$$\mathscr{F}[f(t)*g(t)]=F(s)\cdot G(s)$$
#### 卷积题目注意
1. 将题目中的阶跃函数化为分段函数
2. 画图, 找到两个(卷积积分中)函数图像中为 0 的区域(可能与 t 有关)
3. 在非零的区域积分
