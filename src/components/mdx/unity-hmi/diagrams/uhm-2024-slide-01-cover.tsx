import {
  Uhm24PlatformLab,
  Uhm24BudgetLab,
  Uhm24EvidenceLab,
} from "./official-unity-hmi-lab";

const title = "第1页 Unity for HMI";
const focus =
  "封面确定课程对象是面向汽车座舱与嵌入式显示的Unity HMI，而不是普通游戏UI。";
const stages = [
  "固定材料身份",
  "声明汽车HMI边界",
  "建立逐页证据",
  "区分演讲与文档",
  "定义复核出口",
];

export function Uhm24Slide01CoverMapLab() {
  return <Uhm24PlatformLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide01CoverExperimentLab() {
  return <Uhm24BudgetLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide01CoverEvidenceLab() {
  return <Uhm24EvidenceLab title={title} focus={focus} stages={stages} />;
}
