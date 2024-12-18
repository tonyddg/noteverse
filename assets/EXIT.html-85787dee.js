import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as n,e as i}from"./app-8c5ce49e.js";const l={},s=i(`<h1 id="外部中断-exit" tabindex="-1"><a class="header-anchor" href="#外部中断-exit" aria-hidden="true">#</a> 外部中断 EXIT</h1><h2 id="外设介绍" tabindex="-1"><a class="header-anchor" href="#外设介绍" aria-hidden="true">#</a> 外设介绍</h2><p>位于 APB2 总线上的外部中断控制器 EXITn 通过检测某个引脚 (PXn) 的电平上升/下降, 产生中断/事件, n &gt; 15 时为其他特殊事件(查表)</p><h2 id="标准库配置" tabindex="-1"><a class="header-anchor" href="#标准库配置" aria-hidden="true">#</a> 标准库配置</h2><h3 id="exit-初始化" tabindex="-1"><a class="header-anchor" href="#exit-初始化" aria-hidden="true">#</a> EXIT 初始化</h3><ol><li>EXIT_Line 中断/事件线 EXITn, n = 0 ~ 19</li><li>EXIT_Mode EXIT 模式, Interrupt 中断模式, Event 事件模式</li><li>EXIT_Trigger 触发类型 Rising 沿上升沿触发 Falling 沿下降沿触发</li><li>EXIT_LineCmd 启动/关闭中断 Enable/Disable</li></ol><ul><li>使用 EXITn 前, 要先使用 NVIC 使能 EXITn 的中断服务</li><li>使用 GPIO_EXITLineConfig(GPIO_PortSourceGPIOx, GPIO_PinSourceN); 使 EXITn 检测 PxN 引脚</li><li>触发中断后使用 EXIT_ClearITPendingBit(中断标识) 清除中断标识</li></ul><h2 id="hal-库配置" tabindex="-1"><a class="header-anchor" href="#hal-库配置" aria-hidden="true">#</a> HAL 库配置</h2><p>可配合虚函数使回调更加灵活</p><h3 id="cubemx-配置" tabindex="-1"><a class="header-anchor" href="#cubemx-配置" aria-hidden="true">#</a> CubeMX 配置</h3><ol><li>引脚模式选择为 GPIO_Exit</li><li>GPIO 模式中设置 EXIT 触发方式</li><li>NVIC 中启用中断</li></ol><h3 id="hal-操作" tabindex="-1"><a class="header-anchor" href="#hal-操作" aria-hidden="true">#</a> HAL 操作</h3><ol><li>未定义的函数 可以在此定义中断回调</li></ol><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">void</span> <span class="token function">HAL_GPIO_EXTI_Callback</span><span class="token punctuation">(</span><span class="token keyword">uint16_t</span> GPIO_Pin<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>产生回调后清除中断标志</li></ol><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token function">__HAL_GPIO_EXTI_CLEAR_IT</span><span class="token punctuation">(</span>GPIO_Pin<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,16),r=[s];function t(d,c){return e(),n("div",null,r)}const p=a(l,[["render",t],["__file","EXIT.html.vue"]]);export{p as default};