# Windows 内核编程章节重写规范（AI 提示词）

> 本文档是给 AI 的完整重写指令。AI 收到本文件后，必须逐条遵守，不得跳过任何约束。
> 违反任意一条 = review 打回。

---

## 一、任务定义

你需要彻底重写《Windows Kernel Programming》（Pavel Yosifovich 著）中文教学网站的某一章。每章重写包含两个交付物：

1. **交互组件**（`.tsx`）：一个基于 SVG 的可交互教学组件
2. **章节 MDX**（`.mdx`）：符合 chapter-spec 规范的完整章节内容

旧内容是模板生成的垃圾（含"、、、、"占位符、无实际教学内容），必须**全部删除重写**，不得保留任何旧内容。

---

## 二、章节类型与强度矩阵

每章按以下类型分类，类型决定各段式的强度（**重**=重心 / **必**=必须有 / **选**=按需 / **省**=可省略）：

| 段式 | A 概念型 | B 数学型 | C 实战型 | D 对比型 |
|---|---|---|---|---|
| 1 学习目标 | 必 | 必 | 必 | 必 |
| 2 直觉引入 | 必 | 必 | 必 | 必 |
| 3 概念讲解 | **重** | 必 | 必 | 必 |
| 4 数学推导 | 省 | **重** | 选 | 选 |
| 5 交互 Demo | 必 | 必 | 必 | 必 |
| 6 代码对照 | 选 | 选 | **重** | 必 |
| 7 常见误区 | ≥2 个 | ≥2 个 | ≥3 个 | ≥2 个 |
| 8 小结练习 | 必 | 必+推导题 | 必+实现题 | 必+选型题 |
| 9 出处声明 | 必 | 必 | 必 | 必 |
| 10 名词解释 | 必 | 必 | 必 | 必 |

Windows 内核编程章节默认为 **C 实战型**（除第1章为 A 概念型）。

---

## 三、MDX 章节结构规范（逐节详解）

### §1 学习目标

- 2-3 条，每条以可检验动词开头：能解释 / 能修改 / 能推导 / 能实现 / 能回答
- **禁用**不可检验动词：了解、熟悉、掌握、理解
- 最后一条必须是具体的检验问题（读完能当场自测）
- C 型必含一条「能改出 ___ 效果」

### §2 直觉引入

- ≤3 段，每段 ≤120 字
- **零术语**——专业名词最早只能出现在第三节
- 必须回答两个问题：这章解决什么问题？没有它会怎样？
- 类比只从四个库中选（整章保持一致，禁止中途换类比体系）：
  - ① 空间与地图（坐标/变换/建筑类）
  - ② 工厂流水线（管线/流程类）
  - ③ 相机与摄影（观察/投影类）
  - ④ 光与材质（光照/PBR 类）

### §3 概念讲解

- 一小节只讲一个概念；讲不完就拆小节
- 术语首现用 `<Term def="一句话释义">术语</Term>` 高亮，并在正文展开
- 同一术语同时进章末名词解释（§10）
- 每个概念至少配一张图示，或一个指向第五节 Demo 的引用
- 单小节 ≤500 字
- 全章新概念 ≤5 个，超出 = 章节必须拆分
- 讲解顺序固定：是什么 → 为什么需要 → 在系统中的位置
- C 实战型可把"是什么"压缩至一段，篇幅让给第六节

### §4 数学推导

- 无数学的章节整节省略，frontmatter 标 `math: false`
- 禁止为凑结构硬写数学

### §5 交互 Demo

- Demo 前必有一句"猜一猜：把 ___ 调大会发生什么？"
- 可调控件 ≤5 个
- 必有重置按钮
- 初始参数必须开箱即展示本章核心效果
- 在此处嵌入交互组件 `<ComponentName />`

### §6 代码对照（C 型核心）

- C 实战型逐段讲解，覆盖 ≥80% 关键代码
- 单个代码块 ≤30 行
- 两个代码块禁止直接相邻，之间必须有解说文字
- 用 `<CodeTabs>` + `<Tab>` 两个 Tab 展示**同一逻辑段**的两种视角
  - Tab 1: C/C++ 内核代码
  - Tab 2: 概念流程 / 用户模式客户端代码
- API 差异点首次出现用 `<Callout type="warn">` 标注
- 完整可运行源码以章末链接提供，正文只放讲解段

### §7 常见误区

