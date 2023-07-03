# 设计模式
类相互通信的对象之间的组织关系

## 设计模式术语

### 原则
1. 先不采用设计模式, 在重构后选择设计模式
1. 使用设计模式前需要寻找变化点
1. 设计模式前提, 必须要有稳定点

### 绑定
1. 将框架称为早, 将应用称为晚
1. 早绑定即应用调用框架实现功能
1. 晚绑定即框架调用应用实现功能

### 术语
#### 复用
1. 指编译时复用, 代码被复用即代码编译后的二进制信息不被更改, 不是编程语句不被更改
1. 设计原则的目的之一是编译时复用, 将变化交给运行时
#### 依赖
指编译时依赖, 当 A 依赖于 B, 即当编译时没有 B, A 无法编译通过


## 面向对象设计模式
面向对象的目的: 抵抗变化

### 依赖倒置原则
1. 高层模块 (稳定) 不应该依赖于底层模块 (不稳定)
1. 二者应该依赖于抽象 (稳定)
1. 实现细节 (不稳定) 应该依赖于抽象 (稳定)

* eg. 工厂模式

### 开放封闭原则
1. 对扩展开放, 对更改封闭
1. 通过增加底层模块的方式实现新功能, 而不是修改高层模块

* eg. 模板模式

### 单一职责原则
1. 一个类应该只有一个责任
1. 因此一个类只能有一个变化方向

### Liskov 替换原则
子类应该表达父类的所有方法, 不能空置

### 接口隔离原则
1. 接口 (公有方法) 应当小而完备, 否则接口一旦修改, 客户程序也需要修改
1. 一个接口类 (纯虚类), 应当只保留一系列等价地接口, 不能同时表达两种接口

* 桥模式

### 优先使用对象组合
1. 继承时, 将导致类的耦合度增加
1. 通过良好的接口, 可以避免继承必要

* eg. Decorator 模式

### 封装变化点
使用封装来创建对象之间的分界

### 针对接口编程
1. 成员不使用具体的类, 而是使用接口 (ABC)
1. 保存接口, 调用接口实现功能
1. 对象组合中, 因保存接口指针, 而不是具体的类

## 组件协作模式
使用晚绑定, 实现框架与应用之间的松耦合

### 模板方法 Template Method
1. 在框架中定义一个操作的算法 (稳定)
1. 将算法中一些步骤的实现交给应用 (变化)
1. 以此实现在复用算法的前提下, 改变内部的特定步骤

#### 适用情况
1. 必须有一个稳定的算法的骨架
1. 骨架内部的步骤不稳定

#### 实现
```c++
class Framework{
public:
// 在框架中定义一个操作的算法
void run(){
    Step1();
    ...
    Step2();
    ...
    Step3();
}

protected:
// 算法中的固定步骤
void Step1(){...}
void Step3(){...}

// 算法中的变化步骤, 交给应用实现
virtual void Step2() = 0;
};

class Application : public Framework{
protected:
virtual void Step2(){...}
};

int main()
{
    Framework* app = new Application;
    app->run();
    delete app;
    return 0;
}
```

#### 实例
1. 对于窗体具有明确的启动流程, 但有部分启动细节可供修改

### 策略模式 Strategy
1. 主类的接口固定 (稳定)
1. 根据不同情况, 主类的接口实现方式不同 (不变)
1. 为主类提供了一系列算法, 并且可以在运行时灵活切换
1. 为未来的扩展提供了可能, 避免修改代码 (保证开放封闭原则)

#### 适用情况
1. 当代码中出现 switch / if-else 判断方法, 且可能性不限时, 极有可能是需要使用 策略模式 的标识
1. 对于同一个操作, 在不同情况下, 有不同的解决方法, 且情况无限
1. 对于同一个操作, 可以采用不同的方案

#### 实现
```c++
class TaxStrategy{
public:
    virtual void Calculate(Context& context) = 0;
    virtual ~TaxStrategy();
};

class CNTaxStrategy : TaxStrategy{
public:
    virtual void Calculate(Context& context){...}
};

class USTaxStrategy : TaxStrategy{
public:
    virtual void Calculate(Context& context){...}
};

class SaleBox{
private:
    unique_ptr<TaxStrategy> taxStrategy;

public:
    // taxStrategy 的获取可使用工厂模式的方法
    SaleBox(){
        ...
    }

    void CalculateTax(){
        ...
        taxStrategy->Calculate(context);
    }
};
```

