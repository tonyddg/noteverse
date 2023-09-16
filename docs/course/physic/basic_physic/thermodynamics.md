---
title: 气体动理论与热力学
order: 3
---

---

# 气体动理论
## PV图
$pv$ 图上的每一点都可视为一个平衡态, 一条曲线构成一个准静态过程. 非静态过程(不可逆), 不能用过程曲线表示. 
## 理想气体状态方程 P129
1. 重要常量
$$N_A = 6.02 \times 10^{23} mol^{-1}$$
$$R = 8.314 J / (mol·K)$$
$$k = \frac{R}{N_A} = 1.38 \times 10 ^{-23} J / K$$
2. 字母含义
    * $\nu$ 物质的量
    * $n$ 单位体积的物质的分子数
3. 理想气体状态方程
$$pV = \nu RT$$
$$p = nkT$$
## 理想气体微观模型 P131
1. 字母含义
    * $\overline{\varepsilon _t}$ 一个气体分子的平均平动动能, 不包括震动, 旋转等动能
    * $\sqrt{\overline{v^2}} \neq \overline{v}$ 一个气体分子的方均根
    * $m_f$ 一个气体分子的质量
2. 模型

$$\because p = nm_f\overline{v_x^2}$$
$$\frac{1}{3}\overline{v^2} = \overline{v_x^2} = \overline{v_y^2} = \overline{v_z^2}$$
$$\therefore p=\frac{1}{3}nm_f\overline{v^2}$$
$$\because \overline{\varepsilon _t} = \frac{1}{2}m_f\overline{v^2}$$
$$\therefore p = \frac{2}{3}n\overline{\varepsilon _t}$$
$$\because p = nkT$$
$$\therefore \overline{\varepsilon _t} = \frac{3}{2}kT$$
$\therefore$ ==理想气体分子的平动动能仅与温度有关==
## 理想气体的内能 P135
### 自由度
1. 平动自由度 $t = 3$
2. 转动自由度 $r = 0(\text{单原子})/2(\text{双原子})/3(\text{多原子})$
3. 振动自由度 $s = 0(\text{单原子}/\text{刚性})/1(\text{双原子非刚性})$
4. 自由度 $i = t + r + s$
### 一个气体分子的平均总能量 
根据能量均分定理, 各自由度动能相同
1. 一个自由度的平均动能
$$\overline{\varepsilon} = \frac{1}{2}kT$$
2. 气体分子的平均总动能
$$\overline{\varepsilon_k} = \frac{i}{2}kT$$
3. 气体分子的平均总势能
$$\overline{\varepsilon_p} = \frac{s}{2}kT$$
4. 气体分子的平均总能量
$$\overline{\varepsilon} = \overline{\varepsilon_k} + \overline{\varepsilon_p}$$
5. 气体的总能量(为平均之和)($\nu$ 气体的物质的量)
$$E = \frac{i + s}{2}\nu RT$$
## 麦克斯韦速率分布
$$dW = \frac{dN_v}{N} = f(v)dv = 0$$
### 气体在一定速率区间内的概率
1. 只求单个速率时
$$P(v) =  f(v)dv = 0$$
2. 当区间较小时($\Delta v < 10m/s$)
$$P(v,v+\Delta v) \approx f(v)\Delta v$$
3. 一般情况下
$$P(v_1,v_2) = \int^{v_2}_{v_1} f(v)dv$$
4. 归一化条件(任何f均要满足的条件)
$$1 = \int^{\infty}_{0} f(v)dv$$
### 理想气体的特征速率
1. 平均速率
$$\overline{v} = \sqrt{\frac{8RT}{\pi M}}$$
2. 最概然速率(出现在最概然速率附近的分子最多)
$$v = \sqrt{\frac{2 RT}{M}}$$
表现为f(x)的最大值
可得, T相同时, 摩尔质量M越大,最概然速率越小
M相同时, T越大,最概然速率越大

3. 方均根速率
$$\sqrt{\overline{v^2}} = \sqrt{\frac{3 RT}{M}}$$

