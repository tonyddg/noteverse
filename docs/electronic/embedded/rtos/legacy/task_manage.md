---
order: 3
---

# 任务管理
## 任务
在FreeRTOS中, 线程 (Thread) 和任务 (Task) 的概念是相同的, 每个任务就是一个线程

## 任务基本模式
```cpp
void TaskFunction( void *pvParameters )
{
    for(;;)
    {
    }
    vTaskDelete(NULL);  
}
```
* 这个任务函数不能有返回值 (即使用return语句), 不然会导致异常
* 如果不需要这个任务的话, 必须要用语句显示地删除这个任务 (比如调用vTaskDelete()这个函数)
* 任务具有以下状态
    1. 就绪状态 (Ready)
    当任务没有被阻塞或者挂起等待运行的时候处于此状态
    1. 运行状态 (Running)
    当任务被内核调度执行的时候处于此状态
    1. 阻塞状态 (Blocked)
    当任务等待某个事件或信号的时候处于此状态
    1. 挂起状态 (Suspended)
    当任务被 vTaskSuspend() 函数禁止运行的时候处于此状态

<!-- ![](./src/task_schedule.jpg) -->

## 任务的优先级
* 任务的优先级可以用 vTaskPrioritySet() 函数设置 
* FreeRTOSConfig.h 头文件中的 configMAX_PRIORITIES 可以设置最高优先级的值
* 在 FreeRTOS->Tasks and Queues 中可以单独设置任务的优先级

## 任务的创建
任务由 FreeRTOS 中 xTaskCreate() 函数创建
```cpp
BaseType_t xTaskCreate( TaskFunction_t pvTaskCode,
                        const char * const pcName,
                        uint16_t usStackDepth,
                        void *pvParameters,
                        UBaseType_t uxPriority,
                        TaskHandle_t *pxCreatedTask );
```
1. pvTaskCode
一个函数指针, 指向执行任务的函数
1. pcName 
任务的描述名称, 方便调试, 不用的话可以设为 Null
1. usStackDepth
每个任务有自己的栈空间, 这里根据任务占用需求设置栈空间的大小, 单位是字 (Word)
1. pvParameters
用于传递给任务的参数, 不用的话可以设为Null
1. uxPriority
设置任务的优先级, 范围由 0 到 (configMAX_PRIORITIES – 1)。数值越大, 等级越高
1. pxCreatedTask
任务的句柄
1. 函数的返回值
    1. pdPass表示任务创建成功
    1. pdFail表示创建失败
* 每执行 xTaskCreate() 创建一个任务便会在堆空间中开辟一个TCB块和一个存放数据的Stack栈区
* STM32CubeIDE 中, 负责创建任务的函数是 osThreadNew()

## 调度器
* FreeRTOS 中采用了 round-robin 的调度算法, 包含抢占式 (preemptive) 和合作式 (cooperative) 两种模式
* 模式的选择在 FreeRTOSConfig.h 中由参数 configUSE_PREEMPTION 决定

### 抢占式模式
在抢占式模式下, 在每次调度器运行时, 高优先级的任务会被切换优先执行, 当前处于运行状态的低优先级的任务则会立刻进入就绪状态等待运行

### 合作式模式
在合作式模式下, 高优先级任务不会抢占当前正在运行状态的低优先级任务, 直到低优先级任务进入以下状态才会切换任务
1. 完成进入阻塞状态 (比如调用 osDelay() 函数)
1. 就绪状态 (比如调用 osThreadYield() 函数)
1. 被系统置于挂起状态后

### 抢占式无时间片调度
* 需要设置 configUSE_TIME_SLICING 以关闭时间片
* 这种调度方式下, 因为没有采取时间片, 所以调度器的执行开销会比较小
* 在抢占式无时间片调度下, 当前运行的任务会一直运行, 直到它进入阻塞或者挂起状态, 另一个相同优先级的任务才会运行

## 任务的调度
* FreeRTOS 对任务的调度采用基于时间片 (time slicing) 的方式
* 即把一段时间等分成了很多个时间段, 在每个时间片结束后, 进入内核调度任务, 保证优先级最高的任务能执行或使相同优先级的轮流使用每个时间段占用 CPU 资源
* 时间片的大小由参数 configTICK_RATE_HZ 设置
* 因此, 在 FreeRTOS 内时间的最小单位是一个节拍 (tick), 延时函数 vTaskDelayUntil 和 vTaskDelay 的参数需要的是延时的节拍数, 不能直接设置延时时间
* 可以使用函数 pdMS_TO_TICKS() 将时间转为节拍数

## 空闲任务
* 空闲任务是调度器在 vTaskStartScheduler 函数调用启动后自动创建的一个任务
* 空闲任务具有最低的优先级0, 当用户创建的任务都在阻塞状态或挂起状态时, 空闲任务便得以执行
* 最低的优先级确保空闲任务不会抢占用户任务, 同时空闲任务负责清理内核的资源
* 空闲任务可以绑定一个钩子任务 (Task Hook), 当空闲任务运行的时候钩子任务也会被自动调用
* 钩子任务的函数原型是 vApplicationIdleHook( void ), 可以由用户定义
