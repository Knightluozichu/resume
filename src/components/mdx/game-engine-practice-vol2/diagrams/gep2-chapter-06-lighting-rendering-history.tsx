import {
  Gep2PipelineLab,
  Gep2BudgetLab,
  Gep2EvidenceLab,
} from "./official-gep2-lab";

const title = "第6章 光照渲染的发展史";
const focus = "几何复杂度 / 光源覆盖 / G缓冲区 / 分块剔除 / 路径选择";
const stages = [
  "建立场景基线",
  "测量几何负载",
  "统计光源覆盖",
  "比较带宽成本",
  "选择渲染路径",
];

export function Gep2Chapter06LightingRenderingHistoryMapLab() {
  return <Gep2PipelineLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter06LightingRenderingHistoryExperimentLab() {
  return <Gep2BudgetLab title={title} focus={focus} stages={stages} />;
}

export function Gep2Chapter06LightingRenderingHistoryEvidenceLab() {
  return <Gep2EvidenceLab title={title} focus={focus} stages={stages} />;
}
