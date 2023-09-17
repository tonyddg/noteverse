---
order: 8
---

# 高级计时器 TIM

## 外设介绍
### 功能框架
####  时钟源
作为计时器时钟源 CK_PSC
1. 内部时钟源 即 72MHz(输出 PWM 时使用)
    * Slave Mode 设为 Disable
    * 仅设置 Clock Source
2. 外部输入引脚 TIx (外部模式 1)
    0. 通过寄存器 CCMRx 控制
    1. 选择输入通道(共 4 个), 由位 CCxS 控制
    2. 时钟信号来自定时器的输入引脚, 可通过滤波器去出干扰或降频, 由位 ICxF 控制
    3. 边沿检测来自滤波器的输出信号, 决定是上升沿有效还是下降沿, 由位 CCxP 与 CCxNP 控制
    4. 触发模式选择
    5. 模式选择, 配置 SMCR 的位 SMS, 选择外部模式 1
    6. 使能计时器
3. 外部触发输入(外部模式 2)
    0. 通过寄存器 SMCR 控制
    1. 时钟信号来自定时器特定输入通道(ETR 引脚)
    2. 触发极性 触发信号为选择上升沿有效还是下降沿, 由 ETP 配置
    3. 预分频 触发信号频率不能超过 72/4 MHz, 触发频率很高时, 需要分频, 由 ETPS 配置
    4. 滤波器 当信号频率过高时, 需要通过滤波器重新采样 
    5. 模式选择, 配置位 ECE 为 1, 选择外部时钟模式 2
    6. 使能计时器
4. 内部触发输入

#### 时基单元
接收从 CK_PSC 输入的信号, 完成计时器的功能

1. 预分频器
接收 CK_PSC 后, 经过预分频器输出 CK_CNT, 驱动计数. 最多可实现 1 - 65536 分频, 由寄存器 PSC 配置
2. 计数器
    1. 递增计数模式
        1. 从 0 开始计数, 直到与 ARR 寄存器的值相同, 产生上溢时间并从 0 重新开始
        2. 启用重复计数器后, 计时没从 0 开始, 重复计数器减 1, 为 0 时产生更新事件(UEV)
    2. 递减计数模式
        * 从 ARR 开始计数, 为 0 时重新开始, 生成下溢事件, 重复计数器同 1
    3. 中心对齐计数模式
        1. 从 0 开始递增, 到 ARR - 1 后生成上溢事件, 后从 ARR 开始递减到 1, 生成下溢事件.
        2. 每次上溢事件与下溢事件均会产生更新事件
3. 自动重载寄存器 ARR
    1. 存放与计数器 CNT 比较的数
    2. CR1 寄存器的位 ARPE 置 1 可实现影子寄存器功能, 只在事件更新时, 只有在时间更新后 ARR 值才会被改变
4. 重复计时器 RCR
    1. 仅限于高级计时器
    2. 一般计时器, 每次上溢事件与下溢事件均会产生更新事件
    3. 高级计时器要求 RCR 为 0 才产生更新事件

#### 输入捕获
用于计算输入信号的脉宽, 频率或占空比

1. 基本原理
    * 当捕获到信号的跳变沿后, 把计数器 CNT 的值保存到寄存器 CCR(因此, CCR 记录了发生跳变时的 CNT) 中, 把两次 CCR 的值相减得到脉宽或频率
2. 输入通道
    * 输入被测量的通道, TIx(通常是 channel x 复用), 对应引脚查表
3. 输入滤波器
    1. 滤波器的采样频率必须大于等于输入信号的两倍
    2. 由 CR1 寄存器的位 CKD 与 CCMR 寄存器的位 ICxF 控制
    3. 采样频率由 CK_INT 或 DTS 分频决定
4. 捕获通道
    1. 输入信号经过不同处理后产生的信号映射到捕获通道 ICx 上
    2. 通过不同的映射方法实现不同的测量效果
    3. 映射关系由寄存器 CCMRx 的位 CCxS 配置
5. 预分频器
    * 对 ICx 信号分频, 由寄存器 CCMRx 的位 ICxPSC 配置
6. 捕获寄存器
    1. 对被捕获的信号进行处理
    2. 第一次捕获后, 寄存器的信号保存到捕获寄存器 CCR 中, 产生 CCxI 中断, 读取 CCR 的值可以清除中断
    3. 第二次捕获(第一次捕获未读取), 产生捕获溢出事件 CCxOF, 需要软件清零

#### 输出比较
* 通过计时器的外部引脚对外输出信号, 可用于输出 PWM
* 由于 PWM 的宽度通过与计数器比较实现, 因此称为比较输出

1. 比较寄存器 CCR(Capture / Compare)
    1. 当计数器 CNT 的值与比较寄存器相同时, 改变输出参考信号 OCxREF 的极性
        * 通过设置比较器寄存器的值, 实现脉冲宽度的调整(SetCompare)
    2. 产生比较中断 CCxI
    3. 输出参考信号 OCxREF 经一系列的控制后, 称为真正的输出信号 OCx/OCxN
