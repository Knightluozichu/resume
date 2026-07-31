# 内容保护审计报告：pbrt-book

- 基线：1955146c742e
- 风险等级：**P0**
- 基线文件数：16
- 当前文件数：16
- 变更文件数：30
- 整书模板替换：否

## 风险原因
- 大量标题消失（16 个 H2 缺失，16 个知识单元 removed）
- 代码块大幅减少（丢失 14 个）

## 汇总统计
| 指标 | 数值 |
|------|------|
| 模板替换文件数 | 0 |
| H2 缺失文件数 | 2 |
| 代码块丢失文件数 | 2 |
| 图片丢失文件数 | 0 |
| 练习丢失文件数 | 0 |
| 总缺失 H2 | 16 |
| 总丢失代码块 | 14 |
| 总丢失图片 | 0 |
| 总丢失练习 | 0 |
| 总 removed 知识单元 | 16 |
| 正文长度变化 | +3003 |

## 逐文件详情
### content/pbrt-book/01-foundations/pbt-ch01-introduction.mdx
- 变更类型：M
- 缺失 H2：为什么需要Introduction、核心概念、工作流程、关键 API、常见陷阱、性能考量、验证层检查、本章要点
- 新增 H2：从一个像素样本开始、来源、版本与重写边界、六个检查词、原版单元、机制与边界、先预测，再操作三个章专属实验、最小可重现实验、练习与答案、本章回顾、阅读导航
- 代码块：8 → 1（丢失 7）
- 图片：0 → 0（丢失 0）
- 练习：4 → 5（丢失 0）
- 表格行：7 → 0
- 正文长度：5040 → 6184
- **removed 知识单元**：为什么需要Introduction、核心概念、工作流程、关键 API、常见陷阱、性能考量、验证层检查、本章要点

### content/pbrt-book/01-foundations/pbt-ch02-geometry.mdx
- 变更类型：D
- 代码块：8 → undefined（丢失 undefined）
- 图片：0 → undefined（丢失 undefined）
- 练习：1 → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/01-foundations/pbt-ch02-monte-carlo.mdx
- 变更类型：A
- 代码块：undefined → undefined（丢失 undefined）
- 图片：undefined → undefined（丢失 undefined）
- 练习：undefined → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/01-foundations/pbt-ch03-geometry.mdx
- 变更类型：A
- 代码块：undefined → undefined（丢失 undefined）
- 图片：undefined → undefined（丢失 undefined）
- 练习：undefined → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/01-foundations/pbt-ch03-shapes.mdx
- 变更类型：D
- 代码块：8 → undefined（丢失 undefined）
- 图片：0 → undefined（丢失 undefined）
- 练习：1 → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/01-foundations/pbt-ch04-acceleration.mdx
- 变更类型：D
- 代码块：8 → undefined（丢失 undefined）
- 图片：0 → undefined（丢失 undefined）
- 练习：1 → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/01-foundations/pbt-ch04-radiometry.mdx
- 变更类型：A
- 代码块：undefined → undefined（丢失 undefined）
- 图片：undefined → undefined（丢失 undefined）
- 练习：undefined → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/02-sampling/pbt-ch05-cameras.mdx
- 变更类型：M
- 缺失 H2：为什么需要Cameras and Film、核心概念、工作流程、关键 API、常见陷阱、性能考量、验证层检查、本章要点
- 新增 H2：从一个像素样本开始、来源、版本与重写边界、六个检查词、原版单元、机制与边界、先预测，再操作三个章专属实验、最小可重现实验、练习与答案、本章回顾、阅读导航
- 代码块：8 → 1（丢失 7）
- 图片：0 → 0（丢失 0）
- 练习：4 → 5（丢失 0）
- 表格行：7 → 0
- 正文长度：5049 → 6908
- **removed 知识单元**：为什么需要Cameras and Film、核心概念、工作流程、关键 API、常见陷阱、性能考量、验证层检查、本章要点

