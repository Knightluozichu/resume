#!/usr/bin/env node

throw new Error(
  [
    "force-pass-book 已永久停用：发布状态不得绕过质量 v2 门禁。",
    "请先运行 pnpm quality:audit -- --check --book <slug>，",
    "修复全部失败后再运行 pnpm quality:approve-book -- --book <slug>。",
  ].join(" "),
);
