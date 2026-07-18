import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const data = {
  title: "第7章 JavaCC的action和抽象语法树",
  label: "第2部分 · AST、语义与IR",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "定义节点层次",
    "绑定JavaCC action",
    "构造表达式树",
    "构造语句声明",
    "启动cbc解析器",
    "快照AST",
  ],
  concepts: [
    "第2部分 抽象语法树和中间代码",
    "第7章 JavaCC的action和抽象语法树",
    "7.1 JavaCC的action",
    "7.2 抽象语法树和节点",
  ],
} as const;

export function Crc07JavaccActionsAstMapLab() {
  return <OfficialCraftingCompilerLab {...data} view="map" />;
}

export function Crc07JavaccActionsAstExperimentLab() {
  return <OfficialCraftingCompilerLab {...data} view="experiment" />;
}

export function Crc07JavaccActionsAstEvidenceLab() {
  return <OfficialCraftingCompilerLab {...data} view="evidence" />;
}
