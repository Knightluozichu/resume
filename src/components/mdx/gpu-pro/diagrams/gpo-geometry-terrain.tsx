import { GpuProSeriesLab, type GpuProSnapshot } from "./official-series-lab";

const SNAPSHOTS=[
  {
    "label": "范围",
    "stage": "屏幕误差",
    "action": "固定卷号、篇名与来源",
    "evidence": "publisher TOC + article id",
    "warning": "只按相机距离细分，视场角和轮廓误差变化时会过细或穿帮。"
  },
  {
    "label": "模型",
    "stage": "无裂缝细分",
    "action": "提取输入、输出和不变量",
    "evidence": "equations + producer-consumer graph",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "实现",
    "stage": "程序化拓扑",
    "action": "建立历史与现代双路径",
    "evidence": "reference + GPU implementation",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "证据",
    "stage": "地形流送",
    "action": "捕获图像、数值和GPU事件",
    "evidence": "buffers + metrics + capture",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "边界",
    "stage": "形变证书",
    "action": "重放边界、失败和性能条件",
    "evidence": "failure replay + target-device result",
    "warning": "只更新可见顶点，不同步法线、阴影、碰撞和上一帧位置。"
  }
] as const satisfies ReadonlyArray<GpuProSnapshot>;

export function GpoGeometryTerrainMapLab(){return <GpuProSeriesLab title="几何、地形与程序化表面：16篇复现" mode="map" snapshots={SNAPSHOTS} initial={0}/>;}
export function GpoGeometryTerrainTradeoffLab(){return <GpuProSeriesLab title="几何、地形与程序化表面：16篇复现" mode="tradeoff" snapshots={SNAPSHOTS} initial={2}/>;}
export function GpoGeometryTerrainEvidenceLab(){return <GpuProSeriesLab title="几何、地形与程序化表面：16篇复现" mode="evidence" snapshots={SNAPSHOTS} initial={4}/>;}
