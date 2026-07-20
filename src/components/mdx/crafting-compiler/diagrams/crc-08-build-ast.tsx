import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const props = {
  unitId: "crc-08-build-ast",
  title: "第8章 抽象语法树的生成",
  concepts: [
    "第8章 抽象语法树的生成",
    "8.1 表达式的抽象语法树",
    "8.2 语句的抽象语法树",
    "8.3 声明的抽象语法树",
    "8.4 cbc的解析器的启动",
  ],
  chain: ["冻结输入", "产出结构", "断言不变量", "触发首错", "清理重建"],
  model: {
    studio: "AST结构快照台",
    boundary: "expression/statement/declaration → typed node hierarchy",
    axisA: {
      label: "节点族",
      levels: ["表达式", "语句", "声明"],
    },
    axisB: {
      label: "比较方式",
      levels: ["结构", "源跨度", "稳定序列化"],
    },
    fault: "用对象toString快照掩盖字段遗漏和顺序不稳定",
    invariant: "节点类型、子女次序、源跨度和声明边界与输入唯一对应",
    probe:
      "java AstDump --format=json samples/ast.cb\ndiff -u expected/ast.json actual/ast.json",
    signal: "结构差分与源跨度",
    artifact: "AST结构金集",
    trap: "AST不是token列表，也不应提前固定机器细节",
    practiceMode: "code",
    task: "第8章 抽象语法树的生成固定源码、cbc提交、JDK/JavaCC、GNU工具与IA-32目标，只改变节点族或比较方式。",
  },
} as const;

export function Crc08BuildAstMapLab() {
  return <OfficialCraftingCompilerLab {...props} view="structure" />;
}
export function Crc08BuildAstExperimentLab() {
  return <OfficialCraftingCompilerLab {...props} view="execution" />;
}
export function Crc08BuildAstEvidenceLab() {
  return <OfficialCraftingCompilerLab {...props} view="evidence" />;
}
