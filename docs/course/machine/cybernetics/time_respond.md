---
order: 13
---

# 时间响应
## 一阶系统
### 基本形式
* 微分方程  
$$T\frac{\mathrm{d}x_o}{\mathrm{d}t}+x_o=Kx_i$$

* 传递函数  
$$G(s)=\frac{K}{1+Ts}$$

### 特征量
* 时间常数 $T$  
越小表示响应速度越快, 可从响应求出, 见课本 P84
* 增益 $K$  
即稳态灵敏度

## 二阶系统
### 基本形式
* 微分方程
$$T^2\frac{\mathrm{d}^2x_o}{\mathrm{d}t^2}+2\xi T\frac{\mathrm{d}x_o}{\mathrm{d}t}+x_o=Kx_i$$

* 传递函数
$$G(s)=\frac{K}{1+2\xi T s+T_n^2s^2}$$

### 特征量
* 阻尼比 $\xi$  
决定了方程特征根 (极点) 的形式, 见课本 P87  
通常 $\xi\in(0,1)$ 两特征根为共轭复根

* 无阻尼固有频率 $\omega_n$  
来自微分方程中的 $T$ 
$$\omega_n=\frac{1}{T}$$

* 有阻尼固有频率 $\omega_d$  
即阶跃 / 冲击响应输出信号的频率
$$\omega_d=\omega_n\sqrt{1-\xi^2}$$

### 阶跃响应特征
见课本 P91

## 稳态误差
### 误差与偏差
* 误差  
使用符号 $e / E_1$, 稳态误差使用符号 $e_{ss}$  
理想输出与实际输出之差  
* 偏差  
使用符号 $\varepsilon / E$, 稳态误差使用符号 $\varepsilon_{ss}$  
实际输入与反馈之差    
* 关系  
当反馈环节 $H(s)=1$ 时 (单位反馈), $e_{ss}=\varepsilon_{ss}$

### 开环传递函数
传递函数 $G(s)=\frac{G}{1\mp GH}$ 与系统响应特性有关  
开环传递函数 $G_k(s)=GH$ 与系统的稳定性 / 精确性有关有关

$$G_k(s)=\frac{K\prod(1+T_{zr}s)\prod(1+2T_{zc}\xi_{z} s+T_{zc}^2s^2)}{s^v\prod(1+T_{pr}s)\prod(1+2T_{pc}\xi_{p} s+T_{pc}^2s^2)}$$

其中
* $\omega_n=\frac{1}{T}$ 为开环转角频率
* $v$ 系统无差度, 越大系统精度越高, 稳定越差

默认仅分析系统最外层的反馈, 内部的反馈整合需要先到 $G(s)$ 中

### 稳态误差分析
系统在稳定时, 信号不随时的偏差与误差 (输入与输出信号之差) 称为稳态误差

|输入|阶跃 $x_i=1$|斜坡 $x_i=t$|加速度 $x_i=\frac{t^2}{2}$|
|--|:--:|:--:|:--:|
|$v=0$|$\varepsilon_{ss}=\frac{1}{1+K}$|$\varepsilon_{ss}=\infty$|$\varepsilon_{ss}=\infty$|
|$v=1$|$\varepsilon_{ss}=0$|$\varepsilon_{ss}=\frac{1}{K}$|$\varepsilon_{ss}=\infty$|
|$v=0$|$\varepsilon_{ss}=0$|$\varepsilon_{ss}=0$|$\varepsilon_{ss}=\frac{1}{K}$|

对于复杂输入, 可分解为以上三种信号的线性叠加 
$$x_i=a_0+a_1t+a_2\frac{t^2}{2}$$
稳态偏差为
$$\varepsilon_{ss}=a_0\varepsilon_{ss0}+a_1\varepsilon_{ss1}+a_2\varepsilon_{ss2}$$

==单位反馈的条件下, $\varepsilon_{ss}=e_{ss}$==