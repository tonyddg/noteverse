# OpenCV 笔记
<https://docs.opencv.org/4.9.0/d6/d00/tutorial_py_root.html>

笔记介绍 OpenCV 在 Python 中的应用, 使用如下指令通过 Python 安装  
* `pip install opencv-python`

笔记中默认导入模块
* `import cv2 as cv`
* `import numpy as np`
* `import matplotlib.pyplot as plt`

## 基础使用
### 图像访问与简单操作
<https://docs.opencv.org/4.9.0/d3/df2/tutorial_py_basic_ops.html>

图像读取可使用函数 `img = cv.imread(filename, flags)`  
* `img = cv.imread(filename)` 将图像读取为 Numpy 数组
    * `filename` 图像文件路径
    * `flags` 读取标志设置, 通过 `|` 拼接标志, 常用的如下
        * `cv.IMREAD_GRAYSCALE` 总是将图像读取为灰度图
        * `cv.IMREAD_COLOR` 总是将图像读取为 BGR 三色通道 
        * `cv.IMREAD_ANYDEPTH` 以原始色深读取图片, 否则总是读取为 8 位色深 
        * `cv.IMREAD_UNCHANGED` 尽可能读取图片的所有原始信息
    * 当读取失败时, 返回 `None`

对于图像读取结果
* 在 Python 中, 图像读取的结果为一个 `dtype = uint8` 的 Numpy 数组
* 数组具有形状 `width x height x 3`, 三个维度分别为图片的宽, 高以及像素在色彩空间的坐标, ==默认的色彩空间为 BGR==
* 可对数组直接赋值与索引完成对图片的修改与访问, 更多操作可见 [numpy 笔记](./numpy.md), 例如
    * 通过切片索引 `img[:, :, x]` 可提取图片色彩空间中的特定通道
    * 通过赋值 `img[a:b, c:d] = img2` 可将另一张图片覆盖到原图片上
* 与一般 Numpy 数组不同
    * 图片数组的切片索引将直接创建图片的新副本, 而不是原图片的引用
    * 可以对图片数组直接代数运算, 但更推荐使用 `np.float64(img)`, 创建图片以浮点数表示的拷贝再进行代数运算
* 函数 `img = cv.merge(channels)` 可将不同单通道的图片重新组合为一张图片
    * `channels` 元组, 元组中为任意个大小相同的二维数组, 表示生成图片各个通道的值
* 由于图片各个像素通道类型为 `uint8`, 取值只有 0 到 255, 如果希望表示负数, 小数, 需要使用 `np.float64(img)` 创建以浮点数表示通道值的, 图片数组的拷贝
* 索引数组时为先行后列, 即 `img[i, j]` 将索引图片的第 `i` 行第 `j` 像素
    * `img.shape[0]` 为图片的行数, 即图片的高; `img.shape[1]` 为图片的列数, 即图片的宽
    * 图像处理中, 习惯以左上角为原点, x 轴正反向水平向左, y 轴正方向竖直向下
    * 因此索引图片 `x, y` 处的像素需要使用 `img[y, x]`

### 色彩空间变换与图片绘制
<https://docs.opencv.org/4.9.0/df/d9d/tutorial_py_colorspaces.html>

