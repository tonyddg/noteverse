# 简单 GUI 开发 tkinder 笔记

> 主要参考教程 <https://blog.csdn.net/qq_48979387/article/details/125706562>

## 基本使用
### 使用模块
使用 Python 下的 tkinter 模块完成简单的 GUI 开发  
该模块通常为 Python 的自带模块, 因此不需要额外安装

习惯上使用 `import tkinter as tk` 的方式导入模块  
使用时通过属性 `tk.TkVersion` 检查版本是否为 `8.5` 以上

### 根窗口对象
#### 创建根窗口对象
tkinter 的基础为根窗口对象, 通过在根窗口中布局组件, 完成 GUI  
最好同时只创建一个根窗口

以下为创建根窗口对象的基本方法
```python
import tkinter as tk

# 创建根窗口对象
root = tk.Tk()
# 进入根窗口主循环, 接管程序用于显示窗口, 直到退出
root.mainloop()
```

#### 根窗口对象设置
通过根窗口对象的成员函数以设置根窗口对象的属性  
以下为常用的设置

* `root.title(string: None | str)` 设置与获取当前窗口的标题
    * 当没有给出参数时, 仅返回当前窗口的标题
* `root.geometry(newGeometry: None | str)` 设置与获取当前窗口的默认大小
    * 单位为像素, 设置的基本格式为 `<宽度>x<高度>` (注意格式中间为字符 `x`)
    * 给出空字符串时, 将采用自适应大小
    * 当没有给出参数时, 仅返回当前窗口的大小
* `root.resizeable(width: None | bool, height: None | bool)` 设置窗口的宽度与高度是否可变
    * 设置为 `False` 时, 该方向的长度不可变
    * 默认情况下窗口的长度与宽度均可变
* `root.minsize(width, height) / maxsize(width, height)` 设置窗口的最小大小与最大大小
* `root.state(newstate : None | str)` 获取与设置窗口的状态, 可用的有
    * `normal` 正常
    * `iconic` 最小化
    * `withdrawn` 隐藏 (不会显示, 需要通过该方法修改状态复原)
    * `zoomed` 最大化
* `root.iconbitmap(bitmap : str)` 设置窗口图标  
    * 以图标文件 `.ico` 的路径为参数
* `root.destroy()` 销毁窗口
* `root.mainloop()` 窗口主循环

### 组件对象
将放置在根窗口上的物件称为组件  
对于大部分的组件, 通常有以下通用的对象  
注意, 根窗口也可视为一个特殊的组件, 因此以下配置在根窗口对象上也适用

#### 基本属性
组件有以下常用的通用基本属性

