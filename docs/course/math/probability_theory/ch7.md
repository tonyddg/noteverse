---
order: 7
---

# 参数估计
## 概念
已知总体分布类型, 与容量为 n 的样本的值 $x_1, x_2, ..., x_n$, 但参数未知 $\theta_i$, 通过特定估计量(统计量), 估计未知参数
## 矩估计法 P100
### 单个参数
1. 使用 $\overline{X}=\frac{1}{n}\sum_{i=1}^nX_i$ 估计总体均值 $EX$
2. 寻找参数与总体期望的关系 $EX=g(\theta_i)$
3. 解方程($x_i$ 为已知量/常数) 
$$\frac{1}{n}\sum_{i=1}^nx_i=g(\hat{\theta_i})$$

### 双参数
1. 使用 $\overline{X}=\frac{1}{n}\sum_{i=1}^nX_i^2$ 估计总体均值 $E(X^2)$
2. 寻找参数与总体期望以及平方期望的关系 
$$\begin{split}EX&=g(\theta_1,\theta_2)\\E(X^2)&=f(\theta_1,\theta_2)\end{split}$$
3. 解方程
4. 可使用 
$$S^{*2}=\frac{1}{n}\sum_{i=1}^n(X_i-\overline{X})^2$$
估计 $DX$, 代替 $E(X^2)$ , 注意不是 $S^2$, 此处分母为 $n$
### 不变性
未知参数 $\theta$ 有矩估计 $\hat{\theta}(x_1,x_2,...,x_n)$ , 对于未知参数 $\theta'=g(\theta)$, $g(\theta)$ ==单值单调==(有单值反函数)(概率分布函数符合这一性质), 则 $\theta'$ 的矩估计 $\hat{\theta'}=g(\hat{\theta})$

## 极大似然估计 P103
### 概念
1. 假设实验结果出现的概率极大, 因此分布的参数应使实验结果出现的概率达到最大值, 以符合这一要求
2. ==各个样本之间独立同分布==
3. 求 $\theta$ 使 L 取得最大值 
$$L(\theta)=P(X_1=x_1,X_2=x_2,...,X_n=x_n)=P(X_1=x_1)P(X_2=x_2)...P(X_n=x_n)$$

#### 连续型
1. 使用概率密度观察该点的函数值
2. 此时 $\theta$ 为密度函数内的一个未知参数, ==将这个参数作为变量, 随机变量的取值为已知量(常量)==
$$L(\theta)=f(x_1;\theta)f(x_2;\theta)...f(x_n;\theta)$$
3. 求使 $L(\theta)$ 达到最大值的 $\hat{\theta}$ , 等价于使 $ln[L(\theta
)]$ 达到最大值, 可用于简化求值
$$ln[L(\theta)]=ln[f(x_1;\theta)]+ln[f(x_2;\theta)]+...+ln[f(x_n;\theta)]$$
4. ==对 $\theta$ 求导, $x_i$ 为常量==, 求出最大值点, 得到 $\hat{\theta}$
5. 多个未知参数则求偏导
6. 导数不为零时, 结合 ==$x_i$ 对未知参数的限制==, 分析得出未知参数 P105
#### 离散型
1. $$L(\theta)=P(X_1=x_1;\theta)P(X_2=x_2;\theta)...P(X_n=x_n;\theta)$$
2. 同连续型, 取对数求导
### 性质
1. 不变性 未知参数 $\theta$ 有极大似然估计 $\hat{\theta}(x_1,x_2,...,x_n)$ , 对于未知参数 $\theta'=g(\theta)$, $g(\theta)$ ==单值单调==(有单值反函数)(概率分布函数符合这一性质), 则 $\theta'$ 的极大似然估计 $\hat{\theta'}=g(\hat{\theta})$
2. 正态分布总体的极大似然估计
$$\mu=\overline{X}=\frac{1}{n}\sum_{i=1}^nX_i$$
$$\sigma^2=\frac{1}{n}\sum_{i=1}^n(X_i-\mu)^2$$
## 估计量的选择标准
使用估计量 $Z=f(X_1,X_2,...,X_n)$ 估计参数 $\theta$ 
### 无偏性
1. 当 $EZ=\theta$ 称 $Z$ 为参数 $\theta$ 的无偏估计
2. 当 $\lim_{n\to\infty}(EZ-\theta)=0$ 称 $Z$ 为参数 $\theta$ 的渐近无偏估计
3. 否则称 $Z$ 为参数 $\theta$ 的有偏估计
### 有效性
使用无偏估计量 $Z_1=f(X_1,X_2,...,X_n)$ 与 $Z_2=f(X_1,X_2,...,X_n)$ 估计参数 $\theta$
当 $DZ_1<DZ_2$ 则称 $Z_1$ 比 $Z_2$ 有效
### 一致性
当估计量序列($Z_n=f(X_1,X_2,...,X_n)$) 依概率收敛于 $\theta$, 则称 $Z$ 为参数 $\theta$ 的一致估计量
对于任意 $\varepsilon>0$
$$\lim_{n\to\infty}P(|Z_n-\theta|>\varepsilon)=0$$
## 区间估计
对于参数 $\theta$
$$P(\underline{u}\le\theta\le\overline{u})=1-\alpha$$
1. $\underline{u}$ 置信下限
2. $\overline{u}$ 置信上限
3. $\alpha$ 置信水平
4. $[\underline{u},\overline{u}]$ 置信区间
对于一个置信水平可能有多个置信区间, (正态分布)一般取关于关于均值对称的区间
5. $L=\overline{u}-\underline{u}$ 置信长度
### 正态总体, 已知 σ2 求 μ
根据
$$\frac{\bar{X}-\mu}{\sigma/\sqrt{n}}\sim N(0,1)$$
1. 设未知变量 $a$
$$P(|\frac{\bar{X}-\mu}{\sigma/\sqrt{n}}|<a)=1-\alpha$$
$$P(\bar{X}-\frac{\sigma}{\sqrt{n}}a<\mu<\bar{X}+\frac{\sigma}{\sqrt{n}}a)=1-\alpha$$
2. 求未知变量 $a$
求对立事件
$$P(\frac{\bar{X}-\mu}{\sigma/\sqrt{n}}<-a)+P(\frac{\bar{X}-\mu}{\sigma/\sqrt{n}}>a)=\alpha$$
根据标准正态密度函数的对称性
$$P(\frac{\bar{X}-\mu}{\sigma/\sqrt{n}}<-a)=P(\frac{\bar{X}-\mu}{\sigma/\sqrt{n}}>a)=\frac{\alpha}{2}$$
可得
$$a=N_{\frac{\alpha}{2}}$$
即标准正态分布上侧的 $\frac{\alpha}{2}$ 分位点
3. 结果
置信区间 
$$[\bar{X}-\frac{\sigma}{\sqrt{n}}N_{\frac{\alpha}{2}},\bar{X}+\frac{\sigma}{\sqrt{n}}N_{\frac{\alpha}{2}}]$$  
置信长度 
$$L=2\frac{\sigma}{\sqrt{n}}N_{\frac{\alpha}{2}}$$
### 正态总体, 求 μ
根据 [正态总体的抽样分布](./ch6.md#单随机变量序列)
$$\frac{\bar{X}-\mu}{S/\sqrt{n}}\sim t(n-1)$$
1. $\sigma^2$ 使用统计量 $S$ 估计(注意 $S$ 中的分母与 $t$ 分布的 $n-1$)
2. $t$ 分布密度函数具有对称性, 可得 $a=t_{\frac{\alpha}{2}}(n-1)$
3. 同已知 $\sigma^2$ 的方式处理
得到结果
置信区间 
$$[\bar{X}-\frac{S}{\sqrt{n}}t_{\frac{\alpha}{2}}(n-1),\bar{X}+\frac{S}{\sqrt{n}}t_{\frac{\alpha}{2}}(n-1)]$$
置信长度 
$$L=2\frac{S}{\sqrt{n}}t_{\frac{\alpha}{2}}(n-1)$$