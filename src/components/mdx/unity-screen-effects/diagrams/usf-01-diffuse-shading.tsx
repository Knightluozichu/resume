import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "表面着色器",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "资源哈希与参数",
    "warning": "把Half Lambert或渐变贴图称为物理漫反射，没有说明它们为了风格化改变了响应曲线。"
  },
  {
    "label": "结构",
    "stage": "Properties",
    "action": "核对属性、空间、Pass和脚本绑定",
    "evidence": "中间值调试图",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "Lambert",
    "action": "逐项打开公式与效果并保存A/B图",
    "evidence": "源图与候选图",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "状态",
    "stage": "Half Lambert",
    "action": "核对深度、混合、目标和执行顺序",
    "evidence": "Frame Debugger与GPU事件",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "验收",
    "stage": "Ramp BRDF",
    "action": "重放正常例、边界例和失败例",
    "evidence": "CPU/GPU时间与画质差分",
    "warning": "把Half Lambert或渐变贴图称为物理漫反射，没有说明它们为了风格化改变了响应曲线。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Usf01DiffuseShadingPipelineLab(){return <UnityShaderLab title="第1章 漫反射着色：执行链" mode="lighting" snapshots={SNAPSHOTS} initial={0}/>;}
export function Usf01DiffuseShadingCompareLab(){return <UnityShaderLab title="第1章 漫反射着色：对照实验" mode="lighting" snapshots={SNAPSHOTS} initial={2}/>;}
export function Usf01DiffuseShadingEvidenceLab(){return <UnityShaderLab title="第1章 漫反射着色：验收证书" mode="lighting" snapshots={SNAPSHOTS} initial={4}/>;}
