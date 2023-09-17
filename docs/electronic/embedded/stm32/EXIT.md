---
order: 3
---

# 外部中断 EXIT

## 外设介绍
位于 APB2 总线上的外部中断控制器
EXITn 通过检测某个引脚 (PXn) 的电平上升/下降, 产生中断/事件, n > 15 时为其他特殊事件(查表)

## 标准库配置
### EXIT 初始化
1. EXIT_Line 中断/事件线 EXITn, n = 0 ~ 19
2. EXIT_Mode EXIT 模式, Interrupt 中断模式, Event 事件模式
3. EXIT_Trigger 触发类型 Rising 沿上升沿触发 Falling 沿下降沿触发
4. EXIT_LineCmd 启动/关闭中断 Enable/Disable

* 使用 EXITn 前, 要先使用 NVIC 使能 EXITn 的中断服务
* 使用 GPIO_EXITLineConfig(GPIO_PortSourceGPIOx, GPIO_PinSourceN); 使 EXITn 检测 PxN 引脚
* 触发中断后使用 EXIT_ClearITPendingBit(中断标识) 清除中断标识

## HAL 库配置
可配合虚函数使回调更加灵活

### CubeMX 配置
1. 引脚模式选择为 GPIO_Exit
2. GPIO 模式中设置 EXIT 触发方式
3. NVIC 中启用中断
### HAL 操作
1. 未定义的函数 可以在此定义中断回调
```cpp
void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)
```
2. 产生回调后清除中断标志
```cpp
__HAL_GPIO_EXTI_CLEAR_IT(GPIO_Pin)
```