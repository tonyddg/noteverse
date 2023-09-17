---
order: 7
---

# 通信协议 SPI

## 外设介绍
### 物理层
1. NSS/CS 从设备选择器 用于选择从设备, 主机上的 1SS 对应从机 1 上的 CS, 2SS 对应从机 2 上的 CS, 主机 NSS 的选择无要求 
2. SCK 时钟信号线 由主设备产生, 通信速率受限于低速设备
3. MOSI(Master Output Slave Input) 主设备输出/从设备输入引脚
4. MISO(Master Input Slave Output) 主设备输入/从设备输出引脚

### 协议层
1. 从机选择 NSS 为低电平时, 表示从机被选中, 一次只选择一个从机
2. 数据传输 在 SCK 的一个时钟周期里, MISO 于 MOSI 传输一个 bit
3. 起始/终止信号 NSS 信号由高变低即通信开始, NSS 由底变高即结束
4. SPI 通常采用 MSB first(most significant bit), 即先传输二进制数据的最高位
5. 时钟极性 CPOL 空闲状态时, SCK 的电平 CPOL = 0 时, SCK 在空闲时为低电平
6. 时钟相位 CPHA 数据采样时刻 CPHA = 0 时, 信号将会在 SCK 的奇数边沿采样(边沿从 1 开始计)
7. 数据传输 以 CPHA = 0, CPOL = 0 为例 通信开始后, SCK 首先由低电平变为高点平, 在第一个边沿时(奇数), MOSI 与 MISO 的信号被采样; SCK 然后由高电平变为低电平, 不被采样, 再次变化后被采样
* 当 NSS 电平切换后(通信开始又结束), 之前的状态不会保留, 输出的信息将丢失, 因此==写入后必须立即读取, 且不能改变 NSS==

### STM32 SPI 通信过程
1. NSS 产生起始信号
2. 将数据写入数据寄存器 DR, 存入缓冲区
3. SCK 开始运行, MOSI 传输出缓冲区中的数据, MISO 结束数据存入缓冲区
4. 数据传输完成后, TXE(TX empty) 置为 1; 数据接收完成后, RXNE(RX not empty) 置为 1
5. TX 为 1 后, 再次存入数据即可继续传输; RXNE 为 1 后, 读取数据后即可继续读取

## 库函数配置
### SPI 初始化结构体
1. SPI_Direction 设置 SPI 的通信方向, 一般为 2Line_FullDuplex(全双工)
2. SPI_Mode 工作模式 Master 主机, Slave 从机
3. SPI_DataSize 数据帧的大小, 8b 8 位; 16b 16 位
4. SPI_CPOL CPOL_Low 设置 CPOL = 0; CPOL_High 设置 CPOL = 1;
5. SPI_CPHA 1Edge 沿奇数沿采样; 2Edge 沿偶数沿采样
6. SPI_NSS Hard 硬件模式, 只有一个 NSS 引脚; Soft 软件模式, 即通过手动设置 GPIO 实现 NSS 的控制, 可以同时控制多个
7. SPI_FirstBit 设置使用 MSB First 或 LSB First, 通常为 MSB First
8. SPI_CRCPolynomial CRC 校验多项式
9. SPI_BaudRatePrescaler SPI 相对于所在桥时钟的分频因子, 可设置为 2, 4, 8,至 256 分频

### SPI 库函数功能
1. 使用函数 SPI_I2S_GetFlagStatus 获取标识
2. SPI_I2S_FLAG_TXE 发送寄存器已空
3. SPI_I2S_FLAG_RXNE 接收寄存器非空
4. SPI_I2S_SendData(SPIx, DATA) 发送数据
5. SPI_I2S_ReceiveData(SPIx) 接收数据 与发送数据必须在同一个 CS 周期中
