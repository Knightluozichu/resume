import { ShaderXSeriesLab, type ShaderXSnapshot } from "./official-series-lab";

const SNAPSHOTS=[
  {
    "label": "身份",
    "stage": "原篇身份与问题",
    "action": "固定8册中的卷号、篇名和20篇唯一归属",
    "evidence": "authorized PDF / official TOC + article id",
    "warning": "改变步数后亮度也改变，说明积分没有按步长缩放或透射率累积错误。"
  },
  {
    "label": "模型",
    "stage": "介质状态",
    "action": "提取输入、输出、公式、数据依赖和精度",
    "evidence": "invariant + producer-consumer graph",
    "warning": "现代实现必须明确保持、近似或放弃了哪条关系。"
  },
  {
    "label": "迁移",
    "stage": "透射率",
    "action": "建立历史载体、CPU参考和现代GPU双路径",
    "evidence": "reference + translated implementation",
    "warning": "API名称相似不代表数据顺序、精度和同步等价。"
  },
  {
    "label": "捕获",
    "stage": "混合顺序",
    "action": "保存中间缓冲、图像、数值和GPU事件",
    "evidence": "buffers + diff + GPU capture",
    "warning": "单张最终截图无法定位错误来自哪一个阶段。"
  },
  {
    "label": "验收",
    "stage": "体积证书",
    "action": "重放正常、边界、失败和性能条件",
    "evidence": "failure replay + target-device metrics",
    "warning": "只测空旷镜头，近景粒子重叠时过度绘制和排序成本失控。"
  }
] as const satisfies ReadonlyArray<ShaderXSnapshot>;

export function SxxParticlesVolumeMapLab(){return <ShaderXSeriesLab title="粒子、体积、雾与流体：20篇复现" mode="map" snapshots={SNAPSHOTS} initial={0}/>;}
export function SxxParticlesVolumeExperimentLab(){return <ShaderXSeriesLab title="粒子、体积、雾与流体：20篇复现" mode="experiment" snapshots={SNAPSHOTS} initial={2}/>;}
export function SxxParticlesVolumeEvidenceLab(){return <ShaderXSeriesLab title="粒子、体积、雾与流体：20篇复现" mode="evidence" snapshots={SNAPSHOTS} initial={4}/>;}