- C 型 ≥3 个
- 固定三行格式：**现象 →** **原因 →** **修法**
- 每个 ≤150 字
- 至少 1 个让读者能亲眼看翻车

### §8 小结与练习

- 小结 ≤5 条 bullet，每条 ≤40 字
- 小结必须与第一节学习目标**一一呼应**（有目标未被回收 = 打回）
- 练习 2-3 题，C 型必含 1 道独立实现题
- 答案放 `<Answer>` 折叠组件内，默认收起

### §9 出处声明

- 章末固定位置
- 用 `<Attribution>` 组件统一渲染，禁止手写变体
- 属性格式：
  ```jsx
  <Attribution
    mode="independent-rewrite"
    sourceBasis="authorized-sample"
    workTitle="Pavel Yosifovich《Windows Kernel Programming》与李亮译《Windows内核编程》"
    adaptedUrl="https://leanpub.com/windowskernelprogramming"
  />
  ```

### §10 名词解释（Glossary）

- 章末（出处声明之前）
- 用 `<Glossary>` + `<GlossaryItem term="...">大白话释义</GlossaryItem>`
- **覆盖要求**：正文首现、用 `<Term>` 高亮过的每个专业名词，必须有对应词条（漏一个 = 打回）
- 释义面向零基础：一句话能懂的大白话 + 必要时一句类比
- 避免用更难的术语解释术语

---

## 四、MDX 文件结构模板

```mdx
---
title: "第X章 章节标题"
type: C
section: "分区名"
order: X
description: "一句话描述本章内容（禁止写'覆盖X个本页目录坐标'等元描述）"
demo: true
math: false
sourceUrl: "https://leanpub.com/windowskernelprogramming"
draft: false
qualityVersion: 2
practiceMode: "simulation"
sourceMode: "independent-rewrite"
officialUnitId: "wkp-unit-XX"
---

import {
  Objectives,
  Term,
  Callout,
  Stepper,
  Step,
  Exercises,
  Answer,
  Glossary,
  GlossaryItem,
  Attribution,
  CodeTabs,
  Tab,
} from "@/components/mdx/mdx-components";
import { ComponentName } from "@/components/mdx/windows-kernel-programming/v2/component-name";

{/* 知识点清单（动笔前先摊开，每条标 viz 形态；全部知识点均配 viz，术语首现 Term 高亮、章末 Glossary 一一对应）：
  1) 知识点A = SVG 中的什么形态（可点击/可交互/图示）
  2) 知识点B = SVG 中的什么形态
  ...
  全章新概念 N 个（≤5 限制）。
*/}

{/* 1. 学习目标 */}

<Objectives>

- 能XXX...
- 能XXX...
- 能回答：XXX？

</Objectives>

{/* 2. 直觉引入 */}

## 为什么XXX

（≤3段×≤120字，零术语，类比）

{/* 3. 概念讲解 */}

## 概念A

<Term def="释义">术语A</Term> 正文...

## 概念B

<Term def="释义">术语B</Term> 正文...

{/* 4. 数学推导：math:false 省略 */}

{/* 5. 交互 Demo */}

## 动手：XXX

引导文字...

> 猜一猜：把 XXX 会怎样？

<ComponentName />

{/* 6. 代码对照（C型核心） */}

## 代码对照：XXX

解说文字...

<CodeTabs>
  <Tab label="C / 内核代码">

```c
// 代码 ≤30 行
```

  </Tab>
  <Tab label="概念流程 / 用户模式">

```text
// 同一逻辑的另一种视角
```

  </Tab>
</CodeTabs>

<Callout type="warn">
  API 差异标注...
</Callout>

{/* 7. 常见误区 */}

## 容易踩的坑

<Callout type="trap">
  **现象**：XXX **原因**：XXX **修法**：XXX
</Callout>

<Callout type="trap">
  **现象**：XXX **原因**：XXX **修法**：XXX
</Callout>

<Callout type="trap">
  **现象**：XXX **原因**：XXX **修法**：XXX
</Callout>

{/* 8. 小结与练习 */}

## 小结

- 要点1（呼应目标1）
- 要点2（呼应目标2）
- 要点3（呼应目标3）

<Exercises>

**问题 1：** XXX

<Answer>

答案...

</Answer>

**问题 2：** XXX

<Answer>

答案...

</Answer>

**问题 3（实现题）：** XXX

<Answer>

答案...

</Answer>

</Exercises>

{/* 10. 名词解释 */}

## 术语表

<Glossary>
  <GlossaryItem term="术语A">
    大白话释义...
  </GlossaryItem>
  <GlossaryItem term="术语B">
    大白话释义...
  </GlossaryItem>
</Glossary>

{/* 9. 出处声明 */}

<Attribution
  mode="independent-rewrite"
  sourceBasis="authorized-sample"
  workTitle="Pavel Yosifovich《Windows Kernel Programming》与李亮译《Windows内核编程》"
  adaptedUrl="https://leanpub.com/windowskernelprogramming"
/>
```

