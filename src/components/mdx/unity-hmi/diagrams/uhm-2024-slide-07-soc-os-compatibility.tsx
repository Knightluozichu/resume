import {
  Uhm24PlatformLab,
  Uhm24BudgetLab,
  Uhm24EvidenceLab,
} from "./official-unity-hmi-lab";

const title = "第7页 主流SoC与操作系统适配";
const focus =
  "平台矩阵覆盖主流车规SoC和车载操作系统，真正的可移植性必须按芯片、驱动、OS、图形API和显示拓扑逐项验收。";
const stages = [
  "枚举SoC族",
  "枚举OS族",
  "绑定图形驱动",
  "构建目标镜像",
  "运行显示回归",
];

export function Uhm24Slide07SocOsCompatibilityMapLab() {
  return <Uhm24PlatformLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide07SocOsCompatibilityExperimentLab() {
  return <Uhm24BudgetLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide07SocOsCompatibilityEvidenceLab() {
  return <Uhm24EvidenceLab title={title} focus={focus} stages={stages} />;
}
