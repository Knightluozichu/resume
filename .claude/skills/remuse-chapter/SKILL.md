---
name: remuse-chapter
description: 撰写/打磨 remuse Shader 教学网站的一篇章节（MDX）。当需要新建或完善 content/learn 下的教学章节、把草稿章打磨到可发布、或按 LearnOpenGL 顺序产出下一章时使用。封装「总监—施工」章节流程：知识点先行→九段式→每知识点配 viz→Term/Glossary→draft→审查→老板验收发布。
---

# remuse 章节撰写 skill

把一篇教学章节从选题做到「可发布草稿」的标准流程。**模板是骨架，docs/chapter-spec.md 是法律**；本 skill 是把法律落成可执行步骤。

## 角色与红线
- 总监（主会话）：拆任务卡、派施工 subagent、**读源码审查 + 真 GPU 验 demo**、把关红线。不亲自写章节实现。
- 施工 subagent：按本流程写 .mdx + 必要的图示组件。
- **硬规则 7：`draft: false` 必须经老板验收内容后才设**。subagent 一律产出 `draft: true`，总监审查通过后置 In Review，老板拍板才发布 + 部署。

## 章节类型（先定型，再写）
归入一型，决定各段强度与主 Demo（见 chapter-spec §〇矩阵）：
- **A 概念型**（你好窗口、深度测试）：概念讲解为重心；主 viz `<PipelineViz>`/示意图
- **B 数学型**（变换、坐标系统、摄像机）：数学+几何直觉为重心；主 viz `<MathViz>`
- **C 实战型**（你好三角形、着色器、纹理、模型加载）：代码实现为重心；主 viz `<ShaderDemo editable>`
- **D 对比型**（Phong vs Blinn-Phong）：方案差异；主 viz `<CompareSlider>`

## 流程（subagent 按此施工）
1. **读法律**：docs/chapter-spec.md（按 type 调强度矩阵 + 逐节约束）、docs/chapter-template.mdx、本章 LearnOpenGL 中文版 sourceUrl、DESIGN.md、既有发布章（content/learn/getting-started/hello-window.mdx）作范例。
2. **知识点清单先行**（chapter-spec §〇）：动笔前在文件顶部单行 JSX 注释里列出本章全部知识点/术语，每条标 viz 形态（图/动画/交互/比喻/代码对照）；难啃的必须动画掰碎；陌生名词进 Glossary。
3. **写九段式 .mdx**（content/learn/<section-slug>/<chapter-slug>.mdx）：
   - frontmatter：title / type(A|B|C|D) / section / order / description / demo / math / draft:true / sourceUrl
   - ①学习目标 `<Objectives>`（可检验动词；A 型含「管线位置」，B「能推导」，C「能改出」，D「何时用哪个」；末条检验问题）
   - ②直觉引入（≤3 段、零术语、类比四库选一：空间地图/工厂流水线/相机摄影/光与材质；回答 解决什么+没有它会怎样）
   - ③概念讲解（一节一概念；术语首现 `<Term def>` 高亮；每概念配图/Demo；新核心概念 ≤5）
   - ④数学推导（math:false 则整节删；每公式后人话翻译；不跳步；KaTeX）
   - ⑤交互 Demo（按 type 选主 viz；「猜一猜」引导；控件 ≤5；重置；**Stepper 概念步每步必带图示**）
   - ⑥代码对照 `<CodeTabs><Tab>`（C++/OpenGL ↔ TS/WebGL2 同逻辑段；单块 ≤30 行；块间有解说；API 差异 `<Callout type=warn>`）
   - ⑦常见误区 `<Callout type=trap>`（A/B/D ≥2、C ≥3；现象→原因→修法）
   - ⑧小结 + `<Exercises><Answer>`（小结呼应目标；含 1 改 Demo 题；答案折叠）
   - ⑨`<Attribution />`（空标签，sourceUrl 自动注入）
   - ⑩`## 名词解释` + `<Glossary><GlossaryItem term>`（与正文 Term 一一对应；零基础大白话）
4. **风格**：小白友好、循序渐进（大量类比/图示/动画，假设零基础，掰碎直观，啃得动优先）。
5. **自检**：对照 chapter-spec 按 type 矩阵逐节 pass/fail；Term↔Glossary 数量一一对应；`pnpm build / lint / format:check / tsc` 零 warning。

## 组件工具箱（.mdx 直接可用，已注入 mdx-components）
Shader：`<ShaderDemo frag={`...`} editable uniforms controls>`（实时渲染/在线改 GLSL/uniform 控件）。数学：`<MathViz mode>`。流程：`<PipelineViz>`。对比：`<CompareSlider>`。通用：`<Stepper><Step>`、`<Figure>`、`<DemoStage><Slider><Toggle>`。内容：`<Objectives>`/`<CodeTabs><Tab>`/`<Callout type=tip|warn|trap>`/`<Exercises><Answer>`/`<Term def>`/`<Glossary><GlossaryItem term>`/`<Attribution/>`。

## MDX 坑（务必避开，踩过）
1. **复杂 SVG/可视化一律做成组件**（如 SetupPipelineDiagram/FrameStageDiagram，放 src/components/mdx/diagrams/ 并注册 map），**绝不在 .mdx 内联多行 `<svg>` + 紧邻松散文字**——会 hydration mismatch（MDX 块/行内歧义）。
2. JSX 注释写**单行**（多行被 prettier-MDX 破坏）。
3. 行内 `<Term>` 写在句中（前面有引导词），避免 prettier 重排成块级。
4. ShaderDemo 的 frag 用 `{`...`}` 模板字符串表达式传（依赖 page.tsx blockJS:false）。
5. 占位图别用 hero-poster 跑车图当示意图——做真 SVG 示意图组件。

## 总监验收（主会话，真 GPU）
1. 读 .mdx + 新增组件源码：spec 逐节 pass/fail、token 化无裸 hex、Term↔Glossary 对应、无内联复杂 SVG。
2. 真 GPU（puppeteer headful + 系统 Chrome，见 scripts/shot.mjs；草稿章 dev 可见）验证：demo 渲染/交互、Stepper 步图、无 hydration/console 报错（关缓存 fresh-load 抓 pageerror）。
3. 全 pass → Linear 置 In Review + 留审查评论 → **交老板验收内容** → 老板点头才 `draft:false` + 部署。打回则回 In Progress 修。

## 发布（老板验收后）
设 draft:false → `pnpm build` 确认章进 SSG → `git commit`（引用 issue）→ push → `./deploy.sh` → 线上 curl 200 验证 + 草稿章应 404。
