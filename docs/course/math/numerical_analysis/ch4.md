---
order: 4
---

# 线性方程组直接解法
## 矩阵乘法
矩阵乘法不满足交换率
### 以列向量理解
对于矩阵乘法 
$$AB=C$$

将矩阵的每一列理解为一个列向量, 矩阵与向量之积 $Av=b$ 即表明了将 $A$ 的每一列为新的基底, 以最左侧为第一个轴, 经过变换后得到新的向量 $b$, ==此时基底矩阵位于左侧==

当右侧为另一个矩阵时, 理解为一个行向量数组, 因此 $AB$ 为对 $B$ 中每一列向量分别以 $A$ 为基底进行变换, 从而得到一个新的向量数组 $C$

### 以行向量理解
将矩阵的每一行理解为一个行向量, 矩阵与向量之积 $hA=c$ 即表明了将 $A$ 的每一行为新的基底, 以最上方为第一个轴, 经过变换后得到新的行向量 $c$, ==此时基底矩阵位于右侧==

当左侧为另一个矩阵时, 理解为一个行向量数组, 因此 $AB$ 为对 $A$ 中每一行向量分别以 $B$ 为基底进行变换, 从而得到一个新的向量数组 $C$

## 高斯消元法
直接高斯消元法中, 如果除数接近 $0$, 将导致结果不稳定

### 列主消元法
1. 高斯消元中, 交换行顺序仅改变了方程的次序, 因此对结果无影响
2. 在每次消元中, 找出消元列中绝对值最大的元素, 将其与列主交换消元

### 列主三角分解
列主消元法中由于交换了行, 无法完全三角分解, 还需要一个排序矩阵
$$PA=LU$$

## 三角分解
当 $A$ 为非奇异矩阵, 则可以将 $A$ 分解为一个上三角矩阵 $L$ 与下三角矩阵 $U$ 之积
$$A=LU$$
并且通常规定 $L$ 的主对角线上为 $1$

### 三角分解的使用
确定 $A=LU$ 后, $Ax=b$ 等价于求解 $L(Ux)=b$
1. $Ly=b$ 先求出 $y$
2. $Ux=y$ 在求出 $x$

### 高斯消元法的三角分解
1. 高斯消元法中, 每次消去第 $k$ 列, 相当于 (注意, 此时是对方程系数操作, 需要从行角度理解, 因此 $A$ 在右侧) 
$$A_{k+1}=L_kA_k$$ 
其中 
$$L_k=\begin{bmatrix}1&0&\dots&0&\dots&0\\0&1&\dots&0&\dots&0\\\vdots\\0&0&\dots&1&\dots&0\\0&0&\dots&-m_{k+1,k}&\dots&0\\\vdots\\0&0&\dots&-m_{n,k}&\dots&1\\\end{bmatrix}$$

2. 最终得到的 $A_n=U$ 为一个上三角矩阵
3. ==将消去矩阵 $L_i$ 相乘取逆有== (等价于组合消元矩阵的非对角线区域, 再取负, 不能直接使用) 
$$L=(\prod L_i)^{-1}\\=\begin{bmatrix}
1&0&\dots&0&\dots&0\\
m_{2,1}&1&\dots&0&\dots&0\\
\vdots\\
m_{k,1}&m_{k,2}&\dots&1&\dots&0\\
m_{k+1,1}&m_{k+1,2}&\dots&m_{k+1,k}&\dots&0\\
\vdots\\
m_{n,1}&m_{n,2}&\dots&m_{n,k}&\dots&1\\
\end{bmatrix}$$
4. 得到矩阵 $A$ 的三角分解

### 直接三角分解
即直接求解方程 $A=LU$
1. 使用未知数表示 $L$ 与 $U$, 其中 $L$ 的主对角线上为 $1$
2. 以未知数表示 $LU$ 的结果
3. 将 $A$ 与 $LU$ 对照, 解出未知数, 得到三角分解
4. 计算复杂度与高斯消元类似 

