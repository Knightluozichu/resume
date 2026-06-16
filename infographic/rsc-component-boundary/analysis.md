---
title: "remuse — RSC 组件边界与 WebGL 双体系架构"
topic: "technical"
data_type: "system"
complexity: "moderate"
point_count: 4
source_language: "zh"
user_language: "zh"
---

## Main Topic

展示 remuse 项目中四类组件（Server / Client / WebGL-Dynamic / Lazy-Load）的精确边界划分，以及两条 3D 渲染体系（R3F vs 原生 WebGL2）的并行架构。揭示 next/dynamic + ssr:false 如何实现 WebGL 组件的代码分割与渐进加载。

## Learning Objectives

After viewing this infographic, the viewer should understand:

1. Next.js App Router 中 Server/Client Component 的边界划分策略
2. WebGL 组件通过 next/dynamic 实现代码分割的机制
3. R3F 与原生 WebGL2 两条 3D 体系的定位与差异

## Target Audience

- **Knowledge Level**: Intermediate
- **Context**: 需要理解 Next.js RSC 边界和 WebGL 加载策略
- **Expectations**: 看清各组件的归属和加载方式

## Content Type Analysis

- **Data Structure**: 系统组件拆解，四种类型 + 层级关系
- **Key Relationships**: Server → Client → Dynamic → Lazy 的依赖方向
- **Visual Opportunities**: 爆炸图展示组件拆分，颜色编码区分类型

## Key Data Points (Verbatim)

- "Server Components: 根布局、SiteHeader/Footer、content.ts"
- "Client Components: ChapterNav、PageToc、CodeTabs、Exercises"
- "WebGL Dynamic: next/dynamic(() => import('./\*-canvas'), { ssr: false })"
- "R3F 体系: React Three Fiber + drei + postprocessing"
- "原生 WebGL2 体系: 手写 GLSL + 手动管理 program/buffer/uniform"

## Layout × Style Signals

- Content type: system → suggests structural-breakdown
- Tone: technical → suggests corporate-memphis (clean vector)
- Audience: developers → suggests clear separation

## Design Instructions (from user input)

- 四类组件的边界划分要清晰
- 两条 3D 体系的对比

## Recommended Combinations

1. **structural-breakdown + corporate-memphis** (Recommended): 组件爆炸图，扁平矢量，四类组件用颜色分区
2. **structural-breakdown + technical-schematic**: 组件蓝图拆解
3. **bento-grid + chalkboard**: 四宫格分别展示每类组件
