import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const props = {
  unitId: "crc-12-x86-overview",
  title: "第12章 x86架构的概要",
  concepts: [
    "第3部分 汇编代码",
    "第12章 x86架构的概要",
    "12.1 计算机的系统结构",
    "12.2 x86系列CPU的历史",
    "12.3 IA-32的概要",
    "12.4 数据的表现形式和格式",
  ],
  chain: ["冻结输入", "产出结构", "断言不变量", "触发首错", "清理重建"],
  model: {
    studio: "IA-32数据与寄存器台",
    boundary: "C♭type → size/alignment → register/memory operand",
    axisA: {
      label: "数据宽度",
      levels: ["8位", "16位", "32位"],
    },
    axisB: {
      label: "存放位置",
      levels: ["寄存器", "栈", "静态区"],
    },
    fault: "把x86-64寄存器和ABI默认值混入IA-32主线",
    invariant: "操作数宽度、符号扩展、对齐和寄存器破坏符合冻结的IA-32目标",
    probe: "as --32 -o probe.o probe.s\nobjdump -drwC -Mintel probe.o",
    signal: "编码字节、寄存器读写与宽度",
    artifact: "IA-32目标契约",
    trap: "架构历史说明不能替代具体ABI合同",
    practiceMode: "code",
    task: "第12章 x86架构的概要固定源码、cbc提交、JDK/JavaCC、GNU工具与IA-32目标，只改变数据宽度或存放位置。",
  },
} as const;

export function Crc12X86OverviewMapLab() {
  return <OfficialCraftingCompilerLab {...props} view="structure" />;
}
export function Crc12X86OverviewExperimentLab() {
  return <OfficialCraftingCompilerLab {...props} view="execution" />;
}
export function Crc12X86OverviewEvidenceLab() {
  return <OfficialCraftingCompilerLab {...props} view="evidence" />;
}