OpenCV 提供了函数 `cv.cvtColor()` 用于变换图片的色彩空间
* `img = cv.cvtColor(src, code)` 变换图像的色彩空间
    * `src` 表示图片的数组
    * `code` 变换模式, 常用的有
        * `cv.COLOR_BGR2RGB` 将 BGR 色彩空间的图片转为 RGB
        * `cv.COLOR_BGR2GRAY` 将 BGR 色彩空间的图片转为灰度图片 (注意灰度图片为 ``width x height` 的数组)
        * `cv.COLOR_BGR2HSV` 将 BGR 色彩空间的图片转为 HSV
        * 对于其他转换也有类似的命名方式
    * 返回值为变换完成的图片数组

可通过 matplotlib 绘制图片
* `plt.imshow(X, cmap, vmin=0, vmax=255)` 可将给定的图片绘制为 Matplotlib 图像
    * `X` 图片数组, 可以是二维 (灰度或单通道) 或三维 (一般图片)
    * `cmap` 单通道图片着色器, 常用的有 (对于三维, 将默认视为 RGB 图片)
        * `gray` 表示灰度图
        * `Reds` 使用红色着色, 表示红色通道
        * `Greens` 使用绿色着色, 表示绿色通道
        * `Blues` 使用蓝色着色, 表示蓝色通道
    * `vmin, vmax` 数组值范围, 由于该函数默认会根据数组的值归一化导致图像颜色失真, 为了避免失真, 建议启用此参数, 并以 8 位颜色单通道的最小值与最大值作为参数传入 (对于 RGB 图片不需要)

### 图像的代数与掩膜叠加
<https://docs.opencv.org/4.9.0/d0/d86/tutorial_py_image_arithmetics.html>

OpenCV 中有如下常用掩膜制作函数 (二值化函数)
* 函数 `ret, img = cv.threshold(src, threshold, maxval, type)` 可对图像进行简单二值化处理, 可用于获取掩膜
    * `src` 被二值化的图片数组, 建议传入灰度图或单通道图片 (多通道图片将对各个通道分别二值化)
    * `threshold` 比较阈值
    * `maxval` 当像素点满足阈值要求时, 设置为的值, 一般取 `255` (不满足时则取为 `0`)
    * `type` 阈值比较方式, 常用的有
        * `THRESH_BINARY` 检测像素点是否大于阈值 (偏亮的区域在二值化后变为白色 `maxval`, 否则变为黑色 `0`)
        * `THRESH_BINARY_INV` 检测像素点是否小于阈值 (与上述方式相反)
        * `THRESH_OTSU` 阈值选择标记, 表示使用大津法选择阈值, 通过 `|` 与以上方式结合
    * 返回值 `img` 为变换完成的图片数组, `ret` 在以上介绍的方法中没有意义
* 函数 `img = cv.inRange(src, lowerb, upperb)` 根据图片各像素的通道值是否在指定范围内对图片进行二值化
    * `src` 被二值化的图片数组, 可以是单通道或多通道的图片, 均将得到单通道的掩膜
    * `lowerb` 要求通道值的下界, 当传入多通道图片时, 则传入数组表示各个通道的下界
    * `upperb` 要求通道值的上界, 当传入多通道图片时, 则传入数组表示各个通道的下界
    * 返回值为二值化的单通道图片数组, 当像素点所有通道均在要求的范围内是, 该像素点将被二值化为 `255`, 否则为 `0`

注意, 图像数组与 Numpy 数组不同, 无法直接完成运算, 需要使用 OpenCV 提供的函数完成代数混合 (注意混合时, 两张给出的图片至少要具有相同的大小)
* 函数 `img = cv.addWeighted(src1, alpha, src2, beta, gamma)` 完成两图片的线性混合
    * `src1, src2` 两张色彩空间与大小相同的图片
    * `alpha, beta` 混合系数, 可以是任意实数
    * `gamma` 底部亮度值, 可以是任意整数
    * 返回值为变换完成的图片数组
    * 具体混合公式为 $dst=\alpha\cdot src1+\beta\cdot src2+\gamma$  
    * 当结果超出 8 位的 `0~255` 范围时, 将修改为 `0` 或 `255`
* 函数 `img = cv.bitwise_not(src)` 对图像个像素按值取反
    * `src` 被变换的图片数组
    * 该函数通常可用于翻转已有的掩膜
* 函数 `img = cv.bitwise_add(src1, src2, *, mask)` 对图像个像素按值与
    * `src1, src2` 参与运算的图片数组, 需要有相同的大小
    * `mask` 掩膜, 即一个单通道的图片数组, 掩膜中取值==不为== `0` 的像素将参与运算, 掩膜为 `0` 的像素将取 `0`
    * 返回值为变换完成的图片数组
    * 类似的还有 `cv.bitwise_or, cv.bitwise_xor, cv.add` 函数, 分别完成按位或, 按位异或与相加运算 (超出八位数值范围时将视为 `255`)

以下例子为通过二值化提取图章图片 `seal` 中灰度大于 10 的部分, 并覆盖到被修改图片上 (OpenCV 有提供专门的掩膜图片覆盖函数 `cv.CopyTo()`, 以下仅为示例)
```python
import matplotlib.pyplot as plt
import cv2 as cv

# 被覆盖图片
img1 = cv.imread("./images/roi.jpg")
img1 = cv.cvtColor(img1, cv.COLOR_BGR2RGB)

# 图章图片
seal = cv.imread("./images/b2.jpg")
seal = cv.cvtColor(seal, cv.COLOR_BGR2RGB)

# 截取被覆盖图片中, 图章覆盖位置的, 与图章大小相同的子图片
img_operated = img1[0 : seal.shape[0], 0 : seal.shape[1], :]

# 通过二值化处理, 提取图章用于覆盖部分的掩膜 mask
seal_gray = cv.cvtColor(seal, cv.COLOR_BGR2GRAY)
_, mask = cv.threshold(seal_gray, 10, 255, cv.THRESH_BINARY)
mask_inv = cv.bitwise_not(mask)

# 此处的 bitwise_and 并不改变图像, 更多是利用掩膜将图像中的特定区域置为 0
# 通过掩膜提取图章中的色块, 将图章中非色块位置的像素置为 0
img_bg = cv.bitwise_and(seal, seal, mask = mask)
# 通过掩膜将被覆盖图片中, 掩膜色块位置的像素置为 0
img_fg = cv.bitwise_and(img_operated, img_operated, mask = mask_inv)

# 将两张图片叠加, 两张图片对应位置的像素已经置 0, 因此不会产生其他额外作用
img_res = cv.add(img_fg, img_bg)
# 将原始图片提取区域使用被添上图章的子图片覆盖
img1[0 : seal.shape[0], 0 : seal.shape[1], :] = img_res

plt.imshow(img1)
plt.show()
```

### 图像几何变换
<https://docs.opencv.org/4.9.0/da/d6e/tutorial_py_geometric_transformations.html>

OpenCV 中有函数 `cv.resize` 可实现基本的图像缩放
* 函数 `mat = cv.resize(src, dsize, *, fx, fy, interpolation)`
    * `src` 被变换的图片数组
    * `dsize` 二元素元组或 `None`, 表示图像缩放后的宽与高
    * `fx` 图片宽度缩放比例, 当 `dsize` 为 None 时有效
    * `fy` 图片长度缩放比例, 当 `dsize` 为 None 时有效
    * `interpolation` 图片插值算法, 常用的算法有
        * `cv.INTER_LINEAR` 默认算法, 速度快
        * `cv.INTER_CUBIC` 推荐放大算法
        * `cv.INTER_AREA` 推荐缩小算法

为了同时表示图像的缩放, 切变, 旋转与平移等变换, 需要使用图像的仿射变换, 即将原图像中的像素的 $\bm{p}=\begin{bmatrix}x& y\end{bmatrix}^T$ 映射到新的像素点 $\bm{p}'$  
通常使用二维的齐次矩阵 $\bm{T}$ 表示仿射变换, 有 
$$ \bm{T}=\begin{bmatrix}\bm{R}_2&\bm{t}_{2\times 1}\\\bm{0}_{1\times 2}&1\end{bmatrix}\quad\bm{T}\bm{p}=\bm{p}'$$  

但在 OpenCV 中的仿射变换矩阵则使用如下形式
$$\bm{T}'=\begin{bmatrix}\bm{R}_2&\bm{t}_{2\times 1}\end{bmatrix}\quad\bm{p}=\bm{R}_2\bm{p}'+\bm{t}_{2\times 1}$$  
注意此时为输入目标图像像素点位置 $\bm{p}'$ , 通过 $\bm{T}$ 映射为输入图像的像素点位置 $\bm{p}$, 并取该点的颜色作为目标图像的颜色  
因此对于理论变换 $\bm{T}$, 输入的变换矩阵应满足 $\bm{T}'=\bm{T}^{-1}$

并提供了如下一系列有关函数
* 函数 `cv.wrapAffine(src, M, dsize, *, flags, borderMode, borderValue)` 将仿射变换作用到图像上
    * `src` 被变换的图片数组
    * `M` 2 x 3 的 Numpy 数组, 即仿射变换矩阵, 应保证该矩阵的 `dtype` 为 `np.float32` 或 `np.float64`
    * `dsize` 二元素元组, 表示变换结果的宽与高
    * `flags` 图片插值算法与变换标志 (通过 `|` 运算结合)
        * 插值算法见函数 `cv.resize` 的介绍
        * 标志 `cv.WARP_INVERSE_MAP` 表示反向变换, 此时输入的仿射变换矩阵即表示输入图像到输出图像的变换
    * `borderMode` 额外边缘处理方式, 即图像在变形后, 不一定能填满整个矩形图像额留下未定义的部分, 该参数规定这些未定义部分的处理, 常用的有
        * `cv.BORDER_CONSTANT` 默认, 使用指定的颜色填充未定义部分
        * `cv.BORDER_TRANSPARENT` 使用透明色填充未定义部分
    * `borderValue` 指定未定义部分的填充颜色
    * 返回值为变换完成的图片数组
* 函数 `cv.getRotationMatrix2D(center, angle, scale)` 生成除切变外的仿射变换矩阵
    * `center` 二元素元组, 表示变换中心点的坐标
    * `angle` 旋转角度, 单位为角度, 以逆时针方向为正
    * `scale` 缩放大小
    * 返回值为输出图像到输入图像的仿射变换矩阵, 即 `cv.wrapAffine` 一般情况下接收的矩阵, 但函数所描述的是输入图像到输出图像的变换
* 函数 `cv.getAffineTransform(src, dst)` 根据三点获取仿射变换矩阵
    * `src` 3 x 2 的 Numpy 数组, 表示变换前的三个点坐标
    * `dst` 3 x 2 的 Numpy 数组, 表示变换后的三个点坐标
    * 返回值为一个满足以上映射关系的仿射变换矩阵
* 函数 `cv.warpPerspective(src, M, dsize, *, flags, borderMode, borderValue)` 将齐次变换作用到图像上 (即最后一行不为 $\begin{bmatrix}0&0&1\end{bmatrix}$ 的齐次矩阵, 此时还将包含投影变换)
    * `src` 被变换的图片数组
    * `M` 3 x 3 的 Numpy 数组, 即齐次变换矩阵, 应保证该矩阵的 `dtype` 为 `np.float32` 或 `np.float64`
    * `dsize` 二元素元组, 表示变换结果的宽与高
    * `flags` 图片插值算法与变换标志, 参数与 `wrapAffine` 相同
    * `borderMode` 与 `borderValue` 参见 `cv.wrapAffine` 的介绍
    * 返回值为变换完成的图片数组
* 函数 `cv.getPerspectiveTransform(src, dst)` 根据四点获取齐次变换矩阵
    * `src` 4 x 2 的 Numpy 数组, 表示变换前的四个点坐标
    * `dst` 4 x 2 的 Numpy 数组, 表示变换后的四个点坐标
    * 返回值为一个满足以上映射关系的齐次变换矩阵

### 卷积运算
<https://docs.opencv.org/4.9.0/d4/d13/tutorial_py_filtering.html>

OpenCV 提供了用于卷积运算的函数, 以及预设的图片模糊处理函数
* `cv.filter2D(src, ddepth, kernel, *, anchor, delta, borderType)`
    * `src` 用于卷积的图片数组
    * `ddepth` 变换结果的色深, 常用的值有
        * `-1` 与输入相同
        * `cv.CV_8U` 使用 8 位无符号整型表示像素
        * `cv.CV_32F` 使用 32 位浮点数表示像素
        * `cv.CV_64F` 使用 64 位浮点数表示像素
    * `kernel` 卷积掩膜, 通常为一个 n x n 的 `np.float32` 或 `np.float64` 的 Numpy 数组
    * `anchor` 二元素元组, 表示单个卷积运算结果存放的相对于掩膜的 x, y 坐标, 传入 `(-1, -1)` 表示将结果存放在掩膜中心的像素
    * `delta` 在卷积结果加上的偏置量, 默认为 0
    * `borderType` 边缘处理方法, 即在图像的边缘卷积时, 如何处理图像外的像素, 常用的有
        * `cv.BORDER_CONSTANT` 将图像外的像素视为 0 处理 
        * `cv.BORDER_REFLECT_101` 近似对称处理 (默认)
        * `cv.BORDER_REPLICATE` 取最近的边缘像素代替
    * 返回值为卷积完成的图片数组
* `cv.blur(src, ksize, *, anchor, borderType)` 对图像进行均值滤波
    * `src` 用于滤波的图片数组
    * `ksize` 二元素元组, 表示掩膜的宽与高
    * `anchor, borderType` 与函数 `cv.filter2D` 中的同名参数含义相同
    * 返回值为滤波完成的图片数组
* `cv.GaussianBlur(src, ksize, sigmaX, *, sigmaY, anchor, borderType)` 对图像进行均值滤波
    * `src` 用于滤波的图片数组
    * `ksize` 二元素元组, 表示掩膜的宽与高
    * `sigmaX` 高斯滤波器在 X 方向的标准差, 越大越模糊, 默认为 0.5
    * `sigmaY` 高斯滤波器在 Y 方向的标准差, 默认与 `sigmaX` 相同
    * `anchor, borderType` 与函数 `cv.filter2D` 中的同名参数含义相同
    * 返回值为滤波完成的图片数组
* `cv.medianBlur(src, ksize)` 对图像进行中值滤波
    * `src` 用于滤波的图片数组
    * `ksize` 整数, 表示掩膜的大小
    * 返回值为滤波完成的图片数组
* `cv.Sobel(src, ddepth, dx, dy, *, ksize, delta, borderType)` 对图形使用 Sobel 算子作卷积, 获取方向偏导以提取边缘
    * `src` 用于卷积的图片数组
    * `ddepth` 变换结果的色深, 由于图片梯度一般为浮点数, 因此推荐使用 `cv.CV_64F`
    * `dx, dy` 通常 x 方向的偏导则取 `dx = 1, dy = 0`, y 方向的偏导类似
    * `ksize` Sobel 算子大小, 只能取 1, 3, 5, 7
    * `delta` 在卷积结果加上的偏置量, 默认为 0
    * `borderType` 边缘处理, 见函数 `cv.filter2D` 介绍
* `cv.Laplacian(src, ddepth, *, ksize, delta, borderType)` 对图像使用拉普拉斯算子作卷积, 获取二阶差分, 用于提取边缘
    * 参数含义与 `cv.Sobel` 基本相同

### 傅里叶变换
<https://docs.opencv.org/4.9.0/de/dbc/tutorial_py_fourier_transform.html>

* `cv.dft(src, *, flags)` 对图像进行离散傅里叶变换
    * `src` 进行变换的图像数组, 对于一般的 8 位色深图像, 需要通过 `np.float32()` 等函数, 将图像数组转换为浮点类型
    * `flags` 设置标志 (可通过 `|` 拼接多个标志), 常用的有
        * `cv.DFT_COMPLEX_OUTPUT` 进行傅里叶变换并输出复数谱, 此时输出结果为一个与输入图像大小相同的图像数组, 该图像上位于 `u, v` 的像素值具有两个浮点数通道, 分别表示变换结果的实部与虚部 (一般进行正变换时应该使用此标志)
        * `cv.DFT_INVERSE` 进行傅里叶逆变换并输出单通道的原始图像 (一般进行逆变换时应该使用此标志)
        * `cv.DFT_REAL_OUTPUT` 仅输出变换结果的实部 (用于抛弃逆变换结果的虚部, 以获取原始图像)
        * `cv.DFT_SCALE` 对变换结果除以参与变换的点数, 得到归一化的结果 (如果希望能完成逆变换, 则正变换与逆变换中至少有一处使用此标志)
    * 返回变换结果, 具体与 `flag` 有关
* `cv.mulSpectrums(a, b, flag)` 令两个复数谱相乘
    * `a,b` 相乘的两个大小相同的复数谱
    * `flag` 一般取 `0` 即可
    * 返回结果为两个复数谱的相乘结果
    * 如果需要对图像进行卷积运算, 更推荐使用 [cv.filter2D](#卷积运算)
* `cv.magnitude(x, y)` 将复数谱转换为幅值谱
    * `x, y` 两个大小相同的图像数组, 分别表示实数谱与虚数谱, 可通过切片索引 `spe[:, :, 0]` 提取实部, 虚部类似
    * 返回值为一个单通道的图像数组, 即幅值谱 
* 绘制图像的幅值谱图片
    * 对于复数谱无法用图像表示, 需要先使用 `cv.magnitude()` 得到幅值谱, 此外还应当对幅值谱各点运算 `20 * np.log(mag)` 将幅值单位转变为分贝
    * 一般 DFT 结果中, 低频分量位于两侧, 而高频分量位于中间, 不利于观察, 可通过 `np.fft.fftshift(spe)`, 可将高频分量移动到两侧, 低频分量移动到中心, 实现中心化 (同样有逆过程 `np.fft.ifftshift(spe)`)
    * 最后使用 [plt.imshow](#色彩空间变换与图片绘制) 绘制幅值谱图片

对于幅值谱图片绘制有例子
```python
spe = cv.dft(np.float32(img), flags = cv.DFT_COMPLEX_OUTPUT)
spe = np.fft.fftshift(spe)
mag = 20 * np.log(cv.magnitude(spe[:, :, 0], spe[:, :, 1]))

plt.imshow(mag, 'gray')
```

对于滤波器设计有例子
```python
def img_corr(img: np.ndarray):
    res = np.zeros(img.shape, np.uint8)
    max_p = np.max(img)
    min_p = np.min(img)
    rate_p = 255 / (max_p - min_p)

    for i in np.arange(img.shape[0]):
        for j in np.arange(img.shape[1]):
            res[i, j] = np.round((img[i, j] - min_p) * rate_p)
    return res

# 原始图像的中心化复数谱
fspe = np.fft.fftshift(cv.dft(np.float64(img), flags = cv.DFT_COMPLEX_OUTPUT | cv.DFT_SCALE)) # type: ignore
# 滤波器的中心化复数谱
gspe = ...
# 将原图像的复数谱与滤波器相乘, 并去中心化
res_spe = np.fft.ifftshift(cv.mulSpectrums(fspe, gspe, 0))
# 将反变换结果还原为 8 位色深的灰度图
res = img_corr(cv.dft(res_spe, flags = cv.DFT_INVERSE | cv.DFT_REAL_OUTPUT))
```

### 直方图分析
<https://docs.opencv.org/4.9.0/de/db2/tutorial_py_table_of_contents_histograms.html>

* `cv.calcHist(images, channels, mask, histSize, ranges)` 对图片进行直方图统计
    * `images` 一个列表 (对于单张图片应传入 `[img]`), 包含了多个用于统计的图片数组, 各个图片应具有相同的色深, 大小与通道
    * `channels` 一个列表, 表示统计的通道索引, 对于灰度图或仅统计单通道至少要传入 `[0]` 或 `[x]`
    * `mask` 掩膜, 即一个取值为 `0` 或 `255` 的与传入图片大小相同的图片数组, 仅取值为 `255` 的部分将进入统计, 如果不需要掩膜则传入 `None`
    * `histSize` 一个列表, 表示各个通道统计分组数, 对于 8 位色深的灰度图, 一般传入 `[256]`
    * `ranges` 一个二维列表, 表示各个通道统计的颜色值范围, 对于 8 位色深的灰度图, 一般传入 `[[0, 256]]`
    * 返回值为一个 histSize_i x n 的数组, n 与统计的通道数有关
* `cv.equalizeHist(src)` 对图片进行直方图均衡化
    * `src` 用于均衡化的八位色深灰度图 (二维数组)
    * 返回值为均衡化的灰度图

对于直方图绘制有例子
```python
# 注意, matplotlib 中, hist 函数需要传入原始数据, 对于统计完成的结果应使用 Axes.stairs() 绘制
axe.stairs(cv.calcHist([img], [0], None, [256], [0, 256]).flatten(), fill = True)
```

### 形态学
<https://docs.opencv.org/4.9.0/d9/d61/tutorial_py_morphological_ops.html>

形态学一般应用于二值化 (仅包含 `255` 与 `0`) 的图片, 可使用函数 [cv.threshold](#图像的代数与掩膜叠加) 对图片进行二值化处理
* `cv.erode(src, kernel, *, anchor, iterations)` 对图片进行腐蚀处理
    * `src` 被处理的二值化图片数组
    * `kernel` 结构元数组, 可以是任意形状的二维数组, 一般要求 `dtype=np.uint8`, 且仅含有 `0` 与 `1`
    * `anchor` 二元素元组, 表明结构元锚点坐标, 默认传入 `(-1, -1)` 表明以中心为锚点
    * `iterations` 循环运算次数, 默认为 1
    * 返回值为腐蚀后的二值化图片
* `cv.dilate(src, kernel, *, anchor, iterations)` 对图片进行膨胀处理
    * 参数含义与 `cv.erode` 基本相同
* `cv.morphologyEx(src, op, kernel, *, anchor, iterations)` 对图片进行形态学运算
    * `op` 形态学操作, 常用的的操作有
        * `cv.MORPH_OPEN` 形态学开启, 即先腐蚀后膨胀, 用于消除噪点
        * `cv.MORPH_CLOSE` 形态学闭合, 即先膨胀后腐蚀, 用于填充空洞
        * `cv.MORPH_GRADIENT` 形态学边缘提取, 即计算膨胀与腐蚀结果之间的差
        * `cv.MORPH_HITMISS` 击中与未击中处理, 参考 <https://homepages.inf.ed.ac.uk/rbf/HIPR2/hitmiss.htm>
    * 其余参数含义与 `cv.erode` 基本相同
* `cv.getStructuringElement(shape, ksize)` 形态学结构元构造
    * `shape` 形状标识, 常用如下
        * `cv.MORPH_RECT` 矩形结构元, 即使用 `1` 填充整个数组
        * `cv.MORPH_ELLIPSE` 椭圆结构元
        * `cv.MORPH_CROSS` 十字结构元, 即中心行与列元素为 `1`
    * `ksize` 结构元的大小
    * 导出 ksize x ksize 的二维结构元数组, 由 `0` 与 `1` 组成

### 角点检测
<https://docs.opencv.org/4.9.0/dc/d0d/tutorial_py_features_harris.html>

OpenCV 提供以下函数用于简单的角点检测
* `cv.cornerHarris(src, blockSize, ksize, k, *, borderType)` 计算 Harris 响应 
    * `src` 被检测的图片数组, 要求时单通道的一般为灰度图
    * `blockSize` 整数, 即检测窗口的大小
    * `ksize` 整数, 即 Sobel 算子大小, 只能取 1, 3, 5, 7, 一般取 3
    * `k` Harris 响应函数中的系数 `k` 取值, 一般为 `0.04`
    * `borderType` 边缘处理方法, 参见函数 [cv.filter2D](#卷积运算) 介绍
    * 返回值为一个保存了检测图片各像素点对应 Harris 响应函数值的二维数组, 元素类型为 `CV_32FC1`
    * 对于 Shi-Tomasi 响应函数, 类似的有 `cv.cornerMinEigenVal(src, blockSize, ksize, *, borderType)`
* `cv.goodFeaturesToTrack(image, maxCorners, qualityLevel, minDistance, *, mask, blockSize, gradientSize, useHarrisDetector)` 图像角点提取
    * `image` 被检测的图片数组, 要求时单通道的一般为灰度图
    * `maxCorners` 最大搜索的角点数, 如果可能角点多于该参数, 将给出可能性最大的几个
    * `qualityLevel` 角点质量要求等级, 即仅当该参数乘以图片角点响应函数的最大值作为响应函数的阈值, 一般可取 0.01
    * `minDistance` 角点间的最小欧几里得距离, 一般可取 `10`
    * `mask` 掩膜, 要求是一个单通道的图片数组且色深为 `CV_8UC1`, 仅非零位置的像素会用于检测
    * `blockSize` 整数, 即检测窗口的大小
    * `gradientSize` 整数, 即 Sobel 算子大小
    * `useHarrisDetector` 布尔值, 是否使用 Harris 响应函数, 默认为 `False`, 使用 Shi-Tomasi 响应函数, 即以最小的特征量作为响应函数值
    * 返回值为一个 n x 1 x 2 的浮点型 Numpy 数组, 包含了所有提取到的角点坐标, 一般使用 `corner = np.int32(corner[:, 0, :])` 将其转化为一个按行保存坐标的整数数组

### Canny 边缘提取
<https://docs.opencv.org/4.9.0/da/d22/tutorial_py_canny.html>

OpenCV 提供以下函数用于 Canny 边缘提取
* `cv.Canny(image, threshold1, threshold2, *, apertureSize, L2gradient)` 
    * `image` 被检测的图片数组, 要求时单通道的一般为灰度图
    * `threshold1` 下阈值, 需要给出具体的灰度值
    * `threshold2` 上阈值, 需要给出具体的灰度值
    * `apertureSize` 整数, 即 Sobel 算子大小
    * `L2gradient` 布尔值, 计算梯度的范数, 默认为 `False`, 使用 p-1 范数即梯度为两个方向偏导绝对值之和, `True` 时使用 p-2 范数即梯度为两个方向导数的平方和再开根号
