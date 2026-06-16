Create a professional infographic following these specifications:

## Image Specifications

- **Type**: Infographic
- **Layout**: structural-breakdown (Exploded variant)
- **Style**: corporate-memphis
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

**structural-breakdown Exploded variant**: Central system (the remuse app) with four component categories exploded outward. Each category is a distinct colored region with its own sub-components listed inside. Callout lines with dots connect labels to components. Clear boundaries between categories. A comparison table at the bottom for the two 3D rendering systems.

## Style Guidelines

**corporate-memphis**: Flat vector illustration style. Bright saturated colors — purple, teal, orange, yellow, green. White or light pastel background. Abstract geometric shapes with no outlines, solid fills. Clean sans-serif bold headings. Professional but friendly aesthetic. Geometric decorative elements (circles, triangles, squiggles).

---

Generate the infographic based on the content below:

# remuse — RSC 组件边界与 WebGL 双体系架构

## Overview

remuse 的组件体系分为四个类别，每类有严格的加载策略和渲染位置。3D 渲染走两条并行体系：React Three Fiber 和原生 WebGL2。

## Four Component Categories (Exploded from Center)

### Category 1: Server Components (Blue) — 服务端零 JS

- layout.tsx (全局 HTML shell)
- SiteHeader / SiteFooter
- page.tsx (async RSC, compileMDX 调用)
- MDX 纯展示: Objectives, Callout, Attribution, Glossary, Figure
- lib/content.ts (章节扫描, server-only)

### Category 2: Client Components (Green) — 浏览器水合交互

- ChapterNav (左侧三层折叠树, usePathname)
- PageToc (右侧目录, IntersectionObserver)
- CodeTabs (C++/GLSL 代码切换)
- Exercises (折叠练习题)
- Term (术语 tooltip), Stepper (分步动画)
- CompareSlider (左右拖动对比)
- SearchOverlay (pagefind ⌘K)
- Comments (giscus), ReviewApp (Leitner 盒)

### Category 3: WebGL Dynamic (Purple) — 代码分割边界

- Loading: next/dynamic(() => import('./\*-canvas'), { ssr: false })
- Guard: WebGL2 能力检测 → 不支持则静态兜底
- Chunk: 独立代码块, 不进首屏关键路径
- R3F 子集: FerrariScene, ModelDemo, CubemapDemo, InstancingDemo
- 原生WebGL2 子集: ShaderDemo, TextureDemo, CameraDemo, LightingDemo, FramebufferDemo

### Category 4: Lazy Load (Orange) — 按需异步加载

- pagefind WASM (~50KB, 搜索浮层首次打开时加载)
- giscus (GitHub Discussions 评论, 滚动到章末加载)
- ReviewApp (复习系统, Leitner 盒算法 + 3D 翻转卡片)

## Comparison Table: Two 3D Rendering Systems

| 维度   | R3F 体系                                          | 原生 WebGL2 体系                                  |
| ------ | ------------------------------------------------- | ------------------------------------------------- |
| 技术栈 | React Three Fiber + drei + postprocessing         | 手写 GLSL + 手动 program/buffer                   |
| 场景   | Hero 跑车、ModelDemo、CubemapDemo、InstancingDemo | ShaderDemo、TextureDemo、CameraDemo、LightingDemo |
| 渲染   | 声明式 React 组件                                 | 命令式 Canvas API                                 |
| 后处理 | Bloom + SMAA                                      | 无 (教学 Demo 保持简单)                           |
| 降级   | PerformanceMonitor 三级 (high/mid/low)            | 无                                                |
| 模型   | glTF Draco ≤3MB                                   | 运行时生成几何体                                  |

Text labels (in zh):

- Title: "RSC 组件边界与 WebGL 双体系架构"
- Subtitle: "Server / Client / Dynamic / Lazy 四类边界 + R3F vs 原生 WebGL2"
- Category 1 label: "Server Components"
- Category 2 label: "Client Components"
- Category 3 label: "WebGL Dynamic"
- Category 4 label: "Lazy Load"
- Boundary note: "═══ RSC Boundary ═══"
- Dynamic note: "next/dynamic + ssr:false 边界"
- Table title: "两条 3D 体系对比"
- Bottom note: "硬规则: 所有 THREE.js import 必须在 code-split 边界内"