### 对称矩阵的三角分解
对称矩阵可分解为 
$$A=LDL^T=(LD^{1/2})(D^{1/2}L)^T=L_1L_1^T$$
其中 $L$ 为主对角线上为 $1$ 的下三角矩阵, $D$ 为对角线矩阵, ==$L_1$ 主对角线上不为 $1$==

### 追赶法
对于对角占优矩阵问题
$$A=\begin{bmatrix}b_1&c_1\\
a_1&b_2&c_2\\
&\ddots&\ddots&\ddots\\
&&a_{n-1}&b_{n-1}&c_{n-1}\\
&&&a_n&b_n\end{bmatrix}$$
其中 $|b_n|\ge|a_n|+|c_n|$
可将其分解为矩阵 (注意此时上三角矩阵 $U$ 的主对角线为 $1$) 
$$U=\begin{bmatrix}1&\beta_1\\
&1&\beta_2\\
&&\ddots&\ddots\\
&&&1&\beta_{n-1}\\
&&&&1\end{bmatrix}L=\begin{bmatrix}\alpha_1\\
r_2&\alpha_2\\
&\ddots&\ddots\\
&&r_{n-1}&\alpha_{n-1}\\
&&&r_n&\alpha_n\end{bmatrix}$$
带入 $A=LU$ 可得到递推公式
$$\\\alpha_i=b_i-a_i\beta_{i-1}\\\beta_i=c_i/\alpha_i\\r_i=a_i$$
并在 $Ly=b\;Ux=y$ 中递推解出结果

## 矩阵问题的病态性
### 特征值
* 对于任意矩阵 $A$ 有方程
$$Ax=\lambda x\\(A-\lambda I)x=0$$
* 称 $\lambda$ 为矩阵的特征值, $x$ 为特征值对应的特征向量
* 对于 $A\in R^{n\times n}$, 在复数域有 $n$ 个根
* 称最大的特征值为矩阵的谱半径, 记为 $\rho(A)$

当 $A$ 的==特征值为实数==时, 具有以下特性

* 设 $A$ 具有特征值 $\rho(A)=\lambda_1\gg1\gt\lambda_2$, 对于任意向量 $v$, 谱半径具有特性 
$$Av=A(ax_1+bx_2)=a\lambda_1x_1+b\lambda_2x_2$$
因此当 $n$ 足够大 
$$A^nv=a\lambda_1^nx_1+b\lambda_2^nx_2\approx \rho(A)^nx_{\rho}$$
如果 $\rho(A)<1$, 则有 
$$A^nv\approx 0$$

* 推论可得, 矩阵变换中
    * 特征向量代表变化的方向
    * 特征值代表变化的程度
    * 谱半径为变化最剧烈的程度, 当 $\rho(A)>1$ 系统将不稳定
* 设 $\Lambda$ 为以特征值为对角的矩阵, $P$ 为对应==单位化==特征向量组成的实矩阵, 则可分解 $$A=P\Lambda P^{-1}$$

当 $A$ 为==实对称矩阵==时, 具有以下特性

* 其特征值一定是实数
* 其单位化特征向量组成的矩阵 $P$ 一定正定, 即 $P^{-1}=P^T$
* 对于矩阵变换 $y=Ax=P\Lambda P^{T}$, 可用几何解释
    1. ==将 $P$ 作为基底==(将向量分解到 $P$ 上)
    1. $y_1=P^Tx$ 旋转向量 $x$ 到标准基底上(原始坐标轴)
    注意由于 $P$ 正交, 因此特征向量垂直, 能实现此效果, 一般的特征向量不垂直, 不会旋转到原始坐标轴上
    1. $y_2=\Lambda y_1$ 从==原始坐标轴方向缩放==旋转后的向量 $y_1$
    1. $y=Px$ 反向旋转向量 $y_2$ 到原始方向
    * 因此矩阵变换可视为将向量在特征向量方向拉伸
    * 特征值为拉伸的倍数

