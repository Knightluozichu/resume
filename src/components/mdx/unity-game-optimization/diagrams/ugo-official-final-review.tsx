import {
  UnityOptimizationLab,
  type UnityOptimizationSnapshot,
} from "./official-optimization-lab";

const SNAPSHOTS = [
  {
    label: "身份",
    stage: "第三版权威身份",
    action: "固定 2019 年第三版、ISBN 9781838556518、两位作者与十章目录。",
    metric: "10 / 10 chapters",
    evidence:
      "https://www.packtpub.com/en-us/product/unity-game-optimization-9781838556518 + https://github.com/PacktPublishing/Unity-Game-Optimization-Third-Edition",
    boundary: "第二版章名与第三版不同，不能把旧版目录混入覆盖率。",
  },
  {
    label: "诊断",
    stage: "先测量再优化",
    action: "从目标、基线、瓶颈、候选改动、复测到回归建立闭环。",
    metric: "budget → bottleneck",
    evidence: "场景、设备、构建、Profiler capture、P50/P95。",
    boundary: "编辑器印象和单帧截图不能作为发布性能结论。",
  },
  {
    label: "系统",
    stage: "脚本、渲染、物理与资产",
    action: "沿生产者到消费者链定位成本，不用孤立技巧清单替代系统模型。",
    metric: "CPU / GPU / RAM / I/O",
    evidence: "每章最小探针、对照组与现代 Unity 映射。",
    boundary: "局部指标改善可能把瓶颈推向另一子系统。",
  },
  {
    label: "平台",
    stage: "XR、内存与 DOTS",
    action: "把平台预算、生命周期和并行边界加入同一证据链。",
    metric: "tail latency",
    evidence: "目标设备、热状态、左右眼、内存快照和作业时间线。",
    boundary: "新版 API 能力不能抹去原书的历史版本边界。",
  },
  {
    label: "交付",
    stage: "回归与工程验收",
    action: "把有效实验固化为自动检查、阈值、失败捕获和团队工作流。",
    metric: "repeatable proof",
    evidence: "可重放场景、阈值报告、失败样本与版本记录。",
    boundary: "只写总结而没有可重放证据，下一版本仍会回退。",
  },
] as const satisfies ReadonlyArray<UnityOptimizationSnapshot>;

export function UgoOfficialFinalReviewMapLab() {
  return (
    <UnityOptimizationLab
      title="Unity Game Optimization 第三版：综合验收"
      chapter="Unity Game Optimization · Third Edition"
      mode="map"
      snapshots={SNAPSHOTS}
      initial={0}
    />
  );
}

export function UgoOfficialFinalReviewExperimentLab() {
  return (
    <UnityOptimizationLab
      title="Unity Game Optimization 第三版：综合验收"
      chapter="Unity Game Optimization · Third Edition"
      mode="experiment"
      snapshots={SNAPSHOTS}
      initial={2}
    />
  );
}

export function UgoOfficialFinalReviewEvidenceLab() {
  return (
    <UnityOptimizationLab
      title="Unity Game Optimization 第三版：综合验收"
      chapter="Unity Game Optimization · Third Edition"
      mode="evidence"
      snapshots={SNAPSHOTS}
      initial={4}
    />
  );
}
