import { GpuProSeriesLab, type GpuProSnapshot } from "./official-series-lab";

const SNAPSHOTS=[
  {
    "label": "范围",
    "stage": "预积分着色",
    "action": "固定卷号、篇名与来源",
    "evidence": "publisher TOC + article id",
    "warning": "只在正面固定灯光调材质，掠射角、阴影和不同曝光立即失真。"
  },
  {
    "label": "模型",
    "stage": "多层材质",
    "action": "提取输入、输出和不变量",
    "evidence": "equations + producer-consumer graph",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "实现",
    "stage": "各向异性",
    "action": "建立历史与现代双路径",
    "evidence": "reference + GPU implementation",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "证据",
    "stage": "表面细节",
    "action": "捕获图像、数值和GPU事件",
    "evidence": "buffers + metrics + capture",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "边界",
    "stage": "材质证书",
    "action": "重放边界、失败和性能条件",
    "evidence": "failure replay + target-device result",
    "warning": "毛发或位移只更新可见颜色，深度、阴影和运动向量轮廓不一致。"
  }
] as const satisfies ReadonlyArray<GpuProSnapshot>;

export function GpoMaterialShadingMapLab(){return <GpuProSeriesLab title="材质、皮肤、毛发与表面细节：10篇复现" mode="map" snapshots={SNAPSHOTS} initial={0}/>;}
export function GpoMaterialShadingTradeoffLab(){return <GpuProSeriesLab title="材质、皮肤、毛发与表面细节：10篇复现" mode="tradeoff" snapshots={SNAPSHOTS} initial={2}/>;}
export function GpoMaterialShadingEvidenceLab(){return <GpuProSeriesLab title="材质、皮肤、毛发与表面细节：10篇复现" mode="evidence" snapshots={SNAPSHOTS} initial={4}/>;}