* `master` 组件的父容器对象
    * 一般即[根窗口对象](#根窗口对象)
    * 也可以是其他[容器组件](#容器组件)
* `name` 组件的内部名称
* `relief` 组件边框样式
* `font` 组件文字样式 (用于含文字的组件)
* `cursor` 光标样式 (当鼠标到组件上时光标修改)
* `fg / foreground` 组件文字颜色 (用于含文字的组件)
* `bg / background` 组件背景颜色
* `state` 组件状态, 基本状态有 `tk.NORMAL` (普通), `tk.DISABLE` (禁用), 对于其他组件还有一些特殊状态
* `width` 组件宽度, 单位像素  
    * 对于含子组件的[容器](#容器组件)仅在设置 `widget.propagate(False)` 后生效
    * 对于部分文本组件如[输入组件](#输入组件)与[列表框组件](#列表框组件), 单位是文本的宽度
* `height` 组件高度, 单位像素  
    * 对于含子组件的[容器](#容器组件)仅在设置 `widget.propagate(False)` 后生效
    * 对于部分文本组件如[输入组件](#输入组件), [文本组件](#文本组件)与[列表框组件](#列表框组件), 单位是文本的行数

组件基本属性确定后, 即可使用组件的属性初始化组件对象  
一般的初始化方法有  
* 通过配置字典初始化  
`widget = tk.XXWidget(master, cnf = {"name" : "Example" ...})`
* 通过参数初始化  
`widget = tk.XXWidget(master, name = "Example", ...)`
* 两种方法也可以混合使用, 推荐使用 `cnf` 表示通用的属性, 使用具体参数表示具体属性

#### 组件样式
使用组件属性 `relief` 设置外边框  
常用的组件外边框样式有
* `tk.FLAT` 无边框, 默认
* `tk.SOLID` 有边框, 可通过组件的 `bd` 属性修改边框宽度
* `tk.GROOVE` 沟槽, 可表示容器边框
* `tk.RAISED` 凸出, 可表示可点击的组件
* `tk.SUNKEN` 凹陷, 可表示点下的组件

使用组件属性 `font` 设置文字样式  
文字样式通常使用一个三元组定义 `font = ("<字体名>", <字号>[, "<字体样式1>"[, "<字体样式2>", ...]])`  
例如 `("黑体", 20, "bold")`, 其中
* 如果希望使用默认字体, 则传入空字符串即可
* 默认的字体大小为 10  
* 常用的文字样式有
    * `bold` 加粗
    * `italic` 斜体
    * `underline` 下划线
    * `overstrike` 删除线

使用组件属性 `fg` 设置文字颜色  
属性值为字符串, 可以是 `#<rrggbb>`, 或常用的颜色单词, 可参考 <https://blog.csdn.net/qq_48979387/article/details/126447139>

使用组件属性 `cursor` 设置当鼠标到组件上时光标的样式  
使用字符串表示, 常用的有
* `arrow` 正常
* `xterm` 可输入
* `hand2` 可点击
* `watch` 等待

#### 组件方法
通过组件的方法可以控制组件  
常用的方法有
* `widget.cget(key : str)` 获取组件名为 `key` 的属性
* `widget.configure(**kwargs)` 设置组件属性
* `widget.destroy()` 销毁组件
* `widget.focus_set()` 使组件获取用户焦点
* `widget.focus_get()` 判断组件是否获得用户的焦点

事件与任务
* `widget.bind() / unbind()` 绑定 / 解绑事件 (具体见[事件绑定](#事件绑定))
* `id = widget.after(time, callback, *args)` 等待 `time` 后执行回调函数
    * `time` 等待时间, 单位为 ms
    * `callback` 回调函数
    * `*args` 交给回调函数的参数
    * 返回值 `id` 为设置标识符, 通过 `widget.after_cancel(id)` 取消任务

对于组件在现实时的状态, 需要通过以下方法读取
* `widget.winfo_width() / winfo_height()` 获取组件当前宽度 (高度), 需要先布局组件
* `widget.winfo_viewable()` 当组件在布局中时, 返回 `True`

#### 组件布局
组件布局的本质为一类特殊的组件对象方法  
==只有调用了布局方法, 组件才会显示在容器上==  
以下介绍常用的布局方法

* 简单布局 用于简单的布局, 通常可配合[容器组件](#容器组件)使用
`widget.pack(side = tk.TOP, anchor = tk.CENTER, expand = False, fill = tk.NONE, padx = 0, pady = 0)` 
    * `side` 组件排列对齐方向, 多个同方向的组件将按顺序向反方向排列, 可用参数有
        * `tk.TOP` 向容器上边对齐
        * `tk.BOTTOM` 向容器下边对齐
        * `tk.LEFT` 向容器左边对齐
        * `tk.RIGHT` 向容器右边对齐
    * `anchor` 组件锚点, 即有多余空间时, 向空间的那个方向对齐, 可用参数有
        * 由 `N, S, W, E` 单个或两两组合而来的八个方向
        * `tk.CENTER` 向可用空间居中对齐
    * `expand` 启用时组件将==使可用空间 (不是组件大小) 尽量大==且自适应窗口变化, 当启用时, 布局将根据窗口大小变化实时调整
    * `fill` 组件填充方式, 决定组件是否要占据整个可用空间, 可用参数有
        * `tk.X` 仅组件的 x 方向填充整个可用空间
        * `tk.Y` 仅组件的 y 方向填充整个可用空间
        * `tk.BOTH` 组件的 x, y 方向填充整个可用空间
        * `tk.NONE` 组件仅占据必要的空间
    * `padx, pady` 组件与最大可用空间边界之间的边距  
        * 使用单个数字时, 左右 (上下) 两侧使用相同的边距
        * 使用两个数字的元组时, 分别表示左右 (上下) 两侧边距
        * 建议所有组件之间都有 `padx=5, pady=5` 的边距, 可通过定义 `commandPad={"padx" : ...}` 作为所有布局的 `cnf` 参数
    * 除了上述方法, 也可使用 `widget.pack(cnf = {...}, **kwargs)` 的方法配置组件间的通用的属性, 便于统一布局
    * 使用 `widget.pack_configure()` 可重新设置组件布局
* 网格布局 用于精确的布局
`widget.grid(row : int, column : int, rowspan : int, columnspan : int, sticky = tk.CENTER, padx = 0, pady = 0)` 
    * `row, column` 组件左上角所在的网格位置 (从 `0` 开始计)
    * `rowspan, columnspan` 组件的跨行, 跨列数
    * `sticky` 网格内组件撑大至与网格的特定边缘相连
        * 由模块 `tk` 下, 由 `N, S, W, E` 的任意组合, 表示需要相连的边缘
        * ==`tk.NSEW` 可使网格中的组件撑满整个网格== (注意不是 `tk.CENTER`)
    * `padx, pady` 与 `widget.pack` 中的 `padx, pady` 类似
    * 类似的可使用 `widget.grid(cnf = {...}, **kwargs)` 的方法配置, 可以使用 `widget.grid_configure()` 可重新设置组件布局
    * 默认情况下, 网格各行与列的宽度将根据其中的组件大小确定  
    如果希望确定网格各行 (列) 之间宽度的比例, 则需要对==网格布局中的父容器==通过以下成员进行设置  
    `frame.grid_columnconfigure(index : int | List | Tuple, weight, minisize)` (设置行的 `grid_rowconfigure` 同理)
        * `index` 被设置列的索引, 从 0 开始, 可以传入列表或元组以设置多个列
        * `weight` 宽度大小, 实际为比例值, 将根据这一比例撑满父容器  
        只有启用此设置后网格才将撑满整个父容器, 并且即使只有一列, 要撑满父容器也要启用此设置
        * `minisize` 最小宽度, 单位为像素
* 定位布局 较少使用, 不介绍  
`widget.place()`
* 组件的隐藏与显示
    * 对于 `pack` 与 `place` 布局
        * 调用 `widget.forget()` 将组件从布局中隐藏 (移除)
        * 调用 `widget.pack() / palce()` 即可恢复
    * 对于 `grid` 布局
        * 调用 `widget.grid_remove()` 将组件从布局中隐藏, 且不改变布局的网格结构
        * 调用 `widget.forget()` 将同时改变布局的网格结构
        * 调用 `widget.grid()` 可恢复 (使用 `widget.grid_remove()` 隐藏)

## 常用组件
### 标签组件
标签组件类 `tk.Label` 可用于放置最简单的图片以及文字信息  

#### 文字内容设置
文字内容
* 通常文字内容  
设置 `text` 属性即可设置组件的显示文本  
* 可变文字内容  
设置 `textvariable` 属性可将显示文本与 tkinter 的[变量对象](#变量对象)绑定  
文字内容将随变量对象的改变而刷新

文字显示
* 文字字体  
见[组件样式](#组件样式)
* 多行文字对齐 (文本内使用 `\n` 可换行)  
设置 `justify` 属性可修改文本的对齐方式
    * `tk.CENTER` 居中对齐 (默认方式)
    * `tk.LEFT` 向容器左边对齐
    * `tk.RIGHT` 向容器右边对齐

#### 图片内容设置
##### 内置图片  
设置 `image` 属性可引入内置的图片  
内置图片名使用字符串表示, 常用的有
* `::tk::icons::error` 错误
* `::tk::icons::information` 信息
* `::tk::icons::question` 问题
* `::tk::icons::warning` 警告

##### 自定义图片  
同样使用 `image` 属性引入图片  
对于自定义图片则应使用图片对象, 以及第三方工具  
以下为一个借助 pillow 模块显示图片的方法  
```python
from PIL import Image, ImageTk
import tkinter as tk

# 注意, 图片对象应定义为全局变量或全局类的成员
# 防止被 Python 的垃圾回收机制销毁
image = ImageTk.PhotoImage(Image.open("monster.png"))
lbPic = tk.Label(root, image=image, text="It's a monster.", compound="top")
```

##### 图文混合显示  
如果要同时显示图片和文字, 除了均进行设置外  
还需要设置属性 `compound` 以确定文字相对图片的位置 (如果没有设置, 将无法显示文字)  
可用的设置有
* `tk.TOP` 文字在图片上方
* `tk.BOTTOM` 文字在图片下方
* `tk.LEFT` 文字在图片左侧
* `tk.RIGHT` 文字在图片右侧
* `tk.NONE` 不显示文字

### 按钮组件
按钮组件类 `tk.Button` 可用于简单交互  

#### 内容设置
按钮的内容与[标签组件](#标签组件)完全一致  
可通过与标签组件相同的属性设置按钮

#### 简单交互
使用按钮属性 `command` 与回调函数绑定  
当按钮被==按下后松开时==, 将调用绑定的回调函数

* 通过[基本属性](#基本属性) `state` 即可禁用按钮
* 通过调用按钮组件的成员函数 `button.invoke()` , 当按钮未被禁用时将调用其回调函数 (类似点击按钮)

#### 长按触发
除了通过点击的方式触发按钮, 还可使用长按的方式触发按钮  
此时需要设置以下属性
* `repeatdelay` 长按触发的等待时间, 单位为 ms
* `repeatinterval` 长按触发时, 执行回调函数的间隔, 单位为 ms

### 容器组件
容器组件为一类用于容纳其他组件的组件, 通过容器组件可以让排版更加简单

#### 简单容器
简单容器组件类 `tk.Frame`  
该组件仅有除 `font` 外的[基本属性](#基本属性), 并且没有任何修饰 (可通过 `relief` 属性添加边框)  
但可以作为其他组件的父容器  

容器还具有以下特点
* 当容器从布局上移除时, 其中的组件也将一并移除
* 使用容器的成员函数 `frame.winfo_children()`, 可迭代遍历容器中的组件

#### 标签容器
除了简单容器, 还有标签容器组件类 `tk.LabelFrame`  
该组件除了与简单容器相同外, 还具有边框与一个位于边框上的标签

* 与标签组件不同, 标签容器的标签仅能通过 `text` 与 `font` 属性设置标签的内容与字体
* 如果要显示其他内容, 则需要设置 `labelwidget`, 该属性接收一个未布局的, 与标签容器位于同一父容器的任意组件, 该组件将代替原来的标签
* 通过 `labelanchor` 属性设置标签的位置, 可选参数有由模块 `tk` 下, 由 `N, S, W, E` 单个或两两组合而来的八个方向

#### 可调容器
此外还有可调容器组件 `tk.PanedWindow`  
该容器内的组件将不使用一般的排版方法, 而是沿特定方向排列, 并且可沿排列方向手动拖动组件边界以改变组件宽度

对于可调容器内的组件布局时, 不使用一般的[组件布局](#组件布局)  
而需要通过其成员函数 `panedwindow.add(widget[, minsize, width, height, padx, pady, sticky])` 布局
* `widget` 进入布局的组件, 按从上到下, 从左到右排列
* `minsize` 组件在可调节方向上的最小大小
* `width, height` 组件的初始大小
* `padx, pady` 组件间的边距, 与[其他布局](#组件布局)的同名参数相同
* `sticky` 与 [grid 布局](#组件布局)的同名参数相同

#### 容器使用技巧
容器的默认大小为 0, 因此直接使用容器时, 将无法看到容器组件  
容器默认将根据其中的组件自动变化大小  
为了应对以上问题有以下可用的技巧

* 在 [pack 布局](#组件布局)中 (可参考例子[简单用户验证界面](#简单用户验证界面))  
    * 存在确定大小的容器时, 使用[基本属性](#基本属性) `width` 与 `height` 确定容器大小, 并调用方法 `frame.propagate(False)` 固定容器大小
    * 不存在时, 可定义一个 `width` 为确定值, `height = 0` 的空容器撑大空间 (反过来相同)
    * 剩余容器合理使用 `fill` 属性撑满剩余空间
* 在 [grid 布局](#组件布局)中 (可参考例子[基于网格的交互界面](#基于网格的交互界面))  
设置父容器的行列比例 `weight` (即使仅有一行或一列), 并设置 `sticky = tk.NSEW` 使容器撑满网格

### 输入组件
输入组件类 `tk.Enter` 即一个单行的输入栏  
该组件可用于接收输入的字符串数据

* 属性 `font` 可设置输入栏内文字的样式
* 属性 `show` 可设置替代输入内容显示的字符 (常用于密码输入)

#### 只读状态
输入组件的基本属性 `state` 除了两个基础的状态, 还有只读状态 `readonly`  
在三个状态的表现为

* `tk.NORMAL` 正常输入内容
* `tk.DISABLE` 无法输入内容, 且无法复制
* `"readonly"` 无法输入内容, 但可以复制其中的内容

#### 获取输入
使用成员函数 `enter.get()` 可获取当前输入组件内的内容  
通过成员 `enter.delete(0, "end")` 可清空输入

除此之外, 也可以设置属性 `textvariable` 将内容与 tkinter 的[变量对象](#变量对象)绑定  
此时, 通过设置 `val.set("")` 即可清空输入

#### 输入验证
* 使用 `validate` 属性表示进行验证的时机, 常用参数有
    * `none` 不进行验证
    * `focus` 获得或失去焦点时验证
    * `focusout` 失去焦点时验证
    * `focusin` 获得焦点时验证
    * `force` 绑定变量被修改
    * `key` 内容更改时验证, 且不满足验证条件的修改不会插入文本框
    * `all` 以上任意情况
* 使用 `validatecommand` 属性绑定验证函数
    * 可以直接传入验证函数
    * 也可以传入一个 `(callback, str1, str2, ...)` 的元组, 表示额外传入验证函数的参数  
    注意, 其中的 callback 需要使用 `root.register(...)` 包裹, 其中 `root` 可以是任意组件, 一般是父容器  
    其中 `str` 为字符串, 常用有
        * `%P` 文本框当前内容
        * `%s` 文本框上一次内容
        * `%V` 触发验证的原因 (值即 `validate` 的参数)  
* 使用 `invalidcommand` 属性绑定验证失败时的回调函数 (该函数应返回布尔值, 但含义未知)

#### 数值输入组件
数值输入组件类 `tk.Spinbox` 具有与一般输入组件相同的属性  
此外还在右侧有上下调节按钮 (注意, 即使是 [readonly 状态](#只读状态), 依然可通过此方法被调节)

相比一般输入组件, 还具有以下属性
* `from_` 箭头调节的最小数值
* `to` 箭头调节的最大数值
* `format` 调节数值的显示合适, 使用 `%a.bf` 格式化
* `increment` 箭头调节步长

### 选择组件
#### 多选框组件
多选框组件类 `Checkbutton` 可表示独立的, 可取消勾选的选项

常用的属性有
* `variable` 与多选框选择状态绑定的[变量对象](#变量对象)  
    * 一般为 `tk.BooleanVar` 类型, 默认选中时为 `True`, 未选中时为 `False`
    * 可通过[变量追踪](#变量追踪)的方式, 以 `write` 模式检测选项是否被修改
* `indicatoron` 多选框样式
    * `True` 通常的勾选框样式 (默认)
    * `False` 按钮盒样式
* `text, font` 多选框文字及字体

可通过组件的成员函数控制组件状态
* `checkbutton.select()` 选中多选框
* `checkbutton.deselect()` 取消选中多选框
* `checkbutton.toogle()` 切换选中状态

#### 单选框组件
单选框组件类 `Radiobutton` 可表示相互制约的选项

常用属性有
* `value` 单选框被选中时, 变量对象设置的值  
* `variable` 与单选框选择状态绑定的[变量对象](#变量对象)  
    * 当多个单选框绑定同一个变量对象时, 将相互制约, 只能选择其中一个
    * 注意 `variable` 绑定变量的初值必须是其中一个单选框的值, 否则将显示异常
    * 可通过[变量追踪](#变量追踪)的方式, 以 `write` 模式检测选项是否被修改
* `text, font` 单选框文字及字体

### 菜单组件
菜单组件类 `Menu` 可用于定义菜单  
与一般组件不同, 菜单组件不需要布局, 且一般以根窗口对象为父容器  

菜单组件的选项 `tearoff` 为是否允许菜单分离为独立窗口, 默认开启  
由于存在问题, 因此一般建议设置为 `False` 禁用

#### 菜单内容 
通过以下菜单对象的成员函数添加菜单内容  
将按添加顺序排列

* `menu.add_command(label, command[, accelerator, underline, state])` 添加菜单项
    * `label` 菜单项名称
    * `command` 选择菜单项后触发的回调函数
    * `accelerator` 菜单项说明, 一般用于说明快捷键 (并不会真正添加, 还需要通过[事件绑定](#事件绑定)实现)
    * `underline` 布尔型选型, 默认关闭, 使菜单可通过 <kbd>Alt</kbd> + 菜单名的首字母快速选择
    * `state` 菜单项的状态, 设置为 `tk.DISABLED` 即可禁用菜单项
* `menu.add_cascade(label, menu[, accelerator, underline, state])` 添加分层菜单项  
    * `menu` 分层菜单下的子菜单组件
    * 其他同名参数与 `menu.add_command()` 含义相同
* `menu.add_separator()` 添加划分线

使用 `menu.entryconfig(index, **kwargs)` 可设置菜单项的属性
* `index` 菜单项的索引, 即添加顺序, 也可使用字符串 `end` 表示最后添加的菜单项
* `**kwargs` 菜单项的属性, 与添加菜单项时相同

#### 插入菜单
* 窗口菜单, 即窗口下的菜单栏  
通过设置根窗口对象的属性 `menu` 为指定的菜单对象添加  
例如 `root.config(menu = ...)`
* 右键菜单  
通过菜单组件成员函数 `menu.post(x, y)` 在指定位置显示菜单 (`x, y` 为相对屏幕的位置)  
通过与[右键事件绑定](#事件绑定)实现右键菜单的效果  
例如 `root.bind("<Button-3>", lambda event: menu.post(event.x_root, event.y_root))`

#### 弹出菜单
弹出组件类 `Menubutton` 可定义一个弹出菜单按钮

该组件主要有以下参数
* `text` 菜单按钮文字
* `menu` 绑定弹出的菜单组件
* `direction` 菜单弹出方向, 可用参数有
    * `below` 向下弹出 (默认)
    * `right` 向右弹出
    * `above` 向上弹出
 
### 列表框组件
列表框组件类 `Listbox`  

#### 列表框属性
* `width` 列表项的单行文字长度 (与一般组件属性不同)
* `height` 列表项高度, 单位为列表项的高度 (与一般组件属性不同)
* `selectmode` 选择模式, 使用字符串表示
    * `tk.BROWSE` 单选模式, 一次只能选中一个列表项, 默认模式
    * `tk.EXTENDED` 多选模式, 需要结合 <kbd>Shift</kbd> 进行多选
    * `tk.MULTIPLE` 多选模式, 不需要而外按键

#### 列表修改与信息获取
* `listbox.insert(index, element)` 添加列表项
    * `index` 添加位置的索引, 使用 `tk.END` 表示末尾
    * `element` 列表内容
* `listbox.delete(first, last)` 删除列表项
    * `first` 开始删除位置的索引
    * `last` 停止删除位置的索引, 取 `None` 表示仅删除 `first` 索引的列表项
* `listbox.get(first)` 获取指定索引位置列表项的内容
* `listbox.size()` 获取列表框中的列表项总数
* `listbox.curselection()` 获取被选中的列表项
    * 有任意选项被选中时返回一个由选中列表项组索引成的元组 (即使只有一个选中也返回元组)
    * 没有选项选中时, 返回 `None` (因此最好先判断是否有选中的选项)

#### 列表框交互事件
列表交互事件为一个特殊的[虚拟事件](#虚拟事件) `<<ListboxSelect>>`  
通过与列表对象绑定该事件, 可在列表选项被选择时触发

#### 绑定侧边滚动条
绑定滚动条前首先要定义滚动条组件 `tk.Scrollbar(master, orient)`
* `master` 滚动条的父容器, 一般与要绑定的组件使用同一父容器
* `orient` 滚动条方向, 参数有水平 `tk.HORIZONTAL` 与垂直 `tk.VERTICAL` (默认)

只有继承自 `XView` 或 `YView` 的组件即支持滚动条, 如列表框 `Listbox`
* 使用绑定组件的 `y/xscrollcommand` 属性与滚动条的成员函数 `set` 绑定  
然后使用滚动条的 `command` 属性与组件的成员函数 `yview` 绑定  
例如 
    * `listbox.configure(yscrollcommand = scrollbar.set)`
    * `scrollbar.configure(command = listbox.yview)`
* 滚动条也需要[布局](#组件布局), 通常使用一个容器包裹滚动条与绑定的组件, 并使用 `pack` 的 `fill` 属性布局

### 滑动条组件
滑动条组件类 `Scale`  

#### 滑动条样式与范围
通过以下属性可设置滑动条的样式
* `orient` 滑动条方向, 参数有水平 `tk.HORIZONTAL` 与垂直 `tk.VERTICAL` (默认)
* `label` 在滑动条边上显示文字标签
* `showvalue` 是否显示当前数值, 更推荐通过追踪滑条变量的方式修改标签实现这一功能, 例如  
`v.trace_add("write", lambda *args : sc.configure(label = "value: {}".format(v.get())))`
* `tickinterval` 显示刻度, 参数值为刻度的间隔

设置滑条值
* `from_` 滑动条的最小值
* `to` 滑动条的最大值
* `resolution` 滑动条的最小步长
* `variable` 将滑条值与[变量对象绑定](#变量对象) (一般为 `tk.DoubleVar` 类型)

#### 滑动条交互
* 通过滑动条的 `command` 属性可为滑动条绑定一个回调函数, 当滑条值改变时将调用该回调函数  
回调函数接收一个参数为当前滑条值
* 也可直接[追踪](#变量追踪)滑动条的绑定变量  

### 文本组件
文本组件类 `Text` 可用于输入多段文本, 也可用于展示文本  
除了文本, 还可以插入图片, 可交互的标签等内容

#### 文本组件属性
* `width` 列表项的单行文字长度 (与一般组件属性不同)
* `height` 列表项高度, 单位为列表项的高度 (与一般组件属性不同)
* `padx, pady` 文本内容与文本框的边距
* `wrap` 换行方式, 常用的有
    * `tk.NONE` 不自动换行
    * `tk.CHAR` 按字符换行
    * `tk.WORD` 按单词换行
* `xscrollcommand, yscrollcommand` 用于与[滚动条绑定](#绑定侧边滚动条)
* `undo` 允许用户通过 <kbd>Ctrl</kbd> + <kbd>Z</kbd> 完成撤销, 默认为 `False`
* `state` 文本组件只有 `tk.NORMAL` 与 `tk.DISABLE` 没有只读模式, 但可通过

#### 文本内容读取与编辑
文本组件的文本内容的保存方式为按行与列数 (行索引) 的方式保存  
索引文本内容时使用字符串 `<行数>.<列数>` 表示 (注意中间使用 `.` 分隔)   
其中行数索引从 1 开始, 列数索引从 0 开始, [图片](#插入图片)占据一个文本位置  
可使用一些特殊字符表示特殊的位置, 常用有
* `end` 结尾位置
* `insert` 光标所在位置
* `sel.first / sel.last` 被选中字符的开始与结束位置
* `<tag>.first / <tag>.last` [标签](#插入标签)的开始与结束位置

获取文本使用如下成员函数
* `text.get(index1, index2)` 即可获取两个索引之间的内容
* `text.dump(index1, index2)` 将以一个元组列表的方式, 返回两个索引之间的内容  
元组的基本形式为 `(<type>, <content>, <index>)`
    * `type` 内容类型, 使用字符串表示, 常用有
        * `text` 文本
        * `tagon / tagoff` 标签起始与结束
        * `image` 图片
    * `content` 文本内容或元素名称
    * `index` 起始位置索引
* `text.search()` 内容搜索, 此处不介绍

编辑文本使用如下成员函数
* `text.insert(index, content[, tag])` 插入内容
    * `index` 插入位置的索引
    * `content` 插入内容
    * `tag` 将插入使用一个[标签](#插入标签)修饰, 不存在时将自动创建
* `text.delete(start, end)` 删除指定位置的内容
* `text.replace(start, end, content)` 替换指定位置的内容
* `text.edit_reset()` 清空文本内容

当允许撤销时 (属性 `undo = True`)
* `text.edit_undo()` 撤销上次修改
* `text.edit_redo()` 重做上次撤销

#### 插入图片
使用文本组件的成员函数 `text.image_create(index[, align, image, padx, pady])` 插入图片
* `index` 插入位置的索引
* `align` 图片对齐方式, 常用有
    * `tk.CENTER` 居中对齐
    * `tk.BASELINE` 基线
    * `tk.BOTTOM` 底部对齐
    * `tk.TOP` 顶部对齐
* `image` 可参考[图片内容设置](#图片内容设置)
* `padx, pady` 图片边距

#### 插入标签
标签可用于修饰文本内容, 可定义特定的文本样式为标签, 并将需要修饰的文本使用标签修饰

除了 [text.index](#文本内容读取与编辑) 可插入标签  
使用 `text.tag_add(tag, start1, end1[, start2, end2, ...])` 可将指定位置的文字内容使用标签修饰  
    * `tag` 修饰[标签](#插入标签)名, 不存在时将自动创建
    * `start, end` 修饰的开始与结束位置, 可以一次设置多个

标签也可以像组件一样配置[样式](#组件样式), [绑定事件](#事件绑定), 但需要使用如下文本组件的成员函数
* `text.tag_config(tag, ...)` 设置标签 `tag` 的属性
* `text.tag_cget(tag, ...)` 获取标签 `tag` 的属性
* `text.tag_bind(tag, ...)` 为标签绑定事件

如下例子定义了一个可以点击的标签
```python
tx.insert("end", "Click!", "Hyper1")
# 使用蓝色加下划线的字体以表示超链接
tx.tag_configure("Hyper1", foreground = "blue", font = ("", 10, "underline"))
tx.tag_bind("Hyper1", "<Button-1>", lambda event: print("Click"))
# 通过设置光标进入标签时事件, 修改光标为点击状态
tx.tag_bind("Hyper1", "<Enter>", lambda event: tx.configure(cursor = "hand2"))
tx.tag_bind("Hyper1", "<Leave>", lambda event: tx.configure(cursor = "xterm"))
```

### 子窗口
子窗口类 `tk.Toplevel` 类似[根窗口](#根窗口对象), 为一个独立的窗口

初始化与设置方式与根窗口相同, 但是还需要指定父容器, 一般即根窗口  
不同的是, 子窗口不需要调用 `mainloop()` 成员函数

## 其他使用
### 事件监听
#### 事件类型
在 tkinter 中, 使用字符串表示事件类型, 基本格式为 `<[<Modifier>-]<Type>[-Detail]>` (==表示事件的字符串最外层有 `<>` 包裹==)
* `Type` 事件类型, 常用的有
    * `Button` 用户点击任意鼠标, 可通过 `Detail` 属性进一步筛选
    * `Key` 用户按下任意按键, 可通过 `Detail` 属性进一步筛选
    * `Enter` 光标进入绑定组件范围
    * `Leave` 光标离开绑定组件范围
    * `Motion` 光标在组件内移动
    * `FocusOut` 组件失去焦点
    * `FocusIn` 组件获得焦点
    * `Expose` 窗口出现
    * `Configure` 窗口大小被改变
* `Detail` 组件详情
    * 对于 `Key` 事件, 参考 <https://tcl.tk/man/tcl8.6/TkCmd/keysyms.htm>
    * 对于 `Button` 事件
        * `1` 鼠标左键
        * `2` 鼠标中键
        * `3` 鼠标右键
* `Modifier` 事件的附加条件, 常用有
    * `Alt` 同时按着 <kbd>Alt</kbd>
    * `Control` 同时按着 <kbd>Control</kbd>
    * `Shift` 同时按着 <kbd>Shift</kbd>
    * `Double` 连续被触发两次 (用于检测双击鼠标等)

#### 事件绑定
通过[根窗口](#根窗口对象)或[组件](#组件对象)的方法 `widget.bind(sequence, callback)` 可用于绑定组件  
例如 `root.bind("<Key-Escape>", lambda event: root.destroy())` 可实现按下 <kbd>ESC</kbd> 时退出窗口
* `sequence` 即[事件类型](#事件类型)字符串
* `callback` 事件触发时的回调函数, 回调函数接收一个 `event` 对象, 常用的对象成员有
    * `widget` 绑定事件的组件
    * `x` 鼠标在窗口的 x 位置
    * `y` 鼠标在窗口的 y 位置
    * `x_root` 鼠标在屏幕的 x 位置, 用于 `Button` 事件
    * `y_root` 鼠标在屏幕的 y 位置, 用于 `Button` 事件
    * `keysym` 按键名称, 用于 `Key` 事件, 具体含义参考 `Detail`
    * `num` 鼠标按键类型, 用于 `Button` 事件, 具体含义参考 `Detail`
* 使用方法 `widget.bind_all` 则可以同时绑定根窗口或容器组件下所有的子组件
* 使用方法 `widget.unbind(sequence)` 可解除对应对象的绑定

#### 虚拟事件
与一般事件不同, 虚拟事件为由用户定义与产生的事件

* 虚拟事件使用以==两层 `<>` 包裹==, 其中的名称可以任意取  
* 通过组件的 `widget.event_generate(sequence)` 可触发虚拟事件

### 变量对象
通过变量对象, 可与部分的组件属性绑定, 也可自定义用于组件间传递信息

#### 定义变量对象
变量对象为 tkinter 中的一类特殊对象  
* 这些对象的本质为变量, 也与组件的部分属性绑定  
* 获取变量值需要使用成员函数 `var.get()`
* 设置变量值需要使用成员函数 `var.set()`
* 可用的变量对象类有
    * 字符串 `tk.StringVar`
    * 整数 `tk.IntVar`
    * 浮点数 `tk.DoubleVar`
    * 布尔值 `tk.BooleanVar`
* 初始化方式为 `var = tk.XXXVar(value = ...)`, `value` 为变量初值

#### 变量追踪
通过变量对象的成员函数 `cbn = variable.trace_add(mode, callback)` 追踪变量对象的修改, 并在发生对应修改时调用回调函数
* `mode` 主要有模式
    * `read` 变量被读取
    * `write` 变量被写入 (组件写入也将触发)
    * `unset` 变量被删除
* `callback` 回调函数, 回调函数有三个参数, 分别是变量内部名, 变量内部索引, 变量追踪模式
* `cbn` 返回追踪对象, 用于删除追踪

通过成员函数 `variable.trace_remove(cbn)` 解除追踪

### 消息窗口
使用 `from tkinter import messagebox as tkm` 导入消息窗口子模块  
通过该子模块的方法可唤出消息窗口, 并返回用户选项  
对于单选项一般返回 `ok`, 双选项一般返回 `True` 与 `False`

#### 消息窗口的常用属性
以子模块方法参数的方式设置消息窗口属性  
消息窗口有以下常用属性
* `title` 窗口标题
* `message` 窗口信息
* `parent` 父窗口对象  
当消息窗口未关闭时, 将一直阻塞父窗口

#### 常用消息窗口
* `showinfo` 展示信息 (单选项)
* `showwarning` 展示警告 (单选项)
* `showerror` 展示错误 (单选项)
* `askquestion` 询问 (双选项)

### 文件查看器
使用 `from tkinter import filedialog as tkf` 导入文件查看器子模块  
通过该子模块的方法可唤出文件查看器, 并返回用户选择的文件  
对于单选项一般返回 `ok`, 双选项一般返回 `True` 与 `False`

#### 文件查看器常用属性
使用该模块内的方法时, 有以下的常用属性
* `defaultextension` 默认后缀名, 当用户未指定后缀时自动补充, 一般用于选择保存文件时使用
* `filetypes` 可选文件类型, 一个由元组 `("<文件类型描述>", "<文件后缀>")` 组成的列表, 一般用于打开文件时使用
* `parent` 查看器的父窗口, 查看器未关闭时, 将阻塞父窗口
* `title` 查看器的标题
* `multiple` 是否允许多选, 默认为 `False`
* `initialdir` 弹出查看器时, 位于哪个文件夹

#### 文件查看器常用方法
* `tkf.askopenfilename(**opts)` 获取用户需要打开的文件, 文件必须存在
* `tkf.asksaveasfilename(**opts)` 获取用户保存文件, 文件可以不存在
* `tkf.askdirectory(**opts)` 获取用户选择的文件夹, 不支持文件类型设置, 可设置属性 `mustexist` 要求文件夹必须存在

### 嵌入 Matplotlib 图像
参考 <https://matplotlib.org/stable/gallery/user_interfaces/embedding_in_tk_sgskip.html>

通过以下代码导入用于显示 Matplotlib 图像的组件
```python
# 导入绘图组件
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
# 导入导航栏组件
from matplotlib.backends._backend_tk import NavigationToolbar2Tk
# 注意, 在 tk 中嵌入 Matplotlib 图像时, 不能使用 matplotlib.pyplot
# 但可以导入 Figure 类代替, 相当于 plt.figure 方法
from matplotlib.figure import Figure
```

定义绘图组件方法为 `canvas = FigureCanvasTkAgg(figure, master)`
* `figure` 绑定来自 matplotlib 的 `Figure` 画布对象, 即需要显示的画布  
* `master` 父容器组件

使用绘图组件时, 常用的方法有
* `canvas.get_tk_widget()` 获取实际的组件对象, 为绘图组件布局时, 需要先通过该函数获取实际组件对象, 再在该对象的基础上调用[组件布局相关方法](#组件布局)  
空间被限定时画布大小将随可用空间变化, 因此一般不设置画布对象的 `figsize`, 并且在布局中使用参数 `fill=tk.BOTH`
* `canvas.draw()` 当绑定的 `Figure` 对象改变时, 需要调用该函数重新绘制  
此外, 推荐使用 `Axes` 图像对象的成员函数 `axes.cla()` 清除旧的图像, 使用 `fig.clear()` 将导致图像信息被清除

使用导航栏组件时, 可视为一般组件处理, 一般紧贴在绘图组件下方以保持与一般的绘图界面一致

## ttk 组件
通过 `from tkinter import ttk` 导入 ttk 模块  
ttk 模块提供了
* 扁平化风格的组件以代替部分旧的组件
* 更多实用组件
* 将风格管理与组件行为代码分离

### 替换组件
对于以下组件, ttk 模块提供了扁平化风格的替代组件, 替代组件有着与原组件相同的组件类名, 但来自 ttk 模块
* [标签组件](#标签组件) `ttk.Label`
    * 不再支持 `bitmap` 属性
* [按钮组件](#按钮组件) `ttk.Button`
* [输入组件](#输入组件) `ttk.Entry`, `ttk.Spinbox`
* [容器组件](#容器组件) `ttk.Frame`, `ttk.LabelFrame`, `ttk.PanedWindow`
    * 提供属性 `padding`, 可用于设置内容与容器边界的间隙, 值为一个数会一个四个数的元组
* [选择组件](#选择组件) `ttk.Checkbutton`, `ttk.Radiobutton`
    * 不再支持 `indication` 属性, 应改为 `style = ""Toolbutton` 以实现相同效果
* [滑动条组件](#滑动条组件) `ttk.Scale`
    * 不再支持 `label` 属性, 应改用组件 `ttk.LabeledScale`
* [侧边滚动条](#绑定侧边滚动条) `ttkScrollbar`

此外还有一些共同的修改
* 组件不通过 `state` 属性修改状态, 而是成员函数 `widget.state(newState)` ==添加==与获取状态  
并且状态为一个由字符串组成的元组, 即一个组件可以有多个状态  
常用的状态有
    * `disable` 禁用
    * `readonly` 只读
    * `focus` 称为焦点
    * `active` 组件被按下 / 激活
    * `!` + 状态名 关闭该状态
* 组件的[基本属性](#基本属性)变为
    * `master` 父容器
    * `cursor` 光标样式, 含义与默认相同
    * `takefocus` 组件是否可用键盘获得焦点
    * `style` 组件样式 (最大变化, 组件的样式通过这一选项确定, 具体见[官方文档](https://docs.python.org/zh-cn/3/library/tkinter.ttk.html#tkinter.ttk.Style))

### 下拉栏组件
下拉栏组件类 `ttk.Combobox` 继承自[输入组件](#输入组件), 具有与输入组件相同的基本功能, 也能输入文本  
除此之外, 还可从下拉栏中选择已有的值作为输入, 如果希望只能从已有值中选择, 则可以设置 `state` 为 `readonly`

#### 下拉栏的常用属性与操作
除了来自输入组件的属性, 下拉栏还具有以下独有的属性
* `justify` 文本在下拉栏内的对齐方式, 有
    * `tk.CENTER` 居中对齐
    * `tk.LEFT` 向左边对齐
    * `tk.RIGHT` 向右边对齐
* `values` 下拉栏中提供的值, 使用一个字符串元组或数组的形式表示多个值
* `postcommand` 用于绑定下拉栏被拉出时触发的回调函数

通过成员函数 `combobox.current(index)` 可以获取与设置当前下拉栏选择的选项
* 当参数为数字时, 将值设置为 `value` 中对应索引的字符串
* 当参数为 `None` 时, 将返回当前值在 `value` 中的索引, 如果不存在则返回 -1

#### 下拉栏选择事件
当下拉栏的选项被选中时, 将触发虚拟事件 `<<ComboboxSelected>>`  
可将下拉栏与该事件绑定以检测选项是否被选取

### 进度条组件
进度条组件类 `ttk.Progressbar`

#### 进度条样式与基本属性
通过以下参数可控制进度条的样式与基本属性
* `orient` 控制进度条的方向, 可选参数有
    * `tk.VERTICAL` 垂直
    * `tk.HORIZONTAL` 水平
* `length` 控制进度条的长度, 单位为像素
* `mode` 进度条的显示模式
    * `determinate` 一般的进度条形式, 用于有明确进度的情况, 为默认模式
    * `indeterminate` 进度条为一个在槽中移动的小方块, 用于无明确进度的情况
* `maximum` 进度条的最大值
* `variable` 与进度条值绑定的[变量对象](#变量对象)
* `value` 进度条当前值

#### 进度条控制
对于有明确进度的情况
* 可使用 `value` 属性或 `variable` 绑定的变量对象控制进度条
* 可使用成员函数 `progressbar.step(amount = 1)`, 使进度条的值增加指定的大小

对于无明确进度或等待的情况
* 可使用成员函数 `progressbar.start(interval = 50)`, 使进度条的值每隔指定间隔 `interval` 加 1, 单位为 ms, 当值满时将重新开始计
* 可使用成员函数 `progressbar.stop()` 停止自动增加

### 选项卡组件
选项卡组件类为 `ttk.Notebook`  
通过选项卡可以管理一系列的[简单容器](#简单容器), 并在这些容器中切换

#### 选项卡操作
通过选项卡的以下成员函数管理选项
* `notebook.add(child[, state, sticky, text, underline])`
    * `child` 选项对应的 `ttk.Frame` 简单容器
    * `state` 选项状态, 有一般状态 `tk.NORMAL`, 禁用状态 (无法选中) `tk.DISABLE`, 隐藏状态 `tk.HIDDEN`
    * `sticky` 选项卡容器与边缘的相连状态, 参数与 [grid](#组件布局) 类似
    * `text` 选项文字
    * `underline` 含义与[菜单组件](#菜单组件)的 `underline` 属性类似
* `notebook.select(index)` 选择指定索引的选项卡, 索引可以是以下形式
    * 数字, 根据添加顺序决定
    * 字符串 `end`, 表示最后一个选项
    * 字符串 `current` 表示当前选项
    * 传入 `None` 时将返回当前选中的选项卡信息, 配合 `notebook.index(notebook.select())` 可获取当前选中选项卡的索引
* `notebook.tab(index, option)` 查询选项卡属性 `option` 的值 (选项卡的属性即函数 `add` 的参数)
* `notebook.tab(index, **kwargs)` 设置选项卡的属性

#### 选项卡选择事件
当选项卡的选项变化时, 将产生虚拟事件 `<<NotebookTabChanged>>`  
可通过绑定该事件检测选项卡中选项的切换

### 树状表格组件
树状表格组件为类 `ttk.Treeview`, 一般可视为表格, 并且其中的表格项可折叠分层  
* 可以只显示第 0 列的行标题, 视为树状的下拉栏 (推荐)  
* 可以忽略第 0 列视为一般表格

#### 树状表格的基本属性
树状表格组件具有以下基本属性
* `columns` 传入一个元组, 确定表格各列列名 (之后可使用此名称访问列), 通常该属性只用于初步设置, 还需要[具体设置](#树状表格标题栏)
* `selectmode` 表格各行的选择模式, 可用参数有
    * `ttk.EXTENDED` 默认, 可多选
    * `ttk.BROWSE` 单选
    * `ttk.NONE` 无法选择
* `show` 表格的显示方式, 可用参数有
    * `tree` 在第 0 列显示行标题 (如果将该组件视为一般表格使用则不需要)
    * `headings` 第一行为表格标题栏
    * `tree headings` 同时显示 (默认)
* 树状表格也可[绑定侧边滚动条](#绑定侧边滚动条)

#### 树状表格标题栏
使用成员函数 `treeview.heading(cind, text[, anchor, command])` 设置各列的标题栏
* `cind` 列名或列索引 (使用 `#` + 索引表示的字符串)  
当存在行序号列时 (属性 `show = "tree"`), 使用 `#0` 访问该列
* `text` 列标题
* `anchor` 列对齐方式, 取值类似 [pack](#组件布局) 的 `anchor` 参数
* `command` 当列标题被点击时, 触发的回调函数

#### 树状表格内容设置
使用成员函数 `treeview.insert(parent, index, iid[, values, text, tags])` 插入表格行
* `parent` 插入行所在的父行名, 如果为独立的一行, 传入空字符串
* `index` 插入索引, 可使用字符串 `end` 表示最后一行
* `iid` 行标记, 为了便于追踪建议设置, 不使用该属性可传入 `None`
* `values` 行各列信息, 传入一个字符串元组表示各列的值, 元素个数与属性 `columns` 的相同
* `text` 行标题
* `tags` 行标签, 类似[文本组件的标签](#插入标签), 可通过此设置行显示样式与绑定事件

使用成员函数 `treeview.item(iid[, values, text, tags])` 修改行属性  
其中 `iid` 即行标记属性 `iid` 设置的值

使用成员函数 `treeview.item(iid, option)` 查询行属性 `option` 的值  

使用成员函数 `treeview.delete(iid)` 可删除指定行  
特别的, `treeview.delete(*treeview.get_children())` 可删除所有行 (其中 `*` 为 [splat 运算符](https://stackoverflow.com/questions/2322355/proper-name-for-python-operator))

使用成员函数 `treeview.selection()` 可获取所有被选中的行, 返回由被选中行的行标记组成的元组

#### 树状表格有关事件
树状表格具有以下虚拟事件可以绑定
* `<<TreeviewSelect>>` 选择的行改变
* `<<TreeviewOpen>>` 有行被展开
* `<<TreeviewClose>>` 有行被闭合

### 其他小组件
* 分隔线组件类 `ttk.Separator(master, orient, style)`  
    * `orient` 分隔线方向, 可选参数有 `tk.VERTICAL` 垂直与 `tk.HORIZONTAL` 水平
    * 一般用于 [pack](#组件布局), 并在平行方向设置 `fill`, 在垂直方向设置 `pad`
* 拖动柄组件类 `ttk.Sizegrip(master, style)`
    * 该组件没有其他属性, 可通过拖动该组件缩放窗口
    * 一般用于 [pack](#组件布局), 并使用布局 `sizegrip.pack(side = tk.BOTTOM, anchor = tk.E, padx = 5, pady = 5)`

### ttk 主题
* 使用 `ttk.Style().theme_names()` 可列出当前支持的所有主题
* 使用 `ttk.Style().theme_use(themename)` 可以设置主题或获取当前主题 (传入 `None`)  
对于不同系统, 支持的主题不同, 为了跨平台性, 推荐使用以下主题
* `calm` 扁平化主题
* `alt` 类 xp 主题
* `vista` windows 下的默认主题, 仅用于 Windows 系统

## ttkbootstrap 扁平化组件与风格
推荐使用模块 ttkbootstrap 提供更加接近 bootsrap 风格的主题与更简单的风格设置  
该模块需要通过 pip 安装, 通常使用 `import ttkbootstrap as ttk` 导入, 该模块可完全替代 ttk 与 tk 模块  
并且如 `tk.CNETER` 等常数也可使用 `ttk.CENTER` 代替

注意, ttkbootstrap 仍与 [ttk](#ttk-组件) 存在区别  
* ttkbootstrap 依然使用 `state` 属性管理状态
* ttkbootstrap 的风格已统一管理, 组件样式依然由属性 [style](#组件样式) 设置

### 基本使用
#### 根窗口与整体主题
对于 ttkbootstrap 的根窗口需要使用 `ttk.Window(themename = ...)` 创建  
其中参数 `themename` 决定了整体主题, 可参考 <https://ttkbootstrap.readthedocs.io/en/latest/zh/themes>  
常用的有
* `litera` 默认浅色主题
* `lumen` 柔和浅色主题
* `superhero` 浅深色主题
* `darkly` 深色主题

#### 组件样式
使用组件的属性 `style` (一般情况) 或 `bootstyle` (出错时使用) 可通过使用场合定义组件样式, 常用有
* `ttk.DEFAULT` 默认风格 (默认)
* `ttk.PRIMARY` 主要组件
* `ttk.SECONDARY` 此要组件
* `ttk.SUCCESS` 成功
* `ttk.INFO` 信息
* `ttk.WARNING` 警告
* `ttk.DANGER` 危险
* 当组件处于 `readonly` 与 `disabled` 状态时, 也将有特殊样式

以下为常用的组件特有样式
* 对于[标签](#标签组件)有 `inverse-xxx`, 即背景色采用样式颜色, 字体颜色为黑色
* 对于[按钮](#按钮组件)与[下拉菜单](#下拉菜单)有 `xxx-outline`, 即边框采用样式颜色
* 对于[进度条组件](#进度条组件)有 `xxx-striped`, 即在进度条内使用修饰斜线
* 对于[选择组件](#选择组件)有 `xxx[-outline]-toolbutton`, 即启用 `indication` 属性

注意样式不适用于 `Menu`, `Text` 等组件

### 消息提醒
参考 <https://ttkbootstrap.readthedocs.io/en/latest/zh/api/toast/#toastnotification>  

通过 `from ttkbootstrap.toast import ToastNotification` 导入消息提醒组件  
当现实消息提醒时, 该组件可在屏幕右下角现实消息提醒框, 并在持续一段时间后消失  
本质为一个没有标题栏的[子窗口](#子窗口)

使用前需要定义消息提醒组件对象 `toast = ToastNotification(title, message[, duration, bootstyle, alert, icon])`
* `title` 消息提醒框的标题
* `message` 消息提醒框的正文
* `duration` 持续事件, 单位为 ms, 默认持续 3000ms
* `bootstyle` 显示风格, 参考[组件样式](#组件样式)
* `alert` 显示时是否伴有警告提示音, 默认为 `False`
* `icon` 提醒框图标字符的 unicode 值, 可使用如 ⚠ 等 emoji

当需要显示时, 调用成员函数 `toast.show_toast()` 即可

### 浮动信息
参考 <https://ttkbootstrap.readthedocs.io/en/latest/zh/api/tooltip/>

通过 `from ttkbootstrap.toast import ToolTip` 导入浮动信息组件  
浮动信息组件能绑定在任意组件上, 当鼠标进入组件上时显示

浮动信息组件对象的初始化为 `tip = ToolTip(widget, text[, bootstyle])`
* `widget` 被绑定的组件
* `text` 浮动信息内容
* `bootstyle` 显示风格, 参考[组件样式](#组件样式), 可使用标签的特有样式

### ttkbootstrap 消息窗口
参考 <https://ttkbootstrap.readthedocs.io/en/latest/zh/api/dialogs/messagebox/#ttkbootstrap.dialogs.dialogs.Messagebox>

通过 `from ttkbootstrap.dialogs import Messagebox` 导入浮动信息组件  
该模块与[消息窗口](#消息窗口)类似, 但该模块的消息窗口能与整体风格保持一致  

相比默认的消息窗口, 该模块与之存在以下不同
* 单选项的消息返回 `None`, 多选项的返回选项值 (可能因本地化的原因导致选项值不同)
* 多一个 `alert` 属性可用于产生警告音

常用的消息窗口有
* `Messagebox.show_error()` 显示错误
* `Messagebox.show_info()` 显示信息
* `Messagebox.show_warning()` 显示警告
* `Messagebox.show_question()` 询问 (双选项)

### 本地化
参考 <https://ttkbootstrap.readthedocs.io/en/latest/zh/api/localization/>  
暂不介绍

## 示例代码
### 基于网格的交互界面
```python
import tkinter as tk

commonPad = {
    "padx" : 5,
    "pady" : 5
}

class LayOut:
    def __init__(self, master) -> None:
        self.master = master

        self.master.grid_columnconfigure(0, weight = 1)
        self.master.grid_columnconfigure(1, weight = 3)

        self.master.grid_rowconfigure(1, weight = 1)
        self.master.grid_rowconfigure(0, weight = 3)

        ####

        self.fInfoBody = tk.LabelFrame(self.master, text = "Info")
        self.fInfoBody.grid(commonPad, row = 0, column = 0, rowspan = 2, sticky = tk.NSEW)

        self.fInfoBody.grid_rowconfigure((0, 1), weight = 1)
        # 让列撑满可用空间
        self.fInfoBody.grid_columnconfigure(0, weight = 1)

        self.fQueueBody = tk.LabelFrame(self.fInfoBody, text = "Queue")
        # 让容器撑满网格
        self.fQueueBody.grid(commonPad, row = 0, column = 0, sticky = tk.NSEW)

        self.fValueBody = tk.LabelFrame(self.fInfoBody, text = "Value")
        self.fValueBody.grid(commonPad, row = 1, column = 0, sticky = tk.NSEW)

        ####

        self.fCmdBody = tk.LabelFrame(self.master, text = "Command Frame")
        self.fCmdBody.grid(commonPad, row = 1, column = 1, sticky = tk.NSEW)

        ####

        self.fMainBody = tk.LabelFrame(self.master, text = "Main Frame")
        self.fMainBody.grid(commonPad, row = 0, column = 1, sticky = tk.NSEW)

        pass

root = tk.Tk()
# 使用容器组件设计布局时, 由于容器默认大小为 0, 应当给出窗口的大小
root.geometry("640x480")
LayOut(root)

root.mainloop()
```

### 简单用户验证界面
```python
import tkinter as tk
import re

# 通用边距
commonPad = {
    "padx" : 5,
    "pady" : 5
}

class LoginPlane:
    def __init__(self, master) -> None:
        # 使用 pack 布局的上方容器, 采用固定大小
        self.lfInput = tk.LabelFrame(master, 
                                     text = "Input",
                                     width = 300,
                                     height = 150)
        self.lfInput.pack(commonPad, side = tk.TOP, anchor = tk.CENTER, fill = tk.X)
        self.lfInput.propagate(False)

        # 用于匹配密码与用户名的正则表达式
        self.validPattern = re.compile("[_a-zA-Z0-9]{0,16}")

        # 使用 LabelFrame 的文字作为输入框的标签, 而非直接使用标签
        self.lfName = tk.LabelFrame(self.lfInput, 
                                    text = "Name:",
                                    relief = "flat")
        self.lfName.pack(commonPad, anchor = tk.NW, fill = tk.X)
        # 使用变量对象追踪输入值
        self.valName = tk.StringVar(value = "")
        self.etName = tk.Entry(self.lfName, 
                               textvariable = self.valName,
                               validate = "key",
                               validatecommand = (master.register(self.Valid), "%P"),
                               invalidcommand = self.CmdInvalid)
        self.etName.pack(commonPad, anchor = tk.CENTER, fill = tk.X)

        self.lfPasswd = tk.LabelFrame(self.lfInput, 
                                      text = "Password:",
                                      relief = "flat")
        self.lfPasswd.pack(commonPad, anchor = tk.NW, fill = tk.X)
        self.valPasswd = tk.StringVar(value = "")
        self.etPasswd = tk.Entry(self.lfPasswd, 
                                 show = "*", 
                                 textvariable = self.valPasswd,
                                 validate = "key",
                                 validatecommand = (master.register(self.Valid), "%P"),
                                 invalidcommand = self.CmdInvalid)
        self.etPasswd.pack(commonPad, anchor = tk.CENTER, fill = tk.X)

        #####

        self.lfAction = tk.LabelFrame(master, 
                                      text = "Action")
        self.lfAction.pack(commonPad, side = tk.TOP, anchor = tk.CENTER, fill = tk.X)

        self.fActButton = tk.Frame(self.lfAction)
        self.fActButton.pack(side = tk.TOP, anchor = tk.CENTER, fill = tk.X)
        self.fActButton.grid_columnconfigure((0, 1), weight = 1)
        self.fActButton.grid_rowconfigure(0, weight = 1)

        self.btLogin = tk.Button(self.fActButton,
                                 text = "Login",
                                 command = self.CmdLogin)
        self.btLogin.grid(commonPad, row = 0, column = 0, sticky = tk.EW)

        self.btRegist = tk.Button(self.fActButton,
                                  text = "Regist",
                                  command = self.CmdRegist)
        self.btRegist.grid(commonPad, row = 0, column = 1, sticky = tk.EW)

        self.lbActState = tk.Label(self.lfAction)

        #####

        # 记录账号与密码信息
        self.userData = dict()
        
        return

    def SetActState(self, is_error, state_info):
        if is_error:
            self.lbActState.configure(fg = "red")
        else:
            self.lbActState.configure(fg = "green")
        self.lbActState.configure(text = state_info)
        if not self.lbActState.winfo_viewable() :
            self.lbActState.pack(commonPad, side = tk.TOP, anchor = tk.CENTER)

        return

    def CmdLogin(self):
        valName = self.valName.get()
        valPasswd = self.valPasswd.get()

        if valName == "" or valPasswd == "":
            self.SetActState(True, "Input Error: Empty input")
        elif valName in self.userData :
            if self.userData[valName] == valPasswd:
                self.SetActState(False, "Login successfully")
            else:
                self.SetActState(True, "Login Error: Wrong passwd")
        else:
            self.SetActState(True, "Login Error: Name does not exist")

        self.valName.set("")
        self.valPasswd.set("")
        return

    def CmdRegist(self):
        valName = self.valName.get()
        valPasswd = self.valPasswd.get()

        if valName == "" or valPasswd == "":
            self.SetActState(True, "Input Error: Empty input")
        elif valName in self.userData :
            self.SetActState(True, "Reigst Error: Name already used")
        else:
            self.userData[valName] = valPasswd
            self.SetActState(False, "Regist successfully")
        return

    def Valid(self, str):
        res = self.validPattern.search(str)
        if res and res.group() == str:
            return True
        else:
            return False
    
    def CmdInvalid(self):
        self.SetActState(True, "Input Error: Invalid Input")
        return False

root = tk.Tk()

lfLoginPlane = tk.LabelFrame(root,
                             text = "Login Plane")
lfLoginPlane.pack(commonPad, side = tk.TOP, anchor = tk.CENTER)
LoginPlane(lfLoginPlane)

root.mainloop()
```
