---
order: 100
---

# Cube MX 与项目配置
[待学习的资料](https://blog.csdn.net/qq_35787848/article/details/124512640)

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
```cpp
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
```cpp
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

## 踩坑笔记
### EIDE
1. 烧录配置中 接口属性使用 cmsis-dap.cfg
2. debug 出错时, 检查是否勾选选项中的 将 axf 转为 elf
3. debug 前先烧录程序
4. 使用 ADC连续转换+DMA 可能会导致无法烧录的 bug, 需要在烧录前关闭此功能或关闭ADC连续转换功能

