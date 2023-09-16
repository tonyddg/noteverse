# 解题技巧与注意事项
## 数学
### 计算器
1. 使用计算器验证数学过程
1. $\mu_0,\varepsilon_0,h,\lambda_c$ 等常数可从计算器获取

### 三角函数
1. $$\cos[\frac{\pi}{2}-f(x)]=\sin[f(x)]$$ 将 $f(x)$ 带入, 实现将 $\sin$ 转为 $\cos$
1. 同理有 $$\sin[\frac{\pi}{2}-f(x)]=\cos[f(x)]$$

## 电磁学
### 电学
1. 位移电流是指将变化的电场等效为一种电流
1. 

## 振动
### 波函数
1. 根据波函数中 $x$ 的系数为负可知, 沿波传播的方向移动, 相位减小, 因此波源传播 $x$ 后, 新波相位减去旧波为 $-\frac{2\pi x}{\lambda}$
1. 波上的质点, ==在平衡位置的动能与势能均为最大==, 机械能不守恒
1. 简谐运动中, $\omega$ 不可取负值, 修正方法 $\cos(-\omega x+\varphi)=\cos(\omega x-\varphi)$

### 驻波
1. 发生半波损失的位置必定为波节
1. 驻波的合成方程 $y=2A\cos(\frac{2\pi x}{\lambda})\cos(\omega t)$
    1. 由于两列波可能完全叠加, 因此驻波波函数的最大振幅为 $2A$
    1. 第一项 $\cos(\frac{2\pi x}{\lambda})$ 规定了驻波的外形, 当节不在零点时, 需要带入 $x-x_0$ 修正
    1. 第二项 $\cos(\omega t)$ 规定了原点处的初位相, 需要根据合成波的初位相带入 $\varphi_0$
1. 可通过计算波移动到反射面, 再向回移动, 计算反射波与入射波的相位差 (不要忘记可能有半波损失)

### 波现象
1. 拍现象中, 拍的频率等比于两振动的频率差
1. 音叉上增加圆环将降低频率, 越往上, 降低越多
1. ==电磁波传播的方向为 $\vec{E}\times\vec{H}$ 的方向== (右手定则)
1. ==对于电磁波, $\sqrt{\varepsilon} E=\sqrt{\mu}H$ 两者同步, 且$E\gg H$==
1. 多普勒效应: 对于波速 $u$, 波源速度与频率 $v_S,\nu_S$, 接收端速度与频率 $v_R,\nu_R$, 满足
$$\frac{\nu_R}{u-v_R}=\frac{\nu_S}{u-v_S}$$

## 波动光学
### 干涉
1. ==光波叠加最小的条件为 $(2k-1)\pi$==, 不能使用 $k\pi$, 因为会包含到 $2k\pi$ 部分 (检查是否会互相包含)
1. 无论是明条纹还是暗条纹, ==相邻的同种条纹之间的光程差总为 $\lambda$==
1. 当计算一个以长度为量纲的值时, 一定与波长有关, 此时使用相位差条件时, 还要乘上 $\frac{\lambda}{2\pi}$, 转为光程差条件

### 双缝/光栅衍射
1. $$\alpha=\frac{a\pi \sin\theta}{\lambda}$$ $$\beta=\frac{d\pi\sin\theta}{\lambda}$$
1. 光栅中, $d$ 表示相邻两条缝的中心距离, 当在两条缝中加入第三条缝, 则 $d'=d/2$
1. ==当出现遮住缝 / 增加缝的情况, 都要注意 $d$ 是否改变==
1. 求光栅衍射的全部明条纹时, 注意
    1. $\theta\in(-\pi/2,\pi/2)$, 其中 $\theta=\pm\pi/2$ 位于无限远处, 无法取到
    1. 只计算主极大, 但是要注意排除缺级

### 光学现象
1. 两点可以分辨的最小角宽度 $\delta\varphi=1.22\frac{\lambda}{D}$ 
1. 如果没有给出具体条件, 认为双折射的 $e$ 光与 $o$ 光相互垂直
1. 牛顿环中心为暗纹仅在中心紧贴下层玻璃时成立
1. 牛顿环

## 量子力学
### 量子力学初步
1. 康普顿散射中的散射角 $\varphi$ 即出射方向与入射方向的夹角 (注意是矢量方向, 需要尾部相接比较角度, 不是光线)

### 薛定谔方程
1. 一维势阱的定态方程中, 认为粒子的物质波波长 $\lambda$ 即 $\psi(x)$ 的波长, 满足 $\lambda=2a/n$
1. 公式 $L_{sz}=m_s\hbar$ 计算的是角动量在 $z$ 轴的投影, 与 $z$ 轴夹角的余弦值需要使用 $\cos\theta=L/L_{sz}$
1. 对于波函数 $\Phi(\varphi)=Ae^{im_l\varphi}$, 注意其中的复变部分 $|e^{im_l\varphi}|=1$, 因此 $|\Phi(\varphi)|^2=A^2$, 由于 $\varphi$ 表示绕 $z$ 轴的旋转角, 因此只在 $[0,2\pi)$ 内取值有意义, 所以归一化系数 $A=\frac{1}{\sqrt{2\pi}}$

### 核物理
1. 放射性活度公式 $A=A_0e^{-\lambda t}$, 直接带入使用, 半衰期即 $e^{-\lambda t_{1/2}}=A/A_0=\frac{1}{2}$