2. 死区发生器
    1. 用于生成两路互补信号 OCx/OCxN 与半桥驱动电路中
    2. 由于 MOS 开启与关闭需要时间, 通过插入死区时间等待 MOS 管, 否则会发生短路
    3. 死区时间由 MOS 管的工艺调节
3. 输出控制
    1. 参考信号分为两路, 一路是原始信号, 一路是反向信号, 具体由 CCER 的位 CCxP 与 CCxNP 控制
    2. 经过极性选择后, 输出到外部引脚 CHx/CHxN 由寄存器 CCER 的位 CxE/CxNE 控制
4. 输出引脚
    1. 仅高级计时器有互补引脚 CHxN, 其他仅有输出引脚 CHx
    2.共有 CH1-4 4 个输出引脚

#### 断路功能
即电机控制的刹车功能, 仅高级计时器有此功能

### 常用缩写解释
1. IC Input Channel
2. OC Output Channel
3. CC Capture/Compare Channel

## 库函数配置
### 基本 TIM 初始化结构体
用于非基本计时器
TIM_TimeBaseInitTypeDef
1. TIM_Prescaler 与分频器 即 TIM_PSC 的大小, 可实现 1 - 65536 分频, ==实际为 TIM_Prescaler + 1 分频==
2. TIM_CounterMode 计数模式, 可设置向上, 向下以及中心对称模式
3. TIM_Period 定时器周期 即设定自动重载寄存器的值, 范围为 0 - 65535, ==每 TIM_Period + 1 个计数周期, 产生一次中断==
4. TIM_ClockDivision 时钟分频 设置定时器时钟 CK_INT, 死区发生器与滤波器采样的时钟分频, 可选 1, 2, 4 分频
5. TIM_RepetitionCounter 重复计数器, 仅用于高级计时器 

### TIM 输出功能初始化结构体
用于输出功能
TIM_OCInitTypeDef
1. TIM_OCMode 输出模式选择, 常用为 PWM1 与 PWM2
2. TIM_OutputState 比较输出使能, 决定是否通过外部引脚输出 
3. TIM_OutputNState 比较互补输出使能, 决定是否输出互补信号
4. TIM_Pulse 比较输出的脉冲宽度 TIM_Pulse * 计数器周期
5. TIM_OCPloarity 输出极性, 决定 OCx_REF 为有效电平时, 输出的电平
6. TIM_OCNPloarity 互补输出的极性
7. TIM_IdleState 空闲状态下的输出信号

### TIM PWM 初始化流程
0. 时钟初始化
1. 输出引脚 GPIO 设为 AF_PP 推挽复用
2. TIM_TimeBaseInit 设置 TIM 的频率
3. ==TIM_OCxInit== 初始化 TIM 输出, x 为选择的输出通道
4. TIM_OCxPreloadConfig 配置影子寄存器功能(ARR 值如何改变)
5. TIM_Cmd 启动定时器
6. TIM_CtrlPWMOutputs 主输出使能(用于高级定时器)
7. TIM_SetCompare1 修改脉频宽度

### LL 库配置
1. Slave Mode - Disable
2. Clock Source - Internal Clock
3. Chnnelx - PWM Generation CHx
4. 设置计数周期长度(重载寄存器/计数器时钟)/PWM模式(PWM 1 为普通模式, PWM2 为与 PWM 1 互补输出模式)
    * 计数器时钟频率尽量大, 重载寄存器的值也尽量大, 实现更精确地控制占空比
    * 一个 TIM 的四个通道可输入或输出, 但捕捉/采样周期相同
5. LL_TIM_CC_EnableChannel 启动比较输出功能
6. LL_TIM_EnableCounter 启动计数器(开始输出)
7. LL_TIM_EnableAllOutputs 启动输出(用于高级计时器)
8. LL_TIM_OC_SetCompareCHx 设置比较寄存器的值, 即改变脉冲宽度

### 输入捕捉 初始化流程
1. Slave Mode - Disable
2. Clock Source - Internal Clock
3. Chnnelx - PWM Generation CHx
4. 设置采样周期/捕捉触发条件(上升沿/下降沿)
5. LL_TIM_EnableIT_CCx 使能中断 CCx, 用于当通道 x 触发后产生中断
6. LL_TIM_IC_GetCaptureCHx 获取捕获寄存器 CCRx 保存的值, 得到触发时计数器的值
    1. 捕获沿同一个方向的触发两次, 相减得到 脉冲周期 = 采样周期 X 两次差值
    2. 捕获上升沿时的计数后, 改为捕获下降沿, 相减得到 高电平长度 = 采样周期 X 两次差值
    3. 脉冲周期 / 高电平长度 = 占空比
7. 捕获触发中断有关函数
    1. LL_TIM_EnableIT_CCx 启用捕获中断, 在捕获到触发时产生中断
    2. LL_TIM_IsActiveFlag_CCx CCx 中断是否激活
    3. LL_TIM_ClearFlag_CCx 清除 CCx 中断标志
8. LL_TIM_IC_SetPolarity 设置捕获极性, 用于捕获高电平长度
9. LL_TIM_CC_EnableChannel 启动比较输出功能
10. LL_TIM_EnableCounter 启动计数器(开始输出)
