import {
  Uhm24PlatformLab,
  Uhm24BudgetLab,
  Uhm24EvidenceLab,
} from "./official-unity-hmi-lab";

const title = "第10页 车机版";
const focus =
  "分隔页进入车机运行时能力，后续内容聚焦量产OS、线程、图层、输入、诊断和目标机分析。";
const stages = [
  "进入车机版分部",
  "识别量产约束",
  "连接平台能力",
  "建立诊断合同",
  "准备部署验收",
];

export function Uhm24Slide10HeadUnitEditionMapLab() {
  return <Uhm24PlatformLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide10HeadUnitEditionExperimentLab() {
  return <Uhm24BudgetLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide10HeadUnitEditionEvidenceLab() {
  return <Uhm24EvidenceLab title={title} focus={focus} stages={stages} />;
}
