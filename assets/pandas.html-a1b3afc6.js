import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as t,c as p,b as e,d as a,a as o,w as c,e as n}from"./app-8c5ce49e.js";const r={},u=e("h1",{id:"pandas",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#pandas","aria-hidden":"true"},"#"),a(" Pandas")],-1),h={href:"https://pandas.pydata.org/",target:"_blank",rel:"noopener noreferrer"},m=e("p",null,[a("默认以 "),e("code",null,"import pandas as pd"),a(" 的方式导入模块")],-1),_=e("p",null,"主要参考教程",-1),f={href:"https://pandas.pydata.org/docs/user_guide/10min.html",target:"_blank",rel:"noopener noreferrer"},E={href:"https://pandas.pydata.org/docs/user_guide/basics.html",target:"_blank",rel:"noopener noreferrer"},k=n('<p>对于布尔索引, 比较, 统计, 转置等针对数值数据的操作, 建议使用 <a href="#%E5%BF%AB%E9%80%9F%E6%B5%8F%E8%A7%88">dataframe.to_numpy()</a> 转为 Numpy 数组后, 在 Numpy 数组的基础上进行</p><h2 id="数据表创建" tabindex="-1"><a class="header-anchor" href="#数据表创建" aria-hidden="true">#</a> 数据表创建</h2><p>Pandas 中基本的数据结构为序列 <code>pd.Series</code> 与数据表 <code>pd.DataFrame</code></p><ul><li>序列 <code>pd.Series</code> 为一个具有标签的一维数组, 数组可用于储存任意 Python 类型, 但要求同一个数组中的元素具有相同的类型<br> 注意, 序列可以隐式地转换为 Numpy 数组</li><li>数据表 <code>pd.DataFrame</code> 为一个二维的数据结构, 其中保存一个由序列 <code>pd.Series</code> 按列排列成的二维数据表, 数据表的各行可有指定的序号, 各列可有指定的列名</li></ul>',4),B={href:"https://pandas.pydata.org/docs/user_guide/dsintro.html",target:"_blank",rel:"noopener noreferrer"},b=n('<h3 id="创建序列" tabindex="-1"><a class="header-anchor" href="#创建序列" aria-hidden="true">#</a> 创建序列</h3><p><code>pd.Series(data, index = None, *, dtype = None, name = None, copy = None)</code> 通过序列对象的构造函数创建序列</p><ul><li><code>data</code> 序列中的数据, 可以是一维的列表或Numpy 数组以及非嵌套的键值对 (使用键值对时, 将使用键名作为序列的编号, 键值为对应编号的元素)</li><li><code>index</code> 一维的与数据长度相同的数组, 表示序列各个元素的编号, 一般使用字符串数组, 或 <code>None</code> 表示默认的按从 0 开始的数字编号</li><li><code>dtype</code> 序列元素类型, 可使用字符串表示, 默认将自动识别, 具体见<a href="#%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E8%A1%A8%E7%A4%BA">数据类型表示</a></li><li><code>name</code> 序列名称, 一般为字符串, 默认无名称即 <code>None</code></li><li><code>copy</code> 序列是否赋值原数据, 默认为 <code>None</code> 即 <code>False</code>, 序列数据直接引用原数据, 当序列修改时原数据也将修改</li></ul><h3 id="基于二维数组创建数据表" tabindex="-1"><a class="header-anchor" href="#基于二维数组创建数据表" aria-hidden="true">#</a> 基于二维数组创建数据表</h3><p>将数据表视为由二维数组的数据体, 以及两个一维数组的行序号与列标题组成, 有创建数据表方法</p><p><code>pd.DataFrame(data, index = None, columns = None, dtype = None, copy = None)</code></p><ul><li><code>data</code> 数据表中的数据体, 可以是二维的列表或Numpy 数组</li><li><code>index</code> 数据表的行序号, 默认为从 0 开始的数字编号, 可以是任意形式的一维数组</li><li><code>columns</code> 数据表的列标题, 默认为从 0 开始的数字编号, 可以是任意形式的一维数组</li><li><code>dtype</code> 限定<mark>整个数据体</mark>的数据类型, 具体见<a href="#%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E8%A1%A8%E7%A4%BA">数据类型表示</a>, 如果传入 <code>None</code> 则不限制 (即各列的元素类型可以不同)</li><li><code>copy</code> 数据表是否赋值原数据, 与<a href="#%E5%88%9B%E5%BB%BA%E5%BA%8F%E5%88%97">创建序列</a>中的 <code>copy</code> 参数含义相同</li></ul><p>对于行序号与列标题</p>',8),g=e("li",null,[a("可使用 "),e("a",{href:"#%E6%97%B6%E9%97%B4%E6%88%B3%E7%B1%BB%E5%9E%8B"},"pd.date_range"),a(" 创建时间顺序的序号")],-1),y=n('<p>创建例子 <code>pd.DataFrame(np.random.random((3, 3)), pd.date_range(&quot;2024/4/27&quot;, periods = 3, freq = &#39;D&#39;))</code></p><h3 id="基于序列字典创建数据表" tabindex="-1"><a class="header-anchor" href="#基于序列字典创建数据表" aria-hidden="true">#</a> 基于序列字典创建数据表</h3><p>将数据表视为由多个长度相同的<a href="#%E5%88%9B%E5%BB%BA%E5%BA%8F%E5%88%97">序列</a>组合而成, 有创建数据表方法</p><p><code>pd.DataFrame(data, index = None, *, dtype = None, copy = None)</code></p><ul><li><code>data</code> 一个字典, 字典的键名为列标题, 键值为一个单个值 (该列将重复该值) 或任意形式的一维数组 (要求所有传入的一维数组具有相同长度)</li><li><code>index</code> 数据表的行序号, 默认为从 0 开始的数字编号, 可以是任意形式的一维数组</li><li><code>dtype</code> 含义同<a href="#%E5%9F%BA%E4%BA%8E%E4%BA%8C%E7%BB%B4%E6%95%B0%E7%BB%84%E5%88%9B%E5%BB%BA%E6%95%B0%E6%8D%AE%E8%A1%A8">基于二维数组创建数据表</a></li><li><code>copy</code> 含义同<a href="#%E5%9F%BA%E4%BA%8E%E4%BA%8C%E7%BB%B4%E6%95%B0%E7%BB%84%E5%88%9B%E5%BB%BA%E6%95%B0%E6%8D%AE%E8%A1%A8">基于二维数组创建数据表</a></li></ul><p>创建例子 <code>pd.DataFrame({&quot;A&quot;: np.arange(3), &quot;B&quot;: False})</code></p><h2 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h2><p>Pandas 数据结构中的数据类型称为 <code>dtype</code>, 通常在创建数据结构时需要指定, 通过序列的同名成员也可查询序列的数据类型</p><h3 id="数据类型表示" tabindex="-1"><a class="header-anchor" href="#数据类型表示" aria-hidden="true">#</a> 数据类型表示</h3><p>表示数据类型时, 可使用字符串或 Pandas 内定义的类名表示, 常用的有</p><ul><li><code>pd.Int32Dtype</code> 表示 32 位整数 (可使用字符串 <code>Int32</code> 表示)</li><li><code>pd.Float64Dtype</code> 表示 64 位浮点数 (可使用字符串 <code>Float64</code> 表示)</li><li><code>pd.StringDtype</code> 表示字符串类型 (可使用字符串 <code>string</code> 表示)</li><li><code>pd.BooleanDtype</code> 表示布尔值 (可使用字符串 <code>boolean</code> 表示)</li><li><code>pd.CategoricalDtype(categories = None, ordered = None)</code> 表示类别类型 (可使用字符串 <code>categories</code> 表示, 将根据传入数据自动创建)</li><li><code>pd.DatetimeTZDtype(unit = &#39;ns&#39;, tz = None)</code> 表示时间戳类型</li><li><code>pd.PeriodDtype(freq)</code> 表示时间间隔类型</li><li><code>np.object0</code> 表示任意 Python 对象, 如字符串, 当传入一列中包含如字符串等 Python 对象或多种无法转换的数据时将自动使用该类型 (可使用字符串 <code>object</code> 表示)</li></ul>',11),x={href:"https://pandas.pydata.org/docs/user_guide/basics.html#basics-dtypes",target:"_blank",rel:"noopener noreferrer"},A=n('<h3 id="类别类型" tabindex="-1"><a class="header-anchor" href="#类别类型" aria-hidden="true">#</a> 类别类型</h3><p>对于类别类型 <code>pd.CategoricalDtype(categories = None, ordered = None)</code> 类似于枚举类型, 此时元素必须在类别限定的范围内</p><ul><li><code>categories</code> 列表, 表示该类别内允许的取值, 可以是字符串或数字, 如果不指定, 则将根据第一次传入的数据作为限定范围</li><li><code>ordered</code> 各个取值之间是否有先后关系, 默认为 <code>None</code> 即 <code>False</code>, 类别取值之间的关系与列表 <code>categories</code> 中的排序无关</li></ul><p>使用类别类型时注意</p>',4),N=e("li",null,"对于有限取值的数据, 可限定为类别, 既可以对数据进行约束, 也可减少内存占用",-1),q=e("li",null,[a("传入类别类型的数据时, 仅类别内的值能被传入, 类别之外的值将被视为空数据 "),e("code",null,"NaN")],-1),v=e("li",null,[a("对于类别类型对象, 其成员 "),e("code",null,"categories"),a(" 为一个列表, 保存了该类别类型允许的取值范围")],-1),D={href:"https://pandas.pydata.org/docs/user_guide/categorical.html#categoricaldtype",target:"_blank",rel:"noopener noreferrer"},F=e("h3",{id:"时间戳类型",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#时间戳类型","aria-hidden":"true"},"#"),a(" 时间戳类型")],-1),P=e("p",null,[a("对于时间戳类型 "),e("code",null,"pd.DatetimeTZDtype(unit = 'ns', tz = None)"),a(" 其本质为一个整数时间戳, 可以表示为时刻, 可以是现实时刻或相对时刻")],-1),T=e("li",null,[e("code",null,"unit"),a(" 时间戳的单位, 现仅支持 "),e("code",null,"ns"),a(" 纳秒")],-1),C=e("code",null,"tz",-1),j={href:"https://docs.python.org/3/library/zoneinfo.html",target:"_blank",rel:"noopener noreferrer"},w=e("p",null,[a("使用时间戳对象 "),e("code",null,"pd.Timestamp"),a(" 表示该类型的数据")],-1),z=n("<li>时间戳对象有如下常用的构造方法 (插入时间戳数据时, 建议插入具体的时间戳对象) <ul><li><code>pd.Timestamp(value)</code> 中 <code>value</code> 为一个 <code>YYYY-MM-DD hh:mm:ss.ss</code> 的字符串 (较小的单位可以省略)</li><li><code>pd.Timestamp(value, unit)</code> 中 <code>value</code> 为时间值, <code>unit</code> 为时间值的单位, 可参考 <code>pd.PeriodDtype(freq)</code> 的参数 <code>freq</code></li></ul></li><li>使用 <code>pd.to_datetime(...)</code> 可尝试将传入的数据 (字符串或时间戳) 转换为时间戳对象, 可传入列表或序列, 此时将转换其中各个元素</li><li>使用 <code>pd.Timestamp.now()</code> 可获取当前时间的时间戳对象</li><li>通过时间戳对象的成员 <code>second</code>, <code>minute</code>, <code>hour</code>, <code>day</code> 等可访问时间戳的具体时间</li>",4),S=e("code",null,"pd.Timestamp.strftime(format)",-1),I=n("<li>通过时间戳对象相减, 可得到时间间隔对象</li><li>通过函数 <code>pd.date_range(start = None, end = None, periods = None, freq = None)</code> 创建固定间隔的时间戳序列 <ul><li><code>start</code> 开始时间, 可使用时间戳对象或字符串表示</li><li><code>end</code> 序列末端时间, 可使用时间戳对象或字符串表示, 默认包含末端时间</li><li><code>periods</code> 序列长度, 使用数字表示</li><li><code>freq</code> 序列时间间隔, 类似 <code>pd.PeriodDtype(freq)</code> 的参数 <code>freq</code></li><li>只需指定 <code>start</code> 与 <code>end</code>, <code>periods</code>, <code>freq</code> 三个参数中的两个即可生成固定时间间隔的时间戳序列</li></ul></li>",2),L={href:"https://pandas.pydata.org/docs/user_guide/timeseries.html#overview",target:"_blank",rel:"noopener noreferrer"},V=n('<h3 id="时间间隔类型" tabindex="-1"><a class="header-anchor" href="#时间间隔类型" aria-hidden="true">#</a> 时间间隔类型</h3><p>对于时间间隔类型 <code>pd.PeriodDtype(freq)</code> 与时间戳类似, 但时间间隔有最小单位限制, 更多用于记录特定时间间隔</p><ul><li><code>freq</code> 最小时间间隔单位, 使用字符串表示, 常用的有 <ul><li><code>s</code> 秒, <code>ms</code> 毫秒, <code>us</code> 微秒, <code>ns</code> 纳秒</li><li><code>min</code> 分钟, <code>h</code> 小时, <code>D</code> 日</li><li>可使用数字加单位的组合, 此时最小时间间隔为特定的时长</li></ul></li></ul><p>使用时间间隔对象 <code>pd.Period</code> 表示该类型的数据</p>',4),Y=n("<li>时间间隔对象有如下常用的构造方法 <ul><li><code>pd.Period(value, freq)</code> 中 <code>value</code> 含义与 <code>pd.Timestamp(value)</code> 中的参数相同, <code>freq</code> 含义与 <code>pd.PeriodDtype(freq)</code> 中的参数相同</li><li><code>pd.Period(ordinal, freq)</code> 中 <code>ordinal</code> 为时间间隔使用最小时间单位表示的时长</li></ul></li><li>时间间隔对象与整数间加减运算, 将根据最小单位加上会减去对应时间</li>",2),M=e("code",null,"pd.Period.strftime(format)",-1),R=e("li",null,[a("通过函数 "),e("code",null,"pd.period_range(start = None, end = None, periods = None, freq = None)"),a(" 创建固定间隔的时间间隔序列, 函数参数含义与 "),e("code",null,"pd.date_range(...)"),a(" 类似")],-1),Z={href:"https://pandas.pydata.org/docs/user_guide/timeseries.html#timeseries-periods",target:"_blank",rel:"noopener noreferrer"},G=n('<h2 id="数据表统计与查询" tabindex="-1"><a class="header-anchor" href="#数据表统计与查询" aria-hidden="true">#</a> 数据表统计与查询</h2><h3 id="数据表基本信息" tabindex="-1"><a class="header-anchor" href="#数据表基本信息" aria-hidden="true">#</a> 数据表基本信息</h3><p>使用数据表对象 <code>dataframe</code> 的成员变量可用于查询数据表的部分基本信息, 常用的有</p><ul><li><code>dataframe.shape</code> 获取数据表的形状, 值为一个元组 <code>(行数, 列数)</code></li><li><code>dataframe.size</code> 获取数据表的元素总数</li><li><code>dataframe.dtypes</code> 获取数据表中各列的数据类型, 值为一个序列, 序列中的元素为对应列的 <a href="#%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B">dtype</a>, 对应序号为对应列的列名</li><li><code>dataframe.index</code> 获取数据表的行序号, 值为一个不可修改的一维数组, 对应各行序号</li><li><code>dataframe.columns</code> 获取数据表的列标题, 值为一个不可修改的一维数组, 对应各列标题</li></ul><h3 id="快速浏览" tabindex="-1"><a class="header-anchor" href="#快速浏览" aria-hidden="true">#</a> 快速浏览</h3><p>使用数据表对象 <code>dataframe</code> 的以下常用成员方法可用于快速浏览数据表</p><ul><li><code>dataframe.describe()</code> 统计数据表各列, 得到一个与原数据表列相同, 但各行元素为统计值, 行序号为统计方法的数据表 (仅统计数值列)</li><li><code>dataframe.to_numpy()</code> 获取数据表中 Numpy 数组形式的数据体拷贝 (如果各列数据不同, 则得到的 Numpy 数组类型为 <code>np.object0</code>)</li><li><code>dataframe.head(n = 5)</code> 打印数据表前 <code>n</code> 行数据</li><li><code>dataframe.tail(n = 5)</code> 打印数据表后 <code>n</code> 行数据</li></ul><h3 id="数据表排序" tabindex="-1"><a class="header-anchor" href="#数据表排序" aria-hidden="true">#</a> 数据表排序</h3><p>以上浏览函数可配合以下排序函数使用</p><ul><li><code>dataframe.sort_index(*, axis = 0, ascending = True, ignore_index = False, na_position = &#39;last&#39;)</code> 根据行序号或列标题排序 <ul><li><code>axis</code> 排序对象 <ul><li><code>axis = 0</code> 按行序号排序各行</li><li><code>axis = 1</code> 按列标题排序各列</li></ul></li><li><code>ascending</code> 是否按从大到小的方式排序, 默认为 <code>True</code></li><li><code>ignore_index</code> 排序时是否忽略行序号的移动, 默认行序号将随排序移动</li><li><code>na_position</code> 空元素位置, 可取字符串 <code>first</code> 或 <code>last</code>, 默认为 <code>last</code>, 空元素位于最后</li></ul></li><li><code>dataframe.sort_values(by, *, axis = 0, ascending = True, ignore_index = False, na_position = &#39;last&#39;)</code> 根据数据进行排序 <ul><li><code>by</code> 排序参考列的标题 (排序行) 或行的序号 (排序列), 可传入列表, 按顺序包含多个排序参考</li><li>其余参数与 <code>dataframe.sort_index</code> 参数含义相同</li></ul></li></ul><h3 id="数据统计" tabindex="-1"><a class="header-anchor" href="#数据统计" aria-hidden="true">#</a> 数据统计</h3>',11),H={href:"https://pandas.pydata.org/docs/reference/frame.html#computations-descriptive-stats",target:"_blank",rel:"noopener noreferrer"},J=e("br",null,null,-1),K=n('<ul><li><code>dataframe.mean(axis = 0, skipna = True, numeric_only = False)</code> 统计平均值 <ul><li><code>axis</code> 统计对象, 取 <code>0</code> 为按行统计 (统计同一列中元素的平均值), 取 <code>1</code> 为按列统计</li><li><code>skipna</code> 是否排除空数据</li><li><code>numeric_only</code> 是否仅统计以数值为元素的列</li><li>返回值为一个序列, 序列的序号为被统计列的标题, 值为统计值</li><li>类似的还有如下统计函数 <ul><li>最大值 <code>max</code>, 最小值 <code>min</code>, 中位数 <code>median</code>, 总和 <code>sum</code>, 标准差的无偏统计 <code>sem</code>, 标准差 <code>std</code>, 方差 <code>var</code></li><li>分位数 <code>quantile(q, axis, numeric_only)</code>, 参数 <code>q</code> 为分位比, 即一个 0 到 1 的浮点数</li></ul></li></ul></li><li><code>dataframe.value_counts(subset = None, normalize = False, dropna = True)</code> 统计数据表各行数据出现的次数 <ul><li><code>subset</code> 被统计列, 可传入单个列标题, 列标题组成的列表或 <code>None</code> (统计所有列)<br> 仅当统计列上元素相同时才会被统计一次, 因此传入 <code>None</code> 时将用于统计重复行数</li><li><code>normalize</code> 是否标准化, 标准化时将以比例代替频次, 默认为 <code>False</code></li><li><code>dropna</code> 是否抛弃含空数据的行, 默认为 <code>True</code></li><li>返回值为一个序列, 序列的序号为统计的数据组合, 值为该组合的统计值</li></ul></li><li><code>dataframe.count(axis = 0, numeric_only = False)</code> 统计数据表中所有数据均非空的行数 / 列数 <ul><li><code>axis</code> 统计对象, 取 <code>0</code> 为按行统计 (统计各列的非空元素数), 取 <code>1</code> 为按列统计 (统计各行的非空元素数)</li><li><code>numeric_only</code> 是否只统计数值, 跳过非数值</li><li>返回值为一个序列, 序列的序号为被统计列的标题, 值为统计值</li></ul></li><li>对于自定义统计函数可参考 <a href="#%E7%94%A8%E6%88%B7%E5%AE%9A%E4%B9%89%E6%93%8D%E4%BD%9C">dataframe.agg</a></li></ul><h3 id="数据表迭代" tabindex="-1"><a class="header-anchor" href="#数据表迭代" aria-hidden="true">#</a> 数据表迭代</h3>',2),O={href:"https://pandas.pydata.org/docs/user_guide/basics.html#iteration",target:"_blank",rel:"noopener noreferrer"},Q=n('<ul><li>对于纯数值数据推荐使用 <code>to_numpy()</code> 转为 Numpy 数组迭代</li><li>对于自定义遍历统计与修改元素推荐使用<a href="#%E7%94%A8%E6%88%B7%E5%AE%9A%E4%B9%89%E6%93%8D%E4%BD%9C">用户定义操作</a></li><li>使用以下方法迭代数据表时, 迭代量为原始数据表的拷贝, 迭代无效</li></ul><p>Pandas 有以下常用的序列迭代方法</p><ul><li><code>for i in series</code> 直接迭代序列, 此时循环将迭代序列中的值</li><li><code>for index, value in series.items()</code> 迭代序列各元素 <ul><li><code>value</code> 被迭代的序列元素</li><li><code>index</code> 被迭代元素的序号</li></ul></li></ul><p>Pandas 有以下常用的数据表迭代方法</p><ul><li><code>for label, col in dataframe.items()</code> 迭代数据表的各列 <ul><li><code>col</code> 数据表中被迭代的列, 为序列类型</li><li><code>label</code> 被迭代列对应的列标题</li></ul></li><li><code>for row in dataframe.itertuples()</code> 迭代数据表的各行 <ul><li><code>row</code> 数据表中被迭代的行, 为一个以被迭代行的行序号 (为 <code>Index</code> 成员) 以及各列标题为成员的常量数据类</li></ul></li></ul><h2 id="数据表索引" tabindex="-1"><a class="header-anchor" href="#数据表索引" aria-hidden="true">#</a> 数据表索引</h2><p>以下以数据表的索引为主, 但对于序列的索引同理, 区别是仅支持一维</p><h3 id="基本索引" tabindex="-1"><a class="header-anchor" href="#基本索引" aria-hidden="true">#</a> 基本索引</h3><p>对数据表对象使用 <code>[]</code> 运算符, 可进行基本索引</p>',9),U=e("li",null,[e("code",null,"dataframe[title]"),a(" 按列标题索引, 其中 "),e("code",null,"title"),a(" 为被索引列的列标题 "),e("ul",null,[e("li",null,"注意列标题的类型, 当列标题为数字时, 不能使用字符串索引, 相反同理"),e("li",null,[a("该索引将得到该列数据为元素与行序号为序号的"),e("a",{href:"#%E5%88%9B%E5%BB%BA%E5%BA%8F%E5%88%97"},"序列")]),e("li",null,"允许使用传入列标题组成的列表以索引多个列, 得到子数据表")])],-1),W=e("code",null,"dataframe[i : j : k]",-1),X=e("mark",null,"直接索引数据表中的实际行",-1),$=e("li",null,"索引结果为一个由被选中行组成的子数据表 (不保留原始行序号)",-1),ee=e("p",null,"注意, 使用基本索引时",-1),ae=e("ul",null,[e("li",null,"仅传入单个数字将尝试按标题索引列, 而无法索引行"),e("li",null,"除了布尔索引, 更推荐使用以下的索引方式, 而不使用直接索引")],-1),oe=e("h3",{id:"按行列标签索引",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#按行列标签索引","aria-hidden":"true"},"#"),a(" 按行列标签索引")],-1),ne=e("p",null,[a("使用数据表的成员 "),e("code",null,"loc"),a(" 的 "),e("code",null,"[]"),a(" 运算符, 可按实际行序号与列标题索引")],-1),de=e("li",null,[e("code",null,"dataframe.loc[i]"),a(" 索引数据表中行序号为 "),e("code",null,"i"),a(" 的 "),e("code",null,"i"),a(" 行 "),e("ul",null,[e("li",null,"索引结果为一个以列标题为序号, 行内容为元素的序列"),e("li",null,[a("当以行序号为"),e("a",{href:"#%E6%97%B6%E9%97%B4%E6%88%B3%E7%B1%BB%E5%9E%8B"},"时间戳"),a("类型时, 可使用字符串表示时间戳 (表示方法与创建时间戳使用的字符串相同)")])])],-1),le=e("code",null,"dataframe.loc[i : j : k]",-1),ce=e("li",null,[e("code",null,"i"),a(", "),e("code",null,"j"),a(" 为行序号, "),e("code",null,"k"),a(" 为索引间隔")],-1),se=e("code",null,"i",-1),ie=e("code",null,"j",-1),te=e("code",null,"j",-1),pe=e("code",null,"i",-1),re=e("li",null,"索引结果为一个由被选中行组成的子数据表 (保留原始行序号)",-1),ue=n("<li><code>dataframe.loc[list]</code> 数组索引数据表 <ul><li><code>list</code> 为一个由行序号组成的一维列表</li><li>索引结果为一个由被选中行组成的子数据表 (保留原始行序号)</li></ul></li><li><code>dataframe.loc[m, labels]</code> 除了按行索引外, 并指定的结果中包含的列 <ul><li><code>m</code> 即上文索引方式任意一种</li><li><code>labels</code> 索引的列标题或列标题组成的列表</li><li>索引结果为一个由被选中行组成的子数据表, 且仅保留 <code>labels</code> 中指定的列标题的列 (保留原始行序号)</li><li>利用缺省的切片索引, 通过 <code>dataframe.loc[:, labels]</code> 则可以索引数据表中的特定几行</li></ul></li>",2),he=n('<h3 id="按实际位置索引" tabindex="-1"><a class="header-anchor" href="#按实际位置索引" aria-hidden="true">#</a> 按实际位置索引</h3><p>使用数据表的成员 <code>iloc</code> 的 <code>[]</code> 运算符, 可按数据的实际位置索引</p><ul><li><code>dataframe.iloc[a]</code> 按实际位置索引行, 可支持单行, 切片与数组索引, 索引规则与<a href="#%E6%8C%89%E8%A1%8C%E5%88%97%E6%A0%87%E7%AD%BE%E7%B4%A2%E5%BC%95">按行列标签索引</a>类似 <ul><li>以实际位置序号为索引, 从 0 开始编号 (类似 Numpy, 允许使用负数从末端索引)</li><li>切片索引中, 索引序列末端 <code>j</code> 不被包括 (与 Numpy 相同)</li><li>索引结果依然保留原始的行序号信息</li></ul></li><li><code>dataframe.iloc[a, b]</code> 按实际位置索引行与列, 相当于将数据体视为一个二维的 Numpy 数组 <ul><li><code>a</code> 行的索引, 规则与上文类似</li><li><code>b</code> 列的索引, 规则与上文类似, 使用实际列序号进行索引</li><li>当多个数据被索引时, 索引结果依然保留原始的行序号与列标题信息</li><li>当仅有单个数据被索引时, 将得到</li></ul></li></ul><h3 id="修改索引数据" tabindex="-1"><a class="header-anchor" href="#修改索引数据" aria-hidden="true">#</a> 修改索引数据</h3><ul><li>当单个元素被索引时, 如 <code>dataframe.loc[2, &#39;A&#39;]</code><ul><li>可直接使用单个新元素赋值, 此时将使用新元素代替原元素</li></ul></li><li>当多个元素被索引为序列时, 如 <code>dataframe.loc[1 : 2, &#39;A&#39;]</code> 切片索引类或 <code>dataframe.loc[1]</code> 索引单行 <ul><li>可直接使用相同长度数组或序列赋值, 此时将按顺序赋值修改被索引的几个元素</li><li>可以使用单个元素赋值, 此时将修改所有被索引的元素 (无法转换时总是尝试转换为 <code>object</code> 类型)</li></ul></li><li>当行列被切片索引为子数据表时 <ul><li>可直接使用相同形状的二维数组或数据表赋值, 此时将按顺序赋值修改被索引的几个元素</li><li>可以使用单个元素赋值, 此时将修改所有被索引的元素</li></ul></li><li>通过数据表切片索引得到的序列或子数据表均为只读的, 即不能单独修改其中的元素, 只能整体赋值<br> 例如 <code>dataframe.loc[2, &#39;A&#39;] = 1</code> 是允许的, 但 <code>dataframe.loc[2][&#39;A&#39;] = 1</code> 是无效的</li><li>索引修改时注意元素, 应保证赋值的类型之间满足数据表对各列数据类型的约束, 至少也要保证能相互转换, 否则将导致位置后果 (一般为出错, 列类型修改为 <code>object</code> 或被视为空数据)</li><li>对于 <code>dataframe.loc[column]</code> 与 <code>dataframe[label]</code>, 如果索引不存在, 将创建新行或列</li><li>通过索引序列并调用其成员函数修改序列, 则数据表也将被修改</li></ul><h2 id="数据表修改" tabindex="-1"><a class="header-anchor" href="#数据表修改" aria-hidden="true">#</a> 数据表修改</h2><h3 id="数据表插入行与列" tabindex="-1"><a class="header-anchor" href="#数据表插入行与列" aria-hidden="true">#</a> 数据表插入行与列</h3>',7),me=e("br",null,null,-1),_e=e("code",null,"append",-1),fe=e("br",null,null,-1),Ee={href:"https://stackoverflow.com/questions/10715965/create-a-pandas-dataframe-by-appending-one-row-at-a-time",target:"_blank",rel:"noopener noreferrer"},ke=e("p",null,[a("对于多行合并或多列合并可参考"),e("a",{href:"#%E6%95%B0%E6%8D%AE%E8%A1%A8%E5%90%88%E5%B9%B6"},"数据表合并")],-1),Be=e("h3",{id:"数据表合并",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#数据表合并","aria-hidden":"true"},"#"),a(" 数据表合并")],-1),be={href:"https://pandas.pydata.org/docs/user_guide/merging.html#concat",target:"_blank",rel:"noopener noreferrer"},ge=n(`<ul><li><code>pd.contact(frames, *, axis = 0, ignore_index = False)</code> 按行合并 <ul><li><code>frames</code> 按行合并的几个数据表组成的队列</li><li><code>axis</code> 合并方式 <ul><li>取 <code>0</code> 时按行合并, 参与合并的数据表必须具有相同的列标题</li><li>取 <code>1</code> 时按列合并, 参与合并的数据表必须具有相同的行序号</li></ul></li><li><code>ignore_index</code> 是否忽略行序号或列标题 <ul><li>按行合并时, 如果取 <code>False</code> 原始序号将被丢弃, 取 <code>True</code> 必须保证没有重复的行序号</li><li>按列合并时类似</li></ul></li><li>返回值为合并后的数据表</li></ul></li></ul><p>简单合并例子</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 按行合并例子</span>
df1 <span class="token operator">=</span> pd<span class="token punctuation">.</span>DataFrame<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&quot;B&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">21</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
df2 <span class="token operator">=</span> pd<span class="token punctuation">.</span>DataFrame<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">31</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&quot;B&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">41</span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
column_contact <span class="token operator">=</span> pd<span class="token punctuation">.</span>concat<span class="token punctuation">(</span><span class="token punctuation">[</span>df1<span class="token punctuation">,</span> df2<span class="token punctuation">]</span><span class="token punctuation">,</span> ignore_index <span class="token operator">=</span> <span class="token boolean">True</span><span class="token punctuation">,</span> axis <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">)</span>

<span class="token comment"># 按列合并例子</span>
df1 <span class="token operator">=</span> pd<span class="token punctuation">.</span>DataFrame<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;A&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">11</span><span class="token punctuation">,</span> <span class="token number">12</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&quot;B&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">21</span><span class="token punctuation">,</span> <span class="token number">22</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
df2 <span class="token operator">=</span> pd<span class="token punctuation">.</span>DataFrame<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token string">&quot;C&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">31</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">&quot;D&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">41</span><span class="token punctuation">,</span> <span class="token number">42</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
row_contact <span class="token operator">=</span> pd<span class="token punctuation">.</span>concat<span class="token punctuation">(</span><span class="token punctuation">[</span>df1<span class="token punctuation">,</span> df2<span class="token punctuation">]</span><span class="token punctuation">,</span> ignore_index <span class="token operator">=</span> <span class="token boolean">False</span><span class="token punctuation">,</span> axis <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="修改数据表行与列" tabindex="-1"><a class="header-anchor" href="#修改数据表行与列" aria-hidden="true">#</a> 修改数据表行与列</h3>`,4),ye={href:"https://pandas.pydata.org/docs/user_guide/basics.html#reindexing-and-altering-labels",target:"_blank",rel:"noopener noreferrer"},xe=n('<ul><li><code>dataframe.rename(*, column = None, index = None)</code> 修改数据表的列标题或行序号 <ul><li><code>column</code> 数据表列标题修改映射 <ul><li>当传入函数时, 将以原列标题为参数传入函数, 并以函数的返回值作为新列标题</li><li>当传入字典时, 将字典的键匹配行标题, 并以字典的值为新的列标题</li></ul></li><li><code>index</code> 数据表行序号修改映射, 参数行为与 <code>column</code> 类似</li></ul></li><li><code>dataframe.astype(dtype, copy = True)</code> 修改数据表各列的类型 <ul><li><code>dtype</code> 数据表的新类型 <ul><li>传入单个 <a href="#%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E8%A1%A8%E7%A4%BA">dtype</a> 时将修改所有列的类型为指定类型</li><li>传入以列标题为键, <a href="#%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E8%A1%A8%E7%A4%BA">dtype</a> 为值的字典时, 仅修改对应的列的类型</li></ul></li><li><code>copy</code> 是否以返回新数据表的方式修改, 即 <ul><li>取 <code>True</code> 时, 原数据表不会受影响, 而是返回一个新的, 修改后的数据表</li><li>取 <code>False</code> 时, 将在原地修改, 但注意由于<a href="#%E5%9F%BA%E4%BA%8E%E4%BA%8C%E7%BB%B4%E6%95%B0%E7%BB%84%E5%88%9B%E5%BB%BA%E6%95%B0%E6%8D%AE%E8%A1%A8">数据表一般与原数据存在关联</a>, 因此元数据也将受到修改</li></ul></li></ul></li></ul><h2 id="其他数据表基本操作" tabindex="-1"><a class="header-anchor" href="#其他数据表基本操作" aria-hidden="true">#</a> 其他数据表基本操作</h2><h3 id="空数据处理" tabindex="-1"><a class="header-anchor" href="#空数据处理" aria-hidden="true">#</a> 空数据处理</h3><p>在数据表中, 数值类型的空数据取值为 <code>np.nan</code>, 时间类型的空数据取值为 <code>pd.NaT</code>, Python 对象的空数据取值为 <code>pd.NA</code>, <code>None</code> 也会被视为空数据</p><ul><li>在 Pandas 中, 如果希望插入或创建数据表中表示空数据, 推荐使用 <code>None</code> 表示, 此时 Pandas 将根据类型约束自动选择合适的空数据取值且不会影响类型识别</li><li><code>pd.notna(obj)</code> 判断 <code>obj</code> 中的空元素位置 <ul><li><code>obj</code> 用于判断的数据表或序列</li><li>返回值为一个行序号与列标题与原数据表相同的, 但对应位置元素根据原数据是否为空, 取值 (为空时为 <code>False</code>, 不为空时为 <code>True</code>)</li><li>当 <code>obj</code> 为单个值时, 只要属于以上空数据取值之一, 返回 <code>False</code>, 否则返回 <code>True</code></li><li>类似的还有 <code>pd.isna(obj)</code>, 将以使用这两个函数判断空数据</li></ul></li><li><code>dataframe.dropna(*, axis = 0, how = &#39;any&#39;, subset = None)</code> 删除数据表中的空数据 <ul><li><code>axis</code> 操作对象, 取 <code>0</code> 则检查各行, 取 <code>1</code> 则检查各列</li><li><code>how</code> 如何判断为需要删除的空数据, 取 <code>any</code> 则一行中有任一列为空数据就删除, 取 <code>all</code> 则要求一行所有数据均为空才删除</li><li><code>subset</code> 用于判断的列标题, 默认为检查所有列, 可传入列标题组成的列表, 表示仅检查列表中的列</li></ul></li><li><code>dataframe.fillna(value, *, axis = 0)</code> 替换数据表中的空数据 <ul><li><code>value</code> 填充数据 <ul><li>如果传入单个值, 则所有空数据都使用该值填充</li><li>如果传入序列或字典, 则字典键名对应的列使用字典的键值填充 (传入序列类似)</li></ul></li></ul></li></ul><h3 id="用户定义操作" tabindex="-1"><a class="header-anchor" href="#用户定义操作" aria-hidden="true">#</a> 用户定义操作</h3><p>可通过以下 dataframe 的成员函数, 进行自定义的统计与数据遍历</p><ul><li><code>dataframe.aggregate(func, axis = 0)</code> 按行 / 列进行自定义统计 <ul><li><code>func</code> 一个接收序列并返回单个值的函数 <ul><li>由于序列可隐式转换为 Numyp 数组, 因此可直接传入此类函数如 <code>np.mean</code></li><li>可传入一个由函数组成的列表, 此时返回值为一个数据表, 各行为对应函数的运算结果</li></ul></li><li><code>axis</code> 操作对象 <ul><li><code>axis = 0</code> 按行统计, 此时 <code>func</code> 接收为数据表中的整列, 序列的序号为行序号</li><li><code>axis = 1</code> 按列统计, 此时 <code>func</code> 接收为数据表中的整行, 序列的序号为列标题</li></ul></li><li>返回值为一个序列, 按行统计时, 将返回各列的统计结果即函数 <code>func</code> 的返回值</li></ul></li><li><code>dataframe.transform(func, axis = 0)</code> 按行 / 列进行自定义变换 <ul><li><code>func</code> 一个接收序列并返回相同形状序列的函数</li><li><code>axis</code> 操作对象, 与函数 <code>dataframe.agg</code> 的同名参数类似</li><li>返回值为一个新数据表, 按行变换时, 各列的元素与 <code>func</code> 返回的序列有关</li><li>类似的有函数 <code>dataframe.apply()</code>, 该函数将在原地修改数据表, 而不是返回新的数据表</li></ul></li><li><code>dataframe.map(func)</code> 遍历修改数据表的每一各元素 <ul><li><code>func</code> 一个接收单个值并返回单个值的回调函数</li><li>返回值与原数据表的行序号, 列标题相同, 但元素为 <code>func</code> 运算后的返回值</li></ul></li></ul><h3 id="分组统计" tabindex="-1"><a class="header-anchor" href="#分组统计" aria-hidden="true">#</a> 分组统计</h3><p>通过分组统计, 可将数据表特定列中具有相同元素的几行归为一各组别并视为一个子数据表进行统计</p><ul><li><code>dataframe.groupby(by, dropna = True)</code><ul><li><code>by</code> 作为分组依据的列标题, 可传入列标题组成的列表, 此时仅当指定几列的所有均相同时才会被归为一类</li><li><code>dropna</code> 在分组时, 是否将指定列中存在空数据的行抛弃</li><li>返回值为一个分组对象 <code>DataFrameGroupBy</code>, 分组对象无法直接打印, 下文使用 <code>group</code> 表示</li></ul></li></ul><p>以下为分组对象的常用操作</p><ul><li>分组对象可使用类似<a href="#%E5%9F%BA%E6%9C%AC%E7%B4%A2%E5%BC%95">基本索引</a>的方法, 对其余未被分组的列进行索引, 仅统计其中几列</li><li>分组对象可使用<a href="#%E6%95%B0%E6%8D%AE%E7%BB%9F%E8%AE%A1">数据统计</a>中的大部分统计函数进行分组统计 (无法使用 <code>value_counts</code>)</li><li>分组对象可使用 <a href="#%E5%BF%AB%E9%80%9F%E6%B5%8F%E8%A7%88">describe</a> 函数快速浏览各组的统计量</li><li><code>group.get_group(name)</code> 筛选符合分组的行 <ul><li><code>name</code> 组别信息, 对于单列分组传入单个值, 对于多列分组传入多个值组成的元组</li><li>返回一个子数据表, 包含了分组中与 <code>name</code> 条件符合的所有行</li><li>可使用此函数筛选特定几列元素满足要求的行</li></ul></li><li><code>group.size()</code> 统计各分组内的行数, 返回值为一个以组别信息为序号 (对于多列分组时为元组), 各组行数为值的序列</li></ul><h3 id="数据透视表" tabindex="-1"><a class="header-anchor" href="#数据透视表" aria-hidden="true">#</a> 数据透视表</h3><p>数据透视表为一种特殊的表格, 表格的行与列均来自数据表特定列 <code>A</code>, <code>B</code> 中元素的取值, 表格中的元素值也来自数据表的统计列 <code>C</code><br> 对于透视表中位置为 <code>(&quot;foo&quot;, &quot;bar&quot;)</code> 的元素值为所有 <code>A, B</code> 列取值为 <code>(&quot;foo&quot;, &quot;bar&quot;)</code> 的行在列 <code>C</code> 的元素值的平均值</p><p><code>dataframe.pivot_table(values, index, columns)</code> 获取数据透视表</p><ul><li><code>values</code> 统计列的列标题</li><li><code>index</code> 透视表的行序号来自的列, 单个列传入列标题, 多个列分组统计传入列标题组成的列表</li><li><code>column</code> 透视表的列序号来自的列, 单个列传入列标题, 多个列分组统计传入列标题组成的列表</li><li>返回值为一个数据表, 即数据透视表</li></ul><h3 id="数据导入导出" tabindex="-1"><a class="header-anchor" href="#数据导入导出" aria-hidden="true">#</a> 数据导入导出</h3><ul><li>csv 格式 <ul><li><code>dataframe.to_csv(path_or_buf, *, na_rep = &#39;&#39;, float_format = None)</code> 将数据表导出为 csv 格式 <ul><li><code>path_or_buf</code> 保存路径或写入文件对象</li><li><code>na_rep</code> 空数据代替</li><li><code>float_format</code> 浮点数表示格式, 使用转义字符格式如字符串 <code>%.2f</code></li></ul></li><li><code>pd.read_csv(filepath_or_buffer, * names = None)</code> 从 csv 文件导入数据表 <ul><li><code>filepath_or_buffer</code> 文件路径或读取文件对象</li><li><code>names</code> 字符串列表, 表示 csv 中各列的标题, 默认以第一行作为列标题</li></ul></li></ul></li><li>parquet 格式 (开源格式, 具有较高的压缩比) <ul><li><code>dataframe.to_parquet(path)</code> 将数据表导出为 Parquet 格式 <ul><li><code>path</code> 保存路径或写入文件对象</li></ul></li><li><code>pd.read_parquet(path)</code> 从 Parquet 文件导入数据表 <ul><li><code>path</code> 文件路径或读取文件对象</li></ul></li></ul></li><li>excel 格式 <ul><li><code>dataframe.to_excel(excel_writer, *, sheet_name = &#39;Sheet1&#39;, na_rep = &#39;&#39;, float_format = None)</code> 将数据表导出为 Excel 格式 <ul><li><code>excel_writer</code> 保存路径或写入文件对象, 需要带后缀 <code>xlsx</code></li><li><code>sheet_name</code> 导出文件中的子表格名</li><li><code>na_rep</code> 空数据代替</li><li><code>float_format</code> 浮点数表示格式, 使用转义字符格式如字符串 <code>%.2f</code></li></ul></li><li><code>pd.read_parquet(io, sheet_name = 0)</code> 从 Parquet 文件导入数据表 <ul><li><code>io</code> 文件路径或读取文件对象</li><li><code>sheet_name</code> 读取的子表格名或次序</li></ul></li></ul></li></ul>',19);function Ae(Ne,qe){const d=s("ExternalLinkIcon"),l=s("RouterLink");return t(),p("div",null,[u,e("p",null,[e("a",h,[a("https://pandas.pydata.org/"),o(d)])]),m,_,e("ul",null,[e("li",null,[e("a",f,[a("https://pandas.pydata.org/docs/user_guide/10min.html"),o(d)])]),e("li",null,[e("a",E,[a("https://pandas.pydata.org/docs/user_guide/basics.html"),o(d)])])]),k,e("p",null,[a("更多创建方法见 "),e("a",B,[a("https://pandas.pydata.org/docs/user_guide/dsintro.html"),o(d)])]),b,e("ul",null,[e("li",null,[a("可使用 "),o(l,{to:"/coding/py/math/numpy.html#%E7%94%9F%E6%88%90%E7%89%B9%E5%AE%9A%E5%BD%A2%E7%8A%B6%E7%9A%84%E6%95%B0%E7%BB%84"},{default:c(()=>[a("np.arange")]),_:1}),a(" 创建特定顺序的序号")]),g]),y,e("p",null,[a("更多见文档 "),e("a",x,[a("https://pandas.pydata.org/docs/user_guide/basics.html#basics-dtypes"),o(d)])]),A,e("ul",null,[N,q,v,e("li",null,[a("更多可参考类别文档 "),e("a",D,[a("https://pandas.pydata.org/docs/user_guide/categorical.html#categoricaldtype"),o(d)])])]),F,P,e("ul",null,[T,e("li",null,[C,a(" 时区, 可参考 "),e("a",j,[a("https://docs.python.org/3/library/zoneinfo.html"),o(d)])])]),w,e("ul",null,[z,e("li",null,[a("通过时间戳对象成员函数 "),S,a(" 可将时间戳按特定格式转化为字符串, 可参考 "),o(l,{to:"/coding/py/base/module.html#%E6%97%A5%E6%9C%9F%E8%8E%B7%E5%8F%96"},{default:c(()=>[a("time.strftime(format)")]),_:1}),a(" 函数")]),I,e("li",null,[a("更多可参考时间戳文档 "),e("a",L,[a("https://pandas.pydata.org/docs/user_guide/timeseries.html#overview"),o(d)])])]),V,e("ul",null,[Y,e("li",null,[a("通过时间间隔对象成员函数 "),M,a(" 可将时间戳按特定格式转化为字符串, 可参考 "),o(l,{to:"/coding/py/base/module.html#%E6%97%A5%E6%9C%9F%E8%8E%B7%E5%8F%96"},{default:c(()=>[a("time.strftime(format)")]),_:1}),a(" 函数")]),R,e("li",null,[a("跟多可参考时间间隔文档 "),e("a",Z,[a("https://pandas.pydata.org/docs/user_guide/timeseries.html#timeseries-periods"),o(d)])])]),G,e("p",null,[a("对于数据表的统计成员方法可参考文档 "),e("a",H,[a("https://pandas.pydata.org/docs/reference/frame.html#computations-descriptive-stats"),o(d)]),J,a(" 以下仅介绍部分常用统计函数")]),K,e("p",null,[a("注意, 数据表迭代效率极低, 一般不推荐使用, 更多详见 "),e("a",O,[a("https://pandas.pydata.org/docs/user_guide/basics.html#iteration"),o(d)])]),Q,e("ul",null,[U,e("li",null,[W,a(" 按行切片索引, 使用数值切片索引时, 将"),X,a(", 从 0 开始编号, 与行序号无关 "),e("ul",null,[e("li",null,[a("索引规则与 Numpy 数组类似, 可参考 "),o(l,{to:"/coding/py/math/numpy.html#%E5%88%87%E7%89%87%E7%B4%A2%E5%BC%95"},{default:c(()=>[a("Numpy 数组的切片索引")]),_:1})]),$])])]),ee,ae,oe,ne,e("ul",null,[de,e("li",null,[le,a(" 切片索引数据表 "),e("ul",null,[ce,e("li",null,[a("索引规则与 "),o(l,{to:"/coding/py/math/numpy.html#%E5%88%87%E7%89%87%E7%B4%A2%E5%BC%95"},{default:c(()=>[a("Numpy 数组的切片索引")]),_:1}),a("类似, 但 "),se,a(", "),ie,a(" 行都将包括在索引内且行序号 "),te,a(" 对应的实际行必须大于 "),pe]),re])]),ue]),he,e("p",null,[a("对数据表插入行与列的效率并不高, 推荐先使用一个字典或列表保存原始数据, 再转换为数据表"),me,a(" 常用的 "),_e,a(" 方法已经被移除, 此处也不进行介绍"),fe,a(" 更多参考文章 "),e("a",Ee,[a("https://stackoverflow.com/questions/10715965/create-a-pandas-dataframe-by-appending-one-row-at-a-time"),o(d)])]),ke,Be,e("p",null,[a("数据表合并操作较为复杂, 此仅介绍简单的合并, 复杂合并可参考 "),e("a",be,[a("https://pandas.pydata.org/docs/user_guide/merging.html#concat"),o(d)])]),ge,e("p",null,[a("参见 "),e("a",ye,[a("https://pandas.pydata.org/docs/user_guide/basics.html#reindexing-and-altering-labels"),o(d)])]),xe])}const Fe=i(r,[["render",Ae],["__file","pandas.html.vue"]]);export{Fe as default};