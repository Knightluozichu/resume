import { GpuProSeriesLab, type GpuProSnapshot } from "./official-series-lab";

const SNAPSHOTS=[
  {
    "label": "范围",
    "stage": "间接光",
    "action": "固定卷号、篇名与来源",
    "evidence": "publisher TOC + article id",
    "warning": "把亮度增加当作GI正确，没有检查漏光、遮挡和能量来源。"
  },
  {
    "label": "模型",
    "stage": "Irradiance Probe",
    "action": "提取输入、输出和不变量",
    "evidence": "equations + producer-consumer graph",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "实现",
    "stage": "Light Propagation Volume",
    "action": "建立历史与现代双路径",
    "evidence": "reference + GPU implementation",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "证据",
    "stage": "Screen Space GI",
    "action": "捕获图像、数值和GPU事件",
    "evidence": "buffers + metrics + capture",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "边界",
    "stage": "光输运证书",
    "action": "重放边界、失败和性能条件",
    "evidence": "failure replay + target-device result",
    "warning": "屏幕空间反射未命中时返回黑色，没有环境或探针降级。"
  }
] as const satisfies ReadonlyArray<GpuProSnapshot>;

export function GpoLightingGiMapLab(){return <GpuProSeriesLab title="光照、全局光照与反射：23篇复现" mode="map" snapshots={SNAPSHOTS} initial={0}/>;}
export function GpoLightingGiTradeoffLab(){return <GpuProSeriesLab title="光照、全局光照与反射：23篇复现" mode="tradeoff" snapshots={SNAPSHOTS} initial={2}/>;}
export function GpoLightingGiEvidenceLab(){return <GpuProSeriesLab title="光照、全局光照与反射：23篇复现" mode="evidence" snapshots={SNAPSHOTS} initial={4}/>;}
