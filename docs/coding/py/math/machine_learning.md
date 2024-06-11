# 机器学习
主要 Pytorch 介绍的使用

笔记中的代码默认导入模块
* Pytorch 模块 `import torch`
* Numpy 模块 `import numpy as np`

## 基础使用
参考教程 <https://pytorch.org/tutorials/beginner/basics/quickstart_tutorial.html>

### 张量类型
张量为 Pytorch 中, 一种类似 [Numpy 数组](./numpy.md#numpy-笔记)的数据结构, 用于表示神经模型的输入输出以及作为神经模型的参数  
与 Numpy 数组不同, 张量类型经过专门优化, 可以被 GPU 等硬件加速, 且能够自动记录运算过程并计算梯度, 详见[自动梯度](#自动梯度)

以下使用 `tensor` 表示任意张量对象

#### 创建张量
* `torch.tensor(data, dtype = torch.float32)` 通过序列类型创建张量
    * `data` 为元组, 列表等 Python 内置的[序列类型](../base/base.md#序列类型)
    * `dtype` 元素的类型, 类似 Numpy 数组
* `torch.from_numpy(np_array)` 通过 Numpy 数组创建张量
    * `np_array` 为 Numpy 数组对象
    * 注意, 该方法创建的张量将与传入的 Numpy 数组共享同一块内存空间, 即该方法创建的张量对象被修改时, 也将反映到传入的 Numpy 数组对象 `np_array` 中
* `torch.rand(shape, dtype)` 创建随机张量, 元素取值为 $(0,1)$, 类型为 `torch.float32` 
    * `shape` 元组, 表示创建张量的大小
    * `dtype` 元素的类型
* `torch.ones(shape)` 创建使用 $1$ 填充的张量, 参数含义同上
* `torch.zeros(shape)` 创建使用 $0$ 填充的张量, 参数含义同上

#### 张量的方法
* 使用以下方法可对张量的属性进行查询
    * `tensor.shape` 元组, 表示张量各维度的大小
    * `tensor.dtype` 张量的元素类型
* 张量合并与堆叠
    * 使用成员函数 `torch.cat(tensors, dim)` 合并张量 (不能增加维度)
        * `tensors` 由参与合并张量组成的元组
        * `dim` 合并方向的维度
        * 使用 `torch.cat(tensors, 2)` 可将输入的 `k` 个 `n x m x 1` 的张量堆叠为 `n x m x k`
    * 使用成员函数 `torch.stack(tensors, dim)` 堆叠张量 (用于增加维度)
        * `tensors` 由参与堆叠张量组成的元组
        * `dim` 堆叠方向的维度
        * 使用 `torch.stack(tensors, 1)` 可将输入的 `k` 个 `n x m` 的张量堆叠为 `n x m x k`
    * 使用成员函数 `tensor.view(*shapes)` 可修改张量形状 (获取于原有张量数据相同但形状不同的张量)
        * `shapes` 张量各个维度的大小, 传入 `-1` 表示由原有形状自动确定
        * 一般通过 `tensor.view(1, -1)` 令张量升维
* 张量的操作硬件
    * `tensor.device` 查询张量的操作硬件, 默认为 `cpu`
    * `tensor.to(device)` 将张量的操作硬件转换为指定的硬件
    *  参考[模型运行设备](#模型运行设备)的代码可用于自动检测当前环境可使用的最优硬件  
* 张量访问  
    * 张量的索引与 [Numpy 数组的索引](./numpy.md#数组的索引)类似
    * `tensor.numpy()` 将张量转换为 Numpy 数组, 两者共享内存
    * `tensor.item()` 单个元素的张量转为数值, 用于处理损失函数的返回值
* 张量运算  
    * 与 Numpy 数组类似, 张量的一般运算为元素间匀速, 而 `@` 则为矩阵乘法
    * 更多运算操作见 <https://pytorch.org/docs/stable/tensors.html#torch.Tensor>
    * 除了一般的操作, 张量类型还具有一类带有 `_` 后缀的方法, 此来方法为原地操作的版本, 可以节省内存空间, 但注意原始数据将永久修改, 一般仅在模型内使用  
    如果要在运算中使用, 则要调用方法, 如 `tensor.add_(x)`

#### 自动梯度
Pytorch 中张量对象最大的特点即自动梯度, 通过自动梯度只需要使用张量对象的运算方法进行正向传播, 即可自动计算正向传播结果相对各个参数张量的梯度

* `tensor.requires_grad_(requires_grad = True)` 开启或关闭张量对象的自动梯度
    * 默认创建张量对象时关闭自动梯度
    * 在模型中, 当开启自动梯度时, 相当于将该张量的值视为训练参数
    * 当关闭时相当于视为不变的常量, 或者用于加快训练完成模型的正向传播的速度
* `tensor.backward()` 反向传播
    * 当该函数被调用时, 将计算得到该张量对象 `tensor` 时, 经过所有自动梯度张量相对该张量 `tensor` 的梯度
    * 注意 `tensor` 应使用一系列来自模块 `torch` 的函数 (如交叉熵损失函数 `torch.nn.functional.binary_cross_entropy_with_logits(z, y)`) 或张量对象间运算 (相加或矩阵乘等) 得到
    * 通常一个运算产生的张量对象只能进行一次反向传播
* `tensor.requires_grad` 布尔型对象成员变量, 为 `True` 时表示该张量具有自动梯度
* `tensor.grad` 张量型对象成员变量
    * 该张量对象在最近一次参与运算后, 反向传播得到的梯度 (需要最终结果调用 `tensor.backward()`)
    * 如果该张量之前没有进行过有效的反向传播, 则该变量的值为 `None`
    * 如果该张量已经有梯度了, 再次进行反向传播将叠加上原有梯度, 如果要避免叠加可对该变量重新赋 `None`
* 推荐使用 `with torch.no_grad():` 以 [with](../base/base.md#预定义异常处理) 代码块, 在代码块内全局关闭自动梯度功能  
在使用模型进行预测 (正向传播) 时在此代码块内进行以得到更高的运行效率

### 构建模型
构建模型时需要导入模块 `from torch import nn`

#### 定义模型对象
对于模型对象通常需要继承模型基类 `nn.Module`  
此时仅需要定义类的各层网络与正向传播过程, 该基类将据此提供控制模型的有关函数  
一般 Pytorch 的张量具有[自动梯度](#自动梯度)的功能, 因此不需要专门定义反向传播函数

通常定义模型的代码如下
```python
class NeuralNetwork(nn.Module):
    def __init__(self):
        super().__init__()
        self.flatten = nn.Flatten()
        self.linear_relu_stack = nn.Sequential(
            nn.Linear(28*28, 512),
            nn.ReLU(),
            nn.Linear(512, 512),
            nn.ReLU(),
            nn.Linear(512, 10),
        )

    def forward(self, x):
        x = self.flatten(x)
        logits = self.linear_relu_stack(x)
        return logits
```

* 在模型对象的构造函数中
    * 需要首先调用模型基类的构造函数 `super().__init__()`
    * 定义模型的各层网络
        * 一般使用对象的成员变量保存网络层对象, 成员变量名即层的名称
        * 对于中间隐藏层与输出, 一般使用 `nn.Sequential` 作为容器包裹将其统一为一层网络
* 在模型对象的正向传播函数中
    * 正向传播函数接收一个参数, 即模型的输入
    * 以函数的方式调用各层网络对象, 将数据输入, 并将输出的中间结果作为下层的输入, 最后的输出即正向传播结果

#### 常用网络层介绍
神经网络中的各层通过模块 `nn` 下的网络层类创建  
网络层类的实例为可调用的对象, 能够接收张量进行运算并输出

在定义网络中, 一般将样本的最高维视为批次, 例如 `B x L` 的张量将被视为一个具有 `B` 个批次的一维的张量

* `nn.Flatten(start_dim = 1, end_dim = -1)` 张量展开层
    * `start_dim, end_dim` 将输入张量从 `start_dim` 到 `end_dim` 的维度展开
    * 默认将输入的 `B x A1 x A2 x ...` 的张量展开为 `B x L` 的张量
    * 通常可作为输入层将输入的图像转为一维序列
* `nn.Linear(in_features, out_features)` 全连接神经元层
    * `in_features` 输入元素数
    * `out_features` 输出元素数
    * 即一般的线性全连接神经元, 但不包含激活函数, 要求输入张量 `B x I` 输出张量 `B x O`
    * 通常下一层应为激活函数层, 并且参数保存在激活函数中
* 激活函数层 (根据上一层的全连接神经元层自动确定规模)
    * `nn.ReLU()` ReLU 激活函数层
    * `nn.Sigmoid()` Sigmoid 激活函数层
* `nn.Softmax(dim)` Softmax 归一化输出激活函数层
    * `dim` 归一化的维度, 对于 `B x L` 的输入一般取 `1`
    * 一般作为输出层, 将输入张量的最高维分别使用 SoftMax 函数归一化  
    一般输入 `B x L` 的张量, 将各通道下的一维数组的元素归一化
    * 对于 Softmax 的预测结果, 可使用 `tensor.argmax(1)` 提取各批次结果中, 概率最大的元素索引
    * 该网络层同样为激活函数, 根据上一层的全连接神经元层自动确定规模
* `nn.Sequential(*args)` 网络顺序容器
    * `args` 从输入到输出的各层子网络层对象

#### 模型运行设备
对于构建完成的模型, 需要在示例化后使用方法 `model.to(device)` 选择模型使用的硬件

推荐使用以下代码获取当前环境可用的最优硬件
```python
device = (
    "cuda"
    if torch.cuda.is_available()
    else "mps"
    if torch.backends.mps.is_available()
    else "cpu"
)
```

#### 模型基本使用
* 将模型转换为字符串或直接打印模型对象, 可输出模型各层网络的信息
* 通过模型对象方法 `model.named_parameters()` 可返回一个可迭代对象, 每个迭代元素为一个 `(name, param)` 的元组
    * `name` 模型中具有训练参数的网络层中, 所带有的参数部分名称, 如 ReLu 层有权重矩阵与偏差两个带有参数的部分  
    名称一般为 `<层名称>.<子层序号>.<参数部分名>`
        * `层名称` 即[定义模型对象](#定义模型对象)时保存层对象的成员变量
        * `子层序号` 见打印的模型各层网络的信息
        * `参数部分名` 与层类型有关, 如
    * `param` 该部分的参数张量, 通过 `param.shape` 可以查询参数各维度的大小
    * 可通过循环 `for name, param in model.named_parameters():` 遍历
* 模型对象为可调用对象, 通过传入样本可直接输出训练结果完成正向传播  
    * 根据[样本的特性](#常用网络层介绍), 即使仅有一个样本要预测也应当传入 `1 x L` 的张量  
    可利用 `tensor.view(1, -1)` 进行升维, 或 `tensor.stack(...)` 进行堆叠, 详见[张量的方法](#张量的方法)
    * 一般网络参数的张量类型为 `torch.float32`, 因此也要保证传入的样本张量类型为 `torch.float32`  
    可在转换为张量时明确元素类型属性 `dtype`
    * 关于模型预测代码详见[模型预测](#模型预测)
* 模型对像方法 `model.train()` 将模型设置为训练模式
* 模型对像方法 `model.eval()` 将模型设置为预测模式

### 模型训练
#### 模型训练器
模型训练器 (模型优化器) 类定义于模块 `torch.optim` 下, 通过模型训练器可以完成模型的反向传播过程  

* 传统梯度优化器 `torch.optim.SGD(params, lr=0.001)` 
    * `params` 模型参数迭代器, 通过模型对象的方法 `model.parameters()` 得到
    * `lr` 模型的学习率
    * 通过修改[单次模型训练](#单次模型训练)的细节, 可实现多种传统梯度下降算法
* 其他优化器见 <https://pytorch.org/docs/stable/optim.html>

无论使用何种优化器, 一般均通过以下两个对象方法进行一次反向传播
* `optimizer.step()` 根据正向传播的[预测结果反向传播](#自动梯度)得到的自动梯度更新模型中的参数
* `optimizer.zero_grad()` 清空模型中的梯度, 防止影响下次反向传播 ([自动梯度](#自动梯度)中不会覆盖之前反向传播的梯度)

#### 训练相关超参数
在单次训练前, 首先确定以下超参数
* 训练循环次数 `epoch`
    * 通过[单次模型训练](#单次模型训练)循环的循环次数控制
* 数据批次大小 `batch_size`
    * 通过[访问数据集](#访问数据集)中 `Dataloader` 类构造函数的参数指定
    * 体现为传入样本的最高维维度
* 学习率 `lr`
    * 一般取值为 `1e-3`
    * 如果使用 Sigmoid 激活函数, 一般则取值为 `0.1`
* 损失函数 `loss_fn`
    * 损失函数定义类位于模块 `torch.nn` 中, 详见 <https://pytorch.org/docs/stable/nn.html#loss-functions>
    * 常用的损失函数定义类有交叉熵 `nn.CrossEntropyLoss`, 均方差 `nn.MSELoss` 等
    * 通过 `loss_fn = nn.CrossEntropyLoss()` 即可实例化损失函数
        * 损失函数对象可接收参数 `loss = loss_fn(pred, y)`, 无论传入张量大小总是返回一个单元素张量 (使用 `tensor.item()` 可转为数字)
        * `pred` 为模型预测结果, `y` 为标记的结果, 传入的参数类型必须是张量 (因此导入数据集时必须数据预处理为张量, 即使只有一个值)
        * 当传入的 `y` 为单元素时, 将自动转换为独热编码, 因此一般不需要将 `y` 预处理为独热编码
        * 允许传入一个批次 (batch) 的数据, 此时 `pred` 的大小为 `B x L`, `y` 的大小为 `B`, 首先将 `y` 转换为独热编码, 再计算逐个批次的损失并返回平均值
        * 对返回的张量调用 `loss.backward()` 获取参数梯度

#### 单次模型训练
以下为单次训练函数示例

```python
def train_loop(dataloader, model, loss_fn, optimizer):
    size = len(dataloader)

    # 将模型设置为训练模式, 每次新的训练循环开始前必须调用此函数
    model.train()

    for batch, (X, y) in enumerate(dataloader):
        # 通过传入样本进行正向传播
        pred = model(X)
        # 将正向传播结果传入损失函数, 与正确结果对比
        loss = loss_fn(pred, y)

        # 调用正向传播结果张量的 backward 方法进行反向传播, 自动计算梯度
        loss.backward()
        
        # 根据自动梯度, 使用优化器更新模型参数
        optimizer.step()
        # 将梯度归零
        optimizer.zero_grad()

        # 每 100 个 batch 打印模型训练进度
        if batch % 100 == 0:
            # loss 单元素张量, 通过 item 方法转为浮点数
            loss = loss.item()
            print(f"loss: {loss:>7f}  [{batch:>5d}/{size:>5d}]")
```

#### 模型测试
以下为模型正确率测试函数示例, 通常在一个训练循环完成后进行一次测试, 以绘制出模型的训练曲线

```python
def test_loop(dataloader, model, loss_fn):
    # 将模型设置为预测模式, 当模型用于预测前必须调用此函数
    model.eval()

    size = len(dataloader.dataset)
    num_batches = len(dataloader)
    test_loss, correct = 0, 0

    # 在模型预测时关闭自动梯度以获得更好的运算速度
    # 并且防止模型预测干扰之后的训练
    with torch.no_grad():
        # 通常测试集的数据同样时按 batch 传入
        for X, y in dataloader:
            pred = model(X)

            # 累加预测损失, 函数的返回值即该 batch 的平均损失
            test_loss += loss_fn(pred, y).item()
            
            # 累加预测正确率
            # pred.argmax(1) 将最大概率的结果作为预测分类, 注意做高维度 0 为 batch
            # .type(torch.float).sum().item 先将布尔值转为浮点数, 再累加整个 batch 的预测准确率, 最后从张量转为浮点数
            correct += (pred.argmax(1) == y).type(torch.float).sum().item()

    # 计算每次预测的平均损失
    test_loss /= num_batches
    # 计算每次预测的平均准确率
    correct /= size
    print(f"Test Error: \n Accuracy: {(100*correct):>0.1f}%, Avg loss: {test_loss:>8f} \n")
```

#### 一般模型训练
```python
import torch
from torch import nn
from torch.utils.data import DataLoader
from torchvision import datasets
from torchvision.transforms import ToTensor

# 定义模型类
...

# 加载训练集
training_data = datasets.FashionMNIST(
    root="data",
    train=True,
    download=True,
    transform=ToTensor()
)

# 加载测试集
test_data = datasets.FashionMNIST(
    root="data",
    train=False,
    download=True,
    transform=ToTensor()
)

# 确定训练相关的超参数
learning_rate = 1e-3
batch_size = 64
epochs = 5
loss_fn = nn.CrossEntropyLoss()

# 根据超参数示例化优化器, 数据加载器
optimizer = torch.optim.SGD(model.parameters(), lr=learning_rate)
train_dataloader = DataLoader(training_data, batch_size=64)
test_dataloader = DataLoader(test_data, batch_size=64)

# 进行训练
for t in range(epochs):
    print(f"Epoch {t+1}\n-------------------------------")
    train_loop(train_dataloader, model, loss_fn, optimizer)
    test_loop(test_dataloader, model, loss_fn)
print("Done!")
```

### 模型保存与加载
#### 官方预训练模型
通过模块 `import torchvision.models as models` 可以导入主流的模型类以及这些模型的预训练参数  
可以直接基于这些主流模型类训练自己的模型, 或者直接导入预训练参数使用模型

关于其中的模型详见 <https://pytorch.org/vision/stable/models.html>  
模型的使用方法见[模型基本使用](#模型基本使用)

以下以深度卷积网络 `vgg16` 为例  

* `model = models.vgg16(weights)` 创建 `vgg16` 模型对象
    * `weights` 预训练参数一般为一个字符串, 具体见文档

#### 保存模型
* `torch.save(obj, f)` 保存模型
    * `obj` 保存的数据
        * 传入模型对象 `model` 时, 将保存整个模型
        * 传入 `model.state_dict()` 时, 仅保存模型内的参数
    * `f` 保存路径或文件对象, 一般带有后缀 `.pth`

#### 读取模型
* `torch.load(f)` 读取模型
    * `f` 保存路径或文件对象
    * 当保存整个模型时将返回模型对象
    * 当保存模型参数时, 仅有模型参数信息
* `model.load_state_dict(data)` 读取参数信息
    * `data` 通过 `torch.load(f)` 读取到的参数信息
    * 注意 `model` 必须与保存参数的模型来自同一个模型类

## 常见神经网络构建
### 图像识别
对于图像样本一般视为 `B x C x W x H` 的张量, 其中 
* `B` 为批次即 batch
* `C` 为通道, 即使时灰度图也视为具有通道 `C = 1`
* `W, H` 图片的宽与高

#### 卷积网络层
* `nn.Conv2d(in_channels, out_channels, kernel_size, stride = 1, padding = 0)` 一般卷积网络层
    * `in_channels, out_channels` 输入与输出的图像通道数
    * `kernel_size` 整数 `k`, 卷积核大小为 `k x k`
    * `stride` 卷积核移动步长
    * `padding` 填充边缘
    * 注意, 该卷积网络层不具备激活函数, 因此下一层需要为[激活函数层](#常用网络层介绍)
* `nn.MaxPool2d(kernel_size, stride = None)` 最大池化层
    * `kernel_size` 整数 `k`, 卷积核大小为 `k x k`
    * `stride` 卷积核移动步长, 默认与卷积核相同
* `nn.Flatten(start_dim = 1, end_dim = -1)` 将图像转换为一维特征向量, 详见[之前介绍](#常用网络层介绍)

## 训练数据
### 基于 Scikit-Learn
<https://scikit-learn.org/stable/>

### 基于 Pytorch
参考教程  
<https://pytorch.org/tutorials/beginner/basics/data_tutorial.html#preparing-your-data-for-training-with-dataloaders>

使用来自 Pytorch 的训练数据时, 需要安装模块 `torchvision`  

#### 加载数据集
首先导入公开数据集加载模块 `from torchvision import datasets`

通过 `torchvision.datasets` 下与数据集同名的数据集子类创建数据集对象实现数据集的加载  
更多公开数据集参见 <https://pytorch.org/vision/stable/datasets.html>

以公开数据集 `FashionMNIST` 的加载为例  
`xxx_data = torchvision.datasets.FashionMNIST(*, root, train = True, download = False, transform = None, target_transform = None)`
* `root` 公开数据集的本地保存路径
* `train` 是否提取其中的训练集, 传入 `False` 则提取测试集
* `download` 传入 `True` 时, 当数据集不在本地时, 尝试下载并保存在 `root` 指定的路径下
* `transform` 加载原始特征数据时的预处理器, 默认即数据集的原始数据类型 更多见[数据预处理](#数据预处理)
* `target_transform` 加载标签数据时的预处理器, 默认即数据集的原始数据类型, 更多见[数据预处理](#数据预处理)

#### 访问数据集
在 Pytorch 中的数据集由多条数据组成, 每条数据仅包含特征 (即相同大小的原始数据, 一般为图像) 与标签 (根据数据集特性而定)  
通常有以下方法访问数据集

* 直接访问数据集 `img, label = xxx_data[n]`  
    * `n` 访问数据集的第 `n` 条数据
    * `img, label` 第 `n` 条数据的特征与标签
* 通过 Pytorch 数据加载器访问, 一般用于传入模型中使用  
数据加载器通过 `from torch.utils.data import DataLoader` 导入  
    * 创建加载器对象`xxx_dataloader = Dataloader(dataset, batch_size = 1, shuffle = False)`
        * `dataset` 被加载的数据集对象
        * `batch_size` 数据集中一个批次 (batch) 的大小
        * `shuffle` 是否每个轮次 (epoch) 都重新选择批次中的数据
    * 数据加载器与数据集类似, 但将原始数据额外添加一个最高为度, 大小即 `batch_size`
    * 迭代加载器对象一般代码 `for batch, (X, y) in enumerate(dataloader):` 可以得到迭代的批次数与批次数据

#### 数据预处理
在[加载数据集](#加载数据集)时, 参数 `transform` 与 `target_transform` 可用于对数据集的特征与标签进行预处理

对于特征, 一般传入预处理器 `ToTensor()`, 即将原始数据转换为 `C x W x H` 的张量, `C` 为通道数, `W` 为宽度 `H` 为高度  
该预处理器通过 `from torchvision.transforms import ToTensor` 导入

对于标签, 一般不做处理, 或传入预处理器 `Lambda(lambda)`, 该预处理器将函数 `lambda` 包裹为预处理器  
函数 `lambda` 接收原始输出, 并以处理过的数据为返回值  
该预处理器通过 `from torchvision.transforms import Lambda` 导入

以下为将数字标签预处理为 One-Hot 编码的例子
```python
from torchvision.transforms import Lambda
# 创建预处理器, 该预处理器将 0-9 的标签转为 10 元素的 One-Hot 编码的一维张量
# 其中 tensor.scatter_(...) 为张量的广播赋值函数
one_hot_transforms = Lambda(lambda y: torch.zeros(10, dtype=torch.float).scatter_(0, torch.tensor(y), value=1))
```

#### 自定义数据集
见 <https://pytorch.org/tutorials/beginner/basics/data_tutorial.html#creating-a-custom-dataset-for-your-files>
