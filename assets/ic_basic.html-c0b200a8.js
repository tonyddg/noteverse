import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,e}from"./app-8c5ce49e.js";const p="/noteverse/assets/pt-0ed4ec5b.png",t={},o=e(`<h1 id="stm32-芯片基本知识" tabindex="-1"><a class="header-anchor" href="#stm32-芯片基本知识" aria-hidden="true">#</a> STM32 芯片基本知识</h1><h2 id="芯片结构" tabindex="-1"><a class="header-anchor" href="#芯片结构" aria-hidden="true">#</a> 芯片结构</h2><h3 id="总线" tabindex="-1"><a class="header-anchor" href="#总线" aria-hidden="true">#</a> 总线</h3><ol><li>ICode 总线 读取指令</li><li>DCode 总线 读取数据</li><li>System 总线 读取寄存器</li></ol><h3 id="被动单元" tabindex="-1"><a class="header-anchor" href="#被动单元" aria-hidden="true">#</a> 被动单元</h3><ol><li>Flash 内部闪存存储器 存放程序与 const 数据, ICode 从此处访问程序</li><li>SRAM 程序的变量与堆栈基于 SRAM 通过 DCode 总线访问</li><li>AHB 到 APB 的桥 挂载在 STM32 上的外设</li></ol><h3 id="存储器映射" tabindex="-1"><a class="header-anchor" href="#存储器映射" aria-hidden="true">#</a> 存储器映射</h3><p>存储器映射即给存储器分配地址 被动单元功能部件共同排列在 4GB 的地址!空间内 以 512 MB 为一个 BLOCK 划分地址空间</p><ol><li>Block0 Flash</li><li>Block1 SRAM</li><li>Block2 APB 与 AHB</li></ol><h2 id="寄存器映射" tabindex="-1"><a class="header-anchor" href="#寄存器映射" aria-hidden="true">#</a> 寄存器映射</h2><p>存储器映射的内存单元起别名, 即内存映射 通过绝对地址或起别名的方式访问内存单元</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">//将绝对地址转为 unsigned int* 类型</span>
<span class="token comment">//在通过 * 访问值</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">GBIOP_ORD</span>   <span class="token expression"><span class="token operator">*</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">int</span><span class="token operator">*</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token number">0x4001</span> <span class="token number">0</span>C0C<span class="token punctuation">)</span></span></span>
GBIOP_ORD <span class="token operator">=</span> <span class="token number">0xFF</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总线-1" tabindex="-1"><a class="header-anchor" href="#总线-1" aria-hidden="true">#</a> 总线</h3><ol><li>APB1 挂载低速外设</li><li>APB2 与 AHB 挂载高速外设</li><li>GPIO 挂载在 APB2 的外设 - 通用输入输出端口, 控制引脚输出高低电频</li></ol><h3 id="外设地址映射" tabindex="-1"><a class="header-anchor" href="#外设地址映射" aria-hidden="true">#</a> 外设地址映射</h3><p>Block2 =&gt; 总线基地址 =&gt; 外设基地址 =&gt; 外部寄存器</p><p>Block2(+0x4000 0000) =&gt; APB2 (+ 0x0001 0000) =&gt; GPIOB (+0x0000 0C00) =&gt; GPIOB_ODR(+0x0C)</p><p>通过一些列偏移得到寄存器基地址</p><h3 id="寄存器说明" tabindex="-1"><a class="header-anchor" href="#寄存器说明" aria-hidden="true">#</a> 寄存器说明</h3><p>通过查找手册, 了解寄存器信息 <img src="`+p+`" alt=""></p><ol><li>名称 (GPIOx_BSRR)(x=A...E) 寄存器名为 GPIOx_BSRR, 适用于 GPIOA...GPIOE</li><li>地址偏移 GPIOx_BSRR 地址偏移为 0x10 表明, 寄存器对于外设基地址的偏移为0x18, 通过查找外设偏移等信息, 得到寄存器的基地址</li><li>寄存器位表 表明寄存器存储单元(32位)中各位的名称及读写权限 r 表示只读, w 表示只写 没有 r, 不是不能读取, 只是读取无意义</li><li>位功能说明 介绍寄存器每一位的作用</li></ol><h3 id="在-c-中封装寄存器" tabindex="-1"><a class="header-anchor" href="#在-c-中封装寄存器" aria-hidden="true">#</a> 在 C 中封装寄存器</h3><h4 id="总线与外设的基地址" tabindex="-1"><a class="header-anchor" href="#总线与外设的基地址" aria-hidden="true">#</a> 总线与外设的基地址</h4><ol><li>通过宏与各层偏移得到寄存器基地址</li></ol><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token comment">// 外设基地址</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">PERIPH_BASE</span> <span class="token expression"><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">int</span><span class="token punctuation">)</span><span class="token number">0x4000</span> <span class="token number">0000</span><span class="token punctuation">)</span></span></span>

<span class="token comment">// 总线基地址</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">APB1PERIPH_BASE</span> <span class="token expression">PERIPH_BASE</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">APB2PERIPH_BASE</span> <span class="token expression"><span class="token punctuation">(</span>PERIPH_BASE <span class="token operator">+</span> <span class="token number">0x0001</span> <span class="token number">0000</span><span class="token punctuation">)</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">AHBPERIPH_BASE</span> <span class="token expression"><span class="token punctuation">(</span>PERIPH_BASE <span class="token operator">+</span> <span class="token number">0x0002</span> <span class="token number">0000</span><span class="token punctuation">)</span></span></span>

<span class="token comment">// GPIO 外设基地址</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">GPIOA_BASE</span> <span class="token expression"><span class="token punctuation">(</span>APB2PERIPH_BASE <span class="token operator">+</span> <span class="token number">0x0800</span><span class="token punctuation">)</span></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">GPIOB_BASE</span> <span class="token expression"><span class="token punctuation">(</span>APB2PERIPH_BASE <span class="token operator">+</span> <span class="token number">0x0C00</span><span class="token punctuation">)</span></span></span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

<span class="token comment">// 寄存器基地址</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">GPIOB_BSRR</span> <span class="token expression"><span class="token punctuation">(</span>GPIOB_BASE <span class="token operator">+</span> <span class="token number">0x0800</span><span class="token punctuation">)</span></span></span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

<span class="token comment">//访问GPIOB_BSRR, 并将寄存器第 16 位置 1</span>
<span class="token operator">*</span> <span class="token punctuation">(</span><span class="token keyword">unsigned</span> <span class="token keyword">int</span> <span class="token operator">*</span><span class="token punctuation">)</span> GPIOB_BSRR <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token number">0x01</span> <span class="token operator">&lt;&lt;</span> <span class="token punctuation">(</span><span class="token number">16</span> <span class="token operator">+</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>封装寄存器列表</li></ol><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token keyword">typedef</span> <span class="token keyword">unsigned</span> <span class="token keyword">int</span>    uint32<span class="token punctuation">;</span><span class="token comment">// 32位寄存器</span>
<span class="token keyword">typedef</span> <span class="token keyword">unsigned</span> <span class="token keyword">short</span>  uint16<span class="token punctuation">;</span><span class="token comment">// 16位寄存器</span>

<span class="token comment">// 按外设中各个寄存器的大小, 偏移定义对应结构, 便于访问</span>
<span class="token keyword">typedef</span> <span class="token keyword">struct</span>
<span class="token punctuation">{</span>
    uint32 CRL<span class="token punctuation">;</span>
    uint32 CRH<span class="token punctuation">;</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    uint16 LCKR<span class="token punctuation">;</span>
<span class="token punctuation">}</span> GPIOx <span class="token comment">// C 中定义类似C++的结构时需要使用此语法</span>

<span class="token comment">//使用变量方式</span>
GPIOx <span class="token operator">*</span>GPIOB <span class="token operator">=</span> GPIOB_BASE<span class="token punctuation">;</span>
<span class="token comment">//使用宏方式</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">GPIOB</span> <span class="token expression"><span class="token punctuation">(</span><span class="token punctuation">(</span>GPIOx<span class="token operator">*</span><span class="token punctuation">)</span> GPIOB_BASE<span class="token punctuation">)</span></span></span>

<span class="token comment">// 通过结构访问</span>
GPIOB<span class="token operator">-&gt;</span> CRL <span class="token operator">=</span> <span class="token number">0xFFFF</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="操作寄存器的位" tabindex="-1"><a class="header-anchor" href="#操作寄存器的位" aria-hidden="true">#</a> 操作寄存器的位</h4><ol><li>对某位清零</li></ol><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>uint32 a <span class="token operator">=</span> <span class="token number">0xFFFF</span><span class="token punctuation">;</span>
a <span class="token operator">&amp;=</span> <span class="token operator">~</span><span class="token punctuation">(</span><span class="token number">0x01</span> <span class="token operator">&lt;&lt;</span> n<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>以 n = 3 为例</p><ul><li>0x01 &lt;&lt; n 二进制 0x01 左移 3 位得到 1000b(0x08)</li><li>~(0x01 &lt;&lt; n) 对 1000b 取反(uint32 变量) 得到 0xFFF7</li><li>&amp;= 令 a 与 0xFFF7 和运算, 由于 0xFFF7 第 3 位为 0, 实现使 a 的第三位置零</li></ul><ol start="2"><li>连续清零</li></ol><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>uint32 a <span class="token operator">=</span> <span class="token number">0xFFFF</span><span class="token punctuation">;</span>
a <span class="token operator">&amp;=</span> <span class="token operator">~</span><span class="token punctuation">(</span><span class="token number">0</span>b1111 <span class="token operator">&lt;&lt;</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>同 1, 将第 5 - 8 位清零</p><ol start="3"><li>对寄存器的位赋值</li></ol><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>uint32 a <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
a <span class="token operator">|=</span> <span class="token punctuation">(</span><span class="token number">0x01</span> <span class="token operator">&lt;&lt;</span> n<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>n = 3 时, 得到 0b1000;</p><ol start="4"><li>对位取反</li></ol><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code>uint32 a <span class="token operator">=</span> <span class="token number">0xF</span><span class="token punctuation">;</span>
a <span class="token operator">^=</span> <span class="token punctuation">(</span><span class="token number">0x01</span> <span class="token operator">&lt;&lt;</span> n<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>n = 3 时, 得到 0b0111;</p>`,41),c=[o];function l(i,r){return s(),a("div",null,c)}const k=n(t,[["render",l],["__file","ic_basic.html.vue"]]);export{k as default};
