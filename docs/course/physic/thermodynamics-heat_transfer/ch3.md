---
order: 3
---
# 理想气体的性质
## 理想气体状态方程
### 原始形式
对于理想气体 (由简单分子组成的气体), 在任意状态下, 均满足方程
$$pV=nRT$$

其中
* $n$ 为气体的摩尔数
* $R=8.314J/(mol\cdot K)$ 为摩尔气体常数
* $T$ 为气体的温度, 单位为开尔文 $K$
* $p$ 为气体的绝对压力

### 工程常用形式
在工程中, 通常使用质量而非摩尔数, 因此有方程
$$pV=mR_gT$$

其中
* $m$ 为气体质量
* $R_g$ 为气体常数, 满足 $R_g=\frac{R}{M}$

当==已知气体任意状态下的 $p,V,T$ 后, 可以此计算气体的质量 $m$==  
并通过==该质量将 $u,h,s$ 等比强度换算为强度量 $U,H,S$==

### 比较形式
控制质量系统内的理想气体, 在任意状态下其 $m,R_g$ 不变, 因此有方程
$$\frac{p_1V_1}{T_1}=\frac{p_2V_2}{T_2}=mR_g$$

当使用比强度参数用于运算时, 还有
$$\frac{p_1v_1}{T_1}=\frac{p_2v_2}{T_2}=R_g$$

## 一般物质的比热容
定义**比热容**为 ==**质量为 $\bm{1Kg}$ 的物体**温度升高 $1K$ 时从外界吸收的能量==  
$$q=cT\to c=\frac{\delta q}{\mathrm{d} T}$$

显然, 对于不同的过程, 比热容 $c$ 不同, 因此==比热容为过程量==

对于固定的可逆过程 $l$ 有 $\delta q=T\mathrm{d}s$, $c_l=T(\frac{\mathrm{d}T}{\mathrm{d}s})_l$ , 可将过程 $l$ 下的比热容 $c_l$ 视为状态参数

通常使用的比热容有定容过程下的定容比热容 $c_{v}$ 与定压过程下的定压比热容 $c_{p}$

