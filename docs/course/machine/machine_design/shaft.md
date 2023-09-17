---
order: 4
---

# 轴
## 基本说明
### 轴的分类
1. 根据轴所受的载荷分类
    1. 心轴 工作时只受弯矩而不受转矩作用
    1. 传动轴 工作时主要受转矩作用, 几乎不受弯矩作用
    1. 转轴 工作时既受转矩又受弯矩作用
1. 根据轴线形状不同分类
    1. 直轴
    1. 曲轴

### 轴的基本结构
![](./src/shaft/%E8%BD%B4%E7%9A%84%E7%BB%93%E6%9E%84.jpg)

1. 轴颈 与轴承相配合的部分
1. 轴头 与轮毂相配合的部分
1. 轴身 连接轴颈与轴头的部分

### 轴结构的基本要求
1. 受力合理, 材料省, 重量轻
1. 轴上零件要有准确的定位与可靠的固定
1. 便于轴上零件装拆
1. 尽量减小应力集中

## 轴的结构设计
### 轴向固定与定位
#### 轴肩或轴环
![](./src/shaft/%E8%BD%B4%E8%82%A9_%E5%A5%97%E7%AD%92.jpg)

简单可靠的定位方式, 通常为大部分零件的一侧提供轴向固定

#### 套筒
==用于相隔距离不大的零件的固定==, 套筒与轴为过渡配合, 不需要圆周固定

#### 弹性挡圈
![](./src/shaft/%E5%BC%B9%E6%80%A7%E6%8C%A1%E5%9C%88_%E7%B4%A7%E5%AE%9A%E8%9E%BA%E9%92%89.jpg)

需要加工环槽容纳挡圈, ==对轴的强度削弱大==, 承受不了大的轴向力

#### 紧定螺钉
结构简单, 需要在轴上设置定位锥孔, ==能够承受的载荷小==

#### 圆螺母
![](./src/shaft/%E5%9C%86%E8%9E%BA%E6%AF%8D_%E8%BD%B4%E7%AB%AF%E6%8C%A1%E5%9C%88.jpg)

可用于固定轴端上的零件, ==需切制螺纹==, 削弱了轴的强度

#### 轴端挡圈
用于固定轴端零件, 能承受较大的轴向力, 常用于固定轴端零件与轴 (==不与箱体接触且不是端盖==)

### 周向固定
#### 普通平键
![](./src/shaft/%E9%94%AE%E7%9A%84%E9%80%89%E6%8B%A9.jpg)

1. 普通平键分为 A, B, C 型三种, 用于不同的场合
1. 端铣刀加工键槽, 两端存在半圆, 因此适用 A 或 B 型键
1. 盘铣刀加工键槽, 两端存在弧形底面, 因此适用 B 型键
1. 轴端键槽适用 C 型键
1. ==两侧面为工作面==, 顶面不配合 

#### 半圆键
![](./src/shaft/%E5%8D%8A%E5%9C%86%E9%94%AE.jpg)

1. 两侧面工作, 键槽深, 对轴强度削弱大
1. 可用于锥面, 将自动调整角度
1. 两侧面为工作面

#### 楔键
顶面具有斜度的键, 靠摩擦力传动, ==底面与顶面为工作面==

#### 切向键
![](./src/shaft/%E5%88%87%E5%90%91%E9%94%AE.jpg)

1. 由两个楔键组合
1. 工作面的受力沿切向作用，承载能力强
1. 一组切向键只传递单向转矩, 两组切向键可传递双向转矩
1. 两组切向键夹角为 $120^\circ\sim 130^\circ$

#### 过盈配合
1. 承载能力取决于过盈量
1. 轴承内圈采用此方法连接

#### 花键
![](./src/shaft/%E8%8A%B1%E9%94%AE.jpg)

1. 工作面为齿面, 承载能力强, 对中性好
1. 对轴的削弱小
1. ==既可用于静连接, 又可用于动连接==

#### 导向平键
![](./src/shaft/%E5%AF%BC%E5%90%91%E5%B9%B3%E9%94%AE.jpg)

1. ==属于动连接==, 传动零件可在轴向移动
1. 平键通过螺纹固定在轴上, 轮毂移动距离小

#### 滑键
![](./src/shaft/%E6%BB%91%E9%94%AE.jpg)

1. ==属于动连接==, 传动零件可在轴向移动
1. 键固定在轮毂上, 与轮毂一起移动, 轮毂移动距离大

### 轴系工艺性要求
![](./src/shaft/%E8%BD%B4%E7%9A%84%E7%BB%93%E6%9E%84%E7%A4%BA%E4%BE%8B.jpg)

1. 轴结构要求
    1. ==轴头长度应小于轮毂长度==, 否则无法保证轮毂另一侧与套筒等的固定
    1. 应考虑轴上零件轴向, 周向固定, 检查轴上所有零件是否均固定
    1. ==轴外伸处应考虑密封==
    1. 轴呈阶梯状, 利于安装零件, 从中间最高处到两轴端, 轴的直径逐渐减小
1. 轴承结构要求
    1. ==套筒或轴肩高度小于轴承内圈高度==, 否则轴承无法拆卸
    1. ==轴承旁应有非定位轴肩==, 减少轴的过盈配合安装深度
    1. 轴承为过盈配合, 不需要键等圆周定位