---

## 五、交互组件设计规范

### 文件位置
`src/components/mdx/windows-kernel-programming/v2/wkp-XX-组件名-lab.tsx`

### 组件结构（四段式布局）

```tsx
"use client";

import { useState, useCallback } from "react";

// 1. 颜色常量：只准用 CSS 变量，禁止魔法数字
const C = {
  bg: "var(--bg)",
  elevated: "var(--bg-elevated)",
  border: "var(--border)",
  primary: "var(--text-primary)",
  secondary: "var(--text-secondary)",
  accent: "var(--accent)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
} as const;

// 2. 类型定义 + 数据
type Region = "...";
const details: Record<Region, { title: string; content: string }> = { ... };

// 3. 主组件
export function ComponentName() {
  const [selected, setSelected] = useState<Region>("default");
  const [showExtra, setShowExtra] = useState(false);

  const reset = useCallback(() => {
    setSelected("default");
    setShowExtra(false);
  }, []);

  return (
    <div className="not-prose overflow-hidden rounded-card border border-border bg-elevated">
      {/* Header：标题 + 重置按钮 */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-medium" style={{ color: C.primary }}>
          ⚡ 组件标题
        </span>
        <button
          onClick={reset}
          className="rounded-control border border-border px-3 py-1 text-xs transition-colors hover:border-accent"
          style={{ color: C.secondary }}
        >
          重置
        </button>
      </div>

      {/* SVG 交互图 */}
      <div className="p-4">
        <svg viewBox="0 0 720 500" className="w-full" role="img" aria-label="描述">
          {/* SVG 内容 */}
        </svg>

        {/* Detail Panel：选中元素的详细说明 */}
        <div className="mt-4 rounded-control border border-border p-4" style={{ background: C.bg }}>
          <p className="text-sm leading-relaxed" style={{ color: C.secondary }}>
            {details[selected].content}
          </p>
        </div>

        {/* 可选：开关/切换器 */}
        <label className="mt-4 flex cursor-pointer items-center gap-3">
          {/* toggle 实现 */}
        </label>
      </div>
    </div>
  );
}
```

### SVG 布局铁律

| 规则 | 要求 |
|---|---|
| viewBox 宽 | ≥ 660px |
| 四周留白 | ≥ 32px |
| 文字距边界 | ≥ 24px |
| 主标题字号 | 16px |
| 节标题字号 | 13-14px |
| 正文/标签字号 | 11-12px（最小 11px，禁止 <10px） |
| 辅助说明字号 | 10px（仅脚注/图例，每图 ≤2 处） |
| 同层相邻元素间距 | ≥ 8px |
| 上下行距 | ≥ 行高 + 6px |
| 箭头标签距节点边缘 | ≥ 10px |
| 三段式面板间距 | ≥ 20px |

### 颜色语义

| 语义 | CSS 变量 | 用途 |
|---|---|---|
| 页面底色 | `var(--bg)` | 最底层背景 |
| 卡片背景 | `var(--bg-elevated)` | 组件容器、子面板 |
| 分隔线 | `var(--border)` | 边框、普通态描边 |
| 正文 | `var(--text-primary)` | 主要文字 |
| 次要说明 | `var(--text-secondary)` | 图注、说明文字 |
| 品牌紫 | `var(--accent)` | 选中态、高亮、链接 |
| 成功 | `var(--success)` | 正确、已完成、已提交 |
| 警告 | `var(--warning)` | 警告、保留状态 |
| 错误 | `var(--danger)` | 错误、删除、故障 |

**规则**：accent 只准小面积使用（文字、线条、辉光），大面积紫色色块禁止。

### 交互设计要求

- 每个可点击区域用 `<g onClick={() => setSelected("key")} className="cursor-pointer">` 包裹
- 选中态：描边用 `C.accent`、宽度 2px；普通态：描边用 `C.border`、宽度 1px
- 切换器（toggle）用按钮 + transform 实现，不要用 `<input type="checkbox">`
- 所有交互必须有视觉反馈（颜色变化、透明度变化等）

