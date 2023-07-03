# 机器学习基本概念

## 机器学习系统类型
### 监督学习 P40
#### 有监督学习
1. 监督学习中, 提供给算法的数据包含所需要的解决方案, 即标签
1. 可用于通过一组特征, 来预测一个目标数值 (回归问题)
1. 也可用于分类任务

#### 无监督学习
1. 无监督学习中训练数据都是未经标记的
1. 可以用于让算法自动寻找数据的关联与关联规则 (聚类)
1. 合并存在很大相关性的特征, 再用于监督学习, 以提升性能 (特征提取)
1. 可视化数据
1. 检测异常与移去异常数据

#### 半监督学习
通常为两种算法的结合

#### 强化学习
通过自行学习最好的策略, 以获得最大的回报

### 学习方式 P48
#### 批量学习
1. 使用所有可用的数据进行学习后导出
1. 在完成训练前都是离线的, 即不投入生产环境
1. 每次更新训练集需要从头开始

#### 在线学习 (增量学习)
1. 小批量数据多次学习, 根据新写入的新数据进行学习
1. 可以对数据流的变化做出快速反应
1. 需要避免垃圾数据的影响

### 泛化学习 P52
#### 基于模型的学习
提前确定一个模型, 模型存在一些参数, 其特征未知, 通过训练, 找到最佳的参数 (如, 线性回归), 从而预测新实例的属性

#### 基于实例的学习
通过比较各个实例之间的相似度, 从而得到新实例

## 机器学习的主要问题 P60
### 数据方面
#### 训练数量不足
当数据量足够大, 各个算法之间差异性极小

#### 数据不具有代表性
数据采集方式不正确, 可能导致错误的结果

#### 数据质量低
1. 对于异常的数据, 需要丢弃或修复
1. 缺少特征的数据需要处理

#### 无关数据
过多的无关特征可能导致机器学习无法完成

### 算法方面
#### 过度拟合
1. 当出现无关属性时 (如名称), 可能会导致算法检测噪音之间的关系 (名称中的字母)
1. 模型中的参数过多时, 可能导致过渡拟合
1. 解决方法: 
    * 减少参数
    * 给各个参数设定约束, 如给参数限定范围, 即正则化
    * 收集更多数据
    * 减少数据中的噪声

#### 欠拟合
1. 模型相对于实际太过于简单, 可能导致预测结果不准确
1. 解决方法:
    * 增加模型中的参数
    * 减少模型中的约束
    * 提供更好的特征集

## 测试与验证

### 测试方法
1. 将数据分为两部分, 分为训练集 (80%) 与测试集 (20%)
1. 通过测试集来评估模型的误差率
1. 当模型对于训练集误差低, 而对于测试集的误差高, 则说明模型存在过拟合

### 超参数选择
1. 通过使用不同的超参数训练, 寻找训练集中准确率最高的超参数, 这个方法只能得到最拟合训练集的超参数, 对于测试集不一定合理
1. 可使用保持验证的方法
    1. 将训练集再分出一部分作为验证集, 剩余部分为简化训练集
    1. 在简化训练集上使用不同超参数训练模型
    1. 在验证集上测试不同超参数下的模型, 得到最佳模型的超参数
    1. 将此最佳模型的超参数作为模型的超参数

## 部分概念定义
### 属性与特征
1. 属性表示一种数据类型
1. 特征取决于上下文, 为属性加上其值

### 泛化
1. 即在经过给定的训练实例训练后, 对新的实例进行预测, 即泛化
1. 而预测能力也可称为泛化能力

### 正则化
1. 对模型参数进行约束称为正则化, 如限制模型参数的大小不能超过一定值
1. 正则化程度可通过一个超参数控制, 超参数也属于模型的参数, 但在训练前就确定

# 机器学习项目
## 建立项目
### 使用真实数据
可通过以下网站获取公开数据集

1. UC Irvine Machine Learning
Repository（http://archive.ics.uci.edu/ml/）
1. Kaggle datasets（https://www.kaggle.com/datasets）

### 确定方案
1. 建立模型前需要明确模型的目的, 从而确定算法, 模型性能的评估方法等
1. 根据数据确定使用有监督学习, 无监督学习或强化学习 (数据集中, 是否包含了要预测的属性)
1. 根据目标确定任务是分类任务, 或是回归任务 (对于给出的数据预测类型 / 预测值)
1. 再确定要使用批量学习还是在线学习

