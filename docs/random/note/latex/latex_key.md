# Latex 要点
## 基本知识
### Latex 安装
参考文章 <https://zhuanlan.zhihu.com/p/491581833>

### Latex 教程
基本教程 <https://github.com/wklchris/Note-by-LaTeX>

实用参考 <https://www.latexstudio.net/hulatex/index.htm>

### 基本语法
#### 命令结构
Latex 的命令具有如下的基本结构  
```latex
\命令名[选项]{参数}
```

* 对于大部分命令 `[选项]` 不是必须的
    * 对于选项的命令, 应以逗号间隔多个参数, 如 `值, 参数名=值, ...` 
    * 允许参数的各个值换行, 但一个逗号后一般只能有一个换行, 不能有空行
    * 此外, 一般不会直接检查逗号, 因此宏包加载出错时检查是否出现空行与缺少逗号  
    也可在参数最后使用 `%` 注释掉不必要的换行与空格
* 对于少部分命令 `{参数}` 也不是必须的  
但希望命令后有一个空格时, 还需要保留一个空的 `{}`

其中, 有一类特殊的命令称为环境  
```latex
\begin[选项]{环境名}
...
\end{环境名}
```

对于用来显示数学公式的数学环境则是使用 `$$` 包裹

在命令中, 可使用 `%` 用于注释

#### 保留字
对于 Latex 有如下保留字  
`# $ % ^ & _ { } \ ~`

通常无法直接显示保留字  
除 `\` 与 `~` 外, 可通过 `\` 加保留字的方式表示

对于 `\`, 可使用命令 `\textbackslash`  
对于 `~`, 可使用命令 `\textasciitilde`

#### 文档结构
通常一份 Latex 的文档结构如下
```latex
% 导言区
\documentclass[doc-opt]{doc-class}

\usepackage[pkg1-opt]{pkg1-name}
\usepackage[pkg2-opt]{pkg2-name}
...

% 文档区
\begin{document}
...
\end{document}
```

其中
* 命令 `documentclass` 必须位于文档的第一行
* `doc-class` 为文档类, 常用有
    * `report` 报告文档
    * `article` 期刊文章
    * `book` 书籍
    * `beamer` 幻灯片, 来自宏包 `beamer`
    * 对于来自宏包的文档类, 可直接使用而不需要提前引用宏包  
    并且一般也不需要后续引入
* `doc-opt` 为文档选项, 常用有
    * 页面方向, 默认竖向 `portrait`, 横向 `landscape`
    * 基准字宽, 默认 `10pt`, 可选 `11pt`, `12pt`
    * 纸张尺寸, 默认信纸 `letterpaper`, 可选 a4 纸 `a4paper`
* 将开启文档环境 `\begin{document}` 前的区域称为导言区, 导言区内除了 `documentclass` 命令, 通常还可以使用 `usepackage` 命令启用宏包与进行其他设置

#### 命令的作用域
* 对于一般设置命令, 其作用域为接下来的全部文档, 接下来的文档都会受影响
* 在 `{}` 或特定环境 `\begin{}...\end{}` 内的设置命令则作用域仅在环境内生效
* 通过将文档内容以 `{}` 包括, 可以限制这些命令的作用域外溢
* 对于将内容以参数传入的命令, 其作用域即传入的参数, 因此仅参数内容会被命令修改

### Latex Workshop 插件
#### 编译 Latex 文档
打开插件页面的 Commands -> Build Latex Project 下拉菜单可查看插件支持的所有快捷编译操作, 点击即可运行  
其中常用的功能有  
* Clean up auxiliary files  
该功能可清除所有临时文件, 当编译出错需要再次编译前, 建议运行该操作
* Recipe : latexmk (xelatex)  
推荐使用此方式编译文档
* xelatex -> bibtex -> xelatex * 2  
该功能需要通过插件的 recipes 设置手动添加, 用于含参考文献文章的编译

#### 实用功能
* Commands -> View LaTex PDF  
可查看编译生成的 PDF 文档
* Commands -> Navigate, select and edit -> Sync Tex from cursor  
可以将 PDF 文档位置同步至 latex 文档光标位置  
* Commands -> Miscellaneous -> Open Citation Browser  
查看引用的参考文献信息
* Commands -> Miscellaneous -> Count words in LaTex project  

### 常见错误排查
#### 一般错误
* 环境命令 `begin` 与 `end` 是否拼写错误
* 是否缺少 `\end{document}`

#### 宏包导入出错
* 传入多个参数换行时, 是否出现空行
* 传入参数时, 是否缺少逗号

#### 中文使用
* 是否使用 XelaTex 编译
* 电脑上的字体是否安装

## 文档环境
### 标点与标识
#### 标点符号
* 引号  
在 Latex 中, 使用 `'` 表示单个右引号, `` ` `` 表示单个左引号  
双引号只需重复两次
但双引号与单引号靠近时, 需要使用命令 `\thinspace` 分隔, 例如  
``` ``\thinspace`Max' is here.'' ```
* 破折号  
    * `-` 表示相减
    * `--` 表示数学起止符
    * `---` 表示破折号
* 省略号  
使用命令 `\ldots` 表示省略号

#### 下方标识
使用宏包 `ulem` 用于文字下方标识  

使用前需要在导言区使用命令 `\usepackage{ulem}` 启用宏包

主要有以下标识
* `\uline{...}` 下划线
* `\uwave{...}` 波浪线
* `\sout{...}` 删除线
* `\dotuline{...}` 点下划线

#### 颜色标识
使用宏包 `xcolor` 用于颜色标识

* 使用命令 `\textcolor{keyword}{...}` 设置 `...` 内的内容字体颜色为 `keyword`
* 使用命令 `\colorbox{keyword}{...}` 设置 `...` 内的内容背景颜色为 `keyword`
* 常用的颜色有
    * 青色 `cyan`
    * 青柠色 `lime`
    * 黄色 `yellow`
    * 红色 `red`
    * 灰色 `gray`
* 在导言区中可以使用命令 `\definecolor{keyword}{RGB}{rr,gg,bb}` 定义颜色
    * `keyword` 颜色名称
    * `rr,gg,bb` RGB 值, 最大 255

