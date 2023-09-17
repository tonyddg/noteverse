---
order: 2
---

#  中断控制 NVIC

## 外设介绍
NVIC 嵌套向量中断控制器
通过 NVIC 控制中断是否发生与优先级等信息

### 外设中断
在启动文件 __Vectors 部分, 定义了大部分的中断函数名称与含义
通过定义中断函数, 实现在中断发生时, 暂时挂起程序并执行中断
==部分中断服务函数不在启动文件中, 需要手动添加==

### 中断优先级
1. 优先级分组 将优先级分为 5(0 ~ 4) 组, 每组拥有不同的抢占优先级位数(4 - n)与子优先级位数(n), 总位数相同
2. 抢占优先级 优先级的前 4 - n 位
3. 子优先级 优先级的后 n 位

## 标准库配置
### NVIC 初始化
1. NVIC_IRQChannel 中断源, 通常为 外设名_IRQ, 如 USART1_IRQ
2. NVIC_IRQChannelPreemptionPriority 抢占优先级(范围通过优先级分组决定)
3. NVIC_IRQChannelSubPriority 子优先级(范围通过优先级分组决定)
4. NVIC_IRQChannelCmd 使中断开启(Enable) 或关闭 (Disable)

* 函数 NVIC_PriorityGroupConfig(uint32_t); 参数 NVIC_PriorityGroup_n 使用第 n 组优先级分组
* 对于外设的中断还需要先通过 XXX_ITConfig 使能

## 踩坑笔记
1. 部分中断服务函数没有在启动文件中声明, 需要手动添加
