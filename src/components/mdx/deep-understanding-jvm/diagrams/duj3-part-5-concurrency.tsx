import { OfficialDuj3Lab } from "./official-duj3-lab";

const nodes = [
  "第五部分 高效并发"
];

export function Duj3StructureLab() {
  return <OfficialDuj3Lab mode="structure" unitTitle="第五部分 高效并发" focus="把硬件一致性、Java内存模型、线程实现、协程与锁优化统一到可证明的并发正确性和性能边界" nodes={nodes} />;
}

export function Duj3ExecutionLab() {
  return <OfficialDuj3Lab mode="execution" unitTitle="第五部分 高效并发" focus="构造可见性、原子性、有序性和竞争四类最小反例，再用对应同步关系逐个修复" nodes={nodes} />;
}

export function Duj3EvidenceLab() {
  return <OfficialDuj3Lab mode="evidence" unitTitle="第五部分 高效并发" focus="共享状态模型、happens-before图、并发反例、锁状态与公平性证据" nodes={nodes} />;
}
