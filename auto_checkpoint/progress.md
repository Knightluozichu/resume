# Checkpoint Progress

- **Status**: 《剑指 Offer（第2版）》Phase 3B 任务条目全部落地。
- **Completed**: Phase 1/2A/2B/2C/3A + Phase 3B（共 81 章）全部登记。
- **Current Book**: `coding-interviews`
- **Current Queue**: 无（已清空）。
- **Next Steps（统一 SOP）**:
  1. 逐章创建 `.mdx + review 数据 + 回归接入`。
  2. 每章完成后执行验收：`pnpm build` + `pnpm mdx-check` + `pnpm link-check`。
  3. 通过后更新 `auto_checkpoint/status.json` 并推进 `todo_queue`。
  4. 章节中有图时同步更新 `scripts/check-svg-overlaps.mjs`，并补充 `scripts/svg-check-coi-phase3b.txt`。
  5. 所有章节完成后再执行一次全量部署。

## 剩余章节清单

- 无。

## 最新验收（`coi-common-parent-in-tree`）

- Chapter file: `content/coding-interviews/trees/common-parent-in-tree.mdx`
- Review data: `src/data/review/coi-common-parent-in-tree.ts`
- 类型与标题: `src/data/review/types.ts`
- 聚合入口: `src/data/review-questions.ts`
- 验收命令: `pnpm mdx-check`、`pnpm link-check`、`pnpm build`
