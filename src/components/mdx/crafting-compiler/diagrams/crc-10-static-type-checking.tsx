import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const props = {
  unitId: "crc-10-static-type-checking",
  title: "第10章 语义分析（2）静态类型检查",
  concepts: [
    "第10章 语义分析（2）静态类型检查",
    "10.1 类型定义的检查",
    "10.2 表达式的有效性检查",
    "10.3 静态类型检查",
  ],
  chain: ["冻结输入", "产出结构", "断言不变量", "触发首错", "清理重建"],
  model: {
    studio: "类型规则与转换台",
    boundary: "resolved AST → type rules → conversions → diagnostics",
    axisA: {
      label: "表达式类别",
      levels: ["标量", "指针", "左值"],
    },
    axisB: {
      label: "检查结果",
      levels: ["精确匹配", "允许转换", "拒绝"],
    },
    fault: "为让样本通过而静默插入窄化或非法指针转换",
    invariant: "每个表达式有确定类型和值类别，转换显式且错误不进入IR",
    probe:
      "java TypeDump samples/types.cb\njava TypeDump samples/types-invalid.cb",
    signal: "类型推导、转换节点与错误集合",
    artifact: "静态类型证明包",
    trap: "类型相容、可转换和表示宽度是不同问题",
    practiceMode: "code",
    task: "第10章 语义分析（2）静态类型检查固定源码、cbc提交、JDK/JavaCC、GNU工具与IA-32目标，只改变表达式类别或检查结果。",
  },
} as const;

export function Crc10StaticTypeCheckingMapLab() {
  return <OfficialCraftingCompilerLab {...props} view="structure" />;
}
export function Crc10StaticTypeCheckingExperimentLab() {
  return <OfficialCraftingCompilerLab {...props} view="execution" />;
}
export function Crc10StaticTypeCheckingEvidenceLab() {
  return <OfficialCraftingCompilerLab {...props} view="evidence" />;
}
