# TwinCat3 编程基础
笔记介绍 TwinCAT3 编程语言的 IEC61131-3 标准

## 杂项
###  注释
* 行内注释 `(* ... *)`
* 行末注释 `// ...`

注释尽量不使用中文

### 运算符
|操作|符号|
|---|---|
|括号|()|
|函数调用|函数名|
|逻辑取反|NOT|
|负数|-|
|四则运算|* / + -|
|比较|< > <= >=|
|等于|=|
|不等于|<>|
|逻辑运算|AND XOR OR|

### 调试技巧
#### 在线修改变量值
当 PLC 在运行时, 在监视窗口 (通常隐藏在程序编辑器上方下拉条内) 内可以查看与修改变量  
首先双击准备值, 输入希望修改的值, 再点击 `所有在线应用中写入值` (图标栏, 往左数第三列, 第三个图标), 应用  
点击 `冷复位` (图标栏, 往左数第二列, 第一个图标) 则可以使值回到定义的初始值

#### 查看定义
右键子程序, 程序, 变量名的, 可在菜单中选择转到定义, 快速查看其定义

## 变量
### 变量类型
#### 常用变量类型
|类型名|名称|说明|
|---|---|---|
|BOOL|布尔型|取值有 False 或 True (可以全大写 / 小写)|
|BYTE|字节|8 位无符号整数, 可使用 `val.x` 取变量第 x 位二进制位的值 (BOOL) 类型|
|INT|整数|32 位有符号整数|
|REAL|实数|32 位浮点数|
|LREAL|长实数|64 位浮点数|
|TIME|时间|32 位时间, 使用 `T#[w]H[x]m[y]s[z]ms` 表示|
|STRING(n)|ACSII 字符串|n 为字符数, 最多有 255 个字符|
|POINTER TO [TYPE]|指针|使用 `ADR(val)` 取地址, 使用 `val^` 获取指针指向的变量|

#### 数组
`ARRAY[a...b(, ...)] OF TYPE`
* `a` 数组索引下限
* `b` 数组索引上限
* `TYPE` 数组类型
* 多维数组使用逗号隔开确定其他维度的索引

使用 `val[i(, j, ...)]` 索引数组

#### 复合类型
在资源管理器中右击 DUTs, 然后点击 Add, 然后选择 DUT , 在对话框内选择相应的数据类型进行定义

##### 联合体
联合体内的成员变量公用同一块内存空间  
使用 `var.member` 的方式访问成员

```iecst
TYPE [NAME] :
UNION
    [DEF];
    ...
END_UNION
END_TYPE
```

* `NAME` 联合体类型名
* `DEF` 联合体成员变量定义 (类似变量定义，仅有变量名与类型)

##### 结构体
结构体为一系列变量的结合  

```iecst
TYPE [NAME] :
STRUCT
    [DEF];
    ...
END_STRUCT
END_TYPE
```

* `NAME` 结构体类型名
* `DEF` 结构体成员变量定义 (类似变量定义，仅有变量名与类型)

使用 `var.member` 的方式访问成员  
结构体允许以其他结构体或==数组作为成员类型==  
可用于包裹数组, 以使函数返回数组

##### 枚举
枚举使用助记词对应特定的数值  
使用 `name.def` 的方式表示特定助记词

```iecst
TYPE [NAME] :
(
    [OPT] (:=...),
    ...
);
END_TYPE
```

* `NAME` 枚举类型名
* `OPT` 助记词名称
* `:=...` 助记词取值，默认为按顺序确定

### 变量声明
变量声明代码需写在在程序区上方的变量声明区中

#### 单个变量
`NAME ([AT%I/Q][*]) : TYPE [:= ...];`

* `NAME` 变量名称
* `AT%I/Q` 变脸使用方式，`I` 表示输入量，`Q` 表示输出量
* `*` 变量地址
    * `*`  表示自动分配
    * `[B/W/D][n.m]` `B, W, D` 表示长度, `n.m` 表示变量地址 
* `TYPE` 变量类型
* `:= ...` 变量初值

