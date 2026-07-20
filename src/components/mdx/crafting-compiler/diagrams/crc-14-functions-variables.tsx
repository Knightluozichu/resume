import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const props = {
  unitId: "crc-14-functions-variables",
  title: "第14章 函数和变量",
  concepts: [
    "第14章 函数和变量",
    "14.1 程序调用约定",
    "14.2 Linux/x86下的函数调用",
    "14.3 Linux/x86下函数调用的细节",
  ],
  chain: ["冻结输入", "产出结构", "断言不变量", "触发首错", "清理重建"],
  model: {
    studio: "IA-32调用约定台",
    boundary: "caller arguments → call → callee frame → return value",
    axisA: {
      label: "调用位置",
      levels: ["调用者", "序言/函数体", "尾声"],
    },
    axisB: {
      label: "变量类别",
      levels: ["参数", "局部", "全局"],
    },
    fault: "破坏被调用者保存寄存器或返回时栈指针不平衡",
    invariant: "参数偏移、保存集合、返回值和调用前后ESP满足冻结ABI",
    probe: "objdump -drwC call.o\ngdb --batch -x frame.gdb ./call",
    signal: "ESP/EBP、保存寄存器与返回值",
    artifact: "调用帧逐步记录",
    trap: "函数能返回一次不证明嵌套调用约定正确",
    practiceMode: "code",
    task: "第14章 函数和变量固定源码、cbc提交、JDK/JavaCC、GNU工具与IA-32目标，只改变调用位置或变量类别。",
  },
} as const;

export function Crc14FunctionsVariablesMapLab() {
  return <OfficialCraftingCompilerLab {...props} view="structure" />;
}
export function Crc14FunctionsVariablesExperimentLab() {
  return <OfficialCraftingCompilerLab {...props} view="execution" />;
}
export function Crc14FunctionsVariablesEvidenceLab() {
  return <OfficialCraftingCompilerLab {...props} view="evidence" />;
}
