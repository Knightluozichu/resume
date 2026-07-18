import {
  Gep2PipelineLab,
  Gep2BudgetLab,
  Gep2EvidenceLab,
} from "./official-gep2-lab";

const title = "第14章 动态缓冲区与性能分析器";
const focus = "环形缓冲 / 写入策略 / GPU栅栏 / 层级事件 / 帧分位数";
const stages = [
  "预算动态容量",
  "分配环形区间",
  "插入GPU栅栏",
  "采集层级事件",
  "比较帧分位数",
];

export function Gep2Chapter14DynamicBuffersProfilerMapLab() {
  return <Gep2PipelineLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter14DynamicBuffersProfilerExperimentLab() {
  return <Gep2BudgetLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter14DynamicBuffersProfilerEvidenceLab() {
  return <Gep2EvidenceLab title={title} focus={focus} stages={stages} />;
}
