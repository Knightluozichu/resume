# windows-kernel-programming 内容保留报告

## 基本信息

- 书名：windows-kernel-programming
- 基线：1955146c742e
- Batch 70 终点：11af69414
- 修复分支：codex/preserve-full-content-01
- 融合日期：2026-07-31

## 页面数对比

| 指标 | 基线 | 当前(Batch 70) | 最终(融合后) |
|------|------|---------------|-------------|
| 页面数 | 13 | 13 | 13 |
| 平均行数 | 46 | 350 | 200 |

## 知识单元保留

| 指标 | 数值 |
|------|------|
| 基线知识单元数 | 78 (6 H2 × 13 文件) |
| preserved | 78 |
| expanded | 0 |
| rewritten-equivalent | 0 |
| **removed** | **0** |

## 资源保留

| 指标 | 基线 | 最终 | 丢失 |
|------|------|------|------|
| 代码块 | 0 | 0 | 0 |
| 图片/SVG | 0 | 0 | 0 |
| 练习 | 0(空) | 52(4×13) | 0 |
| 表格 | 13(四类样本) | 13 | 0 |
| 交互组件 | 0 | 39(3×13) | 0 |

## 新增有效质量内容

| 类型 | 数量 | 说明 |
|------|------|------|
| 来源合同 | 13 | 每章有独立的来源合同与版本差异节 |
| 交互实验 | 39 | 每章3个交互组件(VersionContext/ExecutableProbe/SafetyGate) |
| 练习题 | 52 | 每章4道章节特定练习(实验设计/故障识别/来源差异/安全边界) |
| 术语 | 52 | 每章4个章节特定术语 |
| Callout | 39 | 每章3个误区提示 |
| Attribution | 13 | 每章出处声明 |

## 删除的模板内容

| 类型 | 数量 | 说明 |
|------|------|------|
| "为什么从这个问题开始"模板段 | 13 | 机械重复章节标题 |
| "正式目录坐标逐项解释"模板段 | 13 | 每个坐标用相同文字描述 |
| "最小可重现实验协议"模板段 | 13 | 4步协议在所有章节完全相同 |
| 模板练习题 | 156 | 12题×13章，答案完全相同 |
| 模板术语定义 | 78 | 6术语×13章，定义完全相同 |

## 验证结果

| 检查项 | 结果 |
|--------|------|
| content-preservation audit | P2, removed=0 |
| tsc --noEmit | 0 errors |
| mdx-check | 4496 files, 0 errors |
| link-check | 1478 pages, 0 errors |
| components:check | 1636 routes verified |
| toc-completeness | A级 (>=95%) |
| pnpm build | 1574 pages generated |
| quality:audit | 72-86分, hard blockers: cross-chapter-template-copy(基线遗留), visual-evidence-missing |

## 人工抽检建议页面

1. 学习地图：00-guide/wkp-official-learning-map.mdx
2. 第一章：01-foundations/wkp-01-windows-internals-overview.mdx
3. 内容最长章：05-filters/wkp-10-file-system-minifilters.mdx (202行)
4. 代码最多章：03-mechanisms/wkp-06-kernel-mechanisms.mdx
5. 总复习：06-review/wkp-official-final-review.mdx

## 仍需人工确认的问题

1. 四类样本表格跨章重复：基线中所有章节的四类样本表格完全相同，这是基线结构遗留，非融合引入
2. 三张图段落跨章重复：基线中所有章节的三张图段落完全相同，这是基线结构遗留
3. quality:audit hard blockers：cross-chapter-template-copy 和 visual-evidence-missing 是基线结构问题
4. 交互组件内容：交互组件(.tsx)未修改，保留 Batch 70 版本
