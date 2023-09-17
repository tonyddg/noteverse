---
order: 102
---

# 标准库的基本知识

## 标准库项目管理
### 准备文件
1. 选择对应型号 搜索 标准外设库 获取标准外设文件
[ST官网](https://www.st.com/zh/microcontrollers-microprocessors/)
2. 安装 ST-LINK/V2 驱动
[下载地址](https://www.st.com/en/development-tools/stsw-link009.html)

### 手册查询
1. 开发板原理图 => 引脚分配表 查询引脚功能
2. STM32参考资料 => STM32F4xx中文参考手册 查询寄存器信息
4. STM32F4xx中文参考手册 => 存储器映射 查询各外设的基地址
5. 参考手册其他章节 => 查询外设寄存器的地址与功能
(4 查询外设基地址 5 查询寄存器相对于外设的偏移地址)

## STM32 标准库
下载对应芯片的标准外设库
[ST官网](https://www.st.com/content/st_com/zh.html)
产品 => 微控制器与微处理器 => 选择对应型号 => 工具与软件 => 搜索 标准外设库

### 标准库结构
1. Libraries
固件库等的源代码及启动文件
2. Project
驱动库的例子与工程模板
3. Utilities
官方实验板的范例程序
4. xxx.chm
库函数说明

#### Libraries\CMSIS
1. .\CoreSupport\core_cmx.h(c)
    * 内核寄存器映射
    * 包含 stdint.h 定义 uint16_t 等类型

2. .\Device\ST\STM32F4xx\Source\Templates\arm
    * 文件启动
    * 后缀 nd 表示根据芯片容量选择

3. stm32f10x.h
    实现芯片上外设的寄存器映射

4. system_stm32f10x.c
    * 实现 stm32 的时钟配置 默认 72MHz
    * SystemInit 在此调用

#### Libraries\xxxDriver
1. inc 与 src
    包含了各个外设的头文件与源文件, 可根据需要选用

2. stm32f10x_it.c
    中断服务函数

3. system_stm32f10x.c
    同上

4. stm32f10x_conf.h
    * 包含了所有外设库的头文件
    * 配置 断言 编译选项, 定义 USE_FULL_ASSERT 与 assert_failed(错误时发出消息) 函数

