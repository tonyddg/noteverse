---
order: 1
---

# Numpy 笔记
> 参考教程 <https://numpy.org/doc/stable/user/basics.creation.html>

默认使用 `import numpy as np` 的方式引入 Numpy 模块

## 数组创建
在 Numpy 中, 最基本的数据对象即 `np.ndarray` 数组对象  
数组对象可以有任意的维数  
该对象在 Numpy 中默认视为定长的数据数组使用

### 基于 Python 的列表对象
使用函数 `np.array(obj[, dtype])` 基于 Python 的列表对象如列表与元组创建数组
* `obj` 被转换的 Python 对象
* `dtype` Numpy 数据类型 (与 Python 不同, 数组中的数据具有固定的长度)  
默认将根据被转换的数据自动选择, 因此为了防止错误, 最好明确转换的类型  
常用的有 
    * 布尔类型 `np.bool_`
    * 32 位整数类型 `np.int32`
    * 64 位浮点类型 `np.float64`
    * 双 64 位复数类型 `np.complex128`
    * 一般 Python 对象, 如字符串 `np.object0`

关于 Numpy 数据类型补充: 类似 Python 的类型转换, 通过如 `np.float64(...)` 的方式可进行类型转换

#### 转换规则说明
对于多维的 Python 列表对象
* 数组对象的维数与传入的 Python 列表对象维数相同
* 列表对象中的子列表应当均有相同的形状

对于一, 二, 三维的数据, 将使用如下方法处理
* 对于一维的数据, 得到的数组对象也是一维的  
注意, 不能将一维的数组对象如 `[1, 2, 3]` 作为线性代数中的向量处理 
* 对于二维的数据, Python 列表对象最外层为 `n` 个一维的子列表, 每个列表内有 `m` 个元素, 子列表构成行, 子列表内的元素即该行中各列的元素  
因此可将二维的数组视为矩阵处理, 应使表示列向量时应用数组对象 `[[1], [2], [3]]` 
* 对于三维的数据, Python 列表对象最外层为 `k` 个二维的子列表, 这些子列表的处理方式与二维数据同, 因此三维的数组对象可视为一个由 `k` 个矩阵组成的数组

### 基于 Numpy 的内置函数
#### 生成特定形状的数组
* `np.arange([start], stop[, step], dtype = None)` 生成指定步长的==一维等差数列数组==
    * `start` 数列的起始项
    * `stop` 数列末尾 (==不包含==在数列中)
    * `step` 数列的步长
    * `dtype` 生成数组的数据类型 (默认将自动识别)
* `np.linspace(start, stop, num = 50, dtype = None)` 生成指定元素数的==一维等差数列数组==
    * `start` 数列的起始项
    * `stop` 数列末项 (==包含==在数列中)
    * `num` 数列的元素数
    * `dtype` 生成数组的数据类型 (默认将自动识别)
* `np.logspace(start, stop, num = 50, base = 10, dtype = None)` 生成指定元素数的==一维等比数列数组==
    * `start` 数列的==起始项的指数== (可以是正数或负数)
    * `stop` 数列==末项的指数== (==包含==在数列中)
    * `num` 数列的元素数
    * `base` 等比的底数, 默认为 `10`
    * `dtype` 生成数组的数据类型 (默认将自动识别)
* `np.eye(n[, m])` 生成指定形状的单位矩阵 (对角线上的元素为 1, 其余为 0) (二维数组)
    * `n` 矩阵的行数
    * `m` 矩阵的列数 (默认与行数相同)
* `np.diag(list, k = 0)` 根据给定的对角线元素, 生成方阵 (二维数组)
    * `list` 对角线上的元素组成的列表
    * `k` 对角线偏移量, 取正时向上偏移, 取负时向下偏移
* `np.zeros(shape, dtype=np.float64)` 生成一个指定形状的, 全为 0 的数组 (任意维数)  
推荐使用此函数用于初始化空的数组
    * `shape` 表述数组形状的元组, 如 `(3, 4)` 表示一个 $3\times 4$ 的矩阵
    * `dtype` 数组数据类型
* `np.ones(shape, dtype=np.float64)` 与 `np.zeros` 类似, 但元素全为 1
* `np.empty(shape, dtype=np.float64)` 仅根据数组形状, 申请内存空间, 其中的值是任意的, 参数与 `np.zeros` 类似  
推荐使用此函数用于初始化所有元素即将被覆盖的数组, 用于比 `np.zeros` 更快的速度
* `np.random.random(shape)` 与 `np.zeros` 类似, 但元素全为 -1 ~ 1 的浮点随机数

