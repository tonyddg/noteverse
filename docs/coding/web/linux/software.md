# Linux 实用软件配置笔记

## 中文输入法 Fcitx
### 安装
1. ubuntu 20.4 前的版本安装 fcitx, 不安装 fcitx5
1. 打开配置窗口需要安装 fcitx-config-gtk3
1. 除了框架, 还需要安装输入法, 如 fcitx-googlepinyin
1. 打开 LanguageSupport 设置, 设置默认输入法为 fcitx
1. 在 StartUp 设置中, 将 fcitx 设置为开机启动
1. 配置文件 `etc/profile` (具体查资料)
1. 重新启动

### 使用
1. 打开 fcitx-configuration 前保证 fcitx 已打开
1. 添加输入法, 添加时需要取消勾选 show only current language 

## 终端美化 oh-my-zsh
### 安装本体
1. [官方安装教程](https://github.com/ohmyzsh/ohmyzsh/wiki)
1. 运行 `sudo chsh -s /bin/zsh` 改变默认终端为 zsh
1. logout 或重启, 使修改生效

### 安装 p10k 主题
1. [安装依赖字体](https://blog.csdn.net/qq_39785418/article/details/122796861)  
    * 对于 Linux 内的终端, 需要在 Linux 系统中安装
    * 对于 ssh / wsl 等方式访问 Linux 终端, 需要在终端程序内安装或设置字体
1. [安装教程](https://www.cnblogs.com/luoxian1011/p/15854153.html)
1. 修改主题时运行命令 `p10k configure`

如果希望在 p10k 中, 始终显示用户名与主机名, 可参考 <https://www.reddit.com/r/zsh/comments/e416xp/prompt_elements_with_powerlevel10k/>

### 安装插件
1. [安装插件教程](https://zhuanlan.zhihu.com/p/454191603)
1. zsh-completions 插件对命令参数 -- 后按 tab 生效
1. 需要记得修改配置文件
