---
order: 16
---

# 系统校正
## 串联校正
直接在开环传递函数上串联校正环节, 改善相位裕度与幅值裕度

### 相位超前校正
见 P193

#### 相位超前校正的传递函数
$$G(s)=\frac{Ts+1}{\alpha Ts+1},\alpha<1$$

经过校正 
1. 在 $\omega_{T1}=\frac{1}{T}$ 处的幅频曲线斜率增加 $20dB/dec$ 
1. 在 $\omega_{T2}=\frac{1}{\alpha T}$ 处的幅频曲线斜率减小 $20dB/dec$ (恢复到与未校正的曲线一致) 
1. $\omega_{m}=\frac{1}{\sqrt{\alpha} T}$ 左右的相位提前 (相位角增大)

#### 相位超前校正的作用
提升系统的相对稳定性和响应快速性, 但对稳态性能改善不大

### 相位滞后校正
见 P197

#### 相位滞后校正的传递函数
$$G(s)=\frac{Ts+1}{\beta Ts+1},\beta>1$$

经过校正 
1. 在 $\omega_{T1}=\frac{1}{\beta T}$ 处的幅频曲线斜率减小 $20dB/dec$ 
1. 在 $\omega_{T2}=\frac{1}{T}$ 处的幅频曲线斜率增大 $20dB/dec$ (恢复到与未校正的曲线一致) 
1. $\omega_{m}=\frac{1}{\sqrt{\beta} T}$ 左右的相位滞后 (相位角减小)

#### 相位滞后校正的作用
在基本上不影响原有动态性能的前提下, 提高系统的开环放大系数, 显著改善稳态性能

### 相位超前滞后校正
见 P200

#### 相位滞后校正的传递函数
$$G(s)=\frac{T_1s+1}{\alpha T_1s+1}\cdot\frac{T_2s+1}{\beta T_2s+1},\alpha<1,\beta>1$$

经过校正 
1. 在 $\omega_{T}=\frac{1}{\alpha T_1},\frac{1}{\beta T_2}$ 处的幅频曲线斜率减小 $20dB/dec$ 
1. 在 $\omega_{T}=\frac{1}{T_1},\frac{1}{T_2}$ 处的幅频曲线斜率增大 $20dB/dec$

#### 相位滞后校正的作用
同时改善系统的动态性能和稳态性能