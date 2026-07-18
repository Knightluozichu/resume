import { OfficialCrv18Lab } from "./official-crv18-lab";

const props = {
  unitId: "crv18-section-02-10",
  title: "2.10 Java帝国之泛型",
  nodes: ["业务问题", "稳定接口", "运行时机制", "基础设施协作", "验收证据"],
  focuses: ["抽象动机", "接口合同", "运行时状态", "替换边界", "回归结果"],
} as const;

export function Crv18Section0210ModelLab() {
  return <OfficialCrv18Lab {...props} mode="model" />;
}
export function Crv18Section0210FlowLab() {
  return <OfficialCrv18Lab {...props} mode="flow" />;
}
export function Crv18Section0210EvidenceLab() {
  return <OfficialCrv18Lab {...props} mode="evidence" />;
}
