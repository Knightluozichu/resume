import { ShaderXSeriesLab, type ShaderXSnapshot } from "./official-series-lab";

const SNAPSHOTS=[
  {
    "label": "身份",
    "stage": "原篇身份与问题",
    "action": "固定8册中的卷号、篇名和11篇唯一归属",
    "evidence": "authorized PDF / official TOC + article id",
    "warning": "天空和雾使用不同曝光或色域，地平线处出现无法消除的接缝。"
  },
  {
    "label": "模型",
    "stage": "环境尺度",
    "action": "提取输入、输出、公式、数据依赖和精度",
    "evidence": "invariant + producer-consumer graph",
    "warning": "现代实现必须明确保持、近似或放弃了哪条关系。"
  },
  {
    "label": "迁移",
    "stage": "边界耦合",
    "action": "建立历史载体、CPU参考和现代GPU双路径",
    "evidence": "reference + translated implementation",
    "warning": "API名称相似不代表数据顺序、精度和同步等价。"
  },
  {
    "label": "捕获",
    "stage": "天气状态",
    "action": "保存中间缓冲、图像、数值和GPU事件",
    "evidence": "buffers + diff + GPU capture",
    "warning": "单张最终截图无法定位错误来自哪一个阶段。"
  },
  {
    "label": "验收",
    "stage": "环境证书",
    "action": "重放正常、边界、失败和性能条件",
    "evidence": "failure replay + target-device metrics",
    "warning": "天气参数瞬时切换，没有验证时间连续、粒子重置和反射同步。"
  }
] as const satisfies ReadonlyArray<ShaderXSnapshot>;

export function SxxEnvironmentWeatherMapLab(){return <ShaderXSeriesLab title="天空、天气与自然环境：11篇复现" mode="map" snapshots={SNAPSHOTS} initial={0}/>;}
export function SxxEnvironmentWeatherExperimentLab(){return <ShaderXSeriesLab title="天空、天气与自然环境：11篇复现" mode="experiment" snapshots={SNAPSHOTS} initial={2}/>;}
export function SxxEnvironmentWeatherEvidenceLab(){return <ShaderXSeriesLab title="天空、天气与自然环境：11篇复现" mode="evidence" snapshots={SNAPSHOTS} initial={4}/>;}
