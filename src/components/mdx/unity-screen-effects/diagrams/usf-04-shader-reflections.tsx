import { UnityShaderLab, type UnityShaderSnapshot } from "./official-lab";

const SNAPSHOTS=[
  {
    "label": "输入",
    "stage": "Cubemap",
    "action": "固定Unity版本、场景、材质和资源",
    "evidence": "资源哈希与参数",
    "warning": "每帧完整渲染六个面且未排除反射对象自身，造成巨大成本和递归伪影。"
  },
  {
    "label": "结构",
    "stage": "反射向量",
    "action": "核对属性、空间、Pass和脚本绑定",
    "evidence": "中间值调试图",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "计算",
    "stage": "反射遮罩",
    "action": "逐项打开公式与效果并保存A/B图",
    "evidence": "源图与候选图",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "状态",
    "stage": "Fresnel",
    "action": "核对深度、混合、目标和执行顺序",
    "evidence": "Frame Debugger与GPU事件",
    "warning": "先确认实际执行链，再解释最终颜色。"
  },
  {
    "label": "验收",
    "stage": "动态立方图",
    "action": "重放正常例、边界例和失败例",
    "evidence": "CPU/GPU时间与画质差分",
    "warning": "每帧完整渲染六个面且未排除反射对象自身，造成巨大成本和递归伪影。"
  }
] as const satisfies ReadonlyArray<UnityShaderSnapshot>;
export function Usf04ShaderReflectionsPipelineLab(){return <UnityShaderLab title="第4章 着色器的反射：执行链" mode="texture" snapshots={SNAPSHOTS} initial={0}/>;}
export function Usf04ShaderReflectionsCompareLab(){return <UnityShaderLab title="第4章 着色器的反射：对照实验" mode="texture" snapshots={SNAPSHOTS} initial={2}/>;}
export function Usf04ShaderReflectionsEvidenceLab(){return <UnityShaderLab title="第4章 着色器的反射：验收证书" mode="texture" snapshots={SNAPSHOTS} initial={4}/>;}
