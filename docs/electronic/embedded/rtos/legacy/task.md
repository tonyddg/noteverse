---
order: 1
---

# 创建任务

## 启用 RTOS
1. 在 Middleware->FreeRTOS的选项卡中, 可以启用 RTOS
1. 使用 CMSIS-RTOS V2 API
1. 在 Tasks and Queues 选项卡中创建任务, 第一个默认任务不修改

## 任务属性
1. Task Name: 设置任务的名称, 它会基于此名字建立一个指向任务的句柄
1. Priority: 设置任务的优先级, 高优先级的任务会抢占低优先级的任务
1. Stack Size: 设置任务栈的大小, 用于储存任务相关的变量
1. Entry_Function: 设置任务的入口函数
1. Allocation: 设置任务所在的地方, 选择动态的话是生成在堆中, 选择静态的话则生成在静态区
1. Parameter: 传递给任务的参数
1. Code Generation Option: 设置任务函数的生成方式, 如果需要使用 C++, 则因设置为 as extern, 在外部定义任务函数

## 任务堆栈占用情况
1. 一个任务包含Stack区 (用于储存任务相关的变量) 和任务控制块TCB区 (Task Control Block, 用于储存任务本身的设置)
1. FreeRTOS Heap Usage 选项卡中, 可以查看堆栈使用情况
1. 任务占用字节数 = TCB_size + (4 x Task stack size)

## 编辑任务函数
1. CubeMX 将任务函数生成于 Src/freertos.c 中
1. 通过函数 osKernelStart() 启动 RTOS 任务调度 (CubeMX 已经自动在 main 中调用此函数了)
1. 各个线程之间耦合程度低, 日后对项目进行维护时只要对相关的线程程序进行修改就行了
1. 在任务中, 一般使用 osDelay 用于延时, 参数单位为系统刻 (一般即 1ms), 而非 HAL_Delay
