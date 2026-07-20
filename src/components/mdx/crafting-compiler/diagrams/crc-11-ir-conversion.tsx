import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const props = {
  unitId: "crc-11-ir-conversion",
  title: "第11章 中间代码的转换",
  concepts: [
    "第11章 中间代码的转换",
    "11.1 cbc的中间代码",
    "11.2 IRGenerator类的概要",
    "11.3 流程控制语句的转换",
    "11.4 没有副作用的表达式的转换",
    "11.5 左值的转换",
    "11.6 存在副作用的表达式的转换",
  ],
  chain: ["冻结输入", "产出结构", "断言不变量", "触发首错", "清理重建"],
  model: {
    studio: "求值顺序IR台",
    boundary: "typed AST → addresses/values → labels → side-effect-safe IR",
    axisA: {
      label: "表达式形态",
      levels: ["纯值", "左值", "有副作用"],
    },
    axisB: {
      label: "控制流",
      levels: ["直线", "分支", "循环"],
    },
    fault: "降低复合赋值时重复求值带副作用的左值",
    invariant: "每个副作用执行一次，地址和值区分，控制流目标闭合",
    probe:
      "java IrDump samples/side-effects.cb\ndiff -u expected/ir.txt actual/ir.txt",
    signal: "IR顺序、标签与副作用计数",
    artifact: "IR语义差分包",
    trap: "更低层表示不能改变源语言求值次数",
    practiceMode: "code",
    task: "第11章 中间代码的转换固定源码、cbc提交、JDK/JavaCC、GNU工具与IA-32目标，只改变表达式形态或控制流。",
  },
} as const;

export function Crc11IrConversionMapLab() {
  return <OfficialCraftingCompilerLab {...props} view="structure" />;
}
export function Crc11IrConversionExperimentLab() {
  return <OfficialCraftingCompilerLab {...props} view="execution" />;
}
export function Crc11IrConversionEvidenceLab() {
  return <OfficialCraftingCompilerLab {...props} view="evidence" />;
}
