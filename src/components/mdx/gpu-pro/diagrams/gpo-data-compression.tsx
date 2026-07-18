import { GpuProSeriesLab, type GpuProSnapshot } from "./official-series-lab";

const SNAPSHOTS=[
  {
    "label": "范围",
    "stage": "虚拟纹理",
    "action": "固定卷号、篇名与来源",
    "evidence": "publisher TOC + article id",
    "warning": "只报压缩率，不测HDR峰值、法线方向或时间稳定性。"
  },
  {
    "label": "模型",
    "stage": "误差度量",
    "action": "提取输入、输出和不变量",
    "evidence": "equations + producer-consumer graph",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "实现",
    "stage": "GPU编码",
    "action": "建立历史与现代双路径",
    "evidence": "reference + GPU implementation",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "证据",
    "stage": "资产合同",
    "action": "捕获图像、数值和GPU事件",
    "evidence": "buffers + metrics + capture",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "边界",
    "stage": "数据证书",
    "action": "重放边界、失败和性能条件",
    "evidence": "failure replay + target-device result",
    "warning": "虚拟纹理只做分页，没有反馈、预取和缺页降级。"
  }
] as const satisfies ReadonlyArray<GpuProSnapshot>;

export function GpoDataCompressionMapLab(){return <GpuProSeriesLab title="纹理、压缩、资产与数据表示：8篇复现" mode="map" snapshots={SNAPSHOTS} initial={0}/>;}
export function GpoDataCompressionTradeoffLab(){return <GpuProSeriesLab title="纹理、压缩、资产与数据表示：8篇复现" mode="tradeoff" snapshots={SNAPSHOTS} initial={2}/>;}
export function GpoDataCompressionEvidenceLab(){return <GpuProSeriesLab title="纹理、压缩、资产与数据表示：8篇复现" mode="evidence" snapshots={SNAPSHOTS} initial={4}/>;}
