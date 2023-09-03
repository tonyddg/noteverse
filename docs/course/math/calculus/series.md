# 级数
## 级数性质 P187
1. 当级数收敛
$$\lim_{n\to\infty}a_n=0$$
2. 绝对收敛的级数任意改变加的顺序结果不变  
条件收敛/发散的数列改变加的顺序结果不唯一
3. $a_n\ge b_n$ 有 $\sum a_n\ge\sum b_n$
## 正项级数 P188
称 $a_n\ge0$ 的级数为正项级数, ==以下判别法仅用于正项级数==  
使用以下判别法时必须保证数列上的项大于等于 $0$
1. $$a_n\ge 0$$
2. $$|a_n|$$
3. $$a_n^2$$
### 一般比较判别法 P188
* 条件: $n$ 足够大时有 $a_n\ge b_n$
* 当 $a_n$ 收敛则 $b_n$ 收敛
* 当 $b_n$ 发散则 $a_n$ 收敛
### 极限比较判别法
$$\lim_{n\to\infty}\frac{a_n}{b_n}=l$$
* $l=\infty$ $a_n$ 收敛则 $b_n$ 收敛
* $l=0$ $a_n$ 发散则 $b_n$ 发散
* 极限存在且不为 $0$ $a_n$ 与 $b_n$ 敛散性相同
### 比值判别法 P189
$$\lim_{n\to\infty}\frac{a_{n+1}}{a_n}=l$$
* $l>1$ 级数发散
* $l<1$ 级数收敛
* $l=1$ 不确定
* 用于含有阶乘的级数
* 含有积分时可用洛必达法则
### 根值判别法
$$\lim_{n\to\infty}\sqrt[n]{a_n}=l$$
* $l>1$ 级数发散
* $l<1$ 级数收敛
* $l=0$ 不确定
* 用于含有n次方的级数
### 积分判别法 P190
* 条件: ==$f(x)$ 在 $[1, +\infty)$ 非负且单调递减==
* 当 $\int_1^\infty f(x)dx$ 收敛时, 级数 $a_n=f(n)$ 收敛
* 用于级数为分数时
### 比阶判别法 P191
$$\lim_{n\to\infty}n^pa_n=l$$
$$\lim_{n\to\infty}a_n\sim\lim_{n\to\infty}n^{-p}$$
* 级数 $\sum\frac{1}{n}$ 发散
* 要求极限结果 $l$ 存在
* $p>1\;0\le l<\infty$ 级数收敛
* $p\le1\;0<l\le\infty$ 级数发散
* 通过寻找 $a_n$ 的等价无穷小判断p
### 常用等价无穷小
$$x \sim \sin x \sim \tan x \sim \arcsin x\sim \arctan x\;(x \to 0)$$
$$1-\cos x\sim x^2(x \to 0)$$
$$(1+x)^n - 1 \sim nx\;(x \to 0)$$
$$\lim_{x\to \infty}(1 + \frac{1}{x})^x = \lim_{x\to 0}(1 + x)^{\frac{1}{x}}=e$$
$$a^x - 1 = e^{x \ln a} - 1 \sim x \ln a $$
$$\ln(1 + x) \sim x(x \to 0)$$
## 变号级数
变号级数为正项与负项有无限多的级数
### 莱布尼兹判别法 P193
$a_n$ 为正项级数  
当 $|a_n|$ 严格单调递减且收敛于0时有  
$$\sum(-1)^na_n = S$$
收敛, 且 $S\le a_0$
### 特殊的莱布尼兹判别法
当 $|a_n|$ 从某项开始单调递减且收敛于0时有 $\sum(-1)^na_n = S$ 收敛  
但 $S\le a_0$ ==不成立==
### 绝对/条件收敛 P194
$$\sum|a_n|=S$$
$$\sum a_n=S'$$
* $S$ 存在表明 $a_n$ 绝对收敛, 且 $S'$ 存在
* $S'$ 存在, $S$ 不存在表明 $a_n$ 条件收敛
* 仅绝对收敛可以任意改变求和顺序而不影响结果

## 幂级数 P203
幂级数定义
$$\sum a_nx^n$$
或
$$\sum a_n(x-x_0)^n$$
$a_n$ 为系数
### 收敛半径
对于幂级数都存在一个收敛半径 $R$
* 幂级数在 $x\in(-R,R)$ 内级数绝对收敛且一致收敛(可积分求导)
* 幂级数在 $x\notin[-R,R]$ 级数发散
* $x=\pm R$ 时, ==需要单独验证 绝对/条件收敛或发散==
* 推论: 幂级数只会在收敛半径处条件收敛 ($x_0=0$)
* 收敛半径求法
* 求类幂级数的收敛半径 P204
$$\lim_{n\to\infty}|\frac{a_{n+1}}{a_n}|=\frac{1}{R}$$
### 泰勒级数 P208
$$e^x=\sum_{n=0}^\infty\frac{x^n}{n!}$$
$$\sin x=\sum_{n=1}^\infty \frac{(-1)^{n+1}x^{2n-1}}{(2n-1)!}$$
$$\cos x=\sum_{n=0}^\infty \frac{(-1)^nx^{2n}}{(2n)!}$$
==级数从 $0$ 开始==
$$\frac{1}{1-x}=\sum_{n=0}^\infty x^n ;\;x\in(-1,1)$$
错位相减法
注意收敛范围 级数从 $1$ 开始
$$\ln(x+1)=\sum_{n=1}^\infty(-1)^{n+1}\frac{x^n}{n};\;x\in[-1,1)$$
(求导后, 用 $-x$ 代换得到上式)
#### 求函数的泰勒展开
$$f(x-x_0)=\sum_{i=0}^{\infty}\frac{f(x_0)^{(i)}}{n!}(x-x_0)^{i}$$

