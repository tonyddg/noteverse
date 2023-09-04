import { defineUserConfig } from 'vuepress'
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
    lang: 'zh-CN',
    title: "Tonyddg's Noteverse",
    description: 'A place for everything I would like to record.',
    base: '/noteverse/',

    // 以 docs 为 sourceDir
    public: `docs/public`,

    theme: hopeTheme({
        plugins: {
            mdEnhance:{
                // 使用 KaTeX 启用 TeX 支持
                katex: true,
                // 启用标记
                mark: true,
                // 显示图片信息
                figure: true,
            },

            autoCatalog:{
                // 排除资源文件
                exclude: ["public"],
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