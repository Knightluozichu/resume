"use client";

import { CpuEvidenceLab } from "./cpu-evidence-lab";

const stages = [
  {
    label: "参数分类",
    layer: "按 ABI 将整数、浮点、aggregate 与隐式对象参数分类。",
    evidence: "调用点和被调入口对寄存器/栈位置的解释一致。",
    falsifier: "把参数从标量改成大结构，观察 hidden pointer 是否出现。",
  },
  {
    label: "调用与返回",
    layer: "追踪 return address、callee-saved state 与 stack alignment。",
    evidence: "prologue/epilogue 或 unwind metadata 能恢复 caller。",
    falsifier: "启用 inline 与 tail call，检查物理 frame 是否消失。",
  },
  {
    label: "返回对象",
    layer: "区分寄存器返回、隐藏返回地址与 copy elision。",
    evidence: "constructor address 与 caller 目标 storage 对齐。",
    falsifier: "改变返回类型大小和优化级别，比较 sret 与省略路径。",
  },
  {
    label: "回溯诊断",
    layer: "把 raw address、module range、unwind 与 symbolization 分层。",
    evidence: "匹配 binary 的 symbols 能稳定还原调用链。",
    falsifier: "去掉 frame pointer 或 symbols，观察缺帧来自哪一层。",
  },
] as const;

export function CpuFunctionPrinciplesLab() {
  return (
    <CpuEvidenceLab
      title="一次函数调用跨过四个契约"
      question="“参数在栈上、返回靠 eax”为什么不是跨平台答案？"
      stages={stages}
    />
  );
}
