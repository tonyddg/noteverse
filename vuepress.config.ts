import { defineUserConfig } from 'vuepress'
import { hopeTheme } from "vuepress-theme-hope";

import { searchProPlugin } from "vuepress-plugin-search-pro";
import { cut } from "nodejs-jieba";

export default defineUserConfig({
    lang: 'zh-CN',
    title: "Tonyddg's Noteverse",
    description: 'A place for everything I would like to record.',
    base: '/noteverse/',
    plugins: [
        searchProPlugin({
            // 索引全部内容
            indexContent: true,
        indexOptions: {
                // 使用 nodejs-jieba 进行分词
                tokenize: (text, fieldName) =>
                    fieldName === "id" ? [text] : cut(text, true),
            },
        })
    ],

    theme: hopeTheme({
        plugins: {
            mdEnhance:{
                // 使用 KaTeX 启用 TeX 支持
                katex: {
                    mhchem: true,
                    copy: true,
                },
                // 启用标记
                mark: true,

                // 启用下角标功能
                sub: true,
                // 启用上角标
                sup: true,

                // 显示图片信息
                figure: true,
                // 启用图片标记
                imgMark: true,
                // 启用图片大小
                imgSize: true,

                // 为 Markdown 元素添加属性
                attrs: true,

                // 启用任务列表
                tasklist: true,

                // 添加对于 ECharts 的支持
                echarts: true,
            },

            autoCatalog:{
                // 根据 frontmatter 的 order 属性确定自动目录的排序, 数值越大越靠后, 同时也是侧边栏的目录顺序
                orderGetter: function(page){
                    return Number(page.frontmatter.order)
                }
            },
        },
        // 页脚设置
        displayFooter: true,
        footer: "powered by <a href='https://theme-hope.vuejs.press/zh/'>vuepress-theme-hope</a>",
        // 其他设置
        // 仓库地址
        repo: 'https://github.com/tonyddg/noteverse',
        // 主要 branch
        docsBranch: 'master',
        // 文档目录
        docsDir: '/docs',
        //全屏按钮
        fullscreen: true,
        //打印按钮
        print: true,
    }),
})