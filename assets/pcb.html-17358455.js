import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o,c as i,b as a,d as e,a as n,e as h}from"./app-8c5ce49e.js";const c={},r=h('<h1 id="立创-eda-pcb-布线笔记" tabindex="-1"><a class="header-anchor" href="#立创-eda-pcb-布线笔记" aria-hidden="true">#</a> 立创 EDA PCB 布线笔记</h1><h2 id="铺铜" tabindex="-1"><a class="header-anchor" href="#铺铜" aria-hidden="true">#</a> 铺铜</h2><h3 id="主要属性" tabindex="-1"><a class="header-anchor" href="#主要属性" aria-hidden="true">#</a> 主要属性</h3><ul><li>网络 表明铺铜需要连接的网络名称, 可通过右侧按钮, 点击布线自动选择网络</li><li>填充样式 可以选择实体铺铜或网格铺铜, 默认选择实体铺铜</li><li>网络规则 铺铜中的焊盘, 间距需要在网络规则中设置, 无法直接修改. 可在网络规则右侧按钮中添加规则 <ul><li>对于需要拆焊与返修的焊盘可选择发散方式连接焊盘</li><li>对于需要过大电流的焊盘选择直连</li></ul></li></ul>',4),d={href:"https://www.bilibili.com/read/cv22414320/",target:"_blank",rel:"noopener noreferrer"},p=a("h3",{id:"形状改变",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#形状改变","aria-hidden":"true"},"#"),e(" 形状改变")],-1),u=a("p",null,"直接拖动铺铜区域可以改变铺铜形状, 对于复杂的形状可通过以下方式实现",-1),_=a("p",null,"对于板框等多边形区域, 以下操作同样适用",-1),m=a("ul",null,[a("li",null,[e("多边形铺铜 在带单的铺铜按钮下拉选择多边形 可用于添加多边形的铺铜, 从第一个点开始一次点击, 直到形成回路或按 "),a("kbd",null,"ESC"),e(" 自动闭合")]),a("li",null,[e("添加斜角/圆角 铺铜区域右键菜单 "),a("span",{class:"katex"},[a("span",{class:"katex-mathml"},[a("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[a("semantics",null,[a("mrow",null,[a("mo",null,"→")]),a("annotation",{encoding:"application/x-tex"},"\\to")])])]),a("span",{class:"katex-html","aria-hidden":"true"},[a("span",{class:"base"},[a("span",{class:"strut",style:{height:"0.3669em"}}),a("span",{class:"mrel"},"→")])])]),e(" 添加 "),a("span",{class:"katex"},[a("span",{class:"katex-mathml"},[a("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[a("semantics",null,[a("mrow",null,[a("mo",null,"→")]),a("annotation",{encoding:"application/x-tex"},"\\to")])])]),a("span",{class:"katex-html","aria-hidden":"true"},[a("span",{class:"base"},[a("span",{class:"strut",style:{height:"0.3669em"}}),a("span",{class:"mrel"},"→")])])]),e(" 添加斜角/圆角 通常用于简单的矩形区域, 避免出现直角")]),a("li",null,[e("插入节点 铺铜区域右键菜单 "),a("span",{class:"katex"},[a("span",{class:"katex-mathml"},[a("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[a("semantics",null,[a("mrow",null,[a("mo",null,"→")]),a("annotation",{encoding:"application/x-tex"},"\\to")])])]),a("span",{class:"katex-html","aria-hidden":"true"},[a("span",{class:"base"},[a("span",{class:"strut",style:{height:"0.3669em"}}),a("span",{class:"mrel"},"→")])])]),e(" 插入节点 选择插入的位置后, 先点击任意位置放置结点再微调. 可用于为多边形铺铜区域添加斜角")])],-1),x=a("h3",{id:"缝合孔",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#缝合孔","aria-hidden":"true"},"#"),e(" 缝合孔")],-1),b=a("p",null,"为了增加多层同网络铺铜之间的电流传输能力与提高铺铜的散热能力, 可以使用缝合孔功能",-1),w=a("p",null,"使用缝合孔前要保证铺铜的下层或上层与同网络的铺铜重叠, 通常在 GND 的铺铜中使用",-1),f=a("p",null,[e("在铺铜属性中可以找到 "),a("code",null,"放置/移除缝合孔按钮"),e(", 点击即可快速放置与移除缝合孔, 使用默认即可")],-1),k=a("p",null,"放置缝合孔后, 还可以对缝合孔的位置调整",-1),g={href:"https://zhuanlan.zhihu.com/p/602155591",target:"_blank",rel:"noopener noreferrer"},M=a("h3",{id:"重建铺铜区",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#重建铺铜区","aria-hidden":"true"},"#"),e(" 重建铺铜区")],-1),v=a("p",null,[e("计算铺铜需要较长时间, 因此铺铜区在建立后不会随电路改变自动刷新, 可以在铺铜属性中可以找到 "),a("code",null,"重建铺铜区"),e(", 点击后手动重建")],-1),B=a("p",null,[e("也可使用快捷键 "),a("kbd",null,"shift"),e(" + "),a("kbd",null,"B"),e(" 快速重建所有铺铜区")],-1);function E(L,N){const t=s("ExternalLinkIcon");return o(),i("div",null,[r,a("p",null,[e("参考资料 "),a("a",d,[e("https://www.bilibili.com/read/cv22414320/"),n(t)])]),p,u,_,m,x,b,w,f,k,a("p",null,[e("参考资料 "),a("a",g,[e("https://zhuanlan.zhihu.com/p/602155591"),n(t)])]),M,v,B])}const y=l(c,[["render",E],["__file","pcb.html.vue"]]);export{y as default};