### 选择性能指标
1. 对于回归问题, 可采用均方根误差 $RMSE$ 作为性能指标, 判断预测值与实际值的误差, 其中 $h$ 为预测函数 $$RMSE(X,h)=\sqrt{\frac{1}{m}\sum^m_{i=1}(h(x^{(i)})-y^{(i)})^2}$$
1. 将 $h(x)$ 与 $y$ 视为向量, 回归的性能指标即范数, 但范数级别越高, 对异常越敏感, 越关注最大值, 因此通常采用 $RMSE$, 即 $p-2$ 范数
1. 对于异常值较多的情况也可采用 $p-1$ 范数

### 方案检查
在确定了方案与性能指标后, 检查方案是否能够正常投入使用

## 构建项目
### 下载数据
通过编写函数来下载数据, 可以方便数据更新与管理
``` python
import os
import tarfile
import urllib

# 下载数据压缩包
def FetchTarData(data_url, save_path, data_name):
    os.makedirs(save_path, exist_ok= True)
    data_path = os.path.join(save_path, data_name)
    
    # 从网络上下载数据
    urllib.request.urlretrieve(data_url, data_path)

    # 对下载的数据解压缩
    data_taz = tarfile.open(data_path)
    data_taz.extractall(path = save_path)
    data_taz.close
```

同样可以通过一个函数对数据进行读取, 此处使用 Pandas 进行数据分析
```python
import pandas as pd

def LoadCSVData(save_path, data_name):
    csv_path = os.path.join(save_path, data_name)

    # 读取 csv 中的数据并返回 pandas DataFrame 对象
    return pd.read_csv(csv_path)
```

### 预览数据
1. 使用 DataFrame 的 head() 方法可以查看数据的前 5 行
1. 使用 DataFrame 的 info() 方法可以查看数据各列的数据类型, 行数, 非空行数等信息; 对于 object 类型可能为 string
1. 通常统计表的字符串用于表示分类, 因此可以访问 DataFrame 的特定列, 并使用 value_counts 方法统计各个值出现的次数
1. 使用 DataFrame 的 head() 方法可以查看数据各列的基本统计值, 如最大值, 平均值, 方差等
1. 借助 Matplotlib, 使用 hist 方法绘制数据直方图 (以数据区间为 x 坐标, 以数据出现次数为 y 坐标)
1. 可以直接调用 DataFrame 的方法显示数据, 但个代码块中仅能输出一个, 也可采用 print 输出显示数据的方法, 但将丢失样式
1. DataFrame 的方法显示数据前, 可直接对结构进行一些简单运算, 并且输出时将为运算后的结果

```python
houseData = LoadCSVData(HOUSING_PATH, "housing.csv")

# houseData.head()
# houseData.info()
# houseData["ocean_proximity"].value_counts()
# houseData.describe()

# 通过 len(houseData) 获取 DataFrame 的行数, 并且除以 value_counts() 的结果, 得到数据分布
# houseData["ocean_proximity"].value_counts() / len(houseData)

import matplotlib.pyplot as plt
houseData.hist(bins=50, figsize=(20,15))
plt.show()
```

### 数据观察
对数据预览的结果进行观察, 需要注意以下方面

1. 数据是否经换算
1. 数据是否存在上限与下限 (数据在一侧集中, 且再往外就没有数据)
1. 数据分布情况, 对于数据在中位数两侧延伸长度相差过大时, 需要注意

### 创建测试集
* 在开始机器学习前, 需要将数据划分为 测试集 (test set) 与训练集 (train set)
* 数据量较少时, 可以划分 20% 的数据作为测试集, 数据量大时, 测试集所占的比例可以减少
* 划分完成后, 每次使用测试集与训练集前 (数据可视化) , 应对数据集的拷贝进行操作
* 除了进行验证, 尽量不再使用测试集中的数据

#### 划分原则
1. 每次划分时, 应当保证测试集与训练集的数据不变 (仅使用随机划分时, 由于种子不同, 可能导致每次运行, 数据划分不同)
1. 每次添加数据后, 应保证原来的数据划分不变
1. 划分数据时, 还应该保证两个数据集的数据分布特征保持一致, 至少==最重要的数据 (通常是预测值)== 分布特征保持一致 (分层划分)