### 基于现有数组的组合
* `np.hstack(tup)` 沿列增大的方向堆叠数组  
    * `tup` 一个由数组对象为元素的列表或元组
    * 传入二维数组时, 要求被堆叠的数组对象具有相同的行数
    * 传入一维数组时, 将直接按顺序拼接, 并返回一维数组
* `np.vstack(tup)` 沿行增大的方向堆叠数组
    * `tup` 一个由数组对象为元素的列表或元组
    * 传入二维数组时, 要求被堆叠的数组对象具有相同的列数
    * 传入一维数组时, 要求传入的一维数组长度均为 `n`, 并返回一个 `n` 列的二维数组
* `np.stack(tup[, axis])` 沿指定方向堆叠矩阵 (建议该函数仅用于向新维度堆叠)
    * `tup` 一个由相同形状的数组对象为元素的列表或元组
    * `axis` 堆叠维度, 默认为传入数组的维数加一, 即在一个新的维度上堆叠
* `np.block(arrays)` 组合分块矩阵
    * `arrays` 一个由二维数组数组对象为元素的二维或一维列表
    * 传入一维列表时, 将沿列增大的方向组合, 应保证行数相同
    * 传入二维列表时, 将子列表视为分块矩阵的行, 应保证组合时行列对齐

## 数组的索引
假设现有 `n` 维的数组对象 `arrn`, 假设数组有 `len` 个元素

### 基本索引
使用 `arrn[i1, i2, ..., in]` 即可索引数组的特定元素, 索引均从 `0` 开始
* 对于二维数组, 索引数 `i1` 表示行数, `i2` 表示列数
* 对于三维数组, 索引数 `i1` 表示第 `i1` 个矩阵, `i2` 表示行数, `i3` 表示列数
* 对于 n 维数组, 总是从最外层开始索引

* 当使用负数 `-x` 作为索引时, 将表示索引 `len - x`  
因此索引 `-1` 表示数组的最后一个索引
* 当索引缺少时, 对于之后的维数将索引整个数组

### 切片索引
* 使用符号 `:` 作为索引时, 将获取整个维度下的元素, 例如 `arr2[:, n - 1]` 即可索引矩阵的第 `n` 列
* 使用符号 `i:` 作为索引时, 将获取从索引 `i` 开始直到最后的所有元素
* 使用符号 `:j` 作为索引时, 将获取从开始直到索引 `j` 的所有元素 (不包括 `j`)
* 使用符号 `i:j` 为以上二者的组合
* 使用符号 `i:j:k` 除了以 `i,j` 为边界条件外, 还将间隔 `k` 取一个元素

* 对于切片索引的部分都将变为一个具有 `g` 个元素的维度 (`g` 为索引得到的元素数)  
索引结果也将时一个维度与切片索引数相同的数组对象, 且从最外层到内的维度与切片索引对应  
例如 `arr2[:, 2]` 将索引数组的第 3 列, 但得到的结果依然为一维数组
* 可以将负数用于切片索引, 此时负数索引 `x` 将被解析为索引 `len - x`
* 由于末端不被包含, 因此索引 `i:i` 将得到空结果

