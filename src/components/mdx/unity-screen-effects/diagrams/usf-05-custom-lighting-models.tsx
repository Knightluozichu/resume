import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "自定义光照函数",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "资源哈希与参数",
    "warning": "自定义函数重复乘光源颜色或衰减，单灯正常但多灯和阴影下亮度失控。"
  },
  {
    "label": "结构",
    "stage": "皮肤近似",
    "action": "核对属性、空间、Pass和脚本绑定",
    "evidence": "中间值调试图",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "边缘光",
    "action": "逐项打开公式与效果并保存A/B图",
    "evidence": "源图与候选图",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "状态",
    "stage": "车漆",
    "action": "核对深度、混合、目标和执行顺序",
    "evidence": "Frame Debugger与GPU事件",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "验收",
    "stage": "模型证书",
    "action": "重放正常例、边界例和失败例",
    "evidence": "CPU/GPU时间与画质差分",
    "warning": "自定义函数重复乘光源颜色或衰减，单灯正常但多灯和阴影下亮度失控。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Usf05CustomLightingModelsPipelineLab(){return <UnityShaderLab title="第5章 创建自定义光照模型：执行链" mode="lighting" snapshots={SNAPSHOTS} initial={0}/>;}
export function Usf05CustomLightingModelsCompareLab(){return <UnityShaderLab title="第5章 创建自定义光照模型：对照实验" mode="lighting" snapshots={SNAPSHOTS} initial={2}/>;}
export function Usf05CustomLightingModelsEvidenceLab(){return <UnityShaderLab title="第5章 创建自定义光照模型：验收证书" mode="lighting" snapshots={SNAPSHOTS} initial={4}/>;}
