import { OfficialTigerCompilerLab } from "./official-tiger-compiler-lab";

const data = {
  title: "第2章 词法分析",
  label: "第2章 词法分析",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "规定词法单词",
    "构造NFA",
    "执行子集构造",
    "生成DFA",
    "接入Flex动作",
    "重放边界词素",
  ],
  concepts: [
    "第2章 词法分析",
    "2.1 词法单词",
    "2.2 正则表达式",
    "2.3 有限自动机",
    "2.4 非确定有限自动机",
    "2.4.1 将正则表达式转换为NFA",
    "2.4.2 将NFA转换为DFA",
    "2.5 Lex：词法分析器的生成器",
    "程序设计：词法分析",
  ],
} as const;

export function Tbc02LexicalAnalysisMapLab() {
  return <OfficialTigerCompilerLab {...data} view="map" />;
}

export function Tbc02LexicalAnalysisExperimentLab() {
  return <OfficialTigerCompilerLab {...data} view="experiment" />;
}

export function Tbc02LexicalAnalysisEvidenceLab() {
  return <OfficialTigerCompilerLab {...data} view="evidence" />;
}
