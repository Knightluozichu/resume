import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const data = {
  title: "第3章 语法分析的概要",
  label: "第1部分 · 代码分析",
  color: "#a16207",
  soft: "#fef9c3",
  chain: [
    "定义token",
    "编写EBNF",
    "设置前看",
    "运行JavaCC",
    "生成AST入口",
    "验证非法输入",
  ],
  concepts: [
    "第1部分 代码分析",
    "第3章 语法分析的概要",
    "3.1 语法分析的方法",
    "3.2 解析器生成器",
    "3.3 JavaCC的概要",
  ],
} as const;

export function Crc03ParsingOverviewMapLab() {
  return <OfficialCraftingCompilerLab {...data} view="map" />;
}

export function Crc03ParsingOverviewExperimentLab() {
  return <OfficialCraftingCompilerLab {...data} view="experiment" />;
}

export function Crc03ParsingOverviewEvidenceLab() {
  return <OfficialCraftingCompilerLab {...data} view="evidence" />;
}
