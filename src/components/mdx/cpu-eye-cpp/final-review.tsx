"use client";

import { CpuEvidenceLab } from "./cpu-evidence-lab";

const stages = [
  {
    label: "定义现象",
    layer: "记录输入、错误、时序、地址和复现概率，不先猜根因。",
    evidence: "同一失败可由最小命令重复触发并保留原始日志。",
    falsifier: "若更换输入或环境才能复现，先拆成不同问题。",
  },
  {
    label: "分层假设",
    layer: "列出语言 UB、ABI mismatch、codegen、loader/OS 与 concurrency。",
    evidence: "每个假设有互斥预测和指定工具，而非同时乱改。",
    falsifier: "找到一项观测能排除整类原因，持续缩小集合。",
  },
  {
    label: "定位首个分叉",
    layer: "比较正常/失败轨迹最早不同的 state 或 memory event。",
    evidence: "崩溃点不再被误当成首次写坏内存的位置。",
    falsifier: "使用 sanitizer/watchpoint/trace 把观测点前移。",
  },
  {
    label: "验证修复",
    layer: "同一输入回放、边界样本、sanitizer 与 regression 一起通过。",
    evidence: "修复改变目标机制，同时保留其余行为与清理路径。",
    falsifier: "恢复旧条件应重新触发失败，证明因果而非偶然消失。",
  },
] as const;

export function CpuFinalReviewLab() {
  return (
    <CpuEvidenceLab
      title="从机器现象回到端到端证据链"
      question="一个偶发崩溃怎样从“猜原因”变成可复现、可回退的修复？"
      stages={stages}
    />
  );
}
