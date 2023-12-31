---
order: 7
---

# 槽轮机构
![](./src/others/%E6%A7%BD%E8%BD%AE%E6%9C%BA%E6%9E%84.jpg)

槽轮机构为一种机构简单的间歇机构, 工作时, 拨盘为主动件持续转动, 而槽轮为从动机构, 间歇转动

## 槽轮机构的运动特点
### 参数定义
1. 槽轮的槽数 $z$
1. 拨盘的圆销数 $K$
1. 槽轮转动一次对应拨盘的角位移 $2\varphi_1$
1. 槽轮上两个槽分布夹角 $2\varphi_2=2\pi/z$ (槽均布)
1. 槽轮传动的动停比 $\tau$ , 即一个运动循环中, 槽轮的运动时间 $t_2$ 与一个运动循环的运动时间 $t_1$ 之间的比值, ==反应槽轮运动时间占所有时间的比值==

### 动停比分析
* 当圆销离开与进入槽轮时, 其速度方向必定垂直于槽, 因此可得到几何关系 $2\varphi_1+2\varphi_2=\pi$
* 当槽轮上的槽均布时, 可得到 $2\varphi_1=\pi-(2\pi/z)$
* 以拨盘为角度分析可得 $t_2=2\varphi_1/\omega_1$
* 当圆销均匀分布时, 认为一个运动循环的时间为 $t_1=2\pi/(K\omega_2)$
* 因此可得到动停比 
$$\tau=\frac{t_2}{t_1}=\frac{2\varphi_1}{2\pi/K}=\frac{K(z-2)}{2z}$$

### 圆销数与槽数的约束
* 由于槽轮必须有停歇时间，所以 $\tau<1$, 拨盘的圆销数K与槽轮槽数z的关系应为 
$$K<\frac{2z}{z-2}$$
* 运动系数 $\tau$ 应大于零，故槽轮的槽数 $z\ge 3$
