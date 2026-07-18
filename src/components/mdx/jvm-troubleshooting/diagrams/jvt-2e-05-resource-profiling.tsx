import { OfficialJvt2Lab } from "./official-jvt2-lab";

const nodes = [
  "5 Identifying resource consumption problems using profiling techniques",
  "5.1 Where would a profiler be useful?",
  "5.1.1 Identifying abnormal usage of resources",
  "5.1.2 Finding out what code executes",
  "5.1.3 Identifying slowness in an app’s execution",
  "5.2 Using a profiler",
  "5.2.1 Installing and configuring VisualVM",
  "5.2.2 Observing the CPU and memory usage",
  "5.2.3 Identifying memory leaks",
  "5.3 Using AI assistance",
  "Summary"
];

export function Jvt2InvestigationLab() {
  return <OfficialJvt2Lab mode="investigation" unitTitle="第5章 用剖析识别资源消耗问题" focus="用VisualVM观察CPU、堆和活动代码，区分高资源使用、慢执行和疑似泄漏，并约束AI辅助解释" nodes={nodes} />;
}

export function Jvt2TimelineLab() {
  return <OfficialJvt2Lab mode="timeline" unitTitle="第5章 用剖析识别资源消耗问题" focus="固定请求率后逐步增加输入规模，观察CPU、堆占用与延迟是否同比变化，并重启复测" nodes={nodes} />;
}

export function Jvt2EvidenceLab() {
  return <OfficialJvt2Lab mode="evidence" unitTitle="第5章 用剖析识别资源消耗问题" focus="负载说明、CPU与内存基线、热点调用树、疑似泄漏保留路径、AI验证表" nodes={nodes} />;
}
