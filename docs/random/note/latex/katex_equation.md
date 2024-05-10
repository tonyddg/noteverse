# Katex 公式编辑
本文公式主要基于 $\KaTeX$, 并经过 `vuepress` 的 `markdownEnhance` 插件的测试, 不能保证在 Latex 中依然适用

[Katex的所有支持命令](https://katex.org/docs/supported.html) 

## 基本使用
1. 使用 `$公式$` 创建行内公式
1. 使用 `$$公式$$` 创建块级公式
1. 公式内使用 `\\` 进行换行, 空格不会转换, 需要空格时见[空格使用](#空格)
1. 命令的属性需要使用 `{}` 进行包裹, 如 $x_{123},\lim_{x=1}$, 对应 `x_{123},\lim_{x=1}`
1. 单个字符也可不包裹, 但最好使用一个空格与命令隔开, 如 $x_1,\lim x$, 对应 `x_1,\lim x`

## 字母与符号
[更多字母与符号参考](https://blog.csdn.net/weixin_52707028/article/details/130754484)

### 希腊字母

|字母|latex 命令|字母|latex 命令|
|--|--|--|--|
|$\alpha\;\Alpha$|`\alpha\Alpha`|$\xi\;\Xi\;\varXi$|`\xi\Xi\varXi`|
|$\beta\;\Beta$|`\beta\Beta`|$\omicron\;\Omicron$|`\omicron\Omicron`|
|$\gamma\;\Gamma\;\varGamma$|`\gamma\Gamma\varGamma`|$\pi\;\varpi\;\Pi\;\varPi$|`\pi\varpi\Pi\varPi`|
|$\delta\;\Delta\;\varDelta$|`\delta\Delta\varDelta`|$\rho\;\varrho\;\Rho$|`\rho\varrho\Rho`|
|$\epsilon\;\varepsilon\;\Epsilon$|`\epsilon\varepsilon\Epsilon`|$\sigma\;\Sigma\;\varSigma$|`\sigma\Sigma\varSigma`|
|$\zeta\;\Zeta$|`\zeta\Zeta`|$\tau\;\Tau$|`\tau\Tau`|
|$\eta\;\Eta$|`\eta\Eta`|$\upsilon\;\Upsilon\;\varUpsilon$|`\upsilon\Upsilon\varUpsilon`|
|$\theta\;\vartheta\;\Theta\;\varTheta$|`\theta\vartheta\Theta\varTheta`|$\phi\;\varphi\;\Phi\;\varPhi$|`\phi\varphi\Phi\varPhi`|
|$\iota\;\Iota$|`\iota\Iota`|$\chi\;\Chi$|`\chi\Chi`|
|$\kappa\;\varkappa\;\Kappa$|`\kappa\varkappa\Kappa`|$\psi\;\Psi\;\varPsi$|`\psi\;\Psi\;\varPsi`|
|$\lambda\;\Lambda\;\varLambda$|`\lambda\Lambda\varLambda`|$\omega\;\Omega\;\varOmega$|`\omega\Omega\varOmega`|
|$\mu\;\Mu$|`\mu\Mu`|$\nu\;\Nu$|`\nu\Nu`|

### 花体字母

|字母|latex 命令|字母|latex 命令|字母|latex 命令|字母|latex 命令|
|--|--|--|--|--|--|--|--|
|$\mathscr{A}$|`\mathscr{A}`|$\mathscr{N}$|`\mathscr{N}`|$\mathbb{A}$|`\mathbb{A}`|$\mathbb{N}$|`\mathbb{N}`|
|$\mathscr{B}$|`\mathscr{B}`|$\mathscr{O}$|`\mathscr{O}`|$\mathbb{B}$|`\mathbb{B}`|$\mathbb{O}$|`\mathbb{O}`|
|$\mathscr{C}$|`\mathscr{C}`|$\mathscr{P}$|`\mathscr{P}`|$\mathbb{C}$|`\mathbb{C}`|$\mathbb{P}$|`\mathbb{P}`|
|$\mathscr{D}$|`\mathscr{D}`|$\mathscr{Q}$|`\mathscr{Q}`|$\mathbb{D}$|`\mathbb{D}`|$\mathbb{Q}$|`\mathbb{Q}`|
|$\mathscr{E}$|`\mathscr{E}`|$\mathscr{R}$|`\mathscr{R}`|$\mathbb{E}$|`\mathbb{E}`|$\mathbb{R}$|`\mathbb{R}`|
|$\mathscr{F}$|`\mathscr{F}`|$\mathscr{S}$|`\mathscr{S}`|$\mathbb{F}$|`\mathbb{F}`|$\mathbb{S}$|`\mathbb{S}`|
|$\mathscr{G}$|`\mathscr{G}`|$\mathscr{T}$|`\mathscr{T}`|$\mathbb{G}$|`\mathbb{G}`|$\mathbb{T}$|`\mathbb{T}`|
|$\mathscr{H}$|`\mathscr{H}`|$\mathscr{U}$|`\mathscr{U}`|$\mathbb{H}$|`\mathbb{H}`|$\mathbb{U}$|`\mathbb{U}`|
|$\mathscr{I}$|`\mathscr{I}`|$\mathscr{V}$|`\mathscr{V}`|$\mathbb{I}$|`\mathbb{I}`|$\mathbb{V}$|`\mathbb{V}`|
|$\mathscr{J}$|`\mathscr{J}`|$\mathscr{W}$|`\mathscr{W}`|$\mathbb{J}$|`\mathbb{J}`|$\mathbb{W}$|`\mathbb{W}`|
|$\mathscr{K}$|`\mathscr{K}`|$\mathscr{X}$|`\mathscr{X}`|$\mathbb{K}$|`\mathbb{K}`|$\mathbb{X}$|`\mathbb{X}`|
|$\mathscr{L}$|`\mathscr{L}`|$\mathscr{Y}$|`\mathscr{Y}`|$\mathbb{L}$|`\mathbb{L}`|$\mathbb{Y}$|`\mathbb{Y}`|
|$\mathscr{M}$|`\mathscr{M}`|$\mathscr{Z}$|`\mathscr{Z}`|$\mathbb{M}$|`\mathbb{M}`|$\mathbb{Z}$|`\mathbb{Z}`|

### 简单运算符号

|函数|latex 命令|备注|函数|latex 命令|备注|
|---|---|---|---|---|---|
|$\supset$|`\supset`|将 `b` 换为 `p` 可改变方向|$\times$|`\times`|叉乘|
|$\subset$|`\subset`|真包含|$\div$|`\div`|除|
|$\subseteq$|`\subseteq`|包含|$\cdot$|`\cdot`|点乘|
|$\subsetneqq$|`\subsetneqq`|真子集|$\not\gt$|`\not\gt`|`\not` 修饰运算符|
|$\cap$|`\cap`|交集|$\geq$|`\geq`|大于等于|
|$\cup$|`\cup`|并集|$\leq$|`\leq`|小于等于|
|$\ni$|`\ni`|将 `in` 换为 `ni` 可改变方向|$\gg$|`\gg`|远大于|
|$\in$|`\in`|属于|$\ll$|`\ll`|远小于|
|$\notin$|`\notin`|不属于|$\equiv$|`\equiv`|恒等于|
|$\forall$|`\forall`|全部|$\approx$|`\approx`|约等于|
|$\exists$|`\exists`|存在|$\neq$|`\neq`|不等于|
|$\varnothing$|`\varnothing`|空集|$\cong$|`\cong`|全等于|
||
|$A\degree$|`\degree`|度|$\P$|`\P`|段落符号|
|$\sim$|`\sim`|相似|$\S$|`\S`|分节符|
|$\bowtie$|`\bowtie`|关联|$\hbar$|`\hbar`|约化普朗克常数|
|$\perp$|`\perp`|垂直|$\imath$|`\imath`|虚数单位 $i$|
|$\parallel$|`\parallel`|平行|$\jmath$|`\jmath`|虚数单位 $j$|
|$\nabla$|`\nabla`|哈密顿算子|$\mathrm{d}$|`\mathrm{d}`|微分|
|$\angle$|`\angle`|角度|$\partial$|`\partial`|偏微分|
|$\land$|`\land`|与|$\aleph$|`\aleph`||
|$\lor$|`\lor`|或|$\copyright$|`\copyright`|版权|
|$\because$|`\because`|因为|$\propto$|`\propto`|正比|
|$\therefore$|`\therefore`|所以|$\infty$|`\infty`|无穷|
|$\pm$|`\pm`|正负|$\to$|`\to`|得到|
|$\mp$|`\mp`|负正|$\gets$|`\gets`|推出|
|$\oplus$|`\oplus`|圆环和|$\square$|`\square`|矩形|
|$\otimes$|`\otimes`|圆环积|$\bigcirc$|`\bigcirc`|圆形|
|$\char"263a$|`\char"263a`|任意 unicode|$\triangle$|`\triangle`|三角形|

### 省略号与箭头

|字母|latex 命令|字母|latex 命令|
|---|---|---|---|
|$\dots$|`\dots`|$\curvearrowright$|`\curvearrowright`|
|$\cdots$|`\cdots`|$\curvearrowleft$|`\curvearrowleft`|
|$\vdots$|`\vdots`|$\circlearrowright$|`\circlearrowright`|
|$\ddots$|`\ddots`|$\circlearrowleft$|`\circlearrowleft`|
|$\leftarrow$|`\leftarrow`|$\rightarrow$|`\rightarrow`|
|$\Leftarrow$|`\Leftarrow`|$\Rightarrow$|`\Rightarrow`|
|$\nleftarrow$|`\nleftarrow`|$\nrightarrow$|`\nrightarrow`|
|$\nLeftarrow$|`\nLeftarrow`|$\nRightarrow$|`\nRightarrow`|
|$\longleftarrow$|`\longleftarrow`|$\longrightarrow$|`\longrightarrow`|
|$\Longleftarrow$|`\Longleftarrow`|$\Longrightarrow$|`\Longrightarrow`|
|$\leftrightarrow$|`\leftrightarrow`|$\longleftrightarrow$|`\longleftrightarrow`|
|$\Leftrightarrow$|`\Leftrightarrow`|$\Longleftrightarrow$|`\Longleftrightarrow`|
|$\leftrightarrows$|`\leftrightarrows`|$\nleftrightarrow$|`\nleftrightarrow`|
|$\leftrightharpoons$|`\leftrightharpoons`|$\rightrightarrows$|`\rightrightarrows`|
|$\uparrow$|`\uparrow`|$\downarrow$|`\downarrow`|
|$\Uparrow$|`\Uparrow`|$\Downarrow$|`\Downarrow`|
|$\updownarrow$|`\updownarrow`|$\Updownarrow$|`\Updownarrow`|
|$\swarrow$|`\swarrow`|$\nwarrow$|`\nwarrow`|
|$\nearrow$|`\nearrow`|$\searrow$|`\searrow`|

## 字母修饰
### 标记
|标记|latex 命令|备注|
|---|---|---|
|单字母标记|推荐将上下标置于标记外如 $\vec{v}^2_a$, 不推荐 $\vec{v^2_a}$|`\vec{v}^2_a`|
|$\bar{a}$|`\bar{a}`|一声/平均值|
|$\acute{a}$|`\acute{a}`|二声|
|$\breve{a}$|`\breve{a}`|三声|
|$\grave{a}$|`\grave{a}`|四声|
|$\tilde{a}$|`\tilde{a}`||
|$\check{a}$|`\check{a}`||
|$\hat{a}$|`\hat{a}`||
|$\vec{a}$|`\vec{a}`|向量|
|$\dot{a}$|`\dot{a}`|导数|
|$\ddot{a}$|`\ddot{a}`|二阶导|
|$\mathring{a}$|`\mathring{a}`||
|彩色字母|更多颜色见文档||
|$\red{ABC}$|`\red{ABC}`||
|$\blue{ABC}$|`\blue{ABC}`||
|$\green{ABC}$|`\green{ABC}`||
|$\color{orange}{ABC}$|`\color{任意颜色}{ABC}`|彩色字体|
|多字母标记|当被标记字母数多于 $1$ 时使用, 其他同单字母标记|
|$\overline{ABC}$|`\overline{ABC}`||
|$\underline{ABC}$|`\underline{ABC}`||
|$\overrightarrow{ABC}$|`\overrightarrow{ABC}`|大向量|
|$\overleftarrow{ABC}$|`\overleftarrow{ABC}`||
|$\overgroup{ABC}$|`\overgroup{ABC}`|圆弧|
|$\widetilde{ABC}$|`\widetilde{ABC}`||
|$\widehat{ABC}$|`\widehat{ABC}`||
|$\sout{ABC}$|`\sout{ABC}`|删除线|
|字体|更多字体见文档|
|$\mathrm{ABC}$|`\mathrm{ABC}`|正体 (符号)|
|$\bm{ABC}$|`\bm{ABC}`|加粗 (强调)|
|$\mathbf{ABC}$|`\mathbf{ABC}`|加粗 (符号)|
|$\operatorname{Function}$|`\operatorname{Function}`|函数名|
|复杂标记||
|$\xrightleftharpoons[\text{下方公式}]{\text{上方公式}}$|`\xrightleftharpoons[\text{下方公式}]{\text{上方公式}}`|可逆反应|
|$\xlongequal[\text{下方公式}]{\text{上方公式}}$|`\xlongequal[\text{下方公式}]{\text{上方公式}}`|一般反应|
|$\xrightarrow[\text{下方公式}]{\text{上方公式}}$|`\xrightarrow[\text{下方公式}]{\text{上方公式}}`|不可逆反应|
|$\xleftarrow[\text{下方公式}]{\text{上方公式}}$|`\xleftarrow[\text{下方公式}]{\text{上方公式}}`||
|$\overbrace{a+b+c}^{\text{note}}$|`\overbrace{a+b+c}^{\text{note}}`||
|$\underset{a}{\overset{b}{ {}^{c}_{d}M^{e}_{f}}}$|`\underset{a}{\overset{b}{ {}^{c}_{d}M^{e}_{f}}}`|左侧上下标需要有 `{}` 占位<br> 出错时可尝试将该符号左侧补一个空格|
|$[\substack{a\\b}]$|`[\substack{a\\b}]`|行内垂直堆叠|
|$\binom{A}{B}$|`\binom{A}{B}`|数对|
|$\boxed{\pi=\frac{c}{d}}$|`\boxed{\pi=\frac{c}{d}}`|方框|
|$\textcircled{\scriptstyle{\mathrm{E}}}$|`\textcircled{\scriptsize{\mathrm{E}}}`|圆圈 (可能导致警告)<br>`\scriptstyle` <br> 小写字母不需要此修饰|
|$\phase{-78^\circ}$|`\phase{-78^\circ}`|相量|
|$\braket{ABC}$|`\braket{ABC}`||

### 函数

|函数|latex 命令|备注|函数|latex 命令|备注|
|---|---|---|---|---|---|
|$\ln$|`\ln`|自然对数|$\log$|`\log`|对数|
|$\min$|`\min`|最小值|$\max$|`\max`|最大值|
|$\sin$|`\sin`|正弦|$\cos$|`\cos`|余弦|
|$\tan$|`\tan`|正切|$\cot$|`\cot`|余切|
|$\sec$|`\sec`|正割|$\csc$|`\csc`|余割|
|$\sh$|`\sh`|双曲正弦|$\ch$|`\ch`|双曲余弦|
|$\sinh$|`\sinh`|双曲正弦|$\cosh$|`\cosh`|双曲余弦|
|$\tanh$|`\tanh`|双曲正切|$\coth$|`\coth`|双曲余切|
|$\arcsin$|`\arcsin`|反正弦|$\arccos$|`\arccos`|反余弦|
|$\arctan$|`\arctan`|反正切|$\deg$|`\deg`|角度|
|$\exp$|`\exp`|指数函数|$\lg$|`\lg`|$10$ 为底的对数|
|$\bmod$|`\bmod`|求余|$\det$|`\det`|行列式|

对于其他不在类表内的函数, 可使用 `\operatorname{函数名}` 的方式解决, 如 $\operatorname{sgn},\overrightarrow{\operatorname{grand}},\operatorname{div}$

## 运算符号
### 行内运算符

|运算符|latex 命令|备注|
|---|---|---|
|$\sum_a^b$|`\sum_a^b`|求和|
|$\prod_a^b$|`\prod_a^b`|累积|
|$\lim_{x\to a}$|`\lim_{x\to a}`|极限|
|$\int_a^b$|`\int_a^b`|积分|
|$\iint_a^b$|`\iint_a^b`|二重积分|
|$\iiint_a^b$|`\iiint_a^b`|三重积分|
|$\oint_a^b$|`\oint_a^b`|环路积分|
|$\oiint_a^b$|`\oiint_a^b`|二重环路积分|

### 块级运算符
`\sum_a^b`
$$\sum_a^b$$
`\prod_a^b`
$$\prod_a^b$$
`\lim_{x\to a}`
$$\lim_{x\to a}$$
`\int_a^b`
$$\int_a^b$$
`\iint_a^b`
$$\iint_a^b$$
`\iiint_a^b`
$$\iiint_a^b$$
`\oint_a^b`
$$\oint_a^b$$
`\oiint_a^b`
$$\oiint_a^b$$

#### 特殊格式控制
对于积分, 可通过后置 `\limits_{下限}^{上限}` 将上限放于符号的正下方  
eg.`\oint\limits_{C}\mathrm{d}s`
$$\oint\limits_{C}\mathrm{d}s$$

对于多层上下限, 可使用 `\substack{第一行\\第二行}` 实现  
eg.`\sum_{\substack{0<i<m\\0<j<n}}^b`
$$\sum_{\substack{0<i<m\\0<j<n}}^b$$

对于较长的上下限, 可使用 `\mathclap{内容}` 实现紧凑布局  
eg.`\sum_{\mathclap{1\le i\le j\le n}} x_{ij}`
$$\sum_{\mathclap{1\le i\le j\le n}} x_{ij}$$
不使用 `\mathclap{内容}` 时的效果
$$\sum_{1\le i\le j\le n} x_{ij}$$

### 其他运算符号
`\frac{A}{B}\dfrac{A}{B}\tfrac{A}{B}` 分数
$$\frac{A}{B}\;\dfrac{A}{B}\;\tfrac{A}{B}$$
`f(x)\bigg|_{a=1}` 取值
$$f(x)\bigg|_{a=1}$$
`\sqrt[3]{27}` 开方
$$\sqrt[3]{27}$$
`\binom{n}{k}` 数对
$$\binom{n}{k}$$

## 矩阵与排版
矩阵与排版命令均需要以 `\begin{}` 开始, 并且以 `\end{}` 结束

### 排版控制
* 使用 `\\` 进行换行
* 使用 `&` 进行对齐
* 矩阵中, 同一行内的每个元素使用 `&` 分隔, 每行使用 `\\` 分隔
* 允许混合使用排版命令, 但是开头和结尾要匹配

### 矩阵样式
`bmatrix`
$$\begin{bmatrix}
2&-3&4&\cdots\\
2&1&2&\\
1&5&-3&\\
\vdots&&&\ddots
\end{bmatrix}$$
`Bmatrix`
$$\begin{Bmatrix}
2&-3&4&\cdots\\
2&1&2&\\
1&5&-3&\\
\vdots&&&\ddots
\end{Bmatrix}$$
`vmatrix`
$$\begin{vmatrix}
2&-3&4&\cdots\\
2&1&2&\\
1&5&-3&\\
\vdots&&&\ddots
\end{vmatrix}$$
`Vmatrix`
$$\begin{Vmatrix}
2&-3&4&\cdots\\
2&1&2&\\
1&5&-3&\\
\vdots&&&\ddots
\end{Vmatrix}$$
`pmatrix`
$$\begin{pmatrix}
2&-3&4&\cdots\\
2&1&2&\\
1&5&-3&\\
\vdots&&&\ddots
\end{pmatrix}$$

### 排版
`equation` 表示单行公式 (), 可使用 `\tag{编号}` 指定编号
$$\begin{equation}
x= 12 + 14 + 2
x= 26 + 2
x= 28
\end{equation}$$
`equation*` 表示单行公式不带编号
$$\begin{equation*}
x= 12 + 14 + 2
x= 26 + 2
x= 28
\end{equation*}$$
`align` 表示带编号的多行公式, 行末使用 `\nonumber` 阻止编号, 行末使用 `\tag{编号}` 自定义编号
$$\begin{align}
x &= 12 + 14 + 2 \\
x &= 26 + 2 \tag{a1}\\
x &= 28\nonumber
\end{align}$$
`split` 表示不带编号的多行公式
$$\begin{split}
x &= 12 + 14 + 2 \\
x &= 26 + 2 \\
x &= 28
\end{split}$$
对 `split` 使用 `\tag{编号}` 将会对整体编号
$$\begin{split}\tag{a2}
x &= 12 + 14 + 2 \\
x &= 26 + 2 \\
x &= 28
\end{split}$$
`cases` 表示分段函数
$$u(t)=\begin{cases}
1,&t>0\\
0,&t<0
\end{cases}$$
`rcases` 表示分段函数
$$\begin{rcases}
1,&t>0\\
0,&t<0
\end{rcases}=u(t)$$

## 其他
### 符号转义
|符号|转义命令|原型|
|---|---|---|
|$\#$|`\#`|`#`|
|$\$$|`\$`|`$`|
|$\%$|`\%`|`%`|
|$\&$|`\&`|`&`|
|$\sim$|`\sim`|`~`|
|$\_$|`\_`|`_`|
|$\text{\^}$|`\text{\^}`|`^`|
|$\{$|`\{`|`{`|
|$\}$|`\}`|`}`|

### 空格

|样式|命令|大小|
|---|---|---|
|$A\!B$|`A\! B`|$-3/18$|
|$AB$|`A B`|$0$|
|$A\,B$|`A\, B`|$3/18$|
|$A\:B$|`A\: B`|$4/18$|
|$A\;B$|`A\; B`|$5/18$|
|$A~B$|`A~B`|$1/2$|
|$A\ B$|`A\ B`|$1/2$|
|$A\quad B$|`A\quad B`|$1$|
|$A\kern{5em} B$|`A\kern{5em} B`|$n\times 2$|

* 使用 `\kern{长度em}`, 可以指定任意长度的空格
* 默认情况下空格不会进入公式, 需要使用命令指定空格长度, 通常可用 `\ ` 或 `\;`

### 使用注意
1. 在公式中使用中文时, 需要使用 `\text{}` 命令包裹
1. 最好不要在有序列表与表格中使用块级公式
