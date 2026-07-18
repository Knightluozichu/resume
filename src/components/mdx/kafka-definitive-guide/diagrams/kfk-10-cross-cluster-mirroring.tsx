import { OfficialKafka2Lab } from "./official-kafka2-lab";

const meta = {
  unitTitle: "第10章 跨集群数据镜像",
  focus:
    "从跨数据中心现实约束比较星型、双活、主备与延展集群，部署、保护、调优MirrorMaker并评估替代方案",
  invariant:
    "复制方向、主题命名、消费者位置、冲突所有权和故障切换条件明确；跨集群延迟和数据缺口可测量且能对账",
  artifact:
    "多集群拓扑决策、MirrorMaker配置、延迟与缺口仪表、切换演练和冲突处理手册",
  nodes: [
    "跨集群镜像的应用场景",
    "多集群架构",
    "跨数据中心通信的一些现实情况",
    "星型架构",
    "双活架构",
    "主备架构",
    "延展集群",
    "MirrorMaker",
    "配置MirrorMaker",
    "多集群复制拓扑",
    "保护MirrorMaker",
    "在生产环境中部署MirrorMaker",
    "MirrorMaker调优",
    "其他跨集群镜像方案",
    "Uber的uReplicator",
    "LinkedIn的Brooklin",
    "Confluent的跨数据中心镜像解决方案",
    "小结",
  ],
} as const;

export function Kfk10CrossClusterMirroringTopologyLab() {
  return <OfficialKafka2Lab mode="topology" {...meta} />;
}
export function Kfk10CrossClusterMirroringReliabilityLab() {
  return <OfficialKafka2Lab mode="reliability" {...meta} />;
}
export function Kfk10CrossClusterMirroringEvidenceLab() {
  return <OfficialKafka2Lab mode="evidence" {...meta} />;
}
