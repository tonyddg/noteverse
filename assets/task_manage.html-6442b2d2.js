import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as s,f as i,e as a}from"./app-8c5ce49e.js";const l={},t=a(`<h1 id="任务管理" tabindex="-1"><a class="header-anchor" href="#任务管理" aria-hidden="true">#</a> 任务管理</h1><h2 id="任务" tabindex="-1"><a class="header-anchor" href="#任务" aria-hidden="true">#</a> 任务</h2><p>在FreeRTOS中, 线程 (Thread) 和任务 (Task) 的概念是相同的, 每个任务就是一个线程</p><h2 id="任务基本模式" tabindex="-1"><a class="header-anchor" href="#任务基本模式" aria-hidden="true">#</a> 任务基本模式</h2><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code><span class="token keyword">void</span> <span class="token function">TaskFunction</span><span class="token punctuation">(</span> <span class="token keyword">void</span> <span class="token operator">*</span>pvParameters <span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token punctuation">;</span><span class="token punctuation">;</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
    <span class="token punctuation">}</span>
    <span class="token function">vTaskDelete</span><span class="token punctuation">(</span><span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>这个任务函数不能有返回值 (即使用return语句), 不然会导致异常</li><li>如果不需要这个任务的话, 必须要用语句显示地删除这个任务 (比如调用vTaskDelete()这个函数)</li><li>任务具有以下状态 <ol><li>就绪状态 (Ready) 当任务没有被阻塞或者挂起等待运行的时候处于此状态</li><li>运行状态 (Running) 当任务被内核调度执行的时候处于此状态</li><li>阻塞状态 (Blocked) 当任务等待某个事件或信号的时候处于此状态</li><li>挂起状态 (Suspended) 当任务被 vTaskSuspend() 函数禁止运行的时候处于此状态</li></ol></li></ul>`,6),o=a(`<h2 id="任务的优先级" tabindex="-1"><a class="header-anchor" href="#任务的优先级" aria-hidden="true">#</a> 任务的优先级</h2><ul><li>任务的优先级可以用 vTaskPrioritySet() 函数设置</li><li>FreeRTOSConfig.h 头文件中的 configMAX_PRIORITIES 可以设置最高优先级的值</li><li>在 FreeRTOS-&gt;Tasks and Queues 中可以单独设置任务的优先级</li></ul><h2 id="任务的创建" tabindex="-1"><a class="header-anchor" href="#任务的创建" aria-hidden="true">#</a> 任务的创建</h2><p>任务由 FreeRTOS 中 xTaskCreate() 函数创建</p><div class="language-cpp line-numbers-mode" data-ext="cpp"><pre class="language-cpp"><code>BaseType_t <span class="token function">xTaskCreate</span><span class="token punctuation">(</span> TaskFunction_t pvTaskCode<span class="token punctuation">,</span>
                        <span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span> <span class="token keyword">const</span> pcName<span class="token punctuation">,</span>
                        <span class="token keyword">uint16_t</span> usStackDepth<span class="token punctuation">,</span>
                        <span class="token keyword">void</span> <span class="token operator">*</span>pvParameters<span class="token punctuation">,</span>
                        UBaseType_t uxPriority<span class="token punctuation">,</span>
                        TaskHandle_t <span class="token operator">*</span>pxCreatedTask <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>pvTaskCode 一个函数指针, 指向执行任务的函数</li><li>pcName 任务的描述名称, 方便调试, 不用的话可以设为 Null</li><li>usStackDepth 每个任务有自己的栈空间, 这里根据任务占用需求设置栈空间的大小, 单位是字 (Word)</li><li>pvParameters 用于传递给任务的参数, 不用的话可以设为Null</li><li>uxPriority 设置任务的优先级, 范围由 0 到 (configMAX_PRIORITIES – 1)。数值越大, 等级越高</li><li>pxCreatedTask 任务的句柄</li><li>函数的返回值 <ol><li>pdPass表示任务创建成功</li><li>pdFail表示创建失败</li></ol></li></ol><ul><li>每执行 xTaskCreate() 创建一个任务便会在堆空间中开辟一个TCB块和一个存放数据的Stack栈区</li><li>STM32CubeIDE 中, 负责创建任务的函数是 osThreadNew()</li></ul><h2 id="调度器" tabindex="-1"><a class="header-anchor" href="#调度器" aria-hidden="true">#</a> 调度器</h2><ul><li>FreeRTOS 中采用了 round-robin 的调度算法, 包含抢占式 (preemptive) 和合作式 (cooperative) 两种模式</li><li>模式的选择在 FreeRTOSConfig.h 中由参数 configUSE_PREEMPTION 决定</li></ul><h3 id="抢占式模式" tabindex="-1"><a class="header-anchor" href="#抢占式模式" aria-hidden="true">#</a> 抢占式模式</h3><p>在抢占式模式下, 在每次调度器运行时, 高优先级的任务会被切换优先执行, 当前处于运行状态的低优先级的任务则会立刻进入就绪状态等待运行</p><h3 id="合作式模式" tabindex="-1"><a class="header-anchor" href="#合作式模式" aria-hidden="true">#</a> 合作式模式</h3><p>在合作式模式下, 高优先级任务不会抢占当前正在运行状态的低优先级任务, 直到低优先级任务进入以下状态才会切换任务</p><ol><li>完成进入阻塞状态 (比如调用 osDelay() 函数)</li><li>就绪状态 (比如调用 osThreadYield() 函数)</li><li>被系统置于挂起状态后</li></ol><h3 id="抢占式无时间片调度" tabindex="-1"><a class="header-anchor" href="#抢占式无时间片调度" aria-hidden="true">#</a> 抢占式无时间片调度</h3><ul><li>需要设置 configUSE_TIME_SLICING 以关闭时间片</li><li>这种调度方式下, 因为没有采取时间片, 所以调度器的执行开销会比较小</li><li>在抢占式无时间片调度下, 当前运行的任务会一直运行, 直到它进入阻塞或者挂起状态, 另一个相同优先级的任务才会运行</li></ul><h2 id="任务的调度" tabindex="-1"><a class="header-anchor" href="#任务的调度" aria-hidden="true">#</a> 任务的调度</h2><ul><li>FreeRTOS 对任务的调度采用基于时间片 (time slicing) 的方式</li><li>即把一段时间等分成了很多个时间段, 在每个时间片结束后, 进入内核调度任务, 保证优先级最高的任务能执行或使相同优先级的轮流使用每个时间段占用 CPU 资源</li><li>时间片的大小由参数 configTICK_RATE_HZ 设置</li><li>因此, 在 FreeRTOS 内时间的最小单位是一个节拍 (tick), 延时函数 vTaskDelayUntil 和 vTaskDelay 的参数需要的是延时的节拍数, 不能直接设置延时时间</li><li>可以使用函数 pdMS_TO_TICKS() 将时间转为节拍数</li></ul><h2 id="空闲任务" tabindex="-1"><a class="header-anchor" href="#空闲任务" aria-hidden="true">#</a> 空闲任务</h2><ul><li>空闲任务是调度器在 vTaskStartScheduler 函数调用启动后自动创建的一个任务</li><li>空闲任务具有最低的优先级0, 当用户创建的任务都在阻塞状态或挂起状态时, 空闲任务便得以执行</li><li>最低的优先级确保空闲任务不会抢占用户任务, 同时空闲任务负责清理内核的资源</li><li>空闲任务可以绑定一个钩子任务 (Task Hook), 当空闲任务运行的时候钩子任务也会被自动调用</li><li>钩子任务的函数原型是 vApplicationIdleHook( void ), 可以由用户定义</li></ul>`,20);function c(p,r){return e(),s("div",null,[t,i(" ![](./src/task_schedule.jpg) "),o])}const h=n(l,[["render",c],["__file","task_manage.html.vue"]]);export{h as default};
