---
order: 5
---

# 线性方程组迭代解法
## 迭代法概念
对于线性方程组 
$$Ax=b$$ 
将其转化为等式 
$$x=Bx+f$$ 
得到向量序列 
$$x^{(n)}=Bx^{(n-1)}+b$$ 
如果迭代收敛, 则存在极限 
$$\lim_{i\to\infty}x^{(i)}=x$$ 
其中 $B,f$ 可在满足原式的条件下任取, $x_0$ 通常取 $0$

### 迭代构建
1. 构建 
$$A=M-N$$ 
得到分裂矩阵 $M$, 通常 $M$ 为非奇异矩阵, 并且易于求逆, 如对角矩阵
2. 方程转化为 
$$\begin{split}Mx&=Nx+b\\x&=M^{-1}Nx+M^{-1}b\end{split}$$
3. 得到迭代矩阵 
$$B=I-M^{-1}A$$
4. 得到 
$$f=M^{-1}b$$

### 迭代法编程
```python
def iter_meth(xk, eps, fun, test):
    while True:
        xk1 = fun(xk)
        if test(xk1, xk) < eps:
            break
        xk = xk1
    
    return xk1
```

对于向量序列, 取误差测试函数为范数运算 
$$test(x^{(k+1)},x^{(k)})=\begin{Vmatrix}x^{(k+1)}-x^{(k)}\end{Vmatrix}_{v=1,\infty}$$

## 雅可比迭代法
将 $A$ 的对角取出作为分裂矩阵 $M$
对于矩阵 $A$ 与元素 $a_{ij}$, 定义

1. 
$$M=D=\begin{bmatrix}a_{11}\\
&a_{22}\\
&&\ddots\\
&&&a_{nn}\end{bmatrix}$$
2. 
$$L=\begin{bmatrix}0\\
-a_{21}&0\\
\vdots&\vdots&\ddots\\
-a_{n1}&-a_{n2}&\dots&0\end{bmatrix}$$
3. 
$$U=\begin{bmatrix}0&-a_{12}&\dots&-a_{1n}\\
&0&\dots&-a_{2n}\\
&&\ddots&\vdots\\
&&&0\end{bmatrix}$$

4. $$A=D-L-U$$

得到向量序列 
$$\begin{split}Ax&=b\\
Dx&=(L+U)x+b\\
x&=D^{-1}(L+U)x+D^{-1}b\end{split}$$

因此
1. $$B=D^{-1}(L+U)$$
2. $$f=D^{-1}b$$

## 高斯-赛德尔迭代法
将 $A$ 的下半部分取出作为分裂矩阵 $M$
对于矩阵 $A$ 与元素 $a_{ij}$, 定义
1. $$M=D-L$$
2. $$B=G=I-(D-L)^{-1}A=(D-L)^{-1}U$$
3. 得到向量序列 
$$Dx^{(k+1)}=Lx^{(k+1)}+Ux^{(k)}+b$$
4. 对于向量序列中的向量 $x^{(k+1)}$ 中的元素 $x^{(k+1)}_{i}$ 
$$a_{ii}x^{(k+1)}_{i}=b_i-\sum_{j=1}^{i-1}a_{ij}x^{(k+1)}_j-\sum_{j=i+1}^{n}a_{ij}x^{(k)}_j$$ 
可以发现迭代式具有以下特点:

* 由于 $L,U$ 是 $A$ 三角部分元素取负, 因此具体公式中要取负号
* $x^{(k+1)}_{i}$ 的值与 $x^{(k+1)}_{j}(j\le i-1)$ 和 $x^{(k)}_{j}(j\ge i+1)$ 有关, 因此仅需要一个数组保存 $x^{(k+1)}$ 的 $j\le i-1$ 部分与 $x^{(k)}$ 的 $j\ge i+1$ 部分
* 不需要具体计算矩阵 $B$

## 迭代法的收敛性
### 向量序列的收敛性
对于向量数列的极限 $x^*$, 定义序列误差 $\varepsilon^{(k+1)}=x^{(k+1)}-x^{*}$ 因此 
$$\varepsilon^{(k+1)}+x^*=B(\varepsilon^{(k)}+x^*)+f\\\varepsilon^{(k+1)}=B\varepsilon^{(k)}=B^{k+1}\varepsilon^{(0)}$$ 
可得向量序列收敛的条件为 
$$\lim_{k\to\infty}\varepsilon^{(k)}=0\to\lim_{k\to\infty}B^kx=0$$

#### 范数与特征值
由特征值定理可得 
$$\lambda x=Ax$$
取范数运算后, 根据柯西不等式有 
$$|\lambda|\begin{Vmatrix}x\end{Vmatrix}=\begin{Vmatrix}\lambda x\end{Vmatrix}=\begin{Vmatrix}Ax\end{Vmatrix}\le\begin{Vmatrix}A\end{Vmatrix}\begin{Vmatrix}x\end{Vmatrix}$$
因此 
$$\lambda\le\rho(A)\le\begin{Vmatrix}A\end{Vmatrix}$$

#### 向量序列收敛的条件
根据向量序列收敛的基本条件与[特征值的性质](./ch4.md#矩阵问题的病态性)可以推导出 
$$\lim_{k\to\infty}B^kx=0\to\rho(A)\le 1\to\exist v,\begin{Vmatrix}B\end{Vmatrix}_v\le 1$$ 
为了便于计算, 通常采用 $v=1,\infty$

### 向量序列的迭代速度


### 雅可比迭代法与高斯-赛德尔迭代法的收敛性
除了判断 $\begin{Vmatrix}B\end{Vmatrix}$, 对于特定的迭代法, 还可以==从 $A$ 直接判断收敛性==

#### 对角占优矩阵
对于矩阵 $A$ 与元素 $a_{ij}$, 定义
1. 严格对角占优矩阵
$$|a_{ii}|>\sum_{j\neq i,j=1}^{n}|a_{ij}|$$
2. 弱对角占优矩阵
$$|a_{ii}|\ge\sum_{j\neq i,j=1}^{n}|a_{ij}|$$
==要求不等式至少严格成立一次==

当 $A$ 满足以下条件时, 雅可比迭代法与高斯-赛德尔迭代法均收敛
1. $A$ 为严格对角占优矩阵
2. $A$ 为弱对角占优矩阵, 且非奇异
3. $A$ 为对称正定矩阵
4. 对于不满足条件的线性方程组可通过变形 (交换, 加减) 得到符合条件的矩阵

## 超松弛迭代法
选取分裂矩阵为 
$$M=\frac{1}{\omega}(D-\omega L)$$ 
类似高斯-赛德尔迭代法, 可得到向量序列 
$$Dx^{(k+1)}=\omega(Lx^{(k+1)}+Ux^{(k)}+b)+(1-\omega)Dx^{(k)}$$
类似的有 
$$a_{ii}x^{(k+1)}_{i}=\omega(b_i-\sum_{j=1}^{i-1}a_{ij}x^{(k+1)}_j-\sum_{j=i+1}^{n}a_{ij}x^{(k)}_j)+(1-\omega)a_{ii}x^{(k)}_{i}$$
当 $\omega=1$ 即高斯-赛德尔迭代法, 一般取 $\omega\in(1,1.6)$, 合适的 $\omega$ 可以加快收敛速度

### 超松弛迭代法的收敛条件
收敛条件与高斯-赛德尔迭代法相同, 此外还要求 
$$\omega\in(0,2)$$
