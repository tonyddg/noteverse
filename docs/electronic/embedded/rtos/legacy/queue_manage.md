---
order: 4
---

# 队列管理
![](./src/queue_example.webp)

## 全局变量和弊端
* 使用全局变量将导致线程不安全, 一种解决这个问题的方案就是采用队列
* 队列提供了一种任务间或者任务和中断间的通讯机制

## 队列
* 队列是先进先出 FIFO (First In First Out), 先进先出表示的是先写入的数据会先被读取
* 队列中的数据必须是相同类型的, 可以是基本类型也可以是结构体
* FreeRTOS 采用是复制队列的实现方式, 即写入队列的数据每个字节都被完整复制到队列, 不通过引用方式保存
* 如果使用指针管理队列, 可能指针的资源已被销毁, 但留在队列中导致错误
* 当一个任务试图从队列读取数据的时候, 它可以设置一个阻塞时间 (block time), 这是当队列数据为空时, 任务处于阻塞状态的时间, 当有数据在队列或者到达阻塞时间的时候，任务都会进入就绪状态
* ==将队列定义为全局变量, 各个任务通过队列传输数据==

## 队列操作方法
### 创建队列
```cpp
QueueHandle_t xQueueCreate(
    UBaseType_t uxQueueLength, UBaseType_t uxItemSize)
```
* uxQueueLength
队列包含数据的最大长度
* uxItemSize
每个数据占用的字节大小
* 函数返回值
    * QueueHandle_t 句柄类型, 表示的是对所创建队列的一个引用句柄
    * 没有足够的空间时, 返回 NULL

### 发送数据
```cpp
BaseType_t xQueueSend( 
    QueueHandle_t xQueue, 
    const void * pvItemToQueue,
    TickType_t xTicksToWait )
```
* 如果要在中断程序调用的话需要使用 xQueueSendFromISR() 函数
* xQueue
队列的句柄, 来自于 xQueueCreate() 的返回值
* pvItemToQueue
所发送数据的引用, 然后这些数据会被复制到队列中
* xTicksToWait
队列如果满时发送任务的阻塞时间, 单位为时间片节拍数, 如果设置为 portMAX_DELAY 的话任务将永远等待下去
* 返回值
发送数据成功时返回 pdPASS, 失败时返回 errQUEUE_FULL

### 读取数据
```cpp
BaseType_t xQueueReceive( 
    QueueHandle_t xQueue, 
    void * const pvBuffer,
    TickType_t xTicksToWait )
```
* xQueue
队列的具柄
* pvBuffer 
指向内存空间的一个引用, 读取的数据会被复制到这片内存
* xTicksToWait 
队列如果空时接送任务的阻塞时间
* 返回值
发送数据成功时返回 pdPASS, 失败时返回 errQUEUE_FULL

### 获取队列中的数据
```cpp
UBaseType_t uxQueueMessagesWaiting( 
    QueueHandle_t xQueue )
```

### CMSIS RTOS 的封装
1. 创建队列
osMessageQueueNew
1. 获取信息
    * osMessageQueueGet
    * 当 timeout 为 0 时允许从中断函数调用
1. 插入信息
    * osMessageQueuePut
    * 当 timeout 为 0 时允许从中断函数调用
1. [其他参考](https://blog.csdn.net/RootCode/article/details/106801936)

## 实例
1. 使用任务 1 检测扫描键盘输入, 使用任务 2 将键盘输入转为串口输出
1. 键盘输入共有四种信息, 其中键盘持续按下与持续松开的信息占主要
1. 如果把每次信息均插入队列, 这要求处理部分的处理速度更快, 否则队列将爆满
1. 由于按下与松开的信息并不是主要信息, 并且, 因此可以忽略, 只发送点击与释放的信息
1. 忽略这些信息后, 即保证了处理部分的速度可以慢于获取部分, 也避免了对无用信息的处理
1. 为了保证能够快速处理任务, 因此可以使用永久阻塞等待消息 (osWaitForever), 减少调度的消耗
