import { GpuProSeriesLab, type GpuProSnapshot } from "./official-series-lab";

const SNAPSHOTS=[
  {
    "label": "范围",
    "stage": "GPU Resident",
    "action": "固定卷号、篇名与来源",
    "evidence": "publisher TOC + article id",
    "warning": "kernel时间快就宣布GPU加速，忽略上传、回读和barrier。"
  },
  {
    "label": "模型",
    "stage": "Parallel Primitive",
    "action": "提取输入、输出和不变量",
    "evidence": "equations + producer-consumer graph",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "实现",
    "stage": "Numerical Residual",
    "action": "建立历史与现代双路径",
    "evidence": "reference + GPU implementation",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "证据",
    "stage": "Indirect Dispatch",
    "action": "捕获图像、数值和GPU事件",
    "evidence": "buffers + metrics + capture",
    "warning": "任何现代化修改都必须保留可核查的不变量和对照。"
  },
  {
    "label": "边界",
    "stage": "计算证书",
    "action": "重放边界、失败和性能条件",
    "evidence": "failure replay + target-device result",
    "warning": "模拟画面稳定就认为正确，没有残差、守恒和时间步扫描。"
  }
] as const satisfies ReadonlyArray<GpuProSnapshot>;

export function GpoComputeSimulationMapLab(){return <GpuProSeriesLab title="GPU计算、物理模拟与数值算法：9篇复现" mode="map" snapshots={SNAPSHOTS} initial={0}/>;}
export function GpoComputeSimulationTradeoffLab(){return <GpuProSeriesLab title="GPU计算、物理模拟与数值算法：9篇复现" mode="tradeoff" snapshots={SNAPSHOTS} initial={2}/>;}
export function GpoComputeSimulationEvidenceLab(){return <GpuProSeriesLab title="GPU计算、物理模拟与数值算法：9篇复现" mode="evidence" snapshots={SNAPSHOTS} initial={4}/>;}
