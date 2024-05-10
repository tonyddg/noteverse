# WSL
## 基本使用
### 直接安装
```shell
wsl --install
```

打开 cmd 或 powershell, 输入以上指令, 直接安装 wsl, 默认为 Ubuntu

### 安装特定版本
```shell
# 查看可用版本, 也可使用命令 wsl -l -o
wsl --list --online

# 安装特定版本
wsl --install -d [版本名]
```

通过以上命令安装特定版本的 Linux

### 多版本管理
wsl 中允许安装多个版本的 Linux
* `wsl --list --all` 列出所有安装的 Linux 版本
* `wsl --unregister <Distro>` 删除 Linux 版本 `Distro`
* `wsl -s <Distro>` 设置 `Distro` 为默认启动版本

### 进入 WSL
* 使用 `wsl` 可直接进入 WSL 中的 Linux 环境  
该命令进入的默认 Linux 版本可通过 `wsl -s <Distro>` 设置
* 使用 `wsl -d <Distro>` 进入版本为 `Distro` 的 Linux

### 关闭 WSL
运行 `wsl` 命令可直接启动  
但关闭 wsl 需要在外部终端中使用以下命令才可关闭

* `wsl --shutdown` 关闭所有正在运行的 Linux
* `wsl --terminal <Distro>` 关闭版本名为 `Distro` 的 Linux

### Linux 导出与导入
* `wsl --export <Distro> <file>` 导出 Linux 镜像
    * `Distro` 被导出的 Linux 版本名
    * `file` 导出镜像保存路径与文件名, 一般使用后缀 `.tar`
* `wsl --import <Distro> <path> <file>`
    * `Distro` 被导出的 Linux 版本名
    * `path` Linux 虚拟硬盘所在路径
    * `file` 导入的 Linux 镜像

### WSL 配置
WSL 有如下的配置文件
* Windows 下文件 `C:\User\<用户名>\.wslconfig` 应用于所有 WSL 的配置文件
* WSL 内文件 `/etc/wsl.config` 用于特定 Linux 环境的配置文件

常用的配置有 (注意 `\n` 在配置文件中为换行)
* 设置默认登录用户 `[user]\ndefault=<用户名>`

## 美化
首先在 WSL 中安装 oh-my-zsh 与 p10k 主题, [参见](./linux/software.md#oh-my-zsh)

从网站 <https://nerdfonts.com/> 上下载所需要的字体, 推荐 Hack Nerd Font

### Windows 终端
参考 <https://blog.csdn.net/Kaerwei/article/details/128759061>

在 Windows 10 中, 需要首先在应用商店中安装 Windows Terminal

1. 在 Windows Terminal 中设置为默认终端程序
1. 设置 -> 配置文件 -> 默认值 -> 字体 中设置字体为 Hack Nerd Font

### Vscode 终端
参考 <https://www.python100.com/html/91131.html>

1. 打开设置, 搜索 Terminal Font
1. 设置中输入字体名称 Hack Nerd Font Mono
1. 将终端字体大小设置为小于等于 14 的值

## 踩坑
### GitHub 无法使用
参考文章 <https://blog.csdn.net/qq_31375855/article/details/121838533>

使用 github 时出现错误
`gnutls_handshake() failed: The TLS connection was non-properly`

在终端中运行 
```zsh
git config --global  --unset https.https://github.com.proxy 
git config --global  --unset http.https://github.com.proxy 
```

