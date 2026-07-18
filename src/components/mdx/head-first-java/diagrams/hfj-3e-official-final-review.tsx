import {
  HfjReferenceMapLab,
  HfjExecutionExperimentLab,
  HfjEvidenceLab,
} from "./official-hfj-lab";

const stages = ["声明合同", "预测结果", "编译运行", "注入边界", "解释证据"];

export function Hfj3eOfficialFinalReviewMapLab() {
  return (
    <HfjReferenceMapLab
      title="《Head First Java（第3版）》全书总复习 · 对象/执行图"
      focus="以一个可测试 BeatBox 系统贯通对象、集合、Stream、异常、GUI、I/O、网络和并发合同"
      stages={stages}
    />
  );
}

export function Hfj3eOfficialFinalReviewExperimentLab() {
  return (
    <HfjExecutionExperimentLab
      title="《Head First Java（第3版）》全书总复习 · 执行实验"
      focus="21单元验收矩阵、406节点追踪表与端到端缺陷档案"
      stages={stages}
    />
  );
}

export function Hfj3eOfficialFinalReviewEvidenceLab() {
  return (
    <HfjEvidenceLab
      title="《Head First Java（第3版）》全书总复习 · 失败证据"
      focus="章节各自会做但无法在跨层故障中定位所有权、资源生命周期和并发边界"
      stages={stages}
    />
  );
}