1. 注意要求展开的 $x_0$
2. $x_0\ne0$ 可令 $t=x-x_0$ 
3. 展开前提出常数 $e^{x+5}=e^5e^x$
4. 展开(对数或分数) $F(x) = g(x) + f(x)$ 新的收敛范围为两个函数收敛范围的交集 
#### 由泰勒展开求函数 P212
1. 对于含有 $n$ 的项可以整体求导
    * eg 
    $$\frac{d}{dx}(\sum_{n=0}^\infty x^n)=\sum_{n=0}^\infty nx^{n-1}=\frac{1}{(1-x)^2}$$
2. 对于缺少的 $x$ 可以直接乘上( $x$ 视为常数)
    * eg 
    $$\sum_{n=0}^\infty x^{n+1}=x\sum_{n=0}^\infty x^n=\frac{x}{1-x}$$
3. 含 $n!$ 时, 套用 $e^x\;\sin x\;\cos x$
4. 化为常微分方程 寻找 $S$, $S'$, $S''$ 等的关系
5. 错位相减
6.  整体代换(n的系数不为1时)
    * eg 
    $$\sum_{n=0}^\infty x^{2n}=\sum_{n=0}^\infty (x^2)^{n}=\frac{1}{1-x^2}$$
### 傅里叶级数 P217
$$\{\frac{1}{\sqrt{2\pi}},\frac{1}{\sqrt{\pi}}\cos n\theta,\frac{1}{\sqrt{\pi}}\sin m\theta\}$$
函数组中任意两个函数乘积在 $[-\pi,\pi]$ 上的积分结果为 $0$  
函数组中相同的函数乘积在 $[-\pi,\pi]$ 上的积分结果为 $1$  

由此有傅里叶级数

$$a_n=\frac{1}{\pi}\int_{-\pi}^{\pi}f(x)\cos nx dx$$
$$b_n=\frac{1}{\pi}\int_{-\pi}^{\pi}f(x)\sin nx dx$$
$$a_0=\frac{1}{\pi}\int_{-\pi}^{\pi}f(x) dx$$
$$f(x)\sim \frac{a_0}{2}+\sum_{n=1}^\infty(a_n \cos nx+b_n \sin nx)$$
#### 注意
* ==$a_0$ 有一个系数 $\frac{1}{2}$==
* 级数的下限为 $1$
* 必须使用 $\sim$ 连接
#### Dirichlet条件
1. $f(x)$ 在 $[a,b]$ 上连续或只有==有限个第一类间断点==
    * $\frac{1}{x}$ 在 $0$ 处为第二类间断点
2. $f(x)$ 在 $[a,b]$ 上分段单调或可微

当函数在 $[-\pi,\pi]$ 满足此条件则其傅里叶级数处处收敛, 周期为 $2\pi$
#### 傅里叶级数在特殊点的结果
$$S(x)=\begin{cases}
f(x),x\in(-\pi,\pi)且f在x连续,\\
\frac{f(x^+)+f(x^-)}{2},x\in(-\pi,\pi)且f在x不连续,\\
\frac{f((-\pi)^+)+f((\pi)^-)}{2},x=\pm\pi
\end{cases}$$
当 $f(x)$ 为==分段函数时特别注意其间断点==应使用左右极限的极值的平均值
#### 正弦/余弦级数
* 当 $f(x)$ 为奇函数, $a_n=0$ , 级数中仅有正弦函数, 称为正弦级数
* 当 $f(x)$ 为偶函数, $b_n=0$ , 级数中仅有余弦函数, 称为余弦级数
#### 奇/偶延拓
对于一个函数仅在 $[0,\pi]$ 定义时, 可以假设为奇/偶函数并展开为正弦/余弦级数
即仅计算 $a_n$ / $b_n$
注意:
1. 奇延拓 $S(x)=0,\;x=\pi 或 0$ (奇函数与 $x=0$ 的值为 $0$)
2. 偶延拓
    * $S(x)=f(0^+),\;x=0$
    * $S(x)=f(\pi^-),\;x=\pi$
3. 注意奇延拓与偶延拓的取值与一般展开的区别
4. ==偶延拓中第一项仍然是 $\frac{a_0}{2}$==
5. 奇延拓
将 $f(x)$ 直接视为奇函数, 奇函数乘奇函数为偶函数, 使用对称性, ==乘上系数 $2$, 区间变为$(0,\pi)$== 
$$b_n=\frac{2}{\pi}\int_{0}^{\pi}f(x)\sin(nx)dx$$
6. 偶延拓
同上, ==乘上系数 $2$, 区间变为 $(0,\pi)$==
 $$a_n=\frac{2}{\pi}\int_0^{\pi}f(x)\cos(nx)dx$$