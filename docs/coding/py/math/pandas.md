# Pandas
<https://pandas.pydata.org/>

默认以 `import pandas as pd` 的方式导入模块

主要参考教程
* <https://pandas.pydata.org/docs/user_guide/10min.html>
* <https://pandas.pydata.org/docs/user_guide/basics.html>

对于布尔索引, 比较, 统计, 转置等针对数值数据的操作, 建议使用 [dataframe.to_numpy()](#快速浏览) 转为 Numpy 数组后, 在 Numpy 数组的基础上进行

## 数据表创建
Pandas 中基本的数据结构为序列 `pd.Series` 与数据表 `pd.DataFrame`
* 序列 `pd.Series` 为一个具有标签的一维数组, 数组可用于储存任意 Python 类型, 但要求同一个数组中的元素具有相同的类型  
注意, 序列可以隐式地转换为 Numpy 数组
* 数据表 `pd.DataFrame` 为一个二维的数据结构, 其中保存一个由序列 `pd.Series` 按列排列成的二维数据表, 数据表的各行可有指定的序号, 各列可有指定的列名  

更多创建方法见 <https://pandas.pydata.org/docs/user_guide/dsintro.html>

### 创建序列
`pd.Series(data, index = None, *, dtype = None, name = None, copy = None)` 通过序列对象的构造函数创建序列
* `data` 序列中的数据, 可以是一维的列表或Numpy 数组以及非嵌套的键值对 (使用键值对时, 将使用键名作为序列的编号, 键值为对应编号的元素)
* `index` 一维的与数据长度相同的数组, 表示序列各个元素的编号, 一般使用字符串数组, 或 `None` 表示默认的按从 0 开始的数字编号
* `dtype` 序列元素类型, 可使用字符串表示, 默认将自动识别, 具体见[数据类型表示](#数据类型表示)
* `name` 序列名称, 一般为字符串, 默认无名称即 `None`
* `copy` 序列是否赋值原数据, 默认为 `None` 即 `False`, 序列数据直接引用原数据, 当序列修改时原数据也将修改

### 基于二维数组创建数据表
将数据表视为由二维数组的数据体, 以及两个一维数组的行序号与列标题组成, 有创建数据表方法

`pd.DataFrame(data, index = None, columns = None, dtype = None, copy = None)`
* `data` 数据表中的数据体, 可以是二维的列表或Numpy 数组
* `index` 数据表的行序号, 默认为从 0 开始的数字编号, 可以是任意形式的一维数组
* `columns` 数据表的列标题, 默认为从 0 开始的数字编号, 可以是任意形式的一维数组
* `dtype` 限定==整个数据体==的数据类型, 具体见[数据类型表示](#数据类型表示), 如果传入 `None` 则不限制 (即各列的元素类型可以不同)
* `copy` 数据表是否赋值原数据, 与[创建序列](#创建序列)中的 `copy` 参数含义相同

对于行序号与列标题
* 可使用 [np.arange](./numpy.md#生成特定形状的数组) 创建特定顺序的序号
* 可使用 [pd.date_range](#时间戳类型) 创建时间顺序的序号

创建例子 `pd.DataFrame(np.random.random((3, 3)), pd.date_range("2024/4/27", periods = 3, freq = 'D'))`

### 基于序列字典创建数据表
将数据表视为由多个长度相同的[序列](#创建序列)组合而成, 有创建数据表方法

`pd.DataFrame(data, index = None, *, dtype = None, copy = None)`
* `data` 一个字典, 字典的键名为列标题, 键值为一个单个值 (该列将重复该值) 或任意形式的一维数组 (要求所有传入的一维数组具有相同长度)
* `index` 数据表的行序号, 默认为从 0 开始的数字编号, 可以是任意形式的一维数组
* `dtype` 含义同[基于二维数组创建数据表](#基于二维数组创建数据表)
* `copy` 含义同[基于二维数组创建数据表](#基于二维数组创建数据表)

创建例子 `pd.DataFrame({"A": np.arange(3), "B": False})`

## 数据类型
Pandas 数据结构中的数据类型称为 `dtype`, 通常在创建数据结构时需要指定, 通过序列的同名成员也可查询序列的数据类型  

### 数据类型表示
表示数据类型时, 可使用字符串或 Pandas 内定义的类名表示, 常用的有
* `pd.Int32Dtype` 表示 32 位整数 (可使用字符串 `Int32` 表示)
* `pd.Float64Dtype` 表示 64 位浮点数 (可使用字符串 `Float64` 表示)
* `pd.StringDtype` 表示字符串类型 (可使用字符串 `string` 表示)
* `pd.BooleanDtype` 表示布尔值 (可使用字符串 `boolean` 表示)
* `pd.CategoricalDtype(categories = None, ordered = None)` 表示类别类型 (可使用字符串 `categories` 表示, 将根据传入数据自动创建)
* `pd.DatetimeTZDtype(unit = 'ns', tz = None)` 表示时间戳类型
* `pd.PeriodDtype(freq)` 表示时间间隔类型
* `np.object0` 表示任意 Python 对象, 如字符串, 当传入一列中包含如字符串等 Python 对象或多种无法转换的数据时将自动使用该类型 (可使用字符串 `object` 表示)

更多见文档 <https://pandas.pydata.org/docs/user_guide/basics.html#basics-dtypes>

### 类别类型
对于类别类型 `pd.CategoricalDtype(categories = None, ordered = None)` 类似于枚举类型, 此时元素必须在类别限定的范围内
* `categories` 列表, 表示该类别内允许的取值, 可以是字符串或数字, 如果不指定, 则将根据第一次传入的数据作为限定范围
* `ordered` 各个取值之间是否有先后关系, 默认为 `None` 即 `False`, 类别取值之间的关系与列表 `categories` 中的排序无关

使用类别类型时注意
* 对于有限取值的数据, 可限定为类别, 既可以对数据进行约束, 也可减少内存占用
* 传入类别类型的数据时, 仅类别内的值能被传入, 类别之外的值将被视为空数据 `NaN`
* 对于类别类型对象, 其成员 `categories` 为一个列表, 保存了该类别类型允许的取值范围
* 更多可参考类别文档 <https://pandas.pydata.org/docs/user_guide/categorical.html#categoricaldtype>

### 时间戳类型
对于时间戳类型 `pd.DatetimeTZDtype(unit = 'ns', tz = None)` 其本质为一个整数时间戳, 可以表示为时刻, 可以是现实时刻或相对时刻
* `unit` 时间戳的单位, 现仅支持 `ns` 纳秒
* `tz` 时区, 可参考 <https://docs.python.org/3/library/zoneinfo.html>

使用时间戳对象 `pd.Timestamp` 表示该类型的数据
* 时间戳对象有如下常用的构造方法 (插入时间戳数据时, 建议插入具体的时间戳对象)
    * `pd.Timestamp(value)` 中 `value` 为一个 `YYYY-MM-DD hh:mm:ss.ss` 的字符串 (较小的单位可以省略)
    * `pd.Timestamp(value, unit)` 中 `value` 为时间值, `unit` 为时间值的单位, 可参考 `pd.PeriodDtype(freq)` 的参数 `freq`
* 使用 `pd.to_datetime(...)` 可尝试将传入的数据 (字符串或时间戳) 转换为时间戳对象, 可传入列表或序列, 此时将转换其中各个元素
* 使用 `pd.Timestamp.now()` 可获取当前时间的时间戳对象
* 通过时间戳对象的成员 `second`, `minute`, `hour`, `day` 等可访问时间戳的具体时间
* 通过时间戳对象成员函数 `pd.Timestamp.strftime(format)` 可将时间戳按特定格式转化为字符串, 可参考 [time.strftime(format)](../base/module.md#日期获取) 函数
* 通过时间戳对象相减, 可得到时间间隔对象
* 通过函数 `pd.date_range(start = None, end = None, periods = None, freq = None)` 创建固定间隔的时间戳序列
    * `start` 开始时间, 可使用时间戳对象或字符串表示
    * `end` 序列末端时间, 可使用时间戳对象或字符串表示, 默认包含末端时间
    * `periods` 序列长度, 使用数字表示
    * `freq` 序列时间间隔, 类似 `pd.PeriodDtype(freq)` 的参数 `freq`
    * 只需指定 `start` 与 `end`, `periods`, `freq` 三个参数中的两个即可生成固定时间间隔的时间戳序列
* 更多可参考时间戳文档 <https://pandas.pydata.org/docs/user_guide/timeseries.html#overview>

### 时间间隔类型
对于时间间隔类型 `pd.PeriodDtype(freq)` 与时间戳类似, 但时间间隔有最小单位限制, 更多用于记录特定时间间隔
* `freq` 最小时间间隔单位, 使用字符串表示, 常用的有
    * `s` 秒, `ms` 毫秒, `us` 微秒, `ns` 纳秒
    * `min` 分钟, `h` 小时, `D` 日
    * 可使用数字加单位的组合, 此时最小时间间隔为特定的时长

使用时间间隔对象 `pd.Period` 表示该类型的数据
* 时间间隔对象有如下常用的构造方法
    * `pd.Period(value, freq)` 中 `value` 含义与 `pd.Timestamp(value)` 中的参数相同, `freq` 含义与 `pd.PeriodDtype(freq)` 中的参数相同
    * `pd.Period(ordinal, freq)` 中 `ordinal` 为时间间隔使用最小时间单位表示的时长
* 时间间隔对象与整数间加减运算, 将根据最小单位加上会减去对应时间
* 通过时间间隔对象成员函数 `pd.Period.strftime(format)` 可将时间戳按特定格式转化为字符串, 可参考 [time.strftime(format)](../base/module.md#日期获取) 函数
* 通过函数 `pd.period_range(start = None, end = None, periods = None, freq = None)` 创建固定间隔的时间间隔序列, 函数参数含义与 `pd.date_range(...)` 类似 
* 跟多可参考时间间隔文档 <https://pandas.pydata.org/docs/user_guide/timeseries.html#timeseries-periods>

## 数据表统计与查询
### 数据表基本信息
使用数据表对象 `dataframe` 的成员变量可用于查询数据表的部分基本信息, 常用的有
* `dataframe.shape` 获取数据表的形状, 值为一个元组 `(行数, 列数)`
* `dataframe.size` 获取数据表的元素总数
* `dataframe.dtypes` 获取数据表中各列的数据类型, 值为一个序列, 序列中的元素为对应列的 [dtype](#数据类型), 对应序号为对应列的列名
* `dataframe.index` 获取数据表的行序号, 值为一个不可修改的一维数组, 对应各行序号
* `dataframe.columns` 获取数据表的列标题, 值为一个不可修改的一维数组, 对应各列标题

### 快速浏览
使用数据表对象 `dataframe` 的以下常用成员方法可用于快速浏览数据表
* `dataframe.describe()` 统计数据表各列, 得到一个与原数据表列相同, 但各行元素为统计值, 行序号为统计方法的数据表 (仅统计数值列)
* `dataframe.to_numpy()` 获取数据表中 Numpy 数组形式的数据体拷贝 (如果各列数据不同, 则得到的 Numpy 数组类型为 `np.object0`)
* `dataframe.head(n = 5)` 打印数据表前 `n` 行数据
* `dataframe.tail(n = 5)` 打印数据表后 `n` 行数据

### 数据表排序
以上浏览函数可配合以下排序函数使用
* `dataframe.sort_index(*, axis = 0, ascending = True, ignore_index = False, na_position = 'last')` 根据行序号或列标题排序
    * `axis` 排序对象
        * `axis = 0` 按行序号排序各行
        * `axis = 1` 按列标题排序各列
    * `ascending` 是否按从大到小的方式排序, 默认为 `True`
    * `ignore_index` 排序时是否忽略行序号的移动, 默认行序号将随排序移动
    * `na_position` 空元素位置, 可取字符串 `first` 或 `last`, 默认为 `last`, 空元素位于最后
* `dataframe.sort_values(by, *, axis = 0, ascending = True, ignore_index = False, na_position = 'last')` 根据数据进行排序
    * `by` 排序参考列的标题 (排序行) 或行的序号 (排序列), 可传入列表, 按顺序包含多个排序参考
    * 其余参数与 `dataframe.sort_index` 参数含义相同

### 数据统计
对于数据表的统计成员方法可参考文档 <https://pandas.pydata.org/docs/reference/frame.html#computations-descriptive-stats>  
以下仅介绍部分常用统计函数

* `dataframe.mean(axis = 0, skipna = True, numeric_only = False)` 统计平均值
    * `axis` 统计对象, 取 `0` 为按行统计 (统计同一列中元素的平均值), 取 `1` 为按列统计
    * `skipna` 是否排除空数据
    * `numeric_only` 是否仅统计以数值为元素的列
    * 返回值为一个序列, 序列的序号为被统计列的标题, 值为统计值
    * 类似的还有如下统计函数  
        * 最大值 `max`, 最小值 `min`, 中位数 `median`, 总和 `sum`, 标准差的无偏统计 `sem`, 标准差 `std`, 方差 `var`
        * 分位数 `quantile(q, axis, numeric_only)`, 参数 `q` 为分位比, 即一个 0 到 1 的浮点数
* `dataframe.value_counts(subset = None, normalize = False, dropna = True)` 统计数据表各行数据出现的次数
    * `subset` 被统计列, 可传入单个列标题, 列标题组成的列表或 `None` (统计所有列)  
    仅当统计列上元素相同时才会被统计一次, 因此传入 `None` 时将用于统计重复行数
    * `normalize` 是否标准化, 标准化时将以比例代替频次, 默认为 `False`
    * `dropna` 是否抛弃含空数据的行, 默认为 `True`
    * 返回值为一个序列, 序列的序号为统计的数据组合, 值为该组合的统计值
* `dataframe.count(axis = 0, numeric_only = False)` 统计数据表中所有数据均非空的行数 / 列数
    * `axis` 统计对象, 取 `0` 为按行统计 (统计各列的非空元素数), 取 `1` 为按列统计 (统计各行的非空元素数)
    * `numeric_only` 是否只统计数值, 跳过非数值
    * 返回值为一个序列, 序列的序号为被统计列的标题, 值为统计值
* 对于自定义统计函数可参考 [dataframe.agg](#用户定义操作)

### 数据表迭代
注意, 数据表迭代效率极低, 一般不推荐使用, 更多详见 <https://pandas.pydata.org/docs/user_guide/basics.html#iteration>
* 对于纯数值数据推荐使用 `to_numpy()` 转为 Numpy 数组迭代
* 对于自定义遍历统计与修改元素推荐使用[用户定义操作](#用户定义操作)
* 使用以下方法迭代数据表时, 迭代量为原始数据表的拷贝, 迭代无效

Pandas 有以下常用的序列迭代方法
* `for i in series` 直接迭代序列, 此时循环将迭代序列中的值
* `for index, value in series.items()` 迭代序列各元素
    * `value` 被迭代的序列元素
    * `index` 被迭代元素的序号

Pandas 有以下常用的数据表迭代方法
* `for label, col in dataframe.items()` 迭代数据表的各列
    * `col` 数据表中被迭代的列, 为序列类型
    * `label` 被迭代列对应的列标题
* `for row in dataframe.itertuples()` 迭代数据表的各行
    * `row` 数据表中被迭代的行, 为一个以被迭代行的行序号 (为 `Index` 成员) 以及各列标题为成员的常量数据类

## 数据表索引
以下以数据表的索引为主, 但对于序列的索引同理, 区别是仅支持一维

### 基本索引
对数据表对象使用 `[]` 运算符, 可进行基本索引  

* `dataframe[title]` 按列标题索引, 其中 `title` 为被索引列的列标题  
    * 注意列标题的类型, 当列标题为数字时, 不能使用字符串索引, 相反同理
    * 该索引将得到该列数据为元素与行序号为序号的[序列](#创建序列)  
    * 允许使用传入列标题组成的列表以索引多个列, 得到子数据表
* `dataframe[i : j : k]` 按行切片索引, 使用数值切片索引时, 将==直接索引数据表中的实际行==, 从 0 开始编号, 与行序号无关  
    * 索引规则与 Numpy 数组类似, 可参考 [Numpy 数组的切片索引](./numpy.md#切片索引)
    * 索引结果为一个由被选中行组成的子数据表 (不保留原始行序号)

注意, 使用基本索引时
* 仅传入单个数字将尝试按标题索引列, 而无法索引行
* 除了布尔索引, 更推荐使用以下的索引方式, 而不使用直接索引

### 按行列标签索引
使用数据表的成员 `loc` 的 `[]` 运算符, 可按实际行序号与列标题索引

* `dataframe.loc[i]` 索引数据表中行序号为 `i` 的 `i` 行
    * 索引结果为一个以列标题为序号, 行内容为元素的序列
    * 当以行序号为[时间戳](#时间戳类型)类型时, 可使用字符串表示时间戳 (表示方法与创建时间戳使用的字符串相同)
* `dataframe.loc[i : j : k]` 切片索引数据表
    * `i`, `j` 为行序号, `k` 为索引间隔
    * 索引规则与 [Numpy 数组的切片索引](./numpy.md#切片索引)类似, 但 `i`, `j` 行都将包括在索引内且行序号 `j` 对应的实际行必须大于 `i`
    * 索引结果为一个由被选中行组成的子数据表 (保留原始行序号)
* `dataframe.loc[list]` 数组索引数据表
    * `list` 为一个由行序号组成的一维列表
    * 索引结果为一个由被选中行组成的子数据表 (保留原始行序号)
* `dataframe.loc[m, labels]` 除了按行索引外, 并指定的结果中包含的列
    * `m` 即上文索引方式任意一种
    * `labels` 索引的列标题或列标题组成的列表
    * 索引结果为一个由被选中行组成的子数据表, 且仅保留 `labels` 中指定的列标题的列 (保留原始行序号)
    * 利用缺省的切片索引, 通过 `dataframe.loc[:, labels]` 则可以索引数据表中的特定几行

### 按实际位置索引
使用数据表的成员 `iloc` 的 `[]` 运算符, 可按数据的实际位置索引

* `dataframe.iloc[a]` 按实际位置索引行, 可支持单行, 切片与数组索引, 索引规则与[按行列标签索引](#按行列标签索引)类似
    * 以实际位置序号为索引, 从 0 开始编号 (类似 Numpy, 允许使用负数从末端索引)
    * 切片索引中, 索引序列末端 `j` 不被包括 (与 Numpy 相同)
    * 索引结果依然保留原始的行序号信息
* `dataframe.iloc[a, b]` 按实际位置索引行与列, 相当于将数据体视为一个二维的 Numpy 数组
    * `a` 行的索引, 规则与上文类似
    * `b` 列的索引, 规则与上文类似, 使用实际列序号进行索引
    * 当多个数据被索引时, 索引结果依然保留原始的行序号与列标题信息
    * 当仅有单个数据被索引时, 将得到

### 修改索引数据
* 当单个元素被索引时, 如 `dataframe.loc[2, 'A']`
    * 可直接使用单个新元素赋值, 此时将使用新元素代替原元素
* 当多个元素被索引为序列时, 如 `dataframe.loc[1 : 2, 'A']` 切片索引类或 `dataframe.loc[1]` 索引单行
    * 可直接使用相同长度数组或序列赋值, 此时将按顺序赋值修改被索引的几个元素
    * 可以使用单个元素赋值, 此时将修改所有被索引的元素 (无法转换时总是尝试转换为 `object` 类型)
* 当行列被切片索引为子数据表时
    * 可直接使用相同形状的二维数组或数据表赋值, 此时将按顺序赋值修改被索引的几个元素
    * 可以使用单个元素赋值, 此时将修改所有被索引的元素
* 通过数据表切片索引得到的序列或子数据表均为只读的, 即不能单独修改其中的元素, 只能整体赋值  
例如 `dataframe.loc[2, 'A'] = 1` 是允许的, 但 `dataframe.loc[2]['A'] = 1` 是无效的
* 索引修改时注意元素, 应保证赋值的类型之间满足数据表对各列数据类型的约束, 至少也要保证能相互转换, 否则将导致位置后果 (一般为出错, 列类型修改为 `object` 或被视为空数据)
* 对于 `dataframe.loc[column]` 与 `dataframe[label]`, 如果索引不存在, 将创建新行或列
* 通过索引序列并调用其成员函数修改序列, 则数据表也将被修改

## 数据表修改
### 数据表插入行与列
对数据表插入行与列的效率并不高, 推荐先使用一个字典或列表保存原始数据, 再转换为数据表  
常用的 `append` 方法已经被移除, 此处也不进行介绍  
更多参考文章 <https://stackoverflow.com/questions/10715965/create-a-pandas-dataframe-by-appending-one-row-at-a-time>

对于多行合并或多列合并可参考[数据表合并](#数据表合并)

### 数据表合并
数据表合并操作较为复杂, 此仅介绍简单的合并, 复杂合并可参考 <https://pandas.pydata.org/docs/user_guide/merging.html#concat>

* `pd.contact(frames, *, axis = 0, ignore_index = False)` 按行合并
    * `frames` 按行合并的几个数据表组成的队列
    * `axis` 合并方式
        * 取 `0` 时按行合并, 参与合并的数据表必须具有相同的列标题
        * 取 `1` 时按列合并, 参与合并的数据表必须具有相同的行序号
    * `ignore_index` 是否忽略行序号或列标题
        * 按行合并时, 如果取 `False` 原始序号将被丢弃, 取 `True` 必须保证没有重复的行序号
        * 按列合并时类似
    * 返回值为合并后的数据表

简单合并例子
```python
# 按行合并例子
df1 = pd.DataFrame({"A": [11, 12], "B": [21, 22]})
df2 = pd.DataFrame({"A": [31, 32], "B": [41, 42]})
column_contact = pd.concat([df1, df2], ignore_index = True, axis = 0)

# 按列合并例子
df1 = pd.DataFrame({"A": [11, 12], "B": [21, 22]}, [1, 2])
df2 = pd.DataFrame({"C": [31, 32], "D": [41, 42]}, [1, 2])
row_contact = pd.concat([df1, df2], ignore_index = False, axis = 1)
```

### 修改数据表行与列
参见 <https://pandas.pydata.org/docs/user_guide/basics.html#reindexing-and-altering-labels>

* `dataframe.rename(*, column = None, index = None)` 修改数据表的列标题或行序号
    * `column` 数据表列标题修改映射
        * 当传入函数时, 将以原列标题为参数传入函数, 并以函数的返回值作为新列标题
        * 当传入字典时, 将字典的键匹配行标题, 并以字典的值为新的列标题
    * `index` 数据表行序号修改映射, 参数行为与 `column` 类似
* `dataframe.astype(dtype, copy = True)` 修改数据表各列的类型
    * `dtype` 数据表的新类型
        * 传入单个 [dtype](#数据类型表示) 时将修改所有列的类型为指定类型
        * 传入以列标题为键, [dtype](#数据类型表示) 为值的字典时, 仅修改对应的列的类型
    * `copy` 是否以返回新数据表的方式修改, 即
        * 取 `True` 时, 原数据表不会受影响, 而是返回一个新的, 修改后的数据表
        * 取 `False` 时, 将在原地修改, 但注意由于[数据表一般与原数据存在关联](#基于二维数组创建数据表), 因此元数据也将受到修改

## 其他数据表基本操作
### 空数据处理
在数据表中, 数值类型的空数据取值为 `np.nan`, 时间类型的空数据取值为 `pd.NaT`, Python 对象的空数据取值为 `pd.NA`, `None` 也会被视为空数据

* 在 Pandas 中, 如果希望插入或创建数据表中表示空数据, 推荐使用 `None` 表示, 此时 Pandas 将根据类型约束自动选择合适的空数据取值且不会影响类型识别
* `pd.notna(obj)` 判断 `obj` 中的空元素位置
    * `obj` 用于判断的数据表或序列
    * 返回值为一个行序号与列标题与原数据表相同的, 但对应位置元素根据原数据是否为空, 取值 (为空时为 `False`, 不为空时为 `True`)
    * 当 `obj` 为单个值时, 只要属于以上空数据取值之一, 返回 `False`, 否则返回 `True`
    * 类似的还有 `pd.isna(obj)`, 将以使用这两个函数判断空数据
* `dataframe.dropna(*, axis = 0, how = 'any', subset = None)` 删除数据表中的空数据
    * `axis` 操作对象, 取 `0` 则检查各行, 取 `1` 则检查各列
    * `how` 如何判断为需要删除的空数据, 取 `any` 则一行中有任一列为空数据就删除, 取 `all` 则要求一行所有数据均为空才删除
    * `subset` 用于判断的列标题, 默认为检查所有列, 可传入列标题组成的列表, 表示仅检查列表中的列
* `dataframe.fillna(value, *, axis = 0)` 替换数据表中的空数据
    * `value` 填充数据
        * 如果传入单个值, 则所有空数据都使用该值填充
        * 如果传入序列或字典, 则字典键名对应的列使用字典的键值填充 (传入序列类似)

### 用户定义操作
可通过以下 dataframe 的成员函数, 进行自定义的统计与数据遍历  

* `dataframe.aggregate(func, axis = 0)` 按行 / 列进行自定义统计
    * `func` 一个接收序列并返回单个值的函数
        * 由于序列可隐式转换为 Numyp 数组, 因此可直接传入此类函数如 `np.mean`
        * 可传入一个由函数组成的列表, 此时返回值为一个数据表, 各行为对应函数的运算结果
    * `axis` 操作对象
        * `axis = 0` 按行统计, 此时 `func` 接收为数据表中的整列, 序列的序号为行序号
        * `axis = 1` 按列统计, 此时 `func` 接收为数据表中的整行, 序列的序号为列标题
    * 返回值为一个序列, 按行统计时, 将返回各列的统计结果即函数 `func` 的返回值
* `dataframe.transform(func, axis = 0)` 按行 / 列进行自定义变换
    * `func` 一个接收序列并返回相同形状序列的函数
    * `axis` 操作对象, 与函数 `dataframe.agg` 的同名参数类似
    * 返回值为一个新数据表, 按行变换时, 各列的元素与 `func` 返回的序列有关
    * 类似的有函数 `dataframe.apply()`, 该函数将在原地修改数据表, 而不是返回新的数据表
* `dataframe.map(func)` 遍历修改数据表的每一各元素
    * `func` 一个接收单个值并返回单个值的回调函数
    * 返回值与原数据表的行序号, 列标题相同, 但元素为 `func` 运算后的返回值

### 分组统计
通过分组统计, 可将数据表特定列中具有相同元素的几行归为一各组别并视为一个子数据表进行统计

* `dataframe.groupby(by, dropna = True)`
    * `by` 作为分组依据的列标题, 可传入列标题组成的列表, 此时仅当指定几列的所有均相同时才会被归为一类
    * `dropna` 在分组时, 是否将指定列中存在空数据的行抛弃
    * 返回值为一个分组对象 `DataFrameGroupBy`, 分组对象无法直接打印, 下文使用 `group` 表示

以下为分组对象的常用操作
* 分组对象可使用类似[基本索引](#基本索引)的方法, 对其余未被分组的列进行索引, 仅统计其中几列
* 分组对象可使用[数据统计](#数据统计)中的大部分统计函数进行分组统计 (无法使用 `value_counts`)
* 分组对象可使用 [describe](#快速浏览) 函数快速浏览各组的统计量
* `group.get_group(name)` 筛选符合分组的行
    * `name` 组别信息, 对于单列分组传入单个值, 对于多列分组传入多个值组成的元组
    * 返回一个子数据表, 包含了分组中与 `name` 条件符合的所有行
    * 可使用此函数筛选特定几列元素满足要求的行
* `group.size()` 统计各分组内的行数, 返回值为一个以组别信息为序号 (对于多列分组时为元组), 各组行数为值的序列

### 数据透视表
数据透视表为一种特殊的表格, 表格的行与列均来自数据表特定列 `A`, `B` 中元素的取值, 表格中的元素值也来自数据表的统计列 `C`  
对于透视表中位置为 `("foo", "bar")` 的元素值为所有 `A, B` 列取值为 `("foo", "bar")` 的行在列 `C` 的元素值的平均值

`dataframe.pivot_table(values, index, columns)` 获取数据透视表
* `values` 统计列的列标题
* `index` 透视表的行序号来自的列, 单个列传入列标题, 多个列分组统计传入列标题组成的列表
* `column` 透视表的列序号来自的列, 单个列传入列标题, 多个列分组统计传入列标题组成的列表
* 返回值为一个数据表, 即数据透视表

### 数据导入导出
* csv 格式
    * `dataframe.to_csv(path_or_buf, *, na_rep = '', float_format = None)` 将数据表导出为 csv 格式  
        * `path_or_buf` 保存路径或写入文件对象
        * `na_rep` 空数据代替
        * `float_format` 浮点数表示格式, 使用转义字符格式如字符串 `%.2f`
    * `dataframe.read_csv(filepath_or_buffer)` 从 csv 文件导入数据表
        * `filepath_or_buffer` 文件路径或读取文件对象
* parquet 格式 (开源格式, 具有较高的压缩比)
    * `dataframe.to_parquet(path)` 将数据表导出为 Parquet 格式  
        * `path` 保存路径或写入文件对象
    * `dataframe.read_parquet(path)` 从 Parquet 文件导入数据表
        * `path` 文件路径或读取文件对象
* excel 格式
    * `dataframe.to_excel(excel_writer, *, sheet_name = 'Sheet1', na_rep = '', float_format = None)` 将数据表导出为 Excel 格式  
        * `excel_writer` 保存路径或写入文件对象
        * `sheet_name` 导出文件中的子表格名
        * `na_rep` 空数据代替
        * `float_format` 浮点数表示格式, 使用转义字符格式如字符串 `%.2f`
    * `dataframe.read_parquet(io, sheet_name = 0)` 从 Parquet 文件导入数据表
        * `io` 文件路径或读取文件对象
        * `sheet_name` 读取的子表格名或次序
