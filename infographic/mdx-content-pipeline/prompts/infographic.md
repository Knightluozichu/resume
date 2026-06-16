Create a professional infographic following these specifications:

## Image Specifications

- **Type**: Infographic
- **Layout**: linear-progression (Process variant)
- **Style**: subway-map
- **Aspect Ratio**: 16:9
- **Language**: zh

## Core Principles

- Follow the layout structure precisely for information architecture
- Apply style aesthetics consistently throughout
- Keep information concise, highlight keywords and core concepts
- Use ample whitespace for visual clarity
- Maintain clear visual hierarchy

## Text Requirements

- All text must match the specified style treatment
- Main titles should be prominent and readable
- Key concepts should be visually emphasized
- Labels should be clear and appropriately sized
- Use the specified language for all text content

## Layout Guidelines

**linear-progression Process variant**: Five connected stations in a horizontal line, left to right. Each station is a numbered node with a distinctive icon. Colored route lines connect stations with 45° and 90° angles. Clear start and end points with directional arrows. Consistent spacing between nodes.

## Style Guidelines

**subway-map**: Transit diagram style with colored route lines (red, blue, green, yellow, orange, purple). White or light gray background. 45° and 90° angles only. Station circle markers. Interchange symbols at key junctions. Clean sans-serif typography. Station name labels beside or below each node. Line thickness hierarchy for primary/secondary paths.

---

Generate the infographic based on the content below:

# remuse — MDX 内容编译与渲染管线

## Overview

一条 MDX 章节从 content/ 目录下的 .mdx 源文件到用户浏览器中可见的渲染页面，经过 5 个关键阶段。

## The 5 Stations (Left to Right)

### Station 1: 文件扫描 (File Scan)

- Action: getAllChapters() 遍历 content/\*_/_.mdx
- Input: content/learnopengl/getting-started/shaders.mdx
- Detail: 文件名=chapterSlug, 父目录=sectionSlug, 祖父目录=bookSlug

### Station 2: 元数据解析 (Metadata Parse)

- Action: gray-matter 解析 YAML frontmatter
- Fields: title, type(A|B|C|D), section, order, draft
- Detail: parseFrontmatter() 验证类型, 过滤 draft:true

### Station 3: 路由生成 (Route Generation)

- Action: generateStaticParams() 枚举 slug
- URL: /learn/learnopengl/getting-started/shaders
- Detail: getChapterTree() → NavBook→NavSection→NavChapter, dynamicParams:false

### Station 4: MDX 编译 (MDX Compile) — TRANSFER STATION

- Action: compileMDX({ source, components, options })
- remark: Math + GFM (Markdown AST)
- rehype: shiki (代码高亮) + KaTeX (公式) + Headings (TOC) + Slug (锚点)
- Detail: 70+ 教学组件注册到 components 参数注入

### Station 5: 页面渲染 (Page Render)

- Action: ChapterShell 三栏布局渲染
- Layout: 左侧导航 240px + 正文 72ch + 右侧 TOC 200px
- Detail: WebGL Demo next/dynamic 代码分割 → 独立 chunk
- Output: 静态 HTML (SSG 产物)

Text labels (in zh):

- Title: "MDX 内容编译与渲染管线"
- Subtitle: "从 .mdx 源文件到 HTML 页面的 5 站旅程"
- Station 1: "① 文件扫描"
- Station 2: "② 元数据解析"
- Station 3: "③ 路由生成"
- Station 4: "④ MDX 编译 ← 换乘站"
- Station 5: "⑤ 页面渲染"
- Route line labels: "文件系统", "gray-matter", "compileMDX", "SSG 输出"
- Bottom note: "构建期一次性执行 · 纯 SSG · zero runtime overhead"