#### 局部变量声明
```iecst
(VAR) [DEC]

END_VAR
```
* `VAR` 局部变量使用方式
    * `VAR` 一般局部变量
    * `VAR_IN` 函数输入量, 见[函数介绍](#函数-function)
    * `VAR_OUT` 
    * `VAR_IN_OUT` 
* `DEC` 变量修饰
    * 默认下为一般变量
    * `CONSTANT` 常量 (定义是要赋初值)
    * `PERSISTENT` 断电保存量 (需要配合 UPS 使用)

#### 全局变量
在 GVLs 上右击，然后点击 Add，选择 Global Variable List, 输入全局变量列表名  
VAR_GLOBAL 中声明对应的全局变量  
不同的全局变量列表中允许有同名变量, 但不建议

通过 `[glv].[val]` 访问全局变量
* `glv` 全局变量的列表名
* `val` 定义在类表中的全局变量

### 外部输入输出
#### 配置输入输出端口
1. 右键 TwinCAT 图标, 选择 System 菜单, 点击 `Config` 切换到 `Config` 模式
1. 资源管理器中, 选择 I/O, 右键 `Devices - Scan`, 选择连接设备的网卡, 开始自动扫描
1. 扫描完成后, 在 `Device - Term(...) - Term x - Channel - Output / Input` 下可以设置与查看各个设备下的输入输出端口地址, 类型, ADS 地址等

#### 定义变量对应端口
1. 定义之前必须激活配置 (左上角第一个图标)  
1. 使用 `AT%I/Q*` 修饰声明变量 ([修饰方法](#单个变量)), 通常将全局变量作为输入输出量
    * 对于数字量, 对应 BOOL 型变量 (数组)
    * 对于模拟量, 通常对应 INT 型编码, 转换需要查相关手册 (数组)
1. 在设置端口界面, 点击 `Linked to`, 然后在界面内选择要绑定的变量 (变量需要有 `AT` 修饰)
1. 也可以直接双击端口选择要绑定的变量
1. 右键端口, 选择 Clear 则可以解除绑定

## 程序结构
### 程序建立
#### 程序 PRG
在资源管理器中右击 POUs, 然后点击 Add, 然后选择 POU , 在对话框内选择程序  

程序中分为变量声明区与代码区

#### 函数 Function
在资源管理器中右击 POUs, 使用菜单内的 Add 可以添加函数 (Function)  

函数中分为变量声明区与代码区  

函数的变量声明区首先要声明函数名以及返回类型  
`FUNCTION [NAME] : [TYPE]`
* `NAME` 既是函数名, 也是体现函数返回值的变量
* `TYPE` 函数返回值类型
其次要在 `VAR_INPUT` 内定义输入变量 , 输入变量将作为函数的出入参数  
最后在 `VAR` 定义局部变量 

通过 `[fun](...);` 可调用函数, `...` 内按 `VAR_INPUT` 的顺序传入参数 

#### 功能块 FB
在资源管理器中右击 POUs, 使用菜单内的 Add 可以添加函数 (Function Block, FB)  

功能块比起函数, 更接近一般语言的类  
其子方法相当于成员函数, 程序体相当于构造函数  
但功能块在 TwinCat2 中不支持

功能块中分为变量声明区与代码区  

功能块的变量声明区首先要声明功能块名称, 但与函数不同, 功能块能返回多个值, 因此不需要在此处定义返回值  
`FUNCTION_BLOCK [DOMAIN] [NAME]`
* `NAME` 功能块名
* `DOMAIN` 访问限制符, 一般为 PUBLIC
* 在 `VAR` 定义功能块变量
    * 可类比为私有变量, 无法通过外界修改
* 在 `VAR_INPUT` 内定义输入变量
    * 同为私有变量, 但初始化时需要赋值  
* 在 `VAR_OUTPUT` 内定义输出变量, 输出变量反映到外部变量上, 从而被读取
    * 可类比为==只读变量==, 外界可以读取但不能修改
* 在 `VAR_IN_OUT` 内定义输出变量, 输出变量反映到外部变量上, 从而被读取    
    * 可类比为==共有变量==, 外界可以读取与修改

首先在变量声明区定义功能块的实例 `[val] : [fb]`  
然后通过 `[val]([in1] := [val_in1], ..., [out1] => [val_out1], ..., [in_out1] := [val_in1], ...);` 初始化功能块  
最后可使用 `[val].[met](...)` 的方式调用功能块的方法, 可使用 `[val].[in_out]/[val_out]` 的方式访问输出量或输入输出量  

* `val` 为功能块实例化的变量名称
* `inx` 为功能块内的输入变量
* `outx` 为功能块内的输出变量
* `val_inx` 为用于初始化功能块输入变量的值 (可以传入字面量, 当传入变量时, 变量将与对应输入变量绑定)
* `val_outx` 为接收功能块输出变量的变量 (当没有访问限制时, 可不指定)
* `in_out` 为用于初始化功能块输入输出变量的值 (同输入量)
* `met` 为功能块的成员方法

#### 子程序 Action
右键程序 (PRG), 使用菜单内的 Add 可以添加子程序 (Action)

子程序隶属于程序 (PRG), 没有自己的变量, 只能使用来自程序的变量  
没有输入输出, 仅作为一段可以复用或表达一定含义的代码片段

通过 `[prg].[act]();` 可在程序中调用子程序
* `prg` 为程序名
* `act` 为子程序名 

#### 方法 Method
右键程序 (PRG), 使用菜单内的 Add 可以添加子程序 (Action)

子程序隶属于程序 (PRG), 有自己的内部变量, 也可以使用来自程序的变量  
方法还可以有输入参数接收来自外部的值  
并且方法也可以返回值, 注意返回值保存在与方法名同名的变量中

通过 `[prg].[met](in1 := ..., ...);` 可在程序中调用子程序
* `prg` 为程序名
* `met` 为方法名 
* `inx` 为输入参数

### 编程技巧
#### 使用方法封装触发型命令功能块
```iecst
METHOD ExecuteXXX : BYTE
VAR_INPUT
    INS_XXX : FB_XXX;
    PA1 : ...;
    ...
    TIMEOUT : TIME := T#50ms;
VAR_END

VAR
    TRIG : BOOL := FALSE;
    Timer : TON;
VAR_END

VAR_OUTPUT
    ERROR : UDINT;
VAR_END

//////////////////////////

IF NOT TRIG THEN
    TRIG := TRUE;
    // 在方法中实例化化
    INS_XXX(FB_PA1 := PA1, ...);
    // 使用延时, 延长脉冲, 防止脉冲不被识别
    Timer(IN:= TRUE, PT:= TIMEOUT);

    INT_XXX.bExecute := TRUE;
ELSIF Timer.Q THEN
    INT_XXX.bExecute := FALSE;
    IF INS_XXX.bErr THEN
        // 命令错误, 返回 2
        ExecuteXXX := 2;
        ERROR := INS_XXX.nErrID;
        TRIG := FALSE;

        RETURN;
    ELSIF NOT INS_XXX.bBUSY THEN
        // 命令发送, 返回 1 (注意命令发送完成, 不一定执行完成)
        ExecuteXXX := 1;
        ERROR := INS_XXX.nErrID;
        TRIG := FALSE;

        RETURN;
    END_IF
END_IF

// 命令运行中, 返回 0
ExecuteXXX := 0;
```

### 程序控制语句
#### IF
```iecst
IF ([CASE1]) THEN
...
ELSIF ([CASE2]) THEN
...
ELSE
...
END_IF
```

* `CASEn` 为 BOOL 表达式，或变量

#### CASE
```iecst
CASE [VAL] OF
[OPT] : ...
...
ELSE
    DEFAULT
    ...
END_CASE
```

* `OPT` 为范围，有以下几种表示方法
    * `n` 当 `VAL=n` 时运行
    * `a,b,...` 当 `VAL` 等于任意一个待选值时运行
    * `a..b` 当 `VAL` 在 a，b 内时运行
* `VAL` 为判断变量, 可使用整数或枚举类型  
为了保证程序的稳定性, 每当进入分支状态后, 设置 `VAL := 0` (假定以 0 为默认状态)

#### FOR
```iecst
FOR [BE] TO [END] BY [ST] DO
    ...
END_FOR
```

* `BE` 为获取循环变量, 可在该语句对循环变量赋初值
* `END` 为结束值, 当循环变量大于结束值, 退出循环
* `ST` 为步长, 每次完成以此循环, 循环变量就加上步长, 默认为 1

#### WHILE
```iecst
WHILE [OPT] DO
    ...
END_WHILE
```

* [OPT] 为判断条件语句, 当值为 `False` 时退出循环

#### 其他控制语句
* `:=` 赋值语句
* `RETURN;` 退出当前代码块
* `BREAK;` 退出循环

## 内置函数
### 变量
#### 字符串
* `REPLACE(str, ch, num, start)`
    * 替换字符串中的字符
    * `str` 被替换的字符串
    * `ch` 用于替换的字符
    * `num` 替换次数
    * `start` 替换开始位置 (以 1 开始索引)
    * 返回被替换的字符串
    * 示例:

```iecst
A := 'Hello';
A_r := REPLACE(A, 'X', 1, 2);
// 运行后, A_r = 'HXllo'
```

* `CONCAT(str1, str2)`
    * 合并字符串
    * `str1` 前字符串
    * `str2` 后字符串
    * 返回合并完的字符串
    * 示例:

```iecst
A := 'Hello ';
B := 'World'
S_add := CONCAT(A, B);
// 运行后, S_add = 'Hello World'
```

#### 类型转换
`[TYPE1]_TO_[TYPE2]([val])`

* `TYPE1` 输入类型
* `TYPE2` 转换输出类型
* `val` 被转换变量
* 返回转换后的值

### 内置功能块
#### 自动声明
1. 在声明区内右键 `自动声明 (AutoDeclear)`
1. 在对话框内输入变量名称 (Name)
1. 类型 (Type) 则点击右侧 > 按钮进入输入助手
1. 选择 Input Assitant -> Structed Type 即可寻找内置功能块
1. 在上方选项卡中, 使用 Text search 可以通过文字搜索特定功能块

#### 添加模块
资源管理器中右键 External Types -> References, 选择 Add Library 可以向项目添加模块  

#### 计时器 TON
位于 TC2_Standard -> Timer -> TON 中

* `IN` 输入变量 BOOL  
功能块触发, 跳变为 True 时触发计时器, 跳变为 False 时复位计时器  
* `PT` 输入变量 TIME
预设时间, 计时器计时时间
* `Q` 输出变量 BOOL  
当计时器触发, 经过预设时间后变为 True
* `ET` 输出变量 TIME  
计时器在触发后经过的时间

#### 计数器 CTU
位于 TC2_Standard -> Counter -> CTU 中

* `CU` 输入变量 BOOL  
计时器触发, 跳变为 True 时计数器加 1
* `RESET` 输入变量 BOOL  
计数器复位, 跳变为 True 时计数器复位 (`CU` 达到阈值 `PV` 也不会自动复位)
* `PV` 输入变量 INT   
计数器阈值
* `Q` 输出变量 BOOL  
当计数器到达阈值时 (`CV = PV`), `Q` 输出 True, 计数器不会自动复位
* `CV` 输出变量 INT  
计数器当前值

#### 获取网络时间 NT_GetTime
默认没有添加, 需要先手动从 References 添加 System -> Tc2_Utilities 模块  
位于 Tc2_Utilities -> NT_GetTime

* `NETID` 输入变量 字符串   
目标设备的 AMS NetId, 默认为本地
* `START` 输入变量 BOOL
跳变为 True 时, 开始获取时间
* `TMOUT` 输入变量 TIME  
获取时间的等待时长
* `BUSY` 输出变量 BOOL  
获取时间等待时为 True
* `ERR` 输出变量 BOOL  
出现错误时为 True
* `ERRID` 输出变量  
错误信息
* `TIMESTR` 输出变量 结构体  
目标设备的时间, 包含了年月日时分秒的时间

## 人机界面
在资源管理器中右击 VISUs, 使用菜单内的 Add 可以添加人机界面 (Visualization)  

### 编辑截面
#### 放置控件
在资源管理器下方的选项卡中, 点击工具箱即可进入控件界面  
将工具箱内的控件拖入人机界面即可

#### 编辑控件
点击控件, 将自动进入控件属性选项卡 (或在资源管理器下方的选项卡中)  
可在其中编辑控件属性  
当属性找不到时, 需要点击界面上方的 `高级` 按钮, 显示所有属性

#### 元素列表
通常隐藏在界面编辑器上方下拉条内

### 控件通用属性
#### 文本内容 Text  
即显示在控件上的文本  
文本内可以使用格式化字符, 常用于 TextField
    * `%d` 整形, 对应 INT
    * `%.nf` 浮点型, 对应 LREAL, n 为显示位数
    * `%s` 字符串, 对应 STRING
* 绑定变量 `Text variable`  
可在此处输入格式化字符对应的变量名, 通常为全局变量或程序中  
通过 `[plc].[val]` 来访问, `plc` 为变量声明位置, `val` 为变量名称

#### 输入配置  
用于设置当鼠标在空间上按下 (OnMouseDown), 点击 (OnMouseClick) 等操作时执行的操作  
选择操作后将进入配置页面  
选择要添加的配置, 点击 `>` 按钮添加, 最后在最右侧编辑器设置  

* 执行 ST 代码  
即执行一般的 IEC 61131-3 代码  
在右侧编辑器内直接输入要执行的代码  
* 写变量  
    * 编辑变量  
    通常选择`用另一个变量`, 即将写入值放入此变量中, 变量名确定方法与[绑定变量](#文本内容-text)同
    * 输入类型  
        * `Numpad` 即使用内置的数字输入器
        * `文本输入` 即作为文本输入框使用 (TextField), 得到的是 STRING 类型的值, 数字还需要后续使用 `STRING_TO_LREAL` 等转换

#### 变量绑定 Variable
常用于复选框 CheckBox  
输入变量名即可绑定, 绑定后变量与控件状态联动 ()

### 常用控件
* 组块 GroupBox  
组块内的控件将自动隶属于组块下  
移动组块时, 其下的控件也将一起移动
* 标签 Label
* 按钮 Button
* 文本 TextField
* 勾选框 Checkbox
