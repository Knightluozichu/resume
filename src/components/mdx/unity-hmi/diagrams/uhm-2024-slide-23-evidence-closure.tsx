import {
  Uhm24PlatformLab,
  Uhm24BudgetLab,
  Uhm24EvidenceLab,
} from "./official-unity-hmi-lab";

const title = "第23页 Thank you与证据闭环";
const focus =
  "结束页不是技术结论，而是复核出口：读者应能从任一课程页面回到PDF页码、当时口径和目标机实验。";
const stages = [
  "汇总逐页清单",
  "抽样技术节点",
  "复跑目标机实验",
  "登记差异与限制",
  "关闭证据链",
];

export function Uhm24Slide23EvidenceClosureMapLab() {
  return <Uhm24PlatformLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide23EvidenceClosureExperimentLab() {
  return <Uhm24BudgetLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide23EvidenceClosureEvidenceLab() {
  return <Uhm24EvidenceLab title={title} focus={focus} stages={stages} />;
}
