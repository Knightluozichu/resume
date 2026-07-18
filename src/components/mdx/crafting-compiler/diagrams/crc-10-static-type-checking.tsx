import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const data = {
  title: "第10章 语义分析（2）静态类型检查",
  label: "第2部分 · AST、语义与IR",
  color: "#be123c",
  soft: "#ffe4e6",
  chain: [
    "建立作用域",
    "登记声明",
    "消解变量类型名",
    "检查表达式",
    "插入必要转换",
    "汇总诊断",
  ],
  concepts: [
    "第10章 语义分析（2）静态类型检查",
    "10.1 类型定义的检查",
    "10.2 表达式的有效性检查",
    "10.3 静态类型检查",
  ],
} as const;

export function Crc10StaticTypeCheckingMapLab() {
  return <OfficialCraftingCompilerLab {...data} view="map" />;
}

export function Crc10StaticTypeCheckingExperimentLab() {
  return <OfficialCraftingCompilerLab {...data} view="experiment" />;
}

export function Crc10StaticTypeCheckingEvidenceLab() {
  return <OfficialCraftingCompilerLab {...data} view="evidence" />;
}
