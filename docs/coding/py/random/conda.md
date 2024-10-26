# Conda 环境管理
Conda 为开源的 Python 包管理工具, 分为两个版本  
* Miniconda 仅包含 conda 与 Python
* Anaconda 包含了 conda 与 Python 以及一系列实用库

参考资料 <https://zhuanlan.zhihu.com/p/638540652>

## 环境管理
### 创建环境
`conda create -n [env] python=[ver]`  
创建指定名称与版本的环境

* `env` 环境名称
* `ver` 环境中的 Python 版本, 默认安装最新版

### 克隆环境
`conda create --clone [env1] -n [env2]`
通过克隆已有环境创建新环境

* `env1` 原环境
* `env2` 被克隆环境

### 列出所有环境
`conda env list`  
列出本地所有环境, 带 `*` 的为默认环境

### 删除环境
`conda remove --name [env] --all`  
删除指定名称的环境

* `env` 被删除环境的名称

### 重命名环境
`conda rename [env1] [env2]`  
重命名环境

* `env1` 被重命名的环境
* `env2` 环境新名称

### 导出环境
`conda env export -n [env] > [env].yaml`  
将环境配置导出, 导出到文件 `[env].yaml` 中

* `env` 被导出的环境名

### 导入环境
`conda create -n [env] --file [env].yaml`  
从文件 `[env].yaml` 导入环境

* `env` 导入的环境名

### 激活环境
`conda activate [env]`  
激活环境, 此时终端的 Python 将基于指定的环境  
可直接运行 `python` 进入该环境的 Python 终端

注意, 在 powershell 终端环境下, 可能无法切换环境, 需要使用 cmd 终端环境

### 查看环境中的包
`conda list [pkg]`  
查看环境中安装的名称为 `[pkg]` 的包  
当 `[pkg]` 缺省时, 则查看所有安装的包

## conda 配置
### 查看配置信息
`conda info`  
用于查看 conda 的包镜像源配置

### 查看设置信息
`conda config --show`  
用于查看 conda 的配置信息

### 清空无用文件
`conda clear --all`  
清除 conda 内所有的无用文件

## conda 包管理
包管理时, 需要先激活被管理的环境

可以直接使用 [pip](./pip.md) 来安装环境中的包

### 搜索包
`conda search [pkg]`  
搜索名称为 `pkg` 的包

### 列出已安装包
`conda list`  
列出当前环境安装的所有包

### 安装包
`conda install [pkg]`  
安装包名称为 `pkg` 的包  

`conda install [pkg]=[ver]`  
安装包名称为 `pkg` 的包, 且包的版本为 [ver]  

除了安装包, 该方法还可直接用于升级环境的 Python 版本 (仅建议升级小版本)  
`conda install python=[ver]` 

### 卸载包
`conda uninstall [pkg]`  
卸载名称为 `pkg` 的包

### 升级包
`conda update [pkg]`  
升级名称为 `pkg` 的包  
conda 本质也为一个包, 因此也可通过此方法升级

`conda update --all`  
升级所有包

## 其他使用注意
### 在脚本中指定环境
需要在执行的 Python 脚本中指定环境时, 需要声明解释器为  
`#!<conda 安装环境>/envs/<>/bin/python3.8`
