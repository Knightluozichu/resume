# DESIGN.md — 视觉与动效语言

> 一次决定，全站遵守。改这里 = 改全站。所有颜色/间距/时长必须引用本文件 token，代码中出现魔法数字 = review 打回。

## 设计气质

关键词：**深空感、精密仪器、克制的炫**。
像一间深夜的图形实验室：背景近黑，内容高对比，全站唯一允许"炫"的地方是 WebGL 画布和强调色辉光。
气质参照：Linear / Vercel 的暗色纪律 + Shadertoy 的画布感 + Stripe 的排版克制。

## 色彩 Token（暗色为唯一主题，v1 不做亮色）

| Token | 值 | 用途 |
|---|---|---|
| `--bg` | `#0A0A0F` | 页面底色（近黑微紫） |
| `--bg-elevated` | `#12121A` | 卡片 / 侧边栏 / Demo 容器 |
| `--border` | `#26262F` | 1px 分隔线 |
| `--text-primary` | `#EDEDF2` | 正文 |
| `--text-secondary` | `#9B9BA8` | 次要说明 / 图注 |
| `--accent` | `#7C5CFF` | 品牌紫：链接 / 选中态 / 辉光 |
| `--accent-glow` | `#7C5CFF33` | 辉光、focus ring |
| `--code-bg` | `#0D1117` | 代码块（与 shiki github-dark 一致） |
| 语义色 | 绿 `#3FB97F` / 黄 `#E5B567` / 红 `#E5675C` | 成功 / 警告 / 错误，仅小面积 |

规则：accent 只准小面积使用（文字、线条、辉光），大面积紫色色块禁止；正文对比度 ≥ 7:1。

## 字体

- 中文正文：system-ui 栈（PingFang SC 优先），**不引入中文 webfont**（体积红线）
- 英文 / 标题：Inter（variable，仅 latin 子集）
- 代码：JetBrains Mono，ligatures 关闭
- 字号阶梯（×1.25 模数）：12.8 / 16 / 20 / 25 / 31.25 / 39px；正文 16px，行高 1.75
- 章节正文栏宽 ≤ 72ch

## 间距与布局

- 间距只用 4 的倍数：4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96
- 章节页三栏：左侧章节树（240px，可折叠）/ 正文（max 72ch）/ 右侧本页目录（200px，lg 以下隐藏）
- 圆角：控件 8px，卡片 12px
- **阴影禁用**——层级靠 border + 背景明度区分（暗色主题下阴影不可见，只会发灰）

## 动效原则（动画设计总纲）

1. **功能动效**（UI 过渡）：时长只有三档——`120ms`（hover）/ `200ms`（展开折叠）/ `320ms`（页面级）；缓动统一 `cubic-bezier(0.22, 1, 0.36, 1)`；只动 `opacity` 和 `transform`
2. **教学动效**（可视化演示）：不受三档限制，但必须**可暂停、可单步、可拖动进度**——教学动画是教具不是装饰，看不清的动画等于没做
3. **辉光**：只出现在 WebGL 画布（Bloom 后处理）和 accent 元素 hover（CSS 用 `--accent-glow` 的 box-shadow）
4. `prefers-reduced-motion`：功能动效全部降为瞬时；教学动效默认暂停态加载
5. 首页跑车 Hero 是全站唯一允许"满配特效"的场景

## 组件气质速查

- 按钮：ghost 为主（border + hover 亮起）；实心 accent 按钮每屏 ≤ 1 个
- 代码块：shiki github-dark + 文件名标签 + 复制按钮 + 语言 Tab（C++ / GLSL / WebGL2-TS）
- 交互 Demo 容器：统一卡片（`--bg-elevated` + 1px border + 12px 圆角），左上角"⚡ 可交互"标签，右上角重置按钮
- KaTeX：display 公式居中独立成块，行内公式与正文同色不加背景
