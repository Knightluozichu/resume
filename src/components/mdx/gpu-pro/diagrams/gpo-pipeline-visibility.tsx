import { GpuProSeriesLab, type GpuProSnapshot } from "./official-series-lab";

const SNAPSHOTS=[
  {
    "label": "范围",
    "stage": "可见性阶段",
    "action": "固定卷号、篇名与来源",
    "evidence": "publisher TOC + article id",
    "warning": "只比较Pass数量，不统计GBuffer、light list和中间目标的读写。"
  },
  {
    "label": "模型",
    "stage": "Deferred",
    "action": "提取输入、输出和不变量",
    "evidence": "equations + producer-consumer graph",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "实现",
    "stage": "Forward Plus",
    "action": "建立历史与现代双路径",
    "evidence": "reference + GPU implementation",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "证据",
    "stage": "数据驱动Renderer",
    "action": "捕获图像、数值和GPU事件",
    "evidence": "buffers + metrics + capture",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "边界",
    "stage": "管线证书",
    "action": "重放边界、失败和性能条件",
    "evidence": "failure replay + target-device result",
    "warning": "把CPU draw减少等同于GPU更快，忽略过度绘制和像素着色。"
  }
] as const satisfies ReadonlyArray<GpuProSnapshot>;

export function GpoPipelineVisibilityMapLab(){return <GpuProSeriesLab title="渲染管线、可见性与光源分桶：16篇复现" mode="map" snapshots={SNAPSHOTS} initial={0}/>;}
export function GpoPipelineVisibilityTradeoffLab(){return <GpuProSeriesLab title="渲染管线、可见性与光源分桶：16篇复现" mode="tradeoff" snapshots={SNAPSHOTS} initial={2}/>;}
export function GpoPipelineVisibilityEvidenceLab(){return <GpuProSeriesLab title="渲染管线、可见性与光源分桶：16篇复现" mode="evidence" snapshots={SNAPSHOTS} initial={4}/>;}
