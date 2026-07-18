import { OfficialCrv18Lab } from "./official-crv18-lab";

const props = {
  unitId: "crv18-chapter-03",
  title: "第3章 浪潮之巅的Web",
  nodes: ["客户端意图", "协议边界", "服务处理", "数据与扩展", "响应证据"],
  focuses: ["身份与信任", "消息语义", "并发模型", "扩展策略", "失败恢复"],
} as const;

export function Crv18Chapter03ModelLab() {
  return <OfficialCrv18Lab {...props} mode="model" />;
}
export function Crv18Chapter03FlowLab() {
  return <OfficialCrv18Lab {...props} mode="flow" />;
}
export function Crv18Chapter03EvidenceLab() {
  return <OfficialCrv18Lab {...props} mode="evidence" />;
}
