---
order: 2
---

# 向量空间

## 向量空间的属性补充
[向量空间的其他属性与定义](./ch2.md#向量空间-vector-space)

### 线性无关性 (Linear Independence)
对于一个**向量组** ${\vec{x_1},\vec{x_2},\dots,\vec{x_n}}$, 当除了系数全为零 (零组合) 的情况下, 向量组中的向量不存在任何线性组合能得到零向量 $\vec{0}$, 则该向量组线性无关

否则称此向量组线性相关, 例如向量组 $\{\vec{v},2\vec{v}\}$, $\{\vec{0}, \vec{v}\}$, $\{\vec{v_1},\vec{v_2},\vec{v_3}\}(\vec{v_n}\in R^2)$

#### 与矩阵的联系 
可将向量组作为列向量并组成 $m\times n$ 的矩阵 $A$, 当向量组线性无关时, 矩阵 $A$ 将具有以下的特征

* 当矩阵 $A$ 的零空间 $N(A)$ 内仅有零向量, 则此向量组线性无关
* 矩阵 $A$ 的秩满足 $r=n$, 矩阵不存在自由列

### 生成空间与基 (Basis)
一个向量组生成一个空间 $S$ , 表示这个空间内的向量包含了向量组内向量的所有线性组合.

定义向量空间的基为一个具有以下两个特性的**向量组**
1. 作为基的向量组线性无关
1. 这些向量组能够生成这个向量空间

### 向量空间的维数 (Dimension)
对于任意一个向量空间, 可能有无数个基, 但是这些基中的向量数量一定相同. 例如, 对于向量空间 $R^n$, 其基一定有 $n$ 个向量. 将这个基所需要的向量个数定义为空间的维数, 记为 $dim[C(A)]$

## 四个基本子空间
对于一个 $m\times n$ 的矩阵 $A$, 其秩为 $r$   
定义四个基本子空间

* 列空间 $C(A)$
* 零空间 $N(A)$
* 行空间 $C(A^{T})$
* 左零空间 $N(A^{T})$

这四个基本子空间的基能够在一次 $A$ 消元得到 $R$ 的过程 $[A|I]\to [R|E]$ 中全部得出

### 列空间
将来自==矩阵 $A$ 的**列向量**线性组合产生的向量空间称为**列空间**==  
表示为 $C(A)$

列空间中的向量均属于 $R^m$, 显然 $C(A)$ 为 $R^m$ 的子空间
$$C(A)\subseteq R^m$$

#### 列空间的维数
由于[秩](./ch2.md#秩的基本性质)确定了矩阵中独立列向量的个数, 显然列空间的维数即矩阵 $A$ 的秩 $r$
$$\dim[C(A)]=r$$

#### 生成列空间的基
矩阵 $A$ 经过[初等矩阵](./ch1.md#初等矩阵)消元与行交换得到简化行阶梯矩阵 $R$  
现引入[左零空间基求解](#生成左零空间的基)中的矩阵 $E$

对于同一个线性组合 $\vec{x}$, $A\vec{x}=\vec{b}\neq EA\vec{x}=E\vec{b}$  
显然有 $C(A)\neq C(R)$, 但由于 $R$ 没有经过列交换  
因此两个矩阵在线性组合中发挥作用的列相同  

对于 $R$ 显然其 [$I$ 部分的矩阵块](./ch2.md#简化行阶梯矩阵的结构)中的列向量足以组合得到 $C(R)$  
因此在 $A$ 中同样位置的列向量也足以组合得到 $C(A)$  
这些列也即 $A$ 的主元列

综上所述, ==$A$ 中的主元列即构成了列空间 $C(A)$ 的一组基==

### 零空间
将方程 $A\vec{x}=\vec{0}$ 的解 $\vec{x}$ 构成的空间定义为零空间 $N(A)$  
也可以说, ==使矩阵 $A$ 的**列向量**线性组合**得到 $\vec{0}$** 的向量组成**零空间**==

参与乘法 $\vec{x}$ 必定属于 $R^n$, 显然 $N(A)$ 为 $R^n$ 的子空间
$$N(A)\subseteq R^n$$

#### 零空间的维数
观察[零空间矩阵](./ch2.md#零空间矩阵), 其各列线性无关, 列数为 $n-r$  
零空间矩阵的列空间与 $A$ 零空间相同, 因此零空间维数即矩阵 $A$ 的自由变量个数 $n-r$
$$\dim[N(A)]=n-r$$

#### 生成零空间的基
对于[零空间矩阵](./ch2.md#零空间矩阵), 其各列线性无关  
其列空间 $C(N)$ 又与零空间 $N(A)$ 相同

因此, 易得==矩阵 $A$ 的零空间矩阵中的列向量即零空间 $N(A)$ 的一组基==

### 行空间
将来自==矩阵 $A$ 的**行向量**线性组合产生的向量空间称为**行空间**==  
易得, $A$ 的行空间即 $A^T$ 的列空间, 因此表示方法为 $C(A^T)$

行空间中的向量均属于 $R^n$, 显然 $C(A^T)$ 为 $R^n$ 的子空间
$$C(A^T)\subseteq R^n$$

#### 行空间的维数
矩阵 $A$ 在转置后的秩依然为 $r$, 因此行空间的维数也为矩阵 $A$ 的秩 $r$
$$\dim[C(A^T)]=r$$

#### 生成行空间的基
当矩阵 $A$ **左乘**[消元矩阵](./ch1.md#消元矩阵)得到[简化行阶梯矩阵](./ch2.md#简化行阶梯矩阵) $R$ 的过程中  
本质上为 $A$ 的各行之间线性组合, $R$ 中的各行来自 $A$ 的线性组合    
因此, ==在这个过程中行空间始终不变== (显然列空间不一定相同)  
$A,R$ 矩阵具有相同的行空间 ==$C(A^T)=C(R^T)$==

结合 $R$ 的性质综上可得, ==**简化行阶梯矩阵** $R$ 中的**非 $0$ 行向量**可以构成**行空间** $C(A^T)$ 的一组基==  
也将来自 $R$ 行向量的基称为行空间 $C(A^T)$ 的最佳基

### 左零空间
将方程 $\vec{y}^T A=\vec{0}$ 的解 $\vec{y}^T$ 构成的空间定义为左零空间  
由 $(\vec{y}^T A)^{T}=A^{T}\vec{y}$ 可得, 左零空间与 $A^T$ 的零空间相同, 因此表示方法为 $N(A^T)$  
也可以说, ==使矩阵 $A$ 的**行向量**线性组合**得到 $\vec{0}$** 的向量组成**零空间**==

参与乘法 $\vec{y}^T$ 必定属于 $R^m$, 显然 $N(A^T)$ 为 $R^m$ 的子空间
$$N(A^{T})\subseteq R^m$$

#### 左零空间的维数
由[零空间推广](#零空间的维数)可得, 左零空间维数即矩阵 $A^T$ 的自由变量个数 $m-r$
$$\dim[N(A^T)]=m-r$$
 
#### 生成左零空间的基
参考[矩阵求逆](./ch1.md#矩阵求逆)的方法, 对于增广矩阵 $[A|I]$, 在将 $A$ 经过换行(初等矩阵左乘)为 $R$ 的过程中有 $[A|I]\to[R|E]$  

其中 $E$ 为 $m\times m$ 的矩阵, 类似于矩阵的逆, 有 $EA=R$  
并且 $E$ 来自初等矩阵相乘, 因此必定为可逆矩阵, 其各行线性无关 

观察到, $R$ 下方 $m-r$ 行为零向量 $\vec{0}$ (见[简化行阶梯矩阵的结构](./ch2.md#简化行阶梯矩阵的结构))  
这 $m-r$ 行零向量 $\vec{0}$ 又来自 $E$ 下方 $m-r$ 行的行向量与 $A$ 的行向量线性组合  
因此矩阵 $E$ 末尾的 $m-r$ 行向量必定属于左零空间 $(E)_{r=i}\in N(A^T),(i=r,\dots m)$

由于 $E$ 自身的线性无关性以及左零空间的维数, 因此==矩阵 $E$ 的第 $r$ 行到第 $m$ 行向量 (末尾的 $m-r$ 行) 构成了左零空间 $N(A^T)$ 的一组基==

## 矩阵空间
