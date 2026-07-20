import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const props = {
  unitId: "crc-17-optimization",
  title: "第17章 优化的方法",
  concepts: [
    "第17章 优化的方法",
    "17.1 什么是优化",
    "17.2 优化的分类",
    "17.3 cbc中的优化",
    "17.4 更深层的优化",
  ],
  chain: ["冻结输入", "产出结构", "断言不变量", "触发首错", "清理重建"],
  model: {
    studio: "语义保持优化台",
    boundary: "baseline IR/asm → one transform → differential tests",
    axisA: {
      label: "优化层",
      levels: ["局部IR", "控制流", "机器相关"],
    },
    axisB: {
      label: "观察指标",
      levels: ["正确性", "代码尺寸", "运行成本"],
    },
    fault: "删去看似无用但有副作用或未定义行为边界的表达式",
    invariant: "优化前后可观察语义一致，收益在固定样本与目标上可复现",
    probe:
      "./regress --baseline no-opt --candidate one-pass\nsize -A before.o after.o",
    signal: "差分结果、代码尺寸与失败样本",
    artifact: "单优化变换证据包",
    trap: "更短汇编不是正确优化的充分条件",
    practiceMode: "code",
    task: "第17章 优化的方法固定源码、cbc提交、JDK/JavaCC、GNU工具与IA-32目标，只改变优化层或观察指标。",
  },
} as const;

export function Crc17OptimizationMapLab() {
  return <OfficialCraftingCompilerLab {...props} view="structure" />;
}
export function Crc17OptimizationExperimentLab() {
  return <OfficialCraftingCompilerLab {...props} view="execution" />;
}
export function Crc17OptimizationEvidenceLab() {
  return <OfficialCraftingCompilerLab {...props} view="evidence" />;
}
