import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const data = {
  title: "第8章 抽象语法树的生成",
  label: "第2部分 · AST、语义与IR",
  color: "#047857",
  soft: "#d1fae5",
  chain: [
    "定义节点层次",
    "绑定JavaCC action",
    "构造表达式树",
    "构造语句声明",
    "启动cbc解析器",
    "快照AST",
  ],
  concepts: [
    "第8章 抽象语法树的生成",
    "8.1 表达式的抽象语法树",
    "8.2 语句的抽象语法树",
    "8.3 声明的抽象语法树",
    "8.4 cbc的解析器的启动",
  ],
} as const;

export function Crc08BuildAstMapLab() {
  return <OfficialCraftingCompilerLab {...data} view="map" />;
}

export function Crc08BuildAstExperimentLab() {
  return <OfficialCraftingCompilerLab {...data} view="experiment" />;
}

export function Crc08BuildAstEvidenceLab() {
  return <OfficialCraftingCompilerLab {...data} view="evidence" />;
}
