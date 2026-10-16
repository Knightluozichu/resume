# Batch 32 · introduction-to-algorithms 八章修复闭环

日期：2026-10-17
范围：`03-data-structures/10`、`11`、`12`、`13`，`04-advanced-design-analysis/14`，`05-advanced-data-structures/19`，`06-graph-algorithms/22`，`07-selected-topics/29`。

## 结果

| 章节 | 状态 | 分数 | contentHash | 视觉证据 |
|---|---|---:|---|---|
| `03-data-structures/10-elementary-data-structures` | passed | 93 | `9fa8e98b28fee219` | 8 张 |
| `03-data-structures/11-hash-tables` | passed | 96 | `89d45bc6a5eb05fe` | 8 张 |
| `03-data-structures/12-binary-search-trees` | passed | 96 | `ad0d68b1e56eb1f0` | 8 张 |
| `03-data-structures/13-red-black-trees` | passed | 97 | `f71f300bc6f42c3c` | 8 张 |
| `04-advanced-design-analysis/14-dynamic-programming` | passed | 96 | `804858a1995afa7f` | 8 张 |
| `05-advanced-data-structures/19-data-structures-for-disjoint-sets` | passed | 92 | `9de0c9770f1d6d55` | 8 张 |
| `06-graph-algorithms/22-single-source-shortest-paths` | passed | 99 | `590749ccf30779c8` | 8 张 |
| `07-selected-topics/29-linear-programming` | passed | 96 | `6987e06dc2ca59bb` | 8 张 |

## 执行记录

- 恢复断点：batch-32 原有 8 章 WIP；未重复造同一章任务。
- worker 修复：
  - `agent-10` / ch12：补齐缺失的 `qualityVersion: 2` frontmatter。
  - `agent-11` / ch13：修正 red-black tree NIL slot 布局，消除 desktop 右溢 `NIL text right=1516.46`。
- 组件注册：`node scripts/generate-chapter-component-registry.mjs` → 2672 routes / 2730 lazy modules。
- TypeScript：`npx tsc --noEmit` → exit 0。
- Prettier/ESLint：8 章 MDX + 组件 + v2 bridges targeted check → PASS。
- 官方视觉巡检：ch12/ch13 修复后重跑 PASS；8/8 hash-matched PASS。
- 内容审计：`pnpm quality:audit -- --book introduction-to-algorithms --update-ledger` → batch32 8/8 passed；整书仍剩 10 个非本批历史失败章节。
- 不变量：`pnpm quality:invariants` → 通过。
- 内链/来源锚点：`audit-internal-links` 2871 pass；`check-source-anchors` 4609 files 0 errors。
- 自定义 headful system Chrome + GPU 验收：`node .checkpoint/headful-acceptance-batch32.mjs` 最终按 8 个 `headful-result.json` 重算 summary → `checked=8 failed=0`。8 章在 1440 / 390 / 360 视口均通过：无水平溢出、无 SVG <11px 文本、移动端触控目标符合官方 hit-target 口径、交互产生可见变化、Reset 恢复控制与数据签名、console/pageerror/本地资源失败均为 0；`prefers-reduced-motion` 8/8 PASS。`ch19` 首次 mobile-390 出现一次 reset 定位时序 miss，单章重跑 PASS，最终 evidence 以重跑后 `quality/artifacts/headful/introduction-to-algorithms-batch32/*/headful-result.json` 为准。

## 证据路径

- 官方视觉证据：`quality/artifacts/visual/introduction-to-algorithms/...`
- 自定义 headful/GPU 证据：`quality/artifacts/headful/introduction-to-algorithms-batch32/*/headful-result.json`
- 保留的失败/调试证据：`.checkpoint/headful-acceptance*.mjs` 与历史 `quality/artifacts/headful/introduction-to-algorithms-v*/`

## 清理与未提交保护

- 保留用户/无关漂移：`.claude/skills/remuse-chapter/SKILL.md`、`.claude/skills/remuse-chapter-diagram/SKILL.md`、`.dsh/skills/remuse-chapter-diagram` 不暂存。
- `quality/artifacts/` 被 `.gitignore` 忽略，未强行加入提交。

## 剩余量

- 全库：failed 1730、queued 196、passed 1730、published 953。
- `introduction-to-algorithms`：本批 8 章已通过；下一批建议从 `07-selected-topics/30-polynomials-and-the-fft` 开始按书序继续。
- 部署前仍需热修 `this-is-chatgpt` 两个 `/learn` 缺失链接（已记录）。
