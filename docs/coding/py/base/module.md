# 常用操作与模块
## 退出程序
参考自 <https://www.bilibili.com/video/BV1bZ4y1B7vT>

### 直接方法
`quit(code = 0)` 或 `exit(code = 0)`  
函数参数 `code` 为退出码, 取 `0` 为正常退出  
以上两个退出函数为基本的退出函数, 其本质为发起异常 `raise SystemExit`, 可能被 `try` 语句捕获  
由于这两个函数来自自动导入的模块 `site`, 因此当这个模块被排除时, 将因为函数不存在而导致异常  
因此一般不推荐使用

### 一般推荐方法
`sys.exit(code = 0)`  
同样为 `raise SystemExit`  
但使用时要明确导入模块 `sys`, 因此更安全, 推荐使用

### 特殊方法
`os._exit(code)`  
通过系统层面直接退出程序, 可以保证程序立刻退出  
该函数没有默认的退出码, 需要手动指定  
不推荐使用, 因为没有 `raise SystemExit`, 可能导致部分退出保护程序无法运行

## 命令行解析
<https://docs.python.org/zh-cn/3/howto/argparse.html#argparse-tutorial>

通过模块 argparse, 可实现对输入的命令行参数或字符串的解析  
解析时遵守 Shell 传递命令行参数的一般准则

### 解析器创建与解析
使用 `parser = argparse.ArgumentParser(prog = None, description = None, epilog = None)` 创建一个解析器对象
* `prog` 字符串, 表示命令名称, 默认使用脚本名称
* `description` 字符串, 表示命令介绍
* `epilog` 字符串, 表示命令的补充详细说明

使用解析器对象方法 `parser.parse_args(args = None)` 对参数进行解析
* `args` 被解析的参数
    * 当不给出参数时, 将对命令行参数进行解析
    * 给出参数为一个字符串数组, 数组中各个元素即传入的参数
* 返回值为一个解析结果对象, 对象的成员即命令行参数名, 成员的值即捕获的值
* 类似的还有 `parser.parse_known_args(args = None)`, 该方法仅解析已知的参数, 将返回一个元组, 第一个元素是解析结果对象, 第二个元素是无法解析的字符串组成的列表

### 通用添加参数值
对于 argparse 解析的命令通常有具有以下格式  
`python xxx.py <位置参数> --<可选参数> <参数值>`
* 命令只有一个位置参数, 通常紧跟在命令名后, 也可使用单独的 `--` 与前面的可选参数分隔, 并在最后给出
* 命令可以有多个可选参数, 可选参数则可以有多个, 并使用 `--` 或 `-` 为前缀, 后接参数值

使用解析器对象方法 `parser.add_argument(*name_or_flags, help, metavar, ation, nargs, choices, type, default)` 添加命令参数以用于捕获
* `name_or_flags` 字符串, 表示参数名称
    * 名称只能由英文字母, 数字, 下划线组成  
    * 当名称以 `--` 为开头时, 表示可选参数, 否则表示位置参数
    * 对于可选参数, 还可以传入多个字符串, 前几个以 `-` 为前缀, 最后一个以 `--` 为前缀, 表示可选参数及其短别名
    * 参数名称同时也是解析结果对象的成员 (可选参数名不包含前缀 `--`)
* `help` 字符串, 表示参数说明
* `metavar` 字符串, 表示在说明中使用的位置参数的参数名称或可选参数值的代称
* `action` 字符串, 特殊参数操作, 具体见下文介绍
* `nargs` 字符串或数组, 表示参数可以出现的次数 (当该参数被指定后, 除了默认情况, 捕获值总是一个列表)
    * 数字表示参数要求出现的此时
    * `*` 表示参数可不出现或出现任意次
    * `+` 表示参数必须出现但次数不限
    * `?` 表示可出现一次或不出现 (捕获值不为列表)
    * 传入过多参数时, 应使用 `--<可选参数名1> [参数值1] [参数值2...] --<可选参数2>`, 即一个可选参数后跟随多个参数值
    * 推荐配合 `action = 'extend'` 使用, 此时可以出现多次同名可选参数, 并合并参数值为一个列表, 而不需要使用上述格式
