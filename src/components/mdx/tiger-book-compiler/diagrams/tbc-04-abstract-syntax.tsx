import { OfficialTigerCompilerLab } from "./official-tiger-compiler-lab";

const data = {
  title: "第4章 抽象语法",
  label: "第4章 抽象语法",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "定义节点联合",
    "编写构造器",
    "接入语义动作",
    "传播源位置",
    "打印或解释AST",
    "核对节点所有权",
  ],
  concepts: [
    "第4章 抽象语法",
    "4.1 语义动作",
    "4.1.1 递归下降",
    "4.1.2 Yacc生成的分析器",
    "4.1.3 语义动作的解释器",
    "4.2 抽象语法分析树",
    "4.2.1 位置",
    "4.2.2 Tiger的抽象语法",
    "程序设计：抽象语法",
  ],
} as const;

export function Tbc04AbstractSyntaxMapLab() {
  return <OfficialTigerCompilerLab {...data} view="map" />;
}

export function Tbc04AbstractSyntaxExperimentLab() {
  return <OfficialTigerCompilerLab {...data} view="experiment" />;
}

export function Tbc04AbstractSyntaxEvidenceLab() {
  return <OfficialTigerCompilerLab {...data} view="evidence" />;
}
