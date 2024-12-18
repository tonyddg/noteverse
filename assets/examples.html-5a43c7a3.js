import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o as l,c as i,b as s,a as t,w as p,e as n,d as e}from"./app-8c5ce49e.js";const u="/noteverse/assets/example_buttongroup-940cf071.png",k="/noteverse/assets/example_inputoutput-cb64c9ce.png",d="/noteverse/assets/example_registdialog-8b549f56.png",r="/noteverse/assets/example_process-d66f149f.png",v={},m=n('<h1 id="qt-程序示例与范式总结" tabindex="-1"><a class="header-anchor" href="#qt-程序示例与范式总结" aria-hidden="true">#</a> Qt 程序示例与范式总结</h1><h2 id="基础使用" tabindex="-1"><a class="header-anchor" href="#基础使用" aria-hidden="true">#</a> 基础使用</h2><h3 id="范式总结" tabindex="-1"><a class="header-anchor" href="#范式总结" aria-hidden="true">#</a> 范式总结</h3>',3),b=n('<ul><li>变量监听方法参见<a href="#%E6%9E%9A%E4%B8%BE%E9%87%8F%E7%BB%91%E5%AE%9A%E6%8C%89%E9%92%AE%E7%BB%84">枚举量绑定按钮组</a><ul><li>应当将被监听变量设为私有, 并定义访问方法, 修改槽函数, 监听信号</li><li>以 <code>None</code> 声明变量, 并在最后通过槽函数赋初值</li><li>与组件行为绑定时, 还需要定义对应的私有槽函数, 并在修改变量的同时更新组件</li><li>在修改槽函数中, 应当包含 <ul><li>判断是否为真修改 (新旧值是否相同)</li><li>修改原始变量</li><li>发出信号</li><li>同步与变量绑定的子组件</li></ul></li></ul></li><li>信号槽连接方法 <ul><li>首先即通过信号实例的 <code>connect</code> 方法建立连接</li><li>在连接后应当通过发出信号组件的有关方法定义初值 (不必担心重复初始化, 无论何种层级的组件都应当有此操作)</li></ul></li></ul>',1),f=n("<ul><li>自定义组件区的构造函数内容 <ul><li>调用基类构造函数</li><li>对输入参数进行初步处理</li><li>定义所有子组件并在定义后设置基本样式</li><li>组件布局 <ul><li>从底层级向高层级布局 (如果复杂则应拆分为自定义组件区)</li><li>布局先定义布局引擎, 再插入组件, 最后设置布局引擎</li><li>调用 <code>setLayout</code> 使布局生效</li></ul></li><li>各个子组件之间的信号槽连接, 并设置组件的初值</li><li>组件初始化设置</li></ul></li></ul>",1),_=n("<li>命名规范 <ul><li>子组件以及相应数据结构命名 <ul><li>使用小写开头, 大写区分间隔</li><li>Qt 原生组件或自定义实用组件使用缩写 (名称前两个单词首字母) + 功能组合作为成员名 (结合 IDE, 快速定位组件)</li><li>自定义组件区使用全称作为成员名</li></ul></li><li>组件方法命名 (包括信号) <ul><li>使用大写开头, 大写区分间隔 (与继承的原生组件方法区分)</li><li>槽方法以 <code>Set</code> 开头, 信号以名词开头, 一般方法以动词开头</li></ul></li><li>其他 <ul><li>与组件无直接关系的成员与方法实用小写字母, 下划线区分间隔 (与 Python 标准一致)</li><li>布局引擎同组件, 但使用 <code>layout</code> 为开头, 后接功能</li></ul></li></ul></li>",1),g=n(`<h3 id="枚举量绑定按钮组" tabindex="-1"><a class="header-anchor" href="#枚举量绑定按钮组" aria-hidden="true">#</a> 枚举量绑定按钮组</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> PySide6<span class="token punctuation">.</span>QtCore <span class="token keyword">import</span> Slot<span class="token punctuation">,</span> Signal
<span class="token keyword">from</span> PySide6<span class="token punctuation">.</span>QtWidgets <span class="token keyword">import</span> <span class="token punctuation">(</span>
    QApplication<span class="token punctuation">,</span> QWidget<span class="token punctuation">,</span> QRadioButton<span class="token punctuation">,</span> QButtonGroup<span class="token punctuation">,</span> QAbstractButton<span class="token punctuation">,</span>
    QBoxLayout<span class="token punctuation">,</span> QLabel<span class="token punctuation">,</span>
<span class="token punctuation">)</span>
<span class="token keyword">from</span> enum <span class="token keyword">import</span> Enum
<span class="token keyword">from</span> typing <span class="token keyword">import</span> Union<span class="token punctuation">,</span> Sequence<span class="token punctuation">,</span> Optional<span class="token punctuation">,</span> Iterable<span class="token punctuation">,</span> Any

<span class="token keyword">class</span> <span class="token class-name">Color</span><span class="token punctuation">(</span>Enum<span class="token punctuation">)</span><span class="token punctuation">:</span>
    Red <span class="token operator">=</span> <span class="token number">0</span>
    Green <span class="token operator">=</span> <span class="token number">1</span>
    Blue <span class="token operator">=</span> <span class="token number">2</span>
    Yellow <span class="token operator">=</span> <span class="token number">3</span>
ColorName <span class="token operator">=</span> <span class="token punctuation">{</span>
    Color<span class="token punctuation">.</span>Red<span class="token punctuation">:</span> <span class="token string">&quot;红&quot;</span><span class="token punctuation">,</span> 
    Color<span class="token punctuation">.</span>Green<span class="token punctuation">:</span> <span class="token string">&quot;绿&quot;</span><span class="token punctuation">,</span> 
    Color<span class="token punctuation">.</span>Blue<span class="token punctuation">:</span> <span class="token string">&quot;蓝&quot;</span><span class="token punctuation">,</span> 
    Color<span class="token punctuation">.</span>Yellow<span class="token punctuation">:</span> <span class="token string">&quot;黄&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment"># 实用类, 当需要将按钮组与枚举量相绑定时, 可参考此类型的实现</span>
<span class="token keyword">class</span> <span class="token class-name">ValueBindButtonGroup</span><span class="token punctuation">(</span>QButtonGroup<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&#39;&#39;&#39;
    根据枚举类型信息, 生成对应的复选框按钮组组件
    &#39;&#39;&#39;</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> bind_enum<span class="token punctuation">:</span> <span class="token builtin">type</span><span class="token punctuation">,</span> default_value<span class="token punctuation">:</span> <span class="token builtin">object</span><span class="token punctuation">,</span> name_list<span class="token punctuation">:</span> Optional<span class="token punctuation">[</span>Union<span class="token punctuation">[</span><span class="token builtin">dict</span><span class="token punctuation">[</span>Any<span class="token punctuation">,</span> <span class="token builtin">str</span><span class="token punctuation">]</span><span class="token punctuation">,</span> Sequence<span class="token punctuation">[</span><span class="token builtin">str</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">None</span><span class="token punctuation">,</span> button_widget<span class="token punctuation">:</span> <span class="token builtin">type</span> <span class="token operator">=</span> QRadioButton<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&#39;&#39;&#39;
        * \`bind_enum\` 继承自 enum.Enum 类的枚举类型
        * \`default_value\` 默认选中值
        * \`name_list\` 按钮名称列表, 默认使用枚举类型的键名
        * \`button_widget\` 按钮组件类型, 默认使用 \`QRadioButton\`
        &#39;&#39;&#39;</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>_button_map<span class="token punctuation">:</span> <span class="token builtin">dict</span><span class="token punctuation">[</span><span class="token builtin">object</span><span class="token punctuation">,</span> QAbstractButton<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
        self<span class="token punctuation">.</span>_bind_enum <span class="token operator">=</span> bind_enum
        self<span class="token punctuation">.</span>_enum_values <span class="token operator">=</span> <span class="token builtin">tuple</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>_bind_enum<span class="token punctuation">.</span>__members__<span class="token punctuation">.</span>values<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

        <span class="token comment"># 生成按钮并绑定</span>
        <span class="token keyword">if</span> name_list <span class="token operator">==</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
            name_list <span class="token operator">=</span> <span class="token builtin">tuple</span><span class="token punctuation">(</span>bind_enum<span class="token punctuation">.</span>__members__<span class="token punctuation">.</span>keys<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">elif</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>name_list<span class="token punctuation">,</span> <span class="token builtin">dict</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            name_list <span class="token operator">=</span> <span class="token builtin">tuple</span><span class="token punctuation">(</span>name_list<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token keyword">for</span> key <span class="token keyword">in</span> self<span class="token punctuation">.</span>_enum_values<span class="token punctuation">)</span>

        <span class="token keyword">for</span> <span class="token builtin">id</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span> <span class="token keyword">in</span> <span class="token builtin">enumerate</span><span class="token punctuation">(</span><span class="token builtin">zip</span><span class="token punctuation">(</span>name_list<span class="token punctuation">,</span> self<span class="token punctuation">.</span>_enum_values<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>_button_map<span class="token punctuation">[</span>value<span class="token punctuation">]</span> <span class="token operator">=</span> button_widget<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span>
            self<span class="token punctuation">.</span>_button_map<span class="token punctuation">[</span>value<span class="token punctuation">]</span><span class="token punctuation">.</span>setCheckable<span class="token punctuation">(</span><span class="token boolean">True</span><span class="token punctuation">)</span>
            self<span class="token punctuation">.</span>addButton<span class="token punctuation">(</span>self<span class="token punctuation">.</span>_button_map<span class="token punctuation">[</span>value<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token builtin">id</span><span class="token punctuation">)</span>

        <span class="token comment"># 首先对被监控变量取空值, 并设为私有</span>
        self<span class="token punctuation">.</span>_value <span class="token operator">=</span> <span class="token boolean">None</span>
        <span class="token comment"># 使用私有槽, 将变量绑定到按钮组的结果上 (还需要反向绑定, 具体见下)</span>
        self<span class="token punctuation">.</span>idClicked<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>self<span class="token punctuation">.</span>_SetValueByButton<span class="token punctuation">)</span>
        <span class="token comment"># 通过给定方法, 给被监控变量赋初值</span>
        self<span class="token punctuation">.</span>SetValue<span class="token punctuation">(</span>default_value<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">value</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&#39;&#39;&#39;
        获取当前选中值
        &#39;&#39;&#39;</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>_value

    ValueChange <span class="token operator">=</span> Signal<span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span>

    <span class="token decorator annotation punctuation">@Slot</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">SetValue</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> new_value<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&#39;&#39;&#39;
        设置当前选中值
        &#39;&#39;&#39;</span>
        <span class="token comment"># 仅当变量与原先不同时, 属于一次有效的修改</span>
        <span class="token keyword">if</span> new_value <span class="token operator">!=</span> self<span class="token punctuation">.</span>_value<span class="token punctuation">:</span>
            <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>new_value<span class="token punctuation">,</span> self<span class="token punctuation">.</span>_bind_enum<span class="token punctuation">)</span><span class="token punctuation">:</span>
                <span class="token keyword">raise</span><span class="token punctuation">(</span>Exception<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;Require Type </span><span class="token interpolation"><span class="token punctuation">{</span>self<span class="token punctuation">.</span>_bind_enum<span class="token punctuation">}</span></span><span class="token string"> But Given </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">type</span><span class="token punctuation">(</span>new_value<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string"> Instead&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            
            self<span class="token punctuation">.</span>_value <span class="token operator">=</span> new_value
            <span class="token comment"># 通过信号监控变量改变</span>
            self<span class="token punctuation">.</span>ValueChange<span class="token punctuation">.</span>emit<span class="token punctuation">(</span>new_value<span class="token punctuation">)</span>
            <span class="token comment"># 在修改函数中, 将按钮组反向绑定到按钮上</span>
            self<span class="token punctuation">.</span>_button_map<span class="token punctuation">[</span>new_value<span class="token punctuation">]</span><span class="token punctuation">.</span>click<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token decorator annotation punctuation">@Slot</span><span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">_SetValueByButton</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> <span class="token builtin">id</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&#39;&#39;&#39;
        私有组件绑定槽
        &#39;&#39;&#39;</span>
        new_value <span class="token operator">=</span> self<span class="token punctuation">.</span>_enum_values<span class="token punctuation">[</span><span class="token builtin">id</span><span class="token punctuation">]</span>
        <span class="token comment"># 与 Clicked 信号绑定, 因此重复点击也肯能触发</span>
        <span class="token keyword">if</span> new_value <span class="token operator">!=</span> self<span class="token punctuation">.</span>_value<span class="token punctuation">:</span>   
            self<span class="token punctuation">.</span>_value <span class="token operator">=</span> new_value 
            self<span class="token punctuation">.</span>ValueChange<span class="token punctuation">.</span>emit<span class="token punctuation">(</span>new_value<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">GetButton</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> value<span class="token punctuation">:</span> <span class="token builtin">object</span><span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> QAbstractButton<span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&#39;&#39;&#39;
        获取枚举值对应的组件对象
        &#39;&#39;&#39;</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token builtin">isinstance</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> self<span class="token punctuation">.</span>_bind_enum<span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token keyword">raise</span><span class="token punctuation">(</span>Exception<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;Require Type </span><span class="token interpolation"><span class="token punctuation">{</span>self<span class="token punctuation">.</span>_bind_enum<span class="token punctuation">}</span></span><span class="token string"> But Given </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">type</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string"> Instead&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>_button_map<span class="token punctuation">[</span>value<span class="token punctuation">]</span>

    <span class="token keyword">def</span> <span class="token function">IteratorButton</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> Iterable<span class="token punctuation">[</span><span class="token builtin">tuple</span><span class="token punctuation">[</span><span class="token builtin">object</span><span class="token punctuation">,</span> QAbstractButton<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&#39;&#39;&#39;
        获取按钮组件映射的迭代器
        &#39;&#39;&#39;</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>_button_map<span class="token punctuation">.</span>items<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">class</span> <span class="token class-name">MainWindow</span><span class="token punctuation">(</span>QWidget<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token comment"># 创建组件</span>
        self<span class="token punctuation">.</span>vbInput <span class="token operator">=</span> ValueBindButtonGroup<span class="token punctuation">(</span>Color<span class="token punctuation">,</span> Color<span class="token punctuation">.</span>Red<span class="token punctuation">,</span> ColorName<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>lView <span class="token operator">=</span> QLabel<span class="token punctuation">(</span><span class="token string">&quot;选择颜色:&quot;</span><span class="token punctuation">)</span>

        <span class="token comment"># 组件布局 </span>
        <span class="token comment"># 从底至上布局, 如果过于复杂, 应当拆分为多个容器类</span>
        self<span class="token punctuation">.</span>layout_group <span class="token operator">=</span> QBoxLayout<span class="token punctuation">(</span>QBoxLayout<span class="token punctuation">.</span>Direction<span class="token punctuation">.</span>LeftToRight<span class="token punctuation">)</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span>value<span class="token punctuation">,</span> button<span class="token punctuation">)</span> <span class="token keyword">in</span> self<span class="token punctuation">.</span>vbInput<span class="token punctuation">.</span>IteratorButton<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>layout_group<span class="token punctuation">.</span>addWidget<span class="token punctuation">(</span>button<span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>layout_base <span class="token operator">=</span> QBoxLayout<span class="token punctuation">(</span>QBoxLayout<span class="token punctuation">.</span>Direction<span class="token punctuation">.</span>TopToBottom<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>layout_base<span class="token punctuation">.</span>addLayout<span class="token punctuation">(</span>self<span class="token punctuation">.</span>layout_group<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>layout_base<span class="token punctuation">.</span>addWidget<span class="token punctuation">(</span>self<span class="token punctuation">.</span>lView<span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>setLayout<span class="token punctuation">(</span>self<span class="token punctuation">.</span>layout_base<span class="token punctuation">)</span>

        <span class="token comment"># 建立连接, 并使用被链接量的初值 (被链接量已初始化) , 调用槽函数完成初始化</span>
        self<span class="token punctuation">.</span>vbInput<span class="token punctuation">.</span>ValueChange<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>self<span class="token punctuation">.</span>SelectColor<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>SelectColor<span class="token punctuation">(</span>self<span class="token punctuation">.</span>vbInput<span class="token punctuation">.</span>value<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    
    <span class="token decorator annotation punctuation">@Slot</span><span class="token punctuation">(</span>Color<span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">SelectColor</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> color<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>lView<span class="token punctuation">.</span>setText<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;当前选择颜色: </span><span class="token interpolation"><span class="token punctuation">{</span>ColorName<span class="token punctuation">[</span>color<span class="token punctuation">]</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>

app <span class="token operator">=</span> QApplication<span class="token punctuation">(</span><span class="token punctuation">)</span>
win <span class="token operator">=</span> MainWindow<span class="token punctuation">(</span><span class="token punctuation">)</span>

win<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token keyword">exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行效果 <img src="`+u+`" alt=""></p><h3 id="文本输入渲染程序" tabindex="-1"><a class="header-anchor" href="#文本输入渲染程序" aria-hidden="true">#</a> 文本输入渲染程序</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> PySide6<span class="token punctuation">.</span>QtCore <span class="token keyword">import</span> Slot<span class="token punctuation">,</span> Signal
<span class="token keyword">from</span> PySide6<span class="token punctuation">.</span>QtWidgets <span class="token keyword">import</span> <span class="token punctuation">(</span>
    QApplication<span class="token punctuation">,</span> QWidget<span class="token punctuation">,</span> QTextEdit<span class="token punctuation">,</span> QTextBrowser<span class="token punctuation">,</span> QPushButton<span class="token punctuation">,</span> QRadioButton<span class="token punctuation">,</span> QButtonGroup<span class="token punctuation">,</span> QLabel<span class="token punctuation">,</span> QAbstractButton<span class="token punctuation">,</span>
    QBoxLayout<span class="token punctuation">,</span>
    QSizePolicy
<span class="token punctuation">)</span>

<span class="token keyword">from</span> enum <span class="token keyword">import</span> Enum
<span class="token keyword">from</span> typing <span class="token keyword">import</span> Optional<span class="token punctuation">,</span> Sequence<span class="token punctuation">,</span> Iterable

<span class="token keyword">class</span> <span class="token class-name">RenderMode</span><span class="token punctuation">(</span>Enum<span class="token punctuation">)</span><span class="token punctuation">:</span>
    HTML <span class="token operator">=</span> <span class="token number">0</span>
    MARKDOWN <span class="token operator">=</span> <span class="token number">1</span>

<span class="token keyword">class</span> <span class="token class-name">ValueBindButtonGroup</span><span class="token punctuation">(</span>QButtonGroup<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token comment"># 具体见枚举量绑定按钮组</span>

<span class="token keyword">class</span> <span class="token class-name">InputArea</span><span class="token punctuation">(</span>QWidget<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&#39;&#39;&#39;
    输出区
    &#39;&#39;&#39;</span>
    updateText <span class="token operator">=</span> Signal<span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>teInput <span class="token operator">=</span> QTextEdit<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>teInput<span class="token punctuation">.</span>setPlaceholderText<span class="token punctuation">(</span><span class="token string">&quot;输入内容&quot;</span><span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>layoutBase <span class="token operator">=</span> QBoxLayout<span class="token punctuation">(</span>QBoxLayout<span class="token punctuation">.</span>Direction<span class="token punctuation">.</span>TopToBottom<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>layoutBase<span class="token punctuation">.</span>addWidget<span class="token punctuation">(</span>QLabel<span class="token punctuation">(</span><span class="token string">&quot;输入区&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>layoutBase<span class="token punctuation">.</span>addWidget<span class="token punctuation">(</span>self<span class="token punctuation">.</span>teInput<span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>setLayout<span class="token punctuation">(</span>self<span class="token punctuation">.</span>layoutBase<span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>teInput<span class="token punctuation">.</span>textChanged<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token keyword">lambda</span><span class="token punctuation">:</span> self<span class="token punctuation">.</span>updateText<span class="token punctuation">.</span>emit<span class="token punctuation">(</span>self<span class="token punctuation">.</span>teInput<span class="token punctuation">.</span>toPlainText<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>teInput<span class="token punctuation">.</span>setPlainText<span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">class</span> <span class="token class-name">RenderArea</span><span class="token punctuation">(</span>QWidget<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&#39;&#39;&#39;
    渲染显示区
    &#39;&#39;&#39;</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>

        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>tbRender <span class="token operator">=</span> QTextBrowser<span class="token punctuation">(</span><span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>layoutBase <span class="token operator">=</span> QBoxLayout<span class="token punctuation">(</span>QBoxLayout<span class="token punctuation">.</span>Direction<span class="token punctuation">.</span>TopToBottom<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>layoutBase<span class="token punctuation">.</span>addWidget<span class="token punctuation">(</span>QLabel<span class="token punctuation">(</span><span class="token string">&quot;渲染区&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>layoutBase<span class="token punctuation">.</span>addWidget<span class="token punctuation">(</span>self<span class="token punctuation">.</span>tbRender<span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>setLayout<span class="token punctuation">(</span>self<span class="token punctuation">.</span>layoutBase<span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>renderMode <span class="token operator">=</span> <span class="token boolean">None</span>

        self<span class="token punctuation">.</span>SetRenderMode<span class="token punctuation">(</span>RenderMode<span class="token punctuation">.</span>HTML<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>SetRenderText<span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>

    <span class="token decorator annotation punctuation">@Slot</span><span class="token punctuation">(</span>RenderMode<span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">SetRenderMode</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> mode<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> self<span class="token punctuation">.</span>renderMode <span class="token operator">!=</span> mode<span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>renderMode <span class="token operator">=</span> mode
            self<span class="token punctuation">.</span>SetRenderText<span class="token punctuation">(</span>self<span class="token punctuation">.</span>tbRender<span class="token punctuation">.</span>toPlainText<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token decorator annotation punctuation">@Slot</span><span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">SetRenderText</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> text<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> self<span class="token punctuation">.</span>renderMode <span class="token operator">==</span> RenderMode<span class="token punctuation">.</span>HTML<span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>tbRender<span class="token punctuation">.</span>setHtml<span class="token punctuation">(</span>text<span class="token punctuation">)</span>
        <span class="token keyword">elif</span> self<span class="token punctuation">.</span>renderMode <span class="token operator">==</span> RenderMode<span class="token punctuation">.</span>MARKDOWN<span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>tbRender<span class="token punctuation">.</span>setMarkdown<span class="token punctuation">(</span>text<span class="token punctuation">)</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>tbRender<span class="token punctuation">.</span>setHtml<span class="token punctuation">(</span><span class="token string">&quot;&lt;font color=&#39;red&#39;&gt;Unknown Render Mode&lt;/font&gt;&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">class</span> <span class="token class-name">MainArea</span><span class="token punctuation">(</span>QWidget<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&#39;&#39;&#39;
    程序主要区域
    &#39;&#39;&#39;</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>inputArea <span class="token operator">=</span> InputArea<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>renderArea <span class="token operator">=</span> RenderArea<span class="token punctuation">(</span><span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>layoutBase <span class="token operator">=</span> QBoxLayout<span class="token punctuation">(</span>QBoxLayout<span class="token punctuation">.</span>Direction<span class="token punctuation">.</span>LeftToRight<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>layoutBase<span class="token punctuation">.</span>addWidget<span class="token punctuation">(</span>self<span class="token punctuation">.</span>inputArea<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>layoutBase<span class="token punctuation">.</span>addWidget<span class="token punctuation">(</span>self<span class="token punctuation">.</span>renderArea<span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>setLayout<span class="token punctuation">(</span>self<span class="token punctuation">.</span>layoutBase<span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>inputArea<span class="token punctuation">.</span>updateText<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>self<span class="token punctuation">.</span>renderArea<span class="token punctuation">.</span>SetRenderText<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>inputArea<span class="token punctuation">.</span>teInput<span class="token punctuation">.</span>setPlainText<span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">class</span> <span class="token class-name">ControlArea</span><span class="token punctuation">(</span>QWidget<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&#39;&#39;&#39;
    程序控制区域
    &#39;&#39;&#39;</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>
        
        self<span class="token punctuation">.</span>pbClear <span class="token operator">=</span> QPushButton<span class="token punctuation">(</span><span class="token string">&quot;清除内容&quot;</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>vbMode <span class="token operator">=</span> ValueBindButtonGroup<span class="token punctuation">(</span>RenderMode<span class="token punctuation">,</span> RenderMode<span class="token punctuation">.</span>HTML<span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>layoutBase <span class="token operator">=</span> QBoxLayout<span class="token punctuation">(</span>QBoxLayout<span class="token punctuation">.</span>Direction<span class="token punctuation">.</span>LeftToRight<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>layoutBase<span class="token punctuation">.</span>addWidget<span class="token punctuation">(</span>self<span class="token punctuation">.</span>pbClear<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>layoutBase<span class="token punctuation">.</span>addWidget<span class="token punctuation">(</span>QLabel<span class="token punctuation">(</span><span class="token string">&quot;渲染模式:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>layoutBase<span class="token punctuation">.</span>addWidget<span class="token punctuation">(</span>self<span class="token punctuation">.</span>vbMode<span class="token punctuation">.</span>GetButton<span class="token punctuation">(</span>RenderMode<span class="token punctuation">.</span>HTML<span class="token punctuation">)</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>layoutBase<span class="token punctuation">.</span>addWidget<span class="token punctuation">(</span>self<span class="token punctuation">.</span>vbMode<span class="token punctuation">.</span>GetButton<span class="token punctuation">(</span>RenderMode<span class="token punctuation">.</span>MARKDOWN<span class="token punctuation">)</span><span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>setLayout<span class="token punctuation">(</span>self<span class="token punctuation">.</span>layoutBase<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>setSizePolicy<span class="token punctuation">(</span>QSizePolicy<span class="token punctuation">.</span>Policy<span class="token punctuation">.</span>Fixed<span class="token punctuation">,</span> QSizePolicy<span class="token punctuation">.</span>Policy<span class="token punctuation">.</span>Minimum<span class="token punctuation">)</span>

<span class="token keyword">class</span> <span class="token class-name">MainApp</span><span class="token punctuation">(</span>QWidget<span class="token punctuation">)</span><span class="token punctuation">:</span>
    
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>controlArea <span class="token operator">=</span> ControlArea<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>mainArea <span class="token operator">=</span> MainArea<span class="token punctuation">(</span><span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>layoutBase <span class="token operator">=</span> QBoxLayout<span class="token punctuation">(</span>QBoxLayout<span class="token punctuation">.</span>Direction<span class="token punctuation">.</span>TopToBottom<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>layoutBase<span class="token punctuation">.</span>addWidget<span class="token punctuation">(</span>self<span class="token punctuation">.</span>mainArea<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>layoutBase<span class="token punctuation">.</span>addWidget<span class="token punctuation">(</span>self<span class="token punctuation">.</span>controlArea<span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>setLayout<span class="token punctuation">(</span>self<span class="token punctuation">.</span>layoutBase<span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>controlArea<span class="token punctuation">.</span>vbMode<span class="token punctuation">.</span>ValueChange<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>self<span class="token punctuation">.</span>mainArea<span class="token punctuation">.</span>renderArea<span class="token punctuation">.</span>SetRenderMode<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>controlArea<span class="token punctuation">.</span>vbMode<span class="token punctuation">.</span>SetValue<span class="token punctuation">(</span>RenderMode<span class="token punctuation">.</span>MARKDOWN<span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>controlArea<span class="token punctuation">.</span>pbClear<span class="token punctuation">.</span>clicked<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>self<span class="token punctuation">.</span>mainArea<span class="token punctuation">.</span>inputArea<span class="token punctuation">.</span>teInput<span class="token punctuation">.</span>clear<span class="token punctuation">)</span>

app <span class="token operator">=</span> QApplication<span class="token punctuation">(</span><span class="token punctuation">)</span>
win <span class="token operator">=</span> MainApp<span class="token punctuation">(</span><span class="token punctuation">)</span>

win<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token keyword">exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行效果 <img src="`+k+`" alt=""></p><h3 id="登录会话程序" tabindex="-1"><a class="header-anchor" href="#登录会话程序" aria-hidden="true">#</a> 登录会话程序</h3><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> PySide6<span class="token punctuation">.</span>QtCore <span class="token keyword">import</span> <span class="token punctuation">(</span>
    Slot<span class="token punctuation">,</span> Signal
<span class="token punctuation">)</span>
<span class="token keyword">from</span> PySide6<span class="token punctuation">.</span>QtWidgets <span class="token keyword">import</span> <span class="token punctuation">(</span>
    QApplication<span class="token punctuation">,</span>
    QPushButton<span class="token punctuation">,</span> QLabel<span class="token punctuation">,</span> QLineEdit<span class="token punctuation">,</span>
    QDialogButtonBox<span class="token punctuation">,</span>
    QFormLayout<span class="token punctuation">,</span> QBoxLayout<span class="token punctuation">,</span>
    QDialog<span class="token punctuation">,</span> QWidget
<span class="token punctuation">)</span>
<span class="token keyword">from</span> PySide6<span class="token punctuation">.</span>QtGui <span class="token keyword">import</span><span class="token punctuation">(</span>
    QRegularExpressionValidator<span class="token punctuation">,</span> QValidator<span class="token punctuation">,</span> QPixmap<span class="token punctuation">,</span> QPalette
<span class="token punctuation">)</span>
<span class="token keyword">from</span> dataclasses <span class="token keyword">import</span> dataclass

<span class="token decorator annotation punctuation">@dataclass</span>
<span class="token keyword">class</span> <span class="token class-name">FormData</span><span class="token punctuation">:</span>
    account<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span>
    pw<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> <span class="token string">&quot;&quot;</span>

<span class="token comment"># 5 - 16 位数字</span>
RE_ACCOUNT <span class="token operator">=</span> <span class="token string">r&quot;^\\d{5,16}$&quot;</span>
<span class="token comment"># 数字, 字母与特殊符号, 至少包含一个大写字母, 小写字母与数字, 8 - 20 位</span>
RE_PW <span class="token operator">=</span> <span class="token string">r&quot;^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d$@$!%*?&amp;]{8,20}$&quot;</span>

<span class="token comment"># 使用信号监控验证是否通过</span>
<span class="token keyword">class</span> <span class="token class-name">ValidLineEdit</span><span class="token punctuation">(</span>QLineEdit<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&#39;&#39;&#39;
    实现验证信号 ValidStateChange 的输入栏组件
    &#39;&#39;&#39;</span>
    ValidStateChange <span class="token operator">=</span> Signal<span class="token punctuation">(</span><span class="token builtin">bool</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>_is_valid <span class="token operator">=</span> <span class="token boolean">None</span>

        self<span class="token punctuation">.</span>_SetValidState<span class="token punctuation">(</span><span class="token boolean">False</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>textChanged<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>self<span class="token punctuation">.</span>_SlotCheckValid<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">is_valid</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>_is_valid

    <span class="token decorator annotation punctuation">@Slot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">_SetValidState</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> is_valid<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> self<span class="token punctuation">.</span>_is_valid <span class="token operator">!=</span> is_valid<span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>_is_valid <span class="token operator">=</span> is_valid
            self<span class="token punctuation">.</span>ValidStateChange<span class="token punctuation">.</span>emit<span class="token punctuation">(</span>self<span class="token punctuation">.</span>_is_valid<span class="token punctuation">)</span>

    <span class="token decorator annotation punctuation">@Slot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">_SlotCheckValid</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>_SetValidState<span class="token punctuation">(</span>self<span class="token punctuation">.</span>hasAcceptableInput<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 通过继承布局的方式创建有关联的几个组件</span>
<span class="token keyword">class</span> <span class="token class-name">LineEditWithSignLayout</span><span class="token punctuation">(</span>QBoxLayout<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&#39;&#39;&#39;
    带有验证标识的输入栏布局
    &#39;&#39;&#39;</span>
    <span class="token comment"># 图标路径</span>
    <span class="token comment"># https://uxwing.com/green-checkmark-line-icon/</span>
    YES_SIGN_PATH <span class="token operator">=</span> <span class="token string">&quot;res/yes.svg&quot;</span>
    <span class="token comment"># https://uxwing.com/red-x-line-icon/</span>
    NO_SIGN_PATH <span class="token operator">=</span> <span class="token string">&quot;res/no.svg&quot;</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span>QBoxLayout<span class="token punctuation">.</span>Direction<span class="token punctuation">.</span>LeftToRight<span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>label <span class="token operator">=</span> QLabel<span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>label<span class="token punctuation">.</span>setVisible<span class="token punctuation">(</span><span class="token boolean">False</span><span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>lineEdit <span class="token operator">=</span> ValidLineEdit<span class="token punctuation">(</span><span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>addWidget<span class="token punctuation">(</span>self<span class="token punctuation">.</span>lineEdit<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>addWidget<span class="token punctuation">(</span>self<span class="token punctuation">.</span>label<span class="token punctuation">)</span>
        <span class="token comment"># self.setLayout(self.layoutBase)</span>

        font_size <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>self<span class="token punctuation">.</span>lineEdit<span class="token punctuation">.</span>font<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>pointSize<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">2</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>pmYes <span class="token operator">=</span> QPixmap<span class="token punctuation">(</span>self<span class="token punctuation">.</span>YES_SIGN_PATH<span class="token punctuation">)</span><span class="token punctuation">.</span>scaled<span class="token punctuation">(</span>font_size<span class="token punctuation">,</span> font_size<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>pmNo <span class="token operator">=</span> QPixmap<span class="token punctuation">(</span>self<span class="token punctuation">.</span>NO_SIGN_PATH<span class="token punctuation">)</span><span class="token punctuation">.</span>scaled<span class="token punctuation">(</span>font_size<span class="token punctuation">,</span> font_size<span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>lineEdit<span class="token punctuation">.</span>ValidStateChange<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>self<span class="token punctuation">.</span>_SlotSetSign<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>_SlotSetSign<span class="token punctuation">(</span>self<span class="token punctuation">.</span>lineEdit<span class="token punctuation">.</span>is_valid<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token decorator annotation punctuation">@Slot</span><span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">_SlotSetSign</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> is_valid<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>label<span class="token punctuation">.</span>setVisible<span class="token punctuation">(</span><span class="token boolean">True</span><span class="token punctuation">)</span>

        <span class="token keyword">if</span> is_valid<span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>label<span class="token punctuation">.</span>setPixmap<span class="token punctuation">(</span>self<span class="token punctuation">.</span>pmYes<span class="token punctuation">)</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>label<span class="token punctuation">.</span>setPixmap<span class="token punctuation">(</span>self<span class="token punctuation">.</span>pmNo<span class="token punctuation">)</span>

<span class="token comment"># 自定义验证器</span>
<span class="token keyword">class</span> <span class="token class-name">ValidatorImitator</span><span class="token punctuation">(</span>QValidator<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&#39;&#39;&#39;
    模仿已有输入栏的验证器
    &#39;&#39;&#39;</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> leObserved<span class="token punctuation">:</span> QLineEdit<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>leObserved <span class="token operator">=</span> leObserved
    
    <span class="token keyword">def</span> <span class="token function">validate</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> arg__1<span class="token punctuation">,</span> arg__2<span class="token punctuation">)</span><span class="token punctuation">:</span>
        res <span class="token operator">=</span> <span class="token boolean">None</span>

        <span class="token keyword">if</span> arg__1 <span class="token operator">==</span> self<span class="token punctuation">.</span>leObserved<span class="token punctuation">.</span>text<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token comment"># 当内容与被模仿验证器相同时通过验证</span>
            res <span class="token operator">=</span> QValidator<span class="token punctuation">.</span>State<span class="token punctuation">.</span>Acceptable
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            <span class="token comment"># 一般情况下, 使用被模仿验证器判断输入是否合法</span>
            validator <span class="token operator">=</span> self<span class="token punctuation">.</span>leObserved<span class="token punctuation">.</span>validator<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> validator <span class="token operator">==</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
                res <span class="token operator">=</span> QValidator<span class="token punctuation">.</span>State<span class="token punctuation">.</span>Intermediate
            <span class="token keyword">else</span><span class="token punctuation">:</span>
                <span class="token keyword">if</span> validator<span class="token punctuation">.</span>validate<span class="token punctuation">(</span>arg__1<span class="token punctuation">,</span> arg__2<span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">!=</span> QValidator<span class="token punctuation">.</span>State<span class="token punctuation">.</span>Invalid<span class="token punctuation">:</span> <span class="token comment"># type: ignore</span>
                    res <span class="token operator">=</span> QValidator<span class="token punctuation">.</span>State<span class="token punctuation">.</span>Intermediate
                <span class="token keyword">else</span><span class="token punctuation">:</span>
                    res <span class="token operator">=</span> QValidator<span class="token punctuation">.</span>State<span class="token punctuation">.</span>Invalid
        <span class="token keyword">return</span> <span class="token punctuation">(</span>res<span class="token punctuation">,</span> arg__1<span class="token punctuation">,</span> arg__2<span class="token punctuation">)</span>

<span class="token comment"># 复杂会话窗口</span>
<span class="token keyword">class</span> <span class="token class-name">RegistDialog</span><span class="token punctuation">(</span>QDialog<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> parent<span class="token punctuation">:</span> QWidget<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span>parent<span class="token punctuation">)</span>

        <span class="token comment"># 表单收集数据</span>
        self<span class="token punctuation">.</span>_form_result <span class="token operator">=</span> <span class="token boolean">None</span>

        <span class="token comment"># 账号输入栏</span>
        lewsAccountInput <span class="token operator">=</span> LineEditWithSignLayout<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>leAccountInput <span class="token operator">=</span> lewsAccountInput<span class="token punctuation">.</span>lineEdit
        self<span class="token punctuation">.</span>leAccountInput<span class="token punctuation">.</span>setPlaceholderText<span class="token punctuation">(</span><span class="token string">&quot;输入账号&quot;</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>leAccountInput<span class="token punctuation">.</span>setValidator<span class="token punctuation">(</span>
            QRegularExpressionValidator<span class="token punctuation">(</span>RE_ACCOUNT<span class="token punctuation">)</span>
        <span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>leAccountInput<span class="token punctuation">.</span>setToolTip<span class="token punctuation">(</span><span class="token string">&quot;账号为 5 - 16 位数字&quot;</span><span class="token punctuation">)</span>

        <span class="token comment"># 密码输入栏</span>
        lewsPwInput <span class="token operator">=</span> LineEditWithSignLayout<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>lePwInput <span class="token operator">=</span> lewsPwInput<span class="token punctuation">.</span>lineEdit
        self<span class="token punctuation">.</span>lePwInput<span class="token punctuation">.</span>setPlaceholderText<span class="token punctuation">(</span><span class="token string">&quot;输入密码&quot;</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>lePwInput<span class="token punctuation">.</span>setValidator<span class="token punctuation">(</span>
            QRegularExpressionValidator<span class="token punctuation">(</span>RE_PW<span class="token punctuation">)</span>
        <span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>lePwInput<span class="token punctuation">.</span>setEchoMode<span class="token punctuation">(</span>
            QLineEdit<span class="token punctuation">.</span>EchoMode<span class="token punctuation">.</span>Password
        <span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>lePwInput<span class="token punctuation">.</span>setToolTip<span class="token punctuation">(</span><span class="token string">&quot;密码为数字, 字母与特殊符号的组合, 至少包含一个大写字母, 小写字母与数字, 8 - 20 位&quot;</span><span class="token punctuation">)</span>
        <span class="token comment"># 根据输入字符长度, 预留空间</span>
        font_width <span class="token operator">=</span> self<span class="token punctuation">.</span>lePwInput<span class="token punctuation">.</span>font<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>pointSize<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>lePwInput<span class="token punctuation">.</span>setMinimumWidth<span class="token punctuation">(</span>font_width <span class="token operator">*</span> <span class="token number">30</span><span class="token punctuation">)</span>

        <span class="token comment"># 再次输入密码</span>
        lewsPwPardon <span class="token operator">=</span> LineEditWithSignLayout<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>lePwPardon <span class="token operator">=</span> lewsPwPardon<span class="token punctuation">.</span>lineEdit
        self<span class="token punctuation">.</span>lePwPardon<span class="token punctuation">.</span>setPlaceholderText<span class="token punctuation">(</span><span class="token string">&quot;再次输入密码&quot;</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>lePwPardon<span class="token punctuation">.</span>setValidator<span class="token punctuation">(</span>
            ValidatorImitator<span class="token punctuation">(</span>self<span class="token punctuation">.</span>lePwInput<span class="token punctuation">)</span>
        <span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>lePwPardon<span class="token punctuation">.</span>setEchoMode<span class="token punctuation">(</span>
            QLineEdit<span class="token punctuation">.</span>EchoMode<span class="token punctuation">.</span>Password
        <span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>lePwPardon<span class="token punctuation">.</span>setToolTip<span class="token punctuation">(</span><span class="token string">&quot;密码为数字, 字母与特殊符号的组合, 至少包含一个大写字母, 小写字母与数字, 8 - 20 位&quot;</span><span class="token punctuation">)</span>
        <span class="token comment"># 根据输入字符长度, 预留空间</span>
        font_width <span class="token operator">=</span> self<span class="token punctuation">.</span>lePwInput<span class="token punctuation">.</span>font<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>pointSize<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>lePwInput<span class="token punctuation">.</span>setMinimumWidth<span class="token punctuation">(</span>font_width <span class="token operator">*</span> <span class="token number">30</span><span class="token punctuation">)</span>

        <span class="token comment"># 会话按钮</span>
        self<span class="token punctuation">.</span>dbbButton <span class="token operator">=</span> QDialogButtonBox<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>dbbButton<span class="token punctuation">.</span>setStandardButtons<span class="token punctuation">(</span>
            QDialogButtonBox<span class="token punctuation">.</span>StandardButton<span class="token punctuation">.</span>Ok <span class="token operator">|</span>
            QDialogButtonBox<span class="token punctuation">.</span>StandardButton<span class="token punctuation">.</span>Cancel
        <span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>dbbButton<span class="token punctuation">.</span>button<span class="token punctuation">(</span>QDialogButtonBox<span class="token punctuation">.</span>StandardButton<span class="token punctuation">.</span>Ok<span class="token punctuation">)</span><span class="token punctuation">.</span>setText<span class="token punctuation">(</span><span class="token string">&quot;确认&quot;</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>dbbButton<span class="token punctuation">.</span>button<span class="token punctuation">(</span>QDialogButtonBox<span class="token punctuation">.</span>StandardButton<span class="token punctuation">.</span>Cancel<span class="token punctuation">)</span><span class="token punctuation">.</span>setText<span class="token punctuation">(</span><span class="token string">&quot;取消&quot;</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>dbbButton<span class="token punctuation">.</span>accepted<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>self<span class="token punctuation">.</span>SlotOKCheck<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>dbbButton<span class="token punctuation">.</span>rejected<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>self<span class="token punctuation">.</span>reject<span class="token punctuation">)</span>

        <span class="token comment"># 警告标签</span>
        self<span class="token punctuation">.</span>lWarn <span class="token operator">=</span> QLabel<span class="token punctuation">(</span><span class="token string">&quot; &quot;</span><span class="token punctuation">)</span>
        <span class="token comment"># 设置标签字体颜色</span>
        lWarnPalette <span class="token operator">=</span> QPalette<span class="token punctuation">(</span><span class="token punctuation">)</span>
        lWarnPalette<span class="token punctuation">.</span>setColor<span class="token punctuation">(</span>QPalette<span class="token punctuation">.</span>ColorRole<span class="token punctuation">.</span>WindowText<span class="token punctuation">,</span> <span class="token string">&quot;#FF0000&quot;</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>lWarn<span class="token punctuation">.</span>setPalette<span class="token punctuation">(</span>lWarnPalette<span class="token punctuation">)</span>

        <span class="token comment"># 布局</span>
        self<span class="token punctuation">.</span>baseLayout <span class="token operator">=</span> QFormLayout<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>baseLayout<span class="token punctuation">.</span>addRow<span class="token punctuation">(</span>QLabel<span class="token punctuation">(</span><span class="token string">&quot;注册账号&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>baseLayout<span class="token punctuation">.</span>addRow<span class="token punctuation">(</span><span class="token string">&quot;账号:&quot;</span><span class="token punctuation">,</span> lewsAccountInput<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>baseLayout<span class="token punctuation">.</span>addRow<span class="token punctuation">(</span><span class="token string">&quot;密码:&quot;</span><span class="token punctuation">,</span> lewsPwInput<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>baseLayout<span class="token punctuation">.</span>addRow<span class="token punctuation">(</span><span class="token string">&quot;确认密码:&quot;</span><span class="token punctuation">,</span> lewsPwPardon<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>baseLayout<span class="token punctuation">.</span>addRow<span class="token punctuation">(</span>self<span class="token punctuation">.</span>lWarn<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>baseLayout<span class="token punctuation">.</span>addRow<span class="token punctuation">(</span>self<span class="token punctuation">.</span>dbbButton<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>setLayout<span class="token punctuation">(</span>self<span class="token punctuation">.</span>baseLayout<span class="token punctuation">)</span>

        <span class="token comment"># 连接</span>
        <span class="token comment"># 用于退出时清空已有数据, 无论是否接收</span>
        self<span class="token punctuation">.</span>finished<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>self<span class="token punctuation">.</span>ClearForm<span class="token punctuation">)</span>

    <span class="token comment"># 在用户提交前, 对输入内容进行检查</span>
    <span class="token decorator annotation punctuation">@Slot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">SlotOKCheck</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> <span class="token keyword">not</span> self<span class="token punctuation">.</span>leAccountInput<span class="token punctuation">.</span>is_valid<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>lWarn<span class="token punctuation">.</span>setText<span class="token punctuation">(</span><span class="token string">&quot;账号不正确&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">elif</span> <span class="token keyword">not</span> self<span class="token punctuation">.</span>lePwInput<span class="token punctuation">.</span>is_valid<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> 
            self<span class="token punctuation">.</span>lWarn<span class="token punctuation">.</span>setText<span class="token punctuation">(</span><span class="token string">&quot;密码不满足要求&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">elif</span> <span class="token keyword">not</span> self<span class="token punctuation">.</span>lePwPardon<span class="token punctuation">.</span>is_valid<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> 
            self<span class="token punctuation">.</span>lWarn<span class="token punctuation">.</span>setText<span class="token punctuation">(</span><span class="token string">&quot;重复输入密码不相同&quot;</span><span class="token punctuation">)</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            <span class="token comment"># 通过检查后, 收集表单数据, 并退出会话</span>
            self<span class="token punctuation">.</span>_form_result <span class="token operator">=</span> FormData<span class="token punctuation">(</span>
                account <span class="token operator">=</span> self<span class="token punctuation">.</span>leAccountInput<span class="token punctuation">.</span>text<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                pw <span class="token operator">=</span> self<span class="token punctuation">.</span>lePwInput<span class="token punctuation">.</span>text<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">)</span>
            self<span class="token punctuation">.</span>accept<span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token keyword">def</span> <span class="token function">get_form_result</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>_form_result
    
    <span class="token decorator annotation punctuation">@Slot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">ClearForm</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&#39;&#39;&#39;
        清空表单
        &#39;&#39;&#39;</span>
        self<span class="token punctuation">.</span>leAccountInput<span class="token punctuation">.</span>clear<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>lePwInput<span class="token punctuation">.</span>clear<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>lePwPardon<span class="token punctuation">.</span>clear<span class="token punctuation">(</span><span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>_form_result <span class="token operator">=</span> <span class="token boolean">None</span>

<span class="token keyword">class</span> <span class="token class-name">MainWin</span><span class="token punctuation">(</span>QWidget<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>dRegistForm <span class="token operator">=</span> RegistDialog<span class="token punctuation">(</span>self<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>pbRegiste <span class="token operator">=</span> QPushButton<span class="token punctuation">(</span><span class="token string">&quot;注册&quot;</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>lAccountInfo <span class="token operator">=</span> QLabel<span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>lPwInfo <span class="token operator">=</span> QLabel<span class="token punctuation">(</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
        font_width <span class="token operator">=</span> self<span class="token punctuation">.</span>lPwInfo<span class="token punctuation">.</span>font<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>pointSize<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>lPwInfo<span class="token punctuation">.</span>setMinimumWidth<span class="token punctuation">(</span>font_width <span class="token operator">*</span> <span class="token number">30</span><span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>layoutBase <span class="token operator">=</span> QFormLayout<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>layoutBase<span class="token punctuation">.</span>addRow<span class="token punctuation">(</span>self<span class="token punctuation">.</span>pbRegiste<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>layoutBase<span class="token punctuation">.</span>addRow<span class="token punctuation">(</span><span class="token string">&quot;注册账号:&quot;</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>lAccountInfo<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>layoutBase<span class="token punctuation">.</span>addRow<span class="token punctuation">(</span><span class="token string">&quot;注册密码:&quot;</span><span class="token punctuation">,</span> self<span class="token punctuation">.</span>lPwInfo<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>setLayout<span class="token punctuation">(</span>self<span class="token punctuation">.</span>layoutBase<span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>dRegistForm<span class="token punctuation">.</span>accepted<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>self<span class="token punctuation">.</span>_SlotDialogAccept<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>pbRegiste<span class="token punctuation">.</span>clicked<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>self<span class="token punctuation">.</span>dRegistForm<span class="token punctuation">.</span><span class="token builtin">open</span><span class="token punctuation">)</span>

    <span class="token decorator annotation punctuation">@Slot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">_SlotDialogAccept</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        res <span class="token operator">=</span> self<span class="token punctuation">.</span>dRegistForm<span class="token punctuation">.</span>get_form_result<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> res <span class="token operator">!=</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>lAccountInfo<span class="token punctuation">.</span>setText<span class="token punctuation">(</span>res<span class="token punctuation">.</span>account<span class="token punctuation">)</span>
            self<span class="token punctuation">.</span>lPwInfo<span class="token punctuation">.</span>setText<span class="token punctuation">(</span>res<span class="token punctuation">.</span>pw<span class="token punctuation">)</span>

app <span class="token operator">=</span> QApplication<span class="token punctuation">(</span><span class="token punctuation">)</span>
win <span class="token operator">=</span> MainWin<span class="token punctuation">(</span><span class="token punctuation">)</span>

win<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token keyword">exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行效果 <img src="`+d+`" alt=""></p><h3 id="子进程管理程序" tabindex="-1"><a class="header-anchor" href="#子进程管理程序" aria-hidden="true">#</a> 子进程管理程序</h3><p>主程序</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> PySide6<span class="token punctuation">.</span>QtGui <span class="token keyword">import</span> QCloseEvent
<span class="token keyword">from</span> PySide6<span class="token punctuation">.</span>QtWidgets <span class="token keyword">import</span> <span class="token punctuation">(</span>
    QWidget<span class="token punctuation">,</span> QApplication<span class="token punctuation">,</span> 
    QPushButton<span class="token punctuation">,</span> QPlainTextEdit<span class="token punctuation">,</span> QBoxLayout<span class="token punctuation">,</span> QProgressBar
<span class="token punctuation">)</span> 
<span class="token keyword">from</span> PySide6<span class="token punctuation">.</span>QtCore <span class="token keyword">import</span> <span class="token punctuation">(</span>
    QProcess<span class="token punctuation">,</span> Slot
<span class="token punctuation">)</span>
<span class="token keyword">import</span> time<span class="token punctuation">,</span> warnings<span class="token punctuation">,</span> re

<span class="token comment"># 匹配子进程关于进度的输出</span>
progress_re <span class="token operator">=</span> re<span class="token punctuation">.</span><span class="token builtin">compile</span><span class="token punctuation">(</span><span class="token string">r&quot;task progress: ([.\\d]+)%&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">progress_parser</span><span class="token punctuation">(</span>output<span class="token punctuation">)</span><span class="token punctuation">:</span>
    m <span class="token operator">=</span> progress_re<span class="token punctuation">.</span>search<span class="token punctuation">(</span>output<span class="token punctuation">)</span>
    <span class="token keyword">if</span> m <span class="token operator">!=</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token builtin">int</span><span class="token punctuation">(</span><span class="token builtin">float</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span>group<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token boolean">None</span>

<span class="token keyword">class</span> <span class="token class-name">MainWin</span><span class="token punctuation">(</span>QWidget<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>pbExecute <span class="token operator">=</span> QPushButton<span class="token punctuation">(</span><span class="token string">&quot;Execute&quot;</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>pbExecute<span class="token punctuation">.</span>clicked<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>self<span class="token punctuation">.</span>OnExecuteProcess<span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>pbTerminate <span class="token operator">=</span> QPushButton<span class="token punctuation">(</span><span class="token string">&quot;Terminate&quot;</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>pbTerminate<span class="token punctuation">.</span>clicked<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>self<span class="token punctuation">.</span>OnTerminateProcess<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>pbTerminate<span class="token punctuation">.</span>setEnabled<span class="token punctuation">(</span><span class="token boolean">False</span><span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>progressBar <span class="token operator">=</span> QProgressBar<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>progressBar<span class="token punctuation">.</span>setRange<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>progressBar<span class="token punctuation">.</span>reset<span class="token punctuation">(</span><span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>teOutput <span class="token operator">=</span> QPlainTextEdit<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>teOutput<span class="token punctuation">.</span>setReadOnly<span class="token punctuation">(</span><span class="token boolean">True</span><span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>p <span class="token operator">=</span> <span class="token boolean">None</span>

        self<span class="token punctuation">.</span>layoutButtons <span class="token operator">=</span> QBoxLayout<span class="token punctuation">(</span>QBoxLayout<span class="token punctuation">.</span>Direction<span class="token punctuation">.</span>LeftToRight<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>layoutButtons<span class="token punctuation">.</span>addWidget<span class="token punctuation">(</span>self<span class="token punctuation">.</span>pbExecute<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>layoutButtons<span class="token punctuation">.</span>addWidget<span class="token punctuation">(</span>self<span class="token punctuation">.</span>pbTerminate<span class="token punctuation">)</span>

        self<span class="token punctuation">.</span>layoutBase <span class="token operator">=</span> QBoxLayout<span class="token punctuation">(</span>QBoxLayout<span class="token punctuation">.</span>Direction<span class="token punctuation">.</span>TopToBottom<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>layoutBase<span class="token punctuation">.</span>addLayout<span class="token punctuation">(</span>self<span class="token punctuation">.</span>layoutButtons<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>layoutBase<span class="token punctuation">.</span>addWidget<span class="token punctuation">(</span>self<span class="token punctuation">.</span>progressBar<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>layoutBase<span class="token punctuation">.</span>addWidget<span class="token punctuation">(</span>self<span class="token punctuation">.</span>teOutput<span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>setLayout<span class="token punctuation">(</span>self<span class="token punctuation">.</span>layoutBase<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">closeEvent</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> event<span class="token punctuation">:</span> QCloseEvent<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&#39;&#39;&#39;
        窗口关闭事件
        &#39;&#39;&#39;</span>
        <span class="token comment"># 当窗口关闭时, 向子进程发出关闭信息, 让其保存数据</span>
        <span class="token keyword">if</span> self<span class="token punctuation">.</span>p <span class="token operator">!=</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>p<span class="token punctuation">.</span>kill<span class="token punctuation">(</span><span class="token punctuation">)</span>
            self<span class="token punctuation">.</span>p<span class="token punctuation">.</span>waitForFinished<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment"># 由于子进程每次运行后都要销毁, 可以通过一个方法专门用于创建与设置子进程</span>
    <span class="token keyword">def</span> <span class="token function">_CreateProcess</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> task_arg1<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&#39;&#39;&#39;
        创建子进程对象
        &#39;&#39;&#39;</span>
        p <span class="token operator">=</span> QProcess<span class="token punctuation">(</span>self<span class="token punctuation">)</span>
        p<span class="token punctuation">.</span>setProgram<span class="token punctuation">(</span><span class="token string">&quot;python&quot;</span><span class="token punctuation">)</span>
        <span class="token comment"># 将所有命令行参数转为字符串</span>
        p<span class="token punctuation">.</span>setArguments<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token string">&quot;test_process.py&quot;</span><span class="token punctuation">,</span> <span class="token builtin">str</span><span class="token punctuation">(</span>task_arg1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        p<span class="token punctuation">.</span>finished<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>self<span class="token punctuation">.</span>OnProcessFinished<span class="token punctuation">)</span>
        p<span class="token punctuation">.</span>readyReadStandardOutput<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>self<span class="token punctuation">.</span>_OnProcessOutput<span class="token punctuation">)</span>
        p<span class="token punctuation">.</span>readyReadStandardError<span class="token punctuation">.</span>connect<span class="token punctuation">(</span>self<span class="token punctuation">.</span>_OnProcessError<span class="token punctuation">)</span>

        <span class="token keyword">return</span> p

    <span class="token decorator annotation punctuation">@Slot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">_OnProcessOutput</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&#39;&#39;&#39;
        处理子进程标准输出
        &#39;&#39;&#39;</span>
        <span class="token keyword">if</span> self<span class="token punctuation">.</span>p <span class="token operator">!=</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
            data <span class="token operator">=</span> self<span class="token punctuation">.</span>p<span class="token punctuation">.</span>readAllStandardOutput<span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token comment"># 获取子进程的输出数据</span>
            data <span class="token operator">=</span> <span class="token builtin">bytes</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>data<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>decode<span class="token punctuation">(</span><span class="token punctuation">)</span>
            self<span class="token punctuation">.</span>AppendLog<span class="token punctuation">(</span>data<span class="token punctuation">)</span>

            <span class="token comment"># 根据自程序的输出获取子进程的执行进度</span>
            progress_value <span class="token operator">=</span> progress_parser<span class="token punctuation">(</span>data<span class="token punctuation">)</span>
            <span class="token keyword">if</span> progress_value <span class="token operator">!=</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
                self<span class="token punctuation">.</span>progressBar<span class="token punctuation">.</span>setValue<span class="token punctuation">(</span>progress_value<span class="token punctuation">)</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            warnings<span class="token punctuation">.</span>warn<span class="token punctuation">(</span><span class="token string">&quot;Invalid call&quot;</span><span class="token punctuation">)</span>

    <span class="token decorator annotation punctuation">@Slot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">_OnProcessError</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&#39;&#39;&#39;
        处理子进程标准错误
        &#39;&#39;&#39;</span>
        <span class="token keyword">if</span> self<span class="token punctuation">.</span>p <span class="token operator">!=</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
            data <span class="token operator">=</span> self<span class="token punctuation">.</span>p<span class="token punctuation">.</span>readAllStandardError<span class="token punctuation">(</span><span class="token punctuation">)</span>
            data <span class="token operator">=</span> <span class="token builtin">bytes</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span>data<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>decode<span class="token punctuation">(</span><span class="token punctuation">)</span>
            self<span class="token punctuation">.</span>AppendWarn<span class="token punctuation">(</span>data<span class="token punctuation">)</span>

        <span class="token keyword">else</span><span class="token punctuation">:</span>
            warnings<span class="token punctuation">.</span>warn<span class="token punctuation">(</span><span class="token string">&quot;Invalid call&quot;</span><span class="token punctuation">)</span>

    <span class="token decorator annotation punctuation">@Slot</span><span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">AppendLog</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> text<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&#39;&#39;&#39;
        插入一般日志
        &#39;&#39;&#39;</span>
        self<span class="token punctuation">.</span>teOutput<span class="token punctuation">.</span>appendPlainText<span class="token punctuation">(</span>text<span class="token punctuation">)</span>

    <span class="token decorator annotation punctuation">@Slot</span><span class="token punctuation">(</span><span class="token builtin">str</span><span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">AppendWarn</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> text<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&#39;&#39;&#39;
        插入警告
        &#39;&#39;&#39;</span>
        self<span class="token punctuation">.</span>teOutput<span class="token punctuation">.</span>appendHtml<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;&lt;font color=&#39;red&#39;&gt;</span><span class="token interpolation"><span class="token punctuation">{</span>text<span class="token punctuation">}</span></span><span class="token string">&lt;/font&gt;&lt;br&gt;&quot;</span></span><span class="token punctuation">)</span>

    <span class="token decorator annotation punctuation">@Slot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">OnExecuteProcess</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># 保证总是只有一个子进程, 每次运行相关方法时要检查子进程是否存在</span>
        <span class="token keyword">if</span> self<span class="token punctuation">.</span>p <span class="token operator">==</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>AppendLog<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;Execute Start in </span><span class="token interpolation"><span class="token punctuation">{</span>time<span class="token punctuation">.</span>ctime<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
            <span class="token comment"># 将创建的子进程作为成员保存</span>
            self<span class="token punctuation">.</span>p <span class="token operator">=</span> self<span class="token punctuation">.</span>_CreateProcess<span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span>
            self<span class="token punctuation">.</span>p<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>

            self<span class="token punctuation">.</span>pbExecute<span class="token punctuation">.</span>setEnabled<span class="token punctuation">(</span><span class="token boolean">False</span><span class="token punctuation">)</span>
            self<span class="token punctuation">.</span>pbTerminate<span class="token punctuation">.</span>setEnabled<span class="token punctuation">(</span><span class="token boolean">True</span><span class="token punctuation">)</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            warnings<span class="token punctuation">.</span>warn<span class="token punctuation">(</span><span class="token string">&quot;Process has running&quot;</span><span class="token punctuation">)</span>

    <span class="token decorator annotation punctuation">@Slot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">OnTerminateProcess</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">if</span> self<span class="token punctuation">.</span>p <span class="token operator">!=</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>AppendWarn<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;Execute Terminate&quot;</span></span><span class="token punctuation">)</span>
            self<span class="token punctuation">.</span>p<span class="token punctuation">.</span>kill<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            warnings<span class="token punctuation">.</span>warn<span class="token punctuation">(</span><span class="token string">&quot;Invalid call&quot;</span><span class="token punctuation">)</span>

    <span class="token decorator annotation punctuation">@Slot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">OnProcessFinished</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>AppendLog<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;Execute End in </span><span class="token interpolation"><span class="token punctuation">{</span>time<span class="token punctuation">.</span>ctime<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
        <span class="token comment"># 在子进程结束时, 销毁子进程对象</span>
        self<span class="token punctuation">.</span>p <span class="token operator">=</span> <span class="token boolean">None</span>

        self<span class="token punctuation">.</span>pbExecute<span class="token punctuation">.</span>setEnabled<span class="token punctuation">(</span><span class="token boolean">True</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>pbTerminate<span class="token punctuation">.</span>setEnabled<span class="token punctuation">(</span><span class="token boolean">False</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>progressBar<span class="token punctuation">.</span>reset<span class="token punctuation">(</span><span class="token punctuation">)</span>

app <span class="token operator">=</span> QApplication<span class="token punctuation">(</span><span class="token punctuation">)</span>
win <span class="token operator">=</span> MainWin<span class="token punctuation">(</span><span class="token punctuation">)</span>

win<span class="token punctuation">.</span>show<span class="token punctuation">(</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token keyword">exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 <code>test_process.py</code> 程序</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> time
<span class="token keyword">import</span> sys
<span class="token keyword">import</span> numpy

<span class="token keyword">import</span> warnings

<span class="token keyword">def</span> <span class="token function">cout</span><span class="token punctuation">(</span>text<span class="token punctuation">:</span> <span class="token builtin">str</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># sys.stdout.write(text)</span>
    <span class="token comment"># sys.stdout.flush()</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>text<span class="token punctuation">,</span> flush <span class="token operator">=</span> <span class="token boolean">True</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">task</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> run_times<span class="token punctuation">)</span><span class="token punctuation">:</span>
    cout<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;task progress: </span><span class="token interpolation"><span class="token punctuation">{</span>i <span class="token operator">/</span> run_times <span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">:</span><span class="token format-spec">.2f</span><span class="token punctuation">}</span></span><span class="token string">%&quot;</span></span><span class="token punctuation">)</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">0.3</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> i <span class="token operator">==</span> <span class="token number">3</span><span class="token punctuation">:</span>
        warnings<span class="token punctuation">.</span>warn<span class="token punctuation">(</span><span class="token string">&quot;Something go wrong&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    <span class="token builtin">id</span> <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>numpy<span class="token punctuation">.</span>random<span class="token punctuation">.</span>random<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">65536</span><span class="token punctuation">)</span>

    run_times <span class="token operator">=</span> <span class="token number">1</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        run_times <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span>sys<span class="token punctuation">.</span>argv<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">except</span><span class="token punctuation">:</span>
        run_times <span class="token operator">=</span> <span class="token number">1</span>

    cout<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;process </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">}</span></span><span class="token string"> start in </span><span class="token interpolation"><span class="token punctuation">{</span>time<span class="token punctuation">.</span>ctime<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span>run_times <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        task<span class="token punctuation">(</span>i<span class="token punctuation">,</span> run_times<span class="token punctuation">)</span>

    cout<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;process </span><span class="token interpolation"><span class="token punctuation">{</span><span class="token builtin">id</span><span class="token punctuation">}</span></span><span class="token string"> exit in </span><span class="token interpolation"><span class="token punctuation">{</span>time<span class="token punctuation">.</span>ctime<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行效果 <img src="`+r+'" alt=""></p>',15);function y(w,B){const a=c("RouterLink");return l(),i("div",null,[m,s("ul",null,[s("li",null,[t(a,{to:"/coding/py/pyqt/base.html#%E4%BF%A1%E5%8F%B7%E6%A7%BD%E6%9C%BA%E5%88%B6"},{default:p(()=>[e("信号槽机制")]),_:1}),b]),s("li",null,[t(a,{to:"/coding/py/pyqt/base.html#%E7%BB%84%E4%BB%B6%E5%B8%83%E5%B1%80"},{default:p(()=>[e("组件构建")]),_:1}),f]),_]),g])}const Q=o(v,[["render",y],["__file","examples.html.vue"]]);export{Q as default};
