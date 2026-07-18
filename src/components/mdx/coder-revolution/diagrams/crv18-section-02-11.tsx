import { OfficialCrv18Lab } from "./official-crv18-lab";

const props = {
  unitId: "crv18-section-02-11",
  title: "2.11 一个著名的日志系统是怎么设计出来的",
  nodes: ["业务问题", "稳定接口", "运行时机制", "基础设施协作", "验收证据"],
  focuses: ["抽象动机", "接口合同", "运行时状态", "替换边界", "回归结果"],
} as const;

export function Crv18Section0211ModelLab() {
  return <OfficialCrv18Lab {...props} mode="model" />;
}
export function Crv18Section0211FlowLab() {
  return <OfficialCrv18Lab {...props} mode="flow" />;
}
export function Crv18Section0211EvidenceLab() {
  return <OfficialCrv18Lab {...props} mode="evidence" />;
}
