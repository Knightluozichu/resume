import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-pattern-17-serialized-lob",
  title: "12.6 序列化LOB",
  nodes: ["对象图", "身份", "关联", "继承", "关系模式"],
  focuses: ["标识", "外键", "聚合边界", "值对象", "继承策略"],
} as const;

export function Poeaa24Pattern17SerializedLobBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Pattern17SerializedLobMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Pattern17SerializedLobTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
