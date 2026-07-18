import {
  GppPipelineLab,
  GppBudgetLab,
  GppEvidenceLab,
} from "./official-gpp-lab";

const title = "4. Observer";
const focus = "事件语义 / 观察关系 / 通知时机 / 生命周期 / 反馈回路";
const stages = [
  "声明事件语义",
  "注册观察关系",
  "发布稳定快照",
  "执行同步通知",
  "安全解除订阅",
];

export function GppChapter04ObserverMapLab() {
  return <GppPipelineLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter04ObserverExperimentLab() {
  return <GppBudgetLab title={title} focus={focus} stages={stages} />;
}
export function GppChapter04ObserverEvidenceLab() {
  return <GppEvidenceLab title={title} focus={focus} stages={stages} />;
}
