import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as r,e as l,b as a,d as e}from"./app-8c5ce49e.js";const h={},t=l('<h1 id="在-python-中绘图与运算" tabindex="-1"><a class="header-anchor" href="#在-python-中绘图与运算" aria-hidden="true">#</a> 在 Python 中绘图与运算</h1><h2 id="通用注意" tabindex="-1"><a class="header-anchor" href="#通用注意" aria-hidden="true">#</a> 通用注意</h2><h3 id="函数参数" tabindex="-1"><a class="header-anchor" href="#函数参数" aria-hidden="true">#</a> 函数参数</h3><p>注意函数参数的传入方式</p><ol><li>普通传参</li><li>指定参数的传参</li><li>不定长传参</li><li>通过元组 () 或数组 [] 传入不定长参数</li></ol><h3 id="模拟抽象" tabindex="-1"><a class="header-anchor" href="#模拟抽象" aria-hidden="true">#</a> 模拟抽象</h3>',6),s=a("ol",null,[a("li",null,[e("在模拟前需要先确定 "),a("span",{class:"katex"},[a("span",{class:"katex-mathml"},[a("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[a("semantics",null,[a("mrow",null,[a("mi",null,"d"),a("mi",null,"t")]),a("annotation",{encoding:"application/x-tex"},"dt")])])]),a("span",{class:"katex-html","aria-hidden":"true"},[a("span",{class:"base"},[a("span",{class:"strut",style:{height:"0.6944em"}}),a("span",{class:"mord mathnormal"},"d"),a("span",{class:"mord mathnormal"},"t")])])]),e(" 长度等物理常数")]),a("li",null,[e("可将 "),a("span",{class:"katex"},[a("span",{class:"katex-mathml"},[a("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[a("semantics",null,[a("mrow",null,[a("mi",null,"d"),a("mi",null,"t")]),a("annotation",{encoding:"application/x-tex"},"dt")])])]),a("span",{class:"katex-html","aria-hidden":"true"},[a("span",{class:"base"},[a("span",{class:"strut",style:{height:"0.6944em"}}),a("span",{class:"mord mathnormal"},"d"),a("span",{class:"mord mathnormal"},"t")])])]),e(" 作为 np.arange() 的 step")])],-1),d=l('<h2 id="numpy-注意" tabindex="-1"><a class="header-anchor" href="#numpy-注意" aria-hidden="true">#</a> numpy 注意</h2><h3 id="小数迭代" tabindex="-1"><a class="header-anchor" href="#小数迭代" aria-hidden="true">#</a> 小数迭代</h3><ol><li>使用 np.arange() 可以实现将小数用于迭代</li><li>可在迭代中使用一个临时变量 i 记录迭代次数, 以用于向记录数组添加元素</li></ol><h3 id="数组使用" tabindex="-1"><a class="header-anchor" href="#数组使用" aria-hidden="true">#</a> 数组使用</h3><ol><li>使用数组前, 最好使用 np.zeros() 确定足够的空间</li><li>由公式确定空间时, 需要使用 np.floor() 等与 int() 将小数转为整数</li></ol><h3 id="数组生成" tabindex="-1"><a class="header-anchor" href="#数组生成" aria-hidden="true">#</a> 数组生成</h3><ol><li>np.array() 将 python 内部的数据结构转为 np.array</li><li>np.zeros/random() 等, 提供一个表示各维度大小的元组</li></ol><h3 id="矢量-点数组" tabindex="-1"><a class="header-anchor" href="#矢量-点数组" aria-hidden="true">#</a> 矢量/点数组</h3><ol><li>创建矢量 vec = np.array((x, y)).T</li><li>创建矢量数组 vecArr = np.zeros((2, size))</li><li>修改/读取矢量数组元素 vecArr[..., i] = vec</li><li>将矢量数组作为点绘制 axe.plot(vecArr[0], vecArr[1])</li></ol><h2 id="mlp-注意" tabindex="-1"><a class="header-anchor" href="#mlp-注意" aria-hidden="true">#</a> mlp 注意</h2><h3 id="功能抽象" tabindex="-1"><a class="header-anchor" href="#功能抽象" aria-hidden="true">#</a> 功能抽象</h3><ol><li>在实现功能后, 对某些绘图功能进行抽象</li><li>先提取出有关物理参数, 作为全局变量</li><li>将绘制图片的 axe 作为参数传入, 可以在外部创建 axe 后传入, 在绘制完成后对 axe 进行进一步设置</li><li>将使用到的函数 / 方程作为参数传入, 可通过 def fun(x): return full_fun(x, y = ...) 的方式传入可设置的函数</li></ol><h2 id="数学方法" tabindex="-1"><a class="header-anchor" href="#数学方法" aria-hidden="true">#</a> 数学方法</h2><h3 id="离散曲线的曲率半径" tabindex="-1"><a class="header-anchor" href="#离散曲线的曲率半径" aria-hidden="true">#</a> 离散曲线的曲率半径</h3><p>通过离散曲线上一点与相邻两点点作圆弧, 计算圆弧半径得到曲线上任意一点的曲率半径</p><h3 id="降低曲线上的突变点-让曲线更光滑" tabindex="-1"><a class="header-anchor" href="#降低曲线上的突变点-让曲线更光滑" aria-hidden="true">#</a> 降低曲线上的突变点, 让曲线更光滑</h3><p>对曲线间隔采样再将采样点插值</p>',17),o=[t,s,d];function c(p,m){return n(),r("div",null,o)}const f=i(h,[["render",c],["__file","math.html.vue"]]);export{f as default};