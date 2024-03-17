# 常用模块与操作
可参考文档 <https://docs.python.org/zh-cn/3/library/allos.html>

## 文本输入输出
### 打印到屏幕
`print([表达式1], [表达式2], ...)`

将表达式转为字符串, 打印到屏幕上  
通常直接使用字符串的 [`format` 成员函数](./base.md#转义与格式化)完成格式化

### 获取输入
1. `raw_input([输入提示])`
从屏幕上获取一行, 返回字符串
2. `input([输入提示])`
从屏幕上获取一行, 通常返回字符串, 也可以解析[推导式](./base.md#推导式), 然后返回
3. 如果要读取数字等, 需要使用类型转换, 如 `int(input())`

## 文件操作
来自模块 `io`, 已默认导入

#### 打开文件
```python
a = open(file, mode = 'r', encoding = 'utf8')
```

* 函数参数
    * `file`
    文件路径
    * `mode`
    文件打开模式
* 返回值  
文件对象

#### 文件方法
使用 `open` 函数后, 将创建文件对象, 通过其成员函数操作文件
1. `file.close()`
关闭文件

2. `file.read(<读取字符数>)`
读取字符, 如果负数则读取所有

3. `file.readline([最多读取字符数])`
读取整行, 包括 `\n`

4. `file.seek(<偏移>, [__whence = 相对位置标志 1,2])`
将文件指针相对基准位置移动指定的偏移量  
    * `__whence = 0` 时, 以文件开头为基准位置 (默认情况)
    * `__whence = 1` 时 时, 以当前文件指针为基准位置  
    * `__whence = 2` 时 时, 以文件末尾为基准位置, 可用于获取文件末尾位置

5. `file.tell()`
获取当前文件指针位置

6. `file.write(<字符串>)`
向文件中写入字符串

#### 文件逐行读取示例
> 参考文章 <https://blog.csdn.net/hn_tzy/article/details/127888014>

```python
# 创建一个 list 用于逐行保存文件
listofFile:list = []

# 使用简化异常处理结构打开文件
with open("./text.txt") as file:

    file.seek(0, 2)  # 将指针移动到文件末尾
    eof = file.tell()  # 得到文件末尾位置, 即 EOF
    file.seek(0, 0) # 将指针移动回文件的开头

    # 与 EOF 比较, 逐行遍历文件
    while file.tell() < eof:
        listofFile.append(file.readline())

    file.close()
```

1. 文件读取中通常使用[简化异常处理结构](./objective.md#简化异常处理结构)
1. 通过 `file.seek(0, 2)` 与 `file.tell()` 组合可以获取文件末尾位置 EOF
1. 通过 `list.append()` 函数可以动态扩展储存空间, 不断向列表末尾插入数据

#### 踩坑记录: Windows 下读取 Unix 中保存的文本
当在 Windows 下读取 Unix 中保存的文本时 (如实验数据), 使用 tell 函数可能会返回错误值 `18446744073709551714`  
为了规避这一错误, 应采用 `rb` 模式打开文件, 如 `open("...", mode='rb')`  

参考文章 <https://stackoverflow.com/questions/15934950/python-file-tell-giving-strange-numbers>

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

## 操作系统接口
使用模块 os
1. os.getcwd()
获取当前工作目录
2. os.chdir([路径])
切换工作目录
3. os.remove([路径])
删除文件
4. os.rename([旧名称], [新名称])
重命名文件或目录
5. os.system()
执行系统命令
6. os.access([路径], [操作])
检验是否有权限操作文件
7. os.path
与路径, 文件信息有关的子模块
* 对于操作文件夹, 可能需要具有递归版本的函数, 查表

## 文件搜索
使用模块 glob
1. glob.glob([带有通配符的路径])
返回符合通配符的路径

## 系统交互接口
使用模块 sys
1. sys.argv
获取命令行参数
2. sys.stdin/stdout/stderr.write/read()
重定向输入输出流
3. sys.exit()
终止脚本

## 正则表达式
使用模块 `re`

1. r"[正则表达式]"
定义正则表达式
2. re.findall([正则表达式], [字符串])
正则表达式匹配

## 计时与时间
使用模块 time

参考资料 <https://www.runoob.com/python3/python3-date-time.html>

### 日期
#### 获取时间戳
`ticks = time.time()`

获取一个浮点数类型的当前时间戳

#### 转换为时间结构体
`lt = time.localtime(ticks)`

* 参数 `ticks` 为被转换的时间戳  

时间结构体中共包含以下成员  
`tm_year, tm_mon, tm_mday, tm_hour, tm_min, tm_sec, tm_wday, tm_yday, tm_isdst`

#### 时间格式化
`time.strftime(format, lt)`

* 参数 `format` 为格式化字符串, `%Y` `%m` `%d` `%H` `%M` `%S` 分别表示年月日时分秒
* 参数 `lt` 为给转化的时间结构体

### 计时
#### 获取计时器时间戳
`ticks = time.perf_counter()`

获取一个以秒为单位的浮点类型时间戳, 可通过两个时间戳的差值用于计时

#### 休眠
`time.sleep(sec)`

调用此函数的线程休眠 `sec` 秒, 可以输入浮点参数  
当 `sec=0`, 将会把时间片让渡给其他需要的线程

## 序列化
### 序列化为 JSON 文件
使用模块 `json`

### 序列化为二进制数据
使用模块 `pickle`
