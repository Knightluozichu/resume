# remuse — MDX 内容编译与渲染管线

## Overview

一条 MDX 章节从 content/ 目录下的源文件到用户浏览器中可见的渲染页面，经过 5 个关键阶段：文件扫描、元数据解析、路由生成、MDX 编译、组件注入渲染。本图展示每个阶段的输入、处理逻辑和输出。

## Learning Objectives

The viewer will understand:

1. MDX 内容从源文件到页面的完整 5 步流程
2. compileMDX 中 remark/rehype 插件体系的分工
3. 70+ MDX 教学组件如何通过 components 参数注入

---

## Section 1: 第1站 — 文件扫描

**Key Concept**: 构建期扫描 content/ 目录，发现所有 .mdx 章节文件。

**Content**:

- 源文件位置：content/<bookSlug>/<sectionSlug>/<chapterSlug>.mdx
- 例：content/learnopengl/getting-started/shaders.mdx
- getAllChapters() 遍历 content/ 下所有 .mdx 文件
- 文件名 = chapterSlug，父目录 = sectionSlug，祖父目录 = bookSlug

**Visual Element**:

- Type: file icon with magnifying glass
- Subject: 从目录树中找到 .mdx 文件
- Treatment: 地铁站图标，标注 ①

**Text Labels**:

- Headline: "站 ①: 文件扫描"
- Labels: "content/\*_/_.mdx", "getAllChapters()"

---

## Section 2: 第2站 — 元数据解析

**Key Concept**: gray-matter 解析 YAML frontmatter，提取章节元数据。

**Content**:

- gray-matter 分离 frontmatter + 正文 body
- frontmatter 字段：title / type(A|B|C|D) / section / order / description / draft
- parseFrontmatter() 验证字段类型
- 生产环境过滤 draft:true 的章节
- 排序：bookRank(0-based) → sectionRank(0-based) → order

**Visual Element**:

- Type: YAML → JSON 转换图标
- Subject: frontmatter 解析为结构化元数据
- Treatment: 地铁站图标，标注 ②

**Text Labels**:

- Headline: "站 ②: 元数据解析"
- Labels: "gray-matter", "frontmatter → ChapterMeta"

---

## Section 3: 第3站 — 路由生成与章节树

**Key Concept**: 基于元数据生成 SSG 路由参数和侧边栏导航树。

**Content**:

- generateStaticParams() 枚举所有 draft:false 的章节 slug
- URL 格式：/learn/<bookSlug>/<sectionSlug>/<chapterSlug>
- getChapterTree() → NavBook[] → NavSection[] → NavChapter[]
- getAdjacentChapters() → 上/下一章链接 (prev/next)
- dynamicParams: false — 禁止运行时动态路由

**Visual Element**:

- Type: tree structure with URL mapping
- Subject: 三层路由映射 (book→section→chapter)
- Treatment: 地铁站图标，标注 ③

**Text Labels**:

- Headline: "站 ③: 路由生成"
- Labels: "generateStaticParams()", "NavBook → NavSection → NavChapter", "/learn/learnopengl/getting-started/shaders"

---

## Section 4: 第4站 — MDX 编译

**Key Concept**: compileMDX 是核心编译器，将 MDX 正文 + 70+ 组件注册表编译为 React 元素树。

**Content**:

- compileMDX({ source, components: mdxComponents, options })
- remark 插件层 (Markdown AST 处理):
  - remarkMath — 数学公式语法支持
  - remarkGfm — GitHub Flavored Markdown (表格/任务列表)
- rehype 插件层 (HTML AST 处理):
  - rehypePrettyCode(shiki) — 代码高亮 (github-dark 主题)
  - rehypeKatex — 数学公式渲染
  - rehypeCollectHeadings — 提取 h2/h3 供 TOC 渲染
  - rehypeSlug — 标题自动生成锚点 ID

**Visual Element**:

- Type: compiler/transformer icon
- Subject: MDX 文本进入编译器的管道处理
- Treatment: 地铁站图标，标注 ④，多个子管道分支

**Text Labels**:

- Headline: "站 ④: MDX 编译 (compileMDX)"
- Labels: "remark: Math + GFM", "rehype: shiki + KaTeX + Headings + Slug", "components: 70+ 教学组件"

---

## Section 5: 第5站 — 组件注入与页面渲染

**Key Concept**: 编译产物通过 ChapterShell 三栏布局渲染为最终静态 HTML。

**Content**:

- components 注册表注入 70+ 教学组件到 MDX 正文
- 核心组件：Objectives / PipelineViz / MathViz / ShaderDemo / CodeTabs / CompareSlider / Stepper / Glossary / Attribution / Term
- ChapterShell 三栏布局：左侧 ChapterNav (240px) + 正文 article (max-w-72ch) + 右侧 PageToc (200px)
- WebGL Demo 组件通过 next/dynamic 做代码分割，独立 chunk
- 最终输出：静态 HTML (SSG 产物)

**Visual Element**:

- Type: page layout diagram
- Subject: 三栏布局 + 组件注册表注入
- Treatment: 地铁站终点图标，标注 ⑤

**Text Labels**:

- Headline: "站 ⑤: 页面渲染"
- Labels: "ChapterShell 三栏布局", "70+ MDX 组件注入", "静态 HTML 输出"

---

## Data Points (Verbatim)

### Statistics

- "5 个编译阶段：扫描 → 解析 → 路由 → 编译 → 渲染"
- "70+ MDX 教学组件注册到 components"
- "4 个 rehype 插件：shiki / KaTeX / Headings / Slug"
- "2 个 remark 插件：Math / GFM"
- "3 栏布局：240px + 72ch + 200px"

### Key Terms

- **compileMDX**: next-mdx-remote v6 的核心 API，在 RSC 中编译 MDX 为 React 元素
- **remark**: 处理 Markdown AST 的 unified 插件
- **rehype**: 处理 HTML AST 的 unified 插件
- **shiki**: 基于 TextMate 语法的代码高亮库
- **KaTeX**: 最快的数学公式渲染库

---

## Design Instructions

### Style Preferences

- 地铁线路图风格 (subway-map)
- 五站式横向排布，彩色路线连接
- 每站用不同颜色区分
- 45°/90° 转折线

### Layout Preferences

- 水平线性推进
- 5 个站点从左到右排列
- 站点间用彩色线路连接
- 每站下方标注关键数据

### Other Requirements

- 中文标注
- 尺寸：横版 16:9 (landscape)
