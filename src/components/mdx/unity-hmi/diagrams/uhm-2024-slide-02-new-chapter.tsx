import {
  Uhm24PlatformLab,
  Uhm24BudgetLab,
  Uhm24EvidenceLab,
} from "./official-unity-hmi-lab";

const title = "第2页 未来已来：Unity开启3D座舱新篇章";
const focus =
  "标题页给出主题、演讲主体与叙事范围，后续所有量产、平台和架构结论都必须回到这一版本坐标。";
const stages = [
  "识别演讲主题",
  "登记讲者主体",
  "固定2024时间",
  "限定3D座舱",
  "建立来源台账",
];

export function Uhm24Slide02NewChapterMapLab() {
  return <Uhm24PlatformLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide02NewChapterExperimentLab() {
  return <Uhm24BudgetLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide02NewChapterEvidenceLab() {
  return <Uhm24EvidenceLab title={title} focus={focus} stages={stages} />;
}
