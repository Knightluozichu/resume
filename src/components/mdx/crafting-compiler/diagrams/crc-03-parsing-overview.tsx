import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const props = {
  unitId: "crc-03-parsing-overview",
  title: "第3章 语法分析的概要",
  concepts: [
    "第1部分 代码分析",
    "第3章 语法分析的概要",
    "3.1 语法分析的方法",
    "3.2 解析器生成器",
    "3.3 JavaCC的概要",
  ],
  chain: ["冻结输入", "产出结构", "断言不变量", "触发首错", "清理重建"],
  model: {
    studio: "解析策略选择台",
    boundary: "token stream → grammar → lookahead → parse tree/error",
    axisA: {
      label: "解析方法",
      levels: ["手写", "生成器", "混合"],
    },
    axisB: {
      label: "歧义处理",
      levels: ["改写文法", "局部LOOKAHEAD", "拒绝"],
    },
    fault: "无限增加全局前看掩盖二义性",
    invariant: "选择点的共同前缀、结合性和失败位置可由最小串解释",
    probe:
      "grammar: expression-and-declaration\ncases: valid+ambiguous+truncated\ntrace: enabled",
    signal: "选择轨迹与最小反例",
    artifact: "解析策略决策记录",
    trap: "解析器接受样本不证明文法无歧义",
    practiceMode: "code",
    task: "第3章 语法分析的概要固定源码、cbc提交、JDK/JavaCC、GNU工具与IA-32目标，只改变解析方法或歧义处理。",
  },
} as const;

export function Crc03ParsingOverviewMapLab() {
  return <OfficialCraftingCompilerLab {...props} view="structure" />;
}
export function Crc03ParsingOverviewExperimentLab() {
  return <OfficialCraftingCompilerLab {...props} view="execution" />;
}
export function Crc03ParsingOverviewEvidenceLab() {
  return <OfficialCraftingCompilerLab {...props} view="evidence" />;
}
