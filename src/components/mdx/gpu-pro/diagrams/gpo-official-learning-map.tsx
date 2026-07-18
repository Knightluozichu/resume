import { GpuProSeriesLab, type GpuProSnapshot } from "./official-series-lab";

const SNAPSHOTS=[
  {
    "label": "范围",
    "stage": "官方篇章库存",
    "action": "固定卷号、篇名与来源",
    "evidence": "publisher TOC + article id",
    "warning": "把十二个主题页称作原书十二章，抹掉七卷183篇身份。"
  },
  {
    "label": "模型",
    "stage": "卷册身份",
    "action": "提取输入、输出和不变量",
    "evidence": "equations + producer-consumer graph",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "实现",
    "stage": "主题唯一归属",
    "action": "建立历史与现代双路径",
    "evidence": "reference + GPU implementation",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "证据",
    "stage": "算法不变量",
    "action": "捕获图像、数值和GPU事件",
    "evidence": "buffers + metrics + capture",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "边界",
    "stage": "复现证书",
    "action": "重放边界、失败和性能条件",
    "evidence": "failure replay + target-device result",
    "warning": "把旧API翻译成现代compute后只留最终截图，无法证明算法语义保持。"
  }
] as const satisfies ReadonlyArray<GpuProSnapshot>;

export function GpoOfficialLearningMapMapLab(){return <GpuProSeriesLab title="GPU Pro 1-7 · 183篇官方学习地图" mode="map" snapshots={SNAPSHOTS} initial={0}/>;}
export function GpoOfficialLearningMapTradeoffLab(){return <GpuProSeriesLab title="GPU Pro 1-7 · 183篇官方学习地图" mode="tradeoff" snapshots={SNAPSHOTS} initial={2}/>;}
export function GpoOfficialLearningMapEvidenceLab(){return <GpuProSeriesLab title="GPU Pro 1-7 · 183篇官方学习地图" mode="evidence" snapshots={SNAPSHOTS} initial={4}/>;}
