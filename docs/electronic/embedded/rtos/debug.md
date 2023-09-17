---
order: 8
---

# 调试选项

::: info
todo
:::

在正式 Release 时关闭
1. RECORD_STACK_HIGH_ADDRESS
1. GENERATE_RUN_TIME_STATS
1. USE_STATS_FORMATTING_FUNCTIONS

## 踩坑笔记
### 进入 HardFault
1. 检查对空间是否足够
1. 不能再内核启动前调用如 osDelay 等函数

### 内存释放出错
在任何 .cpp / .hpp 中, 必须将 new, new[], delete, delete[] 的全局重载导入并且作为第一个 include 的文件, 否则全局重载不会被调用, 特别是使用了 string 等 stl 容器, 以及编写与 rtos 无关的, 设计内存处理的库, 都必须先 include 有关全局重载
