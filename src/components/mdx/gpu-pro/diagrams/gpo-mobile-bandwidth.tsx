import { GpuProSeriesLab, type GpuProSnapshot } from "./official-series-lab";

const SNAPSHOTS=[
  {
    "label": "范围",
    "stage": "Tile-Based GPU",
    "action": "固定卷号、篇名与来源",
    "evidence": "publisher TOC + article id",
    "warning": "在桌面模拟器通过就宣称移动兼容，没有真机tile和精度证据。"
  },
  {
    "label": "模型",
    "stage": "带宽预算",
    "action": "提取输入、输出和不变量",
    "evidence": "equations + producer-consumer graph",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "实现",
    "stage": "精度分级",
    "action": "建立历史与现代双路径",
    "evidence": "reference + GPU implementation",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "证据",
    "stage": "跨API合同",
    "action": "捕获图像、数值和GPU事件",
    "evidence": "buffers + metrics + capture",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "边界",
    "stage": "移动证书",
    "action": "重放边界、失败和性能条件",
    "evidence": "failure replay + target-device result",
    "warning": "只降分辨率，不检查UI、运动、纹理LOD和上采样边缘。"
  }
] as const satisfies ReadonlyArray<GpuProSnapshot>;

export function GpoMobileBandwidthMapLab(){return <GpuProSeriesLab title="移动GPU、带宽与跨API迁移：20篇复现" mode="map" snapshots={SNAPSHOTS} initial={0}/>;}
export function GpoMobileBandwidthTradeoffLab(){return <GpuProSeriesLab title="移动GPU、带宽与跨API迁移：20篇复现" mode="tradeoff" snapshots={SNAPSHOTS} initial={2}/>;}
export function GpoMobileBandwidthEvidenceLab(){return <GpuProSeriesLab title="移动GPU、带宽与跨API迁移：20篇复现" mode="evidence" snapshots={SNAPSHOTS} initial={4}/>;}