#### 实例
1. 计算税率, 根据选择的国家切换税率计算方法

### 观察者模式 Obverser
1. 主类在运行时会产生消息 (固定)
1. 处理消息的类不同 (变化)
1. 主类产生消息时, 希望所有消息依赖都能接收到消息并处理
1. 将接收消息 (通知机制) 抽象为接口, 主类只需将消息通过接口传递给处理类
1. 通知通过 list 传播, 观察者自行决定是否要观察, 而主类对于是否有观察不关系

#### 实现
```c++
class ProgressObserver{
public:
    // 将通知作为接口
    virtual void Notify(float value) = 0;
    ~ProgressObserver();
};

// 使用一个列表管理多个观察者
class ProgressObserverList{
private:
    // 使用 list, 满足删除与遍历功能
    list<ProgressObserver*> _list;
public:
    AttachObserver(ProgressObserver*);
    DetachObserver(ProgressObserver*);

    Notify(float value){
        for(auto it : _list){
            it->Notify(value);
        }
    }
}

class DoSomething{
    ...
    ProgressObserverList _progressObserverList;
public:
    void Progress(){
        ...
        for(int i = 0; i < num; i++){
            ...
            _progressObserverList.Notify((i + 1.0) / num);
        }
    }
}
```

#### 实例
1. 执行任务时, 向外部通知任务进度
1. 观察者 A 将进度打印到屏幕, 观察者 B 绘制成进度条

## 单一职责模式
1. 组件设计过程中, 如果职责设计不清晰, 将导致子类膨胀, 残生大量重复代码
1. 可将职责理解为单一类型的接口
1. 使用组合代替继承, 实现单职责的扩展 (Decorator) 与多职责的组合 (桥模式)

### Decorator 模式
1. 对于一类操作, 其职责单一且不变
1. 但希望在其主要过程中添加部分额外扩展, 并且扩展可以自由组合
1. 将这些扩展称为装饰器 Decorator
1. 本质为将编译时装配变为运行时装配
1. 动态地给一个对象增加职责, 并且比继承更加灵活

#### 适用情况
1. 对于操作 A 与 B, 扩展功能 X 与 Y
1. 出现 XA, YA, XYA, XB, YB, XYB 等繁杂的复合操作
1. 并且在这些组合类中频繁调用父类的函数

#### 实现
```c++
class Stream{
public:
    virtual void Read() = 0;
    virtual void Write() = 0;
    virtual ~Stream(){};
};

// 同一类操作
// 此类操作同为扩展, 但各个扩展之间相互排斥, 因此不可设为修饰器
class FileStream : public Stream{
public:
    virtual void Read(){...};
    virtual void Write(){...};
};

class MemoryStream : public Stream{
public:
    virtual void Read(){...};
    virtual void Write(){...};
};

// 不同的扩展修饰, 各个扩展可以相容
// 定义一个修饰器基类, 继承 Stream 的目的不是与父类组合, 只是为了与父类共享接口
class DecoratorStream : public Stream{
protected:
    // 修饰器的核心关键, 继承被修饰类, 并且保存被修饰类
    // 用组合代替继承, 继承中只能调用父类, 但组合中, 被组合的对象可以变化 (指针具有多态性)
    Stream* _stream;
public:
    DecoratorStream(Stream* stream) : _stream(stream)
    {}
};

class CryptoStream : public Stream{
public:
    CryptoStream(Stream* stream) : DecoratorStream(stream)
    {}

    virtual void Read(){
        ...
        // 在修饰器中调用被修饰类实现修饰效果
        // 代替原先调用父类的方法
        _stream->Read();
        ...
        };
    virtual void Write(){...};
};

class BufferStream : public Stream{
public:
    BufferStream(Stream* stream) : DecoratorStream(stream)
    {}

    virtual void Read(){...};
    virtual void Write(){...};
};

int main(){

    FileStream s1;

    // 使用 CryptoStream 修饰 s1, 使其获得扩展
    CryptoStream s2 = CryptoStream(&s1);
    BufferStream s3 = BufferStream(&s1);

    // 嵌套修饰, 从而使 s1 同时被两种修饰
    BufferStream s4 = BufferStream(&s2);

    return 0;
}
```

