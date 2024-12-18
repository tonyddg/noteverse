import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as p,c as d,b as n,d as s,a as e,w as o,e as l}from"./app-8c5ce49e.js";const u={},r=n("h1",{id:"pyside6-高级使用",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#pyside6-高级使用","aria-hidden":"true"},"#"),s(" PySide6 高级使用")],-1),h=n("h2",{id:"线程与进程",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#线程与进程","aria-hidden":"true"},"#"),s(" 线程与进程")],-1),k={href:"https://www.pythonguis.com/tutorials/multithreading-pyside6-applications-qthreadpool/",target:"_blank",rel:"noopener noreferrer"},_=n("code",null,"QApplication",-1),m=n("code",null,"exec()",-1),v=n("br",null,null,-1),E=n("p",null,"可通过开启多线程或进程已解决此问题",-1),b=n("li",null,"多线程中, 各个子线程与主程序公用一个内存空间, 因此线程间的数据可以简单交互, 并且可以快速启动子线程, 一般使用多线程即可",-1),f=n("li",null,"多进程中, 各个进程相互独立, 因此数据交互较为困难且启动速度慢, 仅用于特殊情况",-1),B=n("br",null,null,-1),y={href:"https://docs.python.org/zh-cn/3.12/library/concurrent.futures.html",target:"_blank",rel:"noopener noreferrer"},A=n("a",{href:"#qt-%E5%A4%9A%E8%BF%9B%E7%A8%8B"},"多进程",-1),g=n("p",null,"注意, 只要任务的耗时可能超过 10ms, 就建议通过线程的方式运行, 如",-1),Q=n("ul",null,[n("li",null,"文件的读取与创建"),n("li",null,"表格, 图片等大数据的统计与运算")],-1),w=n("h3",{id:"qt-多线程",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#qt-多线程","aria-hidden":"true"},"#"),s(" Qt 多线程")],-1),P=n("h4",{id:"任务基类",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#任务基类","aria-hidden":"true"},"#"),s(" 任务基类")],-1),S={href:"https://doc.qt.io/qtforpython-6/PySide6/QtCore/QRunnable.html",target:"_blank",rel:"noopener noreferrer"},F=n("br",null,null,-1),x=n("code",null,"QtCore",-1),q=n("code",null,"QObject",-1),T=n("br",null,null,-1),C=n("a",{href:"#%E7%BA%BF%E7%A8%8B%E6%B1%A0%E7%B1%BB"},"线程池",-1),D=n("p",null,[s("虚方法 "),n("code",null,"run()"),s(" 表示任务类所需要执行的任务")],-1),V=n("li",null,[s("任务类为一个纯虚类, 需要通过继承任务基类并实现虚方法 "),n("code",null,"run"),s(" 才能表示特定任务")],-1),j=n("code",null,"@Slot()",-1),W=l('<p>方法 <code>setAutoDelete(autoDelete)</code> 设置线程结束后是否删除对象</p><ul><li><code>autoDelete</code> 是否启用自动删除, 默认为 <code>True</code></li><li>该方法最好仅在任务执行前如构造任务类时调用, 否则将导致错误</li><li>当 <code>autoDelete</code> 启用时, 同一个对象不能多次启动, 否则将导致资源访问问题</li><li>关于是否启用该设置 <ul><li>对于绝大多数重复执行的简单任务, 应当启用此设置 <ul><li>任务提交到<a href="#%E7%BA%BF%E7%A8%8B%E6%B1%A0%E7%B1%BB">线程池</a>后, 任务对象的控制权将被接管, 因此任务应当在线程启动前才作为局部变量创建</li><li>此时可通过<a href="#%E7%BA%BF%E7%A8%8B%E6%95%B0%E6%8D%AE%E4%BA%A4%E4%BA%92">线程数据交互</a>接收任务结果, 因此默认启用自动删除即可</li></ul></li><li>对于同时仅启动一次的, 管理复杂资源的任务, 应当关闭此设置 <ul><li>任务提交到<a href="#%E7%BA%BF%E7%A8%8B%E6%B1%A0%E7%B1%BB">线程池</a>后, 不会接管控制权, 因此任务应当作为全局变量或成员变量</li><li>此时任务数据也可直接通过类成员传递</li></ul></li></ul></li></ul><p>对于一般的 Python 方法, 并不一定要专门定义任务类, 而是可以设计一个<a href="#%E9%80%9A%E7%94%A8%E5%B0%81%E8%A3%85">通用封装</a></p><h4 id="线程池类" tabindex="-1"><a class="header-anchor" href="#线程池类" aria-hidden="true">#</a> 线程池类</h4>',4),O={href:"https://doc.qt.io/qtforpython-6/PySide6/QtCore/QThreadPool.html#PySide6.QtCore.QThreadPool",target:"_blank",rel:"noopener noreferrer"},N=l('<p>方法 <code>start(runnable, priority = 0)</code> 分配线程执行任务</p><ul><li><code>runnable</code> 待执行任务, 传入<a href="#%E4%BB%BB%E5%8A%A1%E5%9F%BA%E7%B1%BB">任务基类</a>的子类</li><li><code>priority</code> 任务优先级, 传入整数</li><li>当线程池没有空闲线程时, 任务将暂存在等待队列, 根据优先级等待空闲任务来执行</li></ul><p>方法 <code>tryStart(arg__1)</code> 尝试执行任务</p><ul><li><code>arg__1</code> 待执行任务, 传入<a href="#%E4%BB%BB%E5%8A%A1%E5%9F%BA%E7%B1%BB">任务基类</a>的子类</li><li>与 <code>start()</code> 不同, 当没有空闲线程时, 返回 <code>False</code> 且放弃执行任务, 否则返回 <code>True</code></li><li>通过该方法启动任务, 可以保证任务的实时性</li></ul><p>方法 <code>waitForDone(msecs = -1)</code> 等待所有任务执行完毕</p><ul><li><code>msecs</code> 等待时长, 单位毫秒, 传入 <code>-1</code> 表示忽略等待时长</li><li>当任务执行完毕时返回 <code>True</code></li></ul><p>以下方法可查询线程池状态</p><ul><li><code>maxThreadCount()</code> 获取最大线程数</li><li><code>activeThreadCount()</code> 获取正在执行任务的线程数</li></ul><h4 id="线程数据交互" tabindex="-1"><a class="header-anchor" href="#线程数据交互" aria-hidden="true">#</a> 线程数据交互</h4>',9),L=n("li",null,[s("对于任务执行前的参数"),n("br"),s(" 对于简单任务, 可通过任务类的构造函数, 在任务执行前向任务传递参数, 并作为任务类的成员保存")],-1),R=n("br",null,null,-1),I=n("br",null,null,-1),M=n("code",null,"QObject",-1),H=n("br",null,null,-1),U=n("code",null,"QObject",-1),G=n("a",{href:"#%E5%85%B1%E4%BA%AB%E8%B5%84%E6%BA%90%E4%BF%9D%E6%8A%A4%E6%9C%BA%E5%88%B6"},"共享资源保护机制",-1),z=l(`<div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">import</span> pandas<span class="token punctuation">,</span> traceback

<span class="token keyword">class</span> <span class="token class-name">LoadWork</span><span class="token punctuation">(</span>QRunnable<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token triple-quoted-string string">&#39;&#39;&#39;
    CSV 读取任务
    &#39;&#39;&#39;</span>
    <span class="token comment"># 使用继承自 QObject 的嵌套类定义信号</span>
    <span class="token keyword">class</span> <span class="token class-name">Signals</span><span class="token punctuation">(</span>QObject<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># 读取成功, 发出读取数据</span>
        resolve <span class="token operator">=</span> Signal<span class="token punctuation">(</span>pandas<span class="token punctuation">.</span>DataFrame<span class="token punctuation">)</span>
        <span class="token comment"># 读取失败, 发出异常</span>
        reject <span class="token operator">=</span> Signal<span class="token punctuation">(</span>Exception<span class="token punctuation">)</span>
        <span class="token comment"># 任务结束</span>
        finish <span class="token operator">=</span> Signal<span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token comment"># 调用父类的构造函数不能忘</span>
        <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
            <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment"># 通过构造函数参数获取任务参数</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> path<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>path <span class="token operator">=</span> path
        self<span class="token punctuation">.</span>signals <span class="token operator">=</span> LoadWork<span class="token punctuation">.</span>Signals<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token decorator annotation punctuation">@Slot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">run</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token comment"># 使用异常处理判断任务执行情况</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span> <span class="token comment"># 执行任务</span>
            res <span class="token operator">=</span> pandas<span class="token punctuation">.</span>read_csv<span class="token punctuation">(</span>self<span class="token punctuation">.</span>path<span class="token punctuation">)</span>
        <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span> <span class="token comment"># 发生错误</span>
            self<span class="token punctuation">.</span>signals<span class="token punctuation">.</span>reject<span class="token punctuation">.</span>emit<span class="token punctuation">(</span>e<span class="token punctuation">)</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span> <span class="token comment"># 执行成功</span>
            self<span class="token punctuation">.</span>signals<span class="token punctuation">.</span>resolve<span class="token punctuation">.</span>emit<span class="token punctuation">(</span>res<span class="token punctuation">)</span>
        <span class="token keyword">finally</span><span class="token punctuation">:</span> <span class="token comment"># 后处理</span>
            self<span class="token punctuation">.</span>signals<span class="token punctuation">.</span>finish<span class="token punctuation">.</span>emit<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

<span class="token comment"># 创建任务的槽函数</span>
<span class="token decorator annotation punctuation">@Slot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">_ExecWork</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token comment"># 创建任务</span>
    work <span class="token operator">=</span> LoadWork<span class="token punctuation">(</span><span class="token string">&quot;res/big.csv&quot;</span><span class="token punctuation">)</span>
    
    <span class="token comment"># 在创建任务后立刻连接信息</span>
    <span class="token comment"># 任务成功时保存结果</span>
    work<span class="token punctuation">.</span>signals<span class="token punctuation">.</span>resolve<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token keyword">lambda</span> obj<span class="token punctuation">:</span> self<span class="token punctuation">.</span>res <span class="token operator">=</span> obj<span class="token punctuation">)</span>
    <span class="token comment"># 任务失败时打印错误信息</span>
    work<span class="token punctuation">.</span>signals<span class="token punctuation">.</span>reject<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token keyword">lambda</span> obj<span class="token punctuation">:</span> traceback<span class="token punctuation">.</span>print_exception<span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">)</span>
    
    <span class="token comment"># 执行任务</span>
    self<span class="token punctuation">.</span>threadpool<span class="token punctuation">.</span>start<span class="token punctuation">(</span>work<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="通用封装" tabindex="-1"><a class="header-anchor" href="#通用封装" aria-hidden="true">#</a> 通用封装</h4><p>除了专门为特定任务设计任务类, 还可以通过以下通用封装, 将一般 Python 方法封装为任务类</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">class</span> <span class="token class-name">FunWork</span><span class="token punctuation">(</span>QRunnable<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">class</span> <span class="token class-name">Signals</span><span class="token punctuation">(</span>QObject<span class="token punctuation">)</span><span class="token punctuation">:</span>
        resolve <span class="token operator">=</span> Signal<span class="token punctuation">(</span><span class="token builtin">object</span><span class="token punctuation">)</span>
        reject <span class="token operator">=</span> Signal<span class="token punctuation">(</span>Exception<span class="token punctuation">)</span>
        finish <span class="token operator">=</span> Signal<span class="token punctuation">(</span><span class="token punctuation">)</span>

        <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span> <span class="token operator">-</span><span class="token operator">&gt;</span> <span class="token boolean">None</span><span class="token punctuation">:</span>
            <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> fun<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>kwargs<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token triple-quoted-string string">&#39;&#39;&#39;
        * \`fun\` 待封装的方法
        * \`*args, **kwargs\` 方法参数
        &#39;&#39;&#39;</span>
        <span class="token builtin">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>__init__<span class="token punctuation">(</span><span class="token punctuation">)</span>
        self<span class="token punctuation">.</span>fun <span class="token operator">=</span> fun
        self<span class="token punctuation">.</span>args <span class="token operator">=</span> args
        self<span class="token punctuation">.</span>kwargs <span class="token operator">=</span> kwargs

        self<span class="token punctuation">.</span>signals <span class="token operator">=</span> FunWork<span class="token punctuation">.</span>Signals<span class="token punctuation">(</span><span class="token punctuation">)</span>
    
    <span class="token decorator annotation punctuation">@Slot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">def</span> <span class="token function">run</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            res <span class="token operator">=</span> self<span class="token punctuation">.</span>fun<span class="token punctuation">(</span><span class="token operator">*</span>self<span class="token punctuation">.</span>args<span class="token punctuation">,</span> <span class="token operator">**</span>self<span class="token punctuation">.</span>kwargs<span class="token punctuation">)</span>
        <span class="token keyword">except</span> Exception <span class="token keyword">as</span> e<span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>signals<span class="token punctuation">.</span>reject<span class="token punctuation">.</span>emit<span class="token punctuation">(</span>e<span class="token punctuation">)</span>
        <span class="token keyword">else</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>signals<span class="token punctuation">.</span>resolve<span class="token punctuation">.</span>emit<span class="token punctuation">(</span>res<span class="token punctuation">)</span>
        <span class="token keyword">finally</span><span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>signals<span class="token punctuation">.</span>finish<span class="token punctuation">.</span>emit<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="独立线程类" tabindex="-1"><a class="header-anchor" href="#独立线程类" aria-hidden="true">#</a> 独立线程类</h4>`,5),J={href:"https://doc.qt.io/qtforpython-6/PySide6/QtCore/QThread.html#PySide6.QtCore.QThread",target:"_blank",rel:"noopener noreferrer"},K=n("h4",{id:"共享资源保护机制",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#共享资源保护机制","aria-hidden":"true"},"#"),s(" 共享资源保护机制")],-1),X={href:"https://blog.csdn.net/xieliru/article/details/137419434",target:"_blank",rel:"noopener noreferrer"},Y=n("br",null,null,-1),Z=n("h4",{id:"多线程使用注意",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#多线程使用注意","aria-hidden":"true"},"#"),s(" 多线程使用注意")],-1),$=n("h3",{id:"qt-多进程",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#qt-多进程","aria-hidden":"true"},"#"),s(" Qt 多进程")],-1),nn=n("br",null,null,-1),sn={href:"https://doc.qt.io/qtforpython-6/PySide6/QtCore/QProcess.html#PySide6.QtCore.QProcess",target:"_blank",rel:"noopener noreferrer"},en=n("code",null,"QObject",-1),an=n("code",null,"QtCore",-1),tn=n("h4",{id:"子进程设置",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#子进程设置","aria-hidden":"true"},"#"),s(" 子进程设置")],-1),on=n("p",null,[s("构造函数 "),n("code",null,"QProcess(parent = None)")],-1),ln=n("li",null,[n("code",null,"parent"),s(" 子进程的父组件, 为了保证子进程能正常删除, 最好设置 "),n("code",null,"None")],-1),cn=n("li",null,[s("由于父组件设置为 "),n("code",null,"None"),s(", 因此需要保证子进程对象为成员变量")],-1),pn=n("a",{href:"#%E5%AD%90%E8%BF%9B%E7%A8%8B%E6%8E%A7%E5%88%B6%E4%BA%A4%E4%BA%92"},"finish",-1),dn=l("<p>方法 <code>setProgram(program)</code> 设置子进程运行的程序路径</p><ul><li><code>program</code> 字符串, 程序路径</li></ul><p>方法 <code>setArguments(arguments)</code> 设置子进程运行的命令行参数</p><ul><li><code>arguments</code> 字符串列表, 列表中每个元素对应一个参数</li><li>注意, 即使传入数字参数, 也要使用 <code>str()</code> 将类型转换为字符串</li></ul><p>方法 <code>setProcessEnvironment(environment)</code> 设置子进程环境变量</p>",5),un=n("code",null,"environment",-1),rn=n("code",null,"QtCore",-1),hn=n("code",null,"QProcessEnvironment",-1),kn=n("li",null,[s("一般通过静态方法 "),n("code",null,"env = QProcessEnvironment.systemEnvironment()"),s(" 获取系统环境变量")],-1),_n=n("code",null,"insert(name, value)",-1),mn={href:"https://doc.qt.io/qtforpython-6/PySide6/QtCore/QProcessEnvironment.html#PySide6.QtCore.QProcessEnvironment",target:"_blank",rel:"noopener noreferrer"},vn=l(`<p>方法 <code>setWorkingDirectory(dir)</code> 设置子进程的工作目录</p><ul><li><code>dir</code> 工作目录路径字符串</li></ul><p>例如命令行指令 <code>python test.py 3</code> 对应的设置代码为</p><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code>self<span class="token punctuation">.</span>p <span class="token operator">=</span> QProcess<span class="token punctuation">(</span>self<span class="token punctuation">)</span>
self<span class="token punctuation">.</span>setProgram<span class="token punctuation">(</span><span class="token string">&quot;python&quot;</span><span class="token punctuation">)</span>
self<span class="token punctuation">.</span>setArguments<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">&quot;test.py&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;3&quot;</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="子进程控制交互" tabindex="-1"><a class="header-anchor" href="#子进程控制交互" aria-hidden="true">#</a> 子进程控制交互</h4><p>关于子进程的启动</p>`,6),En=n("code",null,"start()",-1),bn=n("li",null,[s("使用子进程前, 应当保证"),n("a",{href:"#%E5%AD%90%E8%BF%9B%E7%A8%8B%E8%AE%BE%E7%BD%AE"},"子进程设置"),s("完毕")],-1),fn=n("li",null,"通过此方法启动的子进程, 当主进程退出时子进程也将强制退出",-1),Bn=n("code",null,"terminate()",-1),yn=n("code",null,"waitForFinished()",-1),An=n("a",{href:"#%E5%AD%90%E8%BF%9B%E7%A8%8B%E4%BD%BF%E7%94%A8%E7%A4%BA%E4%BE%8B"},"示例",-1),gn=n("li",null,[s("方法 "),n("code",null,"startDetached()"),s(" 分离并启动子进程 "),n("ul",null,[n("li",null,"通过此方法启动的子进程, 当主进程退出时子进程不受影响")])],-1),Qn=n("p",null,"关于子进程的退出",-1),wn=n("li",null,[s("槽函数 "),n("code",null,"terminate()"),s(" 尝试退出子进程, 但可能退出失败 (通常能让进程在退出前保存数据) "),n("ul",null,[n("li",null,"对于 Windows 下的控制台程序, 该方法可能无法使程序退出")])],-1),Pn=n("li",null,[s("槽函数 "),n("code",null,"kill()"),s(" 强制退出子进程")],-1),Sn=n("code",null,"waitForFinished(msecs = 30000)",-1),Fn=n("li",null,[n("code",null,"msecs"),s(" 等待时长, 单位毫秒, 传入 "),n("code",null,"-1"),s(" 将不断等待")],-1),xn=n("li",null,[s("当成功退出时, 返回 "),n("code",null,"True"),s(", 当子进程已经退出或等待超时或出错, 返回 "),n("code",null,"False")],-1),qn=n("code",null,"app.exec()",-1),Tn=n("li",null,"当子进程对象被销毁时, 将强制退出, 如作为局部变量且在构造函数中没有给出父组件",-1),Cn=l('<p>关于子进程的状态</p><ul><li>信号 <code>finished</code> 当子进程退出时发出</li><li>方法 <code>exitStatus()</code> 获取子进程退出状态, 返回值为枚举类型 <code>QProcess.ExitStatus</code> 取值为 <ul><li><code>ExitStatus.NormalExit</code> 正常退出</li><li><code>ExitStatus.CrashExit</code> 错误退出</li></ul></li><li>方法 <code>state()</code> 获取子进程当前状态, 返回值为枚举类型 <code>QProcess.ProcessState</code>, 取值有 <ul><li><code>ProcessState.NotRunning</code> 子进程未运行或退出</li><li><code>ProcessState.Starting</code> 子进程启动中</li><li><code>ProcessState.Running</code> 子进程运行中</li></ul></li></ul><p>关于子进程的运行中错误</p><ul><li>方法 <code>error()</code> 获取当前子进程是否有运行时错误, 返回值为枚举类型 <code>QProcess.ProcessError</code> 常用取值为 <ul><li><code>ProcessError.UnknownError</code> 未知错误或没有错误</li><li><code>ProcessError.WriteError / ReadError</code> 向子进程写入或读取出错</li><li><code>ProcessError.Crashed</code> 子进程崩溃</li><li><code>ProcessError.FailedToStart</code> 子进程启动失败</li><li><code>ProcessError.Timedout</code> 函数 <code>waitFor...</code> 等待超时</li></ul></li><li>信号 <code>errorOccurred(error)</code> 当子进程出错时发出信号 <ul><li>数据 <code>error</code> 为枚举类型 <code>QProcess.ProcessError</code></li></ul></li></ul><h4 id="子进程数据交互" tabindex="-1"><a class="header-anchor" href="#子进程数据交互" aria-hidden="true">#</a> 子进程数据交互</h4><p>子进程与主进程之间通过标准输出流以及标准错误流交互数据</p><p>对于标准输出流 <code>stdout</code></p>',7),Dn=n("li",null,[s("信号 "),n("code",null,"readyReadStandardOutput"),s(" 当标准输出流出现新数据时, 发出信号 "),n("ul",null,[n("li",null,[s("注意, 对于 Python 的输出函数 "),n("code",null,"print"),s(" 在调用时仅会将输出暂存在缓冲区, 应当使用 "),n("code",null,"print(..., flush = True)"),s(" 保证每次输出都刷新缓冲区, 主进程能接收到数据")])])],-1),Vn=n("code",null,"readAllStandardOutput()",-1),jn=n("code",null,"QBytes",-1),Wn=n("code",null,"data",-1),On=n("li",null,[s("一般通过 "),n("code",null,"data.data().decode()"),s(" 将读取数据转为字符串 (默认编码为 "),n("code",null,"utf-8"),s(")")],-1),Nn=l("<li>方法 <code>setStandardOutputFile(fileName, mode = ...)</code> 将标准输出流内容重定向至文件 <ul><li><code>fileName</code> 重定向文件路径</li><li><code>mode</code> 文件打开方式, 参数为枚举类型 <code>QProcess.OpenModeFlag</code> 常用值有 (该枚举类型继承自 <code>QIODeviceBase</code>) <ul><li><code>OpenModeFlag.Append</code> 向文件末尾添加内容</li><li><code>OpenModeFlag.Truncate</code> 打开文件后清空其中内容</li></ul></li><li>当文件不存在时将尝试创建, 当打开失败时, 进程将创建失败</li><li>重定向后, 方法 <code>readAllStandardOutput()</code> 从标准输入流中读取内容将出错</li></ul></li>",1),Ln=n("p",null,[s("对于标准错误流 "),n("code",null,"stderr"),s(" 同样有信号 "),n("code",null,"readyReadStandardError"),s(", 方法 "),n("code",null,"readAllStandardError()"),s(", 方法 "),n("code",null,"setStandardErrorFile(...)"),s(", 使用方法与标准输出流的一致")],-1),Rn=n("p",null,[s("方法 "),n("code",null,"write(data)"),s(" 向子进程写入数据")],-1),In=n("code",null,"data",-1),Mn=n("code",null,"QtCore",-1),Hn=n("code",null,"QByteArray",-1),Un=n("h4",{id:"子进程使用注意",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#子进程使用注意","aria-hidden":"true"},"#"),s(" 子进程使用注意")],-1),Gn=n("li",null,[s("子进程创建, 由于"),n("a",{href:"#%E5%AD%90%E8%BF%9B%E7%A8%8B%E6%8E%A7%E5%88%B6%E4%BA%A4%E4%BA%92"},"子进程对象销毁时将关闭子进程"),n("ul",null,[n("li",null,"对于单个子进程, 应当将子进程对象作为对象成员管理"),n("li",null,"对于多个子进程, 应当应当将子进程作为局部变量, 并设置父组件"),n("li",null,[s("无论何种方法, 设置父组件为 "),n("code",null,"None"),s(" 保证自动删除")])])],-1),zn=n("li",null,[s("对于单个子进程, 在子进程退出后, 通过赋值为 "),n("code",null,"None"),s(" 使其删除")],-1),Jn=n("a",{href:"#%E5%AD%90%E8%BF%9B%E7%A8%8B%E6%8E%A7%E5%88%B6%E4%BA%A4%E4%BA%92"},"finish",-1),Kn=n("h2",{id:"实用类",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#实用类","aria-hidden":"true"},"#"),s(" 实用类")],-1),Xn=n("h3",{id:"qt-定时器",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#qt-定时器","aria-hidden":"true"},"#"),s(" QT 定时器")],-1),Yn={href:"https://doc.qt.io/qtforpython-6/PySide6/QtCore/QTimer.html#PySide6.QtCore.QTimer",target:"_blank",rel:"noopener noreferrer"},Zn=l('<p><code>QTimer</code> 类位于模块 <code>QtCore</code> 下</p><h4 id="定时器设置" tabindex="-1"><a class="header-anchor" href="#定时器设置" aria-hidden="true">#</a> 定时器设置</h4><p>方法 <code>setInterval(msec)</code> 设置定时器触发间隔, 单位毫秒</p><ul><li><code>msec</code> 定时器触发毫秒间隔, 传入整数, 默认为 <code>0</code></li><li>如果定时器触发间隔为 <code>0</code>, 将在每个事件循环结束后触发, 应当避免设置 <code>0</code> 间隔</li></ul><p>方法 <code>setSingleShot(singleShot)</code> 设置是否重复定时</p><ul><li><code>singleShot</code> 传入 <code>True</code> 后, 定时器将在第一次到达间隔后停止计时, 默认为 <code>False</code></li><li>停止的定时器需要通过槽函数 <a href="#%E5%AE%9A%E6%97%B6%E5%99%A8%E4%BA%A4%E4%BA%92"></a> 重启</li></ul><p>方法 <code>setTimerType(atype)</code> 设置定时器精度</p><ul><li><code>atype</code> 精度设置, 参数为枚举类型 <code>QTimer.TimerType</code>, 可用值有 <ul><li><code>TimerType.PreciseTimer</code> 精确定时器, 用于精确计时需要</li><li><code>TimerType.CoarseTimer</code> 粗糙定时器, 存在 5% 的误差, 但能降低 CPU 消耗, 默认参数</li><li><code>TimerType.VeryCoarseTimer</code> 极粗糙定时器, 仅具有秒级精度</li></ul></li></ul><h4 id="定时器交互" tabindex="-1"><a class="header-anchor" href="#定时器交互" aria-hidden="true">#</a> 定时器交互</h4><p>方法 <code>isActive()</code> 获取定时器是否正在运行</p><ul><li>当正在运行时返回 <code>True</code></li></ul><p>方法 <code>remainingTime()</code> 获取定时器距离到达计时间隔的剩余时间</p><ul><li>返回值为整数, 单位毫秒</li></ul><p>槽函数 <code>start([msec])</code> 启动定时器</p><ul><li><code>msec</code> 定时器间隔, 如果不传入将使用<a href="#%E5%AE%9A%E6%97%B6%E5%99%A8%E8%AE%BE%E7%BD%AE">已有设置</a></li><li>定时器创建时默认为停止状态, 需要通过该方法启动</li><li>如果定时器正在运行, 该方法将重启定时器</li></ul><p>槽函数 <code>stop()</code> 停止定时器</p><p>信号 <code>timeout()</code> 当定时器到达间隔后发出</p><h2 id="pyside-扩展" tabindex="-1"><a class="header-anchor" href="#pyside-扩展" aria-hidden="true">#</a> PySide 扩展</h2><h3 id="matplotlib-图像" tabindex="-1"><a class="header-anchor" href="#matplotlib-图像" aria-hidden="true">#</a> Matplotlib 图像</h3>',19),$n={href:"https://www.pythonguis.com/tutorials/pyside6-plotting-matplotlib/",target:"_blank",rel:"noopener noreferrer"},ns=n("h2",{id:"模型视图组件",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#模型视图组件","aria-hidden":"true"},"#"),s(" 模型视图组件")],-1),ss={href:"https://www.pythonguis.com/tutorials/pyside6-modelview-architecture/",target:"_blank",rel:"noopener noreferrer"},es=n("h3",{id:"模型视图编程",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#模型视图编程","aria-hidden":"true"},"#"),s(" 模型视图编程")],-1),as={href:"https://doc.qt.io/qtforpython-6/overviews/model-view-programming.html#model-view-programming",target:"_blank",rel:"noopener noreferrer"},ts=n("h3",{id:"简单列表组件",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#简单列表组件","aria-hidden":"true"},"#"),s(" 简单列表组件")],-1),os={href:"https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QListView.html#PySide6.QtWidgets.QListView",target:"_blank",rel:"noopener noreferrer"},ls=n("h3",{id:"树状列表组件",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#树状列表组件","aria-hidden":"true"},"#"),s(" 树状列表组件")],-1),is={href:"https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QTreeView.html#PySide6.QtWidgets.QTreeView",target:"_blank",rel:"noopener noreferrer"},cs=n("h3",{id:"表格组件",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#表格组件","aria-hidden":"true"},"#"),s(" 表格组件")],-1),ps={href:"https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QTableView.html#PySide6.QtWidgets.QTableView",target:"_blank",rel:"noopener noreferrer"},ds=n("h3",{id:"表头组件",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#表头组件","aria-hidden":"true"},"#"),s(" 表头组件")],-1),us={href:"https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QHeaderView.html#PySide6.QtWidgets.QHeaderView",target:"_blank",rel:"noopener noreferrer"},rs=n("h2",{id:"程序打包",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#程序打包","aria-hidden":"true"},"#"),s(" 程序打包")],-1),hs=n("h3",{id:"qt-资源系统",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#qt-资源系统","aria-hidden":"true"},"#"),s(" Qt 资源系统")],-1);function ks(_s,ms){const a=i("ExternalLinkIcon"),t=i("RouterLink");return p(),d("div",null,[r,h,n("p",null,[s("参考教程 "),n("a",k,[s("https://www.pythonguis.com/tutorials/multithreading-pyside6-applications-qthreadpool/"),e(a)])]),n("p",null,[s("在 Qt 中, 当程序运行到 "),_,s(" 对象的 "),m,s(" 方法后, 将进入事件循环, 通过事件循环处理用户输入, 并作出回应"),v,s(" 由于事件循环是单线程的, 并且即 Python 程序所在的线程, 因此如果组件的事件处理程序, 如"),e(t,{to:"/coding/py/pyqt/base.html#%E4%BF%A1%E5%8F%B7%E6%A7%BD%E6%9C%BA%E5%88%B6"},{default:o(()=>[s("槽函数")]),_:1}),s("处消耗了过长的时间, 事件循环将阻塞, 从而导致程序将失去相应")]),E,n("ul",null,[b,f,n("li",null,[s("对于线程与进程, Qt 均提供了对应的实现, 在 PySide 中也允许使用 Python 原生的"),e(t,{to:"/coding/py/base/module.html#%E5%A4%9A%E7%BA%BF%E7%A8%8B"},{default:o(()=>[s("多线程")]),_:1})]),n("li",null,[s("注意, 在 Python 中由于 GIL (全局解释器锁) 机制, 实际上为多个线程轮换执行, 无法实现真正的并行"),B,s(" 因此如果程序真的要执行耗时长, 计算量的的任务, 应该使用 Python 原生的并发库如 "),n("a",y,[s("concurrent.futures"),e(a)]),s(", 或"),A])]),g,Q,w,P,n("p",null,[s("任务基类 "),n("a",S,[s("QRunnable"),e(a)]),s(" 用于表示一个子线程任务"),F,s(" 该类位于模块 "),x,s(" 下, 并且不是 "),q,s(" 的子类, 因此无法创建"),e(t,{to:"/coding/py/pyqt/base.html#%E4%BF%A1%E5%8F%B7%E6%A7%BD%E6%9C%BA%E5%88%B6"},{default:o(()=>[s("信号")]),_:1}),T,s(" 注意, 该类并不是一个线程, 还需要通过载入"),C,s(", 让其中管理的线程执行任务")]),D,n("ul",null,[V,n("li",null,[s("习惯上使用 "),j,s(" 将该方法修饰为"),e(t,{to:"/coding/py/pyqt/base.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BF%A1%E5%8F%B7%E4%B8%8E%E6%A7%BD"},{default:o(()=>[s("槽函数")]),_:1})])]),W,n("p",null,[s("线程池类 "),n("a",O,[s("QThreadPool"),e(a)]),s(" 用于管理一系列线程, 并在用户提交任务后, 自动分配线程执行任务, 从而避免重复创建线程与快速执行任务")]),N,n("ul",null,[L,n("li",null,[s("对于任务执行中的数据交互"),R,s(" Qt 的"),e(t,{to:"/coding/py/pyqt/base.html#%E4%BF%A1%E5%8F%B7%E6%A7%BD%E6%9C%BA%E5%88%B6"},{default:o(()=>[s("信号槽")]),_:1}),s("是线程安全的, 因此可用于多线程中简单数据的传输"),I,s(" 但是"),n("mark",null,[s("任务基类不是 "),M,s(" 的子类, 因此直接无法创建"),e(t,{to:"/coding/py/pyqt/base.html#%E4%BF%A1%E5%8F%B7%E6%A7%BD%E6%9C%BA%E5%88%B6"},{default:o(()=>[s("信号")]),_:1})]),H,s(" 为此可通过自定义一个 "),U,s(" 的子类, 并作为任务类的成员, 用于信号传递")]),n("li",null,[s("注意 Python 中"),e(t,{to:"/coding/py/base/base.html#%E5%8F%AF%E5%8F%98%E5%AF%B9%E8%B1%A1%E4%B8%8E%E4%B8%8D%E5%8F%AF%E5%8F%98%E5%AF%B9%E8%B1%A1"},{default:o(()=>[s("可变对象与不可变对象")]),_:1}),s("的问题, 为了防止资源竞争不要访问公有数据, 或使用"),G])]),n("p",null,[s("例如以下示例代码, 其中关于异常捕捉与回溯参见"),e(t,{to:"/coding/py/base/base.html#%E5%BC%82%E5%B8%B8%E4%B8%8E%E9%94%99%E8%AF%AF"},{default:o(()=>[s("笔记")]),_:1})]),z,n("p",null,[n("a",J,[s("https://doc.qt.io/qtforpython-6/PySide6/QtCore/QThread.html#PySide6.QtCore.QThread"),e(a)])]),K,n("p",null,[s("PySide 提供的原生的互斥锁, 信号量等资源保护机制 "),n("a",X,[s("https://blog.csdn.net/xieliru/article/details/137419434"),e(a)])]),n("p",null,[s("理论上, 内置模块 "),e(t,{to:"/coding/py/base/module.html#%E5%A4%9A%E7%BA%BF%E7%A8%8B"},{default:o(()=>[s("threading")]),_:1}),s(" 中的资源保护机制也可以使用, 但稳定性未知"),Y,s(" 使用保护机制是注意, 在 GUI 相关函数, 如槽函数中, 不允许出现任何阻塞")]),Z,$,n("p",null,[s("通过开启多进程, 能够直接让子进程运行外部程序, 在运行前传递参数, 在进程结束后接收结果"),nn,s(" Qt 中使用 "),n("a",sn,[s("QProcess"),e(a)]),s(" 创建与管理子进程, 该类存在父类 "),en,s(", 且位于模块 "),an,s(" 下")]),tn,on,n("ul",null,[ln,cn,n("li",null,[s("对于多个子进程, 也可设置父组件, 并通过 "),pn,s(" 信号连接槽函数 "),e(t,{to:"/coding/py/pyqt/base.html#%E7%BB%84%E4%BB%B6%E9%80%9A%E7%94%A8%E6%96%B9%E6%B3%95"},{default:o(()=>[s("deletelater")]),_:1}),s(" 使其在结束后销毁")])]),dn,n("ul",null,[n("li",null,[un,s(" 传入 "),rn,s(" 下的类 "),hn,n("ul",null,[kn,n("li",null,[s("再通过 "),_n,s(" 方法插入环境变量, 详见"),n("a",mn,[s("官方文档"),e(a)])])])])]),vn,n("ul",null,[n("li",null,[s("方法 "),En,s(" 启动子进程 "),n("ul",null,[bn,fn,n("li",null,[s("建议在主程序关闭时 ("),e(t,{to:"/coding/py/pyqt/base.html#%E7%AA%97%E5%8F%A3%E4%B8%93%E7%94%A8%E6%96%B9%E6%B3%95"},{default:o(()=>[s("关闭事件触发")]),_:1}),s("), 通过 "),Bn,s(" 尝试退出子进程, 并在事件循环后调用 "),yn,s(" 方法等待进程保存数据完毕退出, 可参见"),An])])]),gn]),Qn,n("ul",null,[wn,Pn,n("li",null,[s("方法 "),Sn,s(" 阻塞等待子进程退出 "),n("ul",null,[Fn,xn,n("li",null,[s("即使在"),e(t,{to:"/coding/py/pyqt/base.html#%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF"},{default:o(()=>[s("事件循环")]),_:1}),s("外也可以调用此函数, 即当 "),qn,s(" 返回后, 依然可以调用此方法")])])]),Tn]),Cn,n("ul",null,[Dn,n("li",null,[s("方法 "),Vn,s(" 从标准输入流读取数据 "),n("ul",null,[n("li",null,[s("返回值为 "),jn,s(" 类型, 一般通过方法 "),Wn,s(" 获取类型为 "),e(t,{to:"/coding/py/base/base.html#bytes-%E5%AF%B9%E8%B1%A1"},{default:o(()=>[s("bytes")]),_:1}),s(" 的数据内容")]),On])]),Nn]),Ln,Rn,n("ul",null,[n("li",null,[In,s(" 类型为模块 "),Mn,s(" 下的类 "),Hn,s(", 可通过 Python 的 "),e(t,{to:"/coding/py/base/base.html#bytes-%E5%AF%B9%E8%B1%A1"},{default:o(()=>[s("bytes 对象")]),_:1}),s(" 构造")])]),Un,n("p",null,[s("使用子进程时可参考"),e(t,{to:"/coding/py/pyqt/examples.html#%E5%AD%90%E8%BF%9B%E7%A8%8B%E7%AE%A1%E7%90%86%E7%A8%8B%E5%BA%8F"},{default:o(()=>[s("示例")]),_:1})]),n("ul",null,[Gn,n("li",null,[s("子进程退出 "),n("ul",null,[zn,n("li",null,[s("对于多个子进程, 通过 "),Jn,s(" 信号连接槽函数 "),e(t,{to:"/coding/py/pyqt/base.html#%E7%BB%84%E4%BB%B6%E9%80%9A%E7%94%A8%E6%96%B9%E6%B3%95"},{default:o(()=>[s("deletelater")]),_:1}),s(" 使其在结束后销毁")])])])]),Kn,Xn,n("p",null,[s("Qt 中提供了定时器类 "),n("a",Yn,[s("QTimer"),e(a)]),s(" 可用于定时发出信号")]),Zn,n("p",null,[n("a",$n,[s("https://www.pythonguis.com/tutorials/pyside6-plotting-matplotlib/"),e(a)])]),ns,n("p",null,[n("a",ss,[s("https://www.pythonguis.com/tutorials/pyside6-modelview-architecture/"),e(a)])]),es,n("p",null,[s("参考教程 "),n("a",as,[s("https://doc.qt.io/qtforpython-6/overviews/model-view-programming.html#model-view-programming"),e(a)])]),ts,n("p",null,[n("a",os,[s("QListView"),e(a)])]),ls,n("p",null,[n("a",is,[s("QTreeView"),e(a)])]),cs,n("p",null,[n("a",ps,[s("QTableView"),e(a)])]),ds,n("p",null,[n("a",us,[s("QHeaderView"),e(a)])]),rs,hs])}const bs=c(u,[["render",ks],["__file","advance.html.vue"]]);export{bs as default};