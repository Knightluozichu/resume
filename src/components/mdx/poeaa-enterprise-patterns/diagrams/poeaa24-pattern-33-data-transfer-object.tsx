import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-pattern-33-data-transfer-object",
  title: "15.2 数据传输对象",
  nodes: ["客户端意图", "远程外观", "DTO", "网络", "服务端用例"],
  focuses: ["契约粒度", "往返", "序列化", "版本", "部分失败"],
} as const;

export function Poeaa24Pattern33DataTransferObjectBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Pattern33DataTransferObjectMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Pattern33DataTransferObjectTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
