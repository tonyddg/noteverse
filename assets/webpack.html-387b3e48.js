import{_ as p}from"./plugin-vue_export-helper-c27b6911.js";import{r as t,o as l,c as i,b as n,d as s,a as o,e as a}from"./app-8c5ce49e.js";const c={},r=a(`<h1 id="webpack" tabindex="-1"><a class="header-anchor" href="#webpack" aria-hidden="true">#</a> WebPack</h1><ul><li>在 node.js 中开发前端, 通过 WebPack 打包生成前端应用</li><li>Webpack 使用 loader 可以通过 import 导入任何资源</li></ul><h2 id="创建项目" tabindex="-1"><a class="header-anchor" href="#创建项目" aria-hidden="true">#</a> 创建项目</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> init <span class="token parameter variable">-y</span> <span class="token comment"># 使用 -y 参数, 使用默认设置</span>

<span class="token comment"># 如果没有全局安装则使用 install</span>
<span class="token comment"># 使用 --include=dev 将 webpack 添加到开发环境, 有关 webpack 的插件均需要添加到开发环境</span>
<span class="token function">npm</span> <span class="token function">add</span> webpack webpack-cli <span class="token parameter variable">--include</span><span class="token operator">=</span>dev

<span class="token comment"># 在 src 中创建源文件</span>
<span class="token function">mkdir</span> src

<span class="token comment"># 进行打包 npx 为执行 node_module 下的模块</span>
npx webpack

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h2><ol><li>创建 webpack.config.js 进行配置</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 配置文件为 js, 允许导入其他 nodejs 模块</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;path&quot;</span><span class="token punctuation">)</span>
<span class="token comment">// 通过导入的方式导入 webpack 的插件</span>
<span class="token keyword">const</span> HtmlWebpackPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;html-webpack-plugin&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> TerserPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;terser-webpack-plugin&quot;</span><span class="token punctuation">)</span>
<span class="token comment">// 导入的可能不为构造函数, 可以导入构造函数</span>
<span class="token keyword">const</span> BundleAnalyzerPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;webpack-bundle-analyzer&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span>BundleAnalyzerPlugin

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// 确定打包文件的方式, development 为开发模式, production 为导出模式, 即导出成品</span>
    <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token string">&quot;development&quot;</span><span class="token punctuation">,</span>

    <span class="token comment">// 可方便查看打包后的代码</span>
    <span class="token literal-property property">devtool</span><span class="token operator">:</span> <span class="token string">&quot;inline-source-map&quot;</span><span class="token punctuation">,</span>

    <span class="token comment">// 设置入口文件</span>
    <span class="token literal-property property">entry</span><span class="token operator">:</span> <span class="token string">&quot;./src/index.js&quot;</span><span class="token punctuation">,</span>

    <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// 打包文件名, 通过 [] 可添加格式字符串</span>
        <span class="token comment">// contenthash 用于在打包文件后添加随机字符, 强制浏览器刷新</span>
        <span class="token literal-property property">filename</span><span class="token operator">:</span> <span class="token string">&quot;index.bundle.[contenthash].js&quot;</span><span class="token punctuation">,</span>
        <span class="token comment">// 打包文件路径 使用 path 模块生成路径</span>
        <span class="token literal-property property">path</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&quot;dist&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

        <span class="token comment">// 在每次构建前清理 /dist 文件夹</span>
        <span class="token literal-property property">clean</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token literal-property property">resolve</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// 通过 alias 设置路径别名, 传入为键值对</span>
        <span class="token comment">// 导入模块时, 以文件虽在位置为基准, 对于位置较深的模块, 需要多个 .., 可用别名进行伪绝对路径访问</span>
        <span class="token literal-property property">alias</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token literal-property property">utils</span><span class="token operator">:</span> path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&quot;src/utils&quot;</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// 使用数组保存 loader 的规则</span>
        <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token comment">// 使用正则表达式包含 loader 识别的文件</span>
                <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.css$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span>

                <span class="token comment">// 使用 use 确定文件采用的 loader</span>
                <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;style-loader&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;css-loader&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.(png|svg|jpg|jpeg|gif)$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span>

                <span class="token comment">// 图片文件具有内置的 loader, 不需要指定, 但要使用 type 说明类型</span>
                <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&quot;assert/resource&quot;</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.js$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span>
                <span class="token comment">// 使用正则表达式包含 loader 排除的目录, 对于转换代码的 loader, 通常需要排除 node_modules 目录</span>
                <span class="token literal-property property">exclude</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">node_modules</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>

                <span class="token comment">// 对于需要配置的 loader, 可传入对象</span>
                <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&quot;babel-loader&quot;</span><span class="token punctuation">,</span>
                    <span class="token comment">// loader 的配置</span>
                    <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                        <span class="token literal-property property">presets</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;@babel/preset-env&quot;</span><span class="token punctuation">]</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>

            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token comment">// 使用数组保存插件列表</span>
    <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token comment">// 导入插件为类构造函数, 通过 new 启用</span>
        <span class="token keyword">new</span> <span class="token class-name">HtmlWebpackPlugin</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
            <span class="token comment">// 通过给函数传参设置参数</span>
            <span class="token literal-property property">title</span><span class="token operator">:</span> <span class="token string">&quot;title&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token keyword">new</span> <span class="token class-name">BundleAnalyzerPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>

    <span class="token comment">// 对打包后的文件进行压缩等优化设置</span>
    <span class="token literal-property property">optimization</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">minimize</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>

        <span class="token comment">// 将插件作为优化器传入</span>
        <span class="token literal-property property">minimizer</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token keyword">new</span> <span class="token class-name">TerserPlugin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 用于开发服务器, 需要安装 webpack-dev-server</span>
    <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token keyword">static</span><span class="token operator">:</span> <span class="token string">&quot;./dist&quot;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="loader" tabindex="-1"><a class="header-anchor" href="#loader" aria-hidden="true">#</a> Loader</h2><h3 id="css" tabindex="-1"><a class="header-anchor" href="#css" aria-hidden="true">#</a> CSS</h3><ol><li>需要 Loader <ol><li>css-loader</li><li>style-loader</li></ol></li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 导入后, 如果引用了导出的 js, 将自动使用导入的 css</span>
<span class="token keyword">import</span> <span class="token string">&quot;css 相对 src 的路径&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="图片" tabindex="-1"><a class="header-anchor" href="#图片" aria-hidden="true">#</a> 图片</h3><ol><li>不需要 loader</li><li>需要指定 type 为 assert/resource</li><li>图片通常保存在 ./src/assets/images 下</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 使用 import 导入图片, 导入得到图片的打包路径</span>
<span class="token keyword">import</span> Img <span class="token keyword">from</span> <span class="token string">&quot;图片相对 src 的路径&quot;</span>

<span class="token keyword">const</span> image <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&quot;img&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 可将图片路径直接用于 src 属性</span>
image<span class="token punctuation">.</span>src <span class="token operator">=</span> Img<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="babel" tabindex="-1"><a class="header-anchor" href="#babel" aria-hidden="true">#</a> babel</h3><ol><li>通过 babel, 生成不同版本的 js</li><li>需要 loader babel-loader</li><li>需要安装 babel 本体 <ul><li>@babel/core</li><li>@babel/preset-env</li></ul></li><li>匹配 js 文件, 并且需要</li></ol><h3 id="ts" tabindex="-1"><a class="header-anchor" href="#ts" aria-hidden="true">#</a> ts</h3><ol><li>需要安装 ts-loader</li><li></li></ol><h2 id="插件" tabindex="-1"><a class="header-anchor" href="#插件" aria-hidden="true">#</a> 插件</h2><h3 id="html-webpack-plugin" tabindex="-1"><a class="header-anchor" href="#html-webpack-plugin" aria-hidden="true">#</a> html-webpack-plugin</h3>`,20),u={href:"https://blog.csdn.net/hbiao68/article/details/104054932/",target:"_blank",rel:"noopener noreferrer"},d=a(`<h3 id="terser-webpack-plugin" tabindex="-1"><a class="header-anchor" href="#terser-webpack-plugin" aria-hidden="true">#</a> terser-webpack-plugin</h3><p>压缩优化器</p><h3 id="webpack-bundle-analyzer" tabindex="-1"><a class="header-anchor" href="#webpack-bundle-analyzer" aria-hidden="true">#</a> webpack-bundle-analyzer</h3><p>打包文件大小可视化</p><h2 id="扩展" tabindex="-1"><a class="header-anchor" href="#扩展" aria-hidden="true">#</a> 扩展</h2><h3 id="项目服务器" tabindex="-1"><a class="header-anchor" href="#项目服务器" aria-hidden="true">#</a> 项目服务器</h3><p>启动项目服务器后, 能够在每次修改文件后自动打包, 并且生成本地网页用于浏览 需要安装 webpack-dev-server, 并且进行设置</p><h4 id="启动项目服务器" tabindex="-1"><a class="header-anchor" href="#启动项目服务器" aria-hidden="true">#</a> 启动项目服务器</h4><p>通过以下命令启动 webpack 项目服务器, 在修改 webpack 配置后需要重启才能生效</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>webpack serve <span class="token parameter variable">--open</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,10);function k(v,m){const e=t("ExternalLinkIcon");return l(),i("div",null,[r,n("p",null,[s("自动打包 html 文件 "),n("a",u,[s("多页面与模板"),o(e)])]),d])}const g=p(c,[["render",k],["__file","webpack.html.vue"]]);export{g as default};
