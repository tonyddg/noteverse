# TwinCat3 实用模块
## 轴基本控制
### 使能与复位
[功能块参考文档](https://infosys.beckhoff.com/content/1033/tcplclib_tc2_mc2/70048011.html)

#### 状态读取 
[功能块参考文档](https://infosys.beckhoff.com/content/1033/tcplclib_tc2_mc2/70054027.html)

### JOG 点动控制
[功能块参考文档](https://infosys.beckhoff.com/content/1033/tcplclib_tc2_mc2/70120459.html)

### PTP 点到点控制
[功能块参考文档](https://infosys.beckhoff.com/content/1033/tcplclib_tc2_mc2/70093323.html)

## FIFO 先入先出控制
FIFO 即 First in First out  
通过此功能可以将用户设定的坐标数据保存在栈中  
轴的控制器将根据用户设定的间隔, 按行读取数组中的坐标并运动  

FIFO 可以同时控制多个轴 (最多 8/16) 个轴, 实现多轴联动  
可以最多保存 1000 个坐标数据 (默认), 并在运动时插补提升平稳性

但 FIFO 不支持反转, 也无法根据主轴调整速度, 且运动后需要重新装填坐标数据

### FIFO 配置
[配置参考文档](https://infosys.beckhoff.com/content/1033/tf5060_tc3_nc_fifo_axes/6940881291.html)  

#### 创建 FIFO
在资源管理器打开 MOTION -> NC TASK  
右键 NC TASK, 选择 Add new item, 在弹出对话框中, Name 属性中输入通道名称, Type 属性选择 NC-Channel(for FIFO Axes) 完成创建

在资源管理器打开 MOTION -> NC TASK -> 通道名称 -> Group 2  
选择 FIFO 选项卡进行配置

#### 基本配置
* `FIFO-Dimension` FIFO 控制的轴组数, 最多 8/16 (由控制器性能决定)
* `Fifo Length` 坐标栈的大小, 即最多保存的坐标数
* `Fifo Override Type` 运动速度调节方式
    * `1` 表示跃进型 
    * `2` 表示平滑型 (默认, 经测试存在问题 ?)
* `P-T2 time for override changes` 平滑型下的切换时间, 越大运动切换越平滑
* `Base Time of Fifo entries` 坐标点运动间隔, 必须是控制周期的整数倍

#### 曲线校验
在读取坐标后, 最好先在虚轴运行, 检查运动时的最大速度是否超过设定的最大速度  
虚轴的创建可参考[官方文档](https://infosys.beckhoff.com/content/1033/tf50x0_tc3_nc_ptp/10541544203.html)

#### ID 获取
FIFO 功能块中多使用轴与通道的 ID (一个 UINT 值) 来绑定与操作有关轴 / 通道  

在资源管理器中打开轴 / 通道, 选择 General 选项卡, 其中的 Id 属性即其 ID

#### 模块导入
FIFO 有关功能块位于模块 Tc2_NcFifoAxes 中  
通过 库管理器 -> Motion -> FifoAxes -> Tc2_NcFifoAxes 导入  

使用有关功能块时需要提前导入

### 有关功能块
[功能块参考文档](https://infosys.beckhoff.com/content/1033/tf5060_tc3_nc_fifo_axes/10822792587.html)  

#### 轴绑定 FiFoGroupIntegrate

* `UDINT` 输入变量 `iChannelId`   
被设置的 FIFO 通道 ID
* `UDINT` 输入变量 `iAxisId`   
被绑定的轴 ID
* `UDINT` 输入变量 `iGroupPosition` 
被绑定轴对应的 FIFO 坐标 (索引由 1 开始)
* `BOOL` 输入变量 `bExecute`   
在上升沿执行绑定操作
* `TIME` 输入变量 `tTimeout`  
`ADS` 等待时间, 通常设置为 `T#1s`

* `BOOL` 输出变量 `bBusy`  
当 `bExecute` 上升沿时变为 `TRUE`, 当命令结束或出错时, 变为 `FALSE`
* `BOOL` 输出变量 `bErr`  
当命令执行出错, 变为 `TRUE`
* `UDINT` 输出变量 `iErrId`  
`ADS` 或 `NC` 错误码

#### 写入坐标 FiFoWrite

* `UDINT` 输入变量 `iChannelId`   
被设置的 FIFO 通道 ID
* `Pointer To LREAL` 输入变量 `AdrDataArray` 
保存坐标数据的数组, 该数组为 `ARRAY[0..x, 1..n] OF LREAL`  
其中 `x` 为坐标数, `n` 为 FIFO 控制的轴数
* `UDINT` 输入变量 `iColDim`  
FIFO 控制的轴数, 即坐标数组中的 `n`
* `UDINT` 输入变量 `iRowsToWrite`  
实际装载入 FIFO 的坐标数, 即坐标数组中的有效函数, 如全部行都使用则为 `x + 1`
* `BOOL` 输入变量 `bExecute`   
在上升沿执行写入操作
* `TIME` 输入变量 `tTimeout`  
`ADS` 等待时间, 通常设置为 `T#1s`

* `BOOL` 输出变量 `bBusy`  
当 `bExecute` 上升沿时变为 `TRUE`, 当命令结束或出错时, 变为 `FALSE`
* `BOOL` 输出变量 `bErr`  
当命令执行出错, 变为 `TRUE`
* `UDINT` 输出变量 `iErrId`  
`ADS` 或 `NC` 错误码

* 注意, 如果要重新写入坐标数组, 则需要使用功能块 `FiFoOverwrite`, 其参数与 `FiFoWrite` 相同

#### 开始运动 FiFoStart

* `UDINT` 输入变量 `iChannelId`   
被控制的 FIFO 通道 ID
* `BOOL` 输入变量 `bExecute`   
在上升沿开始运动
* `TIME` 输入变量 `tTimeout`  
`ADS` 等待时间, 通常设置为 `T#1s`

* `BOOL` 输出变量 `bBusy`  
当 `bExecute` 上升沿时变为 `TRUE`, 当命令结束或出错时, 变为 `FALSE`
* `BOOL` 输出变量 `bErr`  
当命令执行出错, 变为 `TRUE`
* `UDINT` 输出变量 `iErrId`  
`ADS` 或 `NC` 错误码

#### 停止运动 FiFoStop

* `UDINT` 输入变量 `iChannelId`   
被控制的 FIFO 通道 ID
* `BOOL` 输入变量 `bExecute`   
在上升沿终止运动
* `TIME` 输入变量 `tTimeout`  
`ADS` 等待时间, 通常设置为 `T#1s`

* `BOOL` 输出变量 `bBusy`  
当 `bExecute` 上升沿时变为 `TRUE`, 当命令结束或出错时, 变为 `FALSE`
* `BOOL` 输出变量 `bErr`  
当命令执行出错, 变为 `TRUE`
* `UDINT` 输出变量 `iErrId`  
`ADS` 或 `NC` 错误码

#### 解除绑定 FiFoGroupDisintegrate

* `UDINT` 输入变量 `iChannelId`   
被控制的 FIFO 通道 ID
* `BOOL` 输入变量 `bExecute`   
在上升沿执行命令
* `TIME` 输入变量 `tTimeout`  
`ADS` 等待时间, 通常设置为 `T#1s`

* `BOOL` 输出变量 `bBusy`  
当 `bExecute` 上升沿时变为 `TRUE`, 当命令结束或出错时, 变为 `FALSE`
* `BOOL` 输出变量 `bErr`  
当命令执行出错, 变为 `TRUE`
* `UDINT` 输出变量 `iErrId`  
`ADS` 或 `NC` 错误码

* 注意, 仅有此命令被执行后, 被绑定的轴才能重新使用基本 PTP 控制

### 基本使用流程
1. 通过 `MC_Power` 使能被控制的轴
1. 使用功能块 `FiFoWrite` 写入坐标
1. 使用功能块 `FiFoGroupIntegrate` 绑定被控制的轴
1. 使用功能块 `FiFoStart` 开始运行指定运动
1. 使用功能块 `FiFoGroupDisintegrate` 解除绑定

## XML Server
[官方参考文档](https://infosys.beckhoff.com/content/1033/tf6421_tc3_xml_server/index.html)

### 有关功能块

#### 读取 XML 文件 FB_XmlSrvRead
说明中仅介绍部分有用的参数, 其余未介绍参数见文档, 一般取空值即可

* `DWORD` 输入变量 `pSymAddr`  
保存读取结果的地址, 可通过函数 `ADR(val)` 获取变量地址
* `UDINT` 输入变量 `cbSymSize`  
保存空间大小, 通常使用 `sizeof(val)` 获取空间大小
* `T_MaxString (STRING)` 输入变量 `sFilePath`  
XML 文件的本地地址
*  `T_MaxString` 输入变量 `sXPath`  
读取参数在 XML 文件的标签位置, 使用 `/` 作为分隔符, 以分隔符 `/` 开始
* `BOOL` 输入变量 `bExecute`   
在上升沿执行命令
* `TIME` 输入变量 `tTimeout`  
读取等待时间, 通常设置为 `T#60s`

* `BOOL` 输出变量 `bBusy`  
当 `bExecute` 上升沿时变为 `TRUE`, 当命令结束或出错时, 变为 `FALSE`
* `BOOL` 输出变量 `bErr`  
当命令执行出错, 变为 `TRUE`
* `UDINT` 输出变量 `nErrId`  
错误码, 含义见文档

可使用 `FB_XmlSrvReadByName` 版本的功能块按变量名称 (`STRING` 输入参数 `sSymName`) 获取变量, 其余参数同

#### 向 XML 文件写入数据 FB_XmlSrvWrite
说明中仅介绍部分有用的参数, 其余未介绍参数见文档, 一般取空值即可

* `WORD` 输入变量 `nMode`  
写入模式
    * `XMLSRV_SKIPMISSING` 当标签不存在时跳过 (默认)
    * `XMLSRV_ADDMISSING` 当标签不存在时创建标签
* `DWORD` 输入变量 `pSymAddr`  
保存写入值的地址, 可通过函数 `ADR(val)` 获取变量地址
* `UDINT` 输入变量 `cbSymSize`  
写入值占用空间大小, 通常使用 `sizeof(val)` 获取空间大小
* `T_MaxString (STRING)` 输入变量 `sFilePath`  
XML 文件的本地地址
*  `T_MaxString` 输入变量 `sXPath`  
读取参数在 XML 文件的标签位置, 使用 `/` 作为分隔符, 以分隔符 `/` 开始
* `BOOL` 输入变量 `bExecute`   
在上升沿执行命令
* `TIME` 输入变量 `tTimeout`  
读取等待时间, 通常设置为 `T#60s`

* `BOOL` 输出变量 `bBusy`  
当 `bExecute` 上升沿时变为 `TRUE`, 当命令结束或出错时, 变为 `FALSE`
* `BOOL` 输出变量 `bErr`  
当命令执行出错, 变为 `TRUE`
* `UDINT` 输出变量 `nErrId`  
错误码, 含义见文档

可使用 `FB_XmlSrvWriteByName` 版本的功能块按变量名称 (`STRING` 输入参数 `sSymName`) 获取变量, 其余参数同

### 使用说明
#### 读取结构体
对于结构体
```iecst
TYPE ST_MYSTRUCT:
STRUCT
    a: UINT;
    b: DINT;
    c: LREAL;
    d: STRING;
END_STRUCT
END_TYPE
```

当读取标签下有相应的子标签, ==且变量类型正确==, 则能够直接读取到结构体中  
例如如下的 XML 文件内容
```xml
<variables>
    <Var1>10</Var1>
    <Var2> <!-- sXPath := '/variables/Var2' -->
        <a>100</a>
        <b>-10</b>
        <c>1.2</c>
        <d>Hallo</d>
    </Var2>
</variables>
```

#### 读取数组
在读取数组时, 要求数组各个元素有如下格式的 XML 标签  
`<[ARR] index="[INX]">[ELM]</[ARR]>`

* `ARR` 为被读取的数组标签名
* `INX` 为数组的索引
* `ELM` 为数组元素

仅当数组标签含有属性 `index` 时, 元素才能被读取

例如如下的 XML 文件内容
```xml
<dataentry>
    <array1 index="1">10</array1>
    <array1 index="2">10</array1>
    <array1 index="3">10</array1>
    <array1 index="4">10</array1>
</dataentry>
```

## 实用参考
### 错误码查询
<https://infosys.beckhoff.com/content/1033/tc3ncerrcode/index.html>
