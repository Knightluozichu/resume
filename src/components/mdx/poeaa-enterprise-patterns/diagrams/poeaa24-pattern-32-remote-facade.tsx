import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-pattern-32-remote-facade",
  title: "15.1 远程外观",
  nodes: ["客户端意图", "远程外观", "DTO", "网络", "服务端用例"],
  focuses: ["契约粒度", "往返", "序列化", "版本", "部分失败"],
} as const;

export function Poeaa24Pattern32RemoteFacadeBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24Pattern32RemoteFacadeMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24Pattern32RemoteFacadeTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
