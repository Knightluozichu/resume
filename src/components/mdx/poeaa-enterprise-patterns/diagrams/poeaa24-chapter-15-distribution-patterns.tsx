import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-chapter-15-distribution-patterns",
  title: "第15章 分布模式",
  nodes: ["客户端意图", "远程外观", "DTO", "网络", "服务端用例"],
  focuses: ["契约粒度", "往返", "序列化", "版本", "部分失败"],
} as const;

export function Poeaa24Chapter15DistributionPatternsBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Chapter15DistributionPatternsMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Chapter15DistributionPatternsTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
