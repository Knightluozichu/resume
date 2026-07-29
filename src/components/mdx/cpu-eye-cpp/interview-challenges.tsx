"use client";

import { CpuEvidenceLab } from "./cpu-evidence-lab";

const stages = [
  {
    label: "先声明条件",
    layer: "写清语言版本、platform、ABI、optimization 与问题中的 ownership。",
    evidence: "答案中的每个“一定”都有对应标准或平台前提。",
    falsifier: "换一个合法平台或输入；若答案崩溃，就补上条件。",
  },
  {
    label: "给出机制",
    layer: "区分 scope、storage duration、linkage、type 与 object lifetime。",
    evidence: "static/global/local、array/pointer 的差异落到独立维度。",
    falsifier: "构造同地址不同 lifetime、同类型不同 linkage 的反例。",
  },
  {
    label: "设计最小实验",
    layer: "只改变一个条件并保留 compiler diagnostics 与运行日志。",
    evidence: "实验能区分至少两个竞争解释，而不是只演示成功。",
    falsifier: "加入 one-past、悬空、跨线程或 narrowing 边界样本。",
  },
  {
    label: "收窄结论",
    layer: "分别陈述语言规则、常见 ABI 实现与本次观测。",
    evidence: "结论不把未崩溃、某条指令或一个地址当成合法性证明。",
    falsifier: "主动给出一个让原答案失效、但仍合法的实现。",
  },
] as const;

export function CpuInterviewChallengesLab() {
  return (
    <CpuEvidenceLab
      title="把面试答案变成可反驳的技术论证"
      question="怎样避免“static 都在 BSS、引用就是指针”这类过度简化？"
      stages={stages}
    />
  );
}
