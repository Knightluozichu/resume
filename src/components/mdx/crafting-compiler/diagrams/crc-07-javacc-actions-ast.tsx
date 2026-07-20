import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const props = {
  unitId: "crc-07-javacc-actions-ast",
  title: "第7章 JavaCC的action和抽象语法树",
  concepts: [
    "第2部分 抽象语法树和中间代码",
    "第7章 JavaCC的action和抽象语法树",
    "7.1 JavaCC的action",
    "7.2 抽象语法树和节点",
  ],
  chain: ["冻结输入", "产出结构", "断言不变量", "触发首错", "清理重建"],
  model: {
    studio: "Action纯度与AST节点台",
    boundary: "matched symbols → JavaCC action → immutable AST node",
    axisA: {
      label: "Action职责",
      levels: ["取值", "建节点", "禁止语义副作用"],
    },
    axisB: {
      label: "失败时点",
      levels: ["匹配前", "Action中", "节点后"],
    },
    fault: "Action提前写符号表导致回溯或失败后状态污染",
    invariant: "同一token串只构造一次等价AST，失败路径不残留语义状态",
    probe: "javacc Parser.jj\njava ActionTrace samples/actions.cb",
    signal: "Action调用、节点ID与残留状态",
    artifact: "Action—节点所有权记录",
    trap: "解析Action不应承担引用消解和类型检查",
    practiceMode: "code",
    task: "第7章 JavaCC的action和抽象语法树固定源码、cbc提交、JDK/JavaCC、GNU工具与IA-32目标，只改变Action职责或失败时点。",
  },
} as const;

export function Crc07JavaccActionsAstMapLab() {
  return <OfficialCraftingCompilerLab {...props} view="structure" />;
}
export function Crc07JavaccActionsAstExperimentLab() {
  return <OfficialCraftingCompilerLab {...props} view="execution" />;
}
export function Crc07JavaccActionsAstEvidenceLab() {
  return <OfficialCraftingCompilerLab {...props} view="evidence" />;
}