### content/pbrt-book/02-sampling/pbt-ch06-sampling.mdx
- 变更类型：D
- 代码块：8 → undefined（丢失 undefined）
- 图片：0 → undefined（丢失 undefined）
- 练习：1 → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/02-sampling/pbt-ch06-shapes.mdx
- 变更类型：A
- 代码块：undefined → undefined（丢失 undefined）
- 图片：undefined → undefined（丢失 undefined）
- 练习：undefined → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/02-sampling/pbt-ch07-acceleration.mdx
- 变更类型：A
- 代码块：undefined → undefined（丢失 undefined）
- 图片：undefined → undefined（丢失 undefined）
- 练习：undefined → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/02-sampling/pbt-ch07-radiometry.mdx
- 变更类型：D
- 代码块：8 → undefined（丢失 undefined）
- 图片：0 → undefined（丢失 undefined）
- 练习：1 → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/02-sampling/pbt-ch08-sampling.mdx
- 变更类型：A
- 代码块：undefined → undefined（丢失 undefined）
- 图片：undefined → undefined（丢失 undefined）
- 练习：undefined → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/03-reflection/pbt-ch08-bxdf.mdx
- 变更类型：D
- 代码块：8 → undefined（丢失 undefined）
- 图片：0 → undefined（丢失 undefined）
- 练习：1 → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/03-reflection/pbt-ch09-materials.mdx
- 变更类型：D
- 代码块：8 → undefined（丢失 undefined）
- 图片：0 → undefined（丢失 undefined）
- 练习：1 → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/03-reflection/pbt-ch09-reflection.mdx
- 变更类型：A
- 代码块：undefined → undefined（丢失 undefined）
- 图片：undefined → undefined（丢失 undefined）
- 练习：undefined → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/03-reflection/pbt-ch10-textures-materials.mdx
- 变更类型：A
- 代码块：undefined → undefined（丢失 undefined）
- 图片：undefined → undefined（丢失 undefined）
- 练习：undefined → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/03-reflection/pbt-ch10-textures.mdx
- 变更类型：D
- 代码块：8 → undefined（丢失 undefined）
- 图片：0 → undefined（丢失 undefined）
- 练习：1 → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/04-transport/pbt-ch11-volume-scattering.mdx
- 变更类型：A
- 代码块：undefined → undefined（丢失 undefined）
- 图片：undefined → undefined（丢失 undefined）
- 练习：undefined → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/04-transport/pbt-ch11-volume.mdx
- 变更类型：D
- 代码块：8 → undefined（丢失 undefined）
- 图片：0 → undefined（丢失 undefined）
- 练习：1 → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/04-transport/pbt-ch12-light-sources.mdx
- 变更类型：A
- 代码块：undefined → undefined（丢失 undefined）
- 图片：undefined → undefined（丢失 undefined）
- 练习：undefined → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/04-transport/pbt-ch12-lights.mdx
- 变更类型：D
- 代码块：8 → undefined（丢失 undefined）
- 图片：0 → undefined（丢失 undefined）
- 练习：1 → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/05-integration/pbt-ch13-monte-carlo.mdx
- 变更类型：D
- 代码块：8 → undefined（丢失 undefined）
- 图片：0 → undefined（丢失 undefined）
- 练习：1 → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/05-integration/pbt-ch13-surface-transport.mdx
- 变更类型：A
- 代码块：undefined → undefined（丢失 undefined）
- 图片：undefined → undefined（丢失 undefined）
- 练习：undefined → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/05-integration/pbt-ch14-surface-transport.mdx
- 变更类型：D
- 代码块：8 → undefined（丢失 undefined）
- 图片：0 → undefined（丢失 undefined）
- 练习：1 → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/05-integration/pbt-ch14-volume-transport.mdx
- 变更类型：A
- 代码块：undefined → undefined（丢失 undefined）
- 图片：undefined → undefined（丢失 undefined）
- 练习：undefined → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/05-integration/pbt-ch15-volume-transport.mdx
- 变更类型：D
- 代码块：8 → undefined（丢失 undefined）
- 图片：0 → undefined（丢失 undefined）
- 练习：1 → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/05-integration/pbt-ch15-wavefront-gpu.mdx
- 变更类型：A
- 代码块：undefined → undefined（丢失 undefined）
- 图片：undefined → undefined（丢失 undefined）
- 练习：undefined → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/05-integration/pbt-ch16-retrospective.mdx
- 变更类型：A
- 代码块：undefined → undefined（丢失 undefined）
- 图片：undefined → undefined（丢失 undefined）
- 练习：undefined → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined

### content/pbrt-book/05-integration/pbt-ch16-system.mdx
- 变更类型：D
- 代码块：8 → undefined（丢失 undefined）
- 图片：0 → undefined（丢失 undefined）
- 练习：1 → undefined（丢失 undefined）
- 表格行：undefined → undefined
- 正文长度：undefined → undefined
