---
title: "remuse — MDX 内容编译与渲染管线"
topic: "technical"
data_type: "process"
complexity: "moderate"
point_count: 5
source_language: "zh"
user_language: "zh"
---

## Main Topic

展示 remuse 项目中一条 MDX 章节从源文件到最终浏览器渲染页面的完整数据流：文件扫描 → 元数据解析 → 路由生成 → MDX 编译 → 组件注入 → 页面渲染。

## Learning Objectives

After viewing this infographic, the viewer should understand:

1. MDX 章节从源文件到渲染页面的完整 5 步流程
2. compileMDX 中 remark/rehype 插件各自负责什么
3. 70+ MDX 教学组件如何注入到正文中

## Target Audience

- **Knowledge Level**: Intermediate
- **Context**: 需要理解 Next.js MDX 内容管线的技术实现
- **Expectations**: 看清每一步的输入输出和关键处理逻辑

## Content Type Analysis

- **Data Structure**: 线性流程，5 个阶段顺序执行
- **Key Relationships**: 前一步输出是后一步输入
- **Visual Opportunities**: 流水线/传送带式可视化

## Key Data Points (Verbatim)

- "gray-matter 解析 frontmatter (title/type/section/order/draft)"
- "getAllChapters() 按 bookRank > sectionRank > order 排序"
- "generateStaticParams() 枚举所有非草稿章节 → dynamicParams: false"
- "compileMDX({ source, components: mdxComponents, options: { remarkPlugins, rehypePlugins } })"
- "remarkPlugins: [remarkMath, remarkGfm]"
- "rehypePlugins: [rehypePrettyCode(shiki), rehypeKatex, rehypeCollectHeadings, rehypeSlug]"

## Layout × Style Signals

- Content type: process → suggests linear-progression
- Tone: technical → suggests subway-map (user preference) or technical-schematic
- Audience: developers → suggests clean, readable flow

## Design Instructions (from user input)

- 展示 MDX 从源文件到页面的完整流程
- 每一步标注关键技术和数据

## Recommended Combinations

1. **linear-progression + subway-map** (Recommended): 地铁线路图风格，五站式流程，符合用户偏好
2. **linear-progression + technical-schematic**: 蓝图工程风格流水线
3. **circular-flow + corporate-memphis**: 构建-渲染循环
