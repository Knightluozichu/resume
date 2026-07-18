import { GpuProSeriesLab, type GpuProSnapshot } from "./official-series-lab";

const SNAPSHOTS=[
  {
    "label": "范围",
    "stage": "Per-Pixel List",
    "action": "固定卷号、篇名与来源",
    "evidence": "publisher TOC + article id",
    "warning": "按平均片元数分配OIT内存，爆炸或毛发场景发生静默溢出。"
  },
  {
    "label": "模型",
    "stage": "Voxelization",
    "action": "提取输入、输出和不变量",
    "evidence": "equations + producer-consumer graph",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "实现",
    "stage": "Acceleration Structure",
    "action": "建立历史与现代双路径",
    "evidence": "reference + GPU implementation",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "证据",
    "stage": "Stackless Traversal",
    "action": "捕获图像、数值和GPU事件",
    "evidence": "buffers + metrics + capture",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "边界",
    "stage": "稀疏证书",
    "action": "重放边界、失败和性能条件",
    "evidence": "failure replay + target-device result",
    "warning": "只测相干主光线，忽略次级光线发散和稀疏结构最坏路径。"
  }
] as const satisfies ReadonlyArray<GpuProSnapshot>;

export function GpoTransparencyRaytracingMapLab(){return <GpuProSeriesLab title="透明、体素、光追与稀疏结构：13篇复现" mode="map" snapshots={SNAPSHOTS} initial={0}/>;}
export function GpoTransparencyRaytracingTradeoffLab(){return <GpuProSeriesLab title="透明、体素、光追与稀疏结构：13篇复现" mode="tradeoff" snapshots={SNAPSHOTS} initial={2}/>;}
export function GpoTransparencyRaytracingEvidenceLab(){return <GpuProSeriesLab title="透明、体素、光追与稀疏结构：13篇复现" mode="evidence" snapshots={SNAPSHOTS} initial={4}/>;}
