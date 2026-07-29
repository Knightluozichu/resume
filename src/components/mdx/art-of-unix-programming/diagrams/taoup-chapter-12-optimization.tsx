import { UnixDecisionLab } from "./unix-decision-lab";

const shared = {
  unitId: "taoup-chapter-12-optimization",
  title: "第12章 优化",
  question: "在10万条记录处理中选择批大小、并发窗口和缓存策略",
  nodes: ["建立基线", "定位瓶颈", "选择策略", "测量副作用", "保留回退"],
  concepts: [
    "12. Optimization",
    "Don't Just Do Something, Stand There!",
    "Measure before Optimizing",
    "Nonlocality Considered Harmful",
    "Throughput vs. Latency",
    "Batching Operations",
    "Overlapping Operations",
    "Caching Operation Results",
  ],
  actions: [
    {
      label: "收窄基线耗时",
      detail: "只改变基线耗时，保留吞吐与尾延迟的原始基线。",
    },
    {
      label: "显式化尾延迟",
      detail: "把尾延迟的输入、输出和失败状态写入可检查记录。",
    },
    {
      label: "绕过缓存命中",
      detail: "跳过缓存命中直接追求资源预算，用来观察局部捷径的系统代价。",
    },
  ],
  boundaryNote: "优化收益小于测量噪声或维护成本时，应保留清晰实现。",
  faultNote:
    "拒绝原因：只展示平均吞吐提升，隐藏缓存失效后的尾延迟和一致性代价。",
} as const;

export function TaoupChapter12OptimizationTopologyLab() {
  return <UnixDecisionLab {...shared} view="topology" />;
}

export function TaoupChapter12OptimizationRepresentationLab() {
  return <UnixDecisionLab {...shared} view="representation" />;
}

export function TaoupChapter12OptimizationEvidenceLab() {
  return <UnixDecisionLab {...shared} view="evidence" />;
}
