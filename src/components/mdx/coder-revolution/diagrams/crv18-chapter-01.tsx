import { OfficialCrv18Lab } from "./official-crv18-lab";

const props = {
  unitId: "crv18-chapter-01",
  title: "第1章 计算机的世界你不懂",
  nodes: ["输入事件", "状态转换", "资源调度", "边界条件", "可见结果"],
  focuses: ["对象身份", "状态所有权", "调度顺序", "资源上限", "故障证据"],
} as const;

export function Crv18Chapter01ModelLab() {
  return <OfficialCrv18Lab {...props} mode="model" />;
}
export function Crv18Chapter01FlowLab() {
  return <OfficialCrv18Lab {...props} mode="flow" />;
}
export function Crv18Chapter01EvidenceLab() {
  return <OfficialCrv18Lab {...props} mode="evidence" />;
}
