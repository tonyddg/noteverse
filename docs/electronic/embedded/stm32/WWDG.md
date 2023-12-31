---
order: 11
---

# 窗口看门狗 WWDG
## 外设介绍
与独立看门狗相同, 但是窗口看门狗具有上限(上窗口值)与下限(下窗口值)
只有在上下限之间喂狗才不会触发复位信号
如果过早或过晚喂狗, 都将产生错误
窗口看门狗有固定的下限为 0x40, 无法改变, 但上限可以改变

### 功能框架
#### 时钟
1. 窗口看门狗使用 PCLK1 时钟, 最大频率为 36MHz
2. 分频系数由寄存器 CFR 位 WDGTB 配置
3. 计数器周期 T = 1 / CNT_CK = Tplck1 * 4096 * (2 ^ WDGTB)

#### 计数器
1. 递减计数器最大为 7 位
2. 在计数器为 0x40 时产生 死前中断, 用于复位前保存数据
3. 上窗口值由寄存器 CFR 的位 W 设置, 其值必须大于 0x40, 否则无意义
4. 计数器重载值存在寄存器 CR 的位 T 中, 范围为 0x7F - 0x40

## CubeMX 配置
1. window value WWDG 的上窗口值
2. free-running downcounter value WWDG 的重载值
