import {
  Uhm24PlatformLab,
  Uhm24BudgetLab,
  Uhm24EvidenceLab,
} from "./official-unity-hmi-lab";

const title = "第5页 搭载Unity HMI技术的量产车型汇聚北京车展";
const focus =
  "案例页把采用规模落到车展中的量产车型，课程据此设计车型、硬件、系统和显示设备的验证矩阵。";
const stages = [
  "列出量产车型",
  "登记SoC与OS",
  "标记显示设备",
  "复现核心场景",
  "保存目标机证据",
];

export function Uhm24Slide05BeijingAutoShowMapLab() {
  return <Uhm24PlatformLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide05BeijingAutoShowExperimentLab() {
  return <Uhm24BudgetLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide05BeijingAutoShowEvidenceLab() {
  return <Uhm24EvidenceLab title={title} focus={focus} stages={stages} />;
}
