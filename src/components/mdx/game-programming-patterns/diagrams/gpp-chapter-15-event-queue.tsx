import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "15. Event Queue";
const focus = "事件载荷 / 队列容量 / 处理顺序 / 载荷寿命 / 反馈回路";
const stages = [
  "封装事件载荷",
  "入队并限流",
  "冻结处理批次",
  "按序消费",
  "检测溢出反馈",
];

export function GppChapter15EventQueueMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter15EventQueueExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter15EventQueueEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
