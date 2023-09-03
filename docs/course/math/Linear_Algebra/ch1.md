# 第一章 矩阵基础
> 参考教程 [麻省理工公开课 线性代数](https://www.bilibili.com/video/BV1zx411g7gq) P1~P5


## 方程组的几何解释
现有矩阵方程
$$\begin{bmatrix}u_1&v_1\\u_2&v_2\end{bmatrix}\begin{bmatrix}x\\y\end{bmatrix}=\begin{bmatrix}b_1\\b_2\end{bmatrix}$$

通常也被简写为
$$A\vec{x}=\vec{b}$$

### 行视图 (Row Picture)
按行来解释矩阵方程, 可得到方程组
$$\begin{aligned}L_1:u_1x+v_1y&=b_1\\L_2:u_2x+v_2y&=b_2\end{aligned}$$

方程组中的每一个方程均可视为一条直线, 直线的交点即方程组的解  
$$\vec{x}=(x,y)$$

注意在高维度的情况下, 行方程表示的不再是直线. 如三维的中, 行方程将表示一个平面

在行视图中, 矩阵被视为一个以行向量为元素的列向量, 当两个列向量相乘, 即为右侧的列向量乘上左侧列项量中各个元素得到一个新的列向量
$$A\vec{x}=\begin{bmatrix}\begin{bmatrix}u_1\;v_1\end{bmatrix}\cdot\begin{bmatrix}x\\y\end{bmatrix}\\\begin{bmatrix}u_2\;v_2\end{bmatrix}\cdot\begin{bmatrix}x\\y\end{bmatrix}\end{bmatrix}=\vec{b}$$

### 列视图 (Column Picture)
按列来解释矩阵方程, 可得到向量方程
$$\begin{bmatrix}u_1\\u_2\end{bmatrix}x+\begin{bmatrix}v_2\\v_2\end{bmatrix}y=\begin{bmatrix}b_1\\b_2\end{bmatrix}$$

此时方程为寻找==向量 $(u_1,v_1)$ 与 $(u_2,v_2)$ 的**线性组合** $x,y$ 达到点 $(b_1,b_2)$==

当矩阵 $A$ 非奇异 (可逆) 时, 矩阵中的列向量的所有线性组合将能表示出向量所在空间内的任意向量

在列视图中, 矩阵被视为一个以列向量为元素的行向量, 当行向量与列向量相乘, 即以列向量元素为系数, 对矩阵中的列向量进行**线性组合**
$$A\vec{x}=\begin{bmatrix}u_1\\u_2\end{bmatrix}x+\begin{bmatrix}v_1\\v_2\end{bmatrix}y=\vec{b}$$

## 矩阵运算
### 矩阵与向量相乘
对于行向量与矩阵相乘的情况, 可将矩阵视为以行向量为元素的列向量, 此时可将此乘法视为以行向量元素为系数对矩阵中的行向量进行线性组合
$$\vec{x}^TA=[u_1\;v_1]x+[u_2\;v_2]y=\vec{b}^T$$

结合[列视图](#列视图-column-picture)的结论, 可得到矩阵与向量相乘的规律, 即:
* 矩阵与其**左侧的行向量**相乘时, 将以此行向量为系数对**组成矩阵的行向量**进行线性组合
* 矩阵与其**右侧的列向量**相乘时, 将以此列向量为系数对**组成矩阵的列向量**进行线性组合
* 当这些向量以垂直方向堆叠时, 便得到矩阵, 将其称为变换矩阵. 矩阵相乘也可视为根据变换矩阵中的各个向量分别线性组合, 最后重新堆叠得到一组新的向量. 其中规则依然不变, 即==左侧的变换矩阵对按行向量划分对原矩阵的行向量线性组合, 右侧的变换矩阵按列向量划分对原矩阵的列向量线性组合==

### 乘法运算
现有 $m\times n$ 的矩阵 $A$ 与 $n\times p$ 的矩阵 $B$ 相乘, 得到 $m\times p$ 的矩阵 $C$
$$AB=C$$

#### 常规方法
将 $A$ 视为 $m$ 个行向量堆叠, $B$ 视为 $p$ 个列向量堆叠, 堆叠的向量两两点乘, 得到 $m\times p$ 个结果, 这些结果按来自 $A$ 的 $i$ 行向量与 $B$ 的 $j$ 列向量排列即为结果 $m\times p$ 的矩阵 $C$
$$c_{ij}=\vec{a_{ri}}\cdot \vec{b_{cj}}$$

#### 列方法
将矩阵 $A$ 视为整体, 将矩阵 $B$ 视为堆叠的列向量. 由[矩阵乘向量](#矩阵与向量相乘)的含义可得, ==$B$ 中的列向量作为系数分别对 $A$ 中的**列向量线性组合**==, 得到 $p$ 个维度为 $m$ 的列向量, 组合即为矩阵 $C$
$$\vec{c_{ci}}=\sum_{k=1}^n b_{ki}\vec{a_{ck}}$$

因此对于 $B$ 的第 $i$ 列上的第 $j$ 行元素表示了 $A$ 中的第 $j$ 列在组合得到 $C$ 中第 $i$ 列的系数

#### 行方法
将矩阵 $B$ 视为整体, 将矩阵 $A$ 视为堆叠的行向量. 由[矩阵乘向量](#矩阵与向量相乘)的含义可得, ==$A$ 中的行向量作为系数分别对 $B$ 中的**行向量线性组合**==, 得到 $m$ 个维度为 $p$ 的行向量, 组合即为矩阵 $C$
$$\vec{c_{ri}}=\sum_{k=1}^n a_{ki}\vec{b_{rk}}$$

因此对于 $=A$ 的第 $i$ 行上的第 $j$ 列元素表示了 $B$ 中的第 $j$ 行在组合得到 $C$ 中第 $i$ 行的系数

#### 叠加法
将向量视为一个矩阵时, 使用上述矩阵乘法法则可得, 当一个列向量与行向量相乘时, 结果为一个矩阵, 对于
$$\vec{a}\cdot \vec{b}^T=C'$$

根据基本方法可得, $C'$ 中元素 $c'_{ij}$ 为两个向量中的元素 $a_i,b_j$ 相乘得到
$$c'_{ij}=a_ib_j$$

由行方法或列方法可得, 这种方式得到的矩阵的行或列**均是**来自单个向量乘以不同系数, 因此其行视图为几个平行平面 (三维, 包含 $b$), 列视图为几个重叠与同一直线上的向量.

此时将矩阵 $A$ 视为一个 $n$ 维列向量, 其中的元素为行向量; $B$ 视为一个 $n$ 维行向量, 其中元素为列向量, 以此矩阵相乘转化为了普通的向量点乘. 向量点乘中对应元素相乘, 得到矩阵 $C'_k$, 再将结果相加得到 $C$
$$C=\sum_{k=1}^n \vec{a_{ck}}\cdot\vec{b_{rk}}$$

### 乘法规则
#### 基本规则
* 乘法结合律 连续的矩阵相乘可以改变计算顺序
$$(AB)C=A(BC)$$

* 乘法分配律 注意==矩阵乘法不满足交换律==, 因此要注意位置
$$A(B+C)=AB+AC\\ (B+C)A=BA+CA$$

* 数乘交换律
$$kAB=AkB$$

* 对于矩阵 $A_{m\times n}$ 与 $B_{a\times b}$, 仅当 $n=a$ 时可以相乘, 相乘结果为 $C_{m\times b}$

#### 分块乘法
可对矩阵进行分块, 变为一个以矩阵为元素的矩阵, 此时矩阵乘法的规则依然满足, 但是要保证子矩阵之间可以相乘.

### 转置运算
转置即让矩阵根据对角线反转, 对于非方阵还会改变形状

使用数学表达即
$$(A)_{ij}=(A^T)_{ji}$$

#### 转置运算法则

* 转置与乘法运算之间满足
$$(AB)^T=B^TA^T$$

* 转置与加法运算之间满足
$$(A+B)^T=A^T+B^T$$

#### 对称矩阵
定义满足条件
$$S^T=S$$

的矩阵 $S$ 为对称矩阵, 其必定为方阵且在对角线两侧的对应元素相同

根据转置的运算规则可得, 对于任意形状的任意矩阵 $R$, 通过以下方式即可得到对称矩阵
$$RR^T=S$$

## 简单线性方程组的求解
现有简单线性方程组 $A\vec{x}=\vec{b}$ 其中 $A$ 为 $n\times n$ 的矩阵

### 高斯消元法
#### 基本求解过程
1. 将线性方程组在左上角的元素称为主元(pivot), 第一行称为主行
1. 将主行乘以一个系数并减去其他行, 使得主元所在列上除主元以外的系数消去
1. 除去主行与主元所在列, 得到一个子矩阵, 并在子矩阵上重复, 直到主行上只有一个主元
1. 将此时的线性方程组的系数以矩阵表示, 得到一个上三角矩阵, 计为 $U$, 系数向量记为 $\vec{c}$
1. 对消元完成的方程组回代, 即从下到上解出未知数并带入, 得到方程组的解

#### 求解时的注意事项
1. 消元法中的==主元不可为 $0$==
1. 当主元为 $0$ 时, 可交换方程组中的行, 使 (矩阵或子矩阵) 第一列不为 $0$ 的行作为主行
1. 当第一列上的元素均为 $0$, 方程组没有唯一解, 高斯消元失败

### 初等矩阵
针对高斯消元中的操作, 可通过左乘矩阵 (操作行) 实现相同的效果. 将这些矩阵称为初等矩阵, 他们一定可逆

由于消元一般是对行操作, 因此一下矩阵均为左乘, 当右乘时则为对列操作, 效果相同

#### 单位矩阵
使用 $I$(Identity) 表示单位矩阵, 与单位矩阵相乘类似于乘以 $1$, 运算后矩阵不变化

使用矩阵的下标表示矩阵的维数

eg.
$I_2=\begin{bmatrix}1&0\\0&1\end{bmatrix}$

#### 消元矩阵
使用 $E$(Elimination) 表示消元矩阵, 可实现对矩阵中的一行称上一个系数并加上另一行的操作, 实现消元

使用矩阵的下标 $ab$ 表示第 $b$ 行乘上系数加上第 $a$ 行. 同时下标 $ab$ 也表明了 ==$E_{ab}$ 与单位矩阵 $I$ 除了 $a$ 行 $b$ 列处存在系数, 其他位置完全相同==

eg.
$E_{21}(e)=\begin{bmatrix}1&0\\e&1\end{bmatrix}$

由消元矩阵的特性可得, 消元矩阵的逆矩阵即将系数符号取反即可

eg.
$E_{21}^{-1}(e)=E_{21}(-e)=\begin{bmatrix}1&0\\-e&1\end{bmatrix}$

#### 置换矩阵
使用 $P$(Permutation) 表示置换矩阵, 可实现对矩阵中的行进行交换

使用矩阵的下标 $ab$ 表示交换 $ab$ 行

eg.
$P_{12}=\begin{bmatrix}0&1\\1&0\end{bmatrix}$

##### 三维置换矩阵
在三维情况下, 共存在三种共六个不同的置换矩阵
* 单位矩阵
$$I=\begin{bmatrix}1&0&0\\0&1&0\\0&0&1\end{bmatrix}$$
* 交换两行的置换矩阵
$$P_{12}=\begin{bmatrix}0&1&0\\1&0&0\\0&0&1\end{bmatrix}P_{13}=\begin{bmatrix}0&0&1\\0&1&0\\1&0&0\end{bmatrix}P_{23}=\begin{bmatrix}1&0&0\\0&0&1\\0&1&0\end{bmatrix}$$
* 交换三行的置换矩阵
$$P_{231}=\begin{bmatrix}0&1&0\\0&0&1\\1&0&0\end{bmatrix}P_{312}=\begin{bmatrix}0&0&1\\1&0&0\\0&1&0\end{bmatrix}$$

##### 置换矩阵群的特性
以三维置换矩阵为例, 可得置换矩阵存在以下特性
* 任意两个置换矩阵的乘积仍然为一个置换矩阵
* 对于任何置换矩阵满足运算 
$$P^{-1}=P^T$$
* 其中, 当置换矩阵**仅交换两行**或不交换时, 还满足
$$P_{ij}^{-1}=P_{ij}$$
* 置换矩阵中每行仅有一个 $1$, 且没有重复的两行. 因此对于一个 $n$ 维空间, 总共存在 $n!$ 个置换矩阵 (第一行的 $1$ 有 $n$ 个位置, 第二行就有 $n-1$ 个位置, 以此类推共有 $n!$ 个)

#### 将初等矩阵用于消元
注意矩阵乘法不满足交换律, 但是满足结合律, 连续相乘的矩阵可按任意顺序计算. 因此可使用上述的初等矩阵左乘系数矩阵以表示消元过程, 此时有(以三维为例, 且**假设不存在行交换**) 
$$(E_{32}E_{31}E_{21})A=U$$

为了得到 $c$, 通常使用增广矩阵 $[A|b]$ 带入计算

除了得到上三角矩阵 $U$, 还可使用消元矩阵继续完成回带, 最终得到 $$E'E[A|b]=E'[U|c]=[I|x]$$

## 矩阵的逆
此处以**方阵**为讨论对象, 矩阵具有相同的行与列 (非方阵中也存在逆, 且性质有区别)

对于以下表达式, 称矩阵 $A^{-1}$ 为矩阵 $A$ 的逆矩阵
$$AA^{-1}=A^{-1}A=I$$

### 矩阵可逆的条件
不可逆的矩阵也称为奇异矩阵 (Singular), 其具有以下等价的特性

* 不可逆矩阵的行列式值为 $0$
* 不可逆矩阵的列或行向量的任意线性组合无法表示出所在空间的所有向量
* 对于方程 $A\vec{x}=0$, 不可逆矩阵除了 $\vec{0}$ 外还存在解 $\vec{x}\neq \vec{0}$

### 矩阵求逆
根据逆矩阵与矩阵乘法的性质可得对于逆矩阵的任一列 $\vec{a^{-1}_{ci}}$ 满足线性方程组
$$A\vec{a^{-1}_{ci}}=\vec{i_{ci}}$$

因此逆矩阵的每一列都可视为上述线性方程组的解. 由于这一系列的线性方程组具有相同的系数, 因此可扩展使用增广矩阵 $[A|I]$ 来表示, 并通过[高斯消元法](#将初等矩阵用于消元)求出 $A^{-1}$, 有(为了得到逆, 还需要回代)
$$E'E[A|I]=[I|A^{-1}]$$

### 矩阵求逆的混合运算运算
#### 求逆与乘法
根据矩阵乘法满足结合律, 不满足交换律可得
$$ABB^{-1}A^{-1}=I$$

因此相乘矩阵的逆为
$$(AB)^{-1}=B^{-1}A^{-1}$$

#### 求逆与转置
根据转置的运算法则可得
$$(AA^{-1})^T=(A^{-1})^TA^T=I^T=I$$

因此可得转置与求逆运算次序可以交换
$$(A^T)^{-1}=(A^{-1})^T$$

## LU分解
在消元法中, 通常写为以下形式
$$EA=U$$

由于 $E^{-1}$ 的特殊性质, 现取 $L=E^{-1}$, 可以得到 $LU$ 分解, 写为
$$A=LU$$

其中 $U$ 为上三角 (upper) 矩阵, 并且对角线上的值不一定为 $1$; $L$ 为下三角 (lower) 矩阵, ==并且对角线上的值为 $1$==

### 常规 LU 分解
**假设不存在行交换**, 仅有消元时, 矩阵 $E$ 仅由消元矩阵组成, 在三维情况下为
$$E=E_{32}E_{31}E_{21}$$

此时 $L$ 即为
$$L=E^{-1}=(E_{21}^{-1}(E_{31}^{-1}(E_{32}^{-1}I)))$$

根据[消元矩阵](#消元矩阵)的性质可得, 消元矩阵仅在其下标位置存在系数以及消元矩阵的逆依然为消元矩阵. 注意 $L$ 中的消元顺序与实际相反, 因此以从左到右按行左乘的角度来看, 有以下特点 (假设 $A$ 为 $m\times m$ 的方阵)
1. ==$L$ 中的消元矩阵按与消元过程相反的顺序排列==, 按先列再行的顺序从右下角开始进行反向操作
1. 运算过程中, 当 $L'$ 左乘 $E_{ab}^{-1}(e)$ 时, 由于 $a>b$ 且 $L'$ 在 $1\sim b$ 行依然保持类似 $I$ 的形式, 因此第 $b$ 行上只有第 $b$ 列的元素为 $1$, 其他为 $0$. 此时==左乘 $E_{ab}^{-1}$ 相当于使 $ab$ 处的元素变为 $-e$==
1. 综上所述, ==$L$ 中的下三角元素 $l_{ab}$ 是消元系数 $-e_{ab}$==, 即消元过程中主行 $b$ 乘上 $-e_{ab}$ **减去**第 $a$ 行. 因此可以在消元得到 $U$ 的同时记录消元系数得到 $L$, 实现 $LU$ 分解

### 分解算法的复杂度
现对 $n\times n$ 的矩阵 $A$ 消元 ($LU$ 分解)

消元开始时, 由第一行分别乘以系数 $-e_{a1}$ 减去第 $a$ 行, 共重复 $n-1$ 次. 两行相减时, 对行中的各个系数分别进行了一次乘法与一次减法, 一行中共有 $n$ 个系数. 因此完成第一行的消元的时间复杂度为 
$$2n(n-1)\sim o(n^2)$$

对剩余行的消元可等价为对一个 $(n-1)\times (n-1)$ 的矩阵进行消元, 因此时间复杂度满足
$$o(n^2)+o[(n-1)^2]+...+o(1^2)\sim o(n^3)$$

当已知 $\vec{b}$ 时, 使用逆矩阵或 $U$ 回代, 复杂度均为 $o(n^2)$

### 行交换情况下的 LU 分解
当消元过程中出现行交换时, 还需要使用到消元矩阵, 此时的 $LU$ 分解表示为
$$PA=LU$$

#### 置换矩阵与消元矩阵之间的运算
> 参考自 [PA=LU 分解](https://ccjou.wordpress.com/2012/04/13/palu-%E5%88%86%E8%A7%A3/)

现有运算如下
$$E=P_{ab}E_{ij}(e)P_{ab}$$

在此运算中, 视为 $P_{ab}$ 同时左乘与右乘 $E_{ij}$. 根据置换矩阵的性质可得, 该相当于是交换了 $E_{ij}$ 的 $ab$ 行与 $ab$ 列. 由于变换后, 消元矩阵主对角线上的 $1$ 依然保持, ==因此矩阵 $E$ 依然为一个消元矩阵==

对于在 $LU$ 分解过程中可能发生的情况, 有
* 当 $a,b\neq i,j$ 时, 显然 $E=E_{ij}$
* 当 $a=i,j\neq a,b$ 时, 仅有行交换影响到消元系数 $e$, 此时有 $E=E_{bj}(e)$; 当 $b=i,j\neq a,b$ 同理

#### 从消元过程中提取置换矩阵
当存在行交换的情况下, 消元过程变为 (四维情况, 假设消元中发生 $23,34$ 行交换)
$$E_{43}(P_{34}E_{42}E_{32})(P_{23}E_{41}E_{31}E_{21})P_{1x}=E$$

对于 $PA=LU$ 分解, 要求的则是如下形式, 需要将所有 $P$ 提前
$$L^{-1}PA=U$$

根据[仅交换两行的置换矩阵性质](#置换矩阵)有如下变形 (上标 $(ab)$ 表示原始的消元系数)
$$\begin{aligned}P_{23}E_{41}E_{31}E_{21}&=P_{23}E_{41}P_{23}^2E_{31}P_{23}^2E_{21}P_{23}^2\\&=(P_{23}E_{41}P_{23})(P_{23}E_{31}P_{23})(P_{23}E_{21}P_{23})P_{23}\\&=E_{41}E_{21}^{(31)}E_{31}^{(21)}P_{23}\\P_{34}E_{41}E_{21}^{(31)}E_{31}^{(21)}P_{23}&=E_{31}^{(41)}E_{21}^{(31)}E_{41}^{(21)}P_{34}P_{23}\end{aligned}$$

观察变形可得
* 置换矩阵仅改变同一列之间的消元顺序以及消元系数与顺序的对应关
* 当消元中进行行交换时, 同时也会交换前面的消元系数的顺序 (行位置)
* 对于第 $i$ 列的消元, 可以保证之后的行交换发生在 $i+1\sim n$ 行内, 不会影响之前的消元系数

由于从第一列到最后一列的消元顺序没有改变, 因此 $L$ 的系数直接使用 $E$ 中对应位置系数的性质依然成立

#### PA=LU 分解过程
令 $\vec{b}=(1,2,\dots,n)$ 用于标记行交换, 并对增广矩阵 $[A|b]$ 进行分解

1. 对 $[A|b]$ 进行行交换 (包括 $\vec{b}$), 使第一行主元不为 $0$
1. 使用消元法消去第一列, 其中变为 $0$ 的位置改为存放消元系数 $-e_{a1}$ (即第一行乘上 $-e_{a1}$ 减去第 $a$ 行), 但不改变 $\vec{b}$ 上的值
1. 对 $[A'|b']$ 进行行交换 (包括 $\vec{b}$), 使第 $i$ 行主元不为 $0$
1. $1\sim i-1$ 列保持, 使用消元法消去第 $i$ 列, 其中变为 $0$ 的位置改为存放消元系数 $-e_{ai}$
1. 重复完成消元, 根据交换后的 $\vec{b'}$ 得到 $P$
1. 结果矩阵中, 左下角元素即 $L$ 的左下角部分; 对角线与右上角的元素即 $U$ 的右上角部分.

#### 过程示例
将消元系数使用下划线 $\underline{e}$ 表示, 引入辅助的列向量 $\vec{b}$, 有如下过程
$$\begin{split}[A|b]=&
\begin{bmatrix}2&-3&4&2&\big|&1\\6&-9&12&5&\big|&2\\4&-5&10&5&\big|&3\\2&2&11&9&\big|&4\end{bmatrix}\\
\xrightarrow{Eliminate\;col1}&\begin{bmatrix}2&-3&4&2&\big|&1\\\underline{3}&0&0&-1&\big|&2\\\underline{2}&1&2&1&\big|&3\\\underline{1}&5&7&7&\big|&4\end{bmatrix}\\
\xrightarrow{Permutation\;2\;3}&\begin{bmatrix}2&-3&4&2&\big|&1\\\underline{2}&1&2&1&\big|&3\\\underline{3}&0&0&-1&\big|&2\\\underline{1}&5&7&7&\big|&4\end{bmatrix}\\
\xrightarrow{Eliminate\;col2}&\begin{bmatrix}2&-3&4&2&\big|&1\\\underline{2}&1&2&1&\big|&3\\\underline{3}&\underline{0}&0&-1&\big|&2\\\underline{1}&\underline{5}&-3&2&\big|&4\end{bmatrix}\\
\xrightarrow{Permutation\;3\;4}&\begin{bmatrix}2&-3&4&2&\big|&1\\\underline{2}&1&2&1&\big|&3\\\underline{1}&\underline{5}&-3&2&\big|&4\\\underline{3}&\underline{0}&\underline{0}&-1&\big|&2\end{bmatrix}\\
\end{split}$$

得到分解结果
$$\begin{split}L=&\begin{bmatrix}1\\\underline{2}&1\\\underline{1}&\underline{5}&1\\\underline{3}&\underline{0}&\underline{0}&1\end{bmatrix}\\
U=&\begin{bmatrix}2&-3&4&2\\&1&2&1\\&&-3&2\\&&&-1\end{bmatrix}\\
P=&\begin{bmatrix}1&0&0&0\\0&0&1&0\\0&0&0&1\\0&1&0&0\end{bmatrix}
\end{split}
$$