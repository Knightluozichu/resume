import { OfficialJvt2Lab } from "./official-jvt2-lab";

const nodes = [
  "1 Starting to know your apps",
  "1.1 How to more easily understand your app",
  "1.2 Typical scenarios for using investigation techniques",
  "1.2.1 Demystifying the unexpected output",
  "1.2.2 Getting familiar with your external libraries",
  "1.2.3 Clarifying slowness",
  "1.2.4 Understanding app crashes",
  "1.3 AI as a game changer in troubleshooting apps",
  "1.4 What you will learn in this book",
  "Summary"
];

export function Jvt2InvestigationLab() {
  return <OfficialJvt2Lab mode="investigation" unitTitle="第1章 开始认识应用" focus="按意外输出、外部库、性能变慢和崩溃四类症状选择调查入口，并把AI输出当待验证假设而非事实" nodes={nodes} />;
}

export function Jvt2TimelineLab() {
  return <OfficialJvt2Lab mode="timeline" unitTitle="第1章 开始认识应用" focus="向AI只提供脱敏症状和最小代码，让它给出三个互斥假设，再用一条运行证据逐个证伪" nodes={nodes} />;
}

export function Jvt2EvidenceLab() {
  return <OfficialJvt2Lab mode="evidence" unitTitle="第1章 开始认识应用" focus="故障分类卡、最小复现、依赖来源表、AI提示脱敏与验证记录" nodes={nodes} />;
}
