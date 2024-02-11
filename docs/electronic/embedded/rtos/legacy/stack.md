---
order: 2
---

# 堆与栈
## 简介
1. 栈 (stack): 由编译器自动分配和释放, 如存放函数的参数值, 局部变量的值
1. 堆 (heap): 一般由程序员分配和释放, 通过 new / delete 控制, 位于 SRAM 上

## 任务分配空间
1. 当调用 FreeRTOS 的创建任务 API 函数 xTaskCreate() 时, FreeRTOS会在堆中开辟出一块空间, 用于存放任务的控制信息 TCB 块和栈区 Stack 用于储存任务相关的变量
1. TCB 块的大小取决于 FreeRTOSConfig.h 头文件中的设置
    1. 在最小的设置下TCB块的大小是 96 字节
    1. 如果 configUSE_TASK_NOTIFICATIONS 是1的话再增加8个字节
    1. 如果 configUSE_TRACE_FACILITY 是1的话再增加8个字节
    1. 如果 configUSE_MUTEXES 是1的话再增加8个字节

## MSP 和 PSP 栈指针
### MSP 指针
* 主堆栈指针 (Main stack pointer)
* 用于操作内核以及处理异常和中断
* 由编译器分配

### PSP 指针
* 用于每个任务的独立的栈指针, 用于用户的任务
* 在任务调度上下文切换 (context switch) 中，PSP 会初始化为相对应的任务的栈指针，如下图所示

## 内存池分配
* 当 FreeRTOS 需要 RAM 的时候，它会调用 pvPortMalloc 这个函数而不是 malloc 这个系统函数
* 当它需要释放内存的时候，会调用 vPortFree 这个函数而不是 free 这个系统函数
* FreeRTOS 提供了五个 pvPortMalloc 和 vPortFree 的实现方案
* 可以在 CubeMX 中, FreeRTOS -> Config Parameters -> Memory Management Setting 中设置
* 由于通常的 free 与 malloc 不可使用, 在 C++ 中, 需要重载 new 与 delete, [参考](https://blog.csdn.net/qq_34269632/article/details/115618386)

### 分配方案
1. Heap_1 适用于小型的嵌入式系统
只能在调度器启动之前创建任务和其它内核对象, 之后任务的内存分配在程序的运行周期中保持不变并且无法被释放
1. Heap_2 FreeRTOS 向旧版本兼容的方案
不推荐使用
1. Heap_3 基于标准库
使用标准库里的 malloc 和 free 函数，所以堆的大小由链接器配置决定, 使用场景不多
1. Heap_4 适用于通用的应用, 也是默认应用
由一个数组表示堆, 并把数组分割成小的内存块, 堆的大小由 configTOTAL_HEAP_SIZE 定义
1. Heap_5 类似于Heap_4
Heap_5 可以用不同的数组空间对内存进行分配, 使用 vPortDefineHeapRegions 函数指定额外空间

## 内存管理函数
1. size_t xPortGetFreeHeapSize(void);
获取堆中的剩余空间
1. size_t xPortGetMinimumEverFreeHeapSize(void);
获取堆的最小剩余空间, 可根据此设置堆大小, 只能在 Heap_4 或者 Heap_5 下调用
1. void vApplicationMallocFailedHook(void);
需要用户实现的回调函数, 在内存获取失败时调用
