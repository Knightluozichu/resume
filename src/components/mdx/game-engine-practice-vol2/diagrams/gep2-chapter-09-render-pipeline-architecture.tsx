import {
  Gep2PipelineLab,
  Gep2BudgetLab,
  Gep2EvidenceLab,
} from "./official-gep2-lab";

const title = "第9章 流程渲染架构";
const focus = "可见项 / 渲染队列 / 目标池 / 场景流程 / 视图族";
const stages = [
  "收集可见项",
  "生成渲染队列",
  "分配目标资源",
  "执行场景流程",
  "提交视图族",
];

export function Gep2Chapter09RenderPipelineArchitectureMapLab() {
  return <Gep2PipelineLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter09RenderPipelineArchitectureExperimentLab() {
  return <Gep2BudgetLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter09RenderPipelineArchitectureEvidenceLab() {
  return <Gep2EvidenceLab title={title} focus={focus} stages={stages} />;
}
