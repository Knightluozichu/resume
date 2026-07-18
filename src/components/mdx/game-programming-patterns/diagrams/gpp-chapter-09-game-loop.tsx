import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "9. Game Loop";
const focus = "平台事件 / 固定步长 / 时间累积 / 渲染插值 / 功耗节流";
const stages = [
  "采集平台事件",
  "累积真实时间",
  "执行固定模拟步",
  "插值并渲染",
  "节流与记录长尾",
];

export function GppChapter09GameLoopMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter09GameLoopExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter09GameLoopEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
