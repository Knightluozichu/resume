import { OfficialJvt2Lab } from "./official-jvt2-lab";

const nodes = [
  "Part 2 Deep diagnosing an app’s execution"
];

export function Jvt2InvestigationLab() {
  return <OfficialJvt2Lab mode="investigation" unitTitle="Part 2 深入诊断应用执行" focus="从CPU、分配、调用频次、SQL、线程锁和线程转储建立运行时证据链，并明确采样偏差" nodes={nodes} />;
}

export function Jvt2TimelineLab() {
  return <OfficialJvt2Lab mode="timeline" unitTitle="Part 2 深入诊断应用执行" focus="对同一负载分别采样CPU、分配和线程状态，比较哪个信号与用户延迟同步变化" nodes={nodes} />;
}

export function Jvt2EvidenceLab() {
  return <OfficialJvt2Lab mode="evidence" unitTitle="Part 2 深入诊断应用执行" focus="诊断选择树、基线窗口、探针开销预算、复现实验记录" nodes={nodes} />;
}
