---
order: 9
---

# 电压采集 ADC

## 外设介绍
### ADC 基本功能
#### 电压采集
ADC 电压采集范围为 $$V_{Ref-}\le V_{In}\le V_{Ref+}$$
通常 $V_{Ref-}$ 接地, $V_{Ref+}$ 接 3.3V, 因此范围为 $$0V\sim 3.3V$$
#### 输入通道
一个 ADC 外设有多个通道, 每个通道对应不同的 IO 口, 还有内部通道链接内部的 $V_{SS}$ 与 温度传感器, 具体查表
#### 规则通道转换顺序
转换顺序由寄存器 SQR1,2,3 的位 SQn 决定, 寄存器中存放第 n 个转换的通道, SQR3 中的 SQL 还存放要转换的通道数
#### 注入通道转换顺序
注入通道能在规则通道转换时插队, 由寄存器 JSQR 决定, 顺序与 SQn 相反, JSQ4 存放的通道编号最先转换
#### 触发源
1. ADC_CR2 中 ADON 位可控制转换的开始与结束
2. 还可具体设置触发源, 注入通道与规则通道分别设置
#### 转换时间
1. ADC 时钟由 PCLK2=72MHz 经分频产生, 最大为 14MHz, 但分频最大只能为 12MHz
2. 通道 0~9 与 10~17 的采样周期分别由 ADC_SMPR2,1 控制, 最快为 1.5 个周期 T
3. 转换时间 $T_{conv}=采样时间+12.5T$, 因此最快情况下 $T_{conv}=14T=14/14MHz=1\mu s$
4. 由于分频限制, 实际最快周期为 12MHz, 因此实际最快采样时间为 $1.17\mu s$
#### 数据存储
1. 仅有一个 32 位的数据寄存器 ADC_DR 存放规则通道的采样结果, 当有多个通道将覆盖
2. 低 16 位存放 ADC1,2,3 其中一个的结果, 高 16 位在开启 ADC1 双通道模式下, 存放 ADC2 结果
3. 为了防止覆盖, 通常将采用 DMA 保存结果
4. 注入通道有 4 个寄存器存放结果, 不会覆盖
#### 中断
1. 转换结束中断
2. 模拟看门狗中断 当电压低于/高于阈值时触发中断
3. DMA 请求 仅 ADC1,3 可使用 DMA
#### 电压转换
ADC 精度为 12 位, 在默认 3.3V 情况下, 计算公式有
$$Y=3.3\times X/2^{12}$$

## 库函数配置
### ADC 初始化结构体
1. ADC_Mode 配置 ADC 模式, 仅使用一个 ADC 时为单通道模式, 或可使用双通道及其他细分模式
2. ADC_ScanConvMode 是否扫描, ENABLE/DISABLE 设置, 有多个通道时启用
3. ADC_ContinuousConvMode 是否连续采样, ENABLE/DISABLE 设置, 关闭时要手动控制才能多次采样
4. ADC_ExternalTrigConv 外部触发选择, 通常为软件自动触发
5. ADC_DataAlign 对齐模式, Right/Left, 通常为右对齐模式
6. ADC_NbrOfChannel 转换通道数, 根据实际设置
### ADC 库函数
#### 校准寄存器
使用 ADC 前必须先进行校准
1. 准备校准寄存器
ADC_ResetCalibration(SC_ADC);
2. 等待校准寄存器准备就绪
while(ADC_GetResetCalibrationStatus(SC_ADC));
3. 开始校准
ADC_StartCalibration(SC_ADC);
4. 等待校准完成
while(ADC_GetCalibrationStatus(SC_ADC));
#### 设置通道
配置通道 设置采样周期为
ADC_RegularChannelConfig(ADCx, 采样通道, 通道次序(从1开始), 采样周期);
#### 采样结束事件
1. ADC_IT_EOC 规则通道采样结束中断
2. ADC_IT_JEOC 注入通道采样结束中断