4. 计算与v有关的平均值
$$\overline{g(x)}|^{v_2}_{v_1} = \frac{\int^{v_2}_{v_1}g(v)f(v)dv}{\int^{v_2}_{v_1}f(v)dv}$$

5. 用于计算平均平动动能/平均能量
$$\overline{\varepsilon_t}=\frac{1}{2}m_f\overline{v^2}=\frac{3}{2}kT$$
6. 注意, 即使两种气体的方均根速率相同(仅表明 $\frac{T_1}{M_1}=\frac{T_2}{M_2}$), ==由于平均平动动能与分子质量 $m_f$ 有关, 因此平均平动动能依然不相同==

$$\because dN = N·f(v)dv$$
$$\therefore N·g(v)f(v)dv = g(v)dN$$
$$\therefore N\int^{v_2}_{v_1}g(v)f(v)dv = v_2\text{到}v_1\text{所有气体分子}g(v)\text{之和}$$
$$\because N|^{v_2}_{v_1} = N·P(v_1,v_2) = N·\int^{v_2}_{v_1} f(v)dv$$
$$\therefore \overline{g(x)}|^{v_2}_{v_1} = \frac{N\int^{v_2}_{v_1}g(v)f(v)dv}{N|^{v_2}_{v_1}} = \frac{\int^{v_2}_{v_1}g(v)f(v)dv}{\int^{v_2}_{v_1}f(v)dv}$$
## 玻尔兹曼分布 P145
### 麦克斯韦速度分布
使用代换 ($\vec{v}$可能指向任意方向, 即$\vec{v}$ ~ $\vec{v} + d\vec{v}$为一个球壳)
$$4\pi v^2 dv= dS = dv_xdv_ydv_z$$
### 玻尔兹曼分布
考虑力场势能
$$n = n_0exp[-\frac{E_p}{KT}]$$
$n_0$ 为 $0$ 势点的分子数
$$dN_{r, v} \propto exp[-\frac{E_p}{KT}]$$
公式表明, 考虑力场后, 在同一区域势能越大, 分子数越少. 
## 分子的平均自由程 P146
将一个气体分子考虑成一个直径为 $d$ 的球体, 其他分子静止, 运动路径中可能发生碰撞的空间为一个半径为 $d$ 柱体
$$\because dV = \pi d^2 v'dt$$
$$\text{分子平均碰撞频率}\;\overline{Z} = \frac{n dV}{dt}$$
$$v' = \sqrt{2}\overline{v}\;\text{注意是平均速度}$$
$$\therefore \overline{Z} = \sqrt{2}\pi n\overline{v}d^2$$
$$\text{平均自由程}\;\overline{\lambda} = \frac{\overline{v}}{\overline{Z}}=\frac{1}{\sqrt{2}\pi n d^2}=\frac{kT}{\sqrt{2}\pi pd^2}$$
$\overline{\lambda}$ 与 $n$, $d^2$ 成反比, $n$, $d^2$ 越大, 分子自由程越小, 越容易发生碰撞

## 运输现象 P148
1. 动量的运输 粘性现象
2. 能量的运输 热传导
3. 质量的运输 扩散
能量高的区域有更多分子移向能量低的区域, 能量低的区域移向能量高的区域的分子较少. 

---

# 热力学
## 热力学第一定律 P154
$$Q = A + \Delta E$$
1. $Q$ 热量, 当大于 $0$, 系统吸收热量；小于零, 系统放出热量.   
与过程有关, 是过程量
2. $A$ 做功, 当大于 $0$, 系统对外做功；小于零, 外界对系统做功.   
与过程有关, 是过程量
3. $\Delta E$ 内能的变化量, 理想气体下, 与温度的变化相关.   
==内能的变化量仅与初末状态有关, 是状态量==
### 功表达式
$$A = \int pdV$$
$A$ 随不同的过程有不同的值 ==其中 $V$ 取微分==  
$p$ 变化但不动无功, 但 $p$ 可能与 $V$ 的变化有关, 不是常量.  
## 理想气体的热容
1. 等容热容 与 $T$ 无关  
$V$ 不变时, $\Delta A$ = 0, $Q = \Delta E$, $E = \nu \frac{i}{2}RT$  
$\therefore dQ=dE=\nu \frac{i}{2}RdT=\nu C_vdT$  
$\therefore C_v = \frac{i}{2}R$  
2. 等压热容 P157
$C_p = \frac{i}{2}R + R$
3. 摩尔热容比
$$\gamma = \frac{C_p}{C_v} = 1 + \frac{2
}{i}$$
4. 其他情况
对于液体与固体等不适用上方的公式, 且在融化或气化时会吸收额外的热量. 
## 理想气体过程
### 等容过程
$$A = 0$$
$$Q = \Delta E = \nu C_v\Delta T$$
### 等压过程
气压不变, 带入理想气体状态方程
$$A=\int_{V_1}^{V_2}pdV=p(V_2-V_1)=\nu R(T_2-T_1)=\nu R\Delta T$$
$$Q = \nu C_p\Delta T$$

