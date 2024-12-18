import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as r,c as h,b as e,d as o,a as c,e as l}from"./app-8c5ce49e.js";const n={},t=e("h1",{id:"正则表达式笔记",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#正则表达式笔记","aria-hidden":"true"},"#"),o(" 正则表达式笔记")],-1),s={href:"https://www.runoob.com/regexp/regexp-tutorial.html",target:"_blank",rel:"noopener noreferrer"},u=l('<p>正则表达式通常用于表示满足特定规则的字符串, 因此可用于匹配文本内容, 并从中提取信息</p><h2 id="正则表达式基本内容" tabindex="-1"><a class="header-anchor" href="#正则表达式基本内容" aria-hidden="true">#</a> 正则表达式基本内容</h2><h3 id="普通字符" tabindex="-1"><a class="header-anchor" href="#普通字符" aria-hidden="true">#</a> 普通字符</h3><p>正则表达式中, 认为数字, 字母, unicode 文字以及非<a href="#%E5%85%83%E5%AD%97%E7%AC%A6">元字符</a>的符号为普通字符<br> 对于表达式中的普通字符, 表现与一般的字符串匹配相同, 仅当文本的<mark>字符以及相对位置</mark>与其相同才能通过匹配</p><h3 id="转义字符" tabindex="-1"><a class="header-anchor" href="#转义字符" aria-hidden="true">#</a> 转义字符</h3><p>与一般格式化字符串相同, 正则表达式中可通过转义符 <code>\\</code> 加内容表示特殊字符</p><p>通常可用于与<a href="#%E5%85%83%E5%AD%97%E7%AC%A6">元字符</a>组合, 表示其原本代表的字符</p><p>此外还可用于表示非打印字符, 常用的有</p><ul><li><code>\\n</code> 匹配换行符</li><li><code>\\t</code> 匹配制表符</li><li><code>\\xNN</code> 匹配 ASCII 字符, 其中 <code>XX</code> 为字符的十六进制编码</li><li><code>\\uNNNN</code> 匹配 Unicode 字符, 其中 <code>XXXX</code> 为字符的十六进制编码</li></ul><h3 id="元字符" tabindex="-1"><a class="header-anchor" href="#元字符" aria-hidden="true">#</a> 元字符</h3><p>正则表达式中主要包含如下元字符, 这些元字符都具有特殊含义, 需要通过 <code>\\</code> <a href="#%E8%BD%AC%E4%B9%89%E5%AD%97%E7%AC%A6">转义</a>才能表示原本代表的字符</p><ul><li><code>$, ^</code> 作为<a href="#%E5%AD%97%E7%AC%A6%E7%B1%BB">定位字符</a></li><li><code>(, )</code> 用于<a href="#%E5%86%85%E5%AE%B9%E6%8F%90%E5%8F%96">内容提取</a></li><li><code>*, +, ?, {, }</code> 用于<a href="#%E9%87%8D%E5%A4%8D%E9%99%90%E5%AE%9A">重复限定</a></li><li><code>[, ], -</code> 用于<a href="#%E5%AD%97%E7%AC%A6%E7%B1%BB">字符类</a></li><li><code>\\, |, .</code> 其他用途</li></ul><p>虽然部分情况下直接使用元字符是合法的, 但为了避免歧义, <mark>建议表示任意元字符时都需要转义</mark></p><h3 id="字符类" tabindex="-1"><a class="header-anchor" href="#字符类" aria-hidden="true">#</a> 字符类</h3><p>普通字符只能表示一个位置的一个字符, 可通过字符类表示字符, 此时该位置能够使用一类字符匹配<br> 如果希望匹配一类特定特征的字符串, 应使用<a href="#%E6%88%96%E8%BF%90%E7%AE%97">或运算</a></p><p>内置字符类</p><ul><li>以 <code>\\&lt;内容&gt;</code> 表示一类相同性质的字符, 常用的有 <ul><li><code>\\w</code> 所有字母, 数字, 下划线, <code>\\W</code> 则取反</li><li><code>\\d</code> 表示所有数字, <code>\\D</code> 则取反</li><li><code>\\s</code> 表示所有空格, 换行等空白字符, <code>\\S</code> 则取反</li></ul></li><li>以元字符或 <code>\\&lt;内容&gt;</code> 表示特殊位置, 不能被<a href="#%E9%87%8D%E5%A4%8D%E9%99%90%E5%AE%9A">重复限定</a>修饰 <ul><li><code>$</code> 文本内容的结尾位置, <mark>不匹配具体字符</mark></li><li><code>^</code> 文本内容的起始位置, <mark>不匹配具体字符</mark>, 例如 <code>^...$</code> 将使用整个文本内容进行匹配</li><li><code>\\b</code> 表示与单词相邻的空格或边界, 例如 <code>\\b\\w+\\b</code> 将匹配所有单词</li><li><code>\\B</code> 表示不与空格相邻的单词, 例如 <code>er\\B</code> 可以匹配 <code>verb</code> 中的 <code>erb</code></li></ul></li><li>元字符 <code>.</code> 表示除换行 <code>\\n</code> 外的所有字符</li></ul><p>自定义字符类</p><ul><li>通过 <code>[]</code> 包裹一系列<a href="#%E6%99%AE%E9%80%9A%E5%AD%97%E7%AC%A6">普通字符</a>或内置字符类, 此时该位置可以匹配其中的任意一个字符 <ul><li>例如 <code>[123]</code> 可以匹配 <code>1, 2, 3</code> 三个字符中任意一个</li></ul></li><li>当出现 <code>^</code> 时, 将表示取反, 即该位置可以匹配除其中出现字符外的任意字符 <ul><li>例如 <code>[^123]</code> 可以匹配除 <code>1, 2, 3</code> 外的任意字符</li></ul></li><li>对于在编号上连续的一系列 ASCII 或 unicode 字符, 可通过 <code>-</code> 连接首尾表示 <ul><li>例如 <code>[0-9]</code> 匹配所有数字, <code>[a-z]</code> 匹配所有小写字母</li><li>例如 <code>[!-/ :-@ \\[-` {-~]</code> 匹配空格与所有 ASCII 符号 (注意分了四段, 存在空格是为了方便观察, 如果仅匹配符号可删去)</li></ul></li></ul><h3 id="重复限定" tabindex="-1"><a class="header-anchor" href="#重复限定" aria-hidden="true">#</a> 重复限定</h3><p>重复限定是一种修饰, 用于修饰其左侧最邻近的包括<a href="#%E5%AD%97%E7%AC%A6%E7%B1%BB">字符类</a>在内的任意字符</p><ul><li><code>{n}</code> 必须重复匹配 <code>n</code> 次, 例如 <code>o{2}</code> 与 <code>oo</code> 匹配</li><li><code>{n,}</code> 至少匹配 <code>n</code> 次, 例如 <code>o{2,}</code> 与 <code>ooo</code> 匹配, 但与 <code>o</code> 不匹配</li><li><code>{n,m}</code> 至少匹配 <code>n</code> 次, 但最多匹配 <code>m</code> 次</li><li>元字符 <code>*</code>, 匹配零次或多次, 等价于 <code>{0,}</code></li><li>元字符 <code>+</code>, 匹配一次或多次, 等价于 <code>{1,}</code></li><li>元字符 <code>?</code>, 匹配零次或一次, 等价于 <code>{0,1}</code></li></ul><p>在重复限定中, 正则表达式总是遵守让左侧的字符匹配尽可能多次的原则, 即贪婪原则</p><h3 id="内容选择" tabindex="-1"><a class="header-anchor" href="#内容选择" aria-hidden="true">#</a> 内容选择</h3><p>通过 <code>()</code> 包裹任意正则表达式, 可以表示</p><ul><li>对被包裹正则表达式匹配内容的选择</li><li>表示一类满足被包裹正则表达式的子字符串</li></ul><h4 id="或运算" tabindex="-1"><a class="header-anchor" href="#或运算" aria-hidden="true">#</a> 或运算</h4><ul><li>通过 <code>|</code> 连接两个正则表达式可用于表示匹配任意一个表达式, 且以左侧的表达式优先 <ul><li>例如表达式 <code>(\\d+|\\w+)</code> 匹配字符串 <code>12A</code> 时, 将分别匹配 <code>12</code> 与 <code>A</code></li></ul></li><li>或运算通常与内容选择混合使用, 以此表示部分位置的或运算 <ul><li>例如表达式 <code>(fi|da|ba)sh</code> 可与字符串 <code>fish</code>, <code>dash</code>, <code>bash</code> 匹配</li></ul></li></ul><h4 id="重复内容选择" tabindex="-1"><a class="header-anchor" href="#重复内容选择" aria-hidden="true">#</a> 重复内容选择</h4><p>内容选择也可以配合<a href="#%E9%87%8D%E5%A4%8D%E9%99%90%E5%AE%9A">重复限定</a>使用, 表示重复出现的一类子字符串</p><ul><li>通过 <code>(...)?</code> 可用于表示该子字符串允许出现一次或不出现</li></ul><h4 id="提取选择内容" tabindex="-1"><a class="header-anchor" href="#提取选择内容" aria-hidden="true">#</a> 提取选择内容</h4><p>在使用正则表达式的字符串替换功能时, 还可在替换字符串中使用 <code>$n</code> 表示选择内容, 实现选择内容的提取</p><ul><li><code>n</code> 为提取第 <code>n</code> 个选择内容, 从 <code>1</code> 开始索引</li><li>只有最外层的内容选择能被提取, 嵌套在内部的不能被提取 <ul><li>例如 <code>((da|fi)sh)er</code> 匹配字符串 <code>fisher</code> 时, <code>$1</code> 提取到的是 <code>fish</code></li></ul></li><li>对于<a href="#%E9%87%8D%E5%A4%8D%E5%86%85%E5%AE%B9%E9%80%89%E6%8B%A9">重复内容选择</a>, 只会提取最右侧的选择内容, 如果内容提取则为空 <ul><li>例如 <code>(\\d+A)+</code> 匹配字符串 <code>12A24A</code> 时, <code>$1</code> 提取到的是 <code>24A</code></li><li>例如 <code>(\\d{3})?\\w</code> 匹配字符串 <code>A</code> 时, <code>$1</code> 提取到的是空</li></ul></li><li>当使用 <code>(?:)</code> 表示内容选择时, 即将 <code>?:</code> 添加在正则表达式前修饰选择, 不会提取此处选择的内容 <ul><li>类似的<a href="#%E5%AE%9A%E4%BD%8D%E6%96%AD%E8%A8%80">定位断言</a>并不用于选择, 自然也不能被提取</li></ul></li><li>对于特定的编程语言下的实现, 提取内容可能体现为返回的匹配结果数组, 通常索引 <code>0</code> 为整个被匹配的字符串</li></ul><h4 id="引用选择内容匹配" tabindex="-1"><a class="header-anchor" href="#引用选择内容匹配" aria-hidden="true">#</a> 引用选择内容匹配</h4><p>除了提取被选择的内容, 还可以将被选择的内容用于匹配</p><ul><li>使用 <code>\\n</code> 可引用第 <code>n</code> 个选择内容, 注意 <code>n</code> 为数字且索引规则与<a href="#%E6%8F%90%E5%8F%96%E9%80%89%E6%8B%A9%E5%86%85%E5%AE%B9">提取选择内容</a>相同</li><li>仅当子字符串与之前提取的选择内容完全相同才能通过匹配</li><li>对于<a href="#%E9%87%8D%E5%A4%8D%E5%86%85%E5%AE%B9%E9%80%89%E6%8B%A9">重复内容选择</a>, 同样只会使用最右侧的选择内容</li><li>例如 <code>(\\d+A)+ \\1</code> 匹配字符串 <code>12A24A 24A</code> 通过, 但不匹配字符串 <code>12A24A 12A</code></li></ul><h3 id="定位断言" tabindex="-1"><a class="header-anchor" href="#定位断言" aria-hidden="true">#</a> 定位断言</h3>',38),p=e("br",null,null,-1),E={href:"https://www.runoob.com/w3cnote/reg-lookahead-lookbehind.html",target:"_blank",rel:"noopener noreferrer"},A=l('<p>先行正向断言 <code>(?=...)</code>, 其中 <code>...</code> 为断言正则表达式</p><ul><li>表示满足断言正则表达式的子字符串<mark>左侧位置</mark>, 且对其右侧没有限制</li><li>例如 <code>a(?=\\d)</code> 可以匹配右侧与数字相邻的 字母 <code>a</code>, 如 <code>a1</code>, 但不匹配 <code>1a</code> 或 <code>ab</code></li><li>允许使用多个断言修饰同一个位置</li><li>类似的还有负向正向断言 <code>(?!...)</code>, 此时子字符串不能满足给出的断言正则表达式</li></ul><p>一般通过以下形式使用断言</p><ul><li><code>^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)\\w{6,18}$</code> 用于匹配任意至少包含一个大小写字母与数字的, 满足 <code>\\w</code> 要求, 且长度在 <code>6-18</code> 的字符串 <ul><li>其中各项断言如 <code>(?=.*[a-z])</code> 中, <code>.*</code> 表明限定内容位置不限, <code>[a-z]</code> 则表明要求出现的内容<br> 通过 <code>(?=.*&lt;regex&gt;)</code> 的方式使用断言, 可用于<mark>表示对于内容任意位置应至少出现一处符合正则表达式 <code>&lt;regex&gt;</code> 的子字符串</mark></li><li>去除断言剩余的 <code>^\\w{6,18}$</code> 则表明对输入内容的基本要求</li><li>以上方法主要用于密码的匹配, 通过分解为 <code>^(?=.*[a-z]).+$</code> 与 <code>$\\w{6,8}$</code> 等可实现对密码各项要求的单独检查</li></ul></li><li><code>^(?!.*\\.min\\.css$)(.+)\\.css$</code> 用于匹配以 <code>.css</code> 为结尾, 但不以 <code>.min.css</code> 为结尾文件的文件名 <ul><li>其中通过断言 <code>(?!.*\\.min\\.css$)</code> 提前排除了所有满足 <code>.*\\.min\\.css$</code> 的字符串<br> 通过 <code>^(?=.*&lt;regex&gt;)</code> 的方式使用断言, 可用于<mark>排除一类字符串中的特定子类</mark></li><li>结尾不使用断言, 注意, <mark>正向断言一般与 <code>.*</code> 等任意字符匹配配合才有意义</mark>, 否则直接匹配即可不需要断言</li></ul></li><li><code>([^;]+)(?=\\.min\\.css)</code> 从一串以 <code>;</code> 为间隔的文件名列表字符串中, 提取以 <code>.min.css</code> 为后缀的文件名</li></ul><h3 id="修饰符" tabindex="-1"><a class="header-anchor" href="#修饰符" aria-hidden="true">#</a> 修饰符</h3><p>修饰符可用于指定正则表达式的匹配策略, 对于特定编程语言下的实验, 可能体现为匹配模式</p><ul><li>不区分大小写 <code>i</code></li><li>全局匹配 <code>g</code> 匹配时对所有输入内容进行匹配</li><li>多行匹配 <code>m</code> 元字符 <code>^, $</code> 改为匹配内容各行的开头与结尾, 相当于对各行分别匹配</li><li>特殊控制 <code>s</code> 元字符 <code>.</code> 将匹配所有字符 (默认 <code>.</code> 不包含换行 <code>\\n</code>)</li></ul><p>在正规表示正则表达式时, 会使用 <code>/&lt;regex&gt;/[modify]</code> 的形式</p><ul><li><code>&lt;regex&gt;</code> 正则表达式主题</li><li><code>[modify]</code> 可选的修饰符</li></ul><h2 id="常用正则表达式" tabindex="-1"><a class="header-anchor" href="#常用正则表达式" aria-hidden="true">#</a> 常用正则表达式</h2>',10),f={href:"https://www.runoob.com/regexp/regexp-example.html",target:"_blank",rel:"noopener noreferrer"},m=e("br",null,null,-1),b={href:"https://docs.python.org/zh-cn/3/library/re.html#regular-expression-examples",target:"_blank",rel:"noopener noreferrer"},x={href:"https://www.jyshare.com/front-end/854/",target:"_blank",rel:"noopener noreferrer"},_=e("ul",null,[e("li",null,[e("code",null,"[\\u4E00-\\u9FA5]"),o(" 表示中文字符集")]),e("li",null,[e("code",null,"^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[\\x20-\\x7E]{8,20}$"),o(" 表示必须包含字母与数字, 由 8 到 20 个可打印 ASCII 字符组成的密码")])],-1);function g(w,k){const d=a("ExternalLinkIcon");return r(),h("div",null,[t,e("p",null,[o("参考教程 "),e("a",s,[o("https://www.runoob.com/regexp/regexp-tutorial.html"),c(d)])]),u,e("p",null,[o("定位断言是一种特殊的定位方法, 不表示具体字符, 用于表示匹配内容位于特定类型的子字符串旁边"),p,o(" 此处仅介绍其中的先行正向断言, 关于更多介绍可参考 "),e("a",E,[o("https://www.runoob.com/w3cnote/reg-lookahead-lookbehind.html"),c(d)])]),A,e("p",null,[o("参考正则表达式例子 * "),e("a",f,[o("https://www.runoob.com/regexp/regexp-example.html"),c(d)]),m,o(" * "),e("a",b,[o("https://docs.python.org/zh-cn/3/library/re.html#regular-expression-examples"),c(d)])]),e("p",null,[o("正则表达式测试 "),e("a",x,[o("https://www.jyshare.com/front-end/854/"),c(d)])]),_])}const $=i(n,[["render",g],["__file","regex.html.vue"]]);export{$ as default};