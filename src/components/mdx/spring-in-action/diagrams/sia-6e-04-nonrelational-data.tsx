import { OfficialSiaLab } from "./official-sia6-lab";

const nodes = [
  "4 Working with nonrelational data",
  "4.1 Working with Cassandra repositories",
  "4.1.1 Enabling Spring Data Cassandra",
  "4.1.2 Understanding Cassandra data modeling",
  "4.1.3 Mapping domain types for Cassandra persistence",
  "4.1.4 Writing Cassandra repositories",
  "4.2 Writing MongoDB repositories",
  "4.2.1 Enabling Spring Data MongoDB",
  "4.2.2 Mapping domain types to documents",
  "4.2.3 Writing MongoDB repository interfaces",
  "Summary"
];

export function Sia6ArchitectureLab() {
  return <OfficialSiaLab mode="map" unitTitle="第4章 使用非关系数据" focus="从查询与一致性需求反推Cassandra分区模型和MongoDB文档边界，而非照搬关系实体" nodes={nodes} />;
}

export function Sia6FlowLab() {
  return <OfficialSiaLab mode="flow" unitTitle="第4章 使用非关系数据" focus="改变租户基数、订单增长和查询模式，观察分区倾斜、文档大小、索引代价与一致性窗口" nodes={nodes} />;
}

export function Sia6EvidenceLab() {
  return <OfficialSiaLab mode="evidence" unitTitle="第4章 使用非关系数据" focus="查询优先模型、分区热点实验、文档增长预算和仓储合同测试" nodes={nodes} />;
}
