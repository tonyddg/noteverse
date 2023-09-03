# 拉普拉斯变换
$f(t)$ 为定义在 $[0,+\infty)$ 的实函数, $s=\beta+j\omega$ 为复参数, 其中 $\beta$ 为一个足够大的实数, 像函数 $F(s)$ 在复平面上某一区域内收敛
$$\mathscr{L}[f(t)]=F(s)=\int_{0}^{+\infty}f(t)e^{-st}dt=\mathscr{F}[f(t)u(t)e^{-\beta t}]$$
* 认为在拉普拉斯变换中的原函数定义域一定是 $[0,+\infty)$, 因此默认原函数在 $t<0$ 时取 $0$, 则 $u(t)$ 与 $f(t)=1$ 作为原函数等价
## 常用变换
1. $$\mathscr{L} [1]=\frac{1}{s}$$
2. $$\mathscr{L} [e^{\alpha t}]=\frac{1}{s-\alpha}$$
3. $$\mathscr{L} [\delta(t)]=1$$
4. $$\mathscr{L} [t^{m}]=\frac{m!}{s^{m+1}}$$
5. $$\mathscr{L} [cos\alpha t]=\frac{s}{s^2+\alpha^2}$$
6. $$\mathscr{L} [sin\alpha t]=\frac{\alpha}{s^2+\alpha^2}$$
* 可将常用变换结果作为积分公式用于傅里叶变换等积分计算
## 拉普拉斯变换的性质
### 微分性质
$$\mathscr{L}[f'(t)]=sF(s)-f(0)$$
$$\mathscr{L}[f^{(n)}(t)]=s^{n}F(s)-s^{n-1}f(0)-s^{n-2}f'(0)-...-f^{(n-1)}(0)$$
* 对常微分方程整体使用此方法可以化去其中的微分项, 从而得到解的拉普拉斯变换, 对解使用逆变换得到方程的解
* 在使用此方法前先规定 $\mathscr{L}[y(t)]=Y(s)$
### 延迟性质
设 $\mathscr{L}[f(t)]=F(s)$, ==当 $t<0$ 时, $f(t)=0$==, 对于任意非负实数 $\tau$ 有 
$$\mathscr{L}[f(t-\tau)]=e^{-s\tau}F(t)$$
相应地有 
$$\mathscr{L}^{-1}[e^{-s\tau}F(s)]=f(t-\tau)u(t-\tau)$$

* 由于拉普拉斯变换中, 像函数 $f(t)$ 默认为非负, 因此逆变换后的 $f(t-\tau)$ 也是非负函数
* 可用于求 $F(s)e^{-\alpha s}$ 型函数的逆变换
* 由于当 $t<0$ 时, $f(t)=0$ 这一要求, 因此 $\mathscr{L}[sin(t-\pi)]\neq \mathscr{L}[-cos(t)]$, $sin(t-\pi)$ 在 $t<\pi$ 均为 $0$
### 位移性质
设 $\mathscr{L}[f(t)]=F(s)$, $a$ 为任意复常数, 则有 
$$\mathscr{L}[e^{at}f(t)]=F(s-a)$$
* 可结合常用变换, 用于计算拉普拉斯变换 eg. 
$$\mathscr{L}^{-1}[\frac{m!}{(s-a)^{m+1}}]=e^{at}t^{m}$$
* 位移性质中, ==原函数的自变量为 $t$, 像函数的自变量为 $t-a$==
* 利用 $\mathscr{L}[e^at\cdot 1]=\frac{1}{s-a}$ 记忆
### 卷积
与傅里叶变换的卷积不同, 拉普拉斯变换中, $f(t),g(t)$ 在 $t<0$ 时取 0, 卷积运算为
$$f(t)*g(t)=\int_{0}^{t}f(\tau)g(t-\tau)d\tau$$
* 注意积分范围为 $(0,t)$
#### 卷积定理
与傅里叶变换类似 
$$\mathscr{L}[f(t)*g(t)]=F(s)\cdot G(s)$$
## 微分方程求解
1. 尽量将单个分式化为几个简单分式之和
2. 将二次项补充为完全平方公式(用于对应三角函数的变换)
3. 位移性质中, ==原函数的自变量为 $t$, 像函数的自变量为 $t-a$==
