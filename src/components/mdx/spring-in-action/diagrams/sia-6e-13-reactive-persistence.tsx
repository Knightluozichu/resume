import { OfficialSiaLab } from "./official-sia6-lab";

const nodes = [
  "13 Persisting data reactively",
  "13.1 Working with R2DBC",
  "13.1.1 Defining domain entities for R2DBC",
  "13.1.2 Defining reactive repositories",
  "13.1.3 Testing R2DBC repositories",
  "13.1.4 Defining an OrderRepository aggregate root service",
  "13.2 Persisting document data reactively with MongoDB",
  "13.2.1 Defining domain document types",
  "13.2.2 Defining reactive MongoDB repositories",
  "13.2.3 Testing reactive MongoDB repositories",
  "13.3 Reactively persisting data in Cassandra",
  "13.3.1 Defining domain classes for Cassandra persistence",
  "13.3.2 Creating reactive Cassandra repositories",
  "13.3.3 Testing reactive Cassandra repositories",
  "13.4 Summary"
];

export function Sia6ArchitectureLab() {
  return <OfficialSiaLab mode="map" unitTitle="第13章 响应式持久化" focus="比较R2DBC、响应式MongoDB与Cassandra仓储的聚合、事务、驱动和背压边界" nodes={nodes} />;
}

export function Sia6FlowLab() {
  return <OfficialSiaLab mode="flow" unitTitle="第13章 响应式持久化" focus="缩小连接池并制造慢查询、取消、并发更新和事务失败，验证连接归还与错误传播" nodes={nodes} />;
}

export function Sia6EvidenceLab() {
  return <OfficialSiaLab mode="evidence" unitTitle="第13章 响应式持久化" focus="驱动能力表、响应式事务图、StepVerifier仓储测试和连接池压力记录" nodes={nodes} />;
}
