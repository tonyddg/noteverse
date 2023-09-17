---
order: 13
---

# 系统定时器 Systick

## 外设介绍
SysTick 属于 CM3 内核的一个外设, 为一个 24 位向下计数的计时器, 每次计数时间为 1/SYSCLK s

## 库函数配置
void SysTick_Handler(void) SysTick中断函数
由用户定义(通常定义在 stm32fxxx_it.h), 当 SysTick 寄存器倒计时为零时, 触发中断并执行 SysTick_Handler

__STATIC_INLINE uint32_t SysTick_Config(uint32_t ticks)
配置 SysTick 倒计时计数, 重置倒计时并设置中断
使用宏 SystemCoreClock 表示 SYSCLK 的实际时间
因此 SysTick_Config(SystemCoreClock) 将每秒产生一次中断

使用 SysTick_Handler 操控一个全局变量, 并在一个 while 循环中等待变量达到某个值(0), 实现 Sleep 效果
