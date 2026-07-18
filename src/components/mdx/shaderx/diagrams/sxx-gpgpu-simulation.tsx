import { ShaderXSeriesLab, type ShaderXSnapshot } from "./official-series-lab";

const SNAPSHOTS=[
  {
    "label": "身份",
    "stage": "原篇身份与问题",
    "action": "固定8册中的卷号、篇名和24篇唯一归属",
    "evidence": "authorized PDF / official TOC + article id",
    "warning": "只计kernel时间，忽略上传、读回、格式转换和图形管线同步。"
  },
  {
    "label": "模型",
    "stage": "数据并行",
    "action": "提取输入、输出、公式、数据依赖和精度",
    "evidence": "invariant + producer-consumer graph",
    "warning": "现代实现必须明确保持、近似或放弃了哪条关系。"
  },
  {
    "label": "迁移",
    "stage": "收敛判据",
    "action": "建立历史载体、CPU参考和现代GPU双路径",
    "evidence": "reference + translated implementation",
    "warning": "API名称相似不代表数据顺序、精度和同步等价。"
  },
  {
    "label": "捕获",
    "stage": "CPU参考",
    "action": "保存中间缓冲、图像、数值和GPU事件",
    "evidence": "buffers + diff + GPU capture",
    "warning": "单张最终截图无法定位错误来自哪一个阶段。"
  },
  {
    "label": "验收",
    "stage": "计算证书",
    "action": "重放正常、边界、失败和性能条件",
    "evidence": "failure replay + target-device metrics",
    "warning": "只用视觉结果验收模拟，没有与CPU参考比较误差、守恒和确定性。"
  }
] as const satisfies ReadonlyArray<ShaderXSnapshot>;

export function SxxGpgpuSimulationMapLab(){return <ShaderXSeriesLab title="通用计算、模拟与非传统GPU任务：24篇复现" mode="map" snapshots={SNAPSHOTS} initial={0}/>;}
export function SxxGpgpuSimulationExperimentLab(){return <ShaderXSeriesLab title="通用计算、模拟与非传统GPU任务：24篇复现" mode="experiment" snapshots={SNAPSHOTS} initial={2}/>;}
export function SxxGpgpuSimulationEvidenceLab(){return <ShaderXSeriesLab title="通用计算、模拟与非传统GPU任务：24篇复现" mode="evidence" snapshots={SNAPSHOTS} initial={4}/>;}