#### 特征值求解
根据 
$$Ax=\lambda x\\(A-\lambda I)x=0$$ 
由于 $x\neq 0$, 要使此齐次方程有非零解, 要求 
$$det(A-\lambda I)=0$$ 
解出的 $\lambda$ 即为特征值
由于 $(A-\lambda I)$ 为奇异矩阵, 因此方程有无数解, 同常取 $|x|=1$

### 范数运算
将满足以下不等式的运算称为范数
* 系数条件
$$\begin{Vmatrix}cx\end{Vmatrix}=c\begin{Vmatrix}x\end{Vmatrix}$$
* 正定条件
$$\begin{Vmatrix}x\end{Vmatrix}\ge 0$$
* 三角不等式
$$\begin{Vmatrix}x\end{Vmatrix}+\begin{Vmatrix}y\end{Vmatrix}\ge \begin{Vmatrix}x+y\end{Vmatrix}$$
* 柯西不等式
$$\begin{Vmatrix}x\end{Vmatrix}\begin{Vmatrix}y\end{Vmatrix}\ge \begin{Vmatrix}xy\end{Vmatrix}$$

* 当满足以上条件后, 即可使用范数函数来估计向量的大小, 例如使用 $1$ 范数估计误差, 相比 $2$ 向量可减小计算量

### 向量范数
对于向量 $x$, 与向量内的元素 $x_i$, 规定运算
* $\infty$ 范数
$$\begin{Vmatrix}x\end{Vmatrix}_{\infty}=max|x_i|$$
* $1$ 范数
$$\begin{Vmatrix}x\end{Vmatrix}_1=\sum|x_i|$$
* $2$ 范数
$$\begin{Vmatrix}x\end{Vmatrix}_{2}=(\sum x_i^2)^{1/2}$$
* $p$ 范数
$$\begin{Vmatrix}x\end{Vmatrix}_{p}=(\sum |x_i|^p)^{1/p}$$

### 矩阵范数
对于矩阵 $A$, 与矩阵内的元素 $a_{ij}$, 规定运算
* $F$ 范数
$$\begin{Vmatrix}A\end{Vmatrix}_{F}=(\sum a_{ij}^2)^{1/2}$$
* 算子范数 (利用柯西不等式条件推广 $p$ 范数)
$$\begin{Vmatrix}A\end{Vmatrix}_v=\max_{x\neq \vec{0}}\frac{\begin{Vmatrix}Ax\end{Vmatrix}_v}{\begin{Vmatrix}x\end{Vmatrix}_v}$$
* 行范数 ($v=\infty$, 取每行向量之和的最大值)
* 列范数 ($v=1$, 取每列向量之和的最大值)
* $2$ 范数 ($v=2$)
$$\begin{Vmatrix}A\end{Vmatrix}_2=\sqrt{\lambda_{max}(AA^T)}$$

### 矩阵条件数
假设线性方程组有误差 $\delta b$, 则方程变为 
$$A(x+\delta x)=b+\delta b$$ 
即 
$$Ax=b\\ A\delta x=\delta b$$ 
利用柯西不等式, 可得到不等式 
$$\frac{\begin{Vmatrix}\delta x\end{Vmatrix}}{\begin{Vmatrix}x\end{Vmatrix}}\le \begin{Vmatrix}A\end{Vmatrix}\begin{Vmatrix}A^{-1}\end{Vmatrix}\frac{\begin{Vmatrix}\delta b\end{Vmatrix}}{\begin{Vmatrix}b\end{Vmatrix}}$$
因此可以定义条件数, 来刻画矩阵对相对误差的放大效果 
$$cond(A)_{v}=\begin{Vmatrix}A\end{Vmatrix}_v\begin{Vmatrix}A^{-1}\end{Vmatrix}_v$$
当 $cond(A)_{v}\gg 1$, 称线性方程组为病态的
