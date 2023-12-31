---
order: 10000
---

# 解题注意
## 受力分析
1. 二力杆 (仅有两个节点且不受力的刚体) 上, 杆上两点受力方向必定在两点连线且方向相反
1. 对部分受力分析时, 通常不带上销钉, 销钉单独分析
1. 多个物体中, 注意作用力与反作用力

## 静力学
1. 先从整体分析, 看能否解出题目要求的量, 如果不能, 则移去受力复杂且与待求量无关的部分再分析
1. 优先对未知量的交汇点取矩, 避免未知量
1. 对于同一点在铰链上与在杆一端上的受力情况不同
1. 先不使用虚位移定理, 特别是没有特殊角度, 只有特殊垂直长度时, 有一个以上的待求力, 不使用虚位移
1. 对于方向未知 / 复杂的力, 先分解为 x, y 方向

## 运动学
1. ==先分析各点之间的长度与角度==, 再分析速度, 加速度. 其中先分析方向再分析大小, 方向无法确定时沿特定方向 (杆或坐标轴) 正交分解
    1. 分析动点速度时, 按绝对速度, 牵连速度, 相对速度的顺序分析
    1. 分析动点加速度时, 按绝对加速度, 牵连加速度, 相对加速度, 科氏加速度的顺序分析
    1. 基点法分析刚体上点的速度时, 按基点速度, 绝对速度, 相对基点速度分析
    1. 基点法分析刚体上点的加速度时, 按基点加速度, 绝对加速度, 相对基点加速度分析
1. 不能忘记科氏加速度 $a_k=2\vec{\omega}\times\vec{v_r}$
1. 对点分析时, 要指出动点与动系
1. 点的物理量表示方法
    * 字母: 表示速度 $v$ / 加速度 $a$
    * 下标: 
    物理量所在点, 重合时, 优先认为是动点 (质点运动分析) + 分解方向
    基点 + 所在点 (刚体运动分析)
    * 上标: 绝对值无上标, 与动系关系 $r/e/k$ + 在转动中的属性 $t/n$ (加速度)

## 动力学
### 功率方程
1. 分析物体的能量时, 应先列出原始表达式, 并对原始表达式求导
1. 注意刚体的动能 $E_k=\frac{1}{2}mv_c^2+\frac{1}{2}J_c\omega^2$, 其中 $J_c$ 为质心转矩
1. 对求导后的方程带入瞬时值计算
1. 注意方程中的物理量为向量, 不能直接相乘
    * $P=\vec{F}\vec{v}$
    当重力与速度不不平行时, 注意夹角
    * $\frac{dE}{dt}=m\vec{v}\vec{a}$
    对于匀速转动的点, 有 $\vec{v}\vec{a}=0$, 因此 $\frac{dE}{dt}=0$

### 动静法
1. 开始与运动学相同, 最后列出受力分析
1. 根据受力分析推断需要补充的方程
1. 当找不到方程时
    1. 分析质心与刚体上各个已知点的加速度关系
    1. 标记出已知量, 未知量以及不同方程组中的相关量
    1. 投影避开未知量, 联立相关量, 特别是与角加速度相关的量 (角加速度)
    1. 得出质心加速度与角加速度之间的关系

## 计算检查
1. 点长度是否正确
1. 带入计算时是否漏负号
1. 是否要考虑重力 (铅垂平面)
