import { OfficialCrv18Lab } from "./official-crv18-lab";

const props = {
  unitId: "crv18-section-03-03",
  title: "3.3 一个故事讲完HTTPS",
  nodes: ["客户端意图", "协议边界", "服务处理", "数据与扩展", "响应证据"],
  focuses: ["身份与信任", "消息语义", "并发模型", "扩展策略", "失败恢复"],
} as const;

export function Crv18Section0303ModelLab() {
  return <OfficialCrv18Lab {...props} mode="model" />;
}
export function Crv18Section0303FlowLab() {
  return <OfficialCrv18Lab {...props} mode="flow" />;
}
export function Crv18Section0303EvidenceLab() {
  return <OfficialCrv18Lab {...props} mode="evidence" />;
}
