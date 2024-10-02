# PySide6 高级使用
## 线程与进程
参考教程 <https://www.pythonguis.com/tutorials/multithreading-pyside6-applications-qthreadpool/>

在 Qt 中, 当程序运行到 `QApplication` 对象的 `exec()` 方法后, 将进入事件循环, 通过事件循环处理用户输入, 并作出回应  
由于事件循环是单线程的, 并且即 Python 程序所在的线程, 因此如果组件的事件处理程序, 如[槽函数](./base.md#信号槽机制)处消耗了过长的时间, 事件循环将阻塞, 从而导致程序将失去相应  

可通过开启多线程或进程已解决此问题
* 多线程中, 各个子线程与主程序公用一个内存空间, 因此线程间的数据可以简单交互, 并且可以快速启动子线程, 一般使用多线程即可   
* 多进程中, 各个进程相互独立, 因此数据交互较为困难且启动速度慢, 仅用于特殊情况
* 对于线程与进程, Qt 均提供了对应的实现, 在 PySide 中也允许使用 Python 原生的[多线程](../base/module.md#多线程)
* 注意, 在 Python 中由于 GIL (全局解释器锁) 机制, 实际上为多个线程轮换执行, 无法实现真正的并行  
因此如果程序真的要执行耗时长, 计算量的的任务, 应该使用 Python 原生的并发库如 [concurrent.futures](https://docs.python.org/zh-cn/3.12/library/concurrent.futures.html), 或[多进程](#qt-多进程)

注意, 只要任务的耗时可能超过 10ms, 就建议通过线程的方式运行, 如
* 文件的读取与创建
* 表格, 图片等大数据的统计与运算

### Qt 多线程
#### 任务基类
任务基类 [QRunnable](https://doc.qt.io/qtforpython-6/PySide6/QtCore/QRunnable.html) 用于表示一个子线程任务  
该类位于模块 `QtCore` 下, 并且不是 `QObject` 的子类, 因此无法创建[信号](base.md#信号槽机制)  
注意, 该类并不是一个线程, 还需要通过载入[线程池](#线程池类), 让其中管理的线程执行任务

虚方法 `run()` 表示任务类所需要执行的任务
* 任务类为一个纯虚类, 需要通过继承任务基类并实现虚方法 `run` 才能表示特定任务
* 习惯上使用 `@Slot()` 将该方法修饰为[槽函数](./base.md#自定义信号与槽)

方法 `setAutoDelete(autoDelete)` 设置线程结束后是否删除对象
* `autoDelete` 是否启用自动删除, 默认为 `True`
* 该方法最好仅在任务执行前如构造任务类时调用, 否则将导致错误
* 当 `autoDelete` 启用时, 同一个对象不能多次启动, 否则将导致资源访问问题
* 关于是否启用该设置
    * 对于绝大多数重复执行的简单任务, 应当启用此设置
        * 任务提交到[线程池](#线程池类)后, 任务对象的控制权将被接管, 因此任务应当在线程启动前才作为局部变量创建
        * 此时可通过[线程数据交互](#线程数据交互)接收任务结果, 因此默认启用自动删除即可
    * 对于同时仅启动一次的, 管理复杂资源的任务, 应当关闭此设置
        * 任务提交到[线程池](#线程池类)后, 不会接管控制权, 因此任务应当作为全局变量或成员变量
        * 此时任务数据也可直接通过类成员传递

对于一般的 Python 方法, 并不一定要专门定义任务类, 而是可以设计一个[通用封装](#通用封装)

#### 线程池类
线程池类 [QThreadPool](https://doc.qt.io/qtforpython-6/PySide6/QtCore/QThreadPool.html#PySide6.QtCore.QThreadPool) 用于管理一系列线程, 并在用户提交任务后, 自动分配线程执行任务, 从而避免重复创建线程与快速执行任务

方法 `start(runnable, priority = 0)` 分配线程执行任务
* `runnable` 待执行任务, 传入[任务基类](#任务基类)的子类
* `priority` 任务优先级, 传入整数
* 当线程池没有空闲线程时, 任务将暂存在等待队列, 根据优先级等待空闲任务来执行

方法 `tryStart(arg__1)` 尝试执行任务
* `arg__1` 待执行任务, 传入[任务基类](#任务基类)的子类
* 与 `start()` 不同, 当没有空闲线程时, 返回 `False` 且放弃执行任务, 否则返回 `True`
* 通过该方法启动任务, 可以保证任务的实时性

方法 `waitForDone(msecs = -1)` 等待所有任务执行完毕
* `msecs` 等待时长, 单位毫秒, 传入 `-1` 表示忽略等待时长
* 当任务执行完毕时返回 `True`

以下方法可查询线程池状态
* `maxThreadCount()` 获取最大线程数
* `activeThreadCount()` 获取正在执行任务的线程数

#### 线程数据交互
* 对于任务执行前的参数  
对于简单任务, 可通过任务类的构造函数, 在任务执行前向任务传递参数, 并作为任务类的成员保存
* 对于任务执行中的数据交互  
Qt 的[信号槽](base.md#信号槽机制)是线程安全的, 因此可用于多线程中简单数据的传输  
但是==任务基类不是 `QObject` 的子类, 因此直接无法创建[信号](base.md#信号槽机制)==  
为此可通过自定义一个 `QObject` 的子类, 并作为任务类的成员, 用于信号传递
* 注意 Python 中[可变对象与不可变对象](../base/base.md#可变对象与不可变对象)的问题, 为了防止资源竞争不要访问公有数据, 或使用[共享资源保护机制](#共享资源保护机制)

例如以下示例代码, 其中关于异常捕捉与回溯参见[笔记](../base/base.md#异常与错误)
```python
import pandas, traceback

class LoadWork(QRunnable):
    '''
    CSV 读取任务
    '''
    # 使用继承自 QObject 的嵌套类定义信号
    class Signals(QObject):
        # 读取成功, 发出读取数据
        resolve = Signal(pandas.DataFrame)
        # 读取失败, 发出异常
        reject = Signal(Exception)
        # 任务结束
        finish = Signal()

        # 调用父类的构造函数不能忘
        def __init__(self) -> None:
            super().__init__()

    # 通过构造函数参数获取任务参数
    def __init__(self, path):
        super().__init__()
        self.path = path
        self.signals = LoadWork.Signals()

    @Slot()
    def run(self):
        # 使用异常处理判断任务执行情况
        try: # 执行任务
            res = pandas.read_csv(self.path)
        except Exception as e: # 发生错误
            self.signals.reject.emit(e)
        else: # 执行成功
            self.signals.resolve.emit(res)
        finally: # 后处理
            self.signals.finish.emit()

...

# 创建任务的槽函数
@Slot()
def _ExecWork(self):
    # 创建任务
    work = LoadWork("res/big.csv")
    
    # 在创建任务后立刻连接信息
    # 任务成功时保存结果
    work.signals.resolve.connect(lambda obj: self.res = obj)
    # 任务失败时打印错误信息
    work.signals.reject.connect(lambda obj: traceback.print_exception(obj))
    
    # 执行任务
    self.threadpool.start(work)
```

#### 通用封装
除了专门为特定任务设计任务类, 还可以通过以下通用封装, 将一般 Python 方法封装为任务类

```python
class FunWork(QRunnable):
    class Signals(QObject):
        resolve = Signal(object)
        reject = Signal(Exception)
        finish = Signal()

        def __init__(self) -> None:
            super().__init__()

    def __init__(self, fun, *args, **kwargs):
        '''
        * `fun` 待封装的方法
        * `*args, **kwargs` 方法参数
        '''
        super().__init__()
        self.fun = fun
        self.args = args
        self.kwargs = kwargs

        self.signals = FunWork.Signals()
    
    @Slot()
    def run(self):
        try:
            res = self.fun(*self.args, **self.kwargs)
        except Exception as e:
            self.signals.reject.emit(e)
        else:
            self.signals.resolve.emit(res)
        finally:
            self.signals.finish.emit()
```

#### 独立线程类
<https://doc.qt.io/qtforpython-6/PySide6/QtCore/QThread.html#PySide6.QtCore.QThread>

#### 共享资源保护机制
PySide 提供的原生的互斥锁, 信号量等资源保护机制 <https://blog.csdn.net/xieliru/article/details/137419434>  

理论上, 内置模块 [threading](../base/module.md#多线程) 中的资源保护机制也可以使用, 但稳定性未知  
使用保护机制是注意, 在 GUI 相关函数, 如槽函数中, 不允许出现任何阻塞

#### 多线程使用注意

### Qt 多进程
通过开启多进程, 能够直接让子进程运行外部程序, 在运行前传递参数, 在进程结束后接收结果  
Qt 中使用 [QProcess](https://doc.qt.io/qtforpython-6/PySide6/QtCore/QProcess.html#PySide6.QtCore.QProcess) 创建与管理子进程, 该类存在父类 `QObject`, 且位于模块 `QtCore` 下

#### 子进程设置
构造函数 `QProcess(parent = None)`
* `parent` 子进程的父组件, 为了保证子进程能正常删除, 最好设置 `None`
* 由于父组件设置为 `None`, 因此需要保证子进程对象为成员变量
* 对于多个子进程, 也可设置父组件, 并通过 [finish](#子进程控制交互) 信号连接槽函数 [deletelater](./base.md#组件通用方法) 使其在结束后销毁

方法 `setProgram(program)` 设置子进程运行的程序路径
* `program` 字符串, 程序路径

方法 `setArguments(arguments)` 设置子进程运行的命令行参数
* `arguments` 字符串列表, 列表中每个元素对应一个参数
* 注意, 即使传入数字参数, 也要使用 `str()` 将类型转换为字符串 

方法 `setProcessEnvironment(environment)` 设置子进程环境变量
* `environment` 传入 `QtCore` 下的类 `QProcessEnvironment`
    * 一般通过静态方法 `env = QProcessEnvironment.systemEnvironment()` 获取系统环境变量
    * 再通过 `insert(name, value)` 方法插入环境变量, 详见[官方文档](https://doc.qt.io/qtforpython-6/PySide6/QtCore/QProcessEnvironment.html#PySide6.QtCore.QProcessEnvironment)

方法 `setWorkingDirectory(dir)` 设置子进程的工作目录  
* `dir` 工作目录路径字符串

例如命令行指令 `python test.py 3` 对应的设置代码为
```python
self.p = QProcess(self)
self.setProgram("python")
self.setArguments(["test.py", "3"])
```

#### 子进程控制交互
关于子进程的启动
* 方法 `start()` 启动子进程
    * 使用子进程前, 应当保证[子进程设置](#子进程设置)完毕
    * 通过此方法启动的子进程, 当主进程退出时子进程也将强制退出
    * 建议在主程序关闭时 ([关闭事件触发](./base.md#窗口专用方法)), 通过 `terminate()` 尝试退出子进程, 并在事件循环后调用 `waitForFinished()` 方法等待进程保存数据完毕退出, 可参见[示例](#子进程使用示例)
* 方法 `startDetached()` 分离并启动子进程
    * 通过此方法启动的子进程, 当主进程退出时子进程不受影响

关于子进程的退出
* 槽函数 `terminate()` 尝试退出子进程, 但可能退出失败 (通常能让进程在退出前保存数据)
    * 对于 Windows 下的控制台程序, 该方法可能无法使程序退出
* 槽函数 `kill()` 强制退出子进程
* 方法 `waitForFinished(msecs = 30000)` 阻塞等待子进程退出
    * `msecs` 等待时长, 单位毫秒, 传入 `-1` 将不断等待
    * 当成功退出时, 返回 `True`, 当子进程已经退出或等待超时或出错, 返回 `False`
    * 即使在[事件循环](./base.md#事件循环)外也可以调用此函数, 即当 `app.exec()` 返回后, 依然可以调用此方法
* 当子进程对象被销毁时, 将强制退出, 如作为局部变量且在构造函数中没有给出父组件

关于子进程的状态
* 信号 `finished` 当子进程退出时发出
* 方法 `exitStatus()` 获取子进程退出状态, 返回值为枚举类型 `QProcess.ExitStatus` 取值为
    * `ExitStatus.NormalExit` 正常退出
    * `ExitStatus.CrashExit` 错误退出
* 方法 `state()` 获取子进程当前状态, 返回值为枚举类型 `QProcess.ProcessState`, 取值有
    * `ProcessState.NotRunning` 子进程未运行或退出
    * `ProcessState.Starting` 子进程启动中
    * `ProcessState.Running` 子进程运行中

关于子进程的运行中错误
* 方法 `error()` 获取当前子进程是否有运行时错误, 返回值为枚举类型 `QProcess.ProcessError` 常用取值为
    * `ProcessError.UnknownError` 未知错误或没有错误
    * `ProcessError.WriteError / ReadError` 向子进程写入或读取出错
    * `ProcessError.Crashed` 子进程崩溃
    * `ProcessError.FailedToStart` 子进程启动失败
    * `ProcessError.Timedout` 函数 `waitFor...` 等待超时
* 信号 `errorOccurred(error)` 当子进程出错时发出信号
    * 数据 `error` 为枚举类型 `QProcess.ProcessError`

#### 子进程数据交互
子进程与主进程之间通过标准输出流以及标准错误流交互数据

对于标准输出流 `stdout`  
* 信号 `readyReadStandardOutput` 当标准输出流出现新数据时, 发出信号
    * 注意, 对于 Python 的输出函数 `print` 在调用时仅会将输出暂存在缓冲区, 应当使用 `print(..., flush = True)` 保证每次输出都刷新缓冲区, 主进程能接收到数据
* 方法 `readAllStandardOutput()` 从标准输入流读取数据
    * 返回值为 `QBytes` 类型, 一般通过方法 `data` 获取类型为 [bytes](../base/base.md#bytes-对象) 的数据内容
    * 一般通过 `data.data().decode()` 将读取数据转为字符串 (默认编码为 `utf-8`)
* 方法 `setStandardOutputFile(fileName, mode = ...)` 将标准输出流内容重定向至文件
    * `fileName` 重定向文件路径
    * `mode` 文件打开方式, 参数为枚举类型 `QProcess.OpenModeFlag` 常用值有 (该枚举类型继承自 `QIODeviceBase`)
        * `OpenModeFlag.Append` 向文件末尾添加内容
        * `OpenModeFlag.Truncate` 打开文件后清空其中内容
    * 当文件不存在时将尝试创建, 当打开失败时, 进程将创建失败
    * 重定向后, 方法 `readAllStandardOutput()` 从标准输入流中读取内容将出错

对于标准错误流 `stderr` 同样有信号 `readyReadStandardError`, 方法 `readAllStandardError()`, 方法 `setStandardErrorFile(...)`, 使用方法与标准输出流的一致

方法 `write(data)` 向子进程写入数据
* `data` 类型为模块 `QtCore` 下的类 `QByteArray`, 可通过 Python 的 [bytes 对象](../base/base.md#bytes-对象) 构造

#### 子进程使用注意
使用子进程时可参考[示例](./examples.md#子进程管理程序)

* 子进程创建, 由于[子进程对象销毁时将关闭子进程](#子进程控制交互)
    * 对于单个子进程, 应当将子进程对象作为对象成员管理
    * 对于多个子进程, 应当应当将子进程作为局部变量, 并设置父组件
    * 无论何种方法, 设置父组件为 `None` 保证自动删除
* 子进程退出
    * 对于单个子进程, 在子进程退出后, 通过赋值为 `None` 使其删除
    * 对于多个子进程, 通过 [finish](#子进程控制交互) 信号连接槽函数 [deletelater](./base.md#组件通用方法) 使其在结束后销毁

## 实用类
### QT 定时器
Qt 中提供了定时器类 [QTimer](https://doc.qt.io/qtforpython-6/PySide6/QtCore/QTimer.html#PySide6.QtCore.QTimer) 可用于定时发出信号

`QTimer` 类位于模块 `QtCore` 下

#### 定时器设置
方法 `setInterval(msec)` 设置定时器触发间隔, 单位毫秒
* `msec` 定时器触发毫秒间隔, 传入整数, 默认为 `0`
* 如果定时器触发间隔为 `0`, 将在每个事件循环结束后触发, 应当避免设置 `0` 间隔

方法 `setSingleShot(singleShot)` 设置是否重复定时
* `singleShot` 传入 `True` 后, 定时器将在第一次到达间隔后停止计时, 默认为 `False`
* 停止的定时器需要通过槽函数 [](#定时器交互) 重启

方法 `setTimerType(atype)` 设置定时器精度
* `atype` 精度设置, 参数为枚举类型 `QTimer.TimerType`, 可用值有
    * `TimerType.PreciseTimer` 精确定时器, 用于精确计时需要
    * `TimerType.CoarseTimer` 粗糙定时器, 存在 5% 的误差, 但能降低 CPU 消耗, 默认参数
    * `TimerType.VeryCoarseTimer` 极粗糙定时器, 仅具有秒级精度

#### 定时器交互
方法 `isActive()` 获取定时器是否正在运行  
* 当正在运行时返回 `True`

方法 `remainingTime()` 获取定时器距离到达计时间隔的剩余时间
* 返回值为整数, 单位毫秒

槽函数 `start([msec])` 启动定时器
* `msec` 定时器间隔, 如果不传入将使用[已有设置](#定时器设置)
* 定时器创建时默认为停止状态, 需要通过该方法启动
* 如果定时器正在运行, 该方法将重启定时器

槽函数 `stop()` 停止定时器

信号 `timeout()` 当定时器到达间隔后发出

## PySide 扩展
### Matplotlib 图像
<https://www.pythonguis.com/tutorials/pyside6-plotting-matplotlib/>

## 模型视图组件
<https://www.pythonguis.com/tutorials/pyside6-modelview-architecture/>

### 模型视图编程
参考教程 <https://doc.qt.io/qtforpython-6/overviews/model-view-programming.html#model-view-programming>

### 简单列表组件
[QListView](https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QListView.html#PySide6.QtWidgets.QListView)

### 树状列表组件
[QTreeView](https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QTreeView.html#PySide6.QtWidgets.QTreeView)

### 表格组件
[QTableView](https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QTableView.html#PySide6.QtWidgets.QTableView)

### 表头组件 
[QHeaderView](https://doc.qt.io/qtforpython-6/PySide6/QtWidgets/QHeaderView.html#PySide6.QtWidgets.QHeaderView)


## 程序打包
### Qt 资源系统


