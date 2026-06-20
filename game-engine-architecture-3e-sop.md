# 《游戏引擎架构（第三版）》实施 SOP

## 目标

- 基于 `main` 拉出 `codex/game-engine-architecture-3e`。
- 新增 `game-engine-architecture-3e` 书籍：5 篇、17 章、每章配图形化流程、分步动画、交互实验和复习题。
- 放入“图形渲染 / 高级”，承接 3D 数学与 LearnOpenGL。

## Issue 单

- GEA3-01：书籍注册、学习路径、section 顺序。
- GEA3-02：新增 `EngineArchLab` 交互解剖图组件，复用 `animotor.ts`。
- GEA3-03：完成 Foundations 与 Low-Level Engine Systems。
- GEA3-04：完成 Graphics / Motion / Sound。
- GEA3-05：完成 Gameplay 与 Conclusion。
- GEA3-06：接入 17 章复习题与 review scope。
- GEA3-07：代码审查、教学审查、修复闭环、合并 main。

## 验收线

- 每章必须包含：知识点清单、目标、主交互图、分步动画、核心概念、误区、练习、名词解释、出处。
- 少文字重图：每章至少 1 个 `EngineArchLab` 主图 + 1 个 `Stepper` 三步动画。
- 复习：每章至少 3 题，章节页可跳转 `?chapter=gea3-*`。
- 验证：`pnpm mdx-check`、定向 ESLint、`pnpm build`。

