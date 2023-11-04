---
order: 2
---
# 热力学第一定律

## 一般热力学系统中的能量
### 热量 Q
系统与外界之间依靠温差传递的能量称为**热量** $Q$    
热量的交换仅在系统的边界上进行  
规定当==系统从外界吸收热量时为正==, 当系统向外放出热量时为负

![](./src/ch2_q_ts.drawio.svg)

对于==可逆过程==, 热量满足 ($q$ 为单位质量工质的热量)
$$\delta Q=T\mathrm{d}S\quad \delta q=T\mathrm{d}s$$

如图所示, 热量大小即 $T-S$ 图上过程曲线与 $S$ 轴围成的面积  
对于不同的过程, 虽然初末态相同, 但热量不同, 因此==热量为一个过程量==
$$Q_{1a2}=\int\limits_{1a2}T\mathrm{d}S\neq Q_{1b2}=\int\limits_{1b2}T\mathrm{d}S$$

### 体积功 Wb
简单可压缩系统中, 当体积发生变化时, 必然有压强做功 $\delta W_b=p\mathrm{d}S\mathrm{d}l$  
将这部分功称为体积功 $W_b$ (boundary)   
规定==当系统对外界做功时功量为正==, 当外界对系统做功时为负

![](./src/ch2_w_pv.drawio.svg)

对于==任意过程==, 体积功满足 ($w_b$ 为单位质量工质的体积功)
$$\delta W_b=p\mathrm{d}V\quad \delta w_b=p\mathrm{d}V$$

如图所示, 体积功大小即 $p-V$ 图上过程曲线与 $V$ 轴围成的面积  
对于不同的过程, 虽然初末态相同, 但体积功不同, 因此==体积功为一个过程量==
$$W_{b,1a2}=\int\limits_{1a2}p\mathrm{d}V\neq W_{b,1b2}=\int\limits_{1b2}p\mathrm{d}V$$

### 总功量 $W$
除了体积功外, 系统还可通过多种其他方式对外做功 / 接收外界做功, 如转轴的轴功 $W_s$ , 电热丝的电功 $W_e$ 等  
将这些功的总和定义为**总功量** $W$  
显然总功量也是一个过程量

当系统不存在其他做功方式时 (可逆过程), 体积功与系统总做功相同, 因此也可以使用总功量 $W$ 直接表示体积功

### 热力学能 U
将系统的微观能量, 即物体内部拥有的各种能量定义为**热力学能** $U$   
==热力学能为一个广延参数==, 因此满足  
$$\Delta U=\int_1^2\mathrm{d}U=U_2-U_1$$

一般规定当 $T=0K$, 物体的热力学能 $U=0$

### 系统总能量 E
对于任意系统都有**总能量** $E$ 表示  
$$E=U+E_k+E_p$$

其中  
$E_k$ 为系统的宏观总动能  
$E_p$ 为系统的宏观总势能  
$U$ 为系统的热力学能 (微观能量)

一般情况下有 ($c$ 为工质的平均宏观速度)
$$E_k=\frac{1}{2}mc^2\quad E_p=\rho gh$$

对于固定不做运动的系统 (如==闭口系中的气体==), 一般情况下 $U\gg E_k+E_p$, 因此可以忽略总动能与总势能, 有 $E=U$  
对于==运动固体== (如活塞), 一般情况下 $\Delta U\ll E_k+E_p$, 因此可以忽略热力学能的影响 $\Delta U$

## 开口系中的能量
### 能量迁移
![](./src/ch2_cv_etrans.drawio.svg)

对于开口系中, 由于进入与离开工质的状态不同, 因此带有能量交换  
由于功 $W$ 与热量 $Q$ 仅在边界上传递, 因此进入与离开的工质上携带的时总能量 $E=U+E_k+E_p$  
除此之外, 外界向系统推入 / 接受工质时, 有流动功 $W_f=pV$

因此如图进入 / 离开系统的总能量有四部分组成 (由于开口系中系统总质量不确定, 因此多采用比强度)
$$\Theta=m(\frac{1}{2}c^2+gh+u+pv)$$

### 焓 H
将状态参数 $U,p,V$ 组合得到新的广延参数定义为**焓** $H$, 满足
$$H=U+pV$$

焓存在于一切系统中, 但通常情况下没有具体含义  
对于开口, 焓代表着伴随工质流动而迁移的与工质热力学状态直接有关的那一部分能量 ($m(u+pv)$)

### 技术功 Wt
由于总功量 $W$, 宏观能量 $m(\frac{1}{2}c^2+gh)$ 都属于机械能范畴是技术上可以利用的功, 以此定义**技术功** $W_t$, 满足
$$W_t=W+m[\frac{1}{2}(c_2^2-c_1^2)+g(h_2-h_1)]$$

![](./src/ch2_wt_pv.drawio.svg)

