import {
  OfficialPbrtTransportLab,
  type PbrtExperimentModel,
} from "./official-pbrt-transport-lab";

const model = {
  title: "第 16 章 Retrospective、Future 与实现附录",
  unitTitle:
    "16 Retrospective and the Future + Appendix A Sampling Algorithms + Appendix B Utilities + Appendix C Processing the Scene Description",
  focus: "把第16章的设计回顾与采样、工具、场景解析三个实现附录接成完整系统边界",
  concepts: [
    "retrospective",
    "design alternatives",
    "emerging topics",
    "future",
    "alias method",
    "reservoir sampling",
    "rejection method",
    "piecewise constant distribution",
    "Allocator",
    "parallelism",
    "image",
    "statistics",
    "memory management",
    "scene description",
    "ParserTarget",
    "BasicSceneBuilder",
    "BasicScene",
    "object creation",
  ],
  fault: "用不同质量目标比较两种架构，或把硬件峰值当成端到端渲染收益",
  evidence: "质量指标、采样频数、分配/线程归属、解析来源链与最终对象身份",
  formula: "Choice=argmin(Error,Cost,Complexity)",
} satisfies PbrtExperimentModel;

export function PbtCh16RetrospectivePathLab() {
  return <OfficialPbrtTransportLab model={model} mode="path" />;
}

export function PbtCh16RetrospectiveEstimatorLab() {
  return <OfficialPbrtTransportLab model={model} mode="estimator" />;
}

export function PbtCh16RetrospectiveEvidenceLab() {
  return <OfficialPbrtTransportLab model={model} mode="evidence" />;
}
