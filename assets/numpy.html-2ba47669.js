import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{r as p,o as t,c as i,b as n,d as l,a as o,e as a}from"./app-8c5ce49e.js";const c={},r=a(`<h1 id="numpy" tabindex="-1"><a class="header-anchor" href="#numpy" aria-hidden="true">#</a> Numpy</h1><h2 id="引入模块" tabindex="-1"><a class="header-anchor" href="#引入模块" aria-hidden="true">#</a> 引入模块</h2><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通常以 np 为别名引入模块</p><h2 id="ndarray-对象" tabindex="-1"><a class="header-anchor" href="#ndarray-对象" aria-hidden="true">#</a> ndarray 对象</h2><ul><li>n 维数组对象</li><li>保存的数据类型相同</li><li>以 0 为下标开始</li></ul><h3 id="创建-ndarray-对象" tabindex="-1"><a class="header-anchor" href="#创建-ndarray-对象" aria-hidden="true">#</a> 创建 ndarray 对象</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>numpy<span class="token punctuation">.</span>array<span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">,</span> dtype <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">,</span> copy <span class="token operator">=</span> <span class="token boolean">True</span><span class="token punctuation">,</span> order <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">,</span> subok <span class="token operator">=</span> <span class="token boolean">False</span><span class="token punctuation">,</span> ndmin <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol><li>object 用于创建的列表, 嵌套列表则创建多维数组</li><li>dtype 数组的类型, 有 np.float, np.int16, np.int32 等</li></ol><h3 id="对象属性" tabindex="-1"><a class="header-anchor" href="#对象属性" aria-hidden="true">#</a> 对象属性</h3><ol><li>dtype 数组元素类型</li><li>size 数组元素总数</li><li>shape 数组各维度长度</li><li>ndim 数组的维度数量</li></ol><h3 id="创建简单数组" tabindex="-1"><a class="header-anchor" href="#创建简单数组" aria-hidden="true">#</a> 创建简单数组</h3><p>基本格式 np.fun([shape], dtype)</p><ol><li>np.empty 创建空数组, 内部的值没有初始化, 为随机数</li><li>np.zeros/ones 创建填充 0/1 的数组</li><li>np.full([shape], [fill_value], dtype) 创建由默认值填充的数组</li></ol><h3 id="创建一维数组" tabindex="-1"><a class="header-anchor" href="#创建一维数组" aria-hidden="true">#</a> 创建一维数组</h3><ol><li>numpy.arange([start], [stop], [step], dtype) 创建等差数列 <ul><li>stop 终止值 (不包含)</li><li>start 起始值</li><li>step 步长</li></ul></li><li>np.linspace([start], [stop], [num], endpoint = True, dtype) 创建等差数列 <ul><li>num 数列长度</li><li>endpoint 是否包含 stop, 默认不包含</li></ul></li><li>np.logspace([start], [stop], [num], endpoint = True, base=10.0, dtype) 创建等比数列 <ul><li>base 底数</li></ul></li></ol><h3 id="创建二维数组" tabindex="-1"><a class="header-anchor" href="#创建二维数组" aria-hidden="true">#</a> 创建二维数组</h3><ol><li>np.eye([大小]) 创建单位矩阵</li><li>np.diag([对角线上的元素]) 创建对角矩阵</li></ol><h2 id="索引与切片" tabindex="-1"><a class="header-anchor" href="#索引与切片" aria-hidden="true">#</a> 索引与切片</h2><h3 id="直接索引" tabindex="-1"><a class="header-anchor" href="#直接索引" aria-hidden="true">#</a> 直接索引</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>ndarray<span class="token punctuation">[</span>维度<span class="token number">1</span><span class="token punctuation">,</span> 维度<span class="token number">2</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过一个中括号, 其中包含各个维度的坐标的方式直接索引</p><p>对于二维数组</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#  0  1  2 列
[ [0, 1, 2]     # 第 0 行
  [3, 4, 5]     # 第 1 行
  [6, 7, 8] ]   # 第 3 行
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对于三维数组</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 第 1 层
[[[0 1]     # 第 0 行
  [2 3]]    # 第 1 行
# 第 2 层 
 [[4 5]
  [6 7]]]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>数组索引总是由外向内, 最为外层的数组维度最高</li><li>在三维数组中, 层最外, 行次之, 列最内, 因此索引为 arr[层][行][列]</li><li>函数中的轴同理, 次序最小的轴为最外层的轴, 即 axis = 0 为三维数组 arr 的 z 轴</li></ul><h3 id="截取子数组-切片索引" tabindex="-1"><a class="header-anchor" href="#截取子数组-切片索引" aria-hidden="true">#</a> 截取子数组(切片索引)</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>new_array <span class="token operator">=</span> old_array<span class="token punctuation">[</span>a<span class="token punctuation">:</span>b<span class="token punctuation">,</span> c<span class="token punctuation">:</span>d<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>与字符串截取相同的方式截取子数组</p><ul><li>直接截取得到的是引用, 最好使用 copy 方式截取, 得到独立的数组</li></ul><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>new_array <span class="token operator">=</span> old_array<span class="token punctuation">[</span>a<span class="token punctuation">:</span>b<span class="token punctuation">,</span> c<span class="token punctuation">:</span>d<span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span><span class="token punctuation">.</span>copy<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>使用 ... 或 : 可以表示维度中所有的元素</li></ul><h3 id="向量索引" tabindex="-1"><a class="header-anchor" href="#向量索引" aria-hidden="true">#</a> 向量索引</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>new_array <span class="token operator">=</span> old_array<span class="token punctuation">[</span><span class="token punctuation">[</span>列表<span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>列表<span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>与 matlab 类似, 通过列表(列向量), 表示个各个维度的坐标, 索引元素, 返回一个一维数组</p><h3 id="部分向量索引" tabindex="-1"><a class="header-anchor" href="#部分向量索引" aria-hidden="true">#</a> 部分向量索引</h3><p>当向量索引中, 列表数 &lt; 维度数, 将会截取部分 eg. 截取 array 的第 1 层的第 3 列与第 2 层的第 4 列</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>res <span class="token operator">=</span> array<span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="布尔索引" tabindex="-1"><a class="header-anchor" href="#布尔索引" aria-hidden="true">#</a> 布尔索引</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>new_array <span class="token operator">=</span> old_array<span class="token punctuation">[</span><span class="token punctuation">[</span>布尔数组<span class="token punctuation">]</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>与 matlab 类似, 对数组布尔运算, 将返回布尔数组, 使用布尔数组实现索引, 返回一个一维数组</p><p>eg. 结合取反 ~, 过滤 nan 元素</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>num <span class="token operator">=</span> array<span class="token punctuation">[</span><span class="token operator">~</span>np<span class="token punctuation">.</span>isnan<span class="token punctuation">(</span>array<span class="token punctuation">)</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="布尔索引注意" tabindex="-1"><a class="header-anchor" href="#布尔索引注意" aria-hidden="true">#</a> 布尔索引注意</h4><ol><li>使用按位与与括号(不是用逻辑与 AND)</li></ol><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>num <span class="token operator">=</span> arr<span class="token punctuation">[</span><span class="token punctuation">(</span>arr <span class="token operator">&gt;</span> <span class="token number">0.3</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token punctuation">(</span>arr <span class="token operator">&lt;</span> <span class="token number">0.7</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>布尔索引的数组维度低于被索引数组时, 则可索引列 eg.</li></ol><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>b <span class="token operator">=</span> a<span class="token punctuation">[</span><span class="token punctuation">(</span>a<span class="token punctuation">[</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">&gt;</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">&amp;</span> <span class="token punctuation">(</span>a<span class="token punctuation">[</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="数组操作" tabindex="-1"><a class="header-anchor" href="#数组操作" aria-hidden="true">#</a> 数组操作</h2><h3 id="广播" tabindex="-1"><a class="header-anchor" href="#广播" aria-hidden="true">#</a> 广播</h3><p>当两个数组形状相同, 即 a.shape == b.shape, 则数组之间的运算为对应位置的值之间运算 否则将尝试使用广播的方式运算</p><h4 id="广播规则" tabindex="-1"><a class="header-anchor" href="#广播规则" aria-hidden="true">#</a> 广播规则</h4><p>假设数组 a 较大, b 较小</p><ol><li>将 b 在其他维度的大小设为 1</li><li>找到 a 与 b 大小对齐的维度</li><li>复制 b 与 a 对齐的部分, 直到与 a 相同大小, 进行计算</li><li>当 b 存在一个大小不为 1 且不与 a 对齐的维度, 将抛出异常</li></ol><p>eg.</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 创建一个 0 - 8 的方阵</span>
arr <span class="token operator">=</span> np<span class="token punctuation">.</span>reshape<span class="token punctuation">(</span>np<span class="token punctuation">.</span>arange<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 普通运算, 对应位置的值相乘</span>
res <span class="token operator">=</span> arr <span class="token operator">*</span> np<span class="token punctuation">.</span>random<span class="token punctuation">.</span>random<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># 广播, 行数不匹配, 列数匹配, 则将复制列, 此时相当于对 arr 的每一列加上 [5, 6, 7]</span>
res <span class="token operator">=</span> arr <span class="token operator">+</span> np<span class="token punctuation">.</span>array<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="迭代数组" tabindex="-1"><a class="header-anchor" href="#迭代数组" aria-hidden="true">#</a> 迭代数组</h3><p>使用 np.nditer([narray]) 可以获取一个用于迭代数组的迭代器, 从而可以不考虑数组的坐标, 按顺序遍历数组中的所有元素, 或用于 for 循环 eg.</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">for</span> x <span class="token keyword">in</span> np<span class="token punctuation">.</span>nditer<span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="迭代时修改元素" tabindex="-1"><a class="header-anchor" href="#迭代时修改元素" aria-hidden="true">#</a> 迭代时修改元素</h4><p>默认得到的迭代器为只读, 如果要在迭代中修改数组的值, 需要指定函数参数 op_flags, 并且使用 x[...] 的方式访问元素的引用, 迭代变量 x 始终是拷贝</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">for</span> x <span class="token keyword">in</span> np<span class="token punctuation">.</span>nditer<span class="token punctuation">(</span>arr<span class="token punctuation">,</span> op_flags<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&#39;readwrite&#39;</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    x<span class="token punctuation">[</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">]</span> <span class="token operator">=</span> x <span class="token operator">+</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="合并迭代" tabindex="-1"><a class="header-anchor" href="#合并迭代" aria-hidden="true">#</a> 合并迭代</h4><p>使用列表传入多个大小相同的数组, 迭代时可同时得到两个在同一位置的元素</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">for</span> x<span class="token punctuation">,</span> y <span class="token keyword">in</span> np<span class="token punctuation">.</span>nditer<span class="token punctuation">(</span><span class="token punctuation">[</span>arr1<span class="token punctuation">,</span> arr2<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>当 arr1 与 arr2 不同时, 将采用广播规则扩展其中一个数组</p><h3 id="修改数组" tabindex="-1"><a class="header-anchor" href="#修改数组" aria-hidden="true">#</a> 修改数组</h3><ol><li>np.reshape(arr, newshape) 修改数组的形状</li><li>ndarray.flat 数组对象的成员, 为一个只读迭代器, 类似 np.nditer()</li><li>np.transpose(arr, axes) <ul><li>交换数组的维度</li><li>axes 为一个整数列表, 表示交换后各个旧维度对应的新维度</li></ul></li><li>ndarray.T 数组对象的成员, 为数组的转置</li><li>np.broadcast_to(array, shape) 使用广播规则扩展数组</li><li>np.concatenate((a1, a2, ...), axis) <ul><li>合并数组</li><li>axis 合并数组的方向, 默认为 0</li><li>注意要用一个包含合并数组的元组作为第一个参数</li></ul></li><li>np.stack(arrays, axis) 堆叠数组, 会产生新的轴</li><li>np.append(arr, values, axis) 向数组末尾添加值, 插入的值必须与原数组匹配, 返回新数组(原数组没有被修改) <ul><li>append 的返回值始终是一维数组, 如果要合并数组使用上方的函数</li></ul></li><li>np.insert(arr, obj, values, axis) <ul><li>obj 插入位置的索引 向数组中插入元素, 如果没有指定 axis, 数组将会被展开成一维, 返回新数组</li></ul></li><li>np.delete(arr, obj, axis) 向数组中删除元素, 如果没有指定 axis, 数组将会被展开成一维, 返回新数组</li><li>np.unique(arr, return_index, return_inverse, return_counts) 查看数组中的重复元素, 或查看重复次数, 参数含义查表</li><li>ndarray.sort() 对数组排序, 返回 None</li></ol><h3 id="视图与副本" tabindex="-1"><a class="header-anchor" href="#视图与副本" aria-hidden="true">#</a> 视图与副本</h3><h4 id="获取视图" tabindex="-1"><a class="header-anchor" href="#获取视图" aria-hidden="true">#</a> 获取视图</h4><p>视图即浅拷贝, 得到的是原始数据的引用, 当改变引用时, 原始数据也将改变, 可通过内置函数 id() 判断是否是同一个引用</p><ul><li>使用 ndarray.view()</li><li>数组间直接赋值</li><li>对数组进行切片索引得到的子数组</li><li><mark>使用 ndarray.T 得到的转置</mark></li></ul><p>eg.</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>b <span class="token operator">=</span> arr<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span>
<span class="token comment"># 此时输出的 id 相同, 如果改变 b[1], arr[0, 1] 同时改变</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">id</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token builtin">id</span><span class="token punctuation">(</span>b<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="获取拷贝" tabindex="-1"><a class="header-anchor" href="#获取拷贝" aria-hidden="true">#</a> 获取拷贝</h4><p>即深拷贝, 数据与原始数据相同, 但储存位置不同</p><ul><li>使用 ndarray.copy()</li><li>数组间运算后的返回值</li><li>数组操作函数返回的修改后的数组</li></ul><h2 id="数学函数" tabindex="-1"><a class="header-anchor" href="#数学函数" aria-hidden="true">#</a> 数学函数</h2><p>操作数组最好使用来自 np 模块的数学函数, 函数将对数组内的每个值分别计算</p><h3 id="三角函数" tabindex="-1"><a class="header-anchor" href="#三角函数" aria-hidden="true">#</a> 三角函数</h3><p>cos, sin, tan, arcsin 等</p><h3 id="舍入函数" tabindex="-1"><a class="header-anchor" href="#舍入函数" aria-hidden="true">#</a> 舍入函数</h3><p>floor, round, ceil 等</p><h3 id="算数函数" tabindex="-1"><a class="header-anchor" href="#算数函数" aria-hidden="true">#</a> 算数函数</h3><p>pow, add, mod, subtract, multiply, divide 等</p><h3 id="统计函数" tabindex="-1"><a class="header-anchor" href="#统计函数" aria-hidden="true">#</a> 统计函数</h3><p>std, var, mean, cov(协方差), median(中位数), ptp(极差), percentile(百分比轴向), amax, amin(轴向极值) 等</p><h3 id="线性代数" tabindex="-1"><a class="header-anchor" href="#线性代数" aria-hidden="true">#</a> 线性代数</h3><p>注意在 numpy 中, 默认向量为行向量</p><h4 id="转置注意" tabindex="-1"><a class="header-anchor" href="#转置注意" aria-hidden="true">#</a> 转置注意</h4><ol><li>使用 ndarray.T 可实现转置, 但是数组的维度必须为 2, 如果仅有单维度则无法转置 eg.</li></ol><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">print</span><span class="token punctuation">(</span>np<span class="token punctuation">.</span>array<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token comment"># 维度为1无法转置</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>np<span class="token punctuation">.</span>array<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token comment"># 维度为2可以转置</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>np<span class="token punctuation">.</span>array<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">,</span> ndim <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token comment"># 维度为2可以转置</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>使用 ndarray.T 得到的转置为原数组的引用, 修改转置后原数组也将改变</li></ol><h4 id="线性代数计算" tabindex="-1"><a class="header-anchor" href="#线性代数计算" aria-hidden="true">#</a> 线性代数计算</h4><ol><li>np.dot() 向量点积</li><li>np.cross() 向量叉乘</li><li>np.matmul() 矩阵乘法 如果是矩阵乘向量, 则结果取决于向量的方向, 可通过 ndarray.T 转置</li><li>numpy.linalg.det() 计算行列式</li><li>numpy.linalg.solve() 求解线性方程</li><li>numpy.linalg.inv() 求解逆矩阵</li><li>nparray @ nparray 向量点乘 / 矩阵乘法运算符</li></ol>`,96),u={href:"https://mathesaurus.sourceforge.net/matlab-numpy.html",target:"_blank",rel:"noopener noreferrer"},d=a(`<h3 id="统计函数-1" tabindex="-1"><a class="header-anchor" href="#统计函数-1" aria-hidden="true">#</a> 统计函数</h3><h4 id="线性回归" tabindex="-1"><a class="header-anchor" href="#线性回归" aria-hidden="true">#</a> 线性回归</h4><ol><li>np.polyfit(x, y, deg) 获取数据的线性回归, deg 为线性回归次数</li></ol><h2 id="数据io" tabindex="-1"><a class="header-anchor" href="#数据io" aria-hidden="true">#</a> 数据IO</h2><h3 id="npy-npz-数据" tabindex="-1"><a class="header-anchor" href="#npy-npz-数据" aria-hidden="true">#</a> npy/npz 数据</h3><ol><li><p>np.save(file, arr)</p><ul><li>将数组以 .npy 的格式保存</li><li>file 为保存文件的路径</li></ul></li><li><p>np.savez(file, *args, **kwds)</p><ul><li>将多个数组以 .npz 的格式保存</li><li>*args 表示多个用于保存的数组</li><li>**kwds 表示保存文件中, 数组的名称 eg.</li></ul></li></ol><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 将数组 c 以名称 c_data 保存, 其余数组使用默认名称 arr_x</span>
np<span class="token punctuation">.</span>savez<span class="token punctuation">(</span><span class="token string">&quot;output.npz&quot;</span><span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> c_data <span class="token operator">=</span> c<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>np.load(file) <ul><li>读取 .npy/.npz 数据</li><li>对于 .npy, 返回读取到的数据数组</li><li>对于 .npz, 返回一个字典, 字典的键为数组的名称, 值为数组</li></ul></li></ol><h3 id="使用-hdf5-格式保存" tabindex="-1"><a class="header-anchor" href="#使用-hdf5-格式保存" aria-hidden="true">#</a> 使用 HDF5 格式保存</h3><p>使用 .hdf5 格式可用于保存复杂, 大量不同格式的数据, 使用库 h5py 操作</p><h4 id="写入数据" tabindex="-1"><a class="header-anchor" href="#写入数据" aria-hidden="true">#</a> 写入数据</h4><ol><li>创建文件 f = h5py.File(name, mode = &#39;w&#39;) <ul><li>name 文件名</li><li>&#39;w&#39; 以写入的方式读取文件</li><li>返回一个 h5py 文件对象</li></ul></li><li>存放 numpy 数组 <ul><li>直接存放 f[键值] = arr</li><li>使用函数 f.create_dataset(名称, data = arr)</li></ul></li></ol><h4 id="读取数据" tabindex="-1"><a class="header-anchor" href="#读取数据" aria-hidden="true">#</a> 读取数据</h4><ol><li><p>打开文件 (可使用此语法捕捉异常) with h5py.File(name, mode = &#39;r&#39;) as f :</p></li><li><p>读取 numpy 数组</p><ul><li>arr = f[键值][:]</li></ul></li></ol>`,14);function k(h,m){const s=p("ExternalLinkIcon");return t(),i("div",null,[r,n("p",null,[n("a",u,[l("Matlab 的函数对应的 numpy 函数"),o(s)])]),d])}const y=e(c,[["render",k],["__file","numpy.html.vue"]]);export{y as default};
