import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "轻型着色器",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "资源哈希与参数",
    "warning": "一次性改低精度、压纹理和删光照，帧率变快却无法判断收益来自哪项、画质损失来自哪项。"
  },
  {
    "label": "结构",
    "stage": "性能分析",
    "action": "核对属性、空间、Pass和脚本绑定",
    "evidence": "中间值调试图",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "精度类型",
    "action": "逐项打开公式与效果并保存A/B图",
    "evidence": "源图与候选图",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "状态",
    "stage": "纹理预算",
    "action": "核对深度、混合、目标和执行顺序",
    "evidence": "Frame Debugger与GPU事件",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "验收",
    "stage": "移动修改",
    "action": "重放正常例、边界例和失败例",
    "evidence": "CPU/GPU时间与画质差分",
    "warning": "一次性改低精度、压纹理和删光照，帧率变快却无法判断收益来自哪项、画质损失来自哪项。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Usf08MobileShaderOptimizationPipelineLab(){return <UnityShaderLab title="第8章 移动平台上着色器的优化：执行链" mode="performance" snapshots={SNAPSHOTS} initial={0}/>;}
export function Usf08MobileShaderOptimizationCompareLab(){return <UnityShaderLab title="第8章 移动平台上着色器的优化：对照实验" mode="performance" snapshots={SNAPSHOTS} initial={2}/>;}
export function Usf08MobileShaderOptimizationEvidenceLab(){return <UnityShaderLab title="第8章 移动平台上着色器的优化：验收证书" mode="performance" snapshots={SNAPSHOTS} initial={4}/>;}
