# 《游戏和图形学的 3D 数学》实施 SOP

## 目标

- 基于 `main` 拉出 `codex/3d-math-book-experience`。
- 新增 `game-math-3d` 书籍：14 章、3 个篇章、每章一套少文字重图/动画/交互的教学结构。
- 每章配复习题，并接入 `/review` 题库。

## 验收线

- 每章必须包含：学习目标、知识点清单、直觉引入、可视化组件、分步动画、误区、练习、名词解释、出处。
- 图形/动画优先使用 `GameMathLab` + `Stepper`，避免纯文字步骤。
- 代码审查：`pnpm lint`、`pnpm mdx-check`、`pnpm build`。
- 教学审查：章节结构、图文比例、交互可用性、移动端自适应。

## Issue 单

- GM3D-01：书籍注册与学习路径接入。
- GM3D-02：新增 GameMathLab / animotor 动画组件。
- GM3D-03：完成 14 章 MDX 内容。
- GM3D-04：补齐 14 章复习题。
- GM3D-05：总监审核、修复、合并 main。

