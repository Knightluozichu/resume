import { OfficialTigerCompilerLab } from "./official-tiger-compiler-lab";

const data = {
  title: "第5章 语义分析",
  label: "第5章 语义分析",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "建立基础环境",
    "进入词法作用域",
    "绑定类型和值",
    "检查表达式",
    "分两遍检查声明",
    "输出诊断与类型",
  ],
  concepts: [
    "第5章 语义分析",
    "5.1 符号表",
    "5.1.1 多个符号表",
    "5.1.2 高效的命令式风格符号表",
    "5.1.3 高效的函数式符号表",
    "5.1.4 Tiger编译器的符号",
    "5.1.5 函数式风格的符号表",
    "5.2 Tiger编译器的绑定",
    "5.3 表达式的类型检查",
    "5.4 声明的类型检查",
    "5.4.1 变量声明",
    "5.4.2 类型声明",
    "5.4.3 函数声明",
    "5.4.4 递归声明",
    "程序设计：类型检查",
  ],
} as const;

export function Tbc05SemanticAnalysisMapLab() {
  return <OfficialTigerCompilerLab {...data} view="map" />;
}

export function Tbc05SemanticAnalysisExperimentLab() {
  return <OfficialTigerCompilerLab {...data} view="experiment" />;
}

export function Tbc05SemanticAnalysisEvidenceLab() {
  return <OfficialTigerCompilerLab {...data} view="evidence" />;
}
