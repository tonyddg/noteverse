# oh-my-zsh
## 安装本体
1. [安装教程](https://zhuanlan.zhihu.com/p/35283688)
1. 运行 sudo chsh -s /bin/zsh 改变默认终端为 zsh
1. logout 或重启, 使修改生效

## 安装 p10k 主题
1. [安装依赖字体](https://blog.csdn.net/qq_39785418/article/details/122796861)
1. [安装教程](https://www.cnblogs.com/luoxian1011/p/15854153.html)
1. 修改主题时运行命令 p10k configure

## 安装插件
1. [安装插件教程](https://zhuanlan.zhihu.com/p/454191603)
1. zsh-completions 插件对命令参数 -- 后按 tab 生效
1. 需要记得修改配置文件

# vim
## 基本操作
### 插入
i INSERT
### 退出
1. :wq 保存并退出
2. :q 退出
3. :q! 强制退出
4. :w[文件名] 以文件名保存

### 操作
1. u 撤销
2. Ctrl+r 重做
3. Ctrl+n 补全
4. < 自动缩进
5. > 取消缩进

### 移动光标
1. nG 移动到第 n 行
2. G 移动到最后一行
3. gg 移动到第一行
4. [n]<enter> 向下移动n行
5. [n]<space> 向左移动n个字符

### 搜索
1. /[word] 向下搜索word
2. ?[word] 向上搜索word
3. n 向下重复
4. N 向上重复

#### 使用正则表达式搜索

1. / magic(默认)
\$ ^ . * [ ] ~ 作为操作符不需要转义
```regex
/\m#\(\x\{6\}\|\x\{3\}\)
```

2. /\v very magic
所有操作符均不需要转义(即默认的正则表达式)
```regex
/\v#(\x{6}|\x{3})
```

3. /\V very no magic
所有操作符均需要转义(不转义则作为普通处理)

### 删除
1. [n]x 向后删除n个字符(包含当前)
2. [n]X 向前删除n个字符
### 块选择
ctrl+v 进入块选择模式，移动光标框选块
1. I 插入模式 对块中的一行操作，esc退出后对所有行生效(多行注释)
2. d 删除块中的内容

# Fcitx
## 安装
1. ubuntu 20.4 前的版本安装 fcitx, 不安装 fcitx5
1. 打开配置窗口需要安装 fcitx-config-gtk3
1. 除了框架, 还需要安装输入法, 如 fcitx-googlepinyin
1. 打开 LanguageSupport 设置, 设置默认输入法为 fcitx
1. 在 StartUp 设置中, 将 fcitx 设置为开机启动
1. 配置文件 etc/profile (具体查资料)
1. 重新启动

## 使用
1. 打开 fcitx-configuration 前保证 fcitx 已打开
1. 添加输入法, 添加时需要取消勾选 show only current language 


# linux
## 基本操作
### apt
(注意, 以下为子命令, 不是参数, 不需要 --)

1. install
安装
2. remove
删除
3. update
获取软件更新列表
4. upgrade
更新软件
### 文件列表
1. ls
    * -a 显示隐藏文件(all)
    * -l 显示所有信息
2. dir
### 删除
rm
1. -r 递归删除文件夹
2. -f 强制删除，不保存
### 权限
1. chgrp [-r] 
1. chown [-r]
2. chmod [-r]

## 高级操作
### 多终端
screen

## 基本知识

## 通用操作
### 软件配置
软件配置为.xxxrc eg .vimrc

# node.js
## node
### 命令行模式
使用 node 进入命令行模式
使用 .exit 退出
### 运行脚本
node 脚本路径
## 启动轻量服务器
(需要安装)
在目录下使用命令 http-server 启动轻量服务器
## 包/模块管理
可使用国内镜像版本 cnpm(需要安装)
```shell
npm install -g cnpm --registry=https://registry.npmmirror.com
```
### 安装模块
npm install [模块]
此命令将会在当前目录下安装包
### 更新模块
npm upgrade [模块]
### 卸载模块
npm unistall [模块]
### 列出模块
npm ls



