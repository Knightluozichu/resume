import {
  Uhm24PlatformLab,
  Uhm24BudgetLab,
  Uhm24EvidenceLab,
} from "./official-unity-hmi-lab";

const title = "第3页 Made with Unity";
const focus =
  "分隔页把材料从主题声明切换到量产采用证据，提醒读者后续数字是演讲时点快照。";
const stages = [
  "识别分部边界",
  "进入采用证据",
  "保留统计时点",
  "检查样本口径",
  "拒绝外推",
];

export function Uhm24Slide03MadeWithUnityMapLab() {
  return <Uhm24PlatformLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide03MadeWithUnityExperimentLab() {
  return <Uhm24BudgetLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide03MadeWithUnityEvidenceLab() {
  return <Uhm24EvidenceLab title={title} focus={focus} stages={stages} />;
}
