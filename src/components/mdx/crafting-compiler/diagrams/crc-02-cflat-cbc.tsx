import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const props = {
  unitId: "crc-02-cflat-cbc",
  title: "第2章 C♭和cbc",
  concepts: ["第2章 C♭和cbc", "2.1 C♭语言的概要", "2.2 C♭编译器cbc的构成"],
  chain: ["冻结输入", "产出结构", "断言不变量", "触发首错", "清理重建"],
  model: {
    studio: "C♭语言—cbc边界台",
    boundary: "language contract → compiler phases → runtime assumptions",
    axisA: {
      label: "语言构造",
      levels: ["声明", "表达式", "控制流"],
    },
    axisB: {
      label: "编译出口",
      levels: ["AST", "汇编", "可执行文件"],
    },
    fault: "把C语言或当前gcc行为当成C♭规范",
    invariant: "每个C♭构造有语法、类型、布局和诊断边界并映射到cbc阶段",
    probe:
      "input: minimal.cb\noutputs: tokens+ast+ir+asm\nreference: cflat-contract",
    signal: "构造覆盖与阶段归属",
    artifact: "C♭特性—cbc阶段矩阵",
    trap: "相似语法不等于与C完全兼容",
    practiceMode: "code",
    task: "第2章 C♭和cbc固定源码、cbc提交、JDK/JavaCC、GNU工具与IA-32目标，只改变语言构造或编译出口。",
  },
} as const;

export function Crc02CflatCbcMapLab() {
  return <OfficialCraftingCompilerLab {...props} view="structure" />;
}
export function Crc02CflatCbcExperimentLab() {
  return <OfficialCraftingCompilerLab {...props} view="execution" />;
}
export function Crc02CflatCbcEvidenceLab() {
  return <OfficialCraftingCompilerLab {...props} view="evidence" />;
}
