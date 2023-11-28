# Matlab 基本语法
## 关键字
1. ans 表达式结果
2. 1i, 1j 复数单位
3. inf 无穷大
4. eps 无穷小
5. NaN 未定义/非数字
6. pi 圆周率

## 控制台命令
[官方文档 - 输入命令](https://ww2.mathworks.cn/help/matlab/entering-commands.html?s_tid=CRUX_lftnav)
1. iskeyword 获取所有关键字
2. clear [arg] 清除变量, 无参数则为所有变量
3. format [rat/short/long] 设置显示格式
    1. rat 显示为分数
    2. short 显示 5 位有效数字
    3. long 完整显示
    4. [short/long]E 科学计数法
4. clc 清屏
5. whos [arg] 显示变量信息, 无参数则为显示所有变量
6. tic toc 计算 tic 至 toc 代码块所用时间
7. 在命令结尾加上分号将不会显示结果
8. CTRL + C 终止脚本
9. ... + 回车 在下一行继续输入命令

## 矩阵
1. 横向为行(row) 纵向为列(column)
2. matlab 中, ==行优先于列==, 先确定行再确定列
3. 因此矩阵遍历方向为==先从上到下==, 再从左到右
4. matlab ==矩阵中从 1 开始记==
5. 通常以列区分数据组, 即第 n 列为第 n 组数据

### 矩阵表示
[官方文档 - 矩阵构建](https://ww2.mathworks.cn/help/matlab/math/creating-and-concatenating-matrices.html)
1. 使用 逗号, 或 空格 表示同一行, 不同列中的元素
2. 使用 分号; 区分行, 表示下一行
3. 使用 方括号[] 包裹矩阵
4. 等差数列 A = 首项:公差:末项 包含首项与末项(不需要方括号)

### 矩阵读取
[官方文档 - 矩阵索引](https://ww2.mathworks.cn/help/matlab/math/array-indexing.html)
1. 使用 圆括号() 实现对矩阵的读取操作
2. M(a) 按先从上到下, 再从左到右的顺序, 获取矩阵中第 a 个元素
3. M(r, c) 获取第 r 行(纵向), 第 c 列(横向)的元素
4. M(:, c)/(r, : ) 获取整列/整行
5. M(矩阵 N) 将矩阵 N 中的元素 $n_{ij}$ 替换为 $M(n_{ij})$
6. M($vr$, $vc$) 取 M 中的 $vr_1,...,vr_m$ 行, 与 $vc_1,...,vc_n$ 列组成一个新的 $m\times n$ 矩阵
7. M(logic) logic 为一个布尔型的矩阵, 取出 M 中 logic 为 1 位置的值, 构成一个向量(数组) 此方法用于与比较运算配合

### 扩展矩阵
文档见矩阵构建
1. 为矩阵中不存在的位置赋值, 将自动扩展矩阵, 为定义的位置则取 0
2. [A B] 以行方向合并矩阵 A, B, 要求 A, B 行数相同
3. [A ; B] 以列方向合并矩阵 A, B, 要求 A, B 列数相同

### 多维矩阵
[官方文档 - 多维矩阵](https://ww2.mathworks.cn/help/matlab/math/multidimensional-arrays.html)
A(row, column, layer)
先定义多维矩阵的第一层, 然后使用 A(:, :, 2) = B, 定义多维矩阵的其他层

### 矩阵运算
[官方文档 - 矩阵运算/逻辑运算](https://ww2.mathworks.cn/help/matlab/matlab_prog/matlab-operators-and-special-characters.html)
1. 基本运算符 +, -, *, / 默认使用矩阵运算规则
2. 指数运算 ^ , 指数函数使用 exp()
3. 对应运算 . + [基本运算符], 矩阵 A 与 B 的对应元素分别运算
4. 转置 .'
5. 复共轭转置 '
6. 求余 mod(a, b) 不支持 % 求余
7. 浮点求余 rem(a, b)

### 矩阵创建
[官方文档 - 矩阵创建/测量](https://ww2.mathworks.cn/help/matlab/matrices-and-arrays.html)
1. zeros(r, c) 创建全零矩阵, 可用于函数初始化
2. rand(r, c) 创建均匀分布的随机矩阵
3. magic(r) 创建 $r\times r$ 的幻方矩阵
4. [首项:公差:末项] 创建等差数列
5. logspace 创建指数数列

### 矩阵测量
1. max/min(A) 将返回各列的最大/小值
2. sum/mean(A) 将返回各列的和/平均 若要求row时可先转置矩阵
3. sort(A) 将各列升序排序
4. sortrows(A) 以第一列为依据升序排序，排序同时, 第一列中元素的交换会影响其他行
5. size(A, dim) 返回矩阵大小, 参数为第 dim 个维度, 如果无参数则返回一个数组, 表示各个维度的大小
6. length(A) 返回矩阵最大维度的长度
7. find(logic) 返回 logic 中为 1 的元素的索引(返回单参数, 数组形式)
8. iscolumn(M) 确定矩阵是否是列向量

### 逻辑运算
[官方文档 - 布尔运算](https://ww2.mathworks.cn/help/matlab/logical-operations.html?s_tid=CRUX_lftnav)
(逻辑运算符官方文档地址见矩阵运算)
1. 比较大小 > >= < <=
2. 不等关系 ~=
3. 等于关系 ==
4. 逻辑运算 & | ~
5. 具有短路功能的逻辑运算 && ||
6. 矩阵的逻辑运算结果为布尔矩阵, 即矩阵中满足结果的元素为 1, 否则为 0

#### 布尔矩阵应用示例
1. find(A == a) 获取 A 中所有等于 a 的元素的索引
2. A(B > a) 根据 B 中大于 a 的元素的索引取 A 中的值

### 字符串
1. 双引号 "" 表示字符串类 string
2. 单引号 '' 表示 char 型数组
3. string 需要使用专门的函数操控, 不能当作数组合并
4. char 数组可以视为数组使用, 通过 ['abc' 'def'] 合并
5. 在字符串中 " 号以 "" 代替

### 基本数学函数
1. log 自然对数函数
2. exp 以 e 为底的指数函数(e 不是常量)


## 程序控制

### 控制流
[官方文档 - 控制流和分支](https://ww2.mathworks.cn/help/matlab/control-flow.html?s_tid=CRUX_lftnav)
#### if
```matlab
if expression
    statements
elseif expression
    statements
else
    statements
end
```
expression 不需要括号

#### for
```matlab
for index = values
   statements
end
```
values 为一个数组, 可通过 首项:公差:末项 语法创建

#### while
```matlab
while expression
    statements
end
```

#### switch
```matlab
switch switch_expression
   case case_expression
      statements
   case case_expression
      statements
    ...
   otherwise
      statements
end
```

### 脚本
[官方文档 - 脚本](https://ww2.mathworks.cn/help/matlab/scripts.html)
1. %注释符号 也可以选中注释区域再点击注释区的按钮(或右键菜单)添加或解除注释
2. %%指定区块(%%开始 空行结尾) 指定后可以使用运行节功能只执行选中的区块
3. 点击编辑器侧边的行数可以设置断点 运行到断点时会停止运行进入命令行并且可以查看工作区的变量，点击编辑器的继续可以继续
4. 选中代码再点击缩进区的按钮(或右键菜单)进行缩进或规范格式
5. 运行脚本后变量将被保留，为了避免错误，在写脚本时注意clear或重新赋值
6. 脚本中需要加 分号; 表示新一行代码
7. 使用函数 publish 导出脚本结果
8. 脚本使用 disp() 输出结果, 字符串参数使用单引号 '

### 函数
[官方文档 - 函数](https://ww2.mathworks.cn/help/matlab/functions.html)
1. 基本格式
```matlab
function [val1, val2, ...] = fun(arg1, arg2, ...)
    ...
    val1 = ...;
    val2 = ...;
end
```
2. 无返回值时, 返回值设为 []
3. 函数名必须与文件名相同
4. 没有默认参数, 使用内部变量 nargin 获取函数的参数个数
5. 可以在脚本末尾定义子函数, 只能在脚本中使用
6. 在函数中定义的子函数不能与函数同名

#### 函数规范
1. 通常以列区分数据组, 即第 n 列为第 n 组数据, 当数据不规范时, 注意使用 iscolumn 判断, 并先转置
2. 对于多列数据则对各列分别计算

#### 函数返回值处理
matlab 函数通常有多个返回值, 将以行矩阵的形式返回, 可通过 [val1, val2, ...] = fun(...), 将返回值赋给变量 val1, val2, ...

#### 函数句柄
``` matlab
fun = @(x) 函数体
```
可以此方法将函数作为参数传递, 可用于数值微积分等

### 数据处理
[官方文档 - 数据导入和导出](https://ww2.mathworks.cn/help/matlab/data-import-and-export.html)
1. load 加载 .mat 数据
2. save 保存工作区中的数据为 .mat, 加上 -ascii 使保存结果可用 TXT 等方式直接读取, 当数据将丢失
3. 图片, 视频等数据见文档

## 技巧
### 计算数量级
使用 log10 快速确定一个数的数量级
```matlab
res = floor(log10(test));
```

# 图像绘制
## 注释与格式
[官方文档 - 注释与格式](https://ww2.mathworks.cn/help/matlab/formatting-and-annotation.html)
1. 注释函数的参数设置方法 fun(..., 'Property', Args) 使用字符串表示属性名, 后接属性参数, 从而实现设置字体大小等效果 
2. 注释格式设置见文档, 默认可以使用 LaTex

### 图像注释
1. title 添加标题
2. subtitle 为绘图添加副标题
3. sgtitle 在子图网格上添加标题(用于 subplot)
4. mlabel 为 m 轴添加标签
5. legend 在坐标区上添加图例说明(顺序与定义图像的顺序相同)
6. text 在指定点位置添加文字 
    * 指定参数 Units 为 `normalized` 时, 使用 0 - 1 的相对坐标, 否则默认为实际坐标
    * 指定参数 Interpreter 为 `latex` 时, 可以使用 Latex (此时字符串内不可有中文, 使用 `$$` 包裹转以部分)
    * 文字可通过函数 `sprintf` 格式化

为 `for` 循环生成的图像批量添加 legend 的技巧
1. 使用一个字符串数组保存各个图像的 legend, 其中字符串数组通过函数 `string` 创建, 如 `legend_list = string(n);`
1. 在每个循环中保存曲线的名称, 其中引号得到的是字符数组, 因此还用将字符数组传入函数 `string`, 使其变为字符串对象 `legend_list(it)=string('line'+it)`
1. 最后将字符串数组传入 `legend` 函数完成注释 `legend(legend_list)`

示例
```matlab
omega_n_list = 0.2:0.2:1;
xi = 0.707;
legend_list = string(size(omega_n_list)); %1

figure
hold on

it = 1;
for omega_n = omega_n_list
    sys = tf(omega_n^2, [1 2 * xi * omega_n, omega_n^2]);
    bode(sys)

    legend_list(it) = string("\omega_n=" + omega_n); %2
    it = it + 1;
end
legend(legend_list); %3

hold off
```

### 图像标记
1. xline 绘制具有常量 x 值的垂直线
2. yline 绘制具有常量 y 值的水平线
3. datatip(g) 为数据点添加提示, 类似点击数据点后的提示, g 为创建图像后返回的图像对象
4. rectangle 创建带有尖角或圆角的矩形
5. ginput 获取用户点击的坐标

### 图像外观
[官方文档 - 图像外观](https://ww2.mathworks.cn/help/matlab/axes.html)
1. axis 设置坐标轴范围和纵横比
    * square x,y 轴长度相同
    * equal x,y 轴绘制比例相同
    * tight x,y切齐图像
2. box 设置坐标区轮廓
3. grid 显示或隐藏坐标区网格线
4. 坐标轴刻度等设置见文档
5. colormap 设置图像颜色, 用于三维图像

### 图像绘制控制
1. hold on/off hold on 与 hold off 之间的绘图命令将公用一个图像, 实现将多个图像画在一个坐标系上的效果
2. subplot(m,n,p) 在一个窗口中绘制多个图片
    1. m, n 为子图像的布局
    2. p 为之后图像绘制在第 p 的子图像中
3. yyaxis left/right 将个图像画在一个坐标系中, 其中 yyaxis left 命令之后的图形其 y 轴将在左侧
    * 两个 y 轴相关图像属性等独立, 仅公用 x 轴
    * 可配合 hold 使用, 优先于 hold

## 图像绘制
[官方文档 - 图像绘制](https://ww2.mathworks.cn/help/matlab/2-and-3d-plots.html)

### 基本二维图像
plot(X1, Y2, style1, X2, Y2, style2, ...)
1. Xn X 坐标的数据
2. Yn Y 坐标的数据
3. style~n~ 一个表示曲线/点风格的字符串

### 对数图
semilogx/y
1. 创建一个 x/y 轴为对数刻度的图像
2. 可使用 logspace 创建指数数列
3. 默认以 10 为刻度的底数

### 直方图
histogram(x, bins)
1. 直方图通过统计 x 在特定区间的出现次数决定直方高度 
2. x 为直方图数据
3. bins 为 x 的区间, 不写时自动划分
4. 可以手动指定区间, 见函数说明

### 柱状图
bar/barh(x, y)
1. barh 为水平直方图
2. x 为图中各柱的名称, y 为各柱的高度
3. 参数 'stacked' 可将柱状图分组

### 箱线图
boxplot
两端为最大最小值，中间红线为平均值，中间的矩形为25%与75%分数，红色加号为超过两个标准差的点(异常点)

### 其他二维图像
1. pie 饼状图
2. polarplot 极坐标(此时不可使用 hold)
3. stairs 阶梯图
4. errorbar 含误差条的线图
5. scatter 散点图

### 三维图
1. plot3(x, y, z) 绘制三维曲线
2. surf 绘制三维曲面
3. mesh 绘制三维网格
* 三维图绘制方法查手册

# 数据统计
## 数据处理
1. mean 平均值
2. median 中位数
3. mode 众数
4. prctile 分位数
5. max 最大值
6. min 最小值
7. std 标准差(无偏 分母加一)
7. var 方差(无偏)

## 数据拟合
### 多项式拟合
polyfit(x, y, order)
1. x, y 为数据
2. order 为多项式次数
3. 返回一个数组, 为拟合结果各项(从高次到0)的系数

### 线性相关度
corrcoef(x, y)
返回一个对称矩阵, 对角线位置为 x 与 y 的线性相关度

### 其他拟合函数
1. regress 多变量拟合
2. cftool 非线性拟合工具 [拟合结果评估方法](https://www.jianshu.com/p/1707ede94dfa)

## 数据插值
### 三次样条插值
spline(x, y, t)
1. t 为插值曲线的 x 坐标刻度
2. 返回数组 s, 保存 t 对应的插值结果 y 坐标

### 三次分段 Hermite 插值
pchip(x, y, t)
* 同 spline

### 一维插值
interp1(x, y, t, method)
1. 前参数同 spline
2. method 用于指定插值方法
