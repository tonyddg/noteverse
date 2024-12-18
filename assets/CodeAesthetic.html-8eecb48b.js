import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as d,c as s,b as i,d as e,a as v,e as r}from"./app-8c5ce49e.js";const c={},u=i("h1",{id:"代码美学",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#代码美学","aria-hidden":"true"},"#"),e(" 代码美学")],-1),m={href:"https://space.bilibili.com/1629390/channel/collectiondetail?sid=1068921",target:"_blank",rel:"noopener noreferrer"},b=r(`<h2 id="在代码中取名" tabindex="-1"><a class="header-anchor" href="#在代码中取名" aria-hidden="true">#</a> 在代码中取名</h2><ol><li>不使用缩写</li><li>不在变量命中加入类型信息</li><li>在变量命名中加入单位信息 / 使用具有单位信息的类型(typedef)</li><li>不使用 Utility, 而是具体命名</li></ol><h2 id="组合优于继承" tabindex="-1"><a class="header-anchor" href="#组合优于继承" aria-hidden="true">#</a> 组合优于继承</h2><h3 id="继承模式" tabindex="-1"><a class="header-anchor" href="#继承模式" aria-hidden="true">#</a> 继承模式</h3><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>class Image
{
public:
    void SetPixel();
    void Resize();
    ...

    virtual void Save() = 0;
    virtual void Load() = 0;
};

class JPGImage : public Image
{
public:
    virtual void Save();
    virtual void Load();
};

class PNGImage : public Image
{
public:
    virtual void Save();
    virtual void Load();
};

class DrawImage : public Image
{
public:
    void Line();

    // 图片绘制中, 简单的保存/加载无意义
    virtual void Save(){throw exception;}
    virtual void Load(){throw exception;}
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="组合模式" tabindex="-1"><a class="header-anchor" href="#组合模式" aria-hidden="true">#</a> 组合模式</h3><p>使用接口达到同样的效果</p><div class="language-c++ line-numbers-mode" data-ext="c++"><pre class="language-c++"><code>class Image
{
public:
    void SetPixel();
    void Resize();
    ...

    // 使用嵌套类 + 纯虚类定义某部分共能的接口
    // 接口函数通过接收类的引用/指针以发挥作用
    class FileInterface
    {
    public:
        virtual void Save(Image&amp;) = 0;
        virtual void Load(Image&amp;) = 0;        
    };
};

class JPGImage : public Image::FileInterface
{
public:
    // 将接口用到的额外参数作为接口的构造函数
    JPGImage(const std::string&amp; FilePath);
    virtual void Save(Image&amp;);
    virtual void Load(Image&amp;);
};

class PNGImage : public Image::FileInterface
{
public:
    PNGImage(const std::string&amp; FilePath);
    virtual void Save(Image&amp;);
    virtual void Load(Image&amp;);
};

class DrawImage : public Image
{
// 扩展类的功能时, 直接将其作为一个成员变量使用, 而不是继承
private:
    Image objImage;
public:
    void Line();
    ...
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="不嵌套" tabindex="-1"><a class="header-anchor" href="#不嵌套" aria-hidden="true">#</a> 不嵌套</h2><ol><li>避免代码的嵌套层数 (if/for/while) 超过三层</li><li>避免单个函数 / 代码块超过 50 行 避免技巧</li></ol><h3 id="子函数拆解" tabindex="-1"><a class="header-anchor" href="#子函数拆解" aria-hidden="true">#</a> 子函数拆解</h3><ol><li>将一个大函数拆解为多个子函数</li><li>将使用到相同数据的子函数以类的形式包装</li><li>增加子函数的复用次数, 减少子函数的依赖参数</li></ol><h3 id="改变顺序" tabindex="-1"><a class="header-anchor" href="#改变顺序" aria-hidden="true">#</a> 改变顺序</h3><p>将程序内的异常/越界等情况放在程序开始处判断与处理</p>`,14);function t(o,h){const n=a("ExternalLinkIcon");return d(),s("div",null,[u,i("blockquote",null,[i("p",null,[e("视频 "),i("a",m,[e("代码美学"),v(n)]),e(" 笔记")])]),b])}const I=l(c,[["render",t],["__file","CodeAesthetic.html.vue"]]);export{I as default};
