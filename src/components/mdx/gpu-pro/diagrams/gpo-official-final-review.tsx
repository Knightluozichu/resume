import { GpuProSeriesLab, type GpuProSnapshot } from "./official-series-lab";

const SNAPSHOTS=[
  {
    "label": "范围",
    "stage": "覆盖证书",
    "action": "固定卷号、篇名与来源",
    "evidence": "publisher TOC + article id",
    "warning": "只让14个站内页面通过评分，没有逐篇映射183个官方ID。"
  },
  {
    "label": "模型",
    "stage": "正确性证书",
    "action": "提取输入、输出和不变量",
    "evidence": "equations + producer-consumer graph",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "实现",
    "stage": "兼容证书",
    "action": "建立历史与现代双路径",
    "evidence": "reference + GPU implementation",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "证据",
    "stage": "性能证书",
    "action": "捕获图像、数值和GPU事件",
    "evidence": "buffers + metrics + capture",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "边界",
    "stage": "失败证书",
    "action": "重放边界、失败和性能条件",
    "evidence": "failure replay + target-device result",
    "warning": "只保存平均帧率，没有正确性、最坏帧、带宽、功耗和失败重放。"
  }
] as const satisfies ReadonlyArray<GpuProSnapshot>;

export function GpoOfficialFinalReviewMapLab(){return <GpuProSeriesLab title="GPU Pro 1-7 · 183篇综合验收" mode="map" snapshots={SNAPSHOTS} initial={0}/>;}
export function GpoOfficialFinalReviewTradeoffLab(){return <GpuProSeriesLab title="GPU Pro 1-7 · 183篇综合验收" mode="tradeoff" snapshots={SNAPSHOTS} initial={2}/>;}
export function GpoOfficialFinalReviewEvidenceLab(){return <GpuProSeriesLab title="GPU Pro 1-7 · 183篇综合验收" mode="evidence" snapshots={SNAPSHOTS} initial={4}/>;}