### 桥模式
1. 主类有多个固定的, 相互独立职责 (Decorator 模式中, 可扩展职责只有一个, 可将职责理解为一组接口)
1. 各个职责的具体实现形式不同
1. 将一个类的职责分离为多个单职责, 最后用一个类组合所有职责
1. 与 Decorator 模式同样利用了指针的多态性, 用组合代替继承, 并在运行时装配
1. 其中的单个职责可以使用 Decorator 模式实现进一步扩展

#### 适用情况
1. 存在多个抽象维度且各个变化维度均需要扩展
1. 一个主类同时继承了多个单一类型的接口

#### 实现
```c++
class Display{
public:
    virtual void Draw() = 0;
    virtual ~Display();
};

class Ability{
public:
    virtual void Fight() = 0;
    virtual ~Ability();
};

class Unit{
protected:
    Display* _display;
    Ability* _ability;
public:
    // 与 Decorator 相同, 在运行时装配
    Unit(Display* display, Ability* ability): 
    _display(display), _ability(ability){
    }

    void Fight(Unit* obj){
        ...
        bool isWin = _ability->Fight(obj);
        ...
    }

    void Draw(){
        ...
        _display->Draw();
    }
};

// 此部分的职责相互独立
class EnemyDisplay : public Display{
public:
    virtual void Draw(){...};
    virtual ~Display();
};

class PlayerDisplay : public Display{
public:
    virtual void Draw(){...};
};

// 此部分职责可扩展, 可以像 Decorator 模式一样扩展
class DecoratorAbility : public Ability{
protected:
    Ability* _ability;
public:
    DecoratorAbility(Ability* ability) : _ability(ability)
    {}
}
...
// 

```

## 对象创建模式
在对象创建的过程中避开 new 导致的紧耦合

### Factory Method 工厂方法
1. 成员函数需要用到某个具体接口作为函数内的临时变量 (函数内依赖)
1. 此具体接口具有多态性
1. 成员函数中用到了具体的子类时, 无法通过一般的组合方式实现多态
1. 如果每次将具体的子类传入成员函数 (new), 将导致传入的子类职责混乱
1. 通过将工厂对象作为成员组合, 在需要子类时通过工厂创建
1. 工厂的本质即一个创建工厂的接口
1. 工厂的多态性从而保证了函数内依赖的多态性, 让主类决定实例化哪个类
1. 缺点: 要求函数内依赖的创建方式必须一致

#### 适用情况
1. 在成员函数中, 出现了 [接口指针] = new [具体实现], 导致了主类依赖与具体类
1. 当出现以实现某种功能为职责的接口 (只完成某种具体功能) 时, 很可能需要工厂方法

#### 实现
```c++
// 具体功能及接口
class Zip{
public:
    virtual void Progress() = 0;
    virtual ~Zip(){};
};

class NormalZip : public Zip{
public:
    virtual void Progress(){...};
};

class CryptoZip : public Zip{
public:
    virtual void Progress(){...};
};

// 为每个具体实现设计一个工厂
class ZipFactory{
public:
    // 如果工厂不需要而外参数, 可定义为静态类
    // 工厂函数返回产品的指针
    virtual static Zip* CreateZip() = 0;
};

class NormalZipFactory : public ZipFactory{
public:
    virtual static Zip* CreateZip(){
        return new NormalZip();
    };
};

class CryptoZipFactory : public ZipFactory{
public:
    virtual static Zip* CreateZip(){
        return new CryptoZip();
    };
};

// 在具体实例中使用工厂
class ZipApp{
protected:
    // 将工厂与类组合
    ZipFactory* _factory;
public:
    ZipApp(ZipFactory* factory): _factory(factory)
    {}

    void StartZip(){
        ...
        // 有工厂创建函数内依赖
        Zip* zip = _factory->CreateZip();
        zip->Process(...);
        ...
        // 明确职责, 工厂产生的产品由子类处理
        delete zip;
    }
}
```
