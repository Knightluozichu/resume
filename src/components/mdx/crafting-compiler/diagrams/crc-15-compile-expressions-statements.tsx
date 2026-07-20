import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const props = {
  unitId: "crc-15-compile-expressions-statements",
  title: "第15章 编译表达式和语句",
  concepts: [
    "第15章 编译表达式和语句",
    "15.1 确认编译结果",
    "15.2 x86汇编的对象与DSL",
    "15.3 cbc的x86汇编DSL",
    "15.4 CodeGenerator类的概要",
    "15.5 编译单纯的表达式",
    "15.6 编译二元运算",
    "15.7 引用变量和赋值",
    "15.8 编译jump语句",
  ],
  chain: ["冻结输入", "产出结构", "断言不变量", "触发首错", "清理重建"],
  model: {
    studio: "IR到指令选择台",
    boundary: "IR node → x86 DSL → labels/operands → assembly",
    axisA: {
      label: "IR类别",
      levels: ["表达式", "赋值", "跳转"],
    },
    axisB: {
      label: "比较基线",
      levels: ["预测汇编", "反汇编", "执行语义"],
    },
    fault: "只比较汇编文本格式或只比较最终返回值",
    invariant: "每个IR节点选择合法模式，标签闭合且反汇编语义与执行结果一致",
    probe:
      "./cbc -S samples/codegen.cb\nas --32 -o codegen.o codegen.s\nobjdump -drwC codegen.o",
    signal: "IR—指令对应与运行断言",
    artifact: "代码生成差分包",
    trap: "文本相似不等于机器语义相同",
    practiceMode: "code",
    task: "第15章 编译表达式和语句固定源码、cbc提交、JDK/JavaCC、GNU工具与IA-32目标，只改变IR类别或比较基线。",
  },
} as const;

export function Crc15CompileExpressionsStatementsMapLab() {
  return <OfficialCraftingCompilerLab {...props} view="structure" />;
}
export function Crc15CompileExpressionsStatementsExperimentLab() {
  return <OfficialCraftingCompilerLab {...props} view="execution" />;
}
export function Crc15CompileExpressionsStatementsEvidenceLab() {
  return <OfficialCraftingCompilerLab {...props} view="evidence" />;
}
