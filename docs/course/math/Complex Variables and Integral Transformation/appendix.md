# 易错
1. [广义积分的留数积分公式](#gyjf_lsjfgs)中, 只要对==上半平面==的留数求和
2. 积分中使用留数时, 不能忘记乘上系数 $2\pi i$
3. 积分中使用留数时, 在求留数前先判断奇点类型与极点的阶数
4. [本性奇点的留数](#bxjddls)
5. 求复杂图形的共形映射时, 先将图形中尽可能多边界(及其延长线)的交点映射为 $\infty$(产生尽可能多的直线与线段)
6. 凑微分后将会产生一个未知常数 $C$, 需要根据题目条件确定值或与其他常数的关系
7. $|1+i|=\sqrt{2}$, 则 $Ln(1+i)=ln(\sqrt{2})+2k\pi i+\frac{\pi}{4}i(k=0,1,2,...)$, 其中 $ln(\sqrt{2})=\frac{1}{2}ln2$
8. 求极限时最好不要直接带入, 而是使用泰勒公式与等价无穷小/洛必达法则
9. [三角函数的留数积分公式](#sjhsx_lsjfgs)中, 只要对==单位圆域内的留数==求和
10. 积分注意 当积分变量被改变(变量代换), 积分变量的微分 $dz$ 与积分域也会相应改变
11. 多曲线共形映射中, 标明关键交的与曲线的名称, 防止混乱
12. 共形映射在画出区域时, 一定要保证画出的区域正确
    1. $D:|z-1/2+i/2|>r$ 此时, 圆心所在的区域应取 $-z_0$, 即 (1/2,-1/2), 符号为大于号, 因此区域在圆外
    2. $Imz<0$ 小于号表示为下半平面
13. [对环路的柯西积分公式](#kxjfgs)中, 保证分母中的 $z_0$ 在环路内, $f(z)$ 在环路内解析, 环路上连续, 否则公式不成立(为 $0$(不在环路内) 或不确定(不解析))
14. 求傅里叶变换时, 先尝试直接积分
15. $z^2+a$ 方程的解为 $\pm 1\sqrt{a}$
16. $$Res[f(z),\infty]=-Res[f(\frac{1}{z})\frac{1}{z^2},0]$$
17. 幂函数共形映射中, 起始边不在实轴正向时, 两个边界分别括大 n 倍, 负数角度则向负方向扩大
18. $\sqrt{-i}$ 由 $i$ 方向的 $1/2$ 得到结果的辐角为 $-\pi/4$ 与 $3\pi/4$, 结果的模长为 $1$, 因此 $\sqrt{-i}=\pm \frac{1-i}{\sqrt{2}}$, 注意开方运算后, 结果的模长也要开方