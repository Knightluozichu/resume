import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const data = {
  title: "第9章 语义分析（1）引用的消解",
  label: "第2部分 · AST、语义与IR",
  color: "#a16207",
  soft: "#fef9c3",
  chain: [
    "建立作用域",
    "登记声明",
    "消解变量类型名",
    "检查表达式",
    "插入必要转换",
    "汇总诊断",
  ],
  concepts: [
    "第9章 语义分析（1）引用的消解",
    "9.1 语义分析的概要",
    "9.2 变量引用的消解",
    "9.3 类型名称的消解",
  ],
} as const;

export function Crc09ReferenceResolutionMapLab() {
  return <OfficialCraftingCompilerLab {...data} view="map" />;
}

export function Crc09ReferenceResolutionExperimentLab() {
  return <OfficialCraftingCompilerLab {...data} view="experiment" />;
}

export function Crc09ReferenceResolutionEvidenceLab() {
  return <OfficialCraftingCompilerLab {...data} view="evidence" />;
}
