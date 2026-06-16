Create a professional infographic following these specifications:

## Image Specifications

- **Type**: Infographic
- **Layout**: hierarchical-layers
- **Style**: technical-schematic (Blueprint variant)
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

**hierarchical-layers**: Build a six-layer pyramid from top (user-facing) to bottom (source data). Each layer represents one tier of the technology stack. Layers should be clearly bounded with distinct colors, sized proportionally (wider at top, narrower at bottom to show dependency direction). Use arrows between layers to show data flow.

## Style Guidelines

**technical-schematic Blueprint variant**: White lines on deep blue (#1E3A5F) background with grid pattern. Geometric precision, consistent stroke weights. Use amber (#F59E0B) for highlights and callouts. Clean sans-serif font, all-caps labels. Dimension lines and measurement annotations where appropriate.

---

Generate the infographic based on the content below:

# remuse 全栈技术架构总览

## Overview

remuse Shader教学网站六层全栈架构全景图：从用户浏览器经 nginx 反向代理、Next.js Standalone 服务器、MDX 编译管线、组件体系，到最终 Git CMS 素材源。

## Layer Structure (Top to Bottom)

### Layer 6: 用户浏览器 (Browser Rendering)

- 静态 HTML (Server Component 直出)
- 左侧章节导航树 (240px, Client, usePathname)
- 中间正文区 (max-w-72ch, MDX 编译内容)
- 右侧本页目录 (200px, IntersectionObserver)
- WebGL2 交互 Demo (next/dynamic, ssr:false)
- R3F 3D 跑车场景 (Ferrari PBR + Bloom)
- pagefind 搜索 (⌘K, ~50KB WASM)

### Layer 5: nginx 反向代理

- HTTPS 443 → 127.0.0.1:3100 反代
- SSL 证书 DNSPod 自动验证
- 同机共存多站点 (love/h5/wechat)

### Layer 4: Next.js Standalone Server

- Next.js 16.2.9 App Router + TypeScript
- output: "standalone", pm2 fork, max 512M
- 纯 SSG: generateStaticParams() + dynamicParams:false
- 4 路由: / | /learn | /learn/[...slug] | /review

### Layer 3: MDX 编译管线

- content/\*.mdx → gray-matter 解析 frontmatter
- compileMDX + 70+ 教学组件注入
- remark 插件: remarkMath, remarkGfm
- rehype 插件: rehypePrettyCode(shiki), rehypeKatex, rehypeCollectHeadings, rehypeSlug

### Layer 2: 组件体系 & RSC 边界

- Server Components: 根布局、Header/Footer、MDX 展示组件
- Client Components: 导航树、TOC、交互组件
- WebGL Dynamic: next/dynamic(ssr:false) 代码分割
- 两条3D体系: R3F (声明式) + 原生WebGL2 (教学用)
- DESIGN.md Token 体系: 10色彩 → globals.css → Tailwind

### Layer 1: Git CMS & 素材源

- content/learnopengl/ — MDX 章节 (4 sections, 27+章)
- public/ — 3D模型(ferrari.glb ≤3MB)、纹理、pagefind索引
- docs/ — chapter-template.mdx, chapter-spec.md
- DESIGN.md — 视觉设计总纲
- local.env — 密钥 (.gitignored)

Text labels (in zh):

- Title: "remuse 全栈技术架构总览"
- Subtitle: "Six-Layer Architecture — Browser → nginx → Next.js → MDX → Components → Git CMS"
- Layer 6: "Layer 6: 浏览器渲染层"
- Layer 5: "Layer 5: nginx 反向代理"
- Layer 4: "Layer 4: Next.js Standalone Server"
- Layer 3: "Layer 3: MDX 编译管线"
- Layer 2: "Layer 2: 组件体系 & RSC 边界"
- Layer 1: "Layer 1: Git CMS & 素材源"
- Bottom note: "纯 SSG · 零数据库 · pm2 守护 · 腾讯云 Lighthouse"
