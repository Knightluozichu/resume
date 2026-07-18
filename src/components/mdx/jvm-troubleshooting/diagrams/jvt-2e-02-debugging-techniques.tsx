import { OfficialJvt2Lab } from "./official-jvt2-lab";

const nodes = [
  "2 Understanding your app’s logic through debugging techniques",
  "2.1 When analyzing code is not enough",
  "2.2 Investigating code with a debugger",
  "2.2.1 What is the execution stack trace, and how do I use it?",
  "2.2.2 Navigating code with the debugger",
  "2.3 When using the debugger might not be enough",
  "Summary"
];

export function Jvt2InvestigationLab() {
  return <OfficialJvt2Lab mode="investigation" unitTitle="第2章 用调试技术理解应用逻辑" focus="从执行栈、帧、局部变量和控制流理解一次真实运行，并识别调试器会扰动时序或无法覆盖的场景" nodes={nodes} />;
}

export function Jvt2TimelineLab() {
  return <OfficialJvt2Lab mode="timeline" unitTitle="第2章 用调试技术理解应用逻辑" focus="在状态写入前后设置断点，逐帧记录不变量何时被破坏，并与无断点日志运行比较" nodes={nodes} />;
}

export function Jvt2EvidenceLab() {
  return <OfficialJvt2Lab mode="evidence" unitTitle="第2章 用调试技术理解应用逻辑" focus="调用栈注释、帧变量快照、分支路径图、调试器适用性决策表" nodes={nodes} />;
}
