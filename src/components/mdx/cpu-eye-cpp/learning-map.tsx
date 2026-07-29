"use client";

import { CpuEvidenceLab } from "./cpu-evidence-lab";

const stages = [
  {
    label: "语言合同",
    layer:
      "先写 type、value、lifetime 与 observable behavior，不从汇编倒推标准。",
    evidence: "同一源码在合法实现中都必须保留的行为边界。",
    falsifier: "换编译器与优化级别；若结论改变，它就不是语言保证。",
  },
  {
    label: "ABI 与目标",
    layer: "固定 ISA、calling convention、object format 与运行库版本。",
    evidence: "参数寄存器、栈对齐、symbol 与 section 都能被工具核对。",
    falsifier: "切换 x86-64 / AArch64 或 ABI，观察实现形状是否变化。",
  },
  {
    label: "机器输出",
    layer: "比较 IR、assembly、binary，而不是只截一张反汇编图。",
    evidence: "控制流、数据依赖与地址来源能逐项指回源码约束。",
    falsifier: "改变一项 flags，确认哪条指令是偶然实现细节。",
  },
  {
    label: "运行观测",
    layer: "用 debugger、trace、sanitizer 与 counter 验证真实执行路径。",
    evidence: "输入、版本、命令和结果可被另一台机器复现。",
    falsifier: "注入边界输入或 sanitizer，让隐藏的未定义行为显现。",
  },
] as const;

export function CpuLearningMapLab() {
  return (
    <CpuEvidenceLab
      title="一条结论要跨过四道证据门"
      question="“这段 C++ 在 CPU 看来就是这样”到底是哪一层的结论？"
      stages={stages}
    />
  );
}
