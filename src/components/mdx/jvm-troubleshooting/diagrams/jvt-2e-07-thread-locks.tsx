import { OfficialJvt2Lab } from "./official-jvt2-lab";

const nodes = [
  "7 Investigating locks in multithreaded architectures",
  "7.1 Monitoring threads for locks",
  "7.2 Analyzing thread locks",
  "7.3 Analyzing waiting threads",
  "Summary"
];

export function Jvt2InvestigationLab() {
  return <OfficialJvt2Lab mode="investigation" unitTitle="第7章 调查多线程架构中的锁" focus="区分锁拥有者、进入等待、条件等待和正常空闲，沿资源依赖解释阻塞而不把所有WAITING视作故障" nodes={nodes} />;
}

export function Jvt2TimelineLab() {
  return <OfficialJvt2Lab mode="timeline" unitTitle="第7章 调查多线程架构中的锁" focus="用两个负载级别重复采集线程状态，确认同一锁等待是否持续增长且与延迟相关" nodes={nodes} />;
}

export function Jvt2EvidenceLab() {
  return <OfficialJvt2Lab mode="evidence" unitTitle="第7章 调查多线程架构中的锁" focus="线程状态序列、锁拥有关系图、等待原因分类、竞争前后吞吐对照" nodes={nodes} />;
}