$\Delta E$ 只与初末状态有关

$$\Delta E = Q-A = \nu C_v\Delta T$$
### 等温过程
$$\Delta E = 0$$
$$pV = \nu RT$$
$$Q = A = \int pdV = \int \nu RT \frac{dV}{V} = \nu RT \ln\frac{V_2}{V_1} = \nu RT \ln\frac{p_1}{p_2}(pV=C)$$
### 绝热过程
$$Q = 0$$
通过 $\Delta E=\frac{i}{2}\nu R\Delta T$ 与 $pV = \nu RT$ 求解 ==注意 $A$ 前的负号==
$$\Delta E = - A = \frac{i}{2}vR\Delta T = \frac{i}{2}(p_2V_2 - p_1V_1)$$
通过泊松方程求解
$$pV^{\gamma} = C$$
$$A = \int pdV = \int CV^{-\gamma}dV = \frac{CV^{1-\gamma}}{1 - \gamma} = -\frac{i}{2}(p_2V_2 - p_1V_1)$$
$$1 - \gamma = 1 - (1 + \frac{2
}{i}) = -\frac{2
}{i}$$
泊松方程变形  
结合 $pV = \nu RT$ 可对泊松方程进行变形, 用于求解两个绝热过程间的关系
1. $TV^{\gamma-1} = C'$
2. $p^{1-\gamma}T^{-\gamma} = C''$
根据 $P$, $T$, $V$ 哪两个已知使用, 各边形式的 $C$ 不同. 
结合$\frac{A}{B} = \frac{C}{D} = \frac{A - C}{B - D}$联系两个绝热过程
## 循环过程 P166
1. 正循环(要求能够回到原状态)
    * $PV$ 图上循环线方向为顺时针方向
    * 从高温热源吸热, 一部分移向低温热源, 一部分对外做功. 
    * $Q_1$ 从高温热源吸热, 可以认为所有吸收的热量($Q>0$)
    * $Q_2$ 从低温热源放热, 可以认为所有放出的热量($Q<0$)
        * ==要沿循环路径计算所有的 $Q$, 即使 $\Delta A=0$==
        * ==PV图面积的含义是A的大小, 与 $Q$ 无关==
    * $|A| = A_1-A_2 =闭合曲线包围的面积 = A_1+\Delta E-(A_2+\Delta E) = Q_1 - Q_2$
    * 热机效率 $\eta = \frac{A}{Q_1} = 1 - \frac{Q_1}{Q_2}$
    * 注意, 当 $Q_2$ 取负数时(沿循环方向积分) $A = Q_1 + Q_2$
2. 逆循环 (制冷机)
    * $PV$ 图上循环线方向为逆时针方向
    * 从低温热源吸热, 外界对工质做功, 向高温热源放热. 
    * 制冷系数 ==区别于热机效率== $\omega = \frac{Q_2}{A}$
