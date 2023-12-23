---
order: 2
---

# 一维随机变量
## 分布函数
注意小于等于号
$$F_X(x)=P(X\le x)(x\in\R)$$
### 性质
1. 单调非降
2. 右连续 
$$\lim_{x\to a^+}F(x)=F(a)=P(X\le x)$$
间断点取值与右侧相同  
$x\to a^+$ $x$ 从 $a$ 的右侧趋近  
$P(X\le a)$ 必定包含a点  

3. $$F(-\infty)=0\le F(x)\le F(+\infty)=1$$
通过数轴图理解
### 计算
$$F(b)-F(a)=P(a<X\le b)$$
有等号的地方没有等号, 没有等号的地方有等号时, 取负极限
$$\lim_{x\to a^-}F(x)=P(X<a)=P(X\le a)-P(X=a)=F(a)-P(a)$$
$$\therefore P(a)=F(a)-\lim_{x\to a^-}F(x)$$
## 离散型随机变量
### 分布
#### 二项分布 P16
* $$X\sim B(n,p)$$
* $$P(X=k)=C_n^kp^k(1-p)^{n-k}$$
* $$EX=np$$
* $$DX=np(1-p)$$
* 可用于有多个独立个体做某事 $A$ 概率相同, 求同一时间内做 $A$ 的人数
* 当 $np(1-p)$ 较大时, $X\mathop{\sim}\limits^{\text{近似}}N(np,np(1-p))$
* 当 $n\ge20\;p\le0.05$, $X\mathop{\sim}\limits^{\text{近似}}P(np)$
#### 泊松分布
* $$X\sim P(\lambda)(\lambda>0)$$
* $$P(X=k)=\frac{e^{-\lambda} \lambda^{k}}{k!}(k=0,1,2,...)$$
* $$EX=\lambda$$
* $$DX=\lambda$$
#### 几何分布
* 含义: 重复做实验 $A$, 第 $k$ 次成功的概率
* $$P(X=k)=p(1-p)^{k-1}$$
* $$EX=\frac{1}{p}$$
* $$DX=\frac{1-p}{p^2}$$
#### 超几何分布
* 含义: 共有 $N$ 件两种物品, 其中有 $M$ 件物品 $A$, 从中取 $n$ 个物品, 求取到的 $n$ 件物品中, 有 $k$ 件 $M$ 的概率
* $$P(X=k)=\frac{C_M^kC_{N-M}^{n-k}}{C_N^n}$$
* $$EX=n\frac{M}{N}$$
## 连续型随机变量
### 密度函数
1. 定义
$$f_x(x)=F_x'(x)$$
$$F(x)=\int^{x}_{-\infty}f(x)dx$$
2. 性质
    1. $$f(x)\ge0$$
    2.  $$\int_{-\infty}^{\infty}f(x)dx=1$$
        * 对于已知的密度函数, 可作为条件(求EX)
        * ==换元法 见书P29==
### 分布
#### 均匀分布
* $$X\sim U(a,b)$$
* 长度分之1 
$$f(x)=\begin{cases}
\frac{1}{b-a}&,a\le x\le b,\\
0&,\text{其余}
\end{cases}$$
* 平均值
$$EX=\frac{b+a}{2}$$
* ab的距离
$$DX=\frac{(b-a)^2}{12}$$
* 有==连续型==随机变量 $X$, $Y=F_X(X)\sim U(0,1)$
#### 指数分布
* $$X\sim E(\lambda)(\lambda>0)$$

* $$f(x)=\begin{cases}\lambda e^{-\lambda}&,0\le x,\\0&,\text{其余}\end{cases}$$
* $$F(x)=\begin{cases}1-e^{-\lambda}&,0\le x,\\0&,\text{其余}\end{cases}$$
* $$EX=\frac{1}{\lambda}$$
* $$DX=\frac{1}{\lambda^2}$$
#### 正态分布
* $$X\sim N(\mu,\sigma^2)$$
* $$f(x)=\frac{1}{\sqrt{2\pi}\sigma}e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$
* $$EX=\mu$$
* 注意$\sigma$为标准差 
$$DX=\sigma^2$$
* 标准化正态分布 
$$Y=\frac{X-EX}{\sqrt{DX}}\sim N(0,1)$$
* 标准化正态分布的对称性 
$$P(X>0)=P(X<0)=\frac{1}{2}$$
* 标准化正态分布的==分布函数==记为 
$$\Phi(x)=\frac{1}{\sqrt{2\pi}}\int_{-\infty}^xe^{-\frac{x^2}{2}}\mathrm{d}x$$
为单调递增函数(分布函数的性质)
## 解题步骤
1. 设随机变量 X
2. X的可能取值为 ...
3. P(X=..)=.., ..
4. 回答