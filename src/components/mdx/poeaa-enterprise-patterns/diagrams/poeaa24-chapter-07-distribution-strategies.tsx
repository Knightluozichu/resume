import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-chapter-07-distribution-strategies",
  title: "第7章 分布策略",
  nodes: ["本地模型", "分布边界", "远程契约", "网络调用", "故障恢复"],
  focuses: ["远程本地", "往返次数", "序列化", "部分失败", "边界粒度"],
} as const;

export function Poeaa24Chapter07DistributionStrategiesBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Chapter07DistributionStrategiesMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Chapter07DistributionStrategiesTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
