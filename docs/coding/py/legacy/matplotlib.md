# 绘图
绘图采用 matplotlib.pyplot 库, 通常将其取别名为 plt
```python
import matplotlib.pyplot as plt
```

## 图像成分
![](./matplotlib_src/anatomy.webp)
```python
# 创建 figure 与 axe
fig, ax = plt.subplot()
# 在 axe 上绘图
ax.plot([1, 2, 3, 4], [4, 3, 2, 1])
```
* 通过调用图像成分的成员函数, 实现对图像的操作
* 操作图像时, 成员函数的命名规则为 set/get_xxx, xxx 为图像元素名

### Figure
绘图区域, 一个 Figure 即一张图片

### Axe
在 Figure 上的图像, 一个 Figure 上可以有多个图像, 同样一个 Axe 内可以有多个图形

### Axis
图像的坐标轴, 作为图像的成员存在, 包含 x, y 两个轴

### Artist
在 Figure 上的图像元素称为 Artist, 除了 Axe, Axis 外, 还包括文字, 线条等

## 创建图像

### 创建 Axe
使用 fig, axes = plt.subplots(x, y) 创建图像
其中 fig 为 Figure 对象, axes 为 Axe 对象数组(如果仅有一个 axe, 则为 Axe 对象), 如果 y != None, 则为二维数组

## 曲线图

### 绘制曲线
lines = axe.plot(x1, y1, x2, y2, ...)
1. 根据输入的 x, y 坐标绘制曲线
2. x1 第一条曲线的 x 坐标
3. y1 第二条曲线的 y 坐标
4. 返回 Line_2D 对象的列表, 对应多条曲线的属性

### 曲线点标记 marker
使用一个字符来表示标记, 常用标记
|字符|形状|
|--|--|
|,|无标记(像素点)|
|o|圆形|
|s|正方形|
|d|菱形|
[其他标记](https://www.runoob.com/matplotlib/matplotlib-marker.html)

### 线条样式 linestyle
使用一个字符来表示线条样式
|字符|样式|
|--|--|
|-|横线|
|:|虚线|
|--|破折线|
|-.|点划线|

### 线条颜色 color
使用颜色英文的第一个字符来表示线条颜色
也可使用 "#RRGGBB" 来表示颜色

## 散点图

### 绘制散点图
scatter = axe.scatter(x, y, s=None, c=None)
1. x 散点的 x 坐标
2. y 散点的 y 坐标
3. s 各个散点的大小, 大小与坐标轴无关
4. c 使用 0 - 100 表示各个散点的颜色, 与 cmap 有关

### 散点颜色条 cmap
根据 c 的取值与颜色条的类型决定散点的颜色, 使用字符串表示, 具体见 [cmap样式](https://www.runoob.com/matplotlib/matplotlib-scatter.html)

## 其他图形

### 绘制柱状图
axe.bar(x, height, width=0.8, bottom=None, *, align='center', color = None)
1. x 柱状图的 x 标签, 可以是数据/字符串数组
2. height 各个柱条的高度
3. width 柱条的宽度, 长度与 x 轴有关
4. bottom 底部的 y 坐标
5. align 对齐方式
6. color 各个柱条的颜色, 颜色表示规则同曲线

#### 柱状图绘制技巧
可以在一个 axe 内绘制多个柱状图, 实现复杂柱状图
1. 多层柱状图
    * 绘制多张图时, 最先调用的函数最后绘制
    * 先绘制高度为 y1 + y2 的柱状图
    * 再绘制高度为 y1 的柱状图

2. 分组柱状图
    * x 坐标先设为 t - width / 2 绘制左侧柱条
    * 再设为 t + width / 2 绘制右侧柱条

3. 水平柱状图
使用函数 barh 绘制水平柱状图

### 绘制饼状图

## 绘制图形
### 值线
1. 绘制水平线
axe.axhline
2. 绘制竖直线
axe.axvline
3. 绘制直线
axe.axline

## 图形设置
### 坐标轴比例
axe.set_aspect()
* 参数 "equal" 表示 x, y 轴等长
* 参数 "auto" 表示自动设置

### 设置 Legend
axe.legend(字符串数组)
* 通过字符串数组设置各条曲线的 legend, 而不是传入多个字符串

### 通用子图像设置
fig, axes = plt.subplots(x, y, layout="constrained")
* 创建 $x\times y$ 的子图像
* 需要设置参数 layout="constrained" 保证子图像合理排列
* 返回值 axes 为一个 $x$ 行 $y$ 列的数组, 包含了各个子图像

### 快速子图像设置
axe = plt.subplot(x, y, n)
* 用于快速创建子图像
* n 为子图像的索引, 需要从 1 开始计

## 用户设置
### 中文显示
> 参考文章 <https://zhuanlan.zhihu.com/p/52779214?from_voters_page=true>

1. 打开路径 `.../anaconda3/envs/[python 环境名]/Lib/site-packages/matplotlib/mpl-data`
1. 将 `simhei.ttf`, `arial.ttf` 放入路径下的 `fonts/ttf` 文件夹 (通常可在 `C:/windows/Fonts` 中找到)
1. 将路径下的 `matplotlibrc` 文件复制到 `C:\用户\[用户名]\.matplotlib\matplotlibrc` (Windows), `$HOME/.config/matplotlib/matplotlibrc` (Linux)
1. 打开复制后的文件
    1. `font.family` 删除该选项前的 `#`
    1. `font.sans-serif` 删除该选项前的 `#`, 在冒号后添加 `simhei`
    1. `axes.unicode_minus` 删除该选项前的 `#`, 将值改为 `False`
