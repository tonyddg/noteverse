import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e as p}from"./app-8c5ce49e.js";const t={},e=p(`<h1 id="设计模式" tabindex="-1"><a class="header-anchor" href="#设计模式" aria-hidden="true">#</a> 设计模式</h1><p>类相互通信的对象之间的组织关系</p><h2 id="设计模式术语" tabindex="-1"><a class="header-anchor" href="#设计模式术语" aria-hidden="true">#</a> 设计模式术语</h2><h3 id="原则" tabindex="-1"><a class="header-anchor" href="#原则" aria-hidden="true">#</a> 原则</h3><ol><li>先不采用设计模式, 在重构后选择设计模式</li><li>使用设计模式前需要寻找变化点</li><li>设计模式前提, 必须要有稳定点</li></ol><h3 id="绑定" tabindex="-1"><a class="header-anchor" href="#绑定" aria-hidden="true">#</a> 绑定</h3><ol><li>将框架称为早, 将应用称为晚</li><li>早绑定即应用调用框架实现功能</li><li>晚绑定即框架调用应用实现功能</li></ol><h3 id="术语" tabindex="-1"><a class="header-anchor" href="#术语" aria-hidden="true">#</a> 术语</h3><h4 id="复用" tabindex="-1"><a class="header-anchor" href="#复用" aria-hidden="true">#</a> 复用</h4><ol><li>指编译时复用, 代码被复用即代码编译后的二进制信息不被更改, 不是编程语句不被更改</li><li>设计原则的目的之一是编译时复用, 将变化交给运行时</li></ol><h4 id="依赖" tabindex="-1"><a class="header-anchor" href="#依赖" aria-hidden="true">#</a> 依赖</h4><p>指编译时依赖, 当 A 依赖于 B, 即当编译时没有 B, A 无法编译通过</p><h2 id="面向对象设计模式" tabindex="-1"><a class="header-anchor" href="#面向对象设计模式" aria-hidden="true">#</a> 面向对象设计模式</h2><p>面向对象的目的: 抵抗变化</p><h3 id="依赖倒置原则" tabindex="-1"><a class="header-anchor" href="#依赖倒置原则" aria-hidden="true">#</a> 依赖倒置原则</h3><ol><li>高层模块 (稳定) 不应该依赖于底层模块 (不稳定)</li><li>二者应该依赖于抽象 (稳定)</li><li>实现细节 (不稳定) 应该依赖于抽象 (稳定)</li></ol><ul><li>eg. 工厂模式</li></ul><h3 id="开放封闭原则" tabindex="-1"><a class="header-anchor" href="#开放封闭原则" aria-hidden="true">#</a> 开放封闭原则</h3><ol><li>对扩展开放, 对更改封闭</li><li>通过增加底层模块的方式实现新功能, 而不是修改高层模块</li></ol><ul><li>eg. 模板模式</li></ul><h3 id="单一职责原则" tabindex="-1"><a class="header-anchor" href="#单一职责原则" aria-hidden="true">#</a> 单一职责原则</h3><ol><li>一个类应该只有一个责任</li><li>因此一个类只能有一个变化方向</li></ol><h3 id="liskov-替换原则" tabindex="-1"><a class="header-anchor" href="#liskov-替换原则" aria-hidden="true">#</a> Liskov 替换原则</h3><p>子类应该表达父类的所有方法, 不能空置</p><h3 id="接口隔离原则" tabindex="-1"><a class="header-anchor" href="#接口隔离原则" aria-hidden="true">#</a> 接口隔离原则</h3><ol><li>接口 (公有方法) 应当小而完备, 否则接口一旦修改, 客户程序也需要修改</li><li>一个接口类 (纯虚类), 应当只保留一系列等价地接口, 不能同时表达两种接口</li></ol><ul><li>桥模式</li></ul><h3 id="优先使用对象组合" tabindex="-1"><a class="header-anchor" href="#优先使用对象组合" aria-hidden="true">#</a> 优先使用对象组合</h3><ol><li>继承时, 将导致类的耦合度增加</li><li>通过良好的接口, 可以避免继承必要</li></ol><ul><li>eg. Decorator 模式</li></ul><h3 id="封装变化点" tabindex="-1"><a class="header-anchor" href="#封装变化点" aria-hidden="true">#</a> 封装变化点</h3><p>使用封装来创建对象之间的分界</p><h3 id="针对接口编程" tabindex="-1"><a class="header-anchor" href="#针对接口编程" aria-hidden="true">#</a> 针对接口编程</h3><ol><li>成员不使用具体的类, 而是使用接口 (ABC)</li><li>保存接口, 调用接口实现功能</li><li>对象组合中, 因保存接口指针, 而不是具体的类</li></ol><h2 id="组件协作模式" tabindex="-1"><a class="header-anchor" href="#组件协作模式" aria-hidden="true">#</a> 组件协作模式</h2><p>使用晚绑定, 实现框架与应用之间的松耦合</p><h3 id="模板方法-template-method" tabindex="-1"><a class="header-anchor" href="#模板方法-template-method" aria-hidden="true">#</a> 模板方法 Template Method</h3><ol><li>在框架中定义一个操作的算法 (稳定)</li><li>将算法中一些步骤的实现交给应用 (变化)</li><li>以此实现在复用算法的前提下, 改变内部的特定步骤</li></ol><h4 id="适用情况" tabindex="-1"><a class="header-anchor" href="#适用情况" aria-hidden="true">#</a> 适用情况</h4><ol><li>必须有一个稳定的算法的骨架</li><li>骨架内部的步骤不稳定</li></ol><h4 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h4><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Framework</span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
<span class="token comment">// 在框架中定义一个操作的算法</span>
<span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">Step1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token function">Step2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token function">Step3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">protected</span><span class="token operator">:</span>
<span class="token comment">// 算法中的固定步骤</span>
<span class="token keyword">void</span> <span class="token function">Step1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span>
<span class="token keyword">void</span> <span class="token function">Step3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span>

<span class="token comment">// 算法中的变化步骤, 交给应用实现</span>
<span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">Step2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Application</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">Framework</span></span><span class="token punctuation">{</span>
<span class="token keyword">protected</span><span class="token operator">:</span>
<span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">Step2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    Framework<span class="token operator">*</span> app <span class="token operator">=</span> <span class="token keyword">new</span> Application<span class="token punctuation">;</span>
    app<span class="token operator">-&gt;</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">delete</span> app<span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="实例" tabindex="-1"><a class="header-anchor" href="#实例" aria-hidden="true">#</a> 实例</h4><ol><li>对于窗体具有明确的启动流程, 但有部分启动细节可供修改</li></ol><h3 id="策略模式-strategy" tabindex="-1"><a class="header-anchor" href="#策略模式-strategy" aria-hidden="true">#</a> 策略模式 Strategy</h3><ol><li>主类的接口固定 (稳定)</li><li>根据不同情况, 主类的接口实现方式不同 (不变)</li><li>为主类提供了一系列算法, 并且可以在运行时灵活切换</li><li>为未来的扩展提供了可能, 避免修改代码 (保证开放封闭原则)</li></ol><h4 id="适用情况-1" tabindex="-1"><a class="header-anchor" href="#适用情况-1" aria-hidden="true">#</a> 适用情况</h4><ol><li>当代码中出现 switch / if-else 判断方法, 且可能性不限时, 极有可能是需要使用 策略模式 的标识</li><li>对于同一个操作, 在不同情况下, 有不同的解决方法, 且情况无限</li><li>对于同一个操作, 可以采用不同的方案</li></ol><h4 id="实现-1" tabindex="-1"><a class="header-anchor" href="#实现-1" aria-hidden="true">#</a> 实现</h4><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">TaxStrategy</span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">Calculate</span><span class="token punctuation">(</span>Context<span class="token operator">&amp;</span> context<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">virtual</span> <span class="token operator">~</span><span class="token function">TaxStrategy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">CNTaxStrategy</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token class-name">TaxStrategy</span></span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">Calculate</span><span class="token punctuation">(</span>Context<span class="token operator">&amp;</span> context<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">USTaxStrategy</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token class-name">TaxStrategy</span></span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">Calculate</span><span class="token punctuation">(</span>Context<span class="token operator">&amp;</span> context<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">SaleBox</span><span class="token punctuation">{</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    unique_ptr<span class="token operator">&lt;</span>TaxStrategy<span class="token operator">&gt;</span> taxStrategy<span class="token punctuation">;</span>

<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token comment">// taxStrategy 的获取可使用工厂模式的方法</span>
    <span class="token function">SaleBox</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">void</span> <span class="token function">CalculateTax</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        taxStrategy<span class="token operator">-&gt;</span><span class="token function">Calculate</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="实例-1" tabindex="-1"><a class="header-anchor" href="#实例-1" aria-hidden="true">#</a> 实例</h4><ol><li>计算税率, 根据选择的国家切换税率计算方法</li></ol><h3 id="观察者模式-obverser" tabindex="-1"><a class="header-anchor" href="#观察者模式-obverser" aria-hidden="true">#</a> 观察者模式 Obverser</h3><ol><li>主类在运行时会产生消息 (固定)</li><li>处理消息的类不同 (变化)</li><li>主类产生消息时, 希望所有消息依赖都能接收到消息并处理</li><li>将接收消息 (通知机制) 抽象为接口, 主类只需将消息通过接口传递给处理类</li><li>通知通过 list 传播, 观察者自行决定是否要观察, 而主类对于是否有观察不关系</li></ol><h4 id="实现-2" tabindex="-1"><a class="header-anchor" href="#实现-2" aria-hidden="true">#</a> 实现</h4><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">ProgressObserver</span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token comment">// 将通知作为接口</span>
    <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">Notify</span><span class="token punctuation">(</span><span class="token keyword">float</span> value<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token operator">~</span><span class="token function">ProgressObserver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 使用一个列表管理多个观察者</span>
<span class="token keyword">class</span> <span class="token class-name">ProgressObserverList</span><span class="token punctuation">{</span>
<span class="token keyword">private</span><span class="token operator">:</span>
    <span class="token comment">// 使用 list, 满足删除与遍历功能</span>
    list<span class="token operator">&lt;</span>ProgressObserver<span class="token operator">*</span><span class="token operator">&gt;</span> _list<span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">AttachObserver</span><span class="token punctuation">(</span>ProgressObserver<span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">DetachObserver</span><span class="token punctuation">(</span>ProgressObserver<span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">Notify</span><span class="token punctuation">(</span><span class="token keyword">float</span> value<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">auto</span> it <span class="token operator">:</span> _list<span class="token punctuation">)</span><span class="token punctuation">{</span>
            it<span class="token operator">-&gt;</span><span class="token function">Notify</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">DoSomething</span><span class="token punctuation">{</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    ProgressObserverList _progressObserverList<span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">void</span> <span class="token function">Progress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> num<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
            _progressObserverList<span class="token punctuation">.</span><span class="token function">Notify</span><span class="token punctuation">(</span><span class="token punctuation">(</span>i <span class="token operator">+</span> <span class="token number">1.0</span><span class="token punctuation">)</span> <span class="token operator">/</span> num<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="实例-2" tabindex="-1"><a class="header-anchor" href="#实例-2" aria-hidden="true">#</a> 实例</h4><ol><li>执行任务时, 向外部通知任务进度</li><li>观察者 A 将进度打印到屏幕, 观察者 B 绘制成进度条</li></ol><h2 id="单一职责模式" tabindex="-1"><a class="header-anchor" href="#单一职责模式" aria-hidden="true">#</a> 单一职责模式</h2><ol><li>组件设计过程中, 如果职责设计不清晰, 将导致子类膨胀, 残生大量重复代码</li><li>可将职责理解为单一类型的接口</li><li>使用组合代替继承, 实现单职责的扩展 (Decorator) 与多职责的组合 (桥模式)</li></ol><h3 id="decorator-模式" tabindex="-1"><a class="header-anchor" href="#decorator-模式" aria-hidden="true">#</a> Decorator 模式</h3><ol><li>对于一类操作, 其职责单一且不变</li><li>但希望在其主要过程中添加部分额外扩展, 并且扩展可以自由组合</li><li>将这些扩展称为装饰器 Decorator</li><li>本质为将编译时装配变为运行时装配</li><li>动态地给一个对象增加职责, 并且比继承更加灵活</li></ol><h4 id="适用情况-2" tabindex="-1"><a class="header-anchor" href="#适用情况-2" aria-hidden="true">#</a> 适用情况</h4><ol><li>对于操作 A 与 B, 扩展功能 X 与 Y</li><li>出现 XA, YA, XYA, XB, YB, XYB 等繁杂的复合操作</li><li>并且在这些组合类中频繁调用父类的函数</li></ol><h4 id="实现-3" tabindex="-1"><a class="header-anchor" href="#实现-3" aria-hidden="true">#</a> 实现</h4><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Stream</span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">Read</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">virtual</span> <span class="token operator">~</span><span class="token function">Stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 同一类操作</span>
<span class="token comment">// 此类操作同为扩展, 但各个扩展之间相互排斥, 因此不可设为修饰器</span>
<span class="token keyword">class</span> <span class="token class-name">FileStream</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">Stream</span></span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">Read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">MemoryStream</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">Stream</span></span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">Read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 不同的扩展修饰, 各个扩展可以相容</span>
<span class="token comment">// 定义一个修饰器基类, 继承 Stream 的目的不是与父类组合, 只是为了与父类共享接口</span>
<span class="token keyword">class</span> <span class="token class-name">DecoratorStream</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">Stream</span></span><span class="token punctuation">{</span>
<span class="token keyword">protected</span><span class="token operator">:</span>
    <span class="token comment">// 修饰器的核心关键, 继承被修饰类, 并且保存被修饰类</span>
    <span class="token comment">// 用组合代替继承, 继承中只能调用父类, 但组合中, 被组合的对象可以变化 (指针具有多态性)</span>
    Stream<span class="token operator">*</span> _stream<span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">DecoratorStream</span><span class="token punctuation">(</span>Stream<span class="token operator">*</span> stream<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">_stream</span><span class="token punctuation">(</span>stream<span class="token punctuation">)</span>
    <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">CryptoStream</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">Stream</span></span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">CryptoStream</span><span class="token punctuation">(</span>Stream<span class="token operator">*</span> stream<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">DecoratorStream</span><span class="token punctuation">(</span>stream<span class="token punctuation">)</span>
    <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">Read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        <span class="token comment">// 在修饰器中调用被修饰类实现修饰效果</span>
        <span class="token comment">// 代替原先调用父类的方法</span>
        _stream<span class="token operator">-&gt;</span><span class="token function">Read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">BufferStream</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">Stream</span></span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">BufferStream</span><span class="token punctuation">(</span>Stream<span class="token operator">*</span> stream<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">DecoratorStream</span><span class="token punctuation">(</span>stream<span class="token punctuation">)</span>
    <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">Read</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>

    FileStream s1<span class="token punctuation">;</span>

    <span class="token comment">// 使用 CryptoStream 修饰 s1, 使其获得扩展</span>
    CryptoStream s2 <span class="token operator">=</span> <span class="token function">CryptoStream</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>s1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    BufferStream s3 <span class="token operator">=</span> <span class="token function">BufferStream</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>s1<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 嵌套修饰, 从而使 s1 同时被两种修饰</span>
    BufferStream s4 <span class="token operator">=</span> <span class="token function">BufferStream</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>s2<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="桥模式" tabindex="-1"><a class="header-anchor" href="#桥模式" aria-hidden="true">#</a> 桥模式</h3><ol><li>主类有多个固定的, 相互独立职责 (Decorator 模式中, 可扩展职责只有一个, 可将职责理解为一组接口)</li><li>各个职责的具体实现形式不同</li><li>将一个类的职责分离为多个单职责, 最后用一个类组合所有职责</li><li>与 Decorator 模式同样利用了指针的多态性, 用组合代替继承, 并在运行时装配</li><li>其中的单个职责可以使用 Decorator 模式实现进一步扩展</li></ol><h4 id="适用情况-3" tabindex="-1"><a class="header-anchor" href="#适用情况-3" aria-hidden="true">#</a> 适用情况</h4><ol><li>存在多个抽象维度且各个变化维度均需要扩展</li><li>一个主类同时继承了多个单一类型的接口</li></ol><h4 id="实现-4" tabindex="-1"><a class="header-anchor" href="#实现-4" aria-hidden="true">#</a> 实现</h4><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Display</span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">Draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">virtual</span> <span class="token operator">~</span><span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Ability</span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">Fight</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">virtual</span> <span class="token operator">~</span><span class="token function">Ability</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">Unit</span><span class="token punctuation">{</span>
<span class="token keyword">protected</span><span class="token operator">:</span>
    Display<span class="token operator">*</span> _display<span class="token punctuation">;</span>
    Ability<span class="token operator">*</span> _ability<span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token comment">// 与 Decorator 相同, 在运行时装配</span>
    <span class="token function">Unit</span><span class="token punctuation">(</span>Display<span class="token operator">*</span> display<span class="token punctuation">,</span> Ability<span class="token operator">*</span> ability<span class="token punctuation">)</span><span class="token operator">:</span> 
    <span class="token function">_display</span><span class="token punctuation">(</span>display<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">_ability</span><span class="token punctuation">(</span>ability<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">void</span> <span class="token function">Fight</span><span class="token punctuation">(</span>Unit<span class="token operator">*</span> obj<span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        <span class="token keyword">bool</span> isWin <span class="token operator">=</span> _ability<span class="token operator">-&gt;</span><span class="token function">Fight</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">void</span> <span class="token function">Draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        _display<span class="token operator">-&gt;</span><span class="token function">Draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 此部分的职责相互独立</span>
<span class="token keyword">class</span> <span class="token class-name">EnemyDisplay</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">Display</span></span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">Draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">virtual</span> <span class="token operator">~</span><span class="token function">Display</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">PlayerDisplay</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">Display</span></span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">Draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 此部分职责可扩展, 可以像 Decorator 模式一样扩展</span>
<span class="token keyword">class</span> <span class="token class-name">DecoratorAbility</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">Ability</span></span><span class="token punctuation">{</span>
<span class="token keyword">protected</span><span class="token operator">:</span>
    Ability<span class="token operator">*</span> _ability<span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">DecoratorAbility</span><span class="token punctuation">(</span>Ability<span class="token operator">*</span> ability<span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token function">_ability</span><span class="token punctuation">(</span>ability<span class="token punctuation">)</span>
    <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token comment">// </span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="对象创建模式" tabindex="-1"><a class="header-anchor" href="#对象创建模式" aria-hidden="true">#</a> 对象创建模式</h2><p>在对象创建的过程中避开 new 导致的紧耦合</p><h3 id="factory-method-工厂方法" tabindex="-1"><a class="header-anchor" href="#factory-method-工厂方法" aria-hidden="true">#</a> Factory Method 工厂方法</h3><ol><li>成员函数需要用到某个具体接口作为函数内的临时变量 (函数内依赖)</li><li>此具体接口具有多态性</li><li>成员函数中用到了具体的子类时, 无法通过一般的组合方式实现多态</li><li>如果每次将具体的子类传入成员函数 (new), 将导致传入的子类职责混乱</li><li>通过将工厂对象作为成员组合, 在需要子类时通过工厂创建</li><li>工厂的本质即一个创建工厂的接口</li><li>工厂的多态性从而保证了函数内依赖的多态性, 让主类决定实例化哪个类</li><li>缺点: 要求函数内依赖的创建方式必须一致, <mark>因此在工厂方法中, 必须优先设计接口</mark></li></ol><h4 id="适用情况-4" tabindex="-1"><a class="header-anchor" href="#适用情况-4" aria-hidden="true">#</a> 适用情况</h4><ol><li>在成员函数中, 出现了 [接口指针] = new [具体实现], 导致了主类依赖与具体类</li><li>当出现以实现某种功能为职责的接口 (只完成某种具体功能) 时, 很可能需要工厂方法</li></ol><h4 id="实现-5" tabindex="-1"><a class="header-anchor" href="#实现-5" aria-hidden="true">#</a> 实现</h4><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">// 具体功能及接口</span>
<span class="token keyword">class</span> <span class="token class-name">IZip</span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">Progress</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">virtual</span> <span class="token operator">~</span><span class="token function">IZip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">NormalZip</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">IZip</span></span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">Progress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">CryptoZip</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">IZip</span></span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">virtual</span> <span class="token keyword">void</span> <span class="token function">Progress</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 为每个具体实现设计一个工厂</span>
<span class="token keyword">class</span> <span class="token class-name">IZipFactory</span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token comment">// 如果工厂不需要而外参数, 可定义为静态类</span>
    <span class="token comment">// 工厂函数返回产品的指针</span>
    <span class="token keyword">virtual</span> <span class="token keyword">static</span> IZip<span class="token operator">*</span> <span class="token function">CreateZip</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">NormalZipFactory</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">IZipFactory</span></span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">virtual</span> <span class="token keyword">static</span> IZip<span class="token operator">*</span> <span class="token function">CreateZip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token function">NormalZip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">CryptoZipFactory</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">IZipFactory</span></span><span class="token punctuation">{</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">virtual</span> <span class="token keyword">static</span> IZip<span class="token operator">*</span> <span class="token function">CreateZip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token function">CryptoZip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 在具体实例中使用工厂</span>
<span class="token keyword">class</span> <span class="token class-name">ZipApp</span><span class="token punctuation">{</span>
<span class="token keyword">protected</span><span class="token operator">:</span>
    <span class="token comment">// 将工厂与类组合</span>
    IZipFactory<span class="token operator">*</span> _factory<span class="token punctuation">;</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">ZipApp</span><span class="token punctuation">(</span>IZipFactory<span class="token operator">*</span> factory<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token function">_factory</span><span class="token punctuation">(</span>factory<span class="token punctuation">)</span>
    <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">void</span> <span class="token function">StartZip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        <span class="token comment">// 有工厂创建函数内依赖</span>
        IZip<span class="token operator">*</span> zip <span class="token operator">=</span> _factory<span class="token operator">-&gt;</span><span class="token function">CreateZip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        zip<span class="token operator">-&gt;</span><span class="token function">Process</span><span class="token punctuation">(</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        <span class="token comment">// 明确职责, 工厂产生的产品由子类处理</span>
        <span class="token keyword">delete</span> zip<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="abstract-factory-抽象工厂-family-factory" tabindex="-1"><a class="header-anchor" href="#abstract-factory-抽象工厂-family-factory" aria-hidden="true">#</a> Abstract Factory 抽象工厂 (Family Factory)</h3><ol><li>抽象工厂建立在工厂模式的基础上, 当一个类中的多个工厂间存在联系时适用. 如当使用了工厂 A1, 则必定会使用 A2; 若使用 B1 则并定会使用 B2. 即工厂间存在内部依赖.</li><li>因此可使用一个抽象工厂同时承担创建这一系列相关工厂的职责, 实现这一系列依赖的紧耦合</li></ol><h4 id="适用情况-5" tabindex="-1"><a class="header-anchor" href="#适用情况-5" aria-hidden="true">#</a> 适用情况</h4><h4 id="实现-6" tabindex="-1"><a class="header-anchor" href="#实现-6" aria-hidden="true">#</a> 实现</h4><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token comment">// 接口定义</span>
<span class="token keyword">class</span> <span class="token class-name">IDBDataReader</span><span class="token punctuation">{</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">IDBCommand</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span><span class="token operator">:</span>
        <span class="token keyword">virtual</span> IDBDataReader <span class="token function">CommandText</span><span class="token punctuation">(</span>string<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">IDBConnectInfo</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span><span class="token operator">:</span>
        <span class="token keyword">virtual</span> string <span class="token function">Info</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">virtual</span> string <span class="token function">Warn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 具体实例定义 (MySql)</span>
<span class="token comment">// 其中 SqlConnect 为一个由第三方库定义用于操作数据库的类</span>
<span class="token keyword">class</span> <span class="token class-name">SqlDataReader</span><span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">IDBDataReader</span></span><span class="token punctuation">{</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">SqlDBCommand</span><span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">IDBCommand</span></span><span class="token punctuation">{</span>
    <span class="token keyword">public</span><span class="token operator">:</span>
        <span class="token function">SqlDBCommand</span><span class="token punctuation">(</span>SqlConnect<span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">virtual</span> IDBDataReader <span class="token function">Command</span><span class="token punctuation">(</span>string<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">SqlConnectInfo</span><span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">IDBConnectInfo</span></span><span class="token punctuation">{</span>
    <span class="token keyword">public</span><span class="token operator">:</span>
        <span class="token function">SqlConnectInfo</span><span class="token punctuation">(</span>SqlConnect<span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">virtual</span> string <span class="token function">Info</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">virtual</span> string <span class="token function">Warn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token comment">// 具体实例定义 (ORACLE)</span>
<span class="token comment">// 其中 OracleConnect 为一个由第三方库定义用于操作数据库的类</span>
<span class="token keyword">class</span> <span class="token class-name">ORACLEDataReader</span><span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">IDBDataReader</span></span><span class="token punctuation">{</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">ORACLEDBCommand</span><span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">IDBCommand</span></span><span class="token punctuation">{</span>
    <span class="token keyword">public</span><span class="token operator">:</span>
        <span class="token function">ORACLEDBCommand</span><span class="token punctuation">(</span>OracleConnect<span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">virtual</span> IDBDataReader <span class="token function">Command</span><span class="token punctuation">(</span>string<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">class</span> <span class="token class-name">ORACLEConnectInfo</span><span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">IDBConnectInfo</span></span><span class="token punctuation">{</span>
    <span class="token keyword">public</span><span class="token operator">:</span>
        <span class="token function">ORACLEConnectInfo</span><span class="token punctuation">(</span>ORACLEConnect<span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">virtual</span> string <span class="token function">Info</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
        <span class="token keyword">virtual</span> string <span class="token function">Warn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


<span class="token comment">// 抽象工厂接口定义</span>
<span class="token keyword">class</span> <span class="token class-name">IDBFactory</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span><span class="token operator">:</span>
        <span class="token keyword">virtual</span> IDBCommand <span class="token function">CreateCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">virtual</span> IDBConnectInfo <span class="token function">CreateConnectInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 具体工厂定义</span>
<span class="token keyword">class</span> <span class="token class-name">SqlFactory</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">IDBFactory</span></span><span class="token punctuation">{</span>
    <span class="token keyword">public</span><span class="token operator">:</span>
        SqlConnect<span class="token operator">*</span> connect<span class="token punctuation">;</span>

        <span class="token comment">// 注意, 可以通过向工厂的构造函数传入参数, 实现同一个工厂制造不同的产品 (一般工厂模式也可使用此方法)</span>
        <span class="token function">SqlFactory</span><span class="token punctuation">(</span>SqlConnect<span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 在一个工厂中生产同一系列的多个产品, 同时这些产品公用一套原料</span>
        <span class="token keyword">virtual</span> IDBCommand <span class="token function">CreateCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token function">SqlCommand</span><span class="token punctuation">(</span>connect<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">virtual</span> IDBConnectInfo <span class="token function">CreateConnectInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token function">SqlConnectInfo</span><span class="token punctuation">(</span>connect<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">ORACLEFactory</span> <span class="token operator">:</span> <span class="token base-clause"><span class="token keyword">public</span> <span class="token class-name">IDBFactory</span></span><span class="token punctuation">{</span>
    <span class="token keyword">public</span><span class="token operator">:</span>
        ORACLEConnect<span class="token operator">*</span> connect<span class="token punctuation">;</span>

        <span class="token comment">// 注意, 可以通过向工厂的构造函数传入参数, 实现同一个工厂制造不同的产品 (一般工厂模式也可使用此方法)</span>
        <span class="token function">ORACLEFactory</span><span class="token punctuation">(</span>ORACLEConnect<span class="token operator">*</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">virtual</span> IDBCommand <span class="token function">CreateCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token function">ORACLECommand</span><span class="token punctuation">(</span>connect<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">virtual</span> IDBConnectInfo <span class="token function">CreateConnectInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token function">ORACLEConnectInfo</span><span class="token punctuation">(</span>connect<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,85),o=[e];function c(l,i){return s(),a("div",null,o)}const k=n(t,[["render",c],["__file","pattern design.html.vue"]]);export{k as default};
