---
order: 4
---

# 串行通讯 UART

## 外设介绍
### 串行与并行通讯
#### 并行通讯
通过多根数据线一次传输多个数据
#### 串行通讯
通过少量数据线, 一位一位地传输数据

#### 通信方向
1. 全双工 两设备同时收发数据
2. 半双工 两设备不能同时收发数据
3. 单工 只有一个设备收发数据

#### 同步方式
1. 同步通信 使用一根信号线表示时钟, 规定在时钟信号为正或负时获取数据
2. 异步通信 以数据帧形式传输数据, 穿插一些同步信号

#### 通信速率
1. 比特率 每秒传输的二进制位数
2. 波特率 每秒传输的码元

当码元只表示一个二进制位时, 比特率等于波特率
否则为一定倍数
(eg. 0 表示 00, 2V 表示 01, 4V 表示 10, 6V 表示 11 则码元表示2个二进制位)

### 串口通信协议
#### 通信设备
1. USART 通用同步异步收发器
2. UART 通用异步收发器

#### 功能引脚
芯片上具体哪些引脚为功能引脚, 需要查看手册

1. TX 发送数据输出引脚
2. RX 接收数据输入引脚
3. SW_RX 数据接收引脚, 只用于单线模式, 没有具体外部引脚
4. nRTS 请求以发送(Request to send) n 表示低电平有效
用于使能 RTS 流控制的 USTART 中, 用于硬件流控制模式
当 USART 准备接收数据时, 为低电平, 寄存器接收数据已满时, 为高电平
5. nCTS 清除以发送(Clear to send) n 表示低电平有效
用于使能 CTS 流控制的 USTART 中, 用于硬件流控制模式
发送器发送数据前, 检查 nCTS 引脚, 低电平表示可以发送, 高电平表示发送完当前数据后停止
6. SCLK 发送器时钟输出引脚, 只用于同步模式

#### 数据寄存器 USART_DR
存储 8 位数据(也可设置为 9 位, 用于校验)
分为两个寄存器, USART_RDR 与 USART_TRD
USART_RDR 为接收到的数据, 读取 USART_DR 时自动读取 RDR
USART_TDR 为发送的数据, 写入 USART_DR 时自动写入 TDR

#### 控制/接收器 USART_CR1
1. 发送器
    * TE 发送使能
    启动数据发送
    * TXE 发送寄存器为空 用于发送单个字节
    * TC 发送完成 用于发送多个字节
    * TXIE 发送完成中断使能
2. 接收器
    * RE 接收使能
    * RXNE 读数据寄存器非空
    * RXNEIE 发送完成中断使能

#### 小数波特率生成器
$$Tx/Rx波特率=\frac{f_{PLCK}}{16\times USARTDIV}$$
$f_{PLCK}$ 为 USART 所在总线的时钟(不同总线下不同, 通常为 72MHz(APB2))

USARTDIV 存放在寄存器 USART_BRR 的小数

#### 校验控制
当发送数据为 9 位时, 增加的一位为奇偶校验位, 校验由硬件完成

## 标准库配置
### 中断
通过设置寄存器, 可以启动不同中断(具体查表)
1. 中断名称 USARTn_IRQ
2. 中断函数 void USARTn_IRQHandler()
3. 使能中断 USART_ITConfig(USARTn, USART_IT_xxx, ENABLE)

* 任何在 USART_ITConfig 中使能的中断均能触发中断函数
* 使用 if(USART_GetITStatus(USARTn, USART_IT_xxx) == RESET/SET) 判断中断是否发生

### USART 初始化结构体
* 通常初始化 USART_InitTypeDef
    1. USART_BaudRate 波特率设置
    2. USART_WordLength 数据帧字长, 为 8 或 9
    3. USART_StopBits 停止位设置, 一般为 1 位
    4. USART_Parity 奇偶校验 USART_Parity_No 无校验,  USART_Parity_Odd 奇校验, USART_Parity_Even 偶校验
    5. USART_Mode 模式选择 USART_Rx 与 USART_Tx, 使用逻辑运算可以选择两个
    6. USART_HardwareFlowControl 硬件流控制器选择, 用于硬件流控制模式
* 时钟初始化(用于同步模式下) USART_ClockInitTypeDef
    1. USART_Clock 控制 SCLK 引脚, 同步模式下开启
    USART_Clock_Disable 关闭 USART_Clock_Enable 开启 
    2. USART_CPOL 同步模式下, 空闲时间引脚的极性
    3. USART_CPHA 时钟在第 n 个变化沿捕获数据 USART_CPHA_nEdge(n=1/2)
    4. USART_LastBit 发送最后一个数据是否输出脉冲

### 初始化配置
1. 使能 GPIOn 与 USARTn 的时钟 
2. TX 设置为推挽复用, AF_PP
3. RX 设置为浮空输入, IN_FLOATING
4. 初始化 USART_Init(USARTn, 初始化结构体)
5. 配置中断
6. 使能串口 USART_Cmd(USARTn, ENABLE)

### 数据发送
1. 使用函数 USART_SendData(USARTn, uint8_t ch); 发送 ch
2. 使用 USART_FLAG_TXE(发送寄存器为空) 判断数据是否发送结束
while (USART_GetFlagStatus(USARTn, USART_FLAG_TXE) == RESET);

### 数据接收
为了防止数据丢失, 数据接收应在中断 USARTn_IRQHandler 中进行
