import {
  Gep2PipelineLab,
  Gep2BudgetLab,
  Gep2EvidenceLab,
} from "./official-gep2-lab";

const title = "第13章 多线程";
const focus = "任务依赖 / 线程所有权 / 命令队列 / 资源栅栏 / 并发回放";
const stages = [
  "建立任务依赖",
  "隔离线程所有权",
  "分发更新命令",
  "同步渲染资源",
  "回放并发证据",
];

export function Gep2Chapter13MultithreadingMapLab() {
  return <Gep2PipelineLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter13MultithreadingExperimentLab() {
  return <Gep2BudgetLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter13MultithreadingEvidenceLab() {
  return <Gep2EvidenceLab title={title} focus={focus} stages={stages} />;
}
