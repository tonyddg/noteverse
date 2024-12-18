import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{o as h,c as r,e,b as a,d as i}from"./app-8c5ce49e.js";const d={},n=e('<h1 id="运动仿真" tabindex="-1"><a class="header-anchor" href="#运动仿真" aria-hidden="true">#</a> 运动仿真</h1><h2 id="开始运动仿真" tabindex="-1"><a class="header-anchor" href="#开始运动仿真" aria-hidden="true">#</a> 开始运动仿真</h2><h3 id="进入运动仿真" tabindex="-1"><a class="header-anchor" href="#进入运动仿真" aria-hidden="true">#</a> 进入运动仿真</h3><ol><li>完成专配</li><li>环境 -&gt; 运动仿真</li></ol><h3 id="设置" tabindex="-1"><a class="header-anchor" href="#设置" aria-hidden="true">#</a> 设置</h3><ol><li>选择仿真设置进入设置</li><li>所有零件使用统一颜色: 勾选将自动为零件上色, 并透明化固定零件</li><li>自动将约束转换为标准链接: 一般需要勾选</li><li>初始位置偏移: 选择第一项时, 将约束偏移设为 0</li><li>以每分钟转速为单位 (更多选项): 需要时勾选</li></ol><h2 id="运动类型" tabindex="-1"><a class="header-anchor" href="#运动类型" aria-hidden="true">#</a> 运动类型</h2><h3 id="插入选择类型" tabindex="-1"><a class="header-anchor" href="#插入选择类型" aria-hidden="true">#</a> 插入选择类型</h3><ol><li>对话框右侧 显示连接表 按钮可选择插入运动类型</li><li>如果勾选了 自动将约束转换为标准链接, 则只有空间自由运动</li><li>如果零件没有添加运动类型, 则默认没有任何自由度, 只能通过运动类型获得自由度</li><li>仿真播放后, 需要点击左侧 构造模式 按钮, 才能添加运动类型</li></ol><h3 id="常用运动类型" tabindex="-1"><a class="header-anchor" href="#常用运动类型" aria-hidden="true">#</a> 常用运动类型</h3><ol><li>标准类型, 主要有 <ol><li>铰链连接</li><li>焊接连接</li><li>平面运动</li></ol></li><li>传动联接, 即齿轮, 凸轮滚子, 蜗轮蜗杆, 螺纹等, 通常选择分度圆 / 线</li><li>滑动类型, 用于滚轮与地面的接触等</li><li>受力类型, 弹簧, 液压, 阻尼器等</li><li>2D Contact, 用于如凸轮等复杂轮廓的线接触接触</li></ol><h3 id="转换约束" tabindex="-1"><a class="header-anchor" href="#转换约束" aria-hidden="true">#</a> 转换约束</h3><p>与 自动将约束转换为标准链接 选项不同, 可以识别将两个零件之间的约束, 然后转换为运动类型</p><h3 id="机构状态" tabindex="-1"><a class="header-anchor" href="#机构状态" aria-hidden="true">#</a> 机构状态</h3><p>检查机构的自由度以及是否有多余的运动状态, 使用自动转换时需要检查</p><h2 id="运动类型设置" tabindex="-1"><a class="header-anchor" href="#运动类型设置" aria-hidden="true">#</a> 运动类型设置</h2><h3 id="弹簧阻尼" tabindex="-1"><a class="header-anchor" href="#弹簧阻尼" aria-hidden="true">#</a> 弹簧阻尼</h3><ol><li>添加弹簧阻尼需要选择两条闭合曲线 (提示为点)</li><li>添加弹簧阻尼后, 将创建一个虚拟弹簧</li><li>默认弹簧为抑制, 需要具体设置 刚度, 自由长度, 阻尼 (一般为 0)</li><li>一般自由长度应大于面距离, 以实现压缩弹簧的锁定效果</li><li>对于推杆, 凸轮从动件等机构需要使用此运动类型</li></ol><h3 id="_2d-contact-线接触" tabindex="-1"><a class="header-anchor" href="#_2d-contact-线接触" aria-hidden="true">#</a> 2D Contact (线接触)</h3>',19),t=a("ol",null,[a("li",null,"对于使用 2D Contact 的两个零件需要先使用草图画出接触轮廓 (通过投影绘制轮廓, 草图平面必须是接触平面, 轮廓必须是封闭图形)"),a("li",null,"创建约束前还需要锁定自由度等保证两部件的草图平面始终对齐"),a("li",null,"创建时分别选择两个接触轮廓"),a("li",null,[i("选择轮廓时, 检查曲线点 "),a("span",{class:"katex"},[a("span",{class:"katex-mathml"},[a("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[a("semantics",null,[a("mrow",null,[a("mi",null,"z")]),a("annotation",{encoding:"application/x-tex"},"z")])])]),a("span",{class:"katex-html","aria-hidden":"true"},[a("span",{class:"base"},[a("span",{class:"strut",style:{height:"0.4306em"}}),a("span",{class:"mord mathnormal",style:{"margin-right":"0.04398em"}},"z")])])]),i(" 轴 (具有三个箭头的轴) 是否为指向轮廓外的法线, 如果不是, 则点击右侧 反转正方向 按钮, 切换法线方向")])],-1),s=e('<h3 id="标准类型通用" tabindex="-1"><a class="header-anchor" href="#标准类型通用" aria-hidden="true">#</a> 标准类型通用</h3><ol><li>点击具体运动类型, 进入运动类型设置</li><li>选择设置的自由度, 具体设置某个自由度</li></ol><h4 id="初始条件" tabindex="-1"><a class="header-anchor" href="#初始条件" aria-hidden="true">#</a> 初始条件</h4><ol><li>自由度选项的第一个按钮</li><li>可以设置初始位置</li><li>可以在此锁定自由度</li></ol><h4 id="驱动条件" tabindex="-1"><a class="header-anchor" href="#驱动条件" aria-hidden="true">#</a> 驱动条件</h4><ol><li>自由度选项的第三个按钮</li><li>在此启用驱动, 实现转动等输入</li><li>具有驱动条件或锁定时, 图标将出现一个箭头</li></ol><h2 id="结果" tabindex="-1"><a class="header-anchor" href="#结果" aria-hidden="true">#</a> 结果</h2><h3 id="仿真播放器" tabindex="-1"><a class="header-anchor" href="#仿真播放器" aria-hidden="true">#</a> 仿真播放器</h3><ol><li>点击 播放 按钮后将开始仿真, 第一次播放需要等待结果计算, 时间较长</li></ol><h3 id="输出图示器" tabindex="-1"><a class="header-anchor" href="#输出图示器" aria-hidden="true">#</a> 输出图示器</h3><ol><li>当能够生成一次仿真过程后, 点击输出图示器查看仿真结果</li><li>查看输出图示器时, 需要点击左侧的各级选项卡, 在最后的参数处后的框打勾, 使参数输出到图像上</li></ol>',11),o=[n,t,s];function c(u,x){return h(),r("div",null,o)}const m=l(d,[["render",c],["__file","inventor_运动仿真.html.vue"]]);export{m as default};
