# Numpy
## 引入模块
```python
import numpy as np
```
通常以 np 为别名引入模块

## ndarray 对象
* n 维数组对象
* 保存的数据类型相同
* 以 0 为下标开始

### 创建 ndarray 对象
```python
numpy.array(object, dtype = None, copy = True, order = None, subok = False, ndmin = 0)
```
1. object 用于创建的列表, 嵌套列表则创建多维数组
2. dtype 数组的类型, 有 np.float, np.int16, np.int32 等

### 对象属性
1. dtype
数组元素类型
2. size
数组元素总数
3. shape
数组各维度长度
4. ndim
数组的维度数量

### 创建简单数组
基本格式 np.fun([shape], dtype)
1. np.empty
创建空数组, 内部的值没有初始化, 为随机数
2. np.zeros/ones
创建填充 0/1 的数组
3. np.full([shape], [fill_value], dtype)
创建由默认值填充的数组

### 创建一维数组
1. numpy.arange([start], [stop], [step], dtype)
创建等差数列
    * stop 终止值 (不包含)
    * start 起始值
    * step 步长
2. np.linspace([start], [stop], [num], endpoint = True, dtype)
创建等差数列
    * num 数列长度
    * endpoint 是否包含 stop, 默认不包含
3. np.logspace([start], [stop], [num], endpoint = True, base=10.0, dtype)
创建等比数列
    * base 底数

### 创建二维数组
1. np.eye([大小])
创建单位矩阵
2. np.diag([对角线上的元素])
创建对角矩阵

## 索引与切片
### 直接索引
```python
ndarray[维度1, 维度2, ...]
```
通过一个中括号, 其中包含各个维度的坐标的方式直接索引

对于二维数组
```
#  0  1  2 列
[ [0, 1, 2]     # 第 0 行
  [3, 4, 5]     # 第 1 行
  [6, 7, 8] ]   # 第 3 行
```

对于三维数组
```
# 第 1 层
[[[0 1]     # 第 0 行
  [2 3]]    # 第 1 行
# 第 2 层 
 [[4 5]
  [6 7]]]
```

* 数组索引总是由外向内, 最为外层的数组维度最高
* 在三维数组中, 层最外, 行次之, 列最内, 因此索引为 arr[层][行][列]
* 函数中的轴同理, 次序最小的轴为最外层的轴, 即 axis = 0 为三维数组 arr 的 z 轴

### 截取子数组(切片索引)
```python
new_array = old_array[a:b, c:d, ...]
```
与字符串截取相同的方式截取子数组

* 直接截取得到的是引用, 最好使用 copy 方式截取, 得到独立的数组
```python
new_array = old_array[a:b, c:d, ...].copy()
```
* 使用 ... 或 : 可以表示维度中所有的元素

### 向量索引
```python
new_array = old_array[[列表1], [列表2], ...]
```
与 matlab 类似, 通过列表(列向量), 表示个各个维度的坐标, 索引元素, 返回一个一维数组

### 部分向量索引
当向量索引中, 列表数 < 维度数, 将会截取部分
eg. 截取 array 的第 1 层的第 3 列与第 2 层的第 4 列

```python
res = array[[1, 2], [3, 4]]
```

### 布尔索引
```python
new_array = old_array[[布尔数组]]
```
与 matlab 类似, 对数组布尔运算, 将返回布尔数组, 使用布尔数组实现索引, 返回一个一维数组

eg. 结合取反 ~, 过滤 nan 元素
```python
num = array[~np.isnan(array)]
```

#### 布尔索引注意
1. 使用按位与与括号(不是用逻辑与 AND)
```python
num = arr[(arr > 0.3) & (arr < 0.7)]
```
2. 布尔索引的数组维度低于被索引数组时, 则可索引列
eg.
```python
b = a[(a[..., 0] > 2) & (a[..., 2] < 3>)]
```

## 数组操作

### 广播
当两个数组形状相同, 即 a.shape == b.shape, 则数组之间的运算为对应位置的值之间运算
否则将尝试使用广播的方式运算

#### 广播规则
假设数组 a 较大, b 较小
1. 将 b 在其他维度的大小设为 1
2. 找到 a 与 b 大小对齐的维度
3. 复制 b 与 a 对齐的部分, 直到与 a 相同大小, 进行计算
4. 当 b 存在一个大小不为 1 且不与 a 对齐的维度, 将抛出异常

eg.
```python
# 创建一个 0 - 8 的方阵
arr = np.reshape(np.arange(0, 9, 1), (3, 3))
# 普通运算, 对应位置的值相乘
res = arr * np.random.random((3, 3))
# 广播, 行数不匹配, 列数匹配, 则将复制列, 此时相当于对 arr 的每一列加上 [5, 6, 7]
res = arr + np.array([5, 6, 7])
```

### 迭代数组
使用 np.nditer([narray]) 可以获取一个用于迭代数组的迭代器, 从而可以不考虑数组的坐标, 按顺序遍历数组中的所有元素, 或用于 for 循环
eg.
```python
for x in np.nditer(arr):
    print(x)
```

#### 迭代时修改元素
默认得到的迭代器为只读, 如果要在迭代中修改数组的值, 需要指定函数参数 op_flags, 并且使用 x[...] 的方式访问元素的引用, 迭代变量 x 始终是拷贝
```python
for x in np.nditer(arr, op_flags=['readwrite']):
    x[...] = x + 1
```

#### 合并迭代
使用列表传入多个大小相同的数组, 迭代时可同时得到两个在同一位置的元素
```python
for x, y in np.nditer([arr1, arr2]) :
    print(x, y)
```

