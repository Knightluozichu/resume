import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const data = {
  title: "第16章 分配栈帧",
  label: "第3部分 · 代码生成与优化",
  color: "#be123c",
  soft: "#ffe4e6",
  chain: [
    "选择指令模式",
    "分配虚拟栈",
    "降低表达式语句",
    "修正帧偏移",
    "发射汇编DSL",
    "链接执行对照",
  ],
  concepts: [
    "第16章 分配栈帧",
    "16.1 操作栈",
    "16.2 参数和局部变量的内存分配",
    "16.3 利用虚拟栈分配临时变量",
    "16.4 调整栈访问的偏移量",
    "16.5 生成函数序言和尾声",
    "16.6 alloca函数的实现",
  ],
} as const;

export function Crc16StackFrameMapLab() {
  return <OfficialCraftingCompilerLab {...data} view="map" />;
}

export function Crc16StackFrameExperimentLab() {
  return <OfficialCraftingCompilerLab {...data} view="experiment" />;
}

export function Crc16StackFrameEvidenceLab() {
  return <OfficialCraftingCompilerLab {...data} view="evidence" />;
}
