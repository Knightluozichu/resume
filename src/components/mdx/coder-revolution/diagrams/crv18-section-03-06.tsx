import { OfficialCrv18Lab } from "./official-crv18-lab";

const props = {
  unitId: "crv18-section-03-06",
  title: "3.6 后端风云",
  nodes: ["客户端意图", "协议边界", "服务处理", "数据与扩展", "响应证据"],
  focuses: ["身份与信任", "消息语义", "并发模型", "扩展策略", "失败恢复"],
} as const;

export function Crv18Section0306ModelLab() {
  return <OfficialCrv18Lab {...props} mode="model" />;
}
export function Crv18Section0306FlowLab() {
  return <OfficialCrv18Lab {...props} mode="flow" />;
}
export function Crv18Section0306EvidenceLab() {
  return <OfficialCrv18Lab {...props} mode="evidence" />;
}
