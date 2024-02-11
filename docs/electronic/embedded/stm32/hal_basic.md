---
order: 104
---

# HAL 库介绍
[学习教程](http://www.openedv.com/forum.php?mod=viewthread&tid=309468&highlight=hal%BF%E2)

## 基本使用
通过 `#include "stm32f1xx_hal.h"` 的方式引用 HAL 的库函数, 如果引用特定外设的头文件可能导致错误

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



