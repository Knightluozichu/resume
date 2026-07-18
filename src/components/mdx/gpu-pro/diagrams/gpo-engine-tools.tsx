import { GpuProSeriesLab, type GpuProSnapshot } from "./official-series-lab";

const SNAPSHOTS=[
  {
    "label": "范围",
    "stage": "Frame Graph",
    "action": "固定卷号、篇名与来源",
    "evidence": "publisher TOC + article id",
    "warning": "把项目截图和最终技术名当作复盘，省略被否决方案与约束。"
  },
  {
    "label": "模型",
    "stage": "数据驱动",
    "action": "提取输入、输出和不变量",
    "evidence": "equations + producer-consumer graph",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "实现",
    "stage": "可视化工具",
    "action": "建立历史与现代双路径",
    "evidence": "reference + GPU implementation",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "证据",
    "stage": "项目复盘",
    "action": "捕获图像、数值和GPU事件",
    "evidence": "buffers + metrics + capture",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "边界",
    "stage": "工程证书",
    "action": "重放边界、失败和性能条件",
    "evidence": "failure replay + target-device result",
    "warning": "工具只能显示最终颜色，无法回到资源、Pass、draw和源码版本。"
  }
] as const satisfies ReadonlyArray<GpuProSnapshot>;

export function GpoEngineToolsMapLab(){return <GpuProSeriesLab title="引擎架构、工具与项目复盘：17篇复现" mode="map" snapshots={SNAPSHOTS} initial={0}/>;}
export function GpoEngineToolsTradeoffLab(){return <GpuProSeriesLab title="引擎架构、工具与项目复盘：17篇复现" mode="tradeoff" snapshots={SNAPSHOTS} initial={2}/>;}
export function GpoEngineToolsEvidenceLab(){return <GpuProSeriesLab title="引擎架构、工具与项目复盘：17篇复现" mode="evidence" snapshots={SNAPSHOTS} initial={4}/>;}