#### 随机划分
1. 当数据较多时, 可使用 sklearn.model_selection.train_test_split() 函数对数据进行随机划分
1. 通过限定随机种子 (random_state 参数), 可以满足原则 1 的要求

#### 特征值划分
1. 选择数据中的几个特征属性作为特征值, 并对特征值取哈希函数
1. 哈希函数的大小划分数据, 可以满足原则 1, 2 的要求

#### 分层 (Stratified) 划分
1. 对关键数据按一定区间划分, 并使用一个临时列来对存放各个区间的标签, 通常可采用 pd.cut() 完成
1. 通过对象 sklearn.model_selection.StratifiedShuffleSplit 完成分层划分
1. 完成分层后, 可遍历得到元素集的各行, 使用 drop 方法, 去除临时列

```python
# 通过访问一个新列将自动创建
houseData["income_cat"] = pd.cut(
    # 划分属性
    houseData["median_income"],
    # 划分区间
    bins=[0., 1.5, 3.0, 4.5, 6., np.inf],
    # 区间标记
    labels=[1, 2, 3, 4, 5])

from sklearn.model_selection import StratifiedShuffleSplit
# 通过 StratifiedShuffleSplit 变量确定分层方式
split = StratifiedShuffleSplit(n_splits=1, test_size=0.2, random_state=42)

# 使用 split 方法进行分类, 返回一个迭代器
# 迭代器仅包含一个结果, 即选取作为训练集与测试集数据索引的数组构成的元组
# 通过 for 访问迭代器, 并根据得到的索引从数据中构建训练集与测试集, 实际仅循环一次

# DataFrame 成员 loc[行, 列] 为按行与列索引特定元素, 并构成一个新的 DataFrame, 列缺省时表示全部列
for train_index, test_index in split.split(houseData, houseData["income_cat"]):
    strat_train_set = houseData.loc[train_index]
    strat_test_set = houseData.loc[test_index]

# 比较两个数据集的数据分布, 如果差别过大可减小区间
print("train")
print(strat_train_set["income_cat"].value_counts() / len(strat_train_set))

print("test")
print(strat_test_set["income_cat"].value_counts() / len(strat_test_set))


# 通过 for 访问各行, 并将临时列丢弃
for set_ in (strat_train_set, strat_test_set):
    set_.drop("income_cat", axis=1, inplace=True)

```

### 数据可视化
#### 含坐标数据的可视化
调用 DataFrame 的成员方法 plot 可以进行对数据的绘制
* kind 绘制图像形式, scatter 即散点图
* x 数据点的 x 坐标 (可以传入列名, 或出入具体列, 方便运算)
* y 数据点的 y 坐标
* alpha 散点的透明度, 采用较低的透明度有利于发现位置集中的散点
* s 散点的大小, 可通过散点的半径来反映部分数据, 为了防止半径过大, 可预先除以一定比例
* figsize 图像大小
* label 图像标签
* c 散点的颜色, 可通过散点的颜色来反映部分数据
* cmap 颜色标记条, 可通过 plt.get_cmap 获取
* colorbar 是否显示颜色标记条

#### 数据相关性可视化
1. 通过 corr 方法获取 DataFrame 中各个数据之间的相关系数
1. 得到的结果也为一个 DataFrame, 但每一行的标签为原来的列, 每一格的数据即相关系数
1. 访问预测值 (或关键数据) 所在列, 并使用 sort_values 函数列出各个参数与其之间的相关系数, 可初步判断参数之间的相关性
1. 通过 pandas.plotting.scatter_matrix 绘制各个参数之间作为 x 与 y 轴的散点图, 以直观体现各个参数之间的关系
1. 注意图像中可能出现的一些反常直线, 表明可能有怪异数据, 需要处理
1. 可以将不同元素组合, 如乘除运算, 将结果作为一个新列, 并与预测值比较相关性

```python
from pandas.plotting import scatter_matrix
# 由于参数过多, 可以仅选择几个感兴趣的参数
attributes = [
    "median_house_value", "median_income", 
    "total_rooms","housing_median_age"]
# 使用一个包含了多列的名数组访问 DataFrame, 可以提取这几列的数据
scatter_matrix(houseData[attributes], figsize=(12, 8))

```

### 数据准备
#### 数据清理
