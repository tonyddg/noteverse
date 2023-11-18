# WSL
## 安装
### 直接安装
```shell
wsl --install
```

打开 cmd 或 powershell, 输入以上指令, 直接安装 wsl, 默认为 Ubuntu

### 安装特定版本
```shell
# 查看可用版本
wsl --list --online

# 安装特定版本
wsl --install -d [版本名]

```

通过以上命令安装特定版本的 Linux

### 安装后操作
更新软件 `sudo apt update && sudo apt upgrade`

## 美化
首先在 WSL 中安装 oh-my-zsh 与 p10k 主题, [参见](./linux.md#oh-my-zsh)

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

## 其他命令
### 关闭 WSL
运行 `wsl` 命令可直接启动  
但关闭 wsl 需要在外部终端中使用以下命令才可关闭

```powershell
wsl --shutdown
```


