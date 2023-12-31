---
order: 2
---

# 傅里叶变换
> 参考自教程 <https://www.bilibili.com/video/BV1Et411R78v>

## 三角函数系
对于函数集合
$$C={1,\sin x,\cos x,\sin 2x, \cos 2x, \dots, \sin nx, \cos nx}$$

称之为三角函数系

### 正交性
函数集合内的任取两个==不同==的函数在 $(-\pi,\pi)$ 上的卷积均为 $0$  
将这一性质称为正交性

观察函数图像可得, 对于 $\sin nx, \cos nx, n\in \{x\in Z\big| x\neq 0\}$ 均有
$$\int_{-\pi}^{\pi}\sin nx\mathrm{d}x=0,\int_{-\pi}^{\pi}\cos nx\mathrm{d}x=0$$

通过[积化和差公式](/course/math/hand_book/function.md#积化和差公式)可得, 以下卷积的结果均为 $0$
$$\sin nx*\cos mx=\sin nx*\sin mx=\cos nx*\cos mx=0(m\neq n)$$

### 同一函数卷积
当 $m=n\neq 0$ 时 (从 $C$ 中选取两个相同函数), 则有
$$\int_{-\pi}^{\pi}\sin^2 mx\mathrm{d}x=\frac{1}{2}\int_{-\pi}^{\pi}[-\cos(m+n)+1]\mathrm{d}x=\pi$$
$$\int_{-\pi}^{\pi}\cos^2 mx\mathrm{d}x=\frac{1}{2}\int_{-\pi}^{\pi}[\cos(m+n)+1]\mathrm{d}x=\pi$$

当取 $C$ 中的 $1$ 时, 则有
$$\int_{-\pi}^{\pi}\mathrm{d}x=2\pi$$

## 傅里叶级数
### 周期为 2π 的傅里叶级数
对于一个以 $2\pi$ 为周期的函数 $f(x)=f(x+2\pi)$

可以将其展开为傅里叶级数
$$f(x)=\frac{a_0}{2}+\sum_{n=1}^\infty [a_n\cos nx+b_n\sin nx]$$

根据三角函数的正交性  
对于 $1*f(x)$, 仅 $\frac{a_0}{2}$ 项的积分结果不为 $0$
$$\int_{-\pi}^{\pi}f(x)\mathrm{d}x=\frac{1}{2}a_0\int_{-\pi}^{\pi}\mathrm{d}x=\pi a_0$$

对于 $\cos nx*f(x)$, 仅 $a_n\cos nx$ 项的积分结果不为 $0$
$$\int_{-\pi}^{\pi}\cos nx\cdot f(x)\mathrm{d}x=a_n\int_{-\pi}^{\pi}\cos^2 nx\mathrm{d}x=\pi a_n$$

对于 $\sin nx*f(x)$, 仅 $b_n\sin nx$ 项的积分结果不为 $0$
$$\int_{-\pi}^{\pi}\sin nx\cdot f(x)\mathrm{d}x=b_n\int_{-\pi}^{\pi}\sin^2 nx\mathrm{d}x=\pi b_n$$

因此傅里叶级数中的系数满足
$$\begin{split}
a_0&=\frac{1}{\pi}\int_{-\pi}^{\pi}f(x)\mathrm{d}x\\
a_n&=\frac{1}{\pi}\int_{-\pi}^{\pi}\cos nx\cdot f(x)\mathrm{d}x\\
b_n&=\frac{1}{\pi}\int_{-\pi}^{\pi}\sin nx\cdot f(x)\mathrm{d}x
\end{split}$$

### 周期为 2L 的傅里叶级数
对于一个以 $2L$ 为周期的函数 $f(t)=f(t+2L)$

可以使用变量代换 $t=\frac{L}{\pi}x$ 将其转变为一个以 $2\pi$ 为周期的函数
$$g(x)=f(\frac{L}{\pi}x)\to g(x+2\pi)=f(\frac{L}{\pi}(x+2\pi))$$

因此将 $x=\frac{\pi}{L}t$ 带入 $g(x)$ 的傅里叶级数中, 即可得到 $f(t)$ 的傅里叶级数  
定义 $\omega_0=\frac{\pi}{L}$, 三角函数换元后有 
$$\sin nx=\sin n\omega_0 x,\cos nx=\cos n\omega_0 x$$  

积分换元后有
$$\int_{-\pi}^{\pi}g(x)\mathrm{d}x=\frac{\pi}{L}\int_{-L}^{L}f(t)\mathrm{d}t$$

因此对于周期为 $2L$ 的傅里叶级数有
$$\begin{split}
f(t)&=\frac{a_0}{2}+\sum_{n=1}^{\infty}[a_n\cos n\omega_0 t+b_n\sin n\omega_0 t]\\
a_0&=\frac{1}{L}\int_{-L}^{L}f(t)\mathrm{d}t\\
a_n&=\frac{1}{L}\int_{-L}^{L}\cos n\omega_0 t\cdot f(t)\mathrm{d}t\\
b_n&=\frac{1}{L}\int_{-L}^{L}\sin n\omega_0 t\cdot f(t)\mathrm{d}t
\end{split}$$

### 周期信号的傅里叶级数
在工程中, 信号为从 $0$ 开始, 以 $T$ 为周期的函数, 因此定义变换 (其中 $\omega_0$ 为**基频**)
$$T=2L,\omega_0=\frac{2\pi}{T}$$

易得对于周期为 $2T$ 的函数
$$\int_{-L}^{L}f(t)\mathrm{d}t=\int_{0}^{T}f(t)\mathrm{d}t$$

可以得到
$$\begin{split}
f(t)&=\frac{a_0}{2}+\sum_{n=1}^{\infty}[a_n\cos n\omega_0 t+b_n\sin n\omega_0 t]\\
a_0&=\frac{2}{T}\int_{0}^{T}f(t)\mathrm{d}t\\
a_n&=\frac{2}{T}\int_{0}^{T}\cos n\omega_0 t\cdot f(t)\mathrm{d}t\\
b_n&=\frac{2}{T}\int_{0}^{T}\sin n\omega_0 t\cdot f(t)\mathrm{d}t
\end{split}$$

### 例题
![](./src/fourier_exp1.drawio.svg)

将如图所示的周期函数 $f(t)$ 分解为傅里叶级数

如图所示, $f(t)$ 有周期 $2L=20$, 取 $\omega_0=\frac{\pi}{L}=\frac{\pi}{10}$

如图, 函数在周期 $L$ 内可以视为一个分段函数, 因此积分时分段处理  
计算 $a_0$
$$a_0=\frac{1}{10}(\int_{0}^{10}7\mathrm{d}t+\int_{10}^{20}3\mathrm{d}t)=10$$

计算 $a_n$, 注意 $\sin(n\pi)=0(n\in Z)$
$$\begin{split}a_n&=\frac{1}{10}[\int_{0}^{10}7\cos(\frac{\pi}{10}nt)\mathrm{d}t+\int_{10}^{20}3\cos(\frac{\pi}{10}nt)\mathrm{d}t]\\
&=\frac{1}{10}[7\frac{10}{\pi}\sin(\frac{\pi}{10}nt)\big|_{0}^{10}+3\frac{10}{\pi}\sin(\frac{\pi}{10}nt)\big|_{10}^{20}]\\
&=0\end{split}$$

计算 $b_n$, 注意 $\cos(2n\pi)=1,\cos[(2n+1)\pi]=-1,\cos(n\pi)=(-1)^n,n\in Z$
$$\begin{split}b_n&=\frac{1}{10}[\int_{0}^{10}7\sin(\frac{\pi}{10}nt)\mathrm{d}t+\int_{10}^{20}3\sin(\frac{\pi}{10}nt)\mathrm{d}t]\\
&=\frac{1}{10}[-7\frac{10}{\pi}\cos(\frac{\pi}{10}nt)\big|_{0}^{10}-3\frac{10}{\pi}\cos(\frac{\pi}{10}nt)\big|_{10}^{20}]\\
&=\frac{1}{\pi}[7-7(-1)^{n}+3(-1)^{n}-3]\\
&=\frac{4-4(-1)^n}{\pi}\end{split}$$

综上可得
$$f(t)=5+\sum_{n=1}^{\infty}\frac{4-4(-1)^n}{\pi}\sin(\frac{\pi}{10}nt)$$

::: echarts f(t) 的傅里叶级数前 4 项叠加图像
```js
//需要绘制的函数曲线
function func1(x) {
  return 8 / Math.PI * Math.sin(Math.PI / 10 * x);
}
function func2(x) {
  return 8 / (3 * Math.PI) * Math.sin(Math.PI * 3 / 10 * x);
}
function func3(x) {
  return 8 / (5 * Math.PI) * Math.sin(Math.PI * 5 / 10 * x);
}
function func4(x) {
  return func1(x) + func2(x) + func3(x);
}

function generateData(fun, start, end, gap) {
  let data = [];
  for (let i = start; i <= end; i += gap) {
    data.push([i, fun(i)]);
  }
  return data;
}

option = {
  legend: {
  },
  xAxis: {
    name: 'x',
    type: 'value',
    axisLine: {
      symbol: ['none', 'arrow'],
    },
    axisTick: {
      inside: true
    }
  },
  yAxis: {
    name: 'y',
    type: 'value',
    axisLine: {
      symbol: ['none', 'arrow'],
    },
    axisTick: {
      inside: true
    },
  },
  series: [
    {
      name: 'b1',
      type: 'line',
      showSymbol: false,
      data: generateData(func1, 0, 30, 0.05)
    },
    {
      name: 'b2',
      type: 'line',
      showSymbol: false,
      data: generateData(func2, 0, 30, 0.05)
    },
    {
      name: 'b3',
      type: 'line',
      showSymbol: false,
      data: generateData(func3, 0, 30, 0.05)
    },
    {
      name: 'y=f\'(t)',
      type: 'line',
      showSymbol: false,
      data: generateData(func4, 0, 30, 0.05)
    }
  ]
}
```
:::

## 傅里叶变换推导
### 傅里叶级数的复数形式
#### 三角函数的复数形式
根据欧拉公式有
$$e^{i\theta}=\cos\theta+i\sin\theta$$

据此以及三角函数的奇偶性, 可将三角函数表示为复数形式  
$$\sin\theta=\frac{1}{2i}(e^{i\theta}-e^{-i\theta})=\frac{-i}{2}(e^{i\theta}-e^{-i\theta})$$  
$$\cos\theta=\frac{1}{2}(e^{i\theta}+e^{-i\theta})$$

#### 复数形式的展开
将复数形式的三角函数带入傅里叶级数  
$$\begin{split}
f(t)&=\frac{a_0}{2}+\sum_{n=1}^{\infty}[a_n\cos(n\omega_0 t)+b_n\sin(n\omega_0 t)]\\
&=\frac{a_0}{2}+\sum_{n=1}^{\infty}[\frac{a_n-ib_n}{2}e^{in\omega_0 t}+\frac{a_n+ib_n}{2}e^{-in\omega_0 t}]\\
&=\frac{a_0}{2}+\sum_{n=1}^{\infty}\frac{a_n-ib_n}{2}e^{in\omega_0 t}+\sum_{n=-\infty}^{-1}\frac{a_{-n}+ib_{-n}}{2}e^{in\omega_0 t}\\
&=\sum_{-\infty}^{\infty}C_n e^{in\omega_0 t}
\end{split}$$

现推导系数 $C_n$  
当 $n=0$
$$C_0=\frac{a_0}{2}=\frac{1}{T}\int_{0}^{T}f(t)\mathrm{d}t$$

当 $n>0$
$$\begin{split}
C_n&=\frac{a_n-ib_n}{2}\\
&=\frac{1}{T}\int_{0}^{T}f(t)\cdot[\cos(n\omega_0 t)-i\sin(n\omega_0 t)]\mathrm{d}t\\
&=\frac{1}{T}\int_{0}^{T}f(t)\cdot e^{-in\omega_0 t}\mathrm{d}t
\end{split}$$

当 $n<0$
$$\begin{split}
C_n&=\frac{a_{-n}+ib_{-n}}{2}\\
&=\frac{1}{T}\int_{0}^{T}f(t)\cdot[\cos(-n\omega_0 t)+i\sin(-n\omega_0 t)]\mathrm{d}t\\
&=\frac{1}{T}\int_{0}^{T}f(t)\cdot e^{-in\omega_0 t}\mathrm{d}t
\end{split}$$

综上可得, 复数傅里叶级数的系数 $C_n$ 对于任意 $n$ 均有同一个表达式
$$C_n=\frac{1}{T}\int_{0}^{T}f(t)\cdot e^{-in\omega_0 t}\mathrm{d}t$$ 

### 周期函数傅里叶级数的特点
根据傅里叶级数的复数表达, 在复平面上傅里叶级数的每一项中
1. $e^{in\omega_0 t}$ 体现了一个以 $n\omega_0$ 为角速度旋转的向量
1. $|C_n|$ 确定了这个向量的幅值
1. $\phase{C_n}$ 确定了这个向量在 $t=0$ 的相位角

因此周期函数的傅里叶本质上是将周期函数分解为频率为基频的整数倍 $n\omega_0$ 的无数个周期性旋转   
即==周期函数的频域以 $\Delta\omega=\omega_0$ 为间隔==

![](./src/square_n_-7_7.gif =x200) ![](./src/square_n_0_7.gif =x200) 

![](./src/saw_n_-7_7.gif =x200) ![](./src/saw_n_0_7.gif =x200)

### 非周期函数的傅里叶变换
对于非周期函数 $f(t)$ 其周期 $T\to\infty$, 基频 $\omega_0\to 0$  
因此函数的频率分布之间的间隔 $\omega_0=\Delta\omega\to 0$, 此时==函数的频域连续分布==    
根据以下变换
$$n\omega_0\to\omega\quad\sum_{n=-\infty}^{\infty}s(n\omega_0)\to\int_{-\infty}^{\infty}s(\omega)\quad\frac{1}{T}=\frac{\Delta\omega}{2\pi}\to\frac{\mathrm{d}\omega}{2\pi}$$

带入 $f(t)$ 的傅里叶级数

$$\begin{split}
f(t)&=\sum_{n=-\infty}^{\infty}C_n e^{in\omega_0 t}\\
&=\frac{1}{T}\sum_{n=-\infty}^{\infty}(\int_{-\frac{T}{2}}^{\frac{T}{2}}f(t)e^{-in\omega_0 t}\mathrm{d}t)e^{in\omega_0 t}\\
&=\frac{\mathrm{d}\omega}{2\pi}\int_{-\infty}^{\infty}(\int_{-\infty}^{\infty}f(t)e^{-i\omega t}\mathrm{d}t)e^{i\omega t}\\
&=\frac{1}{2\pi}\int_{-\infty}^{\infty}(\int_{-\infty}^{\infty}f(t)e^{-i\omega t}\mathrm{d}t)e^{i\omega t}\mathrm{d}\omega
\end{split}$$

此时 $C_n$ 可以被表示成一个连续的函数 $F(\omega)$, 因此有
$$\begin{split}
&F(\omega)=\mathscr{F}[f(t)]=\int_{-\infty}^{\infty}f(t)e^{-i\omega t}\mathrm{d}t\\
&f(t)=\mathscr{F}^{-1}[F(\omega)]=\frac{1}{2\pi}\int_{-\infty}^{\infty}F(\omega)e^{i\omega t}\mathrm{d}\omega
\end{split}$$

其中  
$F(\omega)=\mathscr{F}[f(t)]$ 为傅里叶正变换  
$f(t)=\mathscr{F}^{-1}[F(\omega)]$ 为傅里叶逆变换

根据推导可得, 傅里叶变换得到的 $F(\omega)$ 相当于 $C_n=F(\omega)\mathrm{d}\omega$, 因此 $F(\omega)$ 并不代表信号中频率为 $\omega$ 的成分, 而是在频率范围 $\omega\sim\mathrm{d}\omega$ 内的密度  
因此 ==$F(\omega)$ 体现的是信号在 $\omega$ 的幅值密度==而非幅值 (与傅里叶级数做区分)

## 工程应用
### 频率下的傅里叶变换与级数
分析时, 工程上更多采用频率 $f$ 而非角频率

注意, 以上推导中, $\omega$ 均指角频率而非一般频率 $f$  
根据频率与角频率之间的关系
$$f=2\pi\omega,f_0=\frac{1}{T}$$

对傅里叶变换中的积分变量进行变量代换可得
$$\begin{split}
&F(f)=\mathscr{F}[f(t)]=\int_{-\infty}^{\infty}f(t)e^{-j2\pi ft}\mathrm{d}t\\
&f(t)=\mathscr{F}^{-1}[F(f)]=\int_{-\infty}^{\infty}F(f)e^{j2\pi ft}\mathrm{d}f
\end{split}$$

对傅里叶级数的复数形式做变量代换后有
$$\begin{split}
&C_n=\frac{1}{T}\int_{-\frac{T}{2}}^{\frac{T}{2}}f(t)e^{-j2\pi nf_0t}\mathrm{d}t\\
&f(t)=\sum_{n=-\infty}^{\infty}C_n e^{j2\pi nf_0t}
\end{split}$$

对傅里叶级数做变量代换后有
$$\begin{split}
&a_0=\frac{1}{T}\int_{-\frac{T}{2}}^{\frac{T}{2}}f(t)\mathrm{d}t\\
&a_n=\frac{2}{T}\int_{-\frac{T}{2}}^{\frac{T}{2}}f(t)\cos(2\pi nf_0)\mathrm{d}t\\
&b_n=\frac{2}{T}\int_{-\frac{T}{2}}^{\frac{T}{2}}f(t)\sin(2\pi nf_0)\mathrm{d}t\\
&f(t)=a_0+\sum_{n=1}^\infty a_n\cos(2\pi nf_0)+b_n\sin(2\pi nf_0)
\end{split}$$

### 分析频谱
定义 $f_n=n\cdot f_0$ 为 $n$ 次谐波分量, 傅里叶级数中的系数 $a_n,b_n,C_n$ 可看作一个关于 $nf_0$ 的离散函数  
$$a[f_n]=a_n,b[f_n]=b_n,C[f_n]=C_n$$

#### 傅里叶级数的频谱
由于傅里叶级数中, 同一频率 $f_n$ 的两个三角函数可以通过辅助角公式合称为单个三角函数
$$a_n\cos(2\pi nf_0)+b_n\sin(2\pi nf_0)=\sqrt{a_n^2+b_n^2}\cos(2\pi nf_0-\varphi_n)$$

因此可得到信号中频率为 $f_n$ 的分量, 并根据此分量确定信号中 $f_n$ 分量的幅值 $A_n$ 与频率 $\varphi_n$

* 实频谱满足 $a[f_n]$
* 虚频谱满足 $b[f_n]$
* 幅值谱满足 $A[f_n]=\sqrt{a_n^2+b_n^2}$
* 相位谱满足 $\varphi[f_n]=\arctan{\frac{b_n}{a_n}}$

#### 傅里叶级数的复数频谱
为了与傅里叶级数的频谱区分, 有关傅里叶级数的复数形式的频谱称为傅里叶级数谱或 FS 谱, 双边谱  

傅里叶级数的复数频谱通常直接来自复数系数 $C_n$, 且存在负频率 $f_n<0$

* FS 实频谱满足 $Re[f_n]=Re[C_n]$
* FS 虚频谱满足 $Im[f_n]=Im[C_n]$
* FS 幅值谱满足 $A[f_n]=|C_n|$
* FS 相位谱满足 $\varphi[f_n]=\phase{C_n}$

#### 傅里叶变换的频谱
根据[傅里叶变换的推导](#非周期函数的傅里叶变换)可知, 傅里叶变换得到 $F(f)$ 为频率密度函数, 但由于傅里叶变换一般以非周期信号为对象, 因此称其为非周期信号频谱或 FT 谱

注意频率密度函数 $F(f)$ 的函数值为复数, 且是一个 $(-\infty,\infty)$ 上的连续函数, 因此 FT 谱在频率上均为连续的, 且存在负频率

* FS 实频谱满足 $F_R(f)=Re[F(f)]$
* FS 虚频谱满足 $F_I(f)=Im[F(f)]$
* FS 幅值谱满足 $|F(f)|=\sqrt{Re[F(f)]^2+Im[F(f)]^2}$
* FS 相位谱满足 $\phase{F(f)}=\operatorname{Arctan}(Re[F(f)],Im[F(f)])$

#### 频谱之间的转换
* 单边谱幅值与双边谱幅值 (傅里叶级数与傅里叶级数的复数形式)  
由于负数频率仅代表相反的旋转方向, 频率性质与正数频率一致  
因此将==双边幅值谱中的正负频率对应的幅值相加即可得到单边幅值谱==

* 周期函数的频率密度函数与频谱  
由于周期信号由确定的几个频率 $f_n$ 组成, 且没有 $f\neq f_n$ 的频率成分  
因周期信号的频率密度函数为一系列大小与其傅里叶级数有关的冲激函数, 满足
$$F(f)=\sum_{n=-\infty}^{\infty} C_n\delta(f-nf_0)$$

* 功率谱与幅值谱  
根据功率的定义, 功率谱与幅值谱之间满足
$$A^2[f_n]=(A[f_n])^2$$

* 频率与角频率的频谱  
比较两种频率类型下的傅里叶系数与变换方法可得, 频率与角频率的频谱在对应的频率上相同, 仅复原方法不同

### 常见信号的傅里叶变换与级数
对于复杂信号的傅里叶变换可根据傅里叶变化的线性性, 拆分为几个简单信号分析, 最后再线性叠加得到信号的频谱

线性组合时, 应在原始级数系数 / 频率密度曲线的基础上进行

确定信号基频 $f_0$ 时
* 对于由三角函数组成的信号, 应提出 $2\pi$ 或根据给出信息确定各个信号的频率, 其最小公约数为基频
* 对于其他信号, 则可根据信号的周期确定基频 $f_0=\frac{1}{T}$

#### 余弦函数
整体信号基频为 $f_0$, 对于其中的余弦信号
$$f(t)=A\cos(2\pi kf_0t)$$

* 傅里叶级数 
$$a_k=A,b_n=0$$
* 复数形式的傅里叶级数
$$C_{\pm k}=\frac{A}{2}$$
* 傅里叶变换
$$F(f)=\frac{A}{2}[\delta(f-kf_0)+\delta(f+kf_0)]$$

#### 正弦函数
整体信号基频为 $f_0$, 对于其中的正弦信号
$$f(t)=A\sin(2\pi kf_0t)$$

* 傅里叶级数 
$$a_n=0,b_k=A$$
* 复数形式的傅里叶级数
$$C_{\pm k}=\mp\frac{A}{2}j$$
* 傅里叶变换
$$F(f)=\frac{A}{2}j[-\delta(f-kf_0)+\delta(f+kf_0)]$$

#### 含相位角的余弦函数
$$f(t)=A\cos(2\pi kf_0t+\varphi)$$

具体分析时, 可拆分为余弦函数与正弦函数之和
$$f(t)=A\cos(\varphi)\cos(2\pi kf_0t)-A\sin(\varphi)\sin(2\pi kf_0t)$$

或使用傅里叶变换的时移特性
$$f'(t)=A\cos(2\pi kf_0t)\quad f(t)=f(t+\frac{\varphi}{2\pi kf_0})\\
F'(f)=\frac{A}{2}[\delta(f-kf_0)+\delta(f+kf_0)]\quad F(f)=\frac{A}{2}[e^{\varphi j}\delta(f-kf_0)+e^{-\varphi j}\delta(f+kf_0)]$$

#### 窗函数
对于一宽度为 $T$, 高度为 $A$ 的矩形窗函数
$$f(t)=\begin{cases}
A,&-\frac{T}{2}<t<\frac{T}{2}\\
0,&\text{其余}
\end{cases}$$

由于为非周期信号, 因此仅有傅里叶变换
$$F(f)=\frac{A\sin\pi f T}{\pi f}$$

注意, 对于 $F(f)$ 在 $f=0$ 的极限 $\lim_{f\to 0}\frac{A\sin\pi f T}{\pi f}=AT$
