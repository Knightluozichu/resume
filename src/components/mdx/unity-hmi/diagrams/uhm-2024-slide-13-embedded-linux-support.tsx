import {
  Uhm24PlatformLab,
  Uhm24BudgetLab,
  Uhm24EvidenceLab,
} from "./official-unity-hmi-lab";

const title = "第13页 Embedded Linux平台支持与优化";
const focus =
  "Embedded Linux页聚焦线程优先级、输出图层、透明合成和CPU亲和性，量产验收还需补足驱动、窗口系统和看门狗证据。";
const stages = [
  "冻结Linux镜像",
  "设置线程优先级",
  "配置输出图层",
  "绑定CPU核",
  "验证透明合成",
];

export function Uhm24Slide13EmbeddedLinuxSupportMapLab() {
  return <Uhm24PlatformLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide13EmbeddedLinuxSupportExperimentLab() {
  return <Uhm24BudgetLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide13EmbeddedLinuxSupportEvidenceLab() {
  return <Uhm24EvidenceLab title={title} focus={focus} stages={stages} />;
}
