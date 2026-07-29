import {
  OfficialPbrtTransportLab,
  type PbrtExperimentModel,
} from "./official-pbrt-transport-lab";

const model = {
  title: "第 15 章 Wavefront Rendering on GPUs",
  unitTitle: "15 Wavefront Rendering on GPUs",
  focus: "把路径追踪状态拆成GPU队列，并保持各阶段数据布局与路径语义等价",
  concepts: [
    "wavefront",
    "gpu path tracing",
    "work queue",
    "structure of arrays",
    "unified memory",
    "ray tracing hardware",
  ],
  fault: "队列压缩时打乱路径状态，或CPU/GPU实现消费不同的随机维度",
  evidence:
    "queue name、slot、pixel/sample、path depth、ray、beta、random dimension与stage output",
  formula: "Q_{k+1}=Stage_k(Q_k)",
} satisfies PbrtExperimentModel;

export function PbtCh15WavefrontGpuPathLab() {
  return <OfficialPbrtTransportLab model={model} mode="path" />;
}

export function PbtCh15WavefrontGpuEstimatorLab() {
  return <OfficialPbrtTransportLab model={model} mode="estimator" />;
}

export function PbtCh15WavefrontGpuEvidenceLab() {
  return <OfficialPbrtTransportLab model={model} mode="evidence" />;
}
