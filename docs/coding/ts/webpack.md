# WebPack
* 在 node.js 中开发前端, 通过 WebPack 打包生成前端应用
* Webpack 使用 loader 可以通过 import 导入任何资源

## 创建项目
```shell
npm init -y # 使用 -y 参数, 使用默认设置

# 如果没有全局安装则使用 install
# 使用 --include=dev 将 webpack 添加到开发环境, 有关 webpack 的插件均需要添加到开发环境
npm add webpack webpack-cli --include=dev

# 在 src 中创建源文件
mkdir src

# 进行打包 npx 为执行 node_module 下的模块
npx webpack

```

## 配置文件
1. 创建 webpack.config.js 进行配置

```js
// 配置文件为 js, 允许导入其他 nodejs 模块
const path = require("path")
// 通过导入的方式导入 webpack 的插件
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
// 导入的可能不为构造函数, 可以导入构造函数
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

module.exports = {
    // 确定打包文件的方式, development 为开发模式, production 为导出模式, 即导出成品
    mode: "development",

    // 可方便查看打包后的代码
    devtool: "inline-source-map",

    // 设置入口文件
    entry: "./src/index.js",

    output: {
        // 打包文件名, 通过 [] 可添加格式字符串
        // contenthash 用于在打包文件后添加随机字符, 强制浏览器刷新
        filename: "index.bundle.[contenthash].js",
        // 打包文件路径 使用 path 模块生成路径
        path: path.resolve(__dirname, "dist"),

        // 在每次构建前清理 /dist 文件夹
        clean: true,
    },

    resolve: {
        // 通过 alias 设置路径别名, 传入为键值对
        // 导入模块时, 以文件虽在位置为基准, 对于位置较深的模块, 需要多个 .., 可用别名进行伪绝对路径访问
        alias: {
            utils: path.resolve(__dirname, "src/utils")
        }
    },

    module: {
        // 使用数组保存 loader 的规则
        rules: [
            {
                // 使用正则表达式包含 loader 识别的文件
                test: /\.css$/i,

                // 使用 use 确定文件采用的 loader
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,

                // 图片文件具有内置的 loader, 不需要指定, 但要使用 type 说明类型
                type: "assert/resource"
            },
            {
                test: /\.js$/i,
                // 使用正则表达式包含 loader 排除的目录, 对于转换代码的 loader, 通常需要排除 node_modules 目录
                exclude: /node_modules/,

                // 对于需要配置的 loader, 可传入对象
                use: {
                    loader: "babel-loader",
                    // loader 的配置
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }

            },
            
        ]
    },

    // 使用数组保存插件列表
    plugins: [
        // 导入插件为类构造函数, 通过 new 启用
        new HtmlWebpackPlugin({
            // 通过给函数传参设置参数
            title: "title",
        }),
        new BundleAnalyzerPlugin(),
    ],

    // 对打包后的文件进行压缩等优化设置
    optimization: {
        minimize: true,

        // 将插件作为优化器传入
        minimizer: [new TerserPlugin()],
    }

    // 用于开发服务器, 需要安装 webpack-dev-server
    devServer: {
        static: "./dist"
    }
}
```

## Loader
### CSS
1. 需要 Loader
    1. css-loader
    1. style-loader

```js
// 导入后, 如果引用了导出的 js, 将自动使用导入的 css
import "css 相对 src 的路径"
```

### 图片
1. 不需要 loader
1. 需要指定 type 为 assert/resource
1. 图片通常保存在 ./src/assets/images 下

```js
// 使用 import 导入图片, 导入得到图片的打包路径
import Img from "图片相对 src 的路径"

const image = document.createElement("img");
// 可将图片路径直接用于 src 属性
image.src = Img;
```

### babel
1. 通过 babel, 生成不同版本的 js
1. 需要 loader babel-loader
1. 需要安装 babel 本体
    * @babel/core
    * @babel/preset-env
1. 匹配 js 文件, 并且需要

### ts
1. 需要安装 ts-loader
1. 

## 插件
### html-webpack-plugin
自动打包 html 文件
[多页面与模板](https://blog.csdn.net/hbiao68/article/details/104054932/)

### terser-webpack-plugin
压缩优化器

### webpack-bundle-analyzer
打包文件大小可视化

## 扩展
### 项目服务器
启动项目服务器后, 能够在每次修改文件后自动打包, 并且生成本地网页用于浏览
需要安装 webpack-dev-server, 并且进行设置

#### 启动项目服务器
通过以下命令启动 webpack 项目服务器, 在修改 webpack 配置后需要重启才能生效

```shell
webpack serve --open
```
