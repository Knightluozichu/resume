import { GpuProSeriesLab, type GpuProSnapshot } from "./official-series-lab";

const SNAPSHOTS=[
  {
    "label": "范围",
    "stage": "Participating Media",
    "action": "固定卷号、篇名与来源",
    "evidence": "publisher TOC + article id",
    "warning": "减少ray-march步数后只看静态截图，运动时出现分层和闪烁。"
  },
  {
    "label": "模型",
    "stage": "Ray March",
    "action": "提取输入、输出和不变量",
    "evidence": "equations + producer-consumer graph",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "实现",
    "stage": "Precomputed Scattering",
    "action": "建立历史与现代双路径",
    "evidence": "reference + GPU implementation",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "证据",
    "stage": "Sparse Volume",
    "action": "捕获图像、数值和GPU事件",
    "evidence": "buffers + metrics + capture",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "边界",
    "stage": "体积证书",
    "action": "重放边界、失败和性能条件",
    "evidence": "failure replay + target-device result",
    "warning": "水体、云和雾共用同一密度解释，忽略界面、相函数和深度合成差异。"
  }
] as const satisfies ReadonlyArray<GpuProSnapshot>;

export function GpoVolumeEnvironmentMapLab(){return <GpuProSeriesLab title="水体、大气、云雾与体积效果：15篇复现" mode="map" snapshots={SNAPSHOTS} initial={0}/>;}
export function GpoVolumeEnvironmentTradeoffLab(){return <GpuProSeriesLab title="水体、大气、云雾与体积效果：15篇复现" mode="tradeoff" snapshots={SNAPSHOTS} initial={2}/>;}
export function GpoVolumeEnvironmentEvidenceLab(){return <GpuProSeriesLab title="水体、大气、云雾与体积效果：15篇复现" mode="evidence" snapshots={SNAPSHOTS} initial={4}/>;}
