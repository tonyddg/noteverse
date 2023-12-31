---
order: 12
---

# 电源管理
## 外设介绍
### 电源监控
芯片通过 VDD 引脚从外部获取电源

#### 上电复位与掉电复位
1. 当电源电压异常时, 芯片会保持在复位状态, 防止强行工作带来的后果
2. 当刚开始通电时 VDD < VPOR, 芯片处于掉电复位状态
3. 当 VDD > VPOR 后, 芯片处于正常工作状态
4. 当正常工作时, VDD < VPDR, 芯片处于掉电复位状态

#### 电压检测器 PVD
1. 除了自动检测, 还可以手动设置可编程电压检测器
2. 当电压低于 VPVD 时, 产生 PVD中断(EXTI16)
3. 可通过寄存器 PWR_CSR 设置 VPVD 等级(查表)

### 电源系统
1. VDDA 供电, 将 VDD 单独分出给 ADC 模块供电, 提高精度
2. 调压器供电, 为除了备份域与待机电路外的电路供电(1.8V), 包括内核, 外设, RAM
    1. 运行模式 1.8V 区域全功率运行
    2. 停止模式 1.8V 区域所有时钟关闭(外设停止运行), 但保留内核寄存器和 SRAM 的内容
    3. 待机模式 1.8V 区域完全断电, 所有内容丢失
3. 备份供电, 通过 VBAT 供电(实际上为一个 3V 纽扣电池), 为 LSE 振动器, RTC 及备份寄存器供电, 断电后保持运行

### 功耗模式
STM32 具有 运行, 睡眠, 停止, 待机四种模式
#### 唤醒方式
1. 模式 WFI(wait for interrupt) 下, 由中断唤醒
2. 模式 WFE(wait for event) 下, 由事件唤醒

#### 睡眠模式
1. 除 NVIC, 系统时钟外, 内核停止, 所有外设照常工作
2. 任意中断均可唤醒
3. 唤醒后, 先退出中断服务函数, 然后从进入睡眠处继续运行
4. SLEEPDEEP = 0, 调用 WFI 或 WFE 指令进入

#### 停止模式
1. 使用任意 EXTI 中断唤醒
2. 唤醒后需要等待 HSI 启动与模式切换
3. 唤醒后, 先退出中断服务函数, 然后从进入睡眠处继续运行
4. SLEEPDEEP = 1, PWR_CR 中位 PDDS = 0, 调用 WFI 或 WFE 指令进入

#### 待机模式
1. WKUP 上升沿, RTC 闹钟, 外部复位, IWDG 复位唤醒
2. 唤醒后需要等待芯片复位
3. 唤醒后相当于芯片复位, 从头开始执行代码

## 电源管理函数
1. __WFI() 从 WFI 模式进入睡眠
2. __WFE() 从 WFE 模式进入睡眠
3. PWR_PVDLevelConfig() 配置电压检测等级
