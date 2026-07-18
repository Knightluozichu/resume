import { OfficialMsg17Lab } from "./official-msg17-lab";

const props = {
  unitId: "msg17-chapter-02",
  title: "第 2 章 思维模式解析",
  nodes: ["事件输入", "意义赋值", "情绪信号", "策略选择", "后果检验"],
  focuses: ["成功定义", "失败定义", "努力解释", "问答诊断", "行为证据"],
} as const;

export function Msg17Chapter02DiagnosisLab() {
  return <OfficialMsg17Lab {...props} mode="diagnosis" />;
}
export function Msg17Chapter02ExperimentLab() {
  return <OfficialMsg17Lab {...props} mode="experiment" />;
}
export function Msg17Chapter02TransferLab() {
  return <OfficialMsg17Lab {...props} mode="transfer" />;
}
