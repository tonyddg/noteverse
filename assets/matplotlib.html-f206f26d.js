import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as r,c as o,b as a,d as e,a as l,e as n}from"./app-8c5ce49e.js";const d="/noteverse/assets/anatomy-06caf29e.webp",h={},c=n(`<h1 id="绘图" tabindex="-1"><a class="header-anchor" href="#绘图" aria-hidden="true">#</a> 绘图</h1><p>绘图采用 matplotlib.pyplot 库, 通常将其取别名为 plt</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> matplotlib<span class="token punctuation">.</span>pyplot <span class="token keyword">as</span> plt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="图像成分" tabindex="-1"><a class="header-anchor" href="#图像成分" aria-hidden="true">#</a> 图像成分</h2><figure><img src="`+d+`" alt="" tabindex="0"><figcaption></figcaption></figure><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token comment"># 创建 figure 与 axe</span>
fig<span class="token punctuation">,</span> ax <span class="token operator">=</span> plt<span class="token punctuation">.</span>subplot<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment"># 在 axe 上绘图</span>
ax<span class="token punctuation">.</span>plot<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>通过调用图像成分的成员函数, 实现对图像的操作</li><li>操作图像时, 成员函数的命名规则为 set/get_xxx, xxx 为图像元素名</li></ul><h3 id="figure" tabindex="-1"><a class="header-anchor" href="#figure" aria-hidden="true">#</a> Figure</h3><p>绘图区域, 一个 Figure 即一张图片</p><h3 id="axe" tabindex="-1"><a class="header-anchor" href="#axe" aria-hidden="true">#</a> Axe</h3><p>在 Figure 上的图像, 一个 Figure 上可以有多个图像, 同样一个 Axe 内可以有多个图形</p><h3 id="axis" tabindex="-1"><a class="header-anchor" href="#axis" aria-hidden="true">#</a> Axis</h3><p>图像的坐标轴, 作为图像的成员存在, 包含 x, y 两个轴</p><h3 id="artist" tabindex="-1"><a class="header-anchor" href="#artist" aria-hidden="true">#</a> Artist</h3><p>在 Figure 上的图像元素称为 Artist, 除了 Axe, Axis 外, 还包括文字, 线条等</p><h2 id="创建图像" tabindex="-1"><a class="header-anchor" href="#创建图像" aria-hidden="true">#</a> 创建图像</h2><h3 id="创建-axe" tabindex="-1"><a class="header-anchor" href="#创建-axe" aria-hidden="true">#</a> 创建 Axe</h3><p>使用 fig, axes = plt.subplots(x, y) 创建图像 其中 fig 为 Figure 对象, axes 为 Axe 对象数组(如果仅有一个 axe, 则为 Axe 对象), 如果 y != None, 则为二维数组</p><h2 id="曲线图" tabindex="-1"><a class="header-anchor" href="#曲线图" aria-hidden="true">#</a> 曲线图</h2><h3 id="绘制曲线" tabindex="-1"><a class="header-anchor" href="#绘制曲线" aria-hidden="true">#</a> 绘制曲线</h3><p>lines = axe.plot(x1, y1, x2, y2, ...)</p><ol><li>根据输入的 x, y 坐标绘制曲线</li><li>x1 第一条曲线的 x 坐标</li><li>y1 第二条曲线的 y 坐标</li><li>返回 Line_2D 对象的列表, 对应多条曲线的属性</li></ol><h3 id="曲线点标记-marker" tabindex="-1"><a class="header-anchor" href="#曲线点标记-marker" aria-hidden="true">#</a> 曲线点标记 marker</h3><p>使用一个字符来表示标记, 常用标记</p>`,24),p=a("thead",null,[a("tr",null,[a("th",null,"字符"),a("th",null,"形状")])],-1),u=a("tr",null,[a("td",null,","),a("td",null,"无标记(像素点)")],-1),m=a("tr",null,[a("td",null,"o"),a("td",null,"圆形")],-1),x=a("tr",null,[a("td",null,"s"),a("td",null,"正方形")],-1),b=a("tr",null,[a("td",null,"d"),a("td",null,"菱形")],-1),f={href:"https://www.runoob.com/matplotlib/matplotlib-marker.html",target:"_blank",rel:"noopener noreferrer"},g=a("td",null,null,-1),_=n('<h3 id="线条样式-linestyle" tabindex="-1"><a class="header-anchor" href="#线条样式-linestyle" aria-hidden="true">#</a> 线条样式 linestyle</h3><p>使用一个字符来表示线条样式</p><table><thead><tr><th>字符</th><th>样式</th></tr></thead><tbody><tr><td>-</td><td>横线</td></tr><tr><td>:</td><td>虚线</td></tr><tr><td>--</td><td>破折线</td></tr><tr><td>-.</td><td>点划线</td></tr></tbody></table><h3 id="线条颜色-color" tabindex="-1"><a class="header-anchor" href="#线条颜色-color" aria-hidden="true">#</a> 线条颜色 color</h3><p>使用颜色英文的第一个字符来表示线条颜色 也可使用 &quot;#RRGGBB&quot; 来表示颜色</p><h2 id="散点图" tabindex="-1"><a class="header-anchor" href="#散点图" aria-hidden="true">#</a> 散点图</h2><h3 id="绘制散点图" tabindex="-1"><a class="header-anchor" href="#绘制散点图" aria-hidden="true">#</a> 绘制散点图</h3><p>scatter = axe.scatter(x, y, s=None, c=None)</p><ol><li>x 散点的 x 坐标</li><li>y 散点的 y 坐标</li><li>s 各个散点的大小, 大小与坐标轴无关</li><li>c 使用 0 - 100 表示各个散点的颜色, 与 cmap 有关</li></ol><h3 id="散点颜色条-cmap" tabindex="-1"><a class="header-anchor" href="#散点颜色条-cmap" aria-hidden="true">#</a> 散点颜色条 cmap</h3>',10),k={href:"https://www.runoob.com/matplotlib/matplotlib-scatter.html",target:"_blank",rel:"noopener noreferrer"},y=n('<h2 id="其他图形" tabindex="-1"><a class="header-anchor" href="#其他图形" aria-hidden="true">#</a> 其他图形</h2><h3 id="绘制柱状图" tabindex="-1"><a class="header-anchor" href="#绘制柱状图" aria-hidden="true">#</a> 绘制柱状图</h3><p>axe.bar(x, height, width=0.8, bottom=None, *, align=&#39;center&#39;, color = None)</p><ol><li>x 柱状图的 x 标签, 可以是数据/字符串数组</li><li>height 各个柱条的高度</li><li>width 柱条的宽度, 长度与 x 轴有关</li><li>bottom 底部的 y 坐标</li><li>align 对齐方式</li><li>color 各个柱条的颜色, 颜色表示规则同曲线</li></ol><h4 id="柱状图绘制技巧" tabindex="-1"><a class="header-anchor" href="#柱状图绘制技巧" aria-hidden="true">#</a> 柱状图绘制技巧</h4><p>可以在一个 axe 内绘制多个柱状图, 实现复杂柱状图</p><ol><li><p>多层柱状图</p><ul><li>绘制多张图时, 最先调用的函数最后绘制</li><li>先绘制高度为 y1 + y2 的柱状图</li><li>再绘制高度为 y1 的柱状图</li></ul></li><li><p>分组柱状图</p><ul><li>x 坐标先设为 t - width / 2 绘制左侧柱条</li><li>再设为 t + width / 2 绘制右侧柱条</li></ul></li><li><p>水平柱状图 使用函数 barh 绘制水平柱状图</p></li></ol><h3 id="绘制饼状图" tabindex="-1"><a class="header-anchor" href="#绘制饼状图" aria-hidden="true">#</a> 绘制饼状图</h3><h2 id="绘制图形" tabindex="-1"><a class="header-anchor" href="#绘制图形" aria-hidden="true">#</a> 绘制图形</h2><h3 id="值线" tabindex="-1"><a class="header-anchor" href="#值线" aria-hidden="true">#</a> 值线</h3><ol><li>绘制水平线 axe.axhline</li><li>绘制竖直线 axe.axvline</li><li>绘制直线 axe.axline</li></ol><h2 id="图形设置" tabindex="-1"><a class="header-anchor" href="#图形设置" aria-hidden="true">#</a> 图形设置</h2><h3 id="坐标轴比例" tabindex="-1"><a class="header-anchor" href="#坐标轴比例" aria-hidden="true">#</a> 坐标轴比例</h3><p>axe.set_aspect()</p><ul><li>参数 &quot;equal&quot; 表示 x, y 轴等长</li><li>参数 &quot;auto&quot; 表示自动设置</li></ul><h3 id="设置-legend" tabindex="-1"><a class="header-anchor" href="#设置-legend" aria-hidden="true">#</a> 设置 Legend</h3><p>axe.legend(字符串数组)</p><ul><li>通过字符串数组设置各条曲线的 legend, 而不是传入多个字符串</li></ul><h3 id="通用子图像设置" tabindex="-1"><a class="header-anchor" href="#通用子图像设置" aria-hidden="true">#</a> 通用子图像设置</h3><p>fig, axes = plt.subplots(x, y, layout=&quot;constrained&quot;)</p>',20),w=a("ul",null,[a("li",null,[e("创建 "),a("span",{class:"katex"},[a("span",{class:"katex-mathml"},[a("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[a("semantics",null,[a("mrow",null,[a("mi",null,"x"),a("mo",null,"×"),a("mi",null,"y")]),a("annotation",{encoding:"application/x-tex"},"x\\times y")])])]),a("span",{class:"katex-html","aria-hidden":"true"},[a("span",{class:"base"},[a("span",{class:"strut",style:{height:"0.6667em","vertical-align":"-0.0833em"}}),a("span",{class:"mord mathnormal"},"x"),a("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),a("span",{class:"mbin"},"×"),a("span",{class:"mspace",style:{"margin-right":"0.2222em"}})]),a("span",{class:"base"},[a("span",{class:"strut",style:{height:"0.625em","vertical-align":"-0.1944em"}}),a("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"y")])])]),e(" 的子图像")]),a("li",null,'需要设置参数 layout="constrained" 保证子图像合理排列'),a("li",null,[e("返回值 axes 为一个 "),a("span",{class:"katex"},[a("span",{class:"katex-mathml"},[a("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[a("semantics",null,[a("mrow",null,[a("mi",null,"x")]),a("annotation",{encoding:"application/x-tex"},"x")])])]),a("span",{class:"katex-html","aria-hidden":"true"},[a("span",{class:"base"},[a("span",{class:"strut",style:{height:"0.4306em"}}),a("span",{class:"mord mathnormal"},"x")])])]),e(" 行 "),a("span",{class:"katex"},[a("span",{class:"katex-mathml"},[a("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[a("semantics",null,[a("mrow",null,[a("mi",null,"y")]),a("annotation",{encoding:"application/x-tex"},"y")])])]),a("span",{class:"katex-html","aria-hidden":"true"},[a("span",{class:"base"},[a("span",{class:"strut",style:{height:"0.625em","vertical-align":"-0.1944em"}}),a("span",{class:"mord mathnormal",style:{"margin-right":"0.03588em"}},"y")])])]),e(" 列的数组, 包含了各个子图像")])],-1),v=n('<h3 id="快速子图像设置" tabindex="-1"><a class="header-anchor" href="#快速子图像设置" aria-hidden="true">#</a> 快速子图像设置</h3><p>axe = plt.subplot(x, y, n)</p><ul><li>用于快速创建子图像</li><li>n 为子图像的索引, 需要从 1 开始计</li></ul><h2 id="用户设置" tabindex="-1"><a class="header-anchor" href="#用户设置" aria-hidden="true">#</a> 用户设置</h2><h3 id="中文显示" tabindex="-1"><a class="header-anchor" href="#中文显示" aria-hidden="true">#</a> 中文显示</h3>',5),q={href:"https://zhuanlan.zhihu.com/p/52779214?from_voters_page=true",target:"_blank",rel:"noopener noreferrer"},A=n("<ol><li>打开路径 <code>.../anaconda3/envs/[python 环境名]/Lib/site-packages/matplotlib/mpl-data</code></li><li>将 <code>simhei.ttf</code>, <code>arial.ttf</code> 放入路径下的 <code>fonts/ttf</code> 文件夹 (通常可在 <code>C:/windows/Fonts</code> 中找到)</li><li>将路径下的 <code>matplotlibrc</code> 文件复制到 <code>C:\\用户\\[用户名]\\.matplotlib\\matplotlibrc</code> (Windows), <code>$HOME/.config/matplotlib/matplotlibrc</code> (Linux)</li><li>打开复制后的文件 <ol><li><code>font.family</code> 删除该选项前的 <code>#</code></li><li><code>font.sans-serif</code> 删除该选项前的 <code>#</code>, 在冒号后添加 <code>simhei</code></li><li><code>axes.unicode_minus</code> 删除该选项前的 <code>#</code>, 将值改为 <code>False</code></li></ol></li></ol>",1);function M(L,N){const t=i("ExternalLinkIcon");return r(),o("div",null,[c,a("table",null,[p,a("tbody",null,[u,m,x,b,a("tr",null,[a("td",null,[a("a",f,[e("其他标记"),l(t)])]),g])])]),_,a("p",null,[e("根据 c 的取值与颜色条的类型决定散点的颜色, 使用字符串表示, 具体见 "),a("a",k,[e("cmap样式"),l(t)])]),y,w,v,a("blockquote",null,[a("p",null,[e("参考文章 "),a("a",q,[e("https://zhuanlan.zhihu.com/p/52779214?from_voters_page=true"),l(t)])])]),A])}const z=s(h,[["render",M],["__file","matplotlib.html.vue"]]);export{z as default};
