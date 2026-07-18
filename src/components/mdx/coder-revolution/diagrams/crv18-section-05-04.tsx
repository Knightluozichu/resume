import { OfficialCrv18Lab } from "./official-crv18-lab";

const props = {
  unitId: "crv18-section-05-04",
  title: "5.4 编程语言的“爱恨情仇”",
  nodes: ["问题表达", "语言语义", "翻译执行", "运行时权衡", "行为证据"],
  focuses: ["抽象层级", "类型与状态", "链接边界", "并发模型", "表达代价"],
} as const;

export function Crv18Section0504ModelLab() {
  return <OfficialCrv18Lab {...props} mode="model" />;
}
export function Crv18Section0504FlowLab() {
  return <OfficialCrv18Lab {...props} mode="flow" />;
}
export function Crv18Section0504EvidenceLab() {
  return <OfficialCrv18Lab {...props} mode="evidence" />;
}
