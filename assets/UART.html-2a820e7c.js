import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as e,e as l,b as a,d as t}from"./app-8c5ce49e.js";const n={},r=l('<h1 id="串行通讯-uart" tabindex="-1"><a class="header-anchor" href="#串行通讯-uart" aria-hidden="true">#</a> 串行通讯 UART</h1><h2 id="外设介绍" tabindex="-1"><a class="header-anchor" href="#外设介绍" aria-hidden="true">#</a> 外设介绍</h2><h3 id="串行与并行通讯" tabindex="-1"><a class="header-anchor" href="#串行与并行通讯" aria-hidden="true">#</a> 串行与并行通讯</h3><h4 id="并行通讯" tabindex="-1"><a class="header-anchor" href="#并行通讯" aria-hidden="true">#</a> 并行通讯</h4><p>通过多根数据线一次传输多个数据</p><h4 id="串行通讯" tabindex="-1"><a class="header-anchor" href="#串行通讯" aria-hidden="true">#</a> 串行通讯</h4><p>通过少量数据线, 一位一位地传输数据</p><h4 id="通信方向" tabindex="-1"><a class="header-anchor" href="#通信方向" aria-hidden="true">#</a> 通信方向</h4><ol><li>全双工 两设备同时收发数据</li><li>半双工 两设备不能同时收发数据</li><li>单工 只有一个设备收发数据</li></ol><h4 id="同步方式" tabindex="-1"><a class="header-anchor" href="#同步方式" aria-hidden="true">#</a> 同步方式</h4><ol><li>同步通信 使用一根信号线表示时钟, 规定在时钟信号为正或负时获取数据</li><li>异步通信 以数据帧形式传输数据, 穿插一些同步信号</li></ol><h4 id="通信速率" tabindex="-1"><a class="header-anchor" href="#通信速率" aria-hidden="true">#</a> 通信速率</h4><ol><li>比特率 每秒传输的二进制位数</li><li>波特率 每秒传输的码元</li></ol><p>当码元只表示一个二进制位时, 比特率等于波特率 否则为一定倍数 (eg. 0 表示 00, 2V 表示 01, 4V 表示 10, 6V 表示 11 则码元表示2个二进制位)</p><h3 id="串口通信协议" tabindex="-1"><a class="header-anchor" href="#串口通信协议" aria-hidden="true">#</a> 串口通信协议</h3><h4 id="通信设备" tabindex="-1"><a class="header-anchor" href="#通信设备" aria-hidden="true">#</a> 通信设备</h4><ol><li>USART 通用同步异步收发器</li><li>UART 通用异步收发器</li></ol><h4 id="功能引脚" tabindex="-1"><a class="header-anchor" href="#功能引脚" aria-hidden="true">#</a> 功能引脚</h4><p>芯片上具体哪些引脚为功能引脚, 需要查看手册</p><ol><li>TX 发送数据输出引脚</li><li>RX 接收数据输入引脚</li><li>SW_RX 数据接收引脚, 只用于单线模式, 没有具体外部引脚</li><li>nRTS 请求以发送(Request to send) n 表示低电平有效 用于使能 RTS 流控制的 USTART 中, 用于硬件流控制模式 当 USART 准备接收数据时, 为低电平, 寄存器接收数据已满时, 为高电平</li><li>nCTS 清除以发送(Clear to send) n 表示低电平有效 用于使能 CTS 流控制的 USTART 中, 用于硬件流控制模式 发送器发送数据前, 检查 nCTS 引脚, 低电平表示可以发送, 高电平表示发送完当前数据后停止</li><li>SCLK 发送器时钟输出引脚, 只用于同步模式</li></ol><h4 id="数据寄存器-usart-dr" tabindex="-1"><a class="header-anchor" href="#数据寄存器-usart-dr" aria-hidden="true">#</a> 数据寄存器 USART_DR</h4><p>存储 8 位数据(也可设置为 9 位, 用于校验) 分为两个寄存器, USART_RDR 与 USART_TRD USART_RDR 为接收到的数据, 读取 USART_DR 时自动读取 RDR USART_TDR 为发送的数据, 写入 USART_DR 时自动写入 TDR</p><h4 id="控制-接收器-usart-cr1" tabindex="-1"><a class="header-anchor" href="#控制-接收器-usart-cr1" aria-hidden="true">#</a> 控制/接收器 USART_CR1</h4><ol><li>发送器 <ul><li>TE 发送使能 启动数据发送</li><li>TXE 发送寄存器为空 用于发送单个字节</li><li>TC 发送完成 用于发送多个字节</li><li>TXIE 发送完成中断使能</li></ul></li><li>接收器 <ul><li>RE 接收使能</li><li>RXNE 读数据寄存器非空</li><li>RXNEIE 发送完成中断使能</li></ul></li></ol><h4 id="小数波特率生成器" tabindex="-1"><a class="header-anchor" href="#小数波特率生成器" aria-hidden="true">#</a> 小数波特率生成器</h4>',25),h=a("p",{class:"katex-block"},[a("span",{class:"katex-display"},[a("span",{class:"katex"},[a("span",{class:"katex-mathml"},[a("math",{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},[a("semantics",null,[a("mrow",null,[a("mi",null,"T"),a("mi",null,"x"),a("mi",{mathvariant:"normal"},"/"),a("mi",null,"R"),a("mi",null,"x"),a("mtext",null,"波特率"),a("mo",null,"="),a("mfrac",null,[a("msub",null,[a("mi",null,"f"),a("mrow",null,[a("mi",null,"P"),a("mi",null,"L"),a("mi",null,"C"),a("mi",null,"K")])]),a("mrow",null,[a("mn",null,"16"),a("mo",null,"×"),a("mi",null,"U"),a("mi",null,"S"),a("mi",null,"A"),a("mi",null,"R"),a("mi",null,"T"),a("mi",null,"D"),a("mi",null,"I"),a("mi",null,"V")])])]),a("annotation",{encoding:"application/x-tex"}," Tx/Rx\\text{波特率}=\\frac{f_{PLCK}}{16\\times USARTDIV} ")])])]),a("span",{class:"katex-html","aria-hidden":"true"},[a("span",{class:"base"},[a("span",{class:"strut",style:{height:"1em","vertical-align":"-0.25em"}}),a("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"T"),a("span",{class:"mord mathnormal"},"x"),a("span",{class:"mord"},"/"),a("span",{class:"mord mathnormal",style:{"margin-right":"0.00773em"}},"R"),a("span",{class:"mord mathnormal"},"x"),a("span",{class:"mord text"},[a("span",{class:"mord cjk_fallback"},"波特率")]),a("span",{class:"mspace",style:{"margin-right":"0.2778em"}}),a("span",{class:"mrel"},"="),a("span",{class:"mspace",style:{"margin-right":"0.2778em"}})]),a("span",{class:"base"},[a("span",{class:"strut",style:{height:"2.1408em","vertical-align":"-0.7693em"}}),a("span",{class:"mord"},[a("span",{class:"mopen nulldelimiter"}),a("span",{class:"mfrac"},[a("span",{class:"vlist-t vlist-t2"},[a("span",{class:"vlist-r"},[a("span",{class:"vlist",style:{height:"1.3714em"}},[a("span",{style:{top:"-2.314em"}},[a("span",{class:"pstrut",style:{height:"3em"}}),a("span",{class:"mord"},[a("span",{class:"mord"},"16"),a("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),a("span",{class:"mbin"},"×"),a("span",{class:"mspace",style:{"margin-right":"0.2222em"}}),a("span",{class:"mord mathnormal",style:{"margin-right":"0.10903em"}},"U"),a("span",{class:"mord mathnormal",style:{"margin-right":"0.05764em"}},"S"),a("span",{class:"mord mathnormal"},"A"),a("span",{class:"mord mathnormal",style:{"margin-right":"0.13889em"}},"RT"),a("span",{class:"mord mathnormal",style:{"margin-right":"0.02778em"}},"D"),a("span",{class:"mord mathnormal",style:{"margin-right":"0.07847em"}},"I"),a("span",{class:"mord mathnormal",style:{"margin-right":"0.22222em"}},"V")])]),a("span",{style:{top:"-3.23em"}},[a("span",{class:"pstrut",style:{height:"3em"}}),a("span",{class:"frac-line",style:{"border-bottom-width":"0.04em"}})]),a("span",{style:{top:"-3.677em"}},[a("span",{class:"pstrut",style:{height:"3em"}}),a("span",{class:"mord"},[a("span",{class:"mord"},[a("span",{class:"mord mathnormal",style:{"margin-right":"0.10764em"}},"f"),a("span",{class:"msupsub"},[a("span",{class:"vlist-t vlist-t2"},[a("span",{class:"vlist-r"},[a("span",{class:"vlist",style:{height:"0.3283em"}},[a("span",{style:{top:"-2.55em","margin-left":"-0.1076em","margin-right":"0.05em"}},[a("span",{class:"pstrut",style:{height:"2.7em"}}),a("span",{class:"sizing reset-size6 size3 mtight"},[a("span",{class:"mord mtight"},[a("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.13889em"}},"P"),a("span",{class:"mord mathnormal mtight"},"L"),a("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.07153em"}},"C"),a("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.07153em"}},"K")])])])]),a("span",{class:"vlist-s"},"​")]),a("span",{class:"vlist-r"},[a("span",{class:"vlist",style:{height:"0.15em"}},[a("span")])])])])])])])]),a("span",{class:"vlist-s"},"​")]),a("span",{class:"vlist-r"},[a("span",{class:"vlist",style:{height:"0.7693em"}},[a("span")])])])]),a("span",{class:"mclose nulldelimiter"})])])])])])],-1),m=a("p",null,[a("span",{class:"katex"},[a("span",{class:"katex-mathml"},[a("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[a("semantics",null,[a("mrow",null,[a("msub",null,[a("mi",null,"f"),a("mrow",null,[a("mi",null,"P"),a("mi",null,"L"),a("mi",null,"C"),a("mi",null,"K")])])]),a("annotation",{encoding:"application/x-tex"},"f_{PLCK}")])])]),a("span",{class:"katex-html","aria-hidden":"true"},[a("span",{class:"base"},[a("span",{class:"strut",style:{height:"0.8889em","vertical-align":"-0.1944em"}}),a("span",{class:"mord"},[a("span",{class:"mord mathnormal",style:{"margin-right":"0.10764em"}},"f"),a("span",{class:"msupsub"},[a("span",{class:"vlist-t vlist-t2"},[a("span",{class:"vlist-r"},[a("span",{class:"vlist",style:{height:"0.3283em"}},[a("span",{style:{top:"-2.55em","margin-left":"-0.1076em","margin-right":"0.05em"}},[a("span",{class:"pstrut",style:{height:"2.7em"}}),a("span",{class:"sizing reset-size6 size3 mtight"},[a("span",{class:"mord mtight"},[a("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.13889em"}},"P"),a("span",{class:"mord mathnormal mtight"},"L"),a("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.07153em"}},"C"),a("span",{class:"mord mathnormal mtight",style:{"margin-right":"0.07153em"}},"K")])])])]),a("span",{class:"vlist-s"},"​")]),a("span",{class:"vlist-r"},[a("span",{class:"vlist",style:{height:"0.15em"}},[a("span")])])])])])])])]),t(" 为 USART 所在总线的时钟(不同总线下不同, 通常为 72MHz(APB2))")],-1),d=l('<p>USARTDIV 存放在寄存器 USART_BRR 的小数</p><h4 id="校验控制" tabindex="-1"><a class="header-anchor" href="#校验控制" aria-hidden="true">#</a> 校验控制</h4><p>当发送数据为 9 位时, 增加的一位为奇偶校验位, 校验由硬件完成</p><h2 id="标准库配置" tabindex="-1"><a class="header-anchor" href="#标准库配置" aria-hidden="true">#</a> 标准库配置</h2><h3 id="中断" tabindex="-1"><a class="header-anchor" href="#中断" aria-hidden="true">#</a> 中断</h3><p>通过设置寄存器, 可以启动不同中断(具体查表)</p><ol><li>中断名称 USARTn_IRQ</li><li>中断函数 void USARTn_IRQHandler()</li><li>使能中断 USART_ITConfig(USARTn, USART_IT_xxx, ENABLE)</li></ol><ul><li>任何在 USART_ITConfig 中使能的中断均能触发中断函数</li><li>使用 if(USART_GetITStatus(USARTn, USART_IT_xxx) == RESET/SET) 判断中断是否发生</li></ul><h3 id="usart-初始化结构体" tabindex="-1"><a class="header-anchor" href="#usart-初始化结构体" aria-hidden="true">#</a> USART 初始化结构体</h3><ul><li>通常初始化 USART_InitTypeDef <ol><li>USART_BaudRate 波特率设置</li><li>USART_WordLength 数据帧字长, 为 8 或 9</li><li>USART_StopBits 停止位设置, 一般为 1 位</li><li>USART_Parity 奇偶校验 USART_Parity_No 无校验, USART_Parity_Odd 奇校验, USART_Parity_Even 偶校验</li><li>USART_Mode 模式选择 USART_Rx 与 USART_Tx, 使用逻辑运算可以选择两个</li><li>USART_HardwareFlowControl 硬件流控制器选择, 用于硬件流控制模式</li></ol></li><li>时钟初始化(用于同步模式下) USART_ClockInitTypeDef <ol><li>USART_Clock 控制 SCLK 引脚, 同步模式下开启 USART_Clock_Disable 关闭 USART_Clock_Enable 开启</li><li>USART_CPOL 同步模式下, 空闲时间引脚的极性</li><li>USART_CPHA 时钟在第 n 个变化沿捕获数据 USART_CPHA_nEdge(n=1/2)</li><li>USART_LastBit 发送最后一个数据是否输出脉冲</li></ol></li></ul><h3 id="初始化配置" tabindex="-1"><a class="header-anchor" href="#初始化配置" aria-hidden="true">#</a> 初始化配置</h3><ol><li>使能 GPIOn 与 USARTn 的时钟</li><li>TX 设置为推挽复用, AF_PP</li><li>RX 设置为浮空输入, IN_FLOATING</li><li>初始化 USART_Init(USARTn, 初始化结构体)</li><li>配置中断</li><li>使能串口 USART_Cmd(USARTn, ENABLE)</li></ol><h3 id="数据发送" tabindex="-1"><a class="header-anchor" href="#数据发送" aria-hidden="true">#</a> 数据发送</h3><ol><li>使用函数 USART_SendData(USARTn, uint8_t ch); 发送 ch</li><li>使用 USART_FLAG_TXE(发送寄存器为空) 判断数据是否发送结束 while (USART_GetFlagStatus(USARTn, USART_FLAG_TXE) == RESET);</li></ol><h3 id="数据接收" tabindex="-1"><a class="header-anchor" href="#数据接收" aria-hidden="true">#</a> 数据接收</h3><p>为了防止数据丢失, 数据接收应在中断 USARTn_IRQHandler 中进行</p><h2 id="hal-库配置" tabindex="-1"><a class="header-anchor" href="#hal-库配置" aria-hidden="true">#</a> HAL 库配置</h2><h3 id="dma-发送数据" tabindex="-1"><a class="header-anchor" href="#dma-发送数据" aria-hidden="true">#</a> DMA 发送数据</h3><h4 id="使用注意" tabindex="-1"><a class="header-anchor" href="#使用注意" aria-hidden="true">#</a> 使用注意</h4><ol><li>使用 DMA 模式时, 需要在 DMA Setting 中, 使能相应的 DMA</li><li>除了使能 DMA, 还要开启 UART 的中断</li></ol><h4 id="发送流程" tabindex="-1"><a class="header-anchor" href="#发送流程" aria-hidden="true">#</a> 发送流程</h4><ol><li>使能相关中断, 并通过发送数据</li><li>发送完成后进入中断</li><li>关闭有关中断的使能</li><li>进入回调函数 HAL_UART_TxCpltCallback(UART_HandleTypeDef* huart)</li></ol><h3 id="dma-接收数据" tabindex="-1"><a class="header-anchor" href="#dma-接收数据" aria-hidden="true">#</a> DMA 接收数据</h3><p>通常使用 HAL_UARTEx_ReceiveToIdle_IT/DMA 函数高效接收数据</p><h4 id="idle-标志位" tabindex="-1"><a class="header-anchor" href="#idle-标志位" aria-hidden="true">#</a> IDLE 标志位</h4><p>当总线空闲时, 将触发 IDLE 标志位, 通常 IDLE 标识在 <mark>RX 不再接收到数据时</mark>触发 (RX 没有数据不会触发 IDLE 标志位), 因此可以通过判断 IDLE 标志位来判断接收是否结束</p><h4 id="接收流程" tabindex="-1"><a class="header-anchor" href="#接收流程" aria-hidden="true">#</a> 接收流程</h4><ol><li>使能相关中断并等待 RX 接收数据</li><li>RX 无法接收到数据时, 触发 IDLE 标识, 进入中断</li><li>关闭有关中断使能</li><li>进入回调函数 (注意带有接收数据信息) HAL_UARTEx_RxEventCallback(UART_HandleTypeDef* huart, uint16_t size)</li></ol><h2 id="踩坑笔记" tabindex="-1"><a class="header-anchor" href="#踩坑笔记" aria-hidden="true">#</a> 踩坑笔记</h2><ol><li>中断是否使能</li><li>是否添加 NVIC</li><li>波特率是否匹配</li></ol>',30),c=[r,h,m,d];function o(p,u){return i(),e("div",null,c)}const _=s(n,[["render",o],["__file","UART.html.vue"]]);export{_ as default};
