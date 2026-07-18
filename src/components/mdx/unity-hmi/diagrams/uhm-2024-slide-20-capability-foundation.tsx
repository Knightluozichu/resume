import {
  Uhm24PlatformLab,
  Uhm24BudgetLab,
  Uhm24EvidenceLab,
} from "./official-unity-hmi-lab";

const title = "第20页 车载HMI能力底座";
const focus =
  "能力矩阵从应用创新、引擎创新、按需引擎、通用制作能力和车载平台五层说明量产底座。";
const stages = [
  "选择应用创新",
  "匹配引擎创新",
  "配置按需版本",
  "复用制作底座",
  "覆盖车载平台",
];

export function Uhm24Slide20CapabilityFoundationMapLab() {
  return <Uhm24PlatformLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide20CapabilityFoundationExperimentLab() {
  return <Uhm24BudgetLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide20CapabilityFoundationEvidenceLab() {
  return <Uhm24EvidenceLab title={title} focus={focus} stages={stages} />;
}
