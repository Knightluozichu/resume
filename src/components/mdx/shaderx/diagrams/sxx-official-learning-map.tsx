import { ShaderXSeriesLab, type ShaderXSnapshot } from "./official-series-lab";

const SNAPSHOTS=[
  {
    "label": "身份",
    "stage": "原篇身份与问题",
    "action": "固定8册中的卷号、篇名和329篇唯一归属",
    "evidence": "authorized PDF / official TOC + article id",
    "warning": "把7个系列编号误当成7本物理书，导致ShaderX 2的一册消失。"
  },
  {
    "label": "模型",
    "stage": "系列身份",
    "action": "提取输入、输出、公式、数据依赖和精度",
    "evidence": "invariant + producer-consumer graph",
    "warning": "现代实现必须明确保持、近似或放弃了哪条关系。"
  },
  {
    "label": "迁移",
    "stage": "现代迁移",
    "action": "建立历史载体、CPU参考和现代GPU双路径",
    "evidence": "reference + translated implementation",
    "warning": "API名称相似不代表数据顺序、精度和同步等价。"
  },
  {
    "label": "捕获",
    "stage": "运行捕获",
    "action": "保存中间缓冲、图像、数值和GPU事件",
    "evidence": "buffers + diff + GPU capture",
    "warning": "单张最终截图无法定位错误来自哪一个阶段。"
  },
  {
    "label": "验收",
    "stage": "全系列复现证书",
    "action": "重放正常、边界、失败和性能条件",
    "evidence": "failure replay + target-device metrics",
    "warning": "只看最终截图，没有保存文章身份、参考结果和相同输入的失败重放。"
  }
] as const satisfies ReadonlyArray<ShaderXSnapshot>;

export function SxxOfficialLearningMapMapLab(){return <ShaderXSeriesLab title="ShaderX 1-7 官方学习地图：329篇复现" mode="map" snapshots={SNAPSHOTS} initial={0}/>;}
export function SxxOfficialLearningMapExperimentLab(){return <ShaderXSeriesLab title="ShaderX 1-7 官方学习地图：329篇复现" mode="experiment" snapshots={SNAPSHOTS} initial={2}/>;}
export function SxxOfficialLearningMapEvidenceLab(){return <ShaderXSeriesLab title="ShaderX 1-7 官方学习地图：329篇复现" mode="evidence" snapshots={SNAPSHOTS} initial={4}/>;}
