---
order: 1
---

# 随机事件
## 随机事件的运算 P3
### 包含于
若 $A$ 发生必导致 $B$ 发生, 则称 $A$ 包含于 $B$ 
$$A\subset B$$
### 和(并)
当 $A$ 和 $B$ 至少一个发生, 记为 
$$A\cup B$$
当 $A, B$ 互斥时, 也可记为
$$A+B$$
### 交(积)
当 $A$ 和 $B$ 同时发生, 记为 
$$A\cap B$$ 
简记为 
$$AB$$

### 差
当 $A$ 发生而 $B$ 不发生, 记为 
$$A-B=A\overline{B}$$
### 互斥
$$AB=\empty$$
### 互逆
$$AB=\empty\;A\cup B=\Omega$$
则称 $AB$ 互逆
$$A=\overline{B}$$
### 并与交的分配律
$$A\cap(B\cup C)=(A\cap B)\cup(A\cap C)$$
$$A\cup(B\cap C)=(A\cup B)\cap(A\cup C)$$
#### 计算注意
$AB$ 并集中必定有 $B$
$$(A\cup B)\cap B=B$$
### 对偶定律
$$\overline{A\cup B}=\overline{A}\cap\overline{B}$$
$$\overline{A\cap B}=\overline{A}\cup\overline{B}$$
## 概率计算 P5
### 基本性质
$$1=P(\Omega)>P(A)\ge0$$
### 有限可加性
若 $A_n$ 两两不相容 
$$P(\mathop{\cup}\limits^{n}_{i=1}A_i)=\sum_{i=1}^{n}P(A_i)$$
eg.
$$A=A\overline{B}+AB\to P(A\overline{B})=P(A)-P(AB)$$
### 逆事件
$$P(A)=1-P(\overline{A})$$
### 单调性
$$A\subset B$$
$$P(A)\le P(B)$$
### 事件和公式
$$P(A\cup B\cup C)=P(A)+P(B)+P(C)-P(AB)-P(AC)-P(BC)+P(ABC)$$
### 事件的文字表述
有事件 $A_1,A_2,A_3,...A_n$
#### 至少
1. 至少一个发生 
$$C_1=A_1\cup A_2\cup...\cup A_n$$
2. 至少两个发生 
$$C_2=A_1A_2\cup ...\cup A_1A_n\cup...\cup A_{n-1}A_n$$
3. 至少 $n$ 个发生的情况同
#### 恰好
* 假设事件 $B_i$ 为 $A$ 中恰好有i个发生
* 至少一个发生即 
$$C_1=B_1\cup  B_2\cup...\cup B_n$$
* 至少两个发生即 
$$C_2=B_2\cup  B_3\cup...\cup B_n$$
* 恰好一个发生
$$B_1=C_1-C_2$$
## 事件的独立性
### 条件概率 P6
在 $A$ 发生的条件下, $B$ 发生的概率记为 $P(B|A)$
$$P(B|A)=\frac{P(AB)}{P(A)}$$
#### 推广
1. $$P(\overline{A}|B)=1-P(A|B)$$
2. $$P(A\overline{B}|C)=P(A|C)-P(AB|C)$$
3. $$P(A\cup B|C)=P(A|C)+P(B|C)-P(AB|C)$$
### 划分 P9
设 $A_n$ 两两互斥, 满足
$$1=P(A_1)+P(A_2)+...+P(A_n)$$
则称 $A_1,A_2,...,A_n$ 为 $\Omega$ 的一个划分
(可通过画图理解, 详见 3b1b 的有关视频)
#### 全概率公式
$$\begin{split} P(B)&=P(B|A_1)P(A_1)+P(B|A_2)P(A_2)+...+P(B|A_n)P(A_n)\\
&=\sum_{i=1}^n P(B|A_i)P(A_i)\end{split}$$
#### 贝叶斯公式
$$P(A_i|B)=\frac{P(B|A_i)P(A_i)}{P(B)}=\frac{P(B|A_i)P(A_i)}{\sum_{k=1}^n P(B|A_k)P(A_k)}$$
* $P(A_i)$ 先验概率
* $P(A_i|B)$ 后验概率
* 用于知 $P(A_i|B)$ 求 $P(B|A_i)$
### 独立性
==与互斥性区分==
1. A与B独立时有
$$P(AB)=P(A)P(B)\iff P(A|B)=P(A)$$
2. 相互独立
$$P(ABC)=P(A)P(B)P(C)\\P(AB)=P(A)P(B),\;P(AC)=P(A)P(C),\;P(BC)=P(B)P(C)$$
3. 两两独立
$$P(AB)=P(A)P(B),\;P(AC)=P(A)P(C),\;P(BC)=P(B)P(C)$$
## 解题步骤
1. 设事件A
2. P(A)=...
3. 回答