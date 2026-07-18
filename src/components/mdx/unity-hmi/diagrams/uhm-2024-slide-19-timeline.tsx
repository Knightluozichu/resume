import {
  Uhm24PlatformLab,
  Uhm24BudgetLab,
  Uhm24EvidenceLab,
} from "./official-unity-hmi-lab";

const title = "第19页 Unity与Unity中国时间线";
const focus =
  "时间线给出Unity成立、进入中国、上市和Unity中国成立四个组织节点，不能与产品版本或技术发布日期混用。";
const stages = [
  "读取四个年份",
  "区分公司与产品",
  "固定事件含义",
  "验证时间顺序",
  "避免技术外推",
];

export function Uhm24Slide19TimelineMapLab() {
  return <Uhm24PlatformLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide19TimelineExperimentLab() {
  return <Uhm24BudgetLab title={title} focus={focus} stages={stages} />;
}
export function Uhm24Slide19TimelineEvidenceLab() {
  return <Uhm24EvidenceLab title={title} focus={focus} stages={stages} />;
}
