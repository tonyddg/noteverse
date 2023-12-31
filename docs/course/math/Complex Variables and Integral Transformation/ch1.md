---
order: 1
---


# 复数及其基本定义
## 复数运算
### 比较
两个虚部不为 0 的复数不能比较大小

### 乘法
几何意义: 两个复数角度之和, 模长之积

### 除法
$$\frac{z_1}{z_0}=\frac{z_1\overline{z_0}}{z_0\overline{z_0}}=\frac{z_1\overline{z_0}}{x_0^2+y_0^2}$$

### 共轭
1. 对于加减乘除均运算满足
$$\overline{z_0\pm z_1} = \overline{z_0}\pm\overline{z_1}$$
2. $$z\overline{z}=x^2+y^2$$
3. $$Rez=\frac{1}{2}(z+\overline{z})$$
4. $$Imz=\frac{1}{2i}(z-\overline{z})$$

## 复数三角表示
### 辐角
将复数对应向量与实轴正方向的夹角记为辐角 $Argz$  
$Argz$ 为多值函数  
其中 $z=0$ 与 $z=\infty$ 辐角无意义  

### 主辐角
辐角中取 ==$argz\in(-\pi,\pi]$== 为主辐角, 为单值函数
满足 
$$Argz=argz+2k\pi(k\in\Z)$$

### 计算
利用 
$$arctan\frac{y}{x}\in(-\frac{\pi}{2},\frac{\pi}{2})$$ 
计算辐角, 注意范围外通过画图确定具体值

### 三角不等式
拆分含取模运算的不等式
1. $$|z_1|-|z_2|\le|z_1-z_2|$$
2. $$|z_1+z_2|\le|z_1|+|z_2|$$
3. $$|z_1|-|z_2|\le|z_1\pm z_2|\le|z_1|+|z_2|$$

### 三角表示
$$z=r(\cos\theta+i\sin\theta)=re^{i\theta}$$
含乘法计算时, 可转换为指数表示简化运算

### 乘方运算
1. 乘方
使用乘法法则得
2. 开方
$$\because\theta=argz+2k\pi$$
$$\therefore\frac{\theta}{n}=\frac{argz}{n}+\frac{2k\pi}{n}$$
==对复数 $z$ 开 $n$ 次方得到 $n$ 个结果==, $k$ 取 $0,1,...,n-1$

## 平面点集概念
G 为一个平面点集
### 内点
$z_0$ 为 G 内一个点, 且 $z_0$ 的邻域均在 G 内, 则 $z_0$ 为 G 的内点
### 边界点
$z_0$ 为平面上任意一点, 且 $z_0$ 的任一邻域既在 G 内, 也在 G 外, 则 =$z_0$ 为 G 的边界点
### 孤立点
$z_0$ 为 G 内一个点, 且 $z_0$ 的去心邻域均在 G 外, 则 $z_0$ 为 G 的孤立
### 有/无界集
以一个点为中心的圆能完全包含 G, 则 G 为有界点
### 开集
G 内的每个点都是内点, 则 G 为开集(没有边界与孤立点)
### 闭集
平面上不属于 G 的点的集合(余集)为开集, 则 G 为闭集  
(可能存在边界不完全的非开非闭集)
### 区域
将==单连通的开集== $D$ 称为区域  
==$D$ 与其边界==构成闭区域 $\overline{D}$

## 平面曲线
使用 $z(t)=x(t)+iy(t)(t\in C)$ 表示一条平面曲线  
注意==曲线的方向与 $t$ 的范围==
### 光滑曲线
当曲线满足 
$$[x'(t)]^2+[y'(t)]^2\neq0$$

则 $z(t)$ 为光滑曲线  
eg. 曲线 $z=t^2+it^3$ 在 $t=0$ 不光滑
### 两点连线
由 $z_1(x_1,y_1)$ 到 $z_2(x_2,y_2)$ 的有向线段
$$z(t)=z_1+t(z_2-z_1)(t\in[0,1])$$
### 圆弧
$$z(\theta)=re^{i\theta}(\theta\in[0,2\pi))$$
### 平面曲线转为复平面曲线
对于曲线 $f(x,y)=0$, 可带入 
$$x=\frac{1}{2}(z+\overline{z})$$
$$y=\frac{1}{2i}(z-\overline{z})$$
### Z 点的轨迹
1. 使用参数法时必须指出参数 $t$ 的范围
2. 注意轨迹的方向
3. $arg z$ 只能表示==一个方向的射线==, 不能表示直线
4. 含未知参数(特别是还有取模时)要讨论 

eg. 轨迹 
$$|z+a|^2=|a|^2-b$$
在 $|a|^2-b < 0$ 时无意义

## 无穷远点
1. 无穷远点实部与虚部无意义
2. 无 $+\infty$ / $-\infty$ 的概念
3. $|\infty|=+\infty$
4. 无穷远点辐角无意义

## 极限
对于函数 $f(z)=u(x,y)+iv(x,y)$
存在 $\lim_{z\to z_0} f(z)=A$ 的充要条件为
$$lim_{p\to(x_0,y_0)}u(x,y)=u_0$$
$$lim_{p\to(x_0,y_0)}v(x,y)=v_0$$

### 极限求法
* $$lim_{p\to(x_0,y_0)}u(x,y)=u_0$$
$$lim_{p\to(x_0,y_0)}v(x,y)=v_0$$
任意一个极限不存在, 复数极限不存在
* 令 $z=re^{i\theta}$, 则当 $r\to 0$ 时, 结果与 $\theta$ 无关
* 洛必达法则

### 连续性
对于 $\overline{D}$ 上的连续函数 $f(z)$, 有
1. 函数在 $\overline{D}$ 上有界
2. 函数在 $\overline{D}$ 上能取得最大值与最小值
