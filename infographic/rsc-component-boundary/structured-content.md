# remuse — RSC 组件边界与 WebGL 双体系架构

## Overview

remuse 的组件体系分为四个明确的类别，每类有严格的加载策略和渲染位置。同时，3D 渲染走两条并行体系：React Three Fiber（声明式）和原生 WebGL2（教学用）。本图展示这四类组件的边界划分、加载策略、以及两条 3D 体系的对比。

## Learning Objectives

The viewer will understand:

1. remuse 中四类组件的划分标准与加载策略
2. next/dynamic + ssr:false 如何确保 WebGL 不进首屏
3. R3F 和原生 WebGL2 两条体系的分工与差异

---

## Section 1: Server Components — 服务端零 JS

**Key Concept**: 在服务端生成 HTML，零 JavaScript 下发到浏览器，体积最小、速度最快。

**Content**:

- 根布局 (layout.tsx)：全局 HTML shell (字体/Header/Footer)
- SiteHeader / SiteFooter：导航和页脚
- 章节页 (page.tsx)：async RSC，调用 compileMDX
- MDX 纯展示组件：Objectives / Callout / Attribution / Glossary / Figure
- lib/content.ts：章节扫描与排序 (server-only)
- globals.css：DESIGN token 落地 + 全局样式

**Visual Element**:

- Type: server icon with component boxes
- Subject: 服务端渲染的 HTML 块
- Treatment: 蓝色区域，标注 "Server / 零 JS"

**Text Labels**:

- Headline: "Server Components"
- Labels: "layout.tsx", "SiteHeader/Footer", "page.tsx (async RSC)", "MDX 纯展示组件", "lib/content.ts"

---

## Section 2: Client Components — 浏览器水合

**Key Concept**: 需要浏览器 API 或 React hooks 的组件，在客户端水合执行。

**Content**:

- ChapterNav：左侧三层折叠树 (需 usePathname 高亮当前章)
- PageToc：右侧本页目录 (需 IntersectionObserver 滚动高亮)
- CodeTabs：C++/GLSL 代码 Tab 切换
- Exercises：可折叠练习题 (含 Answer 披露)
- Term：术语 tooltip (hover 浮层)
- Stepper：分步动画控制 (暂停/单步/拖动)
- CompareSlider：左右拖动对比
- SearchOverlay：pagefind 搜索浮层 (⌘K)
- Comments：giscus 评论 (GitHub Discussions)
- ReviewApp：复习系统 (Leitner 盒 + 3D 翻转卡片)

**Visual Element**:

- Type: browser icon with component boxes
- Subject: 客户端交互组件
- Treatment: 绿色区域，标注 "Client / 浏览器水合"

**Text Labels**:

- Headline: "Client Components"
- Labels: "ChapterNav", "PageToc", "CodeTabs", "Exercises", "Term/Stepper", "SearchOverlay", "Comments"

---

## Section 3: WebGL Dynamic — 代码分割边界

**Key Concept**: 所有含 Three.js / WebGL import 的组件必须通过 next/dynamic + ssr:false 做代码分割，独立 chunk，不进首屏。

**Content**:

- 加载模式：next/dynamic(() => import('./xxx-canvas'), { ssr: false })
- 能力检测：先用 useSyncExternalStore + 一次性 canvas 探测 WebGL2
- 不支持时：展示静态兜底卡片（不挂 Canvas）
- 支持时：动态加载真正含 three/webgl import 的 \*-canvas.tsx
- R3F 体系组件：FerrariScene (Hero)、ModelDemo (模型查看器)、CubemapDemo (天空盒)、InstancingDemo (实例化)
- 原生 WebGL2 体系组件：ShaderDemo (着色器编辑)、TextureDemo (纹理)、CameraDemo (摄像机)、LightingDemo (光照)、FramebufferDemo (帧缓冲)

**Visual Element**:

- Type: code-split boundary diagram
- Subject: dynamic import 的懒加载流程
- Treatment: 紫色区域 (accent)，虚线标注 chunk 边界

**Text Labels**:

- Headline: "WebGL Dynamic (next/dynamic)"
- Labels: "ssr:false", "WebGL2 能力检测", "独立 chunk", "R3F 体系", "原生 WebGL2 体系"

---

## Section 4: 两条 3D 体系对比

**Key Concept**: R3F 和原生 WebGL2 在项目中各司其职，不可互相替代。

**Content**:
| 维度 | R3F 体系 | 原生 WebGL2 体系 |
|------|---------|-----------------|
| 技术栈 | React Three Fiber + drei + @react-three/postprocessing | 手写 GLSL + 手动 program/buffer/uniform |
| 使用场景 | Hero 首页跑车、ModelDemo、CubemapDemo、InstancingDemo | ShaderDemo、TextureDemo、CameraDemo、LightingDemo |
| 渲染方式 | 声明式 React 组件 | 命令式 Canvas API |
| 后处理 | Bloom + SMAA (postprocessing) | 无（教学 Demo 保持简单） |
| 性能降级 | PerformanceMonitor 三级矩阵 (high/mid/low) | 无 |
| 模型格式 | glTF Draco 压缩 (≤3MB) | N/A (运行时生成几何体) |

**Visual Element**:

- Type: split comparison diagram
- Subject: 左右对比两条体系
- Treatment: 左右分栏，R3F 蓝色 vs WebGL2 橙色

**Text Labels**:

- Headline: "两条 3D 体系"
- Left label: "R3F (React Three Fiber)"
- Right label: "原生 WebGL2"

---

## Data Points (Verbatim)

### Statistics

- "4 类组件：Server / Client / WebGL Dynamic / Lazy Load"
- "2 条 3D 体系：R3F + 原生 WebGL2"
- "next/dynamic + ssr:false 确保 WebGL 不进首屏"
- "PerformanceMonitor 三级：high/mid/low"
- "Draco 压缩后 ≤ 3MB"

### Key Terms

- **RSC**: React Server Components，服务端渲染的 React 组件
- **next/dynamic**: Next.js 代码分割 API，支持懒加载 + SSR 禁用
- **R3F**: React Three Fiber，声明式 Three.js React 封装
- **drei**: R3F 生态工具库 (Environment/OrbitControls/PerformanceMonitor)
- **GLSL**: OpenGL Shading Language，着色器编程语言

---

## Design Instructions

### Style Preferences

- 扁平矢量风格 (corporate-memphis)
- 四类组件用四种颜色区分 (蓝/绿/紫/橙)
- 干净的几何形状
- 虚线标注边界

### Layout Preferences

- 组件爆炸图 (structural-breakdown exploded variant)
- 中心向外展开
- 每种类型一个独立区域
- 标注线和说明文字

### Other Requirements

- 中文标注
- 尺寸：横版 16:9 (landscape)
- 两条 3D 体系用对比表格展示
