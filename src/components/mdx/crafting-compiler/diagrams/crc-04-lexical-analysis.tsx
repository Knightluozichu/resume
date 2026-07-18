import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const data = {
  title: "第4章 词法分析",
  label: "第1部分 · 代码分析",
  color: "#be123c",
  soft: "#ffe4e6",
  chain: [
    "定义token",
    "编写EBNF",
    "设置前看",
    "运行JavaCC",
    "生成AST入口",
    "验证非法输入",
  ],
  concepts: [
    "第4章 词法分析",
    "4.1 基于JavaCC的扫描器的描述",
    "4.2 扫描没有结构的单词",
    "4.3 扫描不生成token的单词",
    "4.4 扫描具有结构的单词",
  ],
} as const;

export function Crc04LexicalAnalysisMapLab() {
  return <OfficialCraftingCompilerLab {...data} view="map" />;
}

export function Crc04LexicalAnalysisExperimentLab() {
  return <OfficialCraftingCompilerLab {...data} view="experiment" />;
}

export function Crc04LexicalAnalysisEvidenceLab() {
  return <OfficialCraftingCompilerLab {...data} view="evidence" />;
}
