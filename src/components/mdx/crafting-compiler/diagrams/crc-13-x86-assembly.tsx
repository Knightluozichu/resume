import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const props = {
  unitId: "crc-13-x86-assembly",
  title: "第13章 x86汇编器编程",
  concepts: [
    "第13章 x86汇编器编程",
    "13.1 基于GNU汇编器的编程",
    "13.2 GNU汇编器的语法",
    "13.3 传输指令",
    "13.4 算术运算指令",
    "13.5 位运算指令",
    "13.6 流程的控制",
  ],
  chain: ["冻结输入", "产出结构", "断言不变量", "触发首错", "清理重建"],
  model: {
    studio: "GNU as指令编码台",
    boundary: "AT&T syntax → instruction/operand → machine bytes → flags",
    axisA: {
      label: "指令族",
      levels: ["传送", "算术/位运算", "控制转移"],
    },
    axisB: {
      label: "操作数边界",
      levels: ["寄存器", "内存", "立即数"],
    },
    fault: "源/目的次序或宽度后缀错误却因测试值偶然相同",
    invariant: "汇编、反汇编、标志位和预期状态逐指令一致",
    probe: "as --32 -o probe.o probe.s\nobjdump -drwC probe.o",
    signal: "机器码、操作数与EFLAGS",
    artifact: "指令级对照表",
    trap: "汇编器接受指令不证明它实现了预期语义",
    practiceMode: "code",
    task: "第13章 x86汇编器编程固定源码、cbc提交、JDK/JavaCC、GNU工具与IA-32目标，只改变指令族或操作数边界。",
  },
} as const;

export function Crc13X86AssemblyMapLab() {
  return <OfficialCraftingCompilerLab {...props} view="structure" />;
}
export function Crc13X86AssemblyExperimentLab() {
  return <OfficialCraftingCompilerLab {...props} view="execution" />;
}
export function Crc13X86AssemblyEvidenceLab() {
  return <OfficialCraftingCompilerLab {...props} view="evidence" />;
}
