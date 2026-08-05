#!/usr/bin/env node

/**
 * scripts/pre-publish-gate.mjs — 发布前统一门禁（P0 方案 F）
 *
 * 单一入口，deploy.sh 在构建前调用一次即可跑完全部门禁。设计原则：
 * 门禁不读缓存（ledger 旧字段），只读实时计算——杜绝"状态过期越狱"。
 *
 * 检查序列（任一失败即退出码 1，阻止发布）：
 *  1. mark-book-published --check —— 白名单 + 目标书 ledger 全通过（章节丢失/顺序）
 *  2. audit --check                —— 当前内容实时判定（score/hardBlockers/dimensionFailures）
 *  3. quality:visual               —— 视觉巡检（渲染 + hash 匹配，图表效果/模板残留）
 *  4. tsc --noEmit                 —— TypeScript 零错误
 *  5. audit-internal-links         —— 全站内链有效性（防 404）
 *
 * 注：全库健康检查 check-publication-invariants 不在发布门禁内（避免别书
 * 过期状态阻塞目标书部署）；它由 CI 单独跑，作为全库一致性警报。
 *
 * 用法：node scripts/pre-publish-gate.mjs --book <slug>
 * 可选：--skip-visual（视觉巡检依赖本地 Chrome，CI 无 Chrome 时可跳过；deploy 必须跑）
 *       --skip-audit  （audit 已由 CI 实时跑过时可跳过；deploy 必须跑）
 */

import { spawnSync } from "node:child_process";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const BOOK_SLUG_INDEX = process.argv.indexOf("--book");
const BOOK_SLUG = BOOK_SLUG_INDEX >= 0 ? process.argv[BOOK_SLUG_INDEX + 1] : null;
const SKIP_VISUAL = process.argv.includes("--skip-visual");
const SKIP_AUDIT = process.argv.includes("--skip-audit");

if (!BOOK_SLUG || !/^[a-z0-9][a-z0-9-]*$/.test(BOOK_SLUG)) {
  console.error("用法：node scripts/pre-publish-gate.mjs --book <slug> [--skip-visual] [--skip-audit]");
  process.exit(2);
}

const STEPS = [
  {
    name: "1/5 发布资格（白名单 + 目标书 ledger 全通过）",
    cmd: "node",
    args: ["scripts/mark-book-published.mjs", "--check", "--book", BOOK_SLUG],
    skip: false,
  },
  {
    name: "2/5 内容审计（实时判定，非 ledger 缓存）",
    cmd: "node",
    args: ["scripts/audit-content-quality-v2.mjs", "--check", "--book", BOOK_SLUG],
    skip: SKIP_AUDIT,
  },
  {
    name: "3/5 视觉巡检（渲染 + contentHash 匹配）",
    cmd: "node",
    args: ["scripts/audit-content-visual.mjs", "--book", BOOK_SLUG],
    skip: SKIP_VISUAL,
  },
  {
    name: "4/5 TypeScript 编译",
    cmd: "npx",
    args: ["tsc", "--noEmit"],
    skip: false,
  },
  {
    name: "5/5 全站内链审计",
    cmd: "node",
    args: ["scripts/audit-internal-links.mjs"],
    skip: false,
  },
];

let failed = false;
for (const step of STEPS) {
  if (step.skip) {
    console.log(`⏭  ${step.name}（已跳过）`);
    continue;
  }
  console.log(`\n==> ${step.name}`);
  const result = spawnSync(step.cmd, step.args, {
    cwd: ROOT,
    stdio: "inherit",
    shell: false,
  });
  if (result.status !== 0) {
    console.error(`✗ 门禁失败：${step.name}（exit ${result.status}）`);
    failed = true;
    break; // 门禁链短路：任一失败即停，避免浪费时间跑后续
  }
}

if (failed) {
  console.error("\n✗✗✗ 发布门禁未通过，阻止部署。");
  process.exit(1);
}

console.log("\n✓✓✓ 发布门禁全部通过，可以部署。");
process.exit(0);
