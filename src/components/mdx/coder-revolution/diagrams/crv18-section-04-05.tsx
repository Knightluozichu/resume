import { OfficialCrv18Lab } from "./official-crv18-lab";

const props = {
  unitId: "crv18-section-04-05",
  title: "4.5 再见！Bug",
  nodes: ["需求变更", "版本记录", "自动构建", "测试反馈", "缺陷闭环"],
  focuses: ["变更身份", "可重建性", "测试边界", "反馈时延", "回退能力"],
} as const;

export function Crv18Section0405ModelLab() {
  return <OfficialCrv18Lab {...props} mode="model" />;
}
export function Crv18Section0405FlowLab() {
  return <OfficialCrv18Lab {...props} mode="flow" />;
}
export function Crv18Section0405EvidenceLab() {
  return <OfficialCrv18Lab {...props} mode="evidence" />;
}
