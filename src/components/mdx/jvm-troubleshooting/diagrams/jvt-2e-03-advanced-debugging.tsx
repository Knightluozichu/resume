import { OfficialJvt2Lab } from "./official-jvt2-lab";

const nodes = [
  "3 Finding problem root causes using advanced debugging techniques",
  "3.1 Minimizing investigation time with conditional breakpoints",
  "3.2 Using breakpoints that don’t pause the execution",
  "3.3 Dynamically altering the investigation scenario",
  "3.4 Rewinding the investigation case",
  "Summary"
];

export function Jvt2InvestigationLab() {
  return <OfficialJvt2Lab mode="investigation" unitTitle="第3章 用高级调试技术寻找根因" focus="使用条件断点、非暂停断点、运行时求值与回退调查缩小候选空间，同时明确每种技术对执行的扰动" nodes={nodes} />;
}

export function Jvt2TimelineLab() {
  return <OfficialJvt2Lab mode="timeline" unitTitle="第3章 用高级调试技术寻找根因" focus="让条件断点只命中特定业务键，对照普通断点与日志点的延迟、顺序和状态差异" nodes={nodes} />;
}

export function Jvt2EvidenceLab() {
  return <OfficialJvt2Lab mode="evidence" unitTitle="第3章 用高级调试技术寻找根因" focus="断点谓词、命中计数、非暂停快照、扰动对照表" nodes={nodes} />;
}
