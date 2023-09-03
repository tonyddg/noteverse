# 解析函数
## 复变函数的导数
当函数不解析时, 需要通过导数的定义计算导数/判断导数是否存在
$$f'(z_0)=\lim_{\Delta z\to z_0}\frac{f(z_0+\Delta z)-f(z_0)}{\Delta z}$$
* 当 $f(z)=u(x,y)+iv(x,y)$ 时, 可直接使用 C-R 方程判断
* $\Delta z=\Delta x+i\Delta y$
## 解析函数定义
$f(z)$ 在 ==$z_0$ 及 $z_0$ 的邻域内==处处可导, 则称 $f(z)$ 在 $z_0$ 处解析  
若 $f(z)$ 在 $D$ 内每一点解析, 则称 $f(z)$ 为 $D$ 内解析函数

## 函数解析的充要条件
### 柯西方程
函数在 $z=x+yi$ ==可导==的条件为:
1. $u(x,y)$ 与 $v(x,y)$ 在 $(x,y)$ 处可微
2. 满足柯西方程( C-R 方程):
$$\frac{\partial u}{\partial x}=\frac{\partial v}{\partial y}\;,\;\;\frac{\partial u}{\partial y}=-\frac{\partial v}{\partial x}$$
3. 当 $f(z)=u(x,y)+iv(x,y)$ 时, ==应将实部带入 $x$, 虚部带入 $y$==

### 解析函数的导数
满足 C-R 方程时, 可按以下公式计算函数导数
$$f'(z)=\frac{\partial u}{\partial x}+i\frac{\partial v}{\partial x}$$
通过 C-R 方程还可以得到另外 3 个变形

## 调和函数
对于二元实函数 $f(x,y)$  
如果满足 
$$\frac{\partial^2 f}{\partial^2 x}+\frac{\partial^2 f}{\partial^2 y}=0$$
则称 $f(x,y)$ 为调和函数

### 共轭调和函数
设==调和函数== $f(x,y)$ 与 $g(x,y)$  
如果函数满足 
$$\frac{\partial f}{\partial x}=\frac{\partial g}{\partial y}\;,\;\;\frac{\partial f}{\partial y}=-\frac{\partial g}{\partial x}$$
则称 ==$f(x,y)$ 的共轭调和函数是 $g(x,y)$==  
(求共轭调和函数前==需要先验证 $f(x,y)$ 是调和函数==)

将 $f(x,y)$ 作为实部, $g(x,y)$ 作为虚部得到的函数为解析函数

### 求共轭调和函数
已知 $f(x,y)$ 求 $g(x,y)$ 时(或相反), 仅知道 $g(x,y)$ 的全微分(通过柯西方程), 反向求 g(x,y) 时, 必定会产生一个未知的常数 C, 需要通过初始条件确定