---

## 六、设计 Token 速查

### 颜色

```
--bg:           #0A0A0F  (页面底色，近黑微紫)
--bg-elevated:  #12121A  (卡片/侧边栏/Demo容器)
--border:       #26262F  (1px分隔线)
--text-primary: #EDEDF2  (正文)
--text-secondary: #9B9BA8 (次要说明/图注)
--accent:       #7C5CFF  (品牌紫：链接/选中态/辉光)
--accent-glow:  #7C5CFF33 (辉光、focus ring)
--code-bg:      #0D1117  (代码块)
--success:      #3FB97F  (成功/绿)
--warning:      #E5B567  (警告/黄)
--danger:       #E5675C  (错误/红)
```

### 间距

只用 4 的倍数：4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96

### 圆角

- 控件：8px（`rounded-control`）
- 卡片：12px（`rounded-card`）

### 阴影

**禁用**——层级靠 border + 背景明度区分。

---

## 七、组件注册

写完交互组件后，必须在组件注册表中注册，否则 MDX 无法引用。

编辑 `src/components/mdx/chapter-component-registry.ts`，找到对应章节的条目，将旧组件引用替换为新组件。格式参考已有条目。

---

## 八、绝对禁止清单

1. **禁止占位符**：不得出现"、、、、"或类似的模板占位文本
2. **禁止复制旧内容**：不得保留任何旧版 evidence-lab / version-context / executable-probe / safety-gate 的 import 或使用
3. **禁止魔法颜色值**：不得在代码中出现 `#7C5CFF`、`rgb(...)` 等硬编码颜色，必须用 CSS 变量
4. **禁止 SVG 小字号**：SVG 中不得出现 fontSize < 10px 的文字
5. **禁止无意义元描述**：description 不得写"覆盖X个本页目录坐标"等模板话术
6. **禁止不可检验动词**：学习目标不得用"了解、熟悉、掌握、理解"
7. **禁止术语提前**：直觉引入（§2）中不得出现专业术语
8. **禁止代码块相邻**：两个代码块之间必须有解说文字
9. **禁止 Tab 错位**：CodeTabs 的两个 Tab 必须是同一逻辑段的两种实现
10. **禁止 Glossary 漏词条**：正文 Term 高亮过的每个术语，Glossary 中必须有对应词条

---

## 九、验证清单

写完后必须逐项检查：

### TypeScript 编译
```bash
cd /Users/luozichu/Repositories/learn/remuse && npx tsc --noEmit
```
退出码必须为 0，无任何类型错误。

### 内容自检
- [ ] frontmatter 完整，draft 为 false
- [ ] import 了新的交互组件，删除了所有旧 evidence-lab imports
- [ ] 知识点清单在顶部注释中
- [ ] §1 学习目标 2-3 条，含可检验动词，末条为自测问题
- [ ] §2 直觉引入 ≤3 段 × ≤120 字，零术语
- [ ] §3 概念讲解每概念一节，Term 高亮，≤5 个新概念
- [ ] §5 交互 Demo 有"猜一猜"引导 + 组件引用
- [ ] §6 代码对照（C型核心）≥80% 关键代码，CodeTabs 两Tab同一逻辑段
- [ ] §7 常见误区 ≥3 个（C型），现象→原因→修法格式
- [ ] §8 小结 ≤5 条且与学习目标一一呼应，练习含 1 道实现题
- [ ] §9 Attribution 组件在章末
- [ ] §10 Glossary 覆盖所有 Term 高亮的术语
- [ ] 无占位符、无旧模板内容、无魔法颜色值

### 组件自检
- [ ] "use client" 指令
- [ ] 颜色只用 CSS 变量
- [ ] SVG viewBox ≥ 660px
- [ ] SVG 字号 ≥ 11px（脚注 10px 且 ≤2 处）
- [ ] 有重置按钮
- [ ] 有交互反馈（选中态视觉变化）
- [ ] 在 chapter-component-registry.ts 中注册

---

## 十、交付报告格式

完成后报告：

```
## 完成报告

### 创建/修改的文件
| 文件 | 行数 | 操作 |
|---|---|---|
| 路径 | N | 新建/重写/编辑 |

### tsc 验证
退出码 0，无类型错误。

### 设计要点
- 交互组件：XXX（简述设计）
- MDX 结构：C 型 X 节，X 个 Term，X 个误区，X 道练习
```
