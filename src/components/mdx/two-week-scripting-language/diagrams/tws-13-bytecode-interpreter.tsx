import { OfficialTwoWeekScriptingLab } from "./official-two-week-scripting-lab";

const data = {
  title: "第13天 设计中间代码解释器",
  label: "性能优化 · 虚拟机与类型",
  color: "#0369a1",
  soft: "#e0f2fe",
  chain: [
    "定义指令语义",
    "规划寄存器与栈",
    "生成中间代码",
    "执行调用约定",
    "追踪程序计数器",
    "对照AST解释器",
  ],
  concepts: [
    "第13天 设计中间代码解释器",
    "13.1 中间代码与机器语言",
    "13.2 Stone虚拟机",
    "13.3 通过栈实现环境",
    "13.4 寄存器的使用",
    "13.5 引用变量的值",
    "13.6 if语句与while语句",
    "13.7 函数的定义与调用",
    "13.8 转换为虚拟机器语言",
    "13.9 通过虚拟机执行",
    "专栏第4话 副业",
  ],
} as const;

export function Tws13BytecodeInterpreterMapLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="map" />;
}

export function Tws13BytecodeInterpreterExperimentLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="experiment" />;
}

export function Tws13BytecodeInterpreterEvidenceLab() {
  return <OfficialTwoWeekScriptingLab {...data} view="evidence" />;
}