#### 文字效果
见[字体设置](#字体设置)

#### 其他符号
对于其他符号
* 可通过数学环境 `$$` 输入
* 也可查找相应的宏包输入特殊符号, 如注音符号可使用宏包 `tipa`, 特殊符号可使用宏包 `wasysym`

### 文档内格式控制
#### 长度
Latex 中主要有以下长度单位
* `pt` 磅, 基本长度单位, 约等于 0.357 毫米
* `mm` 毫米
* `em` 当前字号下, 大写字母 M 的宽度
* `ex` 当前字号下, 小写字母 x 的宽度
* `\textwidth` 当前页面减去两侧边距的宽度
* `\linewidth` 一行文字的宽度

在命令参数中表示长度时, 需要带上单位, 且可使用 `plus` 与 `minus` 表示浮动范围, 如 `5pt plus 3pt minus 2pt`

#### 空格与换行
* 空格  
    * Latex 会将多个空格视为一个空格处理
    * 使用 `\space` 表示一个软空格 (换行时将被忽视), `\ ` 表示一个硬空格
    * 使用 `~` 代替空格, `Latex` 会将两侧的单词视为一个整体, 并避免换行拆分两侧的单词
    * 对于多个空格, 可使用 `\quad` 表示宽度为 1em 的空格, `\hspace{...}` 表示指定宽度 (需要带单位) 的空格
* 换行  
    * Latex 会将多个换行视为一个空格处理
    * 如果需要打入单个换行, 则可以使用 `\\`, 但不建议在段落中使用, 仅用于表格, 列表或数学环境
    * 此外, 还有 `\\[offset]`, 此命令除了换行, 还将设定与下一行的行间距为 `offset` + 基本行间距 (`offset` 可设定为负数)
    * Latex 将两个换行视为分段, 或使用命令 `\par` 开启一个新的段落
    * 当有因自动换行而被拆分的词如带分隔的数字, 可使用命令 `\mbox{}` 包裹

#### 弹性填充
使用命令 `\hfill` 可以实现弹性填充, 将根据一行中的带填充空间均分填充长度  
例如 `A\hfill B\hfill\hfill C`, 则 `A` 与 `B` 之间的空隙将是 `B` 与 `C` 之间空隙的一般   

类似的还有 `\hrulefill` (下划线填充) 与 `\dotfill` (点填充)  
单独使用 \hrulefill 即可绘制一条分隔线

#### 分页与段落
推荐使用 `{}` 包裹各个段落设置与内容, 以此各列各个段落内设置的影响

默认情况与英文写作中, 没有段首缩进, 而在中文文档中需要段首缩进  
此时需要使用宏包 `indentfirst` 启用缩进功能  
* 在导言区使用命令 `\setlength\parindent{2em}` 设置段首缩进
* 在段落前使用命令 `\noindent` 取消==接下来一个段落==的段首缩进

使用命令 `\setlength{\parskip}{length}` 控制段落间的距离  
其中 `length` 为长度, 默认为 `0pt plus 1pt`

通常当内容满一页之后就会开启新一页  
此外也可使用命令 `\newpage` 强制开启新一页, 未填满的部分将被留白  
使用 `\clearpage` 则除了新开一页, 还能防止[浮动体](#浮动体环境)进入下一页

### 箱子排版
箱子是 Latex 排版的基础, 通过使用箱子可以完成一些特殊操作

#### 无框箱子
使用命令 `\mbox{...}` 可以定义一个自适应大小的无框箱子  
由于箱子为一个整体, 因此通过将一段单词或文字定义为无框箱子, 可以防止这些内容被换行切断

使用命令 `\makebox[width][pos]{...}` 可以定义一个指定宽度的箱子  
* `width` 为箱子宽度, 使用命令 `\width` 表示自然宽度, 如 `2\width` 即两倍的自然宽度
* `pos` 为内容对齐方式, 有水平对齐 `l/c/r` (居左, 居中, 居右) 与 `t/b` (上下对齐)

在这类箱子内还可使用[弹性填充](#弹性填充), 将以指定的宽度为填充范围

#### 有框箱子
命令 `\fbox{}` 对应有框版本的 `\mbox{}`  
命令 `\framebox[][]{}` 对应有框版本的 `\makebox{}`  
在数学环境中, 使用 `\boxed{...}` 表示有框箱子 

使用命令 `\setlength{\fboxrule}{...}` 设置边框线条的宽度

#### 定长箱子
命令 `\rule{width}{height}` 可以定义一个黑色的定长箱子  
其中 `width` 与 `height` 即箱子的宽度与长度  

令宽度或长度为 $0$, 将不会显示, 并达到占位的效果, 可用于表格以撑起表格单元

#### 覆盖箱子
命令 `\llap{}` 与 `\rlap{}` 可以定义覆盖箱子  
其中 `\llap{}` 为向左覆盖, `\rlap{}` 为向右覆盖

#### 升降箱子
命令 `\raisebox{高度}{...}` 可以定义升降箱子, 以实现  
其中高度可以是负数, 以表示下降  

结合覆盖箱子使用, 可实现类似上标与下标的效果 (更推荐使用数学环境)  
例如 `A\raisebox{0.5em}{\tiny 上标}\llap{\raisebox{-0.5em}{\tiny 下标}}`

#### 段落箱子
命令 `\parbox[pos]{width}{...}` 可以定义带段落的箱子
* `pos` 内容竖直对齐方式, 有 `tcb`, 置顶, 居中, 置底
* `width` 箱子宽度

段落箱子内允许换行, 且内容过长时将自动换行

#### 高级彩色箱子
详见关于宏包 tcolorbox 的介绍

### 字体设置
#### 字族
Latex 将字体分为三大族, 文档中根据要求使用这三中字族设置文字字体即可 

|代号|字族名|使用场景|启用命令|临时启用命令|
|--|--|--|--|--|
|rm|有衬线字族 (默认)|一般正文|`\rmfamily`|`\textrm{...}`|
|sf|无衬线 (Sans Serfi) 字族|标题或非正式正文|`\sffamily`|`\textsf{...}`|
|tt|等宽 (Typewriter) 字族|代码|`\ttfamily`|`\texttt{...}`|

其中  
* 字族名与字体类型无强制关联, 如可设置无衬线字体为 rm 字族
* 启用命令一般用于段前, 将使整段以及之后的文字变为指定字体  
    * 为了防止[设置外溢](#命令的作用域), 应使用 `{}` 包裹被设置的内容
* 临时启用命令用于文章中, 设置作为参数的文字为指定字体  

在导言区使用命令 `\renewcommand{\familydefault}{\xxdefault}` 替换文章使用的默认字族  
* `xx` 为以上字族的代号

在导言区使用命令 `\renewcommand{\xxdefault}{字体代号}` 设置字族使用的字体  
* `xx` 为被设置的字族代号
* `字体代号` 为需要设置的字体代号 

#### 自定义字体集
通过 <https://tug.org/FontCatalogue/> 可以查询官方字体  
根据字体说明导入字体的包后, 一般将根据字体类型, 自动将自身设置为对应字族的默认字体  

* 需要在中文字体设置之后 (如导入宏包 `ctex`) 设置

如导入开源的 DejaVu 字体
```latex
% 导入包时将自动替换 rm 字族的字体
\usepackage{DejaVuSerif}
```

对于数学公式的字体则参考 <https://ctan.org/topic/font-maths>  
建议数学字体在最开使设置, 以覆盖数学字体包中修改的其他字体

推荐英文字体
* rm 有衬线字族
    * Source Serif Pro 字体, 启用命令 `\usepackage[t1]{sourceserifpro}` (来自 adobe, 免费字体)
    * noto-serif 字体, 宏包同名 (来自 google, 免费字体)
    * Time 字体, 启用命令 `\renewcommand{\rmdefault}{ptm}` (论文规范, 没有加粗与斜体)
* sf 无衬线字族
    * DejaVuSans 字体, 宏包同名 (免费字体)
    * FiraSans 字体, 启用命令 `\usepackage[sfdefault]{FiraSans}` (免费字体)
    * OpenSans 字体, 启用命令 `\usepackage[defaultsans]{opensans}` (广泛使用的免费字体)
* tt 等宽字族
    * DejaVuSansMono 字体, 宏包同名 (免费字体)
    * FiraMono 字体, 宏包同名 (免费字体)
* 数学字体
    * 有衬线公式字体 `newtxmath` (基于 NTX 字体)
    * 有衬线公式字体 `notomath` (基于谷歌的 noto-serif 字体, 同时将在 rm 字族启用 noto-serif 字体)
    * 无衬线公式字体 `\usepackage[fakebold,mathrm=sym]{firamath-otf}` (基于 FiraSans 字体)

以下为推荐字体方案
```latex
% 方案一
% 首先设置汉字字体, 汉字字体方案见下方介绍
\usepackage[fontset=source]{ctex}
% 其次设置数学字体
\usepackage{newtxmath}

% 设置三大字族的字体
\usepackage[t1]{sourceserifpro}
% 以 DejaVu 字体为主
\usepackage{DejaVuSans}
\usepackage{DejaVuSansMono}

% 方案二
\usepackage[fontset=noto]{ctex}

\usepackage[fakebold,mathrm=sym]{firamath-otf}
\usepackage{noto-serif}
% 以 Fira 字体为主
\usepackage[sfdefault]{FiraSans}
\usepackage{FiraMono}
```

#### 字体变形
* 使用命令 `\textbf{...}` 将被包裹的内容加粗
* 使用命令 `\textit{...}` 将倍包裹的内容设置为斜体 (英文强调)
* 使用命令 `\textsl{...}` 将倍包裹的内容设置为斜体 (一般斜体)

#### 字体大小
以下命令为常用的字体大小设置命令
* `\normalsize` 默认字体大小, 即基准字体大小  
注意在被修改字体的结尾使用此命令恢复默认字体大小
* `\tiny` 极小字体
* `\small` 小字体
* `\large` 大字体
* `\huge` 极大字体
* `\zihao{...}` 来自宏包 `ctex`, 设置中文标准的字号  
数字表示字号, 开头带 `-` 表示小字号

### 中文支持
注意, 如果需要编写中文文档, 则最好使用 XeLatex 编译  
对于 vscode 插件 LaTex Workshop, 则应[选择 XeLatex 编译](#latex-workshop-插件), 而非默认的 pdflatex

#### 启用中文
注意, 默认情况下, Latex 文档中不允许使用中文  
如果要使用中文, 需要使用以下两种方法

* 启用宏包 `ctex`  
* 启用宏包 `ctex` 内定义的中文文档类, 常用有
    * `ctexart` 中文期刊文章
    * `ctexrep` 中文报告
    * `ctexbook` 中文书籍
    * `ctexbeamer` 中文幻灯片
    * 对于中文文档
        * 可通过 `zihao` 属性设置基于字号的基准自宽
            * 可用基准有 `5` 五号与 `-4` 小四
        * 此外还共享来自宏包 `ctex` 的其他设置, 如 `fontset` 

#### 中文字族
通过宏包 `ctex` 的 `fontset` 选型设置文档使用的中文字族集, 即中文的一般字族 (宋体), 无衬线字族 (黑体) 与等宽字族 (有时采用仿宋字体代替) 使用的字体  
常用设置有
* `windows` 使用来自 Windows 系统自带的字体  
(无加粗与斜体)
* `fandol` 使用 Latex 自带的 Fandol 字体  
(出现警告时需要添加命令 `\PassOptionsToPackage{quiet}{xeCJK}`)
* `<name>` 搜索文档所在路径下的自定义设置文件 `ctex-fontset-<name>.def`  
设置方法见[自定义字族](#自定义字族)

经过字族集设置后, 字族 rm, sf, tt 中的汉字将自动使用 `fontset` 中使用的字体  
注意, 中文字体一般没有斜体

此外还可通过 `\songti`, `\heiti`, `\fangsong` 等命令启用特定字体 

#### 自定义中文字族集
以设置开源的思源字体为例  

1. 下载所需字体文件  
思源字体可从 <https://github.com/adobe-fonts> 下载, 字体文件在仓库源文件中
1. 将下载的字体放到 TexLive 的软件目录 `.../texmf-dist/fonts` 下  
1. 在文档根目录下, 创建如下所示的配置文件 `ctex-fontset-source.def`

```latex
% 配置宋体
% 定义字族 zhsong
% 以 SourceHanSerifSC-Regular.otf (字体文件名) 为通常字体
% 以 SourceHanSerifSC-Bold.otf 为加粗字体 (通过选项 BoldFont 设置)
% 通过选项 AutoFakeSlant 启用自动斜体
\setCJKfamilyfont{zhsong}{SourceHanSerifSC-Regular.otf}[BoldFont=SourceHanSerifSC-Bold.otf, AutoFakeSlant]
% 配置默认字体, 即 rm 字族, 与宋体相同
\setCJKmainfont{SourceHanSerifSC-Regular.otf}[BoldFont=SourceHanSerifSC-Bold.otf, AutoFakeSlant]
% 自定义命令 \songti 以方便地启用宋体
\newcommand{\songti}{\CJKfamily{zhsong}}

% 配置黑体
\setCJKfamilyfont{zhhei}{SourceHanSansCN-Regular.otf}[BoldFont=SourceHanSansCN-Bold.otf, AutoFakeSlant]
% 配置无衬线字体, 即 sf 字族, 与黑体相同
\setCJKsansfont{SourceHanSansCN-Regular.otf}[BoldFont=SourceHanSansCN-Bold.otf, AutoFakeSlant]
\newcommand{\heiti}{\CJKfamily{zhhei}}

% 配置等宽字体

\setCJKfamilyfont{zhmono}{SourceHanMonoSC-Regular.otf}[BoldFont=SourceHanMonoSC-Bold.otf, AutoFakeSlant]
% 配置等宽字体, 即 tt 字族, 与等宽字体相同
\setCJKmonofont{SourceHanMonoSC-Regular.otf}[BoldFont=SourceHanMonoSC-Bold.otf, AutoFakeSlant]
\newcommand{\dengkuan}{\CJKfamily{zhmono}}
```

也可使用最接近标准要求的方正字体, 以下自定义的方正字体配置 (该配置中的字体允许免费商用)

```latex
% 由于没有粗体, 因此粗体也设置为自动粗体
\setCJKfamilyfont{zhsong}{FZSSK.TTF}[AutoFakeBold, AutoFakeSlant]
\setCJKmainfont{FZSSK.TTF}[AutoFakeBold, AutoFakeSlant]
\newcommand{\songti}{\CJKfamily{zhsong}}

\setCJKfamilyfont{zhhei}{FZHTK.TTF}[AutoFakeBold, AutoFakeSlant]
\setCJKsansfont{FZHTK.TTF}[AutoFakeBold, AutoFakeSlant]
\newcommand{\heiti}{\CJKfamily{zhhei}}

% 使用楷体作为等宽字体
\setCJKfamilyfont{zhmono}{FZKTK.TTF}[AutoFakeBold, AutoFakeSlant]
\setCJKmonofont{FZKTK.TTF}[AutoFakeBold, AutoFakeSlant]
\newcommand{\dengkuan}{\CJKfamily{zhmono}}
```

同样, 也可使用开源的 noto 字体, 下载地址 <https://github.com/notofonts/noto-cjk/tree/main>  

当中文字体配置错误时检查
1. 字体没有需要安装到电脑中
1. 需要在 `.../texmf-dist/fonts/misc/cjk-gs-integrate` 中添加配置

### 正式排版
#### 大纲划分
使用以下命令划分大纲并确定表达
* `\part{部分名}` 文档部分
* `\chapter{章名}` 文档章节, 仅用于 book 与 report 类的文档
* `\section{节名}` 节
* `\subsection{小节名}` 小节
* `\subsubsection{次节名}` 次节

在大纲划分中
* 对于标题都会进行计数, 但对于使用末尾带 $*$ 版本的命令, 则将不会进行计数, 不会显示序号且不会计入目录
* 对于以上情况, 使用此命令 `\addcontentsline{toc}{标题类型}{标题名称}` 计入目录
* 使用命令 `\renewcommand{\chaptername}{新章节名}` 自定义章节名称, 默认为 `Chapter` (部分同理, 默认为 `Part`)
* 文档中的一到三级标题将以 $x.y.z$ 的形式显示标题层级
    * 对于 book 与 report 类的文档, 以 `\chapter, \section, \subsection` 为三级标题  
    * 对于 report 类的文档, 以 `\section, \subsection, \subsubsection` 为三级标题

#### 标题格式控制
使用 titlesec 宏包下的命令对标题格式进行控制  
标题共分为标签与标题文字两部分, 标签用于显示标题计数

`\titleformat{command}[shape]{format}{label}{sep}{before}`  
* `command` 被设置的标题命令, 需要带 `\`
* `shape` 标题与标签样式, 可省略  
    * `hang` 默认值, 计数标签在左, 标题文字在右
    * `display` 标签在上行, 标题文字在下行
    * `frame` 类似 `display`, 但有线框
* `format` 标签格式命令, 相当于在标签前使用此命令  
即字号字体等命令, 常用于标题的设置有
    * 位置 
        * 居中 `\centering`
        * 居左 `\raggedright` (右不对齐)
        * 居右 `\raggedleft` (左不对齐)
    * [字号](#字体大小)  
        * `\Huge` 用于一级标题
        * `\LARGE` 用于二级标题
        * `\Large` 用于三级标题
        * 也可使用 `\zihao` 命令 (需要宏包 ctex)
    * 字体  
        * `\xxfamily` 设置[字族](#字族), xx 可是三种字族之一
        * `\bfseries` 加粗
        * `\itshape` 斜体
    * [颜色](#颜色标识) (需要加载宏包 `xcolor`) 
        * `\color{keyword}` 定义颜色, 其中 `keyword` 为定义的颜色名
* `label` 标签格式字符
    * 可使用[大纲信息宏](#大纲信息宏)表示当前标题信息
    * 标签中的空格应使用[空格命令](#空格与换行)
* `sep` 标签与标题间的距离, 需要使用[带单位的长度](#长度)
    * `hang` 样式为水平距离
    * `display` 样式为垂直距离
* `before` 标题文字格式命令, 相当于在标签前使用此命令  
    * 使用方法与标签同, 但标题文字的样式会受标签的影响
    * 如果不想额外设置标题文字, 依然要保留一个空的 `{}`

例如设置中文的章节样式有  
```latex
\titleformat{\chapter}[display]{\centering\sffamily\bfseries\Large}
{第\zhnumber{\thechapter} 章}{10pt}{\LARGE}
```

对于节, 小节, 次节等标题, 如果仅设置标题格式, 可使用简单版的命令, 参数内容与 `\titleformat` 一致  
`\titleformat*{command}{format}`

例如 report 中节的格式为  
`\titleformat*{\section}{\rmfamily\bfseries\Large}`

#### 附录
使用命令 `\appendix` 开启附录, 类似于一个特殊的部分  
在附录中, 章, 节等都将重新开始计数

习惯上附录的一级标题以字母为序号, 因此一般在附录前还需要重新设置标题样式, 如  
`\titleformat{\chapter}[display]{\bfseries\centering\sffamily\LARGE}{附录: \Alph{chapter}}{10pt}{\Huge}`

#### 元数据
文档的元数据一般在导言区的最后定义, 主要有
* `\title{...}` 文档标题
* `\author{...}` 作者名
* `\data{...}` 时间, 若没有给出参数, 则以编译时的时间作为参数

定义元数据后, 在文档区的开始使用命令 `\maketitle` 可以自动创建文档封面

#### 目录
使用命令 `\tableofcontents` 将根据文档的大纲自动创建  
通过修改宏 `\contentsname` 以修改目录名称, 如 `\renewcommand{\contensname}{目录}` 
如果需要带有超链接的目录, 可见[标签与超链接](#标签与超链接), 并加载有关宏包

使用命令 `\listoffigures` 可创建关于图片的目录  
使用命令 `\listoftables` 可创建关于表格的目录  

#### 大纲信息宏
有的是否需要在文章内识别当前文字所在的大纲信息, 可使用以下大纲信息宏
* `\xxxtitle` 所在标题名称, 如 `\chaptertitle`
* `\xxxname` 标题类型名, 如 `\chaptername` 默认为 CHAPTER
* `\thexxx` 当前标题所在的 `xxx` 标题计数, 也可以使用 `\thepage` 表示当前页数
* `\chinese{计数器名称}` 以中文格式输出计数器值, 同理还有 `roman/Roman` 显示罗马计数, `alph/Alph` 显示英文字母计数

### 图片与表格
#### 浮动体环境
一般将表格或图片插入浮动体环境以将图片或表格与其标题定义为一个整体, 并动态排版  
浮动体的基本格式如下
```latex
\begin{浮动体环境}[排版规则]
<位置控制命令>

\caption{浮动体标题}
\label{浮动体标签}

<浮动体内容>

\end{浮动体环境}
```

* 浮动体环境
    * 图片使用环境 `figure`
    * 表格使用环境 `table`
* 浮动体位置
    * 居中 `\centering`
    * 居右 `\raggedright`
    * 居左 `\raggedleft`
* 排版规则  
一般推荐多个规则使用, 将按顺序判断能否放下图片  
默认使用 `tpb`, 推荐使用 `htbp`, 最好不要单独使用
    * `h` 当前位置插入
    * `t` 插入页面顶部
    * `b` 插入页面底部
    * `p` 单独一页显示
* 浮动体标题  
    * 非必要, 但仅当使用此命令时才会显示 计数标签 + 标题文字的浮动体标题
    * 当 `\caption` 在内容上方时, 标题显示在浮动体方, 反之显示在下方  
    对于表格一般标题在上, 对于图片一般标题在下
* 浮动体标签  
非必要, 仅用于超链接的识别, 但使用时必须放在 `\caption` 下方

#### 非浮动体插入
实际上, 插入表格或图片不一定需要浮动体  
但是仅推荐在封面等排版固定的情况中使用, 且无法使用 `\caption` 命令进行编号

可使用如下方式插入
```latex
{
    <位置控制命令>
    <表格或图片内容>
}\\[<间距控制>]
```

#### 插入图片
对于 pdf, eps, png, jpg 格式的图片, 需要启用宏包 graphicx 使用以下命令插入  
`\includegraphics[width=图片宽度]{图片路径}`
* 图片宽度 推荐使用相对宽度, 如 `0.8\linewidth`
* 图片路径 可以是相对当前文档目录的相对路径

* 对于其他格式的图片, 如 svg, 可导入 .drawio.png 文件 (注意导入时适当放大以避免图像模糊)
* 对于 drawio 图片, 建议使用 .drawio.png 格式

#### 多张图片并排
多张图片排列需要使用宏包 subfigure, 并在 `figure` 环境中使用  
`\subfigure[子标题]{图片内容}`
* 子标题即显示在子图片下的标题, 可以是数学环境
* 图片内容即插入图片命令, 多张图片并排时, 总宽度不能超过 `\linewidth`, 因此需要合理控制宽度

当需要多行子图片时, 可使用 `\\` 换行  
例子如下
```latex
\begin{figure}[htbp]
    \centering
    \subfigure[$\log$]{
        \includegraphics[width = 0.4\linewidth]{./src/log.drawio.png}
    }
    \subfigure[$\sin$]{
        \includegraphics[width = 0.4\linewidth]{./src/sin.drawio.png}
    }
    \\
    \subfigure[$\sinh$]{
        \includegraphics[width = 0.4\linewidth]{./src/sinh.drawio.png}
    }
    \subfigure[$\tan$]{
        \includegraphics[width = 0.4\linewidth]{./src/tan.drawio.png}
    }
    \caption{四个函数}
\end{figure}
```

#### 基础表格
```latex
\begin{tabular}[c]{|c|c|c|} % 单元对齐与列设置
    \hline % 行上方横向分隔线
    {a} & {b} & {c} \\ % 各行单元
    \hline
    {d} & {e} & {f} \\
    \hline % 底部分隔线
\end{tabular}
```

* 单元纵向对齐设置
    * `c` 内容中线与单元格中线对齐
    * `t` 内容上端与单元上边线对齐
    * `b` 内容下端与单元下边线对齐
* 列设置 即表格各列的分隔线与单元设置, 按照从左到右的方式排列
    * 单元设置 单元设置与表格的列数对应, 每个单元设置对应一列
        * `c` 单元内容居中
        * `l` 单元内容左对齐
        * `r` 单元内容右对齐
        * `p{长度}` 单元内容为指定宽度, 左对齐
        * `*{次数}{设置}` 可将设置重复指定次数, 较少输入量, 如 `|*{7}{c|}` 将产生七列居中带分隔线的表格
        * `>{...}` 单元开始命令, 在以上单元设置的左侧 (需要宏包 array, 同理有 `>{...}`, 结束命令, 需要在设置的右侧)  
        例如 `>{\centering}p{10em}` 可以实现同时控制长度与对齐方式 (如果发生异常, 可能还需要命令 `\arraybackslash`)
    * 分隔线 各个单元之间的分隔线不是必须的 (未设置时为无分隔线)
        * `|` 一条竖线
        * `||` 两条竖线
        * `@{}` 指定分隔线字符, 每有传入参数表示无分隔线
* 横向分隔线 横向分隔线不属于行的内容, 但一般在各行内容开始的位置确定
    * 没有给出时, 不绘制横向分隔线
    * `\hline` 横向完整水平线 (使用两个 `\hline` 可绘制双线)
    * `\cline{i-j}` 横跨 i 到 j 列的水平线 (从 1 开始计), 可以使用多个 `\cline` 命令绘制多个水平线
    * `\Xhline{宽度}` 指定宽度的完整水平线 (需要宏包 makecell), 类似的有 `\Xcline{横跨}{宽度}`
* 各行单元
    * 使用 `&` 分割一行内不同列的单元
    * 在剩余部分内填入单元内容
    * 使用 `\\` 进入下一行
    * 可以使用 `{}` 包裹单元内容, 使表格更清晰 (非必要, 对于跨行与跨列则不能使用 `{}` 包裹)

#### 表格结构变形
原生表格即可支持跨列 (横向)  
跨列时使用命令 `\multicolumn{number}{format}{text}` 代替原有的元素
* `number` 跨列数, 使用跨行命令后, 一行的单元数将响应减少
* `format` 跨列单元格格式设置, 与[基础表格的列设置](#基础表格)同
    * 该设置将取代原有的竖直线与对齐方式
    * 仅需设置元素对齐 + 右侧竖直线
    * 仅能设置一列以及该列两侧的分隔线, 不能设置多列
* `text` 单元内容

跨列例子如下
```latex
\begin{tabular}{|c|c|c|}
    \hline
    {Lorem} & {ipsum} & {$\mathrm{d}t$} \\
    \hline
    {Lorem} & \multicolumn{2}{c|}{Hello World} \\
    \hline
\end{tabular}
```

跨行需要使用宏包 multirow (纵向)    
跨行时使用命令 `\multirow[pos]{number}{width}{text}` 代替原有元素
* `pos` 单元纵向对齐设置, 与[基础表格](#基础表格)中的设置相同
* `number` 跨行数, 实际为单元格相对单行高度的倍数, 不需要与实际对应
    * 当其他单元格出现换行等情况导致某行变宽, 则需要增加跨行数
    * 跨行单元格宽度即 `单行高度 * 跨行数` 不会自动变化, 因此内容过多时可能超出单元格  
    可通过在被覆盖行使用 `\makecell{\;\\\;}`, 使特定行的高度翻倍, 并增加跨行数
* `width` 宽度, 一般使用 `*` 表示自适应宽度
* `text` 单元内容  
使用跨行时, 应在跨行开始处输入内容, 被覆盖的单元则留空
* 跨行时应使用 `\cline` 作为分隔线, 防止跨行单元被分隔线覆盖

跨行例子如下
```latex
\begin{tabular}{|c|c|}
    \hline
    {Lorem} & {ipsum}\\
    \hline
    \multirow{2}*{Lorem} & {adipisicing}\\
    \cline{2-2}
    & {ipsum}\\
    \hline
\end{tabular}
```

如果需要同时跨行与跨列, 则以 `multicolumn` 先跨列, 在以 `multirow` 跨行, 并在下方以 `multicolumn` 留空  
如例子
```latex
\begin{tabular}{|c|c|c|}
    \hline
    {Lorem} & {ipsum} & {$\mathrm{d}t$} \\
    \hline
    {Lorem} & \multicolumn{2}{c|}{\multirow{2}{*}{Hello World}} \\
    \cline{1-1}
    {Lorem} & \multicolumn{2}{c|}{} \\
    \hline
\end{tabular}
```

除了跨行与跨列, 也可以通过嵌套的方式划分表格结构, 嵌套时注意
* 无论是否跨列, 应当使用 `\multicolumn{x}{@{}c@{}|}` 的方式设置对齐方式以消除空白
* 建议嵌套表格不要用于同时跨列与跨行的单元格
* 建议嵌套单元格至少有两行, 且内容长度足够, 以防止空白
```latex
\begin{tabular}{|c|c|c|}
    \hline
    {Lorem} & {ipsum} \\
    \hline
    {Lorem} &
        % 不用于跨列, 而是用于重新设置单元格对齐方式
        % 使用 @{}c@{} 的方式以消除列间空距
        \multicolumn{1}{@{}c@{}|}{
        % 该嵌套表格位于一个跨列单元格中
        \multirowcell{3}{
            % 不需要设置外围的分隔线
            \begin{tabular}{c|c|c}
                a & b & c\\
                \hline
                d & e & f\\
                \hline
                g & h & i
            \end{tabular}
        }
        }\\
    \cline{1-1}
    % 使用空的 \makecell{\;\\\;}, 强制加高改行单元格
    {Lorem} & \multicolumn{1}{@{}c@{}|}{\makecell{\;\\\;}}\\
    \hline
\end{tabular}
```

#### 实用技巧
一般情况下单元格无法换行  
为了解决这个问题, 需要使用宏包 makecell  
使用 `\makecell{...}` 包裹单元格内容, 其中可使用 `\\` 完成换行  
使用 `\makecell{...}` 时, 将覆盖该单元格默认的对齐方式, 使用居中对齐  
需要使用 `\makecell[对齐方式]{...}` 的方式设置对齐, 参数与[基础表格](#基础表格)同, 使用 `竖直对齐参数 + 水平对齐参数` 的组合

单元格大小限制 (似乎存在问题 ?)  
在单元格内使用不显示的[定长箱子](#定长箱子)可以实现限制表格大小的效果  
例如 `\rule{0pt}{2em}` 可限制单元格的高度为 2em

单元格颜色  
使用宏包 colortbl 可以为单元格添加颜色
* `\cellcolor{keyword}` 将此命令添加到单元格内容前, 可为此单元格设置为指定[颜色](#颜色标识)
    * 对于跨列单元格, 在内容内使用 `\cellcolor`
    * 对于 `makecell` 单元格, 在 `\makecell` 命令前使用 `\cellcolor`
    * 对于跨行单元格, 无法添加颜色
* `\rowcolor{keyword}` 将此命令添加到分隔线后, 内容开始前, 可以为一行添加颜色 (优先级较低)
* 使用该宏包时, `cline` 可能会无法正常显示, 为此最好使用来自宏包 hhline 的分隔线 (详见该宏包的说明)

分割表头  
使用宏包 diagbox 可以绘制斜向的分割表头  
即以斜线分割单元格, 一般用于左上角的单元格, 在此单元格内使用命令  
`\diagbox{...}{...}{...}` 将从下到上的内容作为参数 (进传入两个参数则以斜向分割单元格为两个)

表单排版  
通过利用无边框表格可以实现规整的表单排版, 例如论文封面的基本信息排版  
其中有如下技巧
* 使用 `\uline{\;\hfill\;}` 画出整行的下划线 (省略空格 `\;`, 将导致下划线被优化)
* 使用 `\\[距离]` 增加表格下一行的行距

```latex
\begin{tabular}{p{0.2\linewidth}p{0.5\linewidth}}
    标\hfill 题& \uline{\;\hfill\;} \\[0.5em]
    作\hfill 者& \uline{\;\hfill\;} \\[0.5em]
    指\hfill 导\hfill 教\hfill 师& \uline{\;\hfill\;}
\end{tabular}
```

### 参考文献
#### 参考文献基本信息
在文章内引入参考文献前, 需要在文档目录下以 .bib 文件编辑参考文献的基本信息  
对于各条参考文献的信息, 使用如下格式
```
%<注释>
@<文献类型>{<文献标签>
    <文献属性> : {<文献属性值>},
    ...
}
```
* 文献类型  
主要有期刊 article, 公开书籍 book, 学位论文 mastersthesis, 其它如电子文献 misc
* 文献标签  
可以任意取, 用于在文档中索引
* 文献属性  
对于不同的文献类型, 要求的文献属性不同
* 文献属性值  
对于多个属性值, 如多个作者, 使用 `and` 分隔

以下为常用的文献类型以及对应的文献属性
* 期刊文章 article
    * 作者 author
    * 标题 title
    * 期刊名 journal
    * 出版年份 year
    * 卷 volume
    * 期 number
    * 起止页码 pages (可选)
* 书籍 book
    * 作者 author
    * 标题 title
    * 出版社 publisher
    * 出版年份 year
    * 出版地 address
* 学位论文 mastersthesis
    * 作者 author
    * 标题 title
    * 出版单位 school
    * 出版地 address
    * 出版年份 year
* 电子文献 online (非标准类型, 需要模板支持)
    * 作者 author
    * 标题 title
    * 网址 howpublished
    * 年份 year

在如 Google 学术等网站查询文献时, 支持导出 bib 文本, 可直接粘贴到 bib 文件中, 无需手动编辑

#### 参考文献的插入与使用
1. 首先在 `\begin{document}` 前使用命令 `\bibliographystyle{参考文献模板}` 确定参考文献的显示方式, 主要有
    * `plain` 按第一作者名称顺序排列
    * `unsrt` 按引用顺序排列
    * `alpha` 按作者名称与出版顺序排列
1. 在引用参考文献的文档后添加 `\cite{文献标签}` 即可插入参考文献索引
1. 在最后使用命令 `\bibliography{bib 文件名}` 插入参考文献列表, 需要将同目录下的 bib 文件名作为参数传入 (不需要后缀)
1. 编译文档时需要先使用 XeLaTex 编译一次, 再使用 BibTex 编译一次, 最后使用 XeLaTex 编译两次, 可使用 [vscode 插件](#latex-workshop-插件)完成

#### 参考文献的显示格式
对于命令 `\bibliographystyle` 除了默认的模板, 还可以引用宏包或期刊模板中的 .bst 格式文件 (不需要后缀)  
常用的有宏包 gbt7714, 提供了满足国标要求的参考文献模板 gbt7714-numerical 

### 抄录环境与代码环境
#### 抄录环境
抄录环境中, 文档内容将不经过 LaTex 解释直接显示, 且以 tt 字族显示  
对于行内的抄录环境使用 `\verb|内容|` (注意 \verb 命令参数可以 `|`, `#` 或 `?` 中的一种包裹)  
对于多行抄录环境, 有环境名 `verbatim`

还可以使用带 `*` 版本的命令, 此时会将空格以 `␣` 的方式显示  

可使用 `{}` 包裹 `verbatim` 环境, 并在环境前设置字号等

#### 代码环境
代码环境与抄录环境类似, 但需要使用宏包 `listings`  

使用时
```latex
\begin{lstlisting}[language=代码语言, caption=代码环境标题]
...
\end{lstlisting}
```  

其中属性 `caption` 不是必须的

也可使用命令 `\lstinputlisting[设置]{代码文件}` 引入代码文件, 设置与环境 `lstlisting` 的设置相同

#### 代码显示设置
默认情况下, 代码环境相比抄录, 仅实现了加粗效果, 要实现其他效果还需要设置样式

首先使用命令 `\lstdefinestyle{样式名}{样式设置}` 定义样式, 常用的设置有
* `backgroundcolor` 背景颜色, 参数一般为来自宏包 xcolor 的 `\color{keyword}` (详见[颜色标识](#颜色标识))
* `rulecolor` 边框颜色, 同上
* `frame` 边框风格, 常用选项有 `none` 无边框, `single` 单边框
* `basicstyle` 基本风格, 可使用 `\xxfamily` 设置字体, `\color{keyword}` 设置颜色
* `keywordstyle` 关键字风格
* `commentstyle` 注释风格
* `stringstyle` 字符串风格
* `numberstyle` 行号风格
* `numbers` 行号位置, 可选参数有 `right`, `left`, `none`
* `captionpos` 标题位置, 可选参数有上方 `t`, 下方 `b`
* `breaklines` 超出一行的文字是否自动换行
* `tabsize` tab 间隔长度
* `keepspaces` 保持空格

在代码前或引导区使用命令 `\lstset{style=启用的命令}` 即可使命令生效

可使用如下类 vscode 风格的代码配色
```latex
\lstdefinestyle{vscodec}{
    backgroundcolor=\color{white},
    basicstyle=\ttfamily\color{black},
    commentstyle=\color[RGB]{0, 128, 0},
    keywordstyle=\color{blue},
    numberstyle=\ttfamily\color[RGB]{110, 118, 129},
    stringstyle=\color[RGB]{163, 21, 21},
    frame=single,
    rulecolor=\color{black},
    numbers=left,
    breaklines=true,
    captionpos=b,
    keepspaces=true,
    showtabs=false,                  
    tabsize=4
}
```

### 其他文档要素与环境

#### 标签与超链接
* 使用 `\label{标签名}` 在文档的任意位置添加标签  
一般推荐标签名使用格式 `[要素名]:[标签内容]`, 如 `fig:example`

* 通常使用宏包 hyperref 创建超链接, 一般将该宏包放置在最后引入  
启用宏包后, 将自动为目录添加超链接且将为 PDF 生成书签目录  

该宏包常用参数有
    * `colorlinks` 是否启用链接颜色
    * `linkcolor` 文档内链接颜色
    * `urlcolor` 网页链接颜色
    * `citecolor` 参考文献链接颜色
    * `bookmarks` 是否生成 pdf 书签
* 当在标题中使用了如数学环境等无法显示为纯文本的内容无法显示为 pdf 书签则    
需要使用 `\texorpdfstring{原始内容}{替换内容}`, 如 `\texorpdfstring{$E=mc^2$}{E=mc\textasciicircum 2}`  
* 文档内链接 `\hyperref[label-name]{print-text}`, 用于一般位置的链接
    * `label-name` 标签名称
    * `print-text` 链接文字
* 自动文档内链接 `\autoref{label-name}`, 用于对计数要素的链接
    * `label-name` 标签名称
    * 将根据链接所在环境, 以及上方要素自动生成 `要素名 + 要素计数` 的链接文字  
    其中要素名通过重新定义 `\xxxautorefname` 设置, 如 `\renewcommand\figureautorefname{图}`
    可用要素如下
        * 各级标题 (标签放在标题后)
        * 图片与表格 (标签放在 `\caption` 下)
        * Equation 环境中的公式 (标签放在环境内)
        * 定理 (Theorem), 脚注 (footnote), 附录 (Appendix) 等
* 链接到标签所在页 `\autopageref{label-name}`, 用于链接到标签所在页
* 带名称的网页链接 `\href{URL}{print-text}`
* 纯网页链接 `\url{URL}`

#### 脚注
* 在文章中需要脚注的位置使用 `\footnote{脚注内容}` 即可在此位置
* 在如表格中的文字使用脚注时, 需要在脚注位置使用命令 `\footnotemark`, 再在下方使用命令 `\footnotetext{脚注内容}` 确定脚注内容
* 如果在标题或 `\caption` 中的文字使用脚注时, 需要在脚注命令前添加 `\protect`

#### 列表
一般将列表包含在列表环境内, 在环境中以 `\item` 命令生成一个新的列表项

有三种常用的列表环境
* 无序列表 `itemize`  
无序列表项中可传入参数 `\item[...]` 指定特定列表项的起始符号
* 有序列表 `enumerate`
* 描述列表 `description`  
描述列表项需要出入参数 `\item[...]` 确定列表项中的描述内容, 将以加粗的描述内容为列表起始

使用列表时
* 列表内容可使用 `\\` 进行换行, 不允许 `\item` 后直接换行
* 在列表内容中使用列表环境即可开启嵌套列表, 嵌套列表将自动更换起始符号样式 (设置见有关资料)

例如
```latex
\begin{enumerate}
    \item Lorem\\
    Lorem ipsum dolor sit amet consectetur
    \item ipsum\\
    Lorem ipsum dolor sit amet consectetur
    \item dolor
    \begin{enumerate}
        \item Lorem ipsum dolor sit amet consectetur
        \item Lorem ipsum dolor sit amet consectetur
    \end{enumerate}
\end{enumerate}
```

#### 援引与摘要  
援引环境一般用于放置引用其他文献的内容, 相对一般文章, 援引环境左右边距更大

* 援引环境 `quote`  
此环境中段首不会缩进
* 援引环境 `quotation`  
此环境中分段的段首将自动缩进
* 摘要环境 `abstract`  
与 `quotation` 类似, 但摘要环境仅用于 article 与 report, 可重定义 `\abstractname` 设置摘要标题

#### 定理, 推论与证明
定理环境的本质即一个以加粗的 定理标题 + 定理计数 开头的段落  
一般用于数学论文中

在使用定理与推论前, 需要在导言区中设置
* 设置定理显示方式 `\newtheorem<*>{theorem}{<title>}[<level>]`
    * `*` 使用带 `*` 的版本时, 将不会尽行计数
    * `title` 即定理显示的标题, 用于在定理环境中显示, 例如设置为 `定理`
    * `level` 定理计数基于的标题等级, 一般对于 article 设置为 `section`, report 与 book 设置为 `chapter`
* 设置推论显示方式 `\newtheorem{corollary}{<title>}[<level>]`  
推论的参数与定理类似, 但一般设置 `level` 为 `theorem`, 即推论的计数基于定理
* 其他类似的环境可通过命令使用 `\newtheorem{环境名}{<title>}[<level>]` 设置, 如定义 `definition`, 习题, 例子等
* 对于更多样式设置, 可参见宏包 amsthm

之后使用 `\begin{theorem}[定理名] ... \end{theorem}` 具体写入定理的内容  
对于推论等类似, 仅需要修改为对应的环境名即可

并且定理可通过 `\autoref` 索引定理内的标签实现超链接

### 页面设置
#### 纸张设置
使用宏包 geometry 设置页面纸张, 以宏包参数的方式传入纸张设置, 主要的设置参数有
* 纸张尺寸 paper, 常用参数为 `[a0–a6, b0–b6, c0–c6]paper`
* 纸张方向 `portrait` 表示横向, `landscape` 表示纵向 (默认)
* 文本区占据纸张的比例 `scale`, 默认为 0.7, 无特殊要求的情况下使用此参数即可
* 水平边距 `hmargin/hscale` 与竖直边距 `vmargin/vscale`, 其中 `xmargin` 是具体边距长度, `xscale` 是文本区占比
* 左右边距比例 `hmarginratio` 与竖直边距比例 `vmarginratio`, 一般单页左右边距为 1:1, 双页为 2:3

#### 页眉和页脚
一般情况下可使用命令 `\pagestyle{页眉与页脚样式}` 设置页眉与页脚的样式, 常用有
* `empty` 无页眉与页脚
* `plain` 无页眉, 页脚包含居中的页码
* `headings` 无页眉, 页脚包含章数及名称与页码

也可使用宏包 fancyhdr 进一步设置页眉和页脚  
使用此宏包时, 需要先定义样式为 `fancy`, 然后使用命令 `\fancyhead/foot[位置]{信息}` 具体设置
* `head/foot` 分别表示页眉与页脚
* 位置可设置为左侧 L, 中间 C, 右侧 R, 可以传入多个位置 (以逗号分隔); 位置还可与单数页 E, 双数页 O 组合
* 除了[大纲信息宏](#大纲信息宏), 还可使用 `\leftmark` (article 中为当前页的节信息, report 与 book 中为当前页的章信息) 与 `\rightmark` (article 中为空, report 与 book 中为当前页的节信息) 
    * 章信息的样式通过 `\renewcommand{\chaptermark}[1]{\markboth{样式设置 #1}{}}` 修改, 其中 `#1` 表示章标题
    * 节信息的样式通过 `\renewcommand{\sectionmark}[1]{\markright{样式设置 #1}}` 修改, 其中 `#1` 表示节标题
    * 例如 `\renewcommand{\chaptermark}[1]{\markboth{第 \thechapter 章\ #1}{}}`
* 由于 `fancy` 样式也已经定义, 即在页眉显示章与节的信息, 页脚显示页数, 可先使用 `\fancyhead/root{}` 清除原有设置
* 此外还可使用 `\renewcommand{\headrulewidth}{宽度}` 定义页眉线宽, 默认为 0.6pt (页脚则为 `footrulewidth`)

设置内容时, 可使用[大纲信息宏](#大纲信息宏)表示当前标题信息  
还可使用命令设置字体与颜色等  

### 其他常用操作
#### 文档拆分
使用命令 `\input{xxx.tex}` 或 `\include{xxx}` 可拆分文档, 将文档的不同部分拆分为多个文件  
两个命令的区别如下
* `\include` 命令不需要文件后缀 `.tex`
* `\include` 命令在导入文档前, 还将使用 `\clearpage` 强制开启新的一页, 并防止浮动体进入

通常将文档的各章 (一级标题) 分为多个文档, 并使用 `\include` 命令导入  

导入文章时, 尽量使用相对路径, 且下层文档在主文档所在目录下或子目录下

#### 自定义宏
通过自定义宏, 可将复杂的文档内容使用一个命令表示  
或通过修改来自宏包的命令以配置参数  
定义宏的命令为  
`\newcommand{命令名}{命令内容}`
* 命令名: 即被定义的命令, 需要以 `\` 开头
* 命令内容: 即命令所表示的内容

例如嵌套表格等, 可先将内部表格定义为一个命令, 然后以命令代替表格, 使层次更清晰  
也可将复杂的样式设置以一个命令表示

修改宏的命令为 `\rewcommand{已有命令名}{新的命令内容}`

#### 自定义命令
`\newcommand` 也可用于自定义命令, 但不够灵活, 以下使用其他方式定义  
自定义命令时需要宏包 xparse

使用 `\NewDocumentCommand\<name>{<arg spec>}{<definition>}` 自定义命令
* `name` 命令名称
* `arg spec` 命令属性, 为一个字符串, 其中第 i 字母表示第 i 个参数的属性, 常用有
    * `m` 必选参数, 输入时参数以 `{}` 包裹
    * `o` 可选参数, 输入时参数以 `[]` 包裹, 默认值为 `-NoValue-`, 使用 `\IfNoValueTF{#1}{真}{假}` 判断
    * `O{default}` 默认值为 `default` 的可选参数, 输入时参数以 `[]` 包裹
    * `s` 表示 `*` 号, 输入时为单个 `*`, 存在时值为 `\BooleanTrue`, 使用 `\IfBooleanTF{#1}{真}{假}`
* `definition` 命令内容
    * 使用 `#x` 表示第 x 个参数, 从 1 开始计
    * 建议将 `%` 作为放在各行末尾, 防止多余的空格与换行干扰

例如自定义的高亮字体命令  
`\NewDocumentCommand{\texthl}{m}{\colorbox{yellow}{#1}}`

#### 自定义环境
同样需要宏包 xparse

使用 `\NewDocumentEnvironment{<name>}{<arg spec>}{<before>}{<after>}` 自定义环境  
* `before` 环境内容开始前命令
* `after` 环境内容结束后命令
* 其余参数与[自定义命令](#自定义命令)相同

#### 流程控制
按字符串选择 (需要宏包 xstring) `\IfStrEqCase{判断变量}{{字符串1}{内容} {字符串2}{内容} ...}`  

例如建议半角标点转换命令
```latex
\NewDocumentCommand{\q}{m}{%
    \IfStrEqCase{#1}{%
        {,}{%
            ，%
        }%
        {.}{%
            。%
        }%
    }
}
```

#### 自定义宏包
自定义宏包实质为一个 `.sty` 文件, 可将一些常用命令以及导言区的设置编写为自定义命令或宏, 放置到自定义宏包中  

自定义宏包需要以命令 `\ProvidesPackage{<package name>}` 作为开头, 其中 `package name` 即宏包名  
并在调用其他宏包时使用命令 `\RequirePackage[⟨options⟩]{⟨package name⟩}`, 参数与 `\usepackage` 相同

## 数学环境
使用数学环境时, 推荐默认引用宏包 `amsmath` 以提供更多的数学公式排版与符号  
以下内容均默认引用宏包 `amsmath` 

### 数学公式排版
#### 行内公式与块级公式
* 一般使用 `$...$` 即可启用行内公式, 此外也可使用 `\(...\)` 或 `\begin{math}...\end{math}`
* 一般使用 `\[...\]` 启用块级公式, 此外也可使用 `\begin{displaymath}...\end{displaymath}`, 不推荐使用 `$$...$$`
* 此外以下的排版环境除非说明是嵌套环境, 否则都将直接进入数学环境

#### 单个公式
使用环境 `equation` 可以定义单个带编号的公式 (公式编号基于一级标题的编号)  
使用环境 `equation*` 则为不带编号的版本, 此环境与直接使用 `\[...\]` 基本相同

#### 多行公式
数学环境内嵌套环境 `aligned`, 可以定义多行公式, 且可以使用多个 `&` 对齐, 但将视为一个整体, 仅对整个公式进行一次编号  
在 `equation` 环境内嵌套环境 `split`, 可以定义多行公式, 但仅能使用一个 `&` 对齐

#### 多行对齐公式
使用环境 `align` 可以定义每行均带编号的多行公式, 且可使用多个 `&` 对齐  
并且每行后都可使用 `\label` 设置标签, 使用命令 `\notag` 取消编号

环境 `align*` 为不编号的版本, 但可在行末使用命令 `\tag{...}` 编号

#### 条件判断
在任意数学环境内使用环境 `cases` 可以定义无编号的左大括号包含内容  
同样有有编号版本 `numbercases`

#### 高级排版
在任意数学环境内使用环境 `array` 可以进行高级排版  
其基本格式如下
```latex
\[
    \left. % 两侧括号
    \begin{array}{列设置}
        ... % 内容
    \end{array}
    \right.
\]
```
* 内容与列设置
    * 使用与[基础表格](#基础表格)基本类似
    * 能够使用 `r,c,l` 设置列对齐以及 `|,||` 绘制竖线
    * 内容中可使用 `\hline` 绘制横线, 重复两次绘制双横线
* 两侧括号
    * 基本格式为 `\left` 或 `\right` + 括号符号, 如 `[]`, `\{\}`, `||`, 两侧符号不一定相同 
    * 双竖线使用 `\Vert`
    * 每有括号时不需要 `\left` 与 `\right`, 或 `.` 表示每有符号

因此可使用该环境绘制数学环境下的表格, 带竖线与横线的矩阵, 规则排版等

### 数学符号
基本数学符号, 修饰, 字体等与[katex](./katex_equation.md)中相同  
此处仅进行补充

#### 已知不支持的符号
* `\bm` 需要宏包 bm 
* `\xrightleftharpoons` 与 `xlongequal` (需要宏包 chemarr)
* `\textcircled{\scriptsize{E}}` 无法在数学环境中使用
* `\phase` (需要宏包 steinmetz)
* `\degree` (使用 `^\circ` 代替)
