# 动力学
## 动力学普遍定律
### 动量定理
#### 质点系动量定理
对于质心 $C$, 有动量定理 
$$m\vec{a_C}=\sum\vec{F}$$

#### 动量守恒定理
当外力之和 $\sum \vec{F^{(e)}}=0$, 则质点系动量守恒, 满足 
$$m\vec{v_C}=k$$

当 $\vec{v_C}=0$, 则积分后还可得到 
$$m\vec{r_C}=0$$ 
初速度为零时, 质心位置不会改变, 对于某个方向的初速度分量也可使用此公式, 可用于计算光滑下滑问题

### 动量矩定理
#### 动量矩定义
对于一==固定点 $O$==, 定义刚体的动量矩
$$\vec{L_O}=\sum(\vec{r}\times m\vec{v})$$
对动量矩求导可得 
$$\vec{M_O}=\frac{d\vec{L_O}}{dt}=\sum(\vec{r}\times\vec{F})$$

#### 转动惯量
|形状|轴位置|J|
|---|---|---|
|细杆|杆的一端|$\frac{1}{3}mL^2$|
|细杆|杆的中点|$\frac{1}{12}mL^2$|
|薄圆筒|中轴线|$mR^2$|
|圆盘/柱|中轴线|$\frac{1}{2}mR^2$|
|球壳|直径|$\frac{2}{3}mR^2$|
|球|直径|$\frac{2}{5}mR^2$|
|矩形薄板|矩形中心|$\frac{m}{12}(a^2+b^2)$|

##### 平行轴定理
$$J = J_c + md^2$$

特别注意此处 $J_c$ 为通过质心的轴, $d$ 为平行轴到质心轴的距离
##### 正交轴定理
$$J_z = J_x + J_y$$
仅用于薄板，$J_z$ 为垂直于板的轴

#### 质点系动量矩
对于==任意点 $D$==, $C$ 为刚体质心, 刚体角速度为 $\omega$, 在一个瞬间内, 定义刚体的动量矩 
$$\vec{L_D}=J_C\vec{\omega}+\vec{r_C}\times m\vec{v_C}$$

对 $\vec{L_D}$ 求导可发现, 一般情况下, $\vec{r_C}\times m\vec{v_C}$ 项的导数难以求解, 为了避开此项, 需要选取特殊的 $D$ 点, 称为动矩心
1. 质心 $C$
1. 刚体的固定转轴
1. 加速度为 $0$ 的点 (加速度瞬心, 瞬时平动时使用)

此时有等式 
$$\vec{M_D}=J_D\vec{\omega}$$
==注意, 对于不同的动矩心 $D$, $J_D$ 的取值不同==

#### 刚体平面运动微分方程
* 对于单个刚体的动矩心 $D$ 与 质心 $C$ 有方程
* 用于求解结构简单的单个物体的 $a,v$

$$\begin{cases}ma_{Cx}&=&\sum F_x^{(e)}\\
ma_{Cy}&=&\sum F_y^{(e)}\\
J_D\alpha&=&\sum M^{(e)}\end{cases}$$

### 动能定理
#### 力做功
注意是点乘, 方向不一致需要投影
$$W_{12}=\int \vec{F}d\vec{r}$$

#### 力矩做功
$$W_{12}=\int Md\varphi$$

#### 常见势能计算
==计算势能时, 最好先明确势能零点, 一般取平衡位置==

##### 重力势能
$$E_p=-mg\Delta h=mg(h_{\text{初}}-h_{\text{末}})$$

##### 弹性势能
$$E_p=\frac{1}{2}k(\Delta l_{\text{初}}^2-\Delta l_{\text{末}}^2)$$
 
#### 刚体动能
$$E_k=\frac{1}{2}mv_C^2+\frac{1}{2}J_C\omega^2$$

#### 理想约束
由于==刚体内力不做功==, 因此
对于以下约束, 约束力不做功
1. 固定光滑接触面约束
1. 光滑铰链约束
1. 光滑铰链支座约束
1. 静摩擦 (如纯滚动中的静摩擦)
1. 不可伸长的柔绳约束

#### 动能定理
$W_{12}$ 表示从状态 $1$ 到状态 $2$, 外力做功
用于求解结构复杂的单自由度机构的 $v,a,F$

$$E_{2}-E_{1}=W_{12}$$

## 动力学应用
### 功率方程
* 功率可以表示为物体能量的导数, 即 
$$P=\frac{d(E_k+E_p)}{dt}$$
* 对于刚体上所有受力点 $i$, 功率也可表示为 (==注意是点乘, 方向不一致需要投影==) 
$$P=\sum \vec{F_i}\cdot\vec{v_i}$$
* 联立两式即为功率方程
* 功率方程适用于单自由度的复杂机构

