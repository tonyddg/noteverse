---
order: 5
---

# 大数定理
## 基础 p76
对于随机变量序列 $X_1,X_2,...,X_n$
设 
$$\overline{X}=\frac{1}{n}\sum_{i=1}^nX_i$$
### 大数定律
对于任意 $\varepsilon>0$  
$$\lim_{n\to\infty}P(|\overline{X}-a_n|<\varepsilon)=1$$  
序列的均值与已知数列的误差不断减小  
表明n趋于无限时, 序列的均值==几乎必然==趋于一个已知数列  
### 依概率收敛
对于任意 $\varepsilon>0$  
$$\lim_{n\to\infty}P(|X_n-a|<\varepsilon)=1$$  
表明n趋于无限时, 序列将==几乎必然==趋于一个常数  
记为 $X_n\xrightarrow{P}a$  
#### 性质
已知
$$X_n\xrightarrow{P}a\;Y_n\xrightarrow{P}b\;Z_n=g(X_n,Y_n)$$
有
$$Z_n\xrightarrow{P}g(a,b)$$
其中 $g(a,b)$ 连续
## 切比雪夫大数定理 P77
对于==不相关/相互独立==的随机变量序列 $X_1,X_2,...,X_n$ 有相同的方差与期望时, 此随机变量序列服从大数定律
## 辛钦大数定律 P78
对于==独立同分布==的随机变量序列 $X_1,X_2,...,X_n$, 且期望$EX=\mu$存在时
对于任意 $\varepsilon>0$
$$\lim_{n\to\infty}P(|\frac{1}{n}\sum_{i=1}^{n}X_i-\mu|<\varepsilon)=1$$
注意$\frac{1}{n}\sum_{i=1}^{n}X_i$ 是一个 ${X_i}$ 的算数平均值的的随机变量序列
表明 ${X_i}$ 的算数平均值依概率收敛于 $\mu$
## 伯努利大数定律 P78
做 $n$ 次独立重复实验, 事件 $A$ 发生次数为 $n_A$, 单次实验中 $P(A)=p$
对于任意 $\varepsilon>0$
$$\lim_{n\to\infty}P(|\frac{n_A}{n}-p|<\varepsilon)=1$$
$A$ 发生的频率 $\frac{n_A}{n}$ 也是一个随机变量序列
表明在多次重复实验中, ==$A$ 发生的频率== 依概率趋近于 $A$ 发生的概率
## 中心极限定理 P80
对于==独立同分布==的随机变量序列 $X_1,X_2,...,X_n$, 且存在期望 $EX_i=\mu$, 方差 $DX_i=\sigma^2$
$\sum_{i=1}^{n}X_i$ 的标准化随机变量
$$Y_n=\frac{\sum_{i=1}^{n}X_i-E(\sum_{i=1}^{n}X_i)}{\sqrt{D(\sum_{i=1}^{n}X_i)}}=\frac{\sum_{i=1}^{n}X_i-n\mu}{\sqrt{n}\sigma}$$
当n充分大时
$$Y_n\mathop{\sim}\limits^{\text{近似}}N(0,1)$$
推论
$$\frac{\overline{X}-\mu}{\sigma/\sqrt{n}}\mathop{\sim}\limits^{\text{近似}}N(0,1)$$