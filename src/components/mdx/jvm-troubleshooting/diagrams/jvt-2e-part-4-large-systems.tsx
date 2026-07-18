import { OfficialJvt2Lab } from "./official-jvt2-lab";

const nodes = [
  "Part 4 Finding problems in large systems"
];

export function Jvt2InvestigationLab() {
  return <OfficialJvt2Lab mode="investigation" unitTitle="Part 4 在大型系统中寻找问题" focus="把单JVM证据扩展到跨服务通信、追踪、序列化、系统性失败、事务与最终一致性" nodes={nodes} />;
}

export function Jvt2TimelineLab() {
  return <OfficialJvt2Lab mode="timeline" unitTitle="Part 4 在大型系统中寻找问题" focus="在一条跨三服务流程中注入超时与重复消息，确认追踪、幂等和对账能重建真实结果" nodes={nodes} />;
}

export function Jvt2EvidenceLab() {
  return <OfficialJvt2Lab mode="evidence" unitTitle="Part 4 在大型系统中寻找问题" focus="服务拓扑、端到端预算、失败传播图、业务不变量和对账策略" nodes={nodes} />;
}