#### 功率方程求导注意
* 只有普遍成立的表达式才可以求导
* 题目中一般求得的均为瞬间状态
* 可以先列出普遍成立的表达式, 在对其求导后带入瞬间状态的值


### 达朗贝尔原理
达朗贝尔原理根据动量定理, 引入惯性力与惯性力矩, 平衡外力, 将动力学问题转化为静力学问题

* 对整体使用达朗贝尔原理得到的三个方程于功率方程独立
* 对于物体较少, 多自由度时, 使用达朗贝尔原理

#### 惯性力
定义作用于简化中心 $D$ 的惯性力 (实际应用中会先正交分解惯性力) 
$$\vec{F_I}=-m\vec{a_C}$$

* ==注意惯性力的大小于简化中心的位置无关, 仅与质心加速度有关==
* 惯性力的简化中心位置无要求

#### 惯性力矩
惯性力矩同样只有在以下特殊简化 $D$ 中心才易于计算
1. 质心 $C$
1. 刚体的固定转轴
1. 加速度为 $0$ 的点 (加速度瞬心, 瞬时平动时使用)
1. 加速度矢量通过质心 (纯滚动中的速度瞬心符合此条件)

此时惯性力矩为 
$$\vec{M_I}=-J_D\vec{\alpha}$$

* ==注意惯性力的大小与简化中心的位置有关==
* 力矩在任何位置作用效果相同

### 例题
![](./theoretical_mechanics_res/quest3.drawio.svg)

已知 $AB=2.5m,BO=1m,PA=2m$, 图示瞬间 $\omega_{AB}=1rad/s$, 求此时杆 $AB$ 的角加速度

#### 几何分析
易得, $\Delta PBA$ 为一个直角三角形, 边 $PB=1.5m$

#### 速度分析
![](./theoretical_mechanics_res/quest3_1.drawio.svg)

$A$ 紧贴地面, 因此 $\vec{v_A}$ 沿水平方向. $B$ 点绕 $O$ 转动, 因此 $\vec{v_B}$ 沿竖直方向  
已知杆 $AB$ 上两点的速度, 分别做垂线得到速度瞬心 $P$. 由于 $\omega_{AB}$ 已知, 因此可得
$$v_B=PB\omega_{AB}=1.5m/s$$
$$v_A=PA\omega_{AB}=2m/s$$

#### 加速度分析
![](./theoretical_mechanics_res/quest3_2.drawio.svg)

以加速度情况最简单的点 $A$ 为基点分析加速度

对于点 $B$ 绕 $O$ 旋转, 其绝对加速度可分为 $\vec{a_B^n}$ 与 $\vec{a_B^\tau}$ 两部分, 满足
$$a_B^n=\frac{v_B^2}{OB}=2.25m/s^2$$
$$a_B^\tau=OB\alpha_{OB}=\alpha_{OB}(m/s^2)$$

$B$ 相对基点 $A$ 的运动满足
$$a_{AB}^n=AB\omega_{AB}^2=2.5m/s^2$$
$$a_{AB}^\tau=AB\alpha_{AB}=2.5\alpha_{AB}(m/s^2)$$

此外还有加速度合成满足
$$\vec{a_B^n}+\vec{a_B^\tau}=\vec{a_A}+\vec{a_{AB}^n}+\vec{a_{AB}^\tau}$$

其中共有未知量 $3$ 个分别为 $a_A,\alpha_{AB},\alpha_{OB}$.  
注意未知量中 $\alpha_{AB}$ 为待求量, $\alpha_{OB}$ 显然与待求量无关, 因此可先沿垂直于 $\vec{a_B^\tau}$ 方向分解, 避开未知量 $\alpha_{OB}$, 有
$$\begin{split}a_B^n&=a_A+a_{AB}^n\sin\varphi-a_{AB}^\tau\cos\varphi\\
0.75&=a_A-2\alpha_{AB}\end{split}\tag{a1}$$

---

对于点 $C$, 其绝对加速度大小方向均未知, 因此沿 $x,y$ 轴分解为 $\vec{a_{Cx}}$ 与 $\vec{a_{Cy}}$ 两部分

$C$ 相对基点 $A$ 的运动满足
$$a_{AC}^n=AC\omega_{AB}^2=1.25m/s^2$$
$$a_{AC}^\tau=AC\alpha_{AB}=1.25\alpha_{AB}(m/s^2)$$

此外还有加速度合成满足
$$\vec{a_{Cx}}+\vec{a_{Cy}}=\vec{a_A}+\vec{a_{AC}^n}+\vec{a_{AC}^\tau}$$