### 布尔索引
通过如数组的[布尔运算](#布尔运算)可得到一个相同形状的, 布尔类型的数组对象

* 当传入单个布尔数组, 布尔数组与被索引数组具有相同的形状  
将返回一个一维数组, 按顺序排列了布尔数组中所有为 `True` 的, 与被索引数组对应位置的元素
* 当传入一维布尔数组时, 类似[切片索引](#切片索引), 要求改布尔数组与被索引维数相同, 将索引为 `True` 位置的元素

例如 `arr[arr > 10]` 可得到一个一维数组, 包含了数组 `arr` 中所有 `> 10` 的元素

### 数组索引
除了使用单个数值直接索引, 还可使用数组 (列表) 作为索引, 可一次索引多个元素  
多个数组作为索引时, 要求每个数组的长度相同 (但允许与其他索引方式混合使用)  

多个数组索引时与[切片索引](#切片索引)不同, 数组索引的本质为分别取出各个维度中数组的第 `i` 个元素作为该维度的索引, 并将此方式的索引结果存入结果的第 `i` 个位置  
但当只使用一个数组索引时, 则行为与切片索引类似

例如
* `arr[[0, 1, 2], [0, 1, 2]]` 将索引得到子数组 `[arr[0, 0], arr[1, 1], arr[2, 2]]`
* `arr[0:3, 0:3]` 将索引得到 `arr` 左上角三行三列的子数组
* `arr[[0, 2], :]` 将切片数组的第

除了使用 `[]` 运算符分别传入各个维度 , 还可以仅传入一个元组  
但此时元组中只能有数组 (即数组索引) 或数字 (即一般索引)

该方式的索引常应用于[数组元素筛选](#数组元素筛选)

### 平面索引
通过数组对象的成员 `flat`  
使用 `arr.flat[n]` 将按元素在内存的存储顺序, 索引其中第 n - 1 个元素

### 索引交互
索引数组时, 除了将索引结果作为子数组读取, 还可以对其赋值, 并且通过赋值被索引数组中的相应元素也会被修改  
赋值时要求右侧的变量满足以下任意条件
* 右侧变量为单个元素, 此时子数组中所有的元素都会被赋上这个值
* 右侧变量与子数组具有相同的形状, 此时子数组中对应元素会被赋值

注意, 此处的赋值除了一般的 `=`, 还可使用 `+=, *=` 等赋值, 实现对子数组元素的修改

## 数组运算与广播
### 数组运算
在 Numpy 中, ==数组的运算总是元素间运算==, 即对应位置元素运算, 并将结果储存在对应位置  
对于线性代数运算, 见[线性代数应用](#线性代数应用)

当参与运算的两个数组形状不相同时, 将会尝试使用广播的方式扩展两个数组  
当广播失败时, 将抛出异常

### 广播条件
参与广播的两个数组对象各个纬度的元素数应当满足以下条件
* 该维度的元素数为 1
* 该维度的元素数相同
* 不存在较高的维度

### 广播行为
广播时住，从最高维度开始（最左侧的索引），参与运算的两个数组各自元素为 1 的维度将进行复制  
注意，以上所说的复制并没有实际发生，只是形式上复制

例如
* `1xm` 的数组 `arr1` 与 `n x 1` 的数组 `arr2` 运算将分别扩展
    * `arr1` 沿行复制为 `n x m`，数组的 `n` 行均相同
    * `arr2` 沿列复制为 `n x m`，数组的 `m` 列均相同
    * 运算时将两个扩展后的数组对应位置分别运算并存入对应位置，得到一个 `n x m` 的数组
* `m` 个元素的一维数组 `arr1` 与 `n x m` 的二维数组 `arr2` 运算将分别扩展
    * `arr1` 沿行复制为 `n x m`，数组的 `n` 行均相同
    * `arr2` 不做处理
    * 运算时将两个扩展后的数组对应位置分别运算并存入对应位置，得到一个 `nxm` 的数组

### 数组运算
由广播规则可得
* 对于一个数值与数组相乘, 相当于将数组中所有元素均乘上改数值
* 对于两个一维数组相乘, 将得到一个一维数组, 其中元素的值为数组对应位置相乘
* 对于一个 `1 x n` 的数组 (行向量) 与 `m x 1` 的数组(列向量), 无论相乘顺序如何, 总将得到一个 `m x n` 的二维数组, 其中各个元素来自对应的两个数组 (类似列向量乘以行向量)
* 对于两个形状相同的二维数组相乘, 得到的结果即对应元素相乘的数量积

同理, 数值运算 `+, -, *, /, //, **` 以及比较运算 `<, >, <=, >=, ==, !=` 都以广播的方式进行

### 布尔运算
根据广播规则可得, 数组对象间的比较运算得到的是一个布尔数组对象  
因此还需要通过布尔数组对象的特殊成员进一步判断
* `arr.all()` 当布尔数组中所有元素均为 `True` 时返回 `True`, 可表示数组中所有元素满足要求
* `arr.any()` 当布尔数组中任一元素均为 `True` 时返回 `True`, 可表示数组中任一元素满足要求

根据[数组运算](#数组运算)可知, 如果要比较两个数组是否完全相同应使用 `(matA == matB).any()`
* `matA == matB` 将得到一个布尔数组, 如果有不同的位置将出现为 `False` 的元素
* `.any()` 检查返回的布尔数组是否有 `False` 元素

## 常用数组操作
### 数组信息
* `arr.ndim` 获取数组的维数 `n`
* `arr.size` 获取数组的总元素数
* `arr.shape` 获取数组的形状, 实际为一个 `n` 元素的元组, 包含了从高到低各维度的元素数
* `arr.dtype` 获取数组元素类型

### 数组变型
* `arr.T` 将数组映射为其转置 (仅用于二维数组)
* `arr.flat` 将数组映射为一维数组
* `np.reshape(a, newshape, order = 'C')` 尝试变形数组为指定形状的数组
    * `a` 被变形的数组对象或数据
    * `newshape` 变形后数组的新形状, 即包含了新形状从高到低各维度元素数的元组
    * `order` 变形时数据读取与放置顺序 (数组变形的本质即以特定顺序读取被变形的数组, 然后再以相同顺序放置到新数组中)
        * `C` 从最低的维度优先读取与写入数据, 即列优先
        * `F` 从最高的维度优先读取与写入数据, 即行优先
* `np.expand_dims(a, axis)` 扩展数组维度, 建议仅在一维数组转换为二维向量时使用  
对于任意数组数据 `arr`
    * `np.expand_dims(arr.flat, 0)` 可获得一个行向量
    * `np.expand_dims(arr.flat, 1)` 可获得一个列向量 

### 数组排序
* `np.sort(a[, axis])` 数组从小到大排序
    * `a` 被排序的数组
    * `axis` 被排列的维度  
    默认沿最低的维度排序 (对各行内的元素分别排序)  
    对于二维数组
    * 取 `axis = 1` 按行排序 (将数组按行分割, 排列其中各个子行的元素)
    * 取 `axis = 0` 按列排序 (将数组按列分割, 排列其中各个子行的元素)
* `np.argsort(a[, axis])` 数组从小到大排序, 但结果中使用索引代替值
    * 参数含义与 `np.sort` 相同
    * 结果的索引为划分的子列 / 行中的索引, 例如 `arr[np.argsort(arr, 0)[m, 1], 1]` 可获取 `arr` 第 1 列中从小到大次序为 m 的元素

### 数组元素筛选
* `np.argmax / argmin(a)` 获取数组中最大值 / 最小值元素的索引
    * 对于高维数组, 返回值为在使用 `arr.flat` 展开时的索引
    * 对于一维数组, 返回值即单个索引
* `np.where(b)` 根据布尔数组, 获取布尔数组中为 `True` 的元素对应的索引  
    * 返回值为一个 `n` 元素的元组, 其中的元素均为 `m` 元素的正数数组对象  
    其中 `n` 即数组 `b` 的维数, `m` 为数组 `b` 中为 `True` 的元素个数  
    * 可配合[数组索引](#数组索引)得到类似布尔索引的效果

### 数组统计
* `np.max / amin(a[, axis])` 获取数组的最大值 / 最小值
    * `a` 被统计的数组
    * `axis` 沿特定轴统计 (之后的统计函数类似)  
    即遍历统计轴外的维度, 将统计轴上的极值存在数组的对应位置中  
    默认为整个数组统计, 得到单个结果  
    例如
        * 对于二维数组 `axis = 0` 表明统计各列的极值
        * 对于二维数组 `axis = 1` 表明统计各行的极值
        * 对于三维数组 `axis = 0` 将分别统计得到一个矩阵, 该矩阵各个位置的元素为数组中所有矩阵在该位置上的最大元素
* `np.median(a[, axis])` 获取数组的中位数
* `np.median(a[, axis])` 获取数组的算数平均数
* `np.std(a[, axis])` 获取数组的标准差
* `np.var(a[, axis])` 获取数组的方差
* `np.ptp(a[, axis])` 获取数组的极差
* `np.corrcoef(x, y)` 获取数组的相关系数, 参考 <https://numpy.org/doc/stable/reference/generated/numpy.corrcoef.html>

## 数学函数应用
### 基础应用
* `np.e / np.pi / np.inf` 常量, 表示自然对数的底数, 圆周率, 无穷大
* `np.cos / sin / tan(a)` 三角函数, 可传入单个数值或数组, 单位为弧度
* `np.exp / sqrt / square / abs(a)` 常用的指数, 开方, 平方, 绝对值函数
* `np.log / log2 / log10(a)` 自然对数, 以 2 为底的对数, 以 10 为底的对数函数
* `np.rad2deg / deg2rad(a)` 角度制与弧度制转换
* `np.around(a, decimals = 0)` 四舍五入
    * `a` 四舍五入的数值或数组
    * `decimals` 舍入到小数点后的位置, 如果传入负数, 将舍入到小数点前
* `np.arctan2(x, y)` 四象限反正切, 分别对应 X, Y 坐标, 返回值单位为弧度
* `np.power(x, y)` x 的 y 次幂

### 多项式
关于多项式函数的详细说明参考 <https://numpy.org/doc/stable/reference/routines.polynomials.poly1d.html>

* `np.roots()` 多项式求解
* `np.polyfit()` 多项式拟合
* `np.polymul()` 多项式相乘
* `np.polydiv()` 多项式相除
* `np.polyval()` 多项式求值

### 线性代数
注意在线性代数中, 必须确保所有参与运算的数组对象都是二维的  
一维数组需要通过[数组变型](#数组变型)转换为向量

对于矩阵分解等更多函数, 见 <https://numpy.org/doc/stable/reference/routines.linalg.html>

* `mat.T` 获取向量 / 矩阵的转置
* `np.dot(a, b)` 计算两向量的点乘
* `np.cross(a, b)` 计算两向量的交叉积, 注意 `a, b` 需要为行向量, 且结果也是行向量
* `a @ b` 矩阵乘法 (注意 Numpy 中的矩阵乘法需要使用此符号)
    * 如果 `a, b` 中有一个矩阵与一个一维数组 (或两个一维数组), 将自动确定一维数组的形状 (左乘行向量, 右乘列向量)
* `np.linalg.norm(x, ord)` 计算矩阵或向量的范数
    * `x` 用于计算的矩阵或向量
    * `ord` 范数类型 (对于向量默认为 `2`, 对于矩阵默认为 `fro`)
        * 数字表示 p 范数, 可以是 `np.inf`
        * `fro` 表示 F 范数
* `np.linalg.svd(a, compute_uv=True)` 奇异值分解
    * `a` 用于计算的数组
    * `compute_uv` 是否计算矩阵 $U, V$
    * 返回元组 `(U, S, Vh)`
        * `U, Vh` 奇异值分解中的正交矩阵 (`compute_uv=True` 时返回)
        * `S` 由奇异值组成的向量

## 高级应用
### 数组间赋值与拷贝
* 默认情况下, 数组对象间的直接赋值为浅复制, 因此赋值 `arr = b` 后, 修改数组 `arr` 时数组 `b` 也将同时被修改
* 除了直接赋值, 数组[索引](#索引交互)得到的子数组, 以及[数组通过 flat, T 等映射](#数组变型)赋值给新数组也是浅复制
* 将数组传递给函数也是浅复制, 因此修改作为参数的数组对象, 原始数组对象也将改变
* 对于[大部分数组操作](#常用数组操作)与[数学函数应用](#数学函数应用), 返回值都是与新的数组

因此, 如果希望进行深拷贝避免连带性的修改, 应当使用数组对象的方法 `arr.copy()`, 创建一个数组对象的深拷贝

### 数据导入与导出
* `np.save(file, arr)` 以二进制形式导出单个 Numpy 数组
    * `file` 文件名或[文件对象](../base/module.md#文件操作)
        * 传入文件名时, 不需要指定后缀, 将自动保存为具有后缀 `.npy` 的文件
        * 传入文件对象时, 应使用二进制写入即 `rb` 模式
    * `arr` 导出的 Numpy 数组
* `np.savez(file, *arrs, **kwarrs)` 以二进制形式导出多个 Numpy 数组
    * `file` 文件名或[文件对象](../base/module.md#文件操作)
        * 传入文件名时, 不需要指定后缀, 将自动保存为具有后缀 `.npz` 的文件
        * 传入文件对象时, 应使用二进制写入即 `rb` 模式
    * `*arrs, **kwarrs` 导出的多个 Numpy 数组
        * 按位置传入时将命名为 `arr_n`
        * 按关节字传入时将根据关键字命名
    * 类似的还有 `np.savez_compressed` 该函数将同时压缩数组
* `np.load(file)` 导入 Numpy 数组文件 `.npy` 或 `.npz`
    * `file` 文件名或[文件对象](../base/module.md#文件操作)
        * 传入文件名时, 需要给出带后缀的完整文件名
        * 传入文件对象时, 应使用二进制读取即 `wb` 模式
    * 读取 `.npy` 文件时, 将返回一个 Numpy 数组
    * 读取 `.npz` 文件时, 将返回一个字典, 字典的索引即保存时的数组名称, 值即对应的 Numpy 数组
