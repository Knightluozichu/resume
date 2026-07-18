import { OfficialCrv18Lab } from "./official-crv18-lab";

const props = {
  unitId: "crv18-section-01-14",
  title: "1.14 递归那点事儿",
  nodes: ["输入事件", "状态转换", "资源调度", "边界条件", "可见结果"],
  focuses: ["对象身份", "状态所有权", "调度顺序", "资源上限", "故障证据"],
} as const;

export function Crv18Section0114ModelLab() {
  return <OfficialCrv18Lab {...props} mode="model" />;
}
export function Crv18Section0114FlowLab() {
  return <OfficialCrv18Lab {...props} mode="flow" />;
}
export function Crv18Section0114EvidenceLab() {
  return <OfficialCrv18Lab {...props} mode="evidence" />;
}