其中共有未知量 $4$ 个分别为 $a_A,\alpha_{AB},a_{Cx},a_{Cy}$, 且不存在特殊方向, 因此暂时无法求解.  
直接向 $x,y$ 方向分解后有
$$\begin{split}a_{Cx}&=a_A+a_{AC}^n\sin\varphi-a_{AC}^\tau\cos\varphi\\
-\frac{3}{4}&=a_A-\alpha_{AB}-a_{Cx}\end{split}\tag{a2}$$
$$\begin{split}a_{Cy}&=a_{AC}^n\cos\varphi+a_{AC}^\tau\sin\varphi\\
-1&=\frac{3}{4}\alpha_{AB}-a_{Cy}\end{split}\tag{a3}$$

至此加速度分析中共有四个未知量 $a_A,\alpha_{AB},a_{Cx},a_{Cy}$ 需要求解, 有独立方程三个, 仍需一个方程.

#### 受力分析
![](./theoretical_mechanics_res/quest3_3.drawio.svg)

根据达朗贝尔原理, 将运动的杆 $AB$ 视为静止, 取质心 $C$ 为简化中心, 产生与 $C$ 点加速度方向相反的虚拟力 $F_{Ix},F_{Iy}$ ==以及与杆 $AB$ 角加速度方向相反的虚力矩==, 满足
$$\vec{F_{Ix}}=-m\vec{a_{Cx}}$$
$$\vec{F_{Iy}}=-m\vec{a_{Cy}}$$
$$\vec{M_{I}}=-J_{AB}\vec{\alpha_{AB}}=-\frac{mAB^2}{12}\vec{\alpha_{AB}}$$

除虚拟力外, 杆上还在 $A$ 点有约束力 $N$, $B$ 点有拉力 $T$, 质心 $C$ 上有重力 $mg$.  
为了避开无关未知量 $N,T$ 对其力方向交点 $P$ 取矩有
$$\begin{split}(F_{Iy}-mg)\frac{PB}{2}+F_{Ix}\frac{PA}{2}+M_I&=0\\
3g&=3a_{Cy}+4a_{Cx}+\frac{25}{12}\alpha_{AB}\end{split}\tag{a4}$$

在补充此方程后, 方程数与未知量相同可以求解

#### 结果求解
根据四个方程得到方程组
$$\begin{bmatrix}1&-1&-1&0\\
0&\frac{3}{4}&0&-1\\
0&\frac{25}{12}&4&3\\
1&-2&0&0\end{bmatrix}
\begin{bmatrix}a_A\\\alpha_{AB}\\a_{Cx}\\a_{Cy}\end{bmatrix}=
\begin{bmatrix}-\frac{3}{4}\\-1\\3g\\\frac{3}{4}\end{bmatrix}$$

取 $g=10$, 解得
$$\alpha_{AB}=2.52rad/s\curvearrowright$$

### 自由度
* 完全确定一个机构的状态的最少参数
* 一个二维刚体提供 $3$ 个自由度
* 一个约束可减少 $n$ 个自由度
* 自由度可表示为 
$$DoF=3m-\sum n_i$$
* 自由度参数可以是坐标 $x$, 也可是角度 $\theta$ 等

#### 动力学解题过程
1. 受力分析图
1. 速度分析图
1. 加速度分析图
1. 列出运动学方程
1. 补充动力学方程
1. 当方程数 = 未知量个数, 解方程

### 虚位移原理
* 虚位移原理本质是引入运动学与功能原理, 解决静力学问题, 避免求内力
* 当系统保持平衡时, 对于一组虚位移, 外力做虚功必定为 $0$ 
$$\sum \vec{F^{(e)}}\delta\vec{r}=0$$

#### 单自由度应用
* 大部分情况下, 虚位移方向与对应的速度 (坐标) / 角速度 (角度) 方向相同, 因此可直接使用速度 / 角速度代替虚位移, 使用功率方程代替做功
* 单自由度只能得到单个独立的虚位移方程
* 首先要分析机构的速度关系
* 将其中一个速度作为已知量, 表示出其他速度, 列出功率表达式
* 令功率 $P=0$, 消去方程中的已知量, 得到方程

#### 多自由度应用
* 先找出合适的自由度参数
* 固定其他参数, 只保留一个, 以单自由度的方法处理, 得到方程
* 对其他自由度重复, 每有一个自由度, 便得到一个方程
* 固定参数方法: 令参数所表示的速度 / 角速度为 $0$
* 也可以采用限定方向 (使不待求的力 $\vec{F}\cdot\vec{v}=0$) 的方式减小自由度

#### 计算约束力
* 解除需要计算的约束力
* 对于铰链约束, 求某方向的约束力时, 可假设只存在另一方向的约束力
* 对于纯滚动的摩擦力与支持力, 可以类比为固定铰链支座的正交分力, 与铰链约束相同
* 对于桁架, 只需移去待求内力所在杆 (桁架为二力杆, 但两端节点速度无关)