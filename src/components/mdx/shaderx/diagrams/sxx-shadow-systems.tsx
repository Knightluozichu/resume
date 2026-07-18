import { ShaderXSeriesLab, type ShaderXSnapshot } from "./official-series-lab";

const SNAPSHOTS=[
  {
    "label": "身份",
    "stage": "原篇身份与问题",
    "action": "固定8册中的卷号、篇名和36篇唯一归属",
    "evidence": "authorized PDF / official TOC + article id",
    "warning": "用更大bias消除acne，却没有测掠射接收面和接触阴影脱离。"
  },
  {
    "label": "模型",
    "stage": "遮挡判据",
    "action": "提取输入、输出、公式、数据依赖和精度",
    "evidence": "invariant + producer-consumer graph",
    "warning": "现代实现必须明确保持、近似或放弃了哪条关系。"
  },
  {
    "label": "迁移",
    "stage": "偏移策略",
    "action": "建立历史载体、CPU参考和现代GPU双路径",
    "evidence": "reference + translated implementation",
    "warning": "API名称相似不代表数据顺序、精度和同步等价。"
  },
  {
    "label": "捕获",
    "stage": "过滤语义",
    "action": "保存中间缓冲、图像、数值和GPU事件",
    "evidence": "buffers + diff + GPU capture",
    "warning": "单张最终截图无法定位错误来自哪一个阶段。"
  },
  {
    "label": "验收",
    "stage": "阴影证书",
    "action": "重放正常、边界、失败和性能条件",
    "evidence": "failure replay + target-device metrics",
    "warning": "只测静态相机，级联和投影随相机移动时持续抖动。"
  }
] as const satisfies ReadonlyArray<ShaderXSnapshot>;

export function SxxShadowSystemsMapLab(){return <ShaderXSeriesLab title="阴影表示、过滤与稳定性：36篇复现" mode="map" snapshots={SNAPSHOTS} initial={0}/>;}
export function SxxShadowSystemsExperimentLab(){return <ShaderXSeriesLab title="阴影表示、过滤与稳定性：36篇复现" mode="experiment" snapshots={SNAPSHOTS} initial={2}/>;}
export function SxxShadowSystemsEvidenceLab(){return <ShaderXSeriesLab title="阴影表示、过滤与稳定性：36篇复现" mode="evidence" snapshots={SNAPSHOTS} initial={4}/>;}
