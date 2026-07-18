import { ShaderXSeriesLab, type ShaderXSnapshot } from "./official-series-lab";

const SNAPSHOTS=[
  {
    "label": "身份",
    "stage": "原篇身份与问题",
    "action": "固定8册中的卷号、篇名和14篇唯一归属",
    "evidence": "authorized PDF / official TOC + article id",
    "warning": "只验证静止姿态，运动时法线、切线或上一帧位置仍来自旧网格。"
  },
  {
    "label": "模型",
    "stage": "形变状态",
    "action": "提取输入、输出、公式、数据依赖和精度",
    "evidence": "invariant + producer-consumer graph",
    "warning": "现代实现必须明确保持、近似或放弃了哪条关系。"
  },
  {
    "label": "迁移",
    "stage": "时间一致性",
    "action": "建立历史载体、CPU参考和现代GPU双路径",
    "evidence": "reference + translated implementation",
    "warning": "API名称相似不代表数据顺序、精度和同步等价。"
  },
  {
    "label": "捕获",
    "stage": "退化姿态",
    "action": "保存中间缓冲、图像、数值和GPU事件",
    "evidence": "buffers + diff + GPU capture",
    "warning": "单张最终截图无法定位错误来自哪一个阶段。"
  },
  {
    "label": "验收",
    "stage": "动画证书",
    "action": "重放正常、边界、失败和性能条件",
    "evidence": "failure replay + target-device metrics",
    "warning": "把不稳定模拟藏在时间平滑后面，没有保留固定步长和失败重放。"
  }
] as const satisfies ReadonlyArray<ShaderXSnapshot>;

export function SxxAnimationDeformationMapLab(){return <ShaderXSeriesLab title="动画、蒙皮与动态形变：14篇复现" mode="map" snapshots={SNAPSHOTS} initial={0}/>;}
export function SxxAnimationDeformationExperimentLab(){return <ShaderXSeriesLab title="动画、蒙皮与动态形变：14篇复现" mode="experiment" snapshots={SNAPSHOTS} initial={2}/>;}
export function SxxAnimationDeformationEvidenceLab(){return <ShaderXSeriesLab title="动画、蒙皮与动态形变：14篇复现" mode="evidence" snapshots={SNAPSHOTS} initial={4}/>;}
