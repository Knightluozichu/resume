import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const data = {
  title: "第5章 基于JavaCC的解析器描述",
  label: "第1部分 · 代码分析",
  color: "#7c3aed",
  soft: "#ede9fe",
  chain: [
    "定义token",
    "编写EBNF",
    "设置前看",
    "运行JavaCC",
    "生成AST入口",
    "验证非法输入",
  ],
  concepts: [
    "第5章 基于JavaCC的解析器描述",
    "5.1 基于EBNF语法的描述",
    "5.2 语法的二义性和token的超前扫描",
  ],
} as const;

export function Crc05JavaccParserMapLab() {
  return <OfficialCraftingCompilerLab {...data} view="map" />;
}

export function Crc05JavaccParserExperimentLab() {
  return <OfficialCraftingCompilerLab {...data} view="experiment" />;
}

export function Crc05JavaccParserEvidenceLab() {
  return <OfficialCraftingCompilerLab {...data} view="evidence" />;
}
