import { GpuProSeriesLab, type GpuProSnapshot } from "./official-series-lab";

const SNAPSHOTS=[
  {
    "label": "范围",
    "stage": "重建滤波",
    "action": "固定卷号、篇名与来源",
    "evidence": "publisher TOC + article id",
    "warning": "只在静止高对比图上评估AA，未覆盖亚像素运动和遮挡揭示。"
  },
  {
    "label": "模型",
    "stage": "Edge Classification",
    "action": "提取输入、输出和不变量",
    "evidence": "equations + producer-consumer graph",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "实现",
    "stage": "Temporal Reprojection",
    "action": "建立历史与现代双路径",
    "evidence": "reference + GPU implementation",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "证据",
    "stage": "屏幕空间边界",
    "action": "捕获图像、数值和GPU事件",
    "evidence": "buffers + metrics + capture",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "边界",
    "stage": "图像证书",
    "action": "重放边界、失败和性能条件",
    "evidence": "failure replay + target-device result",
    "warning": "DoF只按颜色模糊，没有前后景遮挡和散景能量处理。"
  }
] as const satisfies ReadonlyArray<GpuProSnapshot>;

export function GpoImageReconstructionMapLab(){return <GpuProSeriesLab title="图像空间、抗锯齿与时域重建：21篇复现" mode="map" snapshots={SNAPSHOTS} initial={0}/>;}
export function GpoImageReconstructionTradeoffLab(){return <GpuProSeriesLab title="图像空间、抗锯齿与时域重建：21篇复现" mode="tradeoff" snapshots={SNAPSHOTS} initial={2}/>;}
export function GpoImageReconstructionEvidenceLab(){return <GpuProSeriesLab title="图像空间、抗锯齿与时域重建：21篇复现" mode="evidence" snapshots={SNAPSHOTS} initial={4}/>;}
