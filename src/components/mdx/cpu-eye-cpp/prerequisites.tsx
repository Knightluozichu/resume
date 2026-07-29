"use client";

import { CpuEvidenceLab } from "./cpu-evidence-lab";

const stages = [
  {
    label: "固定编译输入",
    layer: "记录 source、compiler build、target、flags 与 linked runtime。",
    evidence: "Compiler Explorer 和本地命令产生可比的 assembly。",
    falsifier: "只改 -O0/-O2，检查 stack slot 与 branch 是否仍存在。",
  },
  {
    label: "读取可执行映像",
    layer: "区分 code、initialized data、BSS 与装载元数据。",
    evidence: "readelf/objdump 的 section、segment 与 entry point 相互一致。",
    falsifier: "把大零数组改成非零初始化，比较文件尺寸与映射。",
  },
  {
    label: "跟踪启动路径",
    layer: "从 executable entry 经过 runtime startup 再到 main。",
    evidence: "断点与 backtrace 显示 main 不是进程第一条指令。",
    falsifier: "对比 hosted 程序与自定义入口，观察启动责任变化。",
  },
  {
    label: "解释访存",
    layer: "把 base、index、scale、offset 与访问宽度拆开。",
    evidence: "有效地址和读写字节数能由寄存器状态重算。",
    falsifier: "改变数组元素类型或索引，验证 scale 与 width 同步改变。",
  },
] as const;

export function CpuPrerequisitesLab() {
  return (
    <CpuEvidenceLab
      title="从编译配置走到真实入口"
      question="一条汇编证据需要哪些上下文才不会被过度解释？"
      stages={stages}
    />
  );
}
