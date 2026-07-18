import { ShaderXSeriesLab, type ShaderXSnapshot } from "./official-series-lab";

const SNAPSHOTS=[
  {
    "label": "身份",
    "stage": "原篇身份与问题",
    "action": "固定8册中的卷号、篇名和13篇唯一归属",
    "evidence": "authorized PDF / official TOC + article id",
    "warning": "只在正视角调参，掠射角出现穿帮、步进不足或tile接缝。"
  },
  {
    "label": "模型",
    "stage": "高度域",
    "action": "提取输入、输出、公式、数据依赖和精度",
    "evidence": "invariant + producer-consumer graph",
    "warning": "现代实现必须明确保持、近似或放弃了哪条关系。"
  },
  {
    "label": "迁移",
    "stage": "接缝约束",
    "action": "建立历史载体、CPU参考和现代GPU双路径",
    "evidence": "reference + translated implementation",
    "warning": "API名称相似不代表数据顺序、精度和同步等价。"
  },
  {
    "label": "捕获",
    "stage": "轮廓边界",
    "action": "保存中间缓冲、图像、数值和GPU事件",
    "evidence": "buffers + diff + GPU capture",
    "warning": "单张最终截图无法定位错误来自哪一个阶段。"
  },
  {
    "label": "验收",
    "stage": "地形证书",
    "action": "重放正常、边界、失败和性能条件",
    "evidence": "failure replay + target-device metrics",
    "warning": "位移更新了表面，却没有同步法线、阴影、碰撞和流送层级。"
  }
] as const satisfies ReadonlyArray<ShaderXSnapshot>;

export function SxxTerrainDisplacementMapLab(){return <ShaderXSeriesLab title="地形、位移与表面细节：13篇复现" mode="map" snapshots={SNAPSHOTS} initial={0}/>;}
export function SxxTerrainDisplacementExperimentLab(){return <ShaderXSeriesLab title="地形、位移与表面细节：13篇复现" mode="experiment" snapshots={SNAPSHOTS} initial={2}/>;}
export function SxxTerrainDisplacementEvidenceLab(){return <ShaderXSeriesLab title="地形、位移与表面细节：13篇复现" mode="evidence" snapshots={SNAPSHOTS} initial={4}/>;}
