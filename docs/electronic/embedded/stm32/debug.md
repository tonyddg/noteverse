---
order: 99
---

# 踩坑笔记与 bug 诊断
## C 部分
### 定义结构体
c 为面向过程语言, 没有类
通常定义结构需要使用语法
```c
struct [struct类型] 变量名;
```

使用 typedef 可以避免
```c
typedef struct
{
    ...
}example1;

// 使用 typedef 不需要 struct
example1 a;

struct example2
{
    ...
};

// 需要 struct 标记
struct example2 b;
```

### 二进制/十六进制字面量
```c
unsigned a = 0xFFFF;// 十六进制字面量

unsigned b = 0b1110111;// 二进制字面量
```

字面量默认为 int 型, 直接与 uint8/16 加减将溢出, ==使用字面量时(特别是作为二进制命令), 在最后加上 u, eg. 0xB1u== 

### 逻辑
比较两个逻辑量是否相等时, 应用异或 boolA ^ boolB , 或转为数字, 比较是否相等

### 头文件引用
1. 避免循环引用, 如在 a.h 中 不能有 include "a.h"
2. 避免隐式的循环引用, 如在 a.h 中 include "b.h", b.h 中 include "a.h"

## C++ 部分
### 类型转换
为了兼容 HAL 库, 必须做出部分特殊的强制类型转换
1. const_cast 丢弃 const 属性
1. reinterpret_cast 以任意字长读取 (解除类型字长限制)

### __weak 修饰
注意 __weak 修饰的函数会自动寻找内部连接性的函数, 因此可以不 #include 相关头文件, 直接在 .cpp 内定义, 但需要使用 extern "C" 修饰

## 电路部分
### 电源
1. PCB 上结号编号表示等位点, 结号编号相同的两个点为并联关系的等位点
当核心板任意一个 5V Vcc 节点与电源连接, 即所有 5V Vcc 节点与电源连接, 具有 5V 的电压
通过降压芯片, 使所有 3.3V Vcc 获得 3.3V 电压
2. 任何非 5V 的电源不能与 5V Vcc 节点连接, 必须通过降压芯片

### 引脚不能供电
引脚通过核心芯片引出, 不能作为电源, 否则当电流过大, 会烧坏芯片

## 库函数部分
### 初始化外设
1. 库函数均通过 XXX_InitTypedef 与 XXX_Init 实现初始化
2. 初始化的选项必然为 XXX_InitTypedef.(成员名) = (成员名)_(初始化选项)

### 标志的使用
1. 使用 XXX_GetFlagStatus(一般) / XXX_GetITStatus(中断) 获取标志信息 RESET 表示 0, SET 表示 1
2. 通过 XXX_GetFlagStatus / XXX_GetITStatus 获得标志后, 必须使用 XXX_ClearFlag/XXX_ClearITPendingBit

## BUG 诊断部分
### 通用
1. 任何需要初始化的函数是否在程序中调用 是否调用了 XXXInit/EnableXXX
2. 使用外设时, 先完成各项设置/数据装载(eg. SPI 选择设备) 后, 再对外设使能(EnableXXX); 先关闭外设(DisableXXX), 再进行各项设置
### 库函数
1. 是否正确初始化时钟 RCC_XXXPeripheralClockCmd
2. 重复使用由 XXX_Cmd(XXX, ENABLE) 开启的功能时(如 DMA), 必须先调用 XXX_Cmd(XXX, DISABLE) 关闭后再开启
3. 将 GPIO 设置为输入/复用/重映射/EXITn时, 需要启动 AFIO 功能 RCC_APB2PeriphClockCmd(RCC_APB2Periph_AFIO,ENABLE);
### Cube
1. 检查外设的初始化方式是否正确
2. 使用外设前需要先调用 LL_XXX_Enable
### 中断
1. Cube 中是否添加了 NVIC
2. 代码中中断是否使能
3. UART 中的 TXE 中断最好仅在必要时开启
### 语言
1. 使用 C++ 时, 所有 C 部分均要使用 extern "C" 修饰(直接对 include 使用即可)
2. 使用十六进制码表示指令时, 在末尾加上 u 修饰, 表示为无符号
3. 调试中如果进入 HardFault_Handler 时, 根据调用堆栈判断出错位置
4. 使用标准库时, 其中的 stm32f10x_it.c/h 不能注释里面已定义的中断函数
5. 使用 DMA 时, 将数组作为传输地址时, 注意数组名即数组地址, 不需要再取地址
6. 使用外设时, 遵守 载入数据 - 启动外设 - 关闭外设 - 读取数据 的原则
7. ==不能保证结果大于 0 时, 避免无符号整型相减==
