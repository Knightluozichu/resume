import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const data = {
  title: "第6章 语法分析",
  label: "第1部分 · 代码分析",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "定义token",
    "编写EBNF",
    "设置前看",
    "运行JavaCC",
    "生成AST入口",
    "验证非法输入",
  ],
  concepts: [
    "第6章 语法分析",
    "6.1 定义的分析",
    "6.2 语句的分析",
    "6.3 表达式的分析",
    "6.4 项的分析",
  ],
} as const;

export function Crc06SyntaxAnalysisMapLab() {
  return <OfficialCraftingCompilerLab {...data} view="map" />;
}

export function Crc06SyntaxAnalysisExperimentLab() {
  return <OfficialCraftingCompilerLab {...data} view="experiment" />;
}

export function Crc06SyntaxAnalysisEvidenceLab() {
  return <OfficialCraftingCompilerLab {...data} view="evidence" />;
}