1. 键加工工艺要求
    1. ==所有键槽应处于同一加工方向==, 保证一次铣削就可以全部加工
    1. ==键的长度应小于轴头长度==, 保证整个键都用于传动并减小长键槽对轴强度的削弱
    1. 键槽需要靠近安装段, 方便对准安装 (一般轮毂与轴为过盈配合, 对不准后不易调整)
    1. 允许在导向锥面 (轴端过盈配合处需要有导向锥面) 上加工延伸键槽, 在导向锥面上对准, 方便安装
1. 加工工艺要求
    1. ==螺纹退刀槽 (圆螺母位置) 与砂轮越程槽 (高精度的轴颈等位置)==
    1. ==轴承端盖与轴应有间隙==
    1. ==轴的配合处采用标准值== (如轴承内径为 5 的倍数)
    1. 轴端设置倒角, 方便安装
    1. 轴上的退刀槽, 花键, 键槽, 倒角等==结构采用统一的尺寸, 方便一次加工得到==

### 提高强度设计
#### 减小应力集中
![](./src/shaft/%E5%87%8F%E5%B0%8F%E5%BA%94%E5%8A%9B%E9%9B%86%E4%B8%AD.jpg)

1. 轴肩高度不可过大, 否则将导致应力集中 (根据标准设计)
1. 在轴肩处采用大半径圆角, 凹切圆角, 椭圆圆角等措施避免应力集中

#### 改善受力情况
![](./src/shaft/%E5%90%88%E7%90%86%E5%B8%83%E7%BD%AE.jpg)

将转矩最大的轮毂布置在中间, 转矩相反且较低的轮毂布置在两侧, 避免转矩过大

### 轴系设计过程
设计轴系时, 保持从一个轴肩到另一轴肩为方向分析

1. 通过强度计算等, 确定轴上各个零件的内径与布局, 连接内径, 得到轴的雏形
1. 首先考虑是否能添加轴肩定位与设计非定位轴肩 (轴承等需要过盈配合处) 等, 调整轴的截面直径
1. 设计除轴肩外的其他轴向固定, 保证轴上所有零件均得到固定
    1. 优先采用套筒与轴端圈
    1. 套筒需要考虑套筒两侧的高度是否满足要求 (接触面积足够 / 低于轴承内圈) , 并修改
1. 根据设计的轴向固定微调轴的轴向尺寸, 添加工艺结构
    1. 轴头宽度小于轮毂宽度
    1. 轴端与轴端挡圈存在缝隙, 且与轴之间存在螺钉固定
    1. 圆螺母需要添加螺纹
    1. 弹性挡圈需要有环槽
1. 设计圆周固定, 确定键长, 花键长等结构
1. 添加退刀槽, 倒角等工艺结构

## 轴毂连接强度设计
![](./src/shaft/%E9%94%AE%E7%9A%84%E4%BC%A0%E5%8A%A8.jpg)

### 键连接失效形式
1. 静连接中, 键通过接触力传递动力, 键的侧面受挤压, 失效形式为较弱的零件 (通常为轮毂) 压溃
1. 动连接中, 由于存在零件的相对运动, 因此失效形式为磨损

### 平键强度校核
1. 键的 $h,b,l$ 均为标准值, 其中 $b,h$ 根据轮毂 / 轴的尺寸确定, $l$ 长度可以小于键长
1. 当强度不足时, 可增加键的长度或采用双键布置 

## 轴的强度设计
1. ==轴的失效主要形式为疲劳断裂==
1. 对一般的轴采用弯扭合成强度计算, 重要轴采用安全系数法计算

### 扭转强度条件
1. 用于一般传动轴的设计与校核, 或转轴截面直径的处算
1. 使用前先分析扭矩, 画出扭矩图
1. 计算得到各个受扭段上危险截面的最小轴径, 按标准轴径圆整 (一般是 5 的倍数)
1. 当轴上存在一个键槽时, 由公式计算得到的直径 $d$ 还需要增大 $5\%$, 两个则增大 $10\%$

### 弯扭合成强度
1. 根据第三强度理论建立, 同时考虑扭转与弯曲, 并合并为一个当量弯矩 $M_{ca}$, 用于传动轴校核 / 再次选择轴径
1. 由于==弯曲应力必定是对称循环应力==, 因此使用 $r=-1$ 的许用疲劳极限 $[\sigma_{-1}]_b$ 作为条件
1. ==转矩的应力状态不确定==, 通过==折合系数 $\alpha$ 将其等效为对称循环应力==, 默认以脉动循环应力处理
    1. 频繁启动为脉动循环应力
    1. 双向运行为对称循环应力
1. 截面系数 $W$ 需要考虑键槽, 花键等影响 (查表)

### 轴的设计过程
1. 方案设计, 确定轴上有那些传动件以及各自传递的功率, 并进行简单布置 (使转矩尽量小)
1. 使用扭转强度处算轴上各段的最小轴径, 从而确定传动件尺寸
1. 初步进行结构设计, 得到轴的完整结构
1. 对轴进行受力分析, 得到受力图, 弯矩图与扭矩图, 并合成为 $M_{ca}$ 图, 校核各个危险截面的强度 (弯扭合成强度或安全系数法)
1. 如果校核强度不足, 则需要增大有关轴的直径
1. 校核键强度等其他部分










