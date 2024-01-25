# 测量技术与互换性
## 互换性与标准化概论
### 互换性概述
#### 互换性的含义
机械制造中的互换性指按规定的几何, 物理等参数的==极限范围==, 来制造机器各个部分, 使其在装配与更换时==不需要==辅助加工以及修配就能满足使用要求

#### 互换性分类
* 完全互换性  
严格按照互换性定义的互换性
* 不完全互换性
    * 概率互换  
    以接近 $1$ 的概率满足互换性
    * 分组互换  
    通过分组, 保证组内零件满足互换性
    * 调整 / 修配互换  
    通过调整位置 / 修配加工调整环零件实现互换性

### 优先数
优先数系即一种特殊的等比数列, 通过按优先数选择值有利于标准化

#### 优先数系标准
* 按 $10^{N}\sim 10^{N+1}$ 的规律, 分为若干区间, 称为==十进段==
* 在十进段内, 按同一公比 $q$ 细分
* 以十进段被细分的段数 $a$ 划分优先数系, 称为 $Ra$, 有公比 $q=\sqrt[a]{10}$  
例如对于优先数系 $R5$ 有 $q=\sqrt[5]{10}\approx 1.6$
* 在使用优先数系时, 应当查看表使用最近的修约后的值

#### 优先数系优点
* 分级合理, 数系中各相邻项的相对差相等 (等比数列)
* 任意两优先数的理论积, 商, 正数幂仍为同系列的优先数

## 技术测量
### 基本知识
* 测量即将被测量与测量基准进行比较, 从而确定二者的比值的实验过程
* 要求长度基准统一, 准确, 稳定可靠, 易于复现

### 量块使用
线纹尺与量块是机械制造中的==实用长度基准==

#### 量块特性
* 线膨胀系数小, 性质稳定, 耐磨, 不易变形
* 以量块上下==测量面中心点==的长度 $l_c$ 作为量块标称长度 $l_n$, 同时也用于==衡量量块的尺寸精度==
* 除尺寸精度, 还要控制两测量面的==平行度误差==

#### 量块分类方法
* 按==鉴定==精度, 使用==等别==分类 $1\sim 6$ 等量块
    * 最好的 $1$ 等量块使用激光干涉仪检定
    * 使用时, 依据的是检定证书上的==实际尺寸==
* 按==制造==精度, 使用==级别==分类 $K,0\sim 3$ 级量块
    * 使用时, 依据的是刻在量块上的==标称尺寸==

#### 量块使用方法
* 使用时将几个量块组合成所需的标准尺寸
* 应以==最少的块数==组成所需的标准尺寸
* 使用==消除尾数法==选择量块

### 测量误差与评定
#### 测量器具的评价指标
* 刻度间距 $C$  
测量器具上相邻两刻度的长度
* 分度值 $i$  
测量器具上每一个刻度间距所代表的量值
* 灵敏度 $S$  
刻度读数变化与被测量变化之间的比值
* 灵敏限  
引起读数变化的最小被测量变化
* 测量范围  
测量器具所能测得的最大与最小值 (注意对于相对测量器具如指示表, 不等于量程, 是测量对象的限制)
* 示数范围  
测量器具能反应出的全部数值 (即量程)

#### 测量误差的表达
* 绝对误差    
测量结果减去真值 (一般以去除系统误差的均值代替) 的代数差, 取绝对值用于真值相同或相近时的准确度评价
* 相对误差  
绝对误差与真值之比, 取绝对值用于真值相差大时的准确度评价

#### 测量误差分类
* 系统误差  
相同条件下, 误差值保持恒定 (定值系统误差) 或按某一确定规律变化 (变值系统误差) 的误差  
理论上是可以被消除的
* 随机误差  
多次测量, 误差的绝对值与符号均不确定  
可使用统计的方法减小影响
* 粗大误差  
一般使测量值有显著差异, 应当剔除

#### 测量数据的处理
* 真值 $\mu$ 的估计  
使用测量数据的算数平均值 $\bar{x}$ 估计真值

* 标准偏差 $\sigma$ 的估计  
使用样本标准差的无偏估计 $s$ 作为标准偏差 (注意 $n-1$)
$$s=\sqrt{\frac{\sum{(x_i-\mu)^2}}{n-1}}$$

* 真值的标准差 $\sigma_{\bar{x}}$ 的估计  
真值的标准差估计满足 (注意 $\sqrt{n}$)
$$\sigma_{\bar{x}}=\frac{\sigma}{\sqrt{n}}$$

* 测量结果表示
    * 估计真值 $\bar{x}$ 的计算结果保留位数与测量值==保持一致==
    * 估计样本偏差 $\sigma$ / 真值的标准偏差 $\sigma_{\bar{x}}$ 的计算结果比测量值==精确一位==
    * 最终测量结果表示为 $x=\bar{x}\pm 3\sigma_{\bar{x}}$, 其中 ==$3\sigma_{\bar{x}}$ 直接进一位==, 精度与 $\bar{x}$ 一致

#### 系统误差性质判断
* 定值系统误差无法从测量值中揭示, 需要使用高精度仪器检定
* 变值系统误差可使用残余误差核算法分析
    1. 根据平均值计算出全部残余误差 $v_i=x_i-\bar{x}$
    1. 按==测量顺序==排列残余误差
    1. 根据测量顺序前后分组, 计算残余误差的代数和, 若两组数的==代数和接近 $0$==, 则表明==不存在==显著的变值系统误差

#### 粗大误差的剔除
* $3\sigma$ 原则  
根据测量数不应超出 $\pm 3\sigma$ (标准偏差) 的范围, 剔除粗大误差  
仅用于==测量数 $n>10$== 的情况
* 狄克逊准则  
根据狄克逊系数计算确定最大 / 最小项是否为粗大误差

### 技术测量基本原则
* 基准统一原则  
测量, 设计, 制造时使用的基准原则上应该一致
* 最小变形原则  
测量力大小应合适, 应使被测工件与测量器具之间的==相对变形最小==
* 最短测量链原则  
应减少测量链的环节数, 如使用==尽可能少的量块==, 测量时不使用垫块
* 阿贝测长原则  
测量线 (标准长度量, 如刻度与量块) 与被测线的==相对偏离量为 $0$==  
游标卡尺不满足阿贝测长原则, 螺旋测微器满足
* 闭合原则  
若一系列测量数据之间有关联 (如矩形四角之和为 $360\degree$) 则这些测量数据最终累计误差应为 $0$
* 重复原则
* 随机原则