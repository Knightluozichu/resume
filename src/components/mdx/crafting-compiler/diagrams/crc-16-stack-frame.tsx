import { OfficialCraftingCompilerLab } from "./official-crafting-compiler-lab";

const props = {
  unitId: "crc-16-stack-frame",
  title: "第16章 分配栈帧",
  concepts: [
    "第16章 分配栈帧",
    "16.1 操作栈",
    "16.2 参数和局部变量的内存分配",
    "16.3 利用虚拟栈分配临时变量",
    "16.4 调整栈访问的偏移量",
    "16.5 生成函数序言和尾声",
    "16.6 alloca函数的实现",
  ],
  chain: ["冻结输入", "产出结构", "断言不变量", "触发首错", "清理重建"],
  model: {
    studio: "栈帧布局计算台",
    boundary: "parameters/locals/temps/alloca → offsets → prologue/epilogue",
    axisA: {
      label: "帧对象",
      levels: ["参数", "局部/临时", "动态分配"],
    },
    axisB: {
      label: "调用深度",
      levels: ["叶函数", "嵌套调用", "递归"],
    },
    fault: "调整临时槽或alloca后未重算全部偏移与恢复路径",
    invariant: "所有槽不重叠、对齐满足ABI、每条返回路径恢复相同栈状态",
    probe: "objdump -drwC frame.o\ngdb --batch -x stack.gdb ./frame",
    signal: "帧大小、偏移、ESP平衡与哨兵",
    artifact: "栈帧布局表",
    trap: "固定EBP偏移不能掩盖动态栈变化",
    practiceMode: "code",
    task: "第16章 分配栈帧固定源码、cbc提交、JDK/JavaCC、GNU工具与IA-32目标，只改变帧对象或调用深度。",
  },
} as const;

export function Crc16StackFrameMapLab() {
  return <OfficialCraftingCompilerLab {...props} view="structure" />;
}
export function Crc16StackFrameExperimentLab() {
  return <OfficialCraftingCompilerLab {...props} view="execution" />;
}
export function Crc16StackFrameEvidenceLab() {
  return <OfficialCraftingCompilerLab {...props} view="evidence" />;
}
