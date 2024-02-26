---
order: 7
---

# 正定性
> 参考教程 [麻省理工公开课 线性代数](https://www.bilibili.com/video/BV1zx411g7gq) P26~P30, P34

## 对称矩阵的特性
### 对称矩阵的特征值与特征向量
对于一个==实对称矩阵==, 其特征值与特征向量具有如下特征
* 实对称矩阵的全部特征值均为实数  
反过来, 当一个实矩阵满足以上条件时 (或特征向量均为实数), 其必然为对称矩阵
* 实对称矩阵必定能找到一组特征向量, 这组特征向量相互垂直 (注意特征向量可以取任意长度, 只是一般取单位长度), 且能组成一个[标准正交矩阵](./ch4.md#标准正交矩阵)  
实际上仅需满足 $AA^T=A^TA$ 的实矩阵就有正交的特征向量矩阵, 如对称矩阵, 反对称矩阵, 正交矩阵 (但特征向量不一定在实数域)

因此, 根据标准正交矩阵的特性 $Q^{-1}=Q^{T}$ , 对角化实对称矩阵 $A$ 时有 (以标准正交矩阵 $Q$ 表示其特征矩阵)
$$A=Q\Lambda Q^T$$

### 特性的证明
现证明实对称矩阵的全部特征值均为实数

使用标记 $\bar{A}$, 表示 $A$ 的共轭矩阵, 即将 $A$ 的所有元素取共轭复数  
显然有
$$A\vec{x}=\lambda\vec{x}\to \bar{A}\bar{\vec{x}}=\bar{\lambda}\bar{\vec{x}}$$

将共轭的等式取转置有
$$\bar{\vec{x}}^T\bar{A}^T=\bar{\lambda}\bar{\vec{x}}^T$$

对于原式, 两侧左乘 $\bar{\vec{x}}^T$ 有 $\bar{\vec{x}}^TA\vec{x}=\lambda\bar{\vec{x}}^T\vec{x}$  
对于共轭转置式, 两侧右乘 $\vec{x}$ 有 $\bar{\vec{x}}^T\bar{A}^T\vec{x}=\bar{\lambda}\bar{\vec{x}}^T\vec{x}$

对于实对称矩阵, 显然有 $A=\bar{A}^T$, 因此
$$\begin{split}\lambda\bar{\vec{x}}^T\vec{x}&=\bar{\lambda}\bar{\vec{x}}^T\vec{x}\\
\lambda&=\bar{\lambda}
\end{split}$$

#### 关于证明的补充说明
* 证明中出现的 $\bar{\vec{x}}^T\vec{x}$ 部分, 当 $\vec{x}\neq \vec{0}$ 时, 结果必定为正数, 因此可以消去  
==$\bar{\vec{x}}^T\vec{x}$ 也是计算复数向量长度平方的公式==
* 证明也表明, 若 $A$ 为复数矩阵, 想要满足[以上特性](#对称矩阵的特征值与特征向量), 则应有 $A=\bar{A}^T$, 并且对角线上的元素为实数
* 更多有关介绍见[复数矩阵与向量](#复数矩阵与向量)

### 对称矩阵的分解
已知实对称矩阵有分解 $A=Q\Lambda Q^T$, 进一步计算可得
$$\begin{split}A&=Q\Lambda Q^T\\
&=\begin{bmatrix}\vec{q_1}&\vec{q_2}&\dots&\vec{q_n}\end{bmatrix}\begin{bmatrix}\lambda_1\vec{q_1}^T\\\lambda_2\vec{q_2}^T\\\vdots\\\lambda_n\vec{q_n}^T\end{bmatrix}\\
&=\sum_{i=1}^n\lambda_i\vec{q_i}\vec{q_i}^T
\end{split}$$

注意到, 由于 $\vec{q_i}^T\vec{q_i}=1$, 因此 $\vec{q_i}\vec{q_i}^T$ 即 $\vec{q_i}$ 方向的投影矩阵  
由此可得出结论, $n\times n$ 的实对称矩阵可分解为 $n$ 个相互垂直方向的投影矩阵的线性组合, 从该结论可引出谱定理

因此一个向量左乘一个对称矩阵 $A$ 后, 相当于将该向量沿 $A$ 相互正交的几个特征向量方向投影, 然后乘以对应的特征值并重新组合

### 对称矩阵特征值与主元的关系
除了以上的特性, 对称矩阵 $A$ 大于 $0$ 的特征值数量与 $A$ 主元中大于 $0$ 的数量相同  

显然, 计算矩阵主元的计算量明显小于特征值, 因此可结合[特征值与单位矩阵的特性](#特征值的特性), 通过判断矩阵 $A$ 与 $A-tI$ 的大于 $0$ 的主元数, 当两个矩阵不同时, 表明 $0\sim t$ 之间存在一个特征值  
通过此方法可以快速地找出实对称的所有特征值而避免求解特征方程, 时高维对称矩阵寻找特征值的重要方法之一

## 复数矩阵与向量
相对于实数域中的向量空间 $R^n$, 定义以复数为元素的向量属于复数域中的向量空间 $C^n$

### 复数域下的向量长度
对于复数域中的向量 $\vec{x}\in C^n,\vec{x}=\begin{bmatrix}a_1+b_1i&a_2+b_2i&\dots&a_n+b_ni\end{bmatrix}^T$  
显然如果以实数域下相同的方法计算向量长度, 会有 $\vec{x}^T\vec{x}=(a_1^2+b_1^2+\dots+a_n^2+b_n^2)+2i(a_1b_1+\dots+a_nb_n)$  
显然这与绝对值必须大于等于 $0$ 的要求相违背  

为了消去上述计算结果中的虚部, 可以对 $\vec{x}^T$ 取共轭, 得到 $\bar{\vec{x}}^T$  
此时有
$$\begin{Vmatrix}\vec{x}\end{Vmatrix}^2=\bar{\vec{x}}^T\vec{x}=(a_1^2+b_1^2+\dots+a_n^2+b_n^2)=\begin{Vmatrix}x_1\end{Vmatrix}^2+\dots+\begin{Vmatrix}x_n\end{Vmatrix}^2$$

### 复数域下的向量点乘与正交
从复数域下的向量长度的计算推广可得, 对于 $\vec{x},\vec{y}\in C^n$, 复数域下的向量点乘运算为
$$\bar{\vec{y}}^T\vec{x}$$

此时, 复数域下向量 $\vec{x},\vec{y}$ 正交时有
$$\bar{\vec{y}}^T\vec{x}=0$$

注意在此运算下, 结果不一定是实数, 也可能得到复数结果

### 共轭转置
注意到, 在复数域中, 共轭转置运算有着重要作用, 因此使用符号 $H$ 代表共轭转置运算, 有
$$\vec{y}^H=\bar{\vec{y}}^T$$  

与[转置](./ch1.md#转置运算)的法则类似, 共轭转置运算有法则
* $(A+B)^H=A^H+B^H$
* $(AB)^H=B^HA^H$
* $(\lambda A)^H=\bar{\lambda}A^H$
* $(A^{-1})^H=(A^{H})^{-1}$

因此复数域下的向量 $\vec{x},\vec{y}$ 运算可表示为
* 向量点乘 $\vec{y}^H\vec{x}$
* 向量长度 $\begin{Vmatrix}\vec{x}\end{Vmatrix}=\sqrt{\vec{x}^H\vec{x}}$
* 向量正交 $\vec{y}^H\vec{x}=0$

### 埃米尔特矩阵
在[关于对称矩阵特性的证明](#特性的证明)中已经指出, 若复数矩阵 $A$ 要满足与实对称矩阵类似的特性, 则 ==$A$ 对角线上的元素为实数==, 并且有
$$A=\bar{A}^T=A^H$$

也将满足这一性质的矩阵 $A$ 称为自共轭矩阵或 **Hermite (埃米尔特) 阵**

注意, 埃米尔特矩阵虽然能找到一组特征向量 $\vec{q}_i$ 相互正交, 但时 $\vec{q}_i$ 为复数域中的向量

### 酉矩阵
对于 $n$ 个向量 $\vec{q}_i\in C^n$ 满足
$$\vec{q}_i^H\vec{q}_j=\begin{cases}
0,i\neq j\\
1,i=j
\end{cases}$$

则定义矩阵 $Q=\begin{bmatrix}\vec{q}_1&\vec{q}_2&\dots&\vec{q}_n\end{bmatrix}$ 为**酉矩阵** (Unitary)

类似[标准正交矩阵](./ch4.md#标准正交矩阵), 对于酉矩阵有
$$Q=Q^H$$

显然, 埃米尔特矩阵存在一组特征矩阵 $Q$ 满足酉矩阵的要求  
因此, 根据酉矩阵的特性, 对角化埃米尔特矩阵 $A$ 时有
$$A=Q\Lambda Q^H$$

### 傅里叶矩阵
傅里叶矩阵 $F_n$ 的基本形式为
$$F_n=
\begin{bmatrix}
1&1&1&\dots&1\\
1&w^1&w^2&\dots&w^{n-1}\\
1&w^2&w^4&\dots&w^{2(n-1)}\\
\vdots&\vdots&\vdots&\ddots&\vdots\\
1&w^{n-1}&w^{2(n-1)}&\dots&w^{(n-1)(n-1)}
\end{bmatrix}$$

其中 $w=e^{2\pi/n}$, 矩阵的第 $i,j$ 项满足 $\{F_n\}=w^{ij}$

虽然傅里叶矩阵满足对称矩阵的要求, 但是不是埃米尔特矩阵  
但是傅里叶矩阵的各列在归一化 (即乘以系数 $\frac{1}{\sqrt{n}}$) 后满足酉矩阵的要求  
因此有 $F_n^{-1}=\frac{1}{n}F_n^H$, 其中 $F_n^{-1}$ 即为傅里叶逆变换矩阵

对于由采样信号序列排列组成的向量 $\vec{x}=\begin{bmatrix}x[0]&x[1]&\dots&x[n-1]\end{bmatrix}$  
其[离散傅里叶变换](/course/machine/cybernetics/fft.md#离散傅里叶变换-dft)结果即 $\vec{X}=F_n\vec{x}$

通过分解 $F_n$, 可将计算 $F_n\vec{x}$ 的时间复杂度由 $O(n^2)$ 降低为 $O(n\log n)$, 具体算法详见其他资料

## 二次型
对于对称的系数矩阵 $A$ 与由自变量组成的向量 $\vec{x}$, 运算 $\vec{x}^TA\vec{x}$ 将能得到一个各项次数均为二的多项式  
以二维为例有  
$$\begin{bmatrix}x&y\end{bmatrix}\begin{bmatrix}a&b\\ c&d\end{bmatrix}\begin{bmatrix}x\\ y\end{bmatrix}=ax^2+2bxy+cy^2=f(x,y)$$

### 二次型曲面
当 $A$ 为[正定矩阵](#正定矩阵)时, 除了点 $(0,0)$, 对于任意点有 $f(x,y)>0$  
曲面有最低点 $(0,0)$ , 此外沿任意远离远点的方向快速上升
此时的 $f(x,y)$ 为一个椭圆抛物面, 曲线 $f(x,y)=z$ 为一个椭圆, 如图所示

![](./src/positive_define.svg =x400)

当 $A$ 不为正定矩阵时, 存在 $f(x,y)<0$  
曲面沿特定方向快速上升, 又沿其他方向快速下降  
此时的 $f(x,y)$ 为一个鞍面, 曲线 $f(x,y)=z$ 为一个双曲线, 如图所示

![](./src/saddle.svg =x400)

当 $A$ 为半正定矩阵时, 存在特定方向有 $f(x,y)=0$  
$f(x,y)=0$ 的方向为一条与 $xy$ 平面相切的直线  
此时的 $f(x,y)$ 为一个平行抛物面, 如图所示

![](./src/critical.svg =x400)

### 多项式化简
将二次型化简为多个参数和的平方的形式  
$$f(\vec{x})=\sum_{i=1}^nb_i(\sum_{j=1}^{n-i+1}a_{ji}x_j)^2$$

对于系数矩阵 $A$ 的 [$LU$ 分解](./ch1.md#lu分解)得到的矩阵 $A=LU$, 易得  
$$b_i=\{U\}_{ii}\quad a_{ji}=\{L\}_{ji}$$

注意到 $b_i$ 即矩阵 $A$ 的主元, $a_{ji}$ 即各列的消元系数  
当任意 $b_i>0$, $f(\vec{x})$ 便可化简为一系列平方和, 除了 $\vec{x}=\vec{0}$, 显然有 $f(\vec{x})>0$  
因此以此也可以此证明[正定矩阵的基本性质](#正定矩阵的基本性质)中, 正定矩阵的主元必须大于零的性质

### 椭圆主轴
通过令 $f(\vec{x})=z$ 截取二次型, 能得到一个类椭球体  
易得, 当 $A$ 为对角矩阵时, 其二次型为 $f(\vec{x})\sum a_{ii}x_i^2$, 因此  
在两个参数的二维平面中为一个以 $x,y$ 轴为长短轴的正椭圆  
在三个参数的三维空间中为一个以 $x,y,z$ 轴为长, 中, 端轴的正椭球  
系数 $a_{ii}$ 反映了对应轴的长度, 其中 $a_{ii}$ 最大的轴为长轴, 剩余按 $a_{ii}$ 的顺序排列  

由于要求了 $A$ 为一个实对称矩阵, 根据[实对称矩阵的分解](#对称矩阵的分解), 有
$$f(\vec{x})=(Q\vec{x})^T\Lambda(Q\vec{x})$$

对于一般二次型截取得到的椭球体, 相当于以 $Q$ 为基底的正椭球体  
因此, 二次型所表达的椭球体中, 以其系数矩阵的特征值为椭球体轴的长度, 特征向量为对应轴的方向  

### 导数矩阵与极值
对于二阶可微的多元函数 $f(\vec{x})$, 将其所有二阶导数使用如下方式组成导数矩阵
$$F''=\begin{bmatrix}
\frac{\partial^2 f}{\partial x_1^2}&\frac{\partial^2 f}{\partial x_1x_2}&\dots&\frac{\partial^2 f}{\partial x_1x_n}\\
\frac{\partial^2 f}{\partial x_2x_1}&\frac{\partial^2 f}{\partial x_2^2}&\dots&\frac{\partial^2 f}{\partial x_2x_n}\\
\vdots&\vdots&\ddots&\vdots\\
\frac{\partial^2 f}{\partial x_nx_1}&\frac{\partial^2 f}{\partial x_nx_2}&\dots&\frac{\partial^2 f}{\partial x_n^2}
\end{bmatrix}$$
注意, 二阶可微的多元函数有 $\frac{\partial^2 f}{\partial x\partial y}=\frac{\partial^2 f}{\partial y\partial x}$, 在此条件下, 导数矩阵为实对称矩阵

当在点 $\vec{x'}$ 上, 对于任意自变量 $x_i$ 的一阶导数均为零, 即 $\frac{\partial f}{\partial x_i}\big|_{\vec{x'}}=0$ 时  
多元函数$\vec{x'}$ 处的微元区域内, $f(\vec{x})$ 可视为一个二次型  
因此当 $f(\vec{x})$ 在 $\vec{x'}$ 处取得最小值时, 导数矩阵 $F''$ 为正定矩阵

因此多元函数在点 $\vec{x'}$ 取得最小值的条件为
* 在该点的任意一阶导数为 $0$ (梯度为 $\vec{0}$)
* 在该该点的导数矩阵 $F''$ 为正定矩阵

当 $n=1$, 即退化为一般一元函数取得最小值的条件

## 正定矩阵
### 正定矩阵的定义
定义对于一个实对称矩阵 $A$, 给定任意 $\vec{x}\neq \vec{0}$ 满足以下条件时
$$\vec{x}^TA\vec{x}>0$$
称该实对称矩阵为**正定矩阵**

当存在 $\vec{x'}, \vec{x'}^TA\vec{x'}=0$ 时, 则称 $A$ 为**半正定矩阵**

### 正定矩阵的基本性质
根据正定矩阵的定义, 其满足以下基本性质, 当矩阵满足任意一条基本性质, 也可说明其为正定矩阵
1. 矩阵的所有特征值大于 $0$
1. 矩阵可逆且所有主元大于 $0$
1. 矩阵的所有顺序主子式大于 $0$  
顺序主子式即矩阵左上角 $k$ 行 $k$ 列的子矩阵的行列式, 根据行列式的[推论](./ch5.md#推论四)可得  
使用 $\det(A_k)$ 表示矩阵 $A$ 在 $k$ 行 $k$ 列的顺序主子式, 设 $\det(A_0)=0$  
矩阵的主元满足 $p_k=\frac{\det(A_k)}{\det(A_{k-1})}$

### 正定矩阵的性质推论
以下是关于正定矩阵性质的重要推论

1. 由[特征值的特性](#特征值的特性)可得, 矩阵的逆的特征值为原矩阵的倒数, 因此当矩阵 $A$ 为正定矩阵时, 其逆 $A^{-1}$ 也是正定矩阵
1. 从[正定矩阵的定义](#正定矩阵的定义)出发, 当矩阵 $A,B$ 均为正定矩阵时, 有 $\vec{x}^{T}(A+B)\vec{x}=\vec{x}^TA\vec{x}+\vec{x}^TB\vec{x}>0$, 因此矩阵 $A+B$ 也是正定矩阵
1. 对于 $n\times m$ 的矩形阵 $A$, 当 $A$ [列满秩](./ch2.md#列满秩-column-rank)时, 最小二乘法中的矩阵 $A^TA$ 为正定矩阵 (该条件与[正规方程](./ch4.md#正规方程)有解的条件一致), 证明可参考[矩阵与其转置之积的秩](./ch2.md#矩阵与其转置之积的秩)  
以上三个性质体现了正定矩阵与正数的相似性

此外, 当矩阵 $A$ 为正定矩阵时, $A$ 的[$LU$ 分解](./ch1.md#lu分解)不需要行交换

## 相似矩阵
对于任意的方阵 $A,B$, 当存在一个可逆矩阵 $M$ 满足 $B=M^{-1}AM$, 则称矩阵 $A$ 与 $B$ **相似**

### 可对角化矩阵的相似性
当方阵 $A,B$ 相似且可对角化时有 (假设 $B=M^{-1}AM$)
$$\begin{split}
A\vec{x}&=\lambda\vec{x}\\
AMM^{-1}\vec{x}&=\lambda\vec{x}\\
M^{-1}AMM^{-1}\vec{x}&=\lambda M^{-1}\vec{x}\\
B(M^{-1}\vec{x})&=\lambda (M^{-1}\vec{x})
\end{split}$$

因此当 $A,B$ 相似, 表明矩阵 $A,B$ 具有相同的特征值, 但特征向量不同  
并且对于所有与矩阵 $A$ 相似的矩阵构成的集合中, 对角化得到的对角矩阵 $\Lambda$ 是其中最简洁的矩阵

### 不可对角化矩阵的相似性
当矩阵不满足[对角化条件](./ch6.md#对角化矩阵的条件)时, 两个矩阵即使有相同的特征值, 也不一定相似  
现已二维的情况为例, 对于矩阵 $\Lambda=4I=\begin{bmatrix}4&0\\0&4\end{bmatrix}$ 与任意可逆矩阵 $M$ 有  
$$M^{-1}\Lambda M=M^{-1}4IM=4I$$

因此矩阵 $\Lambda$ 除了自身外, 不存在任何相似矩阵, 而其他与 $\Lambda$ 一样具有特征值 $\lambda_1=\lambda_2=4$ 的矩阵如 $\begin{bmatrix}4&5\\0&4\end{bmatrix},\begin{bmatrix}5&1\\-1&3\end{bmatrix}$

但是上述的两个矩阵, 以及其他具有特征值 $\lambda_1=\lambda_2=4$ 且仅有一个特征向量的矩阵相似  
以此引出矩阵相似的另一性质, 矩阵相似时, 其特征值相同, 不同方向的特征向量相同

### 若尔当定理
定义若尔当矩阵 $J(\lambda,n)$ 有如下基本形式
$$J(\lambda,n)=
\begin{bmatrix}
\lambda&\underline{1}&0&\dots&0\\
0&\lambda&\underline{0}&\dots&0\\
0&0&\lambda&\dots&0\\
\vdots&\vdots&\vdots&\ddots&\vdots\\
0&0&0&\dots&\lambda
\end{bmatrix}$$

其中
* 参数 $\lambda$ 即矩阵中的 $\lambda$
* 参数 $n$ 为方阵的长度
* 上对角线即上式中有下划线的位置 (部分数中使用下对角线) 可为 $0$ 或 $1$

易得, 若尔当矩阵 $J$ 为一个不可对角化矩阵, 且有 $n$ 重特征值 $\lambda$, 上对角线 $1$ 的数量则反映了其特征向量的个数  
规定若尔当矩阵时所有与之相似矩阵中, 最简洁的矩阵

依照对角化矩阵的思想, 对于所有不可对角化的矩阵 $A$ , 都可以转化如下为若尔当型 (转化方法可查找有关资料), 且所有与 $A$ 相似的矩阵中, 认为其若尔当型是最简洁的矩阵 
$$A=M^{-1}\begin{bmatrix}
J(\lambda_1,n_1)&&&\\
&J(\lambda_2,n_2)&&\\
&&\ddots&\\
&&&J(\lambda_m,n_m)
\end{bmatrix}M$$

其中 
* 若尔当型为一个由若尔当矩阵组成的分块矩阵, 其余空白处使用零矩阵填充
* $\lambda_i$ 即矩阵 $A$ 第 $i$ 个不同的特征值
* $n_i$ 即矩阵 $A$ 特征值 $\lambda_i$ 的重数
* $J(\lambda_i,n_i)$ 中上对角线 $1$ 的数量需要在转化时确定
* 对角矩阵即一类 $n_i=1$ 的特殊若尔当型

## 奇异值分解
### 奇异值分解的定义
对于任意 $m\times n$ 的矩阵 $A$, 取向量 $\vec{v}\in R^n$, 通过 $A\vec{v}=\vec{u}$ 可得到一个向量 $\vec{u}\in R^m$  
现希望找到一组 $R^n$ 的标准正交基 $V=\begin{bmatrix}\vec{v}_1&\vec{v}_2&\dots&\vec{v}_n\end{bmatrix}$, 通过 $A\vec{v}_i=\sigma_i\vec{u}_i$  
可得到一组 $R^m$ 的标准正交基 $U=\begin{bmatrix}\vec{u}_1&\vec{u}_2&\dots&\vec{u}_m\end{bmatrix}$  
以此可得 $n\times n$ 的标准正交矩阵 $V$ 与 $m\times m$ 的标准正交矩阵 $U$

注意到, 当 $m\neq n$ 时, 并不是每个 $\vec{u}_i$ 都能与一个 $\vec{v}_i$ 相对应, 因此关系式 $A\vec{v}_i=\sigma_i\vec{u}_i$ 的数量由 $n,m$ 中较小的一个决定  
使用矩阵表示则有
$$\begin{split}
AV&=\begin{cases}
\begin{bmatrix}\sigma_1\vec{u}_1&\sigma_2\vec{u}_2&\dots&\sigma_m\vec{u}_m&\vec{0}&\dots&\vec{0}\end{bmatrix},m<n\\
\begin{bmatrix}\sigma_1\vec{u}_1&\sigma_2\vec{u}_2&\dots&\sigma_m\vec{u}_m\end{bmatrix},m=n\\
\begin{bmatrix}\sigma_1\vec{u}_1&\sigma_2\vec{u}_2&\dots&\sigma_n\vec{u}_n\end{bmatrix},m>n
\end{cases}\\
AV&=U\Sigma\\
A&=U\Sigma V^T\\
A&=\begin{bmatrix}\vec{u}_1&\vec{u}_2&\dots&\vec{u}_m\end{bmatrix}
\begin{bmatrix}
\sigma_1&0&\dots&0\\
0&\sigma_2&\dots&0\\
\vdots&\vdots&\ddots&\vdots
\end{bmatrix}
\begin{bmatrix}\vec{v}_1^T\\ \vec{v}_2^T\\ \dots\\ \vec{v}_n^T\end{bmatrix}
\end{split}$$

其中
* 矩阵 $A$ 为任意矩阵
* 矩阵 $U,V$ 为[标准正交矩阵](./ch4.md#标准正交矩阵), 有 $V^{-1}=V^T,U^{-1}=U^T$
* 矩阵 $\Sigma$ 为 $n\times m$ 的矩阵, 且第 $i$ 对角位置上的值为 $\sigma_i$  
一般按从大到小的顺序排列 $\Sigma$ 对角线上的元素  
==注意$\Sigma$ 不一定是方阵==, 其形状与 $A$ 一致
* 定义分解 $A=U\Sigma V^T$ 即为**奇异值分解**

可得, 正定矩阵的对角化是一种特殊的奇异值分解

### 奇异值分解过程
直接求解矩阵 $U,V$ 难度较高, 可通过矩阵 $A^TA$ 间接求解  
$$\begin{split}
A^TA&=(U\Sigma V^T)^TU\Sigma V^T\\
A^TA&=V\Sigma^T\Sigma V^T
\end{split}$$

由[正定矩阵的性质推论](#正定矩阵的性质推论)可得, $A^TA$ 为正定矩阵 (或半正定矩阵), 因此仅需要对角化矩阵 $A^TA$ 即可得到标准正交矩阵 $V$  
矩阵 $A^TA$ 的特征量与 $\sigma$ 之间满足 $\lambda_i=\sigma_i^2$, 习惯上取 $\sigma_i\ge 0$  

之后通过 $AA^T$ 使用类似的方法即可求出 $U$, 有 $AA^T=U\Sigma\Sigma^T U^T$  
其中 $\Sigma$ 与 $AA^T$ 的特征值已知, 但还需要通过 $A\vec{v}_i=\sigma_i\vec{u}_i$ 进一步确定 $U$ 中向量的方向

注意 $\vec{v}_i,\lambda_i,\sigma_i,\vec{u}_i$ 之间需要一一对应

### 不可逆矩阵的奇异值分解示例
以不可逆矩阵 $A=\begin{bmatrix}4&4\\-3&3\end{bmatrix}$ 为例

首先计算 $A^TA$
$$\begin{split}
A^TA&=\begin{bmatrix}4&-3\\4&3\end{bmatrix}\begin{bmatrix}4&4\\-3&3\end{bmatrix}\\
&=\begin{bmatrix}25&7\\7&25\end{bmatrix}
\end{split}$$

计算可得 $A^TA$ 有特征值 $\lambda_1=32,\lambda_2=18$, 有特征向量 $\vec{x}_1=\begin{bmatrix}1&1\end{bmatrix}^T,\vec{x}_2=\begin{bmatrix}1&-1\end{bmatrix}^T$  

将特征向量标准化可得 $V=\begin{bmatrix}1/\sqrt{2}&1/\sqrt{2}\\1/\sqrt{2}&-1/\sqrt{2}\end{bmatrix}$, 将特征值开方可得 $\Sigma=\begin{bmatrix}\sqrt{32}&0\\0&\sqrt{18}\end{bmatrix}$

根据推导可知 $AA^T$ 与 $A^TA$ 具有相同的特征值 $\lambda_1=32,\lambda_2=18$, 仅需找出特征向量 $\vec{u}_1=\begin{bmatrix}1&0\end{bmatrix}^T,\vec{u}_2=\begin{bmatrix}0&1\end{bmatrix}^T$

注意, 对于以上求出的 $\vec{u}_2$ 有 $A\vec{v}_2=-\vec{u}_2$ 因此应当取 $\vec{u}_2=\begin{bmatrix}0&-1\end{bmatrix}^T$

因此矩阵 $A$ 有奇异值分解
$$A=U\Sigma V^T=\begin{bmatrix}1&0\\0&-1\end{bmatrix}\begin{bmatrix}\sqrt{32}&0\\0&\sqrt{18}\end{bmatrix}\begin{bmatrix}1/\sqrt{2}&1/\sqrt{2}\\1/\sqrt{2}&-1/\sqrt{2}\end{bmatrix}$$

### 可逆矩阵的奇异值分解
以可逆矩阵 $A=\begin{bmatrix}4&3\\8&6\end{bmatrix}$ 为例

首先计算 $A^TA=\begin{bmatrix}80&60\\60&45\end{bmatrix}$ 

由于 $A^TA$ 不可逆, 属于半正定矩阵, 因此其有特征值 $\lambda_1=80+45=125,\lambda_2=0$, 有标准化特征向量 $\vec{v}_1=\begin{bmatrix}0.8&0.6\end{bmatrix}^T,\vec{v}_2=\begin{bmatrix}0.6&-0.8\end{bmatrix}^T$

$AA^T$ 与 $A^TA$ 具有相同的特征值 $\lambda_1=125,\lambda_2=0$, 仅需找出特征向量 $\vec{u}_1=\begin{bmatrix}1/\sqrt{5}&2/\sqrt{5}\end{bmatrix}^T,\vec{u}_2=\begin{bmatrix}-2/\sqrt{5}&1/\sqrt{5}\end{bmatrix}^T$

因此矩阵 $A$ 有奇异值分解
$$A=U\Sigma V^T=\begin{bmatrix}1/\sqrt{5}&-2/\sqrt{5}\\2/\sqrt{5}&1/\sqrt{5}\end{bmatrix}\begin{bmatrix}\sqrt{125}&0\\0&0\end{bmatrix}\begin{bmatrix}0.8&0.6\\0.6&-0.8\end{bmatrix}$$

注意到 $\vec{v}_1$ 为行空间 $C(A^T)$ 的基, $\vec{v}_2$ 为零空间 $N(A)$ 的基, $\vec{u}_1$ 为列空间 $C(A)$ 的基, $\vec{u}_2$ 为左零空间 $N(A^T)$ 的基  

### 奇异值分解与基本子空间
称 $\sigma_i$ 为矩阵 $A$ 的奇异值, 其中奇异值必定有 $\sigma\ge 0$, 并且非零奇异值的个数即矩阵的秩

实际上, 对于任意矩阵 $A$, 经奇异值分解得到的标准正交矩阵 $V,U$ 中
* $\begin{bmatrix}\vec{v}_1&\vec{v}_2&\dots&\vec{v}_r\end{bmatrix}$ 为行空间 $C(A^T)$ 的一组标准正交基
* $\begin{bmatrix}\vec{v}_{r+1}&\vec{v}_{r+2}&\dots&\vec{v}_n\end{bmatrix}$ 为零空间 $N(A)$ 的一组标准正交基
* $\begin{bmatrix}\vec{u}_1&\vec{u}_2&\dots&\vec{u}_r\end{bmatrix}$ 为列空间 $C(A)$ 的一组标准正交基
* $\begin{bmatrix}\vec{u}_{r+1}&\vec{u}_{r+2}&\dots&\vec{u}_m\end{bmatrix}$ 为左零空间 $N(A^T)$ 的一组标准正交基

这一特性反映了两个空间间[正交补](./ch4.md#正交补)  
并且来自奇异值分解的, 行空间与列空间的基是所有基中最特殊的, 这两个基之间通过 $\sigma_i$ 相互对应, 耦合最少

## 左右逆与伪逆
对于一般的可逆矩阵 $A$ , 总是存在 $A^{-1}A=AA^{-1}=I$  
由于 $A$ 满秩, $C(A)=C(A^T)=R^n$, 因此总是存在线性组合得到 $I$ 的各列 / 各行

而对于[列满秩](./ch2.md#列满秩-column-rank)或[行满秩](./ch2.md#行满秩-row-rank)的矩阵 $A$, 希望能找到特定的矩阵 $A_{l}'$ 或 $A_{r}'$, 与 $A$ 相乘得到单位矩阵 $I$  
称 $A_{l}'$ 与 $A_{r}'$ 为**左逆**与**右逆**

### 左逆
对于一个 $m\times n$ 的矩阵 $A$  
当矩阵列满秩时, 表明其[行空间](./ch3.md#行空间) $C(A^T)=R^n$, 显然存在对于行的线性组合得到单位矩阵 $I$ 的各列  
因此==列满秩的矩阵存在左逆 $A_{l}'$==

注意到, 由[矩阵与其转置之积的秩](./ch2.md#矩阵与其转置之积的秩)可得 $A^TA$ 为可逆矩阵, 因此存在 $(A^TA)^{-1}$, 基于这一特点, 可以构造 $(A^TA)^{-1}A^TA=I$, 由此可得矩阵的左逆满足
$$A_{l}'=(A^TA)^{-1}A^T$$

必须指出, 由于 $A$ 的行向量中存在自由向量, 因此方程 $A^T\vec{y}=\vec{0}$ 存在无数多解, 即存在无数矩阵满足左逆矩阵的要求, 但以上公式得出的是其中最优的一个  

对于运算 $AA_{l}'=A(A^TA)^{-1}A^T$ 则可得到一个投影到 $A$ 各列的[投影矩阵](./ch4.md#投影矩阵) $P$ 

### 右逆
使用相同的方法可得  
行满秩的矩阵存在右逆 $A_{r}'$, 矩阵的右逆满足
$$A_{l}'=A^T(AA^T)^{-1}$$

同样, 存在无数矩阵满足右逆的要求, 以上公式仅是最优的一个  

对于运算 $A_{r}'A=A^T(AA^T)^{-1}A$ 则可得到一个投影到 $A$ 各行的[投影矩阵](./ch4.md#投影矩阵) $P$

### 行空间与列空间的关系
对于 $m\times n$ 的矩阵 $A$  

现有任意两个向量 $\vec{x},\vec{y}\in C(A^T)$ 且 $\vec{x}\neq\vec{y}$  
分别左乘 $A$ 可得到两个向量 $A\vec{x},A\vec{y}\in C(A)$  
现证明 $A\vec{x}\neq A\vec{y}$

假设 $A\vec{x}=A\vec{y}$, 则有 $A(\vec{x}-\vec{y})=\vec{0}$  
此时 $(\vec{x}-\vec{y})\in N(A)$, 又根据向量空间[线性组合](./ch2.md#向量空间-vector-space)的要求有 $\vec{x}-\vec{y}\in C(A^T)$

然而, 行空间与零空间是一对[正交补](./ch4.md#正交补), 除了 $\vec{0}$ 外不存在任何公共向量, 因此不存在 $A(\vec{x}-\vec{y})=\vec{0}$

由以上关系可知, 行空间 $C(A^T)$ 与列空间 $C(A)$ 之间的向量存在一种一一对应的关系, 并且行空间中的向量通过左乘 $A$ 即可唯一地映射到列空间  
现定义矩阵 $A$ 的**伪逆** $A^{+}$, 列空间的向量通过左乘伪逆 $A^{+}$ 可唯一地映射到行空间  
即对于 $A\vec{x}=\vec{y}$ 有 $A^{+}\vec{y}=\vec{x}$

与此同时, 对于零空间中的向量 $\vec{x}\in N(A)$, 经过左乘 $A$ 仅能得到 $\vec{0}$  
对于伪逆类似的有对于左零空间中的向量 $\vec{x}\in N(A^T)$, 经过左乘 $A^{+}$ 仅能得到 $\vec{0}$  
又根据[正交补](./ch4.md#正交补)的关系, 对于任意向量 $\vec{x}\in R^n$ 分解为 $C(A^T)$ 与 $N(T)$ 中的两个向量, 则其左乘 $A$ 也将映射到 $C(A)$ 中, 反之对于 $A^{+}$ 同理

### 矩阵的伪逆
基于奇异值分解来求解 $m\times n$ 的矩阵 $A$ 的伪逆 $A^{+}$

对于奇异值分解中的奇异值矩阵 $\Sigma$, 为一个 $m\times n$ 的矩形矩阵, 第 $i$ 个对角线上的元素为奇异值 $\sigma_i$, 其余元素均为 $0$  

易得, 奇异值矩阵的伪逆 $\Sigma^{+}$ 为一个 $n\times m$ 的矩形矩阵, 第 $i$ 个对角线上的元素为 $\frac{1}{\sigma_i}$, 其余元素均为 $0$

而矩阵 $A$ 经过奇异值分解后有 $A=U\Sigma V^{T}$, 与求逆的规则类似, 对整体求伪逆即可得到伪逆满足
$$A^{+}=V\Sigma^{+}U^{T}$$

可得
* 任何矩阵都有伪逆, 可逆矩阵的伪逆即 $A^{-1}$
* 矩阵的伪逆 $A^{+}$ 为一个 $n\times m$ 的矩阵
* 伪逆与矩阵相乘时 $A^{+}A$ 为一个 $n\times n$ 的方阵, 并且其对角线上前 $r$ 个元素为 $1$ 剩余为 $0$, 其余元素均为 $0$  
$AA^{+}$ 为一个 $m\times m$ 的方阵, 元素与 $A^{+}A$ 类似
* 与矩阵的逆不同, 仅当 $\vec{b}\in C(A)$ (即满足[有解的条件](./ch2.md#有解的条件)), 向量 $A^{+}\vec{b}$ 为方程 $A\vec{x}=\vec{b}$ 的一个解  
* 伪逆与矩阵运算满足 $AA^{+}A=A,A^{+}AA^{+}$, 该性质由矩阵与伪逆的映射特点可得, $A^{+}A\vec{x}$ 相当于将 $\vec{x}$ 映射到列空间 $C(A)$ 再重新映射回 $C(A^T)$ (但此时 $\vec{x}$ 中来自 $N(A^T)$ 的部分已经消失), 最后乘上 $A$ 与直接映射的效果相同
