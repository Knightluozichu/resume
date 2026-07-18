import { GpuProSeriesLab, type GpuProSnapshot } from "./official-series-lab";

const SNAPSHOTS=[
  {
    "label": "范围",
    "stage": "Blocker Search",
    "action": "固定卷号、篇名与来源",
    "evidence": "publisher TOC + article id",
    "warning": "增大bias消除痤疮却造成悬浮，未区分常量、斜率和法线偏移。"
  },
  {
    "label": "模型",
    "stage": "Variance Bound",
    "action": "提取输入、输出和不变量",
    "evidence": "equations + producer-consumer graph",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "实现",
    "stage": "Temporal Shadow",
    "action": "建立历史与现代双路径",
    "evidence": "reference + GPU implementation",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "证据",
    "stage": "Omnidirectional Atlas",
    "action": "捕获图像、数值和GPU事件",
    "evidence": "buffers + metrics + capture",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "边界",
    "stage": "阴影证书",
    "action": "重放边界、失败和性能条件",
    "evidence": "failure replay + target-device result",
    "warning": "软阴影固定模糊核，不随光源和遮挡几何变化。"
  }
] as const satisfies ReadonlyArray<GpuProSnapshot>;

export function GpoShadowSystemsMapLab(){return <GpuProSeriesLab title="阴影表示、过滤与软阴影：15篇复现" mode="map" snapshots={SNAPSHOTS} initial={0}/>;}
export function GpoShadowSystemsTradeoffLab(){return <GpuProSeriesLab title="阴影表示、过滤与软阴影：15篇复现" mode="tradeoff" snapshots={SNAPSHOTS} initial={2}/>;}
export function GpoShadowSystemsEvidenceLab(){return <GpuProSeriesLab title="阴影表示、过滤与软阴影：15篇复现" mode="evidence" snapshots={SNAPSHOTS} initial={4}/>;}
