# pip 包管理
除了 conda, 也可使用 pip 管理包, 同样需要先激活被管理的环境  
conda 已自动在环境中安装了 pip, 若没有安装则需要通过 conda 手动安装

通常 conda 下找不到的包可以通过 pip 安装

参考资料 <https://zhuanlan.zhihu.com/p/107847620>

## 包管理
### 搜索包
通过网页 <https://pypi.org/> 搜索可安装的包

### 列出已安装包
`pip list`  
列出当前环境已安装的包

### 安装包
`pip install [pkg]`  
安装包名称为 `pkg` 的包  

`pip install [pkg]==[ver]`  
安装包名称为 `pkg` 的包, 且包的版本为 [ver]  

### 卸载包
`conda uninstall [pkg]`  
卸载名称为 `pkg` 的包

### 升级包
`pip install --upgrade [pkg]`  
升级名称为 `pkg` 的包  

使用 `pip install --upgrade pip` 即可升级 pip

如果要升级 Python 版本参见 [conda 相关命令](./conda.md#安装包)

### 检查包
`pip check`  
可用于检查依赖冲突或有问题的包

### 关于包的详细信息
`pip show [pkg]`  
检查关于 `[pkg]` 的详细信息, 也可用于查看是否安装 `[pkg]`

## 问题注意
### Linux 下使用 pip
在 Linux 下使用 pip 时注意
* 可通过 `apt` 安装 pip, 安装时注意指明 Python 版本
    * 对于 Python2.x 使用包名 `python-pip`
    * 对于 Python3.x 使用包名 `python3-pip`
* 调用 pip 时, 不能直接使用命令 `pip`, 而是要通过调用模块 `pip` 来使用 pip, 如  
`python -m pip ...`

### 双版本使用 pip
在 Python2 与 Python3 共存的系统上
* 使用 `pip` 表示 Python2 下的 pip, 用于管理 Python2 中的模块
* 使用 `pip3` 表示 Python3 下的 pip, 用于管理 Python3 中的模块
