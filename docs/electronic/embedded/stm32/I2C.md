---
order: 6
---

# 通信协议 I^2^C

## 外设介绍
### 物理层
1. 使用两条总线与多个设备连接(通信从机)
2. SDA 双向串行数据线
3. SCL 串行时间线 同步数据收发
4. 每个连接的设备都有一个独立地址, 通过地址访问
5. 总线通过上拉电阻连接电源, 设备空闲时输出高阻态, 所有设备输出高阻态时, 总线变为高电平

### 协议层
1. 主机广播传输起始信号
2. 主机广播从机地址信号, 与设备地址相同时, 选中设备, 其他设备将忽略之后的信号
3. 从机/从机发出应答/非应答信号, 只有收到应答信号, 主机才能继续收发数据
4. I2C 中采用 MSB first(most significant bit), 即先传输二进制数据的最高位
* 写数据 主机向从机发送 8 位的数据包, 然后等待从机应答信号, 不断重复, 直到主机发送停止传输信号
* 读数据 从机向主机发送 8 位的数据包, 然后等待主机的应答信号, 不断重复, 直到主机发送非应答信号
* 读写过程 通过重复读写信号 + 从机地址, 实现对从机的多次读写

### 传输信号
1. 起始信号(S) SCL 为高电平, SDA 从高电平切换至低电平
2. 停止信号(P) SCL 为高电平, SDA 从低电平切换至高电平
3. 数据的有效性 SCL 为高电平时, SDA 的数据为有效数据, SCL 为低电平时, SDA 切换电平
4. 设备地址 可以是 7 位 或 10 位, 一般为 7 位
5. 数据方向 在设备地址后指定, 1 表示主机向从机读数据, 0 表示主机向从机写数据
6. 应答(ACK/NACK) 发送完 8 位数据后, 接收端输出应答信号, SDA 位高电平, 表示非应答(NACK), 低电平表示应答(ACK)

### I^2^C 特性
可以通过程序模拟 I^2^C 协议, 实现软件模拟协议, 也可通过STM32 的 I^2^C 外设, 实现硬件协议
通过查询手册得到STM32 上的 I^2^C 通信引脚

### STM32 I^2^C 通信过程
* 主发送器
    1. 控制器发出起始信号(S), 产生事件 EV5(起始信号已发送)
    2. 发送设备地址并等待应答, 当从机应答, 产生事件 EV6(数据已发送) 及 EV8(数据寄存器为空)
    3. 清零 ADDR(清除 EV6)
    4. 向数据寄存器(DR)写入数据, EV8 事件结束, 发送数据后, 再次产生 EV8 事件, 不断重复
    5. 设置 CR1 寄存器的 STOP 位, 结束发送, 发送完最后一个数据将产生 EV8_2 事件, 然后发出停止信号(P)
    * 通过启动 I^2^C 中断, 进入中断函数, 判断事件, 实现信号发送

* 主接收器
    1. 1, 2 步同发送器
    2. 当主机接收到数据后, 产生事件 EV7(数据寄存器非空/接收到数据), 读取数据后, 事件结束
    3. 读取数据后可以发送 应答/非应答 信号, 若应答则重复接收, 否则停止接收, 接收到的最后一个数据将产生 EV7_1 事件, 并发出停止信号

## 标准库配置
### I^2^C 初始化结构体
1. I2C_ClockSpeed 配置 I^2^C 传输速率, 参数值不得高于 400kHz
2. I2C_Mode 选择 I^2^C 的模式, I2C 与 SMBusHost/Device, 使用 I2C 不需要区分主从
3. I2C_DutyCycle 设置 SCL 线时钟占空比, 2 表示 2:1; 16_9 表示 16:9, 两个模式差别不大
4. I2C_OwnAddress1 STM32 设备自己的地址, 7 位或 10 位(与设置有关), 只要唯一即可
4. I2C_OwnAddress2 STM32 设备自己的第二个地址, 只允许 7 位
5. I2C_Ack_Enable I^2^C 答应设置, 一般设置为 Enable
6. I2C_AcknowledgeAddress 设置地址的长度, 7 位或 10 位