import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const data = {
  title: "第13章 x86汇编器编程",
  label: "第3部分 · x86与调用约定",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "确认IA-32模型",
    "选择寄存器",
    "遵守调用约定",
    "布局参数局部量",
    "生成序言尾声",
    "用反汇编核对",
  ],
  concepts: [
    "第13章 x86汇编器编程",
    "13.1 基于GNU汇编器的编程",
    "13.2 GNU汇编器的语法",
    "13.3 传输指令",
    "13.4 算术运算指令",
    "13.5 位运算指令",
    "13.6 流程的控制",
  ],
} as const;

export function Crc13X86AssemblyMapLab() {
  return <OfficialCraftingCompilerLab {...data} view="map" />;
}

export function Crc13X86AssemblyExperimentLab() {
  return <OfficialCraftingCompilerLab {...data} view="experiment" />;
}

export function Crc13X86AssemblyEvidenceLab() {
  return <OfficialCraftingCompilerLab {...data} view="evidence" />;
}
