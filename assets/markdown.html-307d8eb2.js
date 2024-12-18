import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as d,c as r,b as e,d as a,a as n,e as l}from"./app-8c5ce49e.js";const c={},o=l('<h1 id="markdown的使用" tabindex="-1"><a class="header-anchor" href="#markdown的使用" aria-hidden="true">#</a> Markdown的使用</h1><h2 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用" aria-hidden="true">#</a> 基本使用</h2><h3 id="预览" tabindex="-1"><a class="header-anchor" href="#预览" aria-hidden="true">#</a> 预览</h3><ul><li>在vscode下使用 <kbd>ctrl</kbd>+<kbd>k</kbd>+<kbd>v</kbd></li><li>在预览页右键选择导出与格式</li></ul><h3 id="标题" tabindex="-1"><a class="header-anchor" href="#标题" aria-hidden="true">#</a> 标题</h3><ul><li>在标题前使用#(要有空格)</li><li>在标题下一行使用=</li></ul><h3 id="格式" tabindex="-1"><a class="header-anchor" href="#格式" aria-hidden="true">#</a> 格式</h3><ul><li>一个空行表示一个段落，或在段落结尾加两个空格</li><li>斜体字 将使用斜体的文字用*或_包括 如 <em>斜体</em></li><li>粗体字 使用两个*或_ 如 <strong>粗体</strong></li><li>粗斜体字 使用三个*或_ 如 <em><strong>粗斜体</strong></em></li><li>分割线 在一行中使用三个以上星号*、减号-、底线_，不能有其他内容</li><li>删除线 使用两个~包括文字 如 <s>删除线</s></li><li>下划线 使用html符号<u></u>实现 如<u>下划线</u></li><li>方框 使用两个 ` 包括文集 如 <code>方框</code>, 当需要输入含 ` 的内容时, 需要两个 `, 并以空格分隔内容</li><li>脚注 使用[^脚注名]，并在末尾加上解释写法同，但要有冒号空格并加上内容 如<a href="123">^脚注</a></li></ul><h3 id="列表" tabindex="-1"><a class="header-anchor" href="#列表" aria-hidden="true">#</a> 列表</h3><ul><li>无序列表使用-或*或+</li><li>有序列表使用数字加.</li><li>列表嵌套只需在子列表中的选项前面添加四个空格即可</li><li>任务列表- [x] 与- [ ]，如</li></ul><ul class="task-list-container"><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-0" checked="checked" disabled="disabled"><label class="task-list-item-label" for="task-item-0"> 完成</label></li><li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" id="task-item-1" disabled="disabled"><label class="task-list-item-label" for="task-item-1"> 未完成</label></li></ul><h3 id="区块-引用" tabindex="-1"><a class="header-anchor" href="#区块-引用" aria-hidden="true">#</a> 区块(引用)</h3><ul><li>使用&gt;表示列表</li><li>区块可以嵌套，多个&gt;之间加空格</li><li>在列表中使用时需要在前面添加四个空格</li></ul><h3 id="代码" tabindex="-1"><a class="header-anchor" href="#代码" aria-hidden="true">#</a> 代码</h3><ul><li>使用`将代码包裹</li><li>使用三个`将代码包裹并在第一个前加上语言实现高亮，如</li><li>添加 {.line-numbers} 使代码显示行数 (默认存在)</li><li>添加 {highlight=n-m} 属性的方式来高亮代码行数(与行数显示冲突)</li></ul><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="line-numbers language-cpp"><code>    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span>\n    <span class="token punctuation">{</span>\n        i<span class="token operator">--</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="引用" tabindex="-1"><a class="header-anchor" href="#引用" aria-hidden="true">#</a> 引用</h3>',17),h={href:"https://www.baidu.com",target:"_blank",rel:"noopener noreferrer"},u={href:"https://www.baidu.com",target:"_blank",rel:"noopener noreferrer"},b=e("li",null,"使用图片 ![alt 属性文本](图片地址)",-1),p=l(`<h3 id="转义符号" tabindex="-1"><a class="header-anchor" href="#转义符号" aria-hidden="true">#</a> 转义符号</h3><ul><li>使用\\转义，下面为可用的转义符号</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>\\   反斜线
\`   反引号
*   星号
_   下划线
{}  花括号
[]  方括号
()  小括号
#   井字号
+   加号
-   减号
.   英文句点
!   感叹号
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="其他格式" tabindex="-1"><a class="header-anchor" href="#其他格式" aria-hidden="true">#</a> 其他格式</h3><ul><li>上标 将上标内容使用^包括 如 20<sup>th</sup></li><li>下标 将下标内容使用~包括 如 H<sub>2</sub>O</li><li>标记 将标记内容使用两个=包括 如<mark>marked</mark></li></ul><h3 id="基本表格" tabindex="-1"><a class="header-anchor" href="#基本表格" aria-hidden="true">#</a> 基本表格</h3><ol><li>行首 | 第一列 | 第二列 | ... |</li><li>分割(位于行首下, 每有一列就要一个) |--|--| ... |</li><li>横向扩展 空行, 或左侧 &gt;</li><li>纵向扩展 底下一行 ^, 使用 &lt;br&gt; 换行</li></ol><p>eg.</p><table><thead><tr><th>第一行</th><th>第二行</th><th>第三行</th></tr></thead><tbody><tr><td>A</td><td>B</td><td>C</td></tr><tr><td>horizon<br>next</td><td>congratulations</td><td></td></tr><tr><td>^</td><td>&gt;</td><td>abandoned</td></tr></tbody></table><h3 id="插入键盘图标" tabindex="-1"><a class="header-anchor" href="#插入键盘图标" aria-hidden="true">#</a> 插入键盘图标</h3><p>使用 &lt;kbd&gt;&lt;/kbd&gt; 包裹按键名称 eg. <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>V</kbd></p><h3 id="其他说明" tabindex="-1"><a class="header-anchor" href="#其他说明" aria-hidden="true">#</a> 其他说明</h3>`,12),k={href:"https://shd101wyy.github.io/markdown-preview-enhanced/#/zh-cn/",target:"_blank",rel:"noopener noreferrer"};function m(v,_){const i=s("ExternalLinkIcon");return d(),r("div",null,[o,e("ul",null,[e("li",null,[a("使用连接方法 [链接名称](链接地址)，如 "),e("a",h,[a("链接名称"),n(i)])]),e("li",null,[a("直接使用链接地址<地址>，如 "),e("a",u,[a("https://www.baidu.com"),n(i)])]),b]),p,e("p",null,[e("a",k,[a("https://shd101wyy.github.io/markdown-preview-enhanced/#/zh-cn/"),n(i)])])])}const g=t(c,[["render",m],["__file","markdown.html.vue"]]);export{g as default};