3. 卡诺热机
    * 由两个绝热循环与两个等温循环组成
    * $$Q_1 = \nu RT_a \ln\frac{V_{2}}{V_{1}}$$
    $$Q_2 = \nu RT_b \ln\frac{V_{4}}{V_{3}}(Q_2<0, \text{沿循环方向积分}, V_4<V_3)$$
    $$\because(\text{绝热过程的泊松方程})\\ T_aV_2^{\gamma-1}=T_bV_3^{\gamma-1}\\T_aV_1^{\gamma-1}=T_bV_4^{\gamma-1}$$
    $$\therefore \frac{V_{2}}{V_{1}} =\frac{V_{3}}{V_{4}}$$
    $$A = Q_1 - |Q_2| = \nu R(T_a - T_b) ln\frac{V_{2}}{V_{1}}$$
    $$\eta = \frac{A}{Q_1} = \frac{T_a-T_b}{T_a}$$
    * 绝热过程 $Q=0$ 不用计算
    * 与工质, 体积等无关. 
## 热力学第二定律 P172
### 不可逆过程
无法在 $PV$ 图上表示
1. 功可以自发地转化为热. 
2. 热在由高温热源转化为功的同时, 还要向低温热源传热(或产生其他变化). 
3. 高温热源可以自动将热传向低温热源. 
4. 低温热源再将热传向高温热源时, 还要有外界做功. 
5. 气体可以自由膨胀, 不能自动压缩. 
### 热力学第二定律
1. 一切与热现象有关的实际宏观过程均不可逆
2. 各种宏观实际过程相互等价
3. $\to$ 当其中一种可逆, 将推出所有过程都可逆
### 卡诺定理
卡诺定理为理想状况下, 效率最高, 与外界无关的热机, 有
$$\eta _\text{可} = 1 - \frac{T_1}{T_2}=1-\frac{Q_1}{Q_2}$$
规定 $Q_n$ 为过程中从热源吸收的热量, $Q_2$ 取负值(上式中, $Q_2$ 为向低温热源放出的热量, 为正值)
$$\therefore \frac{Q_1}{T_1}+\frac{Q_2}{T_2}=0\to \oint\frac{dQ}{T}=0\to \int_L\frac{dQ}{T}\text{与路径无关}$$
$$\eta _\text{不可}=1 - \frac{Q_1}{Q_2} < 1 - \frac{T_1}{T_2}$$
$$\therefore \frac{Q_1}{T_1}+\frac{Q_2}{T_2}<0\to\oint\frac{dQ}{T}<0\to\int_{L_{\text{不可逆}}}\frac{dQ}{T}<\int_{L_{\text{可逆}}}\frac{dQ}{T}$$
### 熵增加原理
#### 熵定义
$$dS=\frac{dQ}{T}$$
其中 $T$ 为热源温度  
对于==两个状态== $1(p_1,V_1), 2(p_2,V_2)$ ==沿任意可逆过程==有 
$$S_2-S_1=\int_1^2\frac{dQ}{T}$$
$$\because \int_{L_{\text{不可逆}}}\frac{dQ}{T}<\int_{L_{\text{可逆}}}\frac{dQ}{T}$$
$$\therefore \int_{L_{\text{不可逆}}}\frac{dQ}{T}<S_2-S_1\to\frac{dQ}{T}<dS(\text{不可逆过程})$$
$\therefore$ 无法直接使用不可逆过程的 $\int_{L_{\text{不可逆}}}\frac{dQ}{T}$ 计算熵变, 但可以根据不可逆过程的初末状态设计对应的可逆过程, 计算系统的熵变
#### 熵增加
在绝热(孤立)系统中, 对任何过程成立, 有 
$$dQ_总=0\to0=\frac{dQ_总}{T}\le dS$$ 
因此孤立系统的熵总是不断增加的
#### 注意
1. 熵 $dS = \frac{dQ}{T}$ ==$T$ 为热源温度==
2. 理想气体的可逆过程的熵仅与初末状态有关, 且 $T_{\text{热源}} \approx T_{\text{系统}}$ (可逆过程中, 各种状态的变化极小)
### 非绝热系统熵的计算
通过初状态与末状态, 设计等容/等压/等温过程
### 非气体熵的计算
1. 热源 $T$ 不变, 通过吸热源的 $Q$ 求得 $S = \frac{Q}{T}$
2. 固液体 $dQ = mc\frac{dT}{T}$ $T$ 假设为系统温度
3. 机械能 $dQ = 0, S = 0$
### 温熵图
温熵图的一条曲线与坐标轴围成的面积表示 $Q$, 曲线的面积表示 $A$