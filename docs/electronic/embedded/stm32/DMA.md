---
order: 5
---

# 直接存储器访问 DMA

## 外设介绍
直接存储器访问
传输数据, 但不占用 CPU, 可以访问外设, FLASH, SRAM 等存储器

### DMA 控制器
DMA 控制器下由多个通道, 联系各个存储器与外设(查表)
每个通道可以接收多个请求, 但一次只能处理一个请求
有多个请求时, 通过寄存器设置, 确定处理顺序

## 标准库配置
### DMA 初始化结构体
1. DMA_PeripheralBaseAddr 外设地址
通过 & 获得外设地址(eg. &(USART1->DX))
2. DMA_MemoryBaseAddr 存储器地址
存储器地址, 即一个变量/数组的地址
3. DMA_DIR 传输方向
Peripheral/MemoryDST 以外设/存储器作为传输目的地
4. DMA_BufferSize 传输数据量
5. DMA_PeripheralInc 外设地址增量模式
ENABLE 增量模式, 每次传输后, 地址移动一位
6. DMA_MemoryInc 储存器地址增量模式
7. DMA_PeripheralDataSize 外设数据宽度
可选择 Byte(8位), HalfWord(16位), Word(32位)
8. DMA_MemoryDataSize 存储器数据宽度
通常与外设数据宽度一致
9. DMA_Mode 模式选择
一次传输(Normal)或循环传输(Circular)
10. DMA_Priority DMA 优先级
High Medium Low 等
11. DMA_M2M 是否为存储器到存储器模式
ENABLE 为开启, 此时 外设视为另一个存储器, 用于复制大数据量的数组(DMA 传输不占用 CPU)

### 启动配置
0. DMA 的时钟配置
1. DMA_Init(通道, 配置) 初始化配置
注意, 非 M2M 中, 选择通道时必须先检查通道是否支持所用的外设
2. DMA_Cmd(通道, ENABLE) 启动 DMA 传输
当再次启动时(一次模式), 需要先关闭(DISABLE)
3. XXX_DMACmd 启动传输, 除了 M2M 模式之外, 都必须使用此类函数启动, 再次使用时则要先关闭再启动(一次模式)
使用外设时还要保证外设相关的外设已初始化

### 状态检查
* n 控制器编号
* x 使用通道
1. DMAn_FLAG_TCx 传输完成标识
2. DMAn_FLAG_HTx 传输一般标识
3. DMAn_FLAG_TEx 传输错误标识 
