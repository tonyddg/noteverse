---
order: 6
---

# 数理统计
## 总体与个体
### 概念 P89
1. 总体: 研究对象全体的集合
2. 个体: 组成总体的元素
### 关系 P90
设总体$X$的分布函数$F(x)$, 若 $X_1,X_2,...,X_n$ ==相互独立且与总体同分布==, 则称 $X_1,X_2,...,X_n$ 是总体 $X$ 的容量为 $n$ 的样本
## 统计量 P92
设 $g(x_1,x_2,...,x_n)$ 不含未知参数, 有   
$$Z=g(X_1,X_2,...,X_n)$$   
则称==随机变量 $Z$== 为统计量  
### 样本均值
$$\overline{X}=\frac{1}{n}\sum_{i=1}^nX_i$$
### 样本方差
注意 $n-1$ , 此时样本方差为总体方差的无偏估计
$$S^2=\frac{1}{n-1}\sum_{i=1}^n(X_i-\overline{X})^2$$
### 样本标准差
$$S=\sqrt{\frac{1}{n-1}\sum_{i=1}^n(X_i-\overline{X})^2}$$
## 抽样分布 P93
### $\chi^2$ (卡方)分布
设 $(X_1,X_2,...,X_n)$ 是总体 $X\sim N(0,1)$ 的样本, 称统计量
$$\chi^2=X_1^2+X_2^2+...+X_n^2$$
服从自由度为n的卡方分布, 记为 $\chi^2\sim\chi^2(n)$
==要求 $(X_1,X_2,...,X_n)$ 相互独立==, 或仅有一个自由度(变量)时, 没有要求
#### 概率密度
$$f(x)=\begin{cases}
\frac{1}{2^{n/2}\Gamma(n/2)}x^{\frac{n}{2}-1}e^{-\frac{x}{2}}&,x\ge0\\
0&,x<0
\end{cases}$$
#### 性质
1. $$E\chi^2=n$$
2. $$D\chi^2=2n$$
3. $$\chi_1^2\sim\chi^2(n)\;\chi_2^2\sim\chi^2(m)\\(\chi_1^2+\chi_2^2)\sim\chi^2(n+m)\;$$
4. 设 $\chi^2\sim\chi^2(n)$ ==常数 $\chi^2_\alpha(n)$==, $\alpha\in(0,1)$, 满足
$$\int_{\chi^2_\alpha(n)}^{+\infty}f_{\chi^2}(x)dx=P(\chi^2>\chi^2_\alpha(n))=\alpha$$
则称 $\chi^2_\alpha(n)$ 为 $\chi^2(n)$ 分布的上侧 $\alpha$ 分位点
#### 特例
$X\sim N(0,1)$ 则 $X^2\sim\chi^2(1)$
### t 分布
设 $X\sim N(0,1)\;Y\sim\chi^2(n)$, 且 ==$X,Y$ 相互独立==, 则称   
$$T=(\text{上下均匀, 同次})\frac{X}{\sqrt{Y/n}}\sim t(n)$$  
表明 $T$ 服从自由度为 $n$ 的 $t$ 分布  
#### 性质
1. $t$ 分布的概率密度函数为偶函数
2. 当 $n\to\infty$, $t(n)$ 分布趋近于标准正态分布
3. 设 $T\sim t(n)$ ==常数 $t_\alpha(n)$==, $\alpha\in(0,1)$, 满足
$$\int_{t_\alpha(n)}^{+\infty}f_{T}(x)dx=P(T>t_\alpha(n))=\alpha$$
则称 $t_\alpha(n)$ 为 $t(n)$ 分布的上侧 $\alpha$ 分位点
4. 特征 分子分母为一次
#### 特例
$X,Y$ 来自总体 $N(0,1)$
$\because|Y|=\sqrt{Y^2} \; Y^2\sim\chi^2(1)$
$\therefore \frac{X}{|Y|}\sim t(1)$
### F 分布
设 $X\sim\chi^2(n)\;Y\sim\chi^2(m)$, 且 $X,Y$ 相互独立, 则称  
$$F=(\text{上下均匀, 同次})\frac{X/n}{Y/m}\sim F(n,m)$$  
表明 $F$ 服从自由度为 $(n,m)$ 的 $F$ 分布  
#### 性质
1. $$F\sim F(n,m)\to\frac{1}{F}\sim F(m,n)$$
2. 设 $F\sim F(n,m)$ ==常数 $F_\alpha(n)$==, $\alpha\in(0,1)$, 满足
$$\int_{F_\alpha(n,m)}^{+\infty}f_{F}(x)dx=P(F>F_\alpha(n,m))=\alpha$$

则称 $F_\alpha(n,m)$ 为 $F(n,m)$ 分布的上侧 $\alpha$ 分位点

3. $$F_{1-\alpha}(n,m)=\frac{1}{F_\alpha(m,n)}$$
4. 特征 分子分母为二次
## 正态总体的统计量分布 P95
==前提条件: 设 $(X_1,X_2,...,X_n)$ 是总体 $X\sim N(\mu, \sigma^2)$ 的样本==
### 性质
1. $\overline{X}$ 与 $S^2$ 独立
2. $$\bar{X}\sim N(\mu,\frac{\sigma^2}{n})$$
3. $S$ 中分母为 $n-1$, 减去的值为随机变量 $\bar{X}$
$$(n-1)\frac{S^2}{\sigma^2}\sim\chi^2(n-1)$$
4. 将 $X_i$ 标准化后求平方和, 即卡方分布
$$\frac{1}{\sigma^2}\sum_{i=1}^n(X_i-\mu)^2\sim\chi^2(n)$$
### 统计量分布 P95
#### 单随机变量序列
标准化的 $\overline{X}$ ==与化为 $\chi^2(n-1)$ 的 $S^2$== 转换为 $t$ 分布时, ==要除以 $n-1$ 并开方==
$$T=(\frac{\overline{X}-\mu}{\sigma/\sqrt{n}})/\sqrt{\frac{n-1}{n-1}\frac{S^2}{\sigma^2}}=\frac{\bar{X}-\mu}{S/\sqrt{n}}\sim t(n-1)$$
#### 双变量
设 $(X_1,X_2,...,X_n)$ 是总体 $X\sim N(\mu_x, \sigma_x^2)$ 的样本  
$(Y_1,Y_2,...,Y_m)$ 是与 $X$ 独立的总体 $Y\sim N(\mu_y, \sigma_y^2)$ 的样本  
$$F=\frac{S_x^2/\sigma_x^2}{S_y^2/\sigma_y^2}\sim F(n-1,m-1)$$