import { ShaderXSeriesLab, type ShaderXSnapshot } from "./official-series-lab";

const SNAPSHOTS=[
  {
    "label": "身份",
    "stage": "原篇身份与问题",
    "action": "固定8册中的卷号、篇名和27篇唯一归属",
    "evidence": "authorized PDF / official TOC + article id",
    "warning": "缓存键遗漏渲染状态或布局，错误只在特定材质顺序下出现。"
  },
  {
    "label": "模型",
    "stage": "资源所有权",
    "action": "提取输入、输出、公式、数据依赖和精度",
    "evidence": "invariant + producer-consumer graph",
    "warning": "现代实现必须明确保持、近似或放弃了哪条关系。"
  },
  {
    "label": "迁移",
    "stage": "管线缓存",
    "action": "建立历史载体、CPU参考和现代GPU双路径",
    "evidence": "reference + translated implementation",
    "warning": "API名称相似不代表数据顺序、精度和同步等价。"
  },
  {
    "label": "捕获",
    "stage": "帧阶段",
    "action": "保存中间缓冲、图像、数值和GPU事件",
    "evidence": "buffers + diff + GPU capture",
    "warning": "单张最终截图无法定位错误来自哪一个阶段。"
  },
  {
    "label": "验收",
    "stage": "引擎证书",
    "action": "重放正常、边界、失败和性能条件",
    "evidence": "failure replay + target-device metrics",
    "warning": "只统计draw call，忽略资源更新、barrier、管线切换和CPU-GPU等待。"
  }
] as const satisfies ReadonlyArray<ShaderXSnapshot>;

export function SxxEngineArchitectureMapLab(){return <ShaderXSeriesLab title="渲染器、材质系统与引擎集成：27篇复现" mode="map" snapshots={SNAPSHOTS} initial={0}/>;}
export function SxxEngineArchitectureExperimentLab(){return <ShaderXSeriesLab title="渲染器、材质系统与引擎集成：27篇复现" mode="experiment" snapshots={SNAPSHOTS} initial={2}/>;}
export function SxxEngineArchitectureEvidenceLab(){return <ShaderXSeriesLab title="渲染器、材质系统与引擎集成：27篇复现" mode="evidence" snapshots={SNAPSHOTS} initial={4}/>;}
