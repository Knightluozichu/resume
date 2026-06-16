# remuse 全栈技术架构总览

## Overview

remuse Shader教学网站六层全栈架构全景图：从用户浏览器经 nginx 反向代理、Next.js Standalone 服务器、MDX 编译管线、组件体系，到最终 Git CMS 素材源，展示每一层的核心技术选型与职责分工。

## Learning Objectives

The viewer will understand:

1. remuse 的六层架构如何从浏览器贯通到内容源
2. 每层使用的核心技术及选型理由
3. SSG 全静态架构的构建-部署闭环

---

## Section 1: Layer 6 — 用户浏览器

**Key Concept**: 最终用户接触的渲染层，包含 Server Component 产出的静态 HTML 和 Client Component 的水合交互。

**Content**:

- 章节正文区：Server Component 直出 HTML，零 JS 体积
- 左侧章节导航树：Client Component，usePathname 高亮当前章
- 右侧本页目录：Client Component，IntersectionObserver 滚动高亮
- WebGL2 交互 Demo：next/dynamic + ssr:false 懒加载，不进首屏
- R3F 3D 场景：Ferrari 跑车模型，PBR 材质 + Bloom 后处理
- 搜索浮层：pagefind WASM (~50KB)，⌘K 唤起

**Visual Element**:

- Type: browser window illustration
- Subject: 浏览器视口内的三栏布局（左侧导航240px/正文72ch/右侧目录200px）+ Hero 3D 画布
- Treatment: 蓝图风格线框，用标注线指向各区域

**Text Labels**:

- Headline: "Layer 6: 浏览器渲染层"
- Labels: "静态 HTML (Server)", "Client 水合", "WebGL2 Canvas (dynamic)", "pagefind 搜索"

---

## Section 2: Layer 5 — nginx 反向代理

**Key Concept**: SSL 终止 + 静态资源缓存 + 多站点共存路由。

**Content**:

- HTTPS 443 → 反向代理 127.0.0.1:3100
- SSL 证书：DNSPod 自动验证
- 同机共存 love/h5/wechat 等站点，仅新增 vhost，不动现有配置
- 静态资源缓存策略

**Visual Element**:

- Type: network node icon
- Subject: nginx 服务器图标，标注端口映射
- Treatment: 蓝图风格齿轮/代理图标

**Text Labels**:

- Headline: "Layer 5: nginx 反向代理"
- Labels: "443 → 3100", "SSL (DNSPod)", "vhost 共存"

---

## Section 3: Layer 4 — Next.js Standalone Server

**Key Concept**: pm2 守护的 Node.js 进程，纯 SSG 全静态预渲染。

**Content**:

- Next.js 16.2.9 App Router + TypeScript
- output: "standalone" — 自包含 Node.js 服务器
- pm2 fork 模式，max 512M 内存限制
- generateStaticParams() 枚举所有非草稿章节
- dynamicParams: false — 禁止运行时动态路由
- 4 个路由：/ | /learn | /learn/[...slug] | /review

**Visual Element**:

- Type: server block diagram
- Subject: Node.js 服务器处理路由请求
- Treatment: 蓝图风格服务器机箱图标，路由分叉示意

**Text Labels**:

- Headline: "Layer 4: Next.js Standalone Server"
- Labels: "pm2 fork", "max 512M", "SSG only", "4 routes"

---

## Section 4: Layer 3 — MDX 内容编译管线

**Key Concept**: 从 .mdx 源文件到最终 HTML 的完整编译管道，构建期一次性执行。

**Content**:

- content/\*.mdx 源文件 → gray-matter 解析 frontmatter
- compileMDX() 编译：注入 70+ MDX 教学组件
- remark 插件：remarkMath (KaTeX 数学) + remarkGfm (表格/任务列表)
- rehype 插件：rehypePrettyCode (shiki github-dark 代码高亮) + rehypeKatex (公式渲染) + rehypeCollectHeadings (提取标题供 TOC) + rehypeSlug (锚点 ID)
- src/lib/content.ts：章节树构建 + 排序 + 上/下一章导航

**Visual Element**:

