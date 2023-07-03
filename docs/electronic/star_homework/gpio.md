# GPIO

## 寄存器映射
存储器映射的内存单元起别名, 即内存映射
通过绝对地址或起别名的方式访问内存单元
``` c
//将绝对地址转为 unsigned int* 类型
//在通过 * 访问值
#define GBIOP_ORD   *(unsigned int*) (0x4001 0C0C)
GBIOP_ORD = 0xFF;
```
### 总线
1. APB1 挂载低速外设
2. APB2 与 AHB 挂载高速外设
3. GPIO 挂载在 APB2 的外设 - 通用输入输出端口, 控制引脚输出高低电频 
### 外设地址映射
Block2 => 总线基地址 => 外设基地址 => 外部寄存器

Block2(+0x4000 0000) =>  APB2 (+ 0x0001 0000) => GPIOB (+0x0000 0C00) => GPIOB_ODR(+0x0C)

通过一些列偏移得到寄存器基地址

### 寄存器说明
通过查找手册, 了解寄存器信息
![](https://raw.githubusercontent.com/tonyddg/icublog/main/electronic/stm32_src/pt.png)
1. 名称
(GPIOx_BSRR)(x=A...E) 寄存器名为 GPIOx_BSRR, 适用于 GPIOA...GPIOE
2. 地址偏移
GPIOx_BSRR 地址偏移为 0x10 表明, 寄存器对于外设基地址的偏移为0x18, 通过查找外设偏移等信息, 得到寄存器的基地址
3. 寄存器位表
表明寄存器存储单元(32位)中各位的名称及读写权限
r 表示只读, w 表示只写
没有 r, 不是不能读取, 只是读取无意义
3. 位功能说明
介绍寄存器每一位的作用

### 在 C 中封装寄存器
#### 总线与外设的基地址
1. 通过宏与各层偏移得到寄存器基地址
```c
// 外设基地址
#define PERIPH_BASE ((unsigned int)0x4000 0000)

// 总线基地址
#define APB1PERIPH_BASE PERIPH_BASE
#define APB2PERIPH_BASE (PERIPH_BASE + 0x0001 0000)
#define AHBPERIPH_BASE (PERIPH_BASE + 0x0002 0000)

// GPIO 外设基地址
#define GPIOA_BASE (APB2PERIPH_BASE + 0x0800)
#define GPIOB_BASE (APB2PERIPH_BASE + 0x0C00)
...

// 寄存器基地址
#define GPIOB_BSRR (GPIOB_BASE + 0x0800)
...

//访问GPIOB_BSRR, 并将寄存器第 16 位置 1
* (unsigned int *) GPIOB_BSRR = (0x01 << (16 + 0));

```

2. 封装寄存器列表
```c
typedef unsigned int    uint32;// 32位寄存器
typedef unsigned short  uint16;// 16位寄存器

// 按外设中各个寄存器的大小, 偏移定义对应结构, 便于访问
typedef struct
{
    uint32 CRL;
    uint32 CRH;
    ...
    uint16 LCKR;
} GPIOx // C 中定义类似C++的结构时需要使用此语法

//使用变量方式
GPIOx *GPIOB = GPIOB_BASE;
//使用宏方式
#define GPIOB ((GPIOx*) GPIOB_BASE)

// 通过结构访问
GPIOB-> CRL = 0xFFFF;
```

#### 操作寄存器的位
1. 对某位清零
```c
uint32 a = 0xFFFF;
a &= ~(0x01 << n);
```
以 n = 3 为例
* 0x01 << n 二进制 0x01 左移 3 位得到 1000b(0x08)
* ~(0x01 << n) 对 1000b 取反(uint32 变量) 得到 0xFFF7
* &= 令 a 与 0xFFF7 和运算, 由于 0xFFF7 第 3 位为 0, 实现使 a 的第三位置零 

2. 连续清零
```c
uint32 a = 0xFFFF;
a &= ~(0b1111 << 4);
```

同 1, 将第 5 - 8 位清零

3. 对寄存器的位赋值
```c
uint32 a = 0;
a |= (0x01 << n);
```

n = 3 时, 得到 0b1000;

4. 对位取反
```c
uint32 a = 0xF;
a ^= (0x01 << n);
```

n = 3 时, 得到 0b0111;

## 电路理论
[仿真结果](https://github.com/tonyddg/icublog/tree/main/electronic/stm32_src)

### 基本部分
1. 电源
    * VCC：C=circuit 表示电路的意思, 即接入电路的电压
    * VDD：D=device 表示器件的意思, 即器件内部的工作电压;
    * VSS：S=series 表示公共连接的意思，通常指电路公共接地端电压
2. 接地 GUN

### 端口
电路中的高电平与低电平需要通过与电源或接地的连接体现
电源 => 端口 高电平
端口 => 接地 低电平
其他情况在电路中不允许出现

当端口与电源连接时, 端口视为与接地连接了一个阻止为无穷大的电阻
与接地连接时同

### 上拉与下拉
![](https://raw.githubusercontent.com/tonyddg/icublog/main/electronic/stm32_src/pull_up_down.png)
#### 上拉电路
<div id="pullup_figure"></div>

1. 开关断开时, 上拉电阻 R1 与 端口串联, 端口视为一个电压无限的的电阻, 因此上拉电阻分压为 0, 端口为高电平
2. 开关闭合时, 端口与开关通路并联向接地, 端口电压与通路相同, 由于通路上电阻为零, 并联电路等效电阻即为 0, 即端口被短路, 为低电平

* 上拉电阻可以在开关闭合时分得电源向接地的电压 (上拉电阻与零电阻的端口并联电路串联)
* 开关另一侧不能有电阻, 否则开关闭合时, 端口不会短路, 产生未知电平

#### 下拉电阻
<div id="pulldown_figure"></div>

1. 开关断开时, 下拉电阻 R2 与 端口串联, 端口为低电平
2. 开关闭合时, 端口与下拉电阻并联, 端口电压与下拉电阻相同, 由于电源为通路, 端口与下拉电阻并联部分的电路分得电源电压, 为高电平

* 下拉电阻可以在开关闭合时分得电源向接地的电压, 使端口也能获得高电平
* 开关另一侧不能有电阻, 否则开关闭合时, 端口与下拉电阻并联部分不能分得全部电压, 产生未知电平

### 推挽输出
<div id="pullpush_figure"></div>

![](https://raw.githubusercontent.com/tonyddg/icublog/main/electronic/stm32_src/push_pull.png)
1. 输入高电平时, Q3 开启, Q4 关闭, 电源向负载导通
2. 输入低电平时, Q3 关闭, Q4 开启, 电源接地, 负载被短路
用于快速切换开关时

### 开漏输出
<div id="opendrain_figure"></div>

![](https://raw.githubusercontent.com/tonyddg/icublog/main/electronic/stm32_src/drain.png)
1. 输入高电平时, Q5 开启, 电源接地, 负载被短路
2. 输入低电平时, Q5 关闭, 电源向负载导通, 并经过上拉电阻
可以用于线与功能

### 线与
![](https://raw.githubusercontent.com/tonyddg/icublog/main/electronic/stm32_src/line_and.png)
线与既仅通过线路的连接实现 and 运算的功能
1. 左侧两个开漏输入部分均为高电平, 连接端口后, 输出高电平
2. 右侧上方的开楼漏输入部分为低电平, 下方为高电平, 低电平一侧与接地直接导通, 导致总端口被短路, 为低电平

## GPIO 库函数

### 初始化
使用结构体 GPIO_InitStructure 定义初始化信息
```C++
struct GPIO_InitStructure
{
    //初始化的引脚
    //使用宏 GPIO_Pin_x 作为参数
    std::uint16_t GPIO_Pin;

    //设置模式
    //f10x GPIO_Mode_In/Out_xxx 设置为输入/输出/复用等
    //f4xx GPIO_Mode_IN/OUT
    enum GPIO_Mode;

    //设置引脚速率
    //使用宏 GPIO_Speed_xxx 作为参数
    enum GPIO_Speed

    //设置引脚上拉/下拉
    //参数 GPIO_PuPd_UP / GPIO_PuPd_DOWN / GPIO_PuPd_NOPULL
    //仅用于 STM32F4XX
    enum GPIO_PuPd

    //设置输出模式
    //有推挽与开漏两种
    //仅用于 STM32F4XX
    enum GPIO_OType
};
```

void GPIO_Init(GPIO_TypeDef* GPIOx, GPIO_InitTypeDef* GPIO_InitStruct)
执行初始化

1. GPIOx 为初始化端口的寄存器地址 , 可以直接使用 GPIOx 作为参数(已定义的端口宏)
2. GPIO_InitStruct 为初始化信息结构体的地址

### 电平控制
void GPIO_SetBits(GPIO_TypeDef* GPIOx, uint16_t GPIO_Pin)
设置指定阵脚为高电平
void GPIO_ResetBits(GPIO_TypeDef* GPIOx, uint16_t GPIO_Pin)
设置指定阵脚为低电平

### 读取
uint8_t GPIO_ReadInputDataBit(GPIO_TypeDef* GPIOx, uint16_t GPIO_Pin)
读取指定阵脚的电平

### 时钟初始化
void RCC_XXXXPeriphClockCmd(uint32_t RCC_XXXXPeriph, FunctionalState NewState)
初始化指定总线与端口的 RCC 时钟, 保证 GPIO 正常工作 
查询芯片 GPIO 所在的桥进行初始化

1. RCC_XXXXPeriph 初始化的RCC, 使用宏 RCC_XXXXPeriph_GPIOx 作为参数
2. NewState 设置状态, 初始化则使用 ENABLE

### 模式
#### 开漏输出
[电路原理](#opendrain_figure)
OUT_OD 可实现线与功能, 主要用于 I^2^C 中的总线
在高频的驱动电路中，噪声很高
#### 推挽输出
[电路原理](#pullpush_figure)
OUT_PP 可以实现快速开启与关闭 常用于输出高/低电平
#### 复用开漏输出
AF_OD
用于 STM32 内部的 I^2^C 外设
#### 复用推挽输出
AF_PP
用于 STM32 内部的 SPI, USART 等外设
#### 浮空输入
IN_FLOATING 端口直接与输入连接, 此时默认输入电平不确定, 因此输入端最好接地或接 VCC
#### 上拉输入
[电路原理](#pullup_figure)
IPU 默认输入高电平, 当输入低电平时变为低电平
#### 下拉输入
[电路原理](#pulldown_figure)
IPD 默认输入低电平, 当输入高电平时变为高电平
#### 模拟输入
AIN 端口直接与 ADC 模块连接, 且不进行任何转换, 不使用时, 功耗最低

## 简单应用
stm32f103 库函数 led 灯驱动
### bsp_led.h
```c
#ifndef __BSP_LED_
#define __BSP_LED_

#include <stdint.h>

#ifndef __cplusplus  
typedef uint8_t bool;
#endif

#define false 0
#define true 1

#ifndef NULL
#define NULL 0
#endif

#include "stm32f10x_gpio.h"
#include "stm32f10x_rcc.h"

typedef struct
{
    GPIO_TypeDef * _port;
    uint16_t _pin;

    bool _is_open;
}LEDControl;

LEDControl* LEDInit(GPIO_TypeDef * port, uint16_t pin, uint32_t _clk);
bool LEDClose(LEDControl* lc);
bool LEDOpen(LEDControl* lc);
bool LEDSwitch(LEDControl* lc);
void LEDDestroy(LEDControl* lc);

#endif
```

### bsp_led.c
```c
#include "bsp_led.h"

const GPIO_InitTypeDef LED_Default_IT = {NULL, GPIO_Speed_50MHz, GPIO_Mode_Out_PP};

LEDControl* LEDInit(GPIO_TypeDef * port, uint16_t pin, uint32_t _clk)
{
    GPIO_InitTypeDef initInfo = LED_Default_IT;
    LEDControl* lc = malloc(sizeof(LEDControl));
    //外设时钟 (APB2桥)
    RCC_APB2PeriphClockCmd(_clk, ENABLE);
    //设置引脚
    initInfo.GPIO_Pin = pin;

    GPIO_Init(port, &initInfo);
    GPIO_SetBits(port, pin);

    lc->_port = port;
    lc->_pin = pin;
    lc->_is_open = false;

    return lc;
}

bool LEDClose(LEDControl* lc)
{
    if(lc->_is_open)
    {            
        GPIO_SetBits(lc->_port, lc->_pin);
        lc->_is_open = false; 
        return true;
    }
    else
    {
        return true; 
    }
}

bool LEDOpen(LEDControl* lc)
{
    if(lc->_is_open)
    {
        return false;
    }
    else
    {
        GPIO_ResetBits(lc->_port, lc->_pin);
        lc->_is_open = true; 
        return true; 
    }
}

bool LEDSwitch(LEDControl* lc)
{
    if(lc->_is_open)
    {            
        GPIO_SetBits(lc->_port, lc->_pin);
        lc->_is_open = false; 
        return true;
    }
    else
    {
        GPIO_ResetBits(lc->_port, lc->_pin);
        lc->_is_open = true; 
        return false;
    }
}

void LEDDestroy(LEDControl* lc)
{
    free(lc);
}
```

### main.c
```c
#include "bsp_led.h"

int main()
{
    uint32_t i = 0;
    LEDControl* lc = LEDInit(GPIOB, GPIO_Pin_5, RCC_APB2Periph_GPIOB);
    LEDControl* lc2 = LEDInit(GPIOE, GPIO_Pin_5, RCC_APB2Periph_GPIOE);
    LEDOpen(lc);

    while(1)
    {
        LEDSwitch(lc);
        LEDSwitch(lc2);

        for(i = 0; i < 0xfffffu; i++)
        {}
    }

    LEDDestroy(lc);
    LEDDestroy(lc2);
    return 0;
}
```
