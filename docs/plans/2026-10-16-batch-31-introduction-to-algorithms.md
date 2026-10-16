# Batch 31 · introduction-to-algorithms 六章修复闭环

日期：2026-10-16
范围：`introduction-to-algorithms` 第 3、4、6、7、8、9 章。

## 结果

| 章节 | 状态 | 分数 | contentHash | 视觉证据 |
|---|---|---:|---|---|
| `01-foundations/03-characterizing-running-times` | passed | 94 | `370653852c49a720` | 8 张 |
| `01-foundations/04-divide-and-conquer` | passed | 95 | `d187377bbe3d3be1` | 8 张 |
| `02-sorting-order-statistics/06-heapsort` | passed | 98 | `6299df5dca072064` | 8 张 |
| `02-sorting-order-statistics/07-quicksort` | passed | 99 | `1232a74bd7c5efa3` | 8 张 |
| `02-sorting-order-statistics/08-sorting-in-linear-time` | passed | 99 | `99cee9b4ee2d1f0c` | 8 张 |
| `02-sorting-order-statistics/09-medians-order-statistics` | passed | 98 | `e1c6760e126594e1` | 8 张 |

## 执行记录

- 恢复断点：工作树已有同批 WIP；未重复派工。
- 组件注册：`node scripts/generate-chapter-component-registry.mjs` → 2664 routes / 2722 lazy modules。
- TypeScript：`npx tsc --noEmit` → exit 0。
- Prettier/ESLint：六个新增组件 targeted check → PASS。
- 官方视觉巡检：
  - `CI=true pnpm quality:visual -- --book introduction-to-algorithms --chapter 03-characterizing-running-times --concurrency 1` → PASS
  - `CI=true pnpm quality:visual -- --book introduction-to-algorithms --chapter 04-divide-and-conquer --concurrency 1` → PASS
  - 其余四章 visual-results hash-matched PASS。
- 内容审计：`pnpm quality:audit -- --book introduction-to-algorithms --update-ledger` → 六章 passed；整书仍剩 18 个历史失败章节，未混入本批。
- 不变量：`pnpm quality:invariants` → 通过（4609 章，109 本已发布）。
- 内链：`node scripts/audit-internal-links.mjs` → 2871 条链接全部有效。
- 全量 `node scripts/check-links.mjs`：发现 3 个既有的 `this-is-chatgpt` 链接错误（`tcg-main-10-inside-chatgpt.mdx` 两处链接缺 `/learn`，生产 curl 404）。与本批无关，已记录到 checkpoint，安排在本批提交后、下一批前热修。

## 主控独立验收发现与处理

- 人工复核官方截图时发现第 3/4 章核心实验首帧为空白：`useTeachingTimeline` 在 t=0 时把第一stage `opacity` 动画从 0 开始，暂停态首帧不可见。
- 已派两个单章 worker 仅修改对应组件，将每个 lab 的第一 stage 改为 `[1,1]` 常显，后续 stage 仍淡入；复跑 targeted visual 后首帧可见。
- 自定义 headful system Chrome + GPU 验收：`node .checkpoint/headful-acceptance.mjs` 最终 clean run → `checked=6 failed=0`。六个章节在 1440 / 390 / 360 视口均通过：无水平溢出、无 SVG <11px 文本、移动端触控目标符合官方 hit-target 口径、参数/故障/步进/播放/计时器交互产生可见变化、Reset 恢复控制与数据签名、控制台/pageerror/本地资源失败均为 0；`prefers-reduced-motion` 复核 6/6 PASS。证据见 `quality/artifacts/headful/introduction-to-algorithms/*/headful-result.json`。

## 证据路径

- 官方视觉证据：`quality/artifacts/visual/introduction-to-algorithms/.../{desktop-top,desktop-middle,desktop-core,desktop-end,mobile-top,mobile-middle,mobile-core,mobile-end}.png`
- 自定义 headful/GPU 证据：`quality/artifacts/headful/introduction-to-algorithms/.../headful-result.json` 与 viewport 截图
- 失败尝试保留：`quality/artifacts/headful/introduction-to-algorithms-v2-script-defect/`、`-v3-script-strict/`、`-v4-script-timing/`、`-v5-ch03-debug/`、`-v6-style-serialization/`

## 清理与未提交保护

- 删除本批备份文件：`content/introduction-to-algorithms/02-sorting-order-statistics/07-quicksort.mdx.bak`。
- 保留用户/无关漂移：`.claude/skills/remuse-chapter/SKILL.md`、`.claude/skills/remuse-chapter-diagram/SKILL.md`、`.dsh/skills/remuse-chapter-diagram` 未暂存。
- `quality/artifacts/` 被 `.gitignore` 忽略，未强行加入提交。

## 剩余量

- 全库：failed 1738、queued 196、passed 1722、published 953。
- `introduction-to-algorithms`：failed 18、passed 21；下一批建议从 `03-data-structures/10-elementary-data-structures` 开始按书序取 8 章。