根据[开口系的热力学第一定律](#开口系的热力学第一定律-稳态稳流), 技术功为除了焓 $H$, 热量 $Q$ 以外的能量, 因此
$$\begin{split}
Q&=W_t+H\\
\delta W_t&=\delta Q-\mathrm{d}(U+pV)\\
\delta W_t&=(\delta W + \mathrm{d}U) -\mathrm{d}U - V\mathrm{d}p-p\mathrm{d}V\\
\delta W_t&=-V\mathrm{d}p
\end{split}$$

如图所示, 体积功大小即 $p-V$ 图上过程曲线与 $p$ 轴围成的面积  
显然, ==技术功为一个过程量==
$$W_{t,1a2}=\int\limits_{1a2}-V\mathrm{d}p\neq W_{t,1b2}=\int\limits_{1b2}-V\mathrm{d}p$$ 

并且由于 $p,V>0$, 仅当==过程中 $p$ 减小时, 技术功为正==

## 闭口系的热力学第一定律
### 基本形式
对于闭口系, 由于没有物质的交换, 因此仅有[热量](#热量-q) $Q$ 与[总功量](#总功量) $W$ 两种形式的热量交换  
认为闭口系为静止状态, 因此忽略宏观能量, 有 $\Delta E=\Delta U, \Delta E_p,\Delta E_k=0$

对于闭口系下的任意过程均满足
$$Q=W+\Delta U$$

### 热力学第一定律的微分形式 I
当过程为==可逆过程==时  
* $W=W_b=\int_{1\to 2}p\mathrm{d}V$ (对于一般过程也成立, 认为 $W=W_b$)  
* $Q=\int_{1\to 2}T\mathrm{d}S$ (仅在可逆过程下成立)

此时有
$$\int_{1\to 2}T\mathrm{d}S=\int_{1\to 2}p\mathrm{d}V+\Delta U$$

对上式微分, 对于一个==微元可逆过程==有
$$T\mathrm{d}S=p\mathrm{d}V+\mathrm{d}U$$

此微分形式适用于任何微元可逆过程

## 开口系的热力学第一定律 (稳态稳流)
对于开口系, 即控制体积系统下
1. 开口系中体积不变, 因此没有体积功 $W_b=0$, 通常认为仅有轴功 $W=W_s$ 
1. 系统工质不再静止, 因此不能忽略工质自身的宏观能量  
1. 质量不再是状态参数, 因此强度量也不再是状态参数, 但比强度依然有状态参数的性质, 因此对于==开口系多采用比强度==  

### 流动微元过程分析
在开口系得瞬间时刻下, 开口系中除了热量与总功量的交换, 还有物质交换, 以及物质所携带的宏观能量的交换  
对于开口系微元过程下有能量守恒
$$\delta Q+\delta m_{in}(h_{in}+\frac{1}{2}c_{in}^2+gh_{in})=\delta W+\mathrm{d}E+\delta m_{out}(h_{out}+\frac{1}{2}c_{out}^2+gh_{out})$$


除以时间微元 $\mathrm{d}\tau$ 后有 
$$\frac{\delta Q}{\mathrm{d}\tau}+\frac{\delta m_{in}}{\mathrm{d}\tau}(h_{in}+\frac{1}{2}c_{in}^2+gh_{in})=\frac{\delta W}{\mathrm{d}\tau}+\frac{\mathrm{d}E}{\mathrm{d}\tau}+\frac{\delta m_{out}}{\mathrm{d}\tau}(h_{out}+\frac{1}{2}c_{out}^2+gh_{out})$$

### 稳态稳流条件
稳态稳流条件表明
* 系统各点不随时间变化 $\frac{\delta X}{\mathrm{d}\tau}=C$
* 系统贮存的能量与质量不随时间变化 $\frac{\mathrm{d}E}{\mathrm{d}\tau}=0, \frac{\delta m_{in}}{\mathrm{d}\tau}=\frac{\delta m_{out}}{\mathrm{d}\tau}$

### 流量
定义流量 $q_{X}$ 表明过程量 $X$ 在 $\Delta \tau$ 时间内的变化量  
根据稳态稳流条件, 即有 $\frac{\delta X}{\mathrm{d}\tau}=q_X$  
根据流动微元过程, 涉及到的流量有
1. 加热率 (热流量) $\frac{\delta Q}{\mathrm{d}\tau}=q_Q=\dot{Q}$
1. 轴功率 $\frac{\delta W}{\mathrm{d}\tau}=q_W=P$
1. 质量流量 $\frac{\delta m}{\mathrm{d}\tau}=q_m$

### 稳态稳流下的热力学第一定律
因此, 代入稳态稳流条件后有稳态稳流下的热力学第一定律
$$q_Q=q_W+q_m[(h_{out}+\frac{1}{2}c_{out}^2+gh_{out})-(h_{in}+\frac{1}{2}c_{in}^2+gh_{in})]$$

引入[技术功](#技术功-wt)后, 在 $\Delta \tau$ 内有
$$Q=W_t+\Delta H$$

### 热力学第一定律的微分形式 II
当过程为==可逆过程==时  
* $W_t=W+m[\frac{1}{2}(c_2^2-c_1^2)+g(h_2-h_1)]=\int_{1\to 2}-V\mathrm{d}p$ (对于一般过程也成立)  
* $Q=\int_{1\to 2}T\mathrm{d}S$ (仅在可逆过程下成立)

此时有
$$\int_{1\to 2}T\mathrm{d}S=\Delta H-\int_{1\to 2}V\mathrm{d}p$$

对上式微分, 对于一个==微元可逆过程==有
$$T\mathrm{d}S=\mathrm{d}H-V\mathrm{d}p$$

此微分形式适用于任何微元可逆过程