- Type: pipeline flow diagram
- Subject: .mdx → gray-matter → compileMDX → HTML
- Treatment: 蓝图风格管道/箭头，每个阶段标注插件

**Text Labels**:

- Headline: "Layer 3: MDX 编译管线"
- Labels: "gray-matter", "compileMDX", "shiki", "KaTeX", "70+ components"

---

## Section 5: Layer 2 — 组件体系

**Key Concept**: Server/Client/WebGL-Dynamic/Lazy 四类组件的精确边界划分。

**Content**:

- Server Components：根布局、SiteHeader/Footer、MDX 纯展示组件、content.ts 扫描
- Client Components：章节导航 (usePathname)、本页 TOC (IntersectionObserver)、交互组件 (CodeTabs/Exercises/Stepper)
- WebGL Dynamic：next/dynamic(() => import(...), { ssr: false }) — ShaderDemo、TextureDemo、CameraDemo 等
- Lazy Load：搜索浮层 (pagefind WASM)、评论 (giscus)、复习系统 (Leitner 盒)
- 两条 3D 体系：R3F (React Three Fiber + drei) vs 原生 WebGL2 (手写 GLSL)
- DESIGN.md Token 体系：10 个色彩 token → globals.css → Tailwind utilities

**Visual Element**:

- Type: component boundary diagram
- Subject: 四类组件用不同颜色的边框区分
- Treatment: 蓝图风格分区，虚线标注 Server/Client 边界

**Text Labels**:

- Headline: "Layer 2: 组件体系 & RSC 边界"
- Labels: "Server", "Client", "WebGL Dynamic", "Lazy Load"

---

## Section 6: Layer 1 — Git CMS 素材源

**Key Concept**: Git 即 CMS，零数据库，内容与规范文档同仓管理。

**Content**:

- content/learnopengl/ — MDX 章节源文件（入门/光照/模型加载/高级OpenGL 四大 section）
- public/ — 3D 模型 (ferrari.glb Draco压缩≤3MB)、纹理、pagefind 搜索索引
- docs/ — 章节模板 (chapter-template.mdx)、内容规范 (chapter-spec.md)
- PLAN.md — 6 个里程碑 (M0-M6)
- DESIGN.md — 视觉设计总纲
- local.env — 服务器密钥 (.gitignored)

**Visual Element**:

- Type: folder/file tree
- Subject: 仓库目录结构
- Treatment: 蓝图风格文件夹图标

**Text Labels**:

- Headline: "Layer 1: Git CMS & 素材源"
- Labels: "content/ (MDX)", "public/ (3D/纹理)", "docs/ (规范)", "DESIGN.md"

---

## Data Points (Verbatim)

### Statistics

- "Next.js 16.2.9 + React 19.2.4 + TypeScript"
- "10 个 DESIGN token 定义全站色彩"
- "70+ MDX 教学组件"
- "27+ 章节已完成 (入门/光照/模型加载/高级OpenGL)"
- "3D 模型压缩后 ≤ 3MB (Draco + KTX2)"
- "pagefind WASM ~50KB"
- "pm2 内存限制 512M"

### Key Terms

- **SSG**: 构建期全静态预渲染，generateStaticParams() 枚举所有路由
- **RSC**: React Server Components，服务端渲染零 JS 下发
- **next/dynamic**: 代码分割 + 懒加载，WebGL 组件不进首屏关键路径
- **R3F**: React Three Fiber，React 声明式 Three.js 封装
- **DESIGN.md**: 全站视觉设计唯一真源，所有颜色/间距/动效时长必须引用其 token

---

## Design Instructions

### Style Preferences

- 深色蓝图工程风格 (technical-schematic blueprint variant)
- 蓝底白线，amber 强调色，技术标注线
- 网格背景，精确几何
- 每层使用不同深浅的蓝色区分层级

### Layout Preferences

- 六层金字塔/堆叠结构
- 从顶 (用户浏览器) 到底 (Git CMS)
- 每层标注技术栈和关键数据
- 层间用箭头展示数据流方向

### Other Requirements

- 中文标注
- 尺寸：横版 16:9 (landscape)
- 高信息密度，不省略关键细节
