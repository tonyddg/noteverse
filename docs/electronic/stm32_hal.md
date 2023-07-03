[待学习的资料](https://blog.csdn.net/qq_35787848/article/details/124512640)

# CubeMX
## 创建 EIDE 项目
### 创建 CubeMX 项目
1. 选择 MCU 型号
2. SYS -> 设置 Debug 方式
3. RCC -> 设置外部时钟(晶振)
4. 选择使用的外设 (仅 GPIO 可直接点击引脚设置)
5. 时钟配置 设置 HCLK 为最大(72MHz), 回车

### CubeMX 项目设置
1. Toolchain 设置为 Makefile
2. Application Structure 设置为 Advanced
3. Code Generator 中设置 仅复制必要库文件
4. Code Generator 中设置 为每个外设生成一个 .c/.h 文件

### 配置 EIDE 项目
1. 创建空 Cortex EIDE 项目
2. 将 CubeMX 项目复制到 EIDE 项目文件夹下
2. 构建器选择 GCC
3. 连接器脚本在根目录下 xxx.ld
4. 向项目资源添加虚拟文件夹 STARTUP
5. 向 STARTUP 文件夹添加根目录下的 startupxxx.s

### EIDE 项目属性
1. 包含目录 (可参考生成的 keil 项目中的 Inlude)
    * Inc
    * Drivers/CMSIS/Include
    * Drivers/STM32F1xx_HAL_Driver/Inc
    * Drivers/STM32F1xx_HAL_Driver/Inc/Legacy
    * Drivers/CMSIS/Device/ST/STM32F1xx/Include
2. 预定义宏 (可参考生成的 keil 项目中的 预定义宏 LL 库有区别)
    * STM32F103xE (与 startup 文件有关)
    * USE_HAL_DRIVER 

## 编辑项目
1. 打开 xxx.ioc 可再次求改项目
2. 修改完成后需要重新生成
3. 根据 main.c 的提示修改代码, 防止被覆盖

## C/C++ 混合编程
0. 构建器选项 -> 连接器选项 -> 添加 -lstdc++ 保证虚函数的使用
1. 保留 CubeMX 生成的 .c 代码
2. 通过 .c 代码运行 .h 中的通过 .cpp 定义的函数实现混合编程
3. 通过以下方式, 将函数与全局变量暴露给 .c
```c++
#ifdef __cplusplus
extern "C"{
#endif

// .c 定义的头文件
#include "stm32f1xx_hal.h"

// 函数
void cppDefFun();

// 全局变量
extern int c;

#ifdef __cplusplus
}
#endif
```

4. 使用宏规定哪些部分暴露给 .c 文件的部分使用
```c++
# ifdef __cplusplus
// 不暴露部分 如 class 定义等
# endif

#ifdef __cplusplus
extern "C"{
#endif
// 暴露部分
#ifdef __cplusplus
}
#endif
```

# HAL 库
[学习教程](http://www.openedv.com/forum.php?mod=viewthread&tid=309468&highlight=hal%BF%E2)

## 外设通用
### 外设句柄
1. HAL 库通过操作外设句柄以操作外设
1. 外设句柄类型通常为 XXX_HandleTypeDef
1. 外设句柄通用命名为 h + 外设名 + 序号
1. 通过 extern XXX_HandleTypeDef hxxxx1; 获取外设句柄

### IO 状态
1. IO 函数通常会返回 HAL_StatusTypeDef, 具有值   
    1. HAL_OK       = 0x00U
    1. HAL_ERROR    = 0x01U
    1. HAL_BUSY     = 0x02U
    1. HAL_TIMEOUT  = 0x03U

## GPIO
### HAL 常用操作
1. 设置引脚电平
```c
void HAL_GPIO_WritePin(GPIO_TypeDef* GPIOx, uint16_t GPIO_Pin, GPIO_PinState PinState);
```
2. 读取引脚的电平状态
```c
GPIO_PinState HAL_GPIO_ReadPin(GPIO_TypeDef* GPIOx, uint16_t GPIO_Pin);
```

## EXIT
可配合虚函数使回调更加灵活

### CubeMX 配置
1. 引脚模式选择为 GPIO_Exit
2. GPIO 模式中设置 EXIT 触发方式
3. NVIC 中启用中断
### HAL 操作
1. 未定义的函数 可以在此定义中断回调
```c++
void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)
```
2. 产生回调后清除中断标志
```c++
__HAL_GPIO_EXTI_CLEAR_IT(GPIO_Pin)
```

## UART
### DMA 发送数据
#### 使用注意
1. 使用 DMA 模式时, 需要在 DMA Setting 中, 使能相应的 DMA
1. 除了使能 DMA, 还要开启 UART 的中断
#### 发送流程
1. 使能相关中断, 并通过发送数据
1. 发送完成后进入中断
1. 关闭有关中断的使能
1. 进入回调函数 HAL_UART_TxCpltCallback(UART_HandleTypeDef* huart)

### DMA 接收数据
通常使用 HAL_UARTEx_ReceiveToIdle_IT/DMA 函数高效接收数据
#### IDLE 标志位
当总线空闲时, 将触发 IDLE 标志位, 通常 IDLE 标识在 ==RX 不再接收到数据时==触发 (RX 没有数据不会触发 IDLE 标志位), 因此可以通过判断 IDLE 标志位来判断接收是否结束

#### 接收流程
1. 使能相关中断并等待 RX 接收数据
1. RX 无法接收到数据时, 触发 IDLE 标识, 进入中断
1. 关闭有关中断使能
1. 进入回调函数 (注意带有接收数据信息) HAL_UARTEx_RxEventCallback(UART_HandleTypeDef* huart, uint16_t size)



