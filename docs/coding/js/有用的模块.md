# node.js 模块
## 模块查询
[npm官网](https://www.npmjs.com/)
[nodejs官方文档](https://nodejs.org/dist/latest-v16.x/docs/api/)
## 内部模块
### express
创建网页服务器
[说明](https://www.runoob.com/nodejs/nodejs-express-framework.html)
### fetch
发送 http 请求
[说明](https://zh.javascript.info/fetch)
### path
处理路径
[说明](https://www.runoob.com/nodejs/nodejs-path-module.html)
### os
os.tmpDir() 可用于获取系统临时文件目录
[说明](https://www.runoob.com/nodejs/nodejs-os-module.html)
### fs
文件操作
fs.promises promise 化的 fs 函数
[说明](https://www.runoob.com/nodejs/nodejs-fs.html)
### child_process
多线程/执行 shell 命令
[说明](https://www.runoob.com/nodejs/nodejs-process.html)
## 外部模块
### 控制台
#### Commander 
处理与获取命令行参数
[说明](https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md)
#### simple-git
在 node.js 里调用 git
[说明](https://www.npmjs.com/package/simple-git)
#### clui
命令行内实现 ui 效果
[说明](https://www.npmjs.com/package/clui)
#### clear
清空控制台
[说明](https://www.npmjs.com/package/clear)
#### chalk
控制台输出彩色文字
[说明](https://www.npmjs.com/package/chalk)
#### shelljs
在 node.js 里调用 shell 命令
[说明](https://www.npmjs.com/package/shelljs)
### markdown
#### markdown-it
将 markdown 转化为 html 块元素
[说明](https://www.npmjs.com/package/markdown-it)
[示例](https://markdown-it.github.io/)
#### markdown-it-texmath
markdown-it 扩展, 用于转化 latex
[说明](https://www.npmjs.com/package/markdown-it-texmath)
#### markdown-it-multimd-table
扩展 markdown 的表格语法
[说明](https://www.npmjs.com/package/markdown-it-multimd-table)
#### markdown-it-mark
高亮标记(\=\= \=\=)
[说明](https://www.npmjs.com/package/markdown-it-mark)
#### markdown-it-anchor
根据标题元素, 自动添加同名的 id
并且添加一系列 anchor 功能
[说明](https://www.npmjs.com/package/markdown-it-anchor)
#### markdown-it-toc-done-right
需要前置 markdown-it-anchor
实现 [TOC] 功能
[说明](https://www.npmjs.com/package/markdown-it-toc-done-right)
#### markdown-it-attrs
为 markdown 元素添加 attr
语法在元素末尾添加 \{属性\}
. => class; # => id; 其他属性 a=b
[说明](https://www.npmjs.com/package/markdown-it-attrs)
### html
#### jsdom
在 node.js 中解析 html
[说明](https://www.npmjs.com/package/jsdom)
#### prismjs
code 中的语法高亮
[说明](https://www.npmjs.com/package/prismjs)