* `choice` 列表, 表示参数的可取值, 当传入可取值外的参数时将出错
* `type` 接收字符串的回调函数, 表示参数转换器, 一般仅传入 `int` 与 `float` 用于接收数值类型的参数, 此外都应当接收字符串并在后续处理
* `default` 参数的默认值, 默认为 `None`

### 特殊参数解析
以下介绍一些特殊的参数解析方法

* 传入命令标志  
    * 默认情况下可选参数后必须有一个参数值, 但很多时候希望将可选参数作为一个标志使用
    * 此时可在定义参数时, 给出 `action` 的值 `store_true`, 此时可选参数将视为一个标志处理, 当该参数出现时, 参数值赋 `True`, 否则赋 `False`
* 互斥参数组
    * 对于几个参数可能相互排斥, 当一个出现时另几个参数不允许出现
    * 可使用解析器对象创建一个互斥组 `group = parser.add_mutually_exclusive_group()`, 然后再使用互斥组对象的方法 `group.add_argument()` 添加参数, 以次方法添加的参数将相互排斥不能同时出现
* 子命令
    * 命令下可能还存在子命令, 即命令名后的第一个参数为子命令名称
    * 通过解析器对象方法 `subparse = parser.add_subparsers(title, description)` 创建子命令生成器对象 (只能存在一个子命令生成器, 且原命令依然可以使用, 即对应没有传入子命令的情况)
    * 通过子命令生成器对象方法 `parser_xxx = subparse.add_parser(name, help, aliases)` 创建子命令, 此时将返回一个用于子命令的解析器对象, 通过此对象为子命令添加参数
        * 参数 `name` 字符串, 子命令名称
        * 参数 `help` 字符串子命令帮助
        * 参数 `aliases` 字符串列表, 子命令别名
    * 无论使用哪个子命令, 返回的解析结果对象中仅包含子命令所捕获的参数而不会区分具体调用了哪个子命令  
    * 使用子命令时有一个技巧, 即对于各个子命令均使用 `parser_xxx.set_default(func = proc_xxx)`, 方法 `set_default` 可用于设置特殊参数, 该参数以及参数值总会出现在解析结果对象中, `proc_xxx` 为子命令的处理函数  
    此时无论调用哪个子命令, 只需要使用 `args.func(args)` 总能根据使用的子命令, 调用对应的处理函数
* 版本显示
    * 如果希望将一个命令标志用于显示版本号, 可使用以下示例代码
    * `parser.add_argument('--version', action='version', version='%(prog)s <版本号>')`
    * 此时调用可选参数 `--version` 将用于显示版本号

## 计时与时间
使用模块 `time` 实现与事件以及日期有关的操作  
以下仅介绍常用的操作

### 日期获取
* `ticks = time.time()` 获取当前时刻的时间戳 (浮点数)
* `lt = time.localtime(ticks)` 将时间戳转换为时间结构体
    * `ticks` 为被转换的时间戳, 如果没有给出将使用当前时刻的时间戳  
    * 返回值时间结构体中共包含成员 `tm_year, tm_mon, tm_mday, tm_hour, tm_min, tm_sec, tm_wday, tm_yday, tm_isdst`
* `time.strftime(format, lt)` 将时间结构体格式化为字符串
    * `format` 为格式化字符串, `%Y` `%m` `%d` `%H` `%M` `%S` 分别表示年月日时分秒, 更多参考 <https://docs.python.org/3/library/time.html#time.strftime>
    * `lt` 用于转化的时间结构体

### 计时与延时
* `ticks = time.perf_counter()` 获取以秒为单位的浮点类型时间戳, 可通过两个时间戳的差值用于计时
* `time.sleep(sec)` 线程休眠
    * `sec` 休眠时长, 单位为秒, 可以输入浮点值  
    当 `sec=0`, 将会把时间片让渡给其他需要的线程

