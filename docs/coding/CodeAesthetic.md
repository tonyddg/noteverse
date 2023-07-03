# 代码美学
> 视频 [代码美学](https://space.bilibili.com/1629390/channel/collectiondetail?sid=1068921) 笔记

## 在代码中取名
1. 不使用缩写
2. 不在变量命中加入类型信息
3. 在变量命名中加入单位信息 / 使用具有单位信息的类型(typedef)
4. 不使用 Utility, 而是具体命名

## 组合优于继承
### 继承模式
```c++
class Image
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
```

### 组合模式
使用接口达到同样的效果
```c++
class Image
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
        virtual void Save(Image&) = 0;
        virtual void Load(Image&) = 0;        
    };
};

class JPGImage : public Image::FileInterface
{
public:
    // 将接口用到的额外参数作为接口的构造函数
    JPGImage(const std::string& FilePath);
    virtual void Save(Image&);
    virtual void Load(Image&);
};

class PNGImage : public Image::FileInterface
{
public:
    PNGImage(const std::string& FilePath);
    virtual void Save(Image&);
    virtual void Load(Image&);
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
```

## 不嵌套
1. 避免代码的嵌套层数 (if/for/while) 超过三层
2. 避免单个函数 / 代码块超过 50 行
避免技巧

### 子函数拆解
1. 将一个大函数拆解为多个子函数
2. 将使用到相同数据的子函数以类的形式包装
3. 增加子函数的复用次数, 减少子函数的依赖参数

### 改变顺序
将程序内的异常/越界等情况放在程序开始处判断与处理
