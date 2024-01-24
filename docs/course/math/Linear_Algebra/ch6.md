---
order: 6
---

# 特征值
> 参考教程 [麻省理工公开课 线性代数](https://www.bilibili.com/video/BV1zx411g7gq) P21~P25

## 特征值基础
### 特征值与特征向量的定义
特征值依然以方阵为讨论对象  
对于一个 $n\times n$ 的矩阵 $A$, 存在==某些方向的向量 $\vec{x}$== 在右乘 $A$ 后, 得到的结果仍然平行于 $\vec{x}$, 将具有这种特性的向量称为特征向量 $\vec{x}$, 而称相乘结果 $A\vec{x}$ 与原向量 $\vec{x}$ 之比 $\lambda$ 为特征值, 有
$$A\vec{x}=\lambda\vec{x}$$

对于一个矩阵 $A$ 的特征向量 $\vec{x}$, 与其同一方向上所有向量均能作为特征向量, 一般仅使用其中一个非零向量代表这个方向

### 特征值与特征向量的计算
在特征值与特征向量的定义式中, 存在着两个未知变量, 为此需要进行如下变形
$$\begin{split}
A\vec{x}&=\lambda\vec{x}\\
(A-\lambda I)\vec{x}&=\vec{0}
\end{split}$$

此时, 仅当矩阵 $A-\lambda I$ 为不可逆矩阵, 方程 $(A-\lambda I)\vec{x}=\vec{0}$ 才会存在非零解  
而要当矩阵 $A-\lambda I$ 为不可逆矩阵时, 根据[行列式的性质](./ch5.md#推论五), 有
$$\det(A-\lambda I)=0$$

上式可展开为一个关于 $\lambda$ 的 $n$ 次方程, 称为**特征方程**, 因此==对于一个 $n\times n$ 方阵, 其共有 $n$ 个特征值==  
并且其中可能存在多重根与复根, 因此也存在多重特征值与复数特征值的情况 

得到特征值后可得, 对于任意一个特征值 $\lambda$, 其有特征向量 $\vec{x}$ 有无数多个, 并且这些特征值均来自矩阵 $A-\lambda I$ 的零空间  
通常在计算出特征值后, 选择 $N(A-\lambda I)$ 的一组基作为该特征的特定特征向量  
注意, $N(A-\lambda I)$ 的维数与 $\lambda$ 的重数无关, 因此==有 $n$ 个特征值不代表有 $n$ 个不平行的特征向量 $\vec{x}$==

### 特征值的特性
* 将方阵 $A$ 对角线上的元素之和称为**迹** $tr(A)$
    * 矩阵 $A$ 的迹等于其特征值之和, 可用该性质寻找最后一个特征值
    * 矩阵的迹的相反数等于其特征方程中的一次项系数
* 对于方阵 $A$ 的行列式
    * 矩阵 $A$ 的行列式等于其特征值之积
    * 矩阵的行列式也等于其特征方程中的常数项
* 对于矩阵 $A$ 有特征值 $\lambda$, 则矩阵 $A+kI$ 有特征值 $\lambda+k$, 且对应特征值的特征向量相同, 证明如下 (注意对于任意两个矩阵 $A,B$, 其和与积的特征值不存在特殊性质)
$$(A+kI)\vec{x}=\lambda\vec{x}+k\vec{x}=(\lambda+k)\vec{x}$$
* 矩阵 $A$ 以及其转置 $A^T$ 具有相同的特征值, 该性质由行列式的[推论七](./ch5.md#推论七)可得到

### 特殊矩阵的特征值
#### 投影矩阵
对于投影矩阵 $P$, 根据[投影矩阵的性质](./ch4.md#投影矩阵的实际意义)
* 对于 $\vec{x}\in C(P)$, 此时有 $P\vec{x}=\vec{x}$, 因此认为投影矩阵列空间 $C(P)$ 中的任意向量均为 $P$ 的特征向量, 且有特征值 $\lambda=1$
* 对于 $\vec{x}\perp C(P)$ (与 $C(P)$ 中的所有向量正交), 此时有 $P\vec{x}=\vec{0}$, 即类似不可逆矩阵 $S$ 的情况, 对于这些向量 $\vec{x}\in N(P)$, 也是 $P$ 的特征向量, 有特征值 $\lambda=0$ 

#### 对称矩阵
对于对称矩阵, 其特征值全为实数, 且不同特征值的特征向量相互垂直

例如对称矩阵 $S=\begin{bmatrix}3&1\\1&3\end{bmatrix}$, 其有特征方程
$$\begin{split}
\begin{vmatrix}3-\lambda&1\\1&3-\lambda\end{vmatrix}&=0\\
(3-\lambda)^2-1&=0\\
\lambda^2-6\lambda+8&=0
\end{split}$$

解得其有特征值 
* $\lambda_{1}=2$, 对应特征向量 $\vec{x}_1=\begin{bmatrix}1&-1\end{bmatrix}^T$
* $\lambda_{2}=4$, 对应特征向量 $\vec{x}_2=\begin{bmatrix}1&1\end{bmatrix}^T$

#### 反对称矩阵
对于反对称矩阵 ($A=-A^T$), 其特征值全为纯虚数

例如对称矩阵 $A=\begin{bmatrix}0&-1\\1&0\end{bmatrix}$ (同时该矩阵也是 $90\degree$ 的旋转矩阵), 其有特征方程
$$\begin{split}
\begin{vmatrix}-\lambda&-1\\1&-\lambda\end{vmatrix}&=0\\
\lambda^2+1&=0\\
\lambda&=\pm i
\end{split}$$

对于一般矩阵, 其特征值介于二者之间, 可能为实数或复数, 且通常越对称, 实数越多

#### 上三角矩阵
对于上三角矩阵, 其对角线上的值即其特征值 (根据[行列式的性质](./ch5.md#推论四)易得)

例如上三角矩阵 $U=\begin{bmatrix}3&1\\0&3\end{bmatrix}$, 其有特征方程
$$\begin{split}
\begin{vmatrix}3-\lambda&1\\0&3-\lambda\end{vmatrix}&=0\\
(3-\lambda)^2&=0\\
\lambda&=3
\end{split}$$

解得该矩阵有特征根 $\lambda=3$, 且为二重特征根  
此外, 对于 $U-3I=\begin{bmatrix}0&1\\0&0\end{bmatrix}$, 该矩阵的零空间维数 $dim[N(U-3I)]=2-r=1$, 因此零空间为一维  
这表明该矩阵仅有一个方向的特征向量 $\vec{x}=\begin{bmatrix}1&0\end{bmatrix}^T$

## 对角化
### 对角化分解
对于一个 $n\times n$ 的矩阵 $A$, 将其任意 $n$ 个特征向量 $\vec{x}_k$ 组成特征矩阵 $S$  
根据[特征值与特征向量的定义](#特征值与特征向量的定义), 矩阵 $A$ 与其特征矩阵 $S$ 相乘时有  
$$\begin{split}AS&=A\begin{bmatrix}\vec{x}_1&\vec{x}_2&\dots&\vec{x}_n\end{bmatrix}\\
&=\begin{bmatrix}\lambda_1\vec{x}_1&\lambda_2\vec{x}_2&\dots&\lambda_n\vec{x}_n\end{bmatrix}\\
&=\begin{bmatrix}\vec{x}_1&\vec{x}_2&\dots&\vec{x}_n\end{bmatrix}\begin{bmatrix}\lambda_1&0&0&0\\0&\lambda_2&0&0\\\vdots&&&\vdots\\0&0&0&\lambda_n\end{bmatrix}\\
&=S\Lambda
\end{split}$$

其中矩阵 $\Lambda$ 为一个以 $A$ 的特征值组成的对角矩阵

当这 $n$ 个特征向量==不平行且非 $0$== 时, 矩阵 $S$ 可逆, 因此有对角化分解
$$A=S\Lambda S^{-1}$$

### 对角化矩阵的条件
易得, 当一个矩阵具有 $n$ 个不同的特征值 $\lambda$ 时, 各个特征值都将对应一个方向的特征向量, 且这些特征向量互相平行, 因此该矩阵能够对角化  

但是当一个矩阵的特征值中有重根时, 其重根不一定对应与根的重数相同的, 互不平行的特征向量, 因此有可能无法对角化, 如[前文的例子](#上三角矩阵)

但在一般情况下, 对于绝大部分的矩阵均能对角化, 因此不在此深入讨论

### 矩阵的幂
当矩阵满足对角化条件并对角化后, 对于矩阵的 $k$ 次幂有
$$A^k=S\Lambda^k S^{-1}$$

根据[对角矩阵](./ch1.md#对角矩阵)的特性, 对于矩阵的任意次幂, 其特征向量不变, 特征值变为原矩阵的 $k$ 次 $\lambda'=\lambda^k$

当矩阵所有特征值满足 $\begin{Vmatrix}\lambda\end{Vmatrix}<1$, 有 $\lim_{k\to\infty}A^k=0$ 

## 状态方程
### 离散差分状态方程
对于一个具有 $n$ 个参数的线性系统, 可以使用一个向量 $\vec{u}$ 表示这些参数, 并以此体现系统的状态  
系统中相邻的两个时刻的状态之间满足线性方程组 $\vec{u}_{i+1}=A\vec{u}_i$

因此对于初态为 $\vec{u}_0$ 的系统在第 $k$ 个时刻下, 系统的状态为 $\vec{u}_k=A^k\vec{u}_0$

通过求解 $\vec{u}_0=S\vec{c}$ 可得到向量 $\vec{u}_0$ 关于特征矩阵各列的分量 $\vec{c}$, 此时 
$$\vec{u}_k=A^k\vec{u}_0=S\Lambda^kSS^{-1}\vec{c}=S\Lambda^k\vec{c}=\sum_{i=1}^n\vec{x}_i\lambda_i^k c_i$$

对于 $\vec{u}_k$ 的第 $j$ 个分量 $\{\vec{u}_k\}_j$ 有 ($a_{ji}$ 为待定系数, 可通过代回状态方程或投影具体求解)  
$$\{\vec{u}_k\}_j=\sum_{i=1}^n a_{ji}\lambda_i^k$$

当 $k\to\infty$ 时
* 对于 $\begin{Vmatrix}\lambda_i\end{Vmatrix}<1$, $\vec{u}_k$ 中在 $\vec{x}_i$ 方向上的分量将逐渐趋近于 $0$, 而对结果没有影响
* 对于 $\lambda_i=1$, $\vec{u}_k$ 中在 $\vec{x}_i$ 方向上的分量始终不变
* 对于 $\lambda_i=e^{i2\pi/n}$, $\vec{u}_k$ 中在 $\vec{x}_i$ 方向上的分量可能 $n$ 为周期变化, 当所有特征值都满足这一特点时, 存在特定次幂 $k$ 使 $A^k=I$
* 当所有特征量 $\begin{Vmatrix}\lambda_i\end{Vmatrix}<1$, $\vec{u}_k$ 将逐渐趋于 $0$, 系统趋于稳定  
反之, 当存在 $\begin{Vmatrix}\lambda_i\end{Vmatrix}>1$, 系统的参数将逐渐发散
* 当 $\lambda_i$ 为特征值中的最大值, 且 $\begin{Vmatrix}\lambda_i\end{Vmatrix}>1$, 则认为 $k$ 时刻下系统的参数 $\vec{u}_{k}\approx \vec{x}_i\lambda_i^k c_i$ 

#### 差分方程求解示例
以斐波那契数列为例展示状态方程的应用  
对于斐波那契数列有初始条件 $f_0=0,f_1=1$  
数列中的值满足 $f_{k+2}=f_{k+1}+f_{k}$  
由于方程中存在两个参数, 因此可以令参数向量 $\vec{u}=\begin{bmatrix}f_{k+1}&f_{k}\end{bmatrix}^T$  
同时补充方程 $f_{k+1}=f_{k+1}$, 使参数与方程数相当  
此时有状态方程  
$$\begin{cases}
f_{k+2}=f_{k+1}+f_{k}\\
f_{k+1}=f_{k+1}
\end{cases}
\to
\vec{u}_{k+1}=\begin{bmatrix}1&1\\1&0\end{bmatrix}\vec{u}_{k}$$

对于状态方程中的矩阵 $A=\begin{bmatrix}1&1\\1&0\end{bmatrix}$, 求该矩阵的特征值  
$$\begin{split}
\begin{vmatrix}1-\lambda&1\\1&-\lambda\end{vmatrix}&=0\\
\lambda^2-\lambda-1&=0
\end{split}$$

解得
$$\lambda_1=\frac{1+\sqrt{5}}{2}\approx 1.618\quad\lambda_2=\frac{1-\sqrt{5}}{2}\approx -0.618$$

其中 $\begin{Vmatrix}\lambda_1\end{Vmatrix}>1$, $\begin{Vmatrix}\lambda_2\end{Vmatrix}<1$, 因此当 $k$ 足够大时, $f_k\approx C\cdot 1.618^k$

通过具体求解可得两个特征值分别对应特征向量
$$\vec{x}_1=\begin{bmatrix}\frac{1+\sqrt{5}}{2}\\1\end{bmatrix}\quad \vec{x}_2=\begin{bmatrix}\frac{1-\sqrt{5}}{2}\\1\end{bmatrix}$$ 

通过 $S\vec{c}=\vec{u}_0$ 求解分量 $\vec{c}$ 可得, 对于两个特征向量, 有线性组合 
$$\vec{u}_0=\frac{1}{\sqrt{5}}\vec{x}_1-\frac{1}{\sqrt{5}}\vec{x}_2$$

最终解得数列的通项公式为
$$f_k=\frac{1}{\sqrt{5}}(\frac{1+\sqrt{5}}{2})^k-\frac{1}{\sqrt{5}}(\frac{1-\sqrt{5}}{2})^k$$

### 连续微分状态方程
同样以向量 $\vec{u}$ 表示系统特定状态下的一组参数  
此时系统关于时间连续, 系统各个参数的变化量满足线性微分方程组 
$$\frac{\mathrm{d}\vec{u}}{\mathrm{d}t}=A\vec{u}$$

注意, 此时 $\vec{u}$ 是一个关于时间 $t$ 的函数, 且通常有确定的初态 $\vec{u}(0)$  
将 $\vec{u}(t)$ 投影到特征矩阵 $S$ 上, 得到投影分量 $\vec{v}(t)$, 令 $\vec{u}(t)=S\vec{v}$, 此时方程有
$$\begin{split}\frac{\mathrm{d}\vec{u}}{\mathrm{d}t}&=A\vec{u}\\
S\frac{\mathrm{d}\vec{v}}{\mathrm{d}t}&=S\Lambda S^{-1} S\vec{v}(t)\\
\frac{\mathrm{d}\vec{v}}{\mathrm{d}t}&=\Lambda\vec{v}(t)
\end{split}$$

通过变形后, 方程各个变量被解耦为 $n$ 个仅与 $v_i(t)$ 有关的一阶微分方程 $\frac{\mathrm{d}v_i}{\mathrm{d}t}=\lambda_i v_i(t)$  
对于这类微分方程解的一般形式即 $v_i(t)=C_ie^{\lambda_i t}$  
因此方程的解为
$$\vec{u}(t)=S\vec{v}(t)=\sum_{i=1}^nC_i\vec{x}_ie^{\lambda_i t}$$

当 $t\to\infty$ 时, 认为系统达到稳态
* 对于 $Re[\lambda_i]<0$, 分量 $\begin{Vmatrix}e^{\lambda_i t}\end{Vmatrix}=\begin{Vmatrix}e^{-a_i t}\end{Vmatrix}\begin{Vmatrix}e^{ib t}\end{Vmatrix}=\begin{Vmatrix}e^{-a_i t}\end{Vmatrix}\cdot 1\to 0$  
该分量的效果会随时间不断减弱, 并在稳态消失  
* 对于 $\lambda_i=0$, 其在 $\vec{u}$ 中为一个不随时间变化的常数项
* 对于 $Re[\lambda]>0$, 相反此分量将 $\begin{Vmatrix}e^{\lambda_i t}\end{Vmatrix}\to\infty$  
* 因此==仅当矩阵的任意特征值满足 $Re[\lambda_i]<0$ 或 $\lambda_i=0$==, 系统才能收敛于一个有限的状态, 即==系统稳定==的条件

#### 微分方程求解示例
假设系统参数 $u_1,u_2$ 有初态 $\vec{u}(0)=\begin{bmatrix}1&0\end{bmatrix}^T$  
满足以下微分方程
$$\begin{cases}
\frac{\mathrm{d}u_1}{\mathrm{d}t}=-u_1+2u_2\\
\frac{\mathrm{d}u_2}{\mathrm{d}t}=u_1-2u_2
\end{cases}
\to
\frac{\mathrm{d}\vec{u}}{\mathrm{d}t}=
\begin{bmatrix}
-1&2\\
1&-2
\end{bmatrix}\vec{u}$$

对于状态方程中的矩阵 $A=\begin{bmatrix}-1&2\\1&-2\end{bmatrix}$, 求该矩阵的特征值
$$\begin{split}
\begin{vmatrix}-1-\lambda&2\\1&-2-\lambda\end{vmatrix}&=0\\
\lambda^2+3\lambda&=0
\end{split}$$

解得
$$\lambda_1=0\quad\lambda_2=-3$$

其中 $\lambda_1=0$, $\lambda_2<0$, 因此当 $t$ 足够大时, $\lambda_2$ 的影响将逐渐消失, 系统将趋近于稳态 $C_1\vec{x}_1$

通过具体求解可得两个特征值分别对应特征向量与解的形式
$$\begin{split}
&\vec{x}_1=\begin{bmatrix}2\\1\end{bmatrix}\quad \vec{x}_2=\begin{bmatrix}1\\-1\end{bmatrix}\\
&\vec{u}(t)=C_1\begin{bmatrix}2\\1\end{bmatrix}+C_2e^{-3t}\begin{bmatrix}1\\-1\end{bmatrix}
\end{split}$$ 

通过初态条有
$$C_1\begin{bmatrix}2\\1\end{bmatrix}+C_2\begin{bmatrix}1\\-1\end{bmatrix}=\begin{bmatrix}2&1\\1&-1\end{bmatrix}\begin{bmatrix}C_1\\C_2\end{bmatrix}=\begin{bmatrix}1\\0\end{bmatrix}=\vec{u}(0)$$

解出待定常数 $C_1,C_2$ 可得
$$\vec{u}(t)=\frac{1}{3}\begin{bmatrix}2\\1\end{bmatrix}+\frac{1}{3}e^{-3t}\begin{bmatrix}1\\-1\end{bmatrix}$$

#### 高阶微分量的处理
类似[差分方程中的处理](#差分方程求解示例)

当连续微分状态方程中出现了高阶微分量如 $u_1^{(m)}=\frac{\mathrm{d}^mu_1}{\mathrm{d}t^m}$  
可将阶数低于 $m$ 的微分量视为独立的参数, 并补充方程 $\frac{\mathrm{d}}{\mathrm{d}t}[u_1^{(i)}]=u_1^{(i+1)}$

例如常系数微分方程 $y'''+ay''+by''+cy=0$ 有最高阶微分量 $y'''$, 因此将剩余参数与微分量视为独立的参数 $u_3=y\;u_2=y';u_1=y''$  
此时有状态方程
$$\frac{\mathrm{d}\vec{u}}{\mathrm{d}t}=
\begin{bmatrix}
y'''\\ y''\\ y'
\end{bmatrix}=
\begin{bmatrix}
-a&-b&-c\\
1&0&0\\
0&1&0
\end{bmatrix}
\begin{bmatrix}
y''\\ y'\\ y
\end{bmatrix}
$$

对于多个参数的处理方式相同

#### 系统稳定判据
对于二参数的系统, 有系数矩阵 $A=\begin{bmatrix}a&b\\c&d\end{bmatrix}$  
根据[稳定性](#连续微分状态方程)的要求有 $Re[\lambda_1],Re[\lambda_2]<0$

由[特征值的特性](#特征值的特性)可得, 此时
$$\begin{cases}
tr(A)=\lambda_1+\lambda_2<0\\
\det(A)=\lambda_1\lambda_2>0
\end{cases}
\to
\begin{cases}
tr(A)=a+d<0\\
\det(A)=ad-cb>0
\end{cases}
$$

### 矩阵指数
为了求解[连续微分状态方程](#连续微分状态方程), 还有另一思路, 即直接计算矩阵指数 $e^{At}$  

首先将 $e^{At}$ 以泰勒级数的方式展开有 (注意, ==$t$ 为一个标量==)
$$\begin{split}
e^{At}&=\lim_{j\to\infty}\sum_{i=0}^j\frac{(At)^i}{i!}\\
&=\lim_{j\to\infty}\sum_{i=0}^j\frac{S\Lambda^{i} S^{-1}t^i}{i!}\\
&=\lim_{j\to\infty}S\Big(\sum_{i=0}^j\frac{\Lambda^{i}t^i}{i!}\Big)S^{-1}\\
&=Se^{\Lambda t}S^{-1}
\end{split}$$

其中根据[对角矩阵](./ch1.md#对角矩阵)的特性, $e^{\Lambda t}$ 满足 
$$\begin{split}
Se^{\Lambda t}S^{-1}&=\lim_{j\to\infty}S\begin{bmatrix}
\sum_{i=0}^j\frac{(\lambda_1t)^i}{i!}&0&\dots&0\\
0&\ddots&&0\\
\vdots&&\ddots&\vdots\\
0&0&\dots&\sum_{i=0}^j\frac{(\lambda_n t)^i}{i!}
\end{bmatrix}
S^{-1}\\
&=\lim_{j\to\infty}S\begin{bmatrix}
e^{\lambda_1 t}&0&\dots&0\\
0&\ddots&&0\\
\vdots&&\ddots&\vdots\\
0&0&\dots&e^{\lambda_n t}
\end{bmatrix}
S^{-1}
\end{split}$$

因此连续微分状态方程 $\frac{\mathrm{d}\vec{u}}{\mathrm{d}t}=A\vec{u}$ 的解 $\vec{u}(t)$ 满足 (使用[此处的推导](#连续微分状态方程)也能得到同样的结果) 
$$\vec{u}(t)=e^{At}\vec{u}(0)=Se^{\Lambda t}S^{-1}\vec{u}(t)$$

但是注意, 结论 $e^{At}=Se^{\Lambda t}S^{-1}$ 仅在 $A$ 满足[对角化的条件](#对角化矩阵的条件)下成立

### 马尔可夫矩阵
马尔科夫矩阵是[离散差分状态方程](#离散差分状态方程)中一类特殊的系数矩阵

定义当 $n\times n$ 的方阵 $A$ 满足以下条件时, 称之为马尔可夫矩阵
* 矩阵的各列元素之和等于 $1$
* 矩阵的各个元素大于等于 $0$

马尔可夫矩阵的特征值将具有以下特性
1. 马尔可夫矩阵的任意特征值满足 $\begin{Vmatrix}\lambda_i\end{Vmatrix}\ge 0$
1. 马尔可夫矩阵存在至少一个特征值满足 $\lambda_k=1$  
1. 马尔科夫矩阵的任意次幂依然是马尔科夫矩阵

由马尔可夫矩阵的特性与离散差分状态方程稳态与 $\lambda$ 的关系可得, 当系统的系数矩阵为马尔科夫矩阵时, 当 $k$ 足够大, 系统参数将仅与 $\lambda_i=1$ 对应的特征向量有关  
并且马尔科夫矩阵中, 状态参数之和始终不变

现就特性二给出证明  
由于矩阵各列元素之和为 $1$, 因此矩阵 $A-I$ 的各列元素之和为 $0$  
这表明矩阵行向量之和为零, 即左零空间 $N[(A-I)^T]$ 中存在向量 $\begin{bmatrix}1&1&\dots&1\end{bmatrix}$  
因此矩阵的秩 $r<n$, 不可逆, 有 $\det(A-I)=0$

#### 马尔科夫矩阵示例
基于马尔可夫矩阵的特定, 其往往用于描述一个==总和不变的系统==中的各个部分随时刻的变化  
例如有城市 $A,B$, 假设两城市总人数不变, 开始时城市人数为 $u_A=0,u_B=1000$  
* $A$ 城每年有 $90\%$ 的人口留在 $A$ 城, $10\%$ 的人口移居到 $B$ 城
* $B$ 城每年有 $80\%$ 的人口留在 $B$ 城, $20\%$ 的人口移居到 $A$ 城

因此有离散状态方程
$$\begin{bmatrix}u_A\\ u_B\end{bmatrix}_{k+1}=\begin{bmatrix}0.9&0.2\\0.1&0.8\end{bmatrix}\begin{bmatrix}u_A\\ u_B\end{bmatrix}_{k}$$

最后可以解得
$$\begin{bmatrix}u_A\\ u_B\end{bmatrix}_{k}=\frac{1000}{3}\begin{bmatrix}2\\ 1\end{bmatrix}+\frac{2000}{3}(0.7)^k\begin{bmatrix}-1\\ 1\end{bmatrix}$$