### 定容比热容
根据[状态公理](./ch1.md#状态公理), 在简单可压缩系统中, 可以使用两个参数表达其他参数  
以此定义函数 $u=u(T,v)$  
在定容状态下, 比体积 $v$ 为常数, $\mathrm{d}v=0$, 有
$$\mathrm{d}u=(\frac{\partial u}{\partial T})_v\mathrm{d}T+(\frac{\partial u}{\partial v})_v\mathrm{d}v=(\frac{\partial u}{\partial T})_v\mathrm{d}T$$  

根据[控制质量下的热力学第二定律](./ch2.md#热力学第一定律的微分形式-i)
$$\begin{split}
\delta q&=p\mathrm{d}v+\mathrm{d}u\\
\delta q&=\mathrm{d}u
\end{split}$$

因此定容比热容满足
$$c_v=(\frac{\partial u}{\partial T})_v$$

### 定压比热容
定义函数 $h=h(T,p)$  
在定压状态下, 压力 $p$ 为常数, $\mathrm{d}p=0$, 有
$$\mathrm{d}h=(\frac{\partial h}{\partial T})_p\mathrm{d}T+(\frac{\partial h}{\partial p})_p\mathrm{d}p=(\frac{\partial h}{\partial T})_p\mathrm{d}T$$  

根据[控制体积下的热力学第二定律](./ch2.md#热力学第一定律的微分形式-ii)
$$\begin{split}
\delta q&=\mathrm{d}h-v\mathrm{d}p\\
\delta q&=\mathrm{d}h
\end{split}$$

因此定容比热容满足
$$c_p=(\frac{\partial h}{\partial T})_p$$

## 理想气体的热力学能与焓
### 理想气体的热力学能
根据热力学能的一般性质可得, 理想气体的比热力学能为温度 $T$ 的单值函数 (证明可参考[大学物理笔记的有关证明](/course/physic/basic_physic/thermodynamics.md#一个气体分子的平均总能量))
$$u=u(T)$$

由于 $u,T$ 均为状态参数, 因此该关系与过程无关  
根据[定容比热容](#定容比热容)的一般形式可得, 对于理想气体有
$$c_v=(\frac{\partial u}{\partial T})_v=\frac{\mathrm{d}u}{\mathrm{d}T}$$

因此==理想气体的比热力学能==满足
$$u=c_vT$$

注意
1. 该公式适用于==任何过程==下的理想气体
1. 该公式==计算结果为比热力学能==, 如果计算系统的热力学能, 还需要乘上质量 $m$ (可通过[理想气体状态方程计算](#工程常用形式))
1. 理想气体的定容比热容 $c_v$ 为一个与温度有关的状态参数, 通常作为常数处理, 有

$$\Delta u_{12}=c_v(T_2-T_1)$$

### 理想气体的焓
根据焓的定义式, 对于理想气体有 
$$h=u+pv=u(t)+R_gT$$

因此理想气体的焓也是 $T$ 的单值函数  
同理可得, 对于理想气体有 
$$c_p=(\frac{\partial h}{\partial T})_p=\frac{\mathrm{d}h}{\mathrm{d}T}$$

因此==理想气体的比焓==满足
$$h=c_pT$$

注意
1. 该公式适用于==任何过程==下的理想气体
1. 该公式==计算结果为比焓==, 如果计算系统的焓, 还需要乘上质量 $m$ (可通过[理想气体状态方程计算](#工程常用形式))
1. 理想气体的定压比热容 $c_p$ 为一个与温度有关的状态参数, 通常作为常数处理, 有

$$\Delta h_{12}=c_p(T_2-T_1)$$

### 理想气体的比热容
将理想气体的定压比热容表达式中, 带入理想气体中焓与热力学能关系 $h=u+R_gT$ 有
$$\begin{split}
c_p&=\frac{\mathrm{d}h}{\mathrm{d}T}=\frac{\mathrm{d}(u+R_gT)}{\mathrm{d}T}\\
c_p&=c_v+R_g
\end{split}$$

该公式也成为迈耶公式, 表明
1. 理想气体的定容比热容 $c_p$ 与定压比热容 $c_v$ 之差为一个仅与物质有关的常数 $c_p-c_v=R_g$
1. 由于 $R_g>0$, 因此始终有 $c_p>c_v$
1. 根据定容状态下, $W_b=0$, 吸收的热量完全转化为内能; 定压状态下, 吸收的热量还有一部分用于做功, 因此定压状态下升高相同的温度, 需要吸收更多热量

定义热熔比 $k$
$$k=\frac{c_p}{c_v}>1$$

## 理想气体的熵
### 可逆过程下熵的微分形式表达式
根据可逆过程下 (对工质无要求) 熵, 热量, 热力学第一定律整理有

$$\delta q=T\mathrm{d}s=\mathrm{d}u+p\mathrm{d}v=\mathrm{d}h-v\mathrm{d}p$$

### 理想气体的熵的微分形式表达式
引入[理想气体热力学能](#理想气体的热力学能)并使用[理想气体状态方程](#比较形式)代换 $p$, 可得

$$\begin{split}
T\mathrm{d}s&=c_v\mathrm{d}T+p\mathrm{d}v\\
T\mathrm{d}s&=c_v\mathrm{d}T+(\frac{R_gT}{v})\mathrm{d}v\\
T\mathrm{d}s&=c_v\mathrm{d}T+R_gT\frac{\mathrm{d}v}{v}\\
\mathrm{d}s&=c_v\frac{\mathrm{d}T}{T}+R_g\frac{\mathrm{d}v}{v}
\end{split}$$

引入[理想气体的焓](#理想气体的焓)并使用[理想气体状态方程](#比较形式)代换 $v$, 可得

$$\begin{split}
T\mathrm{d}s&=c_p\mathrm{d}T-v\mathrm{d}p\\
T\mathrm{d}s&=c_p\mathrm{d}T-(\frac{R_gT}{p})\mathrm{d}p\\
T\mathrm{d}s&=c_p\mathrm{d}T-R_gT\frac{\mathrm{d}p}{p}\\
\mathrm{d}s&=c_p\frac{\mathrm{d}T}{T}-R_g\frac{\mathrm{d}p}{p}
\end{split}$$

对上式中的 $T$ 再使用[理想气体状态方程](#比较形式)代换 $T$, 可得
$$\begin{split}
\mathrm{d}s&=c_p\frac{\mathrm{d}(\frac{pv}{R_g})}{(\frac{pv}{R_g})}-R_g\frac{\mathrm{d}p}{p}\\
\mathrm{d}s&=\frac{c_p}{pv}(p\mathrm{d}v+v\mathrm{d}p)-R_g\frac{\mathrm{d}p}{p}\\
\mathrm{d}s&=c_p\frac{\mathrm{d}v}{v
}+c_v\frac{\mathrm{d}p}{p}
\end{split}$$

### 理想气体的熵的一般表达式
假设比热容 $c_v,c_p$ 不随温度变化, 将微分形式积分后可得到计算理想气体熵的一般形式 (注意公式==计算结果为比熵==)
$$\Delta s=\int_{1}^{2}\mathrm{d}s=\begin{cases}
c_v\ln\frac{T_2}{T_1}+R_g\ln\frac{v_2}{v_1}\\
c_p\ln\frac{T_2}{T_1}-R_g\ln\frac{p_2}{p_1}\\
c_v\ln\frac{p_2}{p_1}+c_p\ln\frac{v_2}{v_1}\\
\end{cases}
$$

## 不可压缩物质的推广
### 不可压缩物质的比热容
不可压缩物质的比热容满足
$$c_v\approx c_p\approx c_{av}$$

其中 $c_{av}$ 为平均比热容  
一般工程应用中直接使用 $c_{av}$ 代替 $c_v$ 与 $c_p$, 或相互替代

### 不可压缩物质的热力学能与焓
根据证明可得, 不可压缩物质的热力学能依然满足
$$u=c_{av}T$$

由于不可压缩物质 $v=C$, 不可压缩物质的焓满足
$$h=c_{av}T+v\Delta p$$

