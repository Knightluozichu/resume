import { OfficialCrv18Lab } from "./official-crv18-lab";

const props = {
  unitId: "crv18-section-05-03",
  title: "5.3 C老头儿和Java小子的硬盘夜话",
  nodes: ["问题表达", "语言语义", "翻译执行", "运行时权衡", "行为证据"],
  focuses: ["抽象层级", "类型与状态", "链接边界", "并发模型", "表达代价"],
} as const;

export function Crv18Section0503ModelLab() {
  return <OfficialCrv18Lab {...props} mode="model" />;
}
export function Crv18Section0503FlowLab() {
  return <OfficialCrv18Lab {...props} mode="flow" />;
}
export function Crv18Section0503EvidenceLab() {
  return <OfficialCrv18Lab {...props} mode="evidence" />;
}
