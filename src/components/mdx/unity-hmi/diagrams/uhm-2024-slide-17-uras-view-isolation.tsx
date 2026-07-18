import {
  Uhm24PlatformLab,
  Uhm24BudgetLab,
  Uhm24EvidenceLab,
} from "./official-unity-hmi-lab";

const title = "第17页 URAS View组件与隔离工程";
const focus =
  "应用只集成View组件并脱离Activity，同页可有多个View，同时保留工程隔离和共享服务的资源收益。";
const stages = [
  "应用集成View",
  "脱离Activity",
  "注册多View",
  "隔离工程资源",
  "验证服务故障",
];

export function Uhm24Slide17UrasViewIsolationMapLab() {
  return <Uhm24PlatformLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide17UrasViewIsolationExperimentLab() {
  return <Uhm24BudgetLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide17UrasViewIsolationEvidenceLab() {
  return <Uhm24EvidenceLab title={title} focus={focus} stages={stages} />;
}
