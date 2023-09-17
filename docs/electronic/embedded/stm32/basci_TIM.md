---
order: 8
---

# 基本计时器 TIM

## 外设介绍
基本 TIM 为 TIM6 与 7, 只能定时, 没有外部 IO
### 功能框架
1. 时钟源
TIMxCLK , 由 APB1(36MHz) 分频产生, 库函数默认分频系数 x2, 即 72MHz
2. 计数器时钟
时钟源经分频得到计数器时钟 CK_CNT 用于驱动计数器计数, 可以为 PSC = 0~65535 任一个数
公式为 CK_CNT = TIMxCLK / (PSC + 1)
3. 计数器
CNT, 一个十六位计数器, 只能向上计数(基本 TIM), 最大值为 65535, 当达到自动重载寄存器时产生更新事件, 并清零从头开始计时
4. 自动重载寄存器
ARR, 一个十六位寄存器, 存储着计数器能计数的最大值, 达到这个值时, 如果使能中断会产生溢出中断

## 库函数配置
### 基本 TIM 初始化结构体
TIM_TimeBaseInitTypeDef
1. TIM_Prescaler 与分频器 即 TIM_PSC 的大小
2. TIM_CounterMode 计数模式, 基本计时器仅支持向上计数, 无需设置
3. TIM_Period 定时器周期 即设定自动重载寄存器的值
4. TIM_ClockDivision 时钟分频 基本计时器无此功能
### 基本 TIM 库函数功能
1. TIM_IT_Update 计时器更新(自动重载)
