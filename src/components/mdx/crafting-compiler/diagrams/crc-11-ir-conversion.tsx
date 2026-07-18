import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const data = {
  title: "第11章 中间代码的转换",
  label: "第2部分 · AST、语义与IR",
  color: "#7c3aed",
  soft: "#ede9fe",
  chain: [
    "冻结语义AST",
    "规范化控制流",
    "降低左值",
    "保存副作用顺序",
    "生成IR节点",
    "差分解释结果",
  ],
  concepts: [
    "第11章 中间代码的转换",
    "11.1 cbc的中间代码",
    "11.2 IRGenerator类的概要",
    "11.3 流程控制语句的转换",
    "11.4 没有副作用的表达式的转换",
    "11.5 左值的转换",
    "11.6 存在副作用的表达式的转换",
  ],
} as const;

export function Crc11IrConversionMapLab() {
  return <OfficialCraftingCompilerLab {...data} view="map" />;
}

export function Crc11IrConversionExperimentLab() {
  return <OfficialCraftingCompilerLab {...data} view="experiment" />;
}

export function Crc11IrConversionEvidenceLab() {
  return <OfficialCraftingCompilerLab {...data} view="evidence" />;
}
