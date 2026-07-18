import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const data = {
  title: "第17章 优化的方法",
  label: "第3部分 · 代码生成与优化",
  color: "#7c3aed",
  soft: "#ede9fe",
  chain: [
    "冻结语义基线",
    "构造CFG",
    "收集数据流",
    "执行局部改写",
    "验证守卫",
    "基准与差分",
  ],
  concepts: [
    "第17章 优化的方法",
    "17.1 什么是优化",
    "17.2 优化的分类",
    "17.3 cbc中的优化",
    "17.4 更深层的优化",
  ],
} as const;

export function Crc17OptimizationMapLab() {
  return <OfficialCraftingCompilerLab {...data} view="map" />;
}

export function Crc17OptimizationExperimentLab() {
  return <OfficialCraftingCompilerLab {...data} view="experiment" />;
}

export function Crc17OptimizationEvidenceLab() {
  return <OfficialCraftingCompilerLab {...data} view="evidence" />;
}