当 arr1 与 arr2 不同时, 将采用广播规则扩展其中一个数组

### 修改数组
1. np.reshape(arr, newshape)
修改数组的形状
2. ndarray.flat
数组对象的成员, 为一个只读迭代器, 类似 np.nditer()
3. np.transpose(arr, axes)
    * 交换数组的维度
    * axes 为一个整数列表, 表示交换后各个旧维度对应的新维度
4. ndarray.T
数组对象的成员, 为数组的转置
5. np.broadcast_to(array, shape)
使用广播规则扩展数组
6. np.concatenate((a1, a2, ...), axis)
    * 合并数组
    * axis 合并数组的方向, 默认为 0
    * 注意要用一个包含合并数组的元组作为第一个参数
7. np.stack(arrays, axis)
堆叠数组, 会产生新的轴
8. np.append(arr, values, axis)
向数组末尾添加值, 插入的值必须与原数组匹配, 返回新数组(原数组没有被修改)
    * append 的返回值始终是一维数组, 如果要合并数组使用上方的函数
9. np.insert(arr, obj, values, axis)
    * obj 插入位置的索引
向数组中插入元素, 如果没有指定 axis, 数组将会被展开成一维, 返回新数组
10. np.delete(arr, obj, axis)
向数组中删除元素, 如果没有指定 axis, 数组将会被展开成一维, 返回新数组
11. np.unique(arr, return_index, return_inverse, return_counts)
查看数组中的重复元素, 或查看重复次数, 参数含义查表
12. ndarray.sort()
对数组排序, 返回 None

### 视图与副本
#### 获取视图
视图即浅拷贝, 得到的是原始数据的引用, 当改变引用时, 原始数据也将改变, 可通过内置函数 id() 判断是否是同一个引用
* 使用 ndarray.view()
* 数组间直接赋值
* 对数组进行切片索引得到的子数组
* ==使用 ndarray.T 得到的转置==

eg.
```python
b = arr[:, 1]
# 此时输出的 id 相同, 如果改变 b[1], arr[0, 1] 同时改变
print(id(arr[0, 1]))
print(id(b[1]))
```

#### 获取拷贝
即深拷贝, 数据与原始数据相同, 但储存位置不同
* 使用 ndarray.copy()
* 数组间运算后的返回值
* 数组操作函数返回的修改后的数组

## 数学函数
操作数组最好使用来自 np 模块的数学函数, 函数将对数组内的每个值分别计算

### 三角函数
cos, sin, tan, arcsin 等

### 舍入函数
floor, round, ceil 等

### 算数函数
pow, add, mod, subtract, multiply, divide 等

### 统计函数
std, var, mean, cov(协方差), median(中位数), ptp(极差), percentile(百分比轴向), amax, amin(轴向极值) 等

### 线性代数
注意在 numpy 中, 默认向量为行向量

#### 转置注意
1. 使用 ndarray.T 可实现转置, 但是数组的维度必须为 2, 如果仅有单维度则无法转置
eg.
```python
print(np.array([1, 2]).T) # 维度为1无法转置
print(np.array([[1, 2]]).T) # 维度为2可以转置
print(np.array([1, 2], ndim = 2).T) # 维度为2可以转置
```
2. 使用 ndarray.T 得到的转置为原数组的引用, 修改转置后原数组也将改变

#### 线性代数计算
1. np.dot()
向量点积
2. np.cross()
向量叉乘
3. np.matmul()
矩阵乘法 如果是矩阵乘向量, 则结果取决于向量的方向, 可通过 ndarray.T 转置
4. numpy.linalg.det()
计算行列式
5. numpy.linalg.solve()
求解线性方程
6. numpy.linalg.inv()
求解逆矩阵
7. nparray @ nparray
向量点乘 / 矩阵乘法运算符

[Matlab 的函数对应的 numpy 函数](https://mathesaurus.sourceforge.net/matlab-numpy.html)

### 统计函数
#### 线性回归
1. np.polyfit(x, y, deg)
获取数据的线性回归, deg 为线性回归次数

## 数据IO
### npy/npz 数据
1. np.save(file, arr)
    * 将数组以 .npy 的格式保存
    * file 为保存文件的路径

2. np.savez(file, *args, **kwds) 
    * 将多个数组以 .npz 的格式保存
    * *args 表示多个用于保存的数组
    * **kwds 表示保存文件中, 数组的名称
eg.
```python
# 将数组 c 以名称 c_data 保存, 其余数组使用默认名称 arr_x
np.savez("output.npz", a, b, c, c_data = c)
```

3. np.load(file)  
    * 读取 .npy/.npz 数据
    * 对于 .npy, 返回读取到的数据数组
    * 对于 .npz, 返回一个字典, 字典的键为数组的名称, 值为数组

### 使用 HDF5 格式保存
使用 .hdf5 格式可用于保存复杂, 大量不同格式的数据, 使用库 h5py 操作

#### 写入数据
1. 创建文件
f = h5py.File(name, mode = 'w')
    * name 文件名
    * 'w' 以写入的方式读取文件
    * 返回一个 h5py 文件对象
2. 存放 numpy 数组
    * 直接存放 f[键值] = arr
    * 使用函数 f.create_dataset(名称, data = arr)

#### 读取数据
1. 打开文件 (可使用此语法捕捉异常)
with h5py.File(name, mode = 'r') as f :

2. 读取 numpy 数组
    * arr = f[键值][:]