## 文件操作
### 打开文件
使用函数 `open(file, mode = 'r')` 打开文件并返回一个文件对象
* `file` 文件路径
* `mode` 文件打开方式标识, 使用一个字符串表示, 可用以下标识符任意组合
    * `r` 读取文件
    * `w` 写入文件
    * `x` 创建一个新文件, 如果文件已存在将出错
    * `a` 打开文件并写入时, 如果文件已存在将在末尾追加内容 (默认为清空原有内容)
    * `b` 以二进制的方式打开文件, 此时不会尝试解码文件内容 (默认将尝试解析文件内容为字符)
    * `+` 允许文件同时读取与写入, 不可单独使用, 需要与配合 `r` 或 `w` 标志配合, 如 `r+` 表示文件可用于读取与写入, 但主要用于读取 
* 返回值为一个文件对象, 可以配合 [with](./base.md#预定义异常处理) 语句使用, 推荐的打开文件代码如下

```python
with open(file, mode) as f:
    ... # 操作文件对象
# 无论是否有异常, 退出时将自动关闭文件
```

### 文件操作
对于 `open` 函数返回的文件对象, 可使用以下对象方法实现文件操作 (以下以 `file` 作为文件对象实例名称)
* `file.cloase()` 关闭并释放文件资源 (使用 `with` 语句时不必要, 将在退出时自动执行)
* `file.read(size = None)` 读取指定长度的文件内容
    * `size` 读取长度
        * 给出整数时, 表示读取的字符数, 同时将文件指针偏移相应位置
        * 给出 `None` 时, 将读取文件所有剩余内容
        * 当文件指针位于末尾时, 读取得到的总为空
    * 按文本读取时, 函数返回一个字符串; 以二进制方式读取时, 函数返回一个 [bytes 对象](./base.md#bytes-对象)
* `file.readline(size = -1)` 读取最多一行的文件内容
    * `size` 最大读取长度
        * 给出正整数时, 表示最多一行读取的内容, 读取后文件指针将偏移相应位置
        * 给出 `-1` 时, 将读取整行的内容
    * 返回值与 `file.read()` 类似
    * 该函数实际为从当前文件指针位置开始, 读取到 `size` 或换行符的位置 (读取结果中包含换行符)
* `file.write(str)` 向文件写入内容
    * `str` 向文件写入的内容
        * 写入内容时, 文件指针也将移动对应长度
        * 以二进制方式读取时, 应传入 bytes 对象
    * 返回值为实际写入的字符数
* `file.seek(offset, whence = os.SEEK_SET)` 移动文件指针
    * `offset` 文件指针的相对偏移量
    * `whence` 使用整数表示的相对位置, 一般有以下取值
        * `0` 或 `os.SEEK_SET`, 以文件开头为基准位置 (默认情况)
        * `1` 或 `os.SEEK_CUR`, 以当前文件指针为基准位置  
        * `2` 或 `os.SEEK_END`, 以文件末尾为基准位置, 可用于获取文件末尾位置
    * 返回新文件指针相对文件开头为基准的位置
* `file.tell()` 获取当前文件指针的位置

## 数据存取
介绍[文本数据存储语言](../../random/textdata.md)的存取与二进制数据的存取

### JSON
* 使用时需要导入包 `json` (内置模块)
* 数据导出
    * `json.dump(data, fp)` 将数据导出到可写对象
        * `data` 被导出的数据, 只能导出[基本类型](./base.md#类型与容器), 对于对象可使用 [`__dict__` 属性](./base.md#类的使用)转换为字典
        * `fp` 写入对象, 即一个具有 `write()` 方法的对象, 如[文件对象](#文件操作)
    * `json.dumps(data)` 以字符串形式导出数据
        * `data` 与 `json.dump()` 相同
        * 将 json 以字符串的形式赴返回
* 数据导入
    * `json.load(fp)` 将数据从可读对象导入
        * `fp`, 读取对象, 即一个具有 `read()` 方法的对象, 如[文件对象](#文件操作)
        * 返回 json 解析结果, 一般为一个[字典](./base.md#字典)
    * `json.loads(data)` 以字符串形式导入数据
        * `data` json 文件的字符串
        * 返回 json 解析结果

示例代码
```python
import json
# 导出
with open('test.json', 'w') as f:
    data = ["Hello", None]
    text = json.dump(data, f)
# 导入
with open('test.json', 'r') as f:
    data = json.load(f)
    print(data)
```

### YAML
* 使用时需要导入包 `yaml` (需要安装包 `pyYAML`)
* 数据导出
    * `yaml.dump(data, stream)` 将数据导出到可写对象
        * `data` 被导出的数据, 建议对象可使用 [`__dict__` 属性](./base.md#类的使用)转换为字典
        * `stream`, 读取对象
            * 可以是一个具有 `write()` 方法的对象, 如[文件对象](#文件操作)
            * 也可以是字符串变量 (需要确保字符串已经声明, 如 `text = ""`)
* 数据导入
    * `yaml.load(stream, loader)` 将数据从可读对象导入
        * `stream`, 读取对象
            * 可以是一个具有 `read()` 方法的对象, 如[文件对象](#文件操作)
            * 也可以是字符串
        * `loader` 导入器
            * `yaml.BaseLoader` 基础导入器, 仅支持最基础的 YAML 语法
            * `yaml.FullLoader` 完整导入器, 支持所有 YAML 语法
            * `yaml.SafeLoader` 安全导入器, 用于导入不信任的文件
        * 返回 yaml 解析结果, 一般为一个[字典](./base.md#字典)

示例代码
```python
import yaml
# 导出
with open('test.yaml', 'w') as f:
    data = ["Hello", None]
    text = yaml.dump(data, f)
# 导入
with open('test.yaml', 'r') as f:
    data = yaml.load(f, yaml.FullLoader)
    print(data)
```


## 多线程
参考 <https://www.cnblogs.com/guyuyun/p/11185832.html>  
通过 Python 的内置模块 `threading` 实现多线程

### 多线程创建
#### 通过线程对象
创建线程前, 需要先创建一个线程对象, 明确线程执行的内容  
`threading.Thread(group = None, target = None, name = None, args = (), kwargs = {})`
* `group` 一般设置为 `None` 即可
* `target` 线程执行的任务, 为一个函数
* `name` 线程的名称, 默认为 `Thread-N`, `N` 为十位数编号
* `args` 传递给线程函数的位置参数
* `kwargs` 传递给线程函数的关键字参数

通过对象的以下方法使用线程对象
* `Thread.start()` 启动线程, 一个线程对象只能启动一次
* `Thread.join(timeout=None)` 让当前线程 (通常即主线程) 等待线程运行结束 (必须保证线程已经启动)
    * `timeout` 等待时间
* `Thread.is_alive()` 判断该线程是否仍在运行中, 仍在运行中返回 `True`

使用线程注意
* 一个线程即使执行结束, 也不能再使用 `start` 重新启动
* 即使主线程退出, 其他线程仍然会继续执行
* 为了保证其他线程正常退出, 应当以 `try` 语句管理主程序, 并在处理部分 `finally` 发出主线程退出[事件](#事件对象), 使循环执行的任务退出 (因此事件以 `while not ent.is_set()` 为循环)

#### 通过定时器对象
一般的多线程对象在线程任务执行结束后就会退出, 如果希望延迟执行任务, 则可使用定时器对象  
注意, 定时器对象只会在等待时间后执行一次任务, 定时执行任务可通过任务的 `while` 循环实现  
`threading.Timer(interval, function, args = None, kwargs = None)`
* `interval` 等待执行任务的时间, 单位秒
* `function` 线程执行的任务, 为一个函数
* `args` 传递给线程函数的位置参数
* `kwargs` 传递给线程函数的关键字参数

通过对象的以下方法使用定时器对象
* 该对象为[线程对象](#通过线程对象)的子类, 因此基本方法与之相同
* `Timer.cancel()` 如果定时器在等待任务开始, 则停止该任务

#### 通过继承多线程对象

### 多线程资源管理
#### 事件对象

#### 互斥锁

#### 条件量

#### 消息队列
参考 <https://docs.python.org/zh-cn/3/library/queue.html#module-queue>
