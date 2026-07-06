# 汽车体系可视化学习工程：项目侦察报告

## 当前阶段

Phase 1：项目侦察。

## 项目结构

- 当前仓库：`/Users/luozichu/Repositories/learn/remuse`
- 内容目录：`content/<book-slug>/<section-slug>/<chapter-slug>.mdx`
- 章节路由：`/learn/[bookSlug]/[sectionSlug]/[chapterSlug]`
- 章节索引：`src/lib/content.ts`
- MDX 组件注册：`src/components/mdx/mdx-components.tsx`
- 可视化组件目录：`src/components/mdx/diagrams`、`src/components/mdx/demos`、`src/components/mdx/anim`
- 本项目新增汽车组件目录：`src/components/mdx/auto`

## 技术栈

- Next.js 16 App Router
- React 19
- MDX：`next-mdx-remote/rsc`
- 样式：Tailwind CSS 4 + 项目 DESIGN token
- 动画依赖：`animejs`
- 3D/图形依赖：`three`、`@react-three/fiber`、`@react-three/drei`
- 构建工具：`pnpm build`
- 内容检查：`pnpm mdx-check`
- lint：`pnpm lint`

## 路由与页面结构

- `src/app/learn/[...slug]/page.tsx` 只接受三段 slug。
- `generateStaticParams` 从 `getAllChapters` 扫描 MDX 内容。
- 开发环境包含 `draft: true` 页面，生产构建过滤草稿。
- `ChapterShell` 正文宽度上限为 `72ch`，汽车章节需要用横向 SVG、卡片和交互区控制文字密度。

## 已有图解组件

项目已经有大量 SVG/React 图解组件，常见形态包括：

- 静态 SVG 结构图
- 对比图
- 流程图
- 可点击/可调参数的 client 交互
- 章节专属复合 Lab 组件

可复用策略：

- 汽车体系用专属 `src/components/mdx/auto`，避免把汽车业务状态塞进通用 diagram。
- 复用现有 DESIGN token、卡片边框、`not-prose` 容器、响应式 SVG 模式。
- 后续每章尽量用数据驱动组件，而不是每章复制一份大 SVG。

## 已有动画组件

发现已有教学动画原语：

- `src/components/mdx/anim/use-teaching-timeline.ts`
- `src/components/mdx/anim/timeline-controls.tsx`

它已经支持：

- 暂停
- 播放
- 上一步/下一步
- 拖动进度
- 当前步骤高亮
- reduced motion 处理

结论：汽车机械动画应优先复用或延续这套“可控教学动画”设计，不新增大型动画框架。

## animation.js / animator.js / animotor.js 检查

已检查仓库，未发现：

- `animation.js`
- `animator.js`
- `animotor.js`

因此不需要兼容旧动画文件。

## 交互组件现状

项目已有：

- `controls.tsx` 的 Slider/Toggle/DemoStage
- 多个 demos 目录下的 client playground
- Android/AI/Unity 等书的专属交互组件

汽车项目采用同样方式：MDX 写教学叙事，React client 组件承载图解、动画、参数交互和小测反馈。

## 测试与验收能力

可用命令：

- `pnpm mdx-check`
- `pnpm lint`
- `pnpm build`
- `pnpm svg-check`，后续需把汽车页面加入检查清单后才可作为强证据。

## 材料状态

当前可用材料只有用户贴出的预读目录、产品目标和章节要求。未在仓库或附件中发现可直接读取的 PDF、书籍原文 Markdown、章节笔记或目录截图。

处理策略：

- 建立目录驱动工程框架。
- 所有章节标记为 `content_missing`。
- 不复制或伪造原书正文。
- 内容只做原创化教学设计、系统结构拆解和图解化转译。

## 风险

- 原书材料缺失，不能声称已经覆盖原书全部细节。
- 目前工作区已有其他书籍未提交改动，本项目需要严格限定改动范围。
- 汽车章节多、图解多，后续应章节线性推进，避免做成一个泛化大组件套全部章节。

## 结论

允许进入 Phase 2：材料结构确认与目录驱动学习地图设计。
