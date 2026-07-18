import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "材质证书",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "资源哈希与参数",
    "warning": "只保存最终截图，没有证明材质生成代码、固定状态、RenderTexture链和目标设备性能。"
  },
  {
    "label": "结构",
    "stage": "方向证书",
    "action": "核对属性、空间、Pass和脚本绑定",
    "evidence": "中间值调试图",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "透明证书",
    "action": "逐项打开公式与效果并保存A/B图",
    "evidence": "源图与候选图",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "状态",
    "stage": "移动证书",
    "action": "核对深度、混合、目标和执行顺序",
    "evidence": "Frame Debugger与GPU事件",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "验收",
    "stage": "屏幕证书",
    "action": "重放正常例、边界例和失败例",
    "evidence": "CPU/GPU时间与画质差分",
    "warning": "只保存最终截图，没有证明材质生成代码、固定状态、RenderTexture链和目标设备性能。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function UsfOfficialFinalReviewPipelineLab(){return <UnityShaderLab title="《Unity着色器和屏幕特效开发秘笈》总复习：执行链" mode="roadmap" snapshots={SNAPSHOTS} initial={0}/>;}
export function UsfOfficialFinalReviewCompareLab(){return <UnityShaderLab title="《Unity着色器和屏幕特效开发秘笈》总复习：对照实验" mode="roadmap" snapshots={SNAPSHOTS} initial={2}/>;}
export function UsfOfficialFinalReviewEvidenceLab(){return <UnityShaderLab title="《Unity着色器和屏幕特效开发秘笈》总复习：验收证书" mode="roadmap" snapshots={SNAPSHOTS} initial={4}/>;}
