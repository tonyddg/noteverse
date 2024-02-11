---
order: 2
---
# RTOS HAL 笔记
推荐学习方法: 通过头文件查看所需的函数, 通过手册查看函数内容

## UART 使用
### 项目配置
* 启用 UART 外设
* 如果需要 DMA 功能, 除了启用 DMA 外设, 还需要启用 UART 中断
* 建议使用回调函数注册功能, 最大程度分离自动生成的代码与用户代码, 此功能须通过 Project Manager -> Advance Setting -> Register Callback 启用

### 有关函数
关于函数的具体内容建议参见官方手册

* `HAL_UART_RegisterCallback` 注册一般事件的回调函数, 如传输完成 (不包括传输事件)
* `HAL_UART_RegisterRxEventCallback` 注册传输完成事件的回调函数, 回调函数中还将包括接收到的数据
* `HAL_UART_Transmit_DMA` 基于 DMA 的数据发送  
推荐配合信号量与回调函数以检查传输是否完成
* `HAL_UART_Transmit` 阻塞数据发送  
由于该传输函数已经时阻塞的, 因此不需要检查是否完成
* `HAL_UARTEx_ReceiveToIdle_DMA` 基于 DMA 的数据接收, 直到 RX 空闲或缓冲区满  
推荐配合信号量与回调函数以检查传输是否完成, 且需要通过回调函数获取接收到的数据量
* `HAL_UARTEx_ReceiveToIdle_DMA` 阻塞数据接收, 直到 RX 空闲或缓冲区满  
由于该传输函数已经时阻塞的, 因此不需要检查是否完成, 且数据量将以指针的形式接收

## USB 虚拟串口使用
### 项目配置
* 首先在 Connectivity 中启用 USB
* 然后在 Middleware 中 USB_DEVICE, 并选择虚拟串口 Virtual Port Com
* 推荐使用时, 按情况减小缓冲区大小, 即设置 Class Paramenters -> USB CDC Rx/Tx Buffer Size
* 注意, USB 的初始化函数 `MX_USB_DEVICE_Init()` 并没被自动添加, 需要手动添加到 main 中 (一般放在其他外设初始化前)
* 使用前还需要下载有关驱动, 下载地址 <https://www.stmcu.com.cn/Designresource/detail/software/709654>

### 数据传输
* 使用时, 需要引用头文件 `usbd_cdc_if.h`
* 通过函数 `CDC_Transmit_FS` 阻塞发送数据, 发送成功时返回 `USBD_OK`
* 数据接收则需要通过修改 `usbd_cdc_if.c` 中的函数 `CDC_Receive_FS` 实现, 其中
    * 该函数的本质为一个在数据接收开始中断 (PCD) 中被调用的函数, 并通过该函数将数据写入缓冲区, 且该函数是可修改的
    * 该函数的参数 `uint32_t *Len` 为一个指向有效数据长度的指针 
    * 接收到的数据将保存在缓冲区 `uint8_t UserRxBufferFS[APP_RX_DATA_SIZE]` 中, 可通过 extern 访问缓冲区
    * 建议在函数 `CDC_Receive_FS` 末尾添加自定义的回调函数, 并在该回调函数中释放信号量与保存有效数据长度

## I2C 使用
### 项目配置
* 启用 I2C 外设
* 如果需要 DMA 功能, 除了启用 DMA 外设, 还需要启用 I2C 的两个中断 (event 与 error)
* 建议使用回调函数注册功能, 最大程度分离自动生成的代码与用户代码, 此功能须通过 Project Manager -> Advance Setting -> Register Callback 启用

### 有关函数
关于函数的具体内容建议参见官方手册

* `HAL_UART_RegisterCallback` 注册一般事件的回调函数, 如传输完成 (`HAL_I2C_MEM_TX_COMPLETE_CB_ID`)
* `HAL_I2C_Mem_Write` 基于 DMA 的数据发送  
推荐配合信号量与回调函数以检查传输是否完成
* `HAL_UART_Transmit` 阻塞数据发送  
由于该传输函数已经时阻塞的, 因此不需要检查是否完成
* `HAL_UARTEx_ReceiveToIdle_DMA` 基于 DMA 的数据接收, 直到 RX 空闲或缓冲区满  
推荐配合信号量与回调函数以检查传输是否完成, 且需要通过回调函数获取接收到的数据量
* `HAL_UARTEx_ReceiveToIdle_DMA` 阻塞数据接收, 直到 RX 空闲或缓冲区满  
由于该传输函数已经时阻塞的, 因此不需要检查是否完成, 且数据量将以指针的